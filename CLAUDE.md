# @เรื่องสงสัย — ขั้นตอนทำคลิป (บังคับใช้ตั้งแต่คลิปใหม่)

ผู้ใช้ชื่อชิ ใช้มือถือ ตอบไทยสั้น ประหยัดโทเคน ส่ง mp4 จริง (1080x1920 30fps ได้ถึง 200 MB) อ่าน README.md สำหรับเครื่องมือทั้งหมด

## ลำดับงานต่อคลิป (ใช้ subagent ใน .claude/agents)
1. **researcher** ค้นข้อมูลจริง (+ Context7 สำหรับเอกสารไลบรารี, Agent-Reach สำหรับเว็บ/YouTube) → ข้อมูลที่ยืนยันแล้ว/ยืนยันไม่ได้
2. **scriptwriter** เขียน script.txt + capdef.json (โครง Hook→Context→Re-hook→Payoff→จบ; Re-hook ใช้ประโยคของชิ) → ส่งบท+ตัวอย่างเสียงให้ชิเช็กก่อนสร้างภาพยาว (ไอเดียใหม่ต้องถามก่อน)
3. เจนเสียงด้วย VoiceStudio (VoxCPM2 โคลนจากเรฟ profile `a65bda65`, แบบ A) `tools/vs_lines.py` → **voice-qa** ตรวจ/เจนซ้ำ
4. สร้างภาพใน clips/<ชื่อ>/ (ใช้ clips/mirror2 เป็นแม่แบบ: room.js, shots.js, post.js, mirror.js) → ถ่ายสติลล์เช็กก่อนเรนเดอร์ (`cap.py`)
5. **sound-designer** ทำ mix.py → เรนเดอร์ (`setsid nohup ... hyperframes render --quality high`)
6. **video-qa** (สกิล video-qa / `tools/video_qa.py`) ต้อง PASS ก่อน SendUserFile → ส่ง mp4 + แคปชั่นโพสต์ (บรรทัดแรกดึงคน, เนื้อหา, คำถามชวนคอมเมนต์, แฮชแท็ก 3 อัน)

## ปกคลิป (ชิสั่ง: ทำทุกคลิป)
- ทุกคลิปต้องมี `proj/assets/cover.js` (นิยาม `drawCoverOn(canvas)` ใช้ซีน/สไตล์ของคลิป ข้อความใหญ่ 2 บรรทัดดึงสายตา + ชิปเครดิต; ของสำคัญอยู่ y 1100-1560 กันโดนครอบกริด 3:4) → `python3 -I tools/cover.py clips/<ชื่อ>` ได้ `cover.png` 1080x1920 → ส่งให้ชิพร้อมคลิป
- ฝังปกเป็น 3 เฟรมแรก (0.1 วิ) ให้แพลตฟอร์มใช้เฟรมแรกเป็นปก: `bash tools/encode_hq.sh clips/<ชื่อ>` (ใช้แทนคำสั่ง encode hq ด้านล่าง; `NOCOVER=1` ถ้าไม่ฝัง) ห้ามรันซ้ำโดยตั้ง T=... ทับไฟล์จริง

## ส่งคลิปให้ชิ (Drive อัปไฟล์ใหญ่ไม่ได้ จำกัด 10 MB; ปุ่มโหลดในแชตไม่ขึ้น)
- ใช้หน้าโหลดบน Artifact (ซอร์สใน `site/`; หน้าเดิมถูกลบแล้วตามที่ชิสั่ง ต้อง publish ใหม่ทุกครั้งที่ส่งคลิป แล้วได้ลิงก์ใหม่) ชิกด "เตรียมไฟล์" แล้ว "บันทึกลงเครื่อง"
- **ชิสั่ง: ทุกคลิปส่งไฟล์ hq ให้โหลดผ่านหน้านี้** (ไม่ต้องส่งไฟล์เล็กในแชตเป็นหลัก)
- คลิปใหม่: encode hq = `tools/encode_hq.sh` (ภายในคือ `ffmpeg -c:v libx264 -preset slow -crf 18 -maxrate 6500k -bufsize 13000k -profile:v high -pix_fmt yuv420p -c:a copy -movflags +faststart` + ปกเฟรมแรก) (~65-70 MB) → `bash tools/make_dl_parts.sh <mp4> <ชื่อ> <outdir>` → เพิ่มรายการใน `site/manifest.json` → publish หน้า `site/index.html` + manifest + ชิ้นส่วน (≤64MB ต่อครั้ง ครั้งต่อไปใส่ `url` ที่ได้, ชิ้นละ ≤15MB) → เช็กรายการไฟล์ → ส่งลิงก์ให้ชิ
- สำรอง: ส่งไฟล์ ~37 MB ในแชตด้วย SendUserFile (display attach)

## กฎ
- ภาพ: สไตล์ล็อก (กลางคืนน้ำเงินเทา, ซีเปียย้อนอดีต, เกรนชั้นเดียว alpha .045, เครดิต @เรื่องสงสัย left:54 top:176, ซับ y≈1500 ชิป y<=1380, ซับไทย+อังกฤษแบบ caps2)
- ไลเซนส์: ห้าม MusicGen/AudioGen/OmniVoice ในคลิปจริง (NC); ใช้ VoxCPM2 (Apache-2.0); เสียง CC BY ใส่เครดิตในแคปชั่น
- ซื่อสัตย์: บอกความยาวถ้าเกิน 1 นาที, เสียงที่ฟังไม่ได้, ข้อมูลที่ยืนยันไม่ได้, แหล่งเสียง
- git: repo หลักคือ `x2ChikunGz/Claude-by-me` (private) remote ชื่อ `origin` สาขา `main` — commit แล้ว `git push origin HEAD:main` ได้เลย (repo เก่า Chikub12 ถูกล้างข้อมูลแล้ว ห้าม push ซ้ำ); ถ้า push ไม่ผ่านห้ามวนลองซ้ำ
