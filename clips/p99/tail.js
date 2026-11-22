// ---------- captions ----------
const CAPS=[[.25,1.2,'คุณเคยสงสัยมั้ย','Ever wondered',1],[1.65,2.9,'ทำไมเสียงตัวเองในคลิป','why your voice in a clip',0],[3.04,4.2,'ฟังแล้วอยากลบทิ้ง','makes you want to delete it',1],[4.83,5.65,'อยู่ดูจนจบ','Stay till the end',0],[5.93,7.01,'เพราะมีงานวิจัยหนึ่ง','because of one study',0],[7.26,7.99,'ที่เฉลยว่า','that reveals',0],[8.31,9.96,'ทำไมเราถึงเกลียดเสียงตัวเอง','why we hate our own voice',1],[10.23,11.47,'ทั้งที่มันอาจไม่ได้แย่','when it may not be bad',0],
[12.49,13.18,'ตอนคุณพูด','When you speak',0],[13.58,14.95,'เสียงเดินทางสองทาง','sound takes two paths',1],[15.51,16.02,'ทางแรก','Path one',0],[16.38,17.0,'ผ่านอากาศ','through the air',1],[17.18,18.11,'เข้าหูตรงๆ','straight into the ear',0],[18.7,19.33,'ทางที่สอง','Path two',0],[19.59,20.52,'ผ่านกระดูกกะโหลก','through the skull',1],[20.82,22.11,'สั่นไปถึงหูชั้นใน','vibrating to the inner ear',0],
[22.78,23.8,'เสียงทางกระดูก','Sound via bone',0],[23.84,24.36,'ฟังทุ้มกว่า','sounds deeper',1],[24.84,26.13,'นั่นคือเสียงในหัวของคุณ','that’s the voice in your head',1],[26.95,28.32,'แต่ไมค์อยู่นอกหัว','But the mic is outside your head',0],[28.76,30.1,'มันรับได้แค่ทางอากาศ','it only catches air-borne sound',1],[30.46,31.86,'เสียงในคลิปเลยบางลง','so the clip sounds thinner',0],[32.07,33.14,'ไม่ทุ้มเท่าที่คุ้น','not as deep as you’re used to',1],
[33.76,34.21,'และนี่แหละ','And this is',0],[34.55,36.14,'คือเสียงที่คนอื่นได้ยินมาตลอด','what others have always heard',2],[37.23,38.65,'ทีนี้ถึงงานวิจัย','Now, the study',0],[39.2,40.47,'ให้คนฟังเสียงตัวเอง','People heard their own voice',0],[40.77,42.21,'โดยไม่บอกว่าเป็นเสียงใคร','without being told whose it was',1],
[42.92,43.45,'ผลคือ','The result',0],[43.96,45.2,'เขาให้คะแนนเสียงตัวเอง','they rated their own voice',0],[45.41,46.69,'สูงกว่าที่คนอื่นให้','higher than others did',1],[47.44,47.86,'แปลว่า','Meaning',0],[48.11,49.41,'เสียงเราอาจไม่ได้แย่','our voice may not be bad',1],[49.65,50.58,'แค่เรายังไม่คุ้น','we’re just not used to it',0],
[51.21,51.91,'สรุปง่ายๆ','In short',1],[52.26,52.81,'เสียงในหัว','Voice in your head',0],[52.85,54.11,'คืออากาศ','is air',0],[54.35,54.94,'บวกกระดูก','plus bone',1],[55.56,55.9,'เสียงในคลิป','Voice in a clip',0],[55.97,57.48,'คืออากาศอย่างเดียว','is air only',1],[58.06,58.91,'ไม่มีเสียงไหนปลอม','neither one is fake',2],[59.6,60.37,'แค่คนละแบบ','just different',1],
[61.11,62.43,'คุณเคยฟังเสียงตัวเอง','Ever heard your own voice',0],[62.52,63.2,'แล้วอึ้งมั้ย','and froze?',1],[63.32,64.16,'คอมเมนต์มาได้เลย','tell me in the comments',1],[64.5,65.1,'แล้วติดตาม','and follow',0],[65.1,65.97,'เรื่องสงสัย ด้วยนะ','เรื่องสงสัย',1]];
const CEND=CAPS.map((q,i)=>{const nx=CAPS[i+1];let e=q[1]+.12;const mn=q[0]+.5;if(e<mn)e=mn;if(nx&&e>nx[0]-.02)e=nx[0]-.02;return e});
function caps(c,t){for(let i=0;i<CAPS.length;i++){const [a,b,s,en,m]=CAPS[i];if(t<a-.02||t>=CEND[i])continue;const e=bo((t-a)/.14);c.save();c.translate(540,1500);c.scale(e,e);const fs=s.length>24?50:s.length>18?58:68;c.font='800 '+fs+'px '+HF;const w=c.measureText(s).width;
 if(m===2){c.fillStyle=P.red;rr(c,-w/2-26,-fs*.95,w+52,fs*1.5,18);c.fill()}
 else{c.lineWidth=11;c.strokeStyle='#120d2a';c.lineJoin='round';c.textAlign='center';c.strokeText(s,0,0)}
 c.textAlign='center';c.fillStyle=m===1?'#ffc857':'#fff';c.fillText(s,0,0);
 c.font='800 32px '+HF;const ew=c.measureText(en).width;c.fillStyle='rgba(10,8,30,.6)';rr(c,-ew/2-18,34,ew+36,48,12);c.fill();c.fillStyle='#fff';c.textAlign='center';c.fillText(en,0,70);c.restore()}}
// ---------- render ----------
const SHAKE=[[51.21,.12,8],[7.26,.1,8]];
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
