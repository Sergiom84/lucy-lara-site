@echo off
echo Copiando imágenes principales a public/images...

cd "c:\Users\Sergio\Desktop\LucyLara"

REM Crear directorios
if not exist "client\public\images\tratamientos" mkdir "client\public\images\tratamientos"
if not exist "client\public\images\centro" mkdir "client\public\images\centro"
if not exist "client\public\images\productos" mkdir "client\public\images\productos"

REM Copiar imágenes principales (renombrando a minúsculas)
copy "attached_assets\Logo.jpg" "client\public\images\logo.jpg" >nul 2>&1
copy "attached_assets\Cabina2.jpg" "client\public\images\cabina2.jpg" >nul 2>&1
copy "attached_assets\Cabina3.jpg" "client\public\images\cabina3.jpg" >nul 2>&1
copy "attached_assets\Entrada1.jpg" "client\public\images\entrada1.jpg" >nul 2>&1
copy "attached_assets\Entrada2.jpg" "client\public\images\entrada2.jpg" >nul 2>&1
copy "attached_assets\Nuestro_centro1.jpg" "client\public\images\centro\centro1.jpg" >nul 2>&1
copy "attached_assets\Nuestro_centro2.jpg" "client\public\images\centro\centro2.jpg" >nul 2>&1
copy "attached_assets\Nuestro_centro3.jpg" "client\public\images\centro\centro3.jpg" >nul 2>&1

REM Tratamientos faciales
copy "attached_assets\Higiene Facial Suprema_1750671075793.jpg" "client\public\images\tratamientos\facial.jpg" >nul 2>&1
copy "attached_assets\Luz calmante - fotoestimulación para la piel sensible_1750671080945.jpg" "client\public\images\tratamientos\corporal.jpg" >nul 2>&1

REM Micropigmentación
copy "attached_assets\Micropigmentación2.jpg" "client\public\images\tratamientos\micropigmentacion.jpg" >nul 2>&1
copy "attached_assets\Micropigmentación_Alex.jpg" "client\public\images\tratamientos\micropigmentacion-alex.jpg" >nul 2>&1

REM Depilación
copy "attached_assets\Eliminación_Vello_Tamara.jpg" "client\public\images\tratamientos\depilacion.jpg" >nul 2>&1

REM Productos
copy "attached_assets\Crema_Hidratante_Oil.png" "client\public\images\productos\crema-hidratante.png" >nul 2>&1
copy "attached_assets\Protector_Solar.png" "client\public\images\productos\protector-solar.png" >nul 2>&1

echo Imágenes copiadas exitosamente.
dir "client\public\images" /B
pause
