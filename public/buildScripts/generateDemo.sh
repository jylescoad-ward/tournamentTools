#!/bin/sh
webpack --config demo.webpack.config.js
rm -rfv ./../demo/*
rsync -rv --force dist/* ./../demo/
rm -rfv ./../demo/*.js
rsync -rv --force dist/*demo.js ./../demo/
rm -rfv dist/*demo.js
