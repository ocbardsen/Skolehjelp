const PARTS=['Del 1 · Akkusativ og dativ','Del 2 · Preposisjoner','Del 3 · Presens','Del 4 · Perfektum','Del 5 · Sett sammen setningen'];
const Q=[
// Del 1
{p:0,t:'fill',pre:'Ich sehe ',post:' Mann.',inf:'der Mann',no:'Jeg ser mannen.',a:['den'],why:'«Se» tar akkusativ. Hankjønn: der → den.'},
{p:0,t:'fill',pre:'Er gibt ',post:' Frau ein Buch.',inf:'die Frau',no:'Han gir kvinnen en bok.',a:['der'],why:'Den som mottar noe står i dativ. Hunkjønn: die → der.'},
{p:0,t:'fill',pre:'Wir kaufen ',post:' Auto.',inf:'ein Auto',no:'Vi kjøper en bil.',a:['ein'],why:'Akkusativ av et nøytrum er lik nominativ: ein Auto.'},
{p:0,t:'fill',pre:'Sie hilft ',post:' Kind.',inf:'das Kind',no:'Hun hjelper barnet.',a:['dem'],why:'Helfen tar alltid dativ. Nøytrum: das → dem.'},
{p:0,t:'fill',pre:'Ich habe ',post:' Hund schon lange.',inf:'mein Hund',no:'Jeg har hatt hunden min lenge.',a:['meinen'],why:'Akkusativ hankjønn: mein → meinen.'},
{p:0,t:'fill',pre:'Er wohnt bei ',post:' Eltern.',inf:'die Eltern',no:'Han bor hos foreldrene.',a:['den'],why:'Bei tar dativ. Flertall i dativ: die → den (og substantivet får ofte -n).'},
{p:0,t:'fill',pre:'Das Buch gehört ',post:' Lehrerin.',inf:'die Lehrerin',no:'Boka tilhører læreren (kvinne).',a:['der'],why:'Gehören tar dativ. Hunkjønn: die → der.'},
{p:0,t:'fill',pre:'Ich schreibe ',post:' Freund eine E-Mail.',inf:'mein Freund',no:'Jeg skriver en e-post til vennen min.',a:['meinem'],why:'Mottakeren står i dativ. Hankjønn: mein → meinem.'},
{p:0,t:'fill',pre:'Sie liebt ',post:' Schwester sehr.',inf:'ihre Schwester',no:'Hun elsker søsteren sin veldig.',a:['ihre'],why:'Akkusativ hunkjønn er lik nominativ: ihre Schwester.'},
{p:0,t:'fill',pre:'Wir danken ',post:' Lehrer.',inf:'der Lehrer',no:'Vi takker læreren (mann).',a:['dem'],why:'Danken tar dativ. Hankjønn: der → dem.'},
// Del 2
{p:1,t:'mc',no:'Jeg går inn på skolen. (retning)',sent:'Ich gehe in ___ Schule.',opts:['die','der','den','dem'],a:'die',why:'In er en vekselpreposisjon. Retning (wohin?) gir akkusativ.'},
{p:1,t:'mc',no:'Hun sitter på kjøkkenet. (sted)',sent:'Sie sitzt in ___ Küche.',opts:['die','der','den','das'],a:'der',why:'Sted (wo?) gir dativ. Hunkjønn: der.'},
{p:1,t:'mc',no:'Jeg kjører med bussen.',sent:'Ich fahre mit ___ Bus.',opts:['den','dem','der','das'],a:'dem',why:'Mit tar alltid dativ.'},
{p:1,t:'mc',no:'Gaven er til moren min.',sent:'Das Geschenk ist für ___ Mutter.',opts:['meine','meiner','meinen','meinem'],a:'meine',why:'Für tar alltid akkusativ. Hunkjønn akkusativ: meine.'},
{p:1,t:'mc',no:'Etter skolen spiser vi sammen.',sent:'Nach ___ Schule essen wir zusammen.',opts:['die','der','den','dem'],a:'der',why:'Nach tar alltid dativ. Hunkjønn: der.'},
// Del 3
{p:2,t:'fill',pre:'Er ',post:' jeden Tag um sieben Uhr auf.',inf:'aufstehen',no:'Han står opp hver dag klokken sju.',a:['steht'],why:'Skillbart verb: aufstehen → er steht … auf. Prefikset flyttes til slutten.'},
{p:2,t:'fill',pre:'Du ',post:' sehr schnell.',inf:'fahren',no:'Du kjører veldig fort.',a:['fährst'],why:'Fahren får omlyd ved du og er/sie/es: du fährst, er fährt.'},
{p:2,t:'fill',pre:'Sie ',post:' gut Deutsch.',inf:'sprechen',no:'Hun snakker godt tysk.',a:['spricht'],why:'Sprechen skifter e → i: sie spricht.'},
{p:2,t:'fill',pre:'Er ',post:' jeden Abend ein Buch.',inf:'lesen',no:'Han leser en bok hver kveld.',a:['liest'],why:'Lesen skifter e → ie: er liest.'},
{p:2,t:'fill',pre:'Ihr ',post:' viel Sport.',inf:'treiben',no:'Dere driver mye idrett.',a:['treibt'],why:'Ved ihr legger du til -t: ihr treibt.'},
{p:2,t:'fill',pre:'Du ',post:' mir jeden Tag.',inf:'helfen',no:'Du hjelper meg hver dag.',a:['hilfst'],why:'Helfen skifter e → i: du hilfst, er hilft.'},
{p:2,t:'fill',pre:'Wann ',post:' der Zug in Berlin an?',inf:'ankommen',no:'Når kommer toget til Berlin?',a:['kommt'],why:'Skillbart verb: Wann kommt der Zug … an? Prefikset står sist.'},
{p:2,t:'fill',pre:'Ich ',post:' nicht, wo er wohnt.',inf:'wissen',no:'Jeg vet ikke hvor han bor.',a:['weiß','weiss'],why:'Wissen er uregelmessig: ich weiß, du weißt, er weiß.'},
// Del 4
{p:3,t:'fill',pre:'Gestern ',post:' ich ins Kino gegangen.',inf:'sein',no:'I går gikk jeg på kino.',a:['bin'],why:'Gehen er et bevegelsesverb og bruker sein: ich bin gegangen.'},
{p:3,t:'fill',pre:'Wir ',post:' gestern Pizza gegessen.',inf:'haben',no:'Vi spiste pizza i går.',a:['haben'],why:'Essen bruker haben: wir haben gegessen.'},
{p:3,t:'fill',pre:'Er hat einen Brief ',post:'.',inf:'schreiben',no:'Han har skrevet et brev.',a:['geschrieben'],why:'Partizip II av schreiben: geschrieben.'},
{p:3,t:'fill',pre:'Sie ist nach Oslo ',post:'.',inf:'fahren',no:'Hun har reist til Oslo.',a:['gefahren'],why:'Partizip II av fahren: gefahren, med sein.'},
// Del 5
{p:4,t:'order',no:'I dag går jeg på kino.',words:['Kino','heute','ich','gehe','ins'],sols:[['heute','gehe','ich','ins','Kino'],['ich','gehe','heute','ins','Kino']],end:'.'},
{p:4,t:'order',no:'Jeg lærer tysk fordi jeg vil reise til Berlin.',words:['Berlin','reisen','lerne','weil','Deutsch,','möchte','ich','ich','nach'],sols:[['ich','lerne','Deutsch,','weil','ich','nach','Berlin','reisen','möchte']],end:'.'},
{p:4,t:'order',no:'Han ga meg en bok i går.',words:['Buch','er','mir','gestern','hat','ein','gegeben'],sols:[['er','hat','mir','gestern','ein','Buch','gegeben'],['gestern','hat','er','mir','ein','Buch','gegeben']],end:'.'}
];
