import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface DSARegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DSARegistrationModal({ isOpen, onClose }: DSARegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    experience: "",
    address: "",
  });
  
  const { toast } = useToast();

  const registrationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/dsa-partners", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "DSA Registration submitted! We will review and contact you soon.",
      });
      handleClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      experience: "",
      address: "",
    });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.mobile) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    registrationMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle data-testid="modal-title-dsa">DSA Partner Registration</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dsa-name">Full Name *</Label>
              <Input
                id="dsa-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
                data-testid="input-dsa-name"
              />
            </div>
            <div>
              <Label htmlFor="dsa-email">Email Address *</Label>
              <Input
                id="dsa-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
                required
                data-testid="input-dsa-email"
              />
            </div>
            <div>
              <Label htmlFor="dsa-mobile">Mobile Number *</Label>
              <Input
                id="dsa-mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="Enter mobile number"
                required
                data-testid="input-dsa-mobile"
              />
            </div>
            <div>
              <Label htmlFor="dsa-experience">Experience (Years)</Label>
              <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                <SelectTrigger data-testid="select-dsa-experience">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 Years</SelectItem>
                  <SelectItem value="1-3">1-3 Years</SelectItem>
                  <SelectItem value="3-5">3-5 Years</SelectItem>
                  <SelectItem value="5+">5+ Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="dsa-address">Address</Label>
            <Textarea
              id="dsa-address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter complete address"
              rows={3}
              data-testid="textarea-dsa-address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dsa-profile">Profile Picture</Label>
              <Input
                id="dsa-profile"
                type="file"
                accept="image/*"
                data-testid="input-dsa-profile"
              />
              <p className="text-xs text-muted-foreground mt-1">Optional - Upload your profile picture</p>
            </div>
            <div>
              <Label htmlFor="dsa-documents">Documents (Aadhar, PAN)</Label>
              <Input
                id="dsa-documents"
                type="file"
                multiple
                accept=".pdf,.jpg,.png"
                data-testid="input-dsa-documents"
              />
              <p className="text-xs text-muted-foreground mt-1">Upload Aadhar and PAN documents</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={handleClose} data-testid="button-cancel-dsa">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={registrationMutation.isPending}
              data-testid="button-register-dsa"
            >
              {registrationMutation.isPending ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
