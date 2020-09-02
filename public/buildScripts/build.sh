#!/bin/bash
cd buildScripts
node index.js pre
cd ..
rm -rf dist/*.js
npx webpack --config webpack.config.js
touch .autoZipTemp.sh
node buildScripts/index.js post
rm -rf .autoZipTemp.sh
