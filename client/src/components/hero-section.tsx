import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const heroSlides = [
  {
    title: "GHAR KA SAPNA HUA AASAN",
    subtitle: "Ab sapnon ka ghar aayega aur bhi paas",
    backgroundImage: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
  },
  {
    title: "BUSINESS GROWTH KE LIYE",
    subtitle: "Aapke sapnon ka business ab hoga reality",
    backgroundImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
  },
  {
    title: "CAR LOAN MADE SIMPLE",
    subtitle: "Apni dream car ab hai bas ek call ki doori par",
    backgroundImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToLoans = () => {
    const element = document.getElementById("loans");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-16 bg-gradient-to-r from-primary to-primary text-white">
      <div className="hero-bg h-96 relative overflow-hidden">
        <div className="carousel-container relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${slide.backgroundImage}')`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 animate-fade-in-up animation-delay-200">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
              <Button 
                onClick={scrollToLoans} 
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                data-testid="button-apply-now"
              >
                APPLY NOW
              </Button>
              <div className="flex items-center space-x-2">
                <Phone className="text-2xl" />
                <span className="text-2xl font-bold">+919131703768</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
              data-testid={`slide-indicator-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
