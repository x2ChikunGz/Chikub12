"""Sound design for demo v2 (15s). Every cue is tied to the picture in assets/demo2.js."""
import os, subprocess, re
H = os.path.dirname(os.path.abspath(__file__))
OV = os.path.join(H, '../../lib/assets/audio/openverse/')
SF = os.path.join(H, '../mirror2/sfx/')
LIB = os.path.join(H, '../../lib/assets/audio/')
D = 15.0
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

# --- score + beds (dynamics written as envelopes) ---
add(OV+'suspense_strings_b22c3e69.mp3', 1.0, 0, env([(0,.0),(.6,.07),(3.5,.06),(7.2,.08),(10.4,.16),(12.5,.34),(13.95,.6),(14.0,.0),(15,0)]), ss=24, dur=D)
add(OV+'horror_ambient_34564eb0.mp3', 1.0, 0, env([(0,.12),(7,.14),(12.5,.25),(13.9,.5),(14.0,0),(15,0)]), ss=10, dur=D)
# rain: outside loud (S1), veranda (S2, + roof patter on the umbrella), inside muffled (S3-S5)
add(OV+'night_rain_97bb5ca0.mp3', 1.0, 0, env([(0,.45),(.15,.6),(3.6,.6),(3.62,.35),(7.2,.32),(7.22,.12),(13.9,.1),(14.0,0),(15,0)])+',lowpass=f=9000', ss=30, dur=D)
add(OV+'rain_on_roof_97cc535b.mp3', 1.0, 3.6, env([(0,0),(.1,.55),(3.5,.55),(3.6,0)])+',highpass=f=900', ss=2, dur=3.6, pan=-.25)
# lightning at 2.30 / 2.48 -> thunder crack + rumble, delayed (distance)
add(OV+'thunder_79b7d9cd.mp3', .95, 2.62, 'afade=t=out:st=5:d=2', ss=0, dur=7)
add(SF+'deep_cinematic_boom_impact.wav', .35, 2.32)
# cut whooshes, very low
for t in (3.6, 7.2, 10.4, 13.3):
    add(SF+'dark_whoosh.wav', .3, t-.5)
    add(SF+'deep_cinematic_boom_impact.wav', .22, t)
add(SF+'deep_cinematic_boom_impact.wav', .28, 2.47)
add(SF+'glitch_stutter.wav', .2, 12.55)
# interior: a wall clock ticking (room is silent but for the TV)
for k in range(9):
    add(LIB+'sfx/object/clock_tick.wav', .22, 10.45+k*.33)
# umbrella patter: denser drops on the fabric during the walk
for k in range(16):
    add(SF+'metallic_shimmer.wav', .05, 3.7+k*.21, 'highpass=f=2500')
# door latch click as the palm presses
add(LIB+'sfx/ui/click.mp3', .5, 7.95)
# footsteps on the veranda: contact frames of the walk cycle (phase=(lt/1.15+.2)%1 hits 0 and .5)
steps = [0.417, 1.579, 2.47575, 3.4079, 4.48706, 5.89902]
for i, k in enumerate([.345, .92, 1.495, 2.07, 2.645, 3.22]):
    add(OV+'footsteps_wood_floor_27ecb09a.mp3', .75, 3.6+k-.02, 'afade=t=out:st=0.25:d=0.12', ss=max(0, steps[i]-.03), dur=.38, pan=-.3)
# door creak follows the opening curve (opens lt .9-2.5 of S3 -> 8.1-9.7)
add(OV+'door_creak_22283eb6.mp3', .8, 8.05, 'atempo=0.9,afade=t=in:d=0.08,afade=t=out:st=1.5:d=0.4', ss=.2, dur=2.1)
add(OV+'door_creak_83976ac4.mp3', .45, 8.0, 'anull', dur=1.4)
# TV static: synthesized band-limited noise; faint through the gap, loud in the room, dies at 12.55
inp.extend(['-f', 'lavfi', '-t', '6', '-i', 'anoisesrc=color=white:amplitude=0.6:sample_rate=48000'])
fc.append(f"[{n}:a]aformat=channel_layouts=stereo,bandpass=f=3200:width_type=o:w=1.6,tremolo=f=9:d=0.35,"
          + env([(0,0),(.4,.05),(2.2,.12),(2.3,.22),(4.3,.26),(4.35,0),(6,0)]) + f",adelay={int(8.2*1000)}|{int(8.2*1000)}[s{n}]")
lab.append(f'[s{n}]'); n += 1
# the TV picture: a music box from a small speaker (band-limited), from 12.55
add(OV+'creepy_music_box_1a3e86e4.mp3', 1.0, 12.55, 'highpass=f=350,lowpass=f=3200,' + env([(0,.0),(.2,.5),(1.3,.6),(1.45,0)]), ss=0, dur=1.5)
# heartbeat rising in the close-up
add(OV+'heartbeat_b61439e8.mp3', 1.0, 13.2, env([(0,.3),(.7,.7),(.79,0)]), dur=.85)
add(SF+'tension_riser_long.wav', .8, 13.95-3.43, 'afade=t=out:st=3.38:d=0.05', dur=3.43)
# real silence 14.00-14.35, then the stinger on the cut to black
add(OV+'horror_stinger_bc0736d4.mp3', 1.1, 14.35, 'afade=t=out:st=0.4:d=0.25', ss=0, dur=.65)
add(SF+'deep_cinematic_boom_impact.wav', .75, 14.35)
add(SF+'sub_bass_drop.wav', .6, 14.36)

fc.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0,atrim=0:{D},apad=whole_dur={D}[pre]')
def run(extra, out):
    g = ';'.join(fc + [f'[pre]{extra}[out]'])
    r = subprocess.run(['ffmpeg', '-y', '-v', 'error'] + inp + ['-filter_complex', g, '-map', '[out]', '-ar', '48000', '-ac', '2', out], capture_output=True, text=True)
    if r.returncode: print(r.stderr[-1500:]); raise SystemExit(1)
# pass 1: measure, pass 2: gain to -17 LUFS integrated, keep dynamics, true-peak limit
PRE='highpass=f=35,extrastereo=m=0.55,equalizer=f=500:t=q:w=1:g=2.5,'
tmp = os.path.join(H, 'mix2_raw.wav'); run(PRE+'alimiter=limit=0.95', tmp)
m = subprocess.run(['ffmpeg', '-nostats', '-i', tmp, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', m)[-1]); gain = 10 ** ((-17.0 - I) / 20)
run(PRE+f'volume={gain:.4f},alimiter=limit=0.84:level=false', os.path.join(H, 'mix2.wav'))
print('raw I', I, 'gain', round(gain, 3))
