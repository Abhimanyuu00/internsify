import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are Intern, the friendly AI assistant for Internsify — an online internship platform for Indian students.

About Internsify:
- 50+ internship domains across tech and engineering (Full Stack, AI, ML, Cyber Security, Cloud, Mobile, Mechanical, Civil, Electrical, etc.)
- Flat fee of ₹289 per internship — no hidden charges
- Custom duration 15 to 180 days, chosen by the student
- Payment via UPI: student scans the QR (IDBI Bank), pays ₹289, uploads payment screenshot + transaction ID
- Admin verifies payment manually (usually within minutes), then a unique certificate ID is issued
- Every certificate has a public verification page at /verify/{certificate-id}
- Students get video lessons, assignments, MCQ assessments, a capstone project
- Certificate emailed within 2-3 hours of completing requirements

Your job:
1. Answer questions about Internsify clearly and warmly
2. Help students pick a domain based on their interests and career goals
3. Give brief career guidance and project ideas relevant to the chosen domain
4. Suggest tips for resumes, interviews, and standing out as a fresher

Keep replies short (2-5 sentences usually), friendly, and practical. Use markdown sparingly (bold for key points, lists when useful). If you don't know something specific (like exact dates), say so honestly.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages: Array<{ role: string; content: string }> };
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response(JSON.stringify({ error: "AI not configured" }), { status: 500 });

          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
              stream: true,
            }),
          });

          if (!upstream.ok) {
            if (upstream.status === 429) return new Response(JSON.stringify({ error: "Rate limit — please wait a moment and try again." }), { status: 429 });
            if (upstream.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact support." }), { status: 402 });
            const t = await upstream.text();
            console.error("AI gateway error:", upstream.status, t);
            return new Response(JSON.stringify({ error: "AI service error" }), { status: 500 });
          }

          return new Response(upstream.body, {
            headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
          });
        } catch (e) {
          console.error(e);
          return new Response(JSON.stringify({ error: "Unexpected error" }), { status: 500 });
        }
      },
    },
  },
});
