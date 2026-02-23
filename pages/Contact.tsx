
import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 md:py-12 min-h-[80vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 block mb-4 md:mb-6">Inquiries</span>
        <h2 className="serif text-4xl md:text-7xl lg:text-9xl mb-12 md:mb-16 tracking-tighter text-white leading-[0.9]">
          Let’s build <br/>
          <span className="italic">something together.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div className="space-y-10 md:space-y-12">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-600 mb-4">Email</h4>
              <a 
                href="mailto:hello@koessendrup.com" 
                className="text-xl md:text-4xl tracking-tighter font-light text-white hover:opacity-50 transition-opacity border-b border-neutral-800 pb-2 inline-block"
              >
                hello@koessendrup.com
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-600 mb-4">Social</h4>
                <ul className="text-[11px] md:text-sm space-y-2 text-neutral-400 uppercase tracking-widest">
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Vimeo</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-600 mb-4">Location</h4>
                <p className="text-[11px] md:text-sm text-neutral-400 uppercase tracking-widest leading-relaxed">
                  Studio Kössendrup<br/>
                  Berlin, Germany
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="aspect-square bg-neutral-900 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000">
               <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000" 
                alt="Office view" 
                className="w-full h-full object-cover opacity-60"
               />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
