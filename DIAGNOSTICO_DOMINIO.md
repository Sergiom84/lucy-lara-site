# Guía de Diagnóstico - Problemas de Dominio en Render

## 🔍 DIAGNÓSTICO PASO A PASO

### 1. Verificar que Render funciona correctamente
- Ve a tu dashboard de Render
- Busca la URL temporal que Render te asigna (algo como: `https://tu-app-name.onrender.com`)
- Abre esa URL en el navegador
- **¿Se ve correctamente con estilos?**
  - ✅ SÍ: El problema está en la configuración del dominio
  - ❌ NO: El problema está en el código/build

### 2. Si Render funciona pero tu dominio no:

#### A) Configuración DNS incorrecta
**PROBLEMA MÁS COMÚN** - Verifica en tu proveedor de dominio:

**Para CNAME (recomendado):**
```
Tipo: CNAME
Nombre: @ (o vacío para dominio raíz)
Valor: tu-app-name.onrender.com
TTL: 3600 (o automático)

Tipo: CNAME  
Nombre: www
Valor: tu-app-name.onrender.com
TTL: 3600
```

**Para A Record (alternativo):**
```
Tipo: A
Nombre: @ (o vacío)
Valor: [IP de Render] - consulta en tu dashboard
TTL: 3600

Tipo: CNAME
Nombre: www  
Valor: centroesteticalucylara.com
TTL: 3600
```

#### B) Configuración en Render
En tu dashboard de Render:
1. Ve a tu servicio web
2. Sección "Settings" → "Custom Domains"
3. Añade ambos dominios:
   - `centroesteticalucylara.com`
   - `www.centroesteticalucylara.com`
   - `centroesteticalucylara.es`
   - `www.centroesteticalucylara.es`

### 3. Errores comunes del proveedor de dominio:

#### 🔸 **Godaddy/Namecheap/Ionos:**
- No usar "www" en el campo nombre para el dominio raíz
- Usar "@" o dejar vacío para el dominio principal
- TTL muy alto (usar 3600 o menos)

#### 🔸 **Cloudflare:**
- Proxy status debe estar en "DNS only" (nube gris) inicialmente
- Una vez funcionando, puedes activar proxy (nube naranja)

#### 🔸 **Tiempo de propagación:**
- DNS puede tardar 24-48 horas en propagarse
- Usar `nslookup centroesteticalucylara.com` para verificar

### 4. Comandos para verificar DNS:

```bash
# Verificar DNS
nslookup centroesteticalucylara.com
nslookup www.centroesteticalucylara.com

# Verificar con dig (Linux/Mac)
dig centroesteticalucylara.com
dig www.centroesteticalucylara.com

# Verificar certificado SSL
curl -I https://centroesteticalucylara.com
```

### 5. Herramientas online útiles:
- https://dnschecker.org/ - Verificar propagación DNS
- https://www.whatsmydns.net/ - Ver DNS desde diferentes ubicaciones
- https://tools.keycdn.com/speed - Test de velocidad

## 🚨 SOLUCIÓN RÁPIDA:

1. **Ve al dashboard de Render** y copia la URL temporal
2. **Testa esa URL** - si funciona, es problema de DNS
3. **Ve a tu proveedor de dominio** y configura:
   ```
   CNAME @ → tu-app-name.onrender.com
   CNAME www → tu-app-name.onrender.com
   ```
4. **Espera 1-2 horas** para propagación
5. **Añade los dominios en Render** en Custom Domains

## ⚠️ SI NADA FUNCIONA:
- Contacta soporte de tu proveedor de dominio
- Verifica que el dominio no esté en estado "parked" o suspendido
- Comprueba que no tengas redirecciones activas en el proveedor
