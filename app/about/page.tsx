import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | AI Face Shape Detector",
  description:
    "Learn why we built this simple, privacy-first face shape detector and how it works. No marketing fluff—just our mission, approach, and way to get in touch.",
  alternates: {
    canonical: "https://www.yourface.online/about",
  },
}

const sections: { title: string; body: string[] }[] = [
  {
    title: "Our Mission",
    body: [
      "We believe simple tools can solve real problems.",
      "This website was built to help people quickly and accurately understand their face shape — without complicated steps, accounts, or unnecessary barriers. Whether you’re choosing a hairstyle, glasses, or just curious, our goal is to make face shape analysis accessible to everyone.",
    ],
  },
  {
    title: "Why We Built This Tool",
    body: [
      "Most face shape tools are either:",
      "• Overly complicated",
      "• Locked behind sign-ups",
      "• Or designed mainly for marketing, not users",
      "We wanted something different.",
      "This tool focuses on:",
      "• Fast results",
      "• Clear explanations",
      "• No required registration",
      "• Respect for user privacy",
      "You upload a photo, get your face shape, and move on. Simple as that.",
    ],
  },
  {
    title: "How It Works",
    body: [
      "Our face shape detector uses computer vision techniques to analyze key facial features such as proportions and contours. Based on these features, we classify common face shapes like oval, round, square, heart, and others.",
      "The analysis happens automatically and is designed to be quick and lightweight, so you don’t need to install any apps or software.",
    ],
  },
  {
    title: "Privacy First",
    body: [
      "Your privacy matters.",
      "• Uploaded photos are not stored permanently",
      "• We do not use your images for training or marketing",
      "• If you choose to leave your email, it’s only used for the specific purpose you agreed to",
      "We believe trust is more important than growth hacks.",
    ],
  },
  {
    title: "Still Improving",
    body: [
      "This project is actively evolving.",
      "We’re continuously improving accuracy, expanding explanations, and exploring optional features such as deeper analysis and style recommendations — always guided by real user feedback.",
      "If you’re using this tool, you’re part of that journey.",
    ],
  },
  {
    title: "Who Is This For?",
    body: [
      "This tool is made for:",
      "• Anyone curious about their face shape",
      "• People choosing hairstyles or glasses",
      "• Users who want quick answers without friction",
      "• Anyone who prefers simple, web-based tools",
      "No expertise required.",
    ],
  },
  {
    title: "Get in Touch",
    body: [
      "Have feedback or suggestions?",
      "We’d love to hear from you.",
      "You can reach us through the contact options on this site.",
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-black to-neutral-950 text-white">
      <SiteHeader />
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <header className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">About Us</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Tools first. Honest. Privacy-friendly.
          </h1>
          <p className="mt-4 text-lg text-white/70">
            A lightweight face shape detector built for real people—no marketing fluff, just useful answers.
          </p>
        </header>

        <div className="space-y-10 rounded-3xl border border-white/10 bg-neutral-900/70 p-8 backdrop-blur">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              {section.body.map((paragraph, idx) => (
                <p key={idx} className="text-base leading-relaxed text-white/75 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
              <div className="h-px bg-white/10" />
            </section>
          ))}

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Our Philosophy</h2>
            <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-5 text-lg font-medium text-white/90">
              <p>Build small.</p>
              <p>Be honest.</p>
              <p>Respect users.</p>
            </blockquote>
            <p className="text-base text-white/70">That’s it.</p>
          </section>
        </div>
      </main>
      <AppverseFooter />
    </div>
  )
}
