import os
import sqlite3
import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, Response
from pydantic import BaseModel, EmailStr

# ──────────────────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────────────────
load_dotenv()

SMTP_HOST   = os.getenv("SMTP_HOST",    "smtp.gmail.com")
SMTP_PORT   = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER   = os.getenv("SMTP_USER",    "")          # your Gmail address
SMTP_PASS   = os.getenv("SMTP_PASS",    "")          # Gmail App Password
FROM_EMAIL  = os.getenv("FROM_EMAIL",   SMTP_USER)
BASE_URL    = os.getenv("BASE_URL",     "http://127.0.0.1:8000")
REDIRECT_URL = os.getenv("REDIRECT_URL","https://google.com")
DB_PATH     = os.getenv("DB_PATH",      "leads.db")

# ──────────────────────────────────────────────────────────
# APP
# ──────────────────────────────────────────────────────────
app = FastAPI(title="LeadTrack API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────────────────
# DATABASE
# ──────────────────────────────────────────────────────────
def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_conn() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS leads (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                name        TEXT    NOT NULL,
                email       TEXT    NOT NULL,
                phone       TEXT    DEFAULT '',
                company     TEXT    DEFAULT '',
                requirement TEXT    DEFAULT '',
                category    TEXT    DEFAULT 'General',
                priority    TEXT    DEFAULT 'Low',
                timestamp   TEXT    NOT NULL,
                is_opened   INTEGER DEFAULT 0,
                is_clicked  INTEGER DEFAULT 0
            )
        """)
        conn.commit()


init_db()

# ──────────────────────────────────────────────────────────
# PYDANTIC MODEL
# ──────────────────────────────────────────────────────────
class LeadCreate(BaseModel):
    name:        str
    email:       EmailStr
    phone:       Optional[str] = ""
    company:     Optional[str] = ""
    requirement: Optional[str] = ""

# ──────────────────────────────────────────────────────────
# HELPERS
# ──────────────────────────────────────────────────────────
def classify_lead(text: str) -> tuple[str, str]:
    """Simple keyword-based lead classifier."""
    t = text.lower()
    if any(k in t for k in ("chatbot", "llm", "gpt", "ai agent")):
        return "AI Automation", "High"
    if "automation" in t:
        return "Automation", "High"
    if "website" in t or "landing page" in t:
        return "Web Development", "Medium"
    if "app" in t or "mobile" in t:
        return "Mobile Development", "Medium"
    if "seo" in t or "marketing" in t:
        return "Digital Marketing", "Medium"
    return "General", "Low"


# 1×1 transparent GIF bytes
PIXEL_GIF = (
    b'\x47\x49\x46\x38\x39\x61'
    b'\x01\x00\x01\x00\x80\x00\x00'
    b'\xff\xff\xff\x00\x00\x00'
    b'\x21\xf9\x04\x01\x00\x00\x00\x00'
    b'\x2c\x00\x00\x00\x00\x01\x00'
    b'\x01\x00\x00\x02\x02\x44\x01\x00\x3b'
)


def send_email(name: str, to_email: str, requirement: str,
               pixel_url: str, click_url: str) -> bool:
    """Send HTML tracking email. Returns True on success."""
    if not SMTP_USER or not SMTP_PASS:
        print("⚠️  SMTP credentials not set – skipping email send.")
        return False

    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body  {{ font-family: 'Segoe UI', Arial, sans-serif; background:#0f0f1a;
                 color:#e2e8f0; margin:0; padding:0; }}
        .wrap {{ max-width:560px; margin:40px auto; background:#1a1a2e;
                 border-radius:16px; overflow:hidden;
                 border:1px solid rgba(99,102,241,0.25); }}
        .hero {{ background:linear-gradient(135deg,#6366f1,#8b5cf6);
                 padding:36px 32px; text-align:center; }}
        .hero h1 {{ margin:0; font-size:26px; font-weight:800; color:#fff; }}
        .body {{ padding:32px; }}
        .body p  {{ color:#94a3b8; line-height:1.7; }}
        .req-box {{ background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.3);
                    border-radius:10px; padding:16px 20px; margin:20px 0;
                    color:#c4b5fd; font-style:italic; font-size:14px; }}
        .cta  {{ display:inline-block; margin:24px 0 8px;
                 background:linear-gradient(135deg,#6366f1,#8b5cf6);
                 color:#fff; text-decoration:none; padding:14px 32px;
                 border-radius:10px; font-weight:700; font-size:15px;
                 box-shadow:0 6px 20px rgba(99,102,241,0.4); }}
        .footer {{ padding:20px 32px; border-top:1px solid rgba(99,102,241,0.1);
                   color:#475569; font-size:12px; text-align:center; }}
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="hero">
          <div style="font-size:40px;margin-bottom:10px;">🚀</div>
          <h1>Thanks for reaching out, {name}!</h1>
        </div>
        <div class="body">
          <p>We've received your enquiry and will get back to you within <strong style="color:#a5b4fc;">24 hours</strong>.</p>
          <p>Here's a summary of what you shared with us:</p>
          <div class="req-box">"{requirement or 'No details provided.'}"</div>
          <p>In the meantime, feel free to explore our work and see how we help businesses grow.</p>
          <div style="text-align:center;">
            <a href="{click_url}" class="cta">Explore Our Work →</a>
          </div>
        </div>
        <div class="footer">
          © 2026 LeadTrack · You received this because you submitted an enquiry.
        </div>
      </div>
      <!-- tracking pixel -->
      <img src="{pixel_url}" width="1" height="1" alt="" style="display:none;" />
    </body>
    </html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"👋 Thanks {name} — We Got Your Message!"
    msg["From"]    = f"LeadTrack <{FROM_EMAIL}>"
    msg["To"]      = to_email
    msg.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
        print(f"✅ Email sent → {to_email}")
        return True
    except Exception as exc:
        print(f"❌ Email error: {exc}")
        return False

# ──────────────────────────────────────────────────────────
# ROUTES
# ──────────────────────────────────────────────────────────

@app.post("/api/leads")
async def create_lead(lead: LeadCreate):
    """Save lead to DB and trigger automated tracking email."""
    category, priority = classify_lead(lead.requirement or "")
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with get_conn() as conn:
        cursor = conn.execute(
            """
            INSERT INTO leads (name, email, phone, company, requirement,
                               category, priority, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (lead.name, lead.email, lead.phone, lead.company,
             lead.requirement, category, priority, timestamp),
        )
        lead_id = cursor.lastrowid
        conn.commit()

    pixel_url = f"{BASE_URL}/api/track/open/{lead_id}"
    click_url  = f"{BASE_URL}/api/track/click/{lead_id}"

    email_ok = send_email(
        lead.name, lead.email, lead.requirement, pixel_url, click_url
    )

    headers = {"X-Email-Status": "sent" if email_ok else "failed"}
    return Response(
        content='{"status":"success","message":"Lead saved"}',
        media_type="application/json",
        headers=headers,
    )


@app.get("/api/track/open/{lead_id}")
async def track_open(lead_id: int):
    """Return 1×1 transparent pixel and mark email as opened."""
    with get_conn() as conn:
        conn.execute(
            "UPDATE leads SET is_opened = 1 WHERE id = ?", (lead_id,)
        )
        conn.commit()
    return Response(content=PIXEL_GIF, media_type="image/gif",
                    headers={"Cache-Control": "no-cache, no-store"})


@app.get("/api/track/click/{lead_id}")
async def track_click(lead_id: int):
    """Log link click and redirect lead to target URL."""
    with get_conn() as conn:
        conn.execute(
            "UPDATE leads SET is_clicked = 1 WHERE id = ?", (lead_id,)
        )
        conn.commit()
    return RedirectResponse(url=REDIRECT_URL, status_code=302)


@app.get("/api/analytics")
async def analytics():
    """Return aggregate stats and full leads list."""
    with get_conn() as conn:
        row = conn.execute(
            "SELECT COUNT(*), SUM(is_opened), SUM(is_clicked) FROM leads"
        ).fetchone()
        total   = row[0] or 0
        opened  = row[1] or 0
        clicked = row[2] or 0

        leads_rows = conn.execute(
            """
            SELECT id, name, email, phone, company, requirement,
                   category, priority, timestamp, is_opened, is_clicked
            FROM leads
            ORDER BY id DESC
            """
        ).fetchall()

    open_rate  = round(opened  / total * 100, 1) if total else 0
    click_rate = round(clicked / total * 100, 1) if total else 0

    leads = [
        {
            "id":          r["id"],
            "name":        r["name"],
            "email":       r["email"],
            "phone":       r["phone"],
            "company":     r["company"],
            "requirement": r["requirement"],
            "category":    r["category"],
            "priority":    r["priority"],
            "timestamp":   r["timestamp"],
            "is_opened":   bool(r["is_opened"]),
            "is_clicked":  bool(r["is_clicked"]),
        }
        for r in leads_rows
    ]

    return {
        "total_leads":   total,
        "total_sent":    total,
        "total_opened":  opened,
        "total_clicked": clicked,
        "open_rate":     open_rate,
        "click_rate":    click_rate,
        "leads":         leads,
    }


# ──────────────────────────────────────────────────────────
# ENTRYPOINT
# ──────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)