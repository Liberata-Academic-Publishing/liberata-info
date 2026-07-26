import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MenuDrawer from './MenuDrawer';
import ContactModal from './ContactModal';
import logoWhite from '../images/Logo_White.png'
import logoBlue from '../images/Logo_Blue.png'
import './Header.css';

function Header({ scrollToSection = () => { }, forceLight = false }) {
  //Control the animation of header when scrolled past Intro
  const location = useLocation();
  const [scrolledPastIntro, setscrolledPastIntro] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [stripIndent, setStripIndent] = useState(0);
  const productsRef = useRef<HTMLSpanElement | null>(null);
  const productsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openProducts = () => {
    if (productsCloseTimer.current) clearTimeout(productsCloseTimer.current);
    // align the strip's items under the Products trigger
    const trigger = productsRef.current;
    if (trigger) {
      const containerLeft = window.innerWidth * 0.04; // strip is 92vw, centered
      setStripIndent(Math.max(0, trigger.getBoundingClientRect().left - containerLeft));
    }
    setProductsOpen(true);
  };
  const closeProducts = () => {
    if (productsCloseTimer.current) clearTimeout(productsCloseTimer.current);
    productsCloseTimer.current = setTimeout(() => setProductsOpen(false), 150);
  };

  // Push the page hero down while the products menu is expanded
  useEffect(() => {
    document.body.classList.toggle('products-open', productsOpen);
    return () => document.body.classList.remove('products-open');
  }, [productsOpen]);
  useEffect(() => {
    if (location.pathname === "/beta-signup" || location.pathname === "/platforms") {
      setscrolledPastIntro(true);
      return;
    }

    const handleScroll = () => {
      const introBackground = document.getElementById("intro");
      // If we're on /beta-signup → force scrolled state
      if (!introBackground) {
        setscrolledPastIntro(true);
        return;
      }
      const introBackgroundHeight = introBackground?.offsetHeight || window.innerHeight;

      if (window.scrollY >= introBackgroundHeight * 0.9) {
        setscrolledPastIntro(true);
      } else {
        setscrolledPastIntro(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  const openContact = () => setContactOpen(true);

  return (
    <>
      <div className={`Header-wrapper ${(scrolledPastIntro && !forceLight) ? "scrolled" : ""}`}>
        <div className="Header-body">
          <span className="Header-nav">
            <Link to="/" id="Header-logo">
              <img src={(scrolledPastIntro && !forceLight) ? logoBlue : logoWhite} alt="Liberata logo" />
            </Link>
            <NavLink id="Header-overview" className="Header-navbar" to="/">
              Overview
            </NavLink>
            <span className="Header-products" ref={productsRef} onMouseEnter={openProducts} onMouseLeave={closeProducts} onFocus={openProducts} onBlur={closeProducts}>
              <NavLink to="/products" className="Header-navbar">
                Products ▾
              </NavLink>
            </span>
            {/* Temporarily hidden until content is curated:
            <NavLink to="/research" className="Header-navbar">
              Research
            </NavLink>
            <NavLink to="/team" className="Header-navbar">
              Team
            </NavLink>
            <NavLink to="/news" className="Header-navbar">
              News
            </NavLink> */}
          </span>

          <span className="Header-ctas">
            <button type="button" className="Header-cta Header-cta-outline" onClick={openContact}>
              Contact
            </button>
            <Link to="/beta-signup" className="Header-cta Header-cta-solid">
              Sign up for beta
            </Link>
          </span>

          <div className={`Header-hamburger ${scrolledPastIntro ? "scrolled" : ""}`}>
            <MenuDrawer onContact={openContact} />
          </div>
        </div>
        {productsOpen && (
          <div className="Header-products-strip" style={{ paddingLeft: stripIndent }} onMouseEnter={openProducts} onMouseLeave={closeProducts}>
            <Link to="/products/scriptura">Scriptura</Link>
            <Link to="/products/mensura">Mensura</Link>
            <Link to="/products/textura">Textura</Link>
            <Link to="/products/norma">Norma</Link>
          </div>
        )}
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}

export default Header
