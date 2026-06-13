import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How do I enroll?",
  "Which internship is best for a beginner?",
  "How does payment work?",
  "Project ideas for AI internship",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm **Intern**, your guide to Internsify. Ask me anything about programs, payment, certificates, or career advice. ✨" },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    if (!text.trim() || busy) return;
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "Error" }));
        setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${err.error || "Couldn't reach the assistant."}` }]);
        setBusy(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(payload);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantText += delta;
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: assistantText };
                return copy;
              });
            }
          } catch { buffer = line + "\n" + buffer; break; }
        }
      }
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "⚠️ Network error — please try again." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand-gradient shadow-glow text-white hover:scale-105 transition animate-pulse-ring"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-8rem))] rounded-2xl border border-border bg-card shadow-glow flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="px-4 py-3 border-b border-border bg-brand-gradient text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <div>
              <div className="font-display font-semibold leading-tight">Intern · AI Assistant</div>
              <div className="text-[10px] opacity-80">Powered by Lovable AI</div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${
                    m.role === "user" ? "bg-brand-gradient text-white" : "bg-muted text-foreground"
                  }`}
                  dangerouslySetInnerHTML={{ __html: renderMd(m.content) }}
                />
              </div>
            ))}
            {busy && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start"><div className="rounded-2xl bg-muted px-3 py-2 text-sm"><Loader2 className="h-4 w-4 animate-spin" /></div></div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs rounded-full border border-border bg-background px-2.5 py-1 hover:border-brand/50">
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="p-3 border-t border-border flex items-center gap-2"
          >
            <Input
              placeholder="Ask about programs, payment, projects…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
              className="h-10"
            />
            <Button type="submit" size="icon" disabled={busy || !input.trim()} className="bg-brand-gradient text-white shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

// Tiny markdown: **bold**, *italic*, line breaks, list items. Escapes HTML first.
function renderMd(raw: string) {
  const esc = raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|\W)\*(?!\s)(.+?)\*(?!\w)/g, "$1<em>$2</em>")
    .replace(/`(.+?)`/g, '<code class="bg-background/60 rounded px-1 text-[0.85em]">$1</code>')
    .replace(/^- (.+)$/gm, "• $1")
    .replace(/\n/g, "<br/>");
}
