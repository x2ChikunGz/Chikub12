"""สร้างปกคลิป 1080x1920: python3 -I tools/cover.py clips/<ชื่อ>   (ต้องมี proj/assets/cover.js ที่นิยาม drawCoverOn(canvas))
ได้ clips/<ชื่อ>/cover.png"""
import sys,os
from playwright.sync_api import sync_playwright
d=os.path.abspath(sys.argv[1]);out=os.path.join(d,'cover.png')
ex=next((x for x in (os.environ.get('CHROME_PATH'),'/usr/bin/google-chrome','/opt/pw-browsers/chromium') if x and os.path.exists(x)),None)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=ex,args=['--no-sandbox']);pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.on('pageerror',lambda e:print('ERR',e))
    pg.goto('file://'+os.path.join(d,'cap.html'));pg.evaluate('window.__ready')
    pg.add_script_tag(path=os.path.join(d,'proj/assets/cover.js'))
    pg.evaluate('drawCoverOn(document.getElementById("scene"))')
    pg.locator('#scene').screenshot(path=out);b.close()
print('ok',out)
