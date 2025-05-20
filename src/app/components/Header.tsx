"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
            ValenceAI
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`relative text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                  pathname === href
                    ? "text-blue-600 after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:bg-blue-600 after:rounded-full"
                    : ""
                }`}
              >
                {label}
              </Link>
            ))}

            <button className="bg-transparent border cursor-pointer border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors font-medium">
              Log In
            </button>
            <button className="bg-blue-600 text-white cursor-pointer hover:bg-blue-700 px-5 py-2 rounded-lg transition-colors font-medium">
              Request a Demo
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 bg-white">
            <nav className="flex flex-col space-y-4">
              {navItems.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                    pathname === href ? "text-blue-600" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              <Button className="bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors font-medium w-full text-left">
                Log In
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-lg transition-colors font-medium w-full text-left">
                Request a Demo
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
