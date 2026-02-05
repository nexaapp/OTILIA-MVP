
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, ShieldCheck, Scale, ExternalLink, RefreshCcw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { DEFAULT_TEMPLATE_BODA, DEFAULT_TEMPLATE_COMUNION, DEFAULT_TEMPLATE_INFANTIL } from '../types';

interface Message {
  role: 'user' | 'model';
  content: string;
  links?: { title: string; uri: string }[];
}

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      content: 'Hola, soy Otilia, tu asistente legal especializada. Puedo resolver dudas sobre tus contratos de bodas, comuniones o infantil, y sugerirte nuevas cláusulas. ¿En qué puedo ayudarte hoy?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `Eres "Otilia", una asistente legal experta para fotógrafos y videógrafos en España.
      Tu objetivo es resolver dudas legales sobre contratos de eventos (bodas, comuniones e infantil) y sugerir mejoras.
      
      PLANTILLA BODA: ${DEFAULT_TEMPLATE_BODA.substring(0, 500)}...
      PLANTILLA COMUNION: ${DEFAULT_TEMPLATE_COMUNION.substring(0, 500)}...
      PLANTILLA INFANTIL: ${DEFAULT_TEMPLATE_INFANTIL.substring(0, 500)}...
      
      REGLAS:
      1. No sugieras cláusulas redundantes.
      2. Lenguaje profesional y elegante.
      3. Proporciona cláusulas listas para copiar con placeholders como {{EJEMPLO}}.
      4. Cita leyes españolas si es posible (propiedad intelectual, protección de datos).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: messages.concat({ role: 'user', content: userMsg }).map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "Lo siento, no he podido procesar tu solicitud.";
      const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || 'Fuente externa',
        uri: chunk.web?.uri
      })).filter((l: any) => l.uri);

      setMessages(prev => [...prev, { role: 'model', content: text, links }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "Lo siento, he tenido un error de conexión. ¿Podrías intentar de nuevo?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    "¿Uso de Drones?",
    "¿Fotos de menores en web?",
    "Cláusula confidencialidad",
    "Retraso en pagos"
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 md:py-8 h-[calc(100vh-80px)] md:h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-otilia-main flex items-center gap-2">
            <Bot className="text-otilia-accent" size={24} />
            Otilia AI
          </h1>
          <p className="text-gray-500 text-xs md:text-sm font-medium">Copiloto legal audiovisual.</p>
        </div>
        <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-otilia-accent bg-otilia-accent/5 px-3 py-1.5 rounded-full uppercase tracking-widest border border-otilia-accent/10 w-fit">
          <Scale size={12} />
          Normativa España Actualizada
        </div>
      </div>

      <div className="flex-grow bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mb-4 min-h-0">
        <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in`}>
              <div className={`flex gap-2 md:gap-3 max-w-[90%] md:max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-otilia-main' : 'bg-otilia-accent'}`}>
                  {m.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                </div>
                <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${m.role === 'user' ? 'bg-otilia-bg text-otilia-main border border-gray-100 rounded-tr-none' : 'bg-white border border-gray-100 text-otilia-main shadow-sm rounded-tl-none'}`}>
                  <div className="whitespace-pre-wrap">{m.content}</div>
                  {m.links && m.links.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-50 space-y-2">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Fuentes:</p>
                      <div className="flex flex-wrap gap-2">
                        {m.links.map((link, li) => (
                          <a key={li} href={link.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-otilia-accent hover:underline bg-otilia-accent/5 px-2 py-1 rounded">
                            <ExternalLink size={10} />
                            {link.title.substring(0, 20)}...
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-otilia-accent/20" />
                <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-400">Otilia está analizando leyes...</div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-3 md:p-4 border-t border-gray-100 bg-otilia-bg/30">
          <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar whitespace-nowrap">
            {quickActions.map(action => (
              <button 
                key={action}
                onClick={() => { setInput(action); }}
                className="text-[10px] md:text-[11px] font-bold bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-600 hover:border-otilia-accent transition-all"
              >
                {action}
              </button>
            ))}
          </div>
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Duda legal o cláusula..."
              className="w-full bg-white border border-gray-200 rounded-2xl pl-5 pr-14 py-3.5 text-sm outline-none focus:ring-2 focus:ring-otilia-accent/50 shadow-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 bg-otilia-main text-white px-4 rounded-xl hover:bg-black transition-all disabled:opacity-30"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 md:gap-8 text-[10px] text-gray-400 font-medium">
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-green-500" />
          Encriptación Local
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-otilia-accent" />
          Rigor Jurídico AI
        </span>
      </div>
    </div>
  );
};

export default Assistant;
