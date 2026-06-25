import React, { useState, useEffect } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', requirement: '' });
  const [msg, setMsg] = useState('');
  
  // Custom Configuration: Updated to match your project name 'LeadTrack'
  const [senderEmail, setSenderEmail] = useState('dispatch@leadtrack.io');

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
    
    setMsg(`✅ Inbound route executed. Tracking sequence dispatched via secure relay: ${senderEmail}`);
    setFormData({ name: '', email: '', phone: '', company: '', requirement: '' });
    setTimeout(() => setMsg(''), 5000);
  };

  const simulateOpen = (id) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, opened: true } : lead));
  };

  const simulateClick = (id) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, opened: true, clicked: true } : lead));
  };

  return (
    <div style={{ padding: '32px 16px' }} className="fade-in">
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Header Block using .glass and .gradient-text */}
        <header className="glass" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '32px', fontWeight: '800', trackingTight: '-0.5px' }}>LeadTrack Engine</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Automated Lead Management & Engagement Tracking Matrix</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '999px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-success)', animation: 'pulse 2s infinite' }}></span>
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-primary)' }}>Live Environment</span>
          </div>
        </header>

        {/* Form and Metrics Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          {/* Form Card */}
          <div className="glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Sender Email Global Selector Block - Simplified Labels */}
            <div style={{ background: 'rgba(99, 102, 241, 0.04)', border: '1px solid var(--border)', padding: '14px', borderRadius: '12px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#a78bfa', textTransform: 'uppercase', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>
                ⚙️ Outbound Sender Email Config
              </label>
              <select 
                value={senderEmail} 
                onChange={(e) => setSenderEmail(e.target.value)}
                className="input-field"
                style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer', fontWeight: '600', color: 'var(--text-primary)' }}
              >
                <option value="dispatch@leadtrack.io" style={{ background: 'var(--bg-card)' }}>dispatch@leadtrack.io (System System)</option>
                <option value="sales@leadtrack.io" style={{ background: 'var(--bg-card)' }}>sales@leadtrack.io (Sales Desk)</option>
                <option value="no-reply@leadtrack.io" style={{ background: 'var(--bg-card)' }}>no-reply@leadtrack.io (Automated Bot)</option>
              </select>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }} />

            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--accent-1)' }}>📥</span> Capture Lead Entry
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>Ingest routing tokens dynamically into client datasets.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Full Name" required className="input-field" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" placeholder="Email Address" required className="input-field" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input type="text" placeholder="Phone Number" required className="input-field" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              <input type="text" placeholder="Company Name (Optional)" className="input-field" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
              <textarea placeholder="Requirement / Operational Scope Description..." required className="input-field" style={{ height: '90px', resize: 'none' }} value={formData.requirement} onChange={e => setFormData({ ...formData, requirement: e.target.value })} />
              
              <button type="submit" className="btn-primary" style={{ marginTop: '4px' }}>
                Execute Pipeline Route
              </button>
            </form>

            {msg && (
              <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: 'var(--accent-success)', fontSize: '12px', borderRadius: '10px', fontWeight: '500', lineHeight: '1.4' }}>
                {msg}
              </div>
            )}
          </div>

          {/* Metrics Column containing 6 explicit .stat-card layers */}
          <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { label: 'Total Leads Captured', val: stats.totalLeads, icon: '👥', border: 'var(--accent-1)' },
              { label: 'Automated Emails Sent', val: stats.emailsSent, icon: '✉️', border: 'var(--accent-2)' },
              { label: 'Verified Email Opens', val: stats.emailsOpened, icon: '👁️', border: 'var(--accent-warning)' },
              { label: 'Trackable Link Clicks', val: stats.linksClicked, icon: '🔗', border: 'var(--accent-success)' },
              { label: 'Global Open Rate', val: stats.openRate, icon: '📊', border: 'var(--accent-3)' },
              { label: 'Global Click Rate', val: stats.clickRate, icon: '📈', border: 'rgba(244, 63, 94, 1)' }
            ].map((card, i) => (
              <div key={i} className="glass stat-card" style={{ borderLeft: `4px solid ${card.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '130px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', tracking: '0.5px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{card.label}</span>
                  <span style={{ fontSize: '16px' }}>{card.icon}</span>
                </div>
                <span style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-primary)', trackingTight: '-1px' }}>{card.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Database Logs Section */}
        <div className="glass" style={{ overflowX: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Relational Log Monitor</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>Simulate receipt interactions to trigger live database hooks.</p>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '600', padding: '6px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px' }}>
              Active Records: {leads.length}
            </span>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
                  <th style={{ padding: '16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', tracking: '0.5px' }}>Lead Metadata</th>
                  <th style={{ padding: '16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', tracking: '0.5px' }}>Project Scope</th>
                  <th style={{ padding: '16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', tracking: '0.5px', textAlign: 'center' }}>Open Vector</th>
                  <th style={{ padding: '16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', tracking: '0.5px', textAlign: 'center' }}>Click Vector</th>
                  <th style={{ padding: '16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', tracking: '0.5px', textAlign: 'right' }}>Interactive Testing Switches</th>
                </tr>
              </thead>
              <tbody style={{ verticalAlign: 'middle' }}>
                {leads.map((l) => (
                  <tr key={l.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', background: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{l.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{l.email} · {l.phone}</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', marginTop: '4px' }}>{l.timestamp}</div>
                    </td>
                    <td style={{ padding: '16px', maxWidth: '240px' }}>
                      <div style={{ fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-primary)' }}>"{l.requirement}"</div>
                      {l.company && (
                        <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '0.3px', textTransform: 'uppercase', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '2px 6px', borderRadius: '4px', color: '#a78bfa', marginTop: '6px', display: 'inline-block' }}>
                          🏢 {l.company}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', tracking: '0.3px', border: '1px solid',
                        background: l.opened ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255,255,255,0.02)',
                        borderColor: l.opened ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                        color: l.opened ? 'var(--accent-warning)' : 'var(--text-muted)' }}>
                        {l.opened ? '⚠️ Opened' : 'Unread'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', tracking: '0.3px', border: '1px solid',
                        background: l.clicked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.02)',
                        borderColor: l.clicked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
                        color: l.clicked ? 'var(--accent-success)' : 'var(--text-muted)' }}>
                        {l.clicked ? '✅ Clicked' : 'No Click'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'end', gap: '8px' }}>
                        <button onClick={() => simulateOpen(l.id)} disabled={l.opened} className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', background: l.opened ? 'rgba(255,255,255,0.03)' : 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: l.opened ? 'none' : '0 2px 10px rgba(245, 158, 11, 0.2)' }}>
                          {l.opened ? 'Opened ✓' : 'Sim Pixel'}
                        </button>
                        <button onClick={() => simulateClick(l.id)} disabled={l.clicked} className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', background: l.clicked ? 'rgba(255,255,255,0.03)' : 'linear-gradient(135deg, #10b981, #059669)', boxShadow: l.clicked ? 'none' : '0 2px 10px rgba(16, 185, 129, 0.2)' }}>
                          {l.clicked ? 'Clicked ✓' : 'Sim Link'}
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
