"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Tag, HelpCircle, FileText, Info, Scan, ChevronDown, User, Users, Image as ImageIcon, HelpCircle as FaceIcon } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const [onlineDropdownOpen, setOnlineDropdownOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: "#faq", label: "FAQ", icon: HelpCircle },
    { href: "#blog", label: "Blog", icon: FileText },
    { href: "/about", label: "About", icon: Info },
  ]

  const dropdownItems = [
    { href: "/face-shape-detector-online", label: "Online Detector", icon: <Scan className="h-4 w-4" /> },
    { href: "/face-shape-detector-for-men", label: "For Men", icon: <User className="h-4 w-4" /> },
    { href: "/face-shape-detector-for-women", label: "For Women", icon: <Users className="h-4 w-4" /> },
    { href: "/face-shape-detector-from-photo", label: "From Photo", icon: <ImageIcon className="h-4 w-4" /> },
    { href: "/what-face-shape-do-i-have", label: "What Face Shape", icon: <FaceIcon className="h-4 w-4" /> },
  ]

  const activeItem = dropdownItems.find(item => pathname === item.href)

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
            {/* Online with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOnlineDropdownOpen(true)}
              onMouseLeave={() => setOnlineDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 hover:text-lime-300 transition-colors"
              >
                {activeItem ? activeItem.label : "Home"}
                <ChevronDown className="h-3 w-3" />
              </button>
              {onlineDropdownOpen && (
                <div className="absolute left-0 top-full min-w-[160px] rounded-xl border border-white/10 bg-neutral-900/95 backdrop-blur-sm p-2 shadow-xl -translate-y-1">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        pathname === item.href
                          ? "bg-lime-400/20 text-lime-300"
                          : "text-white/90 hover:bg-white/10 hover:text-lime-300"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-lime-300 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button
              asChild
              className="bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                         hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                         transition-all"
            >
              <Link href="#hero">Try Now</Link>
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
                  {/* Mobile Online links */}
                  <div className="mb-2 pb-2 border-b border-gray-800">
                    <div className="text-xs text-gray-500 uppercase tracking-wider px-4 py-2 mb-2">{activeItem ? activeItem.label : "Home"}</div>
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          pathname === item.href
                            ? "bg-lime-400/20 text-lime-300"
                            : "hover:bg-gray-900 hover:text-lime-300"
                        }`}
                      >
                        <span className={`inline-flex items-center justify-center w-5 h-5 ${
                          pathname === item.href ? "text-lime-300" : "text-gray-400"
                        }`}>
                          {item.icon}
                        </span>
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-lime-300 transition-colors"
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 text-gray-400">
                        <l.icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm">{l.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* CTA Button at Bottom */}
                <div className="mt-auto border-t border-gray-800 p-4">
                  <Button
                    asChild
                    className="w-full bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                               hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                               transition-all"
                  >
                    <Link href="#hero">Try Now</Link>
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
