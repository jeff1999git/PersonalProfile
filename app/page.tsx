import { Hero } from "@/app/sections/hero";
import { Projects } from "@/app/sections/projects";
import { Contact } from "@/app/sections/contact";
import { ThemeSeparator } from "@/components/theme-separator";

export default function Home() {
  return (
    <div className="flex-1">
      <Hero />
      <ThemeSeparator />
      <Projects />
      <Contact />
    </div>
  );
}
