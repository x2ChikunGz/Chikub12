# @เรื่องสงสัย — ขั้นตอนทำคลิป (บังคับใช้ตั้งแต่คลิปใหม่)

ผู้ใช้ชื่อชิ ใช้มือถือ ตอบไทยสั้น ประหยัดโทเคน ส่ง mp4 จริง (1080x1920 30fps ได้ถึง 200 MB) อ่าน README.md สำหรับเครื่องมือทั้งหมด

## ลำดับงานต่อคลิป (ใช้ subagent ใน .claude/agents)
1. **researcher** ค้นข้อมูลจริง (+ Context7 สำหรับเอกสารไลบรารี, Agent-Reach สำหรับเว็บ/YouTube) → ข้อมูลที่ยืนยันแล้ว/ยืนยันไม่ได้
2. **scriptwriter** เขียน script.txt + capdef.json (โครง Hook→Context→Re-hook→Payoff→จบ; Re-hook ใช้ประโยคของชิ) → ส่งบท+ตัวอย่างเสียงให้ชิเช็กก่อนสร้างภาพยาว (ไอเดียใหม่ต้องถามก่อน)
3. เจนเสียงด้วย VoiceStudio (VoxCPM2 โคลนจากเรฟ profile `a65bda65`, แบบ A) `tools/vs_lines.py` → **voice-qa** ตรวจ/เจนซ้ำ
4. สร้างภาพใน clips/<ชื่อ>/ (ใช้ clips/mirror2 เป็นแม่แบบ: room.js, shots.js, post.js, mirror.js) → ถ่ายสติลล์เช็กก่อนเรนเดอร์ (`cap.py`)
5. **sound-designer** ทำ mix.py → เรนเดอร์ (`setsid nohup ... hyperframes render --quality high`)
6. **video-qa** (สกิล video-qa / `tools/video_qa.py`) ต้อง PASS ก่อน SendUserFile → ส่ง mp4 + แคปชั่นโพสต์ (บรรทัดแรกดึงคน, เนื้อหา, คำถามชวนคอมเมนต์, แฮชแท็ก 3 อัน)

## กฎ
- ภาพ: สไตล์ล็อก (กลางคืนน้ำเงินเทา, ซีเปียย้อนอดีต, เกรนชั้นเดียว alpha .045, เครดิต @เรื่องสงสัย left:54 top:176, ซับ y≈1500 ชิป y<=1380, ซับไทย+อังกฤษแบบ caps2)
- ไลเซนส์: ห้าม MusicGen/AudioGen/OmniVoice ในคลิปจริง (NC); ใช้ VoxCPM2 (Apache-2.0); เสียง CC BY ใส่เครดิตในแคปชั่น
- ซื่อสัตย์: บอกความยาวถ้าเกิน 1 นาที, เสียงที่ฟังไม่ได้, ข้อมูลที่ยืนยันไม่ได้, แหล่งเสียง
- git: repo หลักคือ `x2ChikunGz/Claude-by-me` (private) remote ชื่อ `origin` สาขา `main` — commit แล้ว `git push origin HEAD:main` ได้เลย (repo เก่า Chikub12 ถูกล้างข้อมูลแล้ว ห้าม push ซ้ำ); ถ้า push ไม่ผ่านห้ามวนลองซ้ำ
