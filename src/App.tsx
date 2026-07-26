import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OverviewPage from './pages/OverviewPage';
import TeamPage from './pages/TeamPage';
import Footer from './components/Footer';
import PlatformsPage from './pages/PlatformsPage';
import ProductsPage from './pages/ProductsPage';
import ScripturaPage from './pages/ScripturaPage';
import MensuraPage from './pages/MensuraPage';
import TexturaPage from './pages/TexturaPage';
import NormaPage from './pages/NormaPage';
import ResearchPage from './pages/ResearchPage';
import NewsPage from './pages/NewsPage';
import BetaSignupPage from './pages/BetaSignupPage';
import ScrollToTop from './utils/ScrollToTop';

// Serve from a subpath when PUBLIC_URL has one (e.g. the staging Pages site);
// resolves to "/" for production builds where PUBLIC_URL is the bare domain.
const BASENAME = new URL(process.env.PUBLIC_URL || "/", "https://liberata.info").pathname;

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
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/platforms" element={<PlatformsPage />} />
        <Route path="/beta-signup" element={<BetaSignupPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;