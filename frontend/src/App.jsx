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
    
    setMsg(`🎯 Success: New lead successfully recorded and tracked using sender profile: ${senderEmail}`);
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

  const glassPanel = {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
  };

  return (
    <div style={{ padding: '40px 24px', minHeight: '100vh', background: '#09090e', color: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Dynamic Style Injection for Smooth Focus & Glass Hover States */}
      <style>{`
        .premium-input {
          background: rgba(255, 255, 255, 0.01) !important;
          border: 1px solid rgba(255, 255, 255, 0.07) !important;
          color: #f3f4f6 !important;
          padding: 14px 16px;
          border-radius: 12px;
          transition: all 0.25s ease;
          outline: none;
        }
        .premium-input:focus {
          border-color: #6366f1 !important;
          background: rgba(255, 255, 255, 0.04) !important;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.15) !important;
        }
        .premium-btn {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .premium-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
          filter: brightness(1.1);
        }
        .premium-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .premium-table-row {
          transition: background 0.2s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        .premium-table-row:hover {
          background: rgba(255, 255, 255, 0.015) !important;
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 99px;
        }
      `}</style>

      <div style={{ maxWidth: '1340px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Main Dashboard Glass Header */}
        <header style={{ ...glassPanel, padding: '28px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '300px', height: '150px', background: 'rgba(99, 102, 241, 0.15)', filter: 'blur(60px)', pointerEvents: 'none', borderRadius: '50%' }}></div>
          <div style={{ zIndex: 1 }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #ffffff 40%, #c7d2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LeadTrack Dashboard</h1>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '6px', fontWeight: '500' }}>Monitor and trace incoming leads, email engagement rates, and link activity.</p>
          </div>
          <div style={{ zIndex: 1, display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.15)', padding: '10px 20px', borderRadius: '999px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px #10b981' }}></span>
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#10b981' }}>Live Monitoring</span>
          </div>
        </header>

        {/* Primary Layout Workspace Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
          
          {/* Add New Lead Glass Form Panel */}
          <div style={{ ...glassPanel, padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', borderRadius: '20px' }}>
            
            {/* Sender Dropdown Configuration Card */}
            <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '14px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#a5b4fc', textTransform: 'uppercase', display: 'block', marginBottom: '10px', letterSpacing: '0.5px' }}>
                📧 Outbound Email Sender Profile
              </label>
              <select 
                value={senderEmail} 
                onChange={(e) => setSenderEmail(e.target.value)}
                className="premium-input"
                style={{ width: '100%', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                <option value="dispatch@leadtrack.io" style={{ background: '#09090e' }}>dispatch@leadtrack.io (Default)</option>
                <option value="sales@leadtrack.io" style={{ background: '#09090e' }}>sales@leadtrack.io (Sales)</option>
                <option value="no-reply@leadtrack.io" style={{ background: '#09090e' }}>no-reply@leadtrack.io (Automation)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', margin: 0, color: '#ffffff' }}>
                <span>📥</span> Add New Lead
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>Manually insert a prospective client to initialize automated email tracking logs.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input type="text" placeholder="Full Name" required className="premium-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" placeholder="Email Address" required className="premium-input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input type="text" placeholder="Phone Number" required className="premium-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              <input type="text" placeholder="Company Name" className="premium-input" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
              <textarea placeholder="Requirement or Project details..." required className="premium-input" style={{ height: '105px', resize: 'none', lineHeight: '1.5' }} value={formData.requirement} onChange={e => setFormData({ ...formData, requirement: e.target.value })} />
              
              <button type="submit" className="premium-btn" style={{ marginTop: '6px', padding: '14px', borderRadius: '12px', fontWeight: '700', fontSize: '14px' }}>
                Add New Lead
              </button>
            </form>

            {msg && (
              <div style={{ padding: '14px 16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', color: '#10b981', fontSize: '13px', borderRadius: '12px', fontWeight: '600', lineHeight: '1.4' }}>
                {msg}
              </div>
            )}
          </div>

          {/* Premium Analytics Performance Grid */}
          <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { label: 'Total Leads Registered', val: stats.totalLeads, icon: '👥', color: '#6366f1', desc: 'Total tracked user submissions' },
              { label: 'Emails Dispatched', val: stats.emailsSent, icon: '✉️', color: '#3b82f6', desc: 'Total outbound email triggers' },
              { label: 'Email Opens Checked', val: stats.emailsOpened, icon: '👁️', color: '#f59e0b', desc: 'Verified unique email opens' },
              { label: 'Link Clicks Logged', val: stats.linksClicked, icon: '🔗', color: '#10b981', desc: 'Total redirected call-to-actions' },
              { label: 'Average Open Rate', val: stats.openRate, icon: '📊', color: '#ec4899', desc: 'Percentage of opened emails' },
              { label: 'Average Click Rate', val: stats.clickRate, icon: '📈', color: '#f43f5e', desc: 'Percentage of click conversions' }
            ].map((card, i) => (
              <div key={i} style={{ ...glassPanel, borderTop: `3px solid ${card.color}`, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '145px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#9ca3af' }}>{card.label}</span>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>{card.desc}</span>
                  </div>
                  <span style={{ fontSize: '18px', background: 'rgba(255,255,255,0.02)', padding: '6px 8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>{card.icon}</span>
                </div>
                <span style={{ fontSize: '42px', fontWeight: '800', color: '#ffffff', letterSpacing: '-1px', lineHeight: '1' }}>{card.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Database Table Log Tracker View */}
        <div style={{ ...glassPanel, overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '20px' }}>
          <div style={{ padding: '28px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', margin: 0 }}>Registered Interaction Logs</h2>
              <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px' }}>Simulate user behaviors in real time by triggering action callbacks inside the database system below.</p>
            </div>
            
            {/* Soft Transparent Filtering Navigation Controller Tabs */}
            <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
              {[
                { id: 'all', label: 'All Entries', count: leads.length },
                { id: 'opened', label: 'Opened', count: leads.filter(l => l.opened).length },
                { id: 'clicked', label: 'Clicked', count: leads.filter(l => l.clicked).length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 16px', fontSize: '12px', fontWeight: '700', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease',
                    background: activeTab === tab.id ? 'rgba(255,255,255,0.06)' : 'transparent',
                    color: activeTab === tab.id ? '#ffffff' : '#9ca3af'
                  }}
                >
                  {tab.label} <span style={{ marginLeft: '4px', opacity: 0.4, fontSize: '11px' }}>{tab.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
                  <th style={{ padding: '18px 24px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '0.5px' }}>Lead Details</th>
                  <th style={{ padding: '18px 24px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '0.5px' }}>Project Summary</th>
                  <th style={{ padding: '18px 24px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '0.5px', textAlign: 'center' }}>Email Status</th>
                  <th style={{ padding: '18px 24px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '0.5px', textAlign: 'center' }}>Link Activity</th>
                  <th style={{ padding: '18px 24px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '0.5px', textAlign: 'right' }}>Interactive Simulations</th>
                </tr>
              </thead>
              <tbody style={{ verticalAlign: 'middle' }}>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: '#6b7280', fontSize: '14px', fontWeight: '600' }}>
                      No lead history matching your selected status filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((l) => (
                    <tr key={l.id} className="premium-table-row">
                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '15px' }}>{l.name}</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>{l.email} · {l.phone}</div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginTop: '6px' }}>Added: {l.timestamp}</div>
                      </td>
                      <td style={{ padding: '20px 24px', maxWidth: '300px' }}>
                        <div style={{ fontSize: '13px', color: '#e5e7eb', lineHeight: '1.4' }}>"{l.requirement}"</div>
                        {l.company && (
                          <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.15)', padding: '3px 8px', borderRadius: '4px', color: '#c7d2fe', marginTop: '8px', display: 'inline-block' }}>
                            🏢 {l.company}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', border: '1px solid',
                          background: l.opened ? 'rgba(245, 158, 11, 0.04)' : 'rgba(255,255,255,0.01)',
                          borderColor: l.opened ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.04)',
                          color: l.opened ? '#f59e0b' : '#6b7280' }}>
                          {l.opened ? 'Opened' : 'Unopened'}
                        </span>
                      </td>
                      <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', border: '1px solid',
                          background: l.clicked ? 'rgba(16, 185, 129, 0.04)' : 'rgba(255,255,255,0.01)',
                          borderColor: l.clicked ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.04)',
                          color: l.clicked ? '#10b981' : '#6b7280' }}>
                          {l.clicked ? 'Clicked' : 'Not Clicked'}
                        </span>
                      </td>
                      <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
                          <button onClick={() => simulateOpen(l.id)} disabled={l.opened} className="premium-btn" style={{ padding: '8px 14px', fontSize: '12px', fontWeight: '700', borderRadius: '6px', border: 'none', background: l.opened ? 'rgba(255,255,255,0.02)' : 'linear-gradient(135deg, #f59e0b, #d97706)', color: l.opened ? '#6b7280' : '#ffffff', boxShadow: l.opened ? 'none' : '0 4px 12px rgba(245, 158, 11, 0.15)' }}>
                            Simulate Open
                          </button>
                          <button onClick={() => simulateClick(l.id)} disabled={l.clicked} className="premium-btn" style={{ padding: '8px 14px', fontSize: '12px', fontWeight: '700', borderRadius: '6px', border: 'none', background: l.clicked ? 'rgba(255,255,255,0.02)' : 'linear-gradient(135deg, #10b981, #059669)', color: l.clicked ? '#6b7280' : '#ffffff', boxShadow: l.clicked ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.15)' }}>
                            Simulate Click
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
