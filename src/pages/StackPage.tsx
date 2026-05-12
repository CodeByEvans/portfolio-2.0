import { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { LANGUAGES, CATEGORIES, type Language, type Category } from "../data/stack";
import type { Section } from "../components/Header";
import LanguageSelector from "../components/stack/LanguageSelector";
import MiniIDE from "../components/stack/MiniIDE";
import ConsoleTerminal from "../components/stack/ConsoleTerminal";
import CategoryButtons from "../components/stack/CategoryButtons";
import TechGrid from "../components/stack/TechGrid";

interface Props {
  onNavigate: (section: Section) => void;
}

export default function StackPage({ onNavigate }: Props) {
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [langExiting, setLangExiting] = useState(false);
  const [pendingLang, setPendingLang] = useState<Language | null>(null);
  const [showConsole, setShowConsole] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const sectionRef = useRef<HTMLElement>(null);
  const ideWrapperRef = useRef<HTMLDivElement>(null);
  const continueRef = useRef<HTMLDivElement>(null);
  const hasAnimatedContinue = useRef(false);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  const handleLangSelect = useCallback((lang: Language) => {
    setPendingLang(lang);
    setLangExiting(true);
  }, []);

  const handleLangExited = useCallback(() => {
    if (!pendingLang) return;
    const lang = pendingLang;
    setPendingLang(null);
    setLangExiting(false);
    setShowConsole(false);
    setShowCategories(false);
    setSelectedCategory(null);

    gsapCtxRef.current?.revert();

    setSelectedLang(lang);

    gsapCtxRef.current = gsap.context(() => {
      if (ideWrapperRef.current) {
        gsap.fromTo(
          ideWrapperRef.current,
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.7)" },
        );
      }
    }, sectionRef);
  }, [pendingLang]);

  const handleSwitchLang = useCallback((lang: Language) => {
    setSelectedCategory(null);
    setShowConsole(false);
    setShowCategories(false);
    setSelectedLang(lang);
  }, []);

  const handleTypingComplete = useCallback(() => {
    setShowConsole(true);
  }, []);

  const handleConsoleRevealed = useCallback(() => {
    setShowCategories(true);
  }, []);

  const handleCategoryClick = useCallback(
    (cat: Category) => {
      if (selectedCategory && selectedCategory.id !== cat.id) {
        gsap.to(".tech-card", {
          scale: 0.8,
          opacity: 0,
          duration: 0.15,
          stagger: 0.02,
          onComplete: () => setSelectedCategory(cat),
        });
      } else if (!selectedCategory) {
        setSelectedCategory(cat);
      }
    },
    [selectedCategory],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".stack-accent",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
      );
      tl.fromTo(
        ".stack-label",
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
        "-=0.2",
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => {
      gsapCtxRef.current?.revert();
    };
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      hasAnimatedContinue.current = false;
      return;
    }
    if (hasAnimatedContinue.current || !continueRef.current) return;
    hasAnimatedContinue.current = true;
    gsap.fromTo(
      ".continue-btn",
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.7)" },
    );
  }, [selectedCategory]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#080808] pt-20 pb-24 px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      <div className="flex flex-col items-center mb-12">
        <span className="stack-accent block w-8 h-[2px] bg-cyan-400/60 mb-3" />
        <span className="stack-label text-xs tracking-[0.3em] uppercase text-white/40 font-mono">
          Stack
        </span>
      </div>

      {!selectedLang && (
        <LanguageSelector
          languages={LANGUAGES}
          onSelect={handleLangSelect}
          exiting={langExiting}
          onExited={handleLangExited}
        />
      )}

      {selectedLang && (
        <div ref={ideWrapperRef} className="max-w-4xl mx-auto space-y-6">
          <MiniIDE
            filename={selectedLang.filename}
            code={selectedLang.code}
            onTypingComplete={handleTypingComplete}
          >
            {showConsole && (
              <ConsoleTerminal
                command={selectedLang.command}
                output={selectedLang.output}
                onRevealComplete={handleConsoleRevealed}
              />
            )}
          </MiniIDE>

          {showCategories && (
            <CategoryButtons
              categories={CATEGORIES}
              selectedId={selectedCategory?.id ?? null}
              onSelect={handleCategoryClick}
            />
          )}

          {selectedCategory && (
            <>
              <TechGrid
                key={selectedCategory.id}
                technologies={selectedCategory.technologies}
              />
              <div ref={continueRef} className="flex justify-center pt-2">
                <button
                  onClick={() => onNavigate("sobre-mi")}
                  className="continue-btn inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-400/30
                             text-cyan-300 text-sm font-medium tracking-wide
                             hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-colors cursor-pointer"
                >
                  Continuar
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}

          {showCategories && (
            <div className="flex justify-center gap-2 pt-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleSwitchLang(lang)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer
                    ${
                      selectedLang.id === lang.id
                        ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                        : "text-white/25 hover:text-white/50 border border-transparent hover:border-white/[0.08]"
                    }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
