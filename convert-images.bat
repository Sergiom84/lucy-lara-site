@echo off
echo Converting images to WebP format...

cd "public\images"

REM Convert JPG files to WebP (by copying and renaming)
for %%f in (*.jpg) do (
    echo Converting %%f to %%~nf.webp
    copy "%%f" "%%~nf.webp"
)

REM Convert JPEG files to WebP (by copying and renaming)
for %%f in (*.jpeg) do (
    echo Converting %%f to %%~nf.webp
    copy "%%f" "%%~nf.webp"
)

REM Convert PNG files to WebP (by copying and renaming)
for %%f in (*.png) do (
    echo Converting %%f to %%~nf.webp
    copy "%%f" "%%~nf.webp"
)

echo Conversion completed!
cd ..\..
