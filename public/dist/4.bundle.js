(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./src/dropdown.js":
/*!*************************!*\
  !*** ./src/dropdown.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '.panel div.clickable', function (e) {\n    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this); //Heading\n    var $panel = $this.parent('.panel');\n    var $panel_body = $panel.children('.panel-body');\n    var $display = $panel_body.css('display');\n\n    if ($display == 'block') {\n        $panel_body.slideUp();\n        console.log(`[Dropdown] Closing Container`);\n    } else if($display == 'none') {\n        $panel_body.slideDown();\n        console.log(`[Dropdown] Opening Container`);\n    }\n});\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function(e){\n    var $classy = '.panel.autocollapse';\n\n    var $found = jquery__WEBPACK_IMPORTED_MODULE_0___default()($classy);\n    $found.find('.panel-body').hide();\n    $found.removeClass($classy);\n});\n\n\n//# sourceURL=webpack:///./src/dropdown.js?");

/***/ })

}]);