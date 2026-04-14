import { Hero } from "@/app/sections/hero";
import { About } from "@/app/sections/about";
import { Projects } from "@/app/sections/projects";
import { Contact } from "@/app/sections/contact";
import { ThemeSeparator } from "@/components/theme-separator";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ThemeSeparator />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
