
/*! *****************************************************************************************************************************
* Copyright (c) Tuvalsoft Corporation. All rights reserved.                                                                     *
*                                                                                                                               *
* ████████╗██╗   ██╗██╗   ██╗ █████╗ ██╗         ███████╗██████╗  █████╗ ███╗   ███╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗ *
* ╚══██╔══╝██║   ██║██║   ██║██╔══██╗██║         ██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝ *
*    ██║   ██║   ██║██║   ██║███████║██║         █████╗  ██████╔╝███████║██╔████╔██║█████╗  ██║ █╗ ██║██║   ██║██████╔╝█████╔╝  *
*    ██║   ██║   ██║╚██╗ ██╔╝██╔══██║██║         ██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██╔═██╗  *
*    ██║   ╚██████╔╝ ╚████╔╝ ██║  ██║███████╗    ██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗ *
*    ╚═╝    ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ *
*                                                                                                                               *
*                                                                                                                               *
* This file is part of Tuval Framework.                                                                                         *
* Copyright (c) Tuvalsoft 2018 All rights reserved.                                                                             *
*                                                                                                                               *
* Licensed under the GNU General Public License v3.0.                                                                           *
* More info at: https://choosealicense.com/licenses/gpl-3.0/                                                                    *
* Tuval Framework Created By Tuvalsoft in 2018                                                                                  *
******************************************************************************************************************************@*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tuval$core"), require("tuval$forms"), require("tuval$components$charts"), require("tuval$components$diagram"), require("tuval$graphics"), require("tuval$core$graphics"));
	else if(typeof define === 'function' && define.amd)
		define(["tuval$core", "tuval$forms", "tuval$components$charts", "tuval$components$diagram", "tuval$graphics", "tuval$core$graphics"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tuval$core"), require("tuval$forms"), require("tuval$components$charts"), require("tuval$components$diagram"), require("tuval$graphics"), require("tuval$core$graphics")) : factory(root["tuval$core"], root["tuval$forms"], root["tuval$components$charts"], root["tuval$components$diagram"], root["tuval$graphics"], root["tuval$core$graphics"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function(__WEBPACK_EXTERNAL_MODULE__tuval_core__, __WEBPACK_EXTERNAL_MODULE__tuval_forms__, __WEBPACK_EXTERNAL_MODULE__tuval_components_charts__, __WEBPACK_EXTERNAL_MODULE__tuval_components_diagram__, __WEBPACK_EXTERNAL_MODULE__tuval_graphics__, __WEBPACK_EXTERNAL_MODULE__tuval_cg__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@tuval/brokers/client/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@tuval/brokers/client/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(/*! @tuval/core */ "@tuval/core"));
	else { var i, a; }
})(self, function(__WEBPACK_EXTERNAL_MODULE__tuval_core__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AppStore/GetAppsRequest.ts":
/*!****************************************!*\
  !*** ./src/AppStore/GetAppsRequest.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_858__) => {

__nested_webpack_require_858__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_858__.d(__webpack_exports__, {
/* harmony export */   "GetAppsRequest": () => (/* binding */ GetAppsRequest)
/* harmony export */ });
/* harmony import */ var _RACRequest__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_858__(/*! ../RACRequest */ "./src/RACRequest.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var GetAppsRequest = /** @class */ (function (_super) {
    __extends(GetAppsRequest, _super);
    function GetAppsRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetAppsRequest.prototype.GetRequestObject = function () {
        return {
            name: "AppStore",
            action: "GetAllApps",
            Inputs: {},
            Output: "workbook"
        };
    };
    return GetAppsRequest;
}(_RACRequest__WEBPACK_IMPORTED_MODULE_0__.RACRequest));



/***/ }),

/***/ "./src/AppStore/index.ts":
/*!*******************************!*\
  !*** ./src/AppStore/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_2754__) => {

__nested_webpack_require_2754__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_2754__.d(__webpack_exports__, {
/* harmony export */   "GetAppsRequest": () => (/* reexport safe */ _GetAppsRequest__WEBPACK_IMPORTED_MODULE_0__.GetAppsRequest)
/* harmony export */ });
/* harmony import */ var _GetAppsRequest__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_2754__(/*! ./GetAppsRequest */ "./src/AppStore/GetAppsRequest.ts");



/***/ }),

/***/ "./src/Authentication/LinkedIn/GetProfileRequest.ts":
/*!**********************************************************!*\
  !*** ./src/Authentication/LinkedIn/GetProfileRequest.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_3518__) => {

__nested_webpack_require_3518__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_3518__.d(__webpack_exports__, {
/* harmony export */   "GetProfileRequest": () => (/* binding */ GetProfileRequest)
/* harmony export */ });
/* harmony import */ var _RACRequest__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_3518__(/*! ../../RACRequest */ "./src/RACRequest.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var GetProfileRequest = /** @class */ (function (_super) {
    __extends(GetProfileRequest, _super);
    function GetProfileRequest(code) {
        var _this = _super.call(this) || this;
        _this.code = code;
        return _this;
    }
    GetProfileRequest.prototype.GetRequestObject = function () {
        return {
            name: "Authentication",
            action: "GetProfileInfo",
            Inputs: {
                code: this.code
            },
            Output: "workbook"
        };
    };
    return GetProfileRequest;
}(_RACRequest__WEBPACK_IMPORTED_MODULE_0__.RACRequest));



/***/ }),

/***/ "./src/Desktop/GetDesktopAppsRequest.ts":
/*!**********************************************!*\
  !*** ./src/Desktop/GetDesktopAppsRequest.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_5584__) => {

__nested_webpack_require_5584__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_5584__.d(__webpack_exports__, {
/* harmony export */   "GetDesktopAppsRequest": () => (/* binding */ GetDesktopAppsRequest)
/* harmony export */ });
/* harmony import */ var _RACRequest__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_5584__(/*! ../RACRequest */ "./src/RACRequest.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var GetDesktopAppsRequest = /** @class */ (function (_super) {
    __extends(GetDesktopAppsRequest, _super);
    function GetDesktopAppsRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetDesktopAppsRequest.prototype.GetRequestObject = function () {
        return {
            name: "Desktop",
            action: "GetUserApps",
            Inputs: {
                envName: 'BpmGenesis',
                user: 'stan'
            },
            Output: "workbook"
        };
    };
    return GetDesktopAppsRequest;
}(_RACRequest__WEBPACK_IMPORTED_MODULE_0__.RACRequest));



/***/ }),

/***/ "./src/Desktop/index.ts":
/*!******************************!*\
  !*** ./src/Desktop/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_7609__) => {

__nested_webpack_require_7609__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_7609__.d(__webpack_exports__, {
/* harmony export */   "GetDesktopAppsRequest": () => (/* reexport safe */ _GetDesktopAppsRequest__WEBPACK_IMPORTED_MODULE_0__.GetDesktopAppsRequest)
/* harmony export */ });
/* harmony import */ var _GetDesktopAppsRequest__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_7609__(/*! ./GetDesktopAppsRequest */ "./src/Desktop/GetDesktopAppsRequest.ts");



/***/ }),

/***/ "./src/EnsembleBroker/index.ts":
/*!*************************************!*\
  !*** ./src/EnsembleBroker/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_8330__) => {

__nested_webpack_require_8330__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_8330__.d(__webpack_exports__, {
/* harmony export */   "EbaProject": () => (/* binding */ EbaProject),
/* harmony export */   "EnsembleBrokerClient": () => (/* binding */ EnsembleBrokerClient)
/* harmony export */ });
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_8330__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_8330__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var EbaProject = /** @class */ (function () {
    function EbaProject() {
    }
    return EbaProject;
}());

var EnsembleBrokerClient = /** @class */ (function () {
    function EnsembleBrokerClient() {
        this.ConfigService = _tuval_core__WEBPACK_IMPORTED_MODULE_0__.instance.resolve('IConfigService');
    }
    EnsembleBrokerClient.prototype.Login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('user_name', 'cvx');
                        form.append('password', 'xcv');
                        form.append('lang', 'xcv');
                        // const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_this.ConfigService.GetEnsembleUrl() + '/process/Login', form)
                            .then(function (response) {
                            resolve(response.data.Result);
                        });
                    })];
            });
        });
    };
    EnsembleBrokerClient.prototype.GetProcesses = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('token', token);
                        // const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_this.ConfigService.GetEnsembleUrl() + '/process/GetProcesses', form)
                            .then(function (response) {
                            resolve(response.data.Result);
                        });
                    })];
            });
        });
    };
    EnsembleBrokerClient.prototype.GetProcessSteps = function (token, process_id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('token', token);
                        form.append('process_id', process_id);
                        // const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_this.ConfigService.GetEnsembleUrl() + '/process/GetProcessSteps', form)
                            .then(function (response) {
                            resolve(response.data.Result);
                        });
                    })];
            });
        });
    };
    return EnsembleBrokerClient;
}());



/***/ }),

/***/ "./src/Message/MessageRequest.ts":
/*!***************************************!*\
  !*** ./src/Message/MessageRequest.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_14884__) => {

__nested_webpack_require_14884__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_14884__.d(__webpack_exports__, {
/* harmony export */   "MessageRequest": () => (/* binding */ MessageRequest),
/* harmony export */   "BrokerActionRequest": () => (/* binding */ BrokerActionRequest),
/* harmony export */   "ShowMessageRequest": () => (/* binding */ ShowMessageRequest),
/* harmony export */   "ReadCsvRequest": () => (/* binding */ ReadCsvRequest)
/* harmony export */ });
/* harmony import */ var _RACRequest__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_14884__(/*! ../RACRequest */ "./src/RACRequest.ts");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_14884__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_14884__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var MessageRequest = /** @class */ (function (_super) {
    __extends(MessageRequest, _super);
    function MessageRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageRequest.prototype.GetRequestObject = function () {
        return {
            name: "Message",
            action: "Show",
            Inputs: {
                title: 'test',
                message: 'test'
            },
            Output: "workbook"
        };
    };
    return MessageRequest;
}(_RACRequest__WEBPACK_IMPORTED_MODULE_0__.RACRequest));

var BrokerActionRequest = /** @class */ (function () {
    function BrokerActionRequest(url) {
        this.url = '';
        this.OnMessageRecieved = null;
        this.url = url;
        this.buffer = new _tuval_core__WEBPACK_IMPORTED_MODULE_1__.TBuffer();
    }
    BrokerActionRequest.prototype.WriteStringToBuffer = function (str) {
        var strBytes = _tuval_core__WEBPACK_IMPORTED_MODULE_1__.Encoding.UTF8.GetBytes(str);
        this.buffer.writeInt32(strBytes.length);
        this.buffer.writeBytes(strBytes);
    };
    BrokerActionRequest.prototype.AddInt32Parameter = function (value) {
        this.buffer.writeInt32(value);
    };
    BrokerActionRequest.prototype.AddStringParameter = function (value) {
        var strBytes = _tuval_core__WEBPACK_IMPORTED_MODULE_1__.Encoding.UTF8.GetBytes(value);
        this.buffer.writeInt32(strBytes.length);
        this.buffer.writeBytes(strBytes);
    };
    BrokerActionRequest.prototype.Serialize = function () {
        this.buffer.reset();
        this.buffer.writeInt32(4); // Execute Action constant
        this.buffer.writeInt32(this.HandshakeId);
        this.WriteStringToBuffer(this.GetActionName());
    };
    BrokerActionRequest.prototype.Send = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.Serialize();
            _this.socket = new WebSocket(_this.url);
            _this.socket.addEventListener('open', function (event) {
                _this.socket.addEventListener('message', function (message) {
                    if (_this.OnMessageRecieved != null) {
                        _this.OnMessageRecieved(message);
                    }
                });
                _this.socket.send(_this.buffer.buffer);
            });
            _this.OnMessageRecieved = function (message) {
                var a = new ArrayBuffer(100);
                if (_tuval_core__WEBPACK_IMPORTED_MODULE_1__.is.string(message.data)) {
                    resolve(JSON.parse(message.data));
                }
                else {
                    message.data.arrayBuffer().then(function (_buffer) {
                        var buffer = new _tuval_core__WEBPACK_IMPORTED_MODULE_1__.TBuffer(_buffer);
                        buffer.readInt32(); // Requests.Response
                        var h = buffer.readInt32();
                        if (h === _this.HandshakeId) {
                            if (buffer.readInt32() === 1) { // Success
                                var byteLenght = buffer.readInt32();
                                var bytes = buffer.readBytes(byteLenght);
                                var str = _tuval_core__WEBPACK_IMPORTED_MODULE_1__.Encoding.UTF8.GetString(bytes);
                                var obj = JSON.parse(str);
                                if (obj[0] && obj[0].Value != null) {
                                    var bytes_1 = _tuval_core__WEBPACK_IMPORTED_MODULE_1__.Convert.FromBase64String(obj[0].Value);
                                    var str_1 = _tuval_core__WEBPACK_IMPORTED_MODULE_1__.Encoding.UTF8.GetString(bytes_1);
                                    resolve(JSON.parse(str_1));
                                }
                                else {
                                    resolve([]);
                                }
                            }
                        }
                    });
                }
            };
        });
    };
    return BrokerActionRequest;
}());

var ShowMessageRequest = /** @class */ (function (_super) {
    __extends(ShowMessageRequest, _super);
    function ShowMessageRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowMessageRequest.prototype.GetActionName = function () {
        return 'Show';
    };
    ShowMessageRequest.prototype.Serialize = function () {
        _super.prototype.Serialize.call(this);
        this.AddStringParameter('test');
        this.AddStringParameter('test');
    };
    return ShowMessageRequest;
}(BrokerActionRequest));

var ReadCsvRequest = /** @class */ (function (_super) {
    __extends(ReadCsvRequest, _super);
    function ReadCsvRequest(url, csv) {
        var _this = _super.call(this, url) || this;
        _this.csv = csv;
        return _this;
    }
    ReadCsvRequest.prototype.GetActionName = function () {
        return 'ReadCsv';
    };
    ReadCsvRequest.prototype.Serialize = function () {
        _super.prototype.Serialize.call(this);
        this.AddStringParameter(this.csv);
    };
    return ReadCsvRequest;
}(BrokerActionRequest));



/***/ }),

/***/ "./src/RACRequest.ts":
/*!***************************!*\
  !*** ./src/RACRequest.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_22091__) => {

__nested_webpack_require_22091__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_22091__.d(__webpack_exports__, {
/* harmony export */   "RACRequest": () => (/* binding */ RACRequest)
/* harmony export */ });
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22091__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_22091__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_0__);

var RACRequest = /** @class */ (function () {
    function RACRequest() {
        this.ExecuteActionId = 1000;
        this.OnMessageRecieved = null;
    }
    RACRequest.prototype.WriteStringToBuffer = function (str, buffer) {
        var strBytes = _tuval_core__WEBPACK_IMPORTED_MODULE_0__.Encoding.UTF8.GetBytes(str);
        buffer.writeInt32(strBytes.length);
        buffer.writeBytes(strBytes);
    };
    RACRequest.prototype.Serialize = function () {
        var buffer = new _tuval_core__WEBPACK_IMPORTED_MODULE_0__.TBuffer();
        buffer.writeInt32(4); // Execute Action constant
        buffer.writeInt32(this.HandshakeId);
        this.WriteStringToBuffer(JSON.stringify(this.GetRequestObject()), buffer);
        return buffer;
    };
    RACRequest.prototype.Send = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var buffer = _this.Serialize();
            _this.socket = new WebSocket('ws://localhost:8090');
            _this.socket.addEventListener('open', function (event) {
                _this.socket.addEventListener('message', function (message) {
                    if (_this.OnMessageRecieved != null) {
                        _this.OnMessageRecieved(message);
                    }
                });
                _this.socket.send(buffer.buffer);
            });
            _this.OnMessageRecieved = function (message) {
                var a = new ArrayBuffer(100);
                message.data.arrayBuffer().then(function (_buffer) {
                    var buffer = new _tuval_core__WEBPACK_IMPORTED_MODULE_0__.TBuffer(_buffer);
                    buffer.readInt32(); // Requests.Response
                    var h = buffer.readInt32();
                    if (h === _this.HandshakeId) {
                        if (buffer.readInt32() === 1) { // Success
                            var byteLenght = buffer.readInt32();
                            var bytes = buffer.readBytes(byteLenght);
                            var str = _tuval_core__WEBPACK_IMPORTED_MODULE_0__.Encoding.UTF8.GetString(bytes);
                            var obj = JSON.parse(str);
                            resolve(obj);
                            /*   const resultObj = {};
                              for (let i; i < obj.length; i++) {
                                  resultObj['InputName']
                              } */
                            /* if (obj[0] && obj[0].Value != null) {
                                const bytes = Convert.FromBase64String(obj[0].Value);
                                const str = Encoding.UTF8.GetString(bytes);
                                resolve(JSON.parse(str));
                            } else {
                                resolve([]);
                            } */
                        }
                    }
                });
            };
        });
    };
    return RACRequest;
}());



/***/ }),

/***/ "./src/SymbolBroker/index.ts":
/*!***********************************!*\
  !*** ./src/SymbolBroker/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_25840__) => {

__nested_webpack_require_25840__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_25840__.d(__webpack_exports__, {
/* harmony export */   "SymbolBroker": () => (/* binding */ SymbolBroker)
/* harmony export */ });
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_25840__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_25840__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_0__);

var SymbolBroker = /** @class */ (function () {
    function SymbolBroker() {
        this.ConfigService = _tuval_core__WEBPACK_IMPORTED_MODULE_0__.instance.resolve('IConfigService');
    }
    SymbolBroker.prototype.GetSymbolUrl = function (category, subCategory, name) {
        return this.ConfigService.GetSymbolBrokerUrl() + "/GetSymbol/" + category + "/" + subCategory + "/" + name;
    };
    return SymbolBroker;
}());



/***/ }),

/***/ "@tuval/core":
/*!******************************!*\
  !*** external "@tuval/core" ***!
  \******************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tuval_core__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_27244__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_27244__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nested_webpack_require_27244__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nested_webpack_require_27244__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_27244__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_27244__.o(definition, key) && !__nested_webpack_require_27244__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_27244__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_27244__.r = (exports) => {
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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__nested_webpack_require_27244__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_27244__.d(__webpack_exports__, {
/* harmony export */   "GetAppsRequest": () => (/* reexport safe */ _AppStore__WEBPACK_IMPORTED_MODULE_0__.GetAppsRequest),
/* harmony export */   "GetDesktopAppsRequest": () => (/* reexport safe */ _Desktop__WEBPACK_IMPORTED_MODULE_1__.GetDesktopAppsRequest),
/* harmony export */   "BrokerActionRequest": () => (/* reexport safe */ _Message_MessageRequest__WEBPACK_IMPORTED_MODULE_2__.BrokerActionRequest),
/* harmony export */   "MessageRequest": () => (/* reexport safe */ _Message_MessageRequest__WEBPACK_IMPORTED_MODULE_2__.MessageRequest),
/* harmony export */   "ReadCsvRequest": () => (/* reexport safe */ _Message_MessageRequest__WEBPACK_IMPORTED_MODULE_2__.ReadCsvRequest),
/* harmony export */   "ShowMessageRequest": () => (/* reexport safe */ _Message_MessageRequest__WEBPACK_IMPORTED_MODULE_2__.ShowMessageRequest),
/* harmony export */   "GetProfileRequest": () => (/* reexport safe */ _Authentication_LinkedIn_GetProfileRequest__WEBPACK_IMPORTED_MODULE_3__.GetProfileRequest),
/* harmony export */   "SymbolBroker": () => (/* reexport safe */ _SymbolBroker__WEBPACK_IMPORTED_MODULE_4__.SymbolBroker),
/* harmony export */   "EbaProject": () => (/* reexport safe */ _EnsembleBroker__WEBPACK_IMPORTED_MODULE_5__.EbaProject),
/* harmony export */   "EnsembleBrokerClient": () => (/* reexport safe */ _EnsembleBroker__WEBPACK_IMPORTED_MODULE_5__.EnsembleBrokerClient)
/* harmony export */ });
/* harmony import */ var _AppStore__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_27244__(/*! ./AppStore */ "./src/AppStore/index.ts");
/* harmony import */ var _Desktop__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_27244__(/*! ./Desktop */ "./src/Desktop/index.ts");
/* harmony import */ var _Message_MessageRequest__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_27244__(/*! ./Message/MessageRequest */ "./src/Message/MessageRequest.ts");
/* harmony import */ var _Authentication_LinkedIn_GetProfileRequest__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_27244__(/*! ./Authentication/LinkedIn/GetProfileRequest */ "./src/Authentication/LinkedIn/GetProfileRequest.ts");
/* harmony import */ var _SymbolBroker__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_27244__(/*! ./SymbolBroker */ "./src/SymbolBroker/index.ts");
/* harmony import */ var _EnsembleBroker__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_27244__(/*! ./EnsembleBroker */ "./src/EnsembleBroker/index.ts");
/**
 * Button all modules
 */






/* export * from '@tuval/core' */

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map
// console.log('forms-core module loaded.');


/***/ }),

/***/ "./src/Application.ts":
/*!****************************!*\
  !*** ./src/Application.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcessMining": () => (/* binding */ ProcessMining)
/* harmony export */ });
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BrokerClients_MiningBrokerClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BrokerClients/MiningBrokerClient */ "./src/BrokerClients/MiningBrokerClient.ts");
/* harmony import */ var _BrokerProjectService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BrokerProjectService */ "./src/BrokerProjectService.ts");
/* harmony import */ var _MainView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MainView */ "./src/MainView.ts");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Resources */ "./src/Resources.ts");
/* harmony import */ var _Services_StateService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Services/StateService */ "./src/Services/StateService.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var manifest = __webpack_require__(/*! ./manifest */ "./src/manifest.js");
function make(ctorFun, argsArray) {
    // New instance attached to the prototype but the constructor
    // hasn't been called on it.
    var newInstance = Object.create(ctorFun.prototype.constructor.prototype);
    ctorFun.prototype.constructor.apply(newInstance, argsArray);
    return newInstance;
}
// If you create a utility function to create from instance, then it uses the
// inherited `constructor` property and your change would affect that.
function makeFromInstance(instance, argsArray) {
    return make(instance.constructor, argsArray);
}
function App(manifest) {
    return function (constructor) {
        if (tuval$core['__APPS__'] == null) {
            tuval$core['__APPS__'] = {};
        }
        tuval$core['__APPS__'][manifest.application.name] = constructor;
    };
}
var ProcessMining = /** @class */ (function (_super) {
    __extends(ProcessMining, _super);
    function ProcessMining() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProcessMining.prototype.InitComponents = function () {
        var _this = this;
        this.Icon = _Resources__WEBPACK_IMPORTED_MODULE_5__.Resources.Icons.ApplicationIcon;
        //container.registerInstance('IProjectService', new LocalProjectService());
        _BrokerClients_MiningBrokerClient__WEBPACK_IMPORTED_MODULE_2__.MiningBrokerClient.Login('admin', 'admin').then(function (session_id) {
            _Services_StateService__WEBPACK_IMPORTED_MODULE_6__.StateService.SetSessionId(session_id);
            var brokerProjectService = new _BrokerProjectService__WEBPACK_IMPORTED_MODULE_3__.BrokerProjectService();
            _tuval_core__WEBPACK_IMPORTED_MODULE_0__.instance.registerInstance('IProjectService_Thread', brokerProjectService);
            var fileExprorer = new _MainView__WEBPACK_IMPORTED_MODULE_4__.MainView();
            /*  const controller = new MainController();
             controller.SetView(fileExprorer); */
            _this.SetMainForm(fileExprorer);
            _this.Start();
            //PMAcademyService.Start();
            _tuval_core__WEBPACK_IMPORTED_MODULE_0__.TStorage.SaveFile('/static/tuval-core-wp.js', 'tuval-core-wp').then(function () {
                // debugger;
                _tuval_core__WEBPACK_IMPORTED_MODULE_0__.TStorage.GetFile('tuval-core-wp').then(function (url) {
                    // const thread = make(PMThreadWorker, ['/static/index-wp.js']);
                    // container.registerInstance('IProjectService_Thread', thread);
                    /*  thread.load().then(() => {
                        thread.start();
                    }); */
                });
            });
        });
        /*   TuvalTracker.install({
             token: 'YOUR_TOKEN_HERE',
             window: { enabled: true }
         }); */
        /*
        TuvalTracker.addMetadata("subscription", "professional");
        TuvalTracker.addMetadata("has_sourcemaps", "false"); */
    };
    ProcessMining.RecentlyUploadedFilesStorage = new _tuval_core__WEBPACK_IMPORTED_MODULE_0__.TuvalStorage({ name: 'BPMG_P2M', storeName: 'RecentlyUploadedFilesStorage' });
    ProcessMining = __decorate([
        App(manifest)
    ], ProcessMining);
    return ProcessMining;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.TApplication));

// ModuleLoader.FireModuleLoadedEvent(manifest.application.name, ProcessMining);


/***/ }),

/***/ "./src/BrokerClients/MiningBrokerClient.ts":
/*!*************************************************!*\
  !*** ./src/BrokerClients/MiningBrokerClient.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MiningBrokerClient": () => (/* binding */ MiningBrokerClient)
/* harmony export */ });
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Services/ConfigService */ "./src/Services/ConfigService.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var separators = [",", ";", "\t"];
function detectSeparator(csv) {
    var counts = {}, sepMax;
    separators.forEach(function (sep, i) {
        var re = new RegExp(sep, 'g');
        counts[sep] = (csv.match(re) || []).length;
        sepMax = !sepMax || counts[sep] > counts[sepMax] ? sep : sepMax;
    });
    return sepMax;
}
var MiningBrokerClient = /** @class */ (function () {
    function MiningBrokerClient() {
    }
    MiningBrokerClient.LoadCsv = function (csv, case_id, activity_key, timestamp_key, start_timestamp_key, resource_key, cost_key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var data = new FormData();
                        data.append('case_column_name', case_id);
                        data.append('activity_column_name', activity_key);
                        data.append('timestamp_key', timestamp_key);
                        data.append('start_timestamp_key', start_timestamp_key);
                        data.append('resource_key', resource_key);
                        data.append('cost_key', cost_key);
                        data.append('sep', detectSeparator(csv));
                        var parts = [
                            new Blob([csv], { type: 'text/plain' })
                        ];
                        var file = new File(parts, 'csv.txt');
                        data.append('file', file, 'test.csv');
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'LoadCsv', data, {
                            headers: {
                                "Content-Encoding": "gzip"
                            }
                        })
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.ImportCsvFile = function (csv, org_name, case_column_name, activity_column_name, timestamp_key, start_timestamp_key, resource_key, cost_key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var data = new FormData();
                        data.append('case_column_name', case_column_name);
                        data.append('activity_column_name', activity_column_name);
                        data.append('timestamp_key', timestamp_key);
                        data.append('start_timestamp_key', start_timestamp_key);
                        data.append('resource_key', resource_key);
                        data.append('cost_key', cost_key);
                        data.append('sep', detectSeparator(csv));
                        var parts = [
                            new Blob([csv], { type: 'text/plain' })
                        ];
                        var file = new File(parts, 'csv.txt');
                        data.append('file', file, 'test.csv');
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'ImportCsvFile', data, {
                            headers: {
                                "Content-Encoding": "gzip"
                            }
                        })
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetStatistics = function (log_id, activity_name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('log_id', log_id);
                        form.append('activity_name', activity_name);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetStatistics', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetActivityOverview = function (log_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('log_id', log_id);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetActivityStatistics', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetItemOverview = function (log_id, item_name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('log_id', log_id);
                        form.append('activity_name', item_name);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetStatistics', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetStartActivities = function (log_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('log_id', log_id);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetStartActivities', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetStartItems = function (log_id, item_name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('log_id', log_id);
                        form.append('item_name', item_name);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetStartItems', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetEndActivities = function (log_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('log_id', log_id);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetEndActivities', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetEndItems = function (log_id, item_name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('log_id', log_id);
                        form.append('item_name', item_name);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetEndItems', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetLog = function (log_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('log_id', log_id);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetLog', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetEventsOverTime = function (log_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('log_id', log_id);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetEventsOverTime', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetEventDataInfo = function (log_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('log_id', log_id);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetEventDataInfo', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetResourceOverview = function (log_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('log_id', log_id);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetResourceOverview', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.Login = function (user, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('user', user);
                        form.append('password', password);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'LoginService', form)
                            .then(function (response) {
                            resolve(response.data.sessionId);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.CreateProject = function (session_id, org_name, project_name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('session_id', session_id);
                        form.append('org_name', org_name);
                        form.append('project_name', project_name);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'CreateProject', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetProjects = function (session_id, org_name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('session_id', session_id);
                        form.append('org_name', org_name);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetProjects', form)
                            .then(function (response) {
                            resolve(response.data.projects);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetProjectById = function (session_id, org_name, project_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('session_id', session_id);
                        form.append('org_name', org_name);
                        form.append('project_id', org_name);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetProjectById', form)
                            .then(function (response) {
                            resolve(response.data.projects);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.CreateProjectItems = function (session_id, org_name, project_id, item_type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('session_id', session_id);
                        form.append('org_name', org_name);
                        form.append('project_id', org_name);
                        form.append('item_type', org_name);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'CreateProjectItem', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    MiningBrokerClient.GetProjectItems = function (session_id, org_name, project_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var form = new FormData();
                        form.append('session_id', session_id);
                        form.append('org_name', org_name);
                        form.append('project_id', org_name);
                        _tuval_core__WEBPACK_IMPORTED_MODULE_0__.HttpClient.Post(_Services_ConfigService__WEBPACK_IMPORTED_MODULE_1__.ConfigService.GetMiningBrokerUrl() + 'GetProjectItems', form)
                            .then(function (response) {
                            resolve(response.data);
                        });
                    })];
            });
        });
    };
    return MiningBrokerClient;
}());



/***/ }),

/***/ "./src/BrokerProjectService.ts":
/*!*************************************!*\
  !*** ./src/BrokerProjectService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrokerProjectService": () => (/* binding */ BrokerProjectService)
/* harmony export */ });
/* harmony import */ var _Services_StateService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Services/StateService */ "./src/Services/StateService.ts");
/* harmony import */ var _BrokerClients_MiningBrokerClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BrokerClients/MiningBrokerClient */ "./src/BrokerClients/MiningBrokerClient.ts");


var BrokerProjectService = /** @class */ (function () {
    function BrokerProjectService() {
    }
    BrokerProjectService.prototype.CreateProject = function (name) {
        return new Promise(function (resolve, reject) {
            var session_id = _Services_StateService__WEBPACK_IMPORTED_MODULE_0__.StateService.GetSessionId();
            if (session_id == null) {
                throw 'Invalid session.';
            }
            _BrokerClients_MiningBrokerClient__WEBPACK_IMPORTED_MODULE_1__.MiningBrokerClient.CreateProject(session_id, 'bpmgenesis', name).then(function (project) {
                resolve({
                    Id: project.project_id,
                    Name: project.project_name
                });
            });
        });
    };
    BrokerProjectService.prototype.AddDataSet = function (dataset) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.DataSetFromCvs = function (projectId, datasetId, datasetName, csv, case_column, activity_column, time_stamp, start_date, date_format) {
        return new Promise(function (resolve, reject) {
            var datasetObject = {
                ProjectId: projectId,
                Id: datasetId
            };
            resolve(datasetObject);
        });
    };
    BrokerProjectService.prototype.DataSetFromXes = function (projectId, datasetName, xes) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.CloneDataSet = function (projectId, datasetName) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetDatasetById = function (projectId, id) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.SaveProject = function (projectId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetProjectListFromStorage = function () {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.LoadProject = function (name) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.CloseProject = function (id) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.ConvertCsvToJson = function (csv) {
        return new Promise(function (resolve, reject) {
            /* const data = CvsToJson.Convert(csv, { parseNumbers: true }); */
            return resolve(null);
        });
    };
    BrokerProjectService.prototype.GetDatasetAsData = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetDatasetEventCount = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.CasesStartedPerDay = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.ActivitiesStartedPerDay = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.ActivitiesPerCase = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetVariantsInfo = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetEventsOverTime = function (projectId, datasetId) {
        debugger;
        return new Promise(function (resolve, reject) {
        });
    };
    BrokerProjectService.prototype.GetStartEvents = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetEndEvents = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetTraceCount = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetEventCount = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetActivities = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetMedianCaseDuration = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetMeanCaseDuration = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetDatasetName = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.SetActivityInfo = function (projectId, datasetId, activityInfos) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetActivityInfo = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetAverageCostOfDataset = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.GetTotalCostOfDataset = function (projectId, datasetId) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.SetDatasetFilteredData = function (projectId, datasetId, filteredData) {
        throw new Error("Method not implemented.");
    };
    BrokerProjectService.prototype.SetDatasetCondition = function (projectId, datasetId, condition) {
        throw new Error("Method not implemented.");
    };
    //#region Project Methods
    BrokerProjectService.prototype.GetProjects = function (session_id, org_name) {
        return _BrokerClients_MiningBrokerClient__WEBPACK_IMPORTED_MODULE_1__.MiningBrokerClient.GetProjects(session_id, org_name);
    };
    BrokerProjectService.prototype.GetProjectItems = function (session_id, org_name, project_id) {
        //return MiningBrokerClient.GetProjectItems(session_id, org_name, project_id);
        return new Promise(function (resolve, reject) {
            resolve([
                {
                    project_item_id: '1',
                    name: 'Test Dataset 2',
                    type: 'Dataset'
                },
                {
                    project_item_id: '2',
                    name: 'İnsan kaynakları',
                    type: 'Dashboard'
                }
            ]);
        });
    };
    BrokerProjectService.prototype.GetProjectById = function (session_id, org_name, project_id) {
        return _BrokerClients_MiningBrokerClient__WEBPACK_IMPORTED_MODULE_1__.MiningBrokerClient.GetProjectById(session_id, org_name, project_id);
    };
    return BrokerProjectService;
}());



/***/ }),

/***/ "./src/Domains/Application/Controllers/AppController.ts":
/*!**************************************************************!*\
  !*** ./src/Domains/Application/Controllers/AppController.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppController": () => (/* binding */ AppController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI_UIServices_ProjectUIService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../UI/UIServices/ProjectUIService */ "./src/UI/UIServices/ProjectUIService.ts");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Application */ "./src/Application.ts");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Project_Controllers_ProjectController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Project/Controllers/ProjectController */ "./src/Domains/Project/Controllers/ProjectController.ts");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Resources */ "./src/Resources.ts");
/* harmony import */ var _Views_RecentProjects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Views/RecentProjects */ "./src/Domains/Application/Views/RecentProjects.ts");
/* harmony import */ var _Views_PortalFilterBarView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Views/PortalFilterBarView */ "./src/Domains/Application/Views/PortalFilterBarView.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








/* VStack(
    Text('Simple Swift Guide to largeTitle ').font(Fonts.largeTitle),
    Text('Simple Swift Guide to title').font(Fonts.title),
    Text('Simple Swift Guide to title2').font(Fonts.title2),
    Text('Simple Swift Guide to title3').font(Fonts.title3),
    Text('Simple Swift Guide to headline').font(Fonts.headline),
    Text('Simple Swift Guide to body').font(Fonts.body),
    Text('Simple Swift Guide to callout').font(Fonts.callout),
    Text('Simple Swift Guide to subhead').font(Fonts.subhead),
    Text('Simple Swift Guide to footnote').font(Fonts.footnote),
    UIButton(
        Text('New')
    ).cornerRadius('50%').shadow('rgba(100, 100, 111, 0.2) 0px 7px 29px 0px')
)
) */
function MenuButton(title, icon, action) {
    var view = (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)(icon).size(30)))
        .width('64px').height('64px')
        .transition('all 0.35s')
        .background('rgb(255,255,255,50%)')
        .padding('8px')
        .border('solid 1px rgb(120,120,120,20%)')
        .cornerRadius('12px')
        .shadow('rgba(100, 100, 111, 0.2) 0px 7px 29px 0px')
        .action(function () { return action(); });
    return view;
}
var AppController = /** @class */ (function (_super) {
    __extends(AppController, _super);
    function AppController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppController.prototype.InitController = function () {
        this.showAnim = false;
        this.RequestDesktop = new _tuval_core__WEBPACK_IMPORTED_MODULE_3__.Event();
        /*  this.controller = new ProjectController();
         this.controller.SetParentAppController(this); */
    };
    AppController.prototype.MainPage = function () {
        var _this = this;
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(MenuButton('', '\\f064', function () { return _this.OnNewProject(); }), MenuButton('', '\\f06d', function () { return _this.OnOpenProject(); }), MenuButton('', '\\f051', function () { return _this.OnNewProject(); }), MenuButton('', '\\f183', function () { return _this.OnNewProject(); }), MenuButton('', '\\f04a', function () { return _this.OnNewProject(); })).width('120px').spacing('10px'), (0,_Views_RecentProjects__WEBPACK_IMPORTED_MODULE_6__.RecentProjects)())
            // UIScene içerisine yayılması için
            .width('100%'));
    };
    AppController.prototype.LoadPortalView = function () {
        var _this = this;
        var _a;
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIImage)(_Resources__WEBPACK_IMPORTED_MODULE_5__.Resources.Icons.ApplicationIcon).width(24).height(24), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Procetra').fontSize('16px').fontWeight('bold').foregroundColor('white'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f080').size(20).marginRight('10px').cursor('pointer').foregroundColor('white').onClick(function () { return _this.RequestDesktop(); }))
            .fontFamily('verdana, arial, tahoma, helvetica, sans-serif')
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading)
            .minHeight('50px')
            .maxHeight('50px')
            .background('rgb(208, 63, 64)'), (0,_Views_PortalFilterBarView__WEBPACK_IMPORTED_MODULE_7__.PortalFilterBarView)({ projectName: (_a = this.currentProject) === null || _a === void 0 ? void 0 : _a.project_name, selectProjectAction: function () { return _this.OnOpenProject(); } })).height(), this.controller).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading))
            .backgroundColor('white')
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading);
    };
    AppController.prototype.LoadView = function () {
        if (_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.ApplicationMode === _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ApplicationModes.Desktop) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.If)(this.currentProject == null, this.MainPage(), this.controller);
        }
        else if (_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.ApplicationMode === _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ApplicationModes.Portal) {
            return this.LoadPortalView();
        }
    };
    AppController.prototype.OnNewProject = function () {
        _UI_UIServices_ProjectUIService__WEBPACK_IMPORTED_MODULE_1__.ProjectUIService.NewProject();
    };
    AppController.prototype.OnOpenProject = function () {
        var _this = this;
        /* this.currentProject = 'sd';
        this.controller.LoadProjects(); */
        _UI_UIServices_ProjectUIService__WEBPACK_IMPORTED_MODULE_1__.ProjectUIService.OpenProjectDialog().then(function (project) {
            _this.currentProject = project;
            _this.controller = (0,_Project_Controllers_ProjectController__WEBPACK_IMPORTED_MODULE_4__.ProjectController)(_this, project);
        });
    };
    AppController.prototype.CLoseProject = function () {
        this.currentProject = null;
    };
    AppController.prototype.LoadRecentFiles = function () {
        var _this = this;
        var result = [];
        _Application__WEBPACK_IMPORTED_MODULE_2__.ProcessMining.RecentlyUploadedFilesStorage.Keys().then(function (keys) {
            (0,_tuval_core__WEBPACK_IMPORTED_MODULE_3__.foreach)(keys, function (key) {
                _Application__WEBPACK_IMPORTED_MODULE_2__.ProcessMining.RecentlyUploadedFilesStorage.GetString(key).then(function (str) {
                    var obj = JSON.parse(str);
                    result.push(obj);
                    /*  const bi: BoxTileItem = new BoxTileItem(key, obj.rowsCount + ' rows');
                     const dateStr = moment(obj.uploadeddate).format('DD.MM.YYYY');
                     bi.FooterTitle = TString.Format('Uploaded at {0}', dateStr);
                     bi.OnClick = () => {
                         EventBus.Default.fire('P2M.C.ADD_CSV', {
                             name: key,
                             csv: Encoding.UTF8.GetString(Convert.FromBase64String(obj.csv)),
                             caseName: obj.caseName,
                             activityName: obj.activityName,
                             timestampName: obj.timestampName,
                             startDateName: obj.startDateName
                         });
                     };
                     bt.Items.Add(bi); */
                });
            });
            _this.recentFiles = result;
            console.log(_this.recentFiles);
        });
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], AppController.prototype, "RequestDesktop", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], AppController.prototype, "currentProject", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], AppController.prototype, "recentFiles", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], AppController.prototype, "showAnim", void 0);
    return AppController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/Application/Views/FilterView.ts":
/*!*****************************************************!*\
  !*** ./src/Domains/Application/Views/FilterView.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilterView": () => (/* binding */ FilterView)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function FilterView() {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cLeading, spacing: 10 })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f121').size(25).foregroundColor('#55606c'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Add Filter').fontFamily('Ubuntu,sans-serif').fontSize('15px').fontWeight('700').foregroundColor('#999')).padding('5px 10px'))
        .height() //auto
        .backgroundColor('#141719')
        .border('1px solid transparent')
        .cornerRadius(6)));
}


/***/ }),

/***/ "./src/Domains/Application/Views/PortalFilterBarView.ts":
/*!**************************************************************!*\
  !*** ./src/Domains/Application/Views/PortalFilterBarView.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PortalFilterBarView": () => (/* binding */ PortalFilterBarView)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TimeLineFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimeLineFilter */ "./src/Domains/Application/Views/TimeLineFilter.ts");
/* harmony import */ var _FilterView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FilterView */ "./src/Domains/Application/Views/FilterView.ts");



function PortalFilterBarView(params) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f148').size(20).foregroundColor('#aaa'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Projects').textTransform('uppercase').fontWeight('700').fontFamily('Ubuntu, sans-serif').fontSize('10px').foregroundColor('#777'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(params.projectName || 'Select').fontFamily('Ubuntu, sans-serif').fontWeight('700').fontSize('14px').foregroundColor('#aaa'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f0fc').size(10).foregroundColor('#aaa'))
        .spacing(10)
        .onClick(function () { return params.selectProjectAction(); }))
        .spacing(3)
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading)
        .cursor('pointer')
        .height()
        .width(), 
    /*  Gauge(
         Range()
     ).color('#14a9d5').maskColor('rgb(120,120,120,20%)').radius(40).stroke(7).value(67).height(75), */
    (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_FilterView__WEBPACK_IMPORTED_MODULE_2__.FilterView)(), (0,_TimeLineFilter__WEBPACK_IMPORTED_MODULE_1__.TimeLineFilter)()
    /*   HStack(
          PortalFilterBarWidget({ value: 3 }),
          VDivider().height('70%').width(1).background('rgb(255,255,255,50%)'),
          PortalFilterBarWidget({ value: 23 })
      )
          .paddingBottom('5px')
          .width() // auto
          .spacing(20)
          .alignment(Alignment.leading) */
    )
        .zIndex(3000)
        .paddingLeft('10px')
        .spacing(10)
        .shadow('0 1px 5px 1px rgb(0 0 0 / 30%)')
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading)
        .height() // auto height
        .minHeight('50px')
        .backgroundColor('#212932')
        .foregroundColor('white')).height();
}


/***/ }),

/***/ "./src/Domains/Application/Views/PortalFilterBarWidget.ts":
/*!****************************************************************!*\
  !*** ./src/Domains/Application/Views/PortalFilterBarWidget.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PortalFilterBarWidget": () => (/* binding */ PortalFilterBarWidget)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function PortalFilterBarWidget(params) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(params.value.toString()).fontSize('40px').foregroundColor('rgb(147,205,221)'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('monts').foregroundColor('rgb(251,192,1)').fontSize('10px').fontWeight('700'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('AVG').foregroundColor('#AAA')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading))
        .spacing(10)
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Duration').foregroundColor('rgb(147,205,221)'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('15 - 40 monts').foregroundColor('#AAA'))
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading))
        .paddingRight('50px')
        .width() //auto
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading));
}


/***/ }),

/***/ "./src/Domains/Application/Views/RecentProjects.ts":
/*!*********************************************************!*\
  !*** ./src/Domains/Application/Views/RecentProjects.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecentProjects": () => (/* binding */ RecentProjects)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function RecentProjects() {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Recent Projects').font(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Fonts.title).padding('5px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HDivider)()).grow().alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading));
}


/***/ }),

/***/ "./src/Domains/Application/Views/TimeLineFilter.ts":
/*!*********************************************************!*\
  !*** ./src/Domains/Application/Views/TimeLineFilter.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeLineFilter": () => (/* binding */ TimeLineFilter)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function TimeText(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).padding('5px 5px').fontFamily('Ubuntu,sans-serif').fontSize('16px').fontWeight('700').foregroundColor('#989898'));
}
function TimeLineFilter() {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f043').size(20).foregroundColor('#777'), TimeText('1H'), TimeText('8H'), TimeText('24H'), TimeText('3D'), TimeText('7D'), TimeText('All'), TimeText('Custom'))
        .spacing(5)
        .width() // auto
    );
}


/***/ }),

/***/ "./src/Domains/CaseExplorer/Controllers/CaseExplorerController.ts":
/*!************************************************************************!*\
  !*** ./src/Domains/CaseExplorer/Controllers/CaseExplorerController.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseExplorerController": () => (/* binding */ CaseExplorerController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CaseExplorerController = /** @class */ (function (_super) {
    __extends(CaseExplorerController, _super);
    function CaseExplorerController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaseExplorerController.prototype.InitController = function () {
    };
    CaseExplorerController.prototype.LoadView = function () {
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f033').size(30).foregroundColor('gray'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Case explorer')
            .fontFamily('Proxima Nova').fontSize('22px')
            .foregroundColor('#333333'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(['Overview', 'Throughput times', 'Activities'], function (name) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(name)).border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px');
        })).width('auto').spacing('5px')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading).spacing('10px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HDivider)().height('1px').backgroundColor('rgb(120,120,120,20%)')).padding('10px').alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading).spacing('10px').height('auto')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading));
    };
    return CaseExplorerController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/CustomPage/Controllers/CustomPageController.ts":
/*!********************************************************************!*\
  !*** ./src/Domains/CustomPage/Controllers/CustomPageController.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomPageController": () => (/* binding */ CustomPageController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CustomPageController = /** @class */ (function (_super) {
    __extends(CustomPageController, _super);
    function CustomPageController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomPageController.prototype.InitController = function () {
    };
    CustomPageController.prototype.LoadView = function () {
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Custom page controller');
    };
    return CustomPageController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/Dashboard/Controllers/ProcessDashboardController.ts":
/*!*************************************************************************!*\
  !*** ./src/Domains/Dashboard/Controllers/ProcessDashboardController.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcessDashboardController": () => (/* binding */ ProcessDashboardController)
/* harmony export */ });
/* harmony import */ var _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/components/diagram */ "@tuval/components/diagram");
/* harmony import */ var _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_graphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/graphics */ "@tuval/graphics");
/* harmony import */ var _tuval_graphics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_graphics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tuval_cg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tuval/cg */ "@tuval/cg");
/* harmony import */ var _tuval_cg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tuval_cg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Views_PaletteView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Views/PaletteView */ "./src/Domains/Dashboard/Views/PaletteView.ts");
/* harmony import */ var _Models_MDPalette__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Models/MDPalette */ "./src/Domains/Dashboard/Models/MDPalette.ts");
/* harmony import */ var _UI_Views_PageHeader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../UI/Views/PageHeader */ "./src/UI/Views/PageHeader.ts");
/* harmony import */ var _UI_Controls_DashboardView_DashboardView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../UI/Controls/DashboardView/DashboardView */ "./src/UI/Controls/DashboardView/DashboardView.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ProcessDashboardController = /** @class */ (function (_super) {
    __extends(ProcessDashboardController, _super);
    function ProcessDashboardController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProcessDashboardController.prototype.InitController = function () {
        this.svg = new _UI_Controls_DashboardView_DashboardView__WEBPACK_IMPORTED_MODULE_7__.DashboardView();
        /*  svg.pId = dataset.ProjectId;
         svg.dId = dataset.Id; */
        this.svg.beginUpdate();
        this.svg.RenderingMode = _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__.ViewRenderingMode.Html;
        this.svg.ResizeHandleSize = new _tuval_cg__WEBPACK_IMPORTED_MODULE_3__.CGSize(10, 10);
        this.svg.Width = 1800;
        this.svg.Height = 1500;
        this.svg.GridCellSize = new _tuval_cg__WEBPACK_IMPORTED_MODULE_3__.CGSize(20, 20);
        this.svg.GridLineWidth = 1;
        this.svg.GridMajorLineWidth = 1;
        this.svg.GridSnapDrag = _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__.TuViewSnapStyle.Jump;
        this.svg.GridSnapResize = _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__.TuViewSnapStyle.Jump;
        this.svg.GridStyle = _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__.TuViewGridStyle.Line;
        this.svg.GridMajorLineColor = this.svg.GridLineColor.clone();
        var rect = new _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__.TuRectangle();
        rect.Left = 50;
        rect.Top = 50;
        rect.Width = 150;
        rect.Height = 105;
        rect.Pen = _tuval_graphics__WEBPACK_IMPORTED_MODULE_1__.Pens.Black;
        rect.Brush = _tuval_graphics__WEBPACK_IMPORTED_MODULE_1__.Brushes.White;
        this.svg.Document.Add(rect);
        this.palettedata = _Models_MDPalette__WEBPACK_IMPORTED_MODULE_5__.PaletteModel;
        this.test = 2;
    };
    ProcessDashboardController.prototype.LoadView = function () {
        var _this = this;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.Text)('Test')).action(function () { return _this.test = 10; }), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.HStack)((0,_UI_Views_PageHeader__WEBPACK_IMPORTED_MODULE_6__.PageTitle)('\\f0b3', this.test.toString()), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.Spacer)(), _tuval_forms__WEBPACK_IMPORTED_MODULE_2__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.ForEach)(['Overview', 'Throughput times', 'Activities'], function (name) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.Text)(name)).border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px');
        })).width('auto').spacing('5px')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.Alignment.topLeading).spacing('10px').height() /* .height('20px') */, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.HDivider)().height('1px').backgroundColor('rgb(120,120,120,20%)'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.TwoColumnLayout2)({
            left: [
                (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.VStack)(this.svg).position('absolute').alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.Alignment.topLeading)).overflowX('auto').overflowY('auto').alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.Alignment.topLeading)
            ],
            right: [
                (0,_Views_PaletteView__WEBPACK_IMPORTED_MODULE_4__.PaletteView)(this.palettedata)
            ]
        })).padding('10px').alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.Alignment.topLeading).spacing('10px')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.Alignment.topLeading));
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.State)()
    ], ProcessDashboardController.prototype, "svg", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.State)()
    ], ProcessDashboardController.prototype, "test", void 0);
    return ProcessDashboardController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_2__.UIController));



/***/ }),

/***/ "./src/Domains/Dashboard/Models/MDPalette.ts":
/*!***************************************************!*\
  !*** ./src/Domains/Dashboard/Models/MDPalette.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaletteModel": () => (/* binding */ PaletteModel)
/* harmony export */ });
var PaletteModel = [
    {
        name: 'Process analysis',
        items: [
            {
                icon: '\\f0a4',
                label: 'Performance Explorer'
            },
            {
                icon: '\\f0a4',
                label: 'Frequency Explorer'
            },
            {
                icon: '\\f13b',
                label: 'Variant Explorer'
            },
            {
                icon: '\\f13f',
                label: 'Activity Explorer'
            },
            {
                icon: '\\f13e',
                label: 'Connection Slider'
            }
        ]
    },
    {
        name: 'Resource analysis',
        items: [
            {
                icon: '\\f007',
                label: 'Performance Explorer'
            },
            {
                icon: '\\f007',
                label: 'Frequency Explorer'
            }
        ]
    },
    {
        name: 'Charts',
        items: [
            {
                icon: '\\f147',
                label: 'Activity Frequency'
            },
            {
                icon: '\\f147',
                label: 'Activity Mean Duration'
            },
            {
                icon: '\\f147',
                label: 'Activity Median Duration'
            },
            {
                icon: '\\f147',
                label: 'Duration Range'
            }
        ]
    }
];


/***/ }),

/***/ "./src/Domains/Dashboard/Views/PaletteView.ts":
/*!****************************************************!*\
  !*** ./src/Domains/Dashboard/Views/PaletteView.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaletteView": () => (/* binding */ PaletteView)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};

function PaletteView(paletteData) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(// For better scrolling
    _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(paletteData, function (paletteCategory) {
        return _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack.apply(void 0, __spreadArray([
            /*  HDivider().height('1px').background('#e4e4e4'), */
            (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(paletteCategory.name)
                .fontSize(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.FontSizeTypes.Small)
                .textTransform('uppercase')
                .fontFamily('Proxima Nova')
                .foregroundColor('#0D6B87')
                /* .background('#f1f1f1') */
                .padding(10)], (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(paletteCategory.items, function (paletteItem) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(
            /*  HDivider().height('1px').background('#e4e4e4'), */
            (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)(paletteItem.icon).size(20).foregroundColor('gray'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(paletteItem.label)
                .fontFamily('Proxima Nova'))
                .cornerRadius()
                .background({ hover: 'rgb(120,120,120,20%)' })
                .spacing(10)
                .padding(10)
                .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading))
                /*  .background('white') */
                .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading);
        }))).background(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Color.white.opacity(0.5))
            .cornerRadius(12)
            .padding() // Default padding 5px
            .height() // uto height relative to its content
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading);
    })).spacing(10)
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
        // For Scrolling
        .position(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.PositionTypes.Absolute))
        .width(270)
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
        .overflowX('hidden')
        .overflowY('auto'));
}


/***/ }),

/***/ "./src/Domains/Dataset/Controllers/DatasetController.ts":
/*!**************************************************************!*\
  !*** ./src/Domains/Dataset/Controllers/DatasetController.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatasetController": () => (/* binding */ DatasetController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Views_DatasetTabView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Views/DatasetTabView */ "./src/Domains/Dataset/Views/DatasetTabView.ts");
/* harmony import */ var _ProcessOverview_Controllers_ProcessOverviewController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ProcessOverview/Controllers/ProcessOverviewController */ "./src/Domains/ProcessOverview/Controllers/ProcessOverviewController.ts");
/* harmony import */ var _Dashboard_Controllers_ProcessDashboardController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Dashboard/Controllers/ProcessDashboardController */ "./src/Domains/Dashboard/Controllers/ProcessDashboardController.ts");
/* harmony import */ var _Discovery_Controllers_ProcessExplorerController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Discovery/Controllers/ProcessExplorerController */ "./src/Domains/Discovery/Controllers/ProcessExplorerController.ts");
/* harmony import */ var _Statistics_Controllers_ProcessStatisticController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Statistics/Controllers/ProcessStatisticController */ "./src/Domains/Statistics/Controllers/ProcessStatisticController.ts");
/* harmony import */ var _CaseExplorer_Controllers_CaseExplorerController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../CaseExplorer/Controllers/CaseExplorerController */ "./src/Domains/CaseExplorer/Controllers/CaseExplorerController.ts");
/* harmony import */ var _Filter_Controllers_FilterController__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Filter/Controllers/FilterController */ "./src/Domains/Filter/Controllers/FilterController.ts");
/* harmony import */ var _UI_Views_PortalSideMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../UI/Views/PortalSideMenu */ "./src/UI/Views/PortalSideMenu.ts");
/* harmony import */ var _VariantExplorer_Controllers_VariantExplorerController__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../VariantExplorer/Controllers/VariantExplorerController */ "./src/Domains/VariantExplorer/Controllers/VariantExplorerController.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var DatasetController = /** @class */ (function (_super) {
    __extends(DatasetController, _super);
    function DatasetController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatasetController.prototype.InitController = function () {
        this.selectedTabIndex = 0;
    };
    DatasetController.prototype.OnTabSelected = function (index) {
        this.selectedTabIndex = index;
        var tabModel = this.tabModels[index];
        if (tabModel != null && !tabModel.controller.IsModelBind) {
            tabModel.controller.Bind(this.projectItem);
        }
    };
    DatasetController.prototype.OnBindModel = function (model) {
        this.projectItem = model;
        this.tabModels = [
            {
                icon: '\\f0b4',
                name: 'Process Overview',
                controller: new _ProcessOverview_Controllers_ProcessOverviewController__WEBPACK_IMPORTED_MODULE_2__.ProcessOverviewController().Bind(this.projectItem) // Default Controller
            },
            {
                icon: '\\f0b3',
                name: 'Dashboard',
                controller: new _Dashboard_Controllers_ProcessDashboardController__WEBPACK_IMPORTED_MODULE_3__.ProcessDashboardController()
            },
            {
                icon: '\\f0f8',
                name: 'Discovery',
                controller: new _Discovery_Controllers_ProcessExplorerController__WEBPACK_IMPORTED_MODULE_4__.ProcessExplorerController()
            },
            {
                icon: '\\f0a1',
                name: 'Monitoring',
                controller: new _Statistics_Controllers_ProcessStatisticController__WEBPACK_IMPORTED_MODULE_5__.ProcessStatisticController()
            },
            {
                icon: '\\f0f2',
                name: 'Statistics',
                controller: new _Statistics_Controllers_ProcessStatisticController__WEBPACK_IMPORTED_MODULE_5__.ProcessStatisticController()
            },
            {
                icon: '\\f13b',
                name: 'Variant Explorer',
                controller: new _VariantExplorer_Controllers_VariantExplorerController__WEBPACK_IMPORTED_MODULE_9__.VariantExplorerController()
            },
            {
                icon: '\\f096',
                name: 'Loops',
                controller: new _CaseExplorer_Controllers_CaseExplorerController__WEBPACK_IMPORTED_MODULE_6__.CaseExplorerController()
            },
            {
                icon: '\\f049',
                name: 'Automation',
                controller: new _VariantExplorer_Controllers_VariantExplorerController__WEBPACK_IMPORTED_MODULE_9__.VariantExplorerController()
            },
            {
                icon: '\\f033',
                name: 'Case Explorer',
                controller: new _CaseExplorer_Controllers_CaseExplorerController__WEBPACK_IMPORTED_MODULE_6__.CaseExplorerController()
            },
            {
                icon: '\\f130',
                name: 'Filter',
                controller: new _Filter_Controllers_FilterController__WEBPACK_IMPORTED_MODULE_7__.FilterController()
            }
        ];
        this.selectedTabIndex = 0;
    };
    DatasetController.prototype.LoadPortalView = function () {
        var _this = this;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_UI_Views_PortalSideMenu__WEBPACK_IMPORTED_MODULE_8__.PortalSideMenu)({ items: this.tabModels, selectedIndex: this.selectedTabIndex, selectedAction: function (index) { return _this.OnTabSelected(index); } }), this.tabModels[this.selectedTabIndex].controller)));
    };
    DatasetController.prototype.LoadDesktopView = function () {
        var _this = this;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_Views_DatasetTabView__WEBPACK_IMPORTED_MODULE_1__.DatasetTabView)({
            tabModel: this.tabModels,
            selectedTabIndex: this.selectedTabIndex,
            onTabSelected: function (index) { return _this.OnTabSelected(index); }
        })).position(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.PositionTypes.Absolute));
    };
    DatasetController.prototype.LoadView = function () {
        if (_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.ApplicationMode === _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ApplicationModes.Desktop) {
            return this.LoadDesktopView();
        }
        else {
            return this.LoadPortalView();
        }
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], DatasetController.prototype, "projectItem", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], DatasetController.prototype, "tabModels", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], DatasetController.prototype, "selectedTabIndex", void 0);
    return DatasetController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/Dataset/Views/DatasetTabView.ts":
/*!*****************************************************!*\
  !*** ./src/Domains/Dataset/Views/DatasetTabView.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatasetTabView": () => (/* binding */ DatasetTabView)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI_Views_TabView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../UI/Views/TabView */ "./src/UI/Views/TabView.ts");


function DatasetTabView(datasetTabViewParams) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)(_UI_Views_TabView__WEBPACK_IMPORTED_MODULE_1__.TabView.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(datasetTabViewParams.tabModel, function (tabItem, index) {
        return (0,_UI_Views_TabView__WEBPACK_IMPORTED_MODULE_1__.TabViewItem)({
            name: tabItem.name,
            header: ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VDivider)().visible(index === 0).height('70%').background('rgb(120,120,120,30%)'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)(tabItem.icon).size(25).width('auto'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(tabItem.name.toUpperCase()).fontSize('8pt').textAlign('center'))
                .wrap('wrap')
                .borderTop(datasetTabViewParams.selectedTabIndex === index ? 'solid 2px blue' : 'solid 2px transparent')
                .foregroundColor(datasetTabViewParams.selectedTabIndex === index ? 'gray' : 'rgb(120,120,120,50%)')
                /*  .cornerRadius('10px') */
                .spacing('5px')
                .padding('10px')
                /* .borderBottom(this.selectedTab === tabItem.name ? 'solid 1px blue' : 'solid 0px') */
                /* .shadow(datasetTabViewParams.selectedTabIndex === index ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' : '') */
                .background(datasetTabViewParams.selectedTabIndex === index, 'rgb(255,255,255,50%)', 'rgb(255,255,255,10%)')
                .transition('all 0.35s')
                .If(datasetTabViewParams.selectedTabIndex === index, function (_) {
                //  _.foregroundColor('blue');
            }), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VDivider)().height('70%').background('rgb(120,120,120,30%)'))),
            content: tabItem.controller
        }).onSelected(function () { return datasetTabViewParams.onTabSelected(index); });
    })).selectedTabIndex(datasetTabViewParams.selectedTabIndex)));
}


/***/ }),

/***/ "./src/Domains/Discovery/Controllers/FrequencyMapController.ts":
/*!*********************************************************************!*\
  !*** ./src/Domains/Discovery/Controllers/FrequencyMapController.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FrequencyMapController": () => (/* binding */ FrequencyMapController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Views_ActivitySliderView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Views/ActivitySliderView */ "./src/Domains/Discovery/Views/ActivitySliderView.ts");
/* harmony import */ var _Views_ConnectionSliderView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Views/ConnectionSliderView */ "./src/Domains/Discovery/Views/ConnectionSliderView.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FrequencyMapController = /** @class */ (function (_super) {
    __extends(FrequencyMapController, _super);
    function FrequencyMapController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FrequencyMapController.prototype.InitController = function () {
        this.actionSliderValue = 50;
        this.connectionSliderValue = 50;
    };
    FrequencyMapController.prototype.LoadView = function () {
        var _this = this;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Frequency Map')).grow(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(// For scrolling container
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_Views_ActivitySliderView__WEBPACK_IMPORTED_MODULE_1__.ActivitySliderView)(this.actionSliderValue, function (e) { return _this.actionSliderValue = e; }), (0,_Views_ConnectionSliderView__WEBPACK_IMPORTED_MODULE_2__.ConnectionSliderView)(this.connectionSliderValue, function (e) { return _this.connectionSliderValue = e; }))
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
            .position(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.PositionTypes.Absolute) // For scrolling
            .spacing(10)
        // auto width
        )
            .minWidth('260px')
            .maxWidth('260px')
            .overflowY('auto').overflowX('hidden')));
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], FrequencyMapController.prototype, "actionSliderValue", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], FrequencyMapController.prototype, "connectionSliderValue", void 0);
    return FrequencyMapController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/Discovery/Controllers/PerformanceMapController.ts":
/*!***********************************************************************!*\
  !*** ./src/Domains/Discovery/Controllers/PerformanceMapController.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PerformanceMapController": () => (/* binding */ PerformanceMapController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Views_ActivitySliderView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Views/ActivitySliderView */ "./src/Domains/Discovery/Views/ActivitySliderView.ts");
/* harmony import */ var _Views_ConnectionSliderView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Views/ConnectionSliderView */ "./src/Domains/Discovery/Views/ConnectionSliderView.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PerformanceMapController = /** @class */ (function (_super) {
    __extends(PerformanceMapController, _super);
    function PerformanceMapController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PerformanceMapController.prototype.InitController = function () {
        this.actionSliderValue = 50;
        this.connectionSliderValue = 50;
    };
    PerformanceMapController.prototype.LoadView = function () {
        var _this = this;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Performance Map')).grow(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(// For scrolling container
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_Views_ActivitySliderView__WEBPACK_IMPORTED_MODULE_1__.ActivitySliderView)(this.actionSliderValue, function (e) { return _this.actionSliderValue = e; }), (0,_Views_ConnectionSliderView__WEBPACK_IMPORTED_MODULE_2__.ConnectionSliderView)(this.connectionSliderValue, function (e) { return _this.connectionSliderValue = e; }))
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
            .position(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.PositionTypes.Absolute) // For scrolling
            .spacing(10)
        // auto width
        )
            .minWidth('260px')
            .maxWidth('260px')
            .overflowY('auto').overflowX('hidden')));
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], PerformanceMapController.prototype, "actionSliderValue", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], PerformanceMapController.prototype, "connectionSliderValue", void 0);
    return PerformanceMapController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/Discovery/Controllers/ProcessExplorerController.ts":
/*!************************************************************************!*\
  !*** ./src/Domains/Discovery/Controllers/ProcessExplorerController.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcessExplorerController": () => (/* binding */ ProcessExplorerController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI_Views_PageHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../UI/Views/PageHeader */ "./src/UI/Views/PageHeader.ts");
/* harmony import */ var _UI_Views_PortalSideMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../UI/Views/PortalSideMenu */ "./src/UI/Views/PortalSideMenu.ts");
/* harmony import */ var _FrequencyMapController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FrequencyMapController */ "./src/Domains/Discovery/Controllers/FrequencyMapController.ts");
/* harmony import */ var _PerformanceMapController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PerformanceMapController */ "./src/Domains/Discovery/Controllers/PerformanceMapController.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var sideMenu = [
    {
        name: 'Frequency Map',
        icon: '\\f0a7',
        controller: new _FrequencyMapController__WEBPACK_IMPORTED_MODULE_3__.FrequencyMapController()
    },
    {
        name: 'Performance Map',
        icon: '\\f0a8',
        controller: new _PerformanceMapController__WEBPACK_IMPORTED_MODULE_4__.PerformanceMapController()
    },
    {
        name: 'Resource Map',
        icon: '\\f098',
        controller: new _PerformanceMapController__WEBPACK_IMPORTED_MODULE_4__.PerformanceMapController()
    }
];
var ProcessExplorerController = /** @class */ (function (_super) {
    __extends(ProcessExplorerController, _super);
    function ProcessExplorerController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProcessExplorerController.prototype.InitController = function () {
        this.OnControllerSelected(0);
    };
    ProcessExplorerController.prototype.OnControllerSelected = function (index) {
        this.selectedIndex = index;
        var controller = sideMenu[index].controller;
        this.currentController = controller;
    };
    ProcessExplorerController.prototype.LoadView = function () {
        var _this = this;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_UI_Views_PortalSideMenu__WEBPACK_IMPORTED_MODULE_2__.PortalSideMenu)({
            items: sideMenu,
            selectedIndex: this.selectedIndex,
            selectedAction: function (index) { return _this.OnControllerSelected(index); },
            second: true
        }), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(
        // Header
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_UI_Views_PageHeader__WEBPACK_IMPORTED_MODULE_1__.PageTitle)('\\f0a4', 'Process explorer'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(sideMenu, function (item, index) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)(item.icon), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(item.name))
                .background(_this.selectedIndex === index ? 'rgb(120,120,120,20%)' : '')
                .border('solid 1px gray')
                .cornerRadius('10px')
                .padding('3px 10px 3px 10px')
                .action(function () { return _this.OnControllerSelected(index); });
        })).width().spacing('5px')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading).spacing('10px').height(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HDivider)().height('1px').backgroundColor('rgb(120,120,120,20%)'), 
        // Body
        this.currentController)
            .padding(10)
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
            .spacing(10)).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)));
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProcessExplorerController.prototype, "currentController", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProcessExplorerController.prototype, "selectedIndex", void 0);
    return ProcessExplorerController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/Discovery/Views/ActivitySliderView.ts":
/*!***********************************************************!*\
  !*** ./src/Domains/Discovery/Views/ActivitySliderView.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActivitySliderView": () => (/* binding */ ActivitySliderView)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SliderButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SliderButton */ "./src/Domains/Discovery/Views/SliderButton.ts");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_2__);



function ActivitySliderView(sliderValue, onChange) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f0e1').size(25).foregroundColor('#14A9D5'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Activities').fontSize('16px').foregroundColor('#333'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_SliderButton__WEBPACK_IMPORTED_MODULE_1__.SliderButton)('List View'))
        .spacing(10)
        .padding(5)
        .height(), // auto
    (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UISlider)().value(sliderValue).action(function (e) { return onChange(e); }))
        .width() //auto
        .padding(15), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Gauge)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Range)()).color('#14a9d5').maskColor('rgb(120,120,120,20%)').radius(50).stroke(7).value(sliderValue).height(95), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('of activities'), (0,_SliderButton__WEBPACK_IMPORTED_MODULE_1__.SliderButton)('Reset').action(function () { return onChange(50); }), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_SliderButton__WEBPACK_IMPORTED_MODULE_1__.SliderIconButton)('\\f087', 'Less').action(function () { onChange(_tuval_core__WEBPACK_IMPORTED_MODULE_2__.TMath.max(sliderValue - 10, 0)); }), (0,_SliderButton__WEBPACK_IMPORTED_MODULE_1__.SliderIconButton)('\\f091', 'More').action(function () { onChange(_tuval_core__WEBPACK_IMPORTED_MODULE_2__.TMath.min(sliderValue + 10, 100)); })).spacing(10))
        .height() // auto
        .spacing(10)))
        .background('rgb(255,255,255,30%)')
        .padding(10)
        .cornerRadius(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.CornerRadiusTypes.Medium)
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading));
}


/***/ }),

/***/ "./src/Domains/Discovery/Views/ConnectionSliderView.ts":
/*!*************************************************************!*\
  !*** ./src/Domains/Discovery/Views/ConnectionSliderView.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConnectionSliderView": () => (/* binding */ ConnectionSliderView)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SliderButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SliderButton */ "./src/Domains/Discovery/Views/SliderButton.ts");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_2__);



function ConnectionSliderView(sliderValue, onChange) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f13d').size(30).foregroundColor('#14A9D5'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Connections').fontSize('16px').foregroundColor('#333'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_SliderButton__WEBPACK_IMPORTED_MODULE_1__.SliderButton)('List View'))
        .spacing(10)
        .padding(5)
        .height(), // auto
    (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UISlider)().value(sliderValue).action(function (e) { return onChange(e); }))
        .width() //auto
        .padding(15), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Gauge)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Range)()).color('#14a9d5').maskColor('rgb(120,120,120,20%)').radius(50).stroke(7).value(sliderValue).height(95), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('of connections'), (0,_SliderButton__WEBPACK_IMPORTED_MODULE_1__.SliderButton)('Reset').action(function () { return onChange(50); }), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_SliderButton__WEBPACK_IMPORTED_MODULE_1__.SliderIconButton)('\\f087', 'Less').action(function () { onChange(_tuval_core__WEBPACK_IMPORTED_MODULE_2__.TMath.max(sliderValue - 10, 0)); }), (0,_SliderButton__WEBPACK_IMPORTED_MODULE_1__.SliderIconButton)('\\f091', 'More').action(function () { onChange(_tuval_core__WEBPACK_IMPORTED_MODULE_2__.TMath.min(sliderValue + 10, 100)); })).spacing(10))
        .height() // auto
        .spacing(10)))
        .background('rgb(255,255,255,30%)')
        .padding(10)
        .cornerRadius(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.CornerRadiusTypes.Medium)
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading));
}


/***/ }),

/***/ "./src/Domains/Discovery/Views/SliderButton.ts":
/*!*****************************************************!*\
  !*** ./src/Domains/Discovery/Views/SliderButton.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SliderButton": () => (/* binding */ SliderButton),
/* harmony export */   "SliderIconButton": () => (/* binding */ SliderIconButton)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function SliderButton(text) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(text))
        .background('#fff')
        .foregroundColor('#888')
        .border('1px solid #ccc')
        .borderBottom('2px solid #ccc')
        .padding('4px 10px')
        .cornerRadius(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.CornerRadiusTypes.Rounded)
        .fontSize('12px')
        .height(25));
}
function SliderIconButton(icon, text) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(text), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)(icon).size(14).foregroundColor('#888').marginLeft('5px'))
        .background('#fff')
        .foregroundColor('#888')
        .border('1px solid #ccc')
        .borderBottom('2px solid #ccc')
        .padding('4px 10px')
        .cornerRadius(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.CornerRadiusTypes.Rounded)
        .fontSize('12px')
        .height(25));
}


/***/ }),

/***/ "./src/Domains/Filter/Controllers/FilterController.ts":
/*!************************************************************!*\
  !*** ./src/Domains/Filter/Controllers/FilterController.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilterController": () => (/* binding */ FilterController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var FilterController = /** @class */ (function (_super) {
    __extends(FilterController, _super);
    function FilterController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterController.prototype.InitController = function () {
    };
    FilterController.prototype.LoadView = function () {
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f130').size(30).foregroundColor('gray'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Filter')
            .fontFamily('Proxima Nova').fontSize('22px')
            .foregroundColor('#333333'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(['Overview', 'Throughput times', 'Activities'], function (name) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(name)).border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px');
        })).width('auto').spacing('5px')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading).spacing('10px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HDivider)().height('1px').backgroundColor('rgb(120,120,120,20%)')).padding('10px').alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading).spacing('10px').height('auto')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading));
    };
    return FilterController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/Overview/Bindable.ts":
/*!**********************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/Overview/Bindable.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bindable": () => (/* binding */ Bindable)
/* harmony export */ });
var Bindable = /** @class */ (function () {
    function Bindable(initValue, controller) {
        this.value = initValue;
        this.controller = controller;
    }
    Bindable.prototype.get = function () {
        return this.value;
    };
    Bindable.prototype.set = function (value) {
        this.value = value;
        this.controller.ForceUpdate();
    };
    return Bindable;
}());



/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/Overview/OverviewController.ts":
/*!********************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/Overview/OverviewController.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverviewController": () => (/* binding */ OverviewController)
/* harmony export */ });
/* harmony import */ var _Bindable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bindable */ "./src/Domains/ProcessOverview/Controllers/Overview/Bindable.ts");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Views_ActivitySection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Views/ActivitySection */ "./src/Domains/ProcessOverview/Controllers/Overview/Views/ActivitySection.ts");
/* harmony import */ var _Views_HappyPathSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Views/HappyPathSection */ "./src/Domains/ProcessOverview/Controllers/Overview/Views/HappyPathSection.ts");
/* harmony import */ var _Views_MetricsSection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Views/MetricsSection */ "./src/Domains/ProcessOverview/Controllers/Overview/Views/MetricsSection.ts");
/* harmony import */ var _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../UI/Controls/EventsOverTimeChart/EventsOverTimeChart */ "./src/UI/Controls/EventsOverTimeChart/EventsOverTimeChart.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var testActivitySectionModel = [
    {
        activityName: 'Activity 1',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 2',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 3',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 4',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 5',
        casePercentage: 14,
        eventCount: 40463
    }
];
var happyPathBAbsoluteBoxTestModel = {
    title: 'Happy path in absolute numbers',
    value: 107688,
    totalValue: 279020
};
var happyPathDiagramModelTest = [
    {
        name: 'Test 1'
    },
    {
        name: 'Test 1'
    },
    {
        name: 'Test 1'
    }
];
var happyPathSectionTestModel = {
    happyPathAbsoluteBoxModel: happyPathBAbsoluteBoxTestModel,
    happyPathDiagramItems: happyPathDiagramModelTest
};
var OverviewController = /** @class */ (function (_super) {
    __extends(OverviewController, _super);
    function OverviewController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OverviewController.prototype.InitController = function () {
        this.chart = new _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_5__.EventsOverTimeChart();
        var map = new Map();
        // this.map = [];
        for (var i = 0; i < 100; i++) {
            map[i] = i;
        }
        this.chart.SetChartData(map);
        this.activitySectionModel = testActivitySectionModel;
        this.happPathSectionModel = happyPathSectionTestModel;
        this.metricSectionModel = {
            metricBoxNodels: [
                {
                    title: 'Cases per day',
                    value: '694',
                    subTitle: 'Total number of cases per day',
                    showMenu: new _Bindable__WEBPACK_IMPORTED_MODULE_0__.Bindable(false, this)
                },
                {
                    title: 'Events per day',
                    value: '4.215',
                    subTitle: 'Total number of events per day',
                    showMenu: new _Bindable__WEBPACK_IMPORTED_MODULE_0__.Bindable(false, this)
                },
                {
                    title: 'Throughput time',
                    value: '26 DAYS',
                    subTitle: 'Average case duration from process start to process end without extreme outliers',
                    showMenu: new _Bindable__WEBPACK_IMPORTED_MODULE_0__.Bindable(false, this)
                }
            ],
            chart: this.chart
        };
    };
    OverviewController.prototype.LoadView = function () {
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.VStack)((0,_Views_MetricsSection__WEBPACK_IMPORTED_MODULE_4__.MetricsSection)(this.metricSectionModel), (0,_Views_HappyPathSection__WEBPACK_IMPORTED_MODULE_3__.HappyPathSection)(this.happPathSectionModel), (0,_Views_ActivitySection__WEBPACK_IMPORTED_MODULE_2__.ActivitySection)(this.activitySectionModel)).position(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.PositionTypes.Absolute).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Alignment.topLeading));
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], OverviewController.prototype, "chart", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], OverviewController.prototype, "metricSectionModel", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], OverviewController.prototype, "activitySectionModel", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], OverviewController.prototype, "happPathSectionModel", void 0);
    return OverviewController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.UIController));



/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/Overview/Views/ActivityBox.ts":
/*!*******************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/Overview/Views/ActivityBox.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActivityBox": () => (/* binding */ ActivityBox)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function ActivityBox(params) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f0e1').size(30).foregroundColor('#14A9D5'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(params.activityName)
        .padding(10)
        .fontFamily('Proxima Nova')
        .fontWeight('500')
        .fontSize('14px')
        .foregroundColor('#333'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("In " + params.casePercentage + " of cases").fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#333'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(params.casePercentage + " Events").fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888'))
        .padding('20px')
        .backgroundColor('rgb(255,255,255,60%)')
        .cornerRadius('12px')
        .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
        .tabIndex(0))
        /* .border('solid var(--border-width) yellow') */
        .height('180px')
        .padding('10px')
        .maxWidth('25%'));
}


/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/Overview/Views/ActivitySection.ts":
/*!***********************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/Overview/Views/ActivitySection.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActivitySection": () => (/* binding */ ActivitySection)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ActivityBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActivityBox */ "./src/Domains/ProcessOverview/Controllers/Overview/Views/ActivityBox.ts");


function ActivitySection(activities) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Other frequent activities')
        .marginTop('30px')
        .paddingTop('5px')
        /*    .height('38px') */
        .fontFamily('Proxima Nova')
        .fontSize('20px')
        .foregroundColor('#333333'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' })))
        // We prevent this stack to large more than its content
        .height('auto'), _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__._ForEach)(activities)(function (activity) {
        return (0,_ActivityBox__WEBPACK_IMPORTED_MODULE_1__.ActivityBox)({ activityName: activity.activityName, casePercentage: activity.casePercentage, eventCount: activity.eventCount });
    })).height('auto').wrap('wrap').alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading))
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
        // We want to space 10px between every vertical block
        .spacing(10));
}


/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/Overview/Views/HappyPathBox.ts":
/*!********************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/Overview/Views/HappyPathBox.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HappyPathGaugeBox": () => (/* binding */ HappyPathGaugeBox),
/* harmony export */   "HappyPathBox2": () => (/* binding */ HappyPathBox2),
/* harmony export */   "HappyPathBox3": () => (/* binding */ HappyPathBox3)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function HappyPathGaugeBox(params) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(params.title).padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Gauge)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Range)()).color('rgb(118,209,187)').maskColor('rgb(120,120,120,20%)')
        .radius(80)
        .stroke(10)
        .value(67)
        .height(155)))
        .height('245px')
        .backgroundColor('rgb(255,255,255,60%)')
        .cornerRadius('12px')
        .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
        .marginHorizontal('2px')
        .tabIndex(0));
}
function HappyPathBox2(params) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(params.title).padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VDivider)().width('1px').background('gray'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().background('transparent').height('10px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().background({ default: '#14A9D5', hover: 'gray' }).height('20px').width((params.value / params.totalValue) * 100 + "%"), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().background('#E4E4E4').height('20px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().background('transparent').height('10px')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading)).padding('30px').width('70%'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(params.value.toString()).fontFamily('Proxima Nova').fontWeight('500').fontSize('27px').foregroundColor('#14a9d5'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("of " + params.totalValue + " Cases")
        .marginBottom('15px')
        .fontFamily('Proxima Nova')
        .fontWeight('500')
        .fontSize('20px')
        .foregroundColor('#888888'))
        .height('245px')
        .backgroundColor('rgb(255,255,255,60%)')
        .cornerRadius('12px')
        .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
        .marginHorizontal('2px')
        .tabIndex(0));
}
function HappyPathBox3() {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Happy path in percentages').padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().background('transparent').width('10px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().background('#14A9D5').width('20px').height('50%'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().background('#E4E4E4').width('20px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().background('transparent').width('10px')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.bottom), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HDivider)().height('1px').background('gray').width('50%')).padding('30px').width('70%'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('107,688').fontFamily('Proxima Nova').fontWeight('500').fontSize('27px').foregroundColor('#14a9d5'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('of 279,020 Cases')
        .marginBottom('15px')
        .fontFamily('Proxima Nova')
        .fontSize('20px')
        .foregroundColor('#888888'))
        .height('245px')
        .backgroundColor('rgb(255,255,255,60%)')
        .cornerRadius('12px')
        .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
        .marginHorizontal('2px')
        .tabIndex(0));
}


/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/Overview/Views/HappyPathDiagram.ts":
/*!************************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/Overview/Views/HappyPathDiagram.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HappyPathDiagram": () => (/* binding */ HappyPathDiagram)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function HappyPathDiagram(items) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Algorithmic happy path').padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').fontWeight('500').foregroundColor('#888888'), _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(items, function (item, index) {
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(item.name).marginBottom('10px').fontSize('14px').fontWeight('500'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.If)(index === 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)().width('100%'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().height(3).background('#e4e4e4').marginTop('-1px')), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.If)(index === 0, null, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIImage)('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTMgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA0MC4xICgzMzgwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+OTBDRDYzRDItOENGNy00OERFLTgzQTAtQUUzMTdERTg0MjVDPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBza2V0Y2h0b29sLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQcm9jZXNzLW1ldHJpY3MiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJQcm9jZXNzLS0tb3ZlcnZpZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04NTYuMDAwMDAwLCAtMTE0OC4wMDAwMDApIiBmaWxsPSIjQ0NDQ0NDIj4KICAgICAgICAgICAgPGcgaWQ9Ik1BSU4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5MC4wMDAwMDAsIDU2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkhhcHB5LXBhdGgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCA2NjEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkhhcHB5LXBhdGgtdml6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMjk1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iTmV3LWhhcHB5LXBhdGgtdml6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMC4wMDAwMDAsIDc2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlJlY3RhbmdsZS00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NDIuNTAwMDAwLCA2Ni41MDAwMDApIHJvdGF0ZSgtMjcwLjAwMDAwMCkgdHJhbnNsYXRlKC02NDIuNTAwMDAwLCAtNjYuNTAwMDAwKSAiIHBvaW50cz0iNjQyLjUgNjAgNjQ5IDczIDY0Mi41IDY5Ljc1IDYzNiA3MyI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=').marginLeft('-3px')), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f0e1').size(30).foregroundColor('#14A9D5'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.If)(index === items.length - 1, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)().width('100%'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().height(3).background('#e4e4e4').marginTop('-1px'))))
            .height() // auto
            .marginTop('20px');
    })))
        .backgroundColor('rgb(255,255,255,60%)').cornerRadius('12px').height(154).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
        .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
        .marginHorizontal('2px')
        .tabIndex(0));
}


/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/Overview/Views/HappyPathSection.ts":
/*!************************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/Overview/Views/HappyPathSection.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HappyPathSection": () => (/* binding */ HappyPathSection)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _HappyPathBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HappyPathBox */ "./src/Domains/ProcessOverview/Controllers/Overview/Views/HappyPathBox.ts");
/* harmony import */ var _HappyPathDiagram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HappyPathDiagram */ "./src/Domains/ProcessOverview/Controllers/Overview/Views/HappyPathDiagram.ts");



function HappyPathSection(params) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Happy path')
        .marginTop('30px')
        .paddingTop('5px')
        .height('38px')
        .fontFamily('Proxima Nova')
        .fontSize('20px')
        .foregroundColor('#333333'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_HappyPathBox__WEBPACK_IMPORTED_MODULE_1__.HappyPathGaugeBox)({ title: 'Happy path in percentages' }), (0,_HappyPathBox__WEBPACK_IMPORTED_MODULE_1__.HappyPathBox2)(params.happyPathAbsoluteBoxModel), (0,_HappyPathBox__WEBPACK_IMPORTED_MODULE_1__.HappyPathBox3)()).height('auto').spacing('10px'), (0,_HappyPathDiagram__WEBPACK_IMPORTED_MODULE_2__.HappyPathDiagram)(params.happyPathDiagramItems))
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
        // We want to space 10px between every vertical block
        .spacing('10px'));
}


/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/Overview/Views/MetricBox.ts":
/*!*****************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/Overview/Views/MetricBox.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PortalMetricBox": () => (/* binding */ PortalMetricBox),
/* harmony export */   "DesktopMetricBox": () => (/* binding */ DesktopMetricBox),
/* harmony export */   "MetricBox": () => (/* binding */ MetricBox)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI_Animations_ListBounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../UI/Animations/ListBounce */ "./src/UI/Animations/ListBounce.ts");
/* harmony import */ var _UI_Views_Texts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../UI/Views/Texts */ "./src/UI/Views/Texts.ts");



function MetricBoxHeaderText(value) {
    return ((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_2__.Headline5)(value).padding('20px 30px 0 30px').fontWeight('700').foregroundColor('#495057DD'));
}
function MetricBoxValueText(value) {
    return ((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_2__.Headline4)(value).fontFamily('Proxima Nova, sans serif').fontWeight('500').foregroundColor('#14a9d5'));
}
function CalculationMethodText(value) {
    return ((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_2__.Headline5)(value).fontFamily('Proxima Nova, sans serif').foregroundColor('#AAA'));
}
function PortalMetricBox(params) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ZStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(MetricBoxHeaderText(params.title), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)(MetricBoxValueText(params.value.toString()), 
    /* Text(params.value.toString()).fontSize('40px').fontFamily('Proxima Nova, sans serif').fontWeight('500').foregroundColor('#14a9d5'), */
    (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(
    /* Text('monts').foregroundColor('rgb(251,192,1)').fontSize('10px').fontWeight('700'), */
    CalculationMethodText('AVG')
        .onClick(function () { return params.showMenu.set(true); })
        .padding()
        .cornerRadius(5)
        .cursor('pointer')
        .border('dashed 1px var(--sub-border-color)')
        .transition('border .3s')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading))
        .paddingLeft('30px')
        .paddingTop('10px')
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Duration').foregroundColor('#b40404'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('15 - 40 monts').foregroundColor('#AAA'))
        .marginLeft('32px')
        .marginBottom('5px')
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading))
        .height(148)
        .backgroundColor('rgb(255,255,255,60%)')
        .cornerRadius('12px')
        .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
        .tabIndex(0)
        // Üzerine geldiğimizde alt text border için.
        .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' }), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.AnimationStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Mean').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(function () { return params.showMenu.set(false); }), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Median').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(function () { return params.showMenu.set(false); }), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Max').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(function () { return params.showMenu.set(false); }), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Min').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(function () { return params.showMenu.set(false); })))
        .backgroundColor('white')
        .animation(_UI_Animations_ListBounce__WEBPACK_IMPORTED_MODULE_1__.ListBounceAnimation, '.3s')
        .visible(params.showMenu.get())));
}
function DesktopMetricBox(params) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(params.title).padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(params.value).padding('10px 30px 0 30px;').fontFamily('Proxima Nova').fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(params.subTitle).paddingLeft('30px').fontFamily('Proxima Nova').fontSize('12px').foregroundColor('#666'))
        .height('148px')
        .backgroundColor('rgb(255,255,255,60%)')
        .cornerRadius('12px')
        .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
        .tabIndex(0)
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading));
}
function MetricBox(params) {
    if (_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.ApplicationMode === _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ApplicationModes.Desktop) {
        return DesktopMetricBox(params);
    }
    else {
        return PortalMetricBox(params);
    }
}


/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/Overview/Views/MetricsSection.ts":
/*!**********************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/Overview/Views/MetricsSection.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MetricsSection": () => (/* binding */ MetricsSection)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MetricBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetricBox */ "./src/Domains/ProcessOverview/Controllers/Overview/Views/MetricBox.ts");


function MetricsSection(params) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Metrics').paddingTop('5px').height('38px').fontFamily('Proxima Nova').fontSize('20px').foregroundColor('#333333'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' })))
        // We prevent this stack to large more than its content
        .height('auto'), _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(params.metricBoxNodels, function (metricBoxModel) {
        return (0,_MetricBox__WEBPACK_IMPORTED_MODULE_1__.MetricBox)(metricBoxModel);
    })).height('155px')
        .spacing('10px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Daily cases per month').padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(params.chart))
        .backgroundColor('rgb(255,255,255,60%)')
        .cornerRadius('12px')
        .height('200px')
        .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
        .tabIndex(0))
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
        // We want to space 10px between every vertical block
        .spacing('10px'));
}


/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/ProcessOverviewController.ts":
/*!******************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/ProcessOverviewController.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcessOverviewController": () => (/* binding */ ProcessOverviewController)
/* harmony export */ });
/* harmony import */ var _tuval_components_charts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/components/charts */ "@tuval/components/charts");
/* harmony import */ var _tuval_components_charts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_components_charts__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UI_Views_PageHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../UI/Views/PageHeader */ "./src/UI/Views/PageHeader.ts");
/* harmony import */ var _UI_Views_PortalSideMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../UI/Views/PortalSideMenu */ "./src/UI/Views/PortalSideMenu.ts");
/* harmony import */ var _Overview_OverviewController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Overview/OverviewController */ "./src/Domains/ProcessOverview/Controllers/Overview/OverviewController.ts");
/* harmony import */ var _ThroughputTimes_ThroughputTimesController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThroughputTimes/ThroughputTimesController */ "./src/Domains/ProcessOverview/Controllers/ThroughputTimes/ThroughputTimesController.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function getMax(array) {
    var max = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].data > max) {
            max = array[i].data;
        }
    }
    return max;
}
var sideMenu = [
    {
        name: 'Process overview',
        icon: '\\f0b6',
        controller: new _Overview_OverviewController__WEBPACK_IMPORTED_MODULE_4__.OverviewController()
    },
    {
        name: 'Throughput times',
        icon: '\\f144',
        controller: new _ThroughputTimes_ThroughputTimesController__WEBPACK_IMPORTED_MODULE_5__.ThroughputTimesController()
    },
    {
        name: 'Activities',
        icon: '\\f0d5',
        controller: new _ThroughputTimes_ThroughputTimesController__WEBPACK_IMPORTED_MODULE_5__.ThroughputTimesController()
    }
];
var ProcessOverviewController = /** @class */ (function (_super) {
    __extends(ProcessOverviewController, _super);
    function ProcessOverviewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map = [];
        return _this;
    }
    ProcessOverviewController.prototype.InitController = function () {
        this.Appearance.OverflowX = 'hidden';
        this.Appearance.OverflowY = 'auto';
        this.refresh = '1';
        this.chart1 = new _tuval_components_charts__WEBPACK_IMPORTED_MODULE_0__.TvChart();
        this.chart1.Appearance.Width = '100%';
        this.chart1.Appearance.Height = '100px';
        this.chart2 = new _tuval_components_charts__WEBPACK_IMPORTED_MODULE_0__.TvChart();
        this.chart2.Appearance.Width = '100%';
        this.chart2.Appearance.Height = '100px';
        this.chart3 = new _tuval_components_charts__WEBPACK_IMPORTED_MODULE_0__.TvChart();
        this.chart3.Appearance.Width = '100%';
        this.chart3.Appearance.Height = '100px';
        this.OnControllerChanged(0);
    };
    ProcessOverviewController.prototype.OnControllerChanged = function (index) {
        this.selectedIndex = index;
        this.currentController = sideMenu[index].controller;
    };
    ProcessOverviewController.prototype.GetView = function () {
        var _this = this;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.HStack)((0,_UI_Views_PortalSideMenu__WEBPACK_IMPORTED_MODULE_3__.PortalSideMenu)({
            items: sideMenu,
            selectedIndex: this.selectedIndex,
            selectedAction: function (index) { return _this.OnControllerChanged(index); },
            second: true
        }), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.HStack)((0,_UI_Views_PageHeader__WEBPACK_IMPORTED_MODULE_2__.PageTitle)(sideMenu[this.selectedIndex].icon, sideMenu[this.selectedIndex].name), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Spacer)(), 
        // View Buttons Overview, Throuthput Times
        // Only Desktop
        _tuval_forms__WEBPACK_IMPORTED_MODULE_1__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.ForEach)(sideMenu, function (item, index) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Icon)(item.icon).size(14).foregroundColor('gray'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Text)(item.name).paddingLeft('5px'))
                .action(function () { return _this.OnControllerChanged(index); })
                .border('solid 1px gray')
                .cornerRadius('10px')
                .padding('3px 10px 3px 10px')
                .background(_this.selectedIndex === index ? 'rgb(120,120,120,20%)' : '');
        })).width() // auto width
            .spacing(5)
            .visible(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.TApplication.IsDesktop), 
        // Portal
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Text)('traces').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Text)('0').foregroundColor('#999').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif')), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Text)('events').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Text)('0').foregroundColor('#2ca3c0').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif')), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Text)('variants').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Text)('0').foregroundColor('#b40404').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif')))
            .spacing(30)
            .width() //auto width
            .visible(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.TApplication.IsPortal)).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Alignment.leading).spacing(10).height(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.HDivider)().height('1px').backgroundColor('rgb(120,120,120,20%)'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.VStack)(// For scrolling
        this.currentController).overflowX('hidden').overflowY('auto'))
            .padding('10px')
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Alignment.topLeading)
            .spacing(10)
            .background(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.TApplication.IsPortal ? '#f1f1f1' : ''))));
    };
    ProcessOverviewController.prototype.LoadView = function () {
        return this.GetView();
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], ProcessOverviewController.prototype, "chart1", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], ProcessOverviewController.prototype, "chart2", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], ProcessOverviewController.prototype, "chart3", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], ProcessOverviewController.prototype, "chartData", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], ProcessOverviewController.prototype, "map", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], ProcessOverviewController.prototype, "refresh", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], ProcessOverviewController.prototype, "selectedIndex", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.State)()
    ], ProcessOverviewController.prototype, "currentController", void 0);
    return ProcessOverviewController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.UIController));



/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/ThroughputTimes/ThroughputTimesController.ts":
/*!**********************************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/ThroughputTimes/ThroughputTimesController.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThroughputTimesController": () => (/* binding */ ThroughputTimesController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _View_BottleneckSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View/BottleneckSection */ "./src/Domains/ProcessOverview/Controllers/ThroughputTimes/View/BottleneckSection.ts");
/* harmony import */ var _View_ThroughputTimeSection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View/ThroughputTimeSection */ "./src/Domains/ProcessOverview/Controllers/ThroughputTimes/View/ThroughputTimeSection.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ThroughputTimesController = /** @class */ (function (_super) {
    __extends(ThroughputTimesController, _super);
    function ThroughputTimesController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThroughputTimesController.prototype.InitController = function () {
    };
    ThroughputTimesController.prototype.LoadView = function () {
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_View_ThroughputTimeSection__WEBPACK_IMPORTED_MODULE_2__.ThroughputTimeSection)(), (0,_View_BottleneckSection__WEBPACK_IMPORTED_MODULE_1__.BottleneckSection)())
            .spacing(20)
            .position(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.PositionTypes.Absolute)
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading));
    };
    return ThroughputTimesController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/ThroughputTimes/View/BottleneckSection.ts":
/*!*******************************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/ThroughputTimes/View/BottleneckSection.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BottleneckSection": () => (/* binding */ BottleneckSection)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../UI/Views/Texts */ "./src/UI/Views/Texts.ts");


function BottleneckSection() {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.SectionHeadline)('Bottlenecks'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' })))
        // We prevent this stack to large more than its content
        .height(), (0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.SectionSubHeadline)('These connections increase process throughput time considerably'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ spacing: 15 }).apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)([1, 2, 3, 4, 5], function (index) {
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cTop })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().width(3).backgroundColor('rgb(255, 136, 132)'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cTopLeading })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)({ spacing: 5 })((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.RegularText)('Change Price').fontSize('16px').fontWeight('500').foregroundColor('#1d6c83'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIImage)('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTggMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA0MC4zICgzMzgzOSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+NDY5OEVGQ0UtNDQ0NC00MjU5LUE3NjItMzFGMDBGQjRFRDlFPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBza2V0Y2h0b29sLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQcm9jZXNzLW1ldHJpY3MiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJQcm9jZXNzLS0tdGhyb3VnaHB1dC10aW1lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDIyLjAwMDAwMCwgLTExODMuMDAwMDAwKSIgZmlsbD0iIzBCNUY3OCI+CiAgICAgICAgICAgIDxnIGlkPSJNQUlOIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODcuMDAwMDAwLCA1NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJCb3R0bGVuZWNrcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wMDAwMDAsIDEwNDMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkJvdHRsZW5lY2staXRlbSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi4wMDAwMDAsIDY5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iSGVhZGVyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNC4wMDAwMDAsIDExLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkNvbm5lY3Rpb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxNy4wMDAwMDAsIDExLjAwMDAwMCkgcm90YXRlKC05MC4wMDAwMDApIHRyYW5zbGF0ZSgtMjE3LjAwMDAwMCwgLTExLjAwMDAwMCkgdHJhbnNsYXRlKDIxMi4wMDAwMDAsIDIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTQsOS42IEwtMS43NzYzNTY4NGUtMTUsOCBMNSwxOCBMMTAsOCBMNiw5LjYgTDYsMCBMNCwwIEw0LDkuNiBaIiBpZD0iaWNvbi1hcnJvdy1yaWdodCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4='), (0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.RegularText)('Change Price').fontSize('16px').fontWeight('500').foregroundColor('#1d6c83')).width().height().padding('10px 15px 10px 15px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('View cases in…').paddingLeft('15px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cLeading, spacing: 20 })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cLeading })((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.SectionTitle)('Throughput time'), (0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.SectionContent)('10 work day(s)')).width(), //auto
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cLeading })((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.SectionTitle)('Cases affected'), (0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.SectionContent)('14%')).width() //auto
        ).paddingLeft('15px')).padding())
            .background(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Color.white.opacity(0.5))
            .shadow({ default: '0 2px 5px 0 rgb(0 0 0 / 5%), 0 1px 3px 0 rgb(0 0 0 / 10%)', hover: '0 2px 10px rgb(0 0 0 / 16%), 0 2px 5px rgb(0 0 0 / 26%)' })
            .height(122);
    })).height().padding())
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
    // We want to space 10px between every vertical block
    );
}


/***/ }),

/***/ "./src/Domains/ProcessOverview/Controllers/ThroughputTimes/View/ThroughputTimeSection.ts":
/*!***********************************************************************************************!*\
  !*** ./src/Domains/ProcessOverview/Controllers/ThroughputTimes/View/ThroughputTimeSection.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThroughputTimeSection": () => (/* binding */ ThroughputTimeSection)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../UI/Views/Texts */ "./src/UI/Views/Texts.ts");
/* harmony import */ var _UI_Views_TileBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../UI/Views/TileBox */ "./src/UI/Views/TileBox.ts");



function DurationHeadline(value) {
    return ((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.RegularText)(value)
        .cursor('pointer')
        .border('dashed 1px var(--sub-border-color)')
        .transition('border .3s'));
}
function DurationText(value) {
    return ((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.RegularText)(value).fontSize(40).foregroundColor('#666'));
}
function DurationUnitText(value) {
    return ((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.RegularText)(value).fontSize(20).foregroundColor('#666')
        .cursor('pointer')
        .border('dashed 1px var(--sub-border-color)')
        .transition('border .3s'));
}
function ProcessStartEnd() {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.RegularText)('Process start').fontWeight('bold').foregroundColor('#555'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f084').size(20).marginBottom('3px'), (0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.RegularText)('Process end').fontWeight('bold').foregroundColor('#555'))
        .cursor('pointer')
        .border({ default: 'dashed 1px var(--sub-border-color)', hover: 'solid 1px #2ca3c0' })
        .spacing(10)
        .height() //auto
        .width() //auto
    );
}
function ThroughputTimeSection() {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.SectionHeadline)('Throughput Time Search'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' })))
        // We prevent this stack to large more than its content
        .height('auto'), (0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.SectionSubHeadline)('Select any two activities to see throughput time between them'), (0,_UI_Views_TileBox__WEBPACK_IMPORTED_MODULE_2__.TileBox)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(DurationHeadline('Average Throughput time'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)(DurationText('24'), DurationUnitText('Days')), ProcessStartEnd())
        .padding(10)
        .height()
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.top), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Chart here')))
        .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' })
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.top))
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading)
    // We want to space 10px between every vertical block
    );
}


/***/ }),

/***/ "./src/Domains/Project/Controllers/ProjectController.ts":
/*!**************************************************************!*\
  !*** ./src/Domains/Project/Controllers/ProjectController.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectControllerClass": () => (/* binding */ ProjectControllerClass),
/* harmony export */   "ProjectController": () => (/* binding */ ProjectController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Services_Services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Services/Services */ "./src/Services/Services.ts");
/* harmony import */ var _UI_Models_MIProjectItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../UI/Models/MIProjectItem */ "./src/UI/Models/MIProjectItem.ts");
/* harmony import */ var _Views_ListFooterButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Views/ListFooterButton */ "./src/Domains/Project/Views/ListFooterButton.ts");
/* harmony import */ var _UI_Views_ListView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../UI/Views/ListView */ "./src/UI/Views/ListView.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var StackController = /** @class */ (function (_super) {
    __extends(StackController, _super);
    function StackController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackController.prototype.InitController = function () {
        this.array = [1, 2, 3];
        this.title = 'Hello Controller';
    };
    StackController.prototype.LoadView = function () {
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(this.title).foregroundColor('blue').font(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Fonts.title));
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], StackController.prototype, "title", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], StackController.prototype, "array", void 0);
    return StackController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));
function MyButton(text, action) {
    return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f178').size(15), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(text))
        .spacing('5px')
        .border('solid 2px maroon')
        .cornerRadius('40px')
        .paddingLeft('10px')
        .paddingRight('10px')
        .cursor('pointer')).action(function () { action(); });
}
var Tab1Controller1 = /** @class */ (function (_super) {
    __extends(Tab1Controller1, _super);
    function Tab1Controller1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab1Controller1.prototype.InitController = function () {
        var _this = this;
        this.Appearance.Display = 'flex';
        this.Appearance.Width = '100%';
        this.Appearance.Height = '100%';
        this.title = '__Tes_';
        setTimeout(function () { return _this.title = 'sdfsdfdsfsdf'; }, 5000);
        this.button = new _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Button();
        this.button.Text = 'asdka';
    };
    Tab1Controller1.prototype.LoadView = function () {
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(this.button);
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], Tab1Controller1.prototype, "title", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], Tab1Controller1.prototype, "button", void 0);
    return Tab1Controller1;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));
var Tab1Controller2 = /** @class */ (function (_super) {
    __extends(Tab1Controller2, _super);
    function Tab1Controller2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab1Controller2.prototype.InitController = function () {
        this.Appearance.Display = 'flex';
        this.Appearance.Width = '100%';
        this.Appearance.Height = '100%';
    };
    Tab1Controller2.prototype.LoadView = function () {
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Tab1Controller 2');
    };
    return Tab1Controller2;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));
var tabModel = [];
function DatasetListView(projectItem) {
    return ((0,_UI_Views_ListView__WEBPACK_IMPORTED_MODULE_4__.ListViewItem)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)(projectItem.icon).size(20).width('auto'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(projectItem.name)).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading).spacing('5px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)(
    /*  gauge as any */
    ).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading)).spacing('5px').padding('5px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(
    // Filter Icon
    (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f130').size(20), 
    // Filter Badge
    (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('2')
        .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.center)
        .fontWeight('bold')
        .padding('5px')
        .backgroundColor('#27B764')
        .width('20px')
        .height('20px')
        .cornerRadius('5px')
        .foregroundColor('white')).width('auto').spacing('5px'))).minHeight('80px'));
}
function DashboardListView(projectItem) {
    return ((0,_UI_Views_ListView__WEBPACK_IMPORTED_MODULE_4__.ListViewItem)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)(projectItem.icon).size(20).width('auto'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(projectItem.name)).minHeight('50px'));
}
var ProjectControllerClass = /** @class */ (function (_super) {
    __extends(ProjectControllerClass, _super);
    function ProjectControllerClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectControllerClass.prototype.SetParentAppController = function (value) {
        this.parentAppController = value;
        return this;
    };
    ProjectControllerClass.prototype.$ = function (value) {
        var _this = this;
        var propertyName = this.GetLastEnteredPropertyName();
        return {
            get: function () {
                return _this[propertyName];
            },
            set: function (value) {
                _this[propertyName] = value;
            }
        };
        console.log();
    };
    ProjectControllerClass.prototype.InitController = function () {
        this.array = [1, 2, 3, 4, 5, 6];
        this.stackController = new StackController();
        this.selectedTab = 'Process Explorer';
    };
    ProjectControllerClass.prototype.OnBindModel = function (project) {
        var _this = this;
        this.selectedProject = project;
        var session_id = _Services_Services__WEBPACK_IMPORTED_MODULE_1__.Services.StateService.GetSessionId();
        _Services_Services__WEBPACK_IMPORTED_MODULE_1__.Services.ProjectService.GetProjectItems(session_id, 'bpmgenesis', '').then(function (projectItems) {
            _this.selectedProjectItems = projectItems.map(function (projectItem) { return (0,_UI_Models_MIProjectItem__WEBPACK_IMPORTED_MODULE_2__.CreateMVIProjectItem)(projectItem); });
            _this.OnProjectItemSelected(_this.selectedProjectItems[0]);
        });
        return this;
    };
    //When user click add button that under list
    ProjectControllerClass.prototype.OnNewProjectItem = function () {
        /*  const connectorDialog = new ConnectorDialog();
         connectorDialog.ShowDialog(); */
    };
    // When user select items froım list
    ProjectControllerClass.prototype.OnProjectItemSelected = function (projectItem) {
        this.selectedProjectItem = projectItem;
        this.selectedProjectItemController = projectItem.controller;
        if (!this.selectedProjectItemController.IsModelBind) {
            this.selectedProjectItemController.Bind(projectItem);
        }
    };
    ProjectControllerClass.prototype.LoadProjects = function () {
        var _this = this;
        var session_id = _Services_Services__WEBPACK_IMPORTED_MODULE_1__.Services.StateService.GetSessionId();
        _Services_Services__WEBPACK_IMPORTED_MODULE_1__.Services.ProjectService.GetProjects(session_id, 'bpmgenesis').then(function (projects) {
            console.log('Load Project :', projects);
            _this.projects = projects;
            _this.ForceUpdate();
        });
    };
    ProjectControllerClass.prototype.LoadDesktopView = function () {
        var _this = this;
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TwoColumnWithHeaderLayout)({
            header: [
            /*   Text(this.selectedProject?.project_name).fontSize('24px'),
              UIButton(
                  Text('Close')
              ).action(() => this.parentAppController.CLoseProject()) */
            ],
            left: [
                (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\f112').size(15), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('insan kaynakları süreci').textTransform('uppercase')).height(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('100%'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().width(40).height('80%').background('#14A9D5').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Project').textTransform('uppercase'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('31.123').textTransform('uppercase').fontSize('10px')).spacing(10), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('100%'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().width(40).height('100%').background('rgb(59,210,115)').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Set').textTransform('uppercase'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Set').textTransform('uppercase')).spacing(10), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('100%'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().width(40).height('100%').background('rgb(250,112,3)').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Current').textTransform('uppercase')).spacing(10)).height('500px').width('200px').padding('20px').spacing('10px'), 
                //Project Title
                (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Project Items')
                    .font(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Fonts.title3)
                    .padding('8px')
                    .fontWeight('bold')
                    .foregroundColor('black')).height('auto').visible(false), 
                // Poject items list view
                _UI_Views_ListView__WEBPACK_IMPORTED_MODULE_4__.ListView.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(this.selectedProjectItems, function (projectItem) {
                    var _a, _b;
                    return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Case)(projectItem.type, {
                        'Dataset': DatasetListView(projectItem),
                        'Dashboard': DashboardListView(projectItem)
                    })
                        .borderBottom('solid 1px rgb(200,200,200,10%)')
                        .cornerRadius('5px')
                        .transition('all 0.35s')
                        .shadow(((_a = _this.selectedProjectItem) === null || _a === void 0 ? void 0 : _a.project_item_id) === projectItem.project_item_id ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' : '')
                        .background(((_b = _this.selectedProjectItem) === null || _b === void 0 ? void 0 : _b.project_item_id) === projectItem.project_item_id, 'rgb(255,255,255,50%)', 'rgb(255,255,255,10%)')
                        .onSelected(function () { return _this.OnProjectItemSelected(projectItem); });
                })).width('200px').background('rgb(255,255,255,10%)').grow(), 
                // Project items buttons
                (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_Views_ListFooterButton__WEBPACK_IMPORTED_MODULE_3__.ListFooterButton)('\\efff').action(function () { return _this.OnNewProjectItem(); }), (0,_Views_ListFooterButton__WEBPACK_IMPORTED_MODULE_3__.ListFooterButton)('\\effd'), (0,_Views_ListFooterButton__WEBPACK_IMPORTED_MODULE_3__.ListFooterButton)('\\f04a'), (0,_Views_ListFooterButton__WEBPACK_IMPORTED_MODULE_3__.ListFooterButton)('\\f0bb')).height('auto').width('100%').alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.center).spacing('5px')).spacing('5px')
                    .visible(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.ApplicationMode === _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ApplicationModes.Desktop)
            ],
            right: [
                (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(
                /*  this.TestTabView(), */
                this.selectedProjectItemController).grow()
            ],
            /*  footer: [
                 Text('Test').fontSize('24px')
             ] */
        }));
    };
    ProjectControllerClass.prototype.TestZStack = function () {
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Test'))
            .background((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ZStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.RoundedRectangle)().background('yellow').cornerRadius('8px'))));
    };
    ProjectControllerClass.prototype.LoadView = function () {
        return this.LoadDesktopView();
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "parentAppController", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "tab1", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "tab2", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "title", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "array", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "projects", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "selectedProject", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "selectedProjectItem", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "selectedProjectItems", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "selectedProjectItemController", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "selectedTab", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProjectControllerClass.prototype, "stackController", void 0);
    return ProjectControllerClass;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));

function ProjectController(appController, model) {
    return new ProjectControllerClass().SetParentAppController(appController).Bind(model);
}


/***/ }),

/***/ "./src/Domains/Project/Views/ListFooterButton.ts":
/*!*******************************************************!*\
  !*** ./src/Domains/Project/Views/ListFooterButton.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListFooterButton": () => (/* binding */ ListFooterButton)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI_Views_Buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../UI/Views/Buttons */ "./src/UI/Views/Buttons.ts");


/* export function ListFooterButton(iconContent: string): UIButtonClass {
    return (
        UIButton(
            Icon(iconContent).size(15)
        )
            .padding('5px')
            .backgroundImage('linear-gradient(#f5faff, #ebf0f5)')
            .background('#EBF0F5')
            .border('solid 1px #C8D2DC')
            .cornerRadius('5px')
            .width('32px')
            .height('32px')
            .opacity('0.8')
    );
} */
function ListFooterButton(iconContent) {
    return ((0,_UI_Views_Buttons__WEBPACK_IMPORTED_MODULE_1__.DefaultButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)(iconContent).size(15))
        .border('solid 1px #C8D2DC')
        .cornerRadius('5px')
        .width('32px')
        .height('32px')
        .opacity('0.8'));
}


/***/ }),

/***/ "./src/Domains/Statistics/Controllers/ActivityController.ts":
/*!******************************************************************!*\
  !*** ./src/Domains/Statistics/Controllers/ActivityController.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActivityController": () => (/* binding */ ActivityController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../UI/Views/Texts */ "./src/UI/Views/Texts.ts");
/* harmony import */ var _UI_Views_TileBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../UI/Views/TileBox */ "./src/UI/Views/TileBox.ts");
/* harmony import */ var _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../UI/Controls/EventsOverTimeChart/EventsOverTimeChart */ "./src/UI/Controls/EventsOverTimeChart/EventsOverTimeChart.ts");
/* harmony import */ var _Application_Views_PortalFilterBarWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Application/Views/PortalFilterBarWidget */ "./src/Domains/Application/Views/PortalFilterBarWidget.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var overviewTypes = [
    'Frequency',
    'Median duration',
    'Mean duration',
    'Duration range',
    'Aggreate duration'
];
function MetricSelectionButtons(buttons, selectedIndex, onSelectedAction) {
    return (_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__._ForEach)(buttons)(function (name, index) {
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(name).fontSize('13px'))
            .action(function () { return onSelectedAction(index); })
            .height(30)
            .border('solid 1px #ccc')
            .padding(5)
            .paddingLeft('10px')
            .paddingRight('10px')
            .cornerRadius(index === 0 ? '15px 0px 0px 15px' : (index === buttons.length - 1 ? '0px 15px 15px 0px' : ''))
            .background(index === selectedIndex ? 'rgb(120,120,120,20%)' : '');
    })));
}
var ActivityController = /** @class */ (function (_super) {
    __extends(ActivityController, _super);
    function ActivityController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityController.prototype.InitController = function () {
        this.selectedIndex = 0;
        this.chart = new _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_3__.EventsOverTimeChart();
        var map = new Map();
        // this.map = [];
        for (var i = 0; i < 100; i++) {
            map[i] = i;
        }
        this.chart.SetChartData(map);
    };
    ActivityController.prototype.LoadView = function () {
        var _this = this;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cTopLeading, spacing: 10 })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.SectionHeadline)('Overview'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), (0,_Application_Views_PortalFilterBarWidget__WEBPACK_IMPORTED_MODULE_4__.PortalFilterBarWidget)({ value: 23 })
        /* UIButton(
            Icon('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' }),
        ) */
        )
            // We prevent this stack to large more than its content
            .height(), (0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.SectionSubHeadline)('Global statistics'), MetricSelectionButtons(overviewTypes, this.selectedIndex, function (index) { return _this.selectedIndex = index; }).visible(false), (0,_UI_Views_TileBox__WEBPACK_IMPORTED_MODULE_2__.TileBox)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_1__.RegularText)(overviewTypes[this.selectedIndex])
            .fontSize('30px')
            .cursor('pointer')
            .border('dashed 1px var(--sub-border-color)')
            .transition('border .3s'))
            .padding()
            .height(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)({ spacing: 5 })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cTop, spacing: 10 }).apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__._ForEach)(overviewTypes)(function (name, index) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(name))
                .action(function () { return _this.selectedIndex = index; })
                .background(index === _this.selectedIndex ? 'rgb(120,120,120,20%)' : '')
                .width(180)
                .height(30)
                .border('solid 1px #ccc')
                .padding()
                .cornerRadius(12);
        })).minWidth('200px').maxWidth('200px'), this.chart))
            .height(400)
            .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' }))));
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ActivityController.prototype, "chart", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ActivityController.prototype, "selectedIndex", void 0);
    return ActivityController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/Statistics/Controllers/OverviewController.ts":
/*!******************************************************************!*\
  !*** ./src/Domains/Statistics/Controllers/OverviewController.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverviewController": () => (/* binding */ OverviewController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../UI/Controls/EventsOverTimeChart/EventsOverTimeChart */ "./src/UI/Controls/EventsOverTimeChart/EventsOverTimeChart.ts");
/* harmony import */ var _UI_Views_Texts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../UI/Views/Texts */ "./src/UI/Views/Texts.ts");
/* harmony import */ var _UI_Views_TileBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../UI/Views/TileBox */ "./src/UI/Views/TileBox.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var overviewTypes = [
    'Events over time',
    'Active cases over time',
    'Case variants',
    'Events per case',
    'Case duration',
    'Case utilization',
    'Mean activity duration',
    'Mean waiting time'
];
var staticticInfos = [
    {
        title: 'start time',
        value: '19.09.2012'
    },
    {
        title: 'end time',
        value: '19.09.2012'
    },
    {
        title: 'cases',
        value: '968'
    },
    {
        title: 'variants',
        value: '79'
    },
    {
        title: 'process step types',
        value: '12'
    },
    {
        title: 'total process steps',
        value: '7416'
    }
];
var metrics = [
    {
        name: 'Unique Variants',
        chart: new _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_2__.EventsOverTimeChart(),
        value: '57.14 %',
        subValue: '(+57.1 %)'
    },
    {
        name: 'Cases with (self)loops',
        chart: new _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_2__.EventsOverTimeChart(),
        value: '20.00 %',
        subValue: '(-75.6 %)'
    },
    {
        name: 'Automation rate',
        chart: new _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_2__.EventsOverTimeChart(),
        value: '2.78 %',
        subValue: '(+2.8 %)'
    },
    {
        name: 'Cases with long lead time',
        chart: new _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_2__.EventsOverTimeChart(),
        value: '13.33 %',
        subValue: '(-4.4 %)'
    },
    {
        name: 'Cases with many process steps',
        chart: new _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_2__.EventsOverTimeChart(),
        value: '13.33 %',
        subValue: '(+57.1 %)'
    },
    {
        name: 'Number of resources per process step',
        chart: new _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_2__.EventsOverTimeChart(),
        value: '2.63 %',
        subValue: '(+57.1 %)'
    }
];
function MetricSelectionButtons(buttons, selectedIndex, onSelectedAction) {
    return (_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__._ForEach)(buttons)(function (name, index) {
        return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(name).fontSize('13px'))
            .action(function () { return onSelectedAction(index); })
            .height(30)
            .border('solid 1px #ccc')
            .padding(5)
            .paddingLeft('10px')
            .paddingRight('10px')
            .cornerRadius(index === 0 ? '15px 0px 0px 15px' : (index === buttons.length - 1 ? '0px 15px 15px 0px' : ''))
            .background(index === selectedIndex ? 'rgb(120,120,120,20%)' : '');
    })));
}
var OverviewController = /** @class */ (function (_super) {
    __extends(OverviewController, _super);
    function OverviewController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OverviewController.prototype.InitController = function () {
        this.selectedIndex = 0;
        this.chart = new _UI_Controls_EventsOverTimeChart_EventsOverTimeChart__WEBPACK_IMPORTED_MODULE_2__.EventsOverTimeChart();
        var map = new Map();
        // this.map = [];
        for (var i = 0; i < 100; i++) {
            map[i] = i;
        }
        var map1 = new Map();
        // this.map = [];
        for (var i = 0; i < 10; i++) {
            map1[i] = i;
        }
        this.chart.SetChartData(map);
        (0,_tuval_core__WEBPACK_IMPORTED_MODULE_1__.foreach)(metrics, function (item) { return item.chart.SetChartData(map1); });
    };
    OverviewController.prototype.LoadView = function () {
        var _this = this;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cTopLeading, spacing: 10 })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_3__.SectionHeadline)('Overview'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)())
            // We prevent this stack to large more than its content
            .height(), (0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_3__.SectionSubHeadline)('Global statistics'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cLeading, spacing: 10 }).apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__._ForEach)(staticticInfos)(function (info) {
            return (0,_UI_Views_TileBox__WEBPACK_IMPORTED_MODULE_4__.TileBox)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_3__.RegularText)(info.value).fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'), (0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_3__.RegularText)(info.title).textTransform('uppercase').fontSize('11px').foregroundColor('#999')).padding(20)).maxHeight('120px');
        })).height(), MetricSelectionButtons(overviewTypes, this.selectedIndex, function (index) { return _this.selectedIndex = index; }).visible(false), 
        // Chart
        (0,_UI_Views_TileBox__WEBPACK_IMPORTED_MODULE_4__.TileBox)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_3__.RegularText)(overviewTypes[this.selectedIndex])
            .fontSize('30px')
            .cursor('pointer')
            .border('dashed 1px var(--sub-border-color)')
            .transition('border .3s'))
            .padding()
            .height(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)({ spacing: 10 })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ spacing: 10 }).apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__._ForEach)(overviewTypes)(function (name, index) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(name))
                .action(function () { return _this.selectedIndex = index; })
                .background(index === _this.selectedIndex ? 'rgb(120,120,120,20%)' : '')
                .width(180)
                .height(30)
                .border('solid 1px #ccc')
                .padding()
                .cornerRadius(12);
        })).width(250).padding(10), this.chart)).visible(false)
            .height(400)
            .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' }), 
        // Metrics
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ spacing: 10 }).apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__._ForEach)([1, 2])(function (indexI) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)({ spacing: 10 }).apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__._ForEach)([1, 2, 3])(function (indexJ) {
                return (0,_UI_Views_TileBox__WEBPACK_IMPORTED_MODULE_4__.TileBox)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_3__.RegularText)(metrics[indexI * indexJ - 1].name).paddingTop('30px').fontSize(20).foregroundColor('#333'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)({ spacing: 10 })((0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_3__.RegularText)(metrics[indexI * indexJ - 1].value).fontSize('30px').foregroundColor('#666'), (0,_UI_Views_Texts__WEBPACK_IMPORTED_MODULE_3__.RegularText)(metrics[indexI * indexJ - 1].subValue).fontSize('20px').fontWeight('600').foregroundColor('#888')
                    .position(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.PositionTypes.Absolute).right('30px')).marginTop('20px').height(), metrics[indexI * indexJ - 1].chart)).height(290);
            }));
        })).height())));
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], OverviewController.prototype, "chart", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], OverviewController.prototype, "chart1", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], OverviewController.prototype, "selectedIndex", void 0);
    return OverviewController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/Statistics/Controllers/ProcessStatisticController.ts":
/*!**************************************************************************!*\
  !*** ./src/Domains/Statistics/Controllers/ProcessStatisticController.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcessStatisticController": () => (/* binding */ ProcessStatisticController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI_Views_PageHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../UI/Views/PageHeader */ "./src/UI/Views/PageHeader.ts");
/* harmony import */ var _ActivityController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActivityController */ "./src/Domains/Statistics/Controllers/ActivityController.ts");
/* harmony import */ var _OverviewController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OverviewController */ "./src/Domains/Statistics/Controllers/OverviewController.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var controllers = [new _OverviewController__WEBPACK_IMPORTED_MODULE_3__.OverviewController, new _ActivityController__WEBPACK_IMPORTED_MODULE_2__.ActivityController];
var ProcessStatisticController = /** @class */ (function (_super) {
    __extends(ProcessStatisticController, _super);
    function ProcessStatisticController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProcessStatisticController.prototype.InitController = function () {
        this.currentController = controllers[0];
    };
    ProcessStatisticController.prototype.LoadView = function () {
        var _this = this;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_UI_Views_PageHeader__WEBPACK_IMPORTED_MODULE_1__.PageTitle)('\\f0f2', 'Process statistics'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__._ForEach)(['Overview', 'Throughput times', 'Activities'])(function (name, index) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(name))
                .action(function () { return _this.currentController = controllers[index]; })
                .border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px');
        })).width('auto').spacing('5px')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading).spacing('10px').height(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HDivider)().height('1px').backgroundColor('rgb(120,120,120,20%)'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ScrollView)({ axes: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cVertical })(this.currentController)).padding('10px').alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading).spacing('10px'))
            .background(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '#f1f1f1' : '')
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading));
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], ProcessStatisticController.prototype, "currentController", void 0);
    return ProcessStatisticController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/VariantExplorer/Controllers/VariantExplorerController.ts":
/*!******************************************************************************!*\
  !*** ./src/Domains/VariantExplorer/Controllers/VariantExplorerController.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VariantExplorerController": () => (/* binding */ VariantExplorerController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Views_VariantActivityShape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Views/VariantActivityShape */ "./src/Domains/VariantExplorer/Views/VariantActivityShape.ts");
/* harmony import */ var _UI_Views_PageHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../UI/Views/PageHeader */ "./src/UI/Views/PageHeader.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var VariantExplorerController = /** @class */ (function (_super) {
    __extends(VariantExplorerController, _super);
    function VariantExplorerController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VariantExplorerController.prototype.InitController = function () {
    };
    VariantExplorerController.prototype.LoadView = function () {
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_UI_Views_PageHeader__WEBPACK_IMPORTED_MODULE_2__.PageTitle)('\\f13c', 'Variant explorer'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spacer)(), _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(['Overview', 'Throughput times', 'Activities'], function (name) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(name)).border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px');
        })).width('auto').spacing('5px')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading).spacing('10px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HDivider)().height('1px').backgroundColor('rgb(120,120,120,20%)'), _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)([1, 2, 3, 4, 5], function (index) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Variant 1').fontSize('24px').fontFamily('Ubuntu, sans-serif').fontWeight('700').minWidth('200px'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Gauge)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Range)()).color('#14a9d5').maskColor('rgb(120,120,120,20%)').radius(30).stroke(7).value(67).height(55), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Gauge)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Range)()).color('#14a9d5').maskColor('rgb(120,120,120,20%)').radius(30).stroke(7).value(67).height(55), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_Views_VariantActivityShape__WEBPACK_IMPORTED_MODULE_1__.VariantActivityShapeView)('Satınalma onayının verilmesi'), (0,_Views_VariantActivityShape__WEBPACK_IMPORTED_MODULE_1__.VariantActivityShapeView)('Gerekli kontrollerin Sağlanması'), (0,_Views_VariantActivityShape__WEBPACK_IMPORTED_MODULE_1__.VariantActivityShapeView)('İzin talebi başladı'))
                .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading)
                .spacing(10))
                .padding('20px')
                /*   .shadow('rgba(0, 0, 0, 0.16) 0px 1px 4px') */
                .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading)
                .spacing(20);
        })).spacing(20)).padding('10px').alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading).spacing('10px').height('auto'))
            .backgroundColor('#f1f1f1')
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.topLeading));
    };
    return VariantExplorerController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/Domains/VariantExplorer/Views/VariantActivityShape.ts":
/*!*******************************************************************!*\
  !*** ./src/Domains/VariantExplorer/Views/VariantActivityShape.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VariantActivityShapeView": () => (/* binding */ VariantActivityShapeView)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function VariantActivityShapeView(text) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(text)
        .marginLeft('5px')
        .marginRight('20px'))
        .width('150px')
        .height('80px')
        .clipPath('polygon(0% 0%, 75% 0%, 95% 50%, 75% 100%, 0% 100%)')
        .background('yellow')).width('auto').height('auto').filter('drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))'));
}


/***/ }),

/***/ "./src/Icons/NewFile.ts":
/*!******************************!*\
  !*** ./src/Icons/NewFile.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewFileIcon": () => (/* binding */ NewFileIcon)
/* harmony export */ });
var NewFileIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNjAgNjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYwIDYwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBkPSJNNDIuNSwyMmgtMjVjLTAuNTUyLDAtMSwwLjQ0Ny0xLDFzMC40NDgsMSwxLDFoMjVjMC41NTIsMCwxLTAuNDQ3LDEtMVM0My4wNTIsMjIsNDIuNSwyMnoiLz4NCgk8cGF0aCBkPSJNMTcuNSwxNmgxMGMwLjU1MiwwLDEtMC40NDcsMS0xcy0wLjQ0OC0xLTEtMWgtMTBjLTAuNTUyLDAtMSwwLjQ0Ny0xLDFTMTYuOTQ4LDE2LDE3LjUsMTZ6Ii8+DQoJPHBhdGggZD0iTTQyLjUsMzBoLTI1Yy0wLjU1MiwwLTEsMC40NDctMSwxczAuNDQ4LDEsMSwxaDI1YzAuNTUyLDAsMS0wLjQ0NywxLTFTNDMuMDUyLDMwLDQyLjUsMzB6Ii8+DQoJPHBhdGggZD0iTTQyLjUsMzhoLTI1Yy0wLjU1MiwwLTEsMC40NDctMSwxczAuNDQ4LDEsMSwxaDI1YzAuNTUyLDAsMS0wLjQ0NywxLTFTNDMuMDUyLDM4LDQyLjUsMzh6Ii8+DQoJPHBhdGggZD0iTTQyLjUsNDZoLTI1Yy0wLjU1MiwwLTEsMC40NDctMSwxczAuNDQ4LDEsMSwxaDI1YzAuNTUyLDAsMS0wLjQ0NywxLTFTNDMuMDUyLDQ2LDQyLjUsNDZ6Ii8+DQoJPHBhdGggZD0iTTM4LjkxNCwwSDYuNXY2MGg0N1YxNC41ODZMMzguOTE0LDB6IE0zOS41LDMuNDE0TDUwLjA4NiwxNEgzOS41VjMuNDE0eiBNOC41LDU4VjJoMjl2MTRoMTR2NDJIOC41eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=';


/***/ }),

/***/ "./src/Icons/OpenFile.ts":
/*!*******************************!*\
  !*** ./src/Icons/OpenFile.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpenFileIcon": () => (/* binding */ OpenFileIcon)
/* harmony export */ });
var OpenFileIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNjAgNjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYwIDYwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNNTcuNDksMjEuNUg1NHYtNi4yNjhjMC0xLjUwNy0xLjIyNi0yLjczMi0yLjczMi0yLjczMkgyNi41MTVsLTUtN0gyLjczMkMxLjIyNiw1LjUsMCw2LjcyNiwwLDguMjMydjQzLjY4N2wwLjAwNiwwDQoJYy0wLjAwNSwwLjU2MywwLjE3LDEuMTE0LDAuNTIyLDEuNTc1QzEuMDE4LDU0LjEzNCwxLjc2LDU0LjUsMi41NjUsNTQuNWg0NC43NTljMS4xNTYsMCwyLjE3NC0wLjc3OSwyLjQ1LTEuODEzTDYwLDI0LjY0OXYtMC4xNzcNCglDNjAsMjIuNzUsNTguOTQ0LDIxLjUsNTcuNDksMjEuNXogTTIsOC4yMzJDMiw3LjgyOCwyLjMyOSw3LjUsMi43MzIsNy41aDE3Ljc1M2w1LDdoMjUuNzgyYzAuNDA0LDAsMC43MzIsMC4zMjgsMC43MzIsMC43MzJWMjEuNQ0KCUgxMi43MzFjLTAuMTQ0LDAtMC4yODcsMC4wMTItMC40MjYsMC4wMzZjLTAuOTczLDAuMTYzLTEuNzgyLDAuODczLTIuMDIzLDEuNzc2TDIsNDUuODk5VjguMjMyeiBNNDcuODY5LDUyLjA4Mw0KCWMtMC4wNjYsMC4yNDUtMC4yOTEsMC40MTctMC41NDUsMC40MTdIMi41NjVjLTAuMjQzLDAtMC4zODUtMC4xMzktMC40NDgtMC4yMjJjLTAuMDYzLTAuMDgyLTAuMTYtMC4yNTYtMC4xMjMtMC40MDhsMTAuMTkxLTI3Ljk1Mw0KCWMwLjA2Ni0wLjI0NSwwLjI5MS0wLjQxNywwLjU0NS0wLjQxN0g1NGgzLjQ5YzAuMzgsMCwwLjQ3NywwLjU0NiwwLjUwMiwwLjgxOUw0Ny44NjksNTIuMDgzeiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=';


/***/ }),

/***/ "./src/Icons/SaveFile.ts":
/*!*******************************!*\
  !*** ./src/Icons/SaveFile.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SaveFileIcon": () => (/* binding */ SaveFileIcon)
/* harmony export */ });
var SaveFileIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDkgNDkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5IDQ5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBkPSJNMzkuOTE0LDBIMzcuNWgtMjhoLTl2NDloN2gzM2g4VjguNTg2TDM5LjkxNCwweiBNMzUuNSwydjE0aC0yNFYySDM1LjV6IE05LjUsNDdWMjhoMjl2MTlIOS41eiBNNDYuNSw0N2gtNlYyNmgtMzN2MjFoLTUNCgkJVjJoN3YxNmgyOFYyaDEuNTg2TDQ2LjUsOS40MTRWNDd6Ii8+DQoJPHBhdGggZD0iTTEzLjUsMzNoN2MwLjU1MywwLDEtMC40NDcsMS0xcy0wLjQ0Ny0xLTEtMWgtN2MtMC41NTMsMC0xLDAuNDQ3LTEsMVMxMi45NDcsMzMsMTMuNSwzM3oiLz4NCgk8cGF0aCBkPSJNMjMuNSwzNWgtMTBjLTAuNTUzLDAtMSwwLjQ0Ny0xLDFzMC40NDcsMSwxLDFoMTBjMC41NTMsMCwxLTAuNDQ3LDEtMVMyNC4wNTMsMzUsMjMuNSwzNXoiLz4NCgk8cGF0aCBkPSJNMjUuNzksMzUuMjljLTAuMTgxLDAuMTg5LTAuMjksMC40NS0wLjI5LDAuNzFzMC4xMDksMC41MiwwLjI5LDAuNzFDMjUuOTc5LDM2Ljg5LDI2LjIyOSwzNywyNi41LDM3DQoJCWMwLjI2LDAsMC41Mi0wLjExLDAuNzEtMC4yOWMwLjE4LTAuMTksMC4yOS0wLjQ1LDAuMjktMC43MXMtMC4xMS0wLjUyMS0wLjI5LTAuNzFDMjYuODQsMzQuOTIsMjYuMTYsMzQuOTIsMjUuNzksMzUuMjl6Ii8+DQoJPHBhdGggZD0iTTMzLjUsNGgtNnYxMGg2VjR6IE0zMS41LDEyaC0yVjZoMlYxMnoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K';


/***/ }),

/***/ "./src/MainView.ts":
/*!*************************!*\
  !*** ./src/MainView.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainView": () => (/* binding */ MainView)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resources */ "./src/Resources.ts");
/* harmony import */ var _Domains_Application_Controllers_AppController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Domains/Application/Controllers/AppController */ "./src/Domains/Application/Controllers/AppController.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TestButton = /** @class */ (function (_super) {
    __extends(TestButton, _super);
    function TestButton() {
        var _this = _super.call(this) || this;
        _this.Clicked.add(function () {
            debugger;
            _this.Text = 'dfsfsdf';
        });
        return _this;
    }
    TestButton.prototype.ShowText = function () {
        debugger;
        this.Text = 'asdsdsadsdasdasd';
    };
    return TestButton;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Button));
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainView.prototype.InitComponents = function () {
        var _this = this;
        this.Width = 1000;
        this.Height = 700;
        this.Name = 'ProcessMaining::MainForm';
        this.Text = 'Procetra';
        this.Icon = _Resources__WEBPACK_IMPORTED_MODULE_1__.Resources.Icons.ApplicationIcon;
        var testController = new _Domains_Application_Controllers_AppController__WEBPACK_IMPORTED_MODULE_2__.AppController();
        this.Controls.Add(testController);
        testController.LoadRecentFiles();
        testController.RequestDesktop.add(function () { return _this.TopMaximize(); });
        // testController.LoadProjects();
        /*   const button = new TestButton();
          button.Text = 'Test';
          this.Controls.Add(button);
          setTimeout(()=> button.ShowText(),10000); */
        this.TopMaximizeChanged.add(function (topMaximized) {
            if (topMaximized) {
                _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.ApplicationMode = _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ApplicationModes.Portal;
            }
            else {
                _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.ApplicationMode = _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ApplicationModes.Desktop;
            }
        });
    };
    MainView = __decorate([
        _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.View
    ], MainView);
    return MainView;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TForm));



/***/ }),

/***/ "./src/Resources.ts":
/*!**************************!*\
  !*** ./src/Resources.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resources": () => (/* binding */ Resources)
/* harmony export */ });
/* harmony import */ var _Icons_NewFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Icons/NewFile */ "./src/Icons/NewFile.ts");
/* harmony import */ var _Icons_OpenFile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icons/OpenFile */ "./src/Icons/OpenFile.ts");
/* harmony import */ var _Icons_SaveFile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icons/SaveFile */ "./src/Icons/SaveFile.ts");



var Resources = {
    Icons: {
        NewFile: _Icons_NewFile__WEBPACK_IMPORTED_MODULE_0__.NewFileIcon,
        OpenFile: _Icons_OpenFile__WEBPACK_IMPORTED_MODULE_1__.OpenFileIcon,
        SaveFile: _Icons_SaveFile__WEBPACK_IMPORTED_MODULE_2__.SaveFileIcon,
        ApplicationIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAyCAYAAAAN6MhFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAEQElEQVRoQ92aS0iVQRTHr5q2sJdCCRER2QuzSIOIWvQg1IpqkZsSdFeQuIow2rhISFwY6CYTsqjoZahhRUIUrRKKoIWYlPQioqDo/dD8N4c5cu88vq/P7nz36v3DbzPnzJn538d8M3NvRBcikRJBg6B1EtMo2MGWTIngSQFSiEuCNLYnJRq2xySkEhVsUUo0HNcSUoV2tiglGs5qCalCD1uUEg3eRmfMALZtA/btSx579wIlJUBenn2O3gQ0umoV8OoVJpT6+oDKSiA93ZyvSQCjaWnA48dcfQLq7l1g9mx1ziYBjC5cyBUnsAYHgZwcdd4qAYxu2MDVJrg6O9V5qwQwunEjV5oEWrdOnXuUOI0+ewYcPGhfIV1x4ADQ0ABcvw4MD/PAHmpvV+ceJU6jK1equWGzbJn/wvj6tb1fXEb//JErsp4fNrToDA3xJCyaM8fWLw6jIyNqXiLZvZsnYVFxsa1PEo1mZ8t3x4/p0+19s7KA7995IppovmafkI3SR3vtWqCxEbhzB3j79t8Liq7+fmD5crP2wAAnaCotNXNDNUoLB+1aXGhQbAgyMtT6jx5xUFNZmZonCcnomjXAhw+c6EgFBeoYSTc6axbw5g0nOdTixeo4STfa0sIJDkXfb30cL6Nbt5q5zo3OnAl8+8YJPvr5E3j+XO6sdJ48AR48kPSJo1hzM5Cba45FuTYlxGh5OQc9dP8+sGkTMGWK2Xc80GPHa/Wmg7nZx7HRujoOWnTjhnz+6X3+h/37uahFK1bY+jg22tbGQU1fvgQ5HAdj/nzg/XsubBEthmY/x0Zv3uSgptOnzdzxQpsPWlFfvOCiFr17Z+/r3Ojt2xzUVF1t5i5aBBw7BrS2+nPxItDTA7x8ycV85P2CJshoRYWaR9cznz5x0KFouxk7TpQkGW1q4oBDnTmjjqGSJKMXLnDAkR4+9FqExkiS0ZoaDjjQlSvySBdb3yRBRquq1Dx6nl67xsFxanRU3jCcOAGsX6/W9cax0Vu3OKjp8GEzl1iyBNiy5d+sXi1ZuhSYNs1eyx/HRru7OaiJHg96bmKJw+iPH2oeceoUBzXRJp52NHp+4ojD6Nevah5RX89Bi7q6zFuCxOHY6K5dHPTQ1avA3Llmv/BxbJTOo/Qx9dPv3/K4du6cfcsXL4WF5rycGyVo2U+maHU25xWC0Xnz/I9RYYrGtR/qHRml4jt3yh+F6FSyeXOwKxXXOnJEnXsUB0bpxp2+c2P69Uv+14B+Gnj6lBsToN5evyuaAEbpmpE2B7o+f5bxo0e5IUb0ItCfO2irR9ce9+7JFyAMffwoH2tTp6rzVglglKBbd31bVlQkY/Tu1daaLFig1sjMBPLzo9s5F9CldrB7qIBGJz+G0WYtIVXoYItSoqFcS0gVatmilGhIE3TEJKQC/YJsthiVaCSzewRtgsuTmPOCQwLTZGorEvkLIDLNNCy2Ye4AAAAASUVORK5CYII='
    }
};


/***/ }),

/***/ "./src/Services/ConfigService.ts":
/*!***************************************!*\
  !*** ./src/Services/ConfigService.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigService": () => (/* binding */ ConfigService)
/* harmony export */ });
var ConfigService = /** @class */ (function () {
    function ConfigService() {
    }
    ConfigService.GetEbaBrokerUrl = function () {
        return 'https://bpmgenesis.com/broker/eba';
    };
    ConfigService.GetEnsembleUrl = function () {
        return 'https://bpmgenesis.com/broker/ensemble';
    };
    ConfigService.GetSymbolBrokerUrl = function () {
        //return 'http://apidera.com/symbol';
        return 'https://bpmgenesis.com/broker/symbol';
    };
    ConfigService.GetMiningBrokerUrl = function () {
        // return 'https://bpmgenesis.com/broker/mining/v1/';
        return 'http://127.0.0.1:5001/v1/';
    };
    return ConfigService;
}());



/***/ }),

/***/ "./src/Services/Services.ts":
/*!**********************************!*\
  !*** ./src/Services/Services.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Services": () => (/* binding */ Services)
/* harmony export */ });
/* harmony import */ var _StateService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateService */ "./src/Services/StateService.ts");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_1__);


var Services = /** @class */ (function () {
    function Services() {
    }
    Object.defineProperty(Services, "ProjectService", {
        get: function () {
            try {
                return _tuval_core__WEBPACK_IMPORTED_MODULE_1__.instance.resolve('IProjectService_Thread');
            }
            catch (_a) {
                throw 'Project Service Not Found.';
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Services, "StateService", {
        get: function () {
            return _StateService__WEBPACK_IMPORTED_MODULE_0__.StateService;
        },
        enumerable: false,
        configurable: true
    });
    return Services;
}());



/***/ }),

/***/ "./src/Services/StateService.ts":
/*!**************************************!*\
  !*** ./src/Services/StateService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CurrentProjectChangedArgs": () => (/* binding */ CurrentProjectChangedArgs),
/* harmony export */   "CurrentDatasetChangedArgs": () => (/* binding */ CurrentDatasetChangedArgs),
/* harmony export */   "CurrentProjectChangedHandler": () => (/* binding */ CurrentProjectChangedHandler),
/* harmony export */   "CurrentDatasetChangedHandler": () => (/* binding */ CurrentDatasetChangedHandler),
/* harmony export */   "StateService": () => (/* binding */ StateService)
/* harmony export */ });
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BrokerClients_MiningBrokerClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BrokerClients/MiningBrokerClient */ "./src/BrokerClients/MiningBrokerClient.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var CurrentProjectChangedArgs = /** @class */ (function () {
    function CurrentProjectChangedArgs(projectId) {
        this.ProjectId = projectId;
    }
    return CurrentProjectChangedArgs;
}());

var CurrentDatasetChangedArgs = /** @class */ (function () {
    function CurrentDatasetChangedArgs(projectId, datasetId) {
        this.ProjectId = projectId;
        this.DatasetId = datasetId;
    }
    return CurrentDatasetChangedArgs;
}());

var CurrentProjectChangedHandler = /** @class */ (function (_super) {
    __extends(CurrentProjectChangedHandler, _super);
    function CurrentProjectChangedHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CurrentProjectChangedHandler;
}(_tuval_core__WEBPACK_IMPORTED_MODULE_0__.Delegate));

var CurrentDatasetChangedHandler = /** @class */ (function (_super) {
    __extends(CurrentDatasetChangedHandler, _super);
    function CurrentDatasetChangedHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CurrentDatasetChangedHandler;
}(_tuval_core__WEBPACK_IMPORTED_MODULE_0__.Delegate));

var StateService = /** @class */ (function () {
    function StateService() {
    }
    StateService.SetStateVariable = function (key, value) {
        this.stateBag[key] = value;
    };
    StateService.GetStateVariable = function (key) {
        return this.stateBag[key];
    };
    StateService.GetAndDeleteStateVariable = function (key) {
        var value = this.stateBag[key];
        delete this.stateBag[key];
        return value;
    };
    StateService.SetCurrentProject = function (projectId) {
        if (StateService.CurrentProjectId !== projectId) {
            StateService.CurrentProjectId = projectId;
            StateService.CurrentProjectChanged(new CurrentProjectChangedArgs(projectId));
        }
    };
    StateService.SetCurrentDataset = function (projectId, datasetId) {
        if (StateService.CurrentDatasetId !== datasetId) {
            StateService.SetCurrentProject(projectId);
            StateService.CurrentDatasetId = datasetId;
            StateService.CurrentDatasetChanged(new CurrentDatasetChangedArgs(projectId, datasetId));
        }
    };
    StateService.GetCurrentProject = function () {
        return StateService.CurrentProjectId;
    };
    StateService.GetCurrentDataset = function () {
        return StateService.CurrentDatasetId;
    };
    /*  public static SetCurrentActivityInfo(data: any): void {
         StateService.CurrentActivityOverview = data;
     } */
    StateService.GetCurrentActivityInfo = function () {
        return new Promise(function (resolve, reject) {
            if (StateService.CurrentActivityOverview != null) {
                resolve(StateService.CurrentActivityOverview);
            }
            else {
                var log_id = StateService.CurrentDatasetId;
                _BrokerClients_MiningBrokerClient__WEBPACK_IMPORTED_MODULE_1__.MiningBrokerClient.GetActivityOverview(log_id).then(function (data) {
                    StateService.CurrentActivityOverview = data;
                    resolve(data);
                });
            }
        });
    };
    StateService.SetSessionId = function (value) {
        this.SetStateVariable('session_id', value);
    };
    StateService.GetSessionId = function () {
        return this.GetStateVariable('session_id');
    };
    StateService.CurrentProjectChanged = new _tuval_core__WEBPACK_IMPORTED_MODULE_0__.Event();
    StateService.CurrentDatasetChanged = new _tuval_core__WEBPACK_IMPORTED_MODULE_0__.Event();
    StateService.stateBag = {};
    return StateService;
}());



/***/ }),

/***/ "./src/UI/Animations/ListBounce.ts":
/*!*****************************************!*\
  !*** ./src/UI/Animations/ListBounce.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListBounceAnimation": () => (/* binding */ ListBounceAnimation)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ListBounce = /** @class */ (function (_super) {
    __extends(ListBounce, _super);
    function ListBounce() {
        var _this = _super.call(this, 'list-bounce') || this;
        var keyFrame1 = new _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.KeyFrame('from');
        keyFrame1.style.Transform = 'translate(0px, 20px)';
        keyFrame1.style.Opacity = '0';
        _this.Add(keyFrame1);
        var keyFrame2 = new _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.KeyFrame('to');
        keyFrame2.style.Transform = 'translate(0px, 0px)';
        keyFrame2.style.Opacity = '1';
        _this.Add(keyFrame2);
        return _this;
    }
    return ListBounce;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.KeyFrameCollection));
var ListBounceAnimation = new ListBounce();


/***/ }),

/***/ "./src/UI/Controls/DashboardView/DashboardView.ts":
/*!********************************************************!*\
  !*** ./src/UI/Controls/DashboardView/DashboardView.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardView": () => (/* binding */ DashboardView)
/* harmony export */ });
/* harmony import */ var _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/components/diagram */ "@tuval/components/diagram");
/* harmony import */ var _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_cg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/cg */ "@tuval/cg");
/* harmony import */ var _tuval_cg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_cg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _manifest_types___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../__manifest__/__types__ */ "./src/__manifest__/__types__.ts");
/* harmony import */ var _Shapes_TdiActivityMeanDurationChart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shapes/TdiActivityMeanDurationChart */ "./src/UI/Controls/DashboardView/Shapes/TdiActivityMeanDurationChart.ts");
/* harmony import */ var _Shapes_TdiActivityMedianDurationChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Shapes/TdiActivityMedianDurationChart */ "./src/UI/Controls/DashboardView/Shapes/TdiActivityMedianDurationChart.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var sayac = 0;
var DashboardView = /** @class */ (function (_super) {
    __extends(DashboardView, _super);
    function DashboardView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardView.prototype.DoExternalDrop = function (evt) {
        debugger;
        var data = evt.Data;
        var type = data.GetData('Type');
        var screenPnt = new _tuval_cg__WEBPACK_IMPORTED_MODULE_1__.CGPoint(evt.X, evt.Y);
        this.startTransaction();
        this.Selection.Clear();
        if (type instanceof _tuval_core__WEBPACK_IMPORTED_MODULE_2__.Type) {
            if (type === (0,_tuval_core__WEBPACK_IMPORTED_MODULE_2__.typeOf)(_tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__.Types.TuText)) {
                var rect = _tuval_core__WEBPACK_IMPORTED_MODULE_2__.Activator.CreateInstance(type);
                rect.Text = 'Text';
                //rect.Brush = Brushes.BlueViolet;
                rect.Width = 200;
                rect.Height = 200;
                rect.Wrapping = true;
                rect.BackgroundColor = _tuval_cg__WEBPACK_IMPORTED_MODULE_1__.CGColor.Cornsilk;
                rect.Multiline = true;
                // rect.AutoResizes = true;
                rect.TransparentBackground = false;
                rect.Alignment = _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__.Middle;
                rect.WrappingWidth = 300;
                rect.Bordered = true;
                rect.Resizable = true;
                rect.FontSize = 20;
                this.Selection.HotSpot = new _tuval_cg__WEBPACK_IMPORTED_MODULE_1__.CGSize(25, 20);
                //const newobj = this.Document.addCopy(rect, screenPnt);
                this.Document.Add(rect);
                this.Selection.Add(rect);
            }
            else if (type === (0,_tuval_core__WEBPACK_IMPORTED_MODULE_2__.typeOf)(_manifest_types___WEBPACK_IMPORTED_MODULE_3__._Types.TdiActivityMeanDurationChart)) {
                var rect = new _Shapes_TdiActivityMeanDurationChart__WEBPACK_IMPORTED_MODULE_4__.TdiActivityMeanDurationChart(); //Activator.CreateInstance(type);
                rect.SetDataSet(this.pId, this.dId);
                //rect.Brush = Brushes.BlueViolet;
                rect.Left = -1000;
                rect.Width = 400;
                rect.Height = 250;
                this.Selection.HotSpot = new _tuval_cg__WEBPACK_IMPORTED_MODULE_1__.CGSize(100, 100);
                //const newobj = this.Document.addCopy(rect, screenPnt);
                this.Document.Add(rect);
                this.Selection.Add(rect);
            }
            else if (type === (0,_tuval_core__WEBPACK_IMPORTED_MODULE_2__.typeOf)(_manifest_types___WEBPACK_IMPORTED_MODULE_3__._Types.TdiActivityMedianDurationChart)) {
                var rect = new _Shapes_TdiActivityMedianDurationChart__WEBPACK_IMPORTED_MODULE_5__.TdiActivityMedianDurationChart(); //Activator.CreateInstance(type);
                rect.SetDataSet(this.pId, this.dId);
                //rect.Brush = Brushes.BlueViolet;
                rect.Left = -1000;
                rect.Width = 400;
                rect.Height = 250;
                this.Selection.HotSpot = new _tuval_cg__WEBPACK_IMPORTED_MODULE_1__.CGSize(100, 100);
                //const newobj = this.Document.addCopy(rect, screenPnt);
                this.Document.Add(rect);
                this.Selection.Add(rect);
            }
            else if (type === (0,_tuval_core__WEBPACK_IMPORTED_MODULE_2__.typeOf)(_manifest_types___WEBPACK_IMPORTED_MODULE_3__._Types.TdiFregProcessExplorerShape)) {
                /* const rect: TuObject = new TdiFregProcessExplorerShape();


                rect.Left = -1000;
                rect.Width = 400;
                rect.Height = 250;

                this.Selection.HotSpot = new CGSize(100, 100);


                this.Document.Add(rect);
                this.Selection.Add(rect); */
            }
        }
        else {
            var rect = new type(); //Activator.CreateInstance(type);
            //rect.Brush = Brushes.BlueViolet;
            rect.Left = -1000;
            this.Selection.HotSpot = new _tuval_cg__WEBPACK_IMPORTED_MODULE_1__.CGSize(100, 100);
            //const newobj = this.Document.addCopy(rect, screenPnt);
            this.Document.Add(rect);
            this.Selection.Add(rect);
        }
        this.finishTransaction("Insert from TreeView");
        return this.Selection;
    };
    return DashboardView;
}(_tuval_components_diagram__WEBPACK_IMPORTED_MODULE_0__.TuView));



/***/ }),

/***/ "./src/UI/Controls/DashboardView/Shapes/TdiActivityMeanDurationChart.ts":
/*!******************************************************************************!*\
  !*** ./src/UI/Controls/DashboardView/Shapes/TdiActivityMeanDurationChart.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TdiActivityMeanDurationChart": () => (/* binding */ TdiActivityMeanDurationChart)
/* harmony export */ });
/* harmony import */ var _TuDashboardShape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TuDashboardShape */ "./src/UI/Controls/DashboardView/TuDashboardShape.tsx");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _manifest_types___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../__manifest__/__types__ */ "./src/__manifest__/__types__.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TdiActivityMeanDurationChart = /** @class */ (function (_super) {
    __extends(TdiActivityMeanDurationChart, _super);
    function TdiActivityMeanDurationChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TdiActivityMeanDurationChart.prototype.TdiActivityMeanDurationChart = function () {
    };
    TdiActivityMeanDurationChart.prototype.GetControl = function () {
        /*  const chart = new MeanChart();
         chart.Height = -90; //%
         chart.Title = 'Activity Mean Duration';
         return chart; */
        return null;
    };
    TdiActivityMeanDurationChart = __decorate([
        (0,_tuval_core__WEBPACK_IMPORTED_MODULE_1__.ClassInfo)({
            fullName: _manifest_types___WEBPACK_IMPORTED_MODULE_2__._Types.TdiActivityMeanDurationChart,
            name: 'TdiActivityMeanDurationChart',
            instanceof: [_manifest_types___WEBPACK_IMPORTED_MODULE_2__._Types.TdiActivityMeanDurationChart]
        })
    ], TdiActivityMeanDurationChart);
    return TdiActivityMeanDurationChart;
}(_TuDashboardShape__WEBPACK_IMPORTED_MODULE_0__.TuDashboardShape));



/***/ }),

/***/ "./src/UI/Controls/DashboardView/Shapes/TdiActivityMedianDurationChart.ts":
/*!********************************************************************************!*\
  !*** ./src/UI/Controls/DashboardView/Shapes/TdiActivityMedianDurationChart.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TdiActivityMedianDurationChart": () => (/* binding */ TdiActivityMedianDurationChart)
/* harmony export */ });
/* harmony import */ var _TuDashboardShape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TuDashboardShape */ "./src/UI/Controls/DashboardView/TuDashboardShape.tsx");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _manifest_types___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../__manifest__/__types__ */ "./src/__manifest__/__types__.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TdiActivityMedianDurationChart = /** @class */ (function (_super) {
    __extends(TdiActivityMedianDurationChart, _super);
    function TdiActivityMedianDurationChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TdiActivityMedianDurationChart.prototype.TdiActivityMedianDurationChart = function () {
    };
    TdiActivityMedianDurationChart.prototype.GetControl = function () {
        /*   const chart = new MedianChart();
          chart.Height = -90; //%
          chart.Title = 'Activity Median Duration';
          return chart; */
        return null;
    };
    TdiActivityMedianDurationChart = __decorate([
        (0,_tuval_core__WEBPACK_IMPORTED_MODULE_1__.ClassInfo)({
            fullName: _manifest_types___WEBPACK_IMPORTED_MODULE_2__._Types.TdiActivityMedianDurationChart,
            name: 'TdiActivityMeanDurationChart',
            instanceof: [_manifest_types___WEBPACK_IMPORTED_MODULE_2__._Types.TdiActivityMedianDurationChart]
        })
    ], TdiActivityMedianDurationChart);
    return TdiActivityMedianDurationChart;
}(_TuDashboardShape__WEBPACK_IMPORTED_MODULE_0__.TuDashboardShape));



/***/ }),

/***/ "./src/UI/Controls/DashboardView/TuDashboardShape.tsx":
/*!************************************************************!*\
  !*** ./src/UI/Controls/DashboardView/TuDashboardShape.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TuDashboardShape": () => (/* binding */ TuDashboardShape)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_cg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/cg */ "@tuval/cg");
/* harmony import */ var _tuval_cg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_cg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tuval/components/diagram */ "@tuval/components/diagram");
/* harmony import */ var _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tuval_components_diagram__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _manifest_types___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../__manifest__/__types__ */ "./src/__manifest__/__types__.ts");
/* harmony import */ var _TuDashboardShapeHtmlRenderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TuDashboardShapeHtmlRenderer */ "./src/UI/Controls/DashboardView/TuDashboardShapeHtmlRenderer.tsx");
/* harmony import */ var _BrokerClients_MiningBrokerClient__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../BrokerClients/MiningBrokerClient */ "./src/BrokerClients/MiningBrokerClient.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var SettingsDialog = /** @class */ (function (_super) {
    __extends(SettingsDialog, _super);
    function SettingsDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SettingsDialog.prototype.SettingsDialog = function () {
        this.Width = 200;
        this.Height = 200;
    };
    return SettingsDialog;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Dialog));
var TuDashboardShape = /** @class */ (function (_super) {
    __extends(TuDashboardShape, _super);
    function TuDashboardShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TuDashboardShape.prototype.TuDashboardShape = function () {
        var _this = this;
        this._updated = 1;
        this.dropTarget = new _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.DropArea();
        this.dropTarget.Text = '';
        //   this.dropTarget.Controls.Add(this.GetPreviewControl());
        this.dropTarget.Drop.add((function (e) {
            debugger;
            var _a = e.nativeEvent.dataTransfer.getData('text').split(';'), projectId = _a[0], datasetId = _a[1];
            if (!_tuval_core__WEBPACK_IMPORTED_MODULE_2__.is.nullOrEmpty(projectId) && !_tuval_core__WEBPACK_IMPORTED_MODULE_2__.is.nullOrEmpty(datasetId)) {
                _this.SetDataSet(projectId, datasetId);
            }
        }));
        this.dialog = new SettingsDialog();
        this.BrushColor = _tuval_cg__WEBPACK_IMPORTED_MODULE_1__.CGColor.White;
        this.Control = this.GetControl();
        this.HtmlRenderer = new _TuDashboardShapeHtmlRenderer__WEBPACK_IMPORTED_MODULE_5__._TuDashboardShapeHtmlRenderer();
    };
    /*    public CreateElements(param: any) {
          const view: TuView = param;
          const result = [];
          if (view.RenderingMode === ViewRenderingMode.Html) {
              TuDashboardShapeHtmlRenderer.Apply(result, this);
          }
          return result;
      } */
    TuDashboardShape.prototype.SetDataSet = function (projectId, datasetId) {
        var _this = this;
        debugger;
        var log_id = datasetId;
        _BrokerClients_MiningBrokerClient__WEBPACK_IMPORTED_MODULE_6__.MiningBrokerClient.GetActivityOverview(log_id).then(function (data) {
            _this.Control.SetChartData(data);
            _this.renderedNode = _this.Control.CreateMainElement();
        });
    };
    TuDashboardShape.prototype.OnBoundsChanged = function (old) {
        if (this.Width !== old.Width || this.Height !== old.Height) {
            console.log('New width: ', this.Width, ' Old Width : ', old.Width);
            console.log('New X: ', this.Left, ' Old C : ', old.X);
            this.Control.Width = this.Width - 40;
            this.Control.Height = this.Height - 40;
            this.dropTarget.Height = this.Height - 50;
            // setTimeout(()=> this.button.Refresh(), 100);
        }
    };
    TuDashboardShape.prototype.OnDoubleClick = function (evt, view) {
        this.dialog.ShowDialog();
        //view.Selection.Clear();
        //alert('double click');
        return false;
    };
    TuDashboardShape.prototype.GetControl = function () {
        /*    const chart = new MeanChart();
           chart.Height = -90; //%
           chart.Title = 'Activity Mean Duration';
           return chart; */
        return null;
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], TuDashboardShape.prototype, "Control", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], TuDashboardShape.prototype, "renderedNode", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], TuDashboardShape.prototype, "dialog", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], TuDashboardShape.prototype, "dropTarget", void 0);
    __decorate([
        _tuval_forms__WEBPACK_IMPORTED_MODULE_0__._State
    ], TuDashboardShape.prototype, "_test", void 0);
    __decorate([
        _tuval_forms__WEBPACK_IMPORTED_MODULE_0__._State
    ], TuDashboardShape.prototype, "_projectId", void 0);
    __decorate([
        _tuval_forms__WEBPACK_IMPORTED_MODULE_0__._State
    ], TuDashboardShape.prototype, "_datasetId", void 0);
    __decorate([
        _tuval_forms__WEBPACK_IMPORTED_MODULE_0__._State
    ], TuDashboardShape.prototype, "_updated", void 0);
    TuDashboardShape = __decorate([
        (0,_tuval_core__WEBPACK_IMPORTED_MODULE_2__.ClassInfo)({
            fullName: _manifest_types___WEBPACK_IMPORTED_MODULE_4__._Types.TuDashboardShape,
            name: 'TuObject',
            instanceof: [_manifest_types___WEBPACK_IMPORTED_MODULE_4__._Types.TuDashboardShape]
        })
    ], TuDashboardShape);
    return TuDashboardShape;
}(_tuval_components_diagram__WEBPACK_IMPORTED_MODULE_3__.TuRectangle));



/***/ }),

/***/ "./src/UI/Controls/DashboardView/TuDashboardShapeHtmlRenderer.tsx":
/*!************************************************************************!*\
  !*** ./src/UI/Controls/DashboardView/TuDashboardShapeHtmlRenderer.tsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_TuDashboardShapeHtmlRenderer": () => (/* binding */ _TuDashboardShapeHtmlRenderer),
/* harmony export */   "TuDashboardShapeHtmlRenderer": () => (/* binding */ TuDashboardShapeHtmlRenderer)
/* harmony export */ });
/* harmony import */ var _tuval_graphics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/graphics */ "@tuval/graphics");
/* harmony import */ var _tuval_graphics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_graphics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tuval/components/diagram */ "@tuval/components/diagram");
/* harmony import */ var _tuval_components_diagram__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tuval_components_diagram__WEBPACK_IMPORTED_MODULE_2__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var _TuDashboardShapeHtmlRenderer = /** @class */ (function (_super) {
    __extends(_TuDashboardShapeHtmlRenderer, _super);
    function _TuDashboardShapeHtmlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _TuDashboardShapeHtmlRenderer.prototype.GenerateElement = function (view, obj) {
        this.WriteStartElement('TuDashboardShape');
        return true;
    };
    _TuDashboardShapeHtmlRenderer.prototype.GenerateAttributes = function (view, obj) {
    };
    _TuDashboardShapeHtmlRenderer.prototype.GenerateBody = function (view, rectangleObject) {
        var bounds = rectangleObject.Bounds;
        var fillColor = 'transparent';
        if (rectangleObject.Brush != null) {
            var brush = (0,_tuval_core__WEBPACK_IMPORTED_MODULE_1__.as)(rectangleObject.Brush, _tuval_graphics__WEBPACK_IMPORTED_MODULE_0__.GraphicTypes.SolidBrush);
            if (brush != null) {
                fillColor = brush.Color.toString('#rrggbb');
            }
        }
        var pen = rectangleObject.Pen;
        var strokeColor = 'transparent';
        var strokeWidth = 0;
        if (rectangleObject.Pen != null) {
            strokeColor = pen.Color.toString('#rrggbb');
            strokeWidth = pen.Width;
        }
        this.WriteStartElement('div');
        var style = {};
        this.WriteStyleAttrVal('position', 'absolute');
        this.WriteStyleAttrVal('left', bounds.X + 'px');
        this.WriteStyleAttrVal('top', bounds.Y + 'px');
        this.WriteStyleAttrVal('width', bounds.Width + 'px');
        this.WriteStyleAttrVal('height', bounds.Height + 'px');
        this.WriteStyleAttrVal('padding', '20px');
        this.WriteStyleAttrVal('backgroundColor', fillColor);
        /*   style['borderColor'] = strokeColor;
          style['borderWidth'] = strokeWidth;
          style['borderStyle'] = 'solid'; */
        this.WriteStyleAttrVal('overflow', 'hidden');
        this.WriteStyleAttrVal('box-shadow', 'rgb(0 0 0 / 12%) 0px 1px 1px, rgb(0 0 0 / 12%) 0px 2px 2px, rgb(0 0 0 / 12%) 0px 4px 4px, rgb(0 0 0 / 12%) 0px 8px 8px, rgb(0 0 0 / 12%) 0px 16px 16px');
        this.WriteStyleAttrVal('border-radius', '20px');
        this.WriteStyleAttrVal('outline', 'none medium');
        //style['box-shadow'] = '0 0 6px #8dc4ff!important';
        this.WriteStyleAttrVal('border', '1px solid #3c9df7!important');
        /*  this.WriteComponent(
             <div style={{ display: 'block', textAlign: 'center' }}>
                 <i style={{ display: 'inline-block' }} class="icon-list-palette-line-chart rotate-270 placeholder-icon"></i>
                 <div style={{ fontSize: '20px', lineHeight: '20px', color: '#666', marginTop: '20px' }}>Activity Mean Chart</div>
                 <div style={{ fontSize: '14px', color: '#888' }}>You have no data yet</div>
             </div>
         ); */
        /*     this.WriteStartElement('i');
            this.WriteStyleAttrVal('display', 'inline-block');
            this.WriteAttrVal('class', 'icon-list-palette-line-chart rotate-270 placeholder-icon');
            this.WriteEndElement(); */
        if (rectangleObject.renderedNode == null) {
            this.writeDropTarget(rectangleObject);
        }
        else {
            this.WriteComponent(rectangleObject.renderedNode);
            this.writeMask(rectangleObject.Bounds);
        }
        this.WriteEndElement();
    };
    _TuDashboardShapeHtmlRenderer.prototype.writeDropTarget = function (rectangleObject) {
        this.WriteControl(rectangleObject.dropTarget);
    };
    _TuDashboardShapeHtmlRenderer.prototype.writeMask = function (bounds) {
        this.WriteStartElement('div');
        this.WriteStyleAttrVal('position', 'absolute');
        this.WriteStyleAttrVal('left', '0px');
        this.WriteStyleAttrVal('top', '0px');
        this.WriteStyleAttrVal('width', bounds.Width + 'px');
        this.WriteStyleAttrVal('height', bounds.Height + 'px');
        this.WriteStyleAttrVal('backgroundColor', 'transparent');
        this.WriteStyleAttrVal('borderColor', 'transparent');
        this.WriteStyleAttrVal('borderWidth', 0);
        this.WriteEndElement();
    };
    _TuDashboardShapeHtmlRenderer.prototype.GenerateElementFinish = function (view, obj) {
        this.WriteEndElement();
    };
    _TuDashboardShapeHtmlRenderer.prototype.DecideCache = function (view, obj) {
    };
    return _TuDashboardShapeHtmlRenderer;
}(_tuval_components_diagram__WEBPACK_IMPORTED_MODULE_2__.TuHtmlRenderer));

var TuDashboardShapeHtmlRenderer = /** @class */ (function () {
    function TuDashboardShapeHtmlRenderer() {
    }
    TuDashboardShapeHtmlRenderer.Apply = function (result, rectangleObject) {
        var bounds = rectangleObject.Bounds;
        var fillColor = 'transparent';
        if (rectangleObject.Brush != null) {
            var brush = (0,_tuval_core__WEBPACK_IMPORTED_MODULE_1__.as)(rectangleObject.Brush, _tuval_graphics__WEBPACK_IMPORTED_MODULE_0__.GraphicTypes.SolidBrush);
            if (brush != null) {
                fillColor = brush.Color.toString('#rrggbb');
            }
        }
        var pen = rectangleObject.Pen;
        var strokeColor = 'transparent';
        var strokeWidth = 0;
        if (rectangleObject.Pen != null) {
            strokeColor = pen.Color.toString('#rrggbb');
            strokeWidth = pen.Width;
        }
        var style = {};
        style['position'] = 'absolute';
        style['left'] = bounds.X + 'px';
        style['top'] = bounds.Y + 'px';
        style['width'] = bounds.Width + 'px';
        style['height'] = bounds.Height + 'px';
        style['padding'] = '20px';
        style['backgroundColor'] = fillColor;
        /*   style['borderColor'] = strokeColor;
          style['borderWidth'] = strokeWidth;
          style['borderStyle'] = 'solid'; */
        style['overflow'] = 'hidden';
        style['box-shadow'] = 'rgb(0 0 0 / 12%) 0px 1px 1px, rgb(0 0 0 / 12%) 0px 2px 2px, rgb(0 0 0 / 12%) 0px 4px 4px, rgb(0 0 0 / 12%) 0px 8px 8px, rgb(0 0 0 / 12%) 0px 16px 16px';
        style['border-radius'] = '20px';
        style['outline'] = 'none medium';
        //style['box-shadow'] = '0 0 6px #8dc4ff!important';
        style['border'] = '1px solid #3c9df7!important';
        var styleMask = {};
        styleMask['position'] = 'absolute';
        styleMask['left'] = '0px';
        styleMask['top'] = '0px';
        styleMask['width'] = bounds.Width + 'px';
        styleMask['height'] = bounds.Height + 'px';
        styleMask['backgroundColor'] = 'transparent';
        styleMask['borderColor'] = 'transparent';
        styleMask['borderWidth'] = 0;
        /*   result.push(<div style={style}>
              {rectangleObject.renderedNode}
              <div style={styleMask}></div>
          </div>) */
    };
    return TuDashboardShapeHtmlRenderer;
}());



/***/ }),

/***/ "./src/UI/Controls/EventsOverTimeChart/EventsOverTimeChart.ts":
/*!********************************************************************!*\
  !*** ./src/UI/Controls/EventsOverTimeChart/EventsOverTimeChart.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventsOverTimeChart": () => (/* binding */ EventsOverTimeChart)
/* harmony export */ });
/* harmony import */ var _tuval_components_charts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/components/charts */ "@tuval/components/charts");
/* harmony import */ var _tuval_components_charts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_components_charts__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var isInteger = Number.isInteger || function (value) {
    return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
};
var colors = ['#357CD2', '#548CD1'];
var EventsOverTimeChart = /** @class */ (function (_super) {
    __extends(EventsOverTimeChart, _super);
    function EventsOverTimeChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventsOverTimeChart.prototype.InitComponents = function () {
        this.Appearance.Width = '98%';
        this.Appearance.Height = '95%';
        this.CreateFrameElement = false;
        this.Appearance.Background = 'transparent';
        this.PrimaryXAxis = {
            /*  title: 'Timeline', */
            titleStyle: {
                fontFamily: 'Ubuntu',
                size: '14px',
                color: '#333'
            },
            valueType: 'Category',
            visible: true,
            labelStyle: { color: 'transparent' },
            majorGridLines: { width: 1 },
            majorTickLines: { width: 0 },
            stripLines: [{
                    startFromAxis: true,
                    size: 5,
                    sizeType: 'Years',
                    isRepeat: true,
                    repeatEvery: 10,
                    visible: true,
                    color: 'rgba(167,169,171, 0.1)'
                }]
        };
        this.PrimaryYAxis = {
            /*  title: 'Events', */
            titleStyle: {
                fontFamily: 'Proxima Nova',
                size: '14px',
                color: '#333'
            },
            majorGridLines: { width: 1 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 1 },
            labelStyle: { color: 'transparent' },
        };
        this.TooltipRender.add(function (args) {
            /*  if (args.series.name === 'Count') {
                 args.text = `${args.data.pointX}<br>Frequency: ${args.data.pointY}`;
             } else {
                 args.text = `Cumulative: ${args.data.pointY}%`;
             } */
            args.text = moment(args.data.pointX / 1000000).format();
            args.headerText = '';
            args.textStyle = {
                fontFamily: 'Ubuntu',
                size: '14px'
            };
        });
        this.PointRender.add(function (args) {
            args.fill = colors[0];
        });
    };
    EventsOverTimeChart.prototype.SetChartData = function (chartData) {
        // chartData = sort(chartData, ['median'], true);
        var data = [];
        for (var key in chartData) {
            data.push({
                x: key,
                y: chartData[key],
            });
        }
        this.Series = [
            {
                type: 'Column',
                dataSource: data /* sort(data, ['y'], true) */,
                fill: colors[0],
                name: 'Median',
                xName: 'x',
                yName: 'y',
                opacity: 0.5,
                animation: {
                    enable: true
                }
            },
        ];
    };
    return EventsOverTimeChart;
}(_tuval_components_charts__WEBPACK_IMPORTED_MODULE_0__.TvChart));



/***/ }),

/***/ "./src/UI/Dialogs/BlankProjectDialog.tsx":
/*!***********************************************!*\
  !*** ./src/UI/Dialogs/BlankProjectDialog.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlankProjectDialog": () => (/* binding */ BlankProjectDialog)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.DomHandler.addCssToDocument("\n    .tvl-control-MyButton {\n            display: inline-block;\n            margin-right: 8px\n        }\n\n    .tvl-control-MyButton button {\n        position: relative;\n        text-align: center;\n        border-radius: 6px;\n        padding: 7px 20px 8px;\n        font-family: LatoMedium, sans-serif;\n        display: inline-block;\n        box-sizing: border-box;\n        cursor: pointer;\n        outline: 0;\n        border-width: 1px;\n        border-style: solid;\n        margin-right: 0!important\n    }\n\n    .tvl-control-MyButton:disabled {\n        cursor: not-allowed;\n        opacity: 1;\n        pointer-events: none\n    }\n\n    .tvl-control-MyButton .lyteDefaultBtn {\n        padding: 6px 20px 7px;\n        box-shadow: 0 -1px 0 0 #d0d4df inset;\n        min-width: 31px;\n        background: linear-gradient(#fcfdff 0, #eaeef5 100%) no-repeat padding-box;\n        color: #222833;\n        border: 1px solid #d0d4df\n    }\n\n    .tvl-control-MyButton .lyteDefaultBtn:hover {\n        background: linear-gradient(#fcfdff 0, #dee5f1 100%) no-repeat padding-box;\n        border: 1px solid #d0d4df\n    }\n\n    .tvl-control-MyButton .lytePrimaryBtn {\n        box-shadow: 0 -2px 0 0 #0061ca inset;\n        min-width: 31px;\n        width: auto;\n        text-decoration: none;\n        text-align: center;\n        appearance: none;\n        background: linear-gradient(to top, #0279ff, #00a3f3) no-repeat padding-box;\n        color: #fff;\n        border: 0\n    }\n\n    .tvl-control-MyButton .lytePrimaryBtn:hover {\n        box-shadow: 0 -2px 0 0 #0159b9 inset;\n        background: linear-gradient(#02acff 0, #006be4 100%) no-repeat padding-box;\n        color: #fff;\n        border: 0\n    }\n\n");
var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["Primary"] = 0] = "Primary";
    ButtonType[ButtonType["Default"] = 1] = "Default";
})(ButtonType || (ButtonType = {}));
var MyButton = /** @class */ (function (_super) {
    __extends(MyButton, _super);
    function MyButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MyButton.prototype, "ButtonType", {
        get: function () {
            return this.myButtonType;
        },
        set: function (value) {
            this.myButtonType = value;
        },
        enumerable: false,
        configurable: true
    });
    MyButton.prototype.SetupControlDefaults = function () {
        _super.prototype.SetupControlDefaults.call(this);
        this.myButtonType = ButtonType.Default;
    };
    MyButton.prototype.GetRenderer = function () {
        var Test = /** @class */ (function (_super) {
            __extends(Test, _super);
            function Test() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Test.prototype.GenerateBody = function (obj) {
                var className = (0,_tuval_core__WEBPACK_IMPORTED_MODULE_1__.classNames)('lyte-button', {
                    'lytePrimaryBtn': obj.ButtonType === ButtonType.Primary,
                    'lyteDefaultBtn': obj.ButtonType === ButtonType.Default,
                });
                this.WriteComponent(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Teact.createElement("button", { type: "button", class: className, onClick: function () { return obj.Clicked(); } }, obj.Text));
            };
            return Test;
        }(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ControlHtmlRenderer));
        ;
        return Test;
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Property)()
    ], MyButton.prototype, "myButtonType", void 0);
    return MyButton;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Button));
var BlankProjectDialog = /** @class */ (function (_super) {
    __extends(BlankProjectDialog, _super);
    function BlankProjectDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.OKButtonClick = new _tuval_core__WEBPACK_IMPORTED_MODULE_1__.Event();
        return _this;
    }
    BlankProjectDialog.prototype.InitComponents = function () {
        var _this = this;
        this.Text = 'New Project';
        this.Width = 300;
        this.Height = 300;
        var formLayout = new _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.FormLayout();
        this.txtName = new _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TTextBox();
        this.txtName.Label = 'Name';
        this.txtName.Autofocus = true;
        this.txtName.KeyDown.add(function (e) {
            if (e.keyCode === 13) {
                _this.OKButtonClick();
                _this.Hide();
            }
        });
        formLayout.Controls.Add(this.txtName);
        this.Controls.Add(formLayout);
        var panel = new _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Panel();
        var txtSurname = new _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TTextBox();
        txtSurname.Text = 'Test';
        panel.Controls.Add(txtSurname);
        //this.Controls.Add(panel);
        var btnOK = new MyButton();
        btnOK.ButtonType = ButtonType.Primary;
        btnOK.Text = 'OK';
        btnOK.Color = 2;
        btnOK.Clicked = (function () {
            _this.OKButtonClick();
            _this.Hide();
        });
        var btnCancel = new MyButton();
        btnCancel.Text = 'Cancel';
        btnCancel.Color = 1;
        btnCancel.Clicked = (function () {
            _this.Hide();
        });
        this.FooterControls.AddRange([btnOK, btnCancel]);
    };
    return BlankProjectDialog;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Dialog));



/***/ }),

/***/ "./src/UI/Dialogs/NewProjectDialog.ts":
/*!********************************************!*\
  !*** ./src/UI/Dialogs/NewProjectDialog.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewProjectDialog": () => (/* binding */ NewProjectDialog)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NewProjectListView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewProjectListView */ "./src/UI/Dialogs/NewProjectListView.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var NewProjectDialog = /** @class */ (function (_super) {
    __extends(NewProjectDialog, _super);
    function NewProjectDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.OKButtonClick = new _tuval_core__WEBPACK_IMPORTED_MODULE_1__.Event();
        return _this;
    }
    NewProjectDialog.prototype.InitComponents = function () {
        var _this = this;
        this.Text = 'Select New Project Provider';
        this.Width = 800;
        this.Height = 600;
        this.processProviderListView = new _NewProjectListView__WEBPACK_IMPORTED_MODULE_2__.NewProjectListView();
        this.processProviderListView.ProcessSelected.add(function (processInfo) {
            _this.ShowDialogAsyncResolve(processInfo);
            _this.OKButtonClick(processInfo);
            _this.Hide();
        });
        this.Controls.Add(this.processProviderListView);
        var btnOK = new _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Button();
        btnOK.Text = 'OK';
        btnOK.Color = 2;
        btnOK.Clicked = (function () {
        });
        var btnCancel = new _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Button();
        btnCancel.Text = 'Cancel';
        btnCancel.Color = 1;
        btnCancel.Clicked = (function () {
            _this.Hide();
        });
        this.FooterControls.AddRange([btnOK, btnCancel]);
    };
    return NewProjectDialog;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Dialog));



/***/ }),

/***/ "./src/UI/Dialogs/NewProjectListView.tsx":
/*!***********************************************!*\
  !*** ./src/UI/Dialogs/NewProjectListView.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewProjectListView": () => (/* binding */ NewProjectListView)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tuval_brokers_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tuval/brokers/client */ "./node_modules/@tuval/brokers/client/index.js");
/* harmony import */ var _tuval_brokers_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tuval_brokers_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BlankProjectDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlankProjectDialog */ "./src/UI/Dialogs/BlankProjectDialog.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// DomHandler.addCssToDocument(require('./ConnectionListView.css'));
var NewProjectListView = /** @class */ (function (_super) {
    __extends(NewProjectListView, _super);
    function NewProjectListView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewProjectListView.prototype.SetupControlDefaults = function () {
        _super.prototype.SetupControlDefaults.call(this);
        this.ProcessSelected = new _tuval_core__WEBPACK_IMPORTED_MODULE_1__.Event();
        NewProjectListView.SymbolBroker = new _tuval_brokers_client__WEBPACK_IMPORTED_MODULE_2__.SymbolBroker();
        this.Providers = _tuval_core__WEBPACK_IMPORTED_MODULE_1__.instance.resolveAll('IProcessProvider');
        this.blankProjectDialog = new _BlankProjectDialog__WEBPACK_IMPORTED_MODULE_3__.BlankProjectDialog();
    };
    NewProjectListView.prototype.renderProviders = function () {
        var _this = this;
        return this.Providers.map(function (provider) {
            return (_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Teact.createElement("li", { class: "tile", style: "", ondblclick: function () {
                    provider.ShowConfigDialog(function (processInfo) {
                        _this.ProcessSelected({
                            name: processInfo.name
                        });
                    });
                } },
                _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Teact.createElement("div", { class: "tile-content" },
                    _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Teact.createElement("div", null,
                        _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Teact.createElement("div", { style: 'height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;' },
                            _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Teact.createElement("img", { style: "max-width: 130px;", alt: "Snowflake", src: provider.GetSymbol() })),
                        provider.GetName()))));
        });
    };
    NewProjectListView.prototype.CreateElements = function () {
        var _this = this;
        return (_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Teact.createElement("ul", { class: "datasources-tiles", style: "" },
            _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Teact.createElement("li", { class: "tile", style: "", ondblclick: function () {
                    _this.blankProjectDialog.OKButtonClick.add(function () {
                        _this.ProcessSelected({
                            name: _this.blankProjectDialog.txtName.Text
                        });
                    });
                    _this.blankProjectDialog.ShowDialog();
                } },
                _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Teact.createElement("div", { class: "tile-content" },
                    _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Teact.createElement("div", null,
                        _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Teact.createElement("img", { style: "max-width: 130px;", alt: "Google BigQuery", src: NewProjectListView.SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'google_bigquery') }),
                        "Blank Project"))),
            this.renderProviders()));
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Property)()
    ], NewProjectListView.prototype, "ProcessSelected", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Property)()
    ], NewProjectListView.prototype, "Providers", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Property)()
    ], NewProjectListView.prototype, "blankProjectDialog", void 0);
    return NewProjectListView;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Control));



/***/ }),

/***/ "./src/UI/Dialogs/OpenProjectDialog.ts":
/*!*********************************************!*\
  !*** ./src/UI/Dialogs/OpenProjectDialog.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpenProjectDialog": () => (/* binding */ OpenProjectDialog)
/* harmony export */ });
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _OpenProjectDialogController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OpenProjectDialogController */ "./src/UI/Dialogs/OpenProjectDialogController.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var OpenProjectDialog = /** @class */ (function (_super) {
    __extends(OpenProjectDialog, _super);
    function OpenProjectDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.OkButtonClicked = new _tuval_core__WEBPACK_IMPORTED_MODULE_0__.Event();
        return _this;
    }
    OpenProjectDialog.prototype.InitComponents = function () {
        this.Text = 'Open Project';
        this.Width = 600;
        this.Height = 530;
        this.openProjectDialogController = new _OpenProjectDialogController__WEBPACK_IMPORTED_MODULE_2__.OpenProjectDialogController();
        this.openProjectDialogController.Bind(this);
        this.Controls.Add(this.openProjectDialogController);
        /*   this.projectList = new ListBox();
          this.projectList.Height = 360;
  
          this.Controls.Add(this.projectList);
  
          const btnOK = new Button();
          btnOK.Text = 'OK';
          btnOK.Color = 2;
          btnOK.Clicked = (() => {
              this.OnOKClick();
  
          }) as any;
  
          const btnCancel = new Button();
          btnCancel.Text = 'Cancel';
          btnCancel.Color = 1;
          btnCancel.Clicked = (() => {
              this.Hide();
          }) as any;
          this.FooterControls.AddRange([btnOK, btnCancel]); */
    };
    OpenProjectDialog.prototype.OnShown = function () {
        this.openProjectDialogController.LoadProjects();
    };
    OpenProjectDialog.prototype.OnOKClick = function () {
        this.ShowDialogAsyncResolve(this.projectList.SelectedItem.Tag);
        this.OkButtonClicked(this.projectList.SelectedItem.Text);
        this.Hide();
    };
    return OpenProjectDialog;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.Dialog));



/***/ }),

/***/ "./src/UI/Dialogs/OpenProjectDialogController.ts":
/*!*******************************************************!*\
  !*** ./src/UI/Dialogs/OpenProjectDialogController.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpenProjectDialogController": () => (/* binding */ OpenProjectDialogController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Views_Buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Views/Buttons */ "./src/UI/Views/Buttons.ts");
/* harmony import */ var _Views_ListView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Views/ListView */ "./src/UI/Views/ListView.ts");
/* harmony import */ var _Services_Services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../Services/Services */ "./src/Services/Services.ts");
/* harmony import */ var _Services_StateService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../Services/StateService */ "./src/Services/StateService.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var OpenProjectDialogController = /** @class */ (function (_super) {
    __extends(OpenProjectDialogController, _super);
    function OpenProjectDialogController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OpenProjectDialogController.prototype.InitController = function () {
    };
    OpenProjectDialogController.prototype.LoadProjects = function () {
        var _this = this;
        var session_id = _Services_StateService__WEBPACK_IMPORTED_MODULE_4__.StateService.GetSessionId();
        if (session_id == null) {
            throw 'Invalid session.';
        }
        _Services_Services__WEBPACK_IMPORTED_MODULE_3__.Services.ProjectService.GetProjects(session_id, 'bpmgenesis').then(function (projects) {
            _this.projects = projects;
        });
    };
    OpenProjectDialogController.prototype.OnBindModel = function (model) {
        this.dialog = model;
    };
    OpenProjectDialogController.prototype.OnOK = function () {
        this.dialog.ShowDialogAsyncResolve(this.selectedProject);
        this.dialog.Hide();
    };
    OpenProjectDialogController.prototype.OnCancel = function () {
        this.dialog.Hide();
    };
    OpenProjectDialogController.prototype.LoadView = function () {
        var _this = this;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIScene)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)('\\efd5').size(30).foregroundColor(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '#ddd' : ''), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)('Select Project').font(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Fonts.title).fontFamily('Ubuntu, sans-serif')
            .fontWeight(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '600' : '400').foregroundColor(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '#ddd' : '')).alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading).spacing(10).height(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HDivider)().height(1).background(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '#288ae2' : 'gray'), _Views_ListView__WEBPACK_IMPORTED_MODULE_2__.ListView.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(this.projects, function (project) {
            return (0,_Views_ListView__WEBPACK_IMPORTED_MODULE_2__.ListViewItem)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(project.project_name).foregroundColor(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '#bbb' : ''))
                .minHeight('50px')
                .background(_this.selectedProject === project ? 'rgb(120,120,120,50%)' : { default: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '' : 'white', hover: 'rgb(120,120,120,10%)' })
                .onSelected(function () { return _this.selectedProject = project; });
        })).width('100%').backgroundColor('#2b3641'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cCenter : _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cTrailing })((0,_Views_Buttons__WEBPACK_IMPORTED_MODULE_1__.AcceptButton)('OK').action(function () { return _this.OnOK(); }), (0,_Views_Buttons__WEBPACK_IMPORTED_MODULE_1__.CancelButton)('Cancel').action(function () { return _this.OnCancel(); })).height('50px')).grow())
            .background(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '#212932' : '')
            .padding('10px'));
    };
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], OpenProjectDialogController.prototype, "projects", void 0);
    __decorate([
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.State)()
    ], OpenProjectDialogController.prototype, "selectedProject", void 0);
    return OpenProjectDialogController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/UI/Models/MIProjectItem.ts":
/*!****************************************!*\
  !*** ./src/UI/Models/MIProjectItem.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateMVIProjectItem": () => (/* binding */ CreateMVIProjectItem)
/* harmony export */ });
/* harmony import */ var _Domains_Dataset_Controllers_DatasetController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Domains/Dataset/Controllers/DatasetController */ "./src/Domains/Dataset/Controllers/DatasetController.ts");
/* harmony import */ var _Domains_CustomPage_Controllers_CustomPageController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Domains/CustomPage/Controllers/CustomPageController */ "./src/Domains/CustomPage/Controllers/CustomPageController.ts");


function CreateMVIProjectItem(model) {
    if (model.type === 'Dataset') {
        return {
            project_item_id: model.project_item_id,
            name: model.name,
            type: model.type,
            icon: '\\f050',
            controller: new _Domains_Dataset_Controllers_DatasetController__WEBPACK_IMPORTED_MODULE_0__.DatasetController()
        };
    }
    else if (model.type === 'Dashboard') {
        return {
            project_item_id: model.project_item_id,
            name: model.name,
            type: model.type,
            icon: '\\f0b3',
            controller: new _Domains_CustomPage_Controllers_CustomPageController__WEBPACK_IMPORTED_MODULE_1__.CustomPageController()
        };
    }
    return {};
}


/***/ }),

/***/ "./src/UI/UIServices/ProjectUIService.ts":
/*!***********************************************!*\
  !*** ./src/UI/UIServices/ProjectUIService.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectUIService": () => (/* binding */ ProjectUIService)
/* harmony export */ });
/* harmony import */ var _Dialogs_NewProjectDialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Dialogs/NewProjectDialog */ "./src/UI/Dialogs/NewProjectDialog.ts");
/* harmony import */ var _Dialogs_OpenProjectDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dialogs/OpenProjectDialog */ "./src/UI/Dialogs/OpenProjectDialog.ts");


var ProjectUIService = /** @class */ (function () {
    function ProjectUIService() {
    }
    ProjectUIService.NewProject = function () {
        return new Promise(function (resolve, reject) {
            var npd = new _Dialogs_NewProjectDialog__WEBPACK_IMPORTED_MODULE_0__.NewProjectDialog();
            npd.ShowDialogAsync().then(function (projectInfo) {
                alert(JSON.stringify(projectInfo));
                resolve(projectInfo);
            });
        });
    };
    ProjectUIService.OpenProjectDialog = function () {
        return new Promise(function (resolve, reject) {
            var npd = new _Dialogs_OpenProjectDialog__WEBPACK_IMPORTED_MODULE_1__.OpenProjectDialog();
            npd.ShowDialogAsync().then(function (project) {
                resolve(project);
            });
        });
    };
    return ProjectUIService;
}());



/***/ }),

/***/ "./src/UI/Views/Buttons.ts":
/*!*********************************!*\
  !*** ./src/UI/Views/Buttons.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcceptButton": () => (/* binding */ AcceptButton),
/* harmony export */   "CancelButton": () => (/* binding */ CancelButton),
/* harmony export */   "DefaultButton": () => (/* binding */ DefaultButton)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function AcceptButton(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontSize(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '16px' : ''))
        .foregroundColor(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '#eee' : 'white')
        .border({
        default: 'solid 1px #1687D9',
        hover: 'solid 1px #07c',
        active: 'solid 1px #07c'
    })
        .backgroundImage({
        default: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsDesktop ? ' linear-gradient(#32AAFF, #1994EB)' : '',
        hover: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsDesktop ? 'linear-gradient(#25A4FF, #028AEB)' : '',
        active: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsDesktop ? 'linear-gradient(#1897F2, #0182DF)' : ''
    })
        .backgroundColor({
        default: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '#288ae2' : '#1994EB',
        hover: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '#1a70bd' : '#028AEB',
        active: '#0182DF'
    })
        .height('27px')
        .minWidth(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '140px' : '90px')
        .minHeight(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '33px' : '')
        .margin('8px 10px 8px 0px')
        .cornerRadius('3px'));
}
function CancelButton(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontSize(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '16px' : ''))
        .foregroundColor(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '#ddd' : '#505A64')
        .border({
        default: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '1px solid #55606c' : 'solid 1px #C8D2DC',
        hover: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '1px solid #55606c' : 'solid 1px #B4BEC8',
        active: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '1px solid #55606c' : 'solid 1px #B4BEC8'
    })
        .backgroundImage({
        default: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '' : 'linear-gradient(#f5faff, #ebf0f5)',
        hover: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '' : 'linear-gradient(#f5faff, #e7ecf1)',
        active: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '' : 'linear-gradient(#ebf0f5, #e1e6eb)'
    })
        .backgroundColor({
        default: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? 'transparent' : '#EBF0F5',
        hover: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '#354251' : '#E7ECF1',
        active: '#E1E6EB'
    })
        .height('27px')
        .minWidth(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '140px' : '90px')
        .minHeight(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal ? '33px' : '')
        .margin('8px 10px 8px 0px')
        .cornerRadius('3px'));
}
function DefaultButton() {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    return (_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIButton.apply(void 0, content).foregroundColor('#505A64')
        .border({
        default: 'solid 1px #C8D2DC',
        hover: 'solid 1px #B4BEC8',
        active: 'solid 1px #B4BEC8'
    })
        .backgroundImage({
        default: 'linear-gradient(#f5faff, #ebf0f5)',
        hover: 'linear-gradient(#f5faff, #e7ecf1)',
        active: 'linear-gradient(#ebf0f5, #e1e6eb)'
    })
        .backgroundColor({
        default: '#EBF0F5',
        hover: '#E7ECF1',
        active: '#E1E6EB'
    })
        .height('27px')
        .width('90px')
        .margin('8px 10px 8px 0px')
        .cornerRadius('3px'));
}


/***/ }),

/***/ "./src/UI/Views/ListView.ts":
/*!**********************************!*\
  !*** ./src/UI/Views/ListView.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListViewItemClass": () => (/* binding */ ListViewItemClass),
/* harmony export */   "ListView": () => (/* binding */ ListView),
/* harmony export */   "ListViewItem": () => (/* binding */ ListViewItem)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ListViewItemClass = /** @class */ (function (_super) {
    __extends(ListViewItemClass, _super);
    function ListViewItemClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = [];
        return _this;
    }
    ListViewItemClass.prototype.Body = function () {
        var _this = this;
        this.SubViews.Add((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)(this.children)
            .width('100%')
            .spacing('10px')
            .paddingLeft('5px')
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading)
            .cursor('pointer')
            .onClick(function () { return _this._selected(); }));
        return null;
    };
    ListViewItemClass.prototype.onSelected = function (func) {
        this._selected = func;
        return this;
    };
    ListViewItemClass.prototype.tag = function (value) {
        this._tag = value;
        return this;
    };
    ListViewItemClass.prototype.setChilds = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.children = args;
        return this;
    };
    ListViewItemClass.prototype.Render = function () {
        this.Body();
        return _super.prototype.Render.call(this);
    };
    return ListViewItemClass;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIView));

function ListView() {
    var subViews = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        subViews[_i] = arguments[_i];
    }
    return _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack.apply(void 0, subViews).justifyContent('start').overflowX('hidden').overflowY('auto');
}
function ListViewItem() {
    var _a;
    var subViews = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        subViews[_i] = arguments[_i];
    }
    return (_a = new ListViewItemClass()).setChilds.apply(_a, subViews).width('100%');
}


/***/ }),

/***/ "./src/UI/Views/PageHeader.ts":
/*!************************************!*\
  !*** ./src/UI/Views/PageHeader.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageTitle": () => (/* binding */ PageTitle)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function PortalPageTitle(icon, text) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)(icon).size(30).foregroundColor('#333333'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(text)
        .fontWeight('700')
        .fontFamily('Ubuntu, sans-serif')
        .fontSize('30px')
        .foregroundColor('#495057'))
        .marginLeft('10px')
        .spacing(10)
        .width() //auto
    );
}
function DesktopPageTitle(icon, text) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)(icon).size(30).foregroundColor('gray'), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(text)
        .fontFamily('Proxima Nova')
        .fontSize('22px')
        .foregroundColor('#333333'))
        .spacing(10)
        .width() //auto
    );
}
function PageTitle(icon, text) {
    if (_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.ApplicationMode === _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ApplicationModes.Desktop) {
        return DesktopPageTitle(icon, text);
    }
    else {
        return PortalPageTitle(icon, text);
    }
}


/***/ }),

/***/ "./src/UI/Views/PortalSideMenu.ts":
/*!****************************************!*\
  !*** ./src/UI/Views/PortalSideMenu.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PortalSideMenu": () => (/* binding */ PortalSideMenu)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function PortalSideMenu(params) {
    if (_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TApplication.IsPortal) {
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cTopLeading }).apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(params.items, function (item, index) {
            return (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ spacing: 5 })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Icon)(item.icon).size(26), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(item.name).fontSize('12px').fontFamily('-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'))
                .padding(5)
                .background(params.selectedIndex === index ? (params.second ? '#777b80' : '#52565b') : { hover: '#eee' })
                .borderBottom(params.selectedIndex === index ? '2px solid #e7b54a' : '2px solid transparent')
                .cursor('pointer')
                .foregroundColor(params.selectedIndex === index ? 'white' : { hover: '#333', default: 'white' })
                .height(80)
                .onClick(function () { return params.selectedAction(index); });
        })).minWidth(params.second ? '75px' : '80px')
            .width(params.second ? 75 : 80)
            .background(params.second ? '#52565b' : '#212932')
            .shadow(params.second ? 'inset 24px 0 20px -20px #373b40' : '')
            .borderBottom('2px solid #212932'));
    }
}


/***/ }),

/***/ "./src/UI/Views/TabView.ts":
/*!*********************************!*\
  !*** ./src/UI/Views/TabView.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabViewClass": () => (/* binding */ TabViewClass),
/* harmony export */   "TabView": () => (/* binding */ TabView),
/* harmony export */   "TabViewItem": () => (/* binding */ TabViewItem)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};


var TabViewItemClass = /** @class */ (function (_super) {
    __extends(TabViewItemClass, _super);
    function TabViewItemClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TabViewItemClass.prototype, "Header", {
        get: function () {
            var _this = this;
            return _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, this.headerContent).onClick(function () { return _this._onSelected(); }).spacing('5px');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabViewItemClass.prototype, "Content", {
        get: function () {
            return _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, this._content);
        },
        enumerable: false,
        configurable: true
    });
    TabViewItemClass.prototype.onSelected = function (func) {
        this._onSelected = func;
        return this;
    };
    TabViewItemClass.prototype.header = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        this.headerContent = this.DoFlatten.apply(this, content);
        return this;
    };
    TabViewItemClass.prototype.content = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        this._content = this.DoFlatten.apply(this, content);
        return this;
    };
    TabViewItemClass.prototype.name = function (value) {
        this._name = value;
        ;
        return this;
    };
    return TabViewItemClass;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIView));
var TabViewClass = /** @class */ (function (_super) {
    __extends(TabViewClass, _super);
    function TabViewClass() {
        var _this = _super.call(this) || this;
        _this.tabs = new _tuval_core__WEBPACK_IMPORTED_MODULE_1__.List();
        _this.Appearance.Display = 'flex';
        _this.Appearance.Width = '100%';
        _this.Appearance.Height = '100%';
        return _this;
    }
    TabViewClass.prototype.Body = function () {
        var _this = this;
        this.SubViews.Add(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack.apply(void 0, __spreadArray(__spreadArray([], (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(this.tabs, function (tabItem, index) {
            if (index === _this._selectedTabIndex) {
                return tabItem._content;
            }
        })), [_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack.apply(void 0, (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ForEach)(this.tabs, function (tabItem) { return tabItem.Header; })).height('auto').width('100%')])).width('100%')
            /*  .spacing('10px') */
            .paddingLeft('5px')
            .alignment(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Alignment.leading)
            .cursor('pointer'));
        return null;
    };
    TabViewClass.prototype.setChilds = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var childs = this.DoFlatten.apply(this, args);
        (0,_tuval_core__WEBPACK_IMPORTED_MODULE_1__.foreach)(childs, function (item) {
            if (item instanceof TabViewItemClass) {
                _this.tabs.Add(item);
            }
        });
        return this;
    };
    TabViewClass.prototype.selectedTabIndex = function (value) {
        this._selectedTabIndex = value;
        return this;
    };
    TabViewClass.prototype.Render = function () {
        this.Body();
        return _super.prototype.Render.call(this);
    };
    return TabViewClass;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIView));

function TabView() {
    var _a;
    var subViews = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        subViews[_i] = arguments[_i];
    }
    return (_a = new TabViewClass()).setChilds.apply(_a, subViews);
}
function TabViewItem(params) {
    return new TabViewItemClass().name(params.name).header(params.header).content(params.content);
}


/***/ }),

/***/ "./src/UI/Views/Texts.ts":
/*!*******************************!*\
  !*** ./src/UI/Views/Texts.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Headline1": () => (/* binding */ Headline1),
/* harmony export */   "Headline2": () => (/* binding */ Headline2),
/* harmony export */   "Headline3": () => (/* binding */ Headline3),
/* harmony export */   "Headline4": () => (/* binding */ Headline4),
/* harmony export */   "Headline5": () => (/* binding */ Headline5),
/* harmony export */   "Headline6": () => (/* binding */ Headline6),
/* harmony export */   "Subtitle1": () => (/* binding */ Subtitle1),
/* harmony export */   "Subtitle2": () => (/* binding */ Subtitle2),
/* harmony export */   "Body1": () => (/* binding */ Body1),
/* harmony export */   "Body2": () => (/* binding */ Body2),
/* harmony export */   "ButtonText": () => (/* binding */ ButtonText),
/* harmony export */   "Caption": () => (/* binding */ Caption),
/* harmony export */   "Overline": () => (/* binding */ Overline),
/* harmony export */   "RegularText": () => (/* binding */ RegularText),
/* harmony export */   "SectionTitle": () => (/* binding */ SectionTitle),
/* harmony export */   "SectionContent": () => (/* binding */ SectionContent),
/* harmony export */   "SectionHeadline": () => (/* binding */ SectionHeadline),
/* harmony export */   "SectionSubHeadline": () => (/* binding */ SectionSubHeadline)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function Headline1(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('lighter').fontSize('97.8462px').kerning('-1.5px'));
}
function Headline2(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('lighter').fontSize('61.1538px').kerning('-0.5px'));
}
function Headline3(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('48.9231px').kerning('0px'));
}
function Headline4(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('34.6538px').kerning('0.25px'));
}
function Headline5(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('24.4615px').kerning('0px'));
}
function Headline6(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('500').fontSize('20.3846px').kerning('0.15px'));
}
function Subtitle1(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('16.3077px').kerning('0.15px'));
}
function Subtitle2(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('500').fontSize('14.2692px').kerning('0.1px'));
}
function Body1(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('16.3077px').kerning('0.5px'));
}
function Body2(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('14.2692px').kerning('0.25px'));
}
function ButtonText(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('500').fontSize('14.2692px').kerning('1.25px').textTransform('uppercase'));
}
function Caption(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('12.2308px').kerning('0.4px'));
}
function Overline(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('10.1923px').kerning('1.5px').textTransform('uppercase'));
}
function RegularText(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('"Proxima Nova","Helvetica Neue",Helvetica,Arial,sans-serif').fontSize('14px').lineHeight('1.42857').foregroundColor('#333'));
}
function SectionTitle(value) {
    return (RegularText(value).fontWeight('500'));
}
function SectionContent(value) {
    return (RegularText(value));
}
function SectionHeadline(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('"Proxima Nova","Helvetica Neue",Helvetica,Arial,sans-serif').fontSize('20px').lineHeight('1.42857').foregroundColor('#333'));
}
function SectionSubHeadline(value) {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)(value).fontFamily('"Proxima Nova","Helvetica Neue",Helvetica,Arial,sans-serif').fontSize('16px').fontWeight('normal').lineHeight('1.42857').foregroundColor('#666666'));
}


/***/ }),

/***/ "./src/UI/Views/TileBox.ts":
/*!*********************************!*\
  !*** ./src/UI/Views/TileBox.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TileBox": () => (/* binding */ TileBox)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);

function TileBox() {
    var views = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        views[_i] = arguments[_i];
    }
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack.apply(void 0, views).backgroundColor('rgb(255,255,255,60%)')
        .cornerRadius('12px')
        .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
        .tabIndex(0)).padding(2));
}


/***/ }),

/***/ "./src/__manifest__/__types__.ts":
/*!***************************************!*\
  !*** ./src/__manifest__/__types__.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_Types": () => (/* binding */ _Types)
/* harmony export */ });
var _Types = {
    TuDashboardShape: Symbol('TuDashboardShape'),
    TdiFregMapShape: Symbol('TdiFregMapShape'),
    TdiDashboardChart: Symbol('TdiDashboardChart'),
    TdiActivityMeanDurationChart: Symbol('TdiActivityMeanDurationChart'),
    TdiActivityMedianDurationChart: Symbol('TdiActivityMedianDurationChart'),
    TdiFregProcessExplorerShape: Symbol('TdiFregProcessExplorerShape'),
    TdiActivitySlider: Symbol('TdiActivitySlider'),
    TdiConnectionSlider: Symbol('TdiConnectionSlider'),
    TdiPerformanceProcessExplorerShape: Symbol('TdiPerformanceProcessExplorerShape'),
};


/***/ }),

/***/ "./src/manifest.js":
/*!*************************!*\
  !*** ./src/manifest.js ***!
  \*************************/
/***/ ((module) => {

module.exports = {
    application: {
        name: 'ProcessMining',
        path: './src/Application.ts'
    },
    threads: {
        'PMThreadWorker': 'ThreadWorker.ts'
    }
}

/***/ }),

/***/ "@tuval/components/charts":
/*!******************************************!*\
  !*** external "tuval$components$charts" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__tuval_components_charts__;

/***/ }),

/***/ "@tuval/components/diagram":
/*!*******************************************!*\
  !*** external "tuval$components$diagram" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__tuval_components_diagram__;

/***/ }),

/***/ "@tuval/core":
/*!*****************************!*\
  !*** external "tuval$core" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__tuval_core__;

/***/ }),

/***/ "@tuval/cg":
/*!**************************************!*\
  !*** external "tuval$core$graphics" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__tuval_cg__;

/***/ }),

/***/ "@tuval/forms":
/*!******************************!*\
  !*** external "tuval$forms" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__tuval_forms__;

/***/ }),

/***/ "@tuval/graphics":
/*!*********************************!*\
  !*** external "tuval$graphics" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__tuval_graphics__;

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Application.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map
                    tuval$core.ModuleLoader.FireModuleLoadedEvent('ProcessMining', tuval$core['__APPS__']['ProcessMining']);
                    