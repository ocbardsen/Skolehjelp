const PARTS=['Del 1 · Adjektivendelser','Del 2 · Kasus og preposisjoner','Del 3 · Preteritum og partisipp','Del 4 · Konjunktiv II og passiv','Del 5 · Sett sammen setningen'];
const Q=[
// Del 1
{p:0,t:'fill',short:1,pre:'Ich kaufe einen neu',post:' Computer.',inf:'endelse',no:'Jeg kjøper en ny datamaskin.',a:['en'],why:'Ubestemt artikkel, akkusativ hankjønn: einen neuen Computer.'},
{p:0,t:'fill',short:1,pre:'Das ist ein interessant',post:' Buch.',inf:'endelse',no:'Dette er en interessant bok.',a:['es'],why:'Ubestemt artikkel, nominativ nøytrum: ein interessantes Buch.'},
{p:0,t:'fill',short:1,pre:'Mit dem alt',post:' Auto fahren wir nach Wien.',inf:'endelse',no:'Med den gamle bilen kjører vi til Wien.',a:['en'],why:'Etter artikkel i dativ er endelsen alltid -en.'},
{p:0,t:'fill',short:1,pre:'Die klein',post:' Katze schläft.',inf:'endelse',no:'Den lille katten sover.',a:['e'],why:'Bestemt artikkel, nominativ hunkjønn: die kleine Katze.'},
{p:0,t:'fill',short:1,pre:'Sie trägt eine rot',post:' Jacke.',inf:'endelse',no:'Hun har på seg en rød jakke.',a:['e'],why:'Ubestemt artikkel, akkusativ hunkjønn: eine rote Jacke.'},
{p:0,t:'fill',short:1,pre:'Er hilft einem krank',post:' Mann.',inf:'endelse',no:'Han hjelper en syk mann.',a:['en'],why:'Dativ: einem kranken Mann. Etter artikkel i dativ er endelsen -en.'},
{p:0,t:'fill',short:1,pre:'Das Auto meines neu',post:' Nachbarn ist schnell.',inf:'endelse',no:'Bilen til min nye nabo er rask.',a:['en'],why:'Genitiv: meines neuen Nachbarn. I genitiv er endelsen -en.'},
{p:0,t:'fill',short:1,pre:'Ich trinke gern kalt',post:' Tee.',inf:'endelse',no:'Jeg drikker gjerne kald te.',a:['en'],why:'Uten artikkel viser adjektivet kasus selv. Akkusativ hankjønn: kalten Tee.'},
// Del 2
{p:1,t:'mc',no:'På grunn av det dårlige været blir vi hjemme.',sent:'Wegen ___ schlechten Wetters bleiben wir zu Hause.',opts:['des','dem','das','der'],a:'des',why:'Wegen tar genitiv. Hankjønn og nøytrum: des (og substantivet får -s).'},
{p:1,t:'mc',no:'I ferien har vi lest mye.',sent:'Während ___ Ferien haben wir viel gelesen.',opts:['der','den','die','dem'],a:'der',why:'Während tar genitiv. Flertall: der Ferien.'},
{p:1,t:'mc',no:'Dette er mannen som jeg hjalp i går.',sent:'Das ist der Mann, ___ ich gestern geholfen habe.',opts:['den','dem','der','dessen'],a:'dem',why:'Relativpronomenet får kasus fra verbet i leddsetningen. Helfen tar dativ: dem.'},
{p:1,t:'mc',no:'Vi henger bildet på veggen. (retning)',sent:'Wir hängen das Bild an ___ Wand.',opts:['die','der','den','dem'],a:'die',why:'Retning (wohin?) etter vekselpreposisjon gir akkusativ.'},
{p:1,t:'mc',no:'Bildet henger på veggen. (sted)',sent:'Das Bild hängt an ___ Wand.',opts:['die','der','den','das'],a:'der',why:'Sted (wo?) etter vekselpreposisjon gir dativ.'},
{p:1,t:'mc',no:'Jeg venter på bussen.',sent:'Ich warte ___ den Bus.',opts:['auf','für','an','über'],a:'auf',why:'Warten auf + akkusativ. Preposisjonen hører til verbet og må læres.'},
// Del 3
{p:2,t:'fill',pre:'Er ',post:' gestern den ganzen Tag im Bett.',inf:'bleiben',no:'Han ble i sengen hele dagen i går.',a:['blieb'],why:'Sterkt verb: bleiben – blieb – geblieben.'},
{p:2,t:'fill',pre:'Sie ',post:' mir einen langen Brief.',inf:'schreiben',no:'Hun skrev meg et langt brev.',a:['schrieb'],why:'Sterkt verb: schreiben – schrieb – geschrieben.'},
{p:2,t:'fill',pre:'Ich ',post:' als Kind jeden Tag zu Fuß zur Schule.',inf:'gehen',no:'Som barn gikk jeg til skolen hver dag.',a:['ging'],why:'Sterkt verb: gehen – ging – gegangen.'},
{p:2,t:'fill',pre:'Du ',post:' gestern nicht in der Schule.',inf:'sein',no:'Du var ikke på skolen i går.',a:['warst'],why:'Sein i preteritum: ich war, du warst, er war.'},
{p:2,t:'fill',pre:'Wir haben den ganzen Abend ',post:'.',inf:'singen',no:'Vi har sunget hele kvelden.',a:['gesungen'],why:'Sterkt verb: singen – sang – gesungen.'},
{p:2,t:'fill',pre:'Er ist den ganzen Weg ',post:'.',inf:'laufen',no:'Han har løpt hele veien.',a:['gelaufen'],why:'Laufen: lief – gelaufen. Bevegelsesverb som bruker sein.'},
{p:2,t:'fill',pre:'Leider habe ich seinen Namen ',post:'.',inf:'vergessen',no:'Dessverre har jeg glemt navnet hans.',a:['vergessen'],why:'Verb med prefikset ver- får ikke ge-: vergessen – vergaß – vergessen.'},
{p:2,t:'fill',pre:'Der Film ',post:' mir sehr gut.',inf:'gefallen',no:'Filmen falt meg veldig i smak.',a:['gefiel'],why:'Gefallen – gefiel – gefallen. Ingen ge- i partisippet, og preteritum er gefiel.'},
// Del 4
{p:3,t:'mc',no:'Hvis jeg hadde mer tid, ville jeg lest mer.',sent:'Wenn ich mehr Zeit ___, würde ich mehr lesen.',opts:['hätte','habe','hatte','haben'],a:'hätte',why:'Irrealis bruker Konjunktiv II: hätte. «Hatte» er vanlig preteritum.'},
{p:3,t:'mc',no:'Hvis jeg var deg, ville jeg ikke gjort det.',sent:'Wenn ich du ___, würde ich das nicht machen.',opts:['war','wäre','bin','sei'],a:'wäre',why:'Konjunktiv II av sein: wäre.'},
{p:3,t:'mc',no:'Huset ble bygget i 1950.',sent:'Das Haus ___ 1950 gebaut.',opts:['wird','wurde','ist','hat'],a:'wurde',why:'Passiv i fortid: wurde + Partizip II.'},
{p:3,t:'mc',no:'Her snakkes det tysk.',sent:'Hier ___ Deutsch gesprochen.',opts:['wurde','werden','wirst','wird'],a:'wird',why:'Passiv i presens: wird + Partizip II. «Deutsch» er entall.'},
// Del 4 ordstilling
{p:4,t:'order',no:'Hvis jeg hadde tid, ville jeg reist til Berlin.',words:['wenn','ich','Zeit','hätte,','würde','ich','nach','Berlin','fahren'],sols:[['wenn','ich','Zeit','hätte,','würde','ich','nach','Berlin','fahren']],end:'.'},
{p:4,t:'order',no:'Selv om det regnet, gikk vi tur.',words:['obwohl','es','regnete,','gingen','wir','spazieren'],sols:[['obwohl','es','regnete,','gingen','wir','spazieren']],end:'.'},
{p:4,t:'order',no:'Boka som jeg har lest, var spennende.',words:['das','Buch,','das','ich','gelesen','habe,','war','spannend'],sols:[['das','Buch,','das','ich','gelesen','habe,','war','spannend']],end:'.'},
{p:4,t:'order',no:'Han sa at han hadde kommet for sent i går.',words:['er','hat','gesagt,','dass','er','gestern','zu','spät','gekommen','ist'],sols:[['er','hat','gesagt,','dass','er','gestern','zu','spät','gekommen','ist']],end:'.'}
];
