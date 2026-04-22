import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Footer from "./assets/Footer";
import Navbar from "./assets/Navbar";

import Hero from "./assets/Hero";
import Infra from "./assets/Infra";
import Form from "./assets/Calendar";
import Why from "./assets/Pages/Why";
import CommunitySection from "./assets/Pages/CommunitySection";
import TestimonialsSection from "./assets/Pages/TestimonialsSection";
import TestimonialsPage from "./assets/Pages/TestimonialsPage";
import BlogPage from "./assets/Pages/BlogPage";
import BlogPost from "./assets/Pages/BlogPost";
import FaqSection from "./assets/Pages/FaqSection";

import Terms from "./assets/Pages/Terms";
import Privacy from "./assets/Pages/Privacy";
import CommunityRules from "./assets/Pages/Community-Rules";
import About from "./assets/Pages/About";
import FAQs from "./assets/Pages/FAQs";
import Goa from "./assets/Pages/Goa";
import Ladakh from "./assets/Pages/Ladakh";
import Works from "./assets/Pages/Howitworks";
import Admin from "./assets/Pages/admin";
import NotFound from "./assets/Pages/notfound";
import { AuthProvider } from "./lib/AuthContext";
import Login from "./assets/Pages/Login";
import Signup from "./assets/Pages/Signup";
import Account from "./assets/Pages/Account";
import Bookings from "./assets/Pages/Bookings";
import Refer from "./assets/Pages/Refer";
import Checkout from "./assets/Pages/Checkout";

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
      <div id="application-form">
        <Form />
      </div>
      <Why />
      <CommunitySection />
      <Infra />
      <FaqSection />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#fefbf7]">
          <Navbar />
          <Routes>
            {/* <Core Page /> */}
            <Route path="/" element={<Home />} />
            <Route path="/howitworks" element={<Works />} />
            <Route path="/about" element={<About />} />

            {/* Auth & Account */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/refer" element={<Refer />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* <Destinations /> */}
            <Route path="/goa" element={<Goa />} />
            <Route path="/ladakh" element={<Ladakh />} />

            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* <Legal /> */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/community" element={<CommunityRules />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/faqs" element={<FAQs />} />

            {/* Internal */}
            <Route path="/admin" element={<Admin />} />
            {/* <Route path = '/gift' element={<Gift />} /> */}

            {/* <Fallback /> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
