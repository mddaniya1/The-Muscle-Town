import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

interface VisitRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  program: string;
  visitDay: string;
  visitTime: string;
  createdAt: string;
}

interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
}

const visitRequests: VisitRequest[] = [];
const contactInquiries: ContactInquiry[] = [];

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'the-muscle-town' });
  });

  app.post('/api/book-visit', (req, res) => {
    const { fullName, phone, email, program, visitDay, visitTime } = req.body || {};
    if (typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ ok: false, error: 'Please provide your full name.' });
    }
    if (typeof phone !== 'string' || phone.trim().length < 7) {
      return res.status(400).json({ ok: false, error: 'Please provide a valid phone number.' });
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
    }

    const record: VisitRequest = {
      id: `visit_${Date.now()}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      program: typeof program === 'string' && program.trim() ? program.trim() : 'General Tour',
      visitDay: typeof visitDay === 'string' && visitDay.trim() ? visitDay.trim() : 'Monday',
      visitTime: typeof visitTime === 'string' && visitTime.trim() ? visitTime.trim() : 'Evening',
      createdAt: new Date().toISOString(),
    };
    visitRequests.push(record);
    return res.status(201).json({ ok: true, id: record.id });
  });

  app.post('/api/contact', (req, res) => {
    const { name, phone, email, message } = req.body || {};
    if (typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ ok: false, error: 'Please provide your name.' });
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
    }
    if (typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ ok: false, error: 'Please enter a message.' });
    }

    const record: ContactInquiry = {
      id: `msg_${Date.now()}`,
      name: name.trim(),
      phone: typeof phone === 'string' ? phone.trim() : '',
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    contactInquiries.push(record);
    return res.status(201).json({ ok: true, id: record.id });
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Muscle Town server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
