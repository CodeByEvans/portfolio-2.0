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

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const StackPage = ({ onNavigate }: Props) => {
  const [initialLoad] = useState(() => !!localStorage.getItem("stack-lang"));
  const [selectedLang, setSelectedLang] = useState<Language | null>(() => {
    const saved = localStorage.getItem("stack-lang");
    if (saved) {
      const found = LANGUAGES.find((l) => l.id === saved);
      if (found) return found;
    }
    return null;
  });
  const [langExiting, setLangExiting] = useState(false);
  const [pendingLang, setPendingLang] = useState<Language | null>(null);
  const [skipTyping, setSkipTyping] = useState(initialLoad);
  const [showConsole, setShowConsole] = useState(initialLoad);
  const [showCategories, setShowCategories] = useState(initialLoad);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [mobileShowLangs, setMobileShowLangs] = useState(false);
  const [ideCompact, setIdeCompact] = useState(false);
  const isMobile = useIsMobile();

  const sectionRef = useRef<HTMLElement>(null);
  const ideWrapperRef = useRef<HTMLDivElement>(null);
  const continueRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const hasAnimatedContinue = useRef(false);
  const gsapCtxRef = useRef<gsap.Context | null>(null);
  const autoSelected = useRef(false);

  // Auto-select first language on mobile if none saved
  useEffect(() => {
    if (isMobile && !selectedLang && !autoSelected.current) {
      autoSelected.current = true;
      const lang = LANGUAGES[0];
      localStorage.setItem("stack-lang", lang.id);
      setSelectedLang(lang);
    }
  }, [isMobile, selectedLang]);

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
    if (!showCategories) {
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
  }, [showCategories]);

  useEffect(() => {
    if (!mobileShowLangs) return;
    gsap.fromTo(
      ".lang-card",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)" },
    );
  }, [mobileShowLangs]);

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
    localStorage.setItem("stack-lang", lang.id);

    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(".ide-container", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
      tl.fromTo(".console-terminal", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, "-=0.15");
      tl.fromTo(".category-buttons", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, "-=0.15");
      tl.call(() => {
        setSkipTyping(false);
        setShowConsole(true);
        setShowCategories(true);
      });
    }, sectionRef);
    gsapCtxRef.current = gsapCtx;
  }, [pendingLang]);

  const handleSwitchLang = useCallback((lang: Language) => {
    gsapCtxRef.current?.revert();
    setSelectedCategory(null);
    setSkipTyping(false);
    setShowConsole(false);
    setShowCategories(false);
    setSelectedLang(lang);
    localStorage.setItem("stack-lang", lang.id);
  }, []);

  const handleCategoryClick = useCallback((cat: Category) => {
    setSelectedCategory(cat);
  }, []);

  const handleTypingComplete = useCallback(() => {
    setShowConsole(true);
  }, []);

  const handleConsoleRevealed = useCallback(() => {
    setShowCategories(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#080808] pt-20 pb-24 px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      <div className="flex flex-col items-center mb-8 sm:mb-12">
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

      {/* ---------- Mobile: Dashboard view ---------- */}
      {selectedLang && isMobile && (
        <div ref={mobileContentRef} className="space-y-5 max-w-xs mx-auto">
          {/* Dashboard grid: 4 categories + Languages */}
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setMobileShowLangs(false);
                  setSelectedCategory(cat);
                }}
                className={`p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer
                  ${selectedCategory?.id === cat.id && !mobileShowLangs
                    ? "border-cyan-400/40 bg-cyan-400/[0.06]"
                    : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
              >
                <cat.icon className="text-2xl text-white/70 mb-2" />
                <span className="block text-sm font-medium text-white">{cat.label}</span>
                <span className="block text-[10px] text-white/30 mt-0.5">{cat.description}</span>
              </button>
            ))}

            {/* Languages tile */}
            <button
              onClick={() => {
                setSelectedCategory(null);
                setMobileShowLangs(true);
              }}
              className={`p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer
                ${mobileShowLangs
                  ? "border-cyan-400/40 bg-cyan-400/[0.06]"
                  : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]"
                }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                className="text-white/70 mb-2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span className="block text-sm font-medium text-white">Lenguajes</span>
              <span className="block text-[10px] text-white/30 mt-0.5">Elige tu stack</span>
            </button>
          </div>

          {/* Show language cards */}
          {mobileShowLangs && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-white/25 uppercase tracking-wider font-mono">
                  Lenguajes
                </span>
                <button
                  onClick={() => setMobileShowLangs(false)}
                  className="text-[10px] text-cyan-400/60 font-mono"
                >
                  ← Volver
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.map((lang) => (
                  <div
                    key={lang.id}
                    className="lang-card flex items-center gap-3 p-3 rounded-xl border border-white/[0.06]
                      bg-white/[0.02]"
                  >
                    <lang.icon className="text-xl text-white/60 shrink-0" />
                    <span className="text-sm text-white/80 font-medium">{lang.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech grid for selected category */}
          {selectedCategory && !mobileShowLangs && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-white/25 uppercase tracking-wider font-mono">
                  {selectedCategory.label}
                </span>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-[10px] text-cyan-400/60 font-mono"
                >
                  ← Volver
                </button>
              </div>
              <TechGrid
                key={selectedCategory.id}
                technologies={selectedCategory.technologies}
              />
            </div>
          )}

          {/* Continue */}
          <div ref={continueRef} className="flex justify-center pt-1 pb-2">
            <button
              onClick={() => onNavigate("contacto")}
              className="continue-btn inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-400/30
                text-cyan-300 text-sm font-medium tracking-wide
                hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-colors cursor-pointer
                bg-[#080808]/80 backdrop-blur-sm"
            >
              Continuar
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ---------- Desktop: IDE + Console ---------- */}
      {selectedLang && !isMobile && (
        <div ref={ideWrapperRef} className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center gap-2">
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

          <MiniIDE
            filename={selectedLang.filename}
            code={selectedLang.code}
            onTypingComplete={handleTypingComplete}
            skipTyping={skipTyping}
            compact={ideCompact}
            onMinimize={() => setIdeCompact(!ideCompact)}
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
            <TechGrid
              key={selectedCategory.id}
              technologies={selectedCategory.technologies}
            />
          )}

          {showCategories && (
            <div ref={continueRef} className="flex justify-center pt-2">
              <button
                onClick={() => onNavigate("contacto")}
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
          )}
        </div>
      )}

    </section>
  );
};

export default StackPage;
