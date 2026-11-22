"""เจนเพลง/เอฟเฟกต์ด้วย audiocraft (CPU): /root/ac-venv/bin/python tools/gen_audio.py music|sfx "prompt" out.wav [วินาที]
music = MusicGen small (เพลงประกอบ), sfx = AudioGen medium (เสียงเอฟเฟกต์) ครั้งแรกจะโหลดโมเดลจาก HuggingFace"""
import sys,torch
from audiocraft.data.audio import audio_write
kind,prompt,out=sys.argv[1:4];dur=float(sys.argv[4]) if len(sys.argv)>4 else 8
if kind=='music':
    from audiocraft.models import MusicGen;m=MusicGen.get_pretrained('facebook/musicgen-small')
else:
    from audiocraft.models import AudioGen;m=AudioGen.get_pretrained('facebook/audiogen-medium')
m.set_generation_params(duration=dur);torch.set_num_threads(4)
w=m.generate([prompt])[0].cpu()
audio_write(out.rsplit('.',1)[0],w,m.sample_rate,strategy='loudness',loudness_compressor=True);print('ok',out)
