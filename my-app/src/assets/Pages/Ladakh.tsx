import { useState } from "react";
import {Check, X, MapPin, Users, Calendar, Zap, Monitor, Home, Car, UtensilsCrossed} from "lucide-react";
import Navbar from "../Navbar";

function HeroSection() {
  const features = [
    { icon: Monitor, text: "Co-working Space" },
    { icon: Home, text: "Private Ensuite Room" },
    { icon: Car, text: "Acclimatization Driver" },
    { icon: UtensilsCrossed, text: "Chef-Prepared Meals" },
  ];
}

export default function Ladakh() {
  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0 }} className="">
        <Navbar />
      </div>
      <div style={{ paddingTop: "60px" }}></div>
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600242466690-c1c04f081762?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="ladakh"
          className="w-full h-full object-cover"
        />
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="flex items-center gap-3 text-white"></div>
        </div>
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4">
            High Altitude Retreat
          </p>
          
          <h1 className="text-6xl md:text-8xl font-serif tracking-wide mb-4">
            LADAKH.
          </h1>
          
          <p className="text-xl md:text-2xl tracking-widest uppercase mb-8">
            Leh, India
          </p>

          <div className="space-y-2 mb-8">
            <p className="text-lg md:text-xl">
              15 Jun - 30 Jun, 2026 - <span className="text-yellow-400">Last Spots</span>
            </p>
            <p className="text-lg md:text-xl">
              1 Jul - 15 Jul, 2026 - <span className="text-yellow-400">Last Spots</span>
            </p>
          </div>
          
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-16 text-white text-sm tracking-widest uppercase">
          <a href="#about" className="hover:text-gray-300 transition-colors cursor-pointer">
            About The Experience
          </a>
          <a href="#coliving" className="hover:text-gray-300 transition-colors cursor-pointer">
            Our Coliving Home
          </a>
      </div>        
        
      </div>
    </>
  );
}
