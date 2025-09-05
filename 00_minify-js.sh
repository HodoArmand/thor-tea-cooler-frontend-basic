#!/bin/bash

echo "******************************"
echo "    Minifying JS."
echo "******************************"

mkdir -p public/js

for file in src/js/*.js; do
    if ! echo "$file" | grep -i -q ".min."; then
        echo "Minifying \"$file\""
        filename=$(basename "$file")
        npx minify "$file" > "public/js/$filename"
    else
        echo "Skipped: $file"
    fi
done

echo "******************************"
echo "    JS Minification finished."
echo "******************************"