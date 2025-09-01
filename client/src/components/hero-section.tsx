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
    <section id="home" className="relative h-screen">
      {/* Background Sliding Images */}
      <div className="absolute inset-0">
        <Carousel
          className="w-full h-full"
          plugins={[Autoplay({ delay: 4000 })]}
        >
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-full w-full">
                <img 
                  src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
                  alt="Home Loan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-full w-full">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
                  alt="Car Loan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-full w-full">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
                  alt="Business Loan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-full w-full">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
                  alt="Education Loan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      
      {/* Overlay Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up drop-shadow-2xl">
            AB APNE SAPNE PURE KARNA HUA ASSAN
          </h1>
          <p className="text-2xl md:text-3xl mb-8 animate-fade-in-up animation-delay-200 drop-shadow-lg">
            Ab sapnon ka ghar aayega aur bhi paas
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
            <Button 
              onClick={scrollToLoans} 
              className="bg-primary text-white px-12 py-4 text-xl rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 shadow-2xl border-2 border-white/20"
              data-testid="button-apply-now"
            >
              APPLY NOW
            </Button>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
              <Phone className="text-3xl" />
              <span className="text-2xl font-bold">+919131703768</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
