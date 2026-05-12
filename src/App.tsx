import { useState, useCallback } from "react";
import IntroScreen from "./components/IntroScreen";
import Header, { type Section } from "./components/Header";
import HomePage from "./pages/HomePage";
import SectionPlaceholder from "./components/SectionPlaceholder";
import StackPage from "./pages/StackPage";

function App() {
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

        {activeSection === "proyectos" && (
          <SectionPlaceholder title="Proyectos" />
        )}

        {activeSection === "stack" && <StackPage onNavigate={handleNavigate} />}

        {activeSection === "sobre-mi" && (
          <SectionPlaceholder title="Sobre mí" />
        )}

        {activeSection === "testimonios" && (
          <SectionPlaceholder title="Testimonios" />
        )}

        {activeSection === "contacto" && (
          <SectionPlaceholder title="Contacto" />
        )}
      </main>

      {introState !== "done" && (
        <IntroScreen
          onExitStart={() => setIntroState("exiting")}
          onDone={() => setIntroState("done")}
        />
      )}
    </>
  );
}

export default App;
