
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Settings as SettingsIcon, PenSquare, Home } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/editor', label: 'Editor', icon: PenSquare },
    { path: '/config', label: 'Configuración', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-otilia-main">
              OTIL<span className="text-otilia-accent">IA</span>
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-otilia-accent' : 'text-otilia-main hover:text-otilia-accent'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-otilia-main text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">OTIL<span className="text-otilia-accent">IA</span></h3>
              <p className="text-gray-400 max-w-md">
                Rigor legal con alma creativa. Diseñado para que fotógrafos y videógrafos protejan su trabajo sin perder su esencia.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-sm">
              <div className="flex items-center gap-2 mb-3 text-otilia-accent font-semibold">
                <ShieldCheck size={20} />
                <span>Garantía de Privacidad</span>
              </div>
              <p className="text-gray-300">
                Tus datos no salen de tu navegador. OTILIA no almacena ni entrena modelos de IA con tu información personal o contractual.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-gray-500 gap-4">
            <p>© 2024 OTILIA. Todos los derechos reservados.</p>
            <p className="max-w-xl italic">
              Aviso Legal: Esta herramienta es de apoyo. Para casos de alta complejidad o litigios, se recomienda la supervisión de un letrado colegiado.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
