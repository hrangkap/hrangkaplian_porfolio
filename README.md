# Personal Portfolio — Hrang Kap Lian

> A personal portfolio website for an Algorithm Engineer and AI Researcher, featuring dynamic theming, animated backgrounds, and an AI-powered chatbot assistant.

**Live:** [hrangkaplian.com](https://hrangkaplian.com)

---

## Features

- **Dynamic Theming** — 6 accent colors, 6 background styles, 3 fonts, light/dim/dark modes. Persisted to localStorage.
- **AI Chatbot** — An AI assistant powered by n8n workflow automation and Google Gemini. Answers visitor questions about skills, experience, research, and projects in real time. Theme-reactive styling syncs with the site's accent color and mode.
- **Dynamic Favicon** — Canvas-generated favicon that changes with theme (Chrome/Firefox). SVG fallback for Safari.
- **Animated Backgrounds** — Neural network, digital rain, gradient, dots, grid, and clean patterns.
- **Responsive Design** — Optimized for mobile, desktop, and ultrawide (2000px+) screens.
- **Scroll Animations** — IntersectionObserver-based fade-in animations throughout all pages.

---

## Pages

| Page | Description |
|---|---|
| **Home** | Animated hero with gradient text, floating tags, and stats |
| **About** | Background, education, and professional journey |
| **Projects** | Filterable card grid (IoT, AI/ML, Web Dev, Automation) |
| **Research** | Published papers, research interests, and thesis details |
| **Experience** | Industry roles and key contributions |
| **Contact** | Contact form and CV download |

---

## Tech Stack

| Technology | Usage |
|---|---|
| **Next.js 16** | App Router, SSR, TypeScript |
| **Tailwind CSS v4** | Utility-first styling with CSS custom properties |
| **React** | Component architecture and state management |
| **n8n** | Workflow automation for AI chatbot |
| **Google Gemini** | LLM backend for the chatbot |
| **Vercel** | Hosting and deployment |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── about/page.tsx        # About page
│   ├── projects/page.tsx     # Projects page
│   ├── research/page.tsx     # Research page
│   ├── experience/page.tsx   # Experience page
│   ├── contact/page.tsx      # Contact page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles and animations
├── components/
│   ├── ThemeProvider.tsx      # Theme context and CSS variable management
│   ├── ThemeCustomizer.tsx    # Theme customization panel
│   ├── Navbar.tsx             # Navigation with theme toggle
│   ├── Footer.tsx             # Site footer
│   ├── ChatWidget.tsx         # AI chatbot (n8n + Gemini)
│   ├── DynamicFavicon.tsx     # Theme-aware favicon generator
│   └── BackgroundRenderer.tsx # Animated background patterns
public/
├── favicon.svg               # Static SVG favicon (Safari fallback)
└── images/                   # Profile and asset images
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/hrangkap/hrangkaplian_porfolio.git

# Navigate to the project directory
cd hrangkaplian_porfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your n8n webhook URL to .env.local

# Run development server
npm run dev
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | n8n Chat Trigger production webhook URL |

---

## AI Chatbot Architecture

```
Visitor → Chat Widget (Next.js) → n8n Webhook → AI Agent → Google Gemini → Response
```

- The chat widget loads from jsDelivr CDN and connects to an n8n workflow
- n8n's AI Agent processes messages with a system prompt containing structured data about Lian
- Google Gemini generates contextual responses
- Chat UI dynamically adapts to the site's current theme (accent color, dark/light mode)

---

## Deployment

Deployed on **Vercel** with automatic deployments from the `main` branch. Custom domain configured via Namecheap DNS.

---

## Contact

- **Website:** [hrangkaplian.com](https://hrangkaplian.com)
- **GitHub:** [github.com/hrangkap](https://github.com/hrangkap/)
- **LinkedIn:** [linkedin.com/in/hrang-kap-lian](https://www.linkedin.com/in/hrang-kap-lian-373641222/)
- **Email:** hrangkaplian.edu@gmail.com

---

## License

This project is open source and available under the [MIT License](LICENSE).
