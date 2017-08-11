(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["SocialUtils"] = factory(require("jquery"));
	else
		root["SocialUtils"] = factory(root["$"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(2);
var profileTemplate = __webpack_require__(11);
var popoverTemplate = __webpack_require__(10);
var containerTemplate = __webpack_require__(5);
var progressTemplate = __webpack_require__(12);
var failTemplate = __webpack_require__(7);
var emptyTemplate = __webpack_require__(6);
var workTemplate = __webpack_require__(13);
var workPositionTemplate = __webpack_require__(14);
var random_1 = __webpack_require__(1);
var Profile = (function () {
    function Profile() {
    }
    return Profile;
}());
var selectors = new Set();
function render(contentData) {
    if (!contentData)
        return;
    contentData.map(function (contentDataItem) {
        contentDataItem.socialLinkPicture = "https://integrum.ru/Assets/img/social/small/" + contentDataItem.socialKey + ".png";
        if (!contentDataItem.photoPreview) {
            contentDataItem.photoPreview = '/Images/default-image.png';
        }
    });
    var profiles = contentData.map(function (listItem) {
        if (listItem.workPosition && typeof listItem.workPositionTemplate === 'undefined') {
            listItem.workPosition = workPositionTemplate(listItem);
        }
        else if (!listItem.workPosition) {
            listItem.workPosition = '';
        }
        if (listItem.work && typeof listItem.workTemplate === 'undefined') {
            listItem.workTemplate = workTemplate(listItem);
        }
        else if (!listItem.work) {
            listItem.workTemplate = '';
        }
        return profileTemplate(listItem);
    });
    var profilesHtml = profiles.join('\n');
    return popoverTemplate({ profilesHtml: profilesHtml });
}
function initPlacement() {
    $.fn.popover.Constructor.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 } :
            placement == 'bottom-right' ? { top: pos.top + pos.height, left: pos.left } :
                placement == 'bottom-left' ? { top: pos.top + pos.height, left: pos.left + pos.width - actualWidth } :
                    placement == 'top' ? {
                        top: pos.top - actualHeight,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    } :
                        placement == 'left' ? {
                            top: pos.top + pos.height / 2 - actualHeight / 2,
                            left: pos.left - actualWidth
                        } :
                            {
                                top: pos.top + pos.height / 2 - actualHeight / 2,
                                left: pos.left + pos.width
                            };
    };
}
function init(selector, options) {
    var currentRequest = null;
    options = options || {};
    if (!jQuery)
        throw new Error('Необходимо предварительно подключить jQuery.js');
    if (!selector)
        throw new Error('Необходимо указать селектор элемента, при клике на который нужно показывать поповер');
    if (!options.triggerEvent ||
        options.triggerEvent.toLowerCase() !== 'hover' &&
            options.triggerEvent.toLowerCase() !== 'click') {
        throw new Error('Необходимо указать тип события для инициализации тултипа: "hover" или "click"');
    }
    if (!$.fn.popover)
        throw new Error('Необходимо предварительно подключить bootstrap popover.js');
    initPlacement();
    selectors.add(selector);
    selectors.forEach(function (selector) {
        var randId = random_1.randomInteger(10000, 99999), contentHook = '.js-popover-content-hook-' + randId, el = $(selector);
        if (!el.data('event-type')) {
            el.data('event-type', options.triggerEvent.toLowerCase());
        }
        el.popover({
            html: true,
            container: 'html',
            placement: options.popoverPlacement ? options.popoverPlacement : 'bottom-right',
            trigger: 'manual',
            template: containerTemplate({ contentHook: contentHook.replace(/\./g, ''), initedBy: options.triggerEvent }),
            content: progressTemplate()
        });
        if (el.data('event-type') === 'hover') {
            $(document).off('mouseenter', selector);
            $(document).on('mouseenter', selector, function (e) { return initTooltip(e, contentHook); });
            $(document).on('mouseleave', selector, function (e) {
                var target = e.currentTarget;
                var relatedTarget = e.relatedTarget;
                $(document).off('mouseenter', selector);
                if ($(relatedTarget).hasClass('popover')) {
                    $(document).off('mouseleave', '.popover');
                    $(document).on('mouseleave', '.popover', function (e) {
                        if ($('.popover').data('triggerType') === 'click')
                            return;
                        if ($(e.relatedTarget).parents(selector).length)
                            return;
                        $(document).on('mouseenter', selector, function (e) { return initTooltip(e, contentHook); });
                        $(e.currentTarget).popover('hide');
                    });
                    return;
                }
                $(document).on('mouseenter', selector, function (e) { return initTooltip(e, contentHook); });
                $(target).popover('hide');
            });
        }
        else if (el.data('event-type') === 'click') {
            $(document).off('click', selector);
            $(document).on('click', selector, function (e) { return initTooltip(e, contentHook); });
            $(document).on('click', 'body', function (e) {
                if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('.popover.in').length === 0) {
                    selectors.forEach(function (selector) {
                        $(selector).popover('hide');
                    });
                }
            });
            $(document).on('hidden.bs.popover', 'body', function (e) {
                $(e.target).data("bs.popover").inState.click = false;
            });
        }
    });
    function initTooltip(e, contentHook) {
        var target = e.currentTarget, dataOptions = $(target).data('options'), profileOptions = $(target).data('profile') && $(target).data('profile').profiles || null;
        $(target).popover('show');
        $('.popover-content').html(progressTemplate());
        if (options.isIchp)
            dataOptions.isIchp = true;
        selectors.forEach(function (selector) {
            $(selector).not(target).popover('hide');
        });
        if (profileOptions && profileOptions.length) {
            beforeSend();
            success(contentHook, profileOptions);
            return;
        }
        currentRequest = $.ajax({
            url: options.url,
            method: "POST",
            beforeSend: beforeSend,
            data: JSON.stringify(dataOptions),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            statusCode: {
                401: function () {
                    location.reload();
                }
            },
            success: success(contentHook),
            error: error(contentHook)
        });
    }
    function beforeSend(request) {
        if (request)
            request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        if (currentRequest) {
            currentRequest.abort();
        }
    }
    function success(contentHook, templateData) {
        var content = '';
        if (templateData) {
            content = render(templateData);
            $('.popover-content').html(content);
        }
        return function (response) {
            if (!response) {
                error('response is null');
                return;
            }
            currentRequest = null;
            if (response && response.length == 0)
                content = emptyTemplate();
            else
                content = render(response);
            $('.popover-content').html(content);
        };
    }
    function error(contentHook) {
        if (contentHook === 'response is null') {
            var content = failTemplate();
            $('.popover-content').html(content);
            return;
        }
        return function (response) {
            currentRequest = null;
            if (response.statusText != "abort") {
                var content = failTemplate();
                $('.popover-content').html(content);
            }
        };
    }
}
function Popover() {
    var instance;
    function createInstance() {
        return {
            init: init,
            selectors: selectors
        };
    }
    if (!instance) {
        instance = createInstance();
    }
    return instance;
}
exports.Popover = Popover;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}
exports.randomInteger = randomInteger;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(2);
var imgageTemplate = __webpack_require__(9);
var iconsTemplate = __webpack_require__(8);
var popover_1 = __webpack_require__(0);
var random_1 = __webpack_require__(1);
var util_1 = __webpack_require__(19);
function icons(selector, options) {
    options = options || {};
    if (!jQuery)
        throw new Error('Необходимо предварительно подключить jQuery.js');
    if (!selector)
        throw new Error('Необходимо указать селектор элемента, около которого нужно показать социальные иконки');
    if (!options.iconPath)
        throw new Error('Необходимо указать options.iconPath - путь для социальной иконки');
    if (!options.iconExt)
        throw new Error('Необходимо указать options.iconExt - расширение файла социальной иконки');
    var $selector = $(selector);
    $selector.toArray().forEach(function (el) {
        var randId = random_1.randomInteger(10000, 99999);
        var $el = $(el), data = $el.data('options') || {}, orgid = Number(data.orgid) || Number(data.orgId), profiles = data.profiles || null, iconHook = options.iconHook || ".js-social-icons-" + randId, position = data.position || options.position || 'right', initPopover = !util_1.isUndefined(data.popover) ? data.popover : !util_1.isUndefined(options.popover) ? options.popover : false, pointer = initPopover ? 'pointer' : '', customClass = data.customClass || options.customClass || '', icons = data.icons || [], initIcons = icons.length > 0, images = [];
        icons = Array.from(new Set(icons));
        if (initIcons) {
            if (!$el.hasClass('js-social-icons-inited')) {
                icons.forEach(function (icon) {
                    var iconPath = options.iconPath + icon + '.' + options.iconExt, image = imgageTemplate({ iconPath: iconPath });
                    images.push(image);
                });
                var imagesTemplate = images.join('\n'), template = iconsTemplate({
                    icons: imagesTemplate,
                    iconHook: iconHook.replace(/\./g, ''),
                    options: JSON.stringify({ "orgid": orgid }),
                    profile: JSON.stringify({ "profiles": profiles }),
                    pointer: pointer,
                    customClass: customClass
                });
                switch (position) {
                    case 'right':
                        $el.after(template);
                        break;
                    case 'left':
                        $el.before(template);
                        break;
                    case 'inside':
                        $el.html(template);
                        break;
                    default:
                        throw new Error('Неправильное значение options.position, допустимо "right" или "left"');
                }
                if (initPopover) {
                    if (!options.url)
                        throw new Error('Необходимо указать options.url - ссылку на api');
                    var popover = popover_1.Popover();
                    popover.init(iconHook, options);
                }
                $el.addClass('js-social-icons-inited');
            }
        }
    });
}
exports.icons = icons;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (scope) {
    return "<div class=\"popover\" role=\"tooltip\" data-trigger-type=\"" + scope.initedBy + "\">\n    <div class=\"popover-content " + scope.contentHook + "\"></div>\n</div>";
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (scope) { return "<span>\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u044F</span>"; };


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (scope) { return "<span>\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437</span>"; };


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (scope) {
    return "<span\n        class=\"social-icons right " + scope.iconHook + " " + scope.pointer + " " + scope.customClass + "\"\n        data-profile='" + scope.profile + "'\n        data-options='" + scope.options + "'\n        data-toggle=\"popover\">\n    " + scope.icons + "\n</span>";
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (scope) { return "<img src=\"" + scope.iconPath + "\" data-toggle=\"popover\">"; };


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (scope) {
    return "<div class=\"social-profile\">\n    <ul class=\"list-unstyled\">\n        " + scope.profilesHtml + "\n    </ul>\n</div>\n<div class=\"social-description\">\n    \u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0432 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u0435\u0442\u044F\u0445 \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435\n    \u0434\u0435\u0441\u044F\u0442\u043A\u043E\u0432 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u043E\u0432 \u043C\u0430\u0448\u0438\u043D\u043D\u043E\u0433\u043E \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F.\n</div>";
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (scope) {
    return "<li class=\"social-profile__item\">\n    <a href=\"" + scope.profileLink + "\" rel=\"nofollow\" target=\"_blank\">\n        <img class=\"social-profile__photo\" src=\"" + scope.photoPreview + "\"/>\n    </a>\n    <div class=\"social-profile__info\" >\n        <a class=\"social-profile__soc-link\" href=\"" + scope.profileLink + "\" rel=\"nofollow\" target=\"_blank\">\n            <img class=\"social-profile__soc-icon\" src=\"" + scope.socialLinkPicture + "\">\n            <span class=\"social-profile__soc-name\">" + scope.firstName + " " + scope.lastName + "</span>\n        </a>\n        " + scope.workTemplate + "\n    </div>\n</li>";
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (scope) {
    return "<div class=\"popover__progress\">\n    <i class=\"fa fa-cog fa-spin fa-fw\"></i>\n</div>";
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (scope) {
    return "<div class=\"social-profile__comp\">\n    <p>\n        <i class=\"social-profile__icon fa fa-building-o\"></i>\n        <span class=\"social-profile__comp-name\">" + scope.work + "</span>\n    </p>\n    " + scope.workPosition + "\n</div>";
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (scope) {
    return "<p>\n    <i class=\"social-profile__icon fa fa-user\" aria-hidden=\"true\"></i>\n    <span class=\"social-profile__comp-position\">" + scope.workPosition + "</span>\n</p>\n\n";
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var popover_1 = __webpack_require__(0);
exports.Popover = popover_1.Popover;
var icons_1 = __webpack_require__(3);
exports.icons = icons_1.icons;
__webpack_require__(4);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 17 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(18);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(17);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20), __webpack_require__(16)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map