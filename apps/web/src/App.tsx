import { Helmet } from "react-helmet-async";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Leadership } from "./components/sections/Leadership";
import { Expertise } from "./components/sections/Expertise";
import { Education } from "./components/sections/Education";
import { Insights } from "./components/sections/Insights";
import { Contact } from "./components/sections/Contact";
import { useSettings } from "./lib/useSettings";

function isVisible(v: Record<string, boolean> | undefined, key: string) {
  if (!v) return true;
  return v[key] !== false;
}

function App() {
  const { data } = useSettings();
  const v = data.sectionVisibility;
  const seoTitle = data.seo?.title || "Subodh Rayamajhee";
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
        {isVisible(v, "leadership") && <Leadership />}
        {isVisible(v, "expertise") && <Expertise />}
        {isVisible(v, "education") && <Education />}
        {isVisible(v, "insights") && <Insights />}
        {isVisible(v, "contact") && <Contact />}
      </main>
      <Footer />
    </div>
  );
}

export default App;