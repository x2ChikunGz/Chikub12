#!/usr/bin/env bash
# ติดตั้งทุกอย่างที่ใช้ทำคลิป (รันซ้ำได้)
set -e; cd "$(dirname "$0")/.."
command -v ffmpeg >/dev/null || (apt-get update && apt-get install -y ffmpeg)
pip install -q sherpa-onnx playwright soundfile numpy
npm i -g hyperframes@0.9.80 >/dev/null
M=models/sherpa-onnx-whisper-small
if [ ! -f $M/small-encoder.int8.onnx ]; then mkdir -p models
  curl -sSL https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2 | tar xj -C models
  rm -f $M/small-encoder.onnx $M/small-decoder.onnx; fi
pip install -q gTTS uv
# Agent-Reach (ของจริงจาก GitHub ห้ามใช้ตัวบน PyPI ชื่อซ้ำ)
export PATH=$HOME/.local/bin:$PATH
command -v agent-reach >/dev/null || { uv tool install https://github.com/Panniantong/Agent-Reach/releases/latest/download/agent-reach.zip && agent-reach setup >/dev/null; }
# audiocraft (MusicGen/AudioGen) แยก venv python3.10 เพราะต้องใช้ torch 2.1
if [ ! -x /root/ac-venv/bin/python ] || ! /root/ac-venv/bin/python -c "import audiocraft" 2>/dev/null; then
  uv venv -q -p 3.10 /root/ac-venv; export VIRTUAL_ENV=/root/ac-venv
  uv pip install -q torch==2.1.0 torchaudio==2.1.0 --index-url https://download.pytorch.org/whl/cpu
  uv pip install -q --override <(echo "av==12.3.0") audiocraft==1.3.0 "numpy<2" "transformers==4.40.2" "huggingface_hub<0.26" "xformers==0.0.22.post7"
  uv pip install -q torch==2.1.0 torchaudio==2.1.0 --index-url https://download.pytorch.org/whl/cpu; unset VIRTUAL_ENV; fi
# EarShot: ทำเสียงเอฟเฟกต์จากคำบรรยาย (ไม่ใช้โมเดล) + ฟัง/ตรวจซาวด์คลิป (ต้องจาก GitHub ตัวบน PyPI ชื่อซ้ำ)
command -v earshot >/dev/null || { uv tool install "earshot[listen,mcp] @ git+https://github.com/Leonxlnx/earshot" --with torch --index https://download.pytorch.org/whl/cpu --index-strategy unsafe-best-match && earshot doctor --fetch >/dev/null; }
# VoiceStudio (Docker) + VoxCPM2 เสียงพากย์ไทยที่ใช้เชิงพาณิชย์ได้
if command -v docker >/dev/null; then bash tools/voicestudio.sh start
  curl -s -X POST localhost:3900/engines/sidecar/voxcpm2/install -H "Authorization: Bearer $(cat ~/.voicestudio/key)" >/dev/null; fi
echo "setup ok"
