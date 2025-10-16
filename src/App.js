import React from 'react';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor/Cursor';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator';
import './App.css';

function App() {
  return (
    <div className="App">
      <ParticleBackground />
      <Cursor />
      <ScrollIndicator />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
