#!/bin/bash

echo "******************************"
echo "	Minifying CSS."
echo "******************************"

npx tailwindcss -i src/css/tea.css -o public/css/tea.css --minify

echo "******************************"
echo "	CSS Minification finished."
echo "******************************"