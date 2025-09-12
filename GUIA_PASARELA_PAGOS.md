# Guía para Configurar Pasarela de Pagos - Centro de Estética Lucy Lara

## ¿Qué es una Pasarela de Pago?

Una pasarela de pago es un servicio que procesa de forma segura las transacciones con tarjetas de crédito/débito online. Actúa como intermediario entre tu tienda web y los bancos.

## Opciones Recomendadas para España

### 1. STRIPE (Recomendado) ⭐
**Ventajas:**
- Fácil integración
- Comisiones competitivas (1.4% + 0.25€ por transacción)
- Soporte para tarjetas españolas y europeas
- Dashboard intuitivo
- Pagos instantáneos

**Proceso de configuración:**
1. Crear cuenta en https://stripe.com/es
2. Verificar negocio (documentos fiscales, CIF)
3. Obtener claves API (públicas y secretas)
4. Integrar en el sitio web

### 2. REDSYS (Bancos Españoles)
**Ventajas:**
- Oficial de bancos españoles
- Mayor confianza para algunos clientes
- Integración directa con tu banco

**Desventajas:**
- Proceso de configuración más complejo
- Interfaz menos moderna

### 3. PAYPAL
**Ventajas:**
- Conocido por los usuarios
- No requiere introducir datos de tarjeta

**Desventajas:**
- Comisiones más altas
- Puede retener fondos

## Implementación Técnica

### Archivos a Modificar:

1. **Archivo de Configuración de Pagos**
```javascript
// client/src/lib/payments.ts
export const processPayment = async (cartItems, totalAmount) => {
  // Integración con Stripe/Redsys
};
```

2. **Componente de Checkout**
```javascript
// client/src/components/Checkout.tsx
// Formulario de pago con campos seguros
```

3. **Variables de Entorno Necesarias**
```
STRIPE_PUBLIC_KEY=pk_live_xxxx
STRIPE_SECRET_KEY=sk_live_xxxx
```

### Flujo del Proceso:

1. **Usuario añade productos al carrito** ✅ (Ya implementado)
2. **Usuario hace clic en "Proceder al Pago"**
3. **Se muestra formulario de datos de envío y pago**
4. **Se procesa el pago mediante la pasarela**
5. **Se confirma la transacción**
6. **Se envía email de confirmación**
7. **Se limpia el carrito**

## Pasos para Poner en Funcionamiento

### Paso 1: Elegir Pasarela de Pago
- **Recomendación:** Stripe por su facilidad y confiabilidad

### Paso 2: Crear Cuenta y Verificar Negocio
- Registrarse en la pasarela elegida
- Subir documentación (CIF, licencia de actividad, etc.)
- Configurar cuenta bancaria para recibir pagos

### Paso 3: Obtener Credenciales
- Claves públicas (para el frontend)
- Claves secretas (para el backend)
- Webhook endpoints (para confirmaciones)

### Paso 4: Implementar en el Código
- Instalar librerías de la pasarela
- Configurar formularios de pago seguros
- Implementar validaciones
- Configurar webhooks

### Paso 5: Configurar Envíos
- Definir zonas de envío
- Calcular costes de envío
- Integrar con servicio de mensajería

### Paso 6: Pruebas
- Realizar transacciones de prueba
- Verificar todos los flujos
- Comprobar emails de confirmación

### Paso 7: Activar Modo Producción
- Cambiar a claves reales
- Configurar SSL/HTTPS
- Activar pagos reales

## Información Legal Necesaria

### Documentos Requeridos:
- CIF del negocio
- Licencia de actividad
- Extracto bancario
- DNI del titular

### Páginas Legales:
- Política de Privacidad
- Términos y Condiciones
- Política de Devoluciones
- Aviso Legal

## Costes Aproximados

### Stripe:
- Sin cuota mensual
- 1.4% + 0.25€ por transacción exitosa
- Sin costes de configuración

### Redsys:
- Cuota mensual: 15-30€
- Comisión por transacción: 0.5-1%
- Coste de configuración: 100-300€

## Siguiente Paso Recomendado

1. **Crear cuenta en Stripe** (más fácil para empezar)
2. **Completar verificación del negocio**
3. **Solicitar implementación técnica** con las claves obtenidas

## Contacto para Implementación

Una vez tengas las credenciales de la pasarela de pago, puedo implementar toda la funcionalidad técnica en aproximadamente 2-4 horas de trabajo.

## Estado Actual

✅ **Carrito de compras funcional**
✅ **Contador de productos en header**
✅ **Agregar/eliminar productos**
⏳ **Pendiente: Integración con pasarela de pago**
⏳ **Pendiente: Formulario de checkout**
⏳ **Pendiente: Confirmación de pedidos**