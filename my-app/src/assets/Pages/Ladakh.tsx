import { useState } from "react";
import {
  Check,
  X,
  Monitor,
  Home,
  Car,
  UtensilsCrossed,
  FileText,
  Download,
} from "lucide-react";
import Navbar from "../Navbar";
import { supabase } from "../../lib/supabase";

export default function Ladakh() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomCode, setShowCustomCode] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    country: "",
    email: "",
    phone: "",
    countryCode: "+91",
    destination: "",
    tripDate: "",
    howHeard: "",
    message: "",
    remoteWork: "",
    workDesignation: "",
    intendedWork: "",
    interests: "",
    expectations: "",
    portfolio: "",
    linkedin: "",
    aboutYou: "",
    undertaking: false,
  });

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "India", 
    "Germany", "France", "Netherlands", "Singapore", "UAE", "Other"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.undertaking) {
      alert("Please accept the undertaking to continue.");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const { data, error } = await supabase.from("bookings").insert([
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
          portfolio: formData.portfolio,
          linkedin: formData.linkedin,
          about_you: formData.aboutYou,
          how_heard: formData.howHeard,
          undertaking: formData.undertaking,
          status: "pending",
          payment_status: "unpaid",
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setSubmitStatus("success");
      window.open("https://calendly.com/syncretreat", "_blank");

      setFormData({
        name: "",
        age: "",
        country: "",
        email: "",
        phone: "",
        countryCode: "+91",
        destination: "",
        tripDate: "",
        howHeard: "",
        message: "",
        remoteWork: "",
        workDesignation: "",
        intendedWork: "",
        interests: "",
        expectations: "",
        portfolio: "",
        linkedin: "",
        aboutYou: "",
        undertaking: false,
      });

      setTimeout(() => {
        setIsFormOpen(false);
        setSubmitStatus("idle");
      }, 2000);

    } catch (error) {
      console.error("Error saving booking:", error);
      setSubmitStatus("error");
      alert("Error submitting form. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    { icon: Monitor, text: "Co-working Space" },
    { icon: Home, text: "Private Ensuite Room" },
    { icon: Car, text: "Acclimatization Driver" },
    { icon: UtensilsCrossed, text: "Chef-Prepared Meals" },
  ];

  const activities = [
    {
      image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1447&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Deep Focus Co-Working hub.",
      description:
        "Ergonomic worstation equipped with strict Dual-WAN load-balancing. Witness the stunning mountain And Deep Co-Working Spaces and focus working from there.",
    },
    {
      image: "https://media-cdn.tripadvisor.com/media/photo-s/06/9d/27/42/cold-desert-camp.jpg",
      title: "Weekend Trips.",
      description:
        "High-altitude weekend epeditions to discover the beuty of Ladakh with the community and like minded people. We handle 100% of the transport and permit logistics so you can step away from the screen without planning a single detail.",
    },
    {
      image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1138245562661282426/original/f218e700-8949-4ab8-ade7-8196d4fa5e8c.jpeg?im_w=1440",
      title: "PRIVATE EXECUTIVE QUARTERS",
      description:
        "We do not do standard co-living dorms. You get a private, isolated sanctuary within the compound, optimized for deep rest and absolute privacy after a high-output day.",
    },
    {
      image: "https://media.istockphoto.com/id/1144996192/photo/happy-successful-young-woman-freelancer-working-remotely-using-a-laptop-in-country-cottage.jpg?s=612x612&w=0&k=20&c=qO3LGVjYWJqXKm7dtCsv9mXeSxdhZtCPf1XZzF4KSgw=",
      title: "FRICTIONLESS OPERATIONS",
      description:
        "Zero cognitive load. From managing your local Protected Area Permits to providing macro-optimized meals via our private chef, we eliminate daily chores so your only focus is your product.",
    },
  ];

  const included = [
    "Private airport transfers",
    "Private transportation during the trip",
    "Accommodation (shared room)",
    "2 vegetarian meals per day",
    "All entrance fees",
    "Tour leader and Videographer / Photographer",
    "Your Video at the end of your trip",
    "Local SIM card",
  ];

  const notIncluded = [
    "International flights",
    "Visa",
    "Travel insurance",
    "Meals not stated in the itinerary",
    "Personal expenses during the trip",
  ];

  const places = [
    {
      image: "https://charzanholidays.com/wp-content/uploads/2024/12/Thiksey_Monastery-ladakh_charzan_holidays.jpg",
      title: "Weekend 1:",
      day1: "Deploy south along the Indus River to explore Thiksey & Hemis monasteries. Return by 2 PM for chef-prepared lunch.",
      day2: "Test your altitude adaptation with a hike to Leh Palace, Tsemo Castle & sunset at Shanti Stupa, plus time to explore Leh market.",
    },
    {
      image: "https://topclassholidays.com/wp-content/uploads/2025/07/Magnetic-Hill-Ladakh.jpg",
      title: "Weekend 2:",
      day1: "Half-day strike to Gurudwara Pathar Sahib, Magnetic Hill & Sangam Viewpoint where the Indus meets the Zanskar.",
      day2: "Full expedition to the 1000-year-old Alchi Monastery & Likir. Catered lunch on the road, back by 4 PM for Monday prep.",
    },
    {
      image: "https://www.eladakhtourism.com/camps-in-nubra/images/paramountcamp.jpg",
      title: "Weekend 3:",
      day1: "Cross Khardung La Pass (17,582 ft), arrive in Hundar for a Bactrian camel safari & overnight in premium Swiss Tents—total disconnection.",
      day2: "Visit the 106-foot Maitreya Buddha at Diskit, then return over the pass. Back at basecamp by 3 PM with hot showers & high-speed internet.",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7IXjTKCvo8hReTEv1x5PrLXbQMsM5ZCfFZA&s",
      title: "Weekend 4:",
      day1: "5 AM departure to Pangong Lake via Chang La Pass—a 10-hour extreme strike to witness the iconic blue waters, returning to your premium bed that night.",
      day2: "Sleep in. Farewell Mastermind BBQ on the villa terrace, followed by unstructured time to pack and decompress before departure.",
    },
  ];

  const homeStays = [
    {
      image: "https://a0.muscache.com/im/pictures/miso/Hosting-18737819/original/8c0e5cae-4bed-4e0b-9d0b-f224dc3a64f2.jpeg?im_w=1200",
      title: "",
      description: "",
    },
    {
      image: "https://a0.muscache.com/im/pictures/8d4ef684-31ed-4836-8e63-a9954aa751e2.jpg?im_w=720",
      title: "",
      description: "",
    },
    {
      image: "https://a0.muscache.com/im/pictures/5e20521b-e3ce-492a-864f-39ed49a6833c.jpg?im_w=1440",
      title: "",
      description: "",
    },
  ];

  const trips = [
    {
      fromDate: "JUNE 15",
      toDate: "JULY 13",
      tripNumber: "01",
      status: "AVAILABLE",
      statusType: "",
    },
    {
      fromDate: "AUGUST 03",
      toDate: "AUGUST 31",
      tripNumber: "02",
      status: "AVAILABLE",
      statusType: "available",
    },
  ];

  const documents = [
    { name: "Detailed Travel Itinerary", file: "travel-itinerary.pdf" },
    { name: "Packing List & Visa Info", file: "packing-list.pdf" },
    { name: "What to Expect? & Opportunities", file: "terms-conditions.pdf" },
  ];

  const community = [
    {
      image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1470&auto=format&fit=crop",
      title: "Do Life Together",
      description: "We build relationships to last...the rest of our lives. Retirement-Tribe anyone?",
    },
    {
      image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1470&auto=format&fit=crop",
      title: "Cocreate the Adventure",
      description: "Discover how different travel feels when the experience is cocreated and shared as a Tribe.",
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop",
      title: "Reignite Your Work",
      description: "Realize your goals and dreams knowing you have the world's best cheerleaders in your corner.",
    },
  ];

  const ImageCard = ({
    item,
    height = "h-56",
  }: {
    item: { image: string; title: string; description: string };
    height?: string;
  }) => (
    <div className="group">
      <div className="overflow-hidden rounded-2xl mb-4">
        <img
          src={item.image}
          alt={item.title}
          className={`w-full ${height} object-cover group-hover:scale-105 transition-transform duration-300`}
        />
      </div>
      <h4 className="text-lg font-bold uppercase tracking-wide mb-2">
        {item.title}
      </h4>
      <p className="text-gray-400 text-sm leading-relaxed">
        {item.description}
      </p>
    </div>
  );

  const PlaceCard = ({
    item,
    height = "h-56",
  }: {
    item: { image: string; title: string; day1: string; day2: string };
    height?: string;
  }) => (
    <div className="group">
      <div className="overflow-hidden rounded-2xl mb-4">
        <img
          src={item.image}
          alt={item.title}
          className={`w-full ${height} object-cover group-hover:scale-105 transition-transform duration-300`}
        />
      </div>
      <h4 className="text-lg font-bold uppercase tracking-wide mb-3">
        {item.title}
      </h4>
      <div className="space-y-3">
        <div>
          <span className="text-blue-400 font-semibold text-sm">Day 1:</span>
          <p className="text-gray-400 text-sm leading-relaxed mt-1">{item.day1}</p>
        </div>
        <div>
          <span className="text-blue-400 font-semibold text-sm">Day 2:</span>
          <p className="text-gray-400 text-sm leading-relaxed mt-1">{item.day2}</p>
        </div>
      </div>
    </div>
  );

  const SectionTitle = ({ children }: { children: string }) => (
    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-10">
      {children}
    </h3>
  );

  return (
    <>
      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Form Header */}
            <div className="p-8 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Apply Now</h2>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="px-8 pb-8">
              {/* 1. Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  1. Name <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">Your full name</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  maxLength={255}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                />
                <p className="text-xs text-gray-400 text-right mt-1">{formData.name.length}/255</p>
              </div>

              {/* 2. Age */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  2. Your age <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">To join our trips, you <span className="underline">must be at least 21 years old</span></p>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min={21}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                />
              </div>

              {/* 3. Country */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  3. Country of residence <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">Where do you live?</p>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white"
                >
                  <option value="">Select a country</option>
                  {countries.map((country, i) => (
                    <option key={i} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* 4. Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  4. Email <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">No spam. We promise</p>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">✉️</span>
                </div>
              </div>

              {/* 5. Phone */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  5. Phone <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">Your WhatsApp number</p>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={showCustomCode ? "custom" : formData.countryCode}
                    onChange={e => {
                      const value = e.target.value;
                      setShowCustomCode(value === "custom");
                      setFormData(prev => ({
                        ...prev,
                        countryCode: value === "custom" ? "" : value
                      }));
                    }}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white"
                    style={{ minWidth: "110px" }}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="custom">Other (enter manually)</option>
                  </select>
                  {showCustomCode && (
                    <input
                      type="text"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      placeholder="Enter custom code (e.g. +234)"
                      className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white"
                      style={{ minWidth: "110px" }}
                      required
                    />
                  )}
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    required
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white flex-1"
                  />
                </div>
              </div>

              {/* 6. Destination */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  6. Destination <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">Which trip are you interested in?</p>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white"
                >
                  <option value="">Select a destination</option>
                  <option value="Ladakh - June 15 to July 13">Ladakh - June 15 to July 13</option>
                  <option value="Ladakh - August 03 to August 31">Ladakh - August 03 to August 31</option>
                  <option value="Goa">Goa</option>
                </select>
              </div>

              {/* 7. Remote Work */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  7. Do you have work that can be done remotely? <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">We need to know if you can work during the retreat</p>
                <select
                  name="remoteWork"
                  value={formData.remoteWork}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="Partially">Partially</option>
                  <option value="Soon">Soon</option>
                  <option value="No but I'll find">No but I'll find</option>
                </select>
              </div>

              {/* 8. Work Designation */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  8. What kind of work do you do? <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">Your designation and field of work</p>
                <input
                  type="text"
                  name="workDesignation"
                  value={formData.workDesignation}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Software Engineer at Google, Freelance Designer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                />
              </div>

              {/* 9. Intended Work */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  9. What kind of work do you intend to do during the retreat? <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">Projects, tasks, or goals you plan to work on</p>
                <textarea
                  name="intendedWork"
                  value={formData.intendedWork}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="e.g., Building a SaaS product, Writing a book, Client projects..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 resize-none"
                />
              </div>

              {/* 10. Interests & Expectations */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  10. What are your interests and expectations with this retreat? <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">Tell us what you hope to gain from this experience</p>
                <textarea
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Your interests, hobbies, and what you expect from this retreat..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 resize-none"
                />
              </div>

              {/* 11. Portfolio & Links */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  11. Links to your work
                </label>
                <p className="text-xs text-gray-500 mb-2">Portfolio, LinkedIn, or any relevant links</p>
                <div className="space-y-3">
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="LinkedIn Profile URL"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                  />
                </div>
              </div>

              {/* 12. About You */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  12. About you <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">Anything else we should know about you?</p>
                <textarea
                  name="aboutYou"
                  value={formData.aboutYou}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Tell us about yourself - your personality, what makes you unique, why you want to join..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 resize-none"
                />
              </div>

              {/* 13. How did you hear about us */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  13. How did you hear about us?
                </label>
                <select
                  name="howHeard"
                  value={formData.howHeard}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white"
                >
                  <option value="">Select an option</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Twitter/X">Twitter/X</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Friend/Referral">Friend/Referral</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Undertaking Checkbox */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="undertaking"
                    checked={formData.undertaking}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I understand that this is not an application for a job and that SyncRetreat does not provide remote work. I am applying to become a member of a coliving travel community.
                    <span className="text-red-500"> *</span>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.undertaking}
                className={`w-full font-bold py-4 rounded-full uppercase tracking-wide transition-colors ${
                  isSubmitting 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : submitStatus === "success"
                    ? "bg-green-500"
                    : submitStatus === "error"
                    ? "bg-red-500 hover:bg-red-600"
                    : !formData.undertaking
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {isSubmitting 
                  ? "Submitting..." 
                  : submitStatus === "success"
                  ? "✓ Submitted Successfully!"
                  : submitStatus === "error"
                  ? "Error - Try Again"
                  : "Submit & Schedule a Call"}
              </button>

              {submitStatus === "error" && (
                <p className="text-xs text-red-500 text-center mt-2">
                  Something went wrong. Please check console and try again.
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <Navbar />
      </div>
      <div style={{ paddingTop: "60px" }}></div>

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600242466690-c1c04f081762?q=80&w=1470&auto=format&fit=crop"
          alt="ladakh"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
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
            <p className="text-lg md:text-xl">15 Jun - 13 Jul, 2026</p>
            <p className="text-lg md:text-xl">28 Days long stays.</p>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-16 text-white text-sm tracking-widths uppercase">
          <a href="#about" className="hover:text-gray-300 transition-colors">
            About The Experience
          </a>
          <a href="#coliving" className="hover:text-gray-300 transition-colors">
            Our Coliving Home
          </a>
        </div>
      </div>

      {/* Main Content */}
      <section className="bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Discover the Most Beautiful
              <br />
              Region in the Himalayas
            </h2>

            <div className="flex flex-wrap gap-8 my-10 border-y border-white/20 py-6">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <f.icon className="w-8 h-8 text-blue-500" />
                  <span className="text-xs uppercase tracking-wider">
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            <SectionTitle>Things You Will Do</SectionTitle>
            <div className="grid md:grid-cols-2 gap-6">
              {activities.map((a, i) => (
                <ImageCard key={i} item={a} height="h-48" />
              ))}
            </div>
          </div>

          {/* Pricing Card */}
          <div className="md:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-24">
              <p className="text-sm uppercase tracking-wide text-gray-400 mb-2">
                To Book This Trip You Need To Pay
              </p>
              <p className="text-3xl font-bold text-blue-500">$199</p>
              <p className="text-blue-500 text-sm mb-6">DEPOSIT ONLY</p>

              <h4 className="font-bold uppercase tracking-wide mb-4">
                Included
              </h4>
              <ul className="space-y-2 mb-6">
                {included.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h4 className="font-bold uppercase tracking-wide mb-4">
                Not Included
              </h4>
              <ul className="space-y-2 mb-6">
                {notIncluded.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-400 uppercase">Total Price</p>
                <p className="text-4xl font-bold">$1,499</p>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg uppercase tracking-wide transition-colors cursor-pointer"
                >
                  Book Now
                </button>
                {/* <button className="w-full border-2 border-blue-500 text-blue-500 font-bold py-3 rounded-lg hover:bg-blue-500/10 transition-colors">
                  Gift a Trip
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Places You Will See */}
      <section className="bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Places You Will See</SectionTitle>
          <div className="grid md:grid-cols-4 gap-8">
            {places.map((p, i) => (
              <PlaceCard key={i} item={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Home in Ladakh */}
      <section className="bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Our Home in Ladakh.</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {homeStays.map((h, i) => (
              <ImageCard key={i} item={h} />
            ))}
          </div>
        </div>
      </section>

      {/* Choose Date & Documents */}
      <section className="bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <SectionTitle>Choose Your Date</SectionTitle>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-8 mb-8">
                {trips.map((trip, i) => (
                  <div
                    key={i}
                    className={`cursor-pointer transition-all ${trip.statusType === "soldout" ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}`}
                  >
                    <div className="flex gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase">From</p>
                        <p className="text-lg font-bold">
                          {trip.fromDate.split(" ")[0]}
                        </p>
                        <p className="text-lg font-bold">
                          {trip.fromDate.split(" ")[1]}
                        </p>
                      </div>
                      <div className="border-l border-white/20 pl-4">
                        <p className="text-xs text-gray-400 uppercase">To</p>
                        <p className="text-lg font-bold">
                          {trip.toDate.split(" ")[0]}
                        </p>
                        <p className="text-lg font-bold">
                          {trip.toDate.split(" ")[1]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-xs text-gray-400 uppercase">Trip</p>
                        <p className="text-4xl font-bold">{trip.tripNumber}</p>
                      </div>
                      <span
                        className={`px-3 py-2 rounded-md text-xs font-bold uppercase ${trip.statusType === "soldout" ? "bg-blue-500 text-white" : "bg-blue-500/20 text-blue-400"}`}
                      >
                        {trip.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-full uppercase tracking-wide transition-colors cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>

          <div>
            <SectionTitle>Important Documents</SectionTitle>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex flex-col gap-4">
                {documents.map((doc, i) => (
                  <a
                    key={i}
                    href={`/documents/${doc.file}`}
                    download={doc.file}
                    className="flex items-center justify-between w-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold py-4 px-6 rounded-full uppercase tracking-wide transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5" />
                      <span>{doc.name}</span>
                    </div>
                    <Download className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
            Not a Travel Program, a Community
          </h2>
          <p className="text-center text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
            We live, explore, and build our community together.
            <br />
            Embracing openness and curiosity, as a Tribe, we explore new places
            and ideas.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {community.map((c, i) => (
              <div key={i} className="group">
                <div className="overflow-hidden rounded-lg mb-6">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{c.title}</h3>
                <p className="text-gray-400 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <div className="w-px h-16 bg-linear-to-b from-transparent via-blue-500 to-transparent"></div>
          </div>
        </div>
      </section>
    </>
  );
}