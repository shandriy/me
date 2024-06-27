#!/bin/bash
cd $(dirname ${BASH_SOURCE[0]})/.. &> /dev/null
echo "/*! Konstantin Edunov 2024, compiled $(date) with mishoo/UglifyJS on GitHub */" > output/main.js
uglifyjs $(find scripts/* -type f) -c hoist_funs,hoist_vars -m reserved=[RETAIN] --mangle-props --toplevel --webkit >> output/main.js