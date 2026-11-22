#!/usr/bin/env bash
# เรนเดอร์ภาพ+ผสมเสียง+รวม+ตรวจ: bash tools/render.sh clips/<ชื่อ>   (ทำงานพื้นหลัง ดู log ที่ clips/<ชื่อ>/render.log)
set -e; T="$(cd "$(dirname "$0")" && pwd)"; D="$(cd "$1" && pwd)"; N=$(basename "$D")
export HYPERFRAMES_BROWSER_PATH=${HYPERFRAMES_BROWSER_PATH:-/usr/bin/google-chrome}
[ -f "$D/build.sh" ] && bash "$D/build.sh"
rm -f "$D/render.done"
setsid nohup bash -c "cd '$D/proj' && npx --yes hyperframes@0.9.23 render --quality standard -o ../silent.mp4 --fps 30 > ../render.log 2>&1 \
 && python3 -I ../mix.py >> ../render.log 2>&1 && bash '$T/mux.sh' '$D' >> ../render.log 2>&1; echo DONE >> ../render.done" >/dev/null 2>&1 </dev/null &
echo "rendering $N in background (~300 เฟรม/นาที). รอไฟล์ $D/render.done"
