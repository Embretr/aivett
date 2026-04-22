import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

const newsArticles = [
  {
    slug: "gpt-5-hva-vi-vet",
    title: "GPT-5: Alt vi vet så langt om OpenAIs neste store modell",
    excerpt: "OpenAI jobber med GPT-5 og det spekuleres på enorme forbedringer. Her er alt vi vet så langt.",
    content: `# GPT-5: Alt vi vet så langt

OpenAI har bekreftet at de jobber med GPT-5, men har ikke gitt noen offisiell relansedato.

## Forventede forbedringer

- Bedre resonnering og logikk
- Mer presis faktasjekking
- Forbedret multimodalitet
- Raskere inferens

## Når kommer den?

Basert på OpenAIs historikk forventer analytikere lansering i 2025.`,
    readingTime: 4,
  },
  {
    slug: "openai-o3-lansert",
    title: "OpenAI lanserer o3: Den smarteste modellen så langt",
    excerpt: "OpenAIs o3-modell setter nye rekorder på matematikk og koding. Vi ser på hva det betyr for deg.",
    content: `# OpenAI lanserer o3

OpenAI har offisielt lansert o3, og benchmarks viser at den slår alle tidligere modeller på komplekse resonneringsoppgaver.

## Hva er nytt?

o3 bruker en ny teknikk kalt "extended thinking" der modellen bruker mer tid på å tenke gjennom problemer før den svarer.

## Resultater

- 88% på ARC-AGI benchmark (tidligere rekord: 53%)
- 96.7% på AIME matematikktest
- Best i klassen på koding

## Pris og tilgjengelighet

o3 er tilgjengelig via API og i ChatGPT Pro for 200 dollar per måned.`,
    readingTime: 5,
  },
  {
    slug: "google-gemini-2-ultra",
    title: "Google Gemini 2.0 Ultra: Googles svar på GPT-4",
    excerpt: "Google har lansert Gemini 2.0 Ultra med kraftig multimodal kapasitet og integrasjon i alle Google-produkter.",
    content: `# Google Gemini 2.0 Ultra

Google Deep Mind har lansert Gemini 2.0 Ultra, og hevder den overgår GPT-4 på de fleste benchmarks.

## Styrker

- Ekstremt god på lange dokumenter (1 million token kontekstvindu)
- Innebygd i Google Workspace
- Gratis via Google One-abonnement

## Svakheter

- Kreativ skriving er fortsatt svakere enn Claude
- Noen ganger for forsiktig i svarene sine

## Konklusjon

For deg som allerede bruker Google-produkter er Gemini 2.0 Ultra et naturlig valg.`,
    readingTime: 4,
  },
  {
    slug: "claude-3-7-sonnet-lansert",
    title: "Claude 3.7 Sonnet: Anthropics beste modell hittil",
    excerpt: "Anthropic har lansert Claude 3.7 Sonnet med utvidet tenkning og overlegen kodeevne.",
    content: `# Claude 3.7 Sonnet

Anthropic har sluppet Claude 3.7 Sonnet, og den er raskt blitt favoritt blant utviklere.

## Hva er nytt?

Modellen introduserer "extended thinking"  -  en modus der Claude tenker gjennom problemer steg for steg.

## Koding

I uavhengige tester slår Claude 3.7 Sonnet GPT-4o på de fleste kodeoppgaver, spesielt på refaktorering og feilsøking.

## Tilgjengelighet

Tilgjengelig på Claude.ai og via Anthropic API.`,
    readingTime: 3,
  },
  {
    slug: "meta-llama-4-lansert",
    title: "Meta lanserer Llama 4: Gratis og kraftigere enn noensinne",
    excerpt: "Meta slipper Llama 4 som åpen kildekode. Modellen matcher kommersielle alternativer til en brøkdel av kostnaden.",
    content: `# Meta lanserer Llama 4

Meta har lansert Llama 4, og den er tilgjengelig gratis for nedlasting og bruk.

## Hvorfor er dette viktig?

Med en åpen modell kan hvem som helst kjøre avansert AI på egne servere  -  uten å sende data til OpenAI eller Google.

## Modellstørrelser

- Llama 4 Scout: 17B parametere, kjører på vanlig PC
- Llama 4 Maverick: 400B, for serverbruk
- Llama 4 Behemoth: Under trening

## Bruksområder

Bedrifter kan bygge egne AI-løsninger uten lisenskostnader.`,
    readingTime: 4,
  },
  {
    slug: "microsoft-copilot-office",
    title: "Microsoft Copilot i alle Office-apper: Slik fungerer det",
    excerpt: "Microsoft ruller ut Copilot i Word, Excel, PowerPoint og Outlook. Vi tester hva det faktisk kan.",
    content: `# Microsoft Copilot i Office

Microsoft har fullført utrullingen av Copilot i hele Microsoft 365-pakken.

## Word

Copilot kan oppsummere lange dokumenter, omskrive avsnitt og foreslå strukturer.

## Excel

Den imponerende funksjonen er naturlig-språk-til-formel: Skriv hva du vil beregne på norsk, og Copilot lager formelen.

## Outlook

Automatisk oppsummering av lange e-posttråder og utkast til svar.

## Pris

Microsoft 365 Copilot koster 299 kroner per måned per bruker for bedrifter.`,
    readingTime: 5,
  },
  {
    slug: "apple-intelligence-norge",
    title: "Apple Intelligence kommer til Norge: Dato og funksjoner",
    excerpt: "Apple Intelligence utvides til norske brukere. Her er hva du kan forvente og når det skjer.",
    content: `# Apple Intelligence i Norge

Apple bekreftet at Intelligence-funksjonene kommer til Europa og Norge i 2025.

## Funksjoner som kommer

- Writing Tools i alle apper
- Image Playground for AI-bilder
- Oppsummering av varsler
- Priority Messages i Mail
- ChatGPT-integrasjon i Siri

## Krav

Du trenger iPhone 15 Pro, iPhone 16 eller nyere Mac/iPad med M1 eller nyere.

## Personvern

Apple prosesserer de fleste forespørsler på selve enheten, ikke i skyen.`,
    readingTime: 4,
  },
  {
    slug: "ai-norsk-helsevesen",
    title: "AI revolusjonerer norsk helsevesen: Slik brukes det på sykehus",
    excerpt: "Norske sykehus tar i bruk AI til diagnostikk, journalføring og pasientoppfølging. Vi ser på hva som faktisk virker.",
    content: `# AI i norsk helsevesen

Helseforetakene i Norge er i gang med flere AI-prosjekter som allerede viser lovende resultater.

## Diagnostikk

Oslo universitetssykehus bruker AI til å analysere røntgenbilder og CT-skanninger. Systemet oppdager lungekreft på et tidlig stadium med 94% treffsikkerhet.

## Journalføring

Automatisk transkripsjon av legesamtaler reduserer tid brukt på journalføring med 40%.

## Utfordringer

- Personvernregulering (GDPR) begrenser databruk
- Integrasjon med gamle journalsystemer er krevende
- Mangel på norskspråklige treningsdata`,
    readingTime: 6,
  },
  {
    slug: "norsk-ai-strategi-2025",
    title: "Regjeringens AI-strategi 2025: Hva betyr det for norske bedrifter?",
    excerpt: "Den norske regjeringen har lansert en oppdatert AI-strategi. Vi ser på de viktigste punktene og hva det betyr i praksis.",
    content: `# Norsk AI-strategi 2025

Regjeringen lanserte i januar 2025 en oppdatert nasjonal AI-strategi med tre hovedpilarer.

## De tre pilarene

1. Kompetanse: 10 000 nye AI-utdanningsplasser innen 2027
2. Infrastruktur: Statlig investering i norsk AI-compute
3. Regulering: Implementering av EU AI Act

## For bedrifter

Bedrifter som tar i bruk AI-verktøy får tilgang til gunstige skatteordninger og subsidierte kurs.

## Kritikk

Næringslivet mener strategien er for forsiktig sammenlignet med hva USA og Kina investerer.`,
    readingTime: 5,
  },
  {
    slug: "sora-openai-video-ai",
    title: "Sora: OpenAIs AI-videogenerator er her  -  og den er imponerende",
    excerpt: "OpenAI har lansert Sora, en AI som lager realistiske videoer fra tekstbeskrivelser. Vi tester grensene.",
    content: `# Sora er her

Sora kan lage opptil ett minutt lang video fra en tekstbeskrivelse, og kvaliteten er bemerkelsesverdig.

## Hva kan den lage?

- Realistiske scener med mennesker og dyr
- Animerte videoer i ulike stiler
- Slow motion og tidsforkortede sekvenser

## Begrensninger

- Kan slite med kompleks fysikk
- Hender og fingre er fortsatt en utfordring
- Maks ett minutt per klipp

## Tilgjengelighet

Sora er inkludert i ChatGPT Plus og Pro.`,
    readingTime: 4,
  },
  {
    slug: "deepseek-r1-kina",
    title: "DeepSeek R1: Den kinesiske modellen som sjokkerte Silicon Valley",
    excerpt: "DeepSeek trente en modell som matcher GPT-4 til en hundredel av prisen. Her er hva det betyr for AI-bransjen.",
    content: `# DeepSeek R1

DeepSeek, et kinesisk AI-selskap, slapp R1 i januar 2025 og sendte bølgene gjennom tech-bransjen.

## Hvorfor er dette viktig?

DeepSeek trente R1 for anslagsvis 6 millioner dollar. GPT-4 kostet anslått over 100 millioner dollar å trene.

## Tekniske gjennombrudd

- Mixture-of-Experts arkitektur som reduserer beregningskostnader
- Åpen kildekode  -  alle kan laste ned og kjøre modellen
- Sammenlignbar ytelse med o1 på matematikk og koding

## Bekymringer

Vestlige sikkerhetsmyndigheter advarer om at apper basert på DeepSeek kan sende data til kinesiske servere.`,
    readingTime: 5,
  },
  {
    slug: "eu-ai-act-forklart",
    title: "EU AI Act: Alt du trenger å vite som norsk bruker og bedrift",
    excerpt: "EU AI Act er vedtatt og trer gradvis i kraft. Vi forklarer hva loven betyr for deg som privatperson og bedrift.",
    content: `# EU AI Act

EU AI Act er verdens første omfattende AI-regulering, og den gjelder også for Norge gjennom EØS-avtalen.

## Risikonivåer

Loven deler AI-systemer inn i fire kategorier:
1. Uakseptabel risiko (forbudt): Sosial skoring, masseovervåking
2. Høy risiko: Medisinsk utstyr, rekruttering, kredittscoring
3. Begrenset risiko: Chatbotter (må merkes)
4. Minimal risiko: Anbefalingssystemer, spam-filter

## For bedrifter

Bedrifter som bruker høy-risiko AI må dokumentere systemene sine grundig og gjennomføre risikovurderinger.

## Tidsplan

- August 2024: Forbudt AI forbudt
- August 2025: Regler for generell-formål AI
- August 2026: Alle regler i kraft`,
    readingTime: 7,
  },
  {
    slug: "mistral-le-chat-lansert",
    title: "Mistral lanserer Le Chat: Det europeiske alternativet til ChatGPT",
    excerpt: "Det franske AI-selskapet Mistral har lansert Le Chat, en chatbot som konkurrerer direkte med ChatGPT og Claude.",
    content: `# Le Chat fra Mistral

Mistral AI, Europas mest verdifulle AI-oppstart, har lansert sin egen chatbot: Le Chat.

## Hva gjør den bra?

- Flerspråklig: Eksepsjonelt god på europeiske språk
- Rask: Blant de raskeste modellene tilgjengelig
- Personvern: Data prosesseres i Europa (Frankrike)

## Priser

- Gratis: Mistral Small
- 14,99 euro/måned: Pro med Mistral Large

## Sammenligning med ChatGPT

Le Chat er generelt litt svakere på engelskspråklige oppgaver, men konkurrerer godt på fransk, spansk og tysk.`,
    readingTime: 4,
  },
  {
    slug: "perplexity-ai-ny-sokemotor",
    title: "Perplexity AI: Slik endrer den måten vi søker på nettet",
    excerpt: "Perplexity er ikke bare en ny søkemotor  -  den er en ny måte å finne informasjon på. Vi ser på hva som gjør den spesiell.",
    content: `# Perplexity AI

Perplexity kombinerer et søkeindeks med en storspråkmodell og gir deg direkte svar med kildehenvisninger.

## Slik fungerer det

Du stiller et spørsmål, Perplexity søker nettet i sanntid, og gir deg et sammendrag med lenker til kildene.

## Fordeler over Google

- Ingen annonser
- Direkte svar uten å klikke inn på nettsider
- Kan følgespørsmål stilles naturlig

## Begrensninger

- Kan hallusinere på svakt dokumenterte emner
- Kildevalget er ikke alltid de beste

## Pro-abonnement

Perplexity Pro koster 20 dollar per måned og gir tilgang til GPT-4o og Claude.`,
    readingTime: 4,
  },
  {
    slug: "github-copilot-agent-mode",
    title: "GitHub Copilot Agent Mode: AI som skriver hele funksjoner selv",
    excerpt: "GitHub Copilot har fått Agent Mode, der AI-en ikke bare foreslår kode  -  den implementerer hele oppgaver autonomt.",
    content: `# GitHub Copilot Agent Mode

GitHub har lansert Agent Mode for Copilot, og det endrer fundamentalt hva AI kan gjøre for utviklere.

## Hva er Agent Mode?

I stedet for å foreslå linjer med kode, kan Copilot nå planlegge og implementere hele funksjoner, skrive tester og refaktorere.

## Slik bruker du det

1. Åpne VS Code med GitHub Copilot-utvidelsen
2. Velg "Agent" i Copilot Chat-panelet
3. Beskriv oppgaven på naturlig språk

## Eksempel

"Legg til pagineringsstøtte til denne API-endepunktet med cursor-basert paginering"  -  og Copilot gjør alt.

## Begrensninger

Kan gjøre feil på komplekse oppgaver. Alltid gjennomgå koden før commit.`,
    readingTime: 5,
  },
  {
    slug: "chatgpt-søk-lansert",
    title: "ChatGPT Search: OpenAIs utfordrer til Google er her",
    excerpt: "OpenAI har lansert innebygd søking i ChatGPT. Vi tester om det faktisk kan konkurrere med Google.",
    content: `# ChatGPT Search

OpenAI har integrert websøk direkte i ChatGPT, og det er et direkte angrep på Googles dominans.

## Slik fungerer det

ChatGPT søker automatisk nettet når spørsmålet krever oppdatert informasjon, og siterer kildene sine.

## Hva gjør det bra?

- Oppdatert informasjon (ikke lenger avskåret fra internett)
- Naturlig oppfølgingsspørsmål
- Integrert med resten av ChatGPT

## Hva mangler fortsatt?

- Lokal informasjon (restauranter, butikker) er svakere enn Google
- Bildesøk mangler

## Konklusjon

For informasjonsinnhenting og research er ChatGPT Search allerede et reelt alternativ til Google.`,
    readingTime: 4,
  },
  {
    slug: "norske-bedrifter-ai-2025",
    title: "Norske bedrifters AI-bruk 2025: Ny undersøkelse avslører status",
    excerpt: "En ny undersøkelse viser at 67% av norske bedrifter bruker AI-verktøy, men mange sliter med implementering.",
    content: `# AI i norsk næringsliv 2025

En ny undersøkelse fra Menon Economics viser stor vekst i AI-bruk blant norske bedrifter.

## Nøkkeltall

- 67% bruker minst ett AI-verktøy (opp fra 41% i 2023)
- 23% har integrert AI i kjernevirksomheten
- 54% melder om produktivitetsforbedring

## Hvilke verktøy brukes?

1. ChatGPT (58%)
2. Microsoft Copilot (34%)
3. GitHub Copilot (19%)
4. Midjourney/DALL-E (15%)

## Utfordringer

- Kompetansemangel: 71% oppgir dette som hovedhinder
- Personvernbekymringer: 58%
- Integrering med eksisterende systemer: 45%`,
    readingTime: 5,
  },
  {
    slug: "adobe-firefly-generativ-ai",
    title: "Adobe Firefly 3: Profesjonell AI-bildegenerering i Creative Cloud",
    excerpt: "Adobe Firefly 3 er integrert i Photoshop, Illustrator og Premiere. Vi ser på hva det betyr for kreative fagfolk.",
    content: `# Adobe Firefly 3

Adobe har fullt integrert Firefly 3 i hele Creative Cloud, og løser et av de største problemene med AI-bilder: opphavsrett.

## Hva er nytt?

- Strukturreferanse: Behold komposisjonen fra et bilde, endre stilarten
- Stiltransfer på video i Premiere Pro
- Vektorgenerering i Illustrator

## Opphavsretts-fordelen

Firefly er trent utelukkende på Adobe Stock og Public Domain-innhold. Bilder laget med Firefly er kommersielt sikre.

## Pris

Inkludert i Creative Cloud-abonnementet. Generative Credits brukes per bilde.`,
    readingTime: 4,
  },
  {
    slug: "google-notebooklm-guide",
    title: "Google NotebookLM: AI-verktøy som forstår dine egne dokumenter",
    excerpt: "Google NotebookLM lar deg laste opp egne dokumenter og stille spørsmål om dem. Vi tester hvor godt det fungerer.",
    content: `# Google NotebookLM

NotebookLM er Googles gratis AI-verktøy der du laster opp egne dokumenter og får en AI-assistent som kun baserer seg på disse.

## Slik fungerer det

1. Last opp PDFer, Google Docs, YouTube-lenker eller nettsider
2. Still spørsmål på norsk
3. Få svar med direkte sitat fra kildene dine

## Audio Overview

Den mest imponerende funksjonen: NotebookLM kan lage en podkastepisode der to AI-stemmer diskuterer innholdet ditt.

## Bruksområder

- Studenter: Analyser pensum
- Journalister: Grav i store dokumentmengder
- Jurister: Analyser kontrakter

## Begrensninger

Maks 50 kilder per notatbok, maks 500 000 ord per kilde.`,
    readingTime: 4,
  },
  {
    slug: "ai-musikk-suno-udio",
    title: "AI-generert musikk tar av: Suno og Udio endrer musikkbransjen",
    excerpt: "To nye AI-verktøy lar hvem som helst lage profesjonell-lydende musikk fra en tekstbeskrivelse. Musikkbransjen er bekymret.",
    content: `# AI-musikk med Suno og Udio

Suno og Udio er to AI-tjenester som lar deg lage komplette sanger  -  med vokal, instrument og produksjon  -  fra en tekstbeskrivelse.

## Slik fungerer det

Skriv "en melankolsk norsk folkesang om fjordene og hesten, akustisk gitar, male vocalist" og du får en ferdig sang på sekunder.

## Kvalitet

For tilfeldige lyttere er kvaliteten overraskende høy. Vokal og produksjon hører hjemme på en Spotify-spilleliste.

## Opphavsrett

RIAA har saksøkt både Suno og Udio for bruk av opphavsrettsbeskyttet musikk i treningen.

## Norsk musikk

Begge verktøyene hører norsk som instruksjonsspråk, men forstår nordisk musiktradisjon moderat.`,
    readingTime: 5,
  },
  {
    slug: "cursor-ai-editor",
    title: "Cursor: AI-kodeditoren som erstatter VS Code for tusenvis av utviklere",
    excerpt: "Cursor er en fork av VS Code med dypt integrert AI. Vi ser på om den lever opp til hypen.",
    content: `# Cursor AI-kodeeditor

Cursor er en AI-først kodeeditor basert på VS Code, og den vokser eksplosivt blant profesjonelle utviklere.

## Hva gjør Cursor annerledes?

- Composer: Skriv en oppgave og AI-en redigerer flere filer på en gang
- Chat med kodebasen: Still spørsmål om hele prosjektet
- Tab-completion på steroider: Cursor forutser neste redigering, ikke bare neste linje

## Pris

- Gratis: 2 000 AI-fullføringer per måned
- Pro (20 $/måned): Ubegrenset, inkl. GPT-4o og Claude

## Sammenligning med GitHub Copilot

Cursor leder for øyeblikket på Composer-funksjonalitet, men Copilot er tettere integrert med GitHub.`,
    readingTime: 4,
  },
]

const guideArticles = [
  {
    slug: "prompt-engineering-guide",
    title: "Prompt Engineering: Den komplette guiden til å få bedre svar fra AI",
    excerpt: "Lær deg teknikken bak gode prompts. Denne guiden tar deg fra nybegynner til avansert prompt engineering.",
    content: `# Prompt Engineering

Prompt engineering er kunsten å kommunisere effektivt med AI-modeller. Her er de viktigste teknikkene.

## 1. Vær spesifikk og konkret

Dårlig: "Skriv en e-post"
Bra: "Skriv en formell e-post på norsk til en potensiell kunde i finansbransjen. Tema: introduksjon av vårt regnskapsprogram. Tone: profesjonell men vennlig. Lengde: maks 150 ord."

## 2. Gi kontekst

Fortell AI-en hvem du er og hva konteksten er:
"Du er en erfaren norsk tekstforfatter. Jeg driver en nettbutikk som selger økonomiske barneklær..."

## 3. Be om et bestemt format

"Svar i punktliste", "Lag en tabell", "Strukturer svaret med overskrifter"

## 4. Chain-of-thought

For komplekse problemer: "Tenk steg for steg gjennom dette problemet..."

## 5. Few-shot prompting

Gi eksempler på hva du vil ha:
"Her er tre eksempler på slik jeg vil ha det skrevet: [eksempel 1], [eksempel 2]. Skriv nå ett til om X."

## Avanserte teknikker

### Role prompting
"Du er en ekspert på norsk skatterett med 20 års erfaring..."

### Negative prompting
"Svar uten å bruke fagsjargong. Ikke nevn [emne]."

### Iterativ raffinering
Start bredt, be så om presiseringer: "Gjør dette kortere", "Gjør tonen mer uformell"`,
    readingTime: 8,
  },
  {
    slug: "chatgpt-for-arbeid-guide",
    title: "ChatGPT på jobben: 15 konkrete måter å bruke det i hverdagen",
    excerpt: "Praktiske eksempler på hvordan du kan bruke ChatGPT til å spare tid og levere bedre arbeid  -  uansett bransje.",
    content: `# ChatGPT på jobben

Her er 15 konkrete måter å bruke ChatGPT som sparer deg tid hver dag.

## Kommunikasjon

1. **E-postutkast**: Lim inn punkter, få ferdig e-post
2. **Omskriving**: "Gjør denne e-posten kortere og mer direkte"
3. **Oversettelse**: Med konteksttilpasning, ikke bare ord-for-ord
4. **Møtereferat**: Lim inn notater, få strukturert referat

## Analyse og research

5. **Oppsummering**: Lim inn lange rapporter, få sammendrag
6. **Pros/cons-analyse**: "Analyser fordeler og ulemper ved..."
7. **Markedsanalyse**: Bakgrunnsinformasjon om bransjer

## Innholdsproduksjon

8. **Presentasjonsstruktur**: "Lag en struktur for en 20-minutters presentasjon om..."
9. **Jobbannonser**: Utkast til stillingsannonser
10. **Sosiale medier**: Variasjoner av samme innhold

## Data og analyse

11. **Forklaring av data**: "Hva betyr dette Excel-resultatet?"
12. **SQL-spørsmål**: Beskriv hva du vil ha, få SQL-kode

## Tips

Lagre dine beste prompts som maler for gjentakende oppgaver.`,
    readingTime: 6,
  },
  {
    slug: "midjourney-guide-nybegynner",
    title: "Midjourney guide for nybegynnere: Slik lager du imponerende bilder",
    excerpt: "Kom i gang med Midjourney på under 30 minutter. Vi viser deg alt fra konto til ditt første fantastiske bilde.",
    content: `# Midjourney for nybegynnere

## Kom i gang

1. Gå til midjourney.com og opprett konto
2. Abonner (fra 10 $/måned)
3. Bruk Discord eller nettleseren

## Din første prompt

I /imagine-boksen skriver du beskrivelsen din på engelsk:
\`/imagine a Norwegian fjord at sunset, cinematic photography, golden hour\`

## Viktige parametere

- \`--ar 16:9\`  -  Bildeformat (widescreen)
- \`--style raw\`  -  Mer fotografisk, mindre "AI-estetikk"
- \`--v 6.1\`  -  Siste versjon

## Tips for bedre bilder

### Legg til stilreferanser
"...in the style of Ansel Adams, black and white photography"

### Spesifiser kamera og linse
"shot with 85mm lens, shallow depth of field, bokeh background"

### Bruk lighting-beskrivelser
"soft natural light", "dramatic rim lighting", "golden hour"

## Vanlige feil

- For vage beskrivelser gir generiske bilder
- Hender og tekst er fortsatt utfordrende
- Ansikter kan være ustabile  -  bruk --cref for konsistens`,
    readingTime: 7,
  },
  {
    slug: "claude-for-skriving",
    title: "Slik bruker du Claude til skriving: Den komplette guiden",
    excerpt: "Claude er spesielt god på skriving og analyse. Her er hvordan du får mest mulig ut av det til innholdsproduksjon.",
    content: `# Claude for skriving

Anthropics Claude er generelt ansett som den beste AI-modellen for kreativ og profesjonell skriving.

## Hvorfor Claude?

- Mer nyansert og human tone enn ChatGPT
- Bedre på å følge stilretningslinjer
- Mindre tilbøyelighet til klisjeer

## Innholdsproduksjon

### Blogginnlegg
"Skriv et blogginnlegg på 800 ord om [emne]. Mål: [hvem]. Tone: [informativ/inspirerende/etc]. Inkluder: innledning, 3 seksjoner med underoverskrifter, konklusjon med CTA."

### Produktbeskrivelser
Gi Claude produktspesifikasjoner og mål, og be om varianter.

## Redigering

Claude er utmerket som redaktør:
"Rediger dette innlegget for klarhet og flyt. Behold tonen men fjern gjentagelser."

## Konsistens over lang tid

Lag et "stildokument" og lim det inn i starten:
"Her er vårt brands stilguide: [stilguide]. Skriv all tekst i henhold til disse retningslinjene."

## Begrensning

Claude har kunnskapsgrense og kan ikke søke nettet uten verktøy.`,
    readingTime: 6,
  },
  {
    slug: "ai-for-studenter",
    title: "AI for studenter: Slik bruker du det på riktig måte (og unngår plagiat)",
    excerpt: "ChatGPT og andre AI-verktøy kan være kraftige studieverktøy. Her er en praktisk guide som holder deg på rett side av reglene.",
    content: `# AI for studenter

AI kan dramatisk forbedre studiekvaliteten din  -  hvis du bruker det riktig.

## Lovlig og nyttig bruk

### Forklaring av vanskelige konsepter
"Forklar kvantemekanikk som om jeg er 16 år og aldri har tatt fysikk"

### Testforberedelse
"Lag 10 spørsmål om [emne] i stil med universitetseksamen med svar"

### Strukturhjelp
"Hjelp meg å lage en disposisjon for en oppgave om [emne]"

## Grensesonen: Vær forsiktig

- Aldri: La AI skrive oppgaven din og lever den inn som din
- OK: Be AI-en kommentere argumentasjonen din
- OK: Bruke AI for å finne motargumenter
- Grenseland: La AI omskrive teksten din

## Referanser og faktasjekking

**Advarsel**: ChatGPT kan finne på referanser. Sjekk alltid at artiklene faktisk finnes.

## Tips: Bruk AI som Sokrates

Still spørsmål, ikke be om svar. "Hva er de sterkeste argumentene mot mitt standpunkt?"`,
    readingTime: 6,
  },
  {
    slug: "ai-bilder-guide",
    title: "Den store guiden til AI-bildegenerering: DALL-E, Midjourney og Stable Diffusion",
    excerpt: "Vi sammenligner de tre største AI-bildeverktøyene og viser deg når du bør bruke hvert av dem.",
    content: `# AI-bildegenerering 2025

## De tre alternativene

### DALL-E 3 (OpenAI)
Tilgjengelig direkte i ChatGPT. Best på:
- Tekst i bilder
- Følge komplekse instruksjoner
- Enkelt å bruke uten teknisk kunnskap

### Midjourney
Abonnementsbasert. Best på:
- Kunstnerisk kvalitet
- Konsistente estetikk
- Fotorealistiske bilder

### Stable Diffusion
Åpen kildekode. Best på:
- Gratis (hvis du kjører lokalt)
- Kontroll og tilpasning
- NSFW-innhold (på eget ansvar)

## Prompting-tips som gjelder alle

- Start med subjekt, deretter stil, til slutt tekniske detaljer
- Bruk komma til å separere konsepter
- Negative prompts (det du ikke vil ha) hjelper mye

## Opphavsrett

Generell tommelfingerregel: Unngå å spesifisere levende kunstneres navn som stilreferanse.`,
    readingTime: 7,
  },
  {
    slug: "github-copilot-setup-guide",
    title: "GitHub Copilot: Komplett oppsettguide for VS Code",
    excerpt: "Fra installasjon til avansert bruk  -  en steg-for-steg guide til GitHub Copilot for norske utviklere.",
    content: `# GitHub Copilot oppsett

## Installasjon

1. Gå til github.com/features/copilot og abonner (10 $/måned)
2. Åpne VS Code
3. Installer "GitHub Copilot"-utvidelsen
4. Logg inn med GitHub-kontoen din

## Grunnleggende bruk

### Inline suggestions
Begynn å skrive, Copilot foreslår resten. Tab for å akseptere.

### Copilot Chat
Ctrl+Shift+I åpner Copilot Chat-panelet. Still spørsmål om koden din.

## Effektive prompts i kommentarer

\`\`\`javascript
// Funksjon som validerer norsk personnummer (11 siffer, modulus-11)
function validateNorwegianSSN(ssn) {
\`\`\`

## Nyttige kommandoer i Chat

- \`/explain\`  -  Forklar valgt kode
- \`/fix\`  -  Foreslå fix på feil
- \`/tests\`  -  Generer tester for valgt kode
- \`/doc\`  -  Skriv dokumentasjon

## Tips

Skriv beskrivende variabelnavn og funksjonsnavn  -  Copilot bruker disse som kontekst.`,
    readingTime: 6,
  },
  {
    slug: "notion-ai-guide",
    title: "Notion AI guide: Slik bruker du AI i arbeidsflyt og notater",
    excerpt: "Notion AI er integrert direkte i arbeidsområdet ditt. Vi viser de mest nyttige funksjonene for produktivitet.",
    content: `# Notion AI

Notion AI er ikke et separat verktøy  -  det lever inne i Notion-sidene og databasene dine.

## Aktivere Notion AI

Skriv \`/ai\` på en Notion-side for å aktivere AI-assistenten.

## De mest nyttige funksjonene

### Oppsummer notater
Marker tekst og velg "Summarize"  -  perfekt for lange møtenotater.

### Forbedre skriving
"Improve writing", "Fix spelling and grammar", "Make shorter"

### Fyll ut databaseegenskaper
AI kan automatisk tagge og kategorisere oppføringer i Notion-databaser.

### Generere aksjonspunkter
Lim inn møtenotater, be AI trekke ut aksjonspunkter.

## Praktisk arbeidsflyt

1. Ta rånotater under møtet
2. Etter møtet: Marker alt, velg "Summarize"
3. Be AI generere aksjonspunkter
4. Legg aksjonspunktene inn i prosjektdatabasen

## Pris

Notion AI koster 10 dollar ekstra per bruker per måned utover Notion-abonnementet.`,
    readingTime: 5,
  },
  {
    slug: "ai-markedsforing-guide",
    title: "AI i markedsføring: 10 verktøy og hvordan du bruker dem",
    excerpt: "Fra tekstproduksjon til analyse  -  her er de beste AI-verktøyene for markedsførere i 2025.",
    content: `# AI for markedsførere

## Innholdsproduksjon

### ChatGPT / Claude
Bruk for: Annonsetekster, e-postkampanjer, sosiale medier-innlegg.
Tips: Lag en "brand voice"-prompt og bruk den konsekvent.

### Jasper AI
Spesialisert for markedsføringsinnhold. Har maler for annonser, e-poster, landingssider.

## Visuelle verktøy

### Canva AI
Generer bilder og design direkte i Canva. Enkelt for ikke-designere.

### Adobe Express + Firefly
Mer profesjonelt resultat. Kommersielt trygt innhold.

## Analyse og innsikt

### Perplexity
Rask markedsresearch og konkurranseanalyse.

### ChatGPT Code Interpreter
Last opp CSV-data og be om analyser og visualiseringer.

## SEO

### Surfer SEO + ChatGPT
Bruk Surfer til å finne nøkkelord, ChatGPT til å produsere innholdet.

## Advarsel

AI-generert innhold uten menneskelig redigering er ofte generisk. Alltid rediger og tilpass.`,
    readingTime: 6,
  },
  {
    slug: "chatgpt-koding-guide",
    title: "ChatGPT for koding: Slik bruker du det som en erfaren utvikler",
    excerpt: "AI-assistert koding handler om mer enn autocomplete. Her er avanserte teknikker for å kode raskere og bedre med AI.",
    content: `# ChatGPT for koding

## Grunnleggende bruk

ChatGPT kan skrive kode, forklare kode og feilsøke. Men den beste bruksmåten er som en samarbeidspartner.

## Feilsøking

Lim inn feilmeldingen OG relevant kode:
"Jeg får denne feilen: [feil]. Her er koden: [kode]. Hva er galt?"

## Kodeforklaring

"Forklar hva denne funksjonen gjør, linje for linje: [kode]"

## Refaktorering

"Refaktorer denne koden for bedre lesbarhet uten å endre funksjonaliteten: [kode]"

## Testing

"Skriv Jest-enhetstester for denne funksjonen, dekk edge cases: [kode]"

## Begrensninger

- Kunnskap er avskåret til treningsdato
- Kan dikte opp biblioteker som ikke finnes (hallusinasjon)
- Kjenner ikke kodebasen din  -  gi kontekst

## Beste praksis

- Del opp komplekse oppgaver i små steg
- Be alltid AI forklare valg den gjør
- Sjekk alltid generert kode for sikkerhetsproblemer

## Cursor vs ChatGPT for koding

For daglig bruk anbefales Cursor  -  den har tilgang til hele kodebasen din.`,
    readingTime: 6,
  },
  {
    slug: "copilot-windows-11-guide",
    title: "Microsoft Copilot i Windows 11: Alt du kan gjøre med den innebygde AI-en",
    excerpt: "Windows 11 har Copilot innebygd. Her er alt du faktisk kan gjøre med den  -  og hva som er skuffende.",
    content: `# Copilot i Windows 11

## Aktivere Copilot

Trykk Win+C eller klikk Copilot-ikonet i oppgavelinjen.

## Hva er faktisk nyttig

### PC-innstillinger via naturlig språk
"Slå på mørkemodus", "Åpne Bluetooth-innstillinger", "Ta et skjermbilde"

### Oppsummering av nettsider
I Edge: Marker tekst og velg "Summarize with Copilot"

### Hjelp med Office-dokumenter
Copilot i Word, Excel og Outlook er mye kraftigere enn den i Windows.

## Integrert med Recall (Win 11 24H2+)

Recall er en funksjon der Copilot "husker" alt du har gjort på PC-en og lar deg søke i det. Foreløpig opt-in på grunn av personvernbekymringer.

## Begrensninger

- Copilot i Windows er svakere enn Copilot i Microsoft 365
- Krever internettforbindelse
- Kan ikke kjøre lokale programmer autonomt (ennå)

## Tips

Bruk Copilot for raske PC-oppgaver, og ChatGPT eller Claude for dypere arbeid.`,
    readingTime: 5,
  },
  {
    slug: "ai-cv-søknad-guide",
    title: "Slik bruker du AI til å skrive CV og søknad som skiller seg ut",
    excerpt: "AI kan hjelpe deg å skrive bedre CV og søknadsbrev  -  men bare hvis du gjør det på riktig måte. Her er guiden.",
    content: `# AI for CV og søknad

## Viktig forbehold

AI kan hjelpe deg å formulere deg bedre, men historien og erfaringene må være dine egne. Lyv aldri om ferdigheter du ikke har.

## Slik bruker du AI til CV

### Steg 1: Dump inn all informasjon
Start med å gi ChatGPT all din erfaring, utdanning og ferdigheter usortert.

### Steg 2: Be om strukturering
"Organiser dette i et CV-format med relevante seksjoner"

### Steg 3: Tilpass til stillingen
"Jeg søker på denne jobben: [stillingsannonse]. Hvilke deler av CV-en min bør jeg fremheve?"

## Søknadsbrev

1. Lim inn stillingsannonsen
2. Lim inn CV-en din
3. Prompt: "Skriv et personlig søknadsbrev på norsk. Fremhev hvorfor [spesifikk erfaring] gjør meg godt egnet. Tone: engasjert og profesjonell. Lengde: 250-300 ord."

## Forberedelse til intervju

Bruk AI til å forberede deg på intervju:
"Hvilke spørsmål vil de trolig stille til en søker på denne stillingen?"`,
    readingTime: 5,
  },
  {
    slug: "perplexity-guide",
    title: "Perplexity AI guide: Slik bruker du den beste AI-søkemotoren",
    excerpt: "Perplexity er mer enn et Google-alternativ. Her er avanserte teknikker for å få mest ut av AI-søking.",
    content: `# Perplexity AI  -  komplett guide

## Grunnleggende bruk

Perplexity.ai er gratis i grunnversjonen. Bare skriv spørsmålet ditt på norsk.

## Focus-modus

Klikk på "Focus" for å begrense søket:
- Web: Standard internett-søk
- Academic: Kun vitenskapelige artikler
- YouTube: Søk i videotransskripter
- Reddit: Finn diskusjoner

## Oppfølgingsspørsmål

Perplexity husker konteksten. Still oppfølgingsspørsmål naturlig:
"Hvilke studier underbygger dette?" → "Og hva sier kritikerne?"

## Pro-funksjoner (20 $/måned)

- Tilgang til GPT-4o og Claude 3.7
- Spaces: Personlige forskningsområder
- Filer: Last opp PDFer og still spørsmål

## Tips for bedre resultater

- Spesifiser tidsramme: "de siste 6 månedene"
- Be om kilder: "med lenker til primærkilder"
- Bruk Academic-mode for fakta

## Begrensning

Perplexity kan fortsatt hallusinere på svakt dokumenterte emner. Sjekk alltid kildene den oppgir.`,
    readingTime: 5,
  },
  {
    slug: "ai-epost-guide",
    title: "Skriv bedre e-poster med AI: Maler og teknikker",
    excerpt: "Fra kaldt salgsoppsøk til vanskelige tilbakemeldinger  -  her er hvordan AI hjelper deg å skrive e-poster som faktisk virker.",
    content: `# AI for e-postskriving

## Malen som virker

Gi AI-en disse elementene:
1. Mottaker (hvem, rolle, relasjon)
2. Formål (hva vil du oppnå)
3. Tone (formell, uformell, vennlig, direkte)
4. Lengde
5. Eventuell bakgrunn

## Vanskelige e-poster

### Avslå en forespørsel
"Skriv en e-post som takker nei til en forespørsel om gratis samarbeid. Vær vennlig men tydelig. Ikke la døren stå åpen for fremtidige forhandlinger."

### Purre på betaling
"Skriv en tredje purring på en faktura på 15 000 kr som er 60 dager forfalt. Tone: bestemt men profesjonell."

### Gi negativ tilbakemelding
"Skriv tilbakemelding til en ansatt om at arbeidskvaliteten må forbedres. Vær konstruktiv og respektfull."

## Automatisering

Lag et "prompt-bibliotek" med dine 10 vanligste e-posttyper. Lim inn og fyll inn [variablene].

## Outlook Copilot

Hvis du har Microsoft 365 Copilot, kan du bruke "Draft with Copilot" direkte i Outlook.`,
    readingTime: 5,
  },
  {
    slug: "custom-gpts-guide",
    title: "Custom GPTs: Slik lager du din egen spesialiserte AI-assistent",
    excerpt: "OpenAI lar alle lage egne GPT-er med egne instruksjoner og kunnskap. Vi viser steg for steg hvordan.",
    content: `# Custom GPTs

## Hva er en Custom GPT?

En Custom GPT er en forhåndskonfigurert versjon av ChatGPT med:
- Egne instruksjoner og personlighet
- Tilpasset kunnskap (opplastede dokumenter)
- Egne verktøy (websøk, kodeinterpreter, DALL-E)

## Slik lager du en

1. Gå til chatgpt.com og klikk "Explore GPTs"
2. Klikk "Create"
3. Beskriv hva GPT-en skal gjøre i "Create"-fanen
4. Konfigurer detaljer i "Configure"-fanen

## Eksempler på nyttige Custom GPTs

### Norsk grammatikksjekk
Instruksjon: "Du er en norsk redaktør. Sjekk all tekst for grammatikkfeil og uklarheter. Gi tilbakemelding på bokmål."

### Kontraktsanalytiker
Last opp standard kontrakter som kunnskap. GPT-en svarer på spørsmål om innholdet.

### Merkevarestemme
Last opp stilguiden din. GPT-en skriver all tekst i henhold til merkevaren.

## Dele GPT-en

Du kan dele Custom GPTs med andre via lenke eller i GPT Store.

## Begrensninger

- Kun tilgjengelig med ChatGPT Plus (20 $/måned)
- Kan ikke aksessere sanntidsdata uten websøk-tilgang`,
    readingTime: 6,
  },
  {
    slug: "ai-oversettelse-guide",
    title: "AI-oversettelse i 2025: Slik får du de beste resultatene",
    excerpt: "ChatGPT og DeepL har endret oversettelse for alltid. Her er når du bør bruke hva, og teknikkene som gir best resultat.",
    content: `# AI-oversettelse

## DeepL vs ChatGPT vs Google Translate

### DeepL
Best for: Direkte dokumentoversettelse, europeiske språk.
Fordel: Ekstrem tekstkvalitet, spesielt for formelle tekster.
Ulempe: Begrensede språk, maks dokumentstørrelse i gratisversjon.

### ChatGPT
Best for: Kulturell tilpasning, tone-tilpasning, spesialisert fagspråk.
Fordel: Kan instrueres om tone og mål.
Ulempe: Tregere enn DeepL for lange tekster.

### Google Translate
Best for: Rask oversettelse av korte tekster, mange språk.
Ulempe: Lavere kvalitet på komplekse setninger.

## Avanserte teknikker med ChatGPT

### Tone-spesifikasjon
"Oversett til norsk (bokmål). Behold formell tone. Mål: norske næringslivsledere."

### Lokalisering
"Oversett og lokaliser  -  erstatt amerikanske eksempler med norske."

### Fagspråk
"Oversett dette medisinske sammendraget til norsk. Bruk korrekt norsk medisinsk terminologi."

## Tips: Bruk begge

Bruk DeepL for grovoversettelingen, bruk ChatGPT for å polere og tilpasse.`,
    readingTime: 5,
  },
  {
    slug: "ai-video-sora-runway-guide",
    title: "AI-video guide: Slik lager du videoer med Sora og Runway",
    excerpt: "AI-videoer er ikke lenger science fiction. Denne guiden tar deg gjennom de beste verktøyene og teknikkene.",
    content: `# AI-video i 2025

## De viktigste verktøyene

### Sora (OpenAI)
Tilgjengelig i ChatGPT Plus/Pro. Lager opptil 1 minutt video.
Best for: Fotorealistiske scener, b-roll, konseptvideo.

### Runway Gen-3
20-30 sekunder video. Sterk på kunstneriske stilarter og motion.
Best for: Musikkvideoer, kreativt innhold.

### Kling AI
Kinesisk tjeneste med imponerende resultater, spesielt på bevegelse.
Best for: Realistisk menneskelig bevegelse.

## Slik skriver du gode videoprompts

Inkluder:
1. Hva skjer (handling)
2. Hvem/hva er i bildet
3. Kameravinkel og bevegelse
4. Belysning og tid på døgnet
5. Stil og tone

Eksempel: "A young woman walks slowly through a Norwegian pine forest at dawn. Camera follows at shoulder level. Soft morning mist. Cinematic, 24fps, shallow depth of field."

## Begrensninger

- Lengde: Maks 1 minutt per klipp
- Konsistens: Figurer kan endre utseende mellom klipp
- Tekst i video: Fortsatt utfordrende

## Arbeidsflyt for YouTube

Bruk AI-video til b-roll og intros, ekte kamera til talking head.`,
    readingTime: 6,
  },
  {
    slug: "ai-for-okonomi-guide",
    title: "AI for økonomi og regnskap: Verktøy og teknikker for bedrifter",
    excerpt: "Kunstig intelligens effektiviserer økonomisk analyse, rapportering og prognosearbeid. Her er en praktisk guide.",
    content: `# AI for økonomi og regnskap

## Excel + ChatGPT Code Interpreter

Last opp Excel-filer direkte i ChatGPT (krever Plus):
- "Lag en oversikt over kostnadsutviklingen per måned"
- "Finn anomalier i disse transaksjonsdataene"
- "Lag en prognose for neste kvartal basert på historiske data"

## Regnskapsverktøy med AI

### Tripletex AI
Norsk regnskapsprogram med innebygd AI for kategorisering og rapportering.

### Xero + AI
Automatisk bokføring av fakturaer via OCR og maskinlæring.

## Skatterapportering

ChatGPT kan forklare skattefradrag og hjelpe deg å strukturere informasjon, men ALDRI stol på AI for endelig skatteråd  -  bruk autorisert regnskapsfører.

## Analyse-prompts som virker

"Analyser dette budsjettet og identifiser de tre største kostnadsdriverne. Foreslå mulige besparelser."

"Skriv en CFO-oppdatering på 200 ord basert på disse nøkkeltallene: [tall]"

## Advarsel

AI kan gjøre regnefeil på komplekse beregninger. Sjekk alltid tallene.`,
    readingTime: 5,
  },
  {
    slug: "stabil-diffusion-lokal-guide",
    title: "Stable Diffusion lokalt på din PC: Steg-for-steg oppsettguide",
    excerpt: "Kjør AI-bildegenerering gratis og privat på din egen maskin. Fullstendig guide til Stable Diffusion og ComfyUI.",
    content: `# Stable Diffusion lokalt

## Systemkrav

- GPU: NVIDIA med minst 8GB VRAM anbefalt (RTX 3060 eller bedre)
- RAM: 16GB
- Lagring: 20GB+ fri plass

## Komme i gang med ComfyUI

ComfyUI er det beste grensesnittet for lokale modeller.

### Installasjon
1. Last ned ComfyUI fra GitHub
2. Last ned en modell (f.eks. SDXL Turbo fra Hugging Face)
3. Legg modellen i \`models/checkpoints/\`
4. Start med \`python main.py\`

## Grunnleggende workflow

1. Load Checkpoint → velg modell
2. CLIP Text Encode → skriv prompt
3. KSampler → juster steps og CFG
4. VAE Decode → konverter til bilde
5. Save Image

## Anbefalte modeller

- **SDXL**: Generell bruk, høy kvalitet
- **Juggernaut XL**: Fotorealistiske bilder
- **DreamShaper**: Konseptkunst og illustrasjoner

## Tips

Bruk ControlNet for å kontrollere komposisjon og positurer. Dette er der Stable Diffusion virkelig skiller seg fra Midjourney.`,
    readingTime: 7,
  },
  {
    slug: "chatgpt-avanserte-funksjoner",
    title: "ChatGPTs skjulte funksjoner: 8 avanserte tips de fleste ikke kjenner til",
    excerpt: "De fleste bruker bare 20% av ChatGPTs kapasitet. Her er de avanserte funksjonene som forvandler arbeidsflyten din.",
    content: `# Avanserte ChatGPT-funksjoner

## 1. Custom Instructions

Under innstillinger → "Customize ChatGPT". Skriv bakgrunn om deg selv og preferansene dine  -  dette huskes på tvers av alle samtaler.

## 2. Memory

ChatGPT kan nå huske ting på tvers av samtaler. Si "Husk at jeg er en norsk freelance-skribent som skriver om teknologi"  -  og det huskes.

## 3. GPT-4o med stemme

Hold inne mikrofonikonet for å snakke med ChatGPT. Kan avbryte midt i setningen.

## 4. Filopplasting

Last opp PDFer, bilder, Excel-filer, kode. ChatGPT kan analysere og svare på spørsmål om innholdet.

## 5. Code Interpreter

Velg "Data Analysis" modus. Kan kjøre Python-kode, analysere data, lage grafer.

## 6. Deling av samtaler

Klikk "Share" for å dele en samtale som en offentlig lenke.

## 7. Stemmestiler

I mobilappen: Velg blant flere stemmestiler for Voice Mode.

## 8. Temporære chatter

Klikk "Temp chat" for en samtale som ikke lagres i historikken.`,
    readingTime: 5,
  },
]

const comparisonArticles = [
  {
    slug: "chatgpt-vs-claude-2025",
    title: "ChatGPT vs Claude 2025: Hvilken AI er best for deg?",
    excerpt: "Vi har testet begge grundig. Her er en ærlig sammenligning av ChatGPT og Claude på de viktigste områdene.",
    content: `# ChatGPT vs Claude 2025

## Hvem vinner på hva?

### Skriving og kreativitet
**Vinner: Claude**
Claude er generelt mer nyansert og menneskelig i tone. ChatGPT tenderer mot mer generisk prosa.

### Koding
**Vinner: Claude 3.7 Sonnet**
Claude 3.7 Sonnet slår GPT-4o på de fleste kode-benchmarks i 2025.

### Internett-søking
**Vinner: ChatGPT**
ChatGPT Search er mer integrert og bedre i bruk. Claude har begrenset websøk.

### Matematikk og logikk
**Uavgjort: o3 (OpenAI) vs Claude 3.7 extended thinking**
Begge er eksepsjonelt gode. o3 er best på olympiske matematikkproblemer.

### Brukeropplevelse
**Vinner: ChatGPT**
Mer polert app, bedre mobilopplevelse, stemmemodus.

### Personvern
**Vinner: Claude**
Anthropic har sterkere personverngarantier. Claude.ai lagrer ikke samtaler for trening (standard).

## Pris
Begge koster 20 $/måned for Plus/Pro.

## Konklusjon

- For allmenn daglig bruk: ChatGPT
- For skriving, koding og analyse: Claude
- For research: ChatGPT (pga websøk)`,
    readingTime: 6,
  },
  {
    slug: "chatgpt-vs-gemini",
    title: "ChatGPT vs Google Gemini: Googlebrukerens dilemma",
    excerpt: "Hvis du allerede bor i Google-universet  -  bør du bytte til Gemini? Vi tester begge grundig.",
    content: `# ChatGPT vs Google Gemini

## Integrasjon

**Vinner: Gemini (for Google-brukere)**
Gemini er innebygd i Gmail, Google Docs, Drive og Meet. Hvis du allerede bruker disse, er Gemini enormt praktisk.

## Rene AI-egenskaper

**Vinner: ChatGPT**
GPT-4o er fortsatt noe bedre på komplekse resonneringsoppgaver. Gemini henter inn raskt, men er ikke helt der ennå.

## Gratisversjon

**Vinner: Gemini**
Gemini 1.5 Flash gratis er imponerende god og inkludert i Google-kontoen din.

## Kontekstvindu

**Vinner: Gemini**
Gemini 1.5 Pro har 1 million token kontekstvindu. ChatGPT har 128 000. Mye bedre for lange dokumenter.

## Multimodalitet

**Vinner: Gemini**
Kan analysere video i tillegg til bilder. ChatGPT stopper ved bilder og lyd.

## Pris

- Gemini Advanced: 219 kr/måned (inkl. 2TB Google One)
- ChatGPT Plus: ca 220 kr/måned

## Konklusjon

Bruker du allerede Google Workspace: Gemini Advanced.
Vil du ha best ren AI: ChatGPT.`,
    readingTime: 5,
  },
  {
    slug: "midjourney-vs-dalle3",
    title: "Midjourney vs DALL-E 3: Hvilken AI-bildemodell er best i 2025?",
    excerpt: "To giganter i AI-bildegenerering. Vi setter dem opp mot hverandre på kvalitet, brukervennlighet og pris.",
    content: `# Midjourney vs DALL-E 3

## Bildekvalitet

**Vinner: Midjourney (for de fleste formål)**
Midjourney v6.1 produserer konsekvent mer estetisk imponerende bilder. DALL-E 3 er jevnere, men sjelden så "wow".

## Instruksjonsføling

**Vinner: DALL-E 3**
DALL-E 3 følger komplekse instruksjoner bedre. Midjourney tolker friere  -  noe som kan være bra eller dårlig.

## Tekst i bilder

**Vinner: DALL-E 3**
DALL-E 3 er klart best på å gjengi tekst korrekt i bilder. Midjourney sliter fortsatt.

## Tilgjengelighet

**Vinner: DALL-E 3**
Inkludert i ChatGPT Plus. Midjourney krever Discord-konto og eget abonnement.

## Pris

- DALL-E 3: Inkludert i ChatGPT Plus (20 $/måned)
- Midjourney: Fra 10 $/måned (begrenset) til 60 $/måned (pro)

## Bruksområder

- **Bruk DALL-E 3**: Raskt konseptbilde, tekst-i-bilder, enkelt å komme i gang
- **Bruk Midjourney**: Profesjonelt kunstnerisk resultat, markedsføring, konsistente estetikk

## Vinner totalt

Midjourney for kvalitet og kunstnerisk kontroll. DALL-E 3 for tilgjengelighet og tekst.`,
    readingTime: 6,
  },
  {
    slug: "github-copilot-vs-cursor",
    title: "GitHub Copilot vs Cursor: Hvilken AI-kodeeditor bør du bruke?",
    excerpt: "To veldig forskjellige tilnærminger til AI-assistert koding. Vi tester begge i reelle prosjekter.",
    content: `# GitHub Copilot vs Cursor

## Tilnærming

**GitHub Copilot**: Utvidelse til VS Code/JetBrains. Legger AI-en på toppen av editoren du allerede kjenner.

**Cursor**: Komplett editor (VS Code-fork) der AI er en del av kjerneopplevelsen.

## Kodeforslag

**Uavgjort**
Begge bruker gode modeller. Cursor lar deg velge mellom Claude og GPT. Copilot bruker Codex-basert modell.

## Flerfil-redigering

**Vinner: Cursor**
Cursor Composer kan redigere mange filer på en gang. Copilot kan kun redigere en fil om gangen (per 2025).

## Kodebase-forståelse

**Vinner: Cursor**
Cursor kan indeksere hele kodebasen din og svare på spørsmål om den.

## GitHub-integrasjon

**Vinner: GitHub Copilot**
Pull request-oppsummering, kodegjennomgang på GitHub.com  -  Cursor har ingenting av dette.

## Pris

- GitHub Copilot: 10 $/måned
- Cursor Pro: 20 $/måned

## Konklusjon

- Solo-utvikler med stort prosjekt: Cursor
- Teamutvikler integrert i GitHub: Copilot
- Vil ha begge deler: Bruk Cursor med GitHub Copilot deaktivert`,
    readingTime: 6,
  },
  {
    slug: "chatgpt-plus-vs-copilot-pro",
    title: "ChatGPT Plus vs Microsoft Copilot Pro: 20 dollar godt brukt?",
    excerpt: "Begge koster omtrent like mye. Men hva får du egentlig for pengene  -  og hvem bør velge hva?",
    content: `# ChatGPT Plus vs Microsoft Copilot Pro

## ChatGPT Plus (20 $/måned)

Inkluderer:
- GPT-4o med Voice Mode
- DALL-E 3 bildegenerering
- Avansert dataanalyse
- Websøk
- Custom GPTs
- Sora (begrenset)

## Microsoft Copilot Pro (230 kr/måned)

Inkluderer:
- GPT-4o i Bing Chat
- Copilot i Word, Excel, PowerPoint, Outlook, OneNote
- Designer (AI-bilder i Bing)
- Prioritert tilgang i rushtiden

## Hvem bør velge hva?

**Velg ChatGPT Plus hvis:**
- Du vil ha best ren AI-kapasitet
- Du bruker ikke Microsoft 365 tjenester
- Du vil ha DALL-E, Sora og Custom GPTs

**Velg Copilot Pro hvis:**
- Du bruker Microsoft 365 daglig
- Integrasjon i Word/Excel er verdifullt
- Du jobber i en Microsoft-bedrift

## Kombinasjon

Mange velger begge. I praksis bruker de ChatGPT for selvstendig AI-arbeid og Copilot inne i Office-appene.`,
    readingTime: 5,
  },
  {
    slug: "claude-vs-gemini",
    title: "Claude vs Google Gemini: To underskattede alternativer til ChatGPT",
    excerpt: "ChatGPT dominerer, men Claude og Gemini er på mange måter bedre valg. Vi sammenligner dem head-to-head.",
    content: `# Claude vs Google Gemini

## Kontekstvindu

**Vinner: Gemini**
Gemini 1.5 Pro: 1 million tokens. Claude 3.7: 200 000 tokens. Gemini vinner klart for lange dokumenter.

## Skriving

**Vinner: Claude**
Claude er konsekvent rangert først av profesjonelle skribenter. Mer human tone, bedre på norsk.

## Koding

**Vinner: Claude**
Claude 3.7 Sonnet er spesielt god på kompleks kode. Gemini er god, men ikke like konsekvent.

## Google Workspace-integrasjon

**Vinner: Gemini (utenkonkurranse)**
Gemini er innebygd i Gmail, Docs, Sheets. Claude har ingen slik integrasjon.

## Multimodalitet

**Vinner: Gemini**
Gemini kan analysere video. Claude kan kun tekst og bilder.

## Personvern

**Vinner: Claude**
Anthropic er mer transparente om databruk. Google bruker data til å forbedre sine tjenester.

## Konklusjon

For Google-brukere: Gemini. For skrivere og utviklere: Claude.`,
    readingTime: 5,
  },
  {
    slug: "gratis-vs-betalt-ai",
    title: "Gratis vs betalte AI-verktøy: Er det verdt å betale?",
    excerpt: "De gratis versjonene av ChatGPT, Claude og Gemini er ikke dumme. Når gir det mening å betale 200-230 kr per måned?",
    content: `# Gratis vs betalte AI-verktøy

## Hva du får gratis

### ChatGPT (gratis)
- GPT-4o mini (begrenset)
- GPT-4o (5 meldinger/3 timer)
- Ingen bildegenerering
- Ingen websøk

### Claude (gratis)
- Claude 3.5 Haiku
- Begrenset antall meldinger/dag
- Ingen bildegenerering

### Gemini (gratis)
- Gemini 1.5 Flash
- Websøk
- Google Workspace lite-integrasjon

## Når bør du betale?

**Betal hvis du:**
- Bruker AI mer enn 30 minutter om dagen
- Treffer token-grenser regelmessig
- Trenger bildegenerering
- Vil ha de sterkeste modellene (GPT-4o, Claude 3.7, Gemini Ultra)

**Hold deg gratis hvis du:**
- Bruker AI sporadisk
- Kun trenger enkle spørsmål og svar
- Har råd til å vente når grenser treffes

## ROI-kalkyle

Hvis AI sparer deg 1 time i uka til en timelønn på 500 kr, er 200 kr/måned i abonnement inntjent på under 30 minutter.`,
    readingTime: 5,
  },
  {
    slug: "chatgpt-vs-perplexity-sok",
    title: "ChatGPT Search vs Perplexity: Hvem er best på AI-drevet søk?",
    excerpt: "To store aktører kjemper om å erstatte Google. Vi setter dem opp mot hverandre i en grundig test.",
    content: `# ChatGPT Search vs Perplexity

## Kildebruk

**Vinner: Perplexity**
Perplexity siterer tydelig og lar deg klikke på hver påstand for å se kilden. ChatGPT Search er mindre transparent.

## Dybde i svar

**Vinner: ChatGPT**
ChatGPT gir ofte mer nyanserte og lengre svar. Perplexity er mer "oppsummeringsmaskin".

## Oppfølgingsspørsmål

**Uavgjort**
Begge håndterer flertrinnssamtaler godt.

## Sanntidsinformasjon

**Vinner: Perplexity**
Perplexity-indeksen oppdateres raskere. ChatGPT Search kan ligge litt bak.

## Spesialiserte søk

**Vinner: Perplexity (Academic mode)**
Perplexity Academic søker direkte i vitenskapelige databaser. ChatGPT kan ikke dette.

## Lokalt innhold

**Vinner: ChatGPT**
Bedre på lokale norske saker og nettsider.

## Pris

- Perplexity Pro: 20 $/måned
- ChatGPT Plus (inkl. Search): 20 $/måned

## Anbefaling

For research og akademisk arbeid: Perplexity. For generell informasjonsinnhenting: begge er gode.`,
    readingTime: 5,
  },
  {
    slug: "gpt4o-vs-gemini-pro",
    title: "GPT-4o vs Gemini 1.5 Pro: Den store benchmark-sammenligningen",
    excerpt: "Vi setter de to største frontiermodellene opp mot hverandre på koding, matematikk, skriving og analyse.",
    content: `# GPT-4o vs Gemini 1.5 Pro

## Koding

**Vinner: GPT-4o**
På HumanEval-benchmarken scorer GPT-4o 90.2% mot Gemini 1.5 Pros 84.1%.

I praksis er GPT-4o mer konsistent og gjør færre logiske feil på komplekse algoritmer.

## Matematikk

**Vinner: GPT-4o**
MATH-benchmark: GPT-4o 76.6% vs Gemini 1.5 Pro 67.7%.

## Skriving og kreativitet

**Uavgjort**
Svaret avhenger av språket. Gemini er sterkere på ikke-engelske europeiske språk. GPT-4o er sterkere på engelsk kreativ skriving.

## Lange dokumenter

**Vinner: Gemini 1.5 Pro (ikke engang nær)**
Med 1 million token kontekstvindu mot GPT-4os 128 000 er Gemini uslåbar på lange dokumenter.

## Hastighet

**Vinner: GPT-4o**
GPT-4o er raskere på korte spørsmål. Gemini er raskere på lange dokumenter (parallell prosessering).

## Multimodalitet

**Uavgjort**
GPT-4o hører bedre. Gemini ser video. Kvitt.

## Konklusjon

For koding og matematikk: GPT-4o. For lange dokumenter: Gemini 1.5 Pro.`,
    readingTime: 6,
  },
  {
    slug: "chatgpt-vs-deepseek",
    title: "ChatGPT vs DeepSeek: Er den kinesiske modellen et reelt alternativ?",
    excerpt: "DeepSeek sjokkerte verden med sin lave treningskostnad. Men er den faktisk god nok til å erstatte ChatGPT?",
    content: `# ChatGPT vs DeepSeek

## Ytelse

**Uavgjort**
DeepSeek R1 og o1 er svært jevne på matematikk og koding. DeepSeek V3 er jevngod med GPT-4o på de fleste benchmarks.

## Pris

**Vinner: DeepSeek (med stor margin)**
DeepSeek V3 via API koster en tiendedel av GPT-4o.

## Sikkerhet og sensur

**Bekymring: DeepSeek**
DeepSeek nekter å svare på politisk sensitive spørsmål om Kina. Modellen har innebygd sensur.

## Datapersonvern

**Advarsel: DeepSeek**
DeepSeeks applikasjon lagrer data på kinesiske servere. Sensitiv informasjon bør ikke sendes til DeepSeek.

## Åpen kildekode

**Fordel: DeepSeek**
DeepSeek R1 er tilgjengelig som åpen kildekode. Du kan kjøre den på egne servere og eliminere personvernbekymringer.

## Norsk språk

**Vinner: ChatGPT**
ChatGPT er bedre på norsk. DeepSeek er primært trent på engelsk og kinesisk.

## Anbefaling

Bruk DeepSeek via API (eller lokalt) for tekniske oppgaver. Unngå DeepSeek-appen for personlig informasjon.`,
    readingTime: 5,
  },
  {
    slug: "midjourney-vs-stable-diffusion",
    title: "Midjourney vs Stable Diffusion: Betalt vs gratis bildegenerering",
    excerpt: "Midjourney koster penger, Stable Diffusion er gratis. Men er de faktisk sammenlignbare? Vi tester grundig.",
    content: `# Midjourney vs Stable Diffusion

## Oppsummering

| | Midjourney | Stable Diffusion |
|---|---|---|
| Pris | Fra 10 $/måned | Gratis (lokalt) |
| Oppsett | Enkelt (Discord) | Teknisk (Python) |
| Kvalitet (default) | Excellent | God |
| Kontroll | Begrenset | Ekstrem |
| Personvern | Bilder er offentlige (gratis) | Fullt privat |

## Kvalitet

**Vinner: Midjourney**
Out-of-the-box kvalitet er klart bedre i Midjourney. Men med riktig Stable Diffusion-modell og ControlNet kan resultater matche.

## Kontroll og tilpasning

**Vinner: Stable Diffusion**
Med ControlNet kan du styre komposisjon, positurer og stil på en måte Midjourney ikke tillater.

## Personvern

**Vinner: Stable Diffusion (lokalt)**
Bilder generert lokalt forlater aldri maskinen din. Midjourney lagrer alle bilder (og de er offentlige på gratisnivå).

## NSFW-innhold

Stable Diffusion lokalt har ingen begrensninger. Midjourney er strengt moderert.

## Anbefaling

For enkel bruk og konsistent kvalitet: Midjourney. For kontroll, personvern og avansert arbeid: Stable Diffusion.`,
    readingTime: 6,
  },
  {
    slug: "adobe-firefly-vs-midjourney",
    title: "Adobe Firefly vs Midjourney: Hvilken er best for profesjonell bruk?",
    excerpt: "Adobe Firefly lover kommersielt trygge bilder. Er det nok til å rettferdiggjøre valget over Midjourney?",
    content: `# Adobe Firefly vs Midjourney

## Det viktigste spørsmålet: Opphavsrett

**Vinner: Adobe Firefly**
Firefly er trent på Adobe Stock og Public Domain-innhold. Adobe indemnifiserer kommersielle brukere mot opphavsrettskrav.

Midjourney er trent på internettbilder og har ikke gitt lignende garantier.

## Bildekvalitet

**Vinner: Midjourney**
Rene kreative bilder fra Midjourney er fortsatt mer imponerende. Firefly er god, men ikke så "magisk".

## Integrasjon i arbeidsflyt

**Vinner: Adobe Firefly**
Generative Fill i Photoshop og vektorgenerering i Illustrator er revolusjonære funksjoner.

## Priser

- Firefly: Inkludert i Creative Cloud (fra 699 kr/måned)
- Midjourney: Fra 10 $/måned separat

## Spesialiserte funksjoner

**Firefly:** Generative Fill, Generative Expand, 3D til bilde
**Midjourney:** Sterkere på fri bildegenerering og konsistente karakterer

## Anbefaling

Er du Creative Cloud-abonnent: Bruk Firefly for kommersiell jobb, Midjourney for inspirasjon og kreativ utforskning.`,
    readingTime: 5,
  },
  {
    slug: "sora-vs-runway-ai-video",
    title: "Sora vs Runway Gen-3: Hvem lager de beste AI-videoene?",
    excerpt: "OpenAIs Sora og Runways Gen-3 er de to ledende AI-videoverktøyene. Vi tester begge grundig.",
    content: `# Sora vs Runway Gen-3

## Lengde

**Vinner: Sora**
Sora: Opptil 1 minutt. Runway Gen-3: 10-30 sekunder.

## Fotorealisme

**Vinner: Sora**
Soras scener med naturlig belysning og bevegelse er mer realistiske.

## Kreativ kontroll

**Vinner: Runway**
Runway tilbyr Motion Brush (styr hvilke deler av bildet som beveger seg), kamera-kontroll og enkel inpainting.

## Konsistens

**Begge sliter**
Ingen av dem er gode på å beholde karakterers utseende over lengre videoer.

## Redigering av eksisterende video

**Vinner: Runway**
Runway kan brukes på eksisterende video. Sora genererer kun fra tekst.

## Pris

- Sora: Inkludert i ChatGPT Plus/Pro
- Runway Gen-3: Fra 15 $/måned (125 kreditter)

## Bruksområder

**Sora:** Lengre scener, fotorealistiske omgivelser, b-roll
**Runway:** Korte kunstneriske klipp, musikkvideo, stilisert innhold

## Vinner

For de fleste bruksområder: Sora (inkl. i ChatGPT Plus). For artistisk kontroll: Runway.`,
    readingTime: 5,
  },
  {
    slug: "notion-ai-vs-chatgpt",
    title: "Notion AI vs ChatGPT: Beste AI for notat og produktivitet?",
    excerpt: "Notion AI lever inne i arbeidsområdet ditt. Men er det bedre enn å bruke ChatGPT separat? Vi sammenligner.",
    content: `# Notion AI vs ChatGPT

## Kontekstbevissthet

**Vinner: Notion AI**
Notion AI kjenner til innholdet i dokumentene og databasene dine. ChatGPT vet ingenting om dine notater.

## Ren AI-kapasitet

**Vinner: ChatGPT**
GPT-4o er kraftigere enn modellen bak Notion AI. For komplekse oppgaver vil ChatGPT gi bedre svar.

## Integrasjon i arbeidsflyt

**Vinner: Notion AI**
Autofyll i databaser, oppsummering av sider, aksjonspunkter fra notat  -  alt skjer der du allerede jobber.

## Pris

- Notion AI: +10 $/bruker/måned utover Notion
- ChatGPT Plus: 20 $/måned

## Audio Overview / Podkast

**Kun ChatGPT (via NotebookLM)**
Ingen tilsvarende funksjon i Notion.

## Database AI

**Vinner: Notion AI**
AI kan automatisk tagge, kategorisere og fylle ut egenskaper i Notion-databaser.

## Anbefaling

Bruk begge: Notion AI for kontekstbevisst arbeid inne i Notion, ChatGPT for dypere AI-oppgaver utenfra.`,
    readingTime: 5,
  },
  {
    slug: "perplexity-vs-google-ai",
    title: "Perplexity vs Google AI Overviews: To syn på fremtidens søk",
    excerpt: "Google har implementert AI i søkeresultatene. Er det bedre eller verre enn Perplexity? Vi sammenligner.",
    content: `# Perplexity vs Google AI Overviews

## Hva er Google AI Overviews?

Google AI Overviews er AI-genererte sammendrag øverst i søkeresultatene  -  aktivert i USA og noen europeiske land.

## Kildetransparens

**Vinner: Perplexity**
Perplexity lar deg se på hvilke påstander som er hentet fra hvilke kilder. Google AI Overviews er mer ugjennomsiktig.

## Kvalitet

**Uavgjort**
Google AI Overviews har vært utsatt for kritikk for faktafeil (den berømte "spis stein"-incidenten). Perplexity er generelt mer presis, men ikke uten feil.

## Søk på norsk

**Vinner: Google**
Google er bedre på norsk innhold. Perplexity prioriterer engelskspråklige kilder.

## Annonser

**Vinner: Perplexity**
Perplexity har ikke annonser (pro-versjon). Google AI Overviews kan inkludere sponset innhold.

## Oppfølgingsspørsmål

**Vinner: Perplexity**
Mer konversasjonell flyt. Google er fortsatt mer søkelignende.

## Konklusjon

For norske spørsmål og lokal informasjon: Google. For research og faktatunge spørsmål: Perplexity.`,
    readingTime: 5,
  },
  {
    slug: "gratis-ai-bildegeneratorer",
    title: "De beste gratis AI-bildegeneratorene i 2025  -  testet og rangert",
    excerpt: "Vil du generere AI-bilder uten å betale? Vi tester alle de beste gratis alternativene og rangerer dem ærlig.",
    content: `# Gratis AI-bildegeneratorer 2025

## 1. Adobe Firefly (gratis tier)
25 Generative Credits per måned gratis. Kommersielt trygt.
**Beste for:** Enkel bildegenerering med opphavsrettsgaranti.

## 2. Microsoft Designer / Bing Image Creator
Ubegrenset (med redusert hastighet) via Microsoft-konto.
**Beste for:** Rask bildeproduksjon uten abonnement.
**Ulempe:** DALL-E 3-basert, men litt begrenset i instruksjoner.

## 3. Ideogram.ai
25 bilder gratis per dag. Spesielt god på tekst i bilder.
**Beste for:** Logoer, plakater og design med tekst.

## 4. Leonardo.ai
150 tokens/dag gratis. Mange spesialiserte modeller.
**Beste for:** Spillgrafikk og konseptkunst.

## 5. Playground AI
500 bilder/dag på gratisplanen.
**Beste for:** Storvolum bildegenerering.

## 6. Canva AI (gratis tier)
50 AI-bilder per måned. Integrert i Canva-designverktøy.
**Beste for:** Markedsførings-bilder direkte i design-verktøy.

## Hva mangler de gratis versjonene?

- Høyere oppløsning
- Kommersielle lisenser (for de fleste)
- Avansert kontroll (ControlNet, inpainting)`,
    readingTime: 5,
  },
  {
    slug: "ai-koding-sammenligning",
    title: "Beste AI for koding i 2025: GitHub Copilot, Cursor, ChatGPT og Claude testet",
    excerpt: "Vi setter fire AI-kodeverktøy opp mot hverandre på reelle programmeringsoppgaver. Hvem vinner?",
    content: `# AI-koding sammenligning 2025

## Testoppgaver

Vi testet på: autocomplete, flerfil-refaktorering, feilsøking, testgenerering og forklaringsevne.

## GitHub Copilot

**Styrker:** Dyp IDE-integrasjon, GitHub-funksjonalitet, pris (10 $/måned)
**Svakheter:** Svakere enn Cursor på komplekse flerfil-oppgaver

**Score: 7.5/10**

## Cursor

**Styrker:** Composer (flerfil AI), kodebase-indeksering, valgfri modell
**Svakheter:** Dyrere (20 $/måned), krever ny editor

**Score: 9/10**

## ChatGPT Plus

**Styrker:** Kodeforklaring, algoritme-design, ingen editor-binding
**Svakheter:** Ingen kodebase-kontekst, manuell kopi-lim

**Score: 7/10**

## Claude (claude.ai)

**Styrker:** Best på kodeforklaring og refaktorering, sterk på lange kodebaser i kontekstvinduet
**Svakheter:** Ingen IDE-integrasjon, manuell arbeidsflyt

**Score: 7.5/10**

## Vinner: Cursor

For profesjonell utvikling er Cursor det klare valget i 2025. GitHub Copilot er beste alternativ for GitHub-integrerte team.`,
    readingTime: 6,
  },
  {
    slug: "openai-o1-vs-claude-extended",
    title: "OpenAI o1 vs Claude med Extended Thinking: Hvem tenker best?",
    excerpt: "Både OpenAI og Anthropic har modeller som tenker lenger gjennom problemer. Vi sammenligner dem på vanskelige oppgaver.",
    content: `# o1 vs Claude Extended Thinking

## Hva er "extended thinking"?

Begge modellene kan bruke ekstra tid på å "tenke" gjennom et problem før de svarer  -  lignende Chain-of-Thought men mer autonomt.

## Matematikk

**Vinner: o1**
OpenAIs o1 ble spesielt trent for matematikk og logikk. AIME 2024: o1 scorer 83%, Claude 3.7 Extended scorer 70%.

## Koding

**Vinner: Claude 3.7 Sonnet med Extended Thinking**
SWE-bench (real-world kode-oppgaver): Claude 3.7 Extended: 70%, o1: 48%.

## Naturlig språk og skriving

**Vinner: Claude**
o1 er ikke god på kreativ skriving  -  den er optimert for logikk, ikke prosa.

## Hastighet

**Vinner: Claude**
Claude Extended Thinking er raskere enn o1. o1 kan bruke minutter på komplekse problemer.

## Pris

- o1: 15 $/million input tokens
- Claude 3.7 Extended: 3 $/million input tokens

Claude er 5x billigere.

## Konklusjon

For matematikk og vitenskap: o1. For koding og alt annet: Claude 3.7 Extended.`,
    readingTime: 5,
  },
  {
    slug: "copilot-vs-chatgpt-jobb",
    title: "Microsoft Copilot vs ChatGPT til jobbbruk: En praktisk sammenligning",
    excerpt: "Bedriften din vurderer hvilken AI-assistent dere skal rulle ut. Her er en ærlig vurdering av de to største.",
    content: `# Copilot vs ChatGPT for bedrifter

## Microsoft Copilot for M365

**Pris:** 299 kr/bruker/måned
**Beste for:** Bedrifter på Microsoft 365

### Fordeler
- Integrert i Teams, Outlook, Word, Excel, PowerPoint
- Sikkerhet: Data forblir i Microsoft 365-leietakeren
- Compliance: ISO 27001, SOC 2, GDPR

### Ulemper
- Kun nyttig hvis dere allerede er på M365
- Dyrere enn ChatGPT
- Svakere ren AI-kapasitet

## ChatGPT Enterprise

**Pris:** Fra 25 $/bruker/måned
**Beste for:** Bedrifter som vil ha best AI uavhengig av plattform

### Fordeler
- GPT-4o, tilgang til siste modeller
- Ingen trening på bedriftsdata
- Team-funksjonalitet og deling

### Ulemper
- Ingen dyp integrasjon med produktivitetsverktøy
- Krever separat abonnement

## Anbefaling

Allerede på Microsoft 365: Copilot er naturlig valg.
Ikke Microsoft-bindinger: ChatGPT Enterprise gir mer AI for pengene.
Begge deler: Copilot for daglig Office-arbeid, ChatGPT for dypere AI-oppgaver.`,
    readingTime: 6,
  },
  {
    slug: "norsk-ai-vs-internasjonal",
    title: "Norske AI-verktøy vs internasjonale giganter: Hva er tilgjengelig i Norge?",
    excerpt: "Finnes det norske AI-verktøy som kan konkurrere? Vi ser på hva som finnes og når du bør velge norsk.",
    content: `# Norske AI-verktøy 2025

## Norske AI-initiativ

### Sikt (Universitets- og høgskolerådet)
Sikt tilbyr Microsoft Copilot og GitHub Copilot til norske studenter og ansatte på universiteter.

### NB-BERT (Nasjonalbiblioteket)
Norsk språkmodell trent på norsk tekst. Tilgjengelig som åpen kildekode. Best på norsk NLP.

### Simula Research Laboratory
Forsker på norskspråklige AI-modeller. Ikke kommersielt tilgjengelig ennå.

## Når bør du velge norsk?

**Personvernkrav:** Norske løsninger holder data i Norge/EU.
**Norsk språk:** NB-BERT og lignende er trent på norsk og forstår nyanser bedre.
**Offentlig sektor:** Strenge krav til datalagring på norsk jord.

## Internasjonale alternativer tilgjengelig i Norge

Alle store tjenester (ChatGPT, Claude, Gemini) er tilgjengelig i Norge.
De lagrer typisk data i USA  -  noe som kan være et problem for sensitive data.

## Fremtiden

Regjeringens AI-strategi 2025 inkluderer funding til norske språkmodeller. Forvent mer norsk AI i 2026-2027.`,
    readingTime: 5,
  },
]

async function upsertArticle(data: {
  slug: string
  title: string
  excerpt: string
  content: string
  readingTime: number
  category: "NEWS" | "GUIDE" | "COMPARISON"
}) {
  return db.article.upsert({
    where: { slug: data.slug },
    create: {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      published: true,
      publishedAt: new Date(),
      author: "AIvett redaksjon",
      readingTime: data.readingTime,
    },
    update: {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      readingTime: data.readingTime,
    },
  })
}

async function main() {
  console.log("Seeding database...")

  const courseDescription = "Lær deg å bruke ChatGPT effektivt fra bunnen av. Dette kurset gir deg en praktisk introduksjon til verdens mest populære AI-verktøy."

  const lesson1Content = `# Hva er ChatGPT?

ChatGPT er en AI-drevet chatbot utviklet av OpenAI. Den bruker store språkmodeller (LLM) til å generere menneskelig tekst basert på det du skriver til den.

## Hva kan du bruke ChatGPT til?

- Skrive og redigere tekst
- Svare på spørsmål
- Hjelpe med koding
- Oversette tekst
- Brainstorme ideer

## Kom i gang

For å bruke ChatGPT, gå til chat.openai.com og opprett en gratis konto.`

  const lesson2Content = `# Din første melding til ChatGPT

Nå er det på tide å sende din første melding! Her er noen tips for å få gode svar.

## Vær spesifikk

Jo mer presis du er, jo bedre svar får du.

**Dårlig:** "Hjelp meg med en e-post"

**Bra:** "Skriv en profesjonell e-post til en klient som forklarer at leveransen er forsinket med 3 dager på grunn av tekniske problemer"`

  // Seed free course
  const freeCourse = await db.course.upsert({
    where: { slug: "kom-i-gang-med-chatgpt" },
    create: {
      slug: "kom-i-gang-med-chatgpt",
      title: "Kom i gang med ChatGPT",
      description: courseDescription,
      price: 0,
      isFree: true,
      isPublished: true,
      level: "BEGINNER",
      category: "TUTORIAL",
      instructor: "AIvett redaksjon",
      duration: 45,
      modules: {
        create: [
          {
            title: "Introduksjon",
            order: 1,
            lessons: {
              create: [
                {
                  slug: "hva-er-chatgpt",
                  title: "Hva er ChatGPT?",
                  order: 1,
                  isPreview: true,
                  duration: 5,
                  content: lesson1Content,
                  quizzes: {
                    create: [
                      {
                        question: "Hvem utviklet ChatGPT?",
                        options: ["Google", "OpenAI", "Microsoft", "Meta"],
                        correctAnswer: 1,
                        explanation: "ChatGPT ble utviklet av OpenAI, som ble grunnlagt i 2015.",
                        order: 1,
                      },
                    ],
                  },
                },
                {
                  slug: "din-forste-melding",
                  title: "Din første melding til ChatGPT",
                  order: 2,
                  duration: 10,
                  content: lesson2Content,
                  tasks: {
                    create: [
                      {
                        title: "Send din første melding",
                        description:
                          "Gå til ChatGPT og spør den om å forklare kunstig intelligens med enkle ord. Lim inn svaret du fikk her.",
                        type: "TEXT" as const,
                        order: 1,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    update: { description: courseDescription },
  })
  console.log("Course:", freeCourse.title)

  // Fix existing lessons in DB (upsert can't update nested records)
  await db.lesson.updateMany({
    where: { slug: "hva-er-chatgpt" },
    data: { title: "Hva er ChatGPT?", content: lesson1Content },
  })
  await db.lesson.updateMany({
    where: { slug: "din-forste-melding" },
    data: { title: "Din første melding til ChatGPT", content: lesson2Content },
  })
  // Fix task titles/descriptions
  const lesson2 = await db.lesson.findFirst({ where: { slug: "din-forste-melding" } })
  if (lesson2) {
    await db.task.updateMany({
      where: { lessonId: lesson2.id },
      data: {
        title: "Send din første melding",
        description: "Gå til ChatGPT og spør den om å forklare kunstig intelligens med enkle ord. Lim inn svaret du fikk her.",
      },
    })
  }
  console.log("Fixed lesson content æøå")

  // Seed news articles
  console.log("Seeding news articles...")
  for (const article of newsArticles) {
    const result = await upsertArticle({ ...article, category: "NEWS" })
    console.log("  NEWS:", result.title)
  }

  // Seed guide articles
  console.log("Seeding guide articles...")
  for (const article of guideArticles) {
    const result = await upsertArticle({ ...article, category: "GUIDE" })
    console.log("  GUIDE:", result.title)
  }

  // Seed comparison articles
  console.log("Seeding comparison articles...")
  for (const article of comparisonArticles) {
    const result = await upsertArticle({ ...article, category: "COMPARISON" })
    console.log("  COMPARISON:", result.title)
  }

  console.log(`\nDone. Seeded ${newsArticles.length} news, ${guideArticles.length} guides, ${comparisonArticles.length} comparisons.`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
