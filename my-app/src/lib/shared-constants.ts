export const COUNTRIES = [
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

export const COUNTRY_CODES = [
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+1", flag: "🇺🇸 🇨🇦", label: "USA/Canada" },
  { code: "+61", flag: "🇦🇺", label: "Australia" },
  { code: "+64", flag: "🇳🇿", label: "New Zealand" },
  { code: "+49", flag: "🇩🇪", label: "Germany" },
  { code: "+33", flag: "🇫🇷", label: "France" },
  { code: "+31", flag: "🇳🇱", label: "Netherlands" },
  { code: "+41", flag: "🇨🇭", label: "Switzerland" },
  { code: "+46", flag: "🇸🇪", label: "Sweden" },
  { code: "+47", flag: "🇳🇴", label: "Norway" },
  { code: "+45", flag: "🇩🇰", label: "Denmark" },
  { code: "+358", flag: "🇫🇮", label: "Finland" },
  { code: "+353", flag: "🇮🇪", label: "Ireland" },
  { code: "+91", flag: "🇮🇳", label: "India" },
  { code: "+81", flag: "🇯🇵", label: "Japan" },
  { code: "+65", flag: "🇸🇬", label: "Singapore" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+63", flag: "🇵🇭", label: "Philippines" },
  { code: "+55", flag: "🇧🇷", label: "Brazil" },
  { code: "+52", flag: "🇲🇽", label: "Mexico" },
];

export const BASE_FORM_FIELDS = [
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
  // "destination" will be dynamically added per location
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

export const INPUT_CLASS =
  "w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-900 bg-white";
export const BTN_CLASS =
  "w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-full uppercase tracking-wide transition-colors cursor-pointer shadow-md shadow-emerald-900/20";

export const PLAN_FEATURES = [
  "Accommodation",
  "Transport",
  "2 Meals / day",
  "Working Infra",
  "Community",
  "Legal docs.",
  "Medical Support",
];

export const PRICING_PLANS = [
  {
    id: "14-day",
    name: "14-Day Workation",
    duration: "14 days",
    audience: "Western",
    price: "$1,199",
    originalPrice: "$1,499",
    discount: "$300",
    pricePerDay: "$86/day",
    priceNote: "",
    cta: "Book Now",
    status: "Active" as const,
    featured: false,
    link: "/locations/varkala",
  },
  {
    id: "28-day",
    name: "28-Day Workation",
    duration: "28 days",
    audience: "Western",
    price: "$1,799",
    originalPrice: "$2,099",
    discount: "$300",
    pricePerDay: "$64/day",
    priceNote: "",
    cta: "Book Now",
    status: "Active" as const,
    featured: true,
    link: "/locations/varkala",
  },
  {
    id: "enterprise",
    name: "Enterprise (B2B)",
    duration: "Custom",
    audience: "Startups & Corporates",
    price: "Custom",
    originalPrice: "",
    discount: "",
    pricePerDay: "",
    priceNote: "Differential pricing for both",
    cta: "Request Quote",
    status: "Active" as const,
    featured: false,
    link: "/waitlist?plan=enterprise",
  },
];

export const DEPOSIT_USD = 299;

export const COST_FAQ_ANSWER =
  "The 14-day Workation is $1,199 ($300 off $1,499) and the 28-day Workation is $1,799 ($300 off $2,099). Both include accommodation, transport, 2 meals/day, working infra, community, legal docs, and medical support. A $299 deposit secures your spot; the balance is due 30 days before start. Enterprise is custom; Yearly Pass pricing is TBD.";

export const YEARLY_PASS = {
  id: "yearly",
  name: "The Yearly Pass",
  subtitle: "Come back all year. One membership.",
  duration: "Annual",
  audience: "Repeat guests",
  price: "TBD",
  status: "Active" as const,
  link: "/waitlist?plan=yearly",
  perks: [
    "Unlimited bookings across locations",
    "Best rate, locked for 12 months",
    "First access to new retreats",
    "Member-only gatherings",
  ],
};

export const COMMUNITY = [
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
      "Realize goals surrounded by peers operating at maximum capacity.",
  },
];
