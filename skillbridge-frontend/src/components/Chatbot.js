import React, { useContext, useState } from "react";
import { MessageCircle, SendHorizonal, X, Sparkles, Bot } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";

const quickActions = [
  "Which role fits my current strengths?",
  "How should I prioritise my skill gaps this month?",
  "Suggest beginner resources for my weakest skill.",
];

const Chatbot = () => {
  const { token } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (prefilled) => {
    const message = (prefilled ?? input).trim();
    if (!message || loading) return;

    const newMessages = [...messages, { sender: "user", text: message }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: "ai", text: data.reply || "I couldn't generate a response right now." }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { sender: "ai", text: "Something went wrong while reaching the AI coach. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="flex h-[620px] w-[min(92vw,390px)] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-900 p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-slate-50">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Career Coach
                </div>
                <h3 className="text-lg font-semibold">Ask about roles, learning plans, and next steps.</h3>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
            {messages.length === 0 && (
              <>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-950">
                  I can translate your assessment data into practical next moves. Think of me as a less annoying, more caffeinated mentor.
                </div>
                <div className="grid gap-2">
                  {quickActions.map((item) => (
                    <button
                      key={item}
                      onClick={() => sendMessage(item)}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 transition hover:border-slate-200 hover:bg-slate-50"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </>
            )}

            {messages.map((message, index) => (
              <div key={`${message.sender}-${index}`} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm shadow-sm ${message.sender === "user" ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700"}`}>
                  {message.sender === "ai" && <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-700"><Bot className="h-3.5 w-3.5" />Coach</div>}
                  {message.text}
                </div>
              </div>
            ))}

            {loading && <div className="text-sm text-slate-500">Thinking…</div>}
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="flex items-end gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-2">
              <textarea
                className="max-h-24 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your AI coach anything…"
                rows={1}
              />
              <button
                onClick={() => sendMessage()}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800 disabled:opacity-50"
                disabled={!input.trim() || loading}
              >
                <SendHorizonal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="group inline-flex items-center gap-3 rounded-full bg-slate-950 px-5 py-4 text-white shadow-2xl shadow-slate-950/30 transition hover:-translate-y-0.5 hover:bg-slate-900"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium">AI Coach</span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
