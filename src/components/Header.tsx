import React, { useState, useEffect } from 'react';
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

  // no close timer: the trigger's padding bridges the cursor's path to the
  // items, so open/close can react instantly
  const openProducts = () => setProductsOpen(true);
  const closeProducts = () => setProductsOpen(false);
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
            <span className={`Header-products ${productsOpen ? "open" : ""}`} onMouseEnter={openProducts} onMouseLeave={closeProducts} onFocus={openProducts} onBlur={closeProducts}>
              <NavLink to="/products" className="Header-navbar">
                Products ▸
              </NavLink>
              {/* always rendered so the slide-out can animate both ways */}
              <span className="Header-products-inline" aria-hidden={!productsOpen}>
                <Link to="/products/scriptura" tabIndex={productsOpen ? 0 : -1}>Scriptura</Link>
                <Link to="/products/mensura" tabIndex={productsOpen ? 0 : -1}>Mensura</Link>
                <Link to="/products/textura" tabIndex={productsOpen ? 0 : -1}>Textura</Link>
                <Link to="/products/norma" tabIndex={productsOpen ? 0 : -1}>Norma</Link>
              </span>
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
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}

export default Header
