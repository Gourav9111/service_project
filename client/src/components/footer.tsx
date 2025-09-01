import { useLocation } from "wouter";

export default function Footer() {
  const [, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">JSMF</span>
              </div>
              <h3 className="text-lg font-bold" data-testid="footer-company-name">Jay Shree Mahakal Finance</h3>
            </div>
            <p className="text-gray-300" data-testid="footer-tagline">Your trusted partner for all financial needs</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4" data-testid="footer-quick-links-title">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-home"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("loans")} 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-loans"
                >
                  Loans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("calculator")} 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-calculator"
                >
                  EMI Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLocation("/terms")} 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-terms"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4" data-testid="footer-loan-types-title">Loan Types</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("loans")} 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-home-loans"
                >
                  Home Loans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("loans")} 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-car-loans"
                >
                  Car Loans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("loans")} 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-business-loans"
                >
                  Business Loans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("loans")} 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-education-loans"
                >
                  Education Loans
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4" data-testid="footer-contact-info-title">Contact Info</h4>
            <ul className="space-y-2">
              <li className="text-gray-300" data-testid="footer-contact-phone">+919131703768</li>
              <li className="text-gray-300" data-testid="footer-contact-email">customercare@jsmf.in</li>
              <li className="text-gray-300" data-testid="footer-contact-address">
                Shop No 2, Near Mittal College, Karond Bhopal MP
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300" data-testid="footer-copyright">
            &copy; 2024 Jay Shree Mahakal Finance Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
