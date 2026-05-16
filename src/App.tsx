/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useState } from 'react';

const Pokeballs = [
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h8" />
      <path d="M14 12h8" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h8" />
      <path d="M14 12h8" />
      <circle cx="12" cy="12" r="2" />
      <path d="M8 7 A 4 4 0 0 1 16 7" />
    </svg>
  ),
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h8" />
      <path d="M14 12h8" />
      <circle cx="12" cy="12" r="2" />
      <path d="M8.5 9 L10.5 5.5 L12 7.5 L13.5 5.5 L15.5 9" />
    </svg>
  )
];

export default function App() {
  const [isDark, setIsDark] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const toggleState = () => {
    setIsDark(!isDark);
  };

  return (
    <motion.div 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-sans text-white transition-colors duration-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Background */}
      <AnimatePresence>
        {!isDark && (
          <motion.div
            key="bg-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-br from-[#854b9d] via-[#b66da9] to-[#dfa1be] z-0"
          />
        )}
        {isDark && (
          <motion.div
            key="bg-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-br from-[#0b0416] via-[#210c3b] to-[#140624] z-0"
          />
        )}
      </AnimatePresence>

      
      {/* Background Lighting */ }
      <motion.div 
        animate={{ 
          backgroundColor: isDark ? '#a855f7' : '#ffffff',
          opacity: isDark ? 0.3 : 0.1,
          scale: isDark ? 1.2 : 1
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[180px] pointer-events-none mix-blend-screen z-0"
      />

      {/* Giant BG Text */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-0 pointer-events-none w-[95%] max-w-[1600px]">
        <motion.img 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isDark ? 0.15 : 0.4, scale: 1, filter: 'none' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src="/headline fundo.svg"
          alt="MEWTWO POKÉMON Headline"
          className="w-full h-auto object-contain mix-blend-overlay"
        />
      </div>

      {/* Main Layout Grid */}
      <div className="relative z-10 w-full h-full max-w-[1800px] mx-auto p-10 md:p-14 lg:p-20 flex flex-col justify-between items-start">
        
        {/* TOP NAV / INFO */}
        <div className="w-full flex justify-between items-start">
          {/* Top Left: Identity Block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col max-w-sm xl:max-w-md 2xl:max-w-lg"
          >
            <div className="mb-6 w-64 md:w-80 lg:w-[365px] relative">
              <img src="/Logo mewtwo.svg" alt="Mewtwo Logo and Title" className="w-full h-auto object-contain drop-shadow-sm" />
              <AnimatePresence mode="wait">
                <motion.span 
                  key={isDark ? "dark-title" : "light-title"}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.5 }}
                  className={`text-[10px] md:text-xs font-bold uppercase mt-3 block tracking-[0.3em] ${isDark ? 'text-purple-300' : 'text-white/80'}`}
                >
                  {isDark ? "Ascensão Sombria" : "Evolução Psíquica"}
                </motion.span>
              </AnimatePresence>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.p 
                key={isDark ? "dark-desc" : "light-desc"}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.6 }}
                className="text-xs md:text-sm font-medium leading-relaxed opacity-90 text-white tracking-wide mix-blend-plus-lighter xl:w-[90%]"
              >
                {isDark ? (
                  <>Agora, o poder psíquico rompe seu estado de equilíbrio. Mewtwo revela sua forma mais intensa, densa e dominante.<br/><br/>Onde antes existia controle absoluto, agora emerge uma presença que ultrapassa limites. Esta é a manifestação sombria do poder: mais rara, mais agressiva e impossível de ignorar.</>
                ) : (
                  <>Olá, eu sou Mewtwo, a expressão máxima do poder psíquico. Nesta forma, energia, consciência e controle coexistem em perfeito equilíbrio.<br/><br/>Reimaginado como um ícone de presença e evolução, Mewtwo revela sua face mais precisa, refinada e dominante. Este é o ponto em que o poder ainda responde à mente.</>
                )}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Top Right: Pokeball Nav */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex gap-2 md:gap-4"
          >
            {Pokeballs.map((icon, i) => (
              <div key={i} className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${isDark ? 'border-purple-500/60 hover:bg-purple-900/40 text-purple-200 hover:text-white hover:border-purple-400' : 'border-white/60 hover:bg-white/20 text-white/80 hover:text-white'}`}>
                {icon}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Center Character - 3D Sculpture Crossfade Container */}
        <div className="absolute top-[55%] lg:top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[650px] md:w-[750px] md:h-[850px] xl:w-[1000px] xl:h-[1100px] pointer-events-none flex items-center justify-center z-20">
            <AnimatePresence>
              {!isDark && (
                <motion.img 
                  key="mewtwo-light"
                  src="/MewTwo.png" 
                  alt="Mewtwo 3D Render" 
                  initial={{ opacity: 0, scale: 0.95, filter: "drop-shadow(0px 20px 40px rgba(139,84,162,0.5)) blur(12px) brightness(1.5)" }}
                  animate={{ opacity: 1, scale: 1, filter: "drop-shadow(0px 20px 40px rgba(139,84,162,0.5)) blur(0px) brightness(1)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "drop-shadow(0px 20px 40px rgba(139,84,162,0.5)) blur(12px) brightness(0.5)" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{ x: translateX, y: translateY }}
                  className="absolute w-full h-full object-contain transform-gpu" 
                />
              )}
              {isDark && (
                <motion.img 
                  key="mewtwo-dark"
                  src="/Mewtwo dark.png" 
                  alt="Mewtwo Dark Render" 
                  initial={{ opacity: 0, scale: 0.95, filter: "drop-shadow(0px 20px 60px rgba(168,85,247,0.7)) blur(12px) brightness(0.5)" }}
                  animate={{ opacity: 1, scale: 1, filter: "drop-shadow(0px 20px 60px rgba(168,85,247,0.7)) blur(0px) brightness(1)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "drop-shadow(0px 20px 60px rgba(168,85,247,0.7)) blur(12px) brightness(1.5)" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{ x: translateX, y: translateY }}
                  className="absolute w-full h-full object-contain transform-gpu" 
                />
              )}
            </AnimatePresence>
        </div>

        {/* BOTTOM INFO */}
        <div className="w-full flex justify-between items-end pb-4 md:pb-0 relative z-30">
          {/* Bottom Left */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col relative"
          >
            <AnimatePresence mode="wait">
              <motion.span 
                key={isDark ? "num-dark" : "num-light"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="font-sans font-black text-6xl md:text-8xl text-white tracking-tighter leading-none mb-1"
              >
                {isDark ? "#02" : "#01"}
              </motion.span>
            </AnimatePresence>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={isDark ? "title-dark" : "title-light"}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col mb-2"
              >
                <h2 className={`text-2xl md:text-4xl font-black tracking-widest uppercase ${isDark ? 'text-purple-400' : 'text-white/50'}`}>
                  {isDark ? "Forma Sombria" : "Forma Psíquica"}
                </h2>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div 
                key={isDark ? "desc-dark" : "desc-light"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`text-[9px] md:text-[10px] space-y-1 uppercase tracking-wider font-medium max-w-lg ${isDark ? 'opacity-100 text-purple-200' : 'opacity-80 text-white'}`}
              >
                {isDark ? (
                  <>
                    <p className="font-bold text-purple-300">ESTADO ATIVO: ENERGIA LIBERADA - DOMÍNIO TOTAL</p>
                    <p className="leading-snug">A forma definitiva do poder psíquico, elevada ao seu ponto máximo de tensão, presença e impacto.</p>
                  </>
                ) : (
                  <>
                    <p>Estado atual: Controle máximo • Consciência elevada</p>
                    <p className="leading-snug">Esta manifestação precede a forma originária sombria. Estável, focada e absolutamente aterradora em sua precisão.</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Bottom Right Badge Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            onClick={toggleState}
            className="flex items-center gap-4 md:gap-6 group cursor-pointer"
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={isDark ? "micro-dark" : "micro-light"}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 0, x: 0 }} // Managed by CSS hover as well, but Framer helps initialize
                exit={{ opacity: 0, x: -10 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 max-w-[120px] text-right pointer-events-none"
              >
                <p className={`text-[9px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm rounded-sm p-2 leading-relaxed shadow-lg ${isDark ? 'text-purple-900' : 'text-[#50215e]'}`}>
                  {isDark ? "Restaurar formato contido" : "A próxima manifestação será revelada em breve"}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="relative w-32 h-32 md:w-40 md:h-40 xl:w-48 xl:h-48 flex items-center justify-center">
              <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                 className="absolute w-full h-full"
              >
                <AnimatePresence mode="wait">
                  <motion.svg 
                    key={isDark ? "text-dark" : "text-light"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    viewBox="0 0 100 100" 
                    className={`w-full h-full fill-current uppercase tracking-widest text-[8px] font-bold ${isDark ? 'text-purple-300' : 'text-white'}`}
                  >
                    <path id="badge-curve" fill="transparent" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                    <text>
                      <textPath href="#badge-curve" startOffset="0%" textLength="226" lengthAdjust="spacing">
                        {isDark ? "RETORNAR À FORMA PSÍQUICA • RETORNAR À FORMA PSÍQUICA • " : "DESPERTAR FORMA SOMBRIA • DESPERTAR FORMA SOMBRIA • "}
                      </textPath>
                    </text>
                  </motion.svg>
                </AnimatePresence>
              </motion.div>
              
              <motion.div 
                animate={{
                  borderColor: isDark ? 'rgba(168, 85, 247, 0.6)' : 'rgba(255,255,255,0.4)',
                  backgroundColor: isDark ? 'rgba(107, 33, 168, 0.3)' : 'rgba(255,255,255,0.1)'
                }}
                className="w-14 h-14 md:w-16 md:h-16 xl:w-20 xl:h-20 backdrop-blur-md rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden"
              >
                 {/* Center Icon */}
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-500 group-hover:rotate-180 z-10 ${isDark ? 'text-purple-200' : 'text-white'}`}>
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                 </svg>
                 <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-md ${isDark ? 'bg-purple-900' : 'bg-black'}`}></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

