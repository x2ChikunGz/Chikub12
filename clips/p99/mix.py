import os as _os;HERE=_os.path.dirname(_os.path.abspath(__file__))
import subprocess,re
fx_=lambda x:re.sub(r'(?<![\d])\.(\d)',r'0.\1',x)
L=_os.path.join(HERE,'../../lib/assets/audio/');D=87.92
inp=[];fc=[];lab=[];n=0
def add(args,flt,gain,delay=0):
    global n
    inp.extend(args);fc.append(fx_(f'[{n}:a]{flt},volume={gain},adelay={int(delay*1000)}|{int(delay*1000)}[s{n}]'));lab.append(f'[s{n}]');n+=1
def A(p):return ['-i',L+p]
# voice
inp.extend(['-i',_os.path.join(HERE,'voice.wav')]);fc.append('[0:a]highpass=f=80,loudnorm=I=-14:TP=-1.5:LRA=7,apad=whole_dur=87.92,asplit=2[vo][vsc]');n=1
# dream pad (synth) ducked by voice
pad=[('220',.30),('277.18',.22),('329.63',.22),('440',.12)]
for f,v in pad:
    add(['-f','lavfi','-t',str(D),'-i',f'sine=f={f}:d={D}'],'tremolo=f=0.18:d=0.5,lowpass=f=900,afade=t=in:d=2,afade=t=out:st=85.1:d=2.8',v*0.35)
padstart=1;padn=n-padstart
CUTS=[4.9,8.2,11.2,13.7,16.6,19.0,22.8,26.4,30.0,35.5,41.5,44.5,48.0,51.0,54.2,56.6,59.9,64.3,66.2,68.5,73.6,74.85,77.7,79.3,82.8,85.2,86.1]
for ct in CUTS:add(A('sfx/transition/whoosh-short.mp3'),'anull',.16,ct-.05)
for tt in (1.5,3.0,6.9,9.6,12.8,17.1,20.8,24.8,26.65,27.5,28.4,31.9,36.9,38.0,42.9,45.4,49.0,52.6,53.2,54.3,55.2,57.2,60.6,62.3,64.9,68.7,70.0,75.0,78.5,83.1):add(A('sfx/ui/pop.mp3'),'anull',.3,tt)
add(A('sfx/ui/click.mp3'),'anull',.45,5.75);add(A('sfx/ui/click.mp3'),'anull',.4,4.05)
for tt in (32.2,40.23,48.02,58.33,66.34,72.22):add(A('sfx/impact/impact-bass-2.mp3'),'atrim=0:1.0,afade=t=out:st=.5:d=.5',.45,tt)
add(A('sfx/impact/impact-bass-1.mp3'),'atrim=0:1.0,afade=t=out:st=.5:d=.5',.4,80.61)
add(A('sfx/ui/error.mp3'),'anull',.22,14.9);add(A('sfx/ui/error.mp3'),'anull',.22,12.4)
add(A('sfx/ui/chime.mp3'),'anull',.25,74.05)
for tt in (19.6,77.9,86.3):add(A('sfx/ui/sparkle.mp3'),'anull',.3,tt)
for tt in (9.5,):add(A('sfx/ui/ping.mp3'),'anull',.25,tt)
for tt in (13.8,68.5):add(A('sfx/transition/swoosh_in.wav'),'anull',.3,tt)
for i in range(3):add(A('sfx/ui/message_pop.wav'),'anull',.35,85.27+i*.2)
# mix
sfx=''.join(lab[padn:]);pads=''.join(lab[:padn])
fc.append(f'{pads}amix=inputs={padn}:normalize=0,volume=1.0[pad]')
fc.append(f'[pad][vsc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=400[padd]')
fc.append(f'{sfx}amix=inputs={n-1-padn}:normalize=0[fx]')
fc.append(f'[vo][padd][fx]amix=inputs=3:normalize=0,alimiter=limit=0.95,atrim=0:{D},apad=whole_dur={D}[out]')
cmd=['ffmpeg','-y','-v','error']+inp+['-filter_complex',';'.join(fc),'-map','[out]','-ar','44100','-ac','2',_os.path.join(HERE,'mix.wav')]
r=subprocess.run(cmd,capture_output=True,text=True);print(r.stderr[-1500:] or 'ok')
