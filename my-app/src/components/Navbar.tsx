import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { session } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Show logo and button after scrolling down 60% of the screen height
      if (window.scrollY > window.innerHeight * 0.6) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    setIsOpen(false);

    if (isHome) {
      const formElement = document.getElementById("application-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/?scrollTo=application-form");
    }
  };

  const showSides = !isHome || scrolledPastHero || isOpen;

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#1A2421] border-b border-white/5 backdrop-blur-xl transition-all duration-300">
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-20 relative">
          {/* Left: Logo */}
          <div className="w-1/3 flex justify-start">
            <AnimatePresence>
              {showSides && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Link to="/" className="flex items-center gap-3 shrink-0">
                    <img
                      src="./logo2.png"
                      alt="SyncRetreat"
                      className="w-auto h-8 brightness-0 invert"
                    />
                    <span className="text-white text-xl font-bold tracking-wide">
                      SyncRetreat
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center justify-center gap-8 text-sm font-bold text-slate-300 w-1/3">
            <Link
              to="/"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Home
            </Link>

            <div
              className="relative group py-8"
              onMouseEnter={() => setDestinationsOpen(true)}
              onMouseLeave={() => setDestinationsOpen(false)}
            >
              <button className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                <span>Locations</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {destinationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[80%] left-1/2 -translate-x-1/2 mt-2 w-150 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        to="/ladakh"
                        className="relative h-40 rounded-xl overflow-hidden group shadow-sm border border-slate-100"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1600242466690-c1c04f081762?q=80&w=1470&auto=format&fit=crop"
                          alt="Ladakh"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                        <span className="absolute inset-0 flex items-center justify-center text-white font-black text-3xl tracking-widest uppercase drop-shadow-lg">
                          Ladakh
                        </span>
                      </Link>
                      <Link
                        to="/goa"
                        className="relative h-40 rounded-xl overflow-hidden group shadow-sm border border-slate-100"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80"
                          alt="Goa"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                        <span className="absolute inset-0 flex items-center justify-center text-white font-black text-3xl tracking-widest uppercase drop-shadow-lg">
                          Goa
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* <Link
              to="/testimonials"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Testimonials
            </Link> */}
            <Link
              to="/blog"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              to="/howitworks"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              How it works
            </Link>
            <Link
              to="/about"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              About
            </Link>
          </div>

          {/* Right: Call to Action & Mobile Toggle */}
          <div className="w-1/3 flex justify-end items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <AnimatePresence>
                {showSides && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onClick={scrollToForm}
                    className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-500 shadow-md shadow-emerald-900/20 transition-all duration-200"
                  >
                    Apply Now
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Account Dropdown - Always visible on desktop */}
              <div className="relative">
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-1 pr-3 rounded-full transition-colors"
                >
                  {session?.user.user_metadata.avatar_url ? (
                    <img 
                      src={session.user.user_metadata.avatar_url} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover border border-white/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <Menu className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {accountMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 overflow-hidden"
                    >
                      {session ? (
                        <>
                          <Link
                            to="/bookings"
                            onClick={() => setAccountMenuOpen(false)}
                            className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                          >
                            Your Bookings
                          </Link>
                          <Link
                            to="/refer"
                            onClick={() => setAccountMenuOpen(false)}
                            className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                          >
                            Refer a Friend
                          </Link>
                          <Link
                            to="/account"
                            onClick={() => setAccountMenuOpen(false)}
                            className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                          >
                            Account
                          </Link>
                          <div className="border-t border-slate-100 my-1"></div>
                          <button
                            onClick={async () => {
                              await supabase.auth.signOut();
                              setAccountMenuOpen(false);
                              navigate("/");
                            }}
                            className="w-full text-left px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-colors"
                          >
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            onClick={() => setAccountMenuOpen(false)}
                            className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/signup"
                            onClick={() => setAccountMenuOpen(false)}
                            className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                          >
                            Create an Account
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Expansion */}
      {isOpen && (
        <div className="md:hidden bg-[#1A2421] border-t border-white/10 h-screen">
          <div className="px-6 py-6 flex flex-col gap-5 text-base font-bold text-slate-300">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
            <div className="text-emerald-500 text-xs font-black uppercase tracking-widest border-b border-white/10 pb-2 mb-2">
              Destinations
            </div>
            <Link
              to="/ladakh"
              onClick={() => setIsOpen(false)}
              className="pl-4 hover:text-emerald-400 transition-colors"
            >
              Ladakh
            </Link>
            <Link
              to="/goa"
              onClick={() => setIsOpen(false)}
              className="pl-4 hover:text-emerald-400 transition-colors"
            >
              Goa
            </Link>
            <div className="border-t border-white/10 pt-4 mt-2"></div>
            {/* <Link
              to="/testimonials"
              onClick={() => setIsOpen(false)}
              className="hover:text-emerald-400 transition-colors"
            >
              Testimonials
            </Link> */}
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="hover:text-emerald-400 transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/howitworks"
              onClick={() => setIsOpen(false)}
              className="hover:text-emerald-400 transition-colors"
            >
              How it works
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="hover:text-emerald-400 transition-colors"
            >
              About
            </Link>

            <div className="border-t border-white/10 pt-4 mt-2">
              <button
                onClick={scrollToForm}
                className="w-full bg-emerald-600 text-white px-6 py-4 rounded-xl font-black text-lg hover:bg-emerald-500 transition-all active:scale-95 shadow-lg shadow-emerald-900/40"
              >
                APPLY NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
