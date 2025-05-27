"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mainNav, ROUTES } from "@/routes";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-4 border-b border-border bg-background/95 backdrop-blur-sm fixed top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="w-[180px]">
          <img src={"/enchry-logo.png"} />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {mainNav.map((link, idx) => {
            return (
              <Link
                href={link.path}
                key={idx}
                className="text-sm font-medium hover:text-primary"
              >
                {link.name}
              </Link>
            );
          })}
          <div className="border-l border-border h-6 mx-2"></div>
          <Link href={ROUTES.login}>
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
          <Link href={ROUTES.signUp}>
            <Button size="sm">Sign up</Button>
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 flex flex-col gap-4">
          {mainNav.map((link, idx) => {
            return (
              <Link
                href={link.path}
                key={idx}
                className="text-sm font-medium hover:text-primary"
              >
                {link.name}
              </Link>
            );
          })}
          <div className="border-t border-border my-2"></div>
          <div className="flex gap-2">
            <Link href={ROUTES.login} className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                Log in
              </Button>
            </Link>
            <Link href={ROUTES.signUp} className="w-full">
              <Button size="sm" className="w-full">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
