import Nav from './components/Nav'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Costs from './components/Costs'
import CaseStudies from './components/CaseStudies'
import Method from './components/Method'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problems />
        <Costs />
        <CaseStudies />
        <Method />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
