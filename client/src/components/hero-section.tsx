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
    <section id="home" className="relative h-64 md:h-80 mb-8">
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
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=640"
                  alt="Professional Finance Services"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-full w-full">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=640"
                  alt="Business Growth"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-full w-full">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=640"
                  alt="Financial Planning"
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
        <div className="text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight drop-shadow-2xl">
            AB APNE SAPNE PURE KARNA HUA ASSAN
          </h1>
          <p className="text-base md:text-lg mb-6 drop-shadow-lg">
            Ab sapnon ka ghar aayega aur bhi paas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToLoans} 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 text-base font-bold rounded-lg transition-all duration-300 shadow-xl border-2 border-white/30"
              data-testid="button-apply-now"
            >
              APPLY NOW
            </Button>
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
              <Phone className="text-lg" />
              <span className="text-base font-bold">+919131703768</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
