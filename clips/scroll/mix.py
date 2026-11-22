import os as _os;HERE=_os.path.dirname(_os.path.abspath(__file__))
import subprocess,re
fx_=lambda x:re.sub(r'(?<![\d])\.(\d)',r'0.\1',x)
L=_os.path.join(HERE,'../../lib/assets/audio/');D=77.92
inp=[];fc=[];lab=[];n=0
def add(args,flt,gain,delay=0):
    global n
    inp.extend(args);fc.append(fx_(f'[{n}:a]{flt},volume={gain},adelay={int(delay*1000)}|{int(delay*1000)}[s{n}]'));lab.append(f'[s{n}]');n+=1
def A(p):return ['-i',L+p]
# voice
inp.extend(['-i',_os.path.join(HERE,'voice.wav')]);fc.append('[0:a]highpass=f=80,loudnorm=I=-14:TP=-1.5:LRA=7,apad=whole_dur=77.92,asplit=2[vo][vsc]');n=1
# dream pad (synth) ducked by voice
pad=[('220',.30),('277.18',.22),('329.63',.22),('440',.12)]
for f,v in pad:
    add(['-f','lavfi','-t',str(D),'-i',f'sine=f={f}:d={D}'],'tremolo=f=0.18:d=0.5,lowpass=f=900,afade=t=in:d=2,afade=t=out:st=75.2:d=2.6',v*0.35)
padstart=1;padn=n-padstart
CUTS=[3.46,5.6,8.55,11.1,13.45,17.55,19.35,22.4,24.7,27.3,29.0,32.2,35.6,40.45,44.3,46.9,50.1,52.3,54.95,57.2,60.1,62.35,65.4,66.5,68.1,70.7,73.2,75.05,76.05]
for ct in CUTS:add(A('sfx/transition/whoosh-short.mp3'),'anull',.16,ct-.05)
for tt in (1.6,3.76,4.76,6.9,9.2,10.3,12.0,14.0,17.9,19.7,22.7,24.9,25.2,27.4,29.6,30.2,32.5,33.4,36.2,41.8,43.13,44.6,45.2,47.4,50.5,55.5,56.0,57.7,58.6,60.5,63.4,64.8,66.7,67.0,68.5,69.6,71.6,73.8,74.2):add(A('sfx/ui/pop.mp3'),'anull',.3,tt)
add(A('sfx/ui/click.mp3'),'anull',.45,6.3);add(A('sfx/ui/click.mp3'),'anull',.4,58.2)
for tt in (27.35,52.67,31.0,65.56,68.3):add(A('sfx/impact/impact-bass-2.mp3'),'atrim=0:1.0,afade=t=out:st=.5:d=.5',.45,tt)
add(A('sfx/ui/error.mp3'),'anull',.22,4.5);add(A('sfx/ui/error.mp3'),'anull',.22,30.2);add(A('sfx/ui/error.mp3'),'anull',.22,56.0);add(A('sfx/ui/error.mp3'),'anull',.22,67.2);add(A('sfx/ui/error.mp3'),'anull',.22,71.4)
add(A('sfx/ui/chime.mp3'),'anull',.25,65.6)
for tt in (11.9,76.1):add(A('sfx/ui/sparkle.mp3'),'anull',.3,tt)
for tt in (10.4,):add(A('sfx/ui/ping.mp3'),'anull',.25,tt)
for tt in (13.5,54.95):add(A('sfx/transition/swoosh_in.wav'),'anull',.3,tt)
for i in range(3):add(A('sfx/ui/message_pop.wav'),'anull',.35,75.12+i*.2)
# mix
sfx=''.join(lab[padn:]);pads=''.join(lab[:padn])
fc.append(f'{pads}amix=inputs={padn}:normalize=0,volume=1.0[pad]')
fc.append(f'[pad][vsc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=400[padd]')
fc.append(f'{sfx}amix=inputs={n-1-padn}:normalize=0[fx]')
fc.append(f'[vo][padd][fx]amix=inputs=3:normalize=0,alimiter=limit=0.95,atrim=0:{D},apad=whole_dur={D}[out]')
cmd=['ffmpeg','-y','-v','error']+inp+['-filter_complex',';'.join(fc),'-map','[out]','-ar','44100','-ac','2',_os.path.join(HERE,'mix.wav')]
r=subprocess.run(cmd,capture_output=True,text=True);print(r.stderr[-1500:] or 'ok')
