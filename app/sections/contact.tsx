"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
];

export function Contact() {
  const { theme } = useTheme();

  return (
    <section id="contact" className={`py-24 lg:py-32 border-t ${
      theme === 'dark' 
        ? 'bg-black border-zinc-800/50' 
        : 'bg-white border-zinc-200/50'
    }`}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <FadeIn>
              <Heading className="mb-6">Let&apos;s work together</Heading>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Text variant="muted" className="mb-8 max-w-md">
                Have a project in mind? I&apos;d love to hear about it. Let&apos;s
                discuss how we can bring your ideas to life.
              </Text>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Button href="mailto:hello@example.com" size="lg">
                <Mail className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </FadeIn>
          </div>

          <StaggerContainer className="space-y-4">
            {contactInfo.map((item) => (
              <StaggerItem key={item.label}>
                <Card className={`group ${
                  theme === 'dark' ? '' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'
                      }`}>
                        <item.icon className={`h-5 w-5 ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                        }`} />
                      </div>
                      <div>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'
                        }`}>{item.label}</p>
                        <p className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}>{item.value}</p>
                      </div>
                    </div>
                    <ArrowUpRight className={`h-5 w-5 transition-colors ${
                      theme === 'dark' 
                        ? 'text-zinc-600 group-hover:text-white' 
                        : 'text-zinc-400 group-hover:text-black'
                    }`} />
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
