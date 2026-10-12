require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { supabase } = require('./db');

const app = express();

const PORT = process.env.PORT || 7860;

// ---- Security & parsing ----
app.use(helmet());
app.use(express.json({ limit: '100kb' }));

// ---- CORS: only allow the real frontend origins ----
const allowedOrigins = (process.env.FRONTEND_ORIGINS ||
  'https://victoriaharryinteriors.com,https://www.victoriaharryinteriors.com,http://localhost:8811,http://127.0.0.1:8811'
).split(',').map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, server-to-server health checks)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS: ' + origin));
  }
}));

// ---- Rate limiting: protect the public form endpoint from spam/abuse ----
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,                  // 20 submissions per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many submissions from this device. Please try again later.' }
});

// ---- Health check (used to verify the service is awake and reachable) ----
app.get('/', (req, res) => {
  res.json({
    ok: true,
    service: 'victoriaharryinteriors-api',
    supabaseConfigured: !!supabase,
    time: new Date().toISOString()
  });
});

// ---- Form submission routes (consultation/project enquiry form) ----
const formsRouter = require('./routes/forms');
app.use('/api', formLimiter, formsRouter);

// ---- 404 + error handling ----
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ ok: false, error: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`victoriaharryinteriors-api listening on port ${PORT}`);
});
