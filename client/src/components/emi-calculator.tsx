import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import LoanApplicationModal from "./loan-application-modal";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState([2500000]);
  const [interestRate, setInterestRate] = useState([12]);
  const [loanTenure, setLoanTenure] = useState([20]);
  const [emiData, setEmiData] = useState({
    monthlyEMI: 0,
    totalInterest: 0,
    totalAmount: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  const calculateEMI = () => {
    const principal = loanAmount[0];
    const monthlyRate = interestRate[0] / (12 * 100);
    const numberOfPayments = loanTenure[0] * 12;

    if (monthlyRate === 0) {
      const emi = principal / numberOfPayments;
      const totalAmount = principal;
      const totalInterest = 0;
      
      setEmiData({
        monthlyEMI: emi,
        totalInterest,
        totalAmount,
      });
      return;
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalAmount = emi * numberOfPayments;
    const totalInterest = totalAmount - principal;

    setEmiData({
      monthlyEMI: emi,
      totalInterest,
      totalAmount,
    });
  };

  const formatAmount = (amount: number) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  const formatLoanAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(0)}L`;
    } else {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  };

  return (
    <section id="calculator" className="bg-gradient-to-br from-primary to-red-700 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">EMI Calculator</h2>
          <p className="text-xl text-white/90">Calculate your monthly installments</p>
        </div>
        
        <Card className="bg-white rounded-lg shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Loan Amount (₹)
                  </label>
                  <Slider
                    value={loanAmount}
                    onValueChange={setLoanAmount}
                    min={100000}
                    max={10000000}
                    step={50000}
                    className="w-full mb-2"
                    data-testid="slider-loan-amount"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹1L</span>
                    <span className="font-bold text-primary" data-testid="display-loan-amount">
                      {formatLoanAmount(loanAmount[0])}
                    </span>
                    <span>₹1Cr</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Interest Rate (% p.a.)
                  </label>
                  <Slider
                    value={interestRate}
                    onValueChange={setInterestRate}
                    min={8}
                    max={18}
                    step={0.25}
                    className="w-full mb-2"
                    data-testid="slider-interest-rate"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>8%</span>
                    <span className="font-bold text-primary" data-testid="display-interest-rate">
                      {interestRate[0]}%
                    </span>
                    <span>18%</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Loan Tenure (Years)
                  </label>
                  <Slider
                    value={loanTenure}
                    onValueChange={setLoanTenure}
                    min={1}
                    max={30}
                    step={1}
                    className="w-full mb-2"
                    data-testid="slider-loan-tenure"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1Y</span>
                    <span className="font-bold text-primary" data-testid="display-loan-tenure">
                      {loanTenure[0]}Y
                    </span>
                    <span>30Y</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary rounded-lg p-6">
                <h3 className="text-xl font-bold text-center mb-6">EMI Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monthly EMI</span>
                    <span className="text-2xl font-bold text-primary" data-testid="result-monthly-emi">
                      {formatAmount(emiData.monthlyEMI)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="text-lg font-semibold" data-testid="result-total-interest">
                      {formatAmount(emiData.totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="text-lg font-semibold" data-testid="result-total-amount">
                      {formatAmount(emiData.totalAmount)}
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsModalOpen(true)} 
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg mt-6 hover:bg-red-700 transition-colors"
                  data-testid="button-apply-loan"
                >
                  Apply for Loan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <LoanApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        loanType="general"
      />
    </section>
  );
}
