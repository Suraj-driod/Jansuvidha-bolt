"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserProfileDropdown from "./UserProfileDropdown";
import Logo from "./Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-[100] bg-white/90 backdrop-blur-sm border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button - Moved to left */}
            <div className="block md:hidden">
              <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
            
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-bold">Jansuvidha</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-black font-medium"
            >
              Home
            </Link>
            <div className="relative group">
              <Link 
                href="/reports" 
                className="text-gray-700 hover:text-black font-medium flex items-center gap-1"
              >
                Reports <span className="text-xs mt-1">▼</span>
              </Link>
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link 
                  href="/reports/new" 
                  className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                >
                  Submit Report
                </Link>
                <Link 
                  href="/reports/status" 
                  className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                >
                  Track Status
                </Link>
              </div>
            </div>
            <Link 
              href="/map" 
              className="text-gray-700 hover:text-black font-medium"
            >
              Map View
            </Link>
            <Link 
              href="/community" 
              className="text-gray-700 hover:text-black font-medium"
            >
              Community
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-in">Log in</Link>
              </Button>
            </div>
            {/* Always show UserProfileDropdown for demo */}
            <UserProfileDropdown />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-[500px] opacity-100 visible mt-4' 
              : 'max-h-0 opacity-0 invisible'
          } overflow-hidden`}
        >
          <div className="flex flex-col space-y-3 bg-white rounded-lg border border-gray-200 p-4">
            <Link 
              href="/" 
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/reports/new" 
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Submit Report
            </Link>
            <Link 
              href="/reports/status" 
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Track Status
            </Link>
            <Link 
              href="/map" 
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Map View
            </Link>
            <Link 
              href="/community" 
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Button variant="outline" asChild className="w-full">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/sign-in">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;