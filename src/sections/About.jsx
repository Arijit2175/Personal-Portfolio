const About = () => {
  return (
    <section className="c-space section-spacing">
        <h2 className="text-heading">About Me</h2>
        <div className="grid grid-cols-1 gap-4  md:grid-cols-6 md:auto-rows-[18rem] mt-12">
            {/* Grid 1 */}
            <div className="flex items-end grid-default-color grid-1"></div>
            {/* Grid 2 */}
            <div className="grid-default-color grid-2"></div>
            {/* Grid 3 */}
            <div className="grid-black-color grid-3"></div>
            {/* Grid 4 */}
            <div className="grid-special-color grid-4"></div>
            {/* Grid 5 */}
            <div className="grid-default-color grid-5"></div>
        </div>
    </section>
  )
}

export default About