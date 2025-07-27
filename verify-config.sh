#!/bin/bash

echo "🚀 Verificando configuración para Lucy Lara Site..."

# Verificar que existen los archivos necesarios
echo "📁 Verificando estructura de archivos..."

if [ ! -f "package.json" ]; then
    echo "❌ package.json no encontrado"
    exit 1
fi

if [ ! -f "vite.config.ts" ]; then
    echo "❌ vite.config.ts no encontrado"
    exit 1
fi

if [ ! -f "server/index.ts" ]; then
    echo "❌ server/index.ts no encontrado"
    exit 1
fi

echo "✅ Estructura de archivos correcta"

# Verificar configuración CORS
echo "🌐 Verificando configuración CORS..."
if grep -q "centroesteticalucylara.com" server/index.ts && grep -q "centroesteticalucylara.es" server/index.ts; then
    echo "✅ CORS configurado para ambos dominios (.com y .es)"
else
    echo "❌ CORS no configurado correctamente"
    exit 1
fi

# Verificar variables de entorno en package.json
echo "🔧 Verificando scripts de package.json..."
if grep -q "cross-env NODE_ENV=production" package.json; then
    echo "✅ Script de start configurado correctamente"
else
    echo "❌ Script de start necesita cross-env"
    exit 1
fi

# Verificar configuración del servidor
echo "🖥️  Verificando configuración del servidor..."
if grep -q "process.env.PORT" server/index.ts && grep -q "0.0.0.0" server/index.ts; then
    echo "✅ Servidor configurado para producción"
else
    echo "❌ Servidor no configurado correctamente para producción"
    exit 1
fi

echo ""
echo "🎉 ¡Configuración verificada exitosamente!"
echo ""
echo "📋 Resumen de configuraciones aplicadas:"
echo "   • CORS habilitado para .com y .es"
echo "   • Servidor configurado para escuchar en 0.0.0.0"
echo "   • CSP ajustado para permitir estilos"
echo "   • URLs dinámicas en meta tags"
echo "   • Headers correctos para archivos estáticos"
echo "   • Health check endpoint disponible"
echo ""
echo "🚀 Para desplegar en Render:"
echo "   1. Haz commit y push de estos cambios a GitHub"
echo "   2. Conecta el repositorio en Render"
echo "   3. Usa el render.yaml para configuración automática"
echo ""
echo "🔗 Los dominios configurados son:"
echo "   • https://centroesteticalucylara.com"
echo "   • https://www.centroesteticalucylara.com" 
echo "   • https://centroesteticalucylara.es"
echo "   • https://www.centroesteticalucylara.es"
