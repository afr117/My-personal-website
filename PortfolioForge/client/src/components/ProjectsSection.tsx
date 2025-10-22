import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@shared/schema";

export function ProjectsSection() {
  const { data: projects, isLoading, isError, error, refetch } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    retry: 2,
  });

  return (
    <section id="projects" className="py-20 md:py-32 bg-card/30" data-testid="section-projects">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4" data-testid="text-projects-title">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-projects-subtitle">
            A selection of my recent work showcasing various technologies and solutions
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 rounded-lg bg-card animate-pulse"
                data-testid={`skeleton-project-${i}`}
              />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12" data-testid="error-projects">
            <p className="text-destructive mb-4">
              Failed to load projects. {error instanceof Error ? error.message : 'Please try again.'}
            </p>
            <button
              onClick={() => refetch()}
              className="text-primary hover:underline"
              data-testid="button-retry-projects"
            >
              Retry
            </button>
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12" data-testid="empty-projects">
            <p className="text-muted-foreground">No projects to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
