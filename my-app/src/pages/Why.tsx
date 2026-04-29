import { motion } from "framer-motion";

const reasons = [
  {
    title: "COMMUNITY ON TAP",
    description:
      "Join a curated network of founders, creators, and professionals who share your ambition and values.",
    image:
      "https://images.unsplash.com/photo-1591197172062-c718f82aba20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q09NTVVOSVRZJTIwT04lMjBUQVB8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "PLUG & PLAY INFRASTRUCTURE",
    description:
      "Rock-solid Wi-Fi, ergonomic setups, and backup power. Your productivity is our primary protocol.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPmf3di15_PTJcbu46HCwnxAcue_iYb7nlQ&s",
  },
  {
    title: "PREMIUM STAYS, ICONIC VIEWS",
    description:
      "Hand-picked boutique properties in the world's most inspiring locations, fully managed for your comfort.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr2P2xnOz5turfkk3kh3B-U3zWLdoBT3g9pg&s",
  },
  {
    title: "ROUTINE MEETS ADVENTURE",
    description:
      "Maintain your wellness routine with yoga and fitness, then explore cultures and hidden gems on your terms.",
    image:
      "https://adventure.com/wp-content/uploads/2018/12/Travel-routines-Stretching-at-the-end-of-a-day-in-the-Gobi-Photo-credit-Leon-McCarron.jpg",
  },
];

export default function WhySyncRetreat() {
  return (
    <section className="bg-[#FDFCF2] py-20 md:py-32 px-6 md:px-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mb-6">
              The Experience
            </h2>
            <h2
              className="text-4xl sm:text-6xl lg:text-7xl text-slate-900 leading-[1.1] tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Why SyncRetreat?
            </h2>
          </div>
          <p className="text-slate-600 font-medium text-lg max-w-sm border-l-2 border-emerald-500 pl-6">
            We handle the logistics so you can focus on the work that matters
            and the life you want to lead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {reasons.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col group"
            >
              <div className="overflow-hidden mb-8 aspect-4/5 bg-slate-100 rounded-2xl relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/10 transition-colors duration-500" />
              </div>

              <div className="space-y-4">
                <h3 className="text-[14px] font-black text-slate-900 tracking-widest uppercase flex items-center gap-3">
                  <span className="w-8 h-px bg-emerald-500 transition-all duration-500 group-hover:w-12" />
                  {item.title}
                </h3>

                <p className="text-[16px] leading-relaxed text-slate-600 font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
