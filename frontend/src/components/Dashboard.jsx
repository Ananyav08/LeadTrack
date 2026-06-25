import React from 'react'

const CARDS = [
  {
    id: 'total_leads',
    label: 'Total Leads',
    icon: '👥',
    grad: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
    shadow: 'rgba(99,102,241,0.35)',
    format: v => v,
  },
  {
    id: 'total_sent',
    label: 'Emails Sent',
    icon: '📨',
    grad: 'linear-gradient(135deg,#06b6d4,#3b82f6)',
    shadow: 'rgba(6,182,212,0.35)',
    format: v => v,
  },
  {
    id: 'total_opened',
    label: 'Emails Opened',
    icon: '📬',
    grad: 'linear-gradient(135deg,#10b981,#059669)',
    shadow: 'rgba(16,185,129,0.35)',
    format: v => v,
  },
  {
    id: 'total_clicked',
    label: 'Links Clicked',
    icon: '🖱️',
    grad: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    shadow: 'rgba(245,158,11,0.35)',
    format: v => v,
  },
  {
    id: 'open_rate',
    label: 'Open Rate',
    icon: '📈',
    grad: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
    shadow: 'rgba(139,92,246,0.35)',
    format: v => `${v}%`,
  },
  {
    id: 'click_rate',
    label: 'Click Rate',
    icon: '🎯',
    grad: 'linear-gradient(135deg,#06b6d4,#10b981)',
    shadow: 'rgba(6,182,212,0.35)',
    format: v => `${v}%`,
  },
]

function StatCard({ card, value, delay }) {
  return (
    <div
      className="stat-card fade-in"
      style={{
        background: card.grad,
        boxShadow: `0 8px 32px ${card.shadow}`,
        animationDelay: `${delay}s`,
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
      <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.5px' }}>
        {card.format(value ?? 0)}
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.85, marginTop: 4, letterSpacing: '0.3px' }}>
        {card.label}
      </div>
    </div>
  )
}

function StatusBadge({ value, label, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 999,
      background: `${color}20`, border: `1px solid ${color}50`,
      color, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: color,
        boxShadow: `0 0 6px ${color}`,
      }}/>
      {label}
    </span>
  )
}

function LeadRow({ lead, index }) {
  const date = new Date(lead.timestamp + 'Z')
  const formatted = isNaN(date) ? lead.timestamp : date.toLocaleString()

  return (
    <tr className="fade-in" style={{ animationDelay: `${index * 0.04}s` }}>
      <td style={td}>{lead.id}</td>
      <td style={{ ...td, fontWeight: 600, color: '#e2e8f0' }}>{lead.name}</td>
      <td style={{ ...td, color: '#a5b4fc' }}>{lead.email}</td>
      <td style={td}>{lead.company || <span style={{ color:'#475569' }}>—</span>}</td>
      <td style={{ ...td, maxWidth: 180 }}>
        <span style={{ color:'#94a3b8', fontSize:13 }}>
          {lead.requirement
            ? lead.requirement.slice(0, 50) + (lead.requirement.length > 50 ? '…' : '')
            : <span style={{ color:'#475569' }}>—</span>
          }
        </span>
      </td>
      <td style={td}>
        {lead.is_opened
          ? <StatusBadge color="#10b981" label="Opened"/>
          : <StatusBadge color="#64748b" label="Pending"/>
        }
      </td>
      <td style={td}>
        {lead.is_clicked
          ? <StatusBadge color="#6366f1" label="Clicked"/>
          : <StatusBadge color="#64748b" label="No"/>
        }
      </td>
      <td style={{ ...td, color:'#64748b', fontSize:12 }}>{formatted}</td>
    </tr>
  )
}

const td = {
  padding: '14px 16px',
  borderBottom: '1px solid rgba(99,102,241,0.1)',
  fontSize: 14,
  color: '#cbd5e1',
  verticalAlign: 'middle',
}

const th = {
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 600,
  color: '#7c3aed',
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
  borderBottom: '1px solid rgba(99,102,241,0.2)',
  whiteSpace: 'nowrap',
}

export default function Dashboard({ data, loading, onRefresh }) {
  if (loading) {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
                    justifyContent:'center', minHeight:'60vh', gap:16 }}>
        <div className="spin" style={{
          width:48, height:48, borderRadius:'50%',
          border:'3px solid rgba(99,102,241,0.2)',
          borderTopColor:'#6366f1',
        }}/>
        <p style={{ color:'#94a3b8' }}>Loading analytics…</p>
      </div>
    )
  }

  if (!data) return null

  return (
    <div style={{ padding: '48px 24px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Page heading */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                    marginBottom: 36, flexWrap:'wrap', gap:12 }}
           className="fade-in">
        <div>
          <h1 className="gradient-text" style={{ fontSize:30, fontWeight:800 }}>
            Analytics Dashboard
          </h1>
          <p style={{ color:'#64748b', fontSize:14, marginTop:4 }}>
            Real-time lead & email tracking overview
          </p>
        </div>
        <button
          id="refresh-btn"
          className="btn-primary"
          onClick={onRefresh}
          style={{ padding:'10px 22px', fontSize:14 }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
        gap: 20,
        marginBottom: 40,
      }}>
        {CARDS.map((c, i) => (
          <StatCard key={c.id} card={c} value={data[c.id]} delay={i * 0.07} />
        ))}
      </div>

      {/* Leads table */}
      <div className="glass fade-in" style={{ animationDelay:'0.4s', overflow:'hidden' }}>
        <div style={{ padding:'20px 24px', borderBottom:'1px solid rgba(99,102,241,0.15)',
                      display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ fontWeight:700, fontSize:17 }}>
            All Leads
            <span style={{
              marginLeft:10, background:'rgba(99,102,241,0.2)',
              color:'#a5b4fc', borderRadius:999, padding:'2px 10px', fontSize:13
            }}>
              {data.leads?.length ?? 0}
            </span>
          </h2>
        </div>

        <div style={{ overflowX:'auto' }}>
          {!data.leads?.length ? (
            <div style={{ padding:60, textAlign:'center', color:'#475569' }}>
              <div style={{ fontSize:48, marginBottom:12 }}>📭</div>
              <p>No leads yet. Submit the form to get started!</p>
            </div>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'rgba(0,0,0,0.2)' }}>
                  {['ID','Name','Email','Company','Requirement','Opened','Clicked','Timestamp'].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.leads.map((lead, i) => (
                  <LeadRow key={lead.id} lead={lead} index={i} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
