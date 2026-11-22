// ---------- helpers (price) ----------
function tag(c,x,y,s,col,rot,k,fs,tc){c.save();c.translate(x,y);c.rotate(rot||0);const kk=k==null?1:k;c.scale(kk,kk);fs=fs||150;c.font='800 '+fs+'px '+HF;const w=Math.max(c.measureText(s).width+110,fs*1.9),h=fs*1.6;
 c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=6;c.beginPath();c.moveTo(0,-h/2-80);c.lineTo(0,-h/2+30);c.stroke();
 c.fillStyle='rgba(8,6,30,.3)';rr(c,-w/2+10,-h/2+14,w,h,34);c.fill();c.fillStyle=col;rr(c,-w/2,-h/2,w,h,34);c.fill();
 c.fillStyle='rgba(20,16,50,.55)';c.beginPath();c.arc(0,-h/2+34,15,0,7);c.fill();
 tx(c,s,0,fs*.3+18,fs,tc||'#1a1530');c.restore()}
function coin(c,x,y,r,s,k){c.save();c.translate(x,y);c.scale(k,k);c.fillStyle=P.amb;c.beginPath();c.arc(0,0,r,0,7);c.fill();c.strokeStyle='#c98a1d';c.lineWidth=r*.1;c.beginPath();c.arc(0,0,r*.8,0,7);c.stroke();tx(c,s,0,r*.34,r*.95,'#7a4a08');c.restore()}
function cup(c,x,y,s,col,o){o=o||{};c.save();c.translate(x,y);c.fillStyle='rgba(8,6,30,.3)';c.beginPath();c.ellipse(0,s*.52,s*.45,s*.08,0,0,7);c.fill();
 c.fillStyle='#f4ecdc';c.beginPath();c.moveTo(-s*.4,-s*.4);c.lineTo(s*.4,-s*.4);c.lineTo(s*.3,s*.5);c.lineTo(-s*.3,s*.5);c.closePath();c.fill();
 c.fillStyle=col;c.beginPath();c.moveTo(-s*.37,-s*.12);c.lineTo(s*.37,-s*.12);c.lineTo(s*.32,s*.24);c.lineTo(-s*.32,s*.24);c.closePath();c.fill();
 c.fillStyle='#3a2f60';rr(c,-s*.46,-s*.52,s*.92,s*.14,s*.06);c.fill();
 if(o.steam){c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=s*.04;c.lineCap='round';for(let i=-1;i<=1;i++){c.beginPath();for(let j=0;j<=12;j++){const yy=-s*.6-j*s*.05,xx=i*s*.18+Math.sin(j*.7+o.t*3+i)*s*.05;j?c.lineTo(xx,yy):c.moveTo(xx,yy)}c.stroke()}}
 c.restore()}
function donut(c,x,y,r,pct,col,k,lab){c.save();c.translate(x,y);c.scale(k,k);c.lineWidth=r*.28;c.strokeStyle='rgba(255,255,255,.22)';c.beginPath();c.arc(0,0,r,0,7);c.stroke();c.strokeStyle=col;c.lineCap='round';c.beginPath();c.arc(0,0,r,-Math.PI/2,-Math.PI/2+Math.PI*2*pct);c.stroke();tx(c,lab,0,r*.3,r*.78,'#fff','center',P.nav1,10);c.restore()}
function brain2(c,x,y,r,t,o){o=o||{};c.save();c.translate(x,y);c.scale(1+.02*Math.sin(t*3),1+.02*Math.sin(t*3));c.fillStyle='#f08aa4';c.beginPath();c.ellipse(-r*.32,0,r*.62,r*.78,0,0,7);c.ellipse(r*.32,0,r*.62,r*.78,0,0,7);c.fill();c.fillStyle='#f6a6bc';c.beginPath();c.ellipse(-r*.3,-r*.12,r*.45,r*.55,0,0,7);c.ellipse(r*.3,-r*.12,r*.45,r*.55,0,0,7);c.fill();
 c.strokeStyle='#c8587a';c.lineWidth=r*.05;c.lineCap='round';for(let i=0;i<4;i++){c.beginPath();c.moveTo(-r*.7+i*.05*r,-r*.4+i*r*.28);c.quadraticCurveTo(-r*.4,-r*.5+i*r*.28,-r*.1,-r*.35+i*r*.28);c.moveTo(r*.7-i*.05*r,-r*.4+i*r*.28);c.quadraticCurveTo(r*.4,-r*.5+i*r*.28,r*.1,-r*.35+i*r*.28);c.stroke()}
 c.beginPath();c.moveTo(0,-r*.7);c.lineTo(0,r*.7);c.stroke();
 if(o.eyes){c.fillStyle='#fff';c.beginPath();c.arc(-r*.28,r*.05,r*.13,0,7);c.arc(r*.28,r*.05,r*.13,0,7);c.fill();c.fillStyle='#2a1d2a';const lx=(o.lookx||0)*r*.06;c.beginPath();c.arc(-r*.28+lx,r*.05,r*.06,0,7);c.arc(r*.28+lx,r*.05,r*.06,0,7);c.fill()}
 c.restore()}
function shirt(c,x,y,s,col){c.save();c.translate(x,y);c.fillStyle='rgba(8,6,30,.25)';c.beginPath();c.ellipse(0,s*.6,s*.5,s*.07,0,0,7);c.fill();c.fillStyle=col;c.beginPath();c.moveTo(-s*.18,-s*.5);c.lineTo(-s*.55,-s*.28);c.lineTo(-s*.4,-s*.02);c.lineTo(-s*.3,-s*.1);c.lineTo(-s*.3,s*.5);c.lineTo(s*.3,s*.5);c.lineTo(s*.3,-s*.1);c.lineTo(s*.4,-s*.02);c.lineTo(s*.55,-s*.28);c.lineTo(s*.18,-s*.5);c.quadraticCurveTo(0,-s*.36,-s*.18,-s*.5);c.closePath();c.fill();c.restore()}
function shop(c,x,y,s,t){c.save();c.translate(x,y);c.fillStyle='#e9dfc9';rr(c,-s*.6,-s*.15,s*1.2,s*.9,14);c.fill();
 for(let i=0;i<8;i++){c.fillStyle=i%2?'#fff4dc':P.red;c.beginPath();c.moveTo(-s*.7+i*s*.175,-s*.5);c.lineTo(-s*.7+(i+1)*s*.175,-s*.5);c.lineTo(-s*.65+(i+1)*s*.175,-s*.1);c.lineTo(-s*.65+i*s*.175,-s*.1);c.closePath();c.fill()}
 c.fillStyle='#6a5ba8';rr(c,-s*.15,s*.1,s*.3,s*.65,10);c.fill();c.fillStyle='#bfe6f0';rr(c,-s*.5,s*.05,s*.28,s*.3,8);c.fill();rr(c,s*.22,s*.05,s*.28,s*.3,8);c.fill();c.restore()}
function lightbulb(c,x,y,r){c.save();c.translate(x,y);c.fillStyle=P.amb;c.beginPath();c.arc(0,0,r,0,7);c.fill();c.fillStyle='#8a7aa0';rr(c,-r*.4,r*.9,r*.8,r*.4,6);c.fill();c.restore()}
function bg1(c,t,seed){plainBG(c,'#2a2150','#4a3a80');stars(c,30,seed,t,1000)}
function bg2(c,t,seed){plainBG(c,'#15405a','#2a2d6a');stars(c,30,seed,t,1000)}
function pop(lt,t0,d){return bo((lt-t0)/(d||.3))}

