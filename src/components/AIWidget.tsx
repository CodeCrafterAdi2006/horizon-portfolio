import { useState, useRef, useEffect } from "react";
import { Terminal, Send, ArrowRight } from "lucide-react";
import { playUiSound } from "../utils/audio";

interface Message {
  sender: "user" | "system";
  text: string;
  isStreaming?: boolean;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  about: `ADITYA SINGH // CORE PROFILE:
--------------------------------
An aspiring AI Engineer & Automation Architect. Focuses on building autonomous agentic workflows, LLM applications, custom integrations, and clean web engineering layouts. Dedicated to bridging the gap between raw AI research models and production-ready code.`,
  
  skills: `TECHNICAL SPECIFICATIONS:
--------------------------------
* AI/ML: PyTorch, LangChain, TensorFlow, OpenCV, Prompt Design
* Web Development: React, TypeScript, Next.js, Node.js, Express, CSS
* Game Development: Pygame, Procedural Gen, Game Physics, Algorithms
* DevOps & Cloud: Docker, Kubernetes, AWS, GitHub Actions CI/CD`,

  projects: `SELECTED BUILDS:
--------------------------------
1. SHORTSFORGE: Autonomous short-form video assembly engine powered by Node.js, Express, and canvas rendering.
2. VELOX ECOSYSTEM: Web3 live analytics dashboard and transactional telemetry.
3. 1 LINE A DAY: Interactive digital journal with Pygame procedural generation features.`,

  contact: `COMMUNICATION PORTS:
--------------------------------
* Email: eragon4273@gmail.com
* GitHub: github.com/CodeCrafterAdi2006
* LinkedIn: linkedin.com/in/aditya-singh-0a5a9830b/
* Instagram: instagram.com/code_crafter2705/`,

  help: `ACTIVE DIRECTORY CHANNELS:
--------------------------------
Submit any of these terms to query the database:
> 'about'    - Bio & philosophy
> 'skills'   - Full technical stack
> 'projects' - Project descriptions
> 'contact'  - Secure communication links`
};

const SUGGESTIONS = ["about", "skills", "projects", "contact"];

export default function AIWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "system",
      text: "ADITYA OS AI Assistant online. Ask me about Aditya's skills, projects, or contact info. Type 'help' for directory."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const feedContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll internally (never scrolls the outer browser page)
  useEffect(() => {
    if (feedContainerRef.current) {
      feedContainerRef.current.scrollTop = feedContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const parseQuery = (rawQuery: string): string => {
    const q = rawQuery.toLowerCase().trim();
    
    if (/about|whoami|profile|bio|who is|aditya|singh|identify/.test(q)) {
      return KNOWLEDGE_BASE.about;
    }
    if (/skill|tech|stack|language|framework|python|react|typescript|node|code/.test(q)) {
      return KNOWLEDGE_BASE.skills;
    }
    if (/project|build|work|experience|shortsforge|pygame|velox|portfolio/.test(q)) {
      return KNOWLEDGE_BASE.projects;
    }
    if (/contact|email|hire|social|instagram|github|linkedin|reach/.test(q)) {
      return KNOWLEDGE_BASE.contact;
    }
    if (/help|menu|command|directory|option|what can/.test(q)) {
      return KNOWLEDGE_BASE.help;
    }
    
    // Default fallback response
    return `UNKNOWN QUERY: "${rawQuery}"\n--------------------------------\nNo matching record found in local core telemetry database. Type 'help' to review available query channels.`;
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    // Check for local console clear command
    if (textToSend.toLowerCase().trim() === "clear") {
      setMessages([]);
      setInput("");
      return;
    }

    // 1. Add User query message
    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    setInput("");
    setIsTyping(true);

    // 2. Simulate AI Telemetry Processing
    setTimeout(() => {
      const responseText = parseQuery(textToSend);
      
      // 3. Add Streaming/Typewriter Response Message
      setMessages((prev) => [
        ...prev,
        { sender: "system", text: "", isStreaming: true }
      ]);

      let currentText = "";
      let index = 0;
      
      // Fast typewriter speed (20ms per character to keep UI snappy but retro)
      const interval = setInterval(() => {
        if (index < responseText.length) {
          currentText += responseText[index];
          setMessages((prev) => {
            const updated = [...prev];
            const lastMsg = updated[updated.length - 1];
            if (lastMsg && lastMsg.isStreaming) {
              lastMsg.text = currentText;
            }
            return updated;
          });
          
          // Audio mechanical tick on every second character printed
          if (index % 2 === 0) {
            playUiSound("hover");
          }
          index++;
        } else {
          clearInterval(interval);
          setMessages((prev) => {
            const updated = [...prev];
            const lastMsg = updated[updated.length - 1];
            if (lastMsg) {
              lastMsg.isStreaming = false;
            }
            return updated;
          });
          setIsTyping(false);
        }
      }, 15);
    }, 600); // 600ms analysis lag to feel realistic
  };

  return (
    <div className="glass-panel p-6 flex flex-col h-[340px] gap-4">
      {/* Widget Header */}
      <div className="flex justify-between items-center border-b border-border-subtle pb-2">
        <div className="text-[10px] font-mono tracking-widest text-brand-dark uppercase flex items-center gap-1.5">
          <Terminal size={12} className="text-brand-accent animate-pulse" />
          <span>ai_assistant.exe</span>
        </div>
        <div className="text-[8px] font-mono text-brand-dark uppercase tracking-widest">
          Node: Core-L1
        </div>
      </div>

      {/* suggestion query chips */}
      <div className="flex flex-wrap gap-2 text-[8px] font-mono">
        {SUGGESTIONS.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => handleSend(term)}
            disabled={isTyping}
            className="px-2 py-1 bg-white/[0.02] border border-border-subtle hover:border-brand-accent hover:text-white text-brand-dark uppercase tracking-wider rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            [{term}]
          </button>
        ))}
      </div>

      {/* Message Feed Display */}
      <div 
        ref={feedContainerRef}
        className="flex-1 overflow-y-auto bg-black/30 border border-border-subtle/50 rounded p-3 font-mono text-[9px] flex flex-col gap-3 scrollbar-thin"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col gap-0.5 ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <span
              className={`text-[8px] uppercase tracking-widest font-semibold ${
                msg.sender === "user" ? "text-brand-accent" : "text-brand-dark"
              }`}
            >
              {msg.sender === "user" ? "Visitor" : "System"}
            </span>
            <div
              className={`p-2 rounded max-w-[85%] whitespace-pre-line leading-relaxed ${
                msg.sender === "user"
                  ? "bg-brand-accent/5 border border-brand-accent/20 text-white"
                  : "bg-white/[0.01] border border-border-subtle/30 text-brand-muted"
              }`}
            >
              {msg.text}
              {msg.isStreaming && (
                <span className="inline-block w-1.5 h-3 bg-brand-accent ml-0.5 animate-pulse" />
              )}
            </div>
          </div>
        ))}
        {isTyping && messages[messages.length - 1]?.sender === "user" && (
          <div className="flex flex-col gap-0.5 items-start">
            <span className="text-[8px] uppercase tracking-widest text-brand-dark font-semibold">
              System
            </span>
            <div className="p-2 bg-white/[0.01] border border-border-subtle/30 text-brand-accent font-bold animate-pulse">
              [ANALYZING TELEMETRY CORE...]
            </div>
          </div>
        )}
      </div>

      {/* Chat Form Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex gap-2 items-center border border-border-subtle rounded p-1 bg-black/20 focus-within:border-brand-accent/40 transition-all"
      >
        <span className="text-brand-accent font-bold pl-2 text-[10px]">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          placeholder="Ask skills, projects, contact..."
          className="flex-1 bg-transparent text-[10px] text-white placeholder-brand-dark/60 font-mono outline-none border-none py-1.5 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="p-1.5 bg-brand-accent/5 border border-brand-accent/20 text-brand-accent hover:bg-brand-accent hover:text-white rounded transition-all cursor-pointer disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-accent disabled:cursor-not-allowed"
        >
          <ArrowRight size={12} />
        </button>
      </form>
    </div>
  );
}
