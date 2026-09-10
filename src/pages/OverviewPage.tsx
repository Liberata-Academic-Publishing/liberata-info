import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Header from '../components/Header';
import Hook from '../components/Hook';
import KeyConcepts from '../components/KeyConcepts';
import AcademicPublishingProblems from '../components/AcademicPublishingProblems'
import '../App.css';

function OverviewPage() {
  const introRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const MISSION_TEXT = "To democratize an academic review system influenced by politics";
  const TYPING_SPEED = 25;
  const [displayedText, setDisplayedText] = useState("");
  const textRef = useRef(null);
  const [hasTypingStarted, setHasTypingStarted] = useState(false);

  // Section observer
  useEffect(() => {
    const sectionItems = document.getElementsByClassName("App-section");
    const observerCallback = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0px)";
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback);
    Array.from(sectionItems).forEach((e) => {
      observer.observe(e);
    });
  }, []);

  // Set up another observer to highlight the current section in the right nav bar
  useEffect(() => {
    const missionSection = document.getElementById("App-mission");
    const academicProblemsSection = document.getElementById("App-publishing-problems");
    const solutionSection = document.getElementById("App-solutions");
    const missionNav = document.getElementById("mission-nav");
    const acaPublishNav = document.getElementById("acaPublish-nav")
    const solutionNav = document.getElementById("solution-nav");

    let prev: any;
    const observerOptions = {
      root: null,
      threshold: 0.6, // only trigger when 60% of section is visible
    };
    const observerCallback = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (prev) {
            prev.classList.remove('section-active');
          }
          switch (entry.target.id) {
            case "App-mission":
              if (missionNav) {
                missionNav.classList.add('section-active');
                prev = missionNav;
              }
              break;
            case "App-publishing-problems":
              if (acaPublishNav) {
                acaPublishNav.classList.add('section-active');
                prev = acaPublishNav;
              }
              break;
            case "App-solutions":
              if (solutionNav) {
                solutionNav.classList.add('section-active');
                prev = solutionNav;
              }
              break;
            default:
              if (prev) {
                prev.classList.remove('section-active');
              }
              break;
          }
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    missionSection && observer.observe(missionSection);
    academicProblemsSection && observer.observe(academicProblemsSection);
    solutionSection && observer.observe(solutionSection);
    return () => observer.disconnect();
  }, []);

  // Add slight overlay shift when user moves mouse inside landing page
  // (mouse-driven devices only — taps on touch screens fire synthetic
  // mouse events that would make the overlay jump)
  useEffect(() => {
    const intro: HTMLElement | null = introRef.current;
    const overlay: HTMLElement | null = overlayRef.current;
    if (!intro || !overlay) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function handleMouseMove(e: MouseEvent) {
      if (!intro || !overlay) return;
      const rect = intro.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const moveX = (x * 50) + (y * 50);
      const moveY = x * 20;
      overlay.style.transform = `translate(${moveX}px,  ${moveY}px)`;
    }

    function handleMouseLeave() {
      if (!intro || !overlay) return;
      overlay.style.transform = `rotateX(0deg) rotateY(0deg)`; // reset
    }

    intro.addEventListener("mousemove", handleMouseMove);
    intro.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      intro.removeEventListener("mousemove", handleMouseMove);
      intro.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // The overlay is oversized on mobile (inset in App.css) so it has enough
  // spare image to rotate around a corner without ever exposing a bare
  // edge. That means background-size/-position (both percentages of the
  // overlay's OWN, now-enlarged box) can no longer reproduce the original
  // background-size:200% / position:center 120% crop — so instead we
  // compute the equivalent in pixels here, measured against the hero's
  // actual rendered size, and set it directly. Recomputed on resize since
  // it depends on the hero's real width.
  useLayoutEffect(() => {
    const intro: HTMLElement | null = introRef.current;
    const overlay: HTMLElement | null = overlayRef.current;
    if (!intro || !overlay) return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    // BG_overlay.png's own dimensions (3883 x 2519)
    const IMAGE_ASPECT = 2519 / 3883;

    function layout() {
      if (!intro || !overlay) return;
      const heroRect = intro.getBoundingClientRect();
      const boxRect = overlay.getBoundingClientRect();

      const imageW = heroRect.width * 2; // matches the original background-size: 200%
      const imageH = imageW * IMAGE_ASPECT;

      // where the image should sit relative to the hero — the same math
      // "background-position: center 120%" used back when this element was
      // exactly hero-sized
      const imageLeftRel = heroRect.width / 2 - imageW / 2;
      const imageTopRel = (heroRect.height - imageH) * 1.2;

      // re-expressed relative to the overlay's own (now oversized) box,
      // since that's what background-position is actually measured from
      const boxLeftRel = boxRect.left - heroRect.left;
      const boxTopRel = boxRect.top - heroRect.top;

      overlay.style.backgroundSize = `${imageW}px auto`;
      overlay.style.backgroundPosition = `${imageLeftRel - boxLeftRel}px ${imageTopRel - boxTopRel}px`;
    }

    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, []);

  // Touch devices have no persistent pointer position for the effect above,
  // so on mobile the overlay instead rotates based on how far the hero has
  // scrolled out of view — 0deg at the top, up to 20deg (clockwise, i.e.
  // sweeping to the right) once it's scrolled fully past. It's anchored at
  // the hero's bottom-left corner (transform-origin, set in App.css) and
  // oversized to match (inset, also in App.css) so the rotation never
  // exposes an edge of the image past where the star pattern reaches.
  useEffect(() => {
    const intro: HTMLElement | null = introRef.current;
    const overlay: HTMLElement | null = overlayRef.current;
    if (!intro || !overlay) return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function handleScroll() {
      if (!intro || !overlay) return;
      const rect = intro.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      overlay.style.transform = `rotate(${progress * 20}deg)`;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTypingStarted) {
            setHasTypingStarted(true);
            obs.unobserve(el); // run only once
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTypingStarted]);

  useEffect(() => {
    if (!hasTypingStarted) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(MISSION_TEXT.slice(0, i + 1));
      i++;
      if (i >= MISSION_TEXT.length) clearInterval(interval);
    }, TYPING_SPEED);

    return () => clearInterval(interval);
  }, [hasTypingStarted, MISSION_TEXT, TYPING_SPEED]);

  return (
    <div className="App">
      <div className="App-intro" ref={introRef} id="intro">
        {/* Page header */}
        <Header />
        <div className="App-section" id="section-hook">
          <Hook
            header="Introducing Liberata."
            subheader="Using game theory & graph theory to solve entrenched problems with academic publishing."
            subtext="Open access academic publishing with incentivized quality controls."
          />
        </div>

        {/* Intro background */}
        <div className="App-background">
          <div className="App-background-overlay" ref={overlayRef}></div>
          <div className="App-background-gradient"></div>
        </div>
      </div>

      <div className="App-body-container">
        <div className="App-column-container">
          <div className="App-column-left">
            <div className="App-section App-col-left-section" id="App-publishing-problems">
              <div className="section-heading">/Academic Publishing Problems</div>
              <div className="section-description">Academic publishing today suffers from merit, economic, and societal problems arising from maligned legacy incentive structures
                
              </div>
              <AcademicPublishingProblems />
            </div>
            <div className="App-section App-col-left-section" id="App-mission">
              <div className="section-heading">/Liberata's Mission</div>
              <div id="mission-heading" ref={textRef}>
                {displayedText}
              </div>
              <div id="mission-body">
                Our existing academic review system is influenced by politics in places where it should be impartial. With an open-source publishing platform that follows a shareholder model distribution of credit, Liberata seeks to reward all academic contributors fairly.
              </div>
            </div>
            <div className="App-section App-col-left-section" id="App-solutions">
              <div className="section-heading">/Key Concepts</div>
              <KeyConcepts />
            </div>
          </div>

          <div className="App-column-right">
            <a href="#App-publishing-problems" id="acaPublish-nav">Academic Publishing Problems</a>
            <a href="#App-mission" id="mission-nav">Liberata's Mission</a>
            <a href="#App-solutions" id="solution-nav">Key Concepts</a>
          </div>
        </div>

      </div>
    </div>
  );
}
export default OverviewPage;
