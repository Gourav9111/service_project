import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JSMF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Jay Shree Mahakal Finance</h1>
              <p className="text-xs text-muted-foreground">Your Trusted Loan Partner</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("home")} 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("loans")} 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-loans"
            >
              Loans
            </button>
            <button 
              onClick={() => scrollToSection("calculator")} 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-calculator"
            >
              EMI Calculator
            </button>
            <button 
              onClick={() => scrollToSection("dsa-partner")} 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-dsa-partner"
            >
              DSA Partner
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <Button 
              onClick={() => setLocation("/dsa-login")} 
              className="bg-primary text-primary-foreground hover:bg-red-700 transition-colors"
              data-testid="button-dsa-login"
            >
              DSA Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection("home")} 
              className="block px-3 py-2 text-foreground hover:text-primary w-full text-left"
              data-testid="mobile-nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("loans")} 
              className="block px-3 py-2 text-foreground hover:text-primary w-full text-left"
              data-testid="mobile-nav-loans"
            >
              Loans
            </button>
            <button 
              onClick={() => scrollToSection("calculator")} 
              className="block px-3 py-2 text-foreground hover:text-primary w-full text-left"
              data-testid="mobile-nav-calculator"
            >
              EMI Calculator
            </button>
            <button 
              onClick={() => scrollToSection("dsa-partner")} 
              className="block px-3 py-2 text-foreground hover:text-primary w-full text-left"
              data-testid="mobile-nav-dsa-partner"
            >
              DSA Partner
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="block px-3 py-2 text-foreground hover:text-primary w-full text-left"
              data-testid="mobile-nav-contact"
            >
              Contact
            </button>
            <div className="px-3 py-2">
              <Button 
                onClick={() => {
                  setLocation("/dsa-login");
                  setIsMobileMenuOpen(false);
                }} 
                className="w-full bg-primary text-primary-foreground hover:bg-red-700 transition-colors"
                data-testid="mobile-button-dsa-login"
              >
                DSA Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
