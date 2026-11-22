"""Video QA: python3 -I tools/video_qa.py clips/<name>/<name>.mp4 [--max-mb 200]
เช็กสเปก/ความดัง/เฟรมดำ-ค้าง/ซับเกินกรอบ/ซาวด์ตรงรอยตัด แล้วทำ contact sheet + qa_report.json
exit 0 = ผ่านทุกข้อบังคับ, 1 = มีข้อไม่ผ่าน"""
import sys,os,re,json,subprocess,argparse
a=argparse.ArgumentParser();a.add_argument('mp4');a.add_argument('--max-mb',type=float,default=200);a.add_argument('--max-dur',type=float,default=95)
o=a.parse_args();f=os.path.abspath(o.mp4);d=os.path.dirname(f);R=[];ok=True
def chk(name,passed,detail,hard=True):
    global ok
    R.append({'check':name,'pass':bool(passed),'detail':detail,'hard':hard})
    if hard and not passed: ok=False
def run(c):return subprocess.run(c,capture_output=True,text=True)
pr=json.loads(run(['ffprobe','-v','error','-show_entries','stream=codec_type,codec_name,width,height,r_frame_rate,pix_fmt,profile,sample_rate,channels:format=duration,size','-of','json',f]).stdout)
v=next(s for s in pr['streams'] if s['codec_type']=='video');au=next((s for s in pr['streams'] if s['codec_type']=='audio'),None);dur=float(pr['format']['duration']);mb=int(pr['format']['size'])/1048576
chk('video 1080x1920 h264 yuv420p',(v['width'],v['height'],v['codec_name'],v['pix_fmt'])==(1080,1920,'h264','yuv420p'),f"{v['width']}x{v['height']} {v['codec_name']} {v['pix_fmt']} {v.get('profile')}")
chk('30 fps',v['r_frame_rate']=='30/1',v['r_frame_rate'])
chk('audio aac stereo',au is not None and au['codec_name']=='aac' and int(au['channels'])==2,str(au and (au['codec_name'],au['channels'],au['sample_rate'])))
chk(f'size <= {o.max_mb:.0f} MB',mb<=o.max_mb,f'{mb:.1f} MB')
chk(f'duration <= {o.max_dur:.0f}s (ถ้าเกินต้องแจ้งผู้ใช้)',dur<=o.max_dur,f'{dur:.1f}s',hard=False)
# loudness
ln=run(['ffmpeg','-nostats','-i',f,'-af','ebur128=peak=true','-f','null','-']).stderr
I=re.findall(r'I:\s+(-?[\d.]+) LUFS',ln);TP=re.findall(r'Peak:\s+(-?[\d.]+) dBFS',ln)
if I:chk('loudness -16..-12 LUFS',-16<=float(I[-1])<=-12,f'{I[-1]} LUFS')
if TP:chk('true peak <= -1.0 dBTP',float(TP[-1])<=-1.0,f'{TP[-1]} dBTP')
# black / frozen
bl=run(['ffmpeg','-nostats','-i',f,'-vf','blackdetect=d=0.5:pix_th=0.06','-an','-f','null','-']).stderr
bs=[(float(x),float(y)) for x,y in re.findall(r'black_start:([\d.]+) black_end:([\d.]+)',bl)]
bad=[b for b in bs if b[0]>0.5 and b[1]<dur-1.5]
chk('ไม่มีจอดำค้าง >0.5s กลางคลิป',not bad,str(bad) if bad else 'none')
fz=run(['ffmpeg','-nostats','-i',f,'-vf','freezedetect=n=-60dB:d=3','-an','-f','null','-']).stderr
fzs=re.findall(r'freeze_start: ([\d.]+)',fz)
chk('ไม่มีภาพค้าง >3s',not fzs,str(fzs) if fzs else 'none',hard=False)
# silence in middle
sl=run(['ffmpeg','-nostats','-i',f,'-af','silencedetect=noise=-50dB:d=1.5','-f','null','-']).stderr
ss=[(float(x),float(y)) for x,y in re.findall(r'silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)',sl)]
chk('ไม่มีเสียงเงียบ >1.5s (ยกเว้นตั้งใจ)',not ss,str(ss) if ss else 'none',hard=False)
# contact sheet
sheet=os.path.join(d,'qa_contact.jpg');run(['ffmpeg','-y','-v','error','-i',f,'-vf',f'fps=1/{max(2,round(dur/36))},scale=180:320,tile=9x4','-frames:v','1',sheet])
# caption safe-zone: scan rows y>1380 .. y<1620 expected caption, flag bright text above y=1380 handled visually -> save 5 full frames for subagent to view
fr=os.path.join(d,'qa_frames');os.makedirs(fr,exist_ok=True)
for i,t in enumerate([dur*k for k in (.04,.2,.4,.6,.8,.96)]):run(['ffmpeg','-y','-v','error','-ss',f'{t:.2f}','-i',f,'-frames:v','1','-vf','scale=540:960',os.path.join(fr,f'f{i}.jpg')])
# earshot
es=run(['bash','-lc','export PATH=$HOME/.local/bin:$PATH; earshot timeline "%s" 2>&1|head -1'%f]).stdout.strip()
rep={'file':f,'duration':dur,'size_mb':round(mb,1),'results':R,'contact_sheet':sheet,'frames_dir':fr,'earshot':es[:600],'pass':ok}
json.dump(rep,open(os.path.join(d,'qa_report.json'),'w'),ensure_ascii=False,indent=1)
for r in R:print(('PASS' if r['pass'] else ('FAIL' if r['hard'] else 'WARN')),r['check'],'|',r['detail'])
print('contact sheet:',sheet);print('OVERALL','PASS' if ok else 'FAIL');sys.exit(0 if ok else 1)
