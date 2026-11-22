import os,re,json,subprocess
H=os.path.dirname(os.path.abspath(__file__));LIB=os.path.join(H,'../../lib/assets/audio/');SF=os.path.join(H,'sfx/');OV=LIB+'openverse/'
s=open(os.path.join(H,'proj/assets/timing.js'),encoding='utf-8').read()
D=float(re.search(r'DUR=([\d.]+)',s).group(1));LN=json.loads(re.search(r'LINE=(\[.*?\]);',s,re.S).group(1))
L=lambda i:LN[i-1][0];LE=lambda i:LN[i-1][1];cut=lambda i:(LE(i-1)+L(i))/2
HIT=L(16)+(LE(16)-L(16))*.62
inp=[];fc=[];lab=[];n=0
def add(path,gain,at=0,flt='anull',loop=False,dur=None):
    global n
    inp.extend((['-stream_loop','-1'] if loop else [])+['-i',path])
    f=f'[{n}:a]aformat=sample_rates=44100:channel_layouts=stereo,{flt}'
    if dur:f+=f',atrim=0:{dur:.3f},afade=t=out:st={max(0,dur-0.8):.3f}:d=0.8'
    fc.append(f+f',volume={gain},adelay={int(at*1000)}|{int(at*1000)}[s{n}]');lab.append(f'[s{n}]');n+=1
inp+=['-i',os.path.join(H,'voice.wav')];fc.append('[0:a]highpass=f=70,lowpass=f=12500,acompressor=threshold=0.12:ratio=2:attack=12:release=160,loudnorm=I=-15:TP=-1.5:LRA=7,aformat=channel_layouts=stereo,asplit=2[vd][vsc]');n=1
fc.append('[vd]asplit=2[v1][v2];[v2]aecho=0.8:0.5:50|95:0.15|0.08,volume=0.2[ve];[v1][ve]amix=inputs=2:normalize=0[vo]')
beds=[];fx=[]
def bed(p,g,a,b,flt='anull'):add(p,g,a,flt+',afade=t=in:d=1.0',loop=True,dur=b-a);beds.append(lab[-1])
def sfx(p,g,at,flt='anull'):add(p,g,max(0,at),flt);fx.append(lab[-1])
bed(OV+'room_tone_night_decbf6f4.mp3',.2,0,D)
bed(SF+'low_drone_hum.wav',.18,cut(2),L(16)-.6)
bed(OV+'dark_ambience_drone_6486614e.mp3',.26,cut(8),L(16)-.6,'lowpass=f=4000')
bed(OV+'dark_ambience_drone_6486614e.mp3',.34,HIT,cut(21))
bed(SF+'low_drone_hum.wav',.3,cut(22),D)
bed(SF+'candle_flame_flicker.wav',.3,cut(7),cut(8))
# hook flash-forward
sfx(SF+'deep_cinematic_boom_impact.wav',.6,L(1)+.02);sfx(SF+'glitch_stutter.wav',.35,L(1)+.05);sfx(OV+'horror_whisper_bae2b772.mp3',.14,L(1),'atrim=0:1,afade=t=out:st=0.6:d=0.4');sfx(SF+'sub_bass_drop.wav',.45,L(1)+.9);sfx(SF+'glitch_stutter.wav',.3,L(1)+.9)
for i in range(2,25):
    if i in (13,16,22,23,24):continue
    sfx(SF+'soft_whoosh.wav' if i not in (7,8,17,21) else SF+'dark_whoosh.wav',.2,cut(i)-.2)
sfx(SF+'cloth_drape.wav',.25,L(2)+.6)
sfx(OV+'phone_vibrate_f217c877.mp3',.45,L(3)-.15,'atrim=0:1.6,afade=t=out:st=1.2:d=0.4');sfx(SF+'phone_ring.wav',.25,L(3)-.1)
sfx(LIB+'sfx/ui/click.mp3',.35,L(4)+1.0);sfx(LIB+'sfx/ui/error.mp3',.2,L(4)+1.0);sfx(LIB+'sfx/ui/click.mp3',.35,L(5)+1.1);sfx(LIB+'sfx/ui/error.mp3',.2,L(5)+1.1)
sfx(SF+'cloth_drape.wav',.55,L(7)+.9);sfx(LIB+'foley/human/breath.wav',.22,L(8)+.3);sfx(OV+'horror_whisper_0862bb39.mp3',.12,L(8)+1.4,'atrim=0:3,afade=t=out:st=2:d=1');sfx(OV+'glass_crack_93438db4.mp3',.45,LE(8)-.4)
sfx(SF+'reverse_swell.wav',.25,L(9)+.4)
for k in range(6):sfx(LIB+'sfx/object/clock_tick.wav',.2,L(10)-.1+k*.5)
sfx(OV+'cat_hiss_22db7666.wav',.6,L(10)+1.6);sfx(SF+'cat_hiss.wav',.3,L(10)+2.4)
sfx(OV+'cloth_slide_baece873.mp3',.5,L(11)+.3,'atrim=0:2.5,afade=t=out:st=2:d=0.5')
sfx(OV+'heartbeat_b61439e8.mp3',.35,L(12));sfx(SF+'low_heartbeat.wav',.35,L(13)-.2);sfx(SF+'metallic_shimmer.wav',.2,L(13))
sfx(LIB+'foley/human/breath.wav',.2,L(14)+.4);sfx(SF+'glitch_stutter.wav',.25,L(15)+1.0)
sfx(SF+'tension_riser_long.wav',.45,HIT-3.43);sfx(SF+'deep_cinematic_boom_impact.wav',.7,HIT);sfx(SF+'sub_bass_drop.wav',.6,HIT);sfx(OV+'glass_crack_93438db4.mp3',.55,HIT);sfx(SF+'glitch_stutter.wav',.4,HIT)
for k in range(4):sfx(LIB+'sfx/ui/pop.mp3',.22,L(17)+[.2,1.2,2.0,2.8][k])
sfx(LIB+'sfx/ui/click.mp3',.25,L(18));sfx(LIB+'sfx/ui/click.mp3',.25,L(18)+.9);sfx(SF+'deep_cinematic_boom_impact.wav',.4,L(18)+(LE(18)-L(18))*.55)
sfx(SF+'reverse_swell.wav',.25,L(19)+1.2);sfx(LIB+'sfx/ui/sparkle.mp3',.18,L(20)+.1)
sfx(LIB+'foley/human/breath.wav',.3,L(21));sfx(LIB+'sfx/object/light_switch.wav',.7,L(21)+(LE(21)-L(21))*.75);sfx(SF+'light_switch_click.wav',.4,L(21)+(LE(21)-L(21))*.75)
sfx(SF+'whisper_breath.wav',.12,L(22)+.3);sfx(SF+'reverse_swell.wav',.35,L(23)-.6)
sfx(SF+'sub_bass_drop.wav',.6,L(23)+.6);sfx(OV+'horror_whisper_bae2b772.mp3',.2,L(23)+.6,'atrim=0:3,afade=t=out:st=2:d=1');sfx(SF+'glitch_stutter.wav',.35,L(23)+1.2);sfx(SF+'deep_cinematic_boom_impact.wav',.5,L(24)-.25)
B=''.join(beds);F=''.join(fx)
fc.append(f'{B}amix=inputs={len(beds)}:normalize=0[bd]');fc.append('[bd][vsc]sidechaincompress=threshold=0.04:ratio=6:attack=15:release=350[bdd]')
fc.append(f"[bdd]volume=enable='between(t,{L(16)-.7:.3f},{HIT:.3f})+between(t,{LE(21)+.1:.3f},{L(23)+.5:.3f})':volume=0.15[bds]")
fc.append(f'{F}amix=inputs={len(fx)}:normalize=0[fx]')
fc.append(f'[vo][bds][fx]amix=inputs=3:normalize=0,alimiter=limit=0.9,loudnorm=I=-14:TP=-2.5:LRA=11,atrim=0:{D},apad=whole_dur={D}[out]')
cmd=['ffmpeg','-y','-v','error']+inp+['-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','-ac','2',os.path.join(H,'mix.wav')]
r=subprocess.run(cmd,capture_output=True,text=True);print(r.stderr[-1500:] or 'ok')
