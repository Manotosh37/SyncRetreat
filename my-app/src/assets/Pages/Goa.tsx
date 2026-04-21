import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  X,
  Monitor,
  Home,
  Car,
  Users,
  FileText,
  Download,
} from "lucide-react";
import Navbar from "../Navbar";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/AuthContext";
import { sendEmail } from "../../lib/emailservice";

// ============= CONSTANTS =============
const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "Germany",
  "France",
  "Netherlands",
  "Singapore",
  "UAE",
  "Other",
];
const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+65", flag: "🇸🇬" },
  { code: "+49", flag: "🇩🇪" },
];

const FORM_FIELDS = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    help: "Your full name",
  },
  {
    name: "age",
    label: "Your age",
    type: "number",
    required: true,
    help: "Must be at least 21",
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    required: true,
    help: "Where do you live?",
    options: COUNTRIES,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    help: "No spam. We promise",
    icon: "✉️",
  },
  {
    name: "phone",
    label: "Phone",
    type: "phone",
    required: true,
    help: "Your WhatsApp number",
  },
  {
    name: "destination",
    label: "Destination",
    type: "select",
    required: true,
    help: "Which trip?",
    options: [
      // "Goa - September 01 to September 29",
      // "Goa - October 06 to November 03",
      "Goa - Upcoming (Dates to be Revealed)",
    ],
  },
  {
    name: "remoteWork",
    label: "Remote Work",
    type: "select",
    required: true,
    help: "Can you work during retreat?",
    options: ["Yes", "Partially", "Soon", "No but I'll find"],
  },
  {
    name: "workDesignation",
    label: "Work Designation",
    type: "text",
    required: true,
    help: "Your designation",
    placeholder: "e.g., Software Engineer at Google",
  },
  {
    name: "intendedWork",
    label: "Intended Work",
    type: "textarea",
    required: true,
    help: "Projects during retreat",
    rows: 3,
  },
  {
    name: "interests",
    label: "Interests & Expectations",
    type: "textarea",
    required: true,
    help: "What you hope to gain",
    rows: 4,
  },
  {
    name: "linkedin",
    label: "LinkedIn Profile",
    type: "url",
    required: false,
    help: "Optional",
    placeholder: "https://linkedin.com/in/...",
  },
  {
    name: "aboutYou",
    label: "About You",
    type: "textarea",
    required: true,
    help: "What makes you unique?",
    rows: 4,
  },
  {
    name: "howHeard",
    label: "How did you hear about us?",
    type: "select",
    required: false,
    options: [
      "Instagram",
      "Twitter/X",
      "LinkedIn",
      "YouTube",
      "Friend/Referral",
      "Google Search",
      "Other",
    ],
  },
];

const INPUT_CLASS =
  "w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-900 bg-white";
const BTN_CLASS =
  "w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-full uppercase tracking-wide transition-colors cursor-pointer shadow-md shadow-emerald-900/20";

const FEATURES = [
  { icon: Monitor, text: "Co-working Space" },
  { icon: Home, text: "Private Ensuite Room" },
  { icon: Car, text: "Beach & City Transfers" },
  { icon: Users, text: "Curated Community" },
];

const ACTIVITIES = [
  {
    image:
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1447&auto=format&fit=crop",
    title: "Deep Focus Co-Working Hub.",
    description:
      "Ergonomic workstation with Dual-WAN load-balancing and a gentle sea breeze — built for uninterrupted shipping.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop",
    title: "Weekend Beach Escapes.",
    description:
      "Curated coastal expeditions — from sunrise at Palolem to the cliffs of Vagator. All logistics handled.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1470&auto=format&fit=crop",
    title: "Private Villa Quarters.",
    description:
      "A secluded Goan villa compound — pool, privacy, and absolute rest after deep-work sprints.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=1470&auto=format&fit=crop",
    title: "Frictionless Operations.",
    description:
      "Zero cognitive load. We handle every detail so you stay fully focused on your work.",
  },
];

const PLACES = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyMY9nzT392ujTaf96IMIal7XhbgQEfByWQ&s",
    title: "Weekend 1:",
    day1: "Baga & Calangute beach sunrise walk. Explore Aguada Fort & the Portuguese bastions.",
    day2: "Anjuna flea market & sunset cocktails at Vagator cliffs.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEduuMhOfE00DaY707ofaSZp9s5F6OE_fblw&s",
    title: "Weekend 2:",
    day1: "Old Goa UNESCO churches — Basilica of Bom Jesus & Se Cathedral. Spice plantation lunch.",
    day2: "Backwater kayaking through Goa's mangrove trails. Return by 4 PM.",
  },
  {
    image:
      "https://sandeepachetan.com/wp-content/uploads/2013/10/tumblr_mltei6m8xe1s2js0yo1_1280.jpg",
    title: "Weekend 3:",
    day1: "Early trek to Dudhsagar Falls — Goa's 310-metre cascade deep in the Western Ghats.",
    day2: "South Goa: pristine sands of Palolem & Agonda. Seafood feast on the shore.",
  },
  {
    image:
      "https://static2.tripoto.com/media/filter/tst/img/209403/TripDocument/1453141486_z_w12fu.jpeg",
    title: "Weekend 4:",
    day1: "Sunrise at Arambol & dolphin-spotting boat ride along the coastline.",
    day2: "Sleep in. Farewell bonfire & BBQ on the villa terrace. Pack & decompress.",
  },
];

const HOMESTAYS = [
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1642846358182877619/original/d55cbed4-3970-48c3-87e9-d2ffc46d1576.jpeg?im_w=720",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1642846358182877619/original/2964bf55-199e-4297-a149-6cbac0154bc6.jpeg?im_w=720",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1642846358182877619/original/6431440e-0f99-4038-b0bf-5b83656e7671.jpeg?im_w=720",
];

const TRIPS = [
  {
    // fromDate: "SEPTEMBER 01",
    // toDate: "SEPTEMBER 29",
    fromDate: "UPCOMING",
    toDate: "TBA",
    tripNumber: "01",
    status: "COMING SOON",
  },
  {
    // fromDate: "OCTOBER 06",
    // toDate: "NOVEMBER 03",
    fromDate: "UPCOMING",
    toDate: "TBA",
    tripNumber: "02",
    status: "COMING SOON",
  },
];

const DOCUMENTS = [
  {
    name: "28-DAY PRODUCTIVITY SCHEDULE & PRE-ARRIVAL GUIDE",
    file: "SyncRetreat_Deployment_Manifest.pdf",
  },
  { name: "Info about Pricing Schedule & Invoice", file: "payment.pdf" },
  {
    name: "What to Expect? & Opportunities",
    file: "SyncRetreat_Alignment_Protocol.pdf",
  },
];

const COMMUNITY = [
  {
    image:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1470&auto=format&fit=crop",
    title: "High-Signal Networking",
    description:
      "Build relationships with funded founders, freelancers, and senior operators.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1470&auto=format&fit=crop",
    title: "Strategic Cross-Pollination",
    description:
      "Solve bottlenecks by collaborating with experts outside your echo chamber.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop",
    title: "Accountability & Execution",
    description:
      "Realize Goals surrounded by peers operating at maximum capacity.",
  },
];

const PRICING = {
  deposit: 199,
  original: 1799,
  included: [
    "Private airport transfers",
    "Private transportation",
    "Private Ensuite Accommodation",
    "Chef-prepared meals (2x daily)",
    "Enterprise-grade Dual-WAN internet",
    "Local SIM card",
    "Weekend Beach Excursions",
    "24/7 Facility Management",
  ],
  notIncluded: [
    "International flights",
    "Visa",
    "Travel insurance",
    "Meals outside provided schedule",
    "Personal expenses",
  ],
};

const INITIAL_FORM = Object.fromEntries([
  ...FORM_FIELDS.map((f) => [f.name, ""]),
  ["countryCode", "+91"],
  ["undertaking", false],
]);

// ============= COMPONENTS =============

const FormField = ({
  field,
  value,
  onChange,
  showCustomCode,
  setShowCustomCode,
  index,
}: any) => {
  const base = (
    <label className="block text-sm font-medium text-slate-700 mb-1">
      <span className="text-emerald-600 font-bold">{index}.</span> {field.label}{" "}
      {field.required && <span className="text-red-500">*</span>}
    </label>
  );
  const help = field.help && (
    <p className="text-xs text-slate-500 mb-2">{field.help}</p>
  );

  if (field.type === "select") {
    return (
      <div className="mb-6">
        {base} {help}
        <select
          name={field.name}
          value={value}
          onChange={onChange}
          required={field.required}
          className={INPUT_CLASS}
        >
          <option value="">Select an option</option>
          {field.options?.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="mb-6">
        {base} {help}
        <textarea
          name={field.name}
          value={value}
          onChange={onChange}
          required={field.required}
          rows={field.rows}
          className={INPUT_CLASS}
        />
      </div>
    );
  }

  if (field.type === "phone") {
    return (
      <div className="mb-6">
        {base} {help}
        <div className="flex gap-2">
          <select
            value={showCustomCode ? "custom" : value.countryCode}
            onChange={(e) => {
              const v = e.target.value;
              setShowCustomCode(v === "custom");
              if (v !== "custom")
                onChange({ target: { name: "countryCode", value: v } });
            }}
            className={`${INPUT_CLASS} min-w-27.5`}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
            <option value="custom">Other</option>
          </select>
          {showCustomCode && (
            <input
              type="text"
              name="countryCode"
              value={value.countryCode}
              onChange={onChange}
              placeholder="+234"
              className={`${INPUT_CLASS} min-w-27.5`}
              required
            />
          )}
          <input
            type="tel"
            name="phone"
            value={value.phone}
            onChange={onChange}
            placeholder="Number"
            className={`${INPUT_CLASS} flex-1`}
            required
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {base} {help}
      <div className={field.icon ? "relative" : ""}>
        <input
          name={field.name}
          type={field.type}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          className={INPUT_CLASS}
        />
        {field.icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {field.icon}
          </span>
        )}
      </div>
    </div>
  );
};

const Card = ({ children }: any) => <div className="group">{children}</div>;
const ImgCard = ({ item, h = "h-56" }: any) => (
  <Card>
    <div className="overflow-hidden rounded-2xl mb-4 shadow-sm border border-slate-100">
      <img
        src={item.image}
        alt={item.title}
        className={`w-full ${h} object-cover group-hover:scale-105 transition-transform duration-300`}
      />
    </div>
    <h4 className="text-lg font-bold uppercase tracking-wide text-slate-900 mb-2">
      {item.title}
    </h4>
    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
  </Card>
);

const PlaceCard = ({ item }: any) => (
  <Card>
    <div className="overflow-hidden rounded-2xl mb-4 shadow-sm border border-slate-100">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <h4 className="text-lg font-bold uppercase tracking-wide text-slate-900 mb-3">
      {item.title}
    </h4>
    <div className="space-y-3">
      {["day1", "day2"].map((day) => (
        <div key={day}>
          <span className="text-emerald-600 font-semibold text-sm capitalize">
            {day.replace("day", "Day ")}:
          </span>
          <p className="text-slate-600 text-sm leading-relaxed mt-1">
            {item[day]}
          </p>
        </div>
      ))}
    </div>
  </Card>
);

const Section = ({ title, children }: any) => (
  <section className="bg-[#fefbf7] text-slate-900 py-16 px-4">
    <div className="max-w-6xl mx-auto">
      {title && (
        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-slate-900 mb-10">
          {title}
        </h3>
      )}
      {children}
    </div>
  </section>
);

const BookingForm = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  isSubmitting,
  submitStatus,
  showCustomCode,
  setShowCustomCode,
}: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative border border-slate-200 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-serif text-slate-900">Apply Now</h2>
        </div>
        <form onSubmit={onSubmit} className="px-8 pb-8">
          {FORM_FIELDS.map((field, i) => (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={handleInputChange}
              showCustomCode={showCustomCode}
              setShowCustomCode={setShowCustomCode}
              index={i + 1}
            />
          ))}
          <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="undertaking"
                checked={formData.undertaking}
                onChange={handleInputChange}
                required
                className="mt-1 w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-700 leading-relaxed">
                {" "}
                I understand that this is not an application for a job and that
                SyncRetreat does not provide remote work. I am applying to
                become a member of a coliving travel community.{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !formData.undertaking}
            className={`${BTN_CLASS} ${isSubmitting ? "bg-slate-400 hover:bg-slate-400 cursor-not-allowed shadow-none" : submitStatus === "success" ? "bg-emerald-500 hover:bg-emerald-500" : submitStatus === "error" ? "bg-red-500 hover:bg-red-600" : !formData.undertaking ? "bg-slate-400 hover:bg-slate-400 cursor-not-allowed shadow-none" : ""}`}
          >
            {isSubmitting
              ? "Submitting..."
              : submitStatus === "success"
                ? "✓ Submitted!"
                : submitStatus === "error"
                  ? "Error - Try Again"
                  : "Submit & Schedule a Call"}
          </button>
          {submitStatus === "error" && (
            <p className="text-xs text-red-500 text-center mt-2">
              Error. Check console and try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

// ============= MAIN =============
export default function Goa() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomCode, setShowCustomCode] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState(INITIAL_FORM);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openForm = () => {
    setFormData(INITIAL_FORM);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.undertaking) {
      alert("Please accept the undertaking to continue.");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const { error } = await supabase.from("bookings").insert([
        {
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
        },
      ]);
      if (error) throw error;
      
      // Automated Confirmation Email
      sendEmail({
        to: formData.email,
        name: formData.name,
        type: "confirmation",
        destination: "Goa"
      });

      setSubmitStatus("success");
      setTimeout(() => {
        setFormData(INITIAL_FORM);
        setIsFormOpen(false);
        setSubmitStatus("idle");
        navigate("/checkout");
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
      <BookingForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        showCustomCode={showCustomCode}
        setShowCustomCode={setShowCustomCode}
      />
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="pt-15" />

      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Goa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 drop-shadow-md">
            Coastal Focus Retreat
          </p>
          <h1 className="text-6xl md:text-8xl font-serif tracking-wide mb-4 drop-shadow-lg">
            GOA.
          </h1>
          <p className="text-xl md:text-2xl tracking-widest uppercase mb-8 drop-shadow-md">
            Goa, India
          </p>
          <div className="space-y-2 mb-8 drop-shadow-md">
            <p className="text-lg md:text-xl">Coming Soon — 2026</p>
            <p className="text-lg md:text-xl">28 Days long stays.</p>
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
              Discover India's Most Vibrant Coastal Escape
            </h2>
            <div className="flex flex-wrap gap-8 my-10 border-y border-slate-200 py-6">
              {FEATURES.map((f, i) => (
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
              {ACTIVITIES.map((a, i) => (
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
                ${PRICING.deposit}
              </p>
              <p className="text-slate-500 font-medium text-sm mb-6">
                Deposit Only
              </p>
              <h4 className="font-bold text-slate-900 uppercase tracking-wide mb-4">
                Included
              </h4>
              <ul className="space-y-2 mb-6">
                {PRICING.included.map((item, i) => (
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
                {PRICING.notIncluded.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-600 font-medium"
                  >
                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mb-6">
                <p className="text-sm text-emerald-800 font-bold uppercase tracking-wider mb-1">
                  Total Price
                </p>
                <span className="text-5xl font-black text-emerald-600">
                  ${PRICING.original}
                </span>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  per person · 28-day stay
                </p>
              </div>
              <button onClick={openForm} className={BTN_CLASS}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Places You Will See">
        <div className="grid md:grid-cols-4 gap-8">
          {PLACES.map((p, i) => (
            <PlaceCard key={i} item={p} />
          ))}
        </div>
      </Section>

      <Section title="Our Home in Goa">
        <div className="grid md:grid-cols-3 gap-8" id="coliving">
          {HOMESTAYS.map((img, i) => (
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
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-slate-900 mb-10">
              Choose Your Date
            </h3>
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-8 mb-8">
                {TRIPS.map((trip, i) => (
                  <div key={i} className="hover:opacity-80 transition-opacity">
                    <div className="flex gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">
                          From
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          {trip.fromDate}
                        </p>
                      </div>
                      <div className="border-l border-slate-200 pl-4">
                        <p className="text-xs text-slate-500 font-bold uppercase">
                          To
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          {trip.toDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-4xl font-bold text-slate-900">
                        {trip.tripNumber}
                      </p>
                      <span className="px-3 py-2 rounded-md text-xs font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
                        {trip.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={openForm} className={BTN_CLASS}>
                Book Now
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-slate-900 mb-10">
              Important Documents
            </h3>
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 space-y-4">
              {DOCUMENTS.map((doc, i) => (
                <a
                  key={i}
                  href={`/documents/${doc.file}`}
                  download
                  className="flex items-center justify-between w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-4 px-6 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm">{doc.name}</span>
                  </div>
                  <Download className="w-5 h-5 text-slate-400" />
                </a>
              ))}
            </div>
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
