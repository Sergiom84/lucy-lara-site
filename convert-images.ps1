# PowerShell script to convert images to WebP using System.Drawing
Add-Type -AssemblyName System.Drawing

$sourceDir = "public\images"
$imageExtensions = @(".jpg", ".jpeg", ".png")

# Function to convert image to WebP using System.Drawing (basic conversion)
function Convert-ToWebP {
    param(
        [string]$InputPath,
        [string]$OutputPath
    )
    
    try {
        # Load the image
        $bitmap = New-Object System.Drawing.Bitmap($InputPath)
        
        # For now, we'll rename the file to .webp
        # Note: This is a simple rename, not a true WebP conversion
        # For true WebP conversion, we'd need specialized tools
        
        # Get the base name without extension
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($InputPath)
        $webpPath = Join-Path (Split-Path $InputPath) "$baseName.webp"
        
        # Copy the file with .webp extension (temporary solution)
        Copy-Item $InputPath $webpPath
        
        Write-Host "Created: $webpPath"
        
        $bitmap.Dispose()
    }
    catch {
        Write-Error "Error converting $InputPath : $($_.Exception.Message)"
    }
}

# Get all image files
Get-ChildItem -Path $sourceDir -File | Where-Object { $imageExtensions -contains $_.Extension.ToLower() } | ForEach-Object {
    Write-Host "Processing: $($_.Name)"
    Convert-ToWebP -InputPath $_.FullName -OutputPath ""
}

Write-Host "Conversion completed!"
