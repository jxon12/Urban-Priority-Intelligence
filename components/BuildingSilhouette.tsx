import React from 'react';
import { motion } from 'framer-motion';
import { BuildingType, BuildingProps } from '../types';

const BuildingSilhouette: React.FC<BuildingProps> = ({ type, delay }) => {
  const neonColor = "rgba(0, 240, 255, 0.8)";
  const wireframeLine = "border-cyan-400/30";

  const renderBuilding = () => {
    switch (type) {
      case BuildingType.TRX:
        return (
          <div className="relative w-16 md:w-20 h-44 md:h-56 flex flex-col items-center">
            {/* The Exchange 106 - Neon Wireframe */}
            <div className="w-12 md:w-16 h-6 border-b-2 border-cyan-400/50 mb-[-1px] rounded-t-sm bg-cyan-400/5" 
                 style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }} />
            <div className={`w-12 md:w-16 h-full relative overflow-hidden border-x-2 border-b-2 ${wireframeLine} bg-black/40`}>
               {/* Data Pulse */}
               <motion.div 
                 animate={{ top: ['0%', '100%', '0%'] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 w-full h-[1px] bg-cyan-400 shadow-[0_0_10px_#00f0ff] opacity-50"
               />
               <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[length:100%_4px]" />
            </div>
          </div>
        );

      case BuildingType.TWIN_TOWERS:
        return (
          <div className="relative w-36 md:w-44 h-64 md:h-80 flex flex-col items-center">
            <div className="flex w-full justify-between px-4 relative">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center w-11 md:w-13 h-full relative">
                  <div className={`w-0.5 h-16 md:h-20 bg-cyan-400 mb-[-1px] shadow-[0_0_8px_#00f0ff]`} />
                  <div className={`w-4 md:w-5 h-5 border-2 ${wireframeLine} bg-cyan-400/5 rounded-t-sm mb-[-1px]`} />
                  <div className={`w-7 md:w-9 h-12 border-x-2 border-t-2 ${wireframeLine} bg-black/40 mb-[-1px]`} />
                  <div className={`w-11 md:w-13 h-full relative border-2 ${wireframeLine} bg-black/60 shadow-[0_0_15px_rgba(0,240,255,0.1)]`}>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[length:100%_8px]" />
                  </div>
                </div>
              ))}
              {/* Holographic Skybridge */}
              <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-20 md:w-26 h-3 bg-cyan-400/20 z-50 border-2 border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.4)]" />
            </div>
          </div>
        );

      case BuildingType.MENARA_KL:
        return (
          <div className="relative w-14 md:w-16 h-60 md:h-76 flex flex-col items-center">
            <div className={`w-[1px] h-24 md:h-32 bg-cyan-400 shadow-[0_0_8px_#00f0ff]`} />
            {/* Observation Pod - Circular Wireframe */}
            <div className={`w-10 md:w-12 h-10 md:h-12 bg-black/80 rounded-full border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.2)] flex items-center justify-center relative overflow-hidden`}>
               <div className="w-full h-[1px] bg-cyan-400/30" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-t-2 border-fuchsia-500/40 rounded-full"
               />
            </div>
            <div className={`w-2.5 md:w-3.5 h-full relative border-x-2 ${wireframeLine} bg-black/60`}>
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-400/10 -translate-x-1/2" />
            </div>
          </div>
        );

      case BuildingType.WARISAN_MERDEKA:
        return (
          <div className="relative w-24 md:w-32 h-80 md:h-[480px] flex flex-col items-center">
            {/* Merdeka 118 - Precision Wireframe */}
            <div className={`w-0.5 h-36 md:h-48 bg-fuchsia-500 shadow-[0_0_8px_#7B2CBF] ml-1.5`} />
            <div className={`w-full h-full relative border-x-2 border-b-2 ${wireframeLine} bg-black/60 overflow-hidden`} 
                 style={{ clipPath: 'polygon(50% 0%, 100% 10%, 100% 100%, 0% 100%, 0% 10%)' }}>
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(123,44,191,0.1)_0%,transparent_70%)]" />
               <div className={`absolute left-1/2 top-0 w-[1px] h-full bg-cyan-400/20 -translate-x-1/2`} />
               {/* Tech Scanning Line */}
               <motion.div 
                 animate={{ top: ['0%', '100%'] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 w-full h-[2px] bg-fuchsia-500/30 shadow-[0_0_15px_#7B2CBF]"
               />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0, y: 120 }}
      animate={{ scaleY: 1, opacity: 1, y: 0 }}
      transition={{ 
        duration: 1.8, 
        delay, 
        ease: [0.165, 0.84, 0.44, 1.0] 
      }}
      style={{ transformOrigin: 'bottom' }}
      className="flex items-end justify-center"
    >
      {renderBuilding()}
    </motion.div>
  );
};

export default BuildingSilhouette;