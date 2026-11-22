"""เสียงพากย์ Google TTS (ไทย): python3 -I tools/tts.py "ข้อความ" out.wav [--speed 1.15] [--file script.txt]
ใช้ gTTS (ฟรี ไม่ต้องใช้คีย์) แล้วเร่งความเร็ว/แปลงเป็น wav 44.1k mono ด้วย ffmpeg"""
import sys,argparse,subprocess,tempfile,os
from gtts import gTTS
a=argparse.ArgumentParser();a.add_argument('text',nargs='?');a.add_argument('out');a.add_argument('--speed',type=float,default=1.15);a.add_argument('--file');a.add_argument('--lang',default='th')
o=a.parse_args();t=open(o.file,encoding='utf-8').read() if o.file else o.text
with tempfile.TemporaryDirectory() as d:
    mp=os.path.join(d,'t.mp3');gTTS(t,lang=o.lang).save(mp)
    subprocess.run(['ffmpeg','-y','-v','error','-i',mp,'-af',f'atempo={o.speed}','-ar','44100','-ac','1',o.out],check=True)
print('ok',o.out)
