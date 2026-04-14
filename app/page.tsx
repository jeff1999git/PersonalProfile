import { Hero } from "@/app/sections/hero";
import { About } from "@/app/sections/about";
import { Projects } from "@/app/sections/projects";
import { Contact } from "@/app/sections/contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <div className="w-full border-t border-zinc-800/50" />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
