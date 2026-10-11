"use client";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/text";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { useTheme } from "@/contexts/theme-context";

const experiences = [
  {
    role: "Software Engineer",
    company: "NewagesysIT",
    location: "Kochi, India",
    period: "May 2024 – Present",
    bullets: [
      "Developed and enhanced multiple cross-platform mobile applications using React Native, focusing on performance, usability, and scalable architecture in an Agile environment.",
      "Collaborated with clients and cross-functional teams to gather requirements, contribute to solution design, and ensure timely delivery of high-quality applications.",
      "Built a real estate mobile application (SOLDDD) from scratch using React Native, enabling users to create, manage, and browse property listings with integrated real-time chat and Sendbird video calling.",
      "Implemented subscription-based advertising and agent onboarding features, establishing a monetization model and improving platform engagement.",
      "Integrated an AI-powered chatbot with voice and text capabilities to enhance property discovery and user interaction.",
      "Developed and deployed a travel booking platform (EASY VACAY) for the US market, allowing users to explore tour packages, view itineraries, and complete bookings with advance payments.",
      "Implemented secure onboarding and payment workflows, ensuring a seamless end-to-end booking experience for users and providers.",
      "Built and launched a nanny booking application (AUNTIE), connecting parents with verified childcare providers through profile browsing, real-time communication, and booking features.",
      "Enabled real-time chat and video communication, improving trust and interaction between users and service providers.",
    ],
  },
  {
    role: "Flutter Full-Stack Developer Intern",
    company: "Logix Space Technologies Pvt Ltd",
    location: "Kochi, India",
    period: "Feb 2024 – May 2024",
    bullets: [
      "Developed full-stack applications using Flutter, Node.js, Express, and MongoDB, contributing to scalable and maintainable product architecture.",
      "Promoted to Team Lead mid-project based on performance, taking ownership of task allocation, team coordination, and delivery timelines.",
      "Led end-to-end development of an event management platform, including admin panel, user application, and backend services.",
      "Designed and implemented core features such as event creation, scheduling, user onboarding, performance tracking, and booking workflows.",
      "Built and managed the admin application, enabling efficient control over events, users, and analytics.",
      "Streamlined development workflows and enforced structured frontend-backend integration, improving team efficiency and code quality.",
      "Researched and applied industry best practices, design patterns, and scalable architecture decisions to enhance application performance and maintainability.",
      "Actively contributed to planning, debugging, and release cycles, ensuring timely delivery of a production-ready product.",
    ],
  },
];

export function Experience() {
  const { theme } = useTheme();

  return (
    <section
      id="experience"
      className={`py-24 lg:py-32 border-t ${
        theme === "dark" ? "bg-black border-zinc-800/50" : "bg-white border-zinc-200/50"
      }`}
    >
      <Container>
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold mb-3 text-zinc-500">
            Career
          </p>
          <Heading className="mb-2">Work Experience</Heading>
        </FadeIn>

        <StaggerContainer className="flex flex-col gap-12">
          {experiences.map((exp) => (
            <StaggerItem key={exp.role}>
              <div
                className={`rounded-2xl border p-8 ${
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/40"
                    : "border-zinc-200 bg-zinc-50/60"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
                  <div>
                    <h3
                      className={`text-lg font-bold ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-0.5">
                      {exp.company} &mdash; {exp.location}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 self-start ${
                      theme === "dark"
                        ? "bg-zinc-800 text-zinc-400"
                        : "bg-zinc-200 text-zinc-600"
                    }`}
                  >
                    {exp.period}
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {exp.bullets.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm text-zinc-500 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
