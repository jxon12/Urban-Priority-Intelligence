
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Mic, 
  Zap, 
  MapPin, 
  CheckCircle2, 
  X, 
  Waves,
  ShieldAlert,
  Navigation,
  Globe
} from 'lucide-react';

interface InclusiveModePageProps {
  onExit: () => void;
}

type Phase = 'INITIALIZING' | 'LISTENING' | 'ANALYZING' | 'CALIBRATING' | 'SUCCESS';

const InclusiveModePage: React.FC<InclusiveModePageProps> = ({ onExit }) => {
  const [phase, setPhase] = useState<Phase>('INITIALIZING');
  const [transcript, setTranscript] = useState<string>("");
  const [aiSpeech, setAiSpeech] = useState<string>("Initializing Spatial Hub...");

  useEffect(() => {
    // Phase 1: INITIALIZING -> LISTENING
    const t1 = setTimeout(() => {
      setPhase('LISTENING');
      setAiSpeech("Welcome back. I am your Eyes. Live spatial scanner activated. Tell me what you see.");
    }, 3000);

    // Phase 2: User Speaks (Simulated)
    const t2 = setTimeout(() => {
      setTranscript("There is a shared bike blocking the blind path.");
    }, 6000);

    // Phase 3: ANALYZING
    const t3 = setTimeout(() => {
      setPhase('ANALYZING');
      setAiSpeech("Analyzing spatial depth... Obstacle detected on tactile paving.");
    }, 9000);

    // Phase 4: CALIBRATING
    const t4 = setTimeout(() => {
      setPhase('CALIBRATING');
      setAiSpeech("Calibrating Hybrid GPS + VPS... Location precision 100%.");
    }, 12000);

    // Phase 5: SUCCESS
    const t5 = setTimeout(() => {
      setPhase('SUCCESS');
      setAiSpeech("Report successful. Your request is prioritized. Volunteers notified.");
    }, 15000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#020202] text-white z-[200] overflow-hidden selection:bg-blue-500/30 flex flex-col items-center justify-center font-sans">
      
      {/* BACKGROUND MESH */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
          <div className="w-full h-full grid grid-cols-20 grid-rows-20 border border-blue-500/20"></div>
        </div>
      </div>

      {/* TOP HUD */}
      <nav className="fixed top-10 left-0 right-0 z-[250] px-10 flex items-center justify-between">
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="vision-glass px-6 py-3 rounded-full border border-white/10 flex items-center gap-4"
        >
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Demo Accessibility Mode</span>
        </motion.div>

        <button 
          onClick={onExit}
          className="w-12 h-12 vision-glass rounded-full flex items-center justify-center border border-white/10 hover:bg-white/5 transition-all"
        >
          <X className="w-5 h-5 text-white/40" />
        </button>
      </nav>

      {/* MAIN INTERACTION HUB */}
      <main className="relative z-10 w-full max-w-2xl flex flex-col items-center px-10">
        <AnimatePresence mode="wait">
          
          {/* PHASE: INITIALIZING */}
          {phase === 'INITIALIZING' && (
            <motion.div 
              key="init"
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-blue-500 rounded-full blur-[40px]"
                />
                <ActivityCircle color="blue" />
              </div>
              <h2 className="text-xl font-bold uppercase tracking-[0.5em] text-blue-400">System Booting</h2>
              <p className="text-white/20 text-xs font-bold uppercase tracking-widest">Detecting Assistive Hardware...</p>
            </motion.div>
          )}

          {/* PHASE: LISTENING */}
          {phase === 'LISTENING' && (
            <motion.div 
              key="listen"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center gap-12"
            >
              <div className="relative group cursor-pointer">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-48 h-48 rounded-full bg-blue-500/10 border-2 border-blue-500/20 flex items-center justify-center relative overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.2)]"
                >
                  <Waves className="w-12 h-12 text-blue-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                </motion.div>
                
                {/* Visual Haptic Rings */}
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
                  />
                ))}
              </div>

              <div className="text-center space-y-6">
                <motion.p className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                  {aiSpeech}
                </motion.p>
                <AnimatePresence>
                  {transcript && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-8 py-5 vision-glass border-blue-500/30 rounded-3xl"
                    >
                      <span className="text-[10px] font-black uppercase text-blue-400 mb-2 block tracking-widest">User Input</span>
                      <p className="text-lg font-medium text-white/60">"{transcript}"</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* PHASE: ANALYZING (SPATIAL SCANNER) */}
          {phase === 'ANALYZING' && (
            <motion.div 
              key="analyze"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full h-[60vh] vision-glass rounded-[60px] relative overflow-hidden border border-white/20 p-2"
            >
              {/* Simulated Camera Feed */}
              <div className="absolute inset-0 z-0">
                <img src="https://tse3.mm.bing.net/th/id/OIP.pE7ZqulNx0532SUGm6CObQHaDt?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-full h-full object-cover grayscale brightness-50 contrast-125" alt="Spatial Scene" />
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
              </div>

              {/* Bounding Boxes */}
              <svg className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                <motion.rect 
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  x="30%" y="40%" width="20%" height="30%" 
                  fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 5"
                />
                <motion.circle 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  cx="40%" cy="55%" r="10" fill="#3b82f6"
                />
              </svg>

              <div className="absolute bottom-10 left-10 right-10 z-20 flex flex-col gap-4">
                 <div className="flex gap-3">
                   <div className="vision-glass px-4 py-2 rounded-full flex items-center gap-2 border-red-500/30">
                      <ShieldAlert className="w-4 h-4 text-red-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Anomaly Detected</span>
                   </div>
                   <div className="vision-glass px-4 py-2 rounded-full flex items-center gap-2 border-blue-500/30">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Multimodal IQ</span>
                   </div>
                 </div>
                 <p className="text-lg font-bold text-white shadow-2xl">{aiSpeech}</p>
              </div>

              {/* Scanning Laser Line */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-blue-500/50 shadow-[0_0_20px_#3b82f6] z-10"
              />
            </motion.div>
          )}

          {/* PHASE: CALIBRATING */}
          {phase === 'CALIBRATING' && (
            <motion.div 
              key="calib"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-10"
            >
              <div className="relative">
                <Globe className="w-24 h-24 text-blue-500/40 animate-spin-slow" />
                <Navigation className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-bounce" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3">{aiSpeech}</h3>
                <div className="flex justify-center gap-2">
                   {[1, 2, 3, 4, 5].map(i => (
                     <motion.div 
                        key={i}
                        animate={{ height: [10, 30, 10] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-blue-500 rounded-full"
                     />
                   ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* PHASE: SUCCESS */}
          {phase === 'SUCCESS' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="flex flex-col items-center gap-12"
            >
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 1 }}
                  className="absolute inset-0 bg-emerald-500 rounded-full"
                />
                <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.4)]">
                   <CheckCircle2 className="w-16 h-16 text-black" />
                </div>
              </div>
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-emerald-400 uppercase tracking-widest leading-tight">Priority Logged</h2>
                <p className="text-white/40 font-medium text-lg leading-relaxed max-w-sm mx-auto">
                  {aiSpeech}
                </p>
              </div>
              
              <button 
                onClick={onExit}
                className="px-14 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
              >
                Return to Core
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER HINT */}
      <footer className="fixed bottom-12 left-0 right-0 z-[250] flex justify-center">
        <div className="vision-glass px-10 py-4 rounded-full border border-white/5 flex items-center gap-6">
           <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-blue-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Voice Enabled</span>
           </div>
           <div className="w-px h-4 bg-white/10"></div>
           <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Vision Active</span>
           </div>
        </div>
      </footer>

      <style>{`
        .vision-glass {
          background: rgba(20, 20, 20, 0.4);
          backdrop-filter: blur(80px) saturate(210%);
          -webkit-backdrop-filter: blur(80px) saturate(210%);
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const ActivityCircle = ({ color }: { color: string }) => (
  <div className={`w-32 h-32 rounded-full border-4 border-${color}-500/20 flex items-center justify-center relative`}>
    <div className={`w-24 h-24 rounded-full border border-${color}-500/40 animate-spin-slow`}></div>
    <div className={`absolute w-3 h-3 bg-${color}-500 rounded-full top-0 shadow-[0_0_15px_#3b82f6]`}></div>
  </div>
);

export default InclusiveModePage;
