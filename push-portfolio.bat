@echo off
cd /d "C:\Users\tobil\Desktop\tobi-portfolio"

echo Removing stale git lock...
if exist ".git\index.lock" del /f ".git\index.lock"

echo Staging all changes...
git add -A

echo Committing...
git commit -m "feat: SEO, OG tags, favicon, blog, GitHub activity, a11y, dark mode OS pref, WebP hero"

echo Pushing to GitHub...
git push

echo.
echo Done! Press any key to close.
pause
