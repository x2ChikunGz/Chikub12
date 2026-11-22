"""เจนเสียงพากย์ทีละบรรทัดผ่าน VoiceStudio: python3 -I tools/vs_lines.py script.txt outdir [--only 3,5] [--seed 7]
เสียงเดียวกันทุกบรรทัดด้วย description+seed คงที่ ข้ามบรรทัดที่มีไฟล์แล้ว"""
import sys,os,json,urllib.request,argparse,subprocess,time
a=argparse.ArgumentParser();a.add_argument('script');a.add_argument('out');a.add_argument('--only');a.add_argument('--seed',type=int,default=7)
a.add_argument('--engine',default='voxcpm2');a.add_argument('--voice',default='alloy')
a.add_argument('--desc',default='Thai male narrator, deep low calm voice, slow, hushed, slightly eerie storytelling, studio quality')
o=a.parse_args();K=open(os.path.expanduser('~/.voicestudio/key')).read().strip()
L=[l.strip() for l in open(o.script,encoding='utf-8') if l.strip()];os.makedirs(o.out,exist_ok=True)
only={int(x) for x in o.only.split(',')} if o.only else None
for i,t in enumerate(L,1):
    f=os.path.join(o.out,f'{i:02d}.wav')
    if (only and i not in only) or (not only and os.path.exists(f)):continue
    body={'model':o.engine,'voice':o.voice,'input':t,'response_format':'wav','language':'th','seed':o.seed,'description':o.desc}
    t0=time.time();r=urllib.request.Request('http://localhost:3900/v1/audio/speech',data=json.dumps(body).encode(),headers={'Authorization':'Bearer '+K,'Content-Type':'application/json'})
    raw=urllib.request.urlopen(r,timeout=3600).read();tmp=f+'.raw.wav';open(tmp,'wb').write(raw)
    subprocess.run(['ffmpeg','-y','-v','error','-i',tmp,'-ar','44100','-ac','1',f],check=True);os.remove(tmp)
    print(f'{i:02d} {time.time()-t0:5.0f}s {t}',flush=True)
