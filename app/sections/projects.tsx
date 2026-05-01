"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { ExternalLink, Code2 } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

const professionalProjects = [
  {
    title: "SOOLDD",
    description: "Built a real estate platform with property listings, Sendbird-powered video calling, in-app subscriptions, and AI chatbot integration.",
    tags: ["React Native", "Sendbird", "In-App Subscription"],
    company: "NewagesysIT",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "EASY VACAY",
    description: "Developed a travel booking platform with itinerary browsing, payment integration, and seamless user onboarding.",
    tags: ["React Native", "Stripe", "Social Auth"],
    company: "NewagesysIT",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "AUNTIE",
    description: "Created a platform connecting parents with verified caregivers, featuring real-time chat and booking system.",
    tags: ["React Native", "Socket.io", "Swagger"],
    company: "NewagesysIT",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "EVENT APP",
    description: "Full-stack event management platform with admin and user apps, supporting event creation, scheduling, and booking.",
    tags: ["Flutter", "Node.js", "SQL"],
    company: "Logix Space Technologies Pvt Ltd",
    liveUrl: "#",
    repoUrl: "#",
  },
];

const coreProducts = [
  {
    title: "NoWaitr",
    description: "A queue management and restaurant ordering system to eliminate wait times.",
    tags: ["React Native", "Node.js", "MongoDB"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "BookNGo",
    description: "A booking platform for services and appointments with real-time availability.",
    tags: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "JVS Water Supply",
    description: "Water supply management system with order tracking and delivery scheduling.",
    tags: ["React Native", "Node.js", "MongoDB"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "DD Ammini",
    description: "A digital storefront for a local business with inventory and order management.",
    tags: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    repoUrl: "#",
  },
];

const otherProjects = [
  {
    title: "Ulsaaham",
    description: "Event management and ticketing platform for local community events.",
    tags: ["React", "Node.js"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Flavory",
    description: "A recipe discovery and meal planning app with curated food content.",
    tags: ["React Native", "Firebase"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Seffer Exports",
    description: "Business website and product catalogue for an export company.",
    tags: ["Next.js", "Tailwind CSS"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "DD Ammini Dashboard",
    description: "Admin dashboard for managing orders, inventory and analytics for DD Ammini.",
    tags: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    repoUrl: "#",
  },
];

function ProjectCard({
  project,
}: {
  project: { title: string; description: string; tags: string[]; liveUrl: string; repoUrl: string; company?: string };
}) {
  const { theme } = useTheme();
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{project.title}</CardTitle>
          {project.company && (
            <span className="text-xs text-zinc-500 shrink-0 pt-0.5">{project.company}</span>
          )}
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 text-xs rounded-full ${
                theme === "dark"
                  ? "bg-zinc-800 text-zinc-300"
                  : "bg-zinc-200 text-zinc-700"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-auto">
          <Button href={project.liveUrl} variant="secondary" size="sm" className="flex-1">
            <ExternalLink className="h-4 w-4 mr-2" />
            Live Demo
          </Button>
          <Button href={project.repoUrl} variant="outline" size="sm" className="flex-1">
            <Code2 className="h-4 w-4 mr-2" />
            Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Projects() {
  const { theme } = useTheme();

  return (
    <section
      id="projects"
      className={`py-24 lg:py-32 border-t ${
        theme === "dark" ? "border-zinc-800/50" : "border-zinc-200/50"
      }`}
    >
      <Container>
        {/* Professional Work */}
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold mb-3 text-zinc-500">
            Portfolio
          </p>
          <Heading className="mb-2">Work &amp; Projects</Heading>
        </FadeIn>

        <FadeIn className="mb-6">
          <h3 className={`text-xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-black"}`}>
            Professional Work
          </h3>
          <p className="text-sm text-zinc-500">Client &amp; company projects</p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-20">
          {professionalProjects.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Core Products */}
        <FadeIn className="mb-6">
          <h3 className={`text-xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-black"}`}>
            Core Products
          </h3>
          <p className="text-sm text-zinc-500">Independent products &amp; apps</p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-20">
          {coreProducts.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Other Projects */}
        <FadeIn className="mb-6">
          <h3 className={`text-xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-black"}`}>
            Other Projects
          </h3>
          <p className="text-sm text-zinc-500">Dashboards &amp; side builds</p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
