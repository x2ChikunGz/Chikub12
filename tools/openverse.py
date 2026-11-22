"""ค้น/โหลดเสียงฟรีจาก Openverse: python3 -I tools/openverse.py "whoosh" [จำนวน] [--get N] [--dir lib/assets/audio/openverse]
แสดงเฉพาะไลเซนส์ใช้เชิงพาณิชย์ได้ (cc0,pdm,by) ตอนโหลดจะเขียนเครดิตต่อท้าย CREDITS.md ให้อัตโนมัติ"""
import sys,json,os,argparse,urllib.request,urllib.parse
a=argparse.ArgumentParser();a.add_argument('q');a.add_argument('n',nargs='?',type=int,default=10);a.add_argument('--get',type=int,nargs='*');a.add_argument('--dir',default=os.path.join(os.path.dirname(os.path.abspath(__file__)),'../lib/assets/audio/openverse'))
o=a.parse_args()
u='https://api.openverse.org/v1/audio/?'+urllib.parse.urlencode({'q':o.q,'page_size':o.n,'license':'cc0,pdm,by'})
H={'User-Agent':'clip-kit/1.0'}
r=json.load(urllib.request.urlopen(urllib.request.Request(u,headers=H)))['results']
for i,x in enumerate(r):print(f"{i:2} {x['license']:4} {(x.get('duration') or 0)/1000:6.1f}s {x['title'][:50]:50} {x.get('creator') or ''}")
for i in o.get or []:
    x=r[i];os.makedirs(o.dir,exist_ok=True);ext=(x.get('filetype') or 'mp3').split('/')[-1]
    fn=os.path.join(o.dir,f"{o.q.replace(' ','_')}_{x['id'][:8]}.{ext}")
    open(fn,'wb').write(urllib.request.urlopen(urllib.request.Request(x['url'],headers=H)).read())
    cr=os.path.join(o.dir,'../CREDITS.md');open(cr,'a').write(f"| openverse/{os.path.basename(fn)} | {x['license'].upper()} {x.get('license_version','')} | {x['title']} by {x.get('creator')} ({x['foreign_landing_url']}) |\n")
    print('saved',fn)
