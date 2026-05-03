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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
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

      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/director" replace />} />
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
