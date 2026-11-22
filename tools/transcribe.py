"""ถอดเสียงพากย์เป็นช่วงๆ: python3 -I tools/transcribe.py clips/X/voice.flac [noise_db] [min_sil]
แปลงเป็น voice.wav 44.1k mono ข้างไฟล์ต้นทาง, silencedetect แล้ว whisper small (th) ทีละช่วง -> segs.txt"""
import sys,os,re,subprocess,numpy as np,sherpa_onnx
src=os.path.abspath(sys.argv[1]);nz=sys.argv[2] if len(sys.argv)>2 else '-33';ds=sys.argv[3] if len(sys.argv)>3 else '0.18'
d=os.path.dirname(src);wav=os.path.join(d,'voice.wav')
if src!=wav: subprocess.run(['ffmpeg','-y','-v','error','-i',src,'-ar','44100','-ac','1',wav],check=True)
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',wav],capture_output=True,text=True).stdout)
log=subprocess.run(['ffmpeg','-i',wav,'-af',f'silencedetect=noise={nz}dB:d={ds}','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',log)];en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',log)]
segs=[];cur=0.0
for s,e in zip(st,en+[dur]):
    if s-cur>0.15: segs.append((cur,s))
    cur=e
if dur-cur>0.15: segs.append((cur,dur))
M=os.path.join(os.path.dirname(os.path.abspath(__file__)),'../models/sherpa-onnx-whisper-small/small-')
rec=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=M+'encoder.int8.onnx',decoder=M+'decoder.int8.onnx',tokens=M+'tokens.txt',language='th',task='transcribe',num_threads=4)
pcm=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',wav,'-ar','16000','-ac','1','-f','s16le','-'],capture_output=True).stdout,np.int16).astype(np.float32)/32768
out=[]
for a,b in segs:
    s=rec.create_stream();s.set_option('max_tokens_per_second','40');s.accept_waveform(16000,pcm[int(a*16000):int(b*16000)]);rec.decode_stream(s)
    line=f'{a:7.2f} {b:7.2f}  {s.result.text.strip()}';print(line);out.append(line)
open(os.path.join(d,'segs.txt'),'w').write(f'# duration {dur:.2f}\n'+'\n'.join(out)+'\n')
