@echo off
echo Creating Shine Well NGO Directory Structure...

mkdir client 2>nul
mkdir client\public 2>nul
mkdir client\src 2>nul
mkdir client\src\components 2>nul
mkdir client\src\pages 2>nul
mkdir client\src\pages\admin 2>nul
mkdir client\src\layouts 2>nul
mkdir client\src\hooks 2>nul
mkdir client\src\services 2>nul
mkdir client\src\utils 2>nul
mkdir client\src\context 2>nul
mkdir client\src\assets 2>nul

mkdir server 2>nul
mkdir server\config 2>nul
mkdir server\controllers 2>nul
mkdir server\routes 2>nul
mkdir server\middleware 2>nul
mkdir server\models 2>nul
mkdir server\services 2>nul
mkdir server\utils 2>nul

echo Directory structure created successfully!
echo.
echo Next steps:
echo 1. Run this script: setup-structure.bat
echo 2. Navigate to server folder and run: npm install
echo 3. Navigate to client folder and run: npm install
echo 4. Copy .env.example to .env and configure your environment variables
echo 5. Start the server: npm run dev (in server folder)
echo 6. Start the client: npm run dev (in client folder)
