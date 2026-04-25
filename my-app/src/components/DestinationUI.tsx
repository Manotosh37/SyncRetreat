import React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="group">{children}</div>
);

export interface ImgCardProps {
  item: {
    image: string;
    title: string;
    description: string;
  };
  h?: string;
}

export const ImgCard = ({ item, h = "h-56" }: ImgCardProps) => (
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

export interface PlaceCardProps {
  item: {
    image: string;
    title: string;
    day1: string;
    day2: string;
    [key: string]: string;
  };
}

export const PlaceCard = ({ item }: PlaceCardProps) => (
  <Card>
    <div className="overflow-hidden rounded-2xl mb-4 shadow-sm border border-slate-100">
      <img
        src={item.image}
        alt={item.title}
        className={`w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300`}
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

export interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => (
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
