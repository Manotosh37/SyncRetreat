import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './assets/Hero';
import Comparison from './assets/Comparision';
import Infra from './assets/Infra';
import Itinerary from './assets/Itinerary';
import Proof from './assets/Proof';
import Form from './assets/Form';
import Footer from './assets/Footer';
import Navbar from './assets/Navbar';
import Terms from './assets/Pages/Terms'
import Privacy from './assets/Pages/Privacy'
import Community from './assets/Pages/Community-Rules'
import About from './assets/Pages/About'
import FAQs from './assets/Pages/FAQs'
import Gift from './assets/Pages/gift'
import Goa from './assets/Pages/Goa'
import Ladakh from './assets/Pages/Ladakh'
import Works from './assets/Pages/Howitworks';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Admin from './assets/Pages/admin';

function Home() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");
    
    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <Comparison />
      <Infra />
      <Itinerary />
      <Proof />
      <div id="application-form">
        <Form />
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/terms' element={<Terms />} />
        <Route path = '/privacy' element={<Privacy />} />
        <Route path = '/community' element={<Community />} />
        <Route path='/howitworks' element={<Works />} />
        <Route path = '/faqs' element={<FAQs />} />
        <Route path = '/goa' element={<Goa />} />
        <Route path = '/ladakh' element={<Ladakh />} />
        <Route path = '/gift' element={<Gift />} />
        <Route path = '/about' element={<About />} />
        <Route path='/admin' element={<Admin />}/>
        </Routes>      
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
