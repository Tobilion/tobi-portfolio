@echo off
cd /d "C:\Users\tobil\Desktop\tobi-portfolio"

if "%*"=="" (
  echo Usage: %~nx0 "commit message"
  pause
  exit /b 1
)

echo Removing stale git lock...
if exist ".git\index.lock" del /f ".git\index.lock"

echo Staging all changes...
git add -A

echo Committing...
git commit -m "%*"

echo Pushing to GitHub...
git push

echo.
echo Done! Press any key to close.
pause
