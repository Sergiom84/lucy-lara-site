# Configuración de Google Forms para Reservas

## Paso 1: Crear el Formulario de Google

1. Ve a [Google Forms](https://forms.google.com)
2. Crea un nuevo formulario
3. Título: "Reserva de Cita - Centro de Estética Lucy Lara"
4. Descripción: "Completa este formulario para solicitar una cita. Nos pondremos en contacto contigo a la mayor brevedad."

## Paso 2: Configurar los Campos del Formulario

Crea exactamente estos campos en este orden:

### Campo 1: Nombre completo
- Tipo: Respuesta corta
- Título: "Nombre completo"
- Obligatorio: Sí

### Campo 2: Email
- Tipo: Respuesta corta
- Título: "Email"
- Validación: Email válido
- Obligatorio: Sí

### Campo 3: Teléfono
- Tipo: Respuesta corta
- Título: "Teléfono"
- Obligatorio: Sí

### Campo 4: Servicio
- Tipo: Selección múltiple (desplegable)
- Título: "Servicio deseado"
- Opciones:
  - Renovación profunda - higiene facial completa
  - Renovación de cristal - higiene facial con microdermoabrasión
  - Descanso y vitalidad - higiene facial con presoterapia ocular
  - Equilibrio total - higiene facial con presoterapia
  - Pureza y frescura - higiene facial
  - Micropigmentación - Cejas
  - Micropigmentación - Línea de ojos superior
  - Micropigmentación - Línea de ojos inferior
  - Micropigmentación - Labios completos
  - Eliminación del vello - Depilación eléctrica
  - Eliminación del vello - Fotodepilación SHR
  - Eliminación del vello - Cera chocolate
  - Masaje relajante - Un respiro para tu cuerpo y mente
  - Masaje terapéutico - Manos que sanan
  - Lifting y tinte de pestañas
  - Hidrolinfa
  - Acupuntura
- Obligatorio: Sí

### Campo 5: Fecha preferida
- Tipo: Fecha
- Título: "Fecha preferida"
- Obligatorio: Sí

### Campo 6: Hora preferida
- Tipo: Selección múltiple (desplegable)
- Título: "Hora preferida"
- Opciones: 10:00, 10:30, 11:00, 11:30, 12:00, 12:30, 13:00, 13:30, 16:00, 16:30, 17:00, 17:30, 18:00, 18:30, 19:00, 19:30
- Obligatorio: Sí

### Campo 7: Mensaje adicional
- Tipo: Párrafo
- Título: "Mensaje adicional (opcional)"
- Descripción: "Cuéntanos cualquier detalle adicional sobre tu cita..."
- Obligatorio: No

## Paso 3: Configurar Notificaciones por Email

1. En tu formulario, haz clic en "Respuestas" (pestaña superior)
2. Haz clic en los tres puntos (...) y selecciona "Recibir notificaciones por email"
3. Activa las notificaciones para recibir un email cada vez que alguien complete el formulario

## Paso 4: Obtener los IDs de los Campos

1. Abre tu formulario en modo "Vista previa"
2. Abre las herramientas de desarrollador del navegador (F12)
3. Ve a la pestaña "Network" 
4. Llena el formulario con datos de prueba y envíalo
5. Busca la petición que comience con "formResponse"
6. En los detalles de la petición, busca los parámetros que empiecen con "entry."
7. Anota cada ID de entrada para cada campo:

Ejemplo:
- entry.123456789 → Nombre completo
- entry.987654321 → Email  
- entry.111111111 → Teléfono
- entry.222222222 → Servicio
- entry.333333333 → Fecha
- entry.444444444 → Hora
- entry.555555555 → Mensaje

## Paso 5: Obtener la URL del Formulario

1. En tu formulario, haz clic en "Enviar"
2. Copia el enlace del formulario
3. Cambia `/viewform` por `/formResponse` al final de la URL

Ejemplo:
- URL original: `https://docs.google.com/forms/d/e/1234567890/viewform`
- URL para el código: `https://docs.google.com/forms/d/e/1234567890/formResponse`

## Paso 6: Actualizar el Código

Una vez tengas los IDs y la URL, proporciónamelos para actualizar el código del sitio web.

## Configuración de Hoja de Cálculo (Opcional)

1. En "Respuestas", haz clic en el icono de Google Sheets
2. Crea una nueva hoja de cálculo para almacenar todas las respuestas
3. Así tendrás un registro organizado de todas las citas solicitadas

## Ventajas de esta Solución

- ✅ Completamente gratuita
- ✅ Las respuestas llegan directamente a tu Gmail
- ✅ Se almacenan en Google Sheets automáticamente
- ✅ Fácil de gestionar y modificar
- ✅ Muy confiable y estable
- ✅ No requiere configuración técnica compleja