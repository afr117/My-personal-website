import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 hover:-translate-y-2 group"
      data-testid={`card-project-${project.id}`}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          data-testid={`img-project-${project.id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader>
        <h3 className="text-2xl font-display font-semibold mb-2" data-testid={`text-project-title-${project.id}`}>
          {project.title}
        </h3>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`text-project-desc-${project.id}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs"
              data-testid={`badge-tech-${tech.toLowerCase()}-${project.id}`}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2 flex-wrap">
        {project.githubUrl && (
          <Button
            variant="outline"
            size="sm"
            asChild
            data-testid={`button-github-${project.id}`}
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
        )}
        {project.liveUrl && (
          <Button
            size="sm"
            asChild
            data-testid={`button-demo-${project.id}`}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
