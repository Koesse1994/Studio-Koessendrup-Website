
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="serif text-4xl md:text-6xl lg:text-8xl mb-6 md:mb-8 tracking-tighter text-white leading-[0.9]">
            Form follows <br/>
            <span className="italic">intuition.</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-8 max-w-md">
            Studio Kössendrup is a super cool design practice based on the intersection of clarity, emotion, and technical precision.
          </p>
          <div className="grid grid-cols-2 md:block space-y-0 md:space-y-4 gap-4">
            <h4 className="col-span-2 text-[10px] uppercase tracking-widest font-bold text-white mb-2 md:mb-4">Disciplines</h4>
            <ul className="text-[11px] md:text-sm space-y-1 text-neutral-500 uppercase tracking-wider">
              <li>Creative Direction</li>
              <li>Brand Identity</li>
              <li>UI / UX Design</li>
            </ul>
            <ul className="text-[11px] md:text-sm space-y-1 text-neutral-500 uppercase tracking-wider">
              <li>Packaging</li>
              <li>Motion Graphics</li>
              <li>VFX Art</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-[3/4] bg-neutral-900 w-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000" 
            alt="Studio Space" 
            className="w-full h-full object-cover contrast-125"
          />
          <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-4 md:p-8 shadow-xl max-w-[200px] md:max-w-xs text-black">
             <p className="text-[10px] md:text-sm font-medium leading-relaxed italic">
               "We don't just solve problems; we define experiences that resonate long after the first interaction."
             </p>
             <p className="mt-2 md:mt-4 text-[7px] md:text-[10px] uppercase tracking-widest">— Julian Kössendrup, Founder</p>
          </div>
        </motion.div>
      </div>

      <div id="contact" className="mt-20 md:mt-32 pt-10 md:pt-20 border-t border-neutral-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-4 md:mb-6">Contact</h3>
            <a href="mailto:hello@koessendrup.com" className="text-2xl md:text-6xl tracking-tighter font-light border-b border-white/20 hover:border-white pb-1 md:pb-2 hover:opacity-50 transition-all text-white">
              hello@koessendrup.com
            </a>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[11px] md:text-sm text-neutral-500">Based in Berlin, Germany</p>
            <p className="text-[11px] md:text-sm text-neutral-500">Available for projects worldwide.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
