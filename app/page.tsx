import { Hero } from "@/components/sections/hero"
import { PainPoints } from "@/components/sections/pain-points"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Developers } from "@/components/sections/developers"
import { EcosystemPartners } from "@/components/sections/ecosystem-partners"
import { Waitlist } from "@/components/sections/waitlist"
import { About } from "@/components/sections/about"
import { Trust } from "@/components/sections/trust"
import { Roadmap } from "@/components/sections/roadmap"
import { 
  DynamicFooter, 
  DynamicExitIntentPopup, 
  DynamicScrollProgress 
} from "@/lib/dynamic-imports"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <DynamicScrollProgress />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <Developers />
      <EcosystemPartners />
      <About />
      <Trust />
      <Roadmap />
      <DynamicFooter />
      <DynamicExitIntentPopup />
    </main>
  )
}
