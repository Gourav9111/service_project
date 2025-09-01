import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Handshake, TrendingUp, Headphones } from "lucide-react";
import DSARegistrationModal from "./dsa-registration-modal";

export default function DSAPartnerSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="dsa-partner" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Become Our DSA Partner</h2>
          <p className="text-lg text-muted-foreground">Join our network and earn attractive commissions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <Handshake size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2" data-testid="benefit-title-1">Partnership Benefits</h3>
            <p className="text-muted-foreground" data-testid="benefit-description-1">
              Earn attractive commissions on every successful loan
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <TrendingUp size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2" data-testid="benefit-title-2">Growth Opportunities</h3>
            <p className="text-muted-foreground" data-testid="benefit-description-2">
              Build your business with our support and training
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <Headphones size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2" data-testid="benefit-title-3">Dedicated Support</h3>
            <p className="text-muted-foreground" data-testid="benefit-description-3">
              24/7 support and dedicated relationship manager
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              data-testid="button-register-dsa-partner"
            >
              Register as DSA Partner
            </Button>
            <Button 
              onClick={() => window.location.href = "/dsa-login"} 
              variant="outline"
              className="px-8 py-3 rounded-lg font-semibold border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              data-testid="button-dsa-login"
            >
              DSA Login
            </Button>
          </div>
        </div>
      </div>

      <DSARegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
