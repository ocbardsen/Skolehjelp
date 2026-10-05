const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const norm=s=>s.trim().toLowerCase().replace(/\s+/g,' ');
function full(q){
  if(q.t==='fill')return cap((q.pre+q.a[0]+q.post).trim());
  if(q.t==='mc')return q.sent?q.sent.replace('___',q.a):q.a;
  return cap(q.sols[0].join(' '))+q.end;
}
const $=id=>document.getElementById(id);
let set=[],i=0,res=[],done=false,placed=[];
function shuffle(a){a=a.slice();for(let k=a.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[a[k],a[j]]=[a[j],a[k]]}return a}
function show(id){['intro','quiz','end'].forEach(x=>$(x).hidden=x!==id);window.scrollTo(0,0)}
function begin(list){set=list;i=0;res=new Array(list.length).fill(null);show('quiz');render()}
function bar(){$('bar').innerHTML=set.map((_,k)=>`<i class="${res[k]===true?'ok':res[k]===false?'no':k===i?'cur':''}"></i>`).join('')}
function render(){
  const q=set[i];done=false;placed=[];bar();
  $('part').textContent=PARTS[q.p];$('count').textContent=(i+1)+' / '+set.length;
  $('fb').innerHTML='';$('go').textContent='Sjekk';$('go').disabled=false;$('reset').hidden=q.t!=='order';
  const c=$('card');
  if(q.t==='fill'){
    c.innerHTML=`<p class="nb">${q.no}</p><div class="sent">${q.pre}<input class="blank" id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Svar">${/^[.,!?]/.test(q.post.trim())?'':' '}${q.post.trim()} <span class="inf">(${q.inf})</span></div><div class="keys" aria-label="Spesialtegn">${['ä','ö','ü','ß'].map(k=>`<button type="button" data-k="${k}">${k}</button>`).join('')}</div>`;
    const inp=$('inp');inp.focus();
    c.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{if(done)return;inp.value+=b.dataset.k;inp.focus()});
    
  }else if(q.t==='mc'){
    c.innerHTML=`<p class="nb">${q.no}</p>${q.sent?`<div class="sent">${q.sent.replace('___','<span class="mk">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')}</div>`:''}<div class="opts" id="opts"></div>`;
    shuffle(q.opts).forEach(o=>{const b=document.createElement('button');b.type='button';b.className='opt';b.textContent=o;b.onclick=()=>{if(done)return;pick(b,o)};$('opts').appendChild(b)});
    $('go').disabled=true;
  }else{
    let w=shuffle(q.words);let n=0;while(w.join()===q.sols[0].join()&&n++<5)w=shuffle(q.words);
    c.innerHTML=`<p class="nb">${q.no}</p><div class="slot" id="slot"></div><div class="pool" id="pool"></div>`;
    w.forEach((x,k)=>{const b=document.createElement('button');b.type='button';b.className='tile';b.textContent=x;b.dataset.k=k;b.onclick=()=>tile(b);$('pool').appendChild(b)});
  }
}
let chosen=null;
function pick(b,o){chosen=o;document.querySelectorAll('.opt').forEach(x=>x.style.borderColor='');b.style.borderColor='var(--accent)';$('go').disabled=false}
function tile(b){
  if(done)return;
  const inSlot=b.parentElement.id==='slot';
  if(inSlot){b.classList.remove('in');$('pool').appendChild(b)}else{b.classList.add('in');$('slot').appendChild(b)}
}
$('reset').onclick=()=>{if(done)return;[...$('slot').children].forEach(b=>{b.classList.remove('in');$('pool').appendChild(b)})};
function finish(ok,q,extra){
  done=true;res[i]=ok;bar();
  $('fb').innerHTML=`<div class="fb ${ok?'ok':'no'}"><strong>${ok?'Riktig!':'Ikke helt.'}</strong>${ok?'':`<span>Riktig svar: <span class="ans">${full(q)}</span></span>`}<span>${q.why||''}</span></div>`;
  $('go').textContent=i===set.length-1?'Se resultat':'Neste';$('go').disabled=false;
}
function act(){
  const q=set[i];
  if(done){if(i===set.length-1)results();else{i++;render()}return}
  if(q.t==='fill'){
    const v=norm($('inp').value);if(!v){$('inp').focus();return}
    const ok=q.a.some(a=>norm(a)===v);$('inp').disabled=true;$('inp').classList.add(ok?'ok':'no');finish(ok,q);
  }else if(q.t==='mc'){
    if(!chosen)return;
    const ok=chosen===q.a;
    document.querySelectorAll('.opt').forEach(b=>{b.disabled=true;b.style.borderColor='';if(b.textContent===q.a)b.classList.add('ok');else if(b.textContent===chosen)b.classList.add('no')});
    finish(ok,q);chosen=null;
  }else{
    const got=[...$('slot').children].map(b=>b.textContent.toLowerCase());
    if(!got.length)return;
    const ok=q.sols.some(s=>s.map(x=>x.toLowerCase()).join(' ')===got.join(' '));
    $('slot').classList.add(ok?'ok':'no');document.querySelectorAll('.tile').forEach(b=>b.disabled=true);
    q.why=ok?'Verbet står på plass 2 (eller først i spørsmål), og hovedverbet står sist.':'Husk: modalverbet står på plass 2 i vanlige setninger og først i ja/nei-spørsmål. Hovedverbet står sist.';
    finish(ok,q);
  }
}
$('go').onclick=act;
document.addEventListener('keydown',e=>{
  if(e.key!=='Enter'||e.repeat||$('quiz').hidden)return;
  e.preventDefault();
  if(!done)act();
});
function results(){
  const n=res.filter(Boolean).length,t=set.length;
  $('score').textContent=n+' / '+t;
  const pct=n/t;
  $('verdict').textContent=pct===1?'Full pott. Modalverbene sitter.':pct>=.8?'Veldig bra. Se over feilene under.':pct>=.6?'Greit. Se på bøyningstabellen og prøv igjen.':'Bøyningene trenger mer trening. Prøv de feilene på nytt.';
  const sc=PARTS.map((_,p)=>p).map(p=>{const idx=set.map((q,k)=>q.p===p?k:-1).filter(k=>k>=0);return idx.length?`<div><span class="lbl">${PARTS[p].split(' · ')[1]}</span><b>${idx.filter(k=>res[k]).length} / ${idx.length}</b></div>`:''}).join('');
  $('scores').innerHTML=sc;
  const wrong=set.filter((q,k)=>!res[k]);
  $('missWrap').hidden=!wrong.length;
  $('miss').innerHTML=wrong.map(q=>`<li><span class="nb">${q.no}</span><b>${full(q)}</b><span class="muted">${q.why||''}</span></li>`).join('');
  $('again').hidden=!wrong.length;
  $('again').onclick=()=>begin(wrong.map(q=>({...q})));
  show('end');
}
$('start').onclick=()=>begin(Q.map(q=>({...q})));
$('restart').onclick=()=>show('intro');
