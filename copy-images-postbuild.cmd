@echo off
echo 🖼️  Post-build image copy script for Windows...

REM Check if dist/public/images exists
if not exist "dist\public\images" (
    echo ❌ dist\public\images does not exist. Run 'npm run build' first.
    exit /b 1
)

REM Create dist/images directory if it doesn't exist
if not exist "dist\images" (
    echo 📁 Creating dist\images directory...
    mkdir "dist\images"
)

REM Copy images from dist/public/images to dist/images
echo 📋 Copying images from dist\public\images to dist\images...
xcopy /E /I /Y "dist\public\images\*" "dist\images\"

if %ERRORLEVEL% EQU 0 (
    echo ✅ Images copied successfully!
    echo 🎉 Your images should now be available at /images/ in production
) else (
    echo ❌ Error copying images
    exit /b 1
)

echo.
echo 💡 Tip: You can now deploy the 'dist' folder to Render
echo    All images will be available at both:
echo    - /images/filename.webp (served by Express)
echo    - /public/images/filename.webp (served by Vite build)
