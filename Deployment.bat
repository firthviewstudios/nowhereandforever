@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

REM === 1. Zip Windows build safely ===
powershell -NoProfile -Command "Compress-Archive -Path 'C:\RMMZ\Builds\Windows\Nowhere and Forever\*' -DestinationPath 'C:\RMMZ\Builds\Windows\NowhereAndForever.zip' -Force"

REM === 2. Copy Android build to www ===
xcopy "C:\RMMZ\Builds\Android\Nowhere and Forever\*" "C:\Users\liam0\mygame\www\" /E /H /C /I /Y

REM === 3. Overwrite main.js ===
copy /Y "C:\Users\liam0\Documents\RMMZ\Nowhere and Forever\mainUseThisToOverwrite.js" "C:\Users\liam0\mygame\www\js\main.js"

REM === 4. Prepare Cordova project ===
cd /d C:\Users\liam0

REM Remove old project folder if it exists
if exist "mygame" rd /s /q "mygame"

REM Create new Cordova project
start /wait cmd /c "cordova create mygame com.nowhereandforever.app \"Nowhere and Forever\""

cd mygame

REM Remove old Android platform if exists
start /wait cmd /c "cordova platform rm android"

REM Add Android platform
start /wait cmd /c "cordova platform add android@14.0.1"

REM === 5. Build APK ===
start /wait cmd /c "cordova build android"

REM === 6. Copy APK to destination ===
copy /Y "C:\Users\liam0\mygame\platforms\android\app\build\outputs\apk\debug\app-debug.apk" "C:\RMMZ\Builds\Android\NowhereAndForever.apk"

echo ✅ Deployment complete!
pause
