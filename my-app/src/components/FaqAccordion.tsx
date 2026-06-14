"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqSection {
  title: string;
  items: { question: string; answer: string }[];
}

export default function FaqAccordion({ sections }: { sections: FaqSection[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  let globalIndex = 0;

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-10">
          <h2 className="text-xl font-bold text-emerald-700 mb-6">
            {section.title}
          </h2>
          <div className="space-y-4">
            {section.items.map((faq, faqIndex) => {
              const currentIndex = globalIndex++;
              return (
                <div
                  key={faqIndex}
                  className="border border-slate-200 rounded-lg overflow-hidden shadow-sm bg-white"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === currentIndex ? null : currentIndex)
                    }
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                    aria-expanded={openIndex === currentIndex}
                  >
                    <span className="text-slate-900 font-bold pr-4 text-[15px]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        openIndex === currentIndex ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === currentIndex ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="p-5 text-slate-600 font-medium bg-slate-50/50 leading-relaxed text-sm border-t border-slate-100">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
