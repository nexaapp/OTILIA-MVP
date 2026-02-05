
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Image as ImageIcon, CheckCircle, RotateCcw } from 'lucide-react';
import { AppConfig, DEFAULT_TEMPLATE_BODA, DEFAULT_TEMPLATE_COMUNION, DEFAULT_TEMPLATE_INFANTIL } from '../types';
import { readFileAsText, readFileAsDataURL } from '../services/fileHelpers';

const Settings: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('otilia_config');
    return saved ? JSON.parse(saved) : { 
      logoUrl: null, 
      baseTemplateBoda: DEFAULT_TEMPLATE_BODA,
      baseTemplateComunion: DEFAULT_TEMPLATE_COMUNION,
      baseTemplateInfantil: DEFAULT_TEMPLATE_INFANTIL
    };
  });

  useEffect(() => {
    localStorage.setItem('otilia_config', JSON.stringify(config));
  }, [config]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await readFileAsDataURL(file);
      setConfig(prev => ({ ...prev, logoUrl: url }));
    }
  };

  const handleTemplateBodaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await readFileAsText(file);
      setConfig(prev => ({ ...prev, baseTemplateBoda: text }));
    }
  };

  const handleTemplateComunionUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await readFileAsText(file);
      setConfig(prev => ({ ...prev, baseTemplateComunion: text }));
    }
  };

  const handleTemplateInfantilUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await readFileAsText(file);
      setConfig(prev => ({ ...prev, baseTemplateInfantil: text }));
    }
  };

  const resetTemplates = () => {
    if (confirm("¿Estás seguro de que quieres restaurar las plantillas predeterminadas?")) {
      setConfig(prev => ({ 
        ...prev, 
        baseTemplateBoda: DEFAULT_TEMPLATE_BODA,
        baseTemplateComunion: DEFAULT_TEMPLATE_COMUNION,
        baseTemplateInfantil: DEFAULT_TEMPLATE_INFANTIL
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-otilia-main mb-2">Configuración del Asistente</h1>
        <p className="text-gray-600">Personaliza cómo OTILIA genera tus documentos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand Section */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="text-otilia-accent" />
            <h2 className="text-xl font-bold">Imagen de Marca</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">Sube tu logotipo (PNG/JPG) para que aparezca en el encabezado de todos tus contratos generados.</p>
          
          <div className="relative group">
            {config.logoUrl ? (
              <div className="mb-4 relative">
                <img src={config.logoUrl} alt="Logo Preview" className="h-32 object-contain rounded border border-gray-100 p-2" />
                <button 
                  onClick={() => setConfig(prev => ({ ...prev, logoUrl: null }))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full text-xs shadow-md"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-otilia-accent hover:bg-otilia-bg transition-all">
                <Upload className="text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-600">Subir Logotipo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </label>
            )}
          </div>
        </div>

        {/* Template Section */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-otilia-accent" />
            <h2 className="text-xl font-bold">Plantillas Base (.txt)</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">Personaliza el texto legal base para cada tipo de servicio.</p>
          
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Servicio Bodas</span>
              <label className="flex items-center gap-2 bg-otilia-bg px-4 py-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <Upload size={18} className="text-otilia-accent" />
                <span className="text-sm font-medium">Cargar plantilla Boda</span>
                <input type="file" accept=".txt" className="hidden" onChange={handleTemplateBodaUpload} />
              </label>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Servicio Comuniones</span>
              <label className="flex items-center gap-2 bg-otilia-bg px-4 py-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <Upload size={18} className="text-otilia-accent" />
                <span className="text-sm font-medium">Cargar plantilla Comunión</span>
                <input type="file" accept=".txt" className="hidden" onChange={handleTemplateComunionUpload} />
              </label>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Servicio Infantil &lt; 14 años</span>
              <label className="flex items-center gap-2 bg-otilia-bg px-4 py-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <Upload size={18} className="text-otilia-accent" />
                <span className="text-sm font-medium">Cargar plantilla Infantil</span>
                <input type="file" accept=".txt" className="hidden" onChange={handleTemplateInfantilUpload} />
              </label>
            </div>
            
            <button 
              onClick={resetTemplates}
              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors mt-2"
            >
              <RotateCcw size={18} />
              <span className="text-sm font-medium">Restaurar todas a original</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-otilia-accent/5 p-6 rounded-xl border border-otilia-accent/10">
        <h3 className="font-bold flex items-center gap-2 mb-2 text-otilia-accent">
          <CheckCircle size={18} />
          Consejo de Privacidad
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Especialmente en el contrato infantil, asegúrate de que los tutores legales firmen el documento. OTILIA integra los placeholders necesarios para que el documento resultante sea legalmente sólido desde el primer borrador.
        </p>
      </div>
    </div>
  );
};

export default Settings;
