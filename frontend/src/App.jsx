import React, { useState, useEffect } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', requirement: '' });
  const [msg, setMsg] = useState('');

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
    setMsg(`✅ Lead captured! Tracking simulation active.`);
    setFormData({ name: '', email: '', phone: '', company: '', requirement: '' });
    setTimeout(() => setMsg(''), 4000);
  };

  const simulateOpen = (id) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, opened: true } : lead));
  };

  const simulateClick = (id) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, opened: true, clicked: true } : lead));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-700/60 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">LeadTrack</h1>
            <p className="text-sm text-slate-400">Automated Lead Management & Engagement Tracking</p>
          </div>
          <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live
          </span>
        </header>

        {/* Form + Metrics */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="bg-slate-800/80 rounded-xl border border-slate-700/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>📥</span> Capture Lead
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Full Name" required className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent outline-none transition" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" placeholder="Email" required className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent outline-none transition" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input type="text" placeholder="Phone" required className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent outline-none transition" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              <input type="text" placeholder="Company (optional)" className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent outline-none transition" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
              <textarea placeholder="Requirement / Scope" required className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 h-20 resize-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent outline-none transition" value={formData.requirement} onChange={e => setFormData({ ...formData, requirement: e.target.value })} />
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg transition active:scale-[0.98] shadow-lg shadow-indigo-600/20">
                Submit
              </button>
            </form>
            {msg && (
              <div className="mt-3 p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg">
                {msg}
              </div>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {[
              { label: 'Total Leads', value: stats.totalLeads, icon: '👥' },
              { label: 'Emails Sent', value: stats.emailsSent, icon: '✉️' },
              { label: 'Email Opens', value: stats.emailsOpened, icon: '👁️' },
              { label: 'Link Clicks', value: stats.linksClicked, icon: '🔗' },
              { label: 'Open Rate', value: stats.openRate, icon: '📊' },
              { label: 'Click Rate', value: stats.clickRate, icon: '📈' }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/80 rounded-xl border border-slate-700/50 p-5 shadow-md hover:border-slate-600 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{item.label}</span>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div className="text-3xl font-bold text-white mt-2">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-800/80 rounded-xl border border-slate-700/50 p-6 shadow-xl overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Live Logs</h2>
              <p className="text-xs text-slate-400">Simulate open/click events to test tracking</p>
            </div>
            <span className="text-xs bg-slate-700/50 px-3 py-1 rounded-full text-slate-300 border border-slate-600">
              {leads.length} leads
            </span>
          </div>
          <table className="w-full text-sm text-slate-300">
            <thead className="text-xs uppercase text-slate-400 border-b border-slate-700/60">
              <tr>
                <th className="text-left py-2 px-3">Lead</th>
                <th className="text-left py-2 px-3">Requirement</th>
                <th className="text-center py-2 px-3">Open</th>
                <th className="text-center py-2 px-3">Click</th>
                <th className="text-center py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-slate-700/30 transition">
                  <td className="py-3 px-3">
                    <div className="font-medium text-white">{lead.name}</div>
                    <div className="text-xs text-slate-400">{lead.email}</div>
                    <div className="text-[10px] text-slate-500">{lead.timestamp}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="truncate max-w-[180px]">{lead.requirement}</div>
                    {lead.company && <span className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded mt-1 inline-block">{lead.company}</span>}
                  </td>
                  <td className="text-center py-3 px-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${lead.opened ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-700/50 text-slate-500 border border-slate-600'}`}>
                      {lead.opened ? 'Opened' : 'Unread'}
                    </span>
                  </td>
                  <td className="text-center py-3 px-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${lead.clicked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700/50 text-slate-500 border border-slate-600'}`}>
                      {lead.clicked ? 'Clicked' : 'No click'}
                    </span>
                  </td>
                  <td className="text-center py-3 px-3">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => simulateOpen(lead.id)} disabled={lead.opened} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${lead.opened ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed' : 'bg-amber-600/80 hover:bg-amber-600 text-white shadow hover:shadow-amber-600/20'}`}>
                        {lead.opened ? '✓ Opened' : 'Open'}
                      </button>
                      <button onClick={() => simulateClick(lead.id)} disabled={lead.clicked} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${lead.clicked ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed' : 'bg-emerald-600/80 hover:bg-emerald-600 text-white shadow hover:shadow-emerald-600/20'}`}>
                        {lead.clicked ? '✓ Clicked' : 'Click'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}