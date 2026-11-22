const CAPS=[[0.25, 1.22, "คุณเคยสงสัยมั้ย", "Ever wondered", 1], [1.75, 3.29, "ทำไมเราเลื่อนหน้าจอไม่หยุด", "why we can’t stop scrolling", 0], [3.66, 5.18, "ทั้งที่ไม่ได้หาอะไรอยู่เลย", "when we’re not looking for anything", 0], [6.01, 7.75, "เปิดแอปมาแค่จะดูแป๊บเดียว", "opened it for just a sec", 0], [8.2, 8.9, "รู้ตัวอีกที", "next thing you know", 0], [9.26, 10.48, "ผ่านไปครึ่งชั่วโมงแล้ว", "half an hour is gone", 1], [11.58, 13.0, "ในปี ค.ศ. 2006", "in 2006", 1], [13.49, 15.32, "นักออกแบบชื่ออาซา ราสกิน", "designer Aza Raskin", 0], [15.64, 17.24, "คิดระบบเลื่อนไม่รู้จบขึ้นมา", "invented infinite scroll", 0], [17.85, 19.13, "ต่อมาเขาเองยอมรับว่า", "later he admitted", 0], [19.47, 20.48, "มันทำให้คนเสียเวลา", "it made people waste", 0], [20.53, 21.76, "หลายร้อยล้านชั่วโมง", "hundreds of millions of hours", 2], [22.78, 24.48, "หนังยังจบใน 2 ชั่วโมง", "a movie ends in 2 hours", 0], [24.94, 26.57, "หนังสือยังมีบทสุดท้าย", "a book has a last chapter", 0], [27.09, 28.4, "แต่ฟีดไม่มีจุดจบ", "but the feed never ends", 2], [29.24, 30.73, "สมองเลยไม่เคยได้สัญญาณว่า", "so the brain never gets the signal", 0], [30.91, 31.7, "พอได้แล้ว", "enough", 1], [32.61, 34.21, "นักจิตวิทยาชื่อสกินเนอร์", "psychologist Skinner", 0], [34.35, 35.35, "ทดลองกับนกพิราบ", "experimented on pigeons", 0], [35.94, 37.29, "ถ้าอาหารมาไม่แน่นอน", "if food comes unpredictably", 0], [37.65, 38.78, "นกจะจิกคันโยกถี่", "the pigeon pecks the lever more", 0], [38.84, 39.94, "กว่าตอนได้ทุกครั้ง", "than when it always comes", 0], [40.63, 41.4, "ฟีดก็เหมือนกัน", "the feed is the same", 1], [41.8, 42.82, "บางโพสต์โดนใจ", "some posts hit", 0], [43.13, 44.03, "บางโพสต์เฉยๆ", "some are meh", 0], [44.56, 46.48, "คุณไม่รู้ว่าอันต่อไปจะเป็นอันไหน", "you never know what’s next", 1], [47.33, 49.35, "คนที่คิดท่าดึงลงเพื่อรีเฟรช", "the inventor of pull-to-refresh", 0], [49.69, 50.24, "ยังบอกว่า", "said", 0], [50.44, 51.95, "มันคล้ายคันโยกตู้สล็อต", "it’s like a slot machine lever", 0], [52.67, 54.61, "และนี่คือจุดที่ทุกอย่างเริ่มผิดพลาด", "and this is where it all goes wrong", 2], [55.08, 56.8, "คุณไม่ได้เป็นคนเลือกว่าจะดูอะไร", "you don’t choose what you watch", 0], [57.3, 58.32, "แอปเรียนรู้ว่า", "the app learns", 0], [58.59, 59.78, "อะไรทำให้นิ้วคุณหยุด", "what makes your thumb stop", 1], [60.34, 61.87, "แล้วป้อนสิ่งนั้นให้ซ้ำๆ", "then feeds you more of it", 0], [62.46, 63.39, "คุณไม่ได้หาอะไร", "you’re not searching", 0], [63.8, 64.89, "เพราะมันหาให้คุณแทน", "it searches for you", 2], [65.56, 66.23, "สรุปง่ายๆ", "in short", 1], [66.61, 67.86, "คุณไม่ได้เลื่อนเพราะอยากดู", "you don’t scroll to watch", 0], [68.23, 70.4, "แต่เพราะสมองกำลังรอลุ้นอันต่อไป", "your brain waits for the next one", 1], [70.88, 72.59, "และฟีดก็ไม่เคยมีจุดให้หยุด", "and the feed never lets you stop", 0], [73.33, 74.74, "วันนี้คุณเลื่อนไปกี่ชั่วโมงแล้ว", "how many hours today?", 1], [75.12, 75.87, "คอมเมนต์มาได้เลย", "tell me in the comments", 0], [76.14, 77.63, "แล้วกดติดตามเรื่องสงสัยไว้ด้วย", "and follow @เรื่องสงสัย", 0]];
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
const SHAKE=[[52.67,.12,8]];
function camOf(sh,t,lt,d){return [1+.045*clamp(lt/d),540,960]}
function renderAt(t,canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;c.filter='none';
 let sh=SH[0];for(const s of SH)if(t>=s.a)sh=s;c.fillStyle='#000';c.fillRect(0,0,W,H);
 const lt=t-sh.a,d=sh.b-sh.a;c.save();const [z,fx,fy]=camOf(sh,t,lt,d);let sx=0,sy=0;for(const [a,du,am] of SHAKE){if(t>=a&&t<a+du){const k=1-(t-a)/du;sx+=Math.sin(t*90)*am*k;sy+=Math.cos(t*77)*am*k}}
 c.translate(540+sx+noise(t*.5,1)*3,960+sy+noise(t*.4,4)*3);c.scale(z,z);c.translate(-fx,-fy);sh.fn(c,t,lt);c.restore();
 c.save();c.globalCompositeOperation='soft-light';c.fillStyle='rgba(120,90,200,.12)';c.fillRect(0,0,W,H);c.restore();
 c.save();c.fillStyle=rg(c,540,900,W*.35,H*.7,[[0,'rgba(0,0,0,0)'],[1,'rgba(8,4,30,.5)']]);c.fillRect(0,0,W,H);c.restore();
 const fi=Math.floor(t*30),R=mulberry32(fi*7+3);c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.045;const nt=noiseTile();for(let i=0;i<2;i++)c.drawImage(nt,0,0,256,256,-R()*256,-R()*256,W+300,H+300);c.restore();
 const lt2=t-sh.a;if(sh.a>0&&lt2<.08){c.fillStyle='rgba(10,6,30,'+(.7*(1-lt2/.08))+')';c.fillRect(0,0,W,H)}
 if(t<.2){c.fillStyle='rgba(0,0,0,'+(.4*(1-t/.2))+')';c.fillRect(0,0,W,H)}
 caps(c,t);credit(c);
 if(t>=DUR-.35){c.fillStyle='rgba(0,0,0,'+clamp((t-(DUR-.35))/.3)+')';c.fillRect(0,0,W,H)}}
