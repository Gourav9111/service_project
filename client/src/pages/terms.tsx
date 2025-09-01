import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Terms() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">JSMF</span>
              </div>
              <h1 className="text-xl font-bold text-primary">Terms & Conditions</h1>
            </div>
            <Button onClick={() => setLocation("/")} variant="outline" data-testid="button-back-home">
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Terms & Conditions</CardTitle>
            <p className="text-muted-foreground">Jay Shree Mahakal Finance Service</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">1. General Terms</h3>
              <p className="text-sm text-foreground leading-6">
                These terms and conditions govern your use of Jay Shree Mahakal Finance Service (JSMF) 
                and the application for various loan products. By using our services, you agree to be 
                bound by these terms.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">2. Loan Eligibility</h3>
              <p className="text-sm text-foreground leading-6">
                Loan approval is subject to credit verification, income assessment, and documentation 
                requirements as per company policy. JSMF reserves the right to approve or reject any 
                loan application at its sole discretion.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">3. Interest Rates</h3>
              <p className="text-sm text-foreground leading-6">
                Interest rates are subject to change based on market conditions and individual credit 
                profiles. The rates mentioned on our website are indicative and final rates will be 
                communicated upon approval. All rates are per annum and subject to applicable taxes.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">4. Processing Fees and Charges</h3>
              <div className="text-sm text-foreground leading-6 space-y-2">
                <p>Processing fees and other charges apply as per the loan type and amount:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Login Fee: Up to ₹3,500 + GST</li>
                  <li>Documentation: ₹2,000–₹5,000 + GST</li>
                  <li>Legal/Valuation/Technical: ₹3,000–₹5,800 + GST</li>
                  <li>Administrative: Up to ₹5,100 or 1.5% of sanction amount + GST</li>
                </ul>
                <p>All fees are non-refundable once the processing begins.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">5. Prepayment Terms</h3>
              <div className="text-sm text-foreground leading-6 space-y-2">
                <ul className="list-disc ml-6 space-y-1">
                  <li>Variable rate loans: No prepayment charges</li>
                  <li>Fixed rate loans: 2–3% of outstanding amount + GST</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">6. Data Privacy and Security</h3>
              <p className="text-sm text-foreground leading-6">
                Your personal information will be kept confidential and used only for loan processing 
                purposes. We comply with applicable data protection laws and maintain strict security 
                measures to protect your information.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">7. DSA Partner Terms</h3>
              <p className="text-sm text-foreground leading-6">
                DSA (Direct Selling Agent) partners are independent agents and not employees of JSMF. 
                Commission structure and terms are subject to separate partnership agreements. 
                All DSA partners must complete KYC verification before becoming active.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">8. Liability and Disclaimer</h3>
              <p className="text-sm text-foreground leading-6">
                JSMF shall not be liable for any indirect, incidental, or consequential damages arising 
                from the use of our services. Information provided on our website is for general 
                guidance only and should not be considered as financial advice.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">9. Governing Law</h3>
              <p className="text-sm text-foreground leading-6">
                These terms shall be governed by the laws of India. Any disputes shall be subject to 
                the exclusive jurisdiction of courts in Bhopal, Madhya Pradesh.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">10. Contact Information</h3>
              <div className="text-sm text-foreground leading-6">
                <p>For any queries or support:</p>
                <ul className="mt-2 space-y-1">
                  <li>Email: customercare@jsmf.in</li>
                  <li>Phone: +919131703768</li>
                  <li>Address: Shop No 2, Near Mittal College, Karond Bhopal Madhya Pradesh</li>
                </ul>
              </div>
            </section>

            <div className="pt-6 border-t">
              <p className="text-xs text-muted-foreground">
                Last updated: September 1, 2025. These terms are subject to change without prior notice.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
