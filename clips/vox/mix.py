import os as _os;HERE=_os.path.dirname(_os.path.abspath(__file__))
import subprocess,re
fx_=lambda x:re.sub(r'(?<![\d])\.(\d)',r'0.\1',x)
L=_os.path.join(HERE,'../../lib/assets/audio/');D=66.32
inp=[];fc=[];lab=[];n=0
def add(args,flt,gain,delay=0):
    global n
    inp.extend(args);fc.append(fx_(f'[{n}:a]{flt},volume={gain},adelay={int(delay*1000)}|{int(delay*1000)}[s{n}]'));lab.append(f'[s{n}]');n+=1
def A(p):return ['-i',L+p]
# voice
inp.extend(['-i',_os.path.join(HERE,'voice.wav')]);fc.append('[0:a]highpass=f=80,loudnorm=I=-14:TP=-1.5:LRA=7,apad=whole_dur=66.32,asplit=2[vo][vsc]');n=1
# dream pad (synth) ducked by voice
pad=[('220',.30),('277.18',.22),('329.63',.22),('440',.12)]
for f,v in pad:
    add(['-f','lavfi','-t',str(D),'-i',f'sine=f={f}:d={D}'],'tremolo=f=0.18:d=0.5,lowpass=f=900,afade=t=in:d=2,afade=t=out:st=63.5:d=2.8',v*0.35)
padstart=1;padn=n-padstart
CUTS=[4.8,7.2,12.0,15.0,18.4,22.4,26.5,30.3,33.7,37.2,39.2,42.8,47.4,51.2,52.2,55.3,58.0,61.0,64.4]
for ct in CUTS:add(A('sfx/transition/whoosh-short.mp3'),'anull',.16,ct-.05)
for tt in (1.7,3.0,5.95,12.6,15.5,18.7,22.78,24.85,26.95,34.55,40.77,48.11,52.3,53.1,54.4,55.6,56.2,58.1,59.6,61.2,63.35,64.55):add(A('sfx/ui/pop.mp3'),'anull',.3,tt)
add(A('sfx/ui/click.mp3'),'anull',.45,3.75)
add(A('sfx/impact/impact-bass-2.mp3'),'atrim=0:1.0,afade=t=out:st=.5:d=.5',.5,9.0)
add(A('sfx/impact/impact-bass-1.mp3'),'atrim=0:1.0,afade=t=out:st=.5:d=.5',.45,29.4)
add(A('sfx/ui/error.mp3'),'anull',.25,29.4);add(A('sfx/ui/error.mp3'),'anull',.22,56.7)
add(A('sfx/impact/impact-bass-2.mp3'),'atrim=0:1.0,afade=t=out:st=.5:d=.5',.5,50.0)
add(A('sfx/impact/impact-bass-1.mp3'),'atrim=0:1.0,afade=t=out:st=.5:d=.5',.45,51.2);add(A('sfx/ui/chime.mp3'),'anull',.25,51.3)
for tt in (10.25,48.15,65.2):add(A('sfx/ui/sparkle.mp3'),'anull',.3,tt)
for tt in (58.06,58.4):add(A('sfx/ui/ping.mp3'),'anull',.25,tt)
for tt in (7.3,37.4):add(A('sfx/transition/swoosh_in.wav'),'anull',.3,tt)
for i in range(3):add(A('sfx/ui/message_pop.wav'),'anull',.35,63.0+i*.28)
add(A('sfx/object/pen_scribble.wav'),'atrim=0:.9,afade=t=out:st=.5:d=.4',.25,5.0)
for i in range(6):add(A('sfx/ui/click-soft.mp3'),'anull',.25,44.6+i*.0) if False else None
# mix
sfx=''.join(lab[padn:]);pads=''.join(lab[:padn])
fc.append(f'{pads}amix=inputs={padn}:normalize=0,volume=1.0[pad]')
fc.append(f'[pad][vsc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=400[padd]')
fc.append(f'{sfx}amix=inputs={n-1-padn}:normalize=0[fx]')
fc.append(f'[vo][padd][fx]amix=inputs=3:normalize=0,alimiter=limit=0.95,atrim=0:{D},apad=whole_dur={D}[out]')
cmd=['ffmpeg','-y','-v','error']+inp+['-filter_complex',';'.join(fc),'-map','[out]','-ar','44100','-ac','2',_os.path.join(HERE,'mix.wav')]
r=subprocess.run(cmd,capture_output=True,text=True);print(r.stderr[-1500:] or 'ok')
