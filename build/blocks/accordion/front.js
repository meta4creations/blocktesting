/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/accordion/front.scss":
/*!*****************************************!*\
  !*** ./src/blocks/accordion/front.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./src/blocks/accordion/front.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _front_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./front.scss */ "./src/blocks/accordion/front.scss");

const block = `wp-block-block-testing-accordion`;
const blockSection = `wp-block-block-testing-accordion-section`;

// Get all elements with the class .wp-block-mm-nino-theme-accordion
const accordionNodes = document.querySelectorAll(`.${block}`);
const accordionElements = accordionNodes instanceof NodeList ? Array.from(accordionNodes) : [accordionNodes];

// Loop through each accordion element
accordionElements.forEach(accordionElement => {
  // Access the data attributes
  const openFirstItem = accordionElement.getAttribute("data-openFirstItem");
  const autoCloseOthers = accordionElement.getAttribute("data-autoCloseOthers");

  // Get all elements with the class .wp-block-mm-nino-theme-accordion-section within this accordion element
  const sectionNodes = accordionElement.querySelectorAll(`.${blockSection}`);
  const accordionSections = sectionNodes instanceof NodeList ? Array.from(sectionNodes) : [sectionNodes];

  // Open the first section
  if (true === openFirstItem && accordionSections.length) {
    accordionSections[0].dispatchEvent(new Event("open"));
  }

  // Listen for opening of section and close others
  accordionElement.addEventListener("sectionOpening", e => {
    const currentSection = e.detail.sectionElement;
    // Loop through each accordion section element
    if ("true" === String(autoCloseOthers)) {
      accordionSections.forEach(sectionElement => {
        if (currentSection !== sectionElement) {
          sectionElement.dispatchEvent(new Event("close"));
        }
      });
    }
  });
});
})();

/******/ })()
;
//# sourceMappingURL=front.js.map