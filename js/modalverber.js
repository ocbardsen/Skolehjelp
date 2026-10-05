const PARTS=['Del 1 · Fyll inn riktig form','Del 2 · Velg riktig svar','Del 3 · Sett sammen setningen'];
const Q=[
// Del 1
{p:0,t:'fill',pre:'Ich ',post:' gut Klavier spielen.',inf:'können',no:'Jeg kan spille piano godt.',a:['kann'],why:'Ved ich får modalverbet ingen endelse: ich kann.'},
{p:0,t:'fill',pre:'Du ',post:' heute Hausaufgaben machen.',inf:'müssen',no:'Du må gjøre lekser i dag.',a:['musst'],why:'Ved du legger du til -st: du musst.'},
{p:0,t:'fill',pre:'Er ',post:' nach Berlin fahren.',inf:'wollen',no:'Han vil reise til Berlin.',a:['will'],why:'Ved er/sie/es er formen lik ich: er will.'},
{p:0,t:'fill',pre:'Wir ',post:' leise sein.',inf:'sollen',no:'Vi skal være stille.',a:['sollen'],why:'Ved wir brukes infinitiv: wir sollen.'},
{p:0,t:'fill',pre:'Ihr ',post:' hier nicht rauchen.',inf:'dürfen',no:'Dere har ikke lov til å røyke her.',a:['dürft'],why:'Ved ihr legger du til -t: ihr dürft.'},
{p:0,t:'fill',pre:'Ich ',post:' einen Kaffee, bitte.',inf:'möchten',no:'Jeg vil gjerne ha en kaffe, takk.',a:['möchte'],why:'Möchten er høflig form: ich möchte, du möchtest.'},
{p:0,t:'fill',pre:'Anna ',post:' sehr gut schwimmen.',inf:'können',no:'Anna kan svømme veldig godt.',a:['kann'],why:'Anna er «sie», altså 3. person entall: sie kann.'},
{p:0,t:'fill',pre:'Wir ',post:' um acht Uhr in der Schule sein.',inf:'müssen',no:'Vi må være på skolen klokken åtte.',a:['müssen'],why:'Wir müssen. Husk ü i müssen.'},
{p:0,t:'fill',pre:'',post:' du mit uns ins Kino gehen?',inf:'wollen',no:'Vil du gå på kino med oss?',a:['willst'],why:'I spørsmål står verbet først: willst du …? Ved du: -st.'},
{p:0,t:'fill',pre:'Die Kinder ',post:' heute länger spielen.',inf:'dürfen',no:'Barna får lov til å leke lenger i dag.',a:['dürfen'],why:'Die Kinder er flertall (sie): sie dürfen.'},
// Del 2
{p:1,t:'mc',no:'Du har lov til å parkere her.',sent:'Du ___ hier parken.',opts:['kannst','darfst','musst','sollst'],a:'darfst',why:'Dürfen betyr «ha lov til».'},
{p:1,t:'mc',no:'Hun vil bli lege.',sent:'Sie ___ Ärztin werden.',opts:['will','muss','darf','kann'],a:'will',why:'Wollen betyr «å ville», et ønske eller en plan.'},
{p:1,t:'mc',no:'Læreren sier: Du skal gjøre leksene dine.',sent:'Du ___ deine Hausaufgaben machen.',opts:['willst','sollst','darfst','magst'],a:'sollst',why:'Sollen betyr «skal», når en annen har bestemt det.'},
{p:1,t:'mc',no:'Det er sent. Vi må dra hjem.',sent:'Es ist spät. Wir ___ nach Hause gehen.',opts:['dürfen','mögen','müssen','wollen'],a:'müssen',why:'Müssen betyr «å måtte», det er nødvendig.'},
{p:1,t:'mc',no:'Jeg kan ikke komme i morgen. (Jeg har ikke mulighet.)',sent:'Ich ___ morgen nicht kommen.',opts:['kann','soll','mag','darf'],a:'kann',why:'Können betyr «å kunne», altså å ha mulighet eller evne.'},
{p:1,t:'mc',no:'Jeg liker sjokolade.',sent:'Ich ___ Schokolade.',opts:['kann','mag','muss','will'],a:'mag',why:'Mögen betyr «å like». Möchten betyr «å ville gjerne».'},
{p:1,t:'mc',no:'Hvilken setning er riktig? (Jeg kan spille tennis.)',sent:null,opts:['Ich kann Tennis spielen.','Ich kann spielen Tennis.','Ich spielen kann Tennis.','Ich Tennis kann spielen.'],a:'Ich kann Tennis spielen.',why:'Modalverbet på plass 2, hovedverbet sist i infinitiv.'},
{p:1,t:'mc',no:'Du må ikke røyke her. (Det er forbudt.)',sent:null,opts:['Du musst hier nicht rauchen.','Du darfst hier nicht rauchen.','Du sollst hier rauchen.','Du kannst hier nicht rauchen.'],a:'Du darfst hier nicht rauchen.',why:'«Må ikke» (forbudt) heter nicht dürfen. Nicht müssen betyr «trenger ikke».'},
{p:1,t:'mc',no:'Du trenger ikke å komme.',sent:'Du ___ nicht kommen.',opts:['darfst','musst','sollst','magst'],a:'musst',why:'Nicht müssen betyr «trenger ikke». Nicht dürfen betyr «må ikke».'},
{p:1,t:'mc',no:'Han må arbeide i dag.',sent:'Er ___ heute arbeiten.',opts:['muss','müssen','musst','müsst'],a:'muss',why:'Ved er/sie/es får modalverbet ingen endelse: er muss.'},
// Del 3
{p:2,t:'order',no:'Jeg kan svømme godt.',words:['schwimmen','ich','gut','kann'],sols:[['ich','kann','gut','schwimmen']],end:'.'},
{p:2,t:'order',no:'Vi må lære i dag.',words:['lernen','heute','wir','müssen'],sols:[['wir','müssen','heute','lernen'],['heute','müssen','wir','lernen']],end:'.'},
{p:2,t:'order',no:'Vil du ha en is?',words:['du','Eis','ein','essen','willst'],sols:[['willst','du','ein','Eis','essen']],end:'?'},
{p:2,t:'order',no:'Han har ikke lov til å gå på kino.',words:['gehen','nicht','er','Kino','darf','ins'],sols:[['er','darf','nicht','ins','Kino','gehen']],end:'.'},
{p:2,t:'order',no:'Jeg vil gjerne kjøpe et brød.',words:['kaufen','Brot','ich','ein','möchte'],sols:[['ich','möchte','ein','Brot','kaufen']],end:'.'},
{p:2,t:'order',no:'Kan du hjelpe meg?',words:['mir','du','helfen','kannst'],sols:[['kannst','du','mir','helfen']],end:'?'},
{p:2,t:'order',no:'Barna skal være stille.',words:['sein','Kinder','sollen','die','leise'],sols:[['die','Kinder','sollen','leise','sein']],end:'.'},
{p:2,t:'order',no:'På mandag må vi stå tidlig opp.',words:['aufstehen','Montag','früh','wir','am','müssen'],sols:[['am','Montag','müssen','wir','früh','aufstehen'],['wir','müssen','am','Montag','früh','aufstehen']],end:'.'},
{p:2,t:'order',no:'Hva vil du gjerne drikke?',words:['trinken','möchtest','was','du'],sols:[['was','möchtest','du','trinken']],end:'?'},
{p:2,t:'order',no:'Dere har ikke lov til å parkere her.',words:['hier','parken','nicht','dürft','ihr'],sols:[['ihr','dürft','nicht','hier','parken'],['hier','dürft','ihr','nicht','parken']],end:'.'}
];
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
    c.innerHTML=`<p class="nb">${q.no}</p><div class="sent">${q.pre}<input class="blank" id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Svar"> ${q.post.trim()} <span class="inf">(${q.inf})</span></div><div class="keys" aria-label="Spesialtegn">${['ä','ö','ü','ß'].map(k=>`<button type="button" data-k="${k}">${k}</button>`).join('')}</div>`;
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
  const sc=[0,1,2].map(p=>{const idx=set.map((q,k)=>q.p===p?k:-1).filter(k=>k>=0);return idx.length?`<div><span class="lbl">${PARTS[p].split(' · ')[1]}</span><b>${idx.filter(k=>res[k]).length} / ${idx.length}</b></div>`:''}).join('');
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
