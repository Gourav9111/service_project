import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanType: string | null;
}

const loanTitles: Record<string, string> = {
  'home-salaried': 'Home Loan Application - Salaried',
  'home-self-employed': 'Home Loan Application - Self Employed',
  'plot-purchase': 'Plot Purchase Loan Application',
  'construction': 'Construction Loan Application',
  'lap': 'Loan Against Property Application',
  'balance-transfer': 'Balance Transfer Application',
  'car': 'Car Loan Application',
  'business': 'Business Loan Application',
  'education': 'Education Loan Application',
  'home': 'Home Loan Application',
  'general': 'Loan Application'
};

export default function LoanApplicationModal({ isOpen, onClose, loanType }: LoanApplicationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    pinCode: "",
    loanAmount: "",
    monthlySalary: "",
    employmentType: "",
    preferredTenure: "",
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const applicationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/loan-applications", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Application submitted successfully! Our team will contact you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/loan-applications"] });
      handleClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      name: "",
      mobile: "",
      email: "",
      city: "",
      pinCode: "",
      loanAmount: "",
      monthlySalary: "",
      employmentType: "",
      preferredTenure: "",
    });
    onClose();
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.mobile || !formData.city || !formData.pinCode) {
        toast({
          title: "Error",
          description: "Please fill all required fields",
          variant: "destructive",
        });
        return;
      }
    }
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    const applicationData = {
      ...formData,
      loanType: loanType || "general",
      loanAmount: formData.loanAmount || undefined,
      monthlySalary: formData.monthlySalary || undefined,
      preferredTenure: formData.preferredTenure ? parseInt(formData.preferredTenure) : undefined,
    };

    applicationMutation.mutate(applicationData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle data-testid="modal-title">
            {loanType ? loanTitles[loanType] || 'Loan Application' : 'Loan Application'}
          </DialogTitle>
        </DialogHeader>

        {currentStep === 1 && (
          <div className="space-y-4" data-testid="step-1">
            <h4 className="text-lg font-semibold">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                  data-testid="input-name"
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="Enter mobile number"
                  required
                  data-testid="input-mobile"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  data-testid="input-email"
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter your city"
                  required
                  data-testid="input-city"
                />
              </div>
              <div>
                <Label htmlFor="pinCode">Pin Code *</Label>
                <Input
                  id="pinCode"
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                  placeholder="Enter pin code"
                  required
                  data-testid="input-pin-code"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleNext} data-testid="button-next">
                Next Step
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4" data-testid="step-2">
            <h4 className="text-lg font-semibold">Loan Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                  placeholder="Enter loan amount"
                  data-testid="input-loan-amount"
                />
              </div>
              <div>
                <Label htmlFor="monthlySalary">Monthly Salary (₹)</Label>
                <Input
                  id="monthlySalary"
                  type="number"
                  value={formData.monthlySalary}
                  onChange={(e) => setFormData({ ...formData, monthlySalary: e.target.value })}
                  placeholder="Enter monthly salary"
                  data-testid="input-monthly-salary"
                />
              </div>
              <div>
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select value={formData.employmentType} onValueChange={(value) => setFormData({ ...formData, employmentType: value })}>
                  <SelectTrigger data-testid="select-employment-type">
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="preferredTenure">Preferred Tenure (Years)</Label>
                <Select value={formData.preferredTenure} onValueChange={(value) => setFormData({ ...formData, preferredTenure: value })}>
                  <SelectTrigger data-testid="select-tenure">
                    <SelectValue placeholder="Select tenure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                    <SelectItem value="15">15 Years</SelectItem>
                    <SelectItem value="20">20 Years</SelectItem>
                    <SelectItem value="25">25 Years</SelectItem>
                    <SelectItem value="30">30 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)} data-testid="button-previous">
                Previous
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={applicationMutation.isPending}
                data-testid="button-submit"
              >
                {applicationMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
