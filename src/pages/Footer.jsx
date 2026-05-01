import { motion } from "framer-motion";
import logoImg from "../assets/logo.png";

function Footer() {
  const links = {
    Product: ["Overview", "Features", "Pricing", "Integrations"],
    Company: ["About", "Careers", "Blog", "Contact"],
    Legal: ["Terms", "Privacy", "Cookies", "Security"],
  };

  // SVGs diretos para evitar erro de importação do Lucide
  const icons = {
    Twitter: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>,
    Instagram: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
    Linkedin: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="relative pt-32 pb-10 bg-[#030303] overflow-hidden w-full"
    >

      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="absolute -bottom-4 lg:-bottom-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-0">
        <h2 className="text-[26vw] lg:text-[18rem] font-black text-white/6 tracking-tighter leading-none select-none">
          DEEPIN
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-10 -mt-12">

          <div className="lg:col-span-2 flex flex-col md:items-start gap-3 items-center text-center lg:text-left -mt-5">
            <img
              src={logoImg} // Variável de importação da imagem
              alt="Deepin AI"
              className="h-20 md:ml-0 -ml-20 md:h-16 lg:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
            />
            <p className="text-slate-500 text-sm leading-relaxed max-w-full">
              Empowering modern enterprises with autonomous AI agents and deep data intelligence.
              Built for the next era of business.
            </p>
          </div>

          {/* Colunas de Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="flex flex-col gap-6">
              <h4 className="text-white text-xs font-black uppercase tracking-[0.2em]">{title}</h4>
              <ul className="flex flex-col gap-4">
                {items.map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-500 hover:text-purple-400 transition-all duration-300 text-sm font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Base do Footer */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            <p className="text-slate-600 text-[10px] font-mono tracking-[0.2em] uppercase">
              2026 DEEPIN AI • GABRIELLYLEITEDEV
            </p>

          </div>

          <div className="flex gap-4">
            {Object.entries(icons).map(([name, svg]) => (
              <a
                key={name}
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-500 group"
              >
                <div className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-transform">
                  {svg}
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