import { myProjects } from "../constants";

const Projects = () => {
  return <section className="relative c-space section-spacing">
    <h2 className="text-heading">My Selected Projects</h2>
    <div className="bg-gradient-to-r from-transparent 
    via-neutral-700 to-transparent mt-12 h-[1-px] w-full"/>
    {myProjects.map((project) => ())}
  </section>
}

export default Projects