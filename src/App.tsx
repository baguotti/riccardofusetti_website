import { Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThumbnailGrid from './components/ThumbnailGrid';
import ProjectPage from './pages/ProjectPage';
import PrivateProjectPage from './pages/PrivateProjectPage';
import ContactPage from './pages/ContactPage';
import { projects } from './data/projects';
import { useEffect } from 'react';
import Footer from './components/Footer';

// import PhotographyPage from './pages/PhotographyPage';

function RouteHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Dynamic document title updater based on route
    if (pathname === '/' || pathname === '/director') {
      document.title = 'Riccardo Fusetti — Director';
    } else if (pathname === '/editor') {
      document.title = 'Riccardo Fusetti — Editor';
    } else if (pathname === '/contact') {
      document.title = 'Riccardo Fusetti — Info / Contact';
    } else if (pathname.startsWith('/project/')) {
      const parts = pathname.split('/');
      const projectId = parts[2];
      const project = projects.find(p => p.id === projectId);
      if (project) {
        if (pathname.includes('/assets/')) {
          document.title = `${project.title} (Private Access) — Riccardo Fusetti`;
        } else {
          document.title = `${project.title} — Riccardo Fusetti`;
        }
      } else {
        document.title = 'Riccardo Fusetti';
      }
    } else {
      document.title = 'Riccardo Fusetti';
    }
  }, [pathname]);

  return null;
}

function MasterView() {
  const { category } = useParams<{ category: string }>();
  const activeCategory = category || 'director';
  const filteredProjects = projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32">
      <ThumbnailGrid projects={filteredProjects} />
    </div>
  );
}



function App() {
  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay pointer-events-none"></div>

      <RouteHandler />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<MasterView />} />
          <Route path="/director" element={<Navigate to="/" replace />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/project/:id/assets/:token" element={<PrivateProjectPage />} />
          {/* <Route path="/photography" element={<PhotographyPage />} /> */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/:category" element={<MasterView />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
