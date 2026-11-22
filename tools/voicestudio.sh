#!/usr/bin/env bash
# VoiceStudio (Docker, CPU) — เสียงพากย์ไทยด้วย VoxCPM2 (ไลเซนส์ใช้เชิงพาณิชย์ได้)
#   bash tools/voicestudio.sh start                     เปิดเซิร์ฟเวอร์ (localhost:3900)
#   bash tools/voicestudio.sh say "ข้อความ" out.wav [engine]   เจนเสียง (ค่าเริ่ม voxcpm2)
#   bash tools/voicestudio.sh engines                   ดูเอนจินที่ติดตั้งได้
# ห้ามยอมรับไลเซนส์ OmniVoice (CC-BY-NC ห้ามใช้เชิงพาณิชย์) ถ้าช่องมีรายได้
set -e; mkdir -p ~/.voicestudio; [ -f ~/.voicestudio/key ] || openssl rand -hex 32 > ~/.voicestudio/key
K=$(cat ~/.voicestudio/key); U=http://localhost:3900
case "$1" in
start)
  pgrep dockerd >/dev/null || { (dockerd >/tmp/dockerd.log 2>&1 &); until docker info >/dev/null 2>&1; do sleep 1; done; }
  docker start omnivoice >/dev/null 2>&1 || CA=(); [ -f /root/.ccr/ca-bundle.crt ] && CA=(-v /root/.ccr/ca-bundle.crt:/etc/ssl/certs/proxy-ca.crt:ro -e SSL_CERT_FILE=/etc/ssl/certs/proxy-ca.crt -e REQUESTS_CA_BUNDLE=/etc/ssl/certs/proxy-ca.crt -e UV_NATIVE_TLS=1 -e CURL_CA_BUNDLE=/etc/ssl/certs/proxy-ca.crt)
  for v in HTTPS_PROXY HTTP_PROXY NO_PROXY https_proxy http_proxy no_proxy; do [ -n "${!v}" ] && CA+=(-e "$v=${!v}"); done
  docker run -d --name omnivoice --network host "${CA[@]}" -e OMNIVOICE_API_KEY="$K" \
    -e OMNIVOICE_DATA_DIR=/app/omnivoice_data -v omnivoice-data:/app/omnivoice_data ghcr.io/debpalash/voicestudio:stable >/dev/null
  until curl -s -m 3 $U/health | grep -q ok; do sleep 3; done; echo "VoiceStudio ready at $U (key in ~/.voicestudio/key)";;
engines) curl -s $U/engines/tts -H "Authorization: Bearer $K" | python3 -c "import json,sys;[print(e['id'],'OK' if e['available'] else '-',e['display_name']) for e in json.load(sys.stdin)['backends']]";;
say)
  T=$(mktemp --suffix .wav); E=${4:-voxcpm2}
  python3 -c "import json,sys;print(json.dumps({'model':sys.argv[1],'voice':'alloy','input':sys.argv[2],'response_format':'wav','language':'th'}))" "$E" "$2" |
    curl -sf -m 1800 $U/v1/audio/speech -H "Authorization: Bearer $K" -H "Content-Type: application/json" -d @- -o "$T" || { echo "failed"; cat "$T"; exit 1; }
  ffmpeg -y -v error -i "$T" -ar 44100 -ac 1 "$3"; rm -f "$T"; echo "ok $3";;
*) sed -n 2,6p "$0";;
esac
