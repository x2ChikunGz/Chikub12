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
echo "setup ok"
