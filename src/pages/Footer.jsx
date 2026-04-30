import { motion } from "framer-motion";
import logoImg from "../assets/logo.icon.png";

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
      className="relative pt-32 pb-10 bg-[#030303] overflow-hidden"
    >
      {/* 1. Efeito de Gradiente no Topo (Dá vida e profundidade) */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-50 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* 2. Texto Gigante de Fundo (Estilo image_cec418) */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.10]">
        <h2 className="text-[25vw] font-bold text-white tracking-tighter leading-none">
          DEEPIN
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20 -mt-20">

       <div className="lg:col-span-2 flex flex-col gap-0 -mt-6">
  {/* Conteiner da Logo: Controla o tamanho sem afastar o texto do ícone */}
  <div className="relative w-full max-w-60 md:max-w-62.5 lg:max-w-55">
    <img 
      src="/src/assets/logo.png" 
      alt="Deepin AI Logo" 
      className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]"
    />
  </div>
  <p className="text-slate-500 mt-4 text-sm font-medium">

  </p>

</div>
          {/* Colunas de Links (Facilidade de leitura: Branco/Cinza) */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">{title}</h4>
              <ul className="space-y-4">
                {items.map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-500 hover:text-purple-400 transition-colors duration-300 text-sm font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Base com Social (Cores vivas e Glow) */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            <p className="text-slate-500 text-[11px] font-mono tracking-widest uppercase">
              System Operational • © 2026 DEEPIN
            </p>
          </div>

          <div className="flex gap-4">
            {Object.entries(icons).map(([name, svg]) => (
              <a
                key={name}
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 group"
              >
                <div className="group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
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