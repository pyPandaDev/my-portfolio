import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navigation/Navbar';
import Hero from './components/Hero/Hero';
import Cursor from './components/Cursor/Cursor';
import ThemeTransition from './components/ThemeTransition/ThemeTransition';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ChatBot from './components/ChatBot/ChatBot';
import './App.css';

// Lazy load components for performance
const About = lazy(() => import('./components/About/About'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const Certifications = lazy(() => import('./components/Certifications/Certifications'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));

function App() {
  return (
    <ThemeProvider>
      <ThemeTransition />
      <div className="App bg-white dark:bg-black min-h-screen transition-colors duration-500">
        <ParticleBackground />
        <Cursor />
        <Navbar />
        <ChatBot />
        <main>
          <Hero />
          <Suspense fallback={<LoadingSpinner />}>
            <About />
            <Skills />
            <Certifications />
            <Projects />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-20 bg-white dark:bg-black" />}>
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;
