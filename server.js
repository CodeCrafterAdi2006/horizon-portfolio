import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
// Support Render dynamic port binding alongside explicit SERVER_PORT settings
const PORT = process.env.PORT || process.env.SERVER_PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rate Limiter to prevent spam (max 10 requests/min)
const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10,             
  message: { error: 'Too many chat requests. Please retry after 1 minute.' }
});

// Production logging function with ISO timestamps
const logRequest = (method, endpoint, status, error = null) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${endpoint} → ${status}${error ? ` (${error})` : ''}`);
};

// Flexible CORS Setup matching dev and production targets
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed by Aditya OS security policy.'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Validate API key on startup
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not set in environment configurations.');
  process.exit(1);
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for portfolio AI
const SYSTEM_INSTRUCTION = `You are Aditya Singh's cyberpunk-themed portfolio AI assistant (Aditya OS).
Aditya is an AI Engineer & Automation Architect. Keep responses concise (under 150 words), formatted with line breaks, and slightly futuristic/retro-technical in tone.

Here is Aditya's telemetry:
- Profile: Aspiring AI Engineer & Systems Automation Architect. Builds autonomous agentic workflows, LLM applications, custom integrations, and frontend panels.
- Location: New Delhi, India.
- Skills:
  * AI/ML: PyTorch, LangChain, TensorFlow, OpenCV, Prompt Design, RAG systems, Autonomous agentic workflows.
  * Web Development: React, TypeScript, Next.js, Node.js, Express, CSS/Tailwind.
  * Game Development: Pygame, Procedural Generation, Game Physics, Algorithms.
  * DevOps & Cloud: Docker, Kubernetes, AWS, GitHub Actions CI/CD.
- Selected Projects:
  1. ShortsForge: Autonomous AI-driven short video creation engine using JavaScript, Node.js, Express, and canvas rendering.
  2. ARISE: Advanced CLI human simulation and habit-tracking engine written in Python/Pytest.
  3. 1 Line a Day: Interactive digital journal with Pygame procedural graphics.
- Contact Ports:
  * Email: eragon4273@gmail.com
  * GitHub: github.com/CodeCrafterAdi2006
  * LinkedIn: linkedin.com/in/aditya-singh-0a5a9830b/
  * Instagram: instagram.com/code_crafter2705/

If the query is unrelated to Aditya, his projects, or general software/AI engineering, politely redirect them back to the portfolio context.`;

// Chat API Endpoint
app.post('/api/chat', limiter, async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    logRequest('POST', '/api/chat', 400, 'Empty or invalid message');
    return res.status(400).json({ error: 'Message is required' });
  }

  if (message.length > 1000) {
    logRequest('POST', '/api/chat', 400, 'Message length exceeded');
    return res.status(400).json({ error: 'Message too long (max 1000 characters)' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Set 10 seconds timeout limit race to prevent infinite hanging
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 10000)
    );

    const response = await Promise.race([
      model.generateContent({
        contents: [{
          role: 'user',
          parts: [{ text: message }]
        }],
        systemInstruction: SYSTEM_INSTRUCTION
      }),
      timeoutPromise
    ]);

    const replyText = response.response.text() || 'No response generated.';
    logRequest('POST', '/api/chat', 200);
    res.json({ reply: replyText });
  } catch (error) {
    logRequest('POST', '/api/chat', 500, error.message);
    console.error('Gemini API error:', error);
    
    if (error.message === 'Request timeout') {
      return res.status(504).json({ error: 'Request timeout. Try again.' });
    }
    
    if (error.message && error.message.includes('API_KEY')) {
      return res.status(401).json({ error: 'API key is invalid or not configured.' });
    }
    
    res.status(500).json({ error: 'Uplink failure. AI model failed to generate response.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // SPA fallback
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🤖 Gemini API proxy active`);
});
