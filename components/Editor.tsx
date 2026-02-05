
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Users, Calendar, Camera, 
  CreditCard, Truck, FileCheck, 
  FileDown, Sparkles, MessageSquareCode,
  ShieldCheck, ChevronRight, ChevronLeft
} from 'lucide-react';
import { ContractData, INITIAL_CONTRACT_DATA, AppConfig, DEFAULT_TEMPLATE_BODA, DEFAULT_TEMPLATE_COMUNION, DEFAULT_TEMPLATE_INFANTIL } from '../types';
import { replacePlaceholders } from '../services/fileHelpers';
import { generateContractPDF } from '../services/pdfService';

const Editor: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState<ContractData>(() => {
    const saved = localStorage.getItem('otilia_editor_data');
    return saved ? JSON.parse(saved) : INITIAL_CONTRACT_DATA;
  });

  const [config] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('otilia_config');
    const base = saved ? JSON.parse(saved) : { 
      logoUrl: null, 
      baseTemplateBoda: DEFAULT_TEMPLATE_BODA,
      baseTemplateComunion: DEFAULT_TEMPLATE_COMUNION,
      baseTemplateInfantil: DEFAULT_TEMPLATE_INFANTIL
    };
    return base;
  });

  const [preview, setPreview] = useState('');

  useEffect(() => {
    localStorage.setItem('otilia_editor_data', JSON.stringify(data));
    let currentTemplate = config.baseTemplateBoda;
    if (data.tipoContrato === 'comunion') currentTemplate = config.baseTemplateComunion;
    if (data.tipoContrato === 'infantil') currentTemplate = config.baseTemplateInfantil;
    
    setPreview(replacePlaceholders(currentTemplate, data));
  }, [data, config]);

  const updateData = (field: keyof ContractData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const getTabs = () => {
    let labelCliente = 'Pareja';
    let labelEvento = 'Boda';
    if (data.tipoContrato === 'comunion') {
      labelCliente = 'Tutores';
      labelEvento = 'Comunión';
    } else if (data.tipoContrato === 'infantil') {
      labelCliente = 'Tutores';
      labelEvento = 'Sesión';
    }

    return [
      { id: 'profesional', label: 'Profesional', icon: User },
      { id: 'cliente', label: labelCliente, icon: Users },
      { id: 'evento', label: labelEvento, icon: Calendar },
      { id: 'servicios', label: 'Servicios', icon: Camera },
      { id: 'extras', label: 'Extras', icon: Sparkles },
      { id: 'economica', label: 'Económica', icon: CreditCard },
      { id: 'entrega', label: 'Entrega', icon: Truck },
      { id: 'clausulas', label: 'Firma', icon: FileCheck },
    ];
  };

  const tabs = getTabs();

  const handleExport = () => {
    let name = 'Documento';
    if (data.tipoContrato === 'boda') name = data.nombreCliente1 || 'Boda';
    else if (data.tipoContrato === 'comunion' || data.tipoContrato === 'infantil') name = data.nombreMenor || 'Sesion';
    
    generateContractPDF(preview, config.logoUrl, `Contrato_${name}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 relative min-h-screen">
      
      {/* Botón Flotante Asistente AI */}
      <Link 
        to="/asistente"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-3 bg-otilia-accent text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 hover:bg-otilia-main transition-all duration-300 group"
      >
        <MessageSquareCode size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm pr-1">
          Duda Legal
        </span>
      </Link>

      {/* Selector de Tipo de Contrato - Responsivo */}
      <div className="flex justify-start md:justify-center mb-6 md:mb-10 overflow-x-auto no-scrollbar pb-2">
        <div className="bg-white border border-gray-200 p-1 rounded-2xl flex gap-1 shadow-sm whitespace-nowrap">
          <button 
            onClick={() => updateData('tipoContrato', 'boda')}
            className={`px-5 md:px-8 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${data.tipoContrato === 'boda' ? 'bg-otilia-main text-white shadow-md' : 'text-gray-500 hover:text-otilia-main'}`}
          >
            Bodas
          </button>
          <button 
            onClick={() => updateData('tipoContrato', 'comunion')}
            className={`px-5 md:px-8 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${data.tipoContrato === 'comunion' ? 'bg-otilia-main text-white shadow-md' : 'text-gray-500 hover:text-otilia-main'}`}
          >
            Comuniones
          </button>
          <button 
            onClick={() => updateData('tipoContrato', 'infantil')}
            className={`px-5 md:px-8 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${data.tipoContrato === 'infantil' ? 'bg-otilia-main text-white shadow-md' : 'text-gray-500 hover:text-otilia-main'}`}
          >
            Infantil &lt; 14 años
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-12">
        {/* Columna del Formulario */}
        <div className="flex-1 w-full order-2 lg:order-1">
          <div className="mb-6 hidden md:block">
            <h1 className="text-3xl font-serif text-otilia-main mb-1">Editor de Contrato</h1>
            <p className="text-gray-500 text-sm">Protege tu trabajo con rigor y elegancia.</p>
          </div>

          {/* Tabs Scrollables */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] md:text-xs font-bold transition-all border whitespace-nowrap flex-shrink-0 ${
                    isActive 
                      ? 'bg-otilia-main text-white border-otilia-main shadow-md scale-105' 
                      : 'bg-white text-gray-500 border-gray-200 hover:border-otilia-accent hover:text-otilia-accent shadow-sm'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="bg-white p-5 md:p-10 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 min-h-[450px]">
            
            {activeTab === 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-lg font-bold border-b border-gray-50 pb-3">Datos del Profesional</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <Input label="Nombre o Razón Social" value={data.nombreFotografo} onChange={(v) => updateData('nombreFotografo', v)} />
                  <Input label="NIF / CIF" value={data.nifFotografo} onChange={(v) => updateData('nifFotografo', v)} />
                  <Input label="Email" value={data.emailFotografo} onChange={(v) => updateData('emailFotografo', v)} />
                  <Input label="Teléfono" value={data.telFotografo} onChange={(v) => updateData('telFotografo', v)} />
                  <div className="md:col-span-2">
                    <Input label="Dirección Legal" value={data.direccionFotografo} onChange={(v) => updateData('direccionFotografo', v)} />
                  </div>
                  <Input label="IBAN" value={data.cuentaBancaria} onChange={(v) => updateData('cuentaBancaria', v)} />
                  <Input label="Titular" value={data.titularCuenta} onChange={(v) => updateData('titularCuenta', v)} />
                  <Input label="Banco" value={data.banco} onChange={(v) => updateData('banco', v)} />
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                {data.tipoContrato === 'boda' ? (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold border-b border-gray-50 pb-2">Contratante 1</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Nombre" value={data.nombreCliente1} onChange={(v) => updateData('nombreCliente1', v)} />
                        <Input label="NIF" value={data.nifCliente1} onChange={(v) => updateData('nifCliente1', v)} />
                        <Input label="Email" value={data.emailCliente1} onChange={(v) => updateData('emailCliente1', v)} />
                        <Input label="Teléfono" value={data.telCliente1} onChange={(v) => updateData('telCliente1', v)} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold border-b border-gray-50 pb-2">Contratante 2</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Nombre" value={data.nombreCliente2} onChange={(v) => updateData('nombreCliente2', v)} />
                        <Input label="NIF" value={data.nifCliente2} onChange={(v) => updateData('nifCliente2', v)} />
                        <Input label="Email" value={data.emailCliente2} onChange={(v) => updateData('emailCliente2', v)} />
                        <Input label="Teléfono" value={data.telCliente2} onChange={(v) => updateData('telCliente2', v)} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold border-b border-gray-50 pb-2">Tutor 1</h3>
                      <Input label="Nombre" value={data.nombreTutor1} onChange={(v) => updateData('nombreTutor1', v)} />
                      <Input label="NIF" value={data.nifTutor1} onChange={(v) => updateData('nifTutor1', v)} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold border-b border-gray-50 pb-2">Tutor 2</h3>
                      <Input label="Nombre" value={data.nombreTutor2} onChange={(v) => updateData('nombreTutor2', v)} />
                      <Input label="NIF" value={data.nifTutor2} onChange={(v) => updateData('nifTutor2', v)} />
                    </div>
                    <div className="md:col-span-2 pt-4 border-t border-gray-50">
                      <Input label="Nombre del Menor" value={data.nombreMenor} onChange={(v) => updateData('nombreMenor', v)} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-lg font-bold mb-4 border-b border-gray-50 pb-2">Logística</h3>
                {data.tipoContrato === 'boda' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Fecha" type="date" value={data.fechaBoda} onChange={(v) => updateData('fechaBoda', v)} />
                    <Input label="Ceremonia" value={data.lugarCeremonia} onChange={(v) => updateData('lugarCeremonia', v)} />
                    <Input label="Convite" value={data.lugarConvite} onChange={(v) => updateData('lugarConvite', v)} />
                    <Input label="Tipo Evento" value={data.tipoEvento} onChange={(v) => updateData('tipoEvento', v)} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Fecha Sesión" type="date" value={data.fechaComunion} onChange={(v) => updateData('fechaComunion', v)} />
                    <Input label="Lugar exacto" value={data.lugarSesion} onChange={(v) => updateData('lugarSesion', v)} />
                    <Input label="Inicio" type="time" value={data.horaInicio} onChange={(v) => updateData('horaInicio', v)} />
                    <Input label="Fin" type="time" value={data.horaFin} onChange={(v) => updateData('horaFin', v)} />
                  </div>
                )}
              </div>
            )}

            {activeTab === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-lg font-bold mb-4 border-b border-gray-50 pb-2">Servicios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Checkbox label="Fotografía" checked={data.incluyeFoto} onChange={(v) => updateData('incluyeFoto', v)} />
                  <Checkbox label="Vídeo" checked={data.incluyeVideo} onChange={(v) => updateData('incluyeVideo', v)} />
                  <div className="md:col-span-2 pt-4 border-t border-gray-50">
                    <Input label="Horas Cobertura" value={data.horasServicio} onChange={(v) => updateData('horasServicio', v)} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-lg font-bold mb-4 border-b border-gray-50 pb-2">Extras</h3>
                {data.tipoContrato === 'boda' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Checkbox label="Sesión Pre-boda" checked={data.extraPreboda} onChange={(v) => updateData('extraPreboda', v)} />
                    <Checkbox label="Sesión Post-boda" checked={data.extraPostboda} onChange={(v) => updateData('extraPostboda', v)} />
                    <Checkbox label="Diseño Álbum" checked={data.extraAlbum} onChange={(v) => updateData('extraAlbum', v)} />
                    <div className="md:col-span-2">
                      <Input label="Otros extras" value={data.extraOtros} onChange={(v) => updateData('extraOtros', v)} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    <Input label="Copias impresas" value={data.extraCopias} onChange={(v) => updateData('extraCopias', v)} />
                    <Input label="Otros extras" value={data.extraOtrosComunion} onChange={(v) => updateData('extraOtrosComunion', v)} />
                  </div>
                )}
              </div>
            )}

            {activeTab === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-lg font-bold mb-4 border-b border-gray-50 pb-2">Económica</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Importe Total Bruto (€)" value={data.precioTotal} onChange={(v) => updateData('precioTotal', v)} />
                  <Input label="Importe en Letra" value={data.precioTotalLetra} onChange={(v) => updateData('precioTotalLetra', v)} />
                  <Input label="Reserva (€)" value={data.reserva} onChange={(v) => updateData('reserva', v)} />
                  <Input label="Pago Final (€)" value={data.importeFinal} onChange={(v) => updateData('importeFinal', v)} />
                </div>
              </div>
            )}

            {activeTab === 6 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-lg font-bold mb-4 border-b border-gray-50 pb-2">Entrega</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Checkbox label="Galería Online" checked={data.formatoGaleria} onChange={(v) => updateData('formatoGaleria', v)} />
                  <Checkbox label="USB Físico" checked={data.formatoUSB} onChange={(v) => updateData('formatoUSB', v)} />
                  <Checkbox label="Álbum" checked={data.formatoAlbum} onChange={(v) => updateData('formatoAlbum', v)} />
                  <Input label="Plazo Entrega" value={data.plazoEntrega} onChange={(v) => updateData('plazoEntrega', v)} />
                </div>
              </div>
            )}

            {activeTab === 7 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-lg font-bold mb-4 border-b border-gray-50 pb-2">Firma y Derechos</h3>
                <div className="bg-otilia-bg/80 p-6 rounded-2xl border border-otilia-accent/10">
                  <h4 className="font-bold text-otilia-main mb-4 flex items-center gap-2 text-sm">
                    <ShieldCheck className="text-otilia-accent" size={16} />
                    Uso de Imagen Promocional
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" checked={data.autorizaImagen} onChange={() => updateData('autorizaImagen', true)} className="mt-1 w-5 h-5 accent-otilia-accent" />
                      <span className="text-xs md:text-sm font-bold">CONCEDER AUTORIZACIÓN</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" checked={!data.autorizaImagen} onChange={() => updateData('autorizaImagen', false)} className="mt-1 w-5 h-5 accent-otilia-accent" />
                      <span className="text-xs md:text-sm font-bold">DENEGAR AUTORIZACIÓN</span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Ciudad de la Firma" value={data.lugarFirma} onChange={(v) => updateData('lugarFirma', v)} />
                  <Input label="Fecha de la Firma" type="date" value={data.fechaFirma} onChange={(v) => updateData('fechaFirma', v)} />
                </div>
                <div className="pt-6">
                  <button 
                    onClick={handleExport}
                    className="w-full flex items-center justify-center gap-4 bg-otilia-main text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl active:scale-95"
                  >
                    <FileDown size={22} />
                    Exportar PDF
                  </button>
                </div>
              </div>
            )}

            {/* Navegación Inferior */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
              <button 
                onClick={() => setActiveTab(prev => Math.max(0, prev - 1))}
                disabled={activeTab === 0}
                className="flex items-center gap-1 text-otilia-main font-bold disabled:opacity-20 text-xs md:text-sm"
              >
                <ChevronLeft size={18} />
                Atrás
              </button>
              <div className="hidden sm:flex gap-1.5">
                {tabs.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${activeTab === i ? 'w-8 bg-otilia-accent' : 'w-2 bg-gray-200'}`} />
                ))}
              </div>
              <button 
                onClick={() => setActiveTab(prev => Math.min(tabs.length - 1, prev + 1))}
                disabled={activeTab === tabs.length - 1}
                className="flex items-center gap-1 text-otilia-accent font-bold disabled:opacity-20 text-xs md:text-sm"
              >
                Siguiente
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Columna de Previsualización */}
        <div className="lg:w-96 xl:w-[450px] w-full order-1 lg:order-2">
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold flex items-center gap-2 text-otilia-main uppercase tracking-widest">
                <FileCheck size={18} className="text-otilia-accent" />
                Borrador
              </h2>
              <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">LIVE SYNC</span>
            </div>
            <div className="bg-[#1e1e1e] border border-gray-800 rounded-3xl p-5 md:p-8 h-[250px] lg:h-[650px] overflow-y-auto shadow-2xl text-[10px] md:text-[11px] leading-relaxed font-mono whitespace-pre-wrap text-gray-300 custom-scrollbar">
              {preview}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const Input: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-otilia-accent/20 focus:border-otilia-accent transition-all text-sm font-medium w-full"
    />
  </div>
);

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, checked, onChange }) => (
  <label className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group shadow-sm w-full ${checked ? 'bg-otilia-accent/5 border-otilia-accent/40' : 'bg-white border-gray-100'}`}>
    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${checked ? 'bg-otilia-accent border-otilia-accent text-white' : 'bg-white border-gray-300'}`}>
      {checked && <FileCheck size={12} />}
    </div>
    <span className={`text-xs md:text-sm font-bold ${checked ? 'text-otilia-main' : 'text-gray-500'}`}>{label}</span>
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={(e) => onChange(e.target.checked)} 
      className="hidden"
    />
  </label>
);

export default Editor;
