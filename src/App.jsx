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

import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardLayout from "./pages/dashboard/Layout";

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white selection:bg-purple-500/30 overflow-x-hidden">

        <Routes>

          <Route path="/" element={
            <>
              <Header />
              <main className="relative w-full">
                <Hero />
                <Features />
                <Stats />
                <ProductShowcase />
                <Testimonials />
                <Pricing />
              </main>
              <Footer />
            </>
          } />

          <Route path="/plans" element={
            <>
              <Header />
              <main className="relative w-full"><Plans /></main>
              <Footer />
            </>
          } />

          <Route path="/about" element={
            <>
              <Header />
              <main className="relative w-full"><AboutUs /></main>
              <Footer />
            </>
          } />

          {/* ROTAS ISOLADAS (SEM HEADER E SEM FOOTER DA LANDING PAGE) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<DashboardLayout />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;