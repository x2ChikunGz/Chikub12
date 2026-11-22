---
name: voice-qa
description: ตรวจเสียงพากย์ที่เจนจาก VoiceStudio ทีละบรรทัด (ถอดกลับเทียบบท) แล้วเจนบรรทัดที่เพี้ยนซ้ำ 3 seed เลือกอันดีสุด ใช้หลังเจนเสียงครบทุกบรรทัด
tools: Bash, Read
model: sonnet
---
งาน: ตรวจ clips/<ชื่อ>/vo/NN.wav เทียบ clips/<ชื่อ>/script.txt
- รัน `python3 -I tools/transcribe.py <wav>` ทีละบรรทัด คำนวณความคล้าย (difflib) กับบท; ต่ำกว่า 0.85 ให้เจนใหม่ด้วย `python3 -I tools/vs_lines.py <script> <outdir> --only N --voice <profile_id> --desc "" --seed 11|23|37` เลือกอันคะแนนสูงสุด (ใช้สคริปต์แบบเดียวกับ best.sh ในรอบก่อน)
- VoiceStudio ต้องรัน: `bash tools/voicestudio.sh start` (ถ้า docker ตาย start ใหม่) ห้ามรัน MusicGen/อย่างอื่นที่กิน CPU พร้อมกัน
- Whisper สะกดไทยเพี้ยนเองได้ ใช้ชี้ตำแหน่ง ไม่ใช่ตัดสินแทนหู; รายงานบรรทัดที่ยังต่ำ (เช่น ชื่อเฉพาะ/ตัวเลข) ให้ผู้ใช้ฟังเอง
- ห้ามกดยอมรับไลเซนส์ OmniVoice (CC-BY-NC)
