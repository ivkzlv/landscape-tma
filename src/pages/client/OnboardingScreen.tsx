import { useState } from "react";
import {
  Leaf, Star, Clock, ArrowLeft, Lightbulb, BookOpen, TrendingUp,
  MapPin, Phone, User as UserIcon, CheckCircle, Bell, RotateCcw,
  Home as HomeIcon,
} from "lucide-react";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { OptionButton } from "@/components/onboarding/OptionButton";
import { estimatePrice, getMatchingCaseStudies, calendarSlots } from "@/lib/onboarding-data";
import { Colors } from "@/lib/theme";
import type {
  WizardScreen, WizardState, AreaOption, NeedOption, BudgetOption, TimelineOption,
} from "@/lib/onboarding-types";

const INITIAL: WizardState = {
  ownsPlot: null, area: null, needs: [], budget: null,
  timeline: null, selectedSlot: null, name: "", phone: "",
};

// ── Reusable step shell ──────────────────────────────────────────────────────

function StepShell({
  step, total, onBack, children,
}: { step: number; total: number; onBack: () => void; children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full bg-app-bg">
      {/* Top bar */}
      <div className="bg-white shadow-sm flex items-center">
        <button onClick={onBack} className="p-4 text-gray-500">
          <ArrowLeft size={20} />
        </button>
        <ProgressBar current={step} total={total} />
      </div>
      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-12">
        {children}
      </div>
    </div>
  );
}

// ── CTA Button ───────────────────────────────────────────────────────────────

function CtaButton({ label, onPress, disabled }: { label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className="w-full h-13 rounded-2xl text-white font-bold text-sm flex items-center justify-center mt-2 transition-opacity disabled:opacity-40"
      style={{ backgroundColor: Colors.accent, height: 52 }}
    >
      {label}
    </button>
  );
}

// ── Step heading ─────────────────────────────────────────────────────────────

function StepHeading({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">{tag}</p>
      <h2 className="text-xl font-extrabold text-gray-900 leading-snug">{title}</h2>
    </div>
  );
}

// ── WELCOME ──────────────────────────────────────────────────────────────────

const TRUST = [
  { Icon: Star,  text: "200+ completed projects" },
  { Icon: Clock, text: "Response within 30 minutes" },
  { Icon: Leaf,  text: "Free on-site consultation" },
];

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col h-full bg-app-bg">
      {/* Hero */}
      <div
        className="flex flex-col items-center pt-16 pb-8 px-6"
        style={{ backgroundColor: Colors.primary }}
      >
        <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
          <Leaf size={32} color="white" />
        </div>
        <h1 className="text-2xl font-extrabold text-white text-center leading-snug mb-2.5">
          Get a free landscape estimate & book a consultation
        </h1>
        <p className="text-sm text-white/70 text-center leading-relaxed">
          Answer 4 quick questions to get a price range and see relevant projects.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
        {/* Trust card */}
        <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
          {TRUST.map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${Colors.primary}18` }}
              >
                <Icon size={18} color={Colors.primary} />
              </div>
              <span className="text-sm font-medium text-gray-700">{text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="h-14 rounded-2xl text-white font-bold text-base flex items-center justify-center"
          style={{ backgroundColor: Colors.accent }}
        >
          Start Assessment →
        </button>
        <p className="text-xs text-gray-400 text-center">
          Takes about 2 minutes · No payment required
        </p>
      </div>
    </div>
  );
}

// ── QUALIFICATION ────────────────────────────────────────────────────────────

function QualificationStep({ onYes, onNo, onBack }: { onYes: () => void; onNo: () => void; onBack: () => void }) {
  return (
    <StepShell step={1} total={5} onBack={onBack}>
      <StepHeading tag="Filter 1 — Qualification" title="Do you own a plot of land or a house with a yard?" />
      <div className="flex flex-col gap-3">
        <OptionButton label="Yes, I have a plot or a yard" description="I own or manage the land" icon={<HomeIcon size={20} color="#6B7280" />} selected={false} onPress={onYes} />
        <OptionButton label="No, I'm just looking for ideas" description="I don't currently have land" icon={<Lightbulb size={20} color="#6B7280" />} selected={false} onPress={onNo} />
      </div>
    </StepShell>
  );
}

// ── DISQUALIFIED ─────────────────────────────────────────────────────────────

function DisqualifiedScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-app-bg px-8 py-8 text-center">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
        style={{ backgroundColor: `${Colors.primary}18` }}
      >
        <BookOpen size={40} color={Colors.primary} />
      </div>
      <h2 className="text-xl font-extrabold text-gray-900 mb-2.5">No problem at all!</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs">
        We specialize in turnkey landscaping for existing plots. Follow our blog for inspiration and ideas.
      </p>
      <button
        className="w-full max-w-xs h-13 rounded-2xl text-white font-bold mb-4"
        style={{ backgroundColor: Colors.primary, height: 52 }}
      >
        Read Our Blog
      </button>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
        <ArrowLeft size={16} /> Back to Home
      </button>
    </div>
  );
}

// ── AREA ─────────────────────────────────────────────────────────────────────

const AREA_OPTS: { value: AreaOption; label: string; description: string }[] = [
  { value: "up-to-6",      label: "Up to 6 acres",     description: "Small to medium private yard" },
  { value: "6-to-15",      label: "6–15 acres",         description: "Medium estate or cottage plot" },
  { value: "more-than-15", label: "More than 15 acres", description: "Large estate or countryside" },
  { value: "not-sure",     label: "Not sure",           description: "I'll measure or can find out" },
];
function AreaStep({ value, onChange, onNext, onBack }: { value: AreaOption | null; onChange: (v: AreaOption) => void; onNext: () => void; onBack: () => void }) {
  return (
    <StepShell step={2} total={5} onBack={onBack}>
      <StepHeading tag="Step 2 — Plot Size" title="What is the approximate area of your plot?" />
      <div className="flex flex-col gap-3 mb-6">
        {AREA_OPTS.map((o) => <OptionButton key={o.value} label={o.label} description={o.description} selected={value === o.value} onPress={() => onChange(o.value)} />)}
      </div>
      <CtaButton label="Continue" onPress={onNext} disabled={!value} />
    </StepShell>
  );
}

// ── NEEDS ─────────────────────────────────────────────────────────────────────

const NEED_OPTS: { value: NeedOption; label: string; description: string }[] = [
  { value: "turnkey",     label: "Turnkey landscaping",     description: "Full design + construction" },
  { value: "design-only", label: "Design project only",     description: "Drawings and concept" },
  { value: "planting",    label: "Planting trees & shrubs", description: "Greenery, flower beds" },
  { value: "lawn-care",   label: "Lawn care & maintenance", description: "Mowing, irrigation, upkeep" },
];
function NeedsStep({ value, onChange, onNext, onBack }: { value: NeedOption[]; onChange: (v: NeedOption[]) => void; onNext: () => void; onBack: () => void }) {
  const toggle = (opt: NeedOption) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  return (
    <StepShell step={3} total={5} onBack={onBack}>
      <StepHeading tag="Step 3 — Services" title="What services do you need?" />
      <p className="text-xs text-gray-400 -mt-3 mb-5">Select all that apply</p>
      <div className="flex flex-col gap-3 mb-6">
        {NEED_OPTS.map((o) => (
          <OptionButton key={o.value} label={o.label} description={o.description} selected={value.includes(o.value)} variant="checkbox" onPress={() => toggle(o.value)} />
        ))}
      </div>
      <CtaButton label="Continue" onPress={onNext} disabled={value.length === 0} />
    </StepShell>
  );
}

// ── BUDGET + TIMELINE ─────────────────────────────────────────────────────────

const BUDGET_OPTS: { value: BudgetOption; label: string }[] = [
  { value: "under-500k",        label: "Under 500,000 RUB" },
  { value: "500k-1.5m",         label: "500,000 – 1,500,000 RUB" },
  { value: "over-1.5m",         label: "Over 1,500,000 RUB" },
  { value: "need-consultation", label: "Need a consultation to decide" },
];
const TIMELINE_OPTS: { value: TimelineOption; label: string }[] = [
  { value: "within-1-month", label: "Within 1 month" },
  { value: "this-season",    label: "This season" },
  { value: "next-year",      label: "Next year" },
];
function BudgetTimelineStep({ budget, timeline, onBudget, onTimeline, onNext, onBack }: { budget: BudgetOption | null; timeline: TimelineOption | null; onBudget: (v: BudgetOption) => void; onTimeline: (v: TimelineOption) => void; onNext: () => void; onBack: () => void }) {
  return (
    <StepShell step={4} total={5} onBack={onBack}>
      <StepHeading tag="Step 4 — Budget & Timeline" title="What is your approximate budget?" />
      <div className="flex flex-col gap-3 mb-6">
        {BUDGET_OPTS.map((o) => <OptionButton key={o.value} label={o.label} selected={budget === o.value} onPress={() => onBudget(o.value)} />)}
      </div>
      <div className="h-px bg-gray-200 mb-6" />
      <h3 className="text-xl font-extrabold text-gray-900 mb-4">When do you plan to start?</h3>
      <div className="flex flex-col gap-3 mb-6">
        {TIMELINE_OPTS.map((o) => <OptionButton key={o.value} label={o.label} selected={timeline === o.value} onPress={() => onTimeline(o.value)} />)}
      </div>
      <CtaButton label="See My Estimate →" onPress={onNext} disabled={!budget || !timeline} />
    </StepShell>
  );
}

// ── BOOKING ───────────────────────────────────────────────────────────────────

function BookingStep({ state, onSlot, onName, onPhone, onConfirm, onBack }: {
  state: WizardState; onSlot: (id: string) => void; onName: (v: string) => void;
  onPhone: (v: string) => void; onConfirm: () => void; onBack: () => void;
}) {
  const priceRange = estimatePrice(state.area, state.budget);
  const matched    = getMatchingCaseStudies(state.needs);
  const slotsByDay: Record<string, typeof calendarSlots> = {};
  calendarSlots.forEach((s) => {
    if (!slotsByDay[s.label]) slotsByDay[s.label] = [];
    slotsByDay[s.label].push(s);
  });
  const canConfirm = !!state.selectedSlot && state.name.trim().length >= 2 && state.phone.trim().length >= 7;

  return (
    <StepShell step={5} total={5} onBack={onBack}>
      {/* Price */}
      {priceRange && (
        <div className="rounded-2xl p-5 mb-5" style={{ backgroundColor: Colors.primary }}>
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp size={14} color="rgba(255,255,255,0.7)" />
            <span className="text-xs text-white/70 uppercase tracking-wide">Your estimated range</span>
          </div>
          <p className="text-2xl font-extrabold text-white mt-1">
            {priceRange.low} – {priceRange.high}{" "}
            <span className="text-sm font-semibold text-white/70">RUB</span>
          </p>
          <p className="text-xs text-white/55 mt-1">Final price confirmed after free on-site visit</p>
        </div>
      )}

      {/* Portfolio */}
      <p className="text-sm font-bold text-gray-900 mb-3">Similar projects from our portfolio</p>
      <div className="flex flex-col gap-3 mb-6">
        {matched.map((cs) => (
          <div key={cs.id} className="bg-white rounded-2xl flex overflow-hidden shadow-sm">
            <div className="w-20 h-20 shrink-0" style={{ backgroundColor: cs.gradientStart }} />
            <div className="flex-1 p-3 flex flex-col justify-center">
              <p className="text-sm font-semibold text-gray-900 line-clamp-2">{cs.title}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={10} color="#9CA3AF" />
                <span className="text-xs text-gray-400">{cs.location}</span>
              </div>
              <p className="text-xs font-bold mt-1" style={{ color: Colors.primary }}>{cs.budget}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <p className="text-sm font-bold text-gray-900 mb-1">Book a free on-site consultation</p>
      <p className="text-xs text-gray-400 mb-4">Select a convenient time — we'll come to your plot at no charge.</p>
      {Object.entries(slotsByDay).map(([day, slots]) => (
        <div key={day} className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">{day}</p>
          <div className="flex flex-wrap gap-2">
            {slots.map((slot) => {
              const sel = state.selectedSlot === slot.id;
              return (
                <button
                  key={slot.id}
                  disabled={!slot.available}
                  onClick={() => slot.available && onSlot(slot.id)}
                  className="px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-colors disabled:opacity-30"
                  style={{
                    borderColor: sel ? Colors.primary : "#E5E7EB",
                    backgroundColor: sel ? Colors.primary : "#fff",
                    color: sel ? "#fff" : "#374151",
                  }}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Form */}
      <div className="bg-white rounded-2xl p-4 mb-2 mt-2 shadow-sm">
        <p className="text-sm font-bold text-gray-900 mb-3">Your contact details</p>
        <div className="flex flex-col gap-3.5">
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <UserIcon size={12} color="#6B7280" />
              <label className="text-xs font-bold uppercase text-gray-500">Full Name</label>
            </div>
            <input
              type="text"
              value={state.name}
              onChange={(e) => onName(e.target.value)}
              placeholder="e.g. Ivan Petrov"
              className="w-full border-2 border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <Phone size={12} color="#6B7280" />
              <label className="text-xs font-bold uppercase text-gray-500">Phone Number</label>
            </div>
            <input
              type="tel"
              value={state.phone}
              onChange={(e) => onPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className="w-full border-2 border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <CtaButton label="Confirm Booking" onPress={onConfirm} disabled={!canConfirm} />
    </StepShell>
  );
}

// ── SUCCESS ───────────────────────────────────────────────────────────────────

function SuccessScreen({ name, onRestart }: { name: string; onRestart: () => void }) {
  const firstName = name.trim().split(" ")[0] || "there";
  return (
    <div className="flex flex-col items-center justify-center h-full bg-app-bg px-8 text-center">
      <div
        className="w-22 h-22 rounded-full flex items-center justify-center mb-5 shadow-xl"
        style={{ backgroundColor: Colors.primary, width: 88, height: 88, borderRadius: 44 }}
      >
        <CheckCircle size={44} color="white" strokeWidth={1.8} />
      </div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-2.5">Booking confirmed, {firstName}!</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-7 max-w-xs">
        Our manager will call you within <strong className="font-bold text-gray-700">30 minutes</strong> to confirm the details.
      </p>
      <div className="bg-white rounded-2xl p-4 flex items-start gap-3 w-full max-w-xs mb-7 shadow-sm">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${Colors.accent}20` }}
        >
          <Bell size={18} color={Colors.accent} />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-gray-900">What happens next?</p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Our architect will visit your plot, assess the area, and prepare a detailed proposal — free of charge.
          </p>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="flex items-center justify-center gap-2 w-full max-w-xs h-13 rounded-2xl text-white font-bold"
        style={{ backgroundColor: Colors.primary, height: 52 }}
      >
        <RotateCcw size={15} color="white" />
        Start a New Assessment
      </button>
    </div>
  );
}

// ── Wizard state machine ──────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const [screen, setScreen] = useState<WizardScreen>("welcome");
  const [st, setSt]         = useState<WizardState>(INITIAL);
  const patch = (p: Partial<WizardState>) => setSt((prev) => ({ ...prev, ...p }));
  const go    = (s: WizardScreen)         => setScreen(s);

  switch (screen) {
    case "welcome":
      return <WelcomeScreen onStart={() => go("qualification")} />;
    case "qualification":
      return (
        <QualificationStep
          onYes={() => { patch({ ownsPlot: true });  go("area"); }}
          onNo={()  => { patch({ ownsPlot: false }); go("disqualified"); }}
          onBack={() => go("welcome")}
        />
      );
    case "disqualified":
      return <DisqualifiedScreen onBack={() => go("welcome")} />;
    case "area":
      return <AreaStep value={st.area} onChange={(area) => patch({ area })} onNext={() => go("needs")} onBack={() => go("qualification")} />;
    case "needs":
      return <NeedsStep value={st.needs} onChange={(needs) => patch({ needs })} onNext={() => go("budget-timeline")} onBack={() => go("area")} />;
    case "budget-timeline":
      return (
        <BudgetTimelineStep
          budget={st.budget} timeline={st.timeline}
          onBudget={(budget) => patch({ budget })}
          onTimeline={(timeline) => patch({ timeline })}
          onNext={() => go("booking")}
          onBack={() => go("needs")}
        />
      );
    case "booking":
      return (
        <BookingStep
          state={st}
          onSlot={(selectedSlot) => patch({ selectedSlot })}
          onName={(name) => patch({ name })}
          onPhone={(phone) => patch({ phone })}
          onConfirm={() => go("success")}
          onBack={() => go("budget-timeline")}
        />
      );
    case "success":
      return <SuccessScreen name={st.name} onRestart={() => { setSt(INITIAL); go("welcome"); }} />;
    default:
      return null;
  }
}
