"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/text";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { Code2, Palette, Zap, Globe } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "20+", label: "Happy Clients" },
  { value: "100%", label: "Satisfaction Rate" },
];

const services = [
  {
    icon: Code2,
    title: "Development",
    description: "Building robust applications with clean, maintainable code using modern frameworks.",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Creating beautiful, intuitive interfaces that delight users and drive engagement.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing for speed and scalability to ensure smooth user experiences.",
  },
  {
    icon: Globe,
    title: "SEO",
    description: "Implementing best practices for search visibility and organic growth.",
  },
];

export function About() {
  const { theme } = useTheme();

  return (
    <section id="about" className={`py-24 lg:py-32 border-t ${
      theme === 'dark' 
        ? 'bg-black border-zinc-800/50' 
        : 'bg-white border-zinc-200/50'
    }`}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <Heading className="mb-6">About Me</Heading>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Text variant="muted" className="mb-6">
                I&apos;m a passionate developer with a keen eye for design and a
                commitment to crafting exceptional digital experiences. With
                expertise spanning frontend and backend technologies, I bring
                ideas to life with precision and creativity.
              </Text>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Text variant="muted">
                My approach combines technical excellence with user-centered
                design principles, ensuring every project not only meets but
                exceeds expectations.
              </Text>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className={`text-center p-4 rounded-lg border ${
                    theme === 'dark' 
                      ? 'border-zinc-800 bg-zinc-900/30' 
                      : 'border-zinc-300 bg-zinc-100/50'
                  }`}>
                    <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      {stat.value}
                    </div>
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'
                    }`}>{stat.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 gap-4">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <Card className={`h-full ${
                  theme === 'dark' ? '' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <service.icon className={`h-8 w-8 mb-4 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`} />
                  <CardContent className="p-0">
                    <h3 className={`font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                    }`}>
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
