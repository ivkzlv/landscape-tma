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
  { Icon: Star,  text: "200+ выполненных проектов" },
  { Icon: Clock, text: "Ответ в течение 30 минут" },
  { Icon: Leaf,  text: "Бесплатный выезд на объект" },
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
          Получите бесплатный расчёт и запишитесь на консультацию
        </h1>
        <p className="text-sm text-white/70 text-center leading-relaxed">
          Ответьте на 4 вопроса, чтобы узнать ценовой диапазон и увидеть похожие проекты.
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
          Начать оценку →
        </button>
        <p className="text-xs text-gray-400 text-center">
          Займёт около 2 минут · Без оплаты
        </p>
      </div>
    </div>
  );
}

// ── QUALIFICATION ────────────────────────────────────────────────────────────

function QualificationStep({ onYes, onNo, onBack }: { onYes: () => void; onNo: () => void; onBack: () => void }) {
  return (
    <StepShell step={1} total={5} onBack={onBack}>
      <StepHeading tag="Фильтр 1 — Квалификация" title="У вас есть земельный участок или дом с двором?" />
      <div className="flex flex-col gap-3">
        <OptionButton label="Да, у меня есть участок или двор" description="Я владею землёй или управляю ею" icon={<HomeIcon size={20} color="#6B7280" />} selected={false} onPress={onYes} />
        <OptionButton label="Нет, я просто ищу идеи" description="У меня сейчас нет земли" icon={<Lightbulb size={20} color="#6B7280" />} selected={false} onPress={onNo} />
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
      <h2 className="text-xl font-extrabold text-gray-900 mb-2.5">Всё понятно!</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs">
        Мы специализируемся на ландшафтном дизайне для существующих участков. Читайте наш блог для вдохновения и идей.
      </p>
      <button
        className="w-full max-w-xs h-13 rounded-2xl text-white font-bold mb-4"
        style={{ backgroundColor: Colors.primary, height: 52 }}
      >
        Читать блог
      </button>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
        <ArrowLeft size={16} /> На главную
      </button>
    </div>
  );
}

// ── AREA ─────────────────────────────────────────────────────────────────────

const AREA_OPTS: { value: AreaOption; label: string; description: string }[] = [
  { value: "up-to-6",      label: "До 6 соток",       description: "Небольшой или средний частный двор" },
  { value: "6-to-15",      label: "6–15 соток",        description: "Средняя усадьба или дачный участок" },
  { value: "more-than-15", label: "Более 15 соток",    description: "Большая усадьба или загородный участок" },
  { value: "not-sure",     label: "Не знаю точно",     description: "Могу замерить или уточнить" },
];
function AreaStep({ value, onChange, onNext, onBack }: { value: AreaOption | null; onChange: (v: AreaOption) => void; onNext: () => void; onBack: () => void }) {
  return (
    <StepShell step={2} total={5} onBack={onBack}>
      <StepHeading tag="Шаг 2 — Площадь участка" title="Какова приблизительная площадь вашего участка?" />
      <div className="flex flex-col gap-3 mb-6">
        {AREA_OPTS.map((o) => <OptionButton key={o.value} label={o.label} description={o.description} selected={value === o.value} onPress={() => onChange(o.value)} />)}
      </div>
      <CtaButton label="Продолжить" onPress={onNext} disabled={!value} />
    </StepShell>
  );
}

// ── NEEDS ─────────────────────────────────────────────────────────────────────

const NEED_OPTS: { value: NeedOption; label: string; description: string }[] = [
  { value: "turnkey",     label: "Благоустройство под ключ",  description: "Полный дизайн + строительство" },
  { value: "design-only", label: "Только дизайн-проект",      description: "Чертежи и концепция" },
  { value: "planting",    label: "Посадка деревьев и кустов", description: "Озеленение, цветники" },
  { value: "lawn-care",   label: "Уход за газоном",           description: "Стрижка, полив, обслуживание" },
];
function NeedsStep({ value, onChange, onNext, onBack }: { value: NeedOption[]; onChange: (v: NeedOption[]) => void; onNext: () => void; onBack: () => void }) {
  const toggle = (opt: NeedOption) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  return (
    <StepShell step={3} total={5} onBack={onBack}>
      <StepHeading tag="Шаг 3 — Услуги" title="Какие услуги вам нужны?" />
      <p className="text-xs text-gray-400 -mt-3 mb-5">Выберите все подходящие варианты</p>
      <div className="flex flex-col gap-3 mb-6">
        {NEED_OPTS.map((o) => (
          <OptionButton key={o.value} label={o.label} description={o.description} selected={value.includes(o.value)} variant="checkbox" onPress={() => toggle(o.value)} />
        ))}
      </div>
      <CtaButton label="Продолжить" onPress={onNext} disabled={value.length === 0} />
    </StepShell>
  );
}

// ── BUDGET + TIMELINE ─────────────────────────────────────────────────────────

const BUDGET_OPTS: { value: BudgetOption; label: string }[] = [
  { value: "under-500k",        label: "До 500 000 ₽" },
  { value: "500k-1.5m",         label: "500 000 – 1 500 000 ₽" },
  { value: "over-1.5m",         label: "Более 1 500 000 ₽" },
  { value: "need-consultation", label: "Нужна консультация для оценки" },
];
const TIMELINE_OPTS: { value: TimelineOption; label: string }[] = [
  { value: "within-1-month", label: "В течение 1 месяца" },
  { value: "this-season",    label: "В этом сезоне" },
  { value: "next-year",      label: "В следующем году" },
];
function BudgetTimelineStep({ budget, timeline, onBudget, onTimeline, onNext, onBack }: { budget: BudgetOption | null; timeline: TimelineOption | null; onBudget: (v: BudgetOption) => void; onTimeline: (v: TimelineOption) => void; onNext: () => void; onBack: () => void }) {
  return (
    <StepShell step={4} total={5} onBack={onBack}>
      <StepHeading tag="Шаг 4 — Бюджет и сроки" title="Каков ваш приблизительный бюджет?" />
      <div className="flex flex-col gap-3 mb-6">
        {BUDGET_OPTS.map((o) => <OptionButton key={o.value} label={o.label} selected={budget === o.value} onPress={() => onBudget(o.value)} />)}
      </div>
      <div className="h-px bg-gray-200 mb-6" />
      <h3 className="text-xl font-extrabold text-gray-900 mb-4">Когда планируете начать?</h3>
      <div className="flex flex-col gap-3 mb-6">
        {TIMELINE_OPTS.map((o) => <OptionButton key={o.value} label={o.label} selected={timeline === o.value} onPress={() => onTimeline(o.value)} />)}
      </div>
      <CtaButton label="Узнать мой расчёт →" onPress={onNext} disabled={!budget || !timeline} />
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
            <span className="text-xs text-white/70 uppercase tracking-wide">Ваш расчётный диапазон</span>
          </div>
          <p className="text-2xl font-extrabold text-white mt-1">
            {priceRange.low} – {priceRange.high}{" "}
            <span className="text-sm font-semibold text-white/70">RUB</span>
          </p>
          <p className="text-xs text-white/55 mt-1">Итоговая цена уточняется после бесплатного выезда</p>
        </div>
      )}

      {/* Portfolio */}
      <p className="text-sm font-bold text-gray-900 mb-3">Похожие проекты из нашего портфолио</p>
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
      <p className="text-sm font-bold text-gray-900 mb-1">Запишитесь на бесплатный выезд</p>
      <p className="text-xs text-gray-400 mb-4">Выберите удобное время — мы приедем на ваш участок бесплатно.</p>
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
        <p className="text-sm font-bold text-gray-900 mb-3">Ваши контактные данные</p>
        <div className="flex flex-col gap-3.5">
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <UserIcon size={12} color="#6B7280" />
              <label className="text-xs font-bold uppercase text-gray-500">Полное имя</label>
            </div>
            <input
              type="text"
              value={state.name}
              onChange={(e) => onName(e.target.value)}
              placeholder="напр. Иван Петров"
              className="w-full border-2 border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <Phone size={12} color="#6B7280" />
              <label className="text-xs font-bold uppercase text-gray-500">Номер телефона</label>
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

      <CtaButton label="Подтвердить запись" onPress={onConfirm} disabled={!canConfirm} />
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
      <h2 className="text-2xl font-extrabold text-gray-900 mb-2.5">Запись подтверждена, {firstName}!</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-7 max-w-xs">
        Наш менеджер позвонит вам в течение <strong className="font-bold text-gray-700">30 минут</strong> для подтверждения деталей.
      </p>
      <div className="bg-white rounded-2xl p-4 flex items-start gap-3 w-full max-w-xs mb-7 shadow-sm">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${Colors.accent}20` }}
        >
          <Bell size={18} color={Colors.accent} />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-gray-900">Что будет дальше?</p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Наш архитектор посетит ваш участок, оценит территорию и подготовит детальное предложение — бесплатно.
          </p>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="flex items-center justify-center gap-2 w-full max-w-xs h-13 rounded-2xl text-white font-bold"
        style={{ backgroundColor: Colors.primary, height: 52 }}
      >
        <RotateCcw size={15} color="white" />
        Начать новую оценку
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
