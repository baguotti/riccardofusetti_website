import { Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThumbnailGrid from './components/ThumbnailGrid';
import ProjectPage from './pages/ProjectPage';
import { projects } from './data/projects';
import { useEffect } from 'react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// The unified master view for project categories
function MasterView() {
  const { category } = useParams<{ category: string }>();
  const activeCategory = category || 'director';
  const filteredProjects = projects.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Navigation spacer */}
      <div className="pt-12 min-h-screen flex flex-col relative z-10 bg-[#050505]">
        <ThumbnailGrid projects={filteredProjects} />
      </div>

      {/* About Section updated with scraped bio */}
      <section id="about" className="py-32 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto bg-[#050505]">
        <h2 className="text-sm tracking-widest uppercase text-[#1A1A1A] font-['Inter'] mb-12">Identity</h2>
        <div className="space-y-8">
          <p className="text-2xl md:text-3xl text-[#FFFFFF] leading-tight font-light max-w-2xl">
            Freelance director and editor from Italy, based in London.
          </p>
          <div className="pt-4 space-y-4 text-sm text-[#D6D3C9] font-['Inter'] leading-relaxed uppercase tracking-widest">
            <p>
              Director representation (non-exclusive): Dadbod Films
            </p>
            <p>
              Part of Wild Island Films Editing Roster
            </p>
          </div>
          <div className="pt-8">
            <a href="mailto:fusetti.riccardo@gmail.com" className="group relative overflow-hidden inline-flex items-center justify-center rounded-full border border-[#1A1A1A] px-8 py-4 text-xs font-semibold text-[#FFFFFF] uppercase tracking-widest transition-transform duration-300 hover:scale-[1.03]">
              <span className="absolute inset-0 bg-[#D6D3C9] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></span>
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">fusetti.riccardo@gmail.com</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <>
      {/* Global CSS noise overlay for visual texture */}
      <div className="noise-overlay pointer-events-none"></div>

      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/director" replace />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/:category" element={<MasterView />} />
      </Routes>
    </>
  );
}

export default App;
