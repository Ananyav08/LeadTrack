import React, { useState, useEffect } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', requirement: '' });
  const [msg, setMsg] = useState('');
  const [senderEmail, setSenderEmail] = useState('dispatch@leadtrack.io');
  const [activeTab, setActiveTab] = useState('all'); // New interactive filter tab state

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
    
    setMsg(`🎯 Pipeline pipeline initialized successfully via secure tracking relay: ${senderEmail}`);
    setFormData({ name: '', email: '', phone: '', company: '', requirement: '' });
    setTimeout(() => setMsg(''), 5000);
  };

  const simulateOpen = (id) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, opened: true } : lead));
  };

  const simulateClick = (id) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, opened: true, clicked: true } : lead));
  };

  // Filter logic based on the modern navigation selection
  const filteredLeads = leads.filter(lead => {
    if (activeTab === 'opened') return lead.opened;
    if (activeTab === 'clicked') return lead.clicked;
    return true;
  });

  return (
    <div style={{ padding: '40px 24px', minHeight: '100vh', background: 'transparent' }} className="fade-in">
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Elite Premium Header Block */}
        <header className="glass" style={{ padding: '28px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderRadius: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '36px', fontWeight: '800', trackingTight: '-0.75px', margin: 0, letterSpacing: '-0.5px' }}>LeadTrack Engine</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px', opacity: 0.85, fontWeight: '500' }}>Automated Lead Management & Engagement Tracking Matrix</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '10px 20px', borderRadius: '999px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-success)', boxShadow: '0 0 12px var(--accent-success)', animation: 'pulse 2s infinite' }}></span>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent-success)' }}>Live Analytics Core</span>
          </div>
        </header>

        {/* Form and Metrics Workspace Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          
          {/* Form Capture Card Module */}
          <div className="glass" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px', borderRadius: '16px' }}>
            
            {/* Contextualized Gateway Identity Router */}
            <div style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.15)', padding: '16px', borderRadius: '12px', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.05)' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#a78bfa', textTransform: 'uppercase', display: 'block', marginBottom: '10px', letterSpacing: '0.75px' }}>
                ⚙️ SMTP Outbound Target Profile
              </label>
              <select 
                value={senderEmail} 
                onChange={(e) => setSenderEmail(e.target.value)}
                className="input-field"
                style={{ padding: '12px', fontSize: '13px', cursor: 'pointer', fontWeight: '600', color: 'var(--text-primary)', width: '100%', borderRadius: '8px', border: '1px solid var(--border)' }}
              >
                <option value="dispatch@leadtrack.io" style={{ background: 'var(--bg-card)' }}>dispatch@leadtrack.io (Master Server)</option>
                <option value="sales@leadtrack.io" style={{ background: 'var(--bg-card)' }}>sales@leadtrack.io (Sales Desk)</option>
                <option value="no-reply@leadtrack.io" style={{ background: 'var(--bg-card)' }}>no-reply@leadtrack.io (Automation Bot)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', margin: 0, color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--accent-1)', fontSize: '22px' }}>📥</span> Capture Lead Entry
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', opacity: 0.8 }}>Ingest real-time intent variables directly into local memory state.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input type="text" placeholder="Full Name" required className="input-field" style={{ padding: '12px 16px', borderRadius: '8px' }} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" placeholder="Email Address" required className="input-field" style={{ padding: '12px 16px', borderRadius: '8px' }} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input type="text" placeholder="Phone Number" required className="input-field" style={{ padding: '12px 16px', borderRadius: '8px' }} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              <input type="text" placeholder="Company Name (Optional)" className="input-field" style={{ padding: '12px 16px', borderRadius: '8px' }} value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
              <textarea placeholder="Requirement / Operational Scope Description..." required className="input-field" style={{ height: '100px', resize: 'none', padding: '12px 16px', borderRadius: '8px', lineHeight: '1.5' }} value={formData.requirement} onChange={e => setFormData({ ...formData, requirement: e.target.value })} />
              
              <button type="submit" className="btn-primary" style={{ marginTop: '6px', padding: '14px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>
                Execute Pipeline Route
              </button>
            </form>

            {msg && (
              <div style={{ padding: '14px 16px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', color: 'var(--accent-success)', fontSize: '13px', borderRadius: '10px', fontWeight: '600', lineHeight: '1.5', animation: 'fadeIn 0.3s ease' }}>
                {msg}
              </div>
            )}
          </div>

          {/* Premium High-Impact Grid Matrix Column */}
          <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { label: 'Total Leads Captured', val: stats.totalLeads, icon: '👥', border: 'var(--accent-1)', desc: 'Total profile inputs ingest' },
              { label: 'Automated Emails Sent', val: stats.emailsSent, icon: '✉️', border: 'var(--accent-2)', desc: 'Outbound trigger executions' },
              { label: 'Verified Email Opens', val: stats.emailsOpened, icon: '👁️', border: 'var(--accent-warning)', desc: 'Pixel callback responses' },
              { label: 'Trackable Link Clicks', val: stats.linksClicked, icon: '🔗', border: 'var(--accent-success)', desc: 'Destination routing events' },
              { label: 'Global Open Rate', val: stats.openRate, icon: '📊', border: 'var(--accent-3)', desc: 'Open efficiency calculation' },
              { label: 'Global Click Rate', val: stats.clickRate, icon: '📈', border: 'rgba(244, 63, 94, 1)', desc: 'Interaction conversion ratio' }
            ].map((card, i) => (
              <div key={i} className="glass stat-card" style={{ borderLeft: `4px solid ${card.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px', minHeight: '140px', borderRadius: '12px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.75px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{card.label}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', opacity: 0.5 }}>{card.desc}</span>
                  </div>
                  <span style={{ fontSize: '20px', background: 'rgba(255,255,255,0.04)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>{card.icon}</span>
                </div>
                <span style={{ fontSize: '42px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-1.5px', lineHeight: '1' }}>{card.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Relational Log Monitor Module with Tab Filters */}
        <div className="glass" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Relational Log Monitor</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px', opacity: 0.85 }}>Simulate receipt webhook updates to verify asynchronous data transformations.</p>
            </div>
            
            {/* Interactive Filters Container */}
            <div style={{ display: 'flex', itemsCenter: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border)' }}>
              {[
                { id: 'all', label: 'All Records', count: leads.length },
                { id: 'opened', label: 'Opened', count: leads.filter(l => l.opened).length },
                { id: 'clicked', label: 'Clicked', count: leads.filter(l => l.clicked).length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 14px', fontSize: '12px', fontWeight: '700', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease',
                    background: activeTab === tab.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-muted)'
                  }}
                >
                  {tab.label} <span style={{ marginLeft: '4px', opacity: 0.5, fontSize: '11px' }}>({tab.count})</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.015)' }}>
                  <th style={{ padding: '18px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>Lead Information</th>
                  <th style={{ padding: '18px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>Operational Requirement</th>
                  <th style={{ padding: '18px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', textAlign: 'center' }}>Pixel Metric</th>
                  <th style={{ padding: '18px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', textAlign: 'center' }}>Link Metric</th>
                  <th style={{ padding: '18px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', textAlign: 'right' }}>Asynchronous Webhook Actions</th>
                </tr>
              </thead>
              <tbody style={{ verticalAlign: 'middle' }}>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>
                      No leads match the active filter criteria configuration.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((l) => (
                    <tr key={l.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', background: 'transparent', transition: 'background 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.015)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '15px' }}>{l.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', opacity: 0.8 }}>{l.email} · {l.phone}</div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginTop: '6px' }}>Timestamp: {l.timestamp}</div>
                      </td>
                      <td style={{ padding: '20px 24px', maxWidth: '280px' }}>
                        <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.4', fontStyle: 'italic' }}>"{l.requirement}"</div>
                        {l.company && (
                          <span style={{ fontSize: '9px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '3px 8px', borderRadius: '4px', color: '#a78bfa', marginTop: '8px', display: 'inline-block' }}>
                            🏢 {l.company}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', letterSpacing: '0.5px', border: '1px solid',
                          background: l.opened ? 'rgba(245, 158, 11, 0.06)' : 'rgba(255,255,255,0.02)',
                          borderColor: l.opened ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                          color: l.opened ? 'var(--accent-warning)' : 'var(--text-muted)' }}>
                          {l.opened ? '⚠️ Open Detected' : 'Pending Open'}
                        </span>
                      </td>
                      <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', letterSpacing: '0.5px', border: '1px solid',
                          background: l.clicked ? 'rgba(16, 185, 129, 0.06)' : 'rgba(255,255,255,0.02)',
                          borderColor: l.clicked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
                          color: l.clicked ? 'var(--accent-success)' : 'var(--text-muted)' }}>
                          {l.clicked ? '✅ Click Tracked' : 'Pending Click'}
                        </span>
                      </td>
                      <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
                          <button onClick={() => simulateOpen(l.id)} disabled={l.opened} className="btn-primary" style={{ padding: '8px 14px', fontSize: '12px', fontWeight: '700', borderRadius: '6px', border: 'none', transition: 'all 0.2s ease', background: l.opened ? 'rgba(255,255,255,0.03)' : 'linear-gradient(135deg, #f59e0b, #d97706)', color: l.opened ? 'var(--text-muted)' : '#fff', boxShadow: l.opened ? 'none' : '0 4px 12px rgba(245, 158, 11, 0.15)' }}>
                            {l.opened ? 'Dispatched' : 'Fire Pixel Callback'}
                          </button>
                          <button onClick={() => simulateClick(l.id)} disabled={l.clicked} className="btn-primary" style={{ padding: '8px 14px', fontSize: '12px', fontWeight: '700', borderRadius: '6px', border: 'none', transition: 'all 0.2s ease', background: l.clicked ? 'rgba(255,255,255,0.03)' : 'linear-gradient(135deg, #10b981, #059669)', color: l.clicked ? 'var(--text-muted)' : '#fff', boxShadow: l.clicked ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.15)' }}>
                            {l.clicked ? 'Activated' : 'Fire Click Trigger'}
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
