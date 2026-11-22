import os as _os;HERE=_os.path.dirname(_os.path.abspath(__file__))
import subprocess,re
fx_=lambda x:re.sub(r'(?<![\d])\.(\d)',r'0.\1',x)
L=_os.path.join(HERE,'../../lib/assets/audio/');D=58.3
inp=[];fc=[];lab=[];n=0
def add(args,flt,gain,delay=0):
    global n
    inp.extend(args);fc.append(fx_(f'[{n}:a]{flt},volume={gain},adelay={int(delay*1000)}|{int(delay*1000)}[s{n}]'));lab.append(f'[s{n}]');n+=1
def A(p):return ['-i',L+p]
# voice
inp.extend(['-i',_os.path.join(HERE,'voice.wav')]);fc.append('[0:a]highpass=f=80,loudnorm=I=-14:TP=-1.5:LRA=7,apad=whole_dur=58.3,asplit=2[vo][vsc]');n=1
# dream pad (synth) ducked by voice
pad=[('220',.30),('277.18',.22),('329.63',.22),('440',.12)]
for f,v in pad:
    add(['-f','lavfi','-t',str(D),'-i',f'sine=f={f}:d={D}'],'tremolo=f=0.18:d=0.5,lowpass=f=900,afade=t=in:d=2,afade=t=out:st=55.5:d=2.8',v*0.35)
padstart=1;padn=n-padstart
# ghost drone
add(A('music/suspense/dark_drone_loop.wav'),'atrim=0:6,afade=t=in:d=1.2,afade=t=out:st=4.5:d=1.4',.5,52.9)
add(['-i',L+'foley/human/heartbeat.wav'],'atrim=0:3.5,afade=t=in:d=.4,afade=t=out:st=2.8:d=.6',.45,53.9)
CUTS=[3.44,5.4,7.2,9.0,11.9,14.9,17.6,20.4,22.95,24.6,26.7,28.9,31.7,34.5,40.0,45.8,50.6]
for ct in CUTS:add(A('sfx/transition/whoosh-short.mp3'),'anull',.16,ct-.05)
for tt in (6.45,7.55,20.5,40.93,42.77,44.38,46.97,52.77,56.85):add(A('sfx/ui/pop.mp3'),'anull',.38,tt)
for tt in (13.2,33.2,48.95):add(A('sfx/impact/impact-bass-2.mp3'),'atrim=0:1.0,afade=t=out:st=.5:d=.5',.5,tt)
add(A('sfx/impact/impact-bass-1.mp3'),'atrim=0:1.0,afade=t=out:st=.5:d=.5',.45,38.6);add(A('sfx/ui/chime.mp3'),'anull',.25,38.7)
add(A('sfx/impact/impact-bass-1.mp3'),'atrim=0:1.0,afade=t=out:st=.5:d=.5',.4,37.45);add(A('sfx/ui/error.mp3'),'anull',.25,37.45)
add(A('sfx/ui/error.mp3'),'anull',.22,25.5)
for i in range(9):add(A('sfx/object/paper_rustle.wav'),'atrim=0:.5',.35,17.95+i*.25)
for tt in (15.55,29.45):add(A('sfx/object/pen_scribble.wav'),'atrim=0:.9,afade=t=out:st=.5:d=.4',.35,tt)
for tt in (14.9,28.9):add(A('sfx/transition/swoosh_in.wav'),'anull',.3,tt)
for tt in (28.0,56.7,23.1):add(A('sfx/ui/sparkle.mp3'),'anull',.3,tt)
for i in range(14):add(A('sfx/ui/click-soft.mp3'),'anull',.3,35.2+i*.2)
add(A('sfx/transition/riser_tension.wav'),'atrim=0:2.4,afade=t=in:d=.4',.35,52.8)
add(A('sfx/impact/glitch_zap.wav'),'anull',.55,55.14);add(A('sfx/impact/impact_low_boom.wav'),'anull',.65,55.14);add(A('sfx/transition/glitch-3.mp3'),'anull',.3,55.3)
add(A('sfx/object/light_switch.wav'),'anull',.6,55.95)
# mix
sfx=''.join(lab[padn:]);pads=''.join(lab[:padn])
fc.append(f'{pads}amix=inputs={padn}:normalize=0,volume=1.0[pad]')
fc.append(f'[pad][vsc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=400[padd]')
fc.append(f'{sfx}amix=inputs={n-1-padn}:normalize=0[fx]')
fc.append(f'[vo][padd][fx]amix=inputs=3:normalize=0,alimiter=limit=0.95,atrim=0:{D},apad=whole_dur={D}[out]')
cmd=['ffmpeg','-y','-v','error']+inp+['-filter_complex',';'.join(fc),'-map','[out]','-ar','44100','-ac','2',_os.path.join(HERE,'mix.wav')]
r=subprocess.run(cmd,capture_output=True,text=True);print(r.stderr[-1500:] or 'ok')
