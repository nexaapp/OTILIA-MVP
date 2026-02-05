
import { ContractData } from '../types';

// Helper to read a File as a plain text string
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

// Helper to read a File as a base64 Data URL
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const replacePlaceholders = (template: string, data: ContractData): string => {
  let result = template;
  
  // 1. Servicios Principales
  let serviciosPrincipalesArr = [];
  if (data.incluyeFoto) serviciosPrincipalesArr.push('   *  Cobertura de Fotografía.');
  if (data.incluyeVideo) serviciosPrincipalesArr.push('   *  Cobertura de Videografía.');
  let serviciosPrincipales = serviciosPrincipalesArr.join('\n');
  
  // 2. Detalle de Profesionales
  let detalleProfesionalesArr = [];
  if (data.incluyeFoto) detalleProfesionalesArr.push(`${data.numFotografos} fotógrafo(s)`);
  if (data.incluyeVideo) detalleProfesionalesArr.push(`${data.numVideografos} videógrafo(s)`);
  let detalleProfesionales = detalleProfesionalesArr.join(' y ');

  // 3. Servicios Extras
  let serviciosExtrasArr: string[] = [];
  if (data.tipoContrato === 'boda') {
    if (data.extraPreboda) serviciosExtrasArr.push('   * Sesión Pre-boda.');
    if (data.extraPostboda) serviciosExtrasArr.push('   * Sesión Post-boda.');
    if (data.extraAlbum) serviciosExtrasArr.push('   * Álbum fotográfico.');
    if (data.extraOtros) serviciosExtrasArr.push(`   * Otros: ${data.extraOtros}.`);
  } else {
    // Comunion e Infantil comparten estos campos
    if (data.extraCopias) serviciosExtrasArr.push(`   * Copias impresas adicionales: ${data.extraCopias}`);
    if (data.extraOtrosComunion) serviciosExtrasArr.push(`   * Otros: ${data.extraOtrosComunion}`);
  }
  
  let serviciosExtras = serviciosExtrasArr.length > 0 
    ? serviciosExtrasArr.join('\n') 
    : '   * No se han contratado servicios extra.';

  // 4. Detalle de Entrega
  let detalleEntregaArr = [];
  if (data.formatoGaleria) detalleEntregaArr.push(`   * Galería online privada con acceso mediante contraseña.`);
  if (data.formatoUSB) detalleEntregaArr.push(`   * USB/Pendrive con los archivos en alta resolución.`);
  if (data.formatoAlbum) detalleEntregaArr.push(`   * Álbum físico.`);
  if (data.formatoOtros) detalleEntregaArr.push(`   * Otros: ${data.formatoOtros}.`);
  
  let detalleEntrega = detalleEntregaArr.length > 0 ? detalleEntregaArr.join('\n') : '';
  if (data.entregaVideoDesc && data.incluyeVideo) {
    detalleEntrega += `\n   * Vídeo: ${data.entregaVideoDesc}`;
  }

  // 5. Autorización de Imagen
  let autorizacionImagen = '';
  if (data.tipoContrato === 'boda') {
    autorizacionImagen += `* [${data.autorizaImagen ? 'X' : ' '}] SÍ, AUTORIZAN a EL/LA PROFESIONAL a utilizar una selección de las imágenes del reportaje para los fines promocionales descritos.\n`;
    autorizacionImagen += `* [${!data.autorizaImagen ? 'X' : ' '}] NO, AUTORIZAN a EL/LA PROFESIONAL a utilizar las imágenes del reportaje para ningún fin promocional.`;
  } else if (data.tipoContrato === 'comunion') {
    autorizacionImagen += `* [${data.autorizaImagen ? 'X' : ' '}] SÍ AUTORIZO a EL PROFESIONAL a utilizar las fotografías y/o vídeos del menor y de los contratantes para fines de promoción de su trabajo.\n`;
    autorizacionImagen += `* [${!data.autorizaImagen ? 'X' : ' '}] NO AUTORIZO a EL PROFESIONAL a utilizar las fotografías y/o vídeos del menor y de los contratantes para fines de promoción.`;
  } else {
    // Infantil - Mención específica a la Ley de Protección del Menor
    autorizacionImagen += `* [${data.autorizaImagen ? 'X' : ' '}] SÍ AUTORIZAMOS, como tutores legales, el uso promocional de la imagen del menor en portafolios y redes sociales profesionales.\n`;
    autorizacionImagen += `* [${!data.autorizaImagen ? 'X' : ' '}] NO AUTORIZAMOS el uso promocional de la imagen del menor, limitando su uso exclusivamente a la entrega privada del reportaje.`;
  }

  // 6. Fecha de firma elegante
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const d = data.fechaFirma ? new Date(data.fechaFirma) : new Date();
  const fechaFirmaDetalle = `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;

  // 7. Mapeo final unificado
  const mapping: Record<string, string> = {
    // Profesional
    '{{NOMBRE_FOTOGRAFO}}': data.nombreFotografo,
    '{{NIF_FOTOGRAFO}}': data.nifFotografo,
    '{{EMAIL_FOTOGRAFO}}': data.emailFotografo,
    '{{TEL_FOTOGRAFO}}': data.telFotografo,
    '{{DIRECCION_FOTOGRAFO}}': data.direccionFotografo,
    '{{CUENTA_BANCARIA}}': data.cuentaBancaria,
    '{{TITULAR_CUENTA}}': data.titularCuenta,
    '{{BANCO}}': data.banco,
    
    // Boda - Clientes
    '{{NOMBRE_CLIENTE_1}}': data.nombreCliente1,
    '{{NIF_CLIENTE_1}}': data.nifCliente1,
    '{{EMAIL_CLIENTE_1}}': data.emailCliente1,
    '{{TEL_CLIENTE_1}}': data.telCliente1,
    '{{NOMBRE_CLIENTE_2}}': data.nombreCliente2,
    '{{NIF_CLIENTE_2}}': data.nifCliente2,
    '{{EMAIL_CLIENTE_2}}': data.emailCliente2,
    '{{TEL_CLIENTE_2}}': data.telCliente2,
    
    // Comunion / Infantil - Tutores
    '{{NOMBRE_TUTOR_1}}': data.nombreTutor1,
    '{{NIF_TUTOR_1}}': data.nifTutor1,
    '{{EMAIL_TUTOR_1}}': data.emailTutor1,
    '{{TEL_TUTOR_1}}': data.telTutor1,
    '{{NOMBRE_TUTOR_2}}': data.nombreTutor2,
    '{{NIF_TUTOR_2}}': data.nifTutor2,
    '{{EMAIL_TUTOR_2}}': data.emailTutor2,
    '{{TEL_TUTOR_2}}': data.telTutor2,
    '{{NOMBRE_MENOR}}': data.nombreMenor,

    // Eventos
    '{{FECHA_BODA}}': data.fechaBoda,
    '{{LUGAR_CEREMONIA}}': data.lugarCeremonia,
    '{{LUGAR_CONVITE}}': data.lugarConvite,
    '{{FECHA_COMUNION}}': data.fechaComunion,
    '{{HORA_INICIO}}': data.horaInicio,
    '{{HORA_FIN}}': data.horaFin,
    '{{DURACION_SESION}}': data.duracionSesion,
    '{{LUGAR_SESION}}': data.lugarSesion,

    // Servicios
    '{{SERVICIOS_PRINCIPALES}}': serviciosPrincipales,
    '{{DETALLE_PROFESIONALES}}': detalleProfesionales,
    '{{HORAS_SERVICIO}}': data.horasServicio,
    '{{SERVICIOS_EXTRAS}}': serviciosExtras,
    '{{DETALLE_ENTREGA}}': detalleEntrega,
    '{{PLAZO_ENTREGA}}': data.plazoEntrega,

    // Economía
    '{{PRECIO_TOTAL}}': data.precioTotal,
    '{{PRECIO_TOTAL_LETRA}}': data.precioTotalLetra,
    '{{PRECIO_CIFRA}}': data.precioTotal,
    '{{RESERVA}}': data.reserva,
    '{{RESERVA_CIFRA}}': data.reserva,
    '{{FINAL_CIFRA}}': data.importeFinal,
    '{{IMPORTE_FINAL}}': data.importeFinal,
    '{{PAGOS_INTERMEDIOS}}': data.pagosIntermedios,

    // Cierre
    '{{AUTORIZACION_IMAGEN}}': autorizacionImagen,
    '{{LUGAR_FIRMA}}': data.lugarFirma,
    '{{FECHA_FIRMA_DETALLE}}': fechaFirmaDetalle,
  };

  Object.entries(mapping).forEach(([placeholder, value]) => {
    const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    result = result.replace(regex, value || `[${placeholder.replace('{{','').replace('}}','')}]`);
  });

  return result;
};
