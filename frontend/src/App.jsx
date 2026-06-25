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
    setMsg(`✅ System captured lead entry successfully.`);
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
    <div className="min-h-screen bg-[#0b0f19] bg-gradient-to-tr from-[#0b0f19] via-[#111827] to-[#0d1527] text-slate-100 p-4 md:p-8 font-sans antialiased selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Advanced Glassmorphic Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              LeadTrack Engine
            </h1>
            <p className="text-sm text-slate-400 mt-1">Enterprise Automated Lead Acquisition & Real-Time Interaction Metrics</p>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl backdrop-blur-md shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">Live Sandbox Active</span>
          </div>
        </header>

        {/* Dashboard Split Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Capturing Module */}
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-md space-y-5">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400 text-sm">📥</span> Capture Inbound Pipeline
              </h2>
              <p className="text-xs text-slate-500 mt-1">Inject variables into target databases via simulation routing protocols.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" required className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none transition-all font-medium text-sm" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" placeholder="Email Address" required className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none transition-all font-medium text-sm" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Phone Number" required className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none transition-all font-medium text-sm" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <input type="text" placeholder="Company" className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none transition-all font-medium text-sm" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
              </div>

              <textarea placeholder="Requirement Details / Operational Scope..." required className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-600 h-24 resize-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none transition-all font-medium text-sm" value={formData.requirement} onChange={e => setFormData({ ...formData, requirement: e.target.value })} />
              
              <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 active:scale-[0.99]">
                Execute Ingestion Route
              </button>
            </form>

            {msg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-medium animate-pulse">
                {msg}
              </div>
            )}
          </div>

          {/* Premium Analytics Metric Display */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Database Entries', value: stats.totalLeads, icon: '👥', color: 'border-l-blue-500 bg-blue-500/5 text-blue-400' },
              { label: 'Tracking Mail Transmitted', value: stats.emailsSent, icon: '✉️', color: 'border-l-purple-500 bg-purple-500/5 text-purple-400' },
              { label: 'Verified Pixel Opens', value: stats.emailsOpened, icon: '👁️', color: 'border-l-amber-500 bg-amber-500/5 text-amber-400' },
              { label: 'System Redirect Clicks', value: stats.linksClicked, icon: '🔗', color: 'border-l-emerald-500 bg-emerald-500/5 text-emerald-400' },
              { label: 'Composite Open Rate', value: stats.openRate, icon: '📊', color: 'border-l-pink-500 bg-pink-500/5 text-pink-400' },
              { label: 'Action Conversion Rate', value: stats.clickRate, icon: '📈', color: 'border-l-cyan-500 bg-cyan-500/5 text-cyan-400' }
            ].map((item, idx) => (
              <div key={idx} className={`bg-slate-900/40 border-l-4 border-y border-r border-slate-800/80 ${item.color.split(' ')[0]} p-5 rounded-xl shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{item.label}</span>
                  <span className="text-sm opacity-80">{item.icon}</span>
                </div>
                <div className="text-3xl font-black tracking-tight mt-4 text-slate-100">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Refactored Live Registry Board */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Relational Log Monitor</h2>
              <p className="text-xs text-slate-400 mt-0.5">Simulate interaction lifecycle events by triggering endpoint calls.</p>
            </div>
            <span className="text-xs font-semibold bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-indigo-400">
              Active Logs: {leads.length} Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/60 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Entity Metadata</th>
                  <th className="py-3 px-4">Intent & Requirements</th>
                  <th className="py-3 px-4 text-center">Open Vector</th>
                  <th className="py-3 px-4 text-center">Click Vector</th>
                  <th className="py-3 px-4 text-right">Simulation Switches</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-800/20 transition-colors duration-150 group">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{lead.name}</div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">{lead.email}</div>
                      <div className="text-[10px] text-slate-600 font-mono mt-1">{lead.timestamp}</div>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <div className="text-slate-300 text-xs font-medium line-clamp-2">"{lead.requirement}"</div>
                      {lead.company && (
                        <span className="text-[9px] font-bold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md mt-1.5 inline-block">
                          🏢 {lead.company}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide border transition-all ${lead.opened ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-sm shadow-amber-500/5' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
                        {lead.opened ? '⚠️ Opened' : 'Unread'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide border transition-all ${lead.clicked ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-sm shadow-emerald-500/5' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
                        {lead.clicked ? '✅ Clicked' : 'No Action'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => simulateOpen(lead.id)} disabled={lead.opened} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${lead.opened ? 'bg-slate-950 border border-slate-900 text-slate-700 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-500 text-white shadow-md active:scale-[0.96]'}`}>
                          {lead.opened ? 'Verified' : 'Sim Pixel'}
                        </button>
                        <button onClick={() => simulateClick(lead.id)} disabled={lead.clicked} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${lead.clicked ? 'bg-slate-950 border border-slate-900 text-slate-700 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md active:scale-[0.96]'}`}>
                          {lead.clicked ? 'Recorded' : 'Sim Redirect'}
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
    </div>
  );
}
