import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database...")

  // Seed a free course
  const freeCourse = await db.course.upsert({
    where: { slug: "kom-i-gang-med-chatgpt" },
    create: {
      slug: "kom-i-gang-med-chatgpt",
      title: "Kom i gang med ChatGPT",
      description:
        "Laer deg a bruke ChatGPT effektivt fra bunnen av. Dette kurset gir deg en praktisk introduksjon til verdens mest populaere AI-verktoy.",
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
                  content: `# Hva er ChatGPT?

ChatGPT er en AI-drevet chatbot utviklet av OpenAI. Den bruker store sprakmodeller (LLM) til a generere menneskelig tekst basert pa det du skriver til den.

## Hva kan du bruke ChatGPT til?

- Skrive og redigere tekst
- Svare pa sporsmal
- Hjelpe med koding
- Oversette tekst
- Brainstorme ideer

## Kom i gang

For a bruke ChatGPT, ga til [chat.openai.com](https://chat.openai.com) og opprett en gratis konto.`,
                  quizzes: {
                    create: [
                      {
                        question: "Hvem utviklet ChatGPT?",
                        options: JSON.stringify(["Google", "OpenAI", "Microsoft", "Meta"]),
                        correctAnswer: 1,
                        explanation: "ChatGPT ble utviklet av OpenAI, som ble grunnlagt i 2015.",
                        order: 1,
                      },
                    ],
                  },
                },
                {
                  slug: "din-forste-melding",
                  title: "Din forste melding til ChatGPT",
                  order: 2,
                  duration: 10,
                  content: `# Din forste melding til ChatGPT

Na er det pa tide a sende din forste melding! Her er noen tips for a fa gode svar.

## Vaer spesifikk

Jo mer presis du er, jo bedre svar far du. Sammenlign:

**Darlig:** "Hjelp meg med en e-post"

**Bra:** "Skriv en profesjonell e-post til en klient som forklarer at leveransen er forsinket med 3 dager pa grunn av tekniske problemer"

## Oppgave

Prov a sende en melding til ChatGPT der du ber den om a forklare hva kunstig intelligens er pa en enkel mate.`,
                  tasks: {
                    create: [
                      {
                        title: "Send din forste melding",
                        description:
                          "Ga til ChatGPT og spor den om a forklare kunstig intelligens med enkle ord. Lim inn svaret du fikk her.",
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
    update: {},
  })

  console.log("Created free course:", freeCourse.title)

  // Seed a news article
  const article = await db.article.upsert({
    where: { slug: "gpt-5-hva-vi-vet" },
    create: {
      slug: "gpt-5-hva-vi-vet",
      title: "GPT-5: Alt vi vet sa langt om OpenAIs neste store modell",
      excerpt:
        "OpenAI jobber med GPT-5 og det spekuleres pa enorme forbedringer. Her er alt vi vet sa langt om den neste generasjonen av GPT-modeller.",
      content: `# GPT-5: Alt vi vet sa langt

OpenAI har bekreftet at de jobber med GPT-5, men har ikke gitt noen offisiell relansedato. Her er hva vi vet basert pa lekkasjer og offisielle uttalelser.

## Forventede forbedringer

- Bedre resonnering og logikk
- Mer presis faktasjekking
- Forbedret multimodalitet (tekst, bilde, lyd)
- Raskere inferens

## Nar kommer den?

Basert pa OpenAIs historikk med GPT-4 og GPT-4o, forventer analytikere at GPT-5 kan lanseres i lopet av 2025.

## Hva betyr dette for deg?

Hvis GPT-5 lever opp til forventningene, vil det bety enda mer kraftfulle AI-verktoy for alle — fra studenter til bedrifter.`,
      category: "NEWS",
      published: true,
      publishedAt: new Date(),
      author: "AIvett redaksjon",
      readingTime: 4,
    },
    update: {},
  })

  console.log("Created article:", article.title)
  console.log("Seeding complete!")
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
