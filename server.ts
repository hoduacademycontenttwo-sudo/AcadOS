import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));

const PORT = 3000;

// Lazy initialization of Gemini Client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please add it via the Secrets panel (Settings > Secrets) in Google AI Studio to enable Gemini-guided website creation.");
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Endpoint: Transform input file code or notes into responsive, beautifully structured static HTML + Tailwind sections.
app.post("/api/generate-component", async (req, res) => {
  try {
    const { prompt: userPrompt, filesText, currentSections, designPreferences } = req.body;

    const ai = getGeminiClient();

    const sectionsContext = currentSections && currentSections.length > 0
      ? `Here are the current sections of the website:\n${JSON.stringify(currentSections, null, 2)}\n`
      : "";

    const systemInstruction = `You are an expert full-stack web designer and master of modern tailwindcss layouts. Your goal is to convert the user's raw files, instructions, or notes into a gorgeous, cohesive, responsive website layout made of multiple Tailwind CSS-styled sections.

Your design style should be:
- Swiss/Modern or premium look (generous padding, great typography, beautiful color contrasts, modern buttons with transitions).
- 100% self-contained inline SVG icons (do NOT use Lucide React icons, FontAwesome classes, or external image links. Write clean inline SVG tags styled with tailwind classes like text-indigo-505, w-6, h-6).
- Elegant hover feedback, micro-interactions, responsive side margins (always use px-4 md:px-8 max-w-7xl mx-auto for content margins).
- Avoid cheesy patterns like uniform borders or robotic card columns. Mix layouts, use bent grids, visual hero, elegant typography, testimonials, features grid, pricing tables, faqs, detailed contact layout, and clean footers.
- Return the output strictly in the requested JSON format containing sections with clean HTML tagged with Tailwind classes. DO NOT wrap the HTML sections with <html>, <head>, or <body>. Produce only clean, modular section blocks (e.g. <section class="relative bg-slate-950 py-24">...</section>).`;

    const promptMessage = `
User Design request/Prompt: ${userPrompt || "Convert the provided file data into a beautifully polished main page"}
Design Preferences (Theme/Spacing/Mood): ${designPreferences || "Modern premium theme, comfortable spacing"}

${sectionsContext}

--- USER INPUT FILES / NOTES CONTENT ---
${filesText || "No raw files provided. Please generate a highly professional modern placeholder website landing page illustrating high quality standard web layouts."}
----------------------------------------

Please analyze the user's files and requirements. Expand them into a complete website configuration. Return a suggested page title, tagline, and an array of styled Tailwind CSS sections structure.
Always output beautiful, polished responsive layout blocks with beautiful color palettes (like deep grey background with cobalt/indigo accents, or elegant soft slate with sage accents, etc.). Use rich copy and robust content from their files.
`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "A highly clear and professional website page title.",
        },
        tagline: {
          type: Type.STRING,
          description: "An engaging starter tagline summarizing the purpose.",
        },
        sections: {
          type: Type.ARRAY,
          description: "Ordered array of responsive visual section cards or banner blocks utilizing exquisite Tailwind styling.",
          items: {
            type: Type.OBJECT,
            required: ["id", "type", "title", "html"],
            properties: {
              id: {
                type: Type.STRING,
                description: "Kebab-case alphanumeric identifier (e.g., 'hero-intro', 'feature-bento', 'user-reviews', 'pricing-plans', 'get-touch', 'faq-fold', 'company-footer').",
              },
              type: {
                type: Type.STRING,
                description: "Category label: 'hero' | 'features' | 'testimonials' | 'pricing' | 'contact' | 'faq' | 'gallery' | 'footer' | 'content'",
              },
              title: {
                type: Type.STRING,
                description: "A friendly, descriptive human label for this block (e.g., 'Core Benefits Grid').",
              },
              html: {
                type: Type.STRING,
                description: "HTML containing native semantic elements styled strictly with Tailwind utility classes. Must combine gorgeous responsive layouts (using grids, flexes, responsive text sizes and generous spacing py-16 md:py-24). Ensure gorgeous text pairings, pristine spacing, and fully functional responsive structures.",
              },
            },
          },
        },
      },
      required: ["title", "tagline", "sections"],
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptMessage,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    res.json(JSON.parse(text.trim()));
  } catch (error: any) {
    console.error("API error in generate-component:", error);
    res.status(500).json({ error: error.message || "An error occurred during component generation." });
  }
});

// AcadBot chat endpoint — streams a response grounded in AcadOS product knowledge
app.post("/api/acad-chat", async (req, res) => {
  try {
    const { messages } = req.body as { messages: { role: string; content: string }[] };

    const ai = getGeminiClient();

    const systemInstruction = `You are Acad, the friendly AI assistant for AcadOS — a comprehensive Academic Operating System built for Indian schools and coaching institutes by Hoducation Technologies Pvt. Ltd.

You have deep knowledge of every AcadOS module:

1. **Learners Hub** – Digital content library with 5 Lakh+ questions mapped to CBSE, ICSE, State Boards, JEE, NEET, UPSC, SSC and more. Covers Classes 1-12 and competitive exams. Supports PDF worksheets, chapter-wise practice, and concept videos.

2. **TestMaker** – AI-powered paper generator. Teachers select board, class, subject, chapter, and difficulty. Generates question papers instantly with answer keys. Supports OMR-ready formats and custom branding.

3. **Practice CBT (Computer-Based Testing)** – Online mock exam platform mimicking JEE/NEET/CUET exam interfaces exactly. Full-screen lockdown, timer, section navigation, instant scoring, rank prediction, and detailed analytics.

4. **OMR Evaluation** – Smartphone-based OMR scanning. No special hardware needed — teachers photograph answer sheets with a phone, and the system auto-grades in seconds. Supports 60/90/120/150 question sheets.

5. **ERP + Lead CRM** – Complete institute management: student admissions, fee collection, attendance, batch scheduling, faculty payroll, WhatsApp notifications, and a lead CRM to convert enquiries to enrolments.

**Pricing**: Custom white-label pricing based on institution size. Contact +91 9660034117 or book a free demo at acados.app.

**Who uses AcadOS**: K-12 schools, CBSE coaching institutes, IIT-JEE/NEET prep centres, state board coaching, competitive exam academies.

**Key differentiators**: White-label (runs under your brand/domain), India-specific content, works offline-first on low-bandwidth, affordable per-student pricing, 15+ boards mapped.

Respond in a warm, helpful, concise tone. Use bullet points when listing features. If someone asks for a demo or pricing, always encourage them to call +91 9660034117 or click "Book a Demo". If a question is outside AcadOS scope, politely say you specialise in AcadOS and redirect.`;

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: { systemInstruction, maxOutputTokens: 512 },
    });

    res.json({ reply: response.text ?? "I'm having trouble right now. Please try again shortly." });
  } catch (error: any) {
    console.error("AcadBot error:", error);
    res.status(500).json({ reply: "Something went wrong. Please try again." });
  }
});

// Start the Express server or mount Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode with Vite Middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode serving static compiled files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
app.listen
startServer();
