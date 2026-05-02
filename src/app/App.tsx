import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { SpokenEnglishCourse } from "./components/SpokenEnglishCourse";
import { ITCourses } from "./components/ITCourses";
import { AssetProgram } from "./components/AssetProgram";
import { WhyChoose } from "./components/WhyChoose";
import { Contact } from "./components/Contact";
import Admin from "./components/Admin";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { useEffect, useState } from "react";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(typeof window !== 'undefined' && window.location.hash === '#admin');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const onHash = () => setShowAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="page-shell">
      {showAdmin ? (
        <Admin />
      ) : (
        <>
          <Navigation />
          <Hero />
          <SpokenEnglishCourse />
          <ITCourses />
          <AssetProgram />
          <WhyChoose />
          <Contact />
          <Footer />
          <ScrollToTop />
        </>
      )}
    </div>
  );
}