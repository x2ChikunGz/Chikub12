// ---------- captions ----------
const CAPS=[[.26,1.03,'คุณเคยสงสัยมั้ย','Ever wondered',1],[1.47,2.73,'ทำไมของบางอย่าง','why some things',0],[2.92,3.6,'ราคา 99 บาท','cost 99 baht',1],[4.04,4.84,'ไม่ใช่ 100 บาท','instead of 100',0],[5.71,6.45,'ฟังคลิปนี้ให้จบ','Watch to the end',1],[6.84,8.04,'ถึงจะต่างกันแค่บาทเดียว','even if it’s only 1 baht apart',0],[8.47,9.29,'มีอีกด้านหนึ่ง','there’s another side',0],[9.57,10.81,'ที่ร้านค้าไม่อยากให้คุณรู้','shops don’t want you to know',2],
[11.78,13.24,'ฟังดูเหมือนแค่ลดให้บาทเดียว','sounds like a 1-baht discount',0],[13.72,14.58,'แต่นักวิจัยพบว่า','but researchers found',0],[14.78,16.39,'สมองเราไม่ได้คิดแบบนั้น','our brain doesn’t think that way',1],[16.99,18.66,'เราอ่านตัวเลขจากซ้ายไปขวา','we read numbers left to right',0],[19.02,19.57,'เลยรู้สึกว่า','so it feels like',0],[19.79,20.93,'เลขที่ลงท้ายด้วยเก้า','a price ending in 9',1],[21.3,22.03,'ถูกกว่าที่เป็นจริง','is cheaper than it is',2],
[23.01,24.79,'มีการทดลองกับร้านเสื้อผ้าแบบแคตตาล็อก','a clothing catalog experiment',0],[25.19,26.35,'ตั้งราคาเสื้อตัวเดียวกัน','same shirt, different prices',0],[26.61,27.24,'สี่สิบสี่','$44',1],[27.48,28.1,'สี่สิบเก้า','$49',1],[28.37,29.56,'และห้าสิบสี่ ดอลลาร์','and $54',1],
[30.05,30.47,'ผลคือ','The result',0],[30.8,32.01,'ราคาที่ลงท้ายด้วยเก้า','the price ending in 9',1],[32.21,33.02,'ขายดีกว่า','sold better',2],[33.42,35.19,'ทั้งราคาที่ถูกกว่า และแพงกว่า','than the cheaper and the pricier',0],
[35.83,36.58,'นักวิจัยบอกว่า','Researchers say',0],[36.79,37.75,'คนมองเลขเก้า','people see a 9',1],[37.96,38.89,'เหมือนป้ายลดราคา','like a sale sign',0],[39.19,39.85,'แล้วสรุปเองว่า','and conclude',0],[40.23,40.92,'นี่คือของคุ้ม','this is a bargain',2],
[41.84,42.56,'ฟังดูเป็นไปได้','Sounds plausible',0],[43.05,44.23,'แต่ลองคิดให้ลึกกว่านั้น','but think deeper',1],[44.68,45.98,'ถ้าเลขเก้าดีขนาดนี้','if 9 is that good',0],[46.36,47.09,'มันมีข้อเสียมั้ย','is there a downside?',1],
[48.02,48.42,'มี','Yes',2],[48.82,50.9,'งานวิจัยจากมหาวิทยาลัยรัฐโอไฮโอ','Ohio State University study',0],[51.14,52.08,'ทดลองที่ร้านกาแฟ','at a coffee stand',0],[52.53,52.9,'แก้วเล็ก','small cup',0],[53.15,54.01,'เก้าสิบห้าเซนต์','95 cents',1],[54.22,54.79,'แก้วใหญ่','large cup',0],[54.98,56.19,'หนึ่งดอลลาร์ยี่สิบเซนต์','$1.20',1],
[56.68,58.15,'มีคนเลือกอัปเกรดเป็นแก้วใหญ่','people upgraded to the large',0],[58.33,59.45,'แค่ยี่สิบเก้าเปอร์เซ็นต์','only 29%',2],[59.97,60.71,'แต่พอเปลี่ยนเป็น','but when it became',0],[60.97,61.89,'แก้วเล็กหนึ่งดอลลาร์','small $1',1],[62.28,64.1,'แก้วใหญ่หนึ่งดอลลาร์ยี่สิบห้าเซนต์','large $1.25',1],[64.54,65.94,'ทั้งที่แก้วใหญ่แพงกว่าเดิม','even though it costs more',0],[66.34,68.05,'คนกลับเลือกถึงห้าสิบหกเปอร์เซ็นต์','56% chose it',2],
[68.55,69.55,'เพราะพอราคาข้ามหลักร้อย','because crossing the round number',0],[69.62,70.81,'หรือหลักหนึ่งดอลลาร์','or the $1 mark',0],[71.13,71.94,'สมองเรารู้สึกว่า','our brain feels',0],[72.22,73.44,'ส่วนต่างมันแพงเกินจริง','the gap is too big',2],
[74.03,74.65,'สรุปง่ายๆ','In short',1],[74.89,77.47,'ราคา 99 ไม่ได้ถูกกว่าแค่บาทเดียว','99 isn’t just 1 baht cheaper',0],[77.86,79.11,'มันทำให้สมองรู้สึกว่าคุ้ม','it makes your brain feel it’s a deal',1],[79.39,80.39,'แต่ถ้าต้องเลือกอัปเกรด','but when choosing an upgrade',0],[80.61,82.23,'มันก็ย้อนกลับมาทำร้ายร้านได้','it can backfire on the shop',2],
[82.99,83.88,'คุณเคยหลงกลราคา','Ever fallen for a',0],[83.98,84.84,'เก้าสิบเก้าบ้างมั้ย','99 price?',1],[85.27,86.1,'คอมเมนต์มาได้เลย','tell me in the comments',1],[86.17,86.85,'แล้วติดตาม','and follow',0],[86.85,87.7,'เรื่องสงสัย ด้วยนะ','เรื่องสงสัย',1]];
// ---------- smooth captions (v2) ----------
const CEND=CAPS.map((q,i)=>{const nx=CAPS[i+1];let e=q[1]+.14;const mn=q[0]+.55;if(e<mn)e=mn;if(nx&&e>nx[0]-.02)e=nx[0]-.02;return e});
const _e3=x=>{x=clamp(x);return 1-Math.pow(1-x,3)};
const _soft=x=>{x=clamp(x);const c1=.9,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
function caps(c,t){for(let i=0;i<CAPS.length;i++){const [a,b,s,en,m]=CAPS[i];const end=CEND[i];if(t<a-.02||t>=end)continue;
 const tin=t-a,OUT=Math.min(.16,(end-a)*.35),pout=_e3((end-t)/OUT),pin=_e3(tin/.3);
 const al=clamp(tin/.16)*pout;
 const dy=(1-pin)*38-(1-pout)*14;
 const sc=(.9+.1*_soft(tin/.34))*(1+.025*clamp(tin/(end-a)))*(1-(1-pout)*.04);
 const bl=(1-clamp(tin/.2))*7+(1-pout)*3;
 c.save();c.globalAlpha=al;c.translate(540,1500+dy);c.scale(sc,sc);
 const fs=s.length>24?50:s.length>18?58:68;c.font='800 '+fs+'px '+HF;const w=c.measureText(s).width;
 if(bl>.4)c.filter='blur('+bl.toFixed(1)+'px)';
 if(m===2){const bw=(w+52)*_e3(tin/.32);c.fillStyle=P.red;rr(c,-bw/2,-fs*.95,bw,fs*1.5,18);c.fill()}
 else{c.lineWidth=11;c.strokeStyle='#120d2a';c.lineJoin='round';c.textAlign='center';c.strokeText(s,0,0)}
 c.textAlign='center';c.fillStyle=m===1?'#ffc857':'#fff';c.fillText(s,0,0);
 c.filter='none';
 const ta=clamp((tin-.08)/.18)*pout,ty=(1-_e3((tin-.08)/.3))*16;
 c.globalAlpha=al*ta;c.font='800 32px '+HF;const ew=c.measureText(en).width;c.fillStyle='rgba(10,8,30,.6)';rr(c,-ew/2-18,34+ty,ew+36,48,12);c.fill();c.fillStyle='#fff';c.fillText(en,0,70+ty);c.restore()}}

// ---------- render ----------
const SHAKE=[[74.03,.12,8],[48.02,.1,8]];
function camOf(sh,t,lt,d){return [1+.045*clamp(lt/d),540,960]}
function renderAt(t,canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;c.filter='none';
 let sh=SH[0];for(const s of SH)if(t>=s.a)sh=s;c.fillStyle='#000';c.fillRect(0,0,W,H);
 const lt=t-sh.a,d=sh.b-sh.a;c.save();const [z,fx,fy]=camOf(sh,t,lt,d);let sx=0,sy=0;for(const [a,du,am] of SHAKE){if(t>=a&&t<a+du){const k=1-(t-a)/du;sx+=Math.sin(t*90)*am*k;sy+=Math.cos(t*77)*am*k}}
 c.translate(540+sx+noise(t*.5,1)*3,960+sy+noise(t*.4,4)*3);c.scale(z,z);c.translate(-fx,-fy);sh.fn(c,t,lt);c.restore();
 c.save();c.globalCompositeOperation='soft-light';c.fillStyle='rgba(120,90,200,.12)';c.fillRect(0,0,W,H);c.restore();
 c.save();c.fillStyle=rg(c,540,900,W*.35,H*.7,[[0,'rgba(0,0,0,0)'],[1,'rgba(8,4,30,.5)']]);c.fillRect(0,0,W,H);c.restore();
 const fi=Math.floor(t*30),R=mulberry32(fi*7+3);c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.1;const nt=noiseTile();for(let i=0;i<2;i++)c.drawImage(nt,0,0,256,256,-R()*256,-R()*256,W+300,H+300);c.restore();
 const lt2=t-sh.a;if(sh.a>0&&lt2<.08){c.fillStyle='rgba(10,6,30,'+(.7*(1-lt2/.08))+')';c.fillRect(0,0,W,H)}
 if(t<.2){c.fillStyle='rgba(0,0,0,'+(.4*(1-t/.2))+')';c.fillRect(0,0,W,H)}
 caps(c,t);credit(c);
 if(t>=DUR-.35){c.fillStyle='rgba(0,0,0,'+clamp((t-(DUR-.35))/.3)+')';c.fillRect(0,0,W,H)}}
