import { Feature } from "framer-motion";
import Header from "./pages/Header";
import Hero from "./pages/Hero";
import Features from "./pages/Features";
import Stats from "./pages/Stats";


function App() {
  return (
    <div className="App bg-[#07080f] min-h-screen text-white">
      <Header />
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <Hero />
        <Features />
        <Stats />
      </main>
    </div>
  )
}

export default App;