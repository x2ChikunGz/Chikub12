"""เสียงพากย์ Google AI (Gemini) TTS
  export GEMINI_API_KEY=...   (จาก aistudio.google.com)
  python3 -I tools/gemini_tts.py --list                       # ดูโมเดล TTS ที่บัญชีใช้ได้
  python3 -I tools/gemini_tts.py "ข้อความ" out.wav [--voice Kore] [--style "เล่าแบบสงสัย ชวนติดตาม"] [--model ชื่อโมเดล] [--file script.txt]
ตั้งค่าโมเดลเริ่มต้นได้ด้วย env GEMINI_TTS_MODEL"""
import os,sys,json,base64,argparse,subprocess,urllib.request
B='https://generativelanguage.googleapis.com/v1beta/'
K=os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY') or 'x'
def req(path,body=None):
    r=urllib.request.Request(B+path,data=json.dumps(body).encode() if body else None,headers={'x-goog-api-key':K,'Content-Type':'application/json'})
    return json.load(urllib.request.urlopen(r,timeout=300))
a=argparse.ArgumentParser();a.add_argument('text',nargs='?');a.add_argument('out',nargs='?');a.add_argument('--list',action='store_true')
a.add_argument('--model',default=os.environ.get('GEMINI_TTS_MODEL','gemini-2.5-pro-preview-tts'));a.add_argument('--voice',default='Kore')
a.add_argument('--style',default='');a.add_argument('--file');a.add_argument('--speed',type=float,default=1.0)
o=a.parse_args()
if o.list:
    for m in req('models?pageSize=1000')['models']:
        if 'tts' in m['name'].lower(): print(m['name'].split('/')[-1],'-',m.get('displayName',''))
    sys.exit()
t=open(o.file,encoding='utf-8').read() if o.file else o.text
if o.style: t=f'{o.style}: {t}'
r=req(f'models/{o.model}:generateContent',{'contents':[{'parts':[{'text':t}]}],'generationConfig':{'responseModalities':['AUDIO'],
  'speechConfig':{'voiceConfig':{'prebuiltVoiceConfig':{'voiceName':o.voice}}}}})
p=r['candidates'][0]['content']['parts'][0]['inlineData'];pcm=base64.b64decode(p['data'])
rate=next((int(x.split('=')[1]) for x in p.get('mimeType','').split(';') if 'rate=' in x),24000)
subprocess.run(['ffmpeg','-y','-v','error','-f','s16le','-ar',str(rate),'-ac','1','-i','-','-af',f'atempo={o.speed}','-ar','44100','-ac','1',o.out],input=pcm,check=True)
print('ok',o.out,o.model,o.voice)
