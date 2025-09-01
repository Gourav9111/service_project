import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HeroSection() {
  const scrollToLoans = () => {
    const element = document.getElementById("loans");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-16 bg-gradient-to-r from-primary to-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Text Content at Top */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            AB APNE SAPNE PURE KARNA HUA ASSAN
          </h1>
          <p className="text-xl md:text-2xl mb-6 animate-fade-in-up animation-delay-200">
            Ab sapnon ka ghar aayega aur bhi paas
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
        
        {/* Sliding Images Below Text */}
        <Carousel
          className="w-full max-w-5xl mx-auto"
          plugins={[Autoplay({ delay: 3000 })]}
        >
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
                  alt="Home Loan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
                  alt="Car Loan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
                  alt="Business Loan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
                  alt="Education Loan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  );
}
