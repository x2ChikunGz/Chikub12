#!/usr/bin/env bash
# เข้ารหัสไฟล์ hq (~65-70MB) จากมาสเตอร์ภาพ + มิกซ์เสียง และใส่ปกเป็น 3 เฟรมแรก (0.1 วิ) ให้แพลตฟอร์มใช้เฟรมแรกเป็นปก
# bash tools/encode_hq.sh clips/<ชื่อ>   -> clips/<ชื่อ>/<ชื่อ>_hq.mp4   (ต้องมี silent.mp4 mix.wav cover.png; ใส่ NOCOVER=1 เพื่อไม่ฝังปก; T=วินาที เพื่อทดสอบสั้นๆ)
set -e; D="$(cd "$1" && pwd)"; N=$(basename "$D"); cd "$D"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 mix.wav); OUT="${N}_hq.mp4"; if [ -n "$T" ]; then DUR=$T; OUT="${N}_test.mp4"; fi
if [ -n "$NOCOVER" ]; then FC="[0:v]null[v]"; else FC="[0:v][2:v]overlay=0:0:enable='lt(t,0.1)'[v]"; fi
ffmpeg -y -v error -i silent.mp4 -i mix.wav -i cover.png -filter_complex "$FC" -map "[v]" -map 1:a -t "$DUR" \
  -c:v libx264 -preset slow -crf 18 -maxrate 6500k -bufsize 13000k -profile:v high -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 256k -ar 48000 -movflags +faststart "$OUT"
ls -l "$OUT" | awk '{printf "%.1f MB\n",$5/1048576}'
