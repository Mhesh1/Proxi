@echo off
color 0C
echo ==================================================
echo         STOPPING PROXI ATTENDANCE SYSTEM
echo ==================================================
echo.
echo Stopping all Node.js instances...
taskkill /F /IM node.exe /T
echo.
echo ✅ All Proxi servers have been successfully stopped!
echo ==================================================
echo.
pause
