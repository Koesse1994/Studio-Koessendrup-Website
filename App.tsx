
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col relative bg-black">
        <Header />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
        
        {/* Subtle Footer */}
        <footer className="fixed bottom-6 left-6 z-50 pointer-events-none">
          <p className="text-[10px] tracking-widest uppercase text-gray-500">© 2024 Studio Kössendrup</p>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
