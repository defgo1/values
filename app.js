const VALUES = [
  ["Acceptance","To make room for yourself and others as they are."],["Achievement","To accomplish things that feel significant and worthwhile."],["Adventure","To seek novelty, discovery and experiences beyond the familiar."],["Authenticity","To live in a way that feels genuinely your own."],["Autonomy","To choose your own direction and act with independence."],["Balance","To make space for the different parts of a good life."],["Beauty","To notice, create and be moved by what is beautiful."],["Belonging","To feel part of a group, place or community."],["Caring","To look after the people who depend on or matter to you."],["Challenge","To stretch yourself through demanding goals and problems."],["Comfort","To have ease, rest and enough material security to breathe."],["Commitment","To stand by meaningful promises over time."],["Compassion","To respond to suffering with warmth and concern."],["Connection","To feel emotionally close and known by others."],["Contribution","To leave people, places or systems better than you found them."],["Cooperation","To work with others rather than only for yourself."],["Courage","To act in line with what matters despite fear or uncertainty."],["Creativity","To make, imagine and express something original."],["Curiosity","To keep discovering, questioning and learning."],["Dependability","To be someone others can reliably count on."],["Discipline","To follow through with focus even when motivation fades."],["Equality","To support equal dignity, opportunity and consideration."],["Excellence","To do things with care and pursue a high standard."],["Fairness","To make decisions impartially and give people their due."],["Family","To invest deeply in family bonds and shared life."],["Freedom","To have room to choose, move and live without needless constraint."],["Friendship","To build loyal, enjoyable and enduring friendships."],["Fun","To make room for play, laughter and uncomplicated enjoyment."],["Growth","To keep developing who you are and what you can do."],["Health","To care for physical and mental wellbeing."],["Honesty","To be truthful, transparent and sincere."],["Hope","To orient toward possibility and a better future."],["Humility","To keep perspective on yourself and remain open to learning."],["Influence","To shape decisions, outcomes or the direction of a group."],["Inner peace","To cultivate calm, steadiness and freedom from needless turmoil."],["Justice","To challenge unfairness and support what is right in society."],["Kindness","To treat people with generosity, patience and warmth."],["Knowledge","To understand deeply and build a rich grasp of the world."],["Leadership","To guide, organise and take responsibility for direction."],["Learning","To keep acquiring skills, insight and understanding."],["Love","To give and receive deep affection and devotion."],["Loyalty","To remain faithful to people and groups you have chosen."],["Meaning","To experience your life as coherent and significant."],["Nature","To live with appreciation and care for the natural world."],["Openness","To stay receptive to perspectives, people and possibilities."],["Pleasure","To savour enjoyment, delight and sensory experience."],["Prosperity","To build financial resources, options and material abundance."],["Purpose","To direct your life toward something that feels worth serving."],["Recognition","To have your efforts, abilities or identity noticed and valued."],["Respect","To give and receive consideration, dignity and regard."],["Responsibility","To own your choices, duties and their consequences."],["Security","To protect safety, predictability and stability for yourself and others."],["Self-expression","To show your ideas, feelings and identity openly."],["Service","To use your time and abilities in support of others."],["Simplicity","To reduce excess and focus on what is essential."],["Spirituality","To connect with the sacred, transcendent or deeply meaningful."],["Stability","To build continuity, order and dependable foundations."],["Tradition","To preserve practices and customs that carry meaning across time."],["Trust","To build relationships where people can rely on one another."],["Wisdom","To apply experience and judgment to what truly matters."]
].map(([name,desc])=>({name,desc}));

const DEFAULT_NAMES = new Set(["Acceptance","Achievement","Adventure","Authenticity","Autonomy","Balance","Belonging","Caring","Challenge","Comfort","Commitment","Compassion","Connection","Contribution","Courage","Creativity","Curiosity","Dependability","Equality","Excellence","Fairness","Family","Freedom","Friendship","Fun","Growth","Health","Honesty","Humility","Influence","Inner peace","Justice","Kindness","Learning","Love","Loyalty","Meaning","Nature","Pleasure","Prosperity","Purpose","Recognition","Respect","Responsibility","Security","Spirituality","Tradition","Wisdom"]);
const BASE = VALUES.filter(v=>DEFAULT_NAMES.has(v.name));
const $ = s => document.querySelector(s);
const screens = [...document.querySelectorAll('.screen')];
const state = {name:'',custom:[],round:1,roundDeck:[],index:0,kept:[],released:[],history:[],restoreSelected:[],final:null};

function show(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));$('#resetBtn').hidden=['welcome','setup'].includes(id);window.scrollTo({top:0,behavior:'instant'});}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),2100)}
function shuffle(a){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}

$('#beginBtn').onclick=()=>show('setup');
$('#addCustom').onclick=addCustom;
$('#customValue').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addCustom();}});
function addCustom(){const input=$('#customValue');const name=input.value.trim().replace(/\s+/g,' ');if(!name)return;if(state.custom.some(x=>x.toLowerCase()===name.toLowerCase())||VALUES.some(v=>v.name.toLowerCase()===name.toLowerCase())){toast('That value is already included.');return;}state.custom.push(name);input.value='';renderCustom();}
function renderCustom(){const wrap=$('#customList');wrap.innerHTML='';state.custom.forEach((name,i)=>{const b=document.createElement('button');b.className='chip';b.textContent=name+' ×';b.title='Remove';b.onclick=()=>{state.custom.splice(i,1);renderCustom();};wrap.appendChild(b);});}

$('#startSort').onclick=()=>{
  state.name=$('#myName').value.trim()||'You';
  const custom=state.custom.map(name=>({name,desc:'A value you added because it matters in your own words.',custom:true}));
  state.round=1;state.roundDeck=shuffle([...BASE,...custom]);state.index=0;state.kept=[];state.released=[];state.history=[];state.final=null;
  renderCard();show('game');
};

function renderCard(){
  if(state.index>=state.roundDeck.length){finishRound();return;}
  const v=state.roundDeck[state.index];
  $('#roundBadge').textContent=`Round ${state.round}`;$('#cardCounter').textContent=`${state.index+1} / ${state.roundDeck.length}`;$('#progressBar').style.width=`${(state.index/state.roundDeck.length)*100}%`;
  $('#keepCount').textContent=`${state.kept.length} kept so far`;$('#cardOrdinal').textContent=`Value ${String(state.index+1).padStart(2,'0')}`;$('#valueTitle').textContent=v.name;$('#valueDesc').textContent=v.desc;$('#undoBtn').disabled=!state.history.length;
  const c=$('#valueCard');c.style.transform='';c.style.opacity='1';$('#keepLabel').style.opacity=0;$('#releaseLabel').style.opacity=0;
}
function decide(keep){
  const card=state.roundDeck[state.index];if(!card)return;
  state.history.push({index:state.index,kept:[...state.kept],released:[...state.released]});
  (keep?state.kept:state.released).push(card);animate(keep,()=>{state.index++;renderCard();});
}
function animate(keep,cb){const c=$('#valueCard');c.style.transform=`translateX(${keep?520:-520}px) rotate(${keep?12:-12}deg)`;c.style.opacity='.08';setTimeout(cb,175);}
$('#keepBtn').onclick=()=>decide(true);$('#releaseBtn').onclick=()=>decide(false);
$('#undoBtn').onclick=()=>{const h=state.history.pop();if(!h)return;state.index=h.index;state.kept=h.kept;state.released=h.released;renderCard();toast('Last choice undone.');};

let startX=0,dx=0,drag=false;const vc=$('#valueCard');
vc.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;drag=true;startX=e.clientX;dx=0;vc.classList.add('dragging');vc.setPointerCapture?.(e.pointerId);});
vc.addEventListener('pointermove',e=>{if(!drag)return;dx=e.clientX-startX;vc.style.transform=`translateX(${dx}px) rotate(${dx/24}deg)`;const p=Math.min(Math.abs(dx)/105,1);$('#keepLabel').style.opacity=dx>0?p:0;$('#releaseLabel').style.opacity=dx<0?p:0;});
function endDrag(){if(!drag)return;drag=false;vc.classList.remove('dragging');const t=Math.min(105,innerWidth*.22);if(dx>t){decide(true);return;}if(dx<-t){decide(false);return;}vc.style.transform='';$('#keepLabel').style.opacity=0;$('#releaseLabel').style.opacity=0;}
vc.addEventListener('pointerup',endDrag);vc.addEventListener('pointercancel',endDrag);
window.addEventListener('keydown',e=>{if(!$('#game').classList.contains('active'))return;if(e.key==='ArrowRight')decide(true);if(e.key==='ArrowLeft')decide(false);if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='z')$('#undoBtn').click();});

function finishRound(){
  $('#progressBar').style.width='100%';
  if(state.kept.length<3){state.restoreSelected=[];renderRestore();show('restore');return;}
  if(state.kept.length===3){completeSort(state.kept);return;}
  const keptAll=state.kept.length===state.roundDeck.length;
  $('#roundEndEyebrow').textContent=`Round ${state.round} complete`;$('#roundEndNumber').textContent=state.kept.length;
  $('#roundEndTitle').textContent=keptAll?'All of them still matter.':'Still important.';
  $('#roundEndCopy').textContent=keptAll?'That is completely fine. Nothing is discarded just to satisfy the app. Go through the same set again and notice which values you would be most reluctant to lose.':'Only the values you chose return. There is still no quota in the next round — keep whatever remains genuinely important.';
  const p=$('#roundPreview');p.innerHTML='';state.kept.forEach(v=>{const s=document.createElement('span');s.textContent=v.name;p.appendChild(s)});
  $('#continueRound').textContent=keptAll?'Try the same set again':'Go through these again';show('roundEnd');
}
$('#continueRound').onclick=()=>{state.round++;state.roundDeck=shuffle([...state.kept]);state.index=0;state.kept=[];state.released=[];state.history=[];renderCard();show('game');};

function renderRestore(){
  $('#restoreCopy').textContent=`You kept ${state.kept.length}. Tap any value you let go in this round to bring it back. You can restore as many as you want; once at least three are in play, the app can continue naturally.`;
  const grid=$('#restoreGrid');grid.innerHTML='';
  state.released.forEach((v,i)=>{const b=document.createElement('button');b.className='restore-card';b.innerHTML='<div class="restore-word"></div>';b.querySelector('.restore-word').textContent=v.name;b.onclick=()=>{const idx=state.restoreSelected.indexOf(i);if(idx>=0)state.restoreSelected.splice(idx,1);else state.restoreSelected.push(i);b.classList.toggle('selected',state.restoreSelected.includes(i));updateRestoreButton();};grid.appendChild(b);});
  updateRestoreButton();
}
function updateRestoreButton(){const total=state.kept.length+state.restoreSelected.length;$('#restoreContinue').disabled=total<3;$('#restoreContinue').textContent=total===3?'Lock in these 3':`Continue with ${total}`;}
$('#restoreContinue').onclick=()=>{const restored=state.restoreSelected.map(i=>state.released[i]);const next=[...state.kept,...restored];if(next.length===3){completeSort(next);return;}state.round++;state.roundDeck=shuffle(next);state.index=0;state.kept=[];state.released=[];state.history=[];renderCard();show('game');};

function completeSort(final){state.final=[...final];renderFinal();show('finalResults');}
function renderFinal(){
  $('#finalName').textContent=state.name==='You'?'Your values':`${state.name}’s values`;
  const wrap=$('#finalThree');wrap.innerHTML='';
  state.final.forEach((v,i)=>{const d=document.createElement('div');d.className='final-card';d.innerHTML='<div class="num"></div><div class="word"></div><div class="small-desc"></div>';d.querySelector('.num').textContent=`0${i+1}`;d.querySelector('.word').textContent=v.name;d.querySelector('.small-desc').textContent=v.desc;wrap.appendChild(d);});
  document.body.classList.remove('screenshot-mode');$('#shotBtn').textContent='Screenshot mode';
}
$('#shotBtn').onclick=()=>{const on=document.body.classList.toggle('screenshot-mode');$('#shotBtn').textContent=on?'Exit screenshot mode':'Screenshot mode';if(on)toast('Controls hidden — take your screenshot.');};
$('#finishBtn').onclick=()=>{document.body.classList.remove('screenshot-mode');show('finish');};
$('#viewAgainBtn').onclick=()=>{renderFinal();show('finalResults');};
$('#restartBtn').onclick=resetAll;
$('#resetBtn').onclick=()=>{if(confirm('Start over and clear this sort?'))resetAll();};
function resetAll(){Object.assign(state,{name:'',custom:[],round:1,roundDeck:[],index:0,kept:[],released:[],history:[],restoreSelected:[],final:null});$('#myName').value='';$('#customValue').value='';renderCustom();document.body.classList.remove('screenshot-mode');show('welcome');}

if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
