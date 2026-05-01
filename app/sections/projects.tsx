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
    liveUrl: "https://staging.sooldd.com/",
    repoUrl: "#",
  },
  {
    title: "EASY VACAY",
    description: "Developed a travel booking platform with itinerary browsing, payment integration, and seamless user onboarding.",
    tags: ["React Native", "Stripe", "Social Auth"],
    company: "NewagesysIT",
    liveUrl: "https://easyvacayplanner.com/",
    repoUrl: "#",
  },
  {
    title: "AUNTIE",
    description: "Created a platform connecting parents with verified caregivers, featuring real-time chat and booking system.",
    tags: ["React Native", "Socket.io", "Swagger"],
    company: "NewagesysIT",
    liveUrl: "https://www.auntie-app.com/",
    repoUrl: "#",
  },
  {
    title: "EVENT APP",
    description: "Full-stack event management platform with admin and user apps, supporting event creation, scheduling, and booking.",
    tags: ["Flutter", "Node.js", "SQL", "Express"],
    company: "Logix Space Technologies Pvt Ltd",
    liveUrl: "#",
    repoUrl: "#",
  },
];

const coreProducts = [
  {
    title: "NoWaitr",
    description: "Built and deployed a QR-based restaurant ordering system enabling customers to browse menus and place orders seamlessly, while providing real-time order management for restaurant staff.",
    tags: ["ImageKit", "QRCode.react", "Resend API"],
    liveUrl: "#",
    repoUrl: "https://github.com/jeff1999git/NoWaitr",
  },
  {
    title: "BookNGo",
    description: "Built a booking platform that connects customers with local businesses for various services. It enables users to browse services, make bookings, and manage appointments while allowing business owners to list their services and handle bookings.",
    tags: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "https://bookngo-one.vercel.app/",
    repoUrl: "https://github.com/jeff1999git/Bookngo",
  },
  {
    title: "JVS Water Supply",
    description: "Water supply management system that enables admins to manage drivers, vehicles, and supply points while allowing drivers to log water deliveries and cash transactions in real-time.",
    tags: ["TailwindCSS", "Turborepo", "MongoDB"],
    liveUrl: "https://jv-swatersupply-web.vercel.app/",
    repoUrl: "https://github.com/jeff1999git/JVSwatersupply",
  },
  {
    title: "DD Ammini",
    description: "Built a lightweight apartment management web app for family, cleaning, and sticky-note tracking. It serves as a digital assistant for apartment residents to manage daily operations and communication.",
    tags: ["Next.js", "Node.js", "Vercel"],
    liveUrl: "https://dd-aminni.vercel.app/",
    repoUrl: "https://github.com/jeff1999git/DDAminni",
  },
];

const otherProjects = [
  {
    title: "Ulsaaham",
    description: "Event management and ticketing platform for local community events.",
    tags: ["React", "Node.js"],
    liveUrl: "https://ulsaaham.com/",
    repoUrl: "https://github.com/jeff1999git/ulsaaham.com",
  },
  {
    title: "Flavory",
    description: "A recipe discovery and meal planning app with curated food content.",
    tags: ["React Native", "Firebase"],
    liveUrl: "https://flavory-nu.vercel.app/",
    repoUrl: "https://github.com/jeff1999git/Flavory",
  },
  {
    title: "Seffer Exports",
    description: "Business website and product catalogue for an export company.",
    tags: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://seffer-exports.vercel.app/",
    repoUrl: "https://github.com/jeff1999git/SefferExports",
  },
];

function ProjectCard({
  project,
  showRepo = true,
}: {
  project: { title: string; description: string; tags: string[]; liveUrl: string; repoUrl: string; company?: string };
  showRepo?: boolean;
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
          {project.liveUrl !== "#" && (
            <Button href={project.liveUrl} variant="secondary" size="sm" className="flex-1" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Live URL
            </Button>
          )}
          {showRepo && project.repoUrl !== "#" && (
            <Button href={project.repoUrl} variant="outline" size="sm" className="flex-1" target="_blank" rel="noopener noreferrer">
              <Code2 className="h-4 w-4 mr-2" />
              Code
            </Button>
          )}
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
              <ProjectCard project={project} showRepo={false} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Core Products */}
        <FadeIn className="mb-6">
          <h3 className={`text-xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-black"}`}>
            Independent Works
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
            Company Dashboards
          </h3>
          <p className="text-sm text-zinc-500">Dashboards &amp; landing Pages</p>
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
