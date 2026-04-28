import Header from "./pages/Header";
import Hero from "./pages/Hero";
import Features from "./pages/Features";
import Stats from "./pages/Stats";
import ProductShowcase from "./components/ProductShowcase";
import Testimonials from "./pages/Testimonials";
import Pricing from "./pages/Pricing";

function App() {
  return (

    <div className="App bg-[#000000] min-h-screen text-white selection:bg-purple-500/30">
      <Header />
      <main className="relative">
        <Hero />
        <Features />
        <Stats />
        <ProductShowcase />
        <Testimonials />
        <Pricing />
      </main>
    </div>
  );
}

export default App;