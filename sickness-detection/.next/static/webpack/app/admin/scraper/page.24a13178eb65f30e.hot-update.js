"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/admin/scraper/page",{

/***/ "(app-pages-browser)/./src/app/admin/scraper/components/AddWebDialog.tsx":
/*!***********************************************************!*\
  !*** ./src/app/admin/scraper/components/AddWebDialog.tsx ***!
  \***********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AddWebDialog: function() { return /* binding */ AddWebDialog; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/ui/dialog */ \"(app-pages-browser)/./src/components/ui/dialog.tsx\");\n\n\nfunction AddWebDialog() {\n    const handleUpload = ()=>{\n        const fileInput = document.getElementById(\"scraper-file\");\n        const file = fileInput.files[0];\n        const className = document.getElementById(\"class-name\").value;\n        const classFunction = document.getElementById(\"class-function\").value;\n        if (file && className && classFunction) {\n            if (file.name.endsWith(\".py\")) {\n                const formData = new FormData();\n                formData.append(\"file\", file);\n                formData.append(\"className\", className);\n                formData.append(\"classFunction\", classFunction);\n                const xhr = new XMLHttpRequest();\n                xhr.open(\"POST\", \"/upload_scraper\", true);\n                xhr.onload = function() {\n                    if (xhr.status === 200) {\n                        console.log(\"File uploaded successfully\");\n                        alert(xhr.responseText);\n                    } else {\n                        console.error(\"Error uploading file\");\n                        alert(\"Error: \" + xhr.responseText);\n                    }\n                };\n                xhr.send(formData);\n            } else {\n                alert(\"Invalid file type. Please upload a .py file.\");\n            }\n        } else {\n            alert(\"Please select a file and provide a class name and function.\");\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogTrigger, {\n                className: \"bg-[#344966] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mr-2\",\n                children: \"Add Website\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\mouss\\\\OneDrive\\\\Bureau\\\\PFE\\\\disease_prediction\\\\sickness-detection\\\\src\\\\app\\\\admin\\\\scraper\\\\components\\\\AddWebDialog.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogContent, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogHeader, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogTitle, {\n                            children: \"Add Website\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\mouss\\\\OneDrive\\\\Bureau\\\\PFE\\\\disease_prediction\\\\sickness-detection\\\\src\\\\app\\\\admin\\\\scraper\\\\components\\\\AddWebDialog.tsx\",\n                            lineNumber: 54,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    type: \"text\",\n                                    id: \"class-name\",\n                                    placeholder: \"Enter class name\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\mouss\\\\OneDrive\\\\Bureau\\\\PFE\\\\disease_prediction\\\\sickness-detection\\\\src\\\\app\\\\admin\\\\scraper\\\\components\\\\AddWebDialog.tsx\",\n                                    lineNumber: 56,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    type: \"text\",\n                                    id: \"class-function\",\n                                    placeholder: \"Enter class function\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\mouss\\\\OneDrive\\\\Bureau\\\\PFE\\\\disease_prediction\\\\sickness-detection\\\\src\\\\app\\\\admin\\\\scraper\\\\components\\\\AddWebDialog.tsx\",\n                                    lineNumber: 57,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    type: \"file\",\n                                    id: \"scraper-file\",\n                                    name: \"scraper-file\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\mouss\\\\OneDrive\\\\Bureau\\\\PFE\\\\disease_prediction\\\\sickness-detection\\\\src\\\\app\\\\admin\\\\scraper\\\\components\\\\AddWebDialog.tsx\",\n                                    lineNumber: 58,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"bg-[#344966] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mx-2\",\n                                    onClick: handleUpload,\n                                    children: \"Upload Scraper File\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\mouss\\\\OneDrive\\\\Bureau\\\\PFE\\\\disease_prediction\\\\sickness-detection\\\\src\\\\app\\\\admin\\\\scraper\\\\components\\\\AddWebDialog.tsx\",\n                                    lineNumber: 59,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"bg-[#344966] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mx-2\",\n                                    onClick: handleUpload,\n                                    children: \"dawload \"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\mouss\\\\OneDrive\\\\Bureau\\\\PFE\\\\disease_prediction\\\\sickness-detection\\\\src\\\\app\\\\admin\\\\scraper\\\\components\\\\AddWebDialog.tsx\",\n                                    lineNumber: 60,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\mouss\\\\OneDrive\\\\Bureau\\\\PFE\\\\disease_prediction\\\\sickness-detection\\\\src\\\\app\\\\admin\\\\scraper\\\\components\\\\AddWebDialog.tsx\",\n                    lineNumber: 53,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\mouss\\\\OneDrive\\\\Bureau\\\\PFE\\\\disease_prediction\\\\sickness-detection\\\\src\\\\app\\\\admin\\\\scraper\\\\components\\\\AddWebDialog.tsx\",\n                lineNumber: 52,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\mouss\\\\OneDrive\\\\Bureau\\\\PFE\\\\disease_prediction\\\\sickness-detection\\\\src\\\\app\\\\admin\\\\scraper\\\\components\\\\AddWebDialog.tsx\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, this);\n}\n_c = AddWebDialog;\nvar _c;\n$RefreshReg$(_c, \"AddWebDialog\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvYWRtaW4vc2NyYXBlci9jb21wb25lbnRzL0FkZFdlYkRpYWxvZy50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1nQztBQUl6QixTQUFTSztJQUVkLE1BQU1DLGVBQWU7UUFDbkIsTUFBTUMsWUFBWUMsU0FBU0MsY0FBYyxDQUFDO1FBQzFDLE1BQU1DLE9BQU9ILFVBQVVJLEtBQUssQ0FBQyxFQUFFO1FBQy9CLE1BQU1DLFlBQVksU0FBVUgsY0FBYyxDQUFDLGNBQW1DSSxLQUFLO1FBQ25GLE1BQU1DLGdCQUFnQixTQUFVTCxjQUFjLENBQUMsa0JBQXVDSSxLQUFLO1FBRTNGLElBQUlILFFBQVFFLGFBQWFFLGVBQWU7WUFDcEMsSUFBSUosS0FBS0ssSUFBSSxDQUFDQyxRQUFRLENBQUMsUUFBUTtnQkFDM0IsTUFBTUMsV0FBVyxJQUFJQztnQkFDckJELFNBQVNFLE1BQU0sQ0FBQyxRQUFRVDtnQkFDeEJPLFNBQVNFLE1BQU0sQ0FBQyxhQUFhUDtnQkFDN0JLLFNBQVNFLE1BQU0sQ0FBQyxpQkFBaUJMO2dCQUVqQyxNQUFNTSxNQUFNLElBQUlDO2dCQUNoQkQsSUFBSUUsSUFBSSxDQUFDLFFBQVEsbUJBQW1CO2dCQUNwQ0YsSUFBSUcsTUFBTSxHQUFHO29CQUNULElBQUlILElBQUlJLE1BQU0sS0FBSyxLQUFLO3dCQUNwQkMsUUFBUUMsR0FBRyxDQUFDO3dCQUNaQyxNQUFNUCxJQUFJUSxZQUFZO29CQUMxQixPQUFPO3dCQUNISCxRQUFRSSxLQUFLLENBQUM7d0JBQ2RGLE1BQU0sWUFBWVAsSUFBSVEsWUFBWTtvQkFDdEM7Z0JBQ0o7Z0JBQ0FSLElBQUlVLElBQUksQ0FBQ2I7WUFDYixPQUFPO2dCQUNIVSxNQUFNO1lBQ1Y7UUFDSixPQUFPO1lBQ0hBLE1BQU07UUFDVjtJQUNKO0lBR0UscUJBQ0UsOERBQUMzQix5REFBTUE7OzBCQUNMLDhEQUFDSSxnRUFBYUE7Z0JBQUNRLFdBQVU7MEJBQThFOzs7Ozs7MEJBR3ZHLDhEQUFDWCxnRUFBYUE7MEJBQ1osNEVBQUNDLCtEQUFZQTs7c0NBQ1gsOERBQUNDLDhEQUFXQTtzQ0FBQzs7Ozs7O3NDQUNiOzs4Q0FDRSw4REFBQzRCO29DQUFNQyxNQUFLO29DQUFPQyxJQUFHO29DQUFhQyxhQUFZOzs7Ozs7OENBQy9DLDhEQUFDSDtvQ0FBTUMsTUFBSztvQ0FBT0MsSUFBRztvQ0FBaUJDLGFBQVk7Ozs7Ozs4Q0FDbkQsOERBQUNIO29DQUFNQyxNQUFLO29DQUFPQyxJQUFHO29DQUFlbEIsTUFBSzs7Ozs7OzhDQUMxQyw4REFBQ29CO29DQUFPdkIsV0FBVTtvQ0FBNkV3QixTQUFTOUI7OENBQWM7Ozs7Ozs4Q0FDdEgsOERBQUM2QjtvQ0FBT3ZCLFdBQVU7b0NBQTZFd0IsU0FBUzlCOzhDQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTWxJO0tBdkRnQkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9hZG1pbi9zY3JhcGVyL2NvbXBvbmVudHMvQWRkV2ViRGlhbG9nLnRzeD81YTY0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlhbG9nLFxyXG4gIERpYWxvZ0NvbnRlbnQsXHJcbiAgRGlhbG9nSGVhZGVyLFxyXG4gIERpYWxvZ1RpdGxlLFxyXG4gIERpYWxvZ1RyaWdnZXIsXHJcbn0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9kaWFsb2dcIjtcclxuaW1wb3J0IHsgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBBZGRXZWJEaWFsb2coKSB7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVVwbG9hZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGZpbGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JhcGVyLWZpbGUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgY29uc3QgZmlsZSA9IGZpbGVJbnB1dC5maWxlc1swXTtcclxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xhc3MtbmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG4gICAgY29uc3QgY2xhc3NGdW5jdGlvbiA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xhc3MtZnVuY3Rpb24nKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuXHJcbiAgICBpZiAoZmlsZSAmJiBjbGFzc05hbWUgJiYgY2xhc3NGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChmaWxlLm5hbWUuZW5kc1dpdGgoJy5weScpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xyXG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2NsYXNzTmFtZScsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnY2xhc3NGdW5jdGlvbicsIGNsYXNzRnVuY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJywgJy91cGxvYWRfc2NyYXBlcicsIHRydWUpO1xyXG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwbG9hZGluZyBmaWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yOiAnICsgeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHhoci5zZW5kKGZvcm1EYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydCgnSW52YWxpZCBmaWxlIHR5cGUuIFBsZWFzZSB1cGxvYWQgYSAucHkgZmlsZS4nKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdQbGVhc2Ugc2VsZWN0IGEgZmlsZSBhbmQgcHJvdmlkZSBhIGNsYXNzIG5hbWUgYW5kIGZ1bmN0aW9uLicpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxEaWFsb2c+XHJcbiAgICAgIDxEaWFsb2dUcmlnZ2VyIGNsYXNzTmFtZT1cImJnLVsjMzQ0OTY2XSBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgcHktMiBweC00IHJvdW5kZWQgbXItMlwiPlxyXG4gICAgICAgIEFkZCBXZWJzaXRlXHJcbiAgICAgIDwvRGlhbG9nVHJpZ2dlcj5cclxuICAgICAgPERpYWxvZ0NvbnRlbnQ+XHJcbiAgICAgICAgPERpYWxvZ0hlYWRlcj5cclxuICAgICAgICAgIDxEaWFsb2dUaXRsZT5BZGQgV2Vic2l0ZTwvRGlhbG9nVGl0bGU+XHJcbiAgICAgICAgICA8PlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImNsYXNzLW5hbWVcIiBwbGFjZWhvbGRlcj1cIkVudGVyIGNsYXNzIG5hbWVcIiAvPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImNsYXNzLWZ1bmN0aW9uXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBjbGFzcyBmdW5jdGlvblwiIC8+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGlkPVwic2NyYXBlci1maWxlXCIgbmFtZT1cInNjcmFwZXItZmlsZVwiIC8+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYmctWyMzNDQ5NjZdIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBweS0yIHB4LTQgcm91bmRlZCBteC0yXCJvbkNsaWNrPXtoYW5kbGVVcGxvYWR9PlVwbG9hZCBTY3JhcGVyIEZpbGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJiZy1bIzM0NDk2Nl0gaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHB5LTIgcHgtNCByb3VuZGVkIG14LTJcIm9uQ2xpY2s9e2hhbmRsZVVwbG9hZH0+ZGF3bG9hZCA8L2J1dHRvbj5cclxuICAgICAgICA8Lz5cclxuICAgICAgICA8L0RpYWxvZ0hlYWRlcj5cclxuICAgICAgPC9EaWFsb2dDb250ZW50PlxyXG4gICAgPC9EaWFsb2c+XHJcbiAgKTtcclxufVxyXG5cclxuICBcclxuXHJcblxyXG4iXSwibmFtZXMiOlsiRGlhbG9nIiwiRGlhbG9nQ29udGVudCIsIkRpYWxvZ0hlYWRlciIsIkRpYWxvZ1RpdGxlIiwiRGlhbG9nVHJpZ2dlciIsIkFkZFdlYkRpYWxvZyIsImhhbmRsZVVwbG9hZCIsImZpbGVJbnB1dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmaWxlIiwiZmlsZXMiLCJjbGFzc05hbWUiLCJ2YWx1ZSIsImNsYXNzRnVuY3Rpb24iLCJuYW1lIiwiZW5kc1dpdGgiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwiY29uc29sZSIsImxvZyIsImFsZXJ0IiwicmVzcG9uc2VUZXh0IiwiZXJyb3IiLCJzZW5kIiwiaW5wdXQiLCJ0eXBlIiwiaWQiLCJwbGFjZWhvbGRlciIsImJ1dHRvbiIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/admin/scraper/components/AddWebDialog.tsx\n"));

/***/ })

});