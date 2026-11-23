"""เจนเสียงพากย์หลายตัวละคร: python3 -I tools/vs_cast.py clips/<ชื่อ>/script.tsv clips/<ชื่อ>/vo cast.json [--only 3,5] [--seed-override 5:11]
script.tsv = <ผู้พูด>\t<ข้อความ>; cast.json = {"N":{"voice":"a65bda65","seed":7}, "X":{"copy":"samples/x.wav"}, ...}"""
import sys,os,json,argparse,urllib.request,subprocess,shutil,time
a=argparse.ArgumentParser();a.add_argument('script');a.add_argument('out');a.add_argument('cast');a.add_argument('--only');a.add_argument('--seed',action='append',default=[])
o=a.parse_args();K=open(os.path.expanduser('~/.voicestudio/key')).read().strip();cast=json.load(open(o.cast));base=os.path.dirname(os.path.abspath(o.cast))
L=[l.rstrip('\n').split('\t',1) for l in open(o.script,encoding='utf-8') if l.strip()];os.makedirs(o.out,exist_ok=True)
only={int(x) for x in o.only.split(',')} if o.only else None;so={int(k):int(v) for k,v in (s.split(':') for s in o.seed)}
for i,(sp,t) in enumerate(L,1):
    f=os.path.join(o.out,f'{i:02d}.wav')
    if (only and i not in only) or (not only and os.path.exists(f)):continue
    c=cast[sp]
    if 'copy' in c:shutil.copy(os.path.join(base,c['copy']),f);print(f'{i:02d} {sp} copied');continue
    body={'model':'voxcpm2','voice':c['voice'],'input':t,'response_format':'wav','language':'th','seed':so.get(i,c.get('seed',7))}
    t0=time.time();r=urllib.request.Request('http://localhost:3900/v1/audio/speech',data=json.dumps(body).encode(),headers={'Authorization':'Bearer '+K,'Content-Type':'application/json'})
    raw=urllib.request.urlopen(r,timeout=1800).read();tmp=f+'.raw.wav';open(tmp,'wb').write(raw)
    subprocess.run(['ffmpeg','-y','-v','error','-nostdin','-i',tmp,'-ar','44100','-ac','1',f],check=True);os.remove(tmp)
    print(f'{i:02d} {sp} {time.time()-t0:4.0f}s {t}',flush=True)
