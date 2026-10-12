# Victoria Harry Interiors — Backend API

Free-tier Node/Express backend for [victoriaharryinteriors.com](https://victoriaharryinteriors.com).
Handles the project/consultation enquiry form and stores submissions in Supabase.

See `DEPLOYMENT_GUIDE.md` in the project root for full setup instructions
(GitHub Pages for the frontend, Render for this backend, Supabase for the database).

## Local development

```bash
npm install
cp .env.example .env   # fill in real SUPABASE_URL and SUPABASE_SERVICE_KEY
npm run dev
```

## Endpoints

- `GET /` — health check, confirms the service is running and connected to Supabase
- `POST /api/consultation` — the project/consultation enquiry form (`site/contact.html`)
