import os as _os;HERE=_os.path.dirname(_os.path.abspath(__file__))
import sys,os
from playwright.sync_api import sync_playwright
out=sys.argv[1];times=[float(x) for x in sys.argv[2:]]
os.makedirs(out,exist_ok=True)
with sync_playwright() as p:
    _ex=next((x for x in (_os.environ.get('CHROME_PATH'),'/usr/bin/google-chrome','/opt/pw-browsers/chromium') if x and _os.path.exists(x)),None);b=p.chromium.launch(executable_path=_ex,args=['--no-sandbox']);pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.on('pageerror',lambda e:print('ERR',e))
    pg.on('console',lambda m:print('console:',m.text) if m.type in('error','warning') else None)
    pg.goto('file://'+_os.path.join(HERE,'cap.html'))
    for t in times:
        pg.evaluate('window.__ready');pg.evaluate(f'cap({t})');pg.screenshot(path=f'{out}/t_{t:06.2f}.png')
    b.close()
