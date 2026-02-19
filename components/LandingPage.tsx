
import React from 'react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onJoin: () => void;
  onInclusiveMode: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onJoin, onInclusiveMode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col items-center pt-24 pb-20 px-6 relative z-10"
    >
      {/* MINIMALIST NAV */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="ios-glass rounded-full px-6 py-2 flex items-center justify-between border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black font-black text-[9px]">U</span>
            </div>
            <span className="font-extrabold text-sm tracking-tighter text-white">UPI</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-[11px] font-bold uppercase tracking-widest text-white/30">
            <a href="#about" className="hover:text-white transition-colors cursor-pointer">About</a>
            <a href="#workflow" className="md:hidden hover:text-white transition-colors cursor-pointer">Demo</a>
            <a href="#workflow" className="hidden md:inline hover:text-white transition-colors cursor-pointer">Workflow</a>
            <a href="#impact" className="hover:text-white transition-colors cursor-pointer">Impact</a>
          </div>

          <button 
            onClick={onJoin}
            className="bg-white px-4 py-1.5 rounded-full text-[11px] font-bold text-black hover:scale-105 active:scale-95 transition-all">
            Get Started
          </button>
        </motion.div>
      </nav>

      {/* HERO SECTION */}
      <section className="w-full max-w-5xl text-center flex flex-col items-center pt-20 mb-32">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-9xl font-[900] text-white leading-[0.95] tracking-[-0.05em] mb-10"
        >
          Smarter cities <br />
          <span className="text-gradient">start here.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl font-medium text-white/30 max-w-xl text-balance mb-20 leading-relaxed"
        >
          Report urban issues in seconds. Our intelligence engine ensures what matters gets fixed first. 
        </motion.p>

        <div className="flex gap-4 mb-20">
        <button 
            onClick={onInclusiveMode}
            className="px-10 py-5 vision-glass border border-white/10 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#007AFF]"></div>
            Try Accessibility Mode
          </button>
        </div>

        {/* SPATIAL DEMO VISUAL (V2 PHONE DESIGN) */}
        <div className="relative w-full max-w-3xl h-[600px] flex items-center justify-center perspective-2000 mb-32">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 rounded-full blur-[120px] animate-glow"></div>

          <motion.div 
            initial={{ y: 80, opacity: 0, rotateX: 15 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 1.5, delay: 0.6, type: "spring" }}
            className="relative w-[300px] h-[600px] md:w-[320px] md:h-[650px] bg-black rounded-[55px] p-3 border-[6px] border-[#111] z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] animate-float"
          >
            <div className="w-full h-full bg-[#050505] rounded-[45px] overflow-hidden relative p-4 flex flex-col">
                <div className="w-24 h-5 bg-black rounded-full mx-auto mb-10 border border-white/5"></div>
                
                <div className="space-y-4">
                  <div className="w-full h-44 bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative">
                     <img src="https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&q=80&w=500" className="w-full h-full object-cover opacity-40 grayscale" alt="Anomaly Detection" />
                     <motion.div 
                        className="absolute inset-0 bg-blue-500/20 border-y border-blue-500/50"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     />
                  </div>
                  
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl"
                  >
                     <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Status: Analyzing</div>
                     <div className="text-xs font-bold text-white">Gemini detecting anomaly...</div>
                  </motion.div>

                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
                  >
                     <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Action: Assigned</div>
                     <div className="text-xs font-bold text-white">Route to Road Maintenance Div.</div>
                  </motion.div>
               </div>

               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-white/20 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="w-full max-w-5xl mb-48 scroll-mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
           <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-black mb-8 leading-tight">Vision for a <br/><span className="text-gradient">Smarter Future.</span></h2>
              <p className="text-white/40 leading-relaxed font-medium text-lg">UPI removes urban friction. By applying Gemini's multimodal reasoning, citizen reports reach the right desk in milliseconds—ensuring maintenance is driven by urgency, not just location.</p>
           </motion.div>
           <div className="ios-glass p-12 rounded-[50px] aspect-square flex flex-col justify-center border border-white/10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/10">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Unified Civic Core</h3>
              <p className="text-white/30 text-sm leading-relaxed">A single platform for reporting, analyzing, and resolving urban decay across all city zones.</p>
           </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section id="workflow" className="w-full max-w-6xl mb-48 scroll-mt-32">
        <div className="text-center mb-20">
           <h2 className="text-4xl font-black mb-4">The Intelligent Cycle</h2>
           <p className="text-white/30 font-medium">From sight to solution, automated for speed.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z", title: "Instant Capture", desc: "Snap a photo. Our AI identifies the severity and context automatically." },
            { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Auto-Routing", desc: "Gemini classifies the issue and notifies the precise department in charge." },
            { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Verification", desc: "Close the loop once resolved, updating the community in real-time." }
          ].map((step, i) => (
            <motion.div key={i} whileHover={{ y: -8 }} className="ios-glass p-10 rounded-[48px] text-center border border-white/5 transition-all">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon}></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4">{step.title}</h4>
              <p className="text-white/30 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section id="impact" className="w-full max-w-5xl mb-48 scroll-mt-32">
         <div className="ios-glass p-16 md:p-24 rounded-[60px] border border-white/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
               <div>
                  <h2 className="text-4xl font-black mb-6 leading-tight">Built for <br/><span className="text-gradient">Inclusivity.</span></h2>
                  <p className="text-white/40 font-medium mb-8">Civic tech should serve everyone. UPI is built with advanced multimodal accessibility, allowing individuals with special needs—including those with visual or motor impairments—to report issues via voice, text, or visual gestures. Our AI adapts its interaction model to the user's preferred modality.</p>
                  <div className="flex gap-4">
                     <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/50 uppercase tracking-widest">Voice-First UI</div>
                     <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/50 uppercase tracking-widest">Adaptive UX</div>
                  </div>
               </div>
               <div className="ios-glass rounded-[40px] p-8 border border-white/5 bg-white/[0.01]">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                           <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                        </div>
                        <span className="text-xs font-bold text-white/60">Multimodal Accessibility Active</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[100%] bg-blue-500"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      
      {/* FINAL CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-60"
      >
        <button 
          onClick={onJoin}
          className="group relative px-14 py-6 rounded-full text-xl font-black text-black bg-white transition-all shadow-[0_40px_80px_-10px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
        >
          Get Started
        </button>
        <p className="mt-8 text-white/20 text-[10px] font-bold uppercase tracking-[0.5em]">Every report deserves action. </p>
      </motion.div>

      {/* V2 STYLE FOOTER WITH STACK MARQUEE */}
      <footer className="w-full max-w-5xl">
        <div className="flex flex-col items-center gap-12">
           <div className="flex flex-wrap justify-center gap-10 opacity-20 text-[9px] font-black uppercase tracking-[0.4em]">
              <span>Your Voice.</span>
              <span>Our Action.</span>
              <span>Better Cities.</span>
           </div>
           
           <div className="w-full pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
              <span className="text-[9px] font-bold uppercase tracking-widest">Urban Priority Intelligence &copy; 2026</span>
              <div className="flex gap-8 text-[9px] font-bold uppercase tracking-widest">
                 <a href="#about" className="hover:text-white transition-colors cursor-pointer">About</a>
                 <a href="#workflow" className="hover:text-white transition-colors cursor-pointer">Workflow</a>
                 <a href="#impact" className="hover:text-white transition-colors cursor-pointer">Impact</a>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest">2 0 2 6 KITAHACK</span>
           </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
