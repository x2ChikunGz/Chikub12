"""Sound design for demo v2 (15s). Every cue is tied to the picture in assets/demo2.js."""
import os, subprocess, re
H = os.path.dirname(os.path.abspath(__file__))
OV = os.path.join(H, '../../lib/assets/audio/openverse/')
SF = os.path.join(H, '../mirror2/sfx/')
LIB = os.path.join(H, '../../lib/assets/audio/')
import json
TJ=open(os.path.join(H,'proj/assets/timing.js'),encoding='utf-8').read()
D=float(re.search(r'DUR=([\d.]+)',TJ).group(1));LN=json.loads(re.search(r'LINE=(\[.*?\]);',TJ,re.S).group(1))
L=lambda i:LN[i-1][0];LE=lambda i:LN[i-1][1]
inp, fc, lab = [], [], []
n = 0

def add(path, gain, at=0.0, flt='anull', ss=0.0, dur=None, pan=0.0, loop=False):
    """one source: seek ss, trim dur, filter, gain, pan (-1..1), delay to `at`"""
    global n
    inp.extend((['-stream_loop', '-1'] if loop else []) + ['-ss', f'{ss:.3f}', '-i', path])
    f = f'[{n}:a]aformat=sample_rates=48000:channel_layouts=stereo'
    if dur: f += f',atrim=0:{dur:.3f}'
    f += f',{flt},volume={gain:.4f}'
    if pan:
        l, r = (1 - max(0, pan)), (1 + min(0, pan))
        f += f',pan=stereo|c0={l:.3f}*c0|c1={r:.3f}*c1'
    f += f',adelay={int(at*1000)}|{int(at*1000)}[s{n}]'
    fc.append(f); lab.append(f'[s{n}]'); n += 1

def env(points):
    """piecewise-linear volume envelope as an ffmpeg expression over t"""
    e = f'{points[-1][1]}'
    for (t0, v0), (t1, v1) in reversed(list(zip(points[:-1], points[1:]))):
        e = f"if(lt(t,{t1}),{v0}+({v1}-{v0})*(t-{t0})/{max(1e-3,t1-t0)},{e})"
    return f"volume='if(lt(t,{points[0][0]}),{points[0][1]},{e})':eval=frame"


# voice (index 0 must be voice for sidechain): add first
inp.extend(['-i', os.path.join(H,'voice.wav')]); fc.append('[0:a]aformat=sample_rates=48000:channel_layouts=stereo,highpass=f=70,acompressor=threshold=0.12:ratio=2.5:attack=10:release=150,loudnorm=I=-17:TP=-2:LRA=11,volume=\'if(between(t,41.3,56.3),1.2,if(lt(t,20.8),0.72,0.82))\':eval=frame,asplit=2[vo][vsc]'); n=1
beds=[];fx=[]
def bed(*a,**k): add(*a,**k); beds.append(lab.pop())
def sfx(*a,**k): add(*a,**k); fx.append(lab.pop())
OUT=20.78; HIT=L(13)+(LE(13)-L(13))*.62; STOP=44.59+1.1; PIC=47.45; BLACK=54.4+1.69
bed(OV+'suspense_strings_b22c3e69.mp3',1.0,0,env([(0,.06),(20,.08),(41,.14),(HIT,.3),(STOP,.0),(PIC,.12),(54.2,.3),(54.3,0),(56.5,.0),(57,.12),(D,.06)]),ss=40,dur=D)
bed(OV+'horror_ambient_34564eb0.mp3',1.0,0,env([(0,.12),(OUT,.16),(41,.25),(STOP,.32),(54.2,.4),(54.3,0),(57,.2),(D,.1)]),ss=5,dur=D,loop=True)
bed(OV+'night_rain_97bb5ca0.mp3',1.0,0,env([(0,.5),(OUT-.1,.45),(OUT,.12),(54.2,.08),(54.3,0),(D,0)])+',lowpass=f=9000',ss=30,dur=D)
bed(OV+'rain_on_roof_97cc535b.mp3',1.0,8.49,env([(0,.4),(12.2,.4),(12.3,0)])+',highpass=f=900',ss=2,dur=12.3,pan=-.2,loop=True)
# lightning (d2s1 flash 2.30/2.48)
sfx(OV+'thunder_79b7d9cd.mp3',1.4,2.62,'afade=t=out:st=5:d=2',dur=7); sfx(SF+'deep_cinematic_boom_impact.wav',.3,2.32)
# cuts: soft whoosh + light hit
for t in [3.6,6.88,8.49,12.79,15.37,16.86,20.78,22.76,25.91,29.17,34.0,38.27,41.32,44.59,47.45,51.07,54.4]:
    sfx(SF+'soft_whoosh.wav',.16,t-.2); sfx(SF+'deep_cinematic_boom_impact.wav',.1,t)
# footsteps on the veranda (walk contacts)
steps=[0.417,1.579,2.47575,3.4079,4.48706,5.89902,6.70923]
for i,k in enumerate([.345,.92,1.495,2.07,2.645,3.22,3.795]):
    sfx(OV+'footsteps_wood_floor_27ecb09a.mp3',.7,8.49+k-.02,'afade=t=out:st=0.25:d=0.12',ss=max(0,steps[i]-.03),dur=.38,pan=-.3)
# phone call
sfx(OV+'phone_vibrate_f217c877.mp3',.5,12.5,'afade=t=out:st=0.6:d=0.3',dur=.9)
# flashback: reverse swell in, low drone
sfx(SF+'reverse_swell.wav',.35,OUT-1.3); sfx(SF+'low_drone_hum.wav',.3,OUT,'afade=t=out:st=1.5:d=0.5',dur=2.0)
# door
sfx(OV+'door_creak_22283eb6.mp3',.8,21.63,'atempo=0.9,afade=t=in:d=0.08,afade=t=out:st=1.5:d=0.4',ss=.2,dur=2.1); sfx(LIB+'sfx/ui/click.mp3',.45,21.5)
# TV static: synthesized, room level; loud at the re-hook; dies at STOP
inp.extend(['-f','lavfi','-t',f'{STOP-22.76:.2f}','-i','anoisesrc=color=white:amplitude=0.6:sample_rate=48000'])
fc.append(f"[{n}:a]aformat=channel_layouts=stereo,bandpass=f=3200:width_type=o:w=1.6,tremolo=f=9:d=0.35,"+env([(0,.16),(3.1,.1),(18.5,.08),(18.6,.25),(STOP-22.76-.05,.3),(STOP-22.76,0)])+f",adelay={22760}|{22760}[s{n}]"); fx.append(f'[s{n}]'); n+=1
# clue chips pop + calendar pen + phone notification
for t in [26.11,30.97,36.2]: sfx(LIB+'sfx/ui/pop.mp3',.35,t)
sfx(LIB+'sfx/object/pen_scribble.wav',.4,29.6,'atrim=0:0.7')
sfx(LIB+'sfx/ui/notification.mp3',.3,38.4)
# re-hook hit
sfx(SF+'tension_riser_long.wav',.5,HIT-3.43); sfx(SF+'deep_cinematic_boom_impact.wav',1.1,HIT); sfx(SF+'sub_bass_drop.wav',.9,HIT); sfx(SF+'glitch_stutter.wav',.35,HIT)
# static stops: dead silence click
sfx(SF+'glitch_stutter.wav',.3,STOP-.05)
# TV picture: music box from a small speaker
sfx(OV+'creepy_music_box_1a3e86e4.mp3',1.0,PIC,'highpass=f=350,lowpass=f=3200,'+env([(0,0),(.4,.45),(6.6,.5),(6.9,0)]),dur=7.0)
sfx(OV+'heartbeat_b61439e8.mp3',1.0,51.2,env([(0,.3),(3.0,.75),(3.1,0)]),dur=3.2,loop=True)
# silence before the whisper (beds ducked 54.3-54.7), then black + stinger after it
sfx(OV+'horror_stinger_bc0736d4.mp3',1.7,BLACK,'afade=t=out:st=0.4:d=0.25',dur=.65); sfx(SF+'deep_cinematic_boom_impact.wav',1.0,BLACK); sfx(SF+'sub_bass_drop.wav',.5,BLACK+.01)
sfx(LIB+'sfx/ui/sparkle.mp3',.18,57.0)
fc.append(''.join(beds)+f'amix=inputs={len(beds)}:normalize=0[bd]')
fc.append('[bd][vsc]sidechaincompress=threshold=0.05:ratio=5:attack=15:release=300[bdd]')
fc.append(''.join(fx)+f'amix=inputs={len(fx)}:normalize=0[fxx]')
fc.append(f'[vo][bdd][fxx]amix=inputs=3:normalize=0,atrim=0:{D},apad=whole_dur={D}[pre]')
def run(extra, out):
    g = ';'.join(fc + [f'[pre]{extra}[out]'])
    r = subprocess.run(['ffmpeg', '-y', '-v', 'error'] + inp + ['-filter_complex', g, '-map', '[out]', '-ar', '48000', '-ac', '2', out], capture_output=True, text=True)
    if r.returncode: print(r.stderr[-1500:]); raise SystemExit(1)
# pass 1: measure, pass 2: gain to -17 LUFS integrated, keep dynamics, true-peak limit
PRE='highpass=f=35,extrastereo=m=0.55,equalizer=f=500:t=q:w=1:g=2.5,'
tmp = os.path.join(H, 'mix_raw.wav'); run(PRE+'alimiter=limit=0.95', tmp)
m = subprocess.run(['ffmpeg', '-nostats', '-i', tmp, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', m)[-1]); gain = 10 ** ((-17.0 - I) / 20)
run(PRE+f'volume={gain:.4f},alimiter=limit=0.84:level=false', os.path.join(H, 'mix.wav'))
print('raw I', I, 'gain', round(gain, 3))
