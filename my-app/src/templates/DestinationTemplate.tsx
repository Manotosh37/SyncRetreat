"use client";
import React, { useState } from "react";
import { Check, X, FileText, Download } from "lucide-react";
import Navbar from "../components/Navbar";
import {
  COMMUNITY,
} from "../lib/shared-constants";

export interface DestinationConfig {
  id: string; // e.g., "ladakh", "goa"
  name: string; // e.g., "Ladakh", "Goa"
  isCompleted?: boolean; // If true, retreat is done and booking is disabled

  hero: {
    image: string;
    subtitle: string;
    title: string;
    locationText: string;
    dateRangeText: string;
    sprintText: string;
  };

  about: {
    heading: string;
    features: { icon: React.ElementType; text: string }[];
    activities: { image: string; title: string; description: string }[];
  };

  pricing: {
    deposit: number;
    included: string[];
    notIncluded: string[];
    staticOriginal?: number; // Used for Goa
    isStatic?: boolean; // If true, don't show dynamic trip pricing
  };

  places: {
    title: string;
    day1: string;
    day2: string;
    image: string;
  }[];

  homestays: {
    sectionTitle: string;
    images: string[];
  };

  trips: {
    fromDate: string;
    toDate: string;
    tripNumber: string;
    status: string;
    batchId: number;
    price?: number;
    originalPrice?: number;
  }[];

  documents: {
    name: string;
    file: string;
  }[];

  formDestinationOptions: string[];
}

import { DepositBookingCard } from "../components/DepositBookingCard";
import { Card, ImgCard, PlaceCard, Section } from "../components/DestinationUI";

// ============= MAIN TEMPLATE =============

export default function DestinationTemplate({
  config,
}: {
  config: DestinationConfig;
}) {
  const [selectedBatch, setSelectedBatch] = useState<number>(1);

  const selectedTrip =
    config.trips.find((t) => t.batchId === selectedBatch) || config.trips[0];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="pt-15" />

      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={config.hero.image}
          alt={config.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 drop-shadow-md">
            {config.hero.subtitle}
          </p>
          <h1 className="text-6xl md:text-8xl font-serif tracking-wide mb-4 drop-shadow-lg">
            {config.hero.title}
          </h1>
          <p className="text-xl md:text-2xl tracking-widest uppercase mb-8 drop-shadow-md">
            {config.hero.locationText}
          </p>
          <div className="space-y-2 mb-8 drop-shadow-md">
            <p className="text-lg md:text-xl">{config.hero.dateRangeText}</p>
            <p className="text-lg md:text-xl">{config.hero.sprintText}</p>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-16 text-white text-sm uppercase drop-shadow-md">
          <a href="#about" className="hover:text-emerald-300 transition-colors">
            About
          </a>
          <a
            href="#coliving"
            className="hover:text-emerald-300 transition-colors"
          >
            Coliving Home
          </a>
        </div>
      </div>

      <Section>
        <div className="grid md:grid-cols-3 gap-12" id="about">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">
              {config.about.heading}
            </h2>
            <div className="flex flex-wrap gap-8 my-10 border-y border-slate-200 py-6">
              {config.about.features.map((f, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 text-slate-700"
                >
                  <f.icon className="w-8 h-8 text-emerald-600" />
                  <span className="text-xs uppercase tracking-wider">
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-slate-900 mb-10">
              Things You Will Do
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {config.about.activities.map((a, i) => (
                <ImgCard key={i} item={a} h="h-48" />
              ))}
            </div>
          </div>
          <div>
            <DepositBookingCard
              destination={config.name}
              totalPrice={config.pricing.isStatic ? config.pricing.staticOriginal || 1799 : selectedTrip?.price || 1799}
              depositAmount={config.pricing.deposit}
              isCompleted={config.isCompleted}
            />
          </div>
        </div>
      </Section>

      <Section title="Places You Will See">
        <div className="grid md:grid-cols-4 gap-8">
          {config.places.map((p, i) => (
            <PlaceCard key={i} item={p} />
          ))}
        </div>
      </Section>

      <Section title={config.homestays.sectionTitle}>
        <div className="grid md:grid-cols-3 gap-8" id="coliving">
          {config.homestays.images.map((img, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl shadow-sm border border-slate-100"
            >
              <img
                src={img}
                alt="Home"
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-slate-900 mb-10 text-center">
            Important Documents
          </h3>
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 space-y-4">
            {config.documents.map((doc, i) => (
              <a
                key={i}
                href={`/documents/${doc.file}`}
                download
                className="flex items-center justify-between w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-4 px-6 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm">{doc.name}</span>
                </div>
                <Download className="w-5 h-5 text-slate-400 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">
            Not a Travel Program, a Community
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            We live, explore, and build together. Embracing openness and
            curiosity, we explore new places and ideas.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {COMMUNITY.map((c, i) => (
            <Card key={i}>
              <div className="overflow-hidden rounded-2xl shadow-sm border border-slate-100 mb-6">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {c.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{c.description}</p>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <div className="w-px h-16 bg-linear-to-b from-transparent via-emerald-300 to-transparent" />
        </div>
      </Section>
    </>
  );
}
