import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import OverviewPage from './pages/OverviewPage';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import PlatformsPage from './pages/PlatformsPage';
import ProductsPage from './pages/ProductsPage';
import ScripturaPage from './pages/ScripturaPage';
import MensuraPage from './pages/MensuraPage';
import TexturaPage from './pages/TexturaPage';
import NormaPage from './pages/NormaPage';
import BetaSignupPage from './pages/BetaSignupPage';
import FaqsPage from './pages/FaqsPage';
// Temporarily hidden until content is curated — see the commented routes below.
// import ResearchPage from './pages/ResearchPage';
// import TeamPage from './pages/TeamPage';
// import NewsPage from './pages/NewsPage';
import ScrollToTop from './utils/ScrollToTop';

// Serve from a subpath when the build has one (e.g. the staging Pages site).
// Vite sets BASE_URL from the `base` option, so this is "/staging/" there and
// "/" for production.
const BASENAME = import.meta.env.BASE_URL;

function App() {
  return(
    <BrowserRouter basename={BASENAME}>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<OverviewPage/>}/>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/scriptura" element={<ScripturaPage />} />
        <Route path="/products/mensura" element={<MensuraPage />} />
        <Route path="/products/textura" element={<TexturaPage />} />
        <Route path="/products/norma" element={<NormaPage />} />
        {/* Temporarily hidden until content is curated:
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/news" element={<NewsPage />} /> */}
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/platforms" element={<PlatformsPage />} />
        <Route path="/beta-signup" element={<BetaSignupPage/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer/>
      <BackToTop/>
    </BrowserRouter>
  );
}

export default App;