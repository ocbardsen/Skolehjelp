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
