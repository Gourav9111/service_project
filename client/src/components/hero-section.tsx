import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import homeLoanImage from "@assets/6b58ace4-142a-4304-808a-4bb111feaf5e_1756737167286.png";
import carLoanImage from "@assets/8d579826-9a79-414e-b44b-01376e0c0a16_1756737167287.png";
import educationLoanImage from "@assets/a17e6f9b-aaaf-4771-8201-1ded1c3666e9_1756737167287.png";

export default function HeroSection() {
  const scrollToLoans = () => {
    const element = document.getElementById("loans");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-[60vh] md:h-[70vh] min-h-[500px]">
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
                  src={homeLoanImage}
                  alt="Home Loan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-full w-full">
                <img 
                  src={carLoanImage}
                  alt="Car Loan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-full w-full">
                <img 
                  src={educationLoanImage}
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
        <div className="text-center text-white max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
            AB APNE SAPNE PURE KARNA HUA ASSAN
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 drop-shadow-lg">
            Ab sapnon ka ghar aayega aur bhi paas
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={scrollToLoans} 
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-xl font-bold rounded-lg transition-all duration-300 shadow-2xl border-2 border-white/30"
              data-testid="button-apply-now"
            >
              APPLY NOW
            </Button>
            <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/30">
              <Phone className="text-2xl" />
              <span className="text-xl font-bold">+919131703768</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
