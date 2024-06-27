#!/bin/bash
cd $(dirname ${BASH_SOURCE[0]}) &> /dev/null
cd ..
cp styles/styles.css output/styles.css
echo "/*! Konstantin Edunov 2024 */" > output/main.js
echo $(cat scripts/audio.js)\; >> output/main.js
echo $(cat scripts/canvas.js)\; >> output/main.js
echo $(cat scripts/game.js)\; >> output/main.js
echo $(cat scripts/image.js)\; >> output/main.js
echo $(cat scripts/logic.js)\; >> output/main.js
echo $(cat scripts/status.js)\; >> output/main.js
echo $(cat scripts/ver.js)\; >> output/main.js
uglifyjs output/main.js -c hoist_funs,hoist_vars -m reserved=['RETAIN'] --mangle-props --toplevel --comments /^!/ -o output/main.js