import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/data";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[hsl(var(--lovers))] to-[hsl(var(--twilight))] flex items-center justify-center">
            <span className="text-white font-accent font-bold text-xl">B</span>
          </div>
          <span className="font-accent text-2xl font-semibold bg-gradient-to-r from-[hsl(var(--lovers))] to-[hsl(var(--twilight))] gradient-text">
            Bondify
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className={`font-medium ${location === "/" ? "text-[hsl(var(--lovers))]" : "text-gray-700 hover:text-[hsl(var(--lovers))] hover:underline hover:underline-offset-4 hover:decoration-[hsl(var(--lovers))]"} transition-colors`}>
              Home
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="font-medium text-gray-700 hover:text-white hover:bg-[#F8A0A0] border-none hover:border-none transition-colors rounded-full px-4">
                Categories
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2">
              {categories.map(category => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link 
                    href={`/category/${category.id}`} 
                    className={`flex px-4 py-2 text-sm rounded-md ${
                      category.id === 'twilight' ? 'hover:bg-[#F8A0A0]/10 hover:text-[#F8A0A0]' :
                      category.id === 'lovers' ? 'hover:bg-[hsl(var(--lovers))]/10 hover:text-[hsl(var(--lovers))]' :
                      category.id === 'sunlit' ? 'hover:bg-yellow-200/20 hover:text-yellow-500' :
                      category.id === 'brainstorm' ? 'hover:bg-orange-200/20 hover:text-orange-500' :
                      category.id === 'woodland' ? 'hover:bg-green-200/20 hover:text-green-600' :
                      category.id === 'mirror' ? 'hover:bg-blue-200/20 hover:text-blue-500' :
                      'hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link href="/weekly-packs" className={`font-medium ${location === "/weekly-packs" ? "text-[hsl(var(--lovers))]" : "text-gray-700 hover:text-[hsl(var(--lovers))] hover:underline hover:underline-offset-4 hover:decoration-[hsl(var(--lovers))]"} transition-colors`}>
              Weekly Packs
          </Link>
          
          <Link href="/about" className={`font-medium ${location === "/about" ? "text-[hsl(var(--lovers))]" : "text-gray-700 hover:text-[hsl(var(--lovers))] hover:underline hover:underline-offset-4 hover:decoration-[hsl(var(--lovers))]"} transition-colors`}>
              About
          </Link>
          
          <Link href="/join-club" className="font-medium px-5 py-2 rounded-full bg-gradient-to-r from-[hsl(var(--lovers))] to-[hsl(var(--twilight))] text-white hover:shadow-md transition-all">
              Join Bondify Club
          </Link>
        </nav>
        
        <Button 
          variant="ghost" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t border-gray-100"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[hsl(var(--lovers))] hover:bg-[hsl(var(--lovers))/10]">
              Home
            </Link>
            
            {categories.map(category => (
              <Link key={category.id} href={`/category/${category.id}`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[hsl(var(--lovers))] hover:bg-[hsl(var(--lovers))/10]">
                {category.name}
              </Link>
            ))}
            
            <Link href="/weekly-packs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[hsl(var(--lovers))] hover:bg-[hsl(var(--lovers))/10]">
              Weekly Packs
            </Link>

            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[hsl(var(--lovers))] hover:bg-[hsl(var(--lovers))/10]">
              About
            </Link>
            
            <Link href="/join-club" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-[hsl(var(--lovers))] to-[hsl(var(--twilight))]">
              Join Bondify Club
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
