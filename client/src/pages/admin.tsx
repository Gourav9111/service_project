import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface User {
  id: string;
  username: string;
  role: string;
}

interface LoanApplication {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  city: string;
  loanType: string;
  loanAmount?: string;
  monthlySalary?: string;
  employmentType?: string;
  preferredTenure?: number;
  status: string;
  createdAt: string;
}

interface DSAPartner {
  id: string;
  name: string;
  email: string;
  mobile: string;
  experience?: string;
  kycStatus: string;
  isActive: boolean;
  createdAt: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/admin/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      setIsAuthenticated(true);
      setUser(data.user);
      toast({
        title: "Success",
        description: "Login successful",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const { data: loanApplications = [], isLoading: loadingApplications } = useQuery<LoanApplication[]>({
    queryKey: ["/api/loan-applications"],
    enabled: isAuthenticated,
  });

  const { data: dsaPartners = [], isLoading: loadingPartners } = useQuery<DSAPartner[]>({
    queryKey: ["/api/dsa-partners"],
    enabled: isAuthenticated,
  });

  const updateApplicationStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/loan-applications/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/loan-applications"] });
      toast({
        title: "Success",
        description: "Application status updated",
      });
    },
  });

  const updateDSAKYCMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/dsa-partners/${id}/kyc`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dsa-partners"] });
      toast({
        title: "Success",
        description: "KYC status updated",
      });
    },
  });

  const updateDSAStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const response = await apiRequest("PATCH", `/api/dsa-partners/${id}/status`, { isActive });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dsa-partners"] });
      toast({
        title: "Success",
        description: "Partner status updated",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsAuthenticated(false);
    setUser(null);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-orange-100 text-orange-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800";
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JSMF</span>
                </div>
                <span>Admin Login</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                required
                data-testid="input-username"
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
          </CardContent>
        </Card>
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
              <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
            </div>
            <Button onClick={handleLogout} variant="outline" data-testid="button-logout">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="home-loans">Home Loans</TabsTrigger>
            <TabsTrigger value="car-loans">Car Loans</TabsTrigger>
            <TabsTrigger value="business-loans">Business Loans</TabsTrigger>
            <TabsTrigger value="education-loans">Education Loans</TabsTrigger>
            <TabsTrigger value="dsa-partners">DSA Partners</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary">
                    {loanApplications?.length || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-orange-500">
                    {loanApplications?.filter((app: LoanApplication) => app.status === "pending").length || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-green-500">
                    {loanApplications?.filter((app: LoanApplication) => app.status === "approved").length || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-500">
                    {dsaPartners?.length || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">DSA Partners</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="home-loans">
            <Card>
              <CardHeader>
                <CardTitle>Home Loan Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingApplications ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanApplications
                        ?.filter((app: LoanApplication) => app.loanType.includes("home"))
                        .map((app: LoanApplication) => (
                          <TableRow key={app.id}>
                            <TableCell data-testid={`text-name-${app.id}`}>{app.name}</TableCell>
                            <TableCell data-testid={`text-mobile-${app.id}`}>{app.mobile}</TableCell>
                            <TableCell data-testid={`text-city-${app.id}`}>{app.city}</TableCell>
                            <TableCell data-testid={`text-amount-${app.id}`}>
                              {app.loanAmount ? `₹${Number(app.loanAmount).toLocaleString('en-IN')}` : "N/A"}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadge(app.status)} data-testid={`status-${app.id}`}>
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateApplicationStatusMutation.mutate({ id: app.id, status: "approved" })}
                                  data-testid={`button-approve-${app.id}`}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateApplicationStatusMutation.mutate({ id: app.id, status: "rejected" })}
                                  data-testid={`button-reject-${app.id}`}
                                >
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="car-loans">
            <Card>
              <CardHeader>
                <CardTitle>Car Loan Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingApplications ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanApplications
                        ?.filter((app: LoanApplication) => app.loanType.includes("car"))
                        .map((app: LoanApplication) => (
                          <TableRow key={app.id}>
                            <TableCell data-testid={`text-name-${app.id}`}>{app.name}</TableCell>
                            <TableCell data-testid={`text-mobile-${app.id}`}>{app.mobile}</TableCell>
                            <TableCell data-testid={`text-city-${app.id}`}>{app.city}</TableCell>
                            <TableCell data-testid={`text-amount-${app.id}`}>
                              {app.loanAmount ? `₹${Number(app.loanAmount).toLocaleString('en-IN')}` : "N/A"}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadge(app.status)} data-testid={`status-${app.id}`}>
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateApplicationStatusMutation.mutate({ id: app.id, status: "approved" })}
                                  data-testid={`button-approve-${app.id}`}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateApplicationStatusMutation.mutate({ id: app.id, status: "rejected" })}
                                  data-testid={`button-reject-${app.id}`}
                                >
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business-loans">
            <Card>
              <CardHeader>
                <CardTitle>Business Loan Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingApplications ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanApplications
                        ?.filter((app: LoanApplication) => app.loanType.includes("business"))
                        .map((app: LoanApplication) => (
                          <TableRow key={app.id}>
                            <TableCell data-testid={`text-name-${app.id}`}>{app.name}</TableCell>
                            <TableCell data-testid={`text-mobile-${app.id}`}>{app.mobile}</TableCell>
                            <TableCell data-testid={`text-city-${app.id}`}>{app.city}</TableCell>
                            <TableCell data-testid={`text-amount-${app.id}`}>
                              {app.loanAmount ? `₹${Number(app.loanAmount).toLocaleString('en-IN')}` : "N/A"}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadge(app.status)} data-testid={`status-${app.id}`}>
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateApplicationStatusMutation.mutate({ id: app.id, status: "approved" })}
                                  data-testid={`button-approve-${app.id}`}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateApplicationStatusMutation.mutate({ id: app.id, status: "rejected" })}
                                  data-testid={`button-reject-${app.id}`}
                                >
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education-loans">
            <Card>
              <CardHeader>
                <CardTitle>Education Loan Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingApplications ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanApplications
                        ?.filter((app: LoanApplication) => app.loanType.includes("education"))
                        .map((app: LoanApplication) => (
                          <TableRow key={app.id}>
                            <TableCell data-testid={`text-name-${app.id}`}>{app.name}</TableCell>
                            <TableCell data-testid={`text-mobile-${app.id}`}>{app.mobile}</TableCell>
                            <TableCell data-testid={`text-city-${app.id}`}>{app.city}</TableCell>
                            <TableCell data-testid={`text-amount-${app.id}`}>
                              {app.loanAmount ? `₹${Number(app.loanAmount).toLocaleString('en-IN')}` : "N/A"}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadge(app.status)} data-testid={`status-${app.id}`}>
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateApplicationStatusMutation.mutate({ id: app.id, status: "approved" })}
                                  data-testid={`button-approve-${app.id}`}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateApplicationStatusMutation.mutate({ id: app.id, status: "rejected" })}
                                  data-testid={`button-reject-${app.id}`}
                                >
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dsa-partners">
            <Card>
              <CardHeader>
                <CardTitle>DSA Partners</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingPartners ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>KYC Status</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dsaPartners?.map((partner: DSAPartner) => (
                        <TableRow key={partner.id}>
                          <TableCell data-testid={`text-name-${partner.id}`}>{partner.name}</TableCell>
                          <TableCell data-testid={`text-email-${partner.id}`}>{partner.email}</TableCell>
                          <TableCell data-testid={`text-mobile-${partner.id}`}>{partner.mobile}</TableCell>
                          <TableCell data-testid={`text-experience-${partner.id}`}>{partner.experience || "N/A"}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(partner.kycStatus)} data-testid={`kyc-status-${partner.id}`}>
                              {partner.kycStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={partner.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} data-testid={`active-status-${partner.id}`}>
                              {partner.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateDSAKYCMutation.mutate({ id: partner.id, status: "approved" })}
                                data-testid={`button-approve-kyc-${partner.id}`}
                              >
                                Approve KYC
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateDSAKYCMutation.mutate({ id: partner.id, status: "rejected" })}
                                data-testid={`button-reject-kyc-${partner.id}`}
                              >
                                Reject KYC
                              </Button>
                              <Button
                                size="sm"
                                variant={partner.isActive ? "destructive" : "default"}
                                onClick={() => updateDSAStatusMutation.mutate({ id: partner.id, isActive: !partner.isActive })}
                                data-testid={`button-toggle-status-${partner.id}`}
                              >
                                {partner.isActive ? "Deactivate" : "Activate"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
