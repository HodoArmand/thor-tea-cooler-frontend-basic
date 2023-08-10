@echo off

call 00_minify-css
call 00_minify-js

echo ****************************************************
echo    Production build process finished.
echo ****************************************************

pause