import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Apps } from "@/components/apps"
import { Arcade } from "@/components/arcade"
import { Newsletter } from "@/components/newsletter"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Apps />
        <Arcade />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
