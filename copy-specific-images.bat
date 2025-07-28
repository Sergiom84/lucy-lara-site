@echo off
echo Copiando imágenes necesarias para el proyecto...

cd "c:\Users\Sergio\Desktop\LucyLara"

REM Crear directorio si no existe
if not exist "client\src\assets\images" mkdir "client\src\assets\images"

REM Copiar imágenes específicas que se están importando
echo Copiando Micropigmentación_Alex.jpg...
copy "attached_assets\Micropigmentación_Alex.jpg" "client\src\assets\images\Micropigmentación_Alex.jpg" /Y >nul 2>&1

echo Copiando Micropigmentación2.jpg...
copy "attached_assets\Micropigmentación2.jpg" "client\src\assets\images\Micropigmentación2.jpg" /Y >nul 2>&1

echo Copiando micropigmentacion2.jpg (minúsculas)...
copy "attached_assets\Micropigmentación2.jpg" "client\src\assets\images\micropigmentacion2.jpg" /Y >nul 2>&1

echo Copiando Micropigmentación_Tamara3.jpg...
copy "attached_assets\Micropigmentación_Tamara3.jpg" "client\src\assets\images\Micropigmentación_Tamara3.jpg" /Y >nul 2>&1

echo Copiando Eliminación_Vello_Tamara.jpg...
copy "attached_assets\Eliminación_Vello_Tamara.jpg" "client\src\assets\images\Eliminación_Vello_Tamara.jpg" /Y >nul 2>&1

echo Copiando Recepción2.jpg...
copy "attached_assets\RecepciónTamara.jpg" "client\src\assets\images\Recepción2.jpg" /Y >nul 2>&1

echo Copiando tratamiento 8.jpg...
copy "attached_assets\tratamiento 8.jpg" "client\src\assets\images\tratamiento 8.jpg" /Y >nul 2>&1

echo Copiando Entrada1.jpg...
copy "attached_assets\Entrada1.jpg" "client\src\assets\images\Entrada1.jpg" /Y >nul 2>&1

echo Copiando Nuestro_centro1.jpg...
copy "attached_assets\Nuestro_centro1.jpg" "client\src\assets\images\Nuestro_centro1.jpg" /Y >nul 2>&1

echo Copiando Nuestro_centro2.jpg...
copy "attached_assets\Nuestro_centro2.jpg" "client\src\assets\images\Nuestro_centro2.jpg" /Y >nul 2>&1

echo Copiando Nuestro_centro3.jpg...
copy "attached_assets\Nuestro_centro3.jpg" "client\src\assets\images\Nuestro_centro3.jpg" /Y >nul 2>&1

echo Copiando centro1-small.jpg...
copy "attached_assets\Nuestro_centro1.jpg" "client\src\assets\images\centro1-small.jpg" /Y >nul 2>&1

echo Copiando centro2-small.jpg...
copy "attached_assets\Nuestro_centro2.jpg" "client\src\assets\images\centro2-small.jpg" /Y >nul 2>&1

echo Proceso completado.
echo.
echo Verificando archivos copiados:
dir "client\src\assets\images" /B
