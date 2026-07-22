import { motion } from "framer-motion";
import logoImg from "../assets/logo.png";

function Footer() {
  const links = {
    Product: ["Overview", "Features", "Pricing", "Integrations"],
    Company: ["About", "Careers", "Blog", "Contact"],
    Legal: ["Terms", "Privacy", "Cookies", "Security"],
  };

  const icons = [
    {
      name: "Github",
      url: "https://github.com/gabriellyleitedev",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.39c.6.11.82-.26.82-.58 
          0-.29-.01-1.07-.02-2.1-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75
          -1.1-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.31 
          3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 
          0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 
          0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 
          3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 
          1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22 
          0 1.6-.02 2.88-.02 3.27 0 .32.21.7.83.58A12.01 12.01 0 0024 
          12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/gabriellyleite-dev",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 
          5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 
          0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 
          1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 
          0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative pt-28 pb-12 bg-[#030303] overflow-hidden"
    >

      {/* linha glow topo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* background gigante */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-0">
        <h2 className="text-[26vw] lg:text-[16rem] font-black text-white/[0.05] tracking-tighter leading-none select-none">
          DEEPIN
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* BRAND */}
          <div className="lg:col-span-2 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
            <img
              src={logoImg}
              alt="Deepin AI"
              className="h-16 w-auto -ml-10 object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
            />

            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              Stop losing leads. Deepin replies instantly, qualifies your customers,
              and helps you close more deals automatically.
            </p>
          </div>

          {/* LINKS */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="flex flex-col gap-5 items-center lg:items-start text-center lg:text-left">
              <h4 className="text-white text-xs font-black uppercase tracking-[0.2em]">
                {title}
              </h4>

              <ul className="flex flex-col gap-3">
                {items.map((link, i) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href="#"
                      className="text-slate-500 hover:text-purple-400 text-sm transition-all duration-300 relative group"
                    >
                      {link}
                      <span className="absolute left-0 -bottom-1 w-0 h-px bg-purple-400 transition-all group-hover:w-full"></span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* BASE */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">

          {/* status */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_#22c55e]" />
            <p className="text-slate-600 text-[11px] font-mono tracking-[0.2em] uppercase">
              2026 DEEPIN AI • Built for high-conversion businesses
            </p>
          </div>

          {/* socials */}
          <div className="flex gap-4">
            {icons.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-500 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10"
              >

                {/* glow hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md bg-purple-500/20"></div>

                <div className="relative z-10 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

              </a>
            ))}
          </div>

        </div>

      </div>
    </motion.footer>
  );
}

export default Footer;