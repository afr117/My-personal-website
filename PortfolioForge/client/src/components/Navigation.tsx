import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Plus } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [location, navigate] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glassmorphism shadow-lg" : "bg-transparent"
        }`}
        data-testid="navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => scrollToSection("#home")}
              className="text-2xl font-display font-bold gradient-text hover-elevate active-elevate-2 rounded-md px-3 py-2"
              data-testid="button-logo"
            >
              Portfolio
            </button>

            <div className="hidden md:flex items-center gap-8">
              {isHomePage && navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                variant="ghost"
                onClick={() => navigate(isHomePage ? "/admin" : "/")}
                className="gap-2"
                data-testid="button-nav-admin"
              >
                {isHomePage ? (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Project
                  </>
                ) : (
                  "Home"
                )}
              </Button>
              <div className="flex items-center gap-3 ml-4">
                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  data-testid="button-linkedin"
                >
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  data-testid="button-github"
                >
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden glassmorphism"
          style={{ marginTop: "80px" }}
          data-testid="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col items-center gap-6 pt-12 px-6">
            {isHomePage && navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-xl font-medium text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
                data-testid={`link-mobile-${item.label.toLowerCase()}`}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                autoFocus={index === 0}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                navigate(isHomePage ? "/admin" : "/");
                setIsMobileMenuOpen(false);
              }}
              className="text-xl font-medium text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
              data-testid="link-mobile-admin"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              {isHomePage ? "Add Project" : "Home"}
            </button>
            <div className="flex items-center gap-4 mt-6">
              <Button size="icon" variant="ghost" asChild data-testid="button-mobile-linkedin">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild data-testid="button-mobile-github">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
