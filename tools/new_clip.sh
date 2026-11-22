#!/usr/bin/env bash
# สร้างคลิปใหม่จากแม่แบบ scroll: bash tools/new_clip.sh <ชื่อ> [path/voice.(flac|wav|mp3|m4a)]
set -e; R="$(cd "$(dirname "$0")/.." && pwd)"; N="$1"; [ -z "$N" ] && { echo "usage: new_clip.sh name [voice]"; exit 1; }
D="$R/clips/$N"; [ -e "$D" ] && { echo "$D exists"; exit 1; }
mkdir -p "$D"; cp -r "$R/clips/scroll/." "$D/"; rm -f "$D"/voice.* "$D"/segs.txt "$D"/runs.json "$D"/*.mp4 "$D"/mix.wav
sed -i "s|whole_dur=[0-9.]*|whole_dur=DUR|; s|;D=[0-9.]*|;D=DUR|" "$D/mix.py"
if [ -n "$2" ]; then ext="${2##*.}"; cp "$2" "$D/voice.$ext"; python3 -I "$R/tools/transcribe.py" "$D/voice.$ext"
  DUR=$(head -1 "$D/segs.txt"|awk '{print $3}'); sed -i "s|DUR|$DUR|g" "$D/mix.py"; fi
echo "created $D  -> แก้ shots.js / tail3.js (CAPS, CUTS ใน mix.py) แล้ว bash $D/build.sh"
