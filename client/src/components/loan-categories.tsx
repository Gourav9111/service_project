import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Car, Briefcase, GraduationCap, Building, RefreshCw, CreditCard, TrendingUp } from "lucide-react";
import LoanApplicationModal from "./loan-application-modal";

const mainCategories = [
  {
    icon: Home,
    title: "Home Loans",
    subtitle: "Starting from 11.75% p.a.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    benefits: [
      "Low interest rates",
      "Minimal documentation", 
      "Quick approval process"
    ],
    type: "home"
  },
  {
    icon: Car,
    title: "Car Loans",
    subtitle: "Starting from 8.70% p.a.",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    benefits: [
      "Competitive interest rates",
      "100% financing available",
      "Fast processing"
    ],
    type: "car"
  },
  {
    icon: Briefcase,
    title: "Business Loans",
    subtitle: "Starting from 12.00% p.a.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    benefits: [
      "Flexible repayment options",
      "High loan amounts",
      "Minimal collateral required"
    ],
    type: "business"
  },
  {
    icon: GraduationCap,
    title: "Education Loans",
    subtitle: "Starting from 10.50% p.a.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    benefits: [
      "Study abroad options",
      "Moratorium period available",
      "Tax benefits under 80E"
    ],
    type: "education"
  }
];

const detailedServices = [
  {
    title: "Home Loan - Salaried",
    rate: "11.75% - 16.50% p.a.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=150",
    benefits: [
      "Low interest rates",
      "Minimal documentation",
      "Quick approval"
    ],
    type: "home-salaried"
  },
  {
    title: "Home Loan - Self Employed",
    rate: "12.75% - 17.00% p.a.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=150",
    benefits: [
      "Flexible income proof",
      "Easy eligibility",
      "Fast processing"
    ],
    type: "home-self-employed"
  },
  {
    title: "Plot Purchase Loan",
    rate: "11.75% - 17.00% p.a.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=150",
    benefits: [
      "Co-applicant options",
      "Competitive rates",
      "Simple process"
    ],
    type: "plot-purchase"
  },
  {
    title: "Construction Loan",
    rate: "11.75% - 17.00% p.a.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=150",
    benefits: [
      "Stage-wise disbursement",
      "Construction financing",
      "Affordable rates"
    ],
    type: "construction"
  },
  {
    title: "Loan Against Property",
    rate: "15.00% - 17.00% p.a.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=150",
    benefits: [
      "High loan amounts",
      "Multiple purposes",
      "Competitive rates"
    ],
    type: "lap"
  },
  {
    title: "Balance Transfer",
    rate: "11.75% - 17.00% p.a.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=150",
    benefits: [
      "Lower interest rates",
      "No prepayment penalty",
      "Additional funds"
    ],
    type: "balance-transfer"
  }
];

export default function LoanCategories() {
  const [selectedLoanType, setSelectedLoanType] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = (loanType: string) => {
    setSelectedLoanType(loanType);
    setIsModalOpen(true);
  };

  return (
    <section id="loans" className="bg-secondary py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Loan Services</h2>
          <p className="text-lg text-muted-foreground">Find the perfect financial solution for your needs</p>
        </div>

        {/* Main Loan Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainCategories.map((category, index) => (
            <Card 
              key={index} 
              className="loan-card bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              data-testid={`card-${category.type}`}
            >
              <CardContent className="p-6">
                <img 
                  src={category.image}
                  alt={`${category.title} Consultation`} 
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="text-center">
                  <div className="text-primary text-3xl mb-3 flex justify-center">
                    <category.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" data-testid={`title-${category.type}`}>
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4" data-testid={`subtitle-${category.type}`}>
                    {category.subtitle}
                  </p>
                  <div className="text-left text-xs space-y-1 mb-4">
                    {category.benefits.map((benefit, benefitIndex) => (
                      <p key={benefitIndex} data-testid={`benefit-${category.type}-${benefitIndex}`}>
                        • {benefit}
                      </p>
                    ))}
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyClick(category.type);
                    }}
                    className="w-full bg-primary text-white hover:bg-red-700 transition-colors"
                    data-testid={`button-apply-${category.type}`}
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Loan Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailedServices.map((service, index) => (
            <Card 
              key={index} 
              className="loan-card bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              data-testid={`card-${service.type}`}
            >
              <CardContent className="p-6">
                <img 
                  src={service.image}
                  alt={`${service.title} Consultation`} 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="font-bold text-lg mb-2" data-testid={`title-${service.type}`}>
                  {service.title}
                </h4>
                <p className="text-primary font-semibold mb-2" data-testid={`rate-${service.type}`}>
                  {service.rate}
                </p>
                <div className="text-sm space-y-1 mb-4">
                  {service.benefits.map((benefit, benefitIndex) => (
                    <p key={benefitIndex} data-testid={`benefit-${service.type}-${benefitIndex}`}>
                      • {benefit}
                    </p>
                  ))}
                </div>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplyClick(service.type);
                  }}
                  className="w-full bg-primary text-white hover:bg-red-700 transition-colors"
                  data-testid={`button-apply-${service.type}`}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <LoanApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        loanType={selectedLoanType}
      />
    </section>
  );
}
