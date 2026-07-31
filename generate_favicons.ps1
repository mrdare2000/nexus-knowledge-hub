Add-Type -AssemblyName System.Drawing

function Create-FaviconPng {
    param(
        [string]$outputPath,
        [int]$size
    )

    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Background rounded rect / fill
    $bgColor = [System.Drawing.ColorTranslator]::FromHtml("#0a192f")
    $bgBrush = New-Object System.Drawing.SolidBrush($bgColor)
    $g.FillRectangle($bgBrush, 0, 0, $size, $size)

    # Subtle outer border line
    $borderColor = [System.Drawing.ColorTranslator]::FromHtml("#ff5a1f")
    $borderPen = New-Object System.Drawing.Pen($borderColor, [Math]::Max(1, [Math]::Round($size * 0.04)))
    $margin = [Math]::Max(1, [Math]::Round($size * 0.02))
    $g.DrawRectangle($borderPen, $margin, $margin, ($size - 2*$margin), ($size - 2*$margin))

    # Load logo if available and draw centered
    $logoPath = "d:\Antigravity Projects\nexus-knowledge-hub\images\logo.png"
    if (Test-Path $logoPath) {
        $logo = [System.Drawing.Image]::FromFile($logoPath)
        
        # Calculate aspect ratio fit
        $padding = [Math]::Round($size * 0.12)
        $availW = $size - (2 * $padding)
        $availH = $size - (2 * $padding)

        $ratio = [Math]::Min($availW / $logo.Width, $availH / $logo.Height)
        $destW = [Math]::Round($logo.Width * $ratio)
        $destH = [Math]::Round($logo.Height * $ratio)

        $destX = [Math]::Round(($size - $destW) / 2)
        $destY = [Math]::Round(($size - $destH) / 2)

        $g.DrawImage($logo, $destX, $destY, $destW, $destH)
        $logo.Dispose()
    }

    $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bitmap.Dispose()
    Write-Host "Generated: $outputPath ($size x $size)"
}

$baseDir = "d:\Antigravity Projects\nexus-knowledge-hub"

Create-FaviconPng -outputPath "$baseDir\favicon-16x16.png" -size 16
Create-FaviconPng -outputPath "$baseDir\favicon-32x32.png" -size 32
Create-FaviconPng -outputPath "$baseDir\favicon-48x48.png" -size 48
Create-FaviconPng -outputPath "$baseDir\favicon-96x96.png" -size 96
Create-FaviconPng -outputPath "$baseDir\apple-touch-icon.png" -size 180
Create-FaviconPng -outputPath "$baseDir\favicon-192x192.png" -size 192
Create-FaviconPng -outputPath "$baseDir\favicon-512x512.png" -size 512

# Copy 48x48 or 32x32 as favicon.ico for standard fallback
Copy-Item "$baseDir\favicon-48x48.png" "$baseDir\favicon.ico" -Force
Write-Host "Generated: favicon.ico"
