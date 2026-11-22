import os,re,json,subprocess
H=os.path.dirname(os.path.abspath(__file__));LIB=os.path.join(H,'../../lib/assets/audio/');SF=os.path.join(H,'sfx/');OV=LIB+'openverse/'
s=open(os.path.join(H,'proj/assets/timing.js'),encoding='utf-8').read()
D=float(re.search(r'DUR=([\d.]+)',s).group(1));LN=json.loads(re.search(r'LINE=(\[.*?\]);',s,re.S).group(1));CP=json.loads(re.search(r'CAPS=(\[.*\]);',s,re.S).group(1))
L=lambda i:LN[i-1][0];LE=lambda i:LN[i-1][1];cut=lambda i:(LE(i-1)+L(i))/2
HIT=L(10)+(LE(10)-L(10))*.62;DEM=L(15)+1.4;BLINK=CP[2][0]+.15+.55
inp=[];fc=[];lab=[];n=0
def add(path,gain,at=0,flt='anull',loop=False,dur=None):
    global n
    a=(['-stream_loop','-1'] if loop else [])+['-i',path];inp.extend(a)
    f=f'[{n}:a]aformat=sample_rates=44100:channel_layouts=stereo,{flt}'
    if dur:f+=f',atrim=0:{dur:.3f},afade=t=out:st={max(0,dur-.8):.3f}:d=0.8'
    fc.append(f+f',volume={gain},adelay={int(at*1000)}|{int(at*1000)}[s{n}]');lab.append(f'[s{n}]');n+=1
# voice (idx0): cleanup + subtle room
inp+=['-i',os.path.join(H,'voice.wav')];fc.append('[0:a]highpass=f=75,lowpass=f=12500,acompressor=threshold=0.08:ratio=3:attack=8:release=120,loudnorm=I=-15:TP=-1.5:LRA=7,aformat=channel_layouts=stereo,asplit=2[vd][vsc]');n=1
fc.append('[vd]asplit=2[v1][v2];[v2]aecho=0.8:0.5:60|110:0.18|0.10,volume=0.35[ve];[v1][ve]amix=inputs=2:normalize=0[vo]')
beds=[]
def bed(path,gain,a,b,flt='anull'):
    add(path,gain,a,flt+f',afade=t=in:d=1.2',loop=True,dur=b-a);beds.append(lab[-1])
# beds (ducked by voice)
bed(OV+'room_tone_night_decbf6f4.mp3',.18,0,D)
bed(SF+'music_bed.wav',.20,.0,L(10)-.6,'lowpass=f=5000')
bed(OV+'dark_ambience_drone_6486614e.mp3',.30,L(6)-.5,L(10)-.5)
bed(OV+'dark_ambience_drone_6486614e.mp3',.38,HIT,LE(15)+.6)
bed(SF+'music_bed.wav',.16,cut(17),D-0.3,'lowpass=f=4000,aresample=44100')
bed(SF+'candle_flame_flicker.wav',.35,0,cut(5))
bed(SF+'low_drone_hum.wav',.30,cut(20),D)
fx=[]
def sfx(p,g,at,flt='anull'):add(p,g,at,flt);fx.append(lab[-1])
# hook
sfx(SF+'reverse_swell.wav',.35,BLINK-1.3);sfx(SF+'deep_cinematic_boom_impact.wav',.55,BLINK);sfx(SF+'glitch_stutter.wav',.35,BLINK);sfx(SF+'sub_bass_drop.wav',.45,BLINK+.05)
sfx(OV+'horror_whisper_bae2b772.mp3',.10,L(2)-.2,'atrim=0:2.5,afade=t=out:st=1.8:d=0.7')
# cuts whoosh
for i in range(3,23):
    if i in (10,16):continue
    sfx(SF+'dark_whoosh.wav' if i in (3,7,11,17,20) else SF+'soft_whoosh.wav',.22,cut(i)-.25)
sfx(SF+'cloth_drape.wav',.6,L(4)+.5);sfx(SF+'cloth_drape.wav',.35,L(4)+1.1)
sfx(LIB+'foley/human/breath.wav',.25,L(5)+.3)
sfx(OV+'glass_crack_93438db4.mp3',.6,L(6)+1.6);sfx(SF+'glitch_stutter.wav',.3,L(6)+1.6);sfx(OV+'horror_whisper_0862bb39.mp3',.12,L(6)+.2,'atrim=0:4,afade=t=out:st=3:d=1')
sfx(LIB+'sfx/object/clock_tick.wav',.25,L(8))
# re-hook: riser -> silence -> hit
sfx(SF+'tension_riser_long.wav',.45,HIT-3.43);sfx(SF+'deep_cinematic_boom_impact.wav',.7,HIT);sfx(SF+'sub_bass_drop.wav',.6,HIT);sfx(OV+'glass_crack_93438db4.mp3',.55,HIT);sfx(SF+'glitch_stutter.wav',.4,HIT)
sfx(SF+'metallic_shimmer.wav',.25,L(11)+1.0);sfx(LIB+'sfx/ui/click.mp3',.4,L(11)+1.0)
for k in range(9):sfx(LIB+'sfx/object/clock_tick.wav',.18,L(12)+k*.55)
sfx(OV+'heartbeat_b61439e8.mp3',.35,L(13)-.3);sfx(SF+'glitch_stutter.wav',.25,L(13)+1.2)
sfx(SF+'reverse_swell.wav',.3,L(14)+.5-1.3);sfx(OV+'heartbeat_b61439e8.mp3',.3,L(14))
sfx(SF+'tension_riser_long.wav',.35,DEM-3.43);sfx(SF+'deep_cinematic_boom_impact.wav',.65,DEM);sfx(SF+'sub_bass_drop.wav',.55,DEM);sfx(OV+'horror_whisper_bae2b772.mp3',.18,DEM,'atrim=0:3,afade=t=out:st=2:d=1')
sfx(SF+'metallic_shimmer.wav',.3,L(19)+1.0);sfx(LIB+'sfx/impact/impact-bass-2.mp3',.3,L(19)+1.6,'atrim=0:1')
sfx(SF+'reverse_swell.wav',.3,LE(21)-1.5);sfx(SF+'deep_cinematic_boom_impact.wav',.5,LE(21)-.2);sfx(SF+'glitch_stutter.wav',.3,LE(21)-.2)
sfx(LIB+'sfx/ui/sparkle.mp3',.22,L(22)+.6)
B=''.join(beds);F=''.join(fx)
fc.append(f'{B}amix=inputs={len(beds)}:normalize=0[bd]')
fc.append('[bd][vsc]sidechaincompress=threshold=0.04:ratio=6:attack=15:release=350[bdd]')
# hard silence just before the re-hook line: duck beds 0 between L(10)-.6 and L(10)
fc.append(f"[bdd]volume=enable='between(t,{L(10)-.7:.3f},{HIT:.3f})':volume=0.08[bds]")
fc.append(f'{F}amix=inputs={len(fx)}:normalize=0[fx]')
fc.append(f'[vo][bds][fx]amix=inputs=3:normalize=0,alimiter=limit=0.80,volume=0.8,atrim=0:{D},apad=whole_dur={D}[out]')
cmd=['ffmpeg','-y','-v','error']+inp+['-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','-ac','2',os.path.join(H,'mix.wav')]
r=subprocess.run(cmd,capture_output=True,text=True);print(r.stderr[-2000:] or 'ok')
