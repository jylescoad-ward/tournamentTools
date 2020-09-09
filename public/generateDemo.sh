#!/bin/bash
npm run generateDemo
rm -rf ./../demo/*
cp -rf dist/* ./../demo/
rm -rf ./../demo/*.js
cp dist/*demo.js ./../demo/
rm -rf dist/*demo.js
