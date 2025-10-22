import { type Project, type InsertProject } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: InsertProject): Promise<Project>;
  deleteProject(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private projects: Project[];

  constructor() {
    this.projects = [
      {
        id: "1",
        title: "Analytics Dashboard",
        description: "A comprehensive analytics platform featuring real-time data visualization, custom reporting tools, and advanced filtering capabilities. Built with React, TypeScript, and D3.js for interactive charts.",
        image: "/attached_assets/generated_images/Web_dashboard_project_mockup_06c541d1.png",
        technologies: ["React", "TypeScript", "D3.js", "Tailwind CSS", "Node.js"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        featured: "true",
      },
      {
        id: "2",
        title: "E-Commerce Mobile App",
        description: "Full-featured shopping application with product browsing, cart management, secure checkout, and order tracking. Includes push notifications and offline support for enhanced user experience.",
        image: "/attached_assets/generated_images/Mobile_app_project_mockup_d4e2c4f3.png",
        technologies: ["React Native", "Redux", "Firebase", "Stripe"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        featured: "true",
      },
      {
        id: "3",
        title: "AI Content Generator",
        description: "Machine learning powered tool for generating creative content, utilizing natural language processing and GPT models. Features customizable templates, multi-language support, and export options.",
        image: "/attached_assets/generated_images/AI_project_visualization_be55ccb9.png",
        technologies: ["Python", "TensorFlow", "FastAPI", "React", "OpenAI"],
        githubUrl: "https://github.com",
        liveUrl: null,
        featured: "true",
      },
      {
        id: "4",
        title: "Project Management System",
        description: "Collaborative workspace for teams to plan, track, and deliver projects efficiently. Includes Kanban boards, Gantt charts, time tracking, and real-time collaboration features.",
        image: "/attached_assets/generated_images/Developer_workspace_hero_image_979b09e4.png",
        technologies: ["Next.js", "PostgreSQL", "Prisma", "WebSockets"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        featured: "false",
      },
      {
        id: "5",
        title: "Social Media Analytics",
        description: "Powerful analytics tool for tracking social media performance across multiple platforms. Features sentiment analysis, trend detection, and automated reporting with beautiful visualizations.",
        image: "/attached_assets/generated_images/Web_dashboard_project_mockup_06c541d1.png",
        technologies: ["Vue.js", "Python", "MongoDB", "Chart.js"],
        githubUrl: "https://github.com",
        liveUrl: null,
        featured: "false",
      },
      {
        id: "6",
        title: "Smart Home Controller",
        description: "IoT platform for controlling and automating smart home devices. Includes voice control integration, custom automation rules, energy monitoring, and mobile companion app.",
        image: "/attached_assets/generated_images/Mobile_app_project_mockup_d4e2c4f3.png",
        technologies: ["React", "Node.js", "MQTT", "Raspberry Pi"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        featured: "false",
      },
    ];
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return this.projects.filter((p) => p.featured === "true");
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id,
      githubUrl: insertProject.githubUrl || null,
      liveUrl: insertProject.liveUrl || null,
      featured: insertProject.featured || "false",
    };
    this.projects.push(project);
    return project;
  }

  async updateProject(id: string, insertProject: InsertProject): Promise<Project> {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }
    
    const updatedProject: Project = {
      ...insertProject,
      id,
      githubUrl: insertProject.githubUrl || null,
      liveUrl: insertProject.liveUrl || null,
      featured: insertProject.featured || "false",
    };
    
    this.projects[index] = updatedProject;
    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }
    this.projects.splice(index, 1);
  }
}

export const storage = new MemStorage();
