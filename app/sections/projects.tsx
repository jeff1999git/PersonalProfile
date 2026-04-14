"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { ExternalLink, Github } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with real-time inventory and seamless checkout experience.",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative task management with real-time updates and team workflow automation.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Data visualization platform with customizable widgets and export capabilities.",
    tags: ["Next.js", "D3.js", "PostgreSQL", "Redis"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Social Media API",
    description: "RESTful API service with authentication, rate limiting, and comprehensive documentation.",
    tags: ["Express", "TypeScript", "JWT", "Swagger"],
    liveUrl: "#",
    repoUrl: "#",
  },
];

export function Projects() {
  const { theme } = useTheme();

  return (
    <section id="projects" className={`py-24 lg:py-32 border-t ${
      theme === 'dark' ? 'border-zinc-800/50' : 'border-zinc-200/50'
    }`}>
      <Container>
        <FadeIn className="text-center mb-16">
          <Heading className="mb-4">Featured Projects</Heading>
          <p className={`max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            A selection of projects that showcase my expertise in building
            scalable, user-friendly applications.
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <Card className={`h-full flex flex-col ${
                theme === 'dark' ? '' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-xs rounded-full ${
                          theme === 'dark' 
                            ? 'bg-zinc-800 text-zinc-300' 
                            : 'bg-zinc-200 text-zinc-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button
                      href={project.liveUrl}
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button
                      href={project.repoUrl}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
