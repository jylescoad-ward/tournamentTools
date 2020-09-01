(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./src/misc.js":
/*!*********************!*\
  !*** ./src/misc.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {global.randomString = function(length) {\n    var charset = \"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890\";\n    var retVal = \"\";\n    for (var i = 0, n = charset.length; i < length; ++i) {\n        retVal += charset.charAt(Math.floor(Math.random() * n));\n    }\n    return retVal;\n}\n\nglobal.downloadString = function(filename, text) {\n  var element = document.createElement('a');\n  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));\n  element.setAttribute('download', filename);\n\n  element.style.display = 'none';\n  document.body.appendChild(element);\n\n  element.click();\n\n  document.body.removeChild(element);\n}\n\nglobal.getCookie = function(cname) {\n\tvar name = cname + \"=\";\n\tvar decodedCookie = decodeURIComponent(document.cookie);\n\tvar ca = decodedCookie.split(';');\n\tfor(var i = 0; i <ca.length; i++) {\n\t\tvar c = ca[i];\n\t\twhile (c.charAt(0) == ' ') {\n\t\t\tc = c.substring(1);\n\t\t}\n\t\tif (c.indexOf(name) == 0) {\n\t\t\treturn c.substring(name.length, c.length);\n\t\t}\n\t}\n\treturn \"\";\n}\nglobal.setCookie = function(cname,cvalue) {\n\tvar d = new Date();\n\td.setTime(d.getTime() + 604800000);\n\tvar expires = \"expires=\"+ d.toUTCString();\n\tdocument.cookie = cname + \"=\" + cvalue + \";\" + expires + \";path=/\";\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/misc.js?");

/***/ })

}]);