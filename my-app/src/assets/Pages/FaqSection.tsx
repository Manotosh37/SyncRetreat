import { useState } from "react";
import { ChevronDown } from "lucide-react";

const importantFaqs = [
  {
    question: "What exactly is SyncRetreat?",
    answer:
      "SyncRetreat is a 28-day, high-altitude deep work infrastructure camp located in Ladakh, India. It is engineered strictly for Western tech founders, CTOs, senior operators, and remote employees. We provide enterprise-grade workspace, uninterrupted internet, and local logistics so you can escape the European summer distractions and execute a month of absolute focus.",
  },
  {
    question: "Who is this NOT for?",
    answer:
      "This is not a yoga retreat, a guided tourist vacation, or a casual digital nomad meetup. We do not accept backpackers. If you are looking for daily sightseeing and forced group icebreakers, do not apply. This is an environment built for shipping products.",
  },
  {
    question: "What is the total investment and what does it cover?",
    answer:
      "The total cost is $1,499 USD. This covers your private accommodation in our premium Ladakhi villa for 28 days, your daily meals prepared by a private chef, 24/7 access to our Dual-WAN workspace, airport transfers from Leh (IXL), curated weekend trips, and all local government permits.",
  },
  {
    question: "How can you guarantee internet in the Himalayas?",
    answer:
      "We do not rely on standard hotel Wi-Fi. We deploy a proprietary network setup featuring Dual-WAN load balancing, backed by secondary ISP failovers and heavy power backups. We treat network uptime as a non-negotiable utility.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#fefbf7] py-24 px-6 md:px-12 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Image Column with Hover Effect */}
          <div className="relative rounded-2xl overflow-hidden group shadow-lg h-100 md:h-full min-h-125">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
              alt="SyncRetreat FAQs"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 p-8 w-full bg-linear-to-t from-black/80 to-transparent">
              <h3 className="text-white text-3xl font-serif font-bold">
                Have questions?
              </h3>
              <p className="text-slate-200 mt-2 text-lg">
                Find out if you're the right fit.
              </p>
            </div>
          </div>

          {/* FAQ Accordion Column */}
          <div className="flex flex-col justify-center h-full">
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">
                Common Questions
              </h2>
              <p className="text-slate-600 font-medium text-lg">
                Everything you need to know before you apply.
              </p>
            </div>

            <div className="space-y-4 mb-10">
              {importantFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg overflow-hidden shadow-sm bg-white"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-slate-900 font-bold pr-4 text-[15px]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="p-5 text-slate-600 font-medium bg-slate-50/50 leading-relaxed text-sm border-t border-slate-100">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <a
                href="/faqs"
                className="inline-block bg-white text-slate-800 border border-slate-200 px-6 py-3 rounded-md font-bold hover:bg-slate-50 transition-colors shadow-sm"
              >
                View All FAQs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
