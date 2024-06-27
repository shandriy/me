#!/bin/bash
cd $(dirname ${BASH_SOURCE[0]})/.. &> /dev/null
uglifyjs $(find scripts/* -type f) -c hoist_funs,hoist_vars --toplevel --comments all --beautify --webkit > output/main.js