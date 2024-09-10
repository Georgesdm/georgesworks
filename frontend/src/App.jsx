import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Stats from "./components/Stats/Stats";
import Skills from "./components/Skills/Skills";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
