import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Hook from '../components/Hook';
import Contact from '../components/Contact';
import KeyConcepts from '../components/KeyConcepts';
import AcademicPublishingProblems from '../components/AcademicPublishingProblems'
import FAQAccordion from '../components/FAQAccordion';
import '../App.css';

function OverviewPage() {
  const introRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef(null);
  const contactRef = useRef(null);

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
    const overviewVideoSection = document.getElementById("App-overview-video");
    const solutionSection = document.getElementById("App-solutions");
    const faqSection = document.getElementById("App-faq");
    const missionNav = document.getElementById("mission-nav");
    const acaPublishNav = document.getElementById("acaPublish-nav")
    const overviewNav = document.getElementById("overview-nav");
    const solutionNav = document.getElementById("solution-nav");
    const faqNav = document.getElementById("faq-nav");

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
            case "App-overview-video":
              if (overviewNav) {
                overviewNav.classList.add('section-active');
                prev = overviewNav;
              }
              break;
            case "App-solutions":
              if (solutionNav) {
                solutionNav.classList.add('section-active');
                prev = solutionNav;
              }
              break;
            case "App-faq":
              if (faqNav) {
                faqNav.classList.add('section-active');
                prev = faqNav;
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
    overviewVideoSection && observer.observe(overviewVideoSection);
    solutionSection && observer.observe(solutionSection);
    faqSection && observer.observe(faqSection);
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
              <div style={{ color: 'var(--grey-text)', fontSize: '1.2rem', marginTop: '5vh', marginBottom: "24px" }}>Academic publishing today suffers from merit, economic, and societal problems arising from maligned legacy incentive structures
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
            <div className="App-section App-col-left-section" id="App-overview-video">
              <div className="section-heading">/The Liberata System</div>
              <div style={{ color: 'var(--grey-text)', fontSize: '1.2rem', marginBottom: '10vh' }}>Watch a brief overview video explaining the Liberata system.</div>

              {/* Since they are large files, our explainer videos must be stored in AWS. */}
              <video ref={videoRef} src="https://liberata-overview-videos.s3.us-east-1.amazonaws.com/Cover_Edited_Liberata+Overview.mp4" width="100%" id="section-one-video" controls muted />
            </div>
            <div className="App-section App-col-left-section" id="App-solutions">
              <div className="section-heading">/Key Concepts</div>
              <KeyConcepts />
            </div>
            <div className="App-section App-col-left-section" id="App-faq">
              <div className="section-heading">/FAQ</div>
              <div id="faq-heading">Frequently Asked Questions</div>
              <FAQAccordion />
            </div>
          </div>

          <div className="App-column-right">
            <a href="#App-publishing-problems" id="acaPublish-nav">Academic Publishing Problems</a>
            <a href="#App-mission" id="mission-nav">Liberata's Mission</a>
            <a href="#App-overview-video" id="overview-nav">The Liberata System</a>
            <a href="#App-solutions" id="solution-nav">Key Concepts</a>
            <a href="#App-faq" id="faq-nav">FAQ</a>
          </div>
        </div>

        {/* Contact form */}
        <div className="App-section" ref={contactRef} id="section-contact">
          <Contact />
        </div>
      </div>
    </div>
  );
}
export default OverviewPage;
