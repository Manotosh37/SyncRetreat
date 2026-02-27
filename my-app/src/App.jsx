import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './assets/Hero';
import Comparison from './assets/Comparision';
import Infra from './assets/Infra';
import Itinerary from './assets/Itinerary';
import Proof from './assets/Proof';
import Form from './assets/Form';
import Footer from './assets/Footer';
import Navbar from './assets/Navbar';
import Terms from './assets/2nd-layer-assets/Terms';
import Privacy from './assets/2nd-layer-assets/Privacy'
import Community from './assets/2nd-layer-assets/Community-Rules'
import About from './assets/2nd-layer-assets/About'
import FAQs from './assets/2nd-layer-assets/FAQs'
import Gift from './assets/2nd-layer-assets/gift'
import Goa from './assets/2nd-layer-assets/Goa'
import Ladakh from './assets/2nd-layer-assets/Ladakh'

function Home() {
  return (
    <>
    <h1 className='text-white text-4xl'>Test - Home is rendering</h1>
    <Hero />
      <Comparison />
      <Infra />
      <Itinerary />
      <Proof />
      <Form />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-[#0a0a0a]">
      <h1 className='text-white text-4xl'>Test - App is rendering</h1>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/terms' element={<Terms />} />
        <Route path = '/privacy' element={<Privacy />} />
        <Route path = '/community' element={<Community />} />
        <Route path = '/faqs' element={<FAQs />} />
        <Route path = '/goa' element={<Goa />} />
        <Route path = '/ladakh' element={<Ladakh />} />
        <Route path = '/gift' element={<Gift />} />
        <Route path = '/about' element={<About />} />
        </Routes>      
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
