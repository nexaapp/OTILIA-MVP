
export type ContractType = 'boda' | 'comunion' | 'infantil';

export interface ContractData {
  tipoContrato: ContractType;
  
  // 1. Profesional (Compartido)
  nombreFotografo: string;
  nifFotografo: string;
  emailFotografo: string;
  direccionFotografo: string;
  telFotografo: string;
  cuentaBancaria: string;
  titularCuenta: string;
  banco: string;

  // 2. Clientes / Tutores
  // Boda
  nombreCliente1: string;
  nifCliente1: string;
  emailCliente1: string;
  telCliente1: string;
  nombreCliente2: string;
  nifCliente2: string;
  emailCliente2: string;
  telCliente2: string;
  // Comunión e Infantil
  nombreTutor1: string;
  nifTutor1: string;
  emailTutor1: string;
  telTutor1: string;
  nombreTutor2: string;
  nifTutor2: string;
  emailTutor2: string;
  telTutor2: string;
  nombreMenor: string;

  // 3. Evento
  fechaBoda: string;
  lugarCeremonia: string;
  lugarConvite: string;
  tipoEvento: string;
  // Comunión e Infantil
  fechaComunion: string; // Usado genéricamente para fecha de sesión en Infantil
  horaInicio: string;
  horaFin: string;
  duracionSesion: string;
  lugarSesion: string;

  // 4. Servicios Principales
  incluyeFoto: boolean;
  incluyeVideo: boolean;
  numFotografos: string;
  numVideografos: string;
  horasServicio: string;

  // 5. Servicios Extras
  // Boda
  extraPreboda: boolean;
  extraPostboda: boolean;
  extraAlbum: boolean;
  extraOtros: string;
  // Comunión e Infantil
  extraCopias: string;
  extraOtrosComunion: string;

  // 6. Económica
  precioTotal: string;
  precioTotalLetra: string;
  reserva: string;
  pagosIntermedios: string;
  importeFinal: string;

  // 7. Entrega
  entregaFotosNum: string;
  entregaVideoDesc: string;
  plazoEntrega: string;
  formatoGaleria: boolean;
  formatoUSB: boolean;
  formatoAlbum: boolean;
  formatoOtros: string;

  // 8. Autorización y Cierre
  autorizaImagen: boolean;
  clausulasEspeciales: string;
  lugarFirma: string;
  fechaFirma: string;
}

export interface AppConfig {
  logoUrl: string | null;
  baseTemplateBoda: string;
  baseTemplateComunion: string;
  baseTemplateInfantil: string;
}

export const INITIAL_CONTRACT_DATA: ContractData = {
  tipoContrato: 'boda',
  nombreFotografo: '',
  nifFotografo: '',
  emailFotografo: '',
  direccionFotografo: '',
  telFotografo: '',
  cuentaBancaria: '',
  titularCuenta: '',
  banco: '',
  
  nombreCliente1: '',
  nifCliente1: '',
  emailCliente1: '',
  telCliente1: '',
  nombreCliente2: '',
  nifCliente2: '',
  emailCliente2: '',
  telCliente2: '',
  
  nombreTutor1: '',
  nifTutor1: '',
  emailTutor1: '',
  telTutor1: '',
  nombreTutor2: '',
  nifTutor2: '',
  emailTutor2: '',
  telTutor2: '',
  nombreMenor: '',

  fechaBoda: '',
  lugarCeremonia: '',
  lugarConvite: '',
  tipoEvento: 'Boda',
  
  fechaComunion: '',
  horaInicio: '',
  horaFin: '',
  duracionSesion: '',
  lugarSesion: '',

  incluyeFoto: true,
  incluyeVideo: false,
  numFotografos: '1',
  numVideografos: '0',
  horasServicio: '10',
  
  extraPreboda: false,
  extraPostboda: false,
  extraAlbum: false,
  extraOtros: '',
  
  extraCopias: '',
  extraOtrosComunion: '',

  precioTotal: '',
  precioTotalLetra: '',
  reserva: '',
  pagosIntermedios: 'No se contemplan pagos intermedios.',
  importeFinal: '',
  
  entregaFotosNum: '600',
  entregaVideoDesc: 'Un vídeo resumen de 3-5 minutos y un vídeo documental de 20-25 minutos',
  plazoEntrega: '3 meses',
  formatoGaleria: true,
  formatoUSB: false,
  formatoAlbum: false,
  formatoOtros: '',

  autorizaImagen: true,
  clausulasEspeciales: '',
  lugarFirma: '',
  fechaFirma: new Date().toISOString().split('T')[0]
};

export const DEFAULT_TEMPLATE_BODA = `CONTRATO DE PRESTACIÓN DE SERVICIOS FOTOGRÁFICOS Y/O VIDEOGRÁFICOS PARA BODA

En {{LUGAR_FIRMA}}, a {{FECHA_FIRMA_DETALLE}}.

REUNIDOS

DE UNA PARTE,
D./Dña. {{NOMBRE_FOTOGRAFO}}, mayor de edad, con DNI/NIF nº {{NIF_FOTOGRAFO}}, en adelante EL/LA PROFESIONAL.

Y DE OTRA PARTE,
D./Dña. {{NOMBRE_CLIENTE_1}}, con DNI nº {{NIF_CLIENTE_1}}, correo electrónico {{EMAIL_CLIENTE_1}} y teléfono {{TEL_CLIENTE_1}}.
D./Dña. {{NOMBRE_CLIENTE_2}}, con DNI nº {{NIF_CLIENTE_2}}, correo electrónico {{EMAIL_CLIENTE_2}} y teléfono {{TEL_CLIENTE_2}}.

En adelante, conjuntamente denominados LOS CONTRATANTES.

Ambas partes se reconocen mutuamente la capacidad legal necesaria para suscribir el presente contrato y, a tal efecto,

EXPONEN

I. Que EL/LA PROFESIONAL se dedica a la prestación de servicios de fotografía y/o videografía de eventos, contando con la experiencia y el equipo técnico necesarios para ello.

II. Que LOS CONTRATANTES están interesados en contratar los servicios de EL/LA PROFESIONAL para la cobertura de su boda, que tendrá lugar en las siguientes coordenadas:
* Fecha de la boda: {{FECHA_BODA}}
* Lugar y hora de la ceremonia: {{LUGAR_CEREMONIA}}
* Lugar y hora del convite: {{LUGAR_CONVITE}}

III. Que ambas partes han acordado formalizar el presente contrato de prestación de servicios, que se regirá por las siguientes,

CLÁUSULAS

PRIMERA.- OBJETO DEL CONTRATO
EL/LA PROFESIONAL se compromete a realizar la cobertura del evento nupcial de LOS CONTRATANTES, de acuerdo con los servicios que se detallan a continuación:
* Servicio principal:
{{SERVICIOS_PRINCIPALES}}
* Duración del servicio: {{HORAS_SERVICIO}} horas de cobertura.
* Número de profesionales: El servicio será cubierto por {{DETALLE_PROFESIONALES}}.

* Servicios Extras:
{{SERVICIOS_EXTRAS}}

SEGUNDA.- ACEPTACIÓN DEL ESTILO ARTÍSTICO
LOS CONTRATANTES declaran conocer, aceptar y estar conformes con el estilo artístico, la técnica y la forma de trabajo de EL/LA PROFESIONAL, habiendo visualizado su portafolio y trabajos previos. En consecuencia, aceptan que el resultado final del reportaje será fiel a dicho estilo.

TERCERA.- PRECIO Y FORMA DE PAGO
El precio total por los servicios descritos en la cláusula primera asciende a la cantidad de {{PRECIO_TOTAL}} € (IVA incluido).
Dicho importe se abonará de la siguiente forma:
1. Reserva: {{RESERVA}} € a la firma del presente contrato. Este pago formaliza la reserva de la fecha y no será reembolsable en caso de anulación por parte de LOS CONTRATANTES, salvo en los supuestos de fuerza mayor aquí previstos.
2. Pagos Parciales: {{PAGOS_INTERMEDIOS}}.
3. Pago Final: El resto, {{IMPORTE_FINAL}} €, se abonará como máximo el día de la entrega del trabajo final.

Los pagos se realizarán mediante transferencia bancaria a la siguiente cuenta:
* Número de Cuenta (IBAN): {{CUENTA_BANCARIA}}

CUARTA.- OBLIGACIONES DEL PROFESIONAL
1. Prestar los servicios contratados con la máxima diligencia y profesionalidad.
2. Asistir al evento en la fecha, hora y lugares acordados.
3. Utilizar el equipo técnico adecuado para garantizar la calidad del trabajo.
4. Entregar el trabajo final en los plazos y formatos estipulados en la cláusula sexta.
5. Guardar confidencialidad sobre la información personal de LOS CONTRATANTES.

QUINTA.- OBLIGACIONES DE LOS CONTRATANTES
1. Abonar el precio en las condiciones y plazos pactados.
2. Facilitar toda la información necesaria a EL/LA PROFESIONAL para la correcta organización del servicio (horarios, localizaciones, personas de contacto, etc.).
3. Gestionar las autorizaciones y permisos necesarios para la toma de imágenes en los recintos privados (iglesia, restaurante, finca, etc.).
4. Informar a sus invitados de la presencia de fotógrafos/videógrafos profesionales para facilitar su labor.
5. Proveer la alimentación y bebida necesarias para el equipo de EL/LA PROFESIONAL durante la jornada de trabajo, si esta coincide con los horarios de comida o cena del evento.

SEXTA.- ENTREGA DEL TRABAJO
EL/LA PROFESIONAL se compromete a entregar el trabajo finalizado en un plazo máximo de {{PLAZO_ENTREGA}} desde la fecha de la boda.
La entrega consistirá en:
{{DETALLE_ENTREGA}}

SÉPTIMA.- PROPIEDAD INTELECTUAL Y DERECHOS DE IMAGEN
De conformidad con el Texto Refundido de la Ley de Propiedad Intelectual, la propiedad intelectual de todas las fotografías y vídeos resultantes de la prestación del servicio corresponde a EL/LA PROFESIONAL como autor/a de las mismas.
EL/LA PROFESIONAL cede a LOS CONTRATANTES una licencia de uso sobre dichas obras, de carácter personal, privado, no transferible y no exclusivo. Esta licencia les permite reproducir, imprimir y compartir las imágenes en sus redes sociales y con familiares y amigos, siempre para un uso no comercial. Queda expresamente prohibida la modificación, venta, cesión a terceros o cualquier uso con ánimo de lucro de las imágenes sin el consentimiento expreso y por escrito de EL/LA PROFESIONAL.

Autorización para publicación:
LOS CONTRATANTES, de forma libre y voluntaria, manifiestan su decisión respecto al uso de las imágenes de su boda por parte de EL/LA PROFESIONAL para fines promocionales (publicación en página web, blog, redes sociales, portafolios, concursos o exposiciones artísticas), marcando la siguiente opción:
{{AUTORIZACION_IMAGEN}}

OCTAVA.- PROTECCIÓN DE DATOS PERSONALES
En cumplimiento de la Ley Orgánica de Protección de Datos Personales y garantía de los derechos digitales, se informa a LOS CONTRATANTES que sus datos personales recogidos en este contrato serán tratados por EL/LA PROFESIONAL con la finalidad de gestionar la relación contractual. Los datos serán conservados durante el tiempo necesario para cumplir con las obligaciones legales. LOS CONTRATANTES pueden ejercer sus derechos de acceso, rectificación, supresión y oposición dirigiéndose a EL/LA PROFESIONAL.

NOVENA.- ANULACIÓN DEL SERVICIO
Si LOS CONTRATANTES decidieran anular los servicios contratados, deberán notificarlo fehacientemente y por escrito a EL/LA PROFESIONAL. La anulación conllevará las siguientes penalizaciones en concepto de indemnización por la reserva de fecha y la pérdida de oportunidad de contratación:
* Anulación con más de 180 días de antelación a la fecha de la boda: Se retendrá el 100% del importe abonado en concepto de reserva.
* Anulación entre 179 y 90 días de antelación: Deberán abonar el 50% del precio total del servicio.
* Anulación con 89 días o menos de antelación: Deberán abonar el 100% del precio total del servicio.

DÉCIMA.- DERECHO DE DESISTIMIENTO
Se informa a LOS CONTRATANTES que, de acuerdo con el artículo 103.l) del Real Decreto Legislativo 1/2007, no es aplicable el derecho de desistimiento al tratarse de un contrato de prestación de servicios relacionados con actividades de esparcimiento en una fecha específica.

UNDÉCIMA.- FUERZA MAYOR Y SUSTITUCIÓN
En el caso de que EL/LA PROFESIONAL no pudiera realizar el servicio por una causa de fuerza mayor debidamente acreditada (accidente grave, enfermedad incapacitante, fallecimiento), se compromete a buscar un/a fotógrafo/a sustituto/a de estilo y calidad similar, previa aprobación por parte de LOS CONTRATANTES. Si no fuera posible encontrar un sustituto o LOS CONTRATANTES no lo aceptaran, EL/LA PROFESIONAL devolverá íntegramente todas las cantidades abonadas hasta la fecha, quedando exento de cualquier otra responsabilidad por daños y perjuicios.

DUODÉCIMA.- LIMITACIÓN DE RESPONSABILIDAD
La responsabilidad de EL/LA PROFESIONAL por cualquier fallo técnico del equipo, pérdida o daño del material que impida la entrega del trabajo, y que sea directamente imputable a su negligencia, se limitará exclusivamente a la devolución del importe total abonado por LOS CONTRATANTES hasta ese momento.

DECIMOTERCERA.- SEGURO DE RESPONSABILIDAD CIVIL
EL/LA PROFESIONAL declara disponer de un seguro de Responsabilidad Civil vigente para cubrir cualquier incidente que pudiera ocurrir durante la prestación del servicio.

DECIMOCUARTA.- LEY APLICABLE Y JURISDICCIÓN
El presente contrato tiene carácter mercantil y se regirá e interpretará de acuerdo con la legislación española. Para la resolución de cualquier controversia que pudiera surgir, las partes se someten a los Juzgados y Tribunales de la ciudad de {{LUGAR_FIRMA}}, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.

Y en prueba de conformidad, ambas partes firman el presente contrato por duplicado y a un solo efecto en el lugar y fecha indicados en el encabezamiento.

EL/LA PROFESIONAL                    LOS CONTRATANTES
Fdo: {{NOMBRE_FOTOGRAFO}}            Fdo: {{NOMBRE_CLIENTE_1}} y {{NOMBRE_CLIENTE_2}}
`;

export const DEFAULT_TEMPLATE_COMUNION = `CONTRATO DE PRESTACIÓN DE SERVICIOS FOTOGRÁFICOS Y/O VIDEOGRÁFICOS PARA COMUNIÓN

En {{LUGAR_FIRMA}}, a {{FECHA_FIRMA_DETALLE}}.

REUNIDOS
De una parte, como EL PROFESIONAL: D./Dña. {{NOMBRE_FOTOGRAFO}}, con DNI/NIF {{NIF_FOTOGRAFO}}, con domicilio en {{DIRECCION_FOTOGRAFO}}, correo electrónico {{EMAIL_FOTOGRAFO}} y teléfono {{TEL_FOTOGRAFO}}.

De otra parte, como LOS CONTRATANTES (Tutores Legales del menor):

TUTOR/A LEGAL 1: D./Dña. {{NOMBRE_TUTOR_1}}, con DNI {{NIF_TUTOR_1}}, correo electrónico {{EMAIL_TUTOR_1}} y teléfono {{TEL_TUTOR_1}}.

TUTOR/A LEGAL 2: D./Dña. {{NOMBRE_TUTOR_2}}, con DNI {{NIF_TUTOR_2}}, correo electrónico {{EMAIL_TUTOR_2}} y teléfono {{TEL_TUTOR_2}}.

Ambos, en su condición de padres/madres/tutores legales del menor: {{NOMBRE_MENOR}}.

EXPONEN
I. Que EL PROFESIONAL es un profesional de la fotografía con experiencia y capacidad para prestar los servicios objeto del presente contrato. 
II. Que LOS CONTRATANTES, en ejercicio de la patria potestad sobre el menor {{NOMBRE_MENOR}}, desean contratar los servicios de EL PROFESIONAL para la cobertura fotográfica de la comunión de dicho menor. 
III. Que ambas partes, reconociéndose mutuamente la capacidad legal necesaria para contratar y obligarse, formalizan el presente CONTRATO DE PRESTACIÓN DE SERVICIOS FOTOGRÁFICOS PARA COMUNIÓN, de acuerdo con las siguientes:

CLÁUSULAS

PRIMERA. OBJETO DEL CONTRATO 
El presente contrato tiene por objeto la prestación de servicios fotográficos por parte de EL PROFESIONAL para la cobertura de la Primera Comunión del menor {{NOMBRE_MENOR}}, que tendrá lugar en la siguiente fecha y lugares:

Fecha de la Sesión: {{FECHA_COMUNION}}
Hora Aproximada de Inicio: {{HORA_INICIO}}
Duración Estimada del Servicio: {{DURACION_SESION}} horas, desde {{HORA_INICIO}} hasta {{HORA_FIN}}.

Servicio Contratado:
{{SERVICIOS_PRINCIPALES}}

SEGUNDA. SERVICIOS EXTRAS (Opcional) 
LOS CONTRATANTES podrán contratar los siguientes servicios adicionales:
{{SERVICIOS_EXTRAS}}

TERCERA. ACEPTACIÓN DEL ESTILO ARTÍSTICO 
LOS CONTRATANTES declaran conocer y aceptar el estilo artístico y la visión creativa de EL PROFESIONAL, habiendo revisado su portafolio y trabajos previos. Entienden que el resultado final de las fotografías y/o vídeos será acorde a dicho estilo, que es subjetivo y personal.

CUARTA. PRECIO Y FORMA DE PAGO 
El precio total de los servicios contratados, incluyendo los extras si los hubiere, asciende a la cantidad de {{PRECIO_TOTAL_LETRA}} EUROS ({{PRECIO_CIFRA}} €). La forma de pago se establece de la siguiente manera:

Reserva: Una cantidad de {{RESERVA_CIFRA}} € se abonará en el momento de la firma del presente contrato, en concepto de reserva de fecha y servicios. Esta cantidad no será reembolsable, salvo en los casos de fuerza mayor previstos en la Cláusula Décima.

Pago Final: El importe restante de {{FINAL_CIFRA}} € se abonará a la entrega del trabajo finalizado.

Todos los pagos se realizarán mediante transferencia bancaria a la siguiente cuenta:

Número de Cuenta: {{CUENTA_BANCARIA}}
Titular de la Cuenta: {{TITULAR_CUENTA}}
Banco: {{BANCO}}

El incumplimiento de los plazos de pago podrá dar lugar a la suspensión de los servicios o a la resolución del contrato, sin perjuicio de las indemnizaciones que pudieran corresponder.

QUINTA. OBLIGACIONES DEL PROFESIONAL
1. Realizar los servicios fotográficos con la máxima diligencia y profesionalidad, utilizando el equipo adecuado y aplicando su estilo artístico.
2. Entregar el trabajo finalizado en el plazo y forma acordados en la Cláusula Séptima.
3. Garantizar la confidencialidad de la información personal de LOS CONTRATANTES y del menor, conforme a la normativa de protección de datos.
4. En caso de imposibilidad justificada de asistir al evento, EL PROFESIONAL se compromete a buscar un sustituto de similar calidad y experiencia, previa aceptación de LOS CONTRATANTES, o a devolver las cantidades abonadas.

SEXTA. OBLIGACIONES DE LOS CONTRATANTES
1. Abonar el precio acordado en los plazos y forma establecidos en la Cláusula Cuarta.
2. Proporcionar a EL PROFESIONAL toda la información necesaria para la correcta ejecución del servicio (horarios, ubicaciones, personas relevantes, etc.).
3. Garantizar el acceso de EL PROFESIONAL a todos los lugares donde se desarrollará el evento y gestionar las autorizaciones necesarias para la toma de imágenes.
4. No modificar, ceder, vender o utilizar las imágenes para fines comerciales sin el consentimiento expreso y por escrito de EL PROFESIONAL.

SÉPTIMA. ENTREGA DEL TRABAJO 
EL PROFESIONAL se compromete a entregar el trabajo finalizado en un plazo máximo de {{PLAZO_ENTREGA}} a contar desde la fecha del reportaje. 
La entrega se realizará en los siguientes formatos:
{{DETALLE_ENTREGA}}

No se entregarán archivos RAW o sin editar, salvo acuerdo expreso y por escrito.

OCTAVA. PROPIEDAD INTELECTUAL Y DERECHOS DE IMAGEN
Propiedad Intelectual: La propiedad intelectual de las fotografías y/o vídeos realizados corresponde en exclusiva a EL PROFESIONAL. LOS CONTRATANTES adquieren una licencia de uso personal e intransferible sobre las obras, lo que les permite su reproducción y difusión en el ámbito privado (redes sociales personales, impresión para uso propio, etc.), siempre que no se altere la integridad de las obras ni se les dé un uso comercial.

Derechos de Imagen del Menor y de los Contratantes: LOS CONTRATANTES, en ejercicio de la patria potestad sobre el menor {{NOMBRE_MENOR}}, y en su propio nombre, AUTORIZAN a EL PROFESIONAL a la captación de la imagen del menor y de los propios contratantes durante el evento de comunión. Asimismo, LOS CONTRATANTES, de forma OPCIONAL, otorgan o deniegan su consentimiento para el uso promocional de dichas imágenes por parte de EL PROFESIONAL:

Autorización para el uso promocional de las imágenes del menor y de los contratantes:
{{AUTORIZACION_IMAGEN}}

Este consentimiento, en caso de ser otorgado, es revocable en cualquier momento mediante comunicación escrita a EL PROFESIONAL, sin efectos retroactivos. En caso de no autorización o revocación, EL PROFESIONAL se abstendrá de utilizar las imágenes para los fines promocionales indicados.

NOVENA. PROTECCIÓN DE DATOS PERSONALES 
En cumplimiento de la normativa vigente en materia de protección de datos, se informa a LOS CONTRATANTES que sus datos personales, así como los del menor, serán tratados por EL PROFESIONAL con la finalidad de gestionar la relación contractual y la prestación de los servicios. La base legal para el tratamiento es la ejecución del contrato y el consentimiento de los interesados. Los datos se conservarán durante el tiempo necesario para cumplir con las obligaciones legales. LOS CONTRATANTES podrán ejercer sus derechos de acceso, rectificación, supresión y oposición dirigiéndose a {{EMAIL_FOTOGRAFO}}.

DÉCIMA. ANULACIÓN DEL SERVICIO 
En caso de que LOS CONTRATANTES decidieran desistir de los servicios contratados, deberán notificarlo por escrito a EL PROFESIONAL. Se aplicarán las siguientes penalizaciones:
* Si la anulación se produce con más de 180 días de antelación a la fecha de la comunión, EL PROFESIONAL retendrá el importe de la reserva.
* Si la anulación se produce entre 179 y 90 días de antelación, LOS CONTRATANTES deberán abonar el 50% del precio total del servicio.
* Si la anulación se produce con menos de 89 días de antelación, LOS CONTRATANTES deberán abonar el 100% del precio total del servicio. 

Estas cantidades se consideran indemnizaciones por la pérdida de oportunidad de contratación. No se aplicarán en casos de fuerza mayor debidamente justificados.

UNDÉCIMA. FUERZA MAYOR Y SUSTITUCIÓN
Imposibilidad de EL PROFESIONAL: Si EL PROFESIONAL no pudiera prestar el servicio por causas de fuerza mayor (enfermedad grave, accidente, etc.) debidamente justificadas, se compromete a buscar un profesional sustituto de similar calidad. Si LOS CONTRATANTES aceptan al sustituto, el contrato continuará con este. Si no lo aceptaran o no se encuentra un sustituto, EL PROFESIONAL devolverá íntegramente las cantidades abonadas.
Imposibilidad de LOS CONTRATANTES: Si la comunión no pudiera celebrarse por causas de fuerza mayor, se intentará acordar una nueva fecha. Si no fuera posible, se valorará un reembolso parcial o total de las cantidades abonadas, en función de los gastos ya incurridos por EL PROFESIONAL.

DUODÉCIMA. LEY APLICABLE Y JURISDICCIÓN 
El presente contrato se regirá por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de {{LUGAR_FIRMA}}, con renuncia a cualquier otro fuero.

Y en prueba de conformidad, las partes firman el presente contrato por duplicado, en el lugar y fecha indicados en el encabezamiento.

EL PROFESIONAL                        LOS CONTRATANTES

Fdo.: {{NOMBRE_FOTOGRAFO}}             Fdo.: {{NOMBRE_TUTOR_1}} y {{NOMBRE_TUTOR_2}}
`;

export const DEFAULT_TEMPLATE_INFANTIL = `CONTRATO DE PRESTACIÓN DE SERVICIOS FOTOGRÁFICOS INFANTILES (MENORES DE 14 AÑOS)

En {{LUGAR_FIRMA}}, a {{FECHA_FIRMA_DETALLE}}.

REUNIDOS
De una parte, como EL PROFESIONAL: D./Dña. {{NOMBRE_FOTOGRAFO}}, con DNI/NIF {{NIF_FOTOGRAFO}}, con domicilio en {{DIRECCION_FOTOGRAFO}}, correo electrónico {{EMAIL_FOTOGRAFO}} y teléfono {{TEL_FOTOGRAFO}}.

De otra parte, como LOS CONTRATANTES (Tutores Legales del menor):

TUTOR/A LEGAL 1: D./Dña. {{NOMBRE_TUTOR_1}}, con DNI {{NIF_TUTOR_1}}, correo electrónico {{EMAIL_TUTOR_1}} y teléfono {{TEL_TUTOR_1}}.

TUTOR/A LEGAL 2: D./Dña. {{NOMBRE_TUTOR_2}}, con DNI {{NIF_TUTOR_2}}, correo electrónico {{EMAIL_TUTOR_2}} y teléfono {{TEL_TUTOR_2}}.

Ambos, en su condición de padres/madres/tutores legales del menor: {{NOMBRE_MENOR}}.

EXPONEN
I. Que EL PROFESIONAL es un profesional de la fotografía especializado en reportajes infantiles, contando con los medios técnicos y artísticos necesarios. 
II. Que LOS CONTRATANTES, en ejercicio de la patria potestad y representación legal del menor {{NOMBRE_MENOR}}, desean contratar los servicios de EL PROFESIONAL para la realización de una sesión fotográfica infantil. 
III. Que ambas partes formalizan el presente contrato de acuerdo con las siguientes:

CLÁUSULAS

PRIMERA. OBJETO DEL CONTRATO 
El objeto del contrato es la realización de una sesión fotográfica por parte de EL PROFESIONAL centrada en el menor {{NOMBRE_MENOR}}, que tendrá lugar bajo las siguientes condiciones:

Fecha de la Sesión: {{FECHA_COMUNION}}
Lugar de la Sesión: {{LUGAR_SESION}}
Hora de Inicio: {{HORA_INICIO}}
Duración estimada: {{DURACION_SESION}} horas.

SEGUNDA. SERVICIOS CONTRATADOS Y EXTRAS
Servicio Principal:
{{SERVICIOS_PRINCIPALES}}

Servicios Adicionales:
{{SERVICIOS_EXTRAS}}

TERCERA. ACEPTACIÓN DEL ESTILO ARTÍSTICO 
LOS CONTRATANTES declaran conocer y aceptar el estilo artístico de EL PROFESIONAL. El reportaje se entregará editado según el criterio estético propio del autor, que los clientes han validado previamente en su portafolio.

CUARTA. PRECIO Y CONDICIONES DE PAGO 
El precio total de los servicios asciende a {{PRECIO_TOTAL_LETRA}} EUROS ({{PRECIO_CIFRA}} €).
* Reserva: {{RESERVA_CIFRA}} € abonados a la firma del contrato.
* Pago Final: {{FINAL_CIFRA}} € abonados el día de la sesión o a la entrega del material.

Datos Bancarios:
Banco: {{BANCO}} | Titular: {{TITULAR_CUENTA}} | Cuenta: {{CUENTA_BANCARIA}}

QUINTA. OBLIGACIONES Y RESPONSABILIDAD
1. EL PROFESIONAL velará por el bienestar del menor durante la sesión, aplicando las medidas de seguridad necesarias.
2. LOS CONTRATANTES deberán estar presentes durante toda la sesión, siendo responsables de la supervisión y comportamiento del menor.
3. Si el menor muestra una actitud de rechazo, cansancio o malestar extremo que impida la realización de las fotos, se valorará la reprogramación de la sesión bajo coste adicional.

SEXTA. ENTREGA Y PLAZOS
EL PROFESIONAL entregará el material en un plazo de {{PLAZO_ENTREGA}}.
Formatos de entrega:
{{DETALLE_ENTREGA}}

SÉPTIMA. PROPIEDAD INTELECTUAL Y DERECHOS DE IMAGEN
La propiedad intelectual pertenece a EL PROFESIONAL. Los clientes reciben una licencia para uso personal y familiar.
Respecto a los derechos de imagen del menor, en cumplimiento de la Ley Orgánica 1/1982 y la Ley Orgánica 1/1996 de Protección Jurídica del Menor, los tutores legales manifiestan su consentimiento respecto al uso promocional:
{{AUTORIZACION_IMAGEN}}

OCTAVA. PROTECCIÓN DE DATOS (RGPD)
Los datos del menor y sus tutores se tratarán exclusivamente para la ejecución del contrato y la entrega de las imágenes, garantizando la máxima confidencialidad.

NOVENA. JURISDICCIÓN
Para cualquier controversia, las partes se someten a los juzgados de {{LUGAR_FIRMA}}.

Y en prueba de conformidad, firman el presente contrato:

EL PROFESIONAL                        LOS CONTRATANTES

Fdo.: {{NOMBRE_FOTOGRAFO}}             Fdo.: {{NOMBRE_TUTOR_1}} y {{NOMBRE_TUTOR_2}}
`;
