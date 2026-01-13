import HeroText from "../components/HeroText"
import ParallaxBackground from "../components/ParallaxBackground"

const Hero = () => {
  return <section className="flex items-start 
  justify-center md:items-start md:justify-start 
  min-h-screen overflow-hidden c-space">
    <HeroText />
    <ParallaxBackground />
    <figure className="absolute inset-0" style={{width: "100vw", height: "100vh"}}>

    </figure>
    </section>
}

export default Hero