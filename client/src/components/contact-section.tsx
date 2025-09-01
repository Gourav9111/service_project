import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-secondary py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground">Get in touch with our experts</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <Phone size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2" data-testid="contact-phone-title">Phone</h3>
            <p className="text-muted-foreground" data-testid="contact-phone-number">+919131703768</p>
          </div>
          
          <div className="text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <Mail size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2" data-testid="contact-email-title">Email</h3>
            <p className="text-muted-foreground" data-testid="contact-email-address">customercare@jsmf.in</p>
          </div>
          
          <div className="text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <MapPin size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2" data-testid="contact-address-title">Address</h3>
            <p className="text-muted-foreground" data-testid="contact-address-details">
              Shop No 2, Near Mittal College,<br />
              Karond Bhopal Madhya Pradesh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
