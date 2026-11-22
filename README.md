# ชุดทำคลิป 2D @เรื่องสงสัย (ย้ายจากแชตเดิม)

โครง: clips/<ชื่อคลิป>/ = ซอร์สแต่ละคลิป, common/ = ซับแบบเนียน (caps2.js), lib/assets = คลังเสียงเอฟเฟกต์ออฟไลน์
คลิป: dream (ใบหน้าในฝัน), vox (เสียงตัวเอง), p99 (ราคา 99), scroll (เลื่อนหน้าจอ, เวอร์ชันล่าสุดสุด)
เริ่มจาก clips/scroll เป็นแม่แบบ (ใหม่สุด) ไฟล์เสียงพากย์เป็น voice.flac (แปลงเป็น wav 44.1k mono ก่อนใช้)


## ทีมงานคลิป (subagents / skill / MCP) — ใช้ตั้งแต่คลิปถัดไป
- `.claude/agents/`: researcher, scriptwriter, voice-qa, sound-designer, video-qa
- `.claude/skills/video-qa` + `python3 -I tools/video_qa.py <mp4>` ตรวจสเปก/ความดัง/เฟรมดำ-ค้าง/ซาวด์ + contact sheet ก่อนส่งทุกคลิป
- Context7 MCP (`.mcp.json`, `npx @upstash/context7-mcp`) ดึงเอกสารไลบรารีล่าสุด
- ขั้นตอนเต็มและกฎอยู่ใน CLAUDE.md

## ติดตั้ง / เครื่องมือใหม่ (tools/)
- `bash tools/setup.sh` ติดตั้งครบ: ffmpeg, hyperframes@0.9.80, sherpa-onnx + playwright (python), โมเดล whisper small int8 (ลงที่ models/ ไม่อยู่ใน git)
- `bash tools/new_clip.sh <ชื่อ> <ไฟล์เสียง>` สร้าง clips/<ชื่อ> จากแม่แบบ scroll + แปลง wav + ถอดเสียงเป็น segs.txt + ใส่ความยาวใน mix.py ให้อัตโนมัติ
- `python3 -I tools/transcribe.py <voice> [-33] [0.18]` ถอดเสียงทีละช่วง (แก้ปัญหาข้อความไทยถูกตัดท้ายแล้ว: max_tokens_per_second=40)
- `bash tools/render.sh clips/<ชื่อ>` = build + เรนเดอร์พื้นหลัง + mix.py + mux.sh ต่อกันอัตโนมัติ รอ render.done
- `bash tools/mux.sh clips/<ชื่อ>` รวมภาพ+เสียง -> <ชื่อ>.mp4, ตรวจ codec/ขนาด (เตือนถ้าเกิน 30 MiB), ทำ contact.jpg
- ทุก mix.py / cap.py / build.sh ใช้ path อ้างอิงจากโฟลเดอร์ตัวเองแล้ว รันจากที่ไหนก็ได้ ไม่ต้องแก้ ../lib อีก
- **เสียงพากย์ Google AI (Gemini) TTS**: `export GEMINI_API_KEY=...` แล้ว `python3 -I tools/gemini_tts.py --list` ดูโมเดล, `python3 -I tools/gemini_tts.py "ข้อความ" out.wav --model <ชื่อ> --voice Kore --style "เล่าแบบชวนสงสัย"` (ตั้ง GEMINI_TTS_MODEL เป็นค่าเริ่มต้นได้)
- **gTTS สำรอง (ไม่ต้องใช้คีย์)**: `python3 -I tools/tts.py "ข้อความ" out.wav` หรือ `--file script.txt` (gTTS ไทย ฟรี ไม่ต้องใช้คีย์, ปรับ `--speed`)
- **เจนเพลง/เอฟเฟกต์ audiocraft** (⚠️ โมเดลเป็น CC-BY-NC ห้ามใช้ในคลิปที่สร้างรายได้): `/root/ac-venv/bin/python tools/gen_audio.py music "prompt" out.wav 10` (MusicGen small ~1.5 นาที/6 วิ บน CPU) หรือ `sfx "door creak" out.wav 3` (AudioGen medium ช้ากว่า โมเดลใหญ่)
- **Openverse** เข้าได้แล้ว: `python3 -I tools/openverse.py whoosh 10` ดูรายการ, `--get 0 2` โหลดลง lib/assets/audio/openverse + เขียน CREDITS.md อัตโนมัติ (กรองเฉพาะ cc0/pdm/by)
- **Agent-Reach** (ค้นคลิปไวรัล/ข้อมูลจาก YouTube, X, Reddit, เว็บ ฯลฯ): `agent-reach --help` (อยู่ที่ ~/.local/bin)
- **VoiceStudio** (Docker, localhost:3900): `bash tools/voicestudio.sh start` แล้ว `bash tools/voicestudio.sh say "ข้อความ" out.wav` ใช้ VoxCPM2 (Apache-2.0, ใช้เชิงพาณิชย์ได้, รองรับไทย) **ห้ามกดยอมรับไลเซนส์ OmniVoice** (CC-BY-NC ห้ามใช้เชิงพาณิชย์)
- **EarShot**: `earshot make "soft whoosh" -o whoosh.wav` ทำเสียงเอฟเฟกต์ทันทีไม่ใช้โมเดล (คลัง 252 เสียง, `earshot sounds` ดูรายการ); `earshot timeline clip.mp4` ตรวจความดัง/ช่องเงียบ/เสียงตรงรอยตัดไหม (ใช้ตรวจคลิปก่อนส่ง); `earshot sheet clip.mp4` ทำภาพสรุปซาวด์
- cap.py ใช้ Chrome ที่มีในเครื่อง (CHROME_PATH หรือ /usr/bin/google-chrome) ไม่ต้อง playwright install

## ลำดับงานต่อคลิป
1. ได้เสียง -> ffmpeg แปลง wav 44.1k -> silencedetect (noise=-33dB d=0.18) แล้วถอดทีละช่วงด้วย sherpa-onnx whisper small (language=th) เพื่อหาว่าประโยคไหนอยู่ช่วงไหน (สะกดเพี้ยน ใช้แค่ชี้ตำแหน่ง) จุดตัดซับในประโยคยาวใช้ -30dB d=0.05
2. เขียน shots.js (ช็อตละ 1 ไอเดีย ตัดตามช่วงเงียบ) + CAPS ใน tail3.js (ไทย + อังกฤษ + mode 0/1/2) แล้ว `bash build.sh` (รวมไฟล์เป็น proj/assets/voice.js)
3. ถ่ายเฟรมเช็ก: `python3 -I cap.py OUTDIR t1 t2 ...`
4. เรนเดอร์ (ต้องรันเป็นบรรทัดของมันเอง ไม่ต่อ && ข้างหน้า):
   export HYPERFRAMES_BROWSER_PATH=/usr/bin/google-chrome; cd proj; setsid nohup bash -c 'npx --yes hyperframes render --quality standard -o ../silent.mp4 --fps 30 > ../render.log 2>&1; echo DONE >> ../render.done' > /dev/null 2>&1 < /dev/null &
   ~300 เฟรม/นาที (คลิป 78 วิ ~8 นาที)
5. ผสมเสียง: mix.py (เสียงพากย์ loudnorm + pad ซีนธ์ ducking + whoosh ที่รอยตัด + pop ที่ชิป ฯลฯ) ต้องแก้ path ../lib ให้ตรงที่ตั้ง lib/ ในเครื่องใหม่ แล้วรวมกับภาพ:
   ffmpeg -i silent.mp4 -i mix.wav -map 0:v -map 1:a -c:v libx264 -preset medium -b:v 2200k -maxrate 2800k -bufsize 5600k -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -t <ความยาว> out.mp4
6. ตรวจ ffprobe 1080x1920 h264 aac, ดู contact sheet, ส่ง + ให้แคปชั่นทุกคลิป

## กฎประจำช่อง
- เครดิต @เรื่องสงสัย ชิปซ้ายบน (left:54 top:176) + การ์ดจบ, สไตล์ BRIGHT เป็นค่าเริ่มต้น (DARK เมื่อสั่ง)
- โครงบท Hook(1-3 วิ) -> Context -> Re-hook(กลางเรื่อง) -> Payoff -> CTA; Re-hook ใช้ประโยคของชิ; ทุกบทมีข้อความ Google TTS และแคปชั่นโพสต์
- ค้นคลิปไวรัล/ข้อมูลจริงก่อนเขียน ห้ามเดา
- เกรน: overlay alpha .045 (tail3.js บรรทัด renderAt) ชิบอกของเดิม .1 เยอะไป
- ซับแบบเนียน: common/caps2.js (เข้า 0.3 วิ ลอยขึ้น+จาง+เบลอ ออกจางเบา กล่องแดงขยายจากกลาง)
- ชิป/ซับต้องอยู่ y <= ~1380 ไม่ทับซับที่ y~1500
- ไฟล์ส่งได้ไม่เกิน ~30 MiB
- เสียงเอฟเฟกต์: Pixabay ที่มากับ media-use + เสียงสังเคราะห์เอง + Openverse (tools/openverse.py) + เจนเองด้วย audiocraft
