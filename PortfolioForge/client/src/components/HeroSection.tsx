import { Button } from "@/components/ui/button";
import { ChevronDown, Mail } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in" data-testid="text-hero-title">
          <span className="gradient-text">Software Developer</span>
          <br />
          <span className="text-foreground">& Creative Engineer</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }} data-testid="text-hero-subtitle">
          Crafting innovative solutions through elegant code and thoughtful design.
          Specialized in web development, AI integration, and scalable applications.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in flex-wrap" style={{ animationDelay: "0.4s" }}>
          <Button
            size="lg"
            onClick={() => scrollToSection("#projects")}
            className="animate-glow"
            data-testid="button-view-work"
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("#contact")}
            data-testid="button-get-in-touch"
          >
            <Mail className="w-4 h-4 mr-2" />
            Get in Touch
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
            data-testid="link-hero-linkedin"
          >
            <FaLinkedin className="w-8 h-8" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
            data-testid="link-hero-github"
          >
            <FaGithub className="w-8 h-8" />
          </a>
        </div>

        <button
          onClick={() => scrollToSection("#about")}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
          aria-label="Scroll down"
          data-testid="button-scroll-down"
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </button>
      </div>
    </section>
  );
}
