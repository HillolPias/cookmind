# Cookmind

**AI Recipe Generator** — snap or upload a photo of your ingredients, and let AI turn them into ready-to-cook recipes.

🔗 **Live demo:** [cookmind-ivory.vercel.app](https://cookmind-ivory.vercel.app)

## About

Cookmind takes the "what can I cook with what I already have?" problem and hands it to AI. Upload a photo of your ingredients, and the app analyzes the image with Google's Gemini API to generate tailored, ready-to-cook recipes — no manual ingredient typing required. Recipes can be exported as a PDF to save or share.

## Features

- 📸 **Photo-based ingredient detection** — drag-and-drop or upload a photo of your ingredients (via `react-dropzone`)
- 🤖 **AI-generated recipes** — Google Generative AI (Gemini) analyzes the image and suggests recipes you can actually make
- 🔐 **User authentication** — secure sign-in/sign-up powered by Clerk
- 🛡️ **Bot & abuse protection** — request protection via Arcjet
- 📄 **Export to PDF** — download generated recipes as a shareable PDF (`@react-pdf/renderer`)
- 🎨 **Modern, responsive UI** — built with Tailwind CSS v4 and Radix UI primitives
- 🗄️ **Headless CMS backend** — recipe/content management via Strapi 5 + PostgreSQL

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS v4, Radix UI, Lucide React |
| AI | Google Generative AI (Gemini API) |
| Auth & Security | Clerk, Arcjet |
| File Handling | react-dropzone, @react-pdf/renderer |
| Backend / CMS | Strapi 5 |
| Database | PostgreSQL |
| Deployment | Vercel |

## Project Structure

```
cookmind/
├── frontend/   # Next.js app — UI, ingredient upload, AI recipe generation, PDF export
└── backend/    # Strapi 5 headless CMS — content/recipe management, PostgreSQL
```

## Getting Started

### Prerequisites
- Node.js ≥ 20
- PostgreSQL instance
- API keys: Google Generative AI, Clerk, Arcjet

### Frontend
```bash
cd frontend
npm install
# add environment variables (see below)
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run develop
```

### Environment Variables

**Frontend** (`frontend/.env.local`)
```
GOOGLE_GENERATIVE_AI_API_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
ARCJET_KEY=
```

**Backend** (`backend/.env`)
```
DATABASE_URL=
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
```

## License

This project is licensed under the [MIT License](LICENSE).
