"""เรนเดอร์ภาพนิ่ง (style frames): python3 -I tools/stills.py clips/<ชื่อ> [n]  -> frames/f1.png.. + frames/sheet.jpg
ต้องมี frames.html ที่โหลด assets/frames.js (นิยาม drawFrame(k,canvas) และ FRAMES)"""
import sys,os,subprocess
from playwright.sync_api import sync_playwright
d=os.path.abspath(sys.argv[1]);o=os.path.join(d,'frames');os.makedirs(o,exist_ok=True)
ex=next((x for x in (os.environ.get('CHROME_PATH'),'/usr/bin/google-chrome','/opt/pw-browsers/chromium') if x and os.path.exists(x)),None)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=ex,args=['--no-sandbox']);pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.on('pageerror',lambda e:print('ERR',e));pg.goto('file://'+os.path.join(d,'frames.html'));pg.evaluate('window.__ready')
    n=int(sys.argv[2]) if len(sys.argv)>2 else pg.evaluate('FRAMES.length')
    for k in range(1,n+1):pg.evaluate(f'drawFrame({k},document.getElementById("scene"))');pg.locator('#scene').screenshot(path=os.path.join(o,f'f{k}.png'))
    b.close()
subprocess.run(['ffmpeg','-y','-v','error','-i',os.path.join(o,'f%d.png'),'-vf','scale=360:640,tile=3x2:padding=8:color=black','-frames:v','1',os.path.join(o,'sheet.jpg')])
print('ok',o)
