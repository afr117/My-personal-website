import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Code2, Database, Globe, Smartphone } from "lucide-react";

const skills = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Machine Learning", category: "AI/ML" },
  { name: "REST APIs", category: "Backend" },
];

const expertise = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Building responsive, performant web applications with modern frameworks and best practices.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Creating intuitive mobile experiences with cross-platform technologies.",
  },
  {
    icon: Database,
    title: "Backend Systems",
    description: "Designing scalable server architectures and efficient database solutions.",
  },
  {
    icon: Code2,
    title: "AI Integration",
    description: "Implementing intelligent features using machine learning and AI technologies.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="text-about-title">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-about-subtitle">
            Passionate about building meaningful products that solve real problems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-display font-semibold mb-4" data-testid="text-bio-heading">
              Hi, I'm a Software Developer
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed" data-testid="text-bio-p1">
              With a passion for creating elegant solutions to complex problems, I specialize in
              full-stack development with a focus on user experience and performance. I believe in
              writing clean, maintainable code and staying current with emerging technologies.
            </p>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-bio-p2">
              Whether it's building scalable web applications, integrating AI capabilities, or
              optimizing system architectures, I approach each project with curiosity and dedication
              to excellence.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-display font-semibold mb-4" data-testid="text-skills-heading">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill.name}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                  data-testid={`badge-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertise.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="p-6 hover-elevate active-elevate-2 transition-all duration-300 hover:-translate-y-2"
                data-testid={`card-expertise-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h4 className="text-lg font-display font-semibold mb-2" data-testid={`text-expertise-title-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground" data-testid={`text-expertise-desc-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
