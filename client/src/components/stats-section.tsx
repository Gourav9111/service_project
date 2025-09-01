import { Building, Users, MapPin, IndianRupee } from "lucide-react";

const stats = [
  {
    icon: IndianRupee,
    value: "₹25000+ Cr",
    label: "Assets Under Management",
    description: "AUM"
  },
  {
    icon: Users,
    value: "50000+",
    label: "Loans Approved",
    description: "Successfully Processed"
  },
  {
    icon: Building,
    value: "500+",
    label: "Expert Team",
    description: "Financial Advisors"
  },
  {
    icon: MapPin,
    value: "24/7",
    label: "Customer Support",
    description: "Always Available"
  }
];

export default function StatsSection() {
  return (
    <section className="bg-transparent py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="stats-counter animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="text-primary text-2xl md:text-3xl mb-2 flex justify-center">
                <stat.icon size={36} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary" data-testid={`stat-value-${index}`}>
                {stat.value}
              </h3>
              <p className="text-muted-foreground" data-testid={`stat-label-${index}`}>
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground" data-testid={`stat-description-${index}`}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
