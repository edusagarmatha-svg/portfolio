import { Helmet } from "react-helmet-async";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Education } from "./components/sections/Education";
import { Certifications } from "./components/sections/Certifications";
import { Services } from "./components/sections/Services";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";
import { useSettings } from "./lib/useSettings";

function isVisible(v: Record<string, boolean> | undefined, key: string) {
  if (!v) return true;
  return v[key] !== false;
}

function App() {
  const { data } = useSettings();
  const v = data.sectionVisibility;
  const seoTitle = data.seo?.title || "Portfolio";
  const seoDesc = data.seo?.description || "";

  return (
    <div className="min-h-screen bg-bg text-text">
      <Helmet>
        <title>{seoTitle}</title>
        {seoDesc && <meta name="description" content={seoDesc} />}
        <meta property="og:title" content={seoTitle} />
        {seoDesc && <meta property="og:description" content={seoDesc} />}
      </Helmet>
      <Header />
      <main>
        {isVisible(v, "hero") && <Hero />}
        {isVisible(v, "about") && <About />}
        {isVisible(v, "experience") && <Experience />}
        {isVisible(v, "projects") && <Projects />}
        {isVisible(v, "skills") && <Skills />}
        {isVisible(v, "education") && <Education />}
        {isVisible(v, "certifications") && <Certifications />}
        {isVisible(v, "services") && <Services />}
        {isVisible(v, "testimonials") && <Testimonials />}
        {isVisible(v, "contact") && <Contact />}
      </main>
      <Footer />
    </div>
  );
}

export default App;