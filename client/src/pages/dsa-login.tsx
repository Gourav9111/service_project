import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

interface DSAPartner {
  id: string;
  name: string;
  email: string;
  kycStatus: string;
}

export default function DSALogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [partner, setPartner] = useState<DSAPartner | null>(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("dsaToken");
    const partnerData = localStorage.getItem("dsaPartner");
    
    if (token && partnerData) {
      setIsAuthenticated(true);
      setPartner(JSON.parse(partnerData));
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/dsa/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("dsaToken", data.token);
      localStorage.setItem("dsaPartner", JSON.stringify(data.partner));
      setIsAuthenticated(true);
      setPartner(data.partner);
      toast({
        title: "Success",
        description: "Login successful",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Invalid credentials or account not approved",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const handleLogout = () => {
    localStorage.removeItem("dsaToken");
    localStorage.removeItem("dsaPartner");
    setIsAuthenticated(false);
    setPartner(null);
  };

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-orange-600";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")}
              className="mb-4"
              data-testid="button-back-home"
            >
              ← Back to Home
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JSMF</span>
                  </div>
                  <span>DSA Partner Login</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                  data-testid="input-email"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                  data-testid="input-password"
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button 
                    variant="link" 
                    className="p-0"
                    onClick={() => setLocation("/")}
                    data-testid="link-register"
                  >
                    Register as DSA Partner
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">JSMF</span>
              </div>
              <h1 className="text-xl font-bold text-primary">DSA Dashboard</h1>
            </div>
            <Button onClick={handleLogout} variant="outline" data-testid="button-logout">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Welcome Card */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {partner?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium" data-testid="text-partner-email">{partner?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">KYC Status</p>
                  <p className={`font-medium ${getKYCStatusColor(partner?.kycStatus || "")}`} data-testid="text-kyc-status">
                    {partner?.kycStatus?.toUpperCase()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              {partner?.kycStatus === "approved" ? (
                <div className="text-green-600">
                  <p className="font-medium">✓ Your account is approved and active</p>
                  <p className="text-sm mt-2">You can now start referring customers and earning commissions.</p>
                </div>
              ) : partner?.kycStatus === "rejected" ? (
                <div className="text-red-600">
                  <p className="font-medium">✗ Your KYC has been rejected</p>
                  <p className="text-sm mt-2">Please contact our support team for more information.</p>
                </div>
              ) : (
                <div className="text-orange-600">
                  <p className="font-medium">⏳ Your KYC is under review</p>
                  <p className="text-sm mt-2">We are reviewing your documents. You will be notified once the review is complete.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-16"
                  onClick={() => setLocation("/")}
                  data-testid="button-refer-customer"
                >
                  <div className="text-center">
                    <p className="font-medium">Refer Customer</p>
                    <p className="text-sm text-muted-foreground">Send customers to apply for loans</p>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16"
                  disabled
                  data-testid="button-commission-report"
                >
                  <div className="text-center">
                    <p className="font-medium">Commission Report</p>
                    <p className="text-sm text-muted-foreground">View your earnings (Coming Soon)</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
