# รวมเสียงทีละบรรทัด -> voice.wav + timing.js (LINE, CAPS) ; ช่องว่างตามโครงเรื่อง
import os,re,json,subprocess
H=os.path.dirname(os.path.abspath(__file__));V=os.path.join(H,'vo')
GAP={2:0.5,4:0.35,7:0.7,9:0.35,11:0.45,12:0.9,13:0.5,14:0.45,16:1.0,17:0.9}  # gap AFTER line n (1-based)
dur=lambda f:float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
def trim(f):
    o=f.replace('.wav','.t.wav')
    subprocess.run(['ffmpeg','-y','-v','error','-i',f,'-af','silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse,afade=t=in:d=0.01','-ar','44100','-ac','1',o],check=True);return o
def pauses(f):
    log=subprocess.run(['ffmpeg','-i',f,'-af','silencedetect=noise=-32dB:d=0.06','-f','null','-'],capture_output=True,text=True).stderr
    s=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',log)];e=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',log)]
    return [(a+b)/2 for a,b in zip(s,e)]
CD=json.load(open(os.path.join(H,'capdef.json'),encoding='utf-8'))
t=0.6;parts=[];LINE=[];CAPS=[]
for i in range(1,len(CD)+1):
    f=trim(os.path.join(V,f'{i:02d}.wav'));d=dur(f);LINE.append([round(t,3),round(t+d,3)]);parts.append((f,t))
    ch=CD[i-1];n=len(ch);w=[len(c[0]) for c in ch];P=pauses(f);bounds=[0]
    for k in range(1,n):
        est=d*sum(w[:k])/sum(w);cand=[p for p in P if bounds[-1]+.25<p<d-.2]
        bounds.append(min(cand,key=lambda p:abs(p-est)) if cand and min(abs(p-est) for p in cand)<.6 else est)
    bounds.append(d)
    for k,c in enumerate(ch):CAPS.append([round(t+bounds[k]+(.0 if k==0 else .05),3),round(t+bounds[k+1],3),c[0],c[1],c[2]])
    t+=d+GAP.get(i,0.14)
D=round(t+1.6,2)
inp=[];fl=[]
for j,(f,st) in enumerate(parts):inp+=['-i',f];fl.append(f'[{j}:a]adelay={int(st*1000)}|{int(st*1000)}[a{j}]')
fl.append(''.join(f'[a{j}]' for j in range(len(parts)))+f'amix=inputs={len(parts)}:normalize=0,apad=whole_dur={D}[o]')
subprocess.run(['ffmpeg','-y','-v','error']+inp+['-filter_complex',';'.join(fl),'-map','[o]','-ar','44100','-ac','1','-t',str(D),os.path.join(H,'voice.wav')],check=True)
open(os.path.join(H,'proj/assets/timing.js'),'w',encoding='utf-8').write(f'const DUR={D};\nconst LINE={json.dumps(LINE)};\nconst CAPS={json.dumps(CAPS,ensure_ascii=False)};\n')
print('DUR',D);[print(i+1,l) for i,l in enumerate(LINE)]
