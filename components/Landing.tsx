
import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel, Sparkles, Zap, Lock, ArrowRight, MessageSquareCode } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative bg-white pt-12 pb-10 md:pt-20 md:pb-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          {/* Main Logo Text */}
          <h1 className="text-6xl md:text-8xl font-serif text-otilia-main leading-none mb-4">
            Otil<span className="text-otilia-accent">ia</span>
          </h1>
          
          {/* Primary Tagline */}
          <h2 className="text-xl md:text-3xl font-light text-otilia-main mb-4 leading-tight">
            Rigor legal con alma <span className="serif-italic">creativa.</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto leading-relaxed font-semibold">
            La plataforma legal inteligente que protege tu trabajo sin complicarte la vida.
          </p>

          {/* Bloque de texto descriptivo agrupado y compacto */}
          <div className="mt-8 max-w-2xl mx-auto bg-otilia-bg/50 p-6 md:p-8 rounded-3xl border border-gray-100/50 animate-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-4 text-left md:text-center">
              <p className="text-base md:text-lg text-slate-500 leading-relaxed font-normal">
                <span className="font-bold text-slate-700">otilia</span> es una <span className="font-bold text-slate-700">plataforma legal</span> para <span className="font-bold text-slate-700">fotógrafos y videógrafos</span> que buscan <span className="font-bold text-slate-700">seguridad</span> sin renunciar a la <span className="font-bold text-slate-700">elegancia profesional</span>.
              </p>
              
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent w-full"></div>
              
              <p className="text-base md:text-lg text-slate-500 leading-relaxed font-normal">
                Estructuras revisadas por <span className="font-bold text-slate-700">especialistas del derecho audiovisual</span>. Responde unas preguntas y obtén tus <span className="font-bold text-slate-700">documentos listos para usar</span>.
              </p>
              
              <div className="pt-2 text-center">
                <p className="text-lg md:text-xl text-otilia-main font-extrabold tracking-tight italic">
                  Menos riesgos. Más control. Más creación.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/editor"
              className="group relative bg-otilia-main text-white px-8 py-3.5 rounded-full overflow-hidden transition-all hover:bg-black shadow-lg active:scale-95"
            >
              <span className="relative z-10 font-bold flex items-center gap-2">
                Empezar mi Contrato
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/asistente"
              className="group flex items-center gap-2 text-otilia-accent font-bold hover:text-otilia-main transition-all px-4 py-2 rounded-full bg-otilia-accent/5"
            >
              <MessageSquareCode size={20} />
              Asistente Otilia AI
            </Link>
          </div>
        </div>
        
        {/* Decorative background circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-[1px] border-otilia-accent/5 rounded-full -z-0 pointer-events-none"></div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 bg-otilia-bg border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            
            <Pillar 
              icon={<Gavel className="text-otilia-accent" size={20} />}
              title="Rigor Jurídico"
              text="Cláusulas claras y precisas, adaptadas a la legislación vigente y a la realidad del sector audiovisual."
            />

            <Pillar 
              icon={<Sparkles className="text-otilia-accent" size={20} />}
              title="Diseño Profesional"
              text="Contratos impecables, coherentes con tu marca y con tu logotipo integrado de forma limpia."
            />

            <Pillar 
              icon={<Zap className="text-otilia-accent" size={20} />}
              title="Asistente Legal IA"
              text="Resuelve dudas sobre leyes de imagen o protección de datos en tiempo real con nuestro copiloto especializado."
            />

            <Pillar 
              icon={<Lock className="text-otilia-accent" size={20} />}
              title="Privacidad Total"
              text="Tus datos no salen de tu navegador ni entrenan modelos de IA. Tu información es solo tuya."
            />

          </div>
        </div>
      </section>

      {/* Closing Quote */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-2xl md:text-3xl font-serif italic text-otilia-main leading-snug">
            "Donde el orden legal protege la libertad de crear."
          </p>
          <div className="mt-8 w-10 h-px bg-otilia-accent mx-auto"></div>
        </div>
      </section>
    </div>
  );
};

const Pillar: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-50">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-otilia-main tracking-tight">{title}</h3>
    </div>
    <p className="text-gray-500 leading-relaxed font-light text-base pl-1">
      {text}
    </p>
  </div>
);

export default Landing;
