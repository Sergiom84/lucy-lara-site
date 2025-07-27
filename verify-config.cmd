@echo off
echo 🚀 Verificando configuración para Lucy Lara Site...

echo.
echo 📁 Verificando estructura de archivos...

if not exist "package.json" (
    echo ❌ package.json no encontrado
    exit /b 1
)

if not exist "vite.config.ts" (
    echo ❌ vite.config.ts no encontrado
    exit /b 1
)

if not exist "server\index.ts" (
    echo ❌ server\index.ts no encontrado
    exit /b 1
)

echo ✅ Estructura de archivos correcta

echo.
echo 🌐 Verificando configuración CORS...
findstr /c:"centroesteticalucylara.com" server\index.ts >nul && findstr /c:"centroesteticalucylara.es" server\index.ts >nul
if %errorlevel%==0 (
    echo ✅ CORS configurado para ambos dominios ^(.com y .es^)
) else (
    echo ❌ CORS no configurado correctamente
    exit /b 1
)

echo.
echo 🔧 Verificando scripts de package.json...
findstr /c:"cross-env NODE_ENV=production" package.json >nul
if %errorlevel%==0 (
    echo ✅ Script de start configurado correctamente
) else (
    echo ❌ Script de start necesita cross-env
    exit /b 1
)

echo.
echo 🖥️  Verificando configuración del servidor...
findstr /c:"process.env.PORT" server\index.ts >nul && findstr /c:"0.0.0.0" server\index.ts >nul
if %errorlevel%==0 (
    echo ✅ Servidor configurado para producción
) else (
    echo ❌ Servidor no configurado correctamente para producción
    exit /b 1
)

echo.
echo 🎉 ¡Configuración verificada exitosamente!
echo.
echo 📋 Resumen de configuraciones aplicadas:
echo    • CORS habilitado para .com y .es
echo    • Servidor configurado para escuchar en 0.0.0.0
echo    • CSP ajustado para permitir estilos
echo    • URLs dinámicas en meta tags
echo    • Headers correctos para archivos estáticos
echo    • Health check endpoint disponible
echo.
echo 🚀 Para desplegar en Render:
echo    1. Haz commit y push de estos cambios a GitHub
echo    2. Conecta el repositorio en Render
echo    3. Usa el render.yaml para configuración automática
echo.
echo 🔗 Los dominios configurados son:
echo    • https://centroesteticalucylara.com
echo    • https://www.centroesteticalucylara.com
echo    • https://centroesteticalucylara.es
echo    • https://www.centroesteticalucylara.es
echo.
pause
