# 🔒 Configuración de Seguridad - Centro de Estética Lucy Lara

## 📋 Variables de Entorno Requeridas

### Configuración de Email
Para que el sistema de contacto funcione, necesitas configurar estas variables en Render:

```bash
GMAIL_USER=tu-email@gmail.com
GMAIL_PASS=contraseña-de-aplicacion-gmail
SALON_EMAIL=email-del-salon@gmail.com
```

> ⚠️ **Importante**: Usa una [Contraseña de Aplicación de Gmail](https://support.google.com/mail/answer/185833), no tu contraseña normal.

### Configuración del Chatbot (Opcional)
```bash
DEEPSEEK_API_KEY=tu-api-key-aqui
```

## 🚀 Configuración en Render

1. Ve a tu dashboard de Render
2. Selecciona tu servicio web
3. Ve a "Environment" 
4. Añade las variables de entorno una por una
5. Redeploy el servicio

## 🔐 Medidas de Seguridad Implementadas

- ✅ Archivo `.env` removido del repositorio
- ✅ Headers de seguridad con Helmet
- ✅ Rate limiting configurado
- ✅ CORS configurado para dominios específicos
- ✅ Validación de entrada en formularios
- ✅ Sanitización de datos

## 📝 Notas Importantes

- **NUNCA** subas archivos `.env` al repositorio
- Usa variables de entorno en producción
- Rota las contraseñas regularmente
- Mantén las dependencias actualizadas
