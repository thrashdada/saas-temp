// src/components/header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-xl text-blue-600">
          SaaS-Temp
        </Link>
        <div className="hidden md:flex gap-4">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              className="text-base font-medium"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <nav className="flex flex-col gap-2 p-4">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="ghost"
                    className="justify-start text-base font-medium"
                    onClick={() => setOpen(false)}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}