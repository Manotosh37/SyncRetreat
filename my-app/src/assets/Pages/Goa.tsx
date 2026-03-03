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

export default function Ladakh() {
  const features = [
    { icon: Monitor, text: "Co-working Space" },
    { icon: Home, text: "Private Ensuite Room" },
    { icon: Car, text: "Acclimatization Driver" },
    { icon: UtensilsCrossed, text: "Chef-Prepared Meals" },
  ];

  const activities = [
    {
      image: "https://images.unsplash.com/photo-1609766857326-18c83d43e391",
      title: "Explore Pangong Lake",
      description:
        "Witness the stunning blue waters surrounded by majestic mountains",
    },
    {
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb",
      title: "Visit Ancient Monasteries",
      description:
        "Discover centuries-old Buddhist monasteries and their rich history",
    },
    {
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      title: "Stay With Local Families",
      description:
        "Experience authentic Ladakhi hospitality and traditional cuisine",
    },
    {
      image: "https://images.unsplash.com/photo-1600242466690-c1c04f081762",
      title: "Trek Through Valleys",
      description:
        "Explore breathtaking high-altitude valleys and mountain passes",
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
      image: "https://images.unsplash.com/photo-1609766857326-18c83d43e391",
      title: "Pangong Lake",
      description:
        "Experience the mesmerizing blue waters of one of the world's highest saltwater lakes, surrounded by barren mountains",
    },
    {
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb",
      title: "Nubra Valley",
      description:
        "Discover the valley of flowers with its unique double-humped camels, sand dunes, and ancient monasteries",
    },
    {
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      title: "Khardung La Pass",
      description:
        "Conquer one of the highest motorable roads in the world with breathtaking views of the Himalayas",
    },
    {
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      title: "Khardung La Pass",
      description:
        "Conquer one of the highest motorable roads in the world with breathtaking views of the Himalayas",
    },
  ];

  const homeStays = [
    {
      image: "https://images.unsplash.com/photo-1609766857326-18c83d43e391",
      title: "Pangong Lake",
      description:
        "Experience the mesmerizing blue waters of one of the world's highest saltwater lakes, surrounded by barren mountains",
    },
    {
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb",
      title: "Nubra Valley",
      description:
        "Discover the valley of flowers with its unique double-humped camels, sand dunes, and ancient monasteries",
    },
    {
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      title: "Khardung La Pass",
      description:
        "Conquer one of the highest motorable roads in the world with breathtaking views of the Himalayas",
    },
  ];

  const trips = [
    {
      fromDate: "APR 15",
      toDate: "APR 21",
      tripNumber: "01",
      status: "SOLD OUT",
      statusType: "soldout",
    },
    {
      fromDate: "JUNE 17",
      toDate: "JUNE 23",
      tripNumber: "02",
      status: "3 SPOTS LEFT",
      statusType: "available",
    },
  ];

  const documents = [
    { name: "Travel Itinerary", file: "travel-itinerary.pdf" },
    { name: "Packing List", file: "packing-list.pdf" },
    { name: "Terms & Conditions", file: "terms-conditions.pdf" },
  ];

  const community = [
    {
      image:
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1470&auto=format&fit=crop",
      title: "Do Life Together",
      description:
        "We build relationships to last...the rest of our lives. Retirement-Tribe anyone?",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1470&auto=format&fit=crop",
      title: "Cocreate the Adventure",
      description:
        "Discover how different travel feels when the experience is cocreated and shared as a Tribe.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop",
      title: "Reignite Your Work",
      description:
        "Realize your goals and dreams knowing you have the world's best cheerleaders in your corner.",
    },
  ];

  // Reusable card component
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

  const SectionTitle = ({ children }: { children: string }) => (
    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-10">
      {children}
    </h3>
  );

  return (
    <>
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
            Beutiful Beach Retreat
          </p>
          <h1 className="text-6xl md:text-8xl font-serif tracking-wide mb-4">
            GOA.
          </h1>
          <p className="text-xl md:text-2xl tracking-widest uppercase mb-8">
            Goa, India
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

              <h4 className="font-bold uppercase tracking-wide mb-4">Extra</h4>
              <p className="flex items-start gap-2 text-sm text-gray-300 mb-8">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                $500 additional payment for a private room
              </p>

              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-400 uppercase">Total Price</p>
                <p className="text-4xl font-bold">$2,999</p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg uppercase tracking-wide transition-colors">
                  Book Now
                </button>
                <button className="w-full border-2 border-blue-500 text-blue-500 font-bold py-3 rounded-lg hover:bg-blue-500/10 transition-colors">
                  Gift a Trip
                </button>
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
              <ImageCard key={i} item={p} />
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
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-full uppercase tracking-wide transition-colors">
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
