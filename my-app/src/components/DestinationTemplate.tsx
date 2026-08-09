"use client";
import React, { useState } from "react";
import { useRouter as useNavigate } from 'next/navigation';

import * as Icons from "lucide-react";
import { Check, X, FileText, Download } from "lucide-react";
import Image from "next/image";
import Navbar from "./Navbar";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/AuthContext";
import {
  COUNTRY_CODES,
  BASE_FORM_FIELDS,
  INPUT_CLASS,
  BTN_CLASS,
  COMMUNITY,
} from "../lib/shared-constants";

export interface DestinationConfig {
  id: string; // e.g., "ladakh", "goa"
  name: string; // e.g., "Ladakh", "Goa"

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
    features: { icon: string; text: string }[];
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
    spotsLeft?: number;
    deadline?: string;
  }[];

  documents: {
    name: string;
    file: string;
  }[];

  formDestinationOptions: string[];
}

import { BookingForm } from "./BookingForm";
import { PremiumBookingForm } from "./PremiumBookingForm";
import { Card, ImgCard, PlaceCard, Section } from "./DestinationUI";

// ============= MAIN TEMPLATE =============

export default function DestinationTemplate({
  config,
}: {
  config: DestinationConfig;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomCode, setShowCustomCode] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Construct Form Fields for this specific destination
  const formFields = [
    ...BASE_FORM_FIELDS.slice(0, 4), // name, age, email, phone
    {
      name: "destination",
      label: "Destination",
      type: "select",
      required: true,
      help: "Which trip?",
      options: config.formDestinationOptions,
    },
    ...BASE_FORM_FIELDS.slice(4), // the rest
  ];

  // Build INITIAL_FORM
  const initialForm = Object.fromEntries([
    ...formFields.map((f) => [f.name, ""]),
    ["countryCode", "+44"],
    ["undertaking", false],
  ]);

  const [formData, setFormData] = useState(initialForm);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<number>(1);
  const navigate = useNavigate();
  const { user } = useAuth();

  const selectedTrip =
    config.trips.find((t) => t.batchId === selectedBatch) || config.trips[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEmailBlur = async () => {
    if (!supabase) return;
    
    if (formData.email && formData.email.includes("@")) {
      if (!draftId) {
        // Create a draft booking
        const { data, error } = await supabase.from("bookings").insert([{
          email: formData.email,
          name: formData.name,
          destination: formData.destination,
          status: "draft",
          payment_status: "unpaid",
          user_id: user?.id,
        }]).select().single();
        
        if (data && !error) {
          setDraftId(data.id);
        }
      } else {
        // Update existing draft silently
        await supabase.from("bookings").update({
          email: formData.email,
          name: formData.name,
        }).eq("id", draftId);
      }
    }
  };

  const openForm = () => {
    // Attempt to match the destination string automatically based on selectedBatch
    const targetOption =
      config.formDestinationOptions[selectedBatch - 1] ||
      config.formDestinationOptions[0];

    setFormData({
      ...initialForm,
      destination: targetOption || "",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabase) {
      alert("Database service is not available. Please try again later.");
      return;
    }
    
    if (!formData.undertaking) {
      alert("Please accept the undertaking to continue.");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const payload = {
        name: formData.name,
        age: formData.age,
        country: formData.country,
        email: formData.email,
        phone: formData.phone,
        country_code: formData.countryCode,
        destination: formData.destination,
        remote_work: formData.remoteWork,
        work_designation: formData.workDesignation,
        intended_work: formData.intendedWork,
        interests: formData.interests,
        linkedin: formData.linkedin,
        about_you: formData.aboutYou,
        how_heard: formData.howHeard,
        undertaking: formData.undertaking,
        user_id: user?.id,
        status: "pending",
        payment_status: "unpaid",
      };

      if (draftId) {
        const { error } = await supabase.from("bookings").update(payload).eq("id", draftId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("bookings").insert([payload]);
        if (error) throw error;
      }

      setSubmitStatus("success");
      setTimeout(() => {
        setFormData(initialForm);
        setDraftId(null);
        setIsFormOpen(false);
        setSubmitStatus("idle");

        const params = new URLSearchParams({ batch: selectedBatch.toString() });
        if (!config.pricing.isStatic && selectedTrip.price) {
          params.append("price", selectedTrip.price.toString());
        }

        navigate.push(`/checkout?${params.toString()}`);
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PremiumBookingForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        destination={config.name}
      />
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="pt-15" />

      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={config.hero.image}
          alt={config.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
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
              {config.about.features.map((f, i) => {
                const IconComponent = (Icons as any)[f.icon] || Icons.CheckCircle;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 text-slate-700"
                  >
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                    <span className="text-xs uppercase tracking-wider">
                      {f.text}
                    </span>
                  </div>
                );
              })}
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
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 sticky top-24">
              <p className="text-sm uppercase tracking-wide text-slate-500 mb-2 font-semibold">
                Reserve Your Workspace
              </p>
              <p className="text-3xl font-bold text-emerald-600">
                ${config.pricing.deposit}
              </p>
              <p className="text-slate-500 font-medium text-sm mb-6">
                Deposit Only
              </p>

              <h4 className="font-bold text-slate-900 uppercase tracking-wide mb-4">
                Choose Your Date
              </h4>
              <div className="flex flex-col gap-3 mb-6">
                {config.trips.map((trip, i) => (
                  <div
                    key={i}
                    className={`cursor-pointer transition-all p-3 rounded-xl border-2 ${
                      selectedBatch === trip.batchId
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 hover:border-emerald-300 bg-white"
                    }`}
                    onClick={() => setSelectedBatch(trip.batchId)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {trip.fromDate} - {trip.toDate}
                        </p>
                        {trip.spotsLeft ? (
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                            <p className="text-[10px] font-black uppercase text-red-600 tracking-wide">
                              ONLY {trip.spotsLeft} SPOTS LEFT
                            </p>
                          </div>
                        ) : (
                          <p className="text-[10px] font-bold uppercase text-emerald-600 mt-0.5">
                            {trip.status}
                          </p>
                        )}
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedBatch === trip.batchId ? 'border-emerald-500' : 'border-slate-300'}`}>
                        {selectedBatch === trip.batchId && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="font-bold text-slate-900 uppercase tracking-wide mb-4">
                Included
              </h4>
              <ul className="space-y-2 mb-6">
                {config.pricing.included.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-600 font-medium"
                  >
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <h4 className="font-bold text-slate-900 uppercase tracking-wide mb-4">
                Not Included
              </h4>
              <ul className="space-y-2 mb-6">
                {config.pricing.notIncluded.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-600 font-medium"
                  >
                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {config.pricing.isStatic ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mb-6">
                  <p className="text-sm text-emerald-800 font-bold uppercase tracking-wider mb-1">
                    Total Price
                  </p>
                  <span className="text-5xl font-black text-emerald-600">
                    ${config.pricing.staticOriginal}
                  </span>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    per person · 28-day stay
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg shadow-sm">
                    Save $
                    {(selectedTrip?.originalPrice || 0) -
                      (selectedTrip?.price || 0)}
                  </div>
                  <p className="text-sm text-emerald-800 font-bold uppercase tracking-wider mb-1">
                    Total Price
                  </p>
                  <div className="flex flex-col gap-1">
                    <span className="text-xl text-slate-400 line-through decoration-slate-400 decoration-2 font-black">
                      ${selectedTrip?.originalPrice}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-emerald-600">
                        ${selectedTrip?.price}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-700 mt-3 font-bold uppercase tracking-wider bg-emerald-100 inline-block px-2 py-1 rounded">
                    Founding Discount Applied!
                  </p>
                </div>
              )}

              <button onClick={openForm} className={BTN_CLASS}>
                Book Now
              </button>
            </div>
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
              <Image
                src={img}
                alt="Home"
                width={800}
                height={600}
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
                <Image
                  src={c.image}
                  alt={c.title}
                  width={800}
                  height={600}
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
