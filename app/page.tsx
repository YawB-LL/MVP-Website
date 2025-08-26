import { Hero } from "@/components/sections/hero"
import { PainPoints } from "@/components/sections/pain-points"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Waitlist } from "@/components/sections/waitlist"
import { TalentPool } from "@/components/sections/talent-pool"
import { About } from "@/components/sections/about"
import { Trust } from "@/components/sections/trust"
import { Roadmap } from "@/components/sections/roadmap"
import { Blog } from "@/components/sections/blog"
import { Press } from "@/components/sections/press"
import { Careers } from "@/components/sections/careers"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { ExitIntentPopup } from "@/components/ui/exit-intent-popup"
import { ScrollProgress } from "@/components/ui/scroll-progress"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <Waitlist />
      <TalentPool />
      <About />
      <Trust />
      <Roadmap />
      <Blog />
      <Press />
      <Careers />
      <Contact />
      <Footer />
      <ExitIntentPopup />
    </main>
  )
}
