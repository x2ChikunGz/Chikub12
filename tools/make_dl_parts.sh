#!/usr/bin/env bash
# แบ่งคลิปเป็นชิ้น ≤12MB สำหรับหน้าโหลดคลิป (artifact): bash tools/make_dl_parts.sh <mp4> <ชื่อคลิป> <outdir>
# แล้วเพิ่มรายการใน site/manifest.json (parts = <ชื่อคลิป>/pNN.mp4) และ publish ไฟล์ด้วย Artifact tool (url ของหน้า) ทีละ ≤64MB
set -e; F="$1"; N="$2"; O="${3:-/tmp/dl}"; mkdir -p "$O/$N"; rm -f "$O/$N"/p*.mp4
split -b 12000000 -d --additional-suffix=.mp4 "$F" "$O/$N/p"; ls -l "$O/$N" | awk 'NR>1{print $5,$9}'; echo "size=$(stat -c %s "$F")"
