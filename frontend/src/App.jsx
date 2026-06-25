import React, { useState, useEffect } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', requirement: '' });
  const [msg, setMsg] = useState('');
  const [senderEmail, setSenderEmail] = useState('dispatch@leadtrack.io');
  const [activeTab, setActiveTab] = useState('all');

  const [leads, setLeads] = useState([
    { id: 1, name: 'Rahul Sharma', email: 'rahul@gmail.com', phone: '9876543210', company: 'ABC Pvt Ltd', requirement: 'Need AI automation integration', timestamp: '2026-06-25 15:12:04', opened: true, clicked: false },
    { id: 2, name: 'Priya Patel', email: 'priya@techcorp.in', phone: '9123456789', company: 'TechCorp Solutions', requirement: 'Looking for web analytics setup', timestamp: '2026-06-25 15:34:12', opened: true, clicked: true }
  ]);

  const [stats, setStats] = useState({
    totalLeads: 2,
    emailsSent: 2,
    emailsOpened: 2,
    linksClicked: 1,
    openRate: '100%',
    clickRate: '50%'
  });

  useEffect(() => {
    const totalLeads = leads.length;
    const emailsSent = totalLeads;
    const emailsOpened = leads.filter(l => l.opened).length;
    const linksClicked = leads.filter(l => l.clicked).length;
    const openRate = totalLeads > 0 ? `${Math.round((emailsOpened / totalLeads) * 100)}%` : '0%';
    const clickRate = totalLeads > 0 ? `${Math.round((linksClicked / totalLeads) * 100)}%` : '0%';
    setStats({ totalLeads, emailsSent, emailsOpened, linksClicked, openRate, clickRate });
  }, [leads]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    const newLead = {
      id: Date.now(),
      ...formData,
      timestamp,
      opened: false,
      clicked: false
    };
    setLeads([newLead, ...leads]);
    setMsg(`🎯 Pipeline initialized successfully via secure tracking relay: ${senderEmail}`);
    setFormData({ name: '', email: '', phone: '', company: '', requirement: '' });
    setTimeout(() => setMsg(''), 5000);
  };

  const simulateOpen = (id) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, opened: true } : lead));
  };

  const simulateClick = (id) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, opened: true, clicked: true } : lead));
  };

  const filteredLeads = leads.filter(lead => {
    if (activeTab === 'opened') return lead.opened;
    if (activeTab === 'clicked') return lead.clicked;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0e0e1a] to-slate-900 text-slate-100 p-6 font-sans antialiased">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide-up {
          animation: fadeSlideUp 0.4s ease-out forwards;
        }
        .glass {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }
        .glass-hover:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.12);
          transition: all 0.3s ease;
        }
        .premium-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 12px 16px;
          color: #f1f5f9;
          outline: none;
          transition: all 0.2s;
          width: 100%;
        }
        .premium-input:focus {
          border-color: #818cf8;
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1);
        }
        .premium-input::placeholder {
          color: #64748b;
          font-weight: 400;
        }
        .premium-btn {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          font-weight: 600;
          border-radius: 12px;
          padding: 12px 20px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.25);
        }
        .premium-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(99, 102, 241, 0.4);
          filter: brightness(1.08);
        }
        .premium-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .premium-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
        .tab-btn {
          background: transparent;
          border: none;
          padding: 8px 18px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 13px;
          color: #94a3b8;
          transition: all 0.2s;
          cursor: pointer;
        }
        .tab-btn.active {
          background: rgba(255, 255, 255, 0.08);
          color: #f1f5f9;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
        }
        .tab-btn:hover:not(.active) {
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.04);
        }
        .status-badge {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.3px;
          border: 1px solid transparent;
        }
        .status-badge.opened {
          background: rgba(245, 158, 11, 0.08);
          border-color: rgba(245, 158, 11, 0.2);
          color: #fbbf24;
        }
        .status-badge.unread {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.06);
          color: #64748b;
        }
        .status-badge.clicked {
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.2);
          color: #34d399;
        }
        .status-badge.noclick {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.06);
          color: #64748b;
        }
        .metric-card {
          transition: all 0.3s ease;
        }
        .metric-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.07);
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
          border-radius: 99px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 99px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <header className="glass glass-hover rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 animate-fade-slide-up">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent tracking-tight">
              LeadTrack Core
            </h1>
            <p className="text-sm text-slate-400 font-medium mt-0.5">
              High‑Fidelity Interaction Tracking &amp; Pipeline Management Matrix
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/30"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">System Live</span>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Form Panel */}
          <div className="glass glass-hover rounded-2xl p-6 lg:col-span-1 animate-fade-slide-up" style={{ animationDelay: '0.05s' }}>
            <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4 mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-1">
                ⚡ SMTP Sender Archetype
              </label>
              <select
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="premium-input text-sm font-semibold cursor-pointer bg-slate-800/50"
              >
                <option value="dispatch@leadtrack.io" className="bg-slate-900">dispatch@leadtrack.io (Master Core)</option>
                <option value="sales@leadtrack.io" className="bg-slate-900">sales@leadtrack.io (Growth Desk)</option>
                <option value="no-reply@leadtrack.io" className="bg-slate-900">no-reply@leadtrack.io (Automated Bot)</option>
              </select>
            </div>

            <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
              <span>📥</span> Capture Lead Entry
            </h2>
            <p className="text-sm text-slate-400 mb-5">Ingest structural relational attributes securely.</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Full Name" required className="premium-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" placeholder="Email Address" required className="premium-input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input type="text" placeholder="Phone Number" required className="premium-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              <input type="text" placeholder="Company Name (Optional)" className="premium-input" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
              <textarea placeholder="Operational Scope / Customer Intent Details..." required className="premium-input resize-none h-24" value={formData.requirement} onChange={e => setFormData({ ...formData, requirement: e.target.value })} />
              <button type="submit" className="premium-btn w-full">
                Execute Pipeline Route
              </button>
            </form>

            {msg && (
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl font-medium animate-fade-slide-up">
                {msg}
              </div>
            )}
          </div>

          {/* Metrics Grid (spans 2 columns on large screens) */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            {[
              { label: 'Total Leads', value: stats.totalLeads, icon: '👥', desc: 'Ingested records' },
              { label: 'Emails Sent', value: stats.emailsSent, icon: '✉️', desc: 'Dispatched relays' },
              { label: 'Email Opens', value: stats.emailsOpened, icon: '👁️', desc: 'Pixel executions' },
              { label: 'Link Clicks', value: stats.linksClicked, icon: '🔗', desc: 'Callback triggers' },
              { label: 'Open Rate', value: stats.openRate, icon: '📊', desc: 'Open conversion' },
              { label: 'Click Rate', value: stats.clickRate, icon: '📈', desc: 'Click efficiency' }
            ].map((item, idx) => (
              <div key={idx} className="glass glass-hover metric-card rounded-2xl p-5 flex flex-col justify-between border-t-2 border-indigo-500/30">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{item.label}</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-xl opacity-80">{item.icon}</span>
                </div>
                <span className="text-4xl font-black text-white tracking-tight mt-2">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Logs Engine */}
        <div className="glass glass-hover rounded-2xl overflow-hidden animate-fade-slide-up" style={{ animationDelay: '0.15s' }}>
          {/* Header with Tabs */}
          <div className="p-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Relational Log Monitor</h2>
              <p className="text-sm text-slate-400 mt-0.5">Simulate recipient webhook actions to stress‑test your dynamic UI state machine.</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-800/40 p-1 rounded-full border border-white/5">
              {[
                { id: 'all', label: 'All Records', count: leads.length },
                { id: 'opened', label: 'Opened', count: leads.filter(l => l.opened).length },
                { id: 'clicked', label: 'Clicked', count: leads.filter(l => l.clicked).length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label} <span className="text-xs opacity-40 ml-1">{tab.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">Lead Identifiers</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">Operational Scope</th>
                  <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">Tracking Pixel</th>
                  <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">Redirect Link</th>
                  <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">Async Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500 font-medium">
                      No pipeline logs match the current viewport filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.email} · {lead.phone}</div>
                        <div className="text-[10px] text-slate-600 font-mono mt-1">ID‑REF: {lead.timestamp}</div>
                      </td>
                      <td className="px-6 py-4 max-w-[220px]">
                        <div className="text-sm text-slate-200 line-clamp-2">"{lead.requirement}"</div>
                        {lead.company && (
                          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
                            🏢 {lead.company}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`status-badge ${lead.opened ? 'opened' : 'unread'}`}>
                          {lead.opened ? '⚠️ Open Detected' : 'Unread'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`status-badge ${lead.clicked ? 'clicked' : 'noclick'}`}>
                          {lead.clicked ? '✅ Click Intercepted' : 'No Click'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => simulateOpen(lead.id)}
                            disabled={lead.opened}
                            className="premium-btn text-xs px-4 py-1.5 rounded-lg"
                          >
                            {lead.opened ? '✓ Pixel Live' : 'Trigger Open'}
                          </button>
                          <button
                            onClick={() => simulateClick(lead.id)}
                            disabled={lead.clicked}
                            className="premium-btn text-xs px-4 py-1.5 rounded-lg"
                            style={{ background: lead.clicked ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #10b981, #059669)' }}
                          >
                            {lead.clicked ? '✓ Link Live' : 'Trigger Click'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
