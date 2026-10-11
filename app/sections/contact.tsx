"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { Mail, Phone, ArrowUpRight, Linkedin, Github } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "jeffinmjtcr@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=jeffinmjtcr@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9567110457",
    href: "tel:+919567110457",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "jeffin-jose-v",
    href: "https://www.linkedin.com/in/jeffin-jose-v-67610a19b/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "jeff1999git",
    href: "https://github.com/jeff1999git",
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
              <Button href="https://mail.google.com/mail/?view=cm&fs=1&to=jeffinmjtcr@gmail.com" size="lg" target="_blank" rel="noopener noreferrer">
                <Mail className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </FadeIn>
          </div>

          <StaggerContainer className="space-y-4">
            {contactInfo.map((item) => (
              <StaggerItem key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block rounded-xl"
                >
                  <Card className={`group transition-all duration-200 hover:scale-[1.02] ${
                    theme === 'dark'
                      ? 'hover:bg-zinc-900/40 hover:border-zinc-700'
                      : 'hover:bg-zinc-100 hover:border-zinc-300'
                  } ${
                    theme === 'dark' ? '' : 'bg-zinc-50 border-zinc-200'
                  }`} hover={false}>
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
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
