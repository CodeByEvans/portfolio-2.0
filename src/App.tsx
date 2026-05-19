import { useState, useCallback } from "react";
import IntroScreen from "./components/IntroScreen";
import Header, { type Section } from "./components/Header";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import StackPage from "./pages/StackPage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutMePage from "./pages/AboutMePage";

const App = () => {
  const [introState, setIntroState] = useState<"playing" | "exiting" | "done">(
    "playing",
  );
  const [activeSection, setActiveSection] = useState<Section>("inicio");

  const showMain = introState !== "playing";

  const handleNavigate = useCallback((section: Section) => {
    setActiveSection(section);
  }, []);

  return (
    <>
      <main
        className="min-h-screen bg-[#080808] text-white transition-opacity duration-500"
        style={{ opacity: showMain ? 1 : 0 }}
      >
        <Header active={activeSection} onNavigate={handleNavigate} />

        {activeSection === "inicio" && (
          <HomePage animate={showMain} onNavigate={handleNavigate} />
        )}

        {activeSection === "sobre-mi" && (
          <AboutMePage onNavigate={handleNavigate} />
        )}

        {activeSection === "proyectos" && (
          <ProjectsPage onNavigate={handleNavigate} />
        )}

        {activeSection === "stack" && <StackPage onNavigate={handleNavigate} />}

        {activeSection === "contacto" && <ContactPage />}
      </main>

      {introState !== "done" && (
        <IntroScreen
          onExitStart={() => setIntroState("exiting")}
          onDone={() => setIntroState("done")}
        />
      )}
    </>
  );
};

export default App;
