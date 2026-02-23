
import React, { useState, useEffect, useRef } from 'react';
import DraggableBox from '../components/DraggableBox';
import { AspectRatio, ShowcaseItem } from '../types';

export const INITIAL_ITEMS: ShowcaseItem[] = [
  {
    id: '1',
    title: 'Trancetrain',
    category: 'Event Visuals',
    aspectRatio: AspectRatio.PORTRAIT,
    videoUrl: 'https://player.vimeo.com/video/1164705947',
    imageUrl: 'https://picsum.photos/seed/studio1/450/800',
    description: 'A high-velocity visual journey designed for Fuzion Events, blending rhythmic geometry with immersive motion design.',
    details: ['Event Design', 'Motion Graphics', 'Live Visuals'],
    initialX: 20,
    initialY: 20
  },
  {
    id: '2',
    title: 'TranceAttack',
    category: 'Motion Production',
    aspectRatio: AspectRatio.PORTRAIT,
    videoUrl: 'https://player.vimeo.com/video/1015363144',
    imageUrl: 'https://picsum.photos/seed/trance/450/800',
    description: 'A high-energy visual synthesis exploring the boundary between digital noise and melodic structure.',
    details: ['Motion Graphics', 'Visual Effects', 'Post-Production'],
    initialX: 200,
    initialY: 40
  },
  {
    id: '3',
    title: 'Gleiss Zero',
    category: 'Motion Design',
    aspectRatio: AspectRatio.PORTRAIT,
    videoUrl: 'https://player.vimeo.com/video/1164717282',
    imageUrl: 'https://picsum.photos/seed/gleiss/450/800',
    description: 'A rhythmic and minimal motion study exploring structural cuts and zero-point transitions.',
    details: ['Creative Direction', 'Motion Editing', 'VFX'],
    initialX: 40,
    initialY: 200
  },
  {
    id: '4',
    title: 'Werkwest Grafik 01',
    category: 'Motion Design',
    aspectRatio: AspectRatio.PORTRAIT,
    videoUrl: 'https://player.vimeo.com/video/1121601545',
    imageUrl: 'https://picsum.photos/seed/werkwest/450/800',
    description: 'Experimental graphic motion study focusing on rhythmic patterns and structural evolution.',
    details: ['Art Direction', 'Graphic Motion', 'VFX'],
    initialX: 250,
    initialY: 300
  },
  {
    id: '5',
    title: 'Echoes of Disco',
    category: 'Event Visuals',
    aspectRatio: AspectRatio.PORTRAIT,
    videoUrl: 'https://player.vimeo.com/video/1164719156',
    imageUrl: 'https://picsum.photos/seed/disco/450/800',
    description: 'A vibrant retrospective of disco aesthetics, reimagined through contemporary digital motion and lighting effects.',
    details: ['Visual Art', 'Motion Design', 'Retro-Futurism'],
    initialX: 100,
    initialY: 400
  },
  {
    id: '6',
    title: 'SweatChamber',
    category: 'Motion Production',
    aspectRatio: AspectRatio.PORTRAIT,
    videoUrl: 'https://player.vimeo.com/video/1164703764',
    imageUrl: 'https://picsum.photos/seed/sweatchamber/450/800',
    description: 'A rhythmic exploration of intensity and physical space, translated into a digital sensory experience.',
    details: ['Creative Direction', 'Motion Design', 'Sound Visualization'],
    initialX: 280,
    initialY: 50
  },
  {
    id: '7',
    title: 'Frühschicht Vol. 05',
    category: 'Motion Production',
    aspectRatio: AspectRatio.PORTRAIT,
    videoUrl: 'https://player.vimeo.com/video/1164721641',
    imageUrl: 'https://picsum.photos/seed/fruehschicht/450/800',
    description: 'Part of the "Frühschicht" series, this installment explores high-contrast visual narratives and rapid-fire motion sequencing.',
    details: ['Creative Direction', 'Motion Design', 'Visual Strategy'],
    initialX: 400,
    initialY: 200
  },
  {
    id: '8',
    title: 'Nachtwandel',
    category: 'Motion Design',
    aspectRatio: AspectRatio.LANDSCAPE,
    videoUrl: 'https://player.vimeo.com/video/1164723130',
    imageUrl: 'https://picsum.photos/seed/nachtwandel/800/450',
    description: 'An atmospheric landscape study exploring the shift of light and shadows through urban nocturnes.',
    details: ['3D Motion', 'Lighting Design', 'Soundscape'],
    initialX: 50,
    initialY: 350
  }
];

const Home: React.FC = () => {
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [zIndices, setZIndices] = useState<Record<string, number>>({});
  const [maxZ, setMaxZ] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    // Portrait dimensions
    const pWidth = isMobile ? 112 : 250; 
    const pHeight = isMobile ? 199 : 444; 

    // Landscape dimensions
    const lWidth = isMobile ? 160 : 384; 
    const lHeight = isMobile ? 90 : 216;

    const randomized = INITIAL_ITEMS.map((item, index) => {
      const isLandscape = item.aspectRatio === AspectRatio.LANDSCAPE;
      const bw = isLandscape ? lWidth : pWidth;
      const bh = isLandscape ? lHeight : pHeight;

      // More structured distribution for mobile to avoid all items being in one corner
      let x, y;
      if (isMobile) {
        // Divide screen into a rough grid for initial placement
        const cols = 2;
        const rows = Math.ceil(INITIAL_ITEMS.length / cols);
        const col = index % cols;
        const row = Math.floor(index / cols);
        
        const cellWidth = window.innerWidth / cols;
        const cellHeight = (window.innerHeight - 160) / rows;
        
        x = col * cellWidth + (Math.random() * (cellWidth - bw));
        y = row * cellHeight + (Math.random() * (cellHeight - bh));
      } else {
        x = Math.random() * (window.innerWidth - bw);
        y = Math.random() * (window.innerHeight - bh - 160);
      }

      return {
        ...item,
        initialX: Math.max(0, x),
        initialY: Math.max(0, y)
      };
    });
    
    const initialZ: Record<string, number> = {};
    randomized.forEach((item, idx) => {
      initialZ[item.id] = idx + 1;
    });
    
    setItems(randomized);
    setZIndices(initialZ);
  }, []);

  const handleBringToFront = (id: string) => {
    const newMax = maxZ + 1;
    setZIndices(prev => ({ ...prev, [id]: newMax }));
    setMaxZ(newMax);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[calc(100vh-6rem)] overflow-hidden cursor-crosshair"
    >
      {items.map((item) => (
        <DraggableBox 
          key={item.id} 
          item={item} 
          zIndex={zIndices[item.id] || 1}
          onZIndexUpdate={handleBringToFront}
          constraintsRef={containerRef}
        />
      ))}

      <div className="absolute bottom-20 md:bottom-8 right-4 md:right-8 text-[7px] md:text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-medium pointer-events-none z-[100]">
        {window.innerWidth < 768 ? 'Tap to move • Tap to view' : 'Drag to organize • Click to view'}
      </div>
    </div>
  );
};

export default Home;
