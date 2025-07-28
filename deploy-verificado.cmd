@echo off
echo 🚀 Script de Deploy para Lucy Lara - Render
echo ================================================
echo.

REM 1. Limpiar build anterior
echo 📁 Limpiando build anterior...
if exist "dist" (
    rmdir /s /q "dist"
    echo ✅ Build anterior eliminado
)

REM 2. Generar nuevo build
echo 🔨 Generando nuevo build...
call npm run build:production
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error en el build
    pause
    exit /b 1
)

REM 3. Verificar que el build contiene el contenido correcto
echo 🔍 Verificando contenido del build...

REM Verificar que existe index.html
if exist "dist\public\index.html" (
    echo ✅ index.html generado
    
    REM Buscar el título correcto en el HTML
    findstr /C:"Centro de Estética Lucy Lara" "dist\public\index.html" >nul
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Título correcto encontrado en HTML
    ) else (
        echo ❌ PROBLEMA: Título incorrecto en HTML
        echo.
        echo 🔍 Títulos encontrados:
        findstr /C:"<title>" "dist\public\index.html"
        pause
        exit /b 1
    )
) else (
    echo ❌ index.html no encontrado
    pause
    exit /b 1
)

REM Verificar imágenes
if exist "dist\images" (
    for /f %%a in ('dir /b "dist\images" 2^>nul ^| find /c /v ""') do set imageCount=%%a
    echo ✅ !imageCount! imágenes copiadas
) else (
    echo ❌ Carpeta de imágenes no encontrada
)

REM 4. Verificar servidor
if exist "dist\index.js" (
    echo ✅ Servidor generado
) else (
    echo ❌ Servidor no encontrado
    pause
    exit /b 1
)

echo.
echo 🎉 ¡Build verificado y listo para deploy!
echo.
echo 📋 INSTRUCCIONES PARA RENDER:
echo ===============================
echo 1. Ve a tu dashboard de Render
echo 2. Encuentra tu servicio 'lucy-lara-site'
echo 3. Haz clic en "Deploy latest commit" o
echo 4. Haz un git push para trigger automático
echo.
echo 💡 Si el problema persiste:
echo    - Verifica que el build command en Render sea: npm install --include=dev ^&^& npm run build
echo    - Verifica que el start command sea: npm start
echo.
echo ⚠️  IMPORTANTE: 
echo   El build local está correcto, el problema está en que
echo   Render tiene desplegada una versión anterior del código
echo.
pause
