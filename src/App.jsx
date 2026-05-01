import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Hero from "./pages/Hero";
import Features from "./pages/Features";
import Stats from "./pages/Stats";
import ProductShowcase from "./components/ProductShowcase";
import Testimonials from "./pages/Testimonials";
import Pricing from "./pages/Pricing";
import Footer from "./pages/Footer";
import Plans from "./pages/Plans";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <div className="bg-[#030712] min-h-screen text-white selection:bg-purple-500/30 overflow-x-hidden">
        <Header />
        <main className="relative w-full">
          <Routes>
            {/* Rota da Home*/}
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <Stats />
                <ProductShowcase />
                <Testimonials />
                <Pricing />
              </>
            } />

            <Route path="/plans" element={<Plans />} />
            <Route path="/about" element={<AboutUs />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;