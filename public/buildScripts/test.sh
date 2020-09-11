#!/bin/sh
node buildScripts/index.js pre
webpack --config webpack.config.js --development
echo "\r\n+-+-+-+-+ tournamneTools ready to test! +-+-+-+-+"
