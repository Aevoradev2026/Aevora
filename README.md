# Aevora — Premium Web Development Agency

A cinematic Next.js 14 website with a live Three.js spiral galaxy hero animation.

---

## ✦ Quick Start (3 commands)

```bash
npm install
cp .env.example .env.local   # then fill in your keys
npm run dev
```

Open → http://localhost:3000

---

## ✦ Environment Variables

Edit `.env.local` with your credentials:

```env
ANTHROPIC_API_KEY=sk-ant-...          # From console.anthropic.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx # See setup below
NOTIFICATION_EMAIL=aevora.dev@gmail.com
```

### Gmail App Password Setup (one-time, 2 min)

1. Log in to **aevora.dev@gmail.com**
2. Visit → https://myaccount.google.com/security
3. Enable **2-Step Verification** (if not already on)
4. Search "App passwords" in the Google Account search bar
5. Create new → name it **"Aevora Website"**
6. Copy the 16-character password → paste into `.env.local`

Once set up, every form submission sends an instant email to your Gmail
with full client details and the AI strategy. Gmail notifies your phone.

---

## ✦ How Submissions Work

```
Client fills form
      ↓
Claude AI generates strategy (shown to client instantly)
      ↓
  ┌───┴───────────────────────────────┐
  │ 1. Saved to /data/submissions.json │  ← backup, never lost
  │ 2. Email → aevora.dev@gmail.com   │  ← Gmail phone notification
  └───────────────────────────────────┘
```

All submissions are saved locally in `/data/submissions.json` — even
if email fails temporarily, nothing is ever lost.

---

## ✦ Project Structure

```
aevora/
├── public/
│   └── logo.png              ← Official Aevora logo
├── app/
│   ├── layout.tsx            ← Root layout (Syne + Inter + Orbitron fonts)
│   ├── page.tsx              ← Main page
│   ├── globals.css           ← Global styles + animations
│   └── api/consult/
│       └── route.ts          ← AI + email + submission storage
└── components/
    ├── Nav.tsx               ← Fixed nav (Aevora logo + Orbitron wordmark)
    ├── GalaxyHero.tsx        ← Three.js spiral galaxy (150k particles)
    ├── Services.tsx          ← 4 service cards
    ├── Process.tsx           ← 5-step timeline
    ├── Consult.tsx           ← AI consultation form
    ├── Testimonials.tsx      ← Auto-cycling testimonials
    ├── CTA.tsx               ← Call to action (mini galaxy)
    └── Footer.tsx            ← Footer (Instagram + email)
```

---

## ✦ Contact Info (already configured)

| Channel   | Handle / Address         |
|-----------|--------------------------|
| Instagram | @aevora.dev              |
| Email     | aevora.dev@gmail.com     |

---

## ✦ Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 | App Router, SSR, API routes |
| TypeScript | Type safety |
| Tailwind CSS | Utility styling |
| Three.js | 3D galaxy hero animation |
| Framer Motion | Scroll animations |
| Nodemailer | Gmail email notifications |
| Anthropic SDK | AI consultation (server-side) |
| Orbitron | Brand wordmark font |

---

## ✦ Build for Production

```bash
npm run build && npm start
```
