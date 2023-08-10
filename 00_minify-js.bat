@echo off

echo ******************************
echo 	Minifying JS.
echo ******************************

if not exist public\js mkdir public\js

for %%a in (src\js\*.js) do (
    echo %%a|findstr /i /L ".min.">nul

    if errorlevel 1 (
        echo Minifying "%%a"
        call minify %%a> public\js\%%~nxa
    ) else (
     echo Skipped: %%a
    )
)

echo ******************************
echo 	JS Minification finished.
echo ******************************