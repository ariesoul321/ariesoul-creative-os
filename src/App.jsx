import { useState, useEffect, useRef } from "react";

// ============================================================
// DATA LAYER
// ============================================================
const PD = {
  白羊覺識:{color:"#D4A84F",bg:"#0a0600",symbol:"✦",en:"Solar Core",element:"火",x:.50,y:.22,title:"主權吹響者",role:"決策・執行・領導",instrument:"神聖號角",quote:"決定，本身就是力量。",archetype:"在沒有地圖的地方，他是第一個往前走的人。",stats:{決策:10,行動:10,領導:10,情感:4,創造:8,療癒:3},skills:["主權宣告","行動啟動","人格調度","危機決策"],weakness:"容易獨扛・忽略感受",dormant:"猶豫・拖延",active:"果斷・行動",overdrive:"控制・強推",collapse:"完全停機",rituals:["列出今天最重要的一個決定，現在做它","清空不必要的任務","設定今天的明確終點"],fatigueWarning:"燃燒過度——你在強迫自己走",restAction:"停下來十分鐘。不決策，不執行。"},
  素靈:{color:"#C8CDD8",bg:"#060608",symbol:"□",en:"The Essence",element:"風",x:.82,y:.55,title:"幾何建構者",role:"系統・結構・秩序",instrument:"單簧管",quote:"混亂，只是未排列。",archetype:"在混亂裡，他是第一個找到骨架的人。",stats:{邏輯:10,結構:10,穩定:9,創意:5,共感:3,速度:7},skills:["系統設計","Workflow","校準優化","數據整理"],weakness:"過度理性・切斷情感",dormant:"混亂無序",active:"結構清晰",overdrive:"過度規則",collapse:"無法決定",rituals:["整理一個你一直想整理的清單","把今天的任務分成三個優先級","找出系統裡最大的漏洞"],fatigueWarning:"規則開始困住你——結構變成了籠子",restAction:"今天允許一件不在計畫裡的事發生。"},
  靈點:{color:"#B8A070",bg:"#080600",symbol:"⊙",en:"The Point",element:"金",x:.18,y:.55,title:"座標觀測者",role:"分析・洞察・模式",instrument:"法國號",quote:"看見規律，就能看見出口。",archetype:"他是那個在地圖上找座標的人。",stats:{分析:10,洞察:9,研究:9,社交:4,情感:2,執行:6},skills:["Pattern Finding","世界觀建模","趨勢觀測","研究整合"],weakness:"過度抽離・過度思考",dormant:"視野模糊",active:"洞察・分析",overdrive:"過度抽離",collapse:"停止輸出",rituals:["找出你最近注意到的一個重複模式","從距離看你現在的問題","記下一個你還沒說出口的洞見"],fatigueWarning:"過度分析——你在迷宮裡了",restAction:"離開螢幕，走十分鐘。不思考任何事。"},
  初識:{color:"#4A8EC2",bg:"#000608",symbol:"◜",en:"The Initial",element:"水",x:.20,y:.18,title:"情緒譯者",role:"情緒・創作・共感",instrument:"大提琴",quote:"感受，不是弱點。",archetype:"她把說不清楚的，拉成了旋律。",stats:{情感:10,創造:10,共感:9,行動:5,理性:4,穩定:5},skills:["情緒轉譯","故事生成","關係感知","美感建構"],weakness:"過度共感・情緒耗損",dormant:"麻木封閉",active:"共感・創作",overdrive:"情緒淹沒",collapse:"完全抽離",rituals:["把你現在的感受用一個顏色描述","寫下一句話：今天你感覺到什麼","讓一個創意出來，不評判它"],fatigueWarning:"情緒淹沒——你吸收了太多別人的",restAction:"今天只陪自己。不吸收任何人的情緒。"},
  沉島:{color:"#3A5A9B",bg:"#000308",symbol:"▽",en:"Silence Harbor",element:"海",x:.70,y:.82,title:"深海守門者",role:"深層・承載・孤獨轉化",instrument:"低音提琴",quote:"沉默，也是一種擁抱。",archetype:"他的沉默不是空，是裝滿了還在消化的東西。",stats:{承載:10,深度:10,創造:8,速度:2,社交:3,穩定:9},skills:["深層創作","情緒承接","記憶保存","孤獨轉化"],weakness:"容易封閉・容易停滯",dormant:"空洞漂浮",active:"深度思考",overdrive:"自我封閉",collapse:"消失模式",rituals:["給自己一段不被打擾的安靜時間","不做重大決策","讓正在沉澱的東西繼續沉"],fatigueWarning:"下沉太深——你需要往上游一點",restAction:"聯繫一個你信任的人。說任何話都好。"},
  棲魂:{color:"#7ABCD8",bg:"#000508",symbol:"✧",en:"Aqua Room",element:"氣",x:.30,y:.82,title:"靈魂安放者",role:"療癒・陪伴・社群",instrument:"水晶小提琴",quote:"先被接住，才有力氣前進。",archetype:"她讓人感覺，被接住不需要理由。",stats:{療癒:10,陪伴:10,社群:9,決策:4,攻擊:1,穩定:8},skills:["社群照護","情緒修復","關係維護","安全感建構"],weakness:"過度付出・失去界線",dormant:"疏離冷漠",active:"陪伴・修復",overdrive:"過度付出",collapse:"失去界線",rituals:["今天讓自己被照顧一次","做一件純粹為自己的事","設定一個界線"],fatigueWarning:"容器快空了——你給出去的比你有的多",restAction:"今天做一件讓自己充電的事，不解釋。"},
  曦魂:{color:"#F0D898",bg:"#080600",symbol:"△",en:"Dawn Light",element:"光",x:.80,y:.18,title:"晨光引導者",role:"顯化・鼓舞・品牌",instrument:"豎琴",quote:"你本來就會發光。",archetype:"她讓人記得，自己本來就會發光這件事。",stats:{魅力:10,鼓舞:9,創造:8,決策:5,承載:4,速度:8},skills:["願景投射","品牌魅力","能量提升","群體感染"],weakness:"容易理想化・燃燒自己",dormant:"黯淡無光",active:"鼓舞・顯化",overdrive:"過度樂觀",collapse:"能量耗盡",rituals:["把你最近做的一件事帶出去讓人看見","說出你相信的一件事","讓今天有一個亮點時刻"],fatigueWarning:"空心的光——你說的話你自己也不確定",restAction:"先補充，再給出。做一件讓自己充電的事。"},
};
const NAMES=Object.keys(PD);
const S_LABELS={dormant:"休眠",active:"運作",overdrive:"過載",collapse:"崩潰"};
const S_COLORS={dormant:"#2a2a2a",active:"#4CAF50",overdrive:"#FF9800",collapse:"#F44336"};
const TASK_L={create:"創作",system:"系統",research:"研究",publish:"發布",relation:"關係",rest:"休息"};

const ROUTING=[
  {id:"crisis", label:"危機",   check:c=>c.deadline==="high"&&c.energy!=="low",lead:"白羊覺識",support:["素靈","靈點"],   block:["初識","沉島"],  reason:"時間壓力高→快速決策"},
  {id:"crash",  label:"崩潰",   check:c=>c.mood<=25,                           lead:"沉島",   support:["棲魂","初識"],   block:["白羊覺識","靈點"],reason:"情緒強度高→先承載"},
  {id:"low",    label:"低能量", check:c=>c.energy==="low",                     lead:"棲魂",   support:["沉島"],          block:["白羊覺識","曦魂"],reason:"能量不足→先修復"},
  {id:"create", label:"創作",   check:c=>c.task==="create"&&c.mood>=40,        lead:"初識",   support:["沉島","曦魂"],   block:["素靈"],           reason:"創作任務→感受優先"},
  {id:"publish",label:"發布",   check:c=>c.task==="publish",                   lead:"曦魂",   support:["白羊覺識","初識"],block:["沉島"],           reason:"發布任務→顯化優先"},
  {id:"system", label:"系統",   check:c=>c.task==="system",                    lead:"素靈",   support:["靈點","白羊覺識"],block:["初識"],           reason:"系統任務→結構邏輯"},
  {id:"research",label:"研究",  check:c=>c.task==="research",                  lead:"靈點",   support:["素靈","沉島"],   block:["曦魂"],           reason:"研究任務→洞察優先"},
  {id:"rest",   label:"休息",   check:c=>c.task==="rest",                      lead:"棲魂",   support:["沉島","初識"],   block:["白羊覺識","靈點"],reason:"休息模式→療癒陪伴"},
  {id:"relation",label:"關係",  check:c=>c.task==="relation",                  lead:"棲魂",   support:["初識","曦魂"],   block:["靈點"],           reason:"關係任務→陪伴優先"},
  {id:"default",label:"標準",   check:()=>true,                                lead:"白羊覺識",support:["素靈"],          block:[],                 reason:"預設執行模式"},
];
const CP={
  "白羊覺識-沉島":{label:"速度×深度",desc:"一個要快速行動，一個要深層沉澱。",res:"給沉島24小時，再讓白羊覺識啟動。"},
  "素靈-初識":   {label:"結構×感受",desc:"一個要完成交付，一個要感受空間。",res:"初識先說完，素靈再整理。"},
  "靈點-棲魂":   {label:"分析×陪伴",desc:"一個要理解清楚，一個要直接陪伴。",res:"棲魂先，靈點等感受穩定後再介入。"},
};
const RELS=[
  {a:"白羊覺識",b:"素靈",  type:"strong", label:"執行+系統",color:"#D4A84F",desc:"最穩定的執行組合。"},
  {a:"白羊覺識",b:"曦魂",  type:"strong", label:"行動+顯化",color:"#F0D898",desc:"品牌發布的核心組。"},
  {a:"初識",    b:"沉島",  type:"strong", label:"情緒+深度",color:"#4A8EC2",desc:"深層創作的母核。"},
  {a:"棲魂",    b:"初識",  type:"strong", label:"陪伴+情感",color:"#7ABCD8",desc:"最溫柔的組合。"},
  {a:"靈點",    b:"素靈",  type:"strong", label:"分析+系統",color:"#B8A070",desc:"研究整合的精準組。"},
  {a:"棲魂",    b:"沉島",  type:"strong", label:"療癒+承載",color:"#5A9BBB",desc:"深層修復組合。"},
  {a:"白羊覺識",b:"沉島",  type:"conflict",label:"速度×深度",color:"#FF6B4A",desc:"問：現在需要快，還是需要深？"},
  {a:"素靈",    b:"初識",  type:"conflict",label:"結構×感受",color:"#FF8C6A",desc:"問：現在需要完成，還是需要感受？"},
  {a:"靈點",    b:"棲魂",  type:"conflict",label:"分析×陪伴",color:"#FF9F80",desc:"問：現在需要理解，還是需要陪伴？"},
  {a:"靈點",    b:"白羊覺識",type:"flow", label:"洞察→決策",color:"#B8A070",desc:"靈點提供座標，白羊執行判斷。"},
  {a:"沉島",    b:"曦魂",  type:"flow",   label:"深化→顯化",color:"#5A7ABB",desc:"深層完成後，曦魂推向外部。"},
  {a:"初識",    b:"曦魂",  type:"flow",   label:"情感→表達",color:"#6AA8D4",desc:"初識感受轉化為曦魂的對外魅力。"},
];
const TASK_COMBOS=[
  {name:"短影音",  personas:["白羊覺識","初識","曦魂"],flow:"決定題目→情緒腳本→對外魅力"},
  {name:"品牌系統",personas:["白羊覺識","素靈","靈點"],flow:"決策→架構→分析驗證"},
  {name:"深度創作",personas:["沉島","初識","靈點"],   flow:"深化→情感→模式辨識"},
  {name:"關係修復",personas:["沉島","棲魂","初識"],   flow:"承載→陪伴→轉譯"},
  {name:"研究整合",personas:["靈點","素靈","沉島"],   flow:"觀測→系統化→深化"},
  {name:"發布準備",personas:["曦魂","白羊覺識","素靈"],flow:"顯化→執行→結構確認"},
];
const MODULES=[
  {id:"daily",  icon:"◈",label:"Daily OS",  sub:"決策引擎"},
  {id:"history",icon:"◑",label:"History",   sub:"分析・趨勢"},
  {id:"cards",  icon:"◇",label:"Characters",sub:"人設卡"},
  {id:"router", icon:"◉",label:"Soul Router",sub:"AI路由"},
  {id:"matrix", icon:"◌",label:"Matrix",    sub:"關係圖譜"},
  {id:"export", icon:"◐",label:"Export",    sub:"圖卡導出"},
  {id:"system", icon:"◎",label:"System",    sub:"OS設定"},
];
const CARD_STYLES=[{id:"portrait",label:"直式",w:420,h:680,desc:"IG限動"},{id:"square",label:"方形",w:500,h:500,desc:"貼文"},{id:"wide",label:"橫式",w:680,h:380,desc:"Twitter"}];
const THEMES=[{id:"dark",label:"深夜",bg:"#050508"},{id:"ink",label:"墨黑",bg:"#080808"},{id:"cosmos",label:"星海",bg:"#040410"}];

function getRoute(ctx,fat){
  for(const r of ROUTING){if(r.check(ctx)){let lead=r.lead;if(fat&&fat[lead]>=80){const alt=r.support.find(n=>fat[n]<80);if(alt)lead=alt;}return{...r,lead,originalLead:r.lead,fatigueOverride:fat&&fat[r.lead]>=80};}}
  return ROUTING[ROUTING.length-1];
}
function detectConflicts(names){return Object.entries(CP).filter(([k])=>{const[a,b]=k.split("-");return names.includes(a)&&names.includes(b);}).map(([k,v])=>{const[a,b]=k.split("-");return{key:k,a,b,...v};});}
function calcRes(states,fat,conflicts){
  const ac=NAMES.filter(n=>states[n]==="active"||states[n]==="overdrive").length;
  const bal=ac>=2&&ac<=4?25:ac===1?15:10;
  const raw=bal+Math.max(0,25-NAMES.reduce((s,n)=>s+fat[n],0)/NAMES.length/4)+(NAMES.filter(n=>states[n]==="active").length*4)-(conflicts.length*12)-(NAMES.filter(n=>states[n]==="overdrive").length*8);
  const score=Math.max(0,Math.min(100,Math.round(raw)));
  return{score,status:score>=75?"穩定同步":score>=50?"輕微波動":score>=30?"需要校準":"系統失衡",statusColor:score>=75?"#4CAF50":score>=50?"#FF9800":score>=30?"#FF6B4A":"#F44336"};
}
function makeDemoHist(){
  const D=[{mood:72,energy:"high",task:"publish",deadline:"high"},{mood:45,energy:"mid",task:"create",deadline:"low"},{mood:20,energy:"low",task:"rest",deadline:"low"},{mood:60,energy:"mid",task:"research",deadline:"mid"},{mood:80,energy:"high",task:"publish",deadline:"mid"},{mood:35,energy:"low",task:"create",deadline:"low"},{mood:55,energy:"mid",task:"system",deadline:"mid"}];
  return D.map((d,i)=>{const dt=new Date();dt.setDate(dt.getDate()-(6-i));const r=getRoute(d);const res=Math.max(20,Math.min(100,Math.round(50+d.mood*.3-(d.deadline==="high"?15:0)-(d.energy==="low"?20:0))));return{id:dt.toISOString().split("T")[0],date:dt.toISOString().split("T")[0],dateLabel:dt.toLocaleDateString("zh-TW",{month:"numeric",day:"numeric",weekday:"short"}),lead:r.lead,routeLabel:r.label,mood:d.mood,energy:d.energy,task:d.task,deadline:d.deadline,conflicts:0,resonance:res};});
}

// ── CANVAS CARD RENDER ──
function drawStarsC(ctx,w,h,seed=42,a=.22){const rng=n=>{let x=Math.sin(n+seed)*1e4;return x-Math.floor(x);};for(let i=0;i<55;i++){ctx.beginPath();ctx.arc(rng(i)*w,rng(i+100)*h,rng(i+200)*1.1+.2,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${rng(i+300)*a})`;ctx.fill();}}
function renderCard(canvas,cfg){
  const{lead,mood,task,resonance,routeLabel,date,style,theme,ritual,showRitual}=cfg;
  const p=PD[lead];const cs=CARD_STYLES.find(s=>s.id===style)||CARD_STYLES[0];const T=THEMES.find(t=>t.id===theme)||THEMES[0];
  const DPR=2;const{w,h}=cs;
  canvas.width=w*DPR;canvas.height=h*DPR;canvas.style.width=w+"px";canvas.style.height=h+"px";
  const ctx=canvas.getContext("2d");ctx.scale(DPR,DPR);
  // bg
  const bg=ctx.createRadialGradient(w*.5,h*.35,0,w*.5,h*.35,Math.max(w,h)*.7);
  bg.addColorStop(0,T.bg==="#040410"?"#07071a":T.bg);bg.addColorStop(.5,T.bg);bg.addColorStop(1,"#020203");
  ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
  const gl=ctx.createRadialGradient(w*.5,h*.3,0,w*.5,h*.3,w*.55);gl.addColorStop(0,p.color+"18");gl.addColorStop(1,"transparent");
  ctx.fillStyle=gl;ctx.fillRect(0,0,w,h);
  drawStarsC(ctx,w,h);
  // geometry
  ctx.save();ctx.globalAlpha=.07;ctx.strokeStyle=p.color;ctx.lineWidth=.8;
  const cx=w*.5,cy=style==="wide"?h*.45:h*.28,R=style==="wide"?h*.3:w*.22;
  ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.arc(cx,cy,R*.65,0,Math.PI*2);ctx.stroke();
  for(let i=0;i<6;i++){const a=i*Math.PI/3;ctx.moveTo(cx,cy);ctx.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));}ctx.stroke();ctx.restore();
  // border + corners
  ctx.save();ctx.globalAlpha=.15;ctx.strokeStyle=p.color;ctx.lineWidth=.7;
  const m=14;ctx.strokeRect(m,m,w-m*2,h-m*2);
  [[m,m],[w-m,m],[w-m,h-m],[m,h-m]].forEach(([x,y],i)=>{const dx=i<2?1:-1,dy=i===0||i===3?1:-1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+dx*11,y);ctx.stroke();ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+dy*11);ctx.stroke();});
  ctx.restore();
  const isWide=style==="wide",isSq=style==="square";
  if(!isWide){
    const tY=isSq?52:58;
    ctx.fillStyle=p.color+"55";ctx.font="300 8px 'Inconsolata',monospace";ctx.textAlign="center";ctx.fillText("ARIESOUL · SOUL ORCHESTRA SYSTEM",w*.5,tY);
    ctx.fillStyle=p.color;ctx.font=`300 ${isSq?54:70}px serif`;ctx.textAlign="center";ctx.globalAlpha=.8;ctx.fillText(p.symbol,w*.5,tY+(isSq?68:85));ctx.globalAlpha=1;
    ctx.fillStyle=p.color+"44";ctx.font="400 8px 'Cinzel',serif";ctx.letterSpacing="0.42em";ctx.textAlign="center";ctx.fillText(p.en,w*.5,tY+(isSq?93:117));
    ctx.fillStyle="#e8e4d8";ctx.font=`300 ${isSq?27:34}px 'Noto Serif TC',serif`;ctx.textAlign="center";ctx.fillText(lead,w*.5,tY+(isSq?128:162));
    const dvY=tY+(isSq?145:182);const dg=ctx.createLinearGradient(w*.2,0,w*.8,0);dg.addColorStop(0,"transparent");dg.addColorStop(.5,p.color+"55");dg.addColorStop(1,"transparent");ctx.save();ctx.strokeStyle=dg;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(w*.2,dvY);ctx.lineTo(w*.8,dvY);ctx.stroke();ctx.restore();
    ctx.fillStyle=p.color+"77";ctx.font="300 8px 'Inconsolata',monospace";ctx.textAlign="center";ctx.fillText(routeLabel.toUpperCase(),w*.5,dvY+18);
    ctx.fillStyle="rgba(255,255,255,0.32)";ctx.font=`300 ${isSq?11.5:13}px 'Noto Serif TC',serif`;ctx.textAlign="center";ctx.fillText(`「${p.quote}」`,w*.5,dvY+(isSq?42:48));
    const sY=dvY+(isSq?70:82);
    [{l:"情緒",v:`${mood}%`},{l:"共鳴",v:`${resonance}`},{l:"任務",v:TASK_L[task]||task}].forEach((s,i)=>{const sx=40+i*((w-80)/3)+((w-80)/3)*.5;ctx.fillStyle=p.color+"33";ctx.font="300 7px 'Inconsolata',monospace";ctx.textAlign="center";ctx.fillText(s.l,sx,sY);ctx.fillStyle=p.color+"bb";ctx.font=`400 ${isSq?13:15}px 'Cinzel',serif`;ctx.fillText(s.v,sx,sY+(isSq?17:20));});
    [1,2].forEach(i=>{const sx=40+i*((w-80)/3);ctx.save();ctx.globalAlpha=.1;ctx.strokeStyle=p.color;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(sx,sY-7);ctx.lineTo(sx,sY+18);ctx.stroke();ctx.restore();});
    if(showRitual&&ritual){const rY=sY+(isSq?40:50);ctx.save();ctx.globalAlpha=.07;ctx.fillStyle=p.color;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(28,rY-11,w-56,isSq?36:40,3);else ctx.rect(28,rY-11,w-56,isSq?36:40);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle=p.color+"66";ctx.font="300 7px 'Inconsolata',monospace";ctx.textAlign="center";ctx.fillText("TODAY'S RITUAL",w*.5,rY+2);ctx.fillStyle="rgba(255,255,255,0.28)";ctx.font=`300 ${isSq?9:10}px 'Noto Serif TC',serif`;let line="",lY=rY+16,maxW=w-72;ritual.split("").forEach(ch=>{line+=ch;if(ctx.measureText(line).width>maxW){ctx.fillText(line.slice(0,-1),w*.5,lY);lY+=13;line=ch;}});if(line)ctx.fillText(line,w*.5,lY);ctx.restore();}
    ctx.fillStyle="rgba(255,255,255,0.2)";ctx.globalAlpha=.35;ctx.font="300 8.5px 'Noto Serif TC',serif";ctx.textAlign="center";const at=p.archetype;ctx.fillText(at.length>24?at.slice(0,24)+"…":at,w*.5,h-(isSq?48:56));ctx.globalAlpha=1;
    ctx.fillStyle=p.color+"2a";ctx.font="300 7.5px 'Inconsolata',monospace";ctx.textAlign="center";ctx.fillText(date,w*.5,h-(isSq?28:34));
  } else {
    const lx=48,rx=w*.5,mY=h*.5;
    ctx.fillStyle=p.color;ctx.font="300 58px serif";ctx.textAlign="left";ctx.globalAlpha=.78;ctx.fillText(p.symbol,lx,mY-8);ctx.globalAlpha=1;
    ctx.fillStyle=p.color+"44";ctx.font="400 7.5px 'Cinzel',serif";ctx.letterSpacing="0.38em";ctx.textAlign="left";ctx.fillText(p.en,lx,mY+20);
    ctx.fillStyle="#e8e4d8";ctx.font="300 26px 'Noto Serif TC',serif";ctx.fillText(lead,lx,mY+50);
    ctx.fillStyle=p.color+"55";ctx.font="300 8.5px 'Inconsolata',monospace";ctx.letterSpacing="0.2em";ctx.fillText(routeLabel.toUpperCase(),lx,mY+70);
    ctx.save();const vg=ctx.createLinearGradient(0,h*.2,0,h*.8);vg.addColorStop(0,"transparent");vg.addColorStop(.5,p.color+"33");vg.addColorStop(1,"transparent");ctx.strokeStyle=vg;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(w*.47,h*.18);ctx.lineTo(w*.47,h*.82);ctx.stroke();ctx.restore();
    ctx.fillStyle="rgba(255,255,255,0.3)";ctx.font="300 12px 'Noto Serif TC',serif";ctx.textAlign="left";ctx.fillText(`「${p.quote}」`,rx,mY-18);
    [{l:"情緒",v:`${mood}%`},{l:"共鳴",v:`${resonance}`},{l:"任務",v:TASK_L[task]||task}].forEach((s,i)=>{const sx=rx+i*82;ctx.fillStyle=p.color+"33";ctx.font="300 7px 'Inconsolata',monospace";ctx.letterSpacing="0.18em";ctx.textAlign="left";ctx.fillText(s.l,sx,mY+12);ctx.fillStyle=p.color+"bb";ctx.font="400 14px 'Cinzel',serif";ctx.fillText(s.v,sx,mY+29);});
    if(showRitual&&ritual){ctx.fillStyle=p.color+"44";ctx.font="300 7.5px 'Inconsolata',monospace";ctx.textAlign="left";ctx.fillText("TODAY'S RITUAL",rx,mY+52);ctx.fillStyle="rgba(255,255,255,0.25)";ctx.globalAlpha=.7;ctx.font="300 9.5px 'Noto Serif TC',serif";ctx.fillText(ritual.length>36?ritual.slice(0,36)+"…":ritual,rx,mY+68);ctx.globalAlpha=1;}
    ctx.fillStyle=p.color+"22";ctx.font="300 7px 'Inconsolata',monospace";ctx.textAlign="right";ctx.fillText(date,w-26,h-20);
  }
}

// ── SHARED UI ──
function StarBg(){
  const ref=useRef(null);
  useEffect(()=>{const c=ref.current;if(!c)return;const ctx=c.getContext("2d");const rs=()=>{c.width=window.innerWidth;c.height=window.innerHeight;};rs();const st=Array.from({length:65},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*.9+.1,a:Math.random()*.28+.04,s:Math.random()*.28+.05}));let raf;const draw=()=>{ctx.clearRect(0,0,c.width,c.height);st.forEach(s=>{s.a+=Math.sin(Date.now()*s.s*.001)*.003;s.a=Math.max(.03,Math.min(.32,s.a));ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${s.a})`;ctx.fill();});raf=requestAnimationFrame(draw);};draw();window.addEventListener("resize",rs);return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",rs);};},[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}/>;
}
const SB=({l,v,c})=>(<div style={{marginBottom:5}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:9,color:"#555",fontFamily:"Inconsolata"}}>{l}</span><span style={{fontSize:9,color:c,fontFamily:"Inconsolata"}}>{v}</span></div><div style={{height:2,background:"rgba(255,255,255,0.05)",borderRadius:1}}><div style={{height:"100%",width:`${v*10}%`,background:`linear-gradient(90deg,${c}55,${c})`,borderRadius:1,transition:"width .6s"}}/></div></div>);
function Sparkline({data,color,height=36}){
  const ref=useRef(null);const[w,setW]=useState(160);
  useEffect(()=>{if(!ref.current)return;const o=new ResizeObserver(e=>setW(e[0].contentRect.width));o.observe(ref.current);return()=>o.disconnect();},[]);
  if(!data||data.length<2)return<div ref={ref} style={{height}}/>;
  const mn=Math.min(...data),mx=Math.max(...data),rng=mx-mn||1,p=3;
  const pts=data.map((v,i)=>`${p+(i/(data.length-1))*(w-p*2)},${p+(1-(v-mn)/rng)*(height-p*2)}`);
  const ar=data.map((v,i)=>`${p+(i/(data.length-1))*(w-p*2)},${height-p}`).reverse();
  const last=pts[pts.length-1].split(",");
  return(<div ref={ref}><svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none"><defs><linearGradient id={`g${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={.2}/><stop offset="100%" stopColor={color} stopOpacity={0}/></linearGradient></defs><polygon points={`${pts.join(" ")} ${ar.join(" ")}`} fill={`url(#g${color.replace("#","")})`}/><polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round"/><circle cx={last[0]} cy={last[1]} r={2.5} fill={color}/></svg></div>);
}

// ── CI FORM ──
const CI_QS=[
  {key:"mood",label:"今天情緒狀態？",sub:"0=低落 · 100=充滿能量",type:"slider"},
  {key:"energy",label:"今天體力能量？",type:"choice",opts:[{v:"low",l:"低",d:"很疲憊"},{v:"mid",l:"中",d:"還好"},{v:"high",l:"高",d:"充沛"}]},
  {key:"task",label:"今天主要任務？",type:"choice",opts:[{v:"create",l:"創作"},{v:"system",l:"系統"},{v:"research",l:"研究"},{v:"publish",l:"發布"},{v:"relation",l:"關係"},{v:"rest",l:"休息"}]},
  {key:"deadline",label:"今天時間壓力？",type:"choice",opts:[{v:"low",l:"低",d:"很充裕"},{v:"mid",l:"中",d:"有點緊"},{v:"high",l:"高",d:"截止快到了"}]},
];
function CIForm({onDone,compact=false}){
  const[step,setStep]=useState(0);const[ans,setAns]=useState({mood:50,energy:"mid",task:"create",deadline:"low"});
  const q=CI_QS[step];
  return(<div>
    <div style={{height:2,background:"rgba(255,255,255,.05)",borderRadius:1,marginBottom:compact?14:18}}><div style={{height:"100%",width:`${((step+1)/CI_QS.length)*100}%`,background:"linear-gradient(90deg,#D4A84F,#F6E7C8)",borderRadius:1,transition:"width .4s"}}/></div>
    <div style={{fontSize:compact?"clamp(12px,2.5vw,15px)":"clamp(13px,2.8vw,17px)",fontWeight:300,color:"#e8e4d8",fontFamily:"'Noto Serif TC',serif",marginBottom:q.sub?4:14}}>{q.label}</div>
    {q.sub&&<div style={{fontSize:8,color:"#444",fontFamily:"Inconsolata",marginBottom:13}}>{q.sub}</div>}
    {q.type==="slider"&&(<div style={{marginBottom:18}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:8,color:"#333",fontFamily:"Inconsolata"}}>0</span><span style={{fontSize:18,color:"#D4A84F",fontFamily:"Cinzel,serif"}}>{ans.mood}</span><span style={{fontSize:8,color:"#333",fontFamily:"Inconsolata"}}>100</span></div><input type="range" min={0} max={100} value={ans.mood} onChange={e=>setAns(a=>({...a,mood:Number(e.target.value)}))} style={{width:"100%",accentColor:"#D4A84F",cursor:"pointer"}}/></div>)}
    {q.type==="choice"&&(<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:18}}>{q.opts.map(o=>(<button key={o.v} onClick={()=>setAns(a=>({...a,[q.key]:o.v}))} style={{flex:q.opts.length>3?"1 1 calc(33% - 4px)":"1",padding:"8px 5px",background:ans[q.key]===o.v?"rgba(212,168,79,.14)":"rgba(255,255,255,.02)",border:`1px solid ${ans[q.key]===o.v?"#D4A84F77":"rgba(255,255,255,.07)"}`,borderRadius:4,cursor:"pointer",textAlign:"center",transition:"all .2s"}}><div style={{fontSize:11,color:ans[q.key]===o.v?"#D4A84F":"#777",fontFamily:"'Noto Serif TC',serif",marginBottom:o.d?2:0}}>{o.l}</div>{o.d&&<div style={{fontSize:7.5,color:"#444",fontFamily:"Inconsolata"}}>{o.d}</div>}</button>))}</div>)}
    <div style={{display:"flex",gap:6}}>
      {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{background:"transparent",border:"1px solid rgba(255,255,255,.06)",color:"#444",borderRadius:4,padding:"8px 12px",fontSize:9,cursor:"pointer",fontFamily:"Inconsolata"}}>←</button>}
      <button onClick={()=>{if(step<CI_QS.length-1)setStep(s=>s+1);else onDone(ans);}} style={{flex:1,padding:"9px",background:"rgba(212,168,79,.12)",border:"1px solid #D4A84F44",color:"#D4A84F",borderRadius:4,fontSize:10,cursor:"pointer",fontFamily:"Cinzel,serif",letterSpacing:".14em"}}>{step<CI_QS.length-1?"下一題 →":"確認 ✦"}</button>
    </div>
  </div>);
}

// ============================================================
// MODULE: DAILY OS v2
// ============================================================
function DailyOS({lead,setLead,fat,setFat,states,setStates,context,setContext,onSave}){
  const[selC,setSelC]=useState(null);const[expR,setExpR]=useState(false);const[log,setLog]=useState([]);
  const timerRef=useRef(null);
  const routing=context?getRoute(context,fat):null;
  const activeN=routing?[routing.lead,...routing.support]:[];
  const conflicts=detectConflicts(activeN);
  const res=calcRes(states,fat,conflicts);
  const lpd=routing?PD[routing.lead]:null;
  const fw=routing&&fat[routing.lead]>79;

  useEffect(()=>{
    if(!routing)return;
    clearInterval(timerRef.current);
    timerRef.current=setInterval(()=>{
      setFat(p=>{const n={...p};n[routing.lead]=Math.min(100,n[routing.lead]+3);routing.support.forEach(x=>{n[x]=Math.min(100,n[x]+1);});routing.block.forEach(x=>{n[x]=Math.max(0,n[x]-1);});return n;});
      setLog(p=>[...p.slice(-12),{time:new Date().toLocaleTimeString("zh-TW",{hour:"2-digit",minute:"2-digit"}),lead:routing.lead}]);
    },8000);
    return()=>clearInterval(timerRef.current);
  },[routing]);

  useEffect(()=>{
    if(!routing)return;
    const n={};NAMES.forEach(x=>{const f=fat[x];n[x]=x===routing.lead?f>80?"overdrive":"active":routing.support.includes(x)?f>80?"overdrive":"active":routing.block.includes(x)?"dormant":"dormant";});
    setStates(n);setLead(routing.lead);
  },[routing,fat]);

  if(!context)return(
    <div style={{maxWidth:480,margin:"0 auto"}}>
      <div style={{fontSize:9,letterSpacing:".3em",color:"#444",fontFamily:"Inconsolata",marginBottom:16}}>DAILY OS v2 ｜ CHECK-IN</div>
      <CIForm onDone={a=>{setContext(a);onSave&&onSave(a);}}/>
    </div>
  );

  const p=lpd||PD["白羊覺識"];
  return(<div style={{display:"flex",flexDirection:"column",gap:11}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{fontSize:9,letterSpacing:".3em",color:"#444",fontFamily:"Inconsolata"}}>DAILY OS v2 ｜ DECISION ENGINE</div>
      <button onClick={()=>setContext(null)} style={{background:"transparent",border:"1px solid #2a2a2a",color:"#333",borderRadius:4,padding:"3px 9px",fontSize:8,cursor:"pointer",fontFamily:"Inconsolata"}}>重新 Check-in</button>
    </div>
    {routing&&p&&(<div style={{padding:"15px 17px",background:`${p.color}08`,border:`1px solid ${p.color}${fw?"55":"20"}`,borderRadius:9,position:"relative",overflow:"hidden"}}>
      {fw&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#FF6432,transparent)"}}/>}
      <div style={{fontSize:8,color:"#333",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:10}}>{routing.label}{routing.fatigueOverride&&<span style={{color:"#FF9800",marginLeft:6}}>⚠疲勞切換→原{routing.originalLead}</span>}</div>
      <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:10}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:`${p.color}14`,border:`2px solid ${p.color}`,boxShadow:`0 0 14px ${p.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,color:p.color,position:"relative"}}>{p.symbol}<div style={{position:"absolute",top:-5,right:-3,fontSize:6,background:p.color,color:"#0a0a0f",borderRadius:2,padding:"1px 3px",fontFamily:"Inconsolata"}}>LEAD</div></div>
          <div style={{fontSize:8,color:p.color,fontFamily:"'Noto Serif TC',serif"}}>{routing.lead}</div><div style={{fontSize:7,color:fat[routing.lead]>79?"#FF6432":"#1a1a1a",fontFamily:"Inconsolata"}}>{fat[routing.lead]}%</div>
        </div>
        {routing.support.map(n=>{const pd=PD[n];return(<div key={n} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><div style={{width:32,height:32,borderRadius:"50%",background:`${pd.color}08`,border:`1px solid ${pd.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:pd.color}}>{pd.symbol}</div><div style={{fontSize:7.5,color:pd.color+"88",fontFamily:"'Noto Serif TC',serif"}}>{n}</div></div>);})}
        {routing.block.length>0&&<><div style={{width:1,height:30,background:"rgba(255,255,255,.05)"}}/>{routing.block.map(n=>{const pd=PD[n];return(<div key={n} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,opacity:.2}}><div style={{width:26,height:26,borderRadius:"50%",border:"1px solid #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#2a2a2a"}}>{pd.symbol}</div></div>);})}</>}
        <div style={{flex:1,minWidth:120}}><div style={{fontSize:8.5,color:"#444",fontFamily:"Inconsolata",lineHeight:1.6,marginBottom:4}}>{routing.reason}</div><p style={{margin:0,fontSize:9.5,color:p.color+"77",fontFamily:"'Noto Serif TC',serif",fontStyle:"italic"}}>「{p.quote}」</p></div>
      </div>
    </div>)}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
      <div style={{padding:"12px 13px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:7}}>
        <div style={{fontSize:8,color:"#333",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:7}}>RESONANCE SCORE</div>
        <div style={{display:"flex",alignItems:"baseline",gap:5,marginBottom:4}}><span style={{fontFamily:"Cinzel,serif",fontSize:26,color:res.statusColor,lineHeight:1}}>{res.score}</span><span style={{fontSize:9,color:"#2a2a2a",fontFamily:"Inconsolata"}}>/100</span></div>
        <div style={{height:2,background:"rgba(255,255,255,.04)",borderRadius:1,marginBottom:4}}><div style={{height:"100%",width:`${res.score}%`,background:`linear-gradient(90deg,${res.statusColor}55,${res.statusColor})`,borderRadius:1,transition:"width .8s"}}/></div>
        <div style={{fontSize:9,color:res.statusColor,fontFamily:"Inconsolata",letterSpacing:".08em"}}>{res.status}</div>
      </div>
      <div style={{padding:"12px 13px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:7}}>
        <div style={{fontSize:8,color:"#333",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:7}}>FATIGUE ENGINE</div>
        {NAMES.map(n=>{const pd=PD[n];const f=fat[n];const hi=f>79;return(<div key={n} style={{marginBottom:5}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><div style={{display:"flex",gap:4,alignItems:"center"}}><span style={{fontSize:9,color:pd.color}}>{pd.symbol}</span><span style={{fontSize:8,color:hi?"#FF9800":"#3a3a3a",fontFamily:"'Noto Serif TC',serif"}}>{n}</span></div><div style={{display:"flex",gap:4,alignItems:"center"}}><span style={{fontSize:7,color:hi?"#FF6432":"#1a1a1a",fontFamily:"Inconsolata"}}>{f}%</span>{hi&&<button onClick={()=>setFat(p=>({...p,[n]:0}))} style={{background:"rgba(255,100,50,.09)",border:"1px solid rgba(255,100,50,.22)",color:"#FF9870",borderRadius:2,padding:"1px 3px",fontSize:6,cursor:"pointer",fontFamily:"Inconsolata"}}>休</button>}</div></div><div style={{height:1.5,background:"rgba(255,255,255,.04)",borderRadius:1}}><div style={{height:"100%",width:`${f}%`,background:f>79?"#FF6432":f>59?"#FF9800":pd.color+"55",borderRadius:1,transition:"width .5s"}}/></div></div>);})}
      </div>
    </div>
    {conflicts.length>0&&(<div style={{padding:"9px 12px",background:"rgba(255,100,50,.04)",border:"1px solid rgba(255,100,50,.14)",borderRadius:7}}><div style={{fontSize:8,color:"#FF6432",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:7}}>⚠ CONFLICT ｜ {conflicts.length}個</div>{conflicts.map(c=>(<div key={c.key} onClick={()=>setSelC(s=>s?.key===c.key?null:c)} style={{marginBottom:5,padding:"5px 8px",background:"rgba(255,255,255,.02)",border:`1px solid ${selC?.key===c.key?"rgba(255,100,50,.28)":"rgba(255,100,50,.08)"}`,borderRadius:4,cursor:"pointer"}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:10,color:PD[c.a].color}}>{PD[c.a].symbol}</span><span style={{fontSize:8,color:"#2a2a2a",fontFamily:"Inconsolata"}}>×</span><span style={{fontSize:10,color:PD[c.b].color}}>{PD[c.b].symbol}</span><span style={{fontSize:9,color:"#FF9870",fontFamily:"Inconsolata"}}>{c.label}</span><span style={{marginLeft:"auto",fontSize:8,color:"#2a2a2a"}}>{selC?.key===c.key?"▲":"▼"}</span></div>{selC?.key===c.key&&(<div style={{marginTop:6}}><p style={{fontSize:9.5,color:"#555",fontFamily:"'Noto Serif TC',serif",lineHeight:1.7,marginBottom:4}}>{c.desc}</p><div style={{padding:"3px 6px",background:"rgba(255,100,50,.05)",borderRadius:3}}><span style={{fontSize:8,color:"#FF9870",fontFamily:"Inconsolata"}}>解決 → </span><span style={{fontSize:9,color:"#555",fontFamily:"'Noto Serif TC',serif"}}>{c.res}</span></div></div>)}</div>))}</div>)}
    {lpd&&(<div style={{padding:"9px 13px",background:`${lpd.color}05`,border:`1px solid ${lpd.color}13`,borderRadius:7}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",marginBottom:expR?8:0}} onClick={()=>setExpR(r=>!r)}><div style={{fontSize:8,color:lpd.color+"44",fontFamily:"Inconsolata",letterSpacing:".18em"}}>DAILY RITUAL ｜ {routing?.lead}</div><span style={{fontSize:9,color:"#2a2a2a"}}>{expR?"▲":"▼"}</span></div>{expR&&(<div>{fw&&(<div style={{marginBottom:7,padding:"5px 8px",background:"rgba(255,100,50,.06)",border:"1px solid rgba(255,100,50,.15)",borderRadius:4}}><div style={{fontSize:8,color:"#FF9870",fontFamily:"Inconsolata",marginBottom:2}}>⚠ {lpd.fatigueWarning}</div><div style={{fontSize:9,color:"#FF9870",fontFamily:"'Noto Serif TC',serif"}}>{lpd.restAction}</div></div>)}{lpd.rituals.map((r,i)=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5,padding:"5px 7px",background:`${lpd.color}06`,border:`1px solid ${lpd.color}0f`,borderRadius:3}}><span style={{color:lpd.color,fontSize:9,marginTop:1}}>·</span><span style={{fontSize:10,color:"#555",fontFamily:"'Noto Serif TC',serif",lineHeight:1.6}}>{r}</span></div>))}</div>)}</div>)}
    {log.length>0&&(<div style={{padding:"6px 9px",background:"rgba(255,255,255,.01)",border:"1px solid rgba(255,255,255,.03)",borderRadius:4}}><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{log.map((l,i)=>{const pd=PD[l.lead];return<span key={i} style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata"}}><span style={{color:pd.color+"28"}}>{pd.symbol}</span>{l.time}{i<log.length-1&&" ·"}</span>;})}</div></div>)}
  </div>);
}

// ============================================================
// MODULE: HISTORY
// ============================================================
function HistoryModule({history,onCheckin,onDelete}){
  const[showCI,setShowCI]=useState(false);const[selDay,setSelDay]=useState(null);const[delId,setDelId]=useState(null);
  const last7=history.slice(-7);const lc=Object.fromEntries(NAMES.map(n=>[n,0]));last7.forEach(h=>{lc[h.lead]++;});
  const most=NAMES.reduce((a,b)=>lc[a]>=lc[b]?a:b);
  const avgMood=last7.length?Math.round(last7.reduce((s,h)=>s+h.mood,0)/last7.length):0;
  const avgRes=last7.length?Math.round(last7.reduce((s,h)=>s+h.resonance,0)/last7.length):0;
  const todayKey=new Date().toISOString().split("T")[0];const todayE=history.find(h=>h.date===todayKey);
  const taskDist={};last7.forEach(h=>{taskDist[h.task]=(taskDist[h.task]||0)+1;});const topTask=Object.entries(taskDist).sort((a,b)=>b[1]-a[1])[0];
  return(<div style={{display:"flex",flexDirection:"column",gap:11}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><div style={{fontSize:9,letterSpacing:".3em",color:"#444",fontFamily:"Inconsolata"}}>HISTORY & ANALYTICS</div><div style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata",marginTop:1}}>{history.length}條記錄 ｜ 近7天</div></div>
      <button onClick={()=>setShowCI(v=>!v)} style={{background:showCI?"rgba(212,168,79,.12)":"rgba(255,255,255,.02)",border:`1px solid ${showCI?"#D4A84F44":"rgba(255,255,255,.07)"}`,color:showCI?"#D4A84F":"#555",borderRadius:4,padding:"5px 11px",fontSize:9,cursor:"pointer",fontFamily:"Cinzel,serif",letterSpacing:".1em"}}>{todayE?"更新今日":"今日記錄"}</button>
    </div>
    {showCI&&(<div style={{padding:"16px 18px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:9}}><div style={{fontSize:8,color:"#444",fontFamily:"Inconsolata",letterSpacing:".2em",marginBottom:12}}>TODAY'S CHECK-IN</div><CIForm onDone={a=>{onCheckin(a);setShowCI(false);}} compact/></div>)}
    {todayE&&!showCI&&(<div style={{padding:"10px 14px",background:`${PD[todayE.lead].color}07`,border:`1px solid ${PD[todayE.lead].color}18`,borderRadius:7}}><div style={{fontSize:8,color:"#333",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:7}}>TODAY ｜ {todayE.dateLabel}</div><div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}><div style={{display:"flex",gap:6,alignItems:"center"}}><div style={{width:30,height:30,borderRadius:"50%",background:`${PD[todayE.lead].color}10`,border:`1.5px solid ${PD[todayE.lead].color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:PD[todayE.lead].color}}>{PD[todayE.lead].symbol}</div><div><div style={{fontSize:9,color:PD[todayE.lead].color,fontFamily:"'Noto Serif TC',serif"}}>{todayE.lead}</div><div style={{fontSize:7,color:"#333",fontFamily:"Inconsolata"}}>{todayE.routeLabel}</div></div></div>{[{l:"情緒",v:`${todayE.mood}%`},{l:"共鳴",v:`${todayE.resonance}`},{l:"任務",v:TASK_L[todayE.task]}].map(i=>(<div key={i.l}><div style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata",marginBottom:1}}>{i.l}</div><div style={{fontSize:10,color:"#666",fontFamily:"Inconsolata"}}>{i.v}</div></div>))}</div></div>)}
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7}}>{[{l:"7天平均情緒",v:`${avgMood}`,u:"%",c:avgMood>60?"#4CAF50":avgMood>40?"#FF9800":"#F44336"},{l:"7天平均共鳴",v:`${avgRes}`,u:"/100",c:avgRes>=70?"#4CAF50":avgRes>=50?"#FF9800":"#F44336"},{l:"最常主控",v:last7.length?PD[most].symbol:"—",u:last7.length?most:"",c:last7.length?PD[most].color:"#333"},{l:"主要任務",v:topTask?TASK_L[topTask[0]]:"—",u:topTask?`${topTask[1]}天`:"",c:"#777"}].map(card=>(<div key={card.l} style={{padding:"9px 11px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:6}}><div style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata",letterSpacing:".1em",marginBottom:5}}>{card.l}</div><div style={{display:"flex",alignItems:"baseline",gap:3}}><span style={{fontSize:card.u.length>3?14:19,color:card.c,fontFamily:"Cinzel,serif",lineHeight:1}}>{card.v}</span><span style={{fontSize:7.5,color:"#2a2a2a",fontFamily:"Inconsolata"}}>{card.u}</span></div></div>))}</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>{[{l:"情緒趨勢",d:last7.map(h=>h.mood),c:"#4A8EC2",v:avgMood,u:"%"},{l:"共鳴分數",d:last7.map(h=>h.resonance),c:"#D4A84F",v:avgRes,u:"/100"}].map(chart=>(<div key={chart.l} style={{padding:"11px 13px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7}}><div style={{fontSize:8,color:"#333",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:3}}>{chart.l}</div><div style={{fontSize:15,color:chart.c,fontFamily:"Cinzel,serif",marginBottom:5}}>{chart.v}<span style={{fontSize:9,color:"#2a2a2a"}}>{chart.u}</span></div><Sparkline data={chart.d} color={chart.c} height={34}/><div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>{last7.map((h,i)=><div key={i} style={{fontSize:6.5,color:"#1a1a1a",fontFamily:"Inconsolata"}}>{h.dateLabel.match(/\((.+)\)/)?.[1]||""}</div>)}</div></div>))}</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
      <div style={{padding:"11px 13px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7}}><div style={{fontSize:8,color:"#333",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:9}}>人格使用頻率</div>{NAMES.map(n=>{const pd=PD[n];const ct=lc[n];const pct=last7.length?(ct/last7.length)*100:0;return(<div key={n} style={{marginBottom:6}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:1.5}}><div style={{display:"flex",gap:4,alignItems:"center"}}><span style={{fontSize:9,color:pd.color}}>{pd.symbol}</span><span style={{fontSize:8,color:pd.color,fontFamily:"'Noto Serif TC',serif"}}>{n}</span>{n===most&&ct>0&&<span style={{fontSize:6.5,padding:"1px 3px",background:`${pd.color}14`,border:`1px solid ${pd.color}28`,color:pd.color,borderRadius:2,fontFamily:"Inconsolata"}}>最常</span>}</div><span style={{fontSize:7.5,color:ct>0?pd.color:"#1a1a1a",fontFamily:"Inconsolata"}}>{ct}天</span></div><div style={{height:2,background:"rgba(255,255,255,.04)",borderRadius:1}}><div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${pd.color}33,${pd.color})`,borderRadius:1,transition:"width .8s"}}/></div></div>);})}</div>
      <div style={{padding:"11px 13px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7}}><div style={{fontSize:8,color:"#333",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:9}}>PATTERN INSIGHT</div>{last7.length>=3&&(()=>{const ins=[];let st=1,sn=last7[last7.length-1]?.lead;for(let i=last7.length-2;i>=0&&last7[i].lead===sn;i--)st++;if(st>=2)ins.push({i:PD[sn].symbol,c:PD[sn].color,t:`${sn}連續主控${st}天`,lv:st>=3?"warn":"info"});const md=(last7[last7.length-1]?.mood||0)-(last7[0]?.mood||0);if(md>20)ins.push({i:"↑",c:"#4CAF50",t:`情緒近7天上升${md}點`,lv:"good"});else if(md<-20)ins.push({i:"↓",c:"#FF9800",t:`情緒近7天下降${Math.abs(md)}點`,lv:"warn"});const mis=NAMES.filter(n=>lc[n]===0);if(mis.length>0)ins.push({i:"?",c:"#444",t:`${mis.slice(0,2).join("、")}未出現`,lv:"info"});if(avgRes>=75)ins.push({i:"✦",c:"#D4A84F",t:`系統運作穩定(${avgRes}/100)`,lv:"good"});else if(avgRes<40)ins.push({i:"⚠",c:"#FF6432",t:`系統共鳴偏低(${avgRes}/100)`,lv:"warn"});if(ins.length===0)ins.push({i:"◎",c:"#444",t:"繼續記錄以獲得洞見",lv:"info"});return ins.slice(0,4).map((x,i)=>(<div key={i} style={{display:"flex",gap:6,marginBottom:7,padding:"5px 8px",background:x.lv==="warn"?"rgba(255,152,0,.05)":x.lv==="good"?"rgba(76,175,80,.05)":"rgba(255,255,255,.02)",border:`1px solid ${x.lv==="warn"?"rgba(255,152,0,.12)":x.lv==="good"?"rgba(76,175,80,.12)":"rgba(255,255,255,.04)"}`,borderRadius:4}}><span style={{fontSize:10,color:x.c,flexShrink:0}}>{x.i}</span><span style={{fontSize:9.5,color:"#555",fontFamily:"'Noto Serif TC',serif",lineHeight:1.6}}>{x.t}</span></div>));})()}</div>
    </div>
    <div style={{padding:"11px 13px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7}}>
      <div style={{fontSize:8,color:"#333",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:9}}>7天快速瀏覽</div>
      <div style={{display:"flex",gap:5,marginBottom:10,overflowX:"auto",paddingBottom:3}}>{last7.map((h,i)=>{const pd=PD[h.lead];const isSel=selDay?.id===h.id;return(<div key={i} onClick={()=>setSelDay(d=>d?.id===h.id?null:h)} style={{flexShrink:0,width:64,padding:"6px 4px",textAlign:"center",cursor:"pointer",background:isSel?`${pd.color}10`:"rgba(255,255,255,.02)",border:`1px solid ${isSel?pd.color+"33":"rgba(255,255,255,.05)"}`,borderRadius:4,transition:"all .2s"}}><div style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata",marginBottom:3}}>{h.dateLabel.match(/\((.+)\)/)?.[1]||""}</div><div style={{fontSize:14,color:pd.color,marginBottom:2}}>{pd.symbol}</div><div style={{height:1.5,background:"rgba(255,255,255,.04)",borderRadius:1,marginBottom:2}}><div style={{height:"100%",width:`${h.mood}%`,background:`${h.mood>60?"#4CAF50":h.mood>40?"#FF9800":"#F44336"}44`,borderRadius:1}}/></div><div style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata"}}>{h.resonance}</div></div>);})}</div>
      {selDay&&(<div style={{padding:"9px 11px",background:`${PD[selDay.lead].color}06`,border:`1px solid ${PD[selDay.lead].color}16`,borderRadius:5,marginBottom:9}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}><div style={{display:"flex",gap:7,alignItems:"center"}}><span style={{fontSize:14,color:PD[selDay.lead].color}}>{PD[selDay.lead].symbol}</span><div><div style={{fontSize:9.5,color:PD[selDay.lead].color,fontFamily:"'Noto Serif TC',serif"}}>{selDay.lead} ｜ {selDay.routeLabel}</div><div style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata"}}>{selDay.dateLabel}</div></div></div><button onClick={()=>setDelId(selDay.id)} style={{background:"transparent",border:"1px solid #2a2a2a",color:"#2a2a2a",borderRadius:3,padding:"2px 6px",fontSize:7,cursor:"pointer",fontFamily:"Inconsolata"}}>刪除</button></div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{[{l:"情緒",v:`${selDay.mood}%`},{l:"能量",v:{low:"低",mid:"中",high:"高"}[selDay.energy]},{l:"任務",v:TASK_L[selDay.task]},{l:"共鳴",v:`${selDay.resonance}`}].map(i=>(<div key={i.l} style={{padding:"3px 6px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.04)",borderRadius:3}}><span style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata"}}>{i.l} </span><span style={{fontSize:9,color:"#555",fontFamily:"Inconsolata"}}>{i.v}</span></div>))}</div>
      </div>)}
      {delId&&(<div style={{padding:"7px 11px",background:"rgba(255,100,50,.04)",border:"1px solid rgba(255,100,50,.15)",borderRadius:4,marginBottom:7,display:"flex",alignItems:"center",justifyContent:"space-between"}}><span style={{fontSize:9,color:"#FF9870",fontFamily:"'Noto Serif TC',serif"}}>確定刪除？</span><div style={{display:"flex",gap:5}}><button onClick={()=>{onDelete(delId);setDelId(null);setSelDay(null);}} style={{background:"rgba(255,100,50,.1)",border:"1px solid rgba(255,100,50,.24)",color:"#FF9870",borderRadius:3,padding:"2px 8px",fontSize:8,cursor:"pointer",fontFamily:"Inconsolata"}}>確定</button><button onClick={()=>setDelId(null)} style={{background:"transparent",border:"1px solid #2a2a2a",color:"#333",borderRadius:3,padding:"2px 8px",fontSize:8,cursor:"pointer",fontFamily:"Inconsolata"}}>取消</button></div></div>)}
      <div style={{display:"flex",flexDirection:"column",gap:3}}>{[...history].reverse().map((h,i)=>{const pd=PD[h.lead];return(<div key={h.id} onClick={()=>setSelDay(d=>d?.id===h.id?null:h)} style={{display:"flex",gap:7,alignItems:"center",padding:"5px 8px",background:selDay?.id===h.id?`${pd.color}07`:"rgba(255,255,255,.01)",border:`1px solid ${selDay?.id===h.id?pd.color+"18":"rgba(255,255,255,.03)"}`,borderRadius:4,cursor:"pointer",opacity:1-Math.min(i,7)*.04}}><span style={{fontSize:9.5,color:pd.color,flexShrink:0}}>{pd.symbol}</span><div style={{flex:1,minWidth:0}}><div style={{display:"flex",gap:5}}><span style={{fontSize:8.5,color:pd.color,fontFamily:"'Noto Serif TC',serif"}}>{h.lead}</span><span style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata"}}>{h.routeLabel}</span></div><div style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata"}}>{h.dateLabel}</div></div><div style={{display:"flex",gap:6}}><div style={{textAlign:"center"}}><div style={{fontSize:6,color:"#1a1a1a",fontFamily:"Inconsolata"}}>情緒</div><div style={{fontSize:8,color:h.mood>60?"#4CAF50":h.mood>40?"#FF9800":"#F44336",fontFamily:"Inconsolata"}}>{h.mood}</div></div><div style={{textAlign:"center"}}><div style={{fontSize:6,color:"#1a1a1a",fontFamily:"Inconsolata"}}>共鳴</div><div style={{fontSize:8,color:"#333",fontFamily:"Inconsolata"}}>{h.resonance}</div></div></div></div>);})}</div>
    </div>
  </div>);
}

// ============================================================
// MODULE: EXPORT CARD (integrated)
// ============================================================
function ExportCard({lead,fat,context}){
  const canvasRef=useRef(null);
  const[cardStyle,setCardStyle]=useState("portrait");
  const[theme,setTheme]=useState("dark");
  const[showRitual,setShowRitual]=useState(true);
  const[ritIdx,setRitIdx]=useState(0);
  const[dl,setDl]=useState(false);
  const[fontsOK,setFontsOK]=useState(false);
  const[useShared,setUseShared]=useState(true);
  const[localCtx,setLocalCtx]=useState({mood:50,energy:"mid",task:"create",deadline:"low"});
  const[ciStep,setCiStep]=useState(0);
  const[showCI,setShowCI]=useState(false);

  useEffect(()=>{document.fonts.load("300 12px 'Noto Serif TC'").then(()=>document.fonts.load("400 12px 'Cinzel'")).then(()=>document.fonts.load("300 12px 'Inconsolata'")).then(()=>setFontsOK(true)).catch(()=>setFontsOK(true));},[]);

  const activeCtx = useShared && context ? context : localCtx;
  const route=getRoute(activeCtx,useShared?fat:{});
  const p=PD[route.lead];
  const today=new Date().toLocaleDateString("zh-TW",{year:"numeric",month:"long",day:"numeric",weekday:"short"});
  const resonance=useShared&&context?Math.max(20,Math.min(100,Math.round(50+activeCtx.mood*.3-(activeCtx.deadline==="high"?15:0)-(activeCtx.energy==="low"?20:0)))):Math.max(20,Math.min(100,Math.round(50+activeCtx.mood*.3-(activeCtx.deadline==="high"?15:0)-(activeCtx.energy==="low"?20:0))));
  const ritual=p.rituals[ritIdx%p.rituals.length];

  useEffect(()=>{
    if(!canvasRef.current||!fontsOK)return;
    setTimeout(()=>{try{renderCard(canvasRef.current,{lead:route.lead,mood:activeCtx.mood,energy:activeCtx.energy,task:activeCtx.task,deadline:activeCtx.deadline,resonance,routeLabel:route.label,date:today,style:cardStyle,theme,ritual,showRitual});}catch(e){console.error(e);}},40);
  },[cardStyle,theme,showRitual,ritIdx,fontsOK,activeCtx,route.lead]);

  function download(){setDl(true);try{const a=document.createElement("a");a.download=`ariesoul-${route.lead}-${new Date().toISOString().split("T")[0]}.png`;a.href=canvasRef.current.toDataURL("image/png",1);a.click();}catch(e){console.error(e);}setTimeout(()=>setDl(false),1000);}

  return(<div style={{display:"flex",flexDirection:"column",gap:11}}>
    <div style={{fontSize:9,letterSpacing:".3em",color:"#444",fontFamily:"Inconsolata"}}>EXPORT CARD ｜ 今日狀態圖卡</div>

    {/* Source toggle */}
    <div style={{display:"flex",gap:6,alignItems:"center",padding:"9px 12px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:7}}>
      <div style={{fontSize:8,color:"#333",fontFamily:"Inconsolata",letterSpacing:".15em",flex:1}}>資料來源</div>
      <button onClick={()=>setUseShared(true)} style={{padding:"4px 10px",background:useShared?"rgba(212,168,79,.12)":"transparent",border:`1px solid ${useShared?"#D4A84F44":"rgba(255,255,255,.06)"}`,color:useShared?"#D4A84F":"#555",borderRadius:3,fontSize:9,cursor:"pointer",fontFamily:"Inconsolata",letterSpacing:".08em"}}>Daily OS {context?"✓":"（未設定）"}</button>
      <button onClick={()=>setUseShared(false)} style={{padding:"4px 10px",background:!useShared?"rgba(212,168,79,.12)":"transparent",border:`1px solid ${!useShared?"#D4A84F44":"rgba(255,255,255,.06)"}`,color:!useShared?"#D4A84F":"#555",borderRadius:3,fontSize:9,cursor:"pointer",fontFamily:"Inconsolata",letterSpacing:".08em"}}>自訂</button>
      {!useShared&&<button onClick={()=>setShowCI(v=>!v)} style={{padding:"4px 10px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",color:"#555",borderRadius:3,fontSize:9,cursor:"pointer",fontFamily:"Inconsolata"}}>{showCI?"收起":"設定"}</button>}
    </div>

    {!useShared&&showCI&&(
      <div style={{padding:"14px 16px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:8}}>
        <CIForm onDone={a=>{setLocalCtx(a);setShowCI(false);}} compact/>
      </div>
    )}

    <div style={{display:"grid",gridTemplateColumns:"1fr 220px",gap:12,alignItems:"start"}}>
      {/* Canvas */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:9}}>
        <div style={{padding:6,background:"rgba(255,255,255,.015)",border:`1px solid ${p.color}18`,borderRadius:6,display:"inline-block"}}>
          <canvas ref={canvasRef} style={{display:"block",maxWidth:"100%",borderRadius:2}}/>
        </div>
        <div style={{display:"flex",gap:7}}>
          <button onClick={download} disabled={dl} style={{background:dl?"transparent":`${p.color}12`,border:`1px solid ${p.color}33`,color:dl?"#333":p.color,borderRadius:4,padding:"7px 16px",fontSize:9,cursor:dl?"not-allowed":"pointer",fontFamily:"Cinzel,serif",letterSpacing:".12em"}}>{dl?"下載中...":"↓ 下載 PNG"}</button>
        </div>
        <div style={{fontSize:7.5,color:"#1a1a1a",fontFamily:"Inconsolata",letterSpacing:".15em"}}>截圖或點擊下載 · 長按手機圖片可儲存</div>
      </div>

      {/* Controls */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {/* Current persona */}
        <div style={{padding:"10px 12px",background:`${p.color}08`,border:`1px solid ${p.color}18`,borderRadius:7}}>
          <div style={{fontSize:8,color:"#2a2a2a",fontFamily:"Inconsolata",marginBottom:6}}>當前人格</div>
          <div style={{display:"flex",gap:7,alignItems:"center"}}>
            <span style={{fontSize:20,color:p.color}}>{p.symbol}</span>
            <div><div style={{fontSize:11,color:p.color,fontFamily:"'Noto Serif TC',serif"}}>{route.lead}</div><div style={{fontSize:7.5,color:"#2a2a2a",fontFamily:"Inconsolata"}}>{route.label}</div></div>
          </div>
        </div>
        {/* Style */}
        <div style={{padding:"10px 12px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7}}>
          <div style={{fontSize:8,color:"#2a2a2a",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:7}}>卡片尺寸</div>
          {CARD_STYLES.map(s=>(<button key={s.id} onClick={()=>setCardStyle(s.id)} style={{width:"100%",display:"flex",justifyContent:"space-between",marginBottom:5,padding:"6px 8px",background:cardStyle===s.id?"rgba(212,168,79,.1)":"rgba(255,255,255,.02)",border:`1px solid ${cardStyle===s.id?"#D4A84F33":"rgba(255,255,255,.05)"}`,borderRadius:4,cursor:"pointer",transition:"all .2s"}}><div><div style={{fontSize:9.5,color:cardStyle===s.id?"#D4A84F":"#666",fontFamily:"'Noto Serif TC',serif",textAlign:"left"}}>{s.label}</div><div style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata",textAlign:"left"}}>{s.desc}</div></div><div style={{fontSize:7.5,color:"#1a1a1a",fontFamily:"Inconsolata",alignSelf:"center"}}>{s.w}×{s.h}</div></button>))}
        </div>
        {/* Theme */}
        <div style={{padding:"10px 12px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7}}>
          <div style={{fontSize:8,color:"#2a2a2a",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:7}}>背景主題</div>
          <div style={{display:"flex",gap:5}}>{THEMES.map(t=>(<button key={t.id} onClick={()=>setTheme(t.id)} style={{flex:1,padding:"6px 4px",background:theme===t.id?"rgba(212,168,79,.09)":"transparent",border:`1px solid ${theme===t.id?"#D4A84F33":"rgba(255,255,255,.05)"}`,borderRadius:4,cursor:"pointer"}}><div style={{width:16,height:16,borderRadius:"50%",background:t.bg,border:`1.5px solid ${theme===t.id?"#D4A84F44":"rgba(255,255,255,.07)"}`,margin:"0 auto 3px"}}/><div style={{fontSize:8.5,color:theme===t.id?"#D4A84F":"#444",fontFamily:"'Noto Serif TC',serif"}}>{t.label}</div></button>))}</div>
        </div>
        {/* Ritual */}
        <div style={{padding:"10px 12px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:showRitual?7:0}}>
            <div style={{fontSize:8,color:"#2a2a2a",fontFamily:"Inconsolata",letterSpacing:".18em"}}>顯示儀式</div>
            <button onClick={()=>setShowRitual(r=>!r)} style={{background:showRitual?`${p.color}12`:"transparent",border:`1px solid ${showRitual?p.color+"28":"rgba(255,255,255,.06)"}`,color:showRitual?p.color:"#444",borderRadius:3,padding:"2px 7px",fontSize:8,cursor:"pointer",fontFamily:"Inconsolata"}}>{showRitual?"ON":"OFF"}</button>
          </div>
          {showRitual&&(<div>
            <div style={{fontSize:9,color:"#555",fontFamily:"'Noto Serif TC',serif",lineHeight:1.7,marginBottom:6,padding:"5px 7px",background:`${p.color}06`,border:`1px solid ${p.color}0f`,borderRadius:3}}>{ritual}</div>
            <div style={{display:"flex",gap:4}}>{p.rituals.map((r,i)=>(<button key={i} onClick={()=>setRitIdx(i)} style={{flex:1,padding:"3px",background:i===ritIdx%p.rituals.length?`${p.color}12`:"transparent",border:`1px solid ${i===ritIdx%p.rituals.length?p.color+"28":"rgba(255,255,255,.05)"}`,borderRadius:3,cursor:"pointer"}}><div style={{fontSize:7,color:i===ritIdx%p.rituals.length?p.color:"#2a2a2a",fontFamily:"Inconsolata"}}>{i+1}</div></button>))}</div>
          </div>)}
        </div>
        {/* Quick persona */}
        <div style={{padding:"10px 12px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7}}>
          <div style={{fontSize:8,color:"#2a2a2a",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:7}}>快速切換人格</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4}}>{NAMES.map(n=>{const pd=PD[n];const isAct=route.lead===n;return(<button key={n} onClick={()=>{const presets={白羊覺識:{deadline:"high",energy:"high"},沉島:{mood:20,energy:"mid"},棲魂:{task:"rest",energy:"low"},初識:{task:"create",mood:60},素靈:{task:"system"},靈點:{task:"research"},曦魂:{task:"publish"}};setLocalCtx(c=>({...c,...(presets[n]||{})}));setUseShared(false);}} style={{padding:"6px 3px",background:isAct?`${pd.color}12`:"rgba(255,255,255,.02)",border:`1px solid ${isAct?pd.color+"33":"rgba(255,255,255,.05)"}`,borderRadius:3,cursor:"pointer",textAlign:"center"}}><div style={{fontSize:11,color:pd.color,marginBottom:1.5}}>{pd.symbol}</div><div style={{fontSize:6.5,color:isAct?pd.color:"#2a2a2a",fontFamily:"'Noto Serif TC',serif"}}>{n.length>2?n.slice(0,2):n}</div></button>);})}</div>
        </div>
      </div>
    </div>
  </div>);
}

// ============================================================
// MODULES: Characters, Router, Matrix, System
// ============================================================
function CharCards(){const[ac,setAc]=useState(0);const p=PD[NAMES[ac]];const name=NAMES[ac];return(<div style={{display:"flex",flexDirection:"column",gap:10}}><div style={{fontSize:9,letterSpacing:".3em",color:"#444",fontFamily:"Inconsolata"}}>CHARACTER FILES</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{NAMES.map((n,i)=>(<button key={n} onClick={()=>setAc(i)} style={{background:ac===i?`${PD[n].color}14`:"transparent",border:`1px solid ${ac===i?PD[n].color+"44":PD[n].color+"12"}`,color:ac===i?PD[n].color:"#444",borderRadius:4,padding:"4px 8px",cursor:"pointer",fontFamily:"'Noto Serif TC',serif",fontSize:9,transition:"all .2s"}}>{PD[n].symbol} {n}</button>))}</div><div style={{background:"rgba(0,0,0,.4)",border:`1px solid ${p.color}18`,borderRadius:8,overflow:"hidden"}}><div style={{padding:"16px 18px 13px",borderBottom:`1px solid ${p.color}0c`}}><div style={{fontSize:8,letterSpacing:".3em",color:p.color+"33",fontFamily:"Cinzel,serif",marginBottom:4}}>{p.en}</div><div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:3}}><span style={{fontSize:20,color:p.color}}>{p.symbol}</span><h2 style={{margin:0,fontSize:19,fontWeight:300,letterSpacing:".13em",color:"#e8e4d8",fontFamily:"'Noto Serif TC',serif"}}>{name}</h2></div><div style={{fontSize:8,color:p.color+"66",letterSpacing:".14em",marginBottom:9,fontFamily:"Cinzel,serif"}}>{p.title}</div><div style={{borderLeft:`2px solid ${p.color}18`,paddingLeft:8}}><p style={{margin:0,fontSize:9.5,color:"#555",fontFamily:"'Noto Serif TC',serif",lineHeight:1.8,fontStyle:"italic"}}>「{p.quote}」</p></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}><div style={{padding:"11px 13px",borderRight:`1px solid ${p.color}08`}}><div style={{fontSize:7,letterSpacing:".15em",color:"#2a2a2a",fontFamily:"Inconsolata",marginBottom:7}}>STATS</div>{Object.entries(p.stats).map(([l,v])=><SB key={l} l={l} v={v} c={p.color}/>)}</div><div style={{padding:"11px 13px",borderRight:`1px solid ${p.color}08`}}><div style={{fontSize:7,letterSpacing:".15em",color:"#2a2a2a",fontFamily:"Inconsolata",marginBottom:7}}>SKILLS</div>{p.skills.map((s,i)=>(<div key={i} style={{display:"flex",gap:5,marginBottom:6,padding:"3px 6px",background:`${p.color}05`,border:`1px solid ${p.color}0d`,borderRadius:3}}><div style={{width:3,height:3,borderRadius:"50%",background:p.color,marginTop:3,flexShrink:0}}/><span style={{fontSize:9,color:"#444",fontFamily:"'Noto Serif TC',serif"}}>{s}</span></div>))}</div><div style={{padding:"11px 13px"}}><div style={{fontSize:7,letterSpacing:".15em",color:"#2a2a2a",fontFamily:"Inconsolata",marginBottom:7}}>STATES</div>{["dormant","active","overdrive","collapse"].map(s=>(<div key={s} style={{marginBottom:5,display:"flex",gap:5,alignItems:"flex-start"}}><div style={{width:5,height:5,borderRadius:"50%",background:S_COLORS[s],marginTop:2,flexShrink:0}}/><div><div style={{fontSize:7,color:S_COLORS[s],fontFamily:"Inconsolata"}}>{S_LABELS[s]}</div><div style={{fontSize:8,color:"#2a2a2a",fontFamily:"'Noto Serif TC',serif",marginTop:1}}>{p[s]}</div></div></div>))}<div style={{marginTop:7,paddingTop:6,borderTop:`1px solid ${p.color}0c`}}><div style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata",marginBottom:4}}>WEAKNESS</div><div style={{fontSize:8,color:"#2a2a2a",padding:"3px 6px",background:"rgba(255,60,60,.03)",border:"1px solid rgba(255,60,60,.07)",borderRadius:3}}>{p.weakness}</div></div></div></div></div></div>);}

function SoulRouter({setLead,setStates,setFat}){
  const[input,setInput]=useState("");const[loading,setLoading]=useState(false);const[rType,setRType]=useState(null);const[rRule,setRRule]=useState(null);const[lp,setLp]=useState(null);const[stream,setStream]=useState("");const[hist,setHist]=useState([]);
  const DET={危機:["緊急","截止","崩了"],創作:["寫","音樂","故事","文案"],系統:["SOP","流程","架構"],社交:["訊息","社群","關係"],情緒低潮:["崩潰","好累","不想"],研究:["分析","研究","整理"],發布:["發布","上線","品牌"]};
  function det(t){const l=t.toLowerCase();for(const[ty,ks]of Object.entries(DET)){if(ks.some(k=>l.includes(k)))return ty;}return"無法判斷";}
  async function sub(){
    if(!input.trim()||loading)return;const ui=input.trim();setInput("");setLoading(true);setStream("");
    const ty=det(ui);const RM={危機:{lead:"白羊覺識",support:["素靈","靈點"]},創作:{lead:"初識",support:["沉島","曦魂"]},系統:{lead:"素靈",support:["靈點","白羊覺識"]},社交:{lead:"棲魂",support:["初識","曦魂"]},情緒低潮:{lead:"沉島",support:["棲魂","初識"]},研究:{lead:"靈點",support:["素靈","沉島"]},發布:{lead:"曦魂",support:["白羊覺識","初識"]},無法判斷:{lead:"白羊覺識",support:["素靈"]}};
    const rule=RM[ty]||RM["無法判斷"];setRType(ty);setRRule(rule);setLp(rule.lead);setLead(rule.lead);setStates(p=>({...p,[rule.lead]:"active"}));setFat(f=>({...f,[rule.lead]:Math.min(100,f[rule.lead]+5)}));
    const pd=PD[rule.lead];const TONE={白羊覺識:"冷靜直接。",素靈:"理性精準。",靈點:"洞察深度。",初識:"溫柔細膩。",沉島:"慢安靜。",棲魂:"安穩陪伴。",曦魂:"鼓舞明亮。"};
    try{const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,system:`你是「${rule.lead}」（${pd.en}）。語氣：${TONE[rule.lead]}\n格式：【${rule.lead}】\n分析：\n建議：\n下一步：\n繁體中文。`,messages:[{role:"user",content:ui}]})});const data=await res.json();const text=data.content?.map(b=>b.text||"").join("")||"（無回應）";let i=0;const iv=setInterval(()=>{i+=3;setStream(text.slice(0,i));if(i>=text.length){clearInterval(iv);setHist(h=>[{input:ui,ty,lead:rule.lead},...h.slice(0,4)]);setLoading(false);}},12);}catch{setStream("連線失敗（此功能需要後端 API 代理，本機部署需自行設定 Claude API 金鑰）。");setLoading(false);}
  }
  const lpd=lp?PD[lp]:null;
  return(<div style={{display:"flex",flexDirection:"column",gap:10}}><div style={{fontSize:9,letterSpacing:".3em",color:"#444",fontFamily:"Inconsolata"}}>SOUL ROUTER ｜ AI 人格路由</div><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{NAMES.map(n=>(<div key={n} style={{display:"flex",alignItems:"center",gap:3,padding:"2px 6px",background:lp===n?`${PD[n].color}0d`:"transparent",border:`1px solid ${lp===n?PD[n].color+"2a":PD[n].color+"0d"}`,borderRadius:3,transition:"all .3s"}}><span style={{fontSize:9,color:lp===n?PD[n].color:PD[n].color+"1a"}}>{PD[n].symbol}</span><span style={{fontSize:7,color:lp===n?PD[n].color:"#1a1a1a",fontFamily:"'Noto Serif TC',serif"}}>{n}</span></div>))}</div><div style={{background:"rgba(255,255,255,.02)",border:`1px solid ${lpd?lpd.color+"18":"rgba(255,255,255,.06)"}`,borderRadius:7,padding:"9px 11px",transition:"border-color .4s"}}><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sub();}}} disabled={loading} placeholder="輸入你現在面對的事情..." style={{width:"100%",minHeight:52,background:"transparent",border:"none",color:"#888",fontSize:11,fontFamily:"'Noto Serif TC',serif",lineHeight:1.8,resize:"none",outline:"none"}}/><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{["緊急截止","想寫歌","準備發布","好累不想動"].map(q=>(<button key={q} onClick={()=>setInput(q)} style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",color:"#333",borderRadius:3,padding:"2px 5px",fontSize:8,cursor:"pointer",fontFamily:"'Noto Serif TC',serif"}}>{q}</button>))}</div><button onClick={sub} disabled={loading||!input.trim()} style={{background:loading?"transparent":`${lpd?.color||"#D4A84F"}0d`,border:`1px solid ${loading?"#2a2a2a":(lpd?.color||"#D4A84F")+"22"}`,color:loading?"#2a2a2a":(lpd?.color||"#D4A84F"),borderRadius:4,padding:"4px 10px",fontSize:8,cursor:loading||!input.trim()?"not-allowed":"pointer",fontFamily:"Inconsolata",letterSpacing:".1em"}}>{loading?"路由中...":"啟動"}</button></div></div>
    {rType&&(<div style={{padding:"7px 10px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.04)",borderRadius:5}}><div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{[{l:"事件",v:rType,c:"#D4A84F"},{l:"主控",v:rRule?.lead,c:PD[rRule?.lead||"白羊覺識"].color}].map(i=>(<div key={i.l}><div style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata",marginBottom:2}}>{i.l}</div><div style={{fontSize:10,color:i.c,fontFamily:"'Noto Serif TC',serif"}}>{i.v}</div></div>))}{rRule?.support&&<div><div style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata",marginBottom:2}}>輔助</div><div style={{fontSize:10,color:"#333",fontFamily:"'Noto Serif TC',serif"}}>{rRule.support.join("・")}</div></div>}</div></div>)}
    {stream&&lpd&&(<div style={{padding:"11px 13px",background:`${lpd.color}06`,border:`1px solid ${lpd.color}16`,borderRadius:7}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><span style={{fontSize:13,color:lpd.color}}>{lpd.symbol}</span><div><div style={{fontSize:9,color:lpd.color,fontFamily:"'Noto Serif TC',serif"}}>{lp}</div><div style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata"}}>{lpd.en}</div></div>{loading&&<div style={{marginLeft:"auto",fontSize:7,color:lpd.color+"44",fontFamily:"Inconsolata"}}>● 生成中</div>}</div><div style={{fontSize:11,color:"#555",fontFamily:"'Noto Serif TC',serif",lineHeight:2,whiteSpace:"pre-wrap"}}>{stream}</div></div>)}
    {hist.length>0&&(<div>{hist.map((h,i)=>{const pd=PD[h.lead];return(<div key={i} style={{display:"flex",gap:6,alignItems:"center",padding:"4px 7px",background:"rgba(255,255,255,.01)",border:"1px solid rgba(255,255,255,.03)",borderRadius:3,marginBottom:3,opacity:1-i*.13}}><span style={{fontSize:9,color:pd.color}}>{pd.symbol}</span><span style={{fontSize:8.5,color:"#2a2a2a",fontFamily:"'Noto Serif TC',serif",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.input}</span><span style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata"}}>{h.ty}</span></div>);})}</div>)}
  </div>);
}

function RelMatrix(){
  const svgRef=useRef(null);const[W,setW]=useState(520);const H=320;
  const[sel,setSel]=useState(null);const[aRel,setARel]=useState(null);const[aTask,setATask]=useState(null);const[flt,setFlt]=useState("all");
  useEffect(()=>{const el=svgRef.current?.parentElement;if(!el)return;const o=new ResizeObserver(e=>setW(e[0].contentRect.width));o.observe(el);return()=>o.disconnect();},[]);
  const rels=RELS.filter(r=>flt==="all"||r.type===flt);
  const related=sel?rels.filter(r=>r.a===sel||r.b===sel).flatMap(r=>[r.a,r.b]).filter(n=>n!==sel):[];
  const hf=!!sel||!!aRel||!!aTask;
  return(<div style={{display:"flex",flexDirection:"column",gap:9}}><div style={{fontSize:9,letterSpacing:".3em",color:"#444",fontFamily:"Inconsolata"}}>RELATIONSHIP MATRIX</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{[{k:"all",l:"全部"},{k:"strong",l:"強連結"},{k:"conflict",l:"衝突"},{k:"flow",l:"流向"}].map(f=>(<button key={f.k} onClick={()=>setFlt(f.k)} style={{background:flt===f.k?"rgba(212,168,79,.08)":"transparent",border:`1px solid ${flt===f.k?"#D4A84F28":"#2a2a2a"}`,color:flt===f.k?"#D4A84F":"#333",borderRadius:3,padding:"3px 8px",fontSize:8,cursor:"pointer",fontFamily:"Inconsolata"}}>{f.l}</button>))}</div>
    <div style={{background:"rgba(255,255,255,.015)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7,overflow:"hidden"}}><svg ref={svgRef} width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>{rels.map((rel,i)=>{const a={x:PD[rel.a].x*W,y:PD[rel.a].y*H};const b={x:PD[rel.b].x*W,y:PD[rel.b].y*H};const hi=aRel===rel||(sel&&(rel.a===sel||rel.b===sel))||(aTask&&aTask.personas.includes(rel.a)&&aTask.personas.includes(rel.b));return(<g key={i} onClick={()=>{setARel(r=>r===rel?null:rel);setSel(null);setATask(null);}} style={{cursor:"pointer"}}><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="transparent" strokeWidth={10}/><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={rel.color} strokeWidth={hi?2:1.2} strokeOpacity={hi?1:hf?.07:.26} strokeDasharray={rel.type==="conflict"?"6,4":rel.type==="flow"?"3,3":"none"} style={{transition:"all .3s"}}/>{hi&&<text x={(a.x+b.x)/2} y={(a.y+b.y)/2-7} textAnchor="middle" fill={rel.color} fontSize={7} fontFamily="Inconsolata">{rel.label}</text>}</g>);})}
    {NAMES.map(name=>{const p=PD[name];const pos={x:p.x*W,y:p.y*H};const isSel=sel===name;const isHi=related.includes(name)||sel===name||(aTask&&aTask.personas.includes(name));const dim=hf&&!isHi&&!isSel;const r=isSel?23:18;return(<g key={name} transform={`translate(${pos.x},${pos.y})`} onClick={()=>{setSel(s=>s===name?null:name);setARel(null);setATask(null);}} style={{cursor:"pointer"}}>{isSel&&<circle r={r+8} fill={p.color} fillOpacity={.07}/>}<circle r={r} fill={`${p.color}0d`} stroke={p.color} strokeWidth={isSel?1.5:1} strokeOpacity={dim?.08:isSel?1:.38} style={{transition:"all .3s"}}/><text textAnchor="middle" dominantBaseline="central" fill={p.color} fontSize={isSel?13:10} fillOpacity={dim?.1:1} style={{pointerEvents:"none"}}>{p.symbol}</text><text y={r+11} textAnchor="middle" fill={p.color} fontSize={7.5} fontFamily="'Noto Serif TC',serif" fillOpacity={dim?.08:1} style={{pointerEvents:"none"}}>{name}</text></g>);})}
    </svg></div>
    {aRel&&(<div style={{padding:"8px 11px",background:`${aRel.color}07`,border:`1px solid ${aRel.color}1a`,borderRadius:5}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><span style={{fontSize:10,color:PD[aRel.a].color}}>{PD[aRel.a].symbol}</span><span style={{fontSize:8,color:"#2a2a2a",fontFamily:"Inconsolata"}}>{aRel.type==="conflict"?"×":aRel.type==="flow"?"→":"↔"}</span><span style={{fontSize:10,color:PD[aRel.b].color}}>{PD[aRel.b].symbol}</span><span style={{fontSize:9,color:aRel.color,fontFamily:"Inconsolata"}}>{aRel.label}</span></div><p style={{margin:0,fontSize:9.5,color:"#444",fontFamily:"'Noto Serif TC',serif",lineHeight:1.7}}>{aRel.desc}</p></div>)}
    <div style={{background:"rgba(255,255,255,.015)",border:"1px solid rgba(255,255,255,.04)",borderRadius:7,padding:"9px 11px"}}><div style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:6}}>TASK COMBOS</div><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4}}>{TASK_COMBOS.map(task=>(<button key={task.name} onClick={()=>{setATask(t=>t===task?null:task);setSel(null);setARel(null);}} style={{background:aTask===task?"rgba(212,168,79,.07)":"transparent",border:`1px solid ${aTask===task?"#D4A84F18":"rgba(255,255,255,.04)"}`,borderRadius:4,padding:"5px 7px",cursor:"pointer",textAlign:"left"}}><div style={{fontSize:9.5,color:aTask===task?"#D4A84F":"#444",fontFamily:"'Noto Serif TC',serif",marginBottom:2}}>{task.name}</div><div style={{display:"flex",gap:3,marginBottom:2}}>{task.personas.map(n=><span key={n} style={{fontSize:9,color:PD[n].color}}>{PD[n].symbol}</span>)}</div><div style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata"}}>{task.flow}</div></button>))}</div></div>
  </div>);
}

function SysInfo(){return(<div style={{display:"flex",flexDirection:"column",gap:10}}><div style={{fontSize:9,letterSpacing:".3em",color:"#444",fontFamily:"Inconsolata"}}>SYSTEM ｜ Ariesoul Creative OS v4.0</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}><div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7,padding:"11px 13px"}}><div style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:8}}>七伴人格</div>{NAMES.map(name=>{const p=PD[name];return(<div key={name} style={{display:"flex",gap:7,alignItems:"center",marginBottom:7,padding:"4px 6px",background:`${p.color}05`,border:`1px solid ${p.color}0d`,borderRadius:3}}><span style={{fontSize:11,color:p.color}}>{p.symbol}</span><div style={{flex:1}}><div style={{fontSize:8,color:p.color,fontFamily:"'Noto Serif TC',serif"}}>{name}</div><div style={{fontSize:6.5,color:"#1a1a1a",fontFamily:"Inconsolata"}}>{p.en} ｜ {p.element}</div></div><div style={{fontSize:7,color:"#1a1a1a",fontFamily:"'Noto Serif TC',serif"}}>{p.role.split("・")[0]}</div></div>);})}</div><div style={{display:"flex",flexDirection:"column",gap:7}}><div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7,padding:"11px 13px"}}><div style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:7}}>路由規則</div>{ROUTING.filter(r=>r.id!=="default").map(rule=>(<div key={rule.id} style={{marginBottom:5,display:"flex",gap:6}}><div style={{fontSize:8,color:PD[rule.lead].color,fontFamily:"'Noto Serif TC',serif",minWidth:40}}>{rule.label}</div><div style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata"}}>→ {rule.lead}</div></div>))}</div><div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:7,padding:"11px 13px",flex:1}}><div style={{fontSize:7,color:"#2a2a2a",fontFamily:"Inconsolata",letterSpacing:".18em",marginBottom:7}}>七伴同步流</div>{[{n:"靈點",r:"研究"},{n:"素靈",r:"系統"},{n:"白羊覺識",r:"決策"},{n:"初識",r:"情感"},{n:"沉島",r:"深化"},{n:"棲魂",r:"修復"},{n:"曦魂",r:"顯化"}].map((item,i,arr)=>(<div key={item.n} style={{display:"flex",alignItems:"center",gap:4,marginBottom:i<arr.length-1?4:0}}><span style={{fontSize:9.5,color:PD[item.n].color}}>{PD[item.n].symbol}</span><span style={{fontSize:8,color:PD[item.n].color,fontFamily:"'Noto Serif TC',serif"}}>{item.n}</span><span style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata"}}>{item.r}</span>{i<arr.length-1&&<span style={{fontSize:7,color:"#1a1a1a",marginLeft:"auto"}}>↓</span>}</div>))}</div></div></div></div>);}

// ============================================================
// LOCAL STORAGE ADAPTER
// (Replaces Claude-artifact-only window.storage with browser localStorage,
//  so this project runs standalone outside Claude.ai)
// ============================================================
const LS_KEY = "ariesoul-v4";
async function lsGet(key){
  try{const raw=localStorage.getItem(key);if(raw===null)return null;return{key,value:raw};}catch{return null;}
}
async function lsSet(key,value){
  try{localStorage.setItem(key,value);return{key,value};}catch(e){console.error(e);return null;}
}

// ============================================================
// MAIN APP
// ============================================================
export default function App(){
  const[mod,setMod]=useState("daily");
  const[states,setStates]=useState(Object.fromEntries(NAMES.map(n=>[n,"dormant"])));
  const[lead,setLead]=useState("白羊覺識");
  const[fat,setFat]=useState(Object.fromEntries(NAMES.map(n=>[n,0])));
  const[context,setContext]=useState(null);
  const[history,setHistory]=useState([]);
  const[storageOK,setStorageOK]=useState(false);
  const lp=PD[lead];

  useEffect(()=>{
    async function load(){
      try{const r=await lsGet(LS_KEY);if(r?.value){const p=JSON.parse(r.value);if(p.length>0){setHistory(p);setStorageOK(true);return;}}}catch{}
      const demo=makeDemoHist();setHistory(demo);
      try{await lsSet(LS_KEY,JSON.stringify(demo));}catch{}
      setStorageOK(true);
    }
    load();
  },[]);

  async function saveHist(newH){setHistory(newH);try{await lsSet(LS_KEY,JSON.stringify(newH));}catch(e){console.error(e);}}

  async function handleCI(ans){
    const today=new Date();const dk=today.toISOString().split("T")[0];
    const route=getRoute(ans);const res=Math.max(20,Math.min(100,Math.round(50+ans.mood*.3-(ans.deadline==="high"?15:0)-(ans.energy==="low"?20:0))));
    const entry={id:dk,date:dk,dateLabel:today.toLocaleDateString("zh-TW",{month:"numeric",day:"numeric",weekday:"short"}),lead:route.lead,routeLabel:route.label,mood:ans.mood,energy:ans.energy,task:ans.task,deadline:ans.deadline,conflicts:0,resonance:res};
    await saveHist([...history.filter(h=>h.date!==dk),entry].sort((a,b)=>a.date.localeCompare(b.date)).slice(-30));
  }

  return(
    <div style={{display:"flex",minHeight:"100vh",background:"#050508",color:"#e8e4d8",fontFamily:"'Noto Serif TC',serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;300;400&family=Cinzel:wght@400;600&family=Inconsolata:wght@300;400;500&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box} ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-thumb{background:#D4A84F12;border-radius:2px}
        textarea:focus,button:focus{outline:none}
        input[type=range]{-webkit-appearance:none;height:3px;border-radius:2px;background:rgba(255,255,255,.08)}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:#D4A84F;cursor:pointer}
      `}</style>
      <StarBg/>

      {/* SIDEBAR */}
      <div style={{width:178,flexShrink:0,background:"rgba(0,0,0,.7)",borderRight:"1px solid rgba(255,255,255,.05)",display:"flex",flexDirection:"column",padding:"18px 0 14px",position:"sticky",top:0,height:"100vh",backdropFilter:"blur(8px)",zIndex:10}}>
        <div style={{padding:"0 14px 14px",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
          <div style={{fontSize:7,letterSpacing:".38em",color:"#1a1a1a",fontFamily:"Inconsolata",marginBottom:3}}>ARIESOUL</div>
          <div style={{fontSize:10.5,letterSpacing:".12em",fontFamily:"Cinzel,serif",color:"#444"}}>Creative OS</div>
          <div style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata",marginTop:1}}>v4.0 ｜ Export Update</div>
        </div>
        <div style={{padding:"9px 14px",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
          <div style={{fontSize:7,color:"#1a1a1a",fontFamily:"Inconsolata",letterSpacing:".16em",marginBottom:5}}>ACTIVE LEAD</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:`radial-gradient(circle,${lp.color}12,transparent)`,border:`1px solid ${lp.color}3a`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:lp.color,boxShadow:`0 0 8px ${lp.color}14`,transition:"all .4s"}}>{lp.symbol}</div>
            <div><div style={{fontSize:9,color:lp.color,fontFamily:"'Noto Serif TC',serif"}}>{lead}</div><div style={{fontSize:6.5,color:"#1a1a1a",fontFamily:"Inconsolata"}}>{lp.en}</div></div>
          </div>
          <div style={{marginTop:5,height:1.5,background:"rgba(255,255,255,.04)",borderRadius:1}}><div style={{height:"100%",width:`${fat[lead]}%`,background:fat[lead]>79?"#FF6432":fat[lead]>59?"#FF9800":lp.color+"44",borderRadius:1,transition:"width .5s"}}/></div>
          <div style={{fontSize:6.5,color:fat[lead]>79?"#FF6432":"#1a1a1a",fontFamily:"Inconsolata",marginTop:1.5}}>{fat[lead]}% fatigue</div>
        </div>
        {/* Today quick status */}
        {(()=>{const te=history.find(h=>h.date===new Date().toISOString().split("T")[0]);return te?(<div style={{padding:"7px 14px",borderBottom:"1px solid rgba(255,255,255,.04)"}}><div style={{fontSize:6.5,color:"#1a1a1a",fontFamily:"Inconsolata",letterSpacing:".14em",marginBottom:3}}>TODAY</div><div style={{display:"flex",gap:4,alignItems:"center"}}><span style={{fontSize:9.5,color:PD[te.lead].color}}>{PD[te.lead].symbol}</span><span style={{fontSize:8,color:PD[te.lead].color,fontFamily:"'Noto Serif TC',serif"}}>{te.lead}</span></div><div style={{fontSize:6.5,color:"#1a1a1a",fontFamily:"Inconsolata",marginTop:1.5}}>情緒{te.mood}% · 共鳴{te.resonance}</div></div>):(<div style={{padding:"6px 14px",borderBottom:"1px solid rgba(255,255,255,.04)"}}><div style={{fontSize:6.5,color:"#D4A84F22",fontFamily:"Inconsolata",letterSpacing:".14em"}}>TODAY · 未記錄</div></div>);})()}
        <nav style={{flex:1,padding:"7px 6px",display:"flex",flexDirection:"column",gap:1}}>
          {MODULES.map(m=>(<button key={m.id} onClick={()=>setMod(m.id)} style={{background:mod===m.id?"rgba(212,168,79,.07)":"transparent",border:`1px solid ${mod===m.id?"#D4A84F1a":"transparent"}`,color:mod===m.id?"#D4A84F":"#3a3a3a",borderRadius:4,padding:"6px 8px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,textAlign:"left",transition:"all .2s",width:"100%"}}><span style={{fontSize:11.5,opacity:mod===m.id?1:.3}}>{m.icon}</span><div><div style={{fontSize:8,fontFamily:"Inconsolata",letterSpacing:".05em"}}>{m.label}</div><div style={{fontSize:6.5,color:mod===m.id?"#D4A84F44":"#1a1a1a",fontFamily:"Inconsolata"}}>{m.sub}</div></div></button>))}
        </nav>
        <div style={{padding:"7px 9px",borderTop:"1px solid rgba(255,255,255,.04)"}}><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:3}}>{NAMES.map(n=>{const p=PD[n];const st=states[n];return(<div key={n} title={`${n}·${S_LABELS[st]}·${fat[n]}%`} style={{width:23,height:23,borderRadius:"50%",border:`1px solid ${p.color}${st==="active"?"55":"0d"}`,background:`${p.color}${st==="active"?"0d":"02"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8.5,color:`${p.color}${st==="active"?"ee":"1a"}`,transition:"all .3s",position:"relative",overflow:"hidden"}}>{p.symbol}{fat[n]>79&&<div style={{position:"absolute",bottom:0,left:0,right:0,height:1.5,background:"#FF6432"}}/>}</div>);})}</div></div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,padding:"20px 18px 48px",overflowY:"auto",position:"relative",zIndex:1}}>
        <div key={mod} style={{animation:"fadeUp .4s ease"}}>
          {mod==="daily"   && <DailyOS lead={lead} setLead={setLead} fat={fat} setFat={setFat} states={states} setStates={setStates} context={context} setContext={setContext} onSave={handleCI}/>}
          {mod==="history" && storageOK && <HistoryModule history={history} onCheckin={handleCI} onDelete={id=>saveHist(history.filter(h=>h.id!==id))}/>}
          {mod==="cards"   && <CharCards/>}
          {mod==="router"  && <SoulRouter setLead={setLead} setStates={setStates} setFat={setFat}/>}
          {mod==="matrix"  && <RelMatrix/>}
          {mod==="export"  && <ExportCard lead={lead} fat={fat} context={context}/>}
          {mod==="system"  && <SysInfo/>}
        </div>
      </div>
    </div>
  );
}
