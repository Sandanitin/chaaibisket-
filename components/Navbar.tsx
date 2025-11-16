'use client';

import Link from 'next/link';
import { ShoppingCart, Utensils, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface NavbarProps {
  cartCount: number;
}

const Navbar = ({ cartCount }: NavbarProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsAuthOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbar = document.getElementById('navbar');
      if (isMenuOpen && navbar && !navbar.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsAuthOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav 
      id="navbar"
      className={`sticky top-0 z-50 w-full border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-2 shadow-sm' : 'bg-white/90 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container flex h-auto items-center justify-between px-4 md:px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Utensils className="h-6 w-6 text-emerald-600" />
          <span className="text-xl font-bold text-gray-900">Chai Bisket</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#menu" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">Menu</Link>
          <Link href="#story" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">Our Story</Link>
          <Link href="#location" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">Location</Link>
          <Link href="#contact" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">Contact</Link>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-3">
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-medium text-white">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Auth Buttons - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="default" asChild className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm h-8 px-3">
              <Link href="/login">Login</Link>
            </Button>
            <Button size="default" asChild className="bg-emerald-600 hover:bg-emerald-700 text-sm h-8 px-3">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
          
          {/* Mobile Auth Button */}
          <div className="md:hidden relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => setIsAuthOpen(!isAuthOpen)}
            >
              <User className="h-5 w-5" />
            </Button>
            
            {/* Auth Dropdown */}
            {isAuthOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start px-4 py-2 text-left hover:bg-emerald-50 text-gray-700 hover:text-emerald-700"
                    asChild
                    onClick={() => {
                      setIsAuthOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start px-4 py-2 text-left hover:bg-emerald-50 text-gray-700 hover:text-emerald-700"
                    asChild
                    onClick={() => {
                      setIsAuthOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="container px-4 py-3 flex flex-col space-y-3">
            <Link 
              href="#menu" 
              className="py-3 text-gray-700 hover:text-emerald-700 transition-colors font-medium border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link 
              href="#story" 
              className="py-3 text-gray-700 hover:text-emerald-700 transition-colors font-medium border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link 
              href="#location" 
              className="py-3 text-gray-700 hover:text-emerald-700 transition-colors font-medium border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Location
            </Link>
            <Link 
              href="#contact" 
              className="py-3 text-gray-700 hover:text-emerald-700 transition-colors font-medium border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const preferredRegion = "auto";