#!/bin/bash

./minify-css.sh
./minify-js.sh

echo "****************************************************"
echo "   Production build process finished."
echo "****************************************************"

read -p "Press Enter to continue..."