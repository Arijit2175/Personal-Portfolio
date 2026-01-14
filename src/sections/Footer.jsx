import { mySocials } from "../constants";

const Footer = () => {
  return ( 
  <section className="flex flex-wrap items-center justify-between
  gap-5 pb-3 text-sm text-neutral-400 c-space">
    <div className="bg-gradient-to-r from-transparent via-neutral-700
    to-transparent mb-4 h-[1px] w-full" />
    <div className="flex gap-2">
        <p>Looking for a developer? Let's connect!</p>
      </div>
    <div className="flex gap-3">
        {mySocials.map((social, index) => (
          <a href={social.href} key={index}>
            <img src={social.icon} className="w-5 h-5" alt={social.name} />
          </a>
        ))}
      </div>
      <p>© 2025 Arijit Karmakar. All rights reserved.</p>
  </section>
  );
};

export default Footer