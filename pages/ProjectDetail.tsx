
import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { INITIAL_ITEMS } from './Home';

import { AspectRatio } from '../types';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = INITIAL_ITEMS.find(i => i.id === id);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (item?.videoUrl?.includes('vimeo.com') && window.Vimeo) {
      const player = new window.Vimeo.Player(iframeRef.current);
      player.play().catch(() => {});
    }
  }, [item]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="uppercase tracking-widest text-sm text-neutral-500">Project not found.</p>
      </div>
    );
  }

  const isVimeo = item.videoUrl?.includes('vimeo.com');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 md:px-8 pb-32"
    >
      <header className="py-10 md:py-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-12"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-neutral-500 block mb-4">{item.category}</span>
          <h1 className="serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] text-white">
            {item.title}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 order-2 md:order-1"
          >
            <p className="text-lg md:text-xl leading-relaxed text-neutral-400 mb-8 md:mb-12">
              {item.description}
            </p>
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-white mb-4">Focus</h4>
              <ul className="text-[11px] md:text-sm space-y-1 text-neutral-500 uppercase tracking-wider">
                {item.details?.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`md:col-span-8 relative bg-black overflow-hidden order-1 md:order-2 ${item.aspectRatio === AspectRatio.LANDSCAPE ? 'aspect-video' : 'aspect-[9/16] max-h-[70vh] mx-auto'}`}
          >
            {item.videoUrl ? (
              isVimeo ? (
                <iframe
                  ref={iframeRef}
                  src={`${item.videoUrl}?background=1&autoplay=1&loop=1&muted=1&controls=0&transparent=1`}
                  className="absolute top-0 left-0 w-full h-full object-cover border-none scale-[1.01]"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                />
              ) : (
                <video
                  src={item.videoUrl}
                  className="w-full h-full object-cover bg-black"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )
            ) : (
              <img src={item.imageUrl} className="w-full h-full object-cover transition-all duration-1000" />
            )}
          </motion.div>
        </div>
      </header>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-10 md:mt-20 flex justify-between items-center"
      >
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center space-x-4 uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-bold text-white"
        >
          <span className="w-8 md:w-12 h-[1px] bg-neutral-700 group-hover:w-16 group-hover:bg-white transition-all" />
          <span>Back to Studio</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
