import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Zap, Users, TrendingUp, Target, Search, Filter,
  ChevronRight, ChevronLeft, MoreHorizontal, Plus, ArrowUpRight,
  ArrowDownRight, CheckCircle, Clock, XCircle, Mail, Phone,
  Building, User, DollarSign, BarChart2, Activity, Globe,
  Settings, LogOut, ChevronDown, Star, Layers, Cpu, X,
  Eye, Edit2, Trash2, Send, Sparkles
} from "lucide-react";

// ── Tiny helpers ──────────────────────────────────────────────────────────────
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const INITIAL_LEADS = [
  { id: 1, name: "Sofia Martinez", email: "sofia@techcorp.io", company: "TechCorp", value: 24000, status: "qualified", source: "LinkedIn", score: 92, date: "2024-06-01" },
  { id: 2, name: "James Okafor", email: "james@ventureX.com", company: "VentureX", value: 58000, status: "proposal", source: "Referral", score: 87, date: "2024-06-03" },
  { id: 3, name: "Aiko Tanaka", email: "aiko@nexusai.jp", company: "NexusAI", value: 112000, status: "negotiation", source: "Website", score: 95, date: "2024-06-05" },
  { id: 4, name: "Lucas Herrera", email: "lucas@cloudshift.co", company: "CloudShift", value: 33000, status: "new", source: "Cold Email", score: 61, date: "2024-06-07" },
  { id: 5, name: "Priya Nair", email: "priya@scalepath.in", company: "ScalePath", value: 79000, status: "qualified", source: "Demo", score: 78, date: "2024-06-09" },
  { id: 6, name: "Ethan Brooks", email: "ethan@orbitlabs.io", company: "OrbitLabs", value: 45000, status: "closed", source: "LinkedIn", score: 99, date: "2024-06-11" },
  { id: 7, name: "Nina Volkova", email: "nina@datapulse.eu", company: "DataPulse", value: 67000, status: "proposal", source: "Referral", score: 83, date: "2024-06-12" },
  { id: 8, name: "Omar Farooq", email: "omar@synapse.ae", company: "Synapse", value: 91000, status: "new", source: "Website", score: 70, date: "2024-06-14" },
];

const STATUS_META = {
  new: { label: "New", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/30" },
  qualified: { label: "Qualified", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
  proposal: { label: "Proposal", color: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/30" },
  negotiation: { label: "Negotiation", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  closed: { label: "Closed", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
};

const fmt = (n) => n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, prefix = "", suffix = "", duration = 1.8 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setVal(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
      else setVal(to);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

// ── Circular progress ─────────────────────────────────────────────────────────
function Ring({ pct, color = "#3B82F6", size = 56, stroke = 5 }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeLinecap="round"
        initial={{ strokeDasharray: `0 ${circ}` }}
        animate={{ strokeDasharray: `${dash} ${circ}` }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
    </svg>
  );
}

// ── Glass card ────────────────────────────────────────────────────────────────
function GlassCard({ children, className = "", hover = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4, boxShadow: "0 24px 60px rgba(59,130,246,0.12)" } : undefined}
      className={`rounded-2xl border border-white/[0.07] bg-[rgba(15,23,42,0.6)] backdrop-blur-xl ${className}`}
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" }}
    >
      {children}
    </motion.div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
const NAV_TABS = ["Dashboard", "Analytics", "Pipeline", "Leads"];

function Navbar({ active, setActive, onTabClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const tabRefs = useRef({});

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const getPillStyle = () => {
    const target = hoveredTab || active;
    const ref = tabRefs.current[target];
    if (!ref) return { left: 0, width: 0 };
    const { offsetLeft, offsetWidth } = ref;
    return { left: offsetLeft, width: offsetWidth };
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/[0.06]" : ""
      }`}
      style={{
        background: scrolled ? "rgba(2,6,23,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}>
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white tracking-tight text-lg">LeadTrack</span>
          <span className="hidden sm:inline text-[10px] font-medium px-2 py-0.5 rounded-full border border-blue-500/30 text-blue-400 bg-blue-500/10">AI</span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/[0.04] rounded-xl border border-white/[0.06] p-1 relative">
          {NAV_TABS.map((t) => (
            <button
              key={t}
              ref={(el) => (tabRefs.current[t] = el)}
              onClick={() => {
                setActive(t);
                if (onTabClick) onTabClick(t);
              }}
              onMouseEnter={() => setHoveredTab(t)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 z-10 ${
                active === t ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
          <div
            className="absolute h-[calc(100%-8px)] rounded-lg transition-all duration-300 ease-out"
            style={{
              left: getPillStyle().left + 4,
              width: getPillStyle().width - 8,
              top: 4,
              background: "linear-gradient(135deg,rgba(59,130,246,0.3),rgba(139,92,246,0.3))",
            }}
          />
        </div>

        <div className="w-8" />
      </div>
    </motion.nav>
  );
}

// ── Hero (Dashboard) ─────────────────────────────────────────────────────────
const HERO_STATS = [
  { label: "Total Leads", value: 1284, suffix: "", color: "#3B82F6" },
  { label: "Emails Sent", value: 1020, suffix: "", color: "#8B5CF6" },
  { label: "Emails Opened", value: 650, suffix: "", color: "#06B6D4" },
  { label: "Open Rate", value: 64, suffix: "%", color: "#10B981" },
];

function Hero({ onScrollToForm, id = "dashboard", stats }) {
  // Use real stats if provided, else fallback to placeholder
  const displayStats = stats ? [
    { label: "Total Leads", value: stats.totalLeads || 0, suffix: "", color: "#3B82F6" },
    { label: "Emails Sent", value: stats.emailsSent || 0, suffix: "", color: "#8B5CF6" },
    { label: "Emails Opened", value: stats.emailsOpened || 0, suffix: "", color: "#06B6D4" },
    { label: "Open Rate", value: stats.openRate || 0, suffix: "%", color: "#10B981" },
  ] : HERO_STATS;

  return (
    <section id={id} className="relative min-h-screen flex flex-col items-center justify-start px-6 pt-32 pb-10 overflow-hidden">
      {[
        { w: 600, h: 600, x: -100, y: -100, color: "rgba(59,130,246,0.15)" },
        { w: 500, h: 500, x: "60%", y: "10%", color: "rgba(139,92,246,0.12)" },
        { w: 400, h: 400, x: "10%", y: "60%", color: "rgba(6,182,212,0.08)" },
      ].map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: o.w, height: o.h, left: o.x, top: o.y, background: o.color, filter: "blur(80px)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Smart pipeline & deal tracking
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 leading-none"
        >
          <span className="text-white">LeadTrack</span>{" "}
          <span style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Qualify, score, and close deals faster. AI surfaces your highest-value opportunities
          so your team focuses on revenue, not admin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onScrollToForm}
            className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", boxShadow: "0 0 30px rgba(59,130,246,0.3)" }}
          >
            Add Your First Lead
          </button>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {displayStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              className="rounded-2xl border border-white/[0.07] bg-[rgba(15,23,42,0.5)] backdrop-blur-xl p-4 text-center"
              style={{ boxShadow: `0 0 20px ${s.color}22` }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                <Counter to={typeof s.value === "number" ? s.value : parseInt(s.value)}
                  prefix={s.prefix || ""} suffix={s.suffix || ""} />
              </div>
              <div className="text-xs text-slate-500 font-medium">{s.label}</div>
              <div className="mt-2 h-0.5 rounded-full mx-auto w-8" style={{ background: s.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Analytics ─────────────────────────────────────────────────────────────────
const METRICS = [
  { label: "Total Leads", value: 1284, change: 12.4, up: true, icon: Users, color: "#3B82F6", ring: 72 },
  { label: "Pipeline Value", value: "$4.2M", change: 8.1, up: true, icon: DollarSign, color: "#8B5CF6", ring: 85 },
  { label: "Win Rate", value: "68%", change: 3.2, up: true, icon: Target, color: "#10B981", ring: 68 },
  { label: "Avg Response", value: "2.4h", change: 15, up: false, icon: Clock, color: "#F59E0B", ring: 55 },
];

function Analytics({ id = "analytics" }) {
  return (
    <section id={id} className="px-6 py-12 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Analytics</h2>
        <p className="text-slate-500 text-sm">Performance snapshot · updated live</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {METRICS.map((m, i) => (
          <GlassCard key={m.label} delay={i * 0.07} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-white">{m.value}</p>
              </div>
              <div className="relative">
                <Ring pct={m.ring} color={m.color} size={52} stroke={4} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <m.icon className="w-4 h-4" style={{ color: m.color }} />
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${m.up ? "text-emerald-400" : "text-red-400"}`}>
              {m.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {m.change}% vs last month
            </div>
            <div className="mt-3 h-1 rounded-full bg-white/[0.04] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: m.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${m.ring}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

// ── Pipeline Section ──────────────────────────────────────────────────────────
function PipelineSection({ id = "pipeline" }) {
  return (
    <section id={id} className="px-6 py-12 max-w-[1400px] mx-auto">
      <GlassCard className="p-6" hover={false}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Pipeline by Stage</h3>
            <p className="text-xs text-slate-500 mt-0.5">Lead distribution across funnel</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg">
            <BarChart2 className="w-3.5 h-3.5" /> Last 30 days
          </div>
        </div>
        <div className="space-y-3">
          {[
            { stage: "New", count: 312, pct: 24, color: "#06B6D4" },
            { stage: "Qualified", count: 487, pct: 38, color: "#3B82F6" },
            { stage: "Proposal", count: 298, pct: 23, color: "#8B5CF6" },
            { stage: "Negotiation", count: 124, pct: 10, color: "#F59E0B" },
            { stage: "Closed Won", count: 63, pct: 5, color: "#10B981" },
          ].map((r, i) => (
            <motion.div key={r.stage}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
              <div className="flex items-center gap-4">
                <div className="w-24 text-xs text-slate-400 text-right flex-shrink-0">{r.stage}</div>
                <div className="flex-1 h-6 bg-white/[0.03] rounded-lg overflow-hidden border border-white/[0.04]">
                  <motion.div
                    className="h-full rounded-lg flex items-center px-2"
                    style={{ background: r.color + "33", borderRight: `2px solid ${r.color}` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${r.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                  >
                    <span className="text-[10px] font-semibold" style={{ color: r.color }}>{r.count}</span>
                  </motion.div>
                </div>
                <div className="w-10 text-xs text-slate-500 flex-shrink-0">{r.pct}%</div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

// ── Field component (OUTSIDE LeadForm to prevent cursor jump) ──────────────
const Field = ({ label, name, type = "text", icon: Icon, options, form, setForm, errors, setErrors }) => {
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      {options ? (
        <div className="relative">
          <select
            value={form[name]}
            onChange={e => { set(name, e.target.value); setErrors(p => ({ ...p, [name]: "" })); }}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white appearance-none focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
          >
            {options.map(o => <option key={o} value={o} style={{ background: "#0f172a" }}>{o}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
        </div>
      ) : type === 'textarea' ? (
        <textarea
          value={form[name]}
          onChange={e => { set(name, e.target.value); setErrors(p => ({ ...p, [name]: "" })); }}
          placeholder={label}
          rows={4}
          className={`w-full bg-white/[0.04] border rounded-xl py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-all resize-none ${errors[name] ? "border-red-500/50 focus:border-red-500" : "border-white/[0.08] focus:border-blue-500/50 focus:bg-white/[0.07]"
            } ${Icon ? "pl-10 pr-4" : "px-4"}`}
        />
      ) : (
        <div className="relative">
          {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />}
          <input
            type={type}
            value={form[name]}
            onChange={e => { set(name, e.target.value); setErrors(p => ({ ...p, [name]: "" })); }}
            placeholder={label}
            className={`w-full bg-white/[0.04] border rounded-xl py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${errors[name] ? "border-red-500/50 focus:border-red-500" : "border-white/[0.08] focus:border-blue-500/50 focus:bg-white/[0.07]"
              } ${Icon ? "pl-10 pr-4" : "px-4"}`}
          />
        </div>
      )}
      {errors[name] && <p className="mt-1 text-xs text-red-400">{errors[name]}</p>}
    </div>
  );
};

// ── Lead Form ─────────────────────────────────────────────────────────────────
const STEPS = ["Contact", "Company", "Requirement"];

function LeadForm({ onAddLead, onLeadAdded }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = "Name required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    }
    if (step === 1) {
      if (!form.company.trim()) e.company = "Company required";
    }
    if (step === 2) {
      if (!form.requirement.trim()) e.requirement = "Requirement required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const submit = async () => {
    if (!validate()) return;
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || '',
          company: form.company || '',
          requirement: form.requirement,
        }),
      });
      if (res.ok) {
        setDone(true);
        if (onLeadAdded) onLeadAdded(); // refresh leads list
        setTimeout(() => {
          setDone(false);
          setStep(0);
          setForm({ name: "", email: "", phone: "", company: "", requirement: "" });
        }, 2800);
      } else {
        console.error('Submission failed');
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
    }
  };

  return (
    <section id="lead-form" className="px-6 py-16 max-w-xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Add a Lead</h2>
          <p className="text-slate-400 text-sm">Three steps. Thirty seconds. Done.</p>
        </div>

        <GlassCard className="p-6 sm:p-8" hover={false}>
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${i < step ? "bg-emerald-500 text-white" :
                  i === step ? "text-white" : "bg-white/[0.06] text-slate-500"
                  }`} style={i === step ? { background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" } : {}}>
                  {i < step ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:inline ${i === step ? "text-white" : "text-slate-500"}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`flex-1 h-px transition-colors duration-300 ${i < step ? "bg-emerald-500/50" : "bg-white/[0.06]"}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center gap-4">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }}>
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                </motion.div>
                <p className="text-white font-semibold text-lg">Lead added!</p>
                <p className="text-slate-400 text-sm">AI is scoring this lead now.</p>
              </motion.div>
            ) : (
              <motion.div key={step}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }} className="space-y-4">
                {step === 0 && (
                  <>
                    <Field label="Full Name" name="name" icon={User} form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
                    <Field label="Email" name="email" type="email" icon={Mail} form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
                    <Field label="Phone (optional)" name="phone" type="tel" icon={Phone} form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
                  </>
                )}
                {step === 1 && (
                  <>
                    <Field label="Company" name="company" icon={Building} form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
                    {/* No source field – removed per requirements */}
                  </>
                )}
                {step === 2 && (
                  <Field label="Requirement / Message" name="requirement" type="textarea" form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!done && (
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button onClick={back}
                  className="flex-1 py-2.5 rounded-xl border border-white/[0.08] text-slate-300 text-sm font-medium hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button
                onClick={step < 2 ? next : submit}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", boxShadow: "0 0 20px rgba(59,130,246,0.25)" }}
              >
                {step < 2 ? (<>Next <ChevronRight className="w-4 h-4" /></>) : (<><Send className="w-4 h-4" /> Add Lead</>)}
              </button>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </section>
  );
}

// ── Leads Table ───────────────────────────────────────────────────────────────
const PAGE_SIZE = 5;

function LeadsTable({ leads, onDelete, id = "leads" }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);

  const filtered = leads.filter(l =>
    (filter === "all" || l.status === filter) &&
    (l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.company.toLowerCase().includes(query.toLowerCase()) ||
      l.email.toLowerCase().includes(query.toLowerCase()))
  );
  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => setPage(0), [query, filter]);

  const FILTERS = ["all", "new", "qualified", "proposal", "negotiation", "closed"];

  return (
    <section id={id} className="px-6 py-12 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Leads</h2>
        <p className="text-slate-500 text-sm">{leads.length} total · {filtered.length} shown</p>
      </motion.div>

      <GlassCard hover={false} className="overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search leads…"
              className="w-full pl-9 pr-4 py-2 bg-white/[0.04] border border-white/[0.07] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition-all"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${filter === f
                  ? "text-white"
                  : "text-slate-400 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]"
                  }`}
                style={filter === f ? { background: "linear-gradient(135deg,rgba(59,130,246,0.3),rgba(139,92,246,0.3))", border: "1px solid rgba(99,130,246,0.4)" } : {}}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {["Lead", "Company", "Value", "Source", "Score", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {visible.map((l, i) => {
                  const s = STATUS_META[l.status];
                  return (
                    <motion.tr key={l.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="border-b border-white/[0.03] hover:bg-white/[0.025] transition-colors group">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: `linear-gradient(135deg,${l.score > 85 ? "#3B82F6" : l.score > 70 ? "#8B5CF6" : "#475569"},${l.score > 85 ? "#8B5CF6" : l.score > 70 ? "#06B6D4" : "#334155"})` }}>
                            {l.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm text-white font-medium">{l.name}</p>
                            <p className="text-xs text-slate-500">{l.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-slate-300">{l.company}</td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-white">{fmt(l.value)}</td>
                      <td className="px-4 py-3.5 text-xs text-slate-400">{l.source}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-white/[0.06] rounded-full w-12 overflow-hidden">
                            <div className="h-full rounded-full" style={{
                              width: `${l.score}%`,
                              background: l.score > 85 ? "#10B981" : l.score > 70 ? "#3B82F6" : "#F59E0B"
                            }} />
                          </div>
                          <span className="text-xs font-medium text-slate-300">{l.score}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${s.color} ${s.bg} ${s.border}`}>
                          {l.status === "closed" ? <CheckCircle className="w-3 h-3" /> :
                            l.status === "new" ? <Zap className="w-3 h-3" /> :
                              <Clock className="w-3 h-3" />}
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-violet-400 transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => onDelete(l.id)}
                            className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
              {visible.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-500 text-sm">No leads match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {pages > 1 && (
          <div className="px-4 py-3 border-t border-white/[0.05] flex items-center justify-between">
            <p className="text-xs text-slate-500">Page {page + 1} of {pages}</p>
            <div className="flex gap-2">
              <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
                className="w-8 h-8 rounded-lg border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: pages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)}
                  className={`w-8 h-8 rounded-lg border text-xs font-medium transition-all ${i === page ? "text-white border-blue-500/40 bg-blue-500/20" : "border-white/[0.07] text-slate-400 hover:text-white"
                    }`}>
                  {i + 1}
                </button>
              ))}
              <button disabled={page === pages - 1} onClick={() => setPage(p => p + 1)}
                className="w-8 h-8 rounded-lg border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-8 px-6 mt-8">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}>
            <Zap className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm text-slate-500">LeadTrack AI — Premium CRM</span>
        </div>
        <p className="text-xs text-slate-600">© 2024 LeadTrack. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [navActive, setNavActive] = useState("Dashboard");
  const [stats, setStats] = useState({
    totalLeads: 0,
    emailsSent: 0,
    emailsOpened: 0,
    openRate: 0,
  });

  // Fetch real stats from backend
  const fetchStats = () => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching stats:', err));
  };

  // Fetch leads from backend
  const fetchLeads = () => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(err => console.error('Error fetching leads:', err));
  };

  // On mount, fetch stats and leads
  useEffect(() => {
    fetchStats();
    fetchLeads();
  }, []);

  const addLead = (lead) => setLeads(p => [lead, ...p]);
  const deleteLead = (id) => setLeads(p => p.filter(l => l.id !== id));

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll spy – update active tab based on visible section
  useEffect(() => {
    const sectionIds = ["dashboard", "analytics", "pipeline", "leads"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const tabMap = {
              dashboard: "Dashboard",
              analytics: "Analytics",
              pipeline: "Pipeline",
              leads: "Leads",
            };
            if (tabMap[id]) {
              setNavActive(tabMap[id]);
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to section when a tab is clicked
  const scrollToSection = (tab) => {
    const map = {
      Dashboard: "dashboard",
      Analytics: "analytics",
      Pipeline: "pipeline",
      Leads: "leads",
    };
    const id = map[tab];
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#020617", fontFamily: "'Inter',system-ui,sans-serif" }}>
      {/* Global gradient mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle,#3B82F620,transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle,#8B5CF620,transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="relative z-10">
        <Navbar active={navActive} setActive={setNavActive} onTabClick={scrollToSection} />
        <Hero onScrollToForm={scrollToForm} stats={stats} />
        <Analytics />
        <PipelineSection />
        <LeadForm onAddLead={addLead} onLeadAdded={fetchLeads} />
        <LeadsTable leads={leads} onDelete={deleteLead} />
        <Footer />
      </div>
    </div>
  );
}
