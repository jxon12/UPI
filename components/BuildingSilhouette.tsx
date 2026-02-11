import React from 'react';
import { motion } from 'framer-motion';
import { BuildingType, BuildingProps } from '../types';

const BuildingSilhouette: React.FC<BuildingProps> = ({ type, delay }) => {
  const wireframeLine = "border-black/5";

  const renderBuilding = () => {
    switch (type) {
      case BuildingType.TRX:
        return (
          <div className="relative w-16 md:w-20 h-44 md:h-56 flex flex-col items-center">
            <div className="w-12 md:w-16 h-6 border-b border-black/10 mb-[-1px] rounded-t-sm bg-black/5" 
                 style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }} />
            <div className={`w-12 md:w-16 h-full relative overflow-hidden border-x border-b ${wireframeLine} bg-white/40 backdrop-blur-sm`}>
               <motion.div 
                 animate={{ top: ['0%', '100%'] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 w-full h-[1px] bg-[#007AFF] opacity-20"
               />
               <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:100%_6px]" />
            </div>
          </div>
        );

      case BuildingType.TWIN_TOWERS:
        return (
          <div className="relative w-36 md:w-44 h-64 md:h-80 flex flex-col items-center">
            <div className="flex w-full justify-between px-4 relative">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center w-11 md:w-13 h-full relative">
                  <div className={`w-[1px] h-16 md:h-20 bg-black/10 mb-[-1px]`} />
                  <div className={`w-4 md:w-5 h-5 border ${wireframeLine} bg-black/5 rounded-t-sm mb-[-1px]`} />
                  <div className={`w-7 md:w-9 h-12 border-x border-t ${wireframeLine} bg-white/40 mb-[-1px]`} />
                  <div className={`w-11 md:w-13 h-full relative border ${wireframeLine} bg-white/60 backdrop-blur-sm`}>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:100%_10px]" />
                  </div>
                </div>
              ))}
              <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-20 md:w-26 h-3 bg-white/60 z-50 border border-black/10 shadow-sm rounded-sm" />
            </div>
          </div>
        );

      case BuildingType.MENARA_KL:
        return (
          <div className="relative w-14 md:w-16 h-60 md:h-76 flex flex-col items-center">
            <div className={`w-[1px] h-24 md:h-32 bg-black/10`} />
            <div className={`w-10 md:w-12 h-10 md:h-12 bg-white/40 rounded-full border border-black/10 flex items-center justify-center relative overflow-hidden`}>
               <div className="w-full h-[1px] bg-black/5" />
            </div>
            <div className={`w-2 md:w-3 h-full relative border-x ${wireframeLine} bg-white/40`}></div>
          </div>
        );

      case BuildingType.WARISAN_MERDEKA:
        return (
          <div className="relative w-24 md:w-32 h-80 md:h-[480px] flex flex-col items-center">
            <div className={`w-[1px] h-36 md:h-48 bg-black/10 ml-0.5`} />
            <div className={`w-full h-full relative border-x border-b ${wireframeLine} bg-white/40 overflow-hidden`} 
                 style={{ clipPath: 'polygon(50% 0%, 100% 10%, 100% 100%, 0% 100%, 0% 10%)' }}>
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,0,0,0.02)_0%,transparent_70%)]" />
               <motion.div 
                 animate={{ top: ['0%', '100%'] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 w-full h-[1px] bg-[#007AFF] opacity-20"
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
        duration: 2, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      style={{ transformOrigin: 'bottom' }}
      className="flex items-end justify-center"
    >
      {renderBuilding()}
    </motion.div>
  );
};

export default BuildingSilhouette;
