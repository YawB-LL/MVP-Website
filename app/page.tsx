import { Hero } from "@/components/sections/hero"
import { CTASections } from "@/components/sections/cta-sections"
import { PainPoints } from "@/components/sections/pain-points"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Waitlist } from "@/components/sections/waitlist"
import { TalentPool } from "@/components/sections/talent-pool"
import { About } from "@/components/sections/about"
import { Trust } from "@/components/sections/trust"
import { Roadmap } from "@/components/sections/roadmap"
import { 
  DynamicBlog, 
  DynamicPress, 
  DynamicCareers, 
  DynamicContact, 
  DynamicFooter, 
  DynamicExitIntentPopup, 
  DynamicScrollProgress 
} from "@/lib/dynamic-imports"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <DynamicScrollProgress />
      <Hero />
      <CTASections />
      <PainPoints />
      <HowItWorks />
      <Waitlist />
      <TalentPool />
      <About />
      <Trust />
      <Roadmap />
      <DynamicBlog />
      <DynamicPress />
      <DynamicCareers />
      <DynamicContact />
      <DynamicFooter />
      <DynamicExitIntentPopup />
    </main>
  )
}
