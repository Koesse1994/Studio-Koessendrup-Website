
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AspectRatio, ShowcaseItem } from '../types';

interface DraggableBoxProps {
  item: ShowcaseItem;
  onZIndexUpdate: (id: string) => void;
  zIndex: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

const DraggableBox: React.FC<DraggableBoxProps> = ({ item, onZIndexUpdate, zIndex, constraintsRef }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dragOccurred = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const vimeoPlayer = useRef<any>(null);
  const navigate = useNavigate();
  
  const isLandscape = item.aspectRatio === AspectRatio.LANDSCAPE;
  const isVimeo = item.videoUrl?.includes('vimeo.com');
  
  const widthClass = isLandscape ? 'w-40 md:w-80 lg:w-96' : 'w-28 md:w-56 lg:w-64';
  const aspectClass = isLandscape ? 'aspect-[16/9]' : 'aspect-[9/16]';

  useEffect(() => {
    if (isVimeo && iframeRef.current && window.Vimeo) {
      vimeoPlayer.current = new window.Vimeo.Player(iframeRef.current);
      // Ensure it starts paused and muted
      vimeoPlayer.current.setVolume(0);
      vimeoPlayer.current.pause().catch(() => {});
    }
  }, [isVimeo]);

  // Handle Playback Start
  const startPlayback = () => {
    setIsActive(true);
    if (isVimeo && vimeoPlayer.current) {
      vimeoPlayer.current.play().catch(() => {});
    } else if (videoRef.current && item.videoUrl) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Handle Playback Stop
  const stopPlayback = () => {
    setIsActive(false);
    if (isVimeo && vimeoPlayer.current) {
      vimeoPlayer.current.pause().catch(() => {});
    } else if (videoRef.current && item.videoUrl) {
      videoRef.current.pause();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    onZIndexUpdate(item.id);
    startPlayback();
  };

  const handlePointerUp = () => {
    stopPlayback();
  };

  const handlePointerCancel = () => {
    stopPlayback();
  };

  // Keep hover for desktop mice
  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      onZIndexUpdate(item.id);
      startPlayback();
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      stopPlayback();
    }
  };

  const handleTap = () => {
    if (!dragOccurred.current) {
      navigate(`/project/${item.id}`);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => {
        setIsDragging(true);
        dragOccurred.current = false;
        onZIndexUpdate(item.id);
      }}
      onDrag={() => {
        dragOccurred.current = true;
      }}
      onDragEnd={() => {
        setIsDragging(false);
        setTimeout(() => { dragOccurred.current = false; }, 50);
      }}
      onTap={handleTap}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ 
        x: item.initialX, 
        y: item.initialY, 
        opacity: 0, 
        scale: 0.9 
      }}
      animate={{ 
        opacity: 1, 
        scale: (isDragging || isActive) ? 1.05 : 1,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      style={{ 
        position: 'absolute',
        zIndex,
        cursor: isDragging ? 'grabbing' : 'pointer',
        touchAction: 'none',
        background: '#000'
      }}
      className={`${widthClass} ${aspectClass} group relative bg-black overflow-hidden shadow-2xl transition-shadow hover:shadow-white/10`}
    >
      {item.videoUrl ? (
        isVimeo ? (
          <div className="w-full h-full pointer-events-none transition-all duration-700 ease-in-out bg-black">
             <iframe
              ref={iframeRef}
              // background=1 removes UI, autoplay=0 lets us control start
              src={`${item.videoUrl}${item.videoUrl.includes('?') ? '&' : '?'}background=1&autoplay=0&loop=1&muted=1&controls=0&transparent=1&playsinline=1`}
              className="absolute top-0 left-0 w-full h-full border-none outline-none scale-[1.01]"
              frameBorder="0"
              allow="autoplay; fullscreen"
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            src={item.videoUrl}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out pointer-events-none bg-black"
            muted
            loop
            playsInline
            poster={item.imageUrl}
          />
        )
      ) : (
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-all duration-700 ease-in-out pointer-events-none"
        />
      )}
      
      {/* Overlay Info */}
      <div className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent ${isActive ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
        <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/80 mb-1">{item.category}</span>
        <h3 className="text-white font-medium text-sm md:text-lg leading-tight uppercase tracking-tighter">{item.title}</h3>
      </div>

      {/* Touch indicator (optional subtle hint) */}
      <div className="absolute top-2 right-2 md:hidden">
        <div className={`w-1 h-1 rounded-full bg-white/30 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </motion.div>
  );
};

export default DraggableBox;
