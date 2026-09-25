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
import { MotionConfig } from "motion/react";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(typeof window !== 'undefined' && window.location.hash === '#admin');

  useEffect(() => {
    const onHash = () => setShowAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    // Respect the OS "reduce motion" setting for all motion animations
    <MotionConfig reducedMotion="user">
      <div className="page-shell">
        {showAdmin ? (
          <Admin />
        ) : (
          <>
            <Navigation />
            <main>
              <Hero />
              <ITCourses />
              <SpokenEnglishCourse />
              <AssetProgram />
              <WhyChoose />
              <Contact />
            </main>
            <Footer />
            <ScrollToTop />
          </>
        )}
      </div>
    </MotionConfig>
  );
}
