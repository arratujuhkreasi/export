"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const getMessageText = (m: any) => {
    if (m.content) return m.content;
    if (m.parts && Array.isArray(m.parts)) {
      return m.parts
        .filter((part: any) => part.type === "text")
        .map((part: any) => part.text)
        .join("");
    }
    return "";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#1d6b4f] text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border/50 bg-white/95 shadow-2xl backdrop-blur-xl sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border/50 bg-[#1d6b4f] p-4 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Bot className="size-6 text-emerald-100" />
            </div>
            <div>
              <h3 className="font-semibold leading-tight">Admin CO EXPORT</h3>
              <p className="text-xs text-emerald-100/80">Online | Ready to assist</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground opacity-60">
                <MessageCircle className="mb-2 size-10" />
                <p className="text-sm">Hi! Ask me anything about our export products, MOQ, or FOB pricing.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages?.map((m: any) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="flex max-w-[85%] items-end gap-2">
                      {m.role === "assistant" && (
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eef6f2]">
                          <Bot className="size-4 text-[#1d6b4f]" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm ${
                          m.role === "user"
                            ? "bg-[#1d6b4f] text-white rounded-br-none"
                            : "bg-[#f4f9f6] text-[#071811] rounded-bl-none border border-[#1d6b4f]/10"
                        }`}
                      >
                        <div className="prose prose-sm prose-emerald max-w-none leading-relaxed [&>p]:mb-3 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:ml-5 [&>ul]:mb-3 [&>ul>li]:mb-1 [&>ol]:list-decimal [&>ol]:ml-5 [&>ol]:mb-3 [&>ol>li]:mb-1 [&>strong]:font-semibold">
                          <ReactMarkdown>{getMessageText(m)}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[85%] items-end gap-2">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eef6f2]">
                        <Bot className="size-4 text-[#1d6b4f]" />
                      </div>
                      <div className="rounded-2xl rounded-bl-none border border-[#1d6b4f]/10 bg-[#f4f9f6] px-4 py-2.5 text-sm text-[#071811]">
                        <Loader2 className="size-4 animate-spin text-[#1d6b4f]/70" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 bg-white/50 p-4 backdrop-blur-sm">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-full border border-input bg-white pr-1 shadow-sm transition-colors focus-within:border-[#1d6b4f]/40 focus-within:ring-1 focus-within:ring-[#1d6b4f]/40"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about products..."
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/70"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="size-9 shrink-0 rounded-full bg-[#1d6b4f] text-white hover:bg-[#143421] disabled:opacity-50"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
