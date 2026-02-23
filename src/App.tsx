import { Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThumbnailGrid from './components/ThumbnailGrid';
import ProjectPage from './pages/ProjectPage';
import ContactPage from './pages/ContactPage';
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
    <div className="pt-12 flex flex-col relative z-10 bg-[#000000]">
      <ThumbnailGrid projects={filteredProjects} />
    </div>
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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/:category" element={<MasterView />} />
      </Routes>
    </>
  );
}

export default App;
