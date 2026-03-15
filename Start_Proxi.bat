@echo off
color 0B
echo ==================================================
echo         STARTING PROXI ATTENDANCE SYSTEM
echo ==================================================
echo.

echo [1/2] Starting Node.js Backend Server...
start "Proxi Backend" cmd /k "cd /d "%~dp0backend" && node server.js"

echo [2/2] Starting React Frontend Server...
start "Proxi Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ==================================================
echo ✅ Servers have been launched in separate windows!
echo ⚠️  IMPORTANT: Ensure your Arduino IDE Serial Monitor is CLOSED!
echo 🌐 The dashboard should open automatically or go to: http://localhost:5173/
echo ==================================================
echo.
pause
