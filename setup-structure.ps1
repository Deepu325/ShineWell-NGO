# Shinewell NGO - Directory Setup Script
Write-Host "Creating Shinewell NGO Directory Structure..." -ForegroundColor Green

$directories = @(
    "client\public",
    "client\src\components",
    "client\src\pages",
    "client\src\pages\admin",
    "client\src\layouts",
    "client\src\hooks",
    "client\src\services",
    "client\src\utils",
    "client\src\context",
    "client\src\assets",
    "server\config",
    "server\controllers",
    "server\routes",
    "server\middleware",
    "server\models",
    "server\services",
    "server\utils"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Write-Host "Created: $dir" -ForegroundColor Cyan
}

Write-Host "`nDirectory structure created successfully!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. cd server && npm install"
Write-Host "2. cd client && npm install"
Write-Host "3. Copy .env.example to .env and configure"
Write-Host "4. Run 'npm run dev' in both server and client folders"
