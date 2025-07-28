@echo off
echo 🔍 Verificando configuración de imágenes para producción...
echo.

REM Check if dist directory exists
if not exist "dist" (
    echo ❌ Directorio 'dist' no existe. Ejecuta 'npm run build:production' primero.
    exit /b 1
)

REM Check if dist/images exists and has files
if exist "dist\images" (
    echo ✅ dist\images existe
    for /f %%a in ('dir /b "dist\images" 2^>nul ^| find /c /v ""') do set imageCount=%%a
    echo    📊 Contiene !imageCount! archivos
) else (
    echo ❌ dist\images no existe
    set imageCount=0
)

REM Check if dist/public/images exists and has files
if exist "dist\public\images" (
    echo ✅ dist\public\images existe
    for /f %%a in ('dir /b "dist\public\images" 2^>nul ^| find /c /v ""') do set publicImageCount=%%a
    echo    📊 Contiene !publicImageCount! archivos
) else (
    echo ❌ dist\public\images no existe
    set publicImageCount=0
)

REM Check if server index.js exists
if exist "dist\index.js" (
    echo ✅ dist\index.js existe (servidor)
) else (
    echo ❌ dist\index.js no existe
)

REM Check if client build exists
if exist "dist\public\index.html" (
    echo ✅ dist\public\index.html existe (cliente)
) else (
    echo ❌ dist\public\index.html no existe
)

echo.
if %imageCount% GTR 0 (
    if %publicImageCount% GTR 0 (
        echo 🎉 ¡Configuración correcta! Las imágenes están disponibles en ambas rutas:
        echo    - /images/ ^(servido por Express desde dist\images^)
        echo    - Assets estáticos ^(servido desde dist\public^)
        echo.
        echo 🚀 Tu aplicación está lista para desplegarse en Render
        echo    Solo sube la carpeta 'dist' completa
    ) else (
        echo ⚠️  Las imágenes no están en dist\public\images
        echo    Ejecuta: npm run build:production
    )
) else (
    echo ⚠️  No hay imágenes en dist\images
    echo    Ejecuta: npm run build:production
)

echo.
echo 💡 Comandos útiles:
echo    npm run build:production  - Build completo con imágenes
echo    npm run copy:images:postbuild  - Solo copiar imágenes post-build
echo    verify-config.cmd  - Verificar configuración
