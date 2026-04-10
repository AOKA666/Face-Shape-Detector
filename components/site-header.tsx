"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Info, Scan, ChevronDown, BookOpen } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/face-shape-detector-for-men", label: "For Men" },
    { href: "/face-shape-detector-online", label: "Face Shape Detector" },
    { href: "/about", label: "About" },
  ]

  const guideItems = [
    { href: "/mens-hairstyles-by-face-shape", label: "Men's Haircuts" },
    { href: "/beard-styles-by-face-shape", label: "Beard Styles" },
    { href: "/blog#featured", label: "Featured Guides" },
    { href: "/blog#basics", label: "Face Shape Basics" },
    { href: "/blog#hairstyles", label: "Hairstyles by Face Shape" },
    { href: "/blog#beard", label: "Beard & Grooming" },
    { href: "/blog#glasses", label: "Glasses & Accessories" },
    { href: "/blog#ai-analysis", label: "AI & Analysis" },
  ]

  const isGuidesActive = pathname.startsWith("/blog")

  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1.5">
            <Scan className="h-5 w-5 text-lime-400" />
            <span className="font-semibold tracking-wide text-white">FaceDetector</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/90 md:flex">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href ? "text-lime-300" : "hover:text-lime-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setGuidesDropdownOpen(true)}
              onMouseLeave={() => setGuidesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 transition-colors ${
                  isGuidesActive ? "text-lime-300" : "hover:text-lime-300"
                }`}
              >
                Guides
                <ChevronDown className="h-3 w-3" />
              </button>
              {guidesDropdownOpen && (
                <div className="absolute left-0 top-full min-w-[220px] rounded-xl border border-white/10 bg-neutral-900/95 p-2 shadow-xl backdrop-blur-sm -translate-y-1">
                  {guideItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-lime-300"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href={navLinks[3].href}
              className={`transition-colors ${
                pathname === navLinks[3].href ? "text-lime-300" : "hover:text-lime-300"
              }`}
            >
              {navLinks[3].label}
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button
              asChild
              className="bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                         hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                         transition-all"
            >
              <Link href="/face-shape-detector-for-men">Try for Men</Link>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 bg-gray-900/80 text-gray-200 hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="liquid-glass border-gray-800 p-0 w-64 flex flex-col">
                {/* Brand Header */}
                <div className="flex items-center gap-1.5 px-4 py-4 border-b border-gray-800">
                  <Scan className="h-6 w-6 text-lime-400" />
                  <span className="font-semibold tracking-wide text-white text-lg">FaceDetector</span>
                </div>

                <nav className="flex flex-col gap-1 mt-2 text-gray-200">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-lime-300 transition-colors"
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 text-gray-400">
                        {link.label === "About" ? <Info className="h-4 w-4" /> : <Scan className="h-4 w-4" />}
                      </span>
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-gray-800 pt-2">
                    <div className="px-4 py-2 text-xs uppercase tracking-wider text-gray-500">Guides</div>
                    {guideItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 transition-colors hover:bg-gray-900 hover:text-lime-300"
                      >
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* CTA Button at Bottom */}
                <div className="mt-auto border-t border-gray-800 p-4">
                  <Button
                    asChild
                    className="w-full bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                               hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                               transition-all"
                  >
                    <Link href="/face-shape-detector-for-men">Try for Men</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
