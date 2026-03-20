import { Scissors } from "lucide-react"

const hairstyleGuide = [
  {
    shape: "Round",
    menStyles: ["Short sides with volume on top", "Textured quiff", "Side-parted styles"],
    womenStyles: ["Long layers", "Side-swept bangs", "High ponytails"],
  },
  {
    shape: "Square",
    menStyles: ["Crew cut", "Short textured crop", "Slicked-back styles"],
    womenStyles: ["Soft waves", "Curtain bangs", "Long layered cuts"],
  },
  {
    shape: "Oval",
    menStyles: ["Buzz cut", "Pompadour", "Side part"],
    womenStyles: ["Blunt bob", "Long waves", "Pixie cut"],
  },
  {
    shape: "Heart",
    menStyles: ["Medium-length styles with side sweep", "Textured fringe"],
    womenStyles: ["Chin-length bob", "Curtain/side bangs", "Loose waves"],
  },
  {
    shape: "Diamond",
    menStyles: ["Fringe", "Side-parted medium styles", "Slight volume on sides"],
    womenStyles: ["Shoulder-length cuts", "Textured bobs", "Deep side parts"],
  },
  {
    shape: "Oblong",
    menStyles: ["Shorter sides with moderate top volume", "Side-swept bangs", "Textured crop or fringe to shorten face"],
    womenStyles: ["Shoulder-length or layered cuts", "Side-swept bangs", "Wavy or curly styles to add width"],
  },
]

export function HairstylesGuide() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
      <h2 className="mb-4 text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Best Hairstyles for Each Face Shape
      </h2>
      <p className="mx-auto mb-10 max-w-3xl text-center text-sm sm:text-base text-neutral-300">
        Discover hairstyles that flatter your face shape. Upload a photo to detect face shape and get personalized hairstyle recommendations for men and women.
      </p>

      <div className="overflow-hidden rounded-2xl border border-white/20 bg-neutral-900/60 backdrop-blur-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20 bg-white/5">
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-lime-300">
                Face Shape
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-lime-300">
                Men's Hairstyle
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-lime-300">
                Women's Hairstyle
              </th>
            </tr>
          </thead>
          <tbody>
            {hairstyleGuide.map((item, index) => (
              <tr
                key={index}
                className={`border-b border-white/10 transition ${
                  index % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                }`}
              >
                <td className="px-6 py-5 text-base sm:text-lg font-semibold text-white">
                  {item.shape}
                </td>
                <td className="px-6 py-5 text-sm sm:text-base text-neutral-300">
                  <ul className="space-y-1">
                    {item.menStyles.map((style, i) => (
                      <li key={i}>• {style}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-5 text-sm sm:text-base text-neutral-300">
                  <ul className="space-y-1">
                    {item.womenStyles.map((style, i) => (
                      <li key={i}>• {style}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
