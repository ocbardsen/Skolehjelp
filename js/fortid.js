const PARTS=['Del 1 · Preteritum','Del 2 · Perfektum','Del 3 · Velg riktig form','Del 4 · Sett sammen setningen'];
const Q=[
// Del 1: preteritum
{p:0,t:'fill',pre:'Gestern ',post:' ich lange arbeiten.',inf:'müssen',no:'I går måtte jeg arbeide lenge.',a:['musste'],why:'Preteritum av müssen: ich musste. Omlyden faller bort (ü blir u).'},
{p:0,t:'fill',pre:'Als Kind ',post:' ich nicht schwimmen.',inf:'können',no:'Som barn kunne jeg ikke svømme.',a:['konnte'],why:'Preteritum av können: ich konnte. Omlyden faller bort, og endelsen er -te.'},
{p:0,t:'fill',pre:'Wir ',post:' nicht ins Kino gehen, weil wir kein Geld hatten.',inf:'können',no:'Vi kunne ikke gå på kino, fordi vi ikke hadde penger.',a:['konnten'],why:'Ved wir: stamme + -ten. Wir konnten.'},
{p:0,t:'fill',pre:'Früher ',post:' du nie Gemüse essen.',inf:'wollen',no:'Før ville du aldri spise grønnsaker.',a:['wolltest'],why:'Ved du: stamme + -test. Du wolltest.'},
{p:0,t:'fill',pre:'Als wir jung waren, ',post:' wir abends nicht lange draußen bleiben.',inf:'dürfen',no:'Da vi var unge, fikk vi ikke lov til å være ute lenge om kvelden.',a:['durften'],why:'Dürfen mister omlyden i preteritum: wir durften.'},
{p:0,t:'fill',pre:'Der Lehrer sagte, wir ',post:' leise sein.',inf:'sollen',no:'Læreren sa at vi skulle være stille.',a:['sollten'],why:'Sollen har ingen omlyd. Wir sollten, i fortid betyr det «skulle».'},
{p:0,t:'fill',pre:'Ihr ',post:' gestern früh aufstehen.',inf:'müssen',no:'Dere måtte stå tidlig opp i går.',a:['musstet'],why:'Ved ihr: stamme + -tet. Ihr musstet.'},
{p:0,t:'fill',pre:'Als Kind ',post:' er keinen Fisch.',inf:'mögen',no:'Som barn likte han ikke fisk.',a:['mochte'],why:'Mögen får g → ch i preteritum: er mochte. Omlyden faller bort.'},
{p:0,t:'fill',pre:'Warum ',post:' du gestern nicht kommen?',inf:'können',no:'Hvorfor kunne du ikke komme i går?',a:['konntest'],why:'Ved du: konntest. Verbet står først etter spørreordet.'},
{p:0,t:'fill',pre:'Letzten Sommer ',post:' wir unbedingt nach Spanien fahren.',inf:'wollen',no:'Sist sommer ville vi absolutt reise til Spania.',a:['wollten'],why:'Wir wollten. Stamme + -ten.'},
// Del 2: perfektum
{p:1,t:'fill',pre:'Das habe ich nicht ',post:'.',inf:'wollen',no:'Det har jeg ikke villet.',a:['gewollt'],why:'Når modalverbet står alene (uten hovedverb), bruker du Partizip II: gewollt.'},
{p:1,t:'fill',pre:'Das habe ich leider nicht ',post:'.',inf:'können',no:'Det har jeg dessverre ikke klart.',a:['gekonnt'],why:'Modalverbet alene gir Partizip II: gekonnt.'},
{p:1,t:'fill',pre:'Als Kind hat sie das nie ',post:'.',inf:'dürfen',no:'Som barn fikk hun aldri lov til det.',a:['gedurft'],why:'Modalverbet alene gir Partizip II: gedurft. Omlyden faller bort.'},
{p:1,t:'fill',pre:'Wir haben gestern lange arbeiten ',post:'.',inf:'müssen',no:'Vi har måttet arbeide lenge i går.',a:['müssen'],why:'Når modalverbet står sammen med et hovedverb, brukes dobbel infinitiv: haben + arbeiten + müssen.'},
{p:1,t:'fill',pre:'Er hat leider nicht kommen ',post:'.',inf:'können',no:'Han har dessverre ikke kunnet komme.',a:['können'],why:'Dobbel infinitiv: hat + kommen + können. Ikke «gekonnt» når hovedverbet er med.'},
{p:1,t:'fill',pre:'Hast du das wirklich machen ',post:'?',inf:'wollen',no:'Har du virkelig villet gjøre det?',a:['wollen'],why:'Dobbel infinitiv: hast + machen + wollen. Hjelpeverbet haben bøyes, de to infinitivene står sist.'},
{p:1,t:'fill',pre:'Zum Glück haben wir das nicht ',post:'.',inf:'müssen',no:'Heldigvis har vi ikke måttet det.',a:['gemusst'],why:'Modalverbet alene gir Partizip II: gemusst.'},
{p:1,t:'fill',pre:'Ich habe diesen Film nie ',post:'.',inf:'mögen',no:'Jeg har aldri likt denne filmen.',a:['gemocht'],why:'Partizip II av mögen er gemocht (g → ch, uten omlyd).'},
// Del 3: velg riktig form
{p:2,t:'mc',no:'Vi kunne ikke komme. (fortid)',sent:'Wir ___ nicht kommen.',opts:['könnten','konnten','kannten','gekonnt'],a:'konnten',why:'Konnten er preteritum. Könnten er Konjunktiv II («kunne», «ville kunne»), ikke vanlig fortid.'},
{p:2,t:'mc',no:'Han skulle hjelpe oss. (fortid)',sent:'Er ___ uns helfen.',opts:['solte','sollt','sollte','gesollt'],a:'sollte',why:'Preteritum av sollen: sollte. Stammen har dobbelt l, og endelsen er -te.'},
{p:2,t:'mc',no:'Hvilken setning er riktig perfektum? (Jeg har måttet arbeide mye.)',sent:null,opts:['Ich habe viel arbeiten müssen.','Ich habe viel arbeiten gemusst.','Ich bin viel arbeiten müssen.','Ich habe viel gearbeitet müssen.'],a:'Ich habe viel arbeiten müssen.',why:'Med hovedverb brukes dobbel infinitiv, og hjelpeverbet er haben.'},
{p:2,t:'mc',no:'I går ville jeg gjerne ha en kaffe.',sent:'Gestern ___ ich gern einen Kaffee.',opts:['möchte','mochte','wollte','gewollt'],a:'wollte',why:'Möchten finnes bare i presens. I fortid bruker du wollte.'},
{p:2,t:'mc',no:'Hva betyr «Du durftest nicht gehen»?',sent:null,opts:['Du hadde ikke lov til å gå.','Du trengte ikke å gå.','Du klarte ikke å gå.','Du ville ikke gå.'],a:'Du hadde ikke lov til å gå.',why:'Nicht dürfen betyr «ikke ha lov til». «Trengte ikke» ville vært du musstest nicht gehen.'},
{p:2,t:'mc',no:'Jeg kom for sent, fordi jeg måtte arbeide lenge.',sent:'Ich kam zu spät, weil ich lange arbeiten ___.',opts:['musst','müsste','musste','gemusst'],a:'musste',why:'I leddsetning med weil står det bøyde verbet sist: … weil ich lange arbeiten musste.'},
// Del 4: ordstilling
{p:3,t:'order',no:'I går måtte jeg arbeide lenge.',words:['arbeiten','gestern','ich','lange','musste'],sols:[['ich','musste','gestern','lange','arbeiten'],['gestern','musste','ich','lange','arbeiten']],end:'.'},
{p:3,t:'order',no:'Som barn kunne jeg ikke svømme.',words:['schwimmen','als','nicht','Kind','ich','konnte'],sols:[['als','Kind','konnte','ich','nicht','schwimmen'],['ich','konnte','als','Kind','nicht','schwimmen']],end:'.'},
{p:3,t:'order',no:'Vi har måttet gå hjem.',words:['gehen','wir','Hause','haben','nach','müssen'],sols:[['wir','haben','nach','Hause','gehen','müssen']],end:'.'},
{p:3,t:'order',no:'Han sa at han ikke kunne komme.',words:['kommen','er','dass','sagte,','konnte','nicht','er'],sols:[['er','sagte,','dass','er','nicht','kommen','konnte']],end:'.'},
{p:3,t:'order',no:'Jeg var lei meg, fordi jeg ikke fikk lov til å bli med.',words:['mitkommen','weil','traurig,','war','ich','durfte','ich','nicht'],sols:[['ich','war','traurig,','weil','ich','nicht','mitkommen','durfte']],end:'.'},
{p:3,t:'order',no:'Det har jeg aldri villet.',words:['gewollt','das','ich','nie','habe'],sols:[['das','habe','ich','nie','gewollt']],end:'.'}
];
