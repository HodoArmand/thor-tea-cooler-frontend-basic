#!/bin/bash

echo "******************************"
echo "	Minifying JS."
echo "******************************"

if [ ! -d "public/js" ]; then
    mkdir -p "public/js"
fi

for file in src/js/*.js; do
    if [[ "$file" != *".min."* ]]; then
        echo "Minifying \"$file\""
        minify "$file" > "public/js/$(basename "$file")"
    else
        echo "Skipped: $file"
    fi
done

echo "******************************"
echo "	JS Minification finished."
echo "******************************"