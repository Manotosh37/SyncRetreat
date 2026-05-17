"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

/* ─── DATA ─────────────────────────────────────────────────────────── */

type QuestionType = { id: string; text: string; type: "scale" | "yesno" };
type SectionType = {
  id: string;
  num: string;
  title: string;
  italic: string;
  research: string;
  source: string;
  pts: number;
  questions: QuestionType[];
};

const SECTIONS: SectionType[] = [
  {
    id: "deep-work",
    num: "01",
    title: "Deep Work",
    italic: "& Focus",
    research:
      "Knowledge workers with 4+ hrs of uninterrupted focus produce 2.8x more output.",
    source: "Source: McKinsey Global Institute, 2023",
    pts: 35,
    questions: [
      {
        id: "dw1",
        text: "Team members have protected deep work blocks daily",
        type: "scale",
      },
      {
        id: "dw2",
        text: "Meetings are batched into specific time windows",
        type: "scale",
      },
      {
        id: "dw3",
        text: "Notifications are silenced during deep work blocks",
        type: "scale",
      },
      {
        id: "dw4",
        text: "The team tracks output quality, not hours online",
        type: "scale",
      },
      {
        id: "dw5",
        text: "Deep work norms are documented and onboarded to new team members",
        type: "scale",
      },
      {
        id: "dw6",
        text: "A written no-meeting policy exists for at least 2 days per week",
        type: "yesno",
      },
      {
        id: "dw7",
        text: "A shared team calendar shows each person's deep work hours",
        type: "yesno",
      },
    ],
  },
  {
    id: "communication",
    num: "02",
    title: "Communication",
    italic: "Norms",
    research:
      "Teams with written communication agreements report 40% less always-on anxiety.",
    source: "Source: GitLab Remote Work Report, 2023",
    pts: 35,
    questions: [
      {
        id: "cn1",
        text: "Response time expectations are documented and agreed upon",
        type: "scale",
      },
      {
        id: "cn2",
        text: "Team members feel safe to have cameras off during video calls",
        type: "scale",
      },
      {
        id: "cn3",
        text: "Information is documented before meetings, not verbally during",
        type: "scale",
      },
      {
        id: "cn4",
        text: "The team uses async video (Loom etc.) instead of unnecessary calls",
        type: "scale",
      },
      {
        id: "cn5",
        text: "Communication norms are reviewed and updated quarterly",
        type: "scale",
      },
      {
        id: "cn6",
        text: "An async-first communication policy exists in writing",
        type: "yesno",
      },
      {
        id: "cn7",
        text: "A clear escalation path for urgent communication is defined",
        type: "yesno",
      },
    ],
  },
  {
    id: "culture",
    num: "03",
    title: "Team Rituals",
    italic: "& Culture",
    research:
      "Teams with regular non-work rituals show 21% higher profitability and 41% lower absenteeism.",
    source: "Source: Gallup Workplace Report, 2023",
    pts: 35,
    questions: [
      {
        id: "tr1",
        text: "The team has a weekly ritual that is not a status update",
        type: "scale",
      },
      {
        id: "tr2",
        text: "There is a strong culture of psychological safety",
        type: "scale",
      },
      {
        id: "tr3",
        text: "Onboarding includes cultural rituals, not just process docs",
        type: "scale",
      },
      {
        id: "tr4",
        text: "Working norms were co-created by the whole team",
        type: "scale",
      },
      {
        id: "tr5",
        text: "Team members know each other's working styles and personal contexts",
        type: "scale",
      },
      {
        id: "tr6",
        text: "Individual and collective wins are celebrated publicly",
        type: "yesno",
      },
      {
        id: "tr7",
        text: "The team has had an in-person gathering in the last 12 months",
        type: "yesno",
      },
    ],
  },
  {
    id: "alignment",
    num: "04",
    title: "Alignment",
    italic: "& Priorities",
    research:
      "Teams with clear visible OKRs are 3.5x more likely to report top-quartile engagement.",
    source: "Source: Google re:Work, 2022",
    pts: 35,
    questions: [
      {
        id: "ap1",
        text: "Every team member can name the top 3 company priorities right now",
        type: "scale",
      },
      {
        id: "ap2",
        text: "Individual work is visibly connected to team and company goals",
        type: "scale",
      },
      {
        id: "ap3",
        text: "Priorities are reviewed and reset at least quarterly",
        type: "scale",
      },
      {
        id: "ap4",
        text: "Urgent work has a clear and fast decision-making process",
        type: "scale",
      },
      {
        id: "ap5",
        text: "Post-mortems or retrospectives happen after major projects",
        type: "scale",
      },
      {
        id: "ap6",
        text: "A shared OKR or goal-tracking system is in use",
        type: "yesno",
      },
      {
        id: "ap7",
        text: "There is a single source of truth for what the team is working on",
        type: "yesno",
      },
    ],
  },
  {
    id: "retreat",
    num: "05",
    title: "In-Person",
    italic: "& Retreat Investment",
    research:
      "Remote teams meeting in-person quarterly report 34% higher engagement and 67% less interpersonal friction.",
    source: "Source: Harvard Business Review, 2022",
    pts: 35,
    questions: [
      {
        id: "ri1",
        text: "The team meets in person at least once per year intentionally",
        type: "scale",
      },
      {
        id: "ri2",
        text: "In-person time focuses on culture and alignment, not just tasks",
        type: "scale",
      },
      {
        id: "ri3",
        text: "Post-retreat action items are tracked and followed up on",
        type: "scale",
      },
      {
        id: "ri4",
        text: "Team members look forward to in-person gatherings",
        type: "scale",
      },
      {
        id: "ri5",
        text: "The team measures retreat impact on subsequent quarter performance",
        type: "scale",
      },
      {
        id: "ri6",
        text: "A dedicated budget for team retreats exists",
        type: "yesno",
      },
      {
        id: "ri7",
        text: "In-person time is intentionally designed, not improvised",
        type: "yesno",
      },
    ],
  },
];

const TIERS = [
  {
    range: "0 – 52 pts",
    label: "Critical",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    tagColor: "bg-red-500 text-white",
    title: "Your team is running on goodwill and individual heroics.",
    desc: "Misalignment, burnout, and turnover are near term risks.",
    action:
      "Action: Immediate intervention needed. A structured retreat + habit reset is urgent.",
  },
  {
    range: "53 – 105 pts",
    label: "Developing",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    tagColor: "bg-amber-500 text-white",
    title: "You have pockets of good practice but no consistent system.",
    desc: "High variance — great weeks followed by chaotic ones.",
    action:
      "Action: Pick 2–3 habits to systematise first. Plan an in-person reset.",
  },
  {
    range: "106 – 140 pts",
    label: "Performing",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    tagColor: "bg-emerald-600 text-white",
    title: "Strong foundations. Most habits are in place.",
    desc: "Growth will come from deepening culture and in-person investment.",
    action:
      "Action: Quarterly retreats will compound what you've already built.",
  },
  {
    range: "141 – 175 pts",
    label: "High Performing",
    color: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
    tagColor: "bg-emerald-400 text-slate-900",
    title: "You're in the top 10% of remote teams globally.",
    desc: "Protect what you've built. Scale it. Share it.",
    action: "Action: Annual retreat to preserve culture as you grow.",
  },
];

const ACTION_PLAN = [
  {
    week: "Week 1–2",
    title: "Identify your 3 lowest-scoring habits from the audit",
    desc: "Share results with your full team — not just leadership.",
  },
  {
    week: "Week 3–4",
    title: "Draft a 1-page team communication agreement",
    desc: "Define response times, async norms, and camera-off policy.",
  },
  {
    week: "Month 2",
    title: "Introduce one new team ritual (wins thread, learning share)",
    desc: "Run it for 6 consecutive weeks before evaluating.",
  },
  {
    week: "Month 3",
    title: "Block deep work windows into the shared team calendar",
    desc: "Protect them the same way you protect client meetings.",
  },
  {
    week: "Quarter End",
    title: "Review OKRs — are individual tasks visibly tied to outcomes?",
    desc: "Adjust and re-communicate priorities before next quarter.",
  },
];

/* ─── SUB-COMPONENTS ───────────────────────────────────────────────── */

function ScaleButtons({
  questionId,
  value,
  onChange,
}: {
  questionId: string;
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`w-9 h-9 rounded-full border text-xs font-bold transition-all duration-200 ${
            value === n
              ? "bg-emerald-500 border-emerald-500 text-slate-900 scale-110 shadow-lg shadow-emerald-500/30"
              : "border-white/20 text-slate-400 hover:border-emerald-500/60 hover:text-emerald-400 bg-transparent"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

function YesNoButtons({
  questionId,
  value,
  onChange,
}: {
  questionId: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex gap-2">
      {[
        { label: "Yes", val: true },
        { label: "No", val: false },
      ].map(({ label, val }) => (
        <button
          key={label}
          onClick={() => onChange(val)}
          className={`px-4 h-9 rounded-full border text-xs font-bold transition-all duration-200 ${
            value === val
              ? val
                ? "bg-emerald-500 border-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30"
                : "bg-red-500/80 border-red-500 text-white"
              : "border-white/20 text-slate-400 hover:border-white/40 bg-transparent"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/* ─── MAIN COMPONENT ───────────────────────────────────────────────── */

export default function ProductivityAudit() {
  const [answers, setAnswers] = useState<
    Record<string, number | boolean | null>
  >({});
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(Object.fromEntries(SECTIONS.map((s) => [s.id, true])));

  const setAnswer = (id: string, val: number | boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const getSectionScore = (section: SectionType) => {
    let score = 0;
    for (const q of section.questions) {
      const ans = answers[q.id];
      if (ans === null || ans === undefined) continue;
      if (q.type === "scale" && typeof ans === "number") score += ans;
      else if (q.type === "yesno" && ans === true) score += 5;
    }
    return score;
  };

  const sectionScores = useMemo(() => SECTIONS.map(getSectionScore), [answers]);
  const grandTotal = sectionScores.reduce((a, b) => a + b, 0);
  const answeredCount = Object.values(answers).filter(
    (v) => v !== null && v !== undefined,
  ).length;
  const totalQuestions = SECTIONS.reduce((a, s) => a + s.questions.length, 0);

  const activeTier =
    TIERS.find((_, i) => {
      const thresholds = [52, 105, 140, 175];
      return grandTotal <= thresholds[i];
    }) || TIERS[3];

  const toggleSection = (id: string) =>
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-[#0d1510] text-white">
      {/* ── HERO HEADER ── */}
      <div className="max-w-5xl mx-auto px-6 pt-36 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-slate-300 mb-8">
            Free Resource
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-normal text-white mb-3 leading-tight">
            Remote Team
          </h1>
          <h1 className="text-5xl md:text-7xl font-serif italic text-emerald-400 mb-8 leading-tight">
            Productivity Audit
          </h1>
          <p className="text-slate-400 font-medium max-w-lg leading-relaxed text-lg">
            7 habits. Honest scores. A clear path forward. Complete this as a{" "}
            <span className="text-emerald-400 underline underline-offset-4 decoration-emerald-400/40">
              team diagnostic
            </span>{" "}
            — not a performance review. Be honest. That's the{" "}
            <span className="italic text-slate-300">only way</span> it helps.
          </p>
        </motion.div>

        {/* Meta Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {[
            {
              label: "SCORING",
              body: "1 = Never · 2 = Rarely · 3 = Sometimes · 4 = Often · 5 = Consistently\nYes / No = 5 or 0 pts",
            },
            { label: "MAX SCORE", body: null, score: 175 },
            {
              label: "BUILT ON",
              body: "Peer-reviewed research & remote work studies",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="border border-white/10 rounded-2xl p-5 bg-white/3"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-3">
                {card.label}
              </p>
              {card.score ? (
                <p className="text-5xl font-serif text-white">{card.score}</p>
              ) : (
                <p className="text-sm text-slate-300 font-medium leading-relaxed whitespace-pre-line">
                  {card.body}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="flex justify-between text-xs text-slate-500 font-medium mb-2">
            <span>
              {answeredCount} of {totalQuestions} questions answered
            </span>
            <span className="text-emerald-400">
              {Math.round((answeredCount / totalQuestions) * 100)}% complete
            </span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              animate={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* ── SECTIONS ── */}
      <div className="max-w-5xl mx-auto px-6 space-y-2 pb-8">
        {SECTIONS.map((section, si) => {
          const sectionScore = sectionScores[si];
          const isExpanded = expandedSections[section.id];

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.08 }}
              className="border border-white/10 rounded-3xl overflow-hidden bg-white/2"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-8 pt-10 pb-6 text-left group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500/70 mb-2">
                      Section {section.num}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-serif text-white">
                      {section.title}{" "}
                      <span className="italic text-slate-300">
                        {section.italic}
                      </span>
                    </h2>
                  </div>
                  <div className="flex items-center gap-4 mt-3 shrink-0">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                        Section Score
                      </p>
                      <p className="text-4xl font-serif text-white">
                        {sectionScore}
                      </p>
                      <p className="text-xs text-slate-500">
                        / {section.pts} pts
                      </p>
                    </div>
                    <div className="text-slate-500 group-hover:text-slate-300 transition-colors">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {/* Research Basis */}
                    <div className="mx-8 mb-6 p-5 border border-white/10 rounded-2xl bg-white/3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-2">
                        Research Basis
                      </p>
                      <p className="text-sm text-slate-200 font-medium leading-relaxed">
                        {section.research}
                      </p>
                      <p className="text-xs text-slate-500 mt-2 italic">
                        {section.source}
                      </p>
                    </div>

                    {/* Questions */}
                    <div className="divide-y divide-white/6">
                      {section.questions.map((q, qi) => (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: qi * 0.04 }}
                          className="flex items-center justify-between gap-6 px-8 py-5 hover:bg-white/3 transition-colors"
                        >
                          <p
                            className={`text-sm font-medium leading-snug ${
                              answers[q.id] !== null &&
                              answers[q.id] !== undefined
                                ? "text-slate-200"
                                : "text-slate-400"
                            }`}
                          >
                            {q.text}
                          </p>
                          <div className="shrink-0">
                            {q.type === "scale" ? (
                              <ScaleButtons
                                questionId={q.id}
                                value={answers[q.id] as number | null}
                                onChange={(v) => setAnswer(q.id, v)}
                              />
                            ) : (
                              <YesNoButtons
                                questionId={q.id}
                                value={answers[q.id] as boolean | null}
                                onChange={(v) => setAnswer(q.id, v)}
                              />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* ── SCORE INTERPRETATION ── */}
      <div className="max-w-5xl mx-auto px-6 mt-8 pb-8">
        <div className="border border-white/10 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#1a2e20] px-8 py-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500/70 mb-3">
              Score Interpretation
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-white">
              What your total score means — and what to do next
            </h2>
          </div>

          {/* Section score summary */}
          <div className="bg-[#0d1510] px-8 py-6 border-t border-white/10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
              Add your section scores here
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {SECTIONS.map((s, i) => (
                <div key={s.id}>
                  <p className="text-[10px] text-slate-500 mb-1 leading-tight">
                    0{i + 1} {s.title}
                  </p>
                  <p className="text-sm font-bold text-slate-300">
                    {sectionScores[i]} / {s.pts}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between p-4 bg-white/4 border border-white/10 rounded-2xl">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  Grand Total
                </p>
                <p className="text-xs text-slate-500">/ 175 pts</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-400">
                  Your score:
                </span>
                <span className="text-2xl font-serif font-bold text-emerald-400">
                  {grandTotal}
                </span>
              </div>
            </div>
          </div>

          {/* Tier Cards */}
          <div className="px-8 pb-8 bg-[#0d1510] space-y-3">
            {TIERS.map((tier) => {
              const isActive = tier === activeTier && answeredCount > 0;
              return (
                <div
                  key={tier.label}
                  className={`p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? `${tier.color} scale-[1.01] shadow-xl`
                      : "border-white/10 bg-white/2"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-xs font-bold text-slate-400">
                      {tier.range}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${tier.tagColor}`}
                    >
                      {tier.label}
                    </span>
                  </div>
                  <p
                    className={`font-bold text-sm mb-1 ${isActive ? "text-white" : "text-slate-400"}`}
                  >
                    {tier.title}
                  </p>
                  <p
                    className={`text-xs mb-2 ${isActive ? "text-slate-300" : "text-slate-500"}`}
                  >
                    {tier.desc}
                  </p>
                  <p
                    className={`text-xs italic ${isActive ? "text-emerald-300" : "text-slate-600"}`}
                  >
                    {tier.action}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 30 DAY ACTION PLAN ── */}
      <div className="max-w-5xl mx-auto px-6 pb-8">
        <div className="border border-white/10 rounded-3xl overflow-hidden bg-white/2">
          <div className="px-8 py-8 border-b border-white/10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500/70 mb-1">
              Your 90 Day Action Plan
            </p>
          </div>
          <div className="divide-y divide-white/6">
            {ACTION_PLAN.map((item) => (
              <div
                key={item.week}
                className="px-8 py-6 flex gap-6 items-start hover:bg-white/2 transition-colors"
              >
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-emerald-500/60 pt-1 w-16">
                  {item.week}
                </span>
                <div>
                  <p className="text-sm font-bold text-white mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SYNCRETREAT IS THE SOLUTION ── */}
      <div className="max-w-5xl mx-auto px-6 pb-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500/70 mb-3">
            The Solution
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight">
            Your audit results.{" "}
            <span className="italic text-emerald-400">Our retreat.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Every section you just scored maps directly to something we engineer
            into every SyncRetreat cohort. You don&apos;t need another async
            channel or another all-hands. You need an intentional reset.
          </p>
        </div>

        {/* Mapping grid — audit score → retreat deliverable */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {[
            {
              section: "01 · Deep Work & Focus",
              pain: "Protected focus blocks don't survive the week.",
              fix: "Structured silent hours + no-meeting guarantee. 4 hrs of uninterrupted flow per day, built into the schedule.",
            },
            {
              section: "02 · Communication Norms",
              pain: "Everyone is online but nothing is asynchronous.",
              fix: "Facilitated session to co-write your team's async-first communication charter. Printed. Signed. Shipped home.",
            },
            {
              section: "03 · Team Rituals & Culture",
              pain: "There are no rituals. The Slack standup does not count.",
              fix: "We design and run 3 non-work rituals during the cohort. Your team leaves with a ritual stack that actually sticks.",
            },
            {
              section: "04 · Alignment & Priorities",
              pain: "Team members can't name the top 3 priorities.",
              fix: "Facilitated OKR calibration session with a neutral facilitator. Every engineer leaves knowing exactly what matters.",
            },
            {
              section: "05 · In-Person Investment",
              pain: "Last in-person was a disaster or didn't exist.",
              fix: "We handle venue, facilitation, agenda, logistics, and team experience. You show up. We do the rest.",
            },
            {
              section: "The Infrastructure",
              pain: "Remote work fails because the environment fails.",
              fix: "300 Mbps fiber, Herman Miller desks, UPS-backed power, Wi-Fi 6 — at 11,500 ft in Ladakh or on the Goan coast.",
            },
          ].map((item) => (
            <div
              key={item.section}
              className="border border-white/10 rounded-2xl p-5 bg-white/2 hover:bg-white/4 hover:border-emerald-900/50 transition-all duration-300 group"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500/70 mb-2">
                {item.section}
              </p>
              <p className="text-xs text-slate-500 mb-3 italic leading-relaxed">
                ✗ &ldquo;{item.pain}&rdquo;
              </p>
              <div className="w-6 h-px bg-emerald-600/50 mb-3" />
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                {item.fix}
              </p>
            </div>
          ))}
        </div>

        {/* Main CTA card */}
        <div className="bg-[#1b2e1e] border border-emerald-900/40 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, #4ade80 0%, transparent 55%), radial-gradient(circle at 20% 80%, #059669 0%, transparent 55%)",
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Left copy */}
            <div className="flex-1">
              {/* Brand badge */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/50">
                  <span className="text-sm font-black text-white">S</span>
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-widest leading-tight">
                    Sync Retreat
                  </p>
                  <p className="text-[10px] text-emerald-400/70 tracking-widest">
                    Work Retreats · Team Performance
                  </p>
                </div>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400/80 mb-3">
                If your team scored under 106
              </p>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 leading-snug">
                A single well-designed retreat
                <br />
                resets all 5 sections.
              </h3>
              <p className="text-slate-400 font-medium leading-relaxed max-w-lg">
                We design end-to-end retreats for remote and hybrid teams.
                Venue,{" "}
                <span className="text-emerald-400 underline underline-offset-2 decoration-emerald-400/40">
                  facilitation
                </span>
                , agenda,{" "}
                <span className="text-emerald-400 underline underline-offset-2 decoration-emerald-400/40">
                  logistics
                </span>
                , and team experiences — all handled.
              </p>
            </div>

            {/* Right CTAs */}
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-emerald-900/50 text-sm"
              >
                Book a 15-min Call →
              </Link>
              <a
                href="https://cal.com/syncretreat/meet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm"
              >
                Schedule via Cal.com
              </a>
              <a
                href="https://instagram.com/sync.retreat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/30 text-slate-400 hover:text-white font-medium px-8 py-3 rounded-full transition-all text-xs"
              >
                DM &lsquo;HABITS&rsquo; on Instagram @sync.retreat
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── REFERENCES ── */}
      <div className="max-w-5xl mx-auto px-6 pb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 mb-4">
          References
        </p>
        <ol className="space-y-1.5 list-decimal list-inside">
          {[
            [
              "Newport, C. (2016). Deep Work. Grand Central Publishing.",
              "calnewport.com",
            ],
            [
              "McKinsey Global Institute (2023). The Future of Work After COVID-19.",
              "mckinsey.com/mgi",
            ],
            [
              "GitLab Remote Work Report (2023). State of Remote Work.",
              "about.gitlab.com/remote-work-report",
            ],
            [
              "Gallup (2023). State of the Global Workplace Report.",
              "gallup.com/workplace",
            ],
            [
              "Doerr, J. (2018). Measure What Matters. Portfolio/Penguin.",
              "whatmatters.com",
            ],
            [
              "Harvard Business Review (2022). The Power of In-Person Work.",
              "hbr.org",
            ],
            [
              "Bloom, N. et al. (2018). Does Working from Home Work? Stanford GSB.",
              "nbloom.people.stanford.edu",
            ],
            [
              "Google re:Work. Goals, OKRs.",
              "rework.withgoogle.com/guides/goals-okrs-at-google",
            ],
          ].map(([cite, url], i) => (
            <li key={i} className="text-[11px] text-slate-600 leading-relaxed">
              {cite} <span className="text-slate-700">— {url}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* ── FOOTER LINE ── */}
      <div className="max-w-5xl mx-auto px-6 pb-16 border-t border-white/6 pt-6">
        <p className="text-[11px] text-slate-600 text-center">
          © Sync Retreat — Free to share with attribution{" "}
          <a
            href="https://instagram.com/sync.retreat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-400 transition-colors"
          >
            @sync.retreat
          </a>
        </p>
      </div>
    </div>
  );
}
