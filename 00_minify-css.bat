@echo off

echo ******************************
echo 	Minifying CSS.
echo ******************************

call npx tailwindcss -i src/css/tea.css -o public/css/tea.css --minify

echo ******************************
echo 	CSS Minification finished.
echo ******************************