import React from 'react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center px-6 pb-32 pt-24 overflow-x-hidden">
      
      {/* SPATIAL NAVIGATION */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-full px-8 py-3 flex items-center gap-8 shadow-2xl"
        >
          <span className="font-extrabold text-xl tracking-tighter text-[#1d1d1f]">UPI</span>
          <div className="hidden md:flex gap-6 text-[13px] font-semibold text-[#1d1d1f]/70">
            <a href="#" className="hover:text-[#007AFF] transition-colors">Features</a>
            <a href="#" className="hover:text-[#007AFF] transition-colors">Safety</a>
            <a href="#" className="hover:text-[#007AFF] transition-colors">Progress</a>
          </div>
          <button className="bg-[#1d1d1f]/5 px-5 py-1.5 rounded-full text-[12px] font-bold text-[#1d1d1f] hover:bg-white/40 transition-all">
            Join
          </button>
        </motion.div>
      </nav>

      {/* HERO SECTION */}
      <section className="w-full max-w-4xl text-center flex flex-col items-center pt-12">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-extrabold text-[#1d1d1f] leading-[1.1] tracking-tight text-balance mb-6"
        >
          See Your City <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-[#5856D6]">Clearly.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl font-medium text-[#1d1d1f]/60 max-w-xl text-balance mb-16"
        >
          Report issues in seconds. We ensures what matters gets fixed first. Your vision for a better Malaysia starts here.
        </motion.p>

        {/* SPATIAL DEMO VISUAL */}
        <div className="relative w-full max-w-2xl h-[400px] md:h-[500px] flex items-center justify-center perspective-1000 mb-20">
          {/* Back Layer (Map) */}
          <motion.div 
            initial={{ z: -100, opacity: 0, scale: 0.8 }}
            animate={{ z: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="absolute glass w-[90%] md:w-full h-full rounded-[40px] opacity-60 shadow-inner overflow-hidden border border-white/40"
          >
             {/* Abstract Map UI */}
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-full h-full grid grid-cols-12 grid-rows-12 gap-2 p-10 rotate-12">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div key={i} className="border border-black/10 rounded-sm"></div>
                  ))}
                </div>
             </div>
          </motion.div>

          {/* Front Layer (Device/Card) */}
          <motion.div 
            initial={{ y: 50, opacity: 0, rotateX: 20 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative glass-dark w-[280px] h-[450px] md:w-[320px] md:h-[520px] rounded-[48px] shadow-2xl p-6 border border-white/50 flex flex-col items-center animate-float z-10"
          >
            <div className="w-24 h-6 bg-black/5 rounded-full mb-8"></div>
            <div className="w-full flex-1 bg-white/10 rounded-[32px] border border-white/20 p-4 overflow-hidden relative">
               <div className="flex flex-col gap-4">
                  <div className="w-full h-32 bg-white/20 rounded-2xl animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-white/20 rounded-full"></div>
                  <div className="h-4 w-1/2 bg-white/10 rounded-full"></div>
               </div>
               {/* Glowing Location Pin Hologram */}
               <motion.div 
                 animate={{ y: [-10, 10, -10] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
               >
                 <div className="w-16 h-16 bg-[#007AFF] rounded-full blur-2xl opacity-40"></div>
                 <div className="w-8 h-8 bg-white glass rounded-full shadow-2xl flex items-center justify-center absolute border border-white/80">
                   <div className="w-2 h-2 bg-[#007AFF] rounded-full"></div>
                 </div>
               </motion.div>
            </div>
          </motion.div>

          {/* Floating HUD Items */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute -right-4 md:-right-12 top-1/4 glass px-5 py-3 rounded-2xl shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-[11px] font-bold text-[#1d1d1f]/70 uppercase tracking-widest">Fixed: Setapak Node</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute -left-4 md:-left-12 bottom-1/4 glass px-5 py-3 rounded-2xl shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-[#1d1d1f]/70 uppercase tracking-widest">Risk Level: Low</span>
              <div className="flex gap-1">
                 <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                 <div className="w-1 h-3 bg-blue-300 rounded-full"></div>
                 <div className="w-1 h-3 bg-blue-100 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUE PROPS (GLASS STACK) */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { 
            icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z", 
            title: "Snap & Send", 
            desc: "No forms. Just a photo and automatic location tagging." 
          },
          { 
            icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z", 
            title: "AI Analysis", 
            desc: "Instantly assessed for structural and safety risk factors." 
          },
          { 
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", 
            title: "Transparent Tracking", 
            desc: "Watch the resolution live from the command dashboard." 
          }
        ].map((prop, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[32px] hover:bg-white/30 transition-all cursor-default"
          >
            <div className="w-12 h-12 bg-[#007AFF]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#007AFF]/20">
              <svg className="w-6 h-6 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={prop.icon}></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">{prop.title}</h3>
            <p className="text-sm font-medium text-[#1d1d1f]/50 leading-relaxed">{prop.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* FLOATING CTA */}
      <motion.div 
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
      >
        <button className="w-full relative group">
          <div className="absolute inset-0 bg-[#007AFF] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative glass px-8 py-5 rounded-3xl flex items-center justify-between border border-white/40 overflow-hidden">
             {/* Gradient Background Layer */}
             <div className="absolute inset-0 bg-gradient-to-r from-[#007AFF] to-[#5856D6] opacity-90"></div>
             <span className="relative text-white font-bold tracking-wide uppercase text-xs z-10">Start Reporting Now</span>
             <svg className="relative w-5 h-5 text-white z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
             </svg>
          </div>
        </button>
      </motion.div>

      {/* FOOTER */}
      <footer className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center opacity-30 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d1d1f]">
        <span>&copy; 2025 UPI // National Civic Intelligence</span>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#">Privacy</a>
          <a href="#">Terms & Condition</a>
          <a href="#">Feedback</a>
        </div>
      </footer>
    </div>
  );
};

export default App;