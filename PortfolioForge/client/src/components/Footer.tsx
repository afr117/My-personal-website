import { FaLinkedin, FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
              aria-label="LinkedIn"
              data-testid="link-footer-linkedin"
            >
              <FaLinkedin className="w-8 h-8" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
              aria-label="GitHub"
              data-testid="link-footer-github"
            >
              <FaGithub className="w-8 h-8" />
            </a>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-2" data-testid="text-tagline">
              Built with passion and modern web technologies
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
