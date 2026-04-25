import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const generalFaqs = [
    {
      question: "What exactly is SyncRetreat?",
      answer:
        "SyncRetreat is a 28-day, high-altitude deep work infrastructure camp located in Ladakh, India. It is engineered for Western tech founders, CTOs, senior operators, and remote employees. We provide enterprise-grade workspace, uninterrupted internet, and local logistics so you can escape distractions and execute a month of absolute focus.",
    },
    {
      question: "Who is this NOT for?",
      answer:
        "This is not a yoga retreat, a guided tourist vacation, or a casual digital nomad meetup. We do not accept backpackers. If you are looking for daily sightseeing and forced group icebreakers, do not apply. This is an environment built for shipping products.",
    },
    {
      question: "What are the visa requirements?",
      answer:
        "Citizens of the US, UK, EU, Canada, and Australia must apply for an Indian e-Tourist Visa (30-Day) at least 21 days before departure. Do not apply for a Business Visa. Once you land in Leh, our operations team will physically collect your passport to secure your mandatory Protected Area Permit (PAP). We handle all local Ladakhi bureaucracy.",
    },
    {
      question: "Do I need to be a software engineer to attend?",
      answer:
        "No, but you must be an operator with a strict mandate. Whether you are coding a MERN stack application, writing a book, or structuring a venture fund, your primary goal must be deep, uninterrupted work.",
    },
  ];

  const paymentFaqs = [
    {
      question: "What is the total investment and what does it cover?",
      answer:
        "The total cost is $1,499 USD. This covers your private accommodation in our premium Ladakhi villa for 28 days, your daily meals prepared by a private chef, 24/7 access to our Dual-WAN workspace, airport transfers from Leh (IXL), curated weekend trips, and all local government permits.",
    },
    {
      question: "What is the payment schedule?",
      answer:
        "Upon application approval, a $199 non-refundable deposit is required via credit card (Stripe/Razorpay) to secure your spot. The remaining $1,300 balance is due 30 days prior to the cohort launch.",
    },
    {
      question: "Can I expense this to my company?",
      answer:
        "Yes. SyncRetreat operates as a fully registered, legally compliant B2B entity. We will issue a formal, tax-compliant invoice that you can submit to your finance department as an operational or professional development expense.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Because we secure premium real estate in advance, the $199 deposit is non-refundable. For the remaining balance, cancellations made 30 days before the retreat start date are eligible for a 50% refund. Cancellations made within 30 days of the start date are strictly non-refundable.",
    },
  ];

  const retreatFaqs = [
    {
      question: "How do I get to Leh, Ladakh?",
      answer:
        "There are no direct international flights to Ladakh. You must book your primary flight into New Delhi (DEL) or Mumbai (BOM). From there, you will take a domestic 1.5-hour flight directly to Kushok Bakula Rimpochee Airport (IXL) in Leh. Our ground team will be waiting at the arrival gate.",
    },
    {
      question: "How can you guarantee internet in the Himalayas?",
      answer:
        "We do not rely on standard hotel Wi-Fi. We deploy a proprietary network setup featuring Dual-WAN load balancing, backed by secondary ISP failovers and heavy power backups. We treat network uptime as a non-negotiable utility.",
    },
    {
      question: "What about the high altitude?",
      answer:
        "Leh sits at roughly 11,500 feet (3,500 meters). Altitude sickness is a physical reality. Your first 48 hours at SyncRetreat will be strictly dedicated to acclimatization. We monitor oxygen levels, provide hydration protocols, and restrict heavy physical exertion until your body adapts.",
    },
    {
      question: 'Are there organized activities or "bonding circles"?',
      answer:
        'No. We protect your calendar. Meals are shared, and high-level networking naturally occurs among the 12 founders in the house, but your time is yours. If you want to hike in the mountains on Sunday, we will arrange the transport, but there is zero mandatory "forced fun."',
    },
  ];

  const allFaqs = [
    { title: "General FAQs", items: generalFaqs },
    { title: "Payment & Compliance FAQs", items: paymentFaqs },
    { title: "The Retreat & Infrastructure FAQs", items: retreatFaqs },
  ];

  let globalIndex = 0;

  return (
    <div className="bg-[#fefbf7] min-h-screen pt-24 px-4 pb-24">
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-serif text-center text-slate-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-slate-600 font-medium mb-12">
          Everything you need to know about SyncRetreat
        </p>

        {allFaqs.map((section, sectionIndex) => (
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
                      onClick={() => toggleFaq(currentIndex)}
                      className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
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

        {/* Contact Section */}
        <div className="mt-16 text-center border border-slate-200 shadow-sm rounded-xl p-8 bg-white">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-slate-600 font-medium mb-6">
            Can't find the answer you're looking for? Reach out to our team.
          </p>
          <a
            href="mailto:contact@syncretreat.com"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-md font-bold hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-900/10"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
