import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PageLoader from "./components/PageLoader/PageLoader";
import MobileLiteRoot from "./components/MobileLiteRoot/MobileLiteRoot";
import Home from "./pages/Home/Home";

const CursorGlow = lazy(() => import("./components/CursorGlow/CursorGlow"));

/*
  Performance: Home is eager (LCP hero); other routes stay code-split.
*/
const Portfolio = lazy(() => import("./pages/Portfolio/Portfolio"));
const Services = lazy(() => import("./pages/Services/Services"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));

function App() {
  return (
    <BrowserRouter>
      <MobileLiteRoot>
      <div className="app">
        <div className="app__ambient" aria-hidden />
        <Suspense fallback={null}>
          <CursorGlow />
        </Suspense>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="app-main" tabIndex={-1}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Navigate to="/about" replace />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      </MobileLiteRoot>
    </BrowserRouter>
  );
}

export default App;
