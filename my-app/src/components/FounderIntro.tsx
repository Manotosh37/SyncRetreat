import Image from "next/image";

export default function FounderIntro() {
  return (
    <section className="relative z-10 -mt-12 md:-mt-16 overflow-hidden pt-20 pb-24 bg-[#FEFBF7] text-slate-900 rounded-t-[48px] shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: YouTube Video Embed */}
          <div className="order-2 lg:order-1 relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/LXb3EKWsInQ?si=70bX31C3qI-i0wzX"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Right Column: Text Content */}
          <div className="order-1 lg:order-2 flex flex-col text-left">
            <h2 className="text-3xl md:text-5xl font-serif mb-8 text-slate-900 leading-tight">
              We invite you to join our <span className="text-emerald-500">Community</span>
            </h2>
            
            <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              <p>
                Do you have a nagging thought that time is ticking and there's so much of the world you still want to see?
                In the simplest terms, you're chasing the feeling of being alive—finding adventure, discovering new
                experiences, and having more freedom than ever before. But when you go to take the leap, an important
                piece is missing: reliable infrastructure and people to share the journey with.
              </p>
              
              <p>
                Not just any kind of people—your kind of people.
                Other motivated professionals who take their ambitions seriously but still love to have fun in their down time.
                The curious, optimistic, adventurous travellers with a fiery passion for life. Those who value deep work and
                crave connection, always open to learning from new cultures and gaining a new perspective.
              </p>
              
              <p>
                We are remote developers who got tired of rolling the dice on bad Wi-Fi in Airbnbs, so we built SyncRetreat.
                Since then, we've brought together founders, remote professionals, and high-level operators who have embarked on an unconventional style of travel. Where every month, members come together to
                call a new city home—to colive, cowork, and collaborate to write an unforgettable chapter of their lives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
