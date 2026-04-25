import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import Infra from "./components/Infra";
import Form from "./components/Calendar";
import Why from "./pages/Why";
import CommunitySection from "./pages/CommunitySection";
import TestimonialsSection from "./pages/TestimonialsSection";
import FaqSection from "./pages/FaqSection";

const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const CommunityRules = lazy(() => import("./pages/Community-Rules"));
const About = lazy(() => import("./pages/About"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Goa = lazy(() => import("./pages/Goa"));
const Ladakh = lazy(() => import("./pages/Ladakh"));
const Works = lazy(() => import("./pages/Howitworks"));
const Admin = lazy(() => import("./pages/admin"));
const NotFound = lazy(() => import("./pages/notfound"));

import { AuthProvider } from "./lib/AuthContext";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Account = lazy(() => import("./pages/Account"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Refer = lazy(() => import("./pages/Refer"));
const Checkout = lazy(() => import("./pages/Checkout"));
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

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
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fefbf7]"><div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
              {/* <Core Page /> */}
              <Route path="/" element={<Home />} />
              <Route path="/howitworks" element={<Works />} />
              <Route path="/about" element={<About />} />

              {/* Auth & Account */}
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
              <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
              <Route path="/refer" element={<ProtectedRoute><Refer /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

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
              <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><Admin /></ProtectedRoute>} />

              {/* <Fallback /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
