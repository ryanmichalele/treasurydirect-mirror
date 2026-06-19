$baseUrl = "https://www.treasurydirect.gov"
$mirrorDir = "C:\Users\SAM\OneDrive\Desktop\TREASURY DIRECT\treasurydirect-mirror"

# Create fonts directory
$fontsDir = Join-Path $mirrorDir "fonts"
if (-not (Test-Path $fontsDir)) { New-Item -ItemType Directory -Path $fontsDir -Force | Out-Null }

$fontWeights = @(
    "Black", "BlackItalic",
    "Bold", "BoldItalic",
    "ExtraBold", "ExtraBoldItalic",
    "ExtraLight", "ExtraLightItalic",
    "Italic",
    "Light", "LightItalic",
    "Medium", "MediumItalic",
    "Regular",
    "SemiBold", "SemiBoldItalic",
    "Thin", "ThinItalic"
)

$total = $fontWeights.Count * 2  # woff + woff2
$current = 0

foreach ($weight in $fontWeights) {
    foreach ($ext in @("woff2", "woff")) {
        $current++
        $filename = "PublicSans-$weight.$ext"
        $outFile = Join-Path $fontsDir $filename
        Write-Host "[$current/$total] Downloading fonts/$filename..."
        try {
            Invoke-WebRequest -Uri "$baseUrl/fonts/$filename" -OutFile $outFile -UseBasicParsing -ErrorAction Stop
            Write-Host "  OK"
        } catch {
            Write-Host "  FAILED: $_"
        }
    }
}

Write-Host "`n=== Font download complete ==="
