#!/usr/bin/env bash
# รวม silent.mp4 + mix.wav -> <ชื่อ>.mp4, ตรวจสเปก+ขนาด, ทำ contact sheet
set -e; D="$(cd "$1" && pwd)"; N=$(basename "$D"); cd "$D"
T=$(ffprobe -v error -show_entries format=duration -of csv=p=0 mix.wav)
ffmpeg -y -v error -i silent.mp4 -i mix.wav -map 0:v -map 1:a -c:v libx264 -preset medium -b:v 2200k -maxrate 2800k -bufsize 5600k -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -t "$T" "$N.mp4"
ffprobe -v error -show_entries stream=codec_name,width,height -of csv=p=0 "$N.mp4"
S=$(stat -c %s "$N.mp4"); echo "size $((S/1048576)) MiB"; [ $S -gt 31457280 ] && echo "WARN: เกิน 30 MiB ลด -b:v"
ffmpeg -y -v error -i "$N.mp4" -vf "fps=1/4,scale=216:384,tile=6x4" -frames:v 1 contact.jpg; echo "ok $D/$N.mp4"
