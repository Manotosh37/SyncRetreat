import Hero from './assets/Hero';
import Comparison from './assets/Comparision';
import Infra from './assets/Infra';
import Itinerary from './assets/Itinerary';
import Proof from './assets/Proof';
import Form from './assets/Form';
import Footer from './assets/Footer';
import Navbar from './assets/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <Comparison />
      <Infra />
      <Itinerary />
      <Proof />
      <Form />
      <Footer />
    </div>
  );
}

export default App;
