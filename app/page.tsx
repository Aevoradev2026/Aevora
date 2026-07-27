import Nav from '@/components/Nav'
import GalaxyHero from '@/components/GalaxyHero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Consult from '@/components/Consult'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

// Portfolio section removed per client request

export default function Home() {
  return (
    <main className="bg-black">
      <Nav />
      <GalaxyHero />
      <Services />
      <Process />
      <Consult />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
