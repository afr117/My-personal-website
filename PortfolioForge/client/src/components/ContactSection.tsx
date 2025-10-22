import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Mail, MessageSquare } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32" data-testid="section-contact">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="text-contact-title">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-subtitle">
            I'm always interested in hearing about new opportunities, collaborations, or just having a chat about technology
          </p>
        </div>

        <Card className="p-8 md:p-12 glassmorphism">
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4" data-testid="contact-email">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Email</h3>
                <a
                  href="mailto:contact@example.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-email"
                >
                  contact@example.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4" data-testid="contact-message">
              <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-chart-2" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Let's Talk</h3>
                <p className="text-muted-foreground">
                  Open to freelance opportunities
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="font-display font-semibold text-center mb-6" data-testid="text-social-heading">
              Connect with me on
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2"
                data-testid="button-contact-linkedin"
              >
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2"
                data-testid="button-contact-github"
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-5 h-5" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
