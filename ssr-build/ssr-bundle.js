module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+Mko":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "2cT1":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"checkbox":"checkbox__FYayJ","checkmark":"checkmark__2iZyB","checked":"checked__19Uiz"};

/***/ }),

/***/ "5D9O":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__("wVGV")();
}

/***/ }),

/***/ "9Qqk":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "eb4171961d4ee1ef1c21f3dc77cc4528.png";

/***/ }),

/***/ "Asjh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),

/***/ "ByAk":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__1DKaz","pageTitle":"pageTitle__FeJjJ","content":"content__sDX8X","main":"main__2i267","navigation":"navigation__QsDRB","active":"active__D40uB","sidebar":"sidebar__3M49K","readMore":"readMore__3UIrb"};

/***/ }),

/***/ "EA68":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"footer":"footer__2oN3T","noColor":"noColor__TtUz3"};

/***/ }),

/***/ "FJnM":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _preact = __webpack_require__("KM04");

var _preactSideEffect = __webpack_require__("xToX");

var _preactSideEffect2 = _interopRequireDefault(_preactSideEffect);

var _deepEqual = __webpack_require__("koiw");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _objectAssign = __webpack_require__("J4Nk");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__("Qxat");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

var HELMET_ATTRIBUTE = "data-preact-helmet";

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props[property]) {
            return props[property];
        }
    }
    return null;
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, "title");
    var innermostTemplate = getInnermostProperty(propsList, "titleTemplate");

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, "defaultTitle");

    return innermostTitle || innermostDefaultTitle || "";
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, "onChangeClientState") || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[_HelmetConstants.TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        return typeof props[tagName] !== "undefined";
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var updateTitle = function updateTitle(title, attributes) {
    document.title = title || document.title;
    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var htmlTag = document.getElementsByTagName(tagName)[0];
    var helmetAttributeString = htmlTag.getAttribute(HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";
        htmlTag.setAttribute(attribute, value);

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        htmlTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        htmlTag.removeAttribute(HELMET_ATTRIBUTE);
    } else {
        htmlTag.setAttribute(HELMET_ATTRIBUTE, helmetAttributes.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector("head");
    var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === "innerHTML") {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === "cssText") {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateHtmlAttributesAsString = function generateHtmlAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes) {
    var attributeString = generateHtmlAttributesAsString(attributes);
    return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + " " + attributeString + ">" + encodeSpecialCharacters(title) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + ">" + encodeSpecialCharacters(title) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === "innerHTML" || attribute === "cssText");
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute]) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = [_HelmetConstants.TAG_NAMES.NOSCRIPT, _HelmetConstants.TAG_NAMES.SCRIPT, _HelmetConstants.TAG_NAMES.STYLE].indexOf(type) === -1;

        return str + "<" + type + " " + HELMET_ATTRIBUTE + " " + attributeHtml + (isSelfClosing ? ">" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var generateTitleAsPreactComponent = function generateTitleAsPreactComponent(type, title, attributes) {
    // assigning into an array to define toString function on it
    var initProps = _defineProperty({
        key: title
    }, HELMET_ATTRIBUTE, true);
    var props = Object.keys(attributes).reduce(function (obj, key) {
        obj[key] = attributes[key];
        return obj;
    }, initProps);

    return [(0, _preact.h)(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsPreactComponent = function generateTagsAsPreactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var mappedTag = _defineProperty({
            key: i
        }, HELMET_ATTRIBUTE, true);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = attribute;

            if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return (0, _preact.h)(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags) {
    switch (type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsPreactComponent(type, tags.title, tags.titleAttributes);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes);
                }
            };
        case _HelmetConstants.TAG_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return tags;
                },
                toString: function toString() {
                    return generateHtmlAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsPreactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var htmlAttributes = _ref.htmlAttributes,
        title = _ref.title,
        titleAttributes = _ref.titleAttributes,
        baseTag = _ref.baseTag,
        metaTags = _ref.metaTags,
        linkTags = _ref.linkTags,
        scriptTags = _ref.scriptTags,
        noscriptTags = _ref.noscriptTags,
        styleTags = _ref.styleTags;
    return {
        htmlAttributes: getMethodsForTag(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes),
        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }),
        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags),
        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };
};

/**
 * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
 * @param {String} title: "Title"
 * @param {String} defaultTitle: "Default Title"
 * @param {String} titleTemplate: "MySite.com - %s"
 * @param {Object} titleAttributes: {"itemprop": "name"}
 * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
 * @param {Array} meta: [{"name": "description", "content": "Test description"}]
 * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
 * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
 * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
 * @param {Array} style: [{"type": "text/css", "cssText": "div{ display: block; color: blue; }"}]
 * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
 */
var Helmet = function Helmet(WrappedComponent) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
        _inherits(HelmetWrapper, _Component);

        function HelmetWrapper() {
            _classCallCheck(this, HelmetWrapper);

            return _possibleConstructorReturn(this, (HelmetWrapper.__proto__ || Object.getPrototypeOf(HelmetWrapper)).apply(this, arguments));
        }

        _createClass(HelmetWrapper, [{
            key: "shouldComponentUpdate",
            value: function shouldComponentUpdate(nextProps) {
                var props = _extends({}, nextProps);
                if (!props.children || !props.children.length) {
                    delete props.children;
                }
                return !(0, _deepEqual2.default)(this.props, props);
            }
        }, {
            key: "render",
            value: function render() {
                return (0, _preact.h)(WrappedComponent, this.props);
            }
        }], [{
            key: "canUseDOM",

            // WrappedComponent.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.
            set: function set(canUseDOM) {
                WrappedComponent.canUseDOM = canUseDOM;
            }
        }]);

        return HelmetWrapper;
    }(_preact.Component), _class.peek = WrappedComponent.peek, _class.rewind = function () {
        var mappedState = WrappedComponent.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = mapStateOnServer({
                htmlAttributes: {},
                title: "",
                titleAttributes: {},
                baseTag: [],
                metaTags: [],
                linkTags: [],
                scriptTags: [],
                noscriptTags: [],
                styleTags: []
            });
        }

        return mappedState;
    }, _temp;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.TAG_NAMES.HTML, propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
        onChangeClientState: getOnChangeClientState(propsList)
    };
};

var handleClientStateChange = function handleClientStateChange(newState) {
    var htmlAttributes = newState.htmlAttributes,
        title = newState.title,
        titleAttributes = newState.titleAttributes,
        baseTag = newState.baseTag,
        metaTags = newState.metaTags,
        linkTags = newState.linkTags,
        scriptTags = newState.scriptTags,
        noscriptTags = newState.noscriptTags,
        styleTags = newState.styleTags,
        onChangeClientState = newState.onChangeClientState;

    updateAttributes("html", htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;

        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    onChangeClientState(newState, addedTags, removedTags);
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = (0, _preactSideEffect2.default)(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);

exports.default = Helmet(HelmetSideEffects);
module.exports = exports["default"];

/***/ }),

/***/ "Iov/":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"section":"section__1m54k","topContainer":"topContainer__15Nam","postTitle":"postTitle__G2Ctt","authorDate":"authorDate__3z7MX","author":"author__gbntI","date":"date__333EN","divider":"divider__2Buns","dividerTag":"dividerTag__8SzWH","dividerLine":"dividerLine__2-h05","content":"content__2_R-n"};

/***/ }),

/***/ "J4Nk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(_extends({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/normalize.scss
var normalize = __webpack_require__("XY+s");
var normalize_default = /*#__PURE__*/__webpack_require__.n(normalize);

// EXTERNAL MODULE: ./style/index.sass
var style = __webpack_require__("+Mko");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// EXTERNAL MODULE: ./components/header/style.sass
var header_style = __webpack_require__("yj+r");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// EXTERNAL MODULE: ./assets/icon-simple.png
var icon_simple = __webpack_require__("kQP3");
var icon_simple_default = /*#__PURE__*/__webpack_require__.n(icon_simple);

// CONCATENATED MODULE: ./components/header/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var header__ref = Object(preact_min["h"])(
	match["Link"],
	{ href: '/' },
	Object(preact_min["h"])('img', { src: icon_simple_default.a }),
	Object(preact_min["h"])(
		'h1',
		null,
		'\xD8lstykke Karate Academy'
	)
);

var header_Header = function (_Component) {
	_inherits(Header, _Component);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Header.prototype.render = function render(props, state) {
		if (props.visible) {
			return Object(preact_min["h"])(
				'header',
				{ 'class': header_style_default.a.header },
				header__ref,
				Object(preact_min["h"])(
					'nav',
					null,
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: header_style_default.a.active, href: '/' },
						'Forside'
					),
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: header_style_default.a.active, href: '/profile/begivenheder' },
						'Begivenheder'
					),
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: header_style_default.a.active, href: '/profile/galleri' },
						'Galleri'
					),
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: header_style_default.a.active, href: '/omkarate' },
						'Om karate'
					),
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: header_style_default.a.active, href: '/omklubben' },
						'Om klubben'
					),
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: header_style_default.a.active, href: '/profile' },
						'Min side'
					)
				)
			);
		}

		return null;
	};

	return Header;
}(preact_min["Component"]);

;

/* harmony default export */ var header = (header_Header);
// EXTERNAL MODULE: ./components/footer/style.sass
var footer_style = __webpack_require__("EA68");
var footer_style_default = /*#__PURE__*/__webpack_require__.n(footer_style);

// CONCATENATED MODULE: ./components/footer/index.js


function footer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function footer__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function footer__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var footer__ref = Object(preact_min["h"])(
	'p',
	null,
	'Frederiksborgvej 4, 3650 \xD8lstykke (',
	Object(preact_min["h"])(
		'a',
		{ target: '_blank', href: 'https://www.google.dk/maps/place/Frederiksborgvej+4,+3650+%C3%98lstykke/' },
		'Kort'
	),
	')'
);

var footer__ref2 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'a',
		{ href: '#' },
		'Cookies p\xE5 denne hjemmeside'
	)
);

var _ref3 = Object(preact_min["h"])(
	'p',
	null,
	'\xD8lstykke Karate Academy, Tr\xE6ningslokaler p\xE5 Tofteh\xF8jskolen, Frederiksborgvej 4, 3650'
);

var _ref4 = Object(preact_min["h"])(
	'p',
	null,
	'+45 12 34 56 78 (',
	Object(preact_min["h"])(
		'a',
		{ href: '#' },
		'Kontakt os'
	),
	')'
);

var footer_Footer = function (_Component) {
	footer__inherits(Footer, _Component);

	function Footer() {
		footer__classCallCheck(this, Footer);

		return footer__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Footer.prototype.render = function render(props, state) {
		if (props.visible) {
			return Object(preact_min["h"])(
				'footer',
				{ 'class': footer_style_default.a.footer },
				Object(preact_min["h"])(
					'div',
					{ 'class': footer_style_default.a.col1 },
					footer__ref,
					Object(preact_min["h"])(
						'p',
						null,
						Object(preact_min["h"])(
							'a',
							{ href: 'https://www.flaticon.com/packs/martial-arts-10', 'class': footer_style_default.a.noColor },
							'Karate icons designed by Freepik from Flaticon'
						)
					)
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': footer_style_default.a.col2 },
					footer__ref2,
					_ref3
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': footer_style_default.a.col3 },
					_ref4,
					Object(preact_min["h"])(
						'p',
						null,
						'\xA9 \xD8lstykke Karate Academy ',
						new Date().getFullYear()
					)
				)
			);
		}

		return null;
	};

	return Footer;
}(preact_min["Component"]);

;

/* harmony default export */ var footer = (footer_Footer);
// EXTERNAL MODULE: ../node_modules/preact-helmet/lib/Helmet.js
var Helmet = __webpack_require__("FJnM");
var Helmet_default = /*#__PURE__*/__webpack_require__.n(Helmet);

// EXTERNAL MODULE: ./routes/landing/style.sass
var landing_style = __webpack_require__("Z5Am");
var landing_style_default = /*#__PURE__*/__webpack_require__.n(landing_style);

// EXTERNAL MODULE: ../node_modules/react-responsive/dist/react-responsive.js
var react_responsive = __webpack_require__("bP4d");
var react_responsive_default = /*#__PURE__*/__webpack_require__.n(react_responsive);

// EXTERNAL MODULE: ./assets/images/landing slideshow/image.png
var landing_slideshow_image = __webpack_require__("n8AM");
var image_default = /*#__PURE__*/__webpack_require__.n(landing_slideshow_image);

// EXTERNAL MODULE: ./assets/images/landing details/1.png
var _ = __webpack_require__("9Qqk");
var __default = /*#__PURE__*/__webpack_require__.n(_);

// EXTERNAL MODULE: ./assets/images/landing details/2.png
var landing_details_2 = __webpack_require__("UOI8");
var landing_details_2_default = /*#__PURE__*/__webpack_require__.n(landing_details_2);

// CONCATENATED MODULE: ./assets/images/karate icons/karate.svg




/* harmony default export */ var karate = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"version":"1.1","id":"svg-karate-hOphw0R","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","x":"0px","y":"0px","viewBox":"0 0 512.001 512.001","style":"enable-background:new 0 0 512.001 512.001;","xml:space":"preserve"}, rest), ["\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M496.15,71.783c-21.135-21.134-55.522-21.134-76.657,0l-5.678,5.678c-7.671,7.671-12.543,17.09-14.645,26.987\r\n\t\t\tl-1.702-1.702c-13.424-13.424-32.956-18.053-50.975-12.08l-42.727,14.159c-3.546,1.175-7.391,0.265-10.034-2.378L264.374,73.09\r\n\t\t\tc-3.92-3.92-10.276-3.92-14.196,0l-1.038,1.038l-13.265-13.265c0.558-8.111-2.248-16.412-8.435-22.598l-10.642-10.642\r\n\t\t\tc-11.351-11.35-29.817-11.35-41.168,0l-16.447,16.447c-11.35,11.35-11.35,29.818,0,41.168l10.643,10.643\r\n\t\t\tc5.675,5.674,13.13,8.512,20.584,8.512c0.673,0,1.344-0.031,2.015-0.077l13.265,13.265l-0.846,0.846\r\n\t\t\tc-3.92,3.92-3.92,10.276,0,14.197l7.515,7.515L92.649,74.49c-1.191-0.654-2.47-1.04-3.762-1.177l-42.18-26.325\r\n\t\t\tc-12.126-7.569-27.652-5.796-37.759,4.311c-6.621,6.621-9.81,15.754-8.747,25.056c1.063,9.302,6.227,17.481,14.17,22.439\r\n\t\t\tl31.468,19.641c0.625,2.158,1.956,4.067,3.819,5.39l38.98,27.69c4.519,3.21,10.785,2.149,13.996-2.37\r\n\t\t\tc3.21-4.519,2.15-10.786-2.37-13.996L70.97,114.34l18.627-18.627l159.73,87.593l-42.671,26.797l-51.908-35.656\r\n\t\t\tc-4.57-3.139-10.818-1.979-13.958,2.591c-3.139,4.569-1.979,10.819,2.591,13.958l44.752,30.741l-0.16,0.1\r\n\t\t\tc-2.591,1.627-4.298,4.347-4.637,7.388c-0.339,3.041,0.728,6.07,2.896,8.228l52.761,52.493v149.756v28.095\r\n\t\t\tc0,13.837,11.257,25.095,25.095,25.095h85.257c5.544,0,10.038-4.494,10.038-10.038v-3c0-26.566-20.751-48.365-46.894-50.069\r\n\t\t\tl30.17-135.897l8.312,8.312c5.675,5.674,13.13,8.512,20.584,8.512s14.909-2.838,20.584-8.512l8.615-8.615\r\n\t\t\tc0.573-0.573,1.113-1.17,1.632-1.782l51.571-51.156c11.211-11.121,17.404-25.942,17.436-41.734\r\n\t\t\tc0.022-10.76-2.824-21.076-8.167-30.093c9.991-2.072,19.509-6.964,27.247-14.702l5.678-5.678\r\n\t\t\tC517.284,127.305,517.284,92.916,496.15,71.783z M55.881,101.037L25,81.763c-2.72-1.698-4.49-4.5-4.853-7.686\r\n\t\t\tc-0.363-3.186,0.729-6.315,2.996-8.582c2.028-2.028,4.691-3.076,7.385-3.076c1.906,0,3.827,0.525,5.548,1.599l34.987,21.836\r\n\t\t\tL55.881,101.037z M403.751,140.185c2.529,5.026,5.874,9.742,10.064,13.932c1.86,1.86,3.827,3.547,5.875,5.08l-26.84,5.115\r\n\t\t\tL403.751,140.185z M196.798,81.684c-3.522,3.523-9.254,3.523-12.776,0l-10.643-10.643c-3.522-3.522-3.522-9.254,0-12.776\r\n\t\t\tl16.447-16.447c1.761-1.762,4.074-2.642,6.388-2.642s4.626,0.88,6.388,2.642l10.643,10.643c3.522,3.522,3.522,9.254,0,12.776\r\n\t\t\tL196.798,81.684z M211.685,95.185l15.061-15.059l8.094,8.094l-15.06,15.06L211.685,95.185z M338.475,472.815h-74.388\r\n\t\t\tc-2.767,0-5.019-2.252-5.019-5.019v-18.057h40.935h9.189C323.374,449.739,335.298,459.593,338.475,472.815z M291.949,429.664\r\n\t\t\th-32.882V309.918l27.457,27.318c1.892,1.882,4.442,2.922,7.08,2.922c0.378,0,0.759-0.021,1.139-0.064\r\n\t\t\tc3.031-0.346,5.741-2.053,7.363-4.637l16.645-26.521L291.949,429.664z M311.997,281.931l-24.235-24.235\r\n\t\t\tc-3.92-3.92-10.276-3.92-14.196,0c-3.92,3.92-3.92,10.276,0,14.197l27.483,27.483l-9.27,14.771l-82.44-82.021l58.375-36.658\r\n\t\t\tl60.668,60.361L311.997,281.931z M337.962,237.039l-57.596-57.304l40.686-9.154c5.408-1.217,8.806-6.588,7.591-11.996\r\n\t\t\tc-1.218-5.409-6.589-8.806-11.996-7.591l-53.094,11.945l-37.417-37.417l31.14-31.14l22.259,22.261\r\n\t\t\tc8.043,8.043,19.747,10.818,30.545,7.238l42.727-14.16c10.767-3.569,22.442-0.803,30.463,7.219l6.167,6.166L337.962,237.039z\r\n\t\t\t M387.43,278.358l-3.272,3.245c-0.38,0.377-0.713,0.783-1.021,1.203l-5.198,5.198c-3.519,3.522-9.251,3.522-12.773-0.001\r\n\t\t\tl-14.107-14.107c-1.671-1.67-2.54-3.838-2.625-6.032l1.009-4.545c0.414-0.791,0.952-1.534,1.616-2.198l8.615-8.615\r\n\t\t\tc1.762-1.762,4.075-2.642,6.388-2.642c1.003,0,2.003,0.176,2.96,0.507c0.975,0.881,2.076,1.54,3.245,1.97\r\n\t\t\tc0.059,0.056,0.123,0.106,0.182,0.165l14.107,14.107c1.706,1.706,2.646,3.975,2.646,6.388\r\n\t\t\tC389.201,274.957,388.574,276.814,387.43,278.358z M439.818,226.394l-33.691,33.419c-1.374-2.697-3.172-5.195-5.374-7.397\r\n\t\t\tl-10.147-10.147l15.993-15.993c3.92-3.92,3.92-10.276,0-14.197c-3.92-3.92-10.276-3.92-14.197,0l-18.731,18.731\r\n\t\t\tc-3.418-0.919-6.969-1.215-10.471-0.872l19.547-43.263l60.539-11.539c5.221,6.778,8.048,15.036,8.03,23.734\r\n\t\t\tC451.295,209.287,447.212,219.06,439.818,226.394z M481.954,134.243l-5.678,5.678c-13.306,13.307-34.959,13.307-48.265,0\r\n\t\t\tc-13.307-13.306-13.307-34.959,0-48.265l5.678-5.678c6.653-6.653,15.393-9.981,24.133-9.981c8.74,0,17.48,3.327,24.133,9.981\r\n\t\t\tC495.261,99.285,495.261,120.936,481.954,134.243z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M129.631,155.846c-1.867-1.867-4.457-2.941-7.097-2.941s-5.23,1.074-7.097,2.941c-1.867,1.867-2.941,4.457-2.941,7.097\r\n\t\t\tc0,2.65,1.074,5.24,2.941,7.097c1.867,1.877,4.457,2.941,7.097,2.941s5.23-1.064,7.097-2.941c1.867-1.857,2.941-4.447,2.941-7.097\r\n\t\t\tC132.572,160.302,131.498,157.713,129.631,155.846z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M259.902,229.834c-1.867-1.867-4.457-2.941-7.097-2.941c-2.65,0-5.23,1.074-7.097,2.941\r\n\t\t\tc-1.867,1.867-2.941,4.457-2.941,7.097c0,2.64,1.074,5.23,2.941,7.097c1.867,1.867,4.447,2.941,7.097,2.941\r\n\t\t\tc2.64,0,5.23-1.074,7.097-2.941c1.867-1.867,2.941-4.457,2.941-7.097C262.843,234.291,261.769,231.701,259.902,229.834z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M143.227,222.852l-81.97-57.821c-4.53-3.195-10.793-2.113-13.989,2.416c-3.196,4.53-2.114,10.793,2.416,13.989\r\n\t\t\tl81.97,57.821c1.759,1.241,3.777,1.837,5.777,1.837c3.152,0,6.257-1.482,8.211-4.253\r\n\t\t\tC148.839,232.31,147.758,226.047,143.227,222.852z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./assets/images/karate icons/karate-2.svg




/* harmony default export */ var karate_2 = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"version":"1.1","id":"svg-karate-2-hOphw0R","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","x":"0px","y":"0px","viewBox":"0 0 512 512","style":"enable-background:new 0 0 512 512;","xml:space":"preserve"}, rest), ["\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M258.77,336.93c-1.86-1.86-4.44-2.93-7.07-2.93s-5.21,1.07-7.07,2.93s-2.93,4.44-2.93,7.07s1.07,5.21,2.93,7.07\r\n\t\t\tc1.86,1.86,4.44,2.93,7.07,2.93s5.21-1.07,7.07-2.93s2.93-4.44,2.93-7.07S260.64,338.79,258.77,336.93z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M410.224,375.862l-0.148-0.447c-1.736-5.243-7.394-8.084-12.637-6.349c-5.243,1.736-8.085,7.394-6.35,12.637l0.148,0.447\r\n\t\t\tc1.391,4.2,5.297,6.859,9.492,6.859c1.042,0,2.102-0.165,3.145-0.51C409.117,386.763,411.959,381.105,410.224,375.862z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M470.123,179.5h-16c-8.806,0-16.702,3.951-22.025,10.167h-18.975V186c0-5.523-4.477-10-10-10h-45.411\r\n\t\t\tc-4.459,0-8.473-2.476-10.475-6.461l-22.094-43.997C315.993,107.32,297.642,96,277.251,96h-8.835\r\n\t\t\tc7.551-9.29,12.087-21.123,12.087-34v-8c0-29.776-24.224-54-54-54s-54,24.224-54,54v8c0,12.877,4.537,24.71,12.088,34h-20.646\r\n\t\t\tc-23.759,0-44.938,15.948-51.504,38.781L89.346,215.1c-3.494,12.149-1.136,24.91,6.468,35.008\r\n\t\t\tc7.605,10.1,19.217,15.892,31.858,15.892h27.801v13.243L104.756,308.7c-25.631,14.887-44.892,38.578-54.232,66.708l-27.708,83.441\r\n\t\t\tc-1.013,3.049-0.499,6.398,1.381,9.003c0.325,0.451,0.695,0.857,1.083,1.241c-7.712,8.801-12.403,20.313-12.403,32.907\r\n\t\t\tc0,5.523,4.477,10,10,10h77.987c13.785,0,25-11.215,25-25v-15.041c3.713-0.209,7.029-2.444,8.564-5.865L166.779,394h127.038\r\n\t\t\tl32.35,72.094c1.535,3.421,4.851,5.656,8.564,5.865V487c0,1.712,0.174,3.384,0.503,5h-83.533c-5.523,0-10,4.477-10,10\r\n\t\t\ts4.477,10,10,10h186.018c5.523,0,10-4.477,10-10c0-12.594-4.69-24.107-12.403-32.907c0.388-0.385,0.758-0.791,1.083-1.241\r\n\t\t\tc1.88-2.605,2.394-5.954,1.381-9.003l-16.805-50.606c-1.74-5.241-7.397-8.08-12.642-6.339c-5.242,1.74-8.08,7.4-6.339,12.642\r\n\t\t\tL414.433,452h-16.714h-52.988h-2.967l-26.026-58h10.385c3.182,0,6.174-1.515,8.059-4.079c1.885-2.564,2.436-5.873,1.484-8.909\r\n\t\t\tl-23.309-74.438l33.439,19.421c12.741,7.4,23.919,17.706,32.328,29.802c1.943,2.795,5.056,4.293,8.22,4.293\r\n\t\t\tc1.969,0,3.959-0.581,5.699-1.79c4.535-3.152,5.656-9.384,2.504-13.919c-10.067-14.483-23.452-26.822-38.706-35.682\r\n\t\t\tl-50.718-29.456v-13.116h98c5.523,0,10-4.477,10-10v-4.46h18.974c5.323,6.216,13.219,10.167,22.026,10.167h16\r\n\t\t\tc15.991,0,29-13.009,29-29V208.5C499.123,192.509,486.113,179.5,470.123,179.5z M354.732,472h42.987\r\n\t\t\tc13.038,0,24.159,8.359,28.287,20h-66.274c-2.757,0-5-2.243-5-5V472z M192.504,54c0-18.748,15.252-34,34-34\r\n\t\t\tc18.748,0,34,15.252,34,34v8c0,18.748-15.252,34-34,34c-18.748,0-34-15.252-34-34V54z M261.123,266.127h16\r\n\t\t\tc1.067,0,2.12-0.062,3.157-0.175c0.594,0.11,1.205,0.175,1.831,0.175h3.012V275h0H175.474v-9h34.649c5.523,0,10-4.477,10-10v-0.04\r\n\t\t\th18.975C244.421,262.176,252.317,266.127,261.123,266.127z M252.123,237.127v-24.333c0-4.962,4.038-9,9-9h16c4.962,0,9,4.038,9,9\r\n\t\t\tv24.333c0,4.962-4.038,9-9,9h-16C256.161,246.127,252.123,242.089,252.123,237.127z M232.123,235.96h-12v-22h12V235.96z\r\n\t\t\t M245.409,112.577l-19.8,37.928L198.32,108.04c8.21,5.045,17.862,7.96,28.185,7.96C233.153,116,239.522,114.785,245.409,112.577z\r\n\t\t\t M127.672,246c-6.301,0-12.089-2.887-15.88-7.921s-4.966-11.395-3.225-17.451l23.096-80.32\r\n\t\t\tc4.115-14.312,17.39-24.308,32.283-24.308h15.716l50.097,77.96h-9.846c-0.942-4.545-4.967-7.96-9.791-7.96h-52\r\n\t\t\tc-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10h42v39.96V246H127.672z M105.865,487c0,2.757-2.243,5-5,5H34.591\r\n\t\t\tc4.127-11.641,15.249-20,28.287-20h42.987V487z M118.832,452h-2.967H62.877H46.163l23.341-70.29\r\n\t\t\tc7.802-23.495,23.889-43.282,45.297-55.716l33.439-19.421l-23.309,74.438c-0.951,3.037-0.4,6.345,1.484,8.909\r\n\t\t\tc1.884,2.564,4.876,4.079,8.059,4.079h10.384L118.832,452z M312.513,374H148.084l6.263-20h58.1c5.523,0,10-4.477,10-10\r\n\t\t\ts-4.477-10-10-10h-51.838l12.212-39h114.954L312.513,374z M393.123,199.667v42v4.46h0h-88.437c0.928-2.835,1.437-5.859,1.437-9\r\n\t\t\tv-24.333c0-15.991-13.009-29-29-29h-16c-4.414,0-8.598,0.995-12.346,2.767l-10.72-16.683L266.183,116h11.069\r\n\t\t\tc12.781,0,24.283,7.095,30.019,18.517l22.094,43.997C334.78,189.3,345.643,196,357.712,196h35.411V199.667z M425.123,231.667h-12\r\n\t\t\tv-22h12V231.667z M479.123,232.833c0,4.962-4.038,9-9,9h-16c-4.962,0-9-4.038-9-9V208.5c0-4.962,4.038-9,9-9h16\r\n\t\t\tc4.962,0,9,4.038,9,9V232.833z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./assets/images/karate icons/martial-arts.svg




/* harmony default export */ var martial_arts = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"version":"1.1","id":"svg-martial-arts-hOphw0R","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","x":"0px","y":"0px","viewBox":"0 0 512.001 512.001","style":"enable-background:new 0 0 512.001 512.001;","xml:space":"preserve"}, rest), ["\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M165.147,348.64c-1.86-1.86-4.44-2.93-7.069-2.93s-5.21,1.07-7.069,2.93c-1.86,1.86-2.93,4.44-2.93,7.069\r\n\t\t\tc0,2.63,1.07,5.21,2.93,7.069c1.86,1.859,4.44,2.93,7.069,2.93c2.63,0,5.21-1.07,7.069-2.93c1.86-1.86,2.93-4.44,2.93-7.069\r\n\t\t\tC168.077,353.08,167.007,350.5,165.147,348.64z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M484.467,77.312l-40.474-60.127v-6.946c0-5.522-4.477-9.999-9.999-9.999s-9.999,4.477-9.999,9.999v6.947L383.52,77.313\r\n\t\t\tc-10.82,4.674-19.478,13.426-24.025,24.312c2.612-7.65,2.047-16.345-2.304-23.879l-11.087-19.203\r\n\t\t\tc-3.873-6.707-10.125-11.506-17.607-13.511c-7.482-2.006-15.297-0.977-22.004,2.897l-12.237,7.064\r\n\t\t\tc-7.48,4.32-12.303,11.493-13.901,19.358l-15.849,9.15l-0.699-1.184c-2.79-4.722-8.859-6.316-13.609-3.575l-35.234,20.342\r\n\t\t\tc-3.119,1.8-6.922,1.688-9.929-0.289l-36.851-24.24c-15.593-10.257-35.32-10.832-51.483-1.5l-7.183,4.148\r\n\t\t\tc0.238-0.755,0.466-1.514,0.672-2.284c3.733-13.931,1.817-28.482-5.395-40.972l-4-6.927C93.584,14.531,81.94,5.596,68.009,1.864\r\n\t\t\tC54.078-1.87,39.526,0.046,27.037,7.258C14.546,14.468,5.611,26.112,1.879,40.044c-3.733,13.931-1.817,28.482,5.395,40.972\r\n\t\t\tl4,6.927c7.21,12.49,18.854,21.425,32.786,25.158c0.024,0.006,0.048,0.011,0.071,0.018l-20.434,11.798\r\n\t\t\tc-13.009,7.51-21.091,21.508-21.091,36.53v60.893c0,23.259,18.922,42.181,42.182,42.181h26.609c0.132,0,0.259-0.015,0.39-0.02\r\n\t\t\tc4.656,7.139,12.015,11.594,19.943,12.8l-49.44,175.306c-23.906,3.731-42.257,24.458-42.257,49.395\r\n\t\t\tc0,5.521,4.477,9.999,9.999,9.999h184.484c5.523,0,9.999-4.478,9.999-9.999c0-5.521-4.477-9.999-9.999-9.999h-82.009\r\n\t\t\tc0.329-1.616,0.503-3.288,0.503-5v-22.561l34.407-66.415c2.541-4.903,0.625-10.937-4.279-13.478\r\n\t\t\tc-4.905-2.54-10.938-0.626-13.478,4.279L96.93,452.006H63.236l50.84-180.271l12.874-7.432c6.483-3.744,10.975-9.63,13.098-16.254\r\n\t\t\tl55.38-35.654c4.644-2.99,5.984-9.177,2.995-13.82c-2.989-4.644-9.177-5.983-13.82-2.995l-43.999,28.328L119.396,94.592\r\n\t\t\tl7.303-4.217c9.573-5.528,21.258-5.188,30.494,0.888l36.851,24.24c9.365,6.16,21.212,6.505,30.918,0.9l26.66-15.392l2.29,3.878\r\n\t\t\tl16.616,28.778l-57.861,34.708l-31.158-32.11c-3.847-3.964-10.177-4.059-14.14-0.213c-3.963,3.846-4.059,10.176-0.213,14.14\r\n\t\t\tl36.68,37.8c2.553,2.631,6.268,3.593,9.678,2.711c1.471,0.381,3.049,0.441,4.635,0.094L356,160.639v48.516l-153.872,46.38\r\n\t\t\tc-2.588,0.78-4.75,2.575-5.993,4.975l-28.214,54.463c-2.541,4.903-0.625,10.937,4.279,13.478c1.471,0.762,3.042,1.123,4.592,1.123\r\n\t\t\tc3.617,0,7.108-1.969,8.887-5.402l26.27-50.709L356,230.041v136.559c0,25.088,20.41,45.498,45.498,45.498h64.989\r\n\t\t\tc25.088,0,45.498-20.41,45.498-45.498V119.1C511.987,100.395,500.638,84.296,484.467,77.312z M93.011,472.003v14.999\r\n\t\t\tc0,2.757-2.243,5-5,5H53.027H21.743c4.127-11.64,15.248-19.998,28.285-19.998H93.011z M99.325,95.778l5.999,36.585l-36.962-17.86\r\n\t\t\tc-0.032-0.171-0.064-0.342-0.106-0.513c5.825-1.128,11.484-3.228,16.774-6.281C90.534,104.531,95.343,100.492,99.325,95.778z\r\n\t\t\t M28.591,77.945l-4-6.927c-4.541-7.864-5.746-17.026-3.396-25.798c2.351-8.771,7.975-16.103,15.84-20.644\r\n\t\t\tc5.239-3.024,11.052-4.569,16.943-4.569c2.953,0,5.927,0.388,8.854,1.173c8.771,2.351,16.103,7.976,20.643,15.841l4,6.927\r\n\t\t\tc4.541,7.864,5.747,17.026,3.396,25.798c-2.351,8.771-7.975,16.103-15.84,20.643c-7.865,4.541-17.026,5.746-25.798,3.396\r\n\t\t\tC40.462,91.435,33.132,85.809,28.591,77.945z M74.826,174.182c-2.563-4.892-8.605-6.781-13.498-4.218\r\n\t\t\tc-4.892,2.563-6.78,8.605-4.218,13.498l16.597,31.685c-9.521,6.693-13.931,18.344-11.74,29.377h-17.18\r\n\t\t\tc-12.232-0.002-22.183-9.953-22.183-22.185v-60.893c0-7.9,4.25-15.262,11.092-19.211l21.003-12.126l54.583,26.376l7.493,45.693\r\n\t\t\tc-7.793-2.853-16.748-2.37-24.482,2.095l-1.309,0.756L74.826,174.182z M120.246,234.689c1.201,2.082,1.52,4.508,0.898,6.829\r\n\t\t\tc-0.622,2.322-2.111,4.263-4.193,5.464l-16.395,9.465c-4.299,2.48-9.812,1.003-12.294-3.294l-5.66-9.803\r\n\t\t\tc-1.202-2.082-1.521-4.507-0.899-6.829c0.622-2.323,2.111-4.263,4.193-5.465l16.395-9.465c1.414-0.816,2.959-1.204,4.485-1.204\r\n\t\t\tc3.113,0,6.144,1.614,7.809,4.498L120.246,234.689z M304.256,72.311l12.237-7.064c1.387-0.8,2.926-1.209,4.485-1.209\r\n\t\t\tc0.782,0,1.568,0.103,2.344,0.311c2.322,0.622,4.263,2.111,5.464,4.193l11.087,19.203c2.481,4.298,1.003,9.812-3.294,12.293\r\n\t\t\tl-12.237,7.064c-4.295,2.479-9.809,1.004-12.291-3.291l-11.091-19.21C298.483,80.305,299.961,74.792,304.256,72.311z\r\n\t\t\t M284.051,95.31l10.272,17.792l-9.197,5.31l-10.449-17.69L284.051,95.31z M356.001,119.1v21.067l-90.399,19.776l24.013-14.404\r\n\t\t\tc3.375-2.025,5.116-5.729,4.812-9.405l16.195-9.35c2.979,0.998,6.111,1.516,9.271,1.516c4.916,0,9.895-1.25,14.45-3.879\r\n\t\t\tl12.237-7.064c5.573-3.217,9.669-8.018,12.06-13.509C356.936,108.619,356.001,113.752,356.001,119.1z M443.993,52.998\r\n\t\t\tl13.87,20.603h-13.87V52.998z M423.995,52.997v20.604h-13.87L423.995,52.997z M375.998,119.1L375.998,119.1\r\n\t\t\tc0.001-14.061,11.44-25.5,25.501-25.5h64.989c14.061,0,25.5,11.439,25.5,25.5v2.813h-76.335c-5.523,0-9.999,4.477-9.999,9.999\r\n\t\t\tc0,5.523,4.477,9.999,9.999,9.999h76.335v201.877h-115.99V119.1z M491.989,366.6c0,14.061-11.44,25.5-25.501,25.5h-64.989\r\n\t\t\tc-14.061,0-25.5-11.439-25.5-25.5v-2.813h115.99V366.6z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M408.943,182.657c-5.523,0-9.999,4.477-9.999,9.999v71.699c0,5.523,4.477,9.999,9.999,9.999s9.999-4.478,9.999-9.999\r\n\t\t\tv-71.699C418.942,187.133,414.466,182.657,408.943,182.657z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M416.015,297.795c-1.861-1.861-4.441-2.931-7.069-2.931c-2.64,0-5.21,1.07-7.069,2.931c-1.87,1.859-2.93,4.439-2.93,7.068\r\n\t\t\tc0,2.631,1.06,5.21,2.93,7.069c1.86,1.86,4.43,2.93,7.069,2.93c2.63,0,5.21-1.069,7.069-2.93c1.86-1.86,2.93-4.439,2.93-7.069\r\n\t\t\tC418.945,302.233,417.875,299.653,416.015,297.795z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./assets/images/karate icons/kimono.svg




/* harmony default export */ var kimono = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"version":"1.1","id":"svg-kimono-hOphw0R","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","x":"0px","y":"0px","viewBox":"0 0 512.001 512.001","style":"enable-background:new 0 0 512.001 512.001;","xml:space":"preserve"}, rest), ["\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M302.763,160.35c-1.86-1.86-4.439-2.93-7.07-2.93c-2.64,0-5.21,1.07-7.069,2.93c-1.86,1.86-2.931,4.43-2.931,7.07\r\n\t\t\tc0,2.63,1.07,5.21,2.931,7.07c1.859,1.86,4.439,2.93,7.069,2.93c2.631,0,5.21-1.07,7.07-2.93c1.86-1.86,2.93-4.44,2.93-7.07\r\n\t\t\tS304.625,162.21,302.763,160.35z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M511.143,310l-93.46-238.19C410.578,53.701,393.417,42,373.961,42h-5.902L339.266,3.964\r\n\t\t\tC337.377,1.467,334.425,0,331.294,0H175.867c-3.38,0-6.531,1.708-8.377,4.539L143.068,42h-5.029\r\n\t\t\tc-19.454,0-36.615,11.701-43.721,29.811L0.858,310c-1.979,5.041,0.415,10.741,5.399,12.857l82.248,34.928\r\n\t\t\tc1.249,0.53,2.579,0.795,3.909,0.795c1.325,0,2.649-0.263,3.895-0.79c2.495-1.055,4.455-3.077,5.432-5.603l37.04-95.758\r\n\t\t\tl6.117,43.779l-49.781,199.37c-0.746,2.987-0.074,6.151,1.821,8.578c1.895,2.426,4.802,3.845,7.881,3.845h302.107\r\n\t\t\tc3.079,0,5.986-1.418,7.881-3.845c1.896-2.426,2.567-5.591,1.821-8.578l-49.781-199.372l6.212-44.802l37.192,96.765\r\n\t\t\tc0.973,2.531,2.933,4.559,5.43,5.618c1.247,0.529,2.576,0.794,3.904,0.794c1.33,0,2.66-0.265,3.909-0.795l82.248-34.928\r\n\t\t\tC510.727,320.741,513.121,315.042,511.143,310z M313.896,20l-12.84,21.856h-52.72c-5.522,0-10,4.477-10,10c0,5.523,4.478,10,10,10\r\n\t\t\th40.97l-30.374,51.701L194.765,20H313.896z M176.034,28.053l71.708,104.552l-14.099,23.999l-73.008-104.93L176.034,28.053z\r\n\t\t\t M139.691,190.674c-5.47,0.764-9.284,5.818-8.52,11.288l1.92,13.744L86.815,335.339l-63.786-27.088l9.717-24.765l38.158,17.143\r\n\t\t\tc1.33,0.598,2.722,0.881,4.092,0.881c3.816,0,7.462-2.197,9.128-5.904c2.263-5.038,0.014-10.957-5.024-13.22l-39.04-17.539\r\n\t\t\tl72.875-185.731C117.016,68.718,126.87,62,138.039,62h5.416l79.035,113.591l-60.436,102.873l-11.076-79.27\r\n\t\t\tC150.214,193.724,145.152,189.913,139.691,190.674z M292.617,310.75h56.249l5.556,22.25h-61.805\r\n\t\t\tc0.139-1.023,0.217-2.065,0.217-3.125v-16C292.833,312.815,292.755,311.773,292.617,310.75z M272.833,329.875\r\n\t\t\tc0,1.723-1.402,3.125-3.125,3.125h-22.004h-4.246c-1.723,0-3.125-1.402-3.125-3.125v-16c0-1.723,1.402-3.125,3.125-3.125h26.25\r\n\t\t\tc1.723,0,3.125,1.402,3.125,3.125V329.875z M284.772,353l36.219,61.453l-14.073,9.706l-37.154-63.322\r\n\t\t\tc-0.002-0.004-0.004-0.008-0.007-0.011L265.167,353h4.543H284.772z M241.979,353l7.687,13.102l-26.476,45.856l-19.229-11.102\r\n\t\t\tL231.591,353H241.979z M220.552,333h-63.226l5.555-22.25h54.896h0.058h2.717c-0.139,1.023-0.217,2.065-0.217,3.125v16\r\n\t\t\tC220.334,330.935,220.412,331.977,220.552,333z M394.124,492h-276.5l4.994-20h58.752c5.522,0,10-4.477,10-10s-4.478-10-10-10\r\n\t\t\tH127.61l24.72-99h56.166l-26.856,46.517c-2.762,4.783-1.123,10.899,3.66,13.66l36.549,21.102c1.575,0.909,3.294,1.342,4.99,1.341\r\n\t\t\tc3.456,0,6.817-1.793,8.67-5.001l25.795-44.678l33.807,57.62c1.406,2.397,3.747,4.101,6.46,4.702\r\n\t\t\tc0.717,0.159,1.442,0.237,2.165,0.237c2.011,0,3.994-0.607,5.678-1.768l30.598-21.102c4.319-2.979,5.602-8.789,2.938-13.31\r\n\t\t\tL307.987,353h51.429L394.124,492z M425.206,335.33L378.74,214.438l2.958-21.328c0.759-5.471-3.062-10.52-8.532-11.279\r\n\t\t\tc-5.468-0.758-10.52,3.061-11.278,8.532l-13.92,100.388h-78.259h-26.25h-8.206L284,207.269c2.785-4.769,1.176-10.893-3.593-13.678\r\n\t\t\tc-4.773-2.786-10.895-1.175-13.679,3.593l-54.617,93.533l-33.945-0.197l64.423-109.66c0.143-0.207,0.294-0.407,0.422-0.625\r\n\t\t\tl24.638-42.031L332.385,28.01l18.703,24.707l-45.049,77.147c-2.785,4.769-1.176,10.893,3.593,13.678\r\n\t\t\tc1.586,0.926,3.321,1.366,5.033,1.366c3.439,0,6.786-1.775,8.646-4.959L368.828,62h5.133c11.17,0,21.023,6.718,25.104,17.116\r\n\t\t\tl72.875,185.731l-39.04,17.539c-5.038,2.263-7.287,8.182-5.024,13.22c1.666,3.707,5.311,5.904,9.128,5.904\r\n\t\t\tc1.37,0,2.762-0.283,4.092-0.881l38.158-17.143l9.717,24.765L425.206,335.33z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('path', {"d":"M227.693,454.93c-1.86-1.86-4.44-2.93-7.069-2.93c-2.63,0-5.21,1.07-7.07,2.93c-1.86,1.86-2.93,4.44-2.93,7.07\r\n\t\t\ts1.069,5.21,2.93,7.07c1.861,1.86,4.44,2.93,7.07,2.93s5.21-1.07,7.069-2.93c1.86-1.86,2.931-4.44,2.931-7.07\r\n\t\t\tS229.555,456.79,227.693,454.93z"}, []), "\r\n\t"]), "\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n", Object(preact_min["h"])('g', {}, ["\r\n"]), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./assets/icon pack/arrow down.svg




/* harmony default export */ var arrow_down = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 11.2 6.6"}, rest), [Object(preact_min["h"])('path', {"d":"M1.7,0.3l3.9,3.9l3.9-3.9c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L6.3,6.3c-0.4,0.4-1,0.4-1.4,0L0.3,1.7 c-0.4-0.4-0.4-1,0-1.4C0.7-0.1,1.3-0.1,1.7,0.3z"}, [])]);
});;

        
// CONCATENATED MODULE: ./routes/landing/index.js


function landing__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function landing__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function landing__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







// Slideshow images


// Details images



// Karate icons





// Icon pack


var landing__ref = Object(preact_min["h"])(
  'h1',
  null,
  'Pr\xF8v en gratis time!'
);

var landing__ref2 = Object(preact_min["h"])(
  'p',
  null,
  'Du kan f\xE5 en gratis pr\xF8vetime hos \xD8KA.',
  Object(preact_min["h"])('br', null),
  'Bare skriv din e-mail herunder, s\xE5 vil vi kontakte dig!'
);

var landing__ref3 = Object(preact_min["h"])(
  'form',
  null,
  Object(preact_min["h"])('input', { placeholder: 'Skriv din e-mail her', type: 'email' }),
  Object(preact_min["h"])(
    'button',
    { type: 'button' },
    'Indsend'
  )
);

var landing__ref4 = Object(preact_min["h"])('img', { src: image_default.a });

var _ref5 = Object(preact_min["h"])(karate, null);

var _ref6 = Object(preact_min["h"])(karate_2, null);

var _ref7 = Object(preact_min["h"])(martial_arts, null);

var _ref8 = Object(preact_min["h"])(kimono, null);

var _ref9 = Object(preact_min["h"])(
  'span',
  null,
  'G\xE5 til hjemmesiden eller',
  Object(preact_min["h"])('br', null),
  'rul ned for flere detaljer'
);

var _ref10 = Object(preact_min["h"])(arrow_down, null);

var _ref11 = Object(preact_min["h"])(
  'span',
  null,
  'G\xE5 til hjemmesiden for',
  Object(preact_min["h"])('br', null),
  'at f\xE5 flere detaljer'
);

var _ref12 = Object(preact_min["h"])(
  'h1',
  null,
  'Hvad er \xD8KA?'
);

var _ref13 = Object(preact_min["h"])('img', { src: __default.a });

var _ref14 = Object(preact_min["h"])('img', { src: landing_details_2_default.a });

var landing_Landing = function (_Component) {
  landing__inherits(Landing, _Component);

  function Landing() {
    landing__classCallCheck(this, Landing);

    return landing__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Landing.prototype.scrollToDetails = function scrollToDetails() {
    window.scrollTo({
      top: document.scrollingElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  Landing.prototype.render = function render() {
    var _this2 = this;

    return Object(preact_min["h"])(
      'div',
      { 'class': landing_style_default.a.landing, ref: function ref(el) {
          return _this2.el = el;
        } },
      Object(preact_min["h"])(
        'div',
        { 'class': landing_style_default.a.branding },
        Object(preact_min["h"])('img', { src: icon_simple_default.a, 'class': landing_style_default.a.logo }),
        Object(preact_min["h"])(
          'h1',
          { 'class': landing_style_default.a.name },
          '\xD8lstykke Karate Academy'
        )
      ),
      Object(preact_min["h"])(
        'div',
        { 'class': landing_style_default.a['free-class'] },
        landing__ref,
        landing__ref2,
        landing__ref3
      ),
      Object(preact_min["h"])(
        'div',
        { 'class': landing_style_default.a.slideshow },
        landing__ref4
      ),
      Object(preact_min["h"])(
        'div',
        { 'class': landing_style_default.a['red-part'] },
        Object(preact_min["h"])(
          'div',
          { 'class': landing_style_default.a['background-icons'] },
          _ref5,
          _ref6,
          _ref7,
          _ref8
        ),
        Object(preact_min["h"])(
          react_responsive_default.a,
          { minWidth: 601 },
          Object(preact_min["h"])(
            'div',
            { 'class': landing_style_default.a['redirect-page'] },
            Object(preact_min["h"])(
              match["Link"],
              { href: '/', 'class': landing_style_default.a['goto-website'] },
              'G\xE5 til hjemmesiden'
            ),
            _ref9,
            Object(preact_min["h"])(
              'a',
              { href: '#details', onClick: this.scrollToDetails, 'class': landing_style_default.a.arrow, style: 'animation: 5s infinite alternate ' + landing_style_default.a.arrowBop },
              _ref10
            )
          )
        ),
        Object(preact_min["h"])(
          react_responsive_default.a,
          { maxWidth: 600 },
          Object(preact_min["h"])(
            'div',
            { 'class': landing_style_default.a['redirect-page'] },
            _ref11,
            Object(preact_min["h"])(
              match["Link"],
              { href: '/', 'class': landing_style_default.a['goto-website'] },
              'G\xE5 til hjemmesiden'
            )
          )
        ),
        Object(preact_min["h"])(
          'div',
          { 'class': landing_style_default.a['details-page'] },
          Object(preact_min["h"])(
            'div',
            { 'class': landing_style_default.a['left-part'] },
            Object(preact_min["h"])(
              'p',
              { 'class': landing_style_default.a['details-paragraph'] },
              _ref12,
              '\xD8KA\u2019s hoved form\xE5l er at formidle traditionel Shotokan karate efter moderne principper til alle interesserede, uanset k\xF8n, alder eller erfaring med kampsport. I \xD8KA opfatter vi Shotokan Karate som kampkunst, selvforsvar, sport og indre fordybelse.'
            ),
            Object(preact_min["h"])(
              'p',
              { 'class': landing_style_default.a['details-paragraph'] },
              '\xD8KA er et aktivt medlem af Egedal Idr\xE6tsf\xE6llesskab, Shotokan karate International Federation Denmark og Dansk Karate Forbund.'
            )
          ),
          Object(preact_min["h"])('div', { 'class': landing_style_default.a['divider-dots'] }),
          Object(preact_min["h"])(
            'div',
            { 'class': landing_style_default.a['right-part'] },
            Object(preact_min["h"])(
              'div',
              { 'class': landing_style_default.a['details-image'] },
              Object(preact_min["h"])(
                'div',
                { 'class': landing_style_default.a['image-container'] },
                _ref13
              ),
              Object(preact_min["h"])(
                'div',
                { 'class': landing_style_default.a['review-container'] },
                Object(preact_min["h"])(
                  'p',
                  { 'class': landing_style_default.a.review },
                  '"I \xD8lstykke Karate Acedemy er der et godt rigtigt godt f\xE6llesskab!"'
                ),
                Object(preact_min["h"])(
                  'span',
                  { 'class': landing_style_default.a.author },
                  'Thomas'
                )
              )
            ),
            Object(preact_min["h"])(
              'div',
              { 'class': landing_style_default.a['details-image'] },
              Object(preact_min["h"])(
                'div',
                { 'class': landing_style_default.a['image-container'] },
                _ref14
              ),
              Object(preact_min["h"])(
                'div',
                { 'class': landing_style_default.a['review-container'] },
                Object(preact_min["h"])(
                  'p',
                  { 'class': landing_style_default.a.review },
                  '"\xD8lstykke Karate Acedemy er helt klart den bedste klub jeg har v\xE6ret i!"'
                ),
                Object(preact_min["h"])(
                  'span',
                  { 'class': landing_style_default.a.author },
                  'Lars'
                )
              )
            )
          )
        ),
        Object(preact_min["h"])(
          match["Link"],
          { href: '/', 'class': landing_style_default.a['website-link'] },
          'G\xE5 til hjemmesiden'
        )
      )
    );
  };

  return Landing;
}(preact_min["Component"]);

/* harmony default export */ var landing = (landing_Landing);
// EXTERNAL MODULE: ./routes/home/style.sass
var home_style = __webpack_require__("MnIS");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// EXTERNAL MODULE: ./routes/home/section-style.sass
var section_style = __webpack_require__("Iov/");
var section_style_default = /*#__PURE__*/__webpack_require__.n(section_style);

// CONCATENATED MODULE: ./routes/home/section.js


function section__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function section__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function section__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * 
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 * 
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
  // re-use canvas object for better performance
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

var section_Section = function (_Component) {
  section__inherits(Section, _Component);

  function Section(props) {
    section__classCallCheck(this, Section);

    var _this = section__possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = { doubleLined: false };

    _this.handleResize = function () {
      _this.dividerRef.style.width = _this.titleRef.offsetWidth + "px";
    };

    _this.props = props;
    return _this;
  }

  Section.prototype.componentDidMount = function componentDidMount() {
    this.dividerRef.style.width = this.titleRef.offsetWidth + "px";
    window.addEventListener('resize', this.handleResize.bind(this));
  };

  Section.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  };

  Section.prototype.render = function render(props, state) {
    var _this2 = this;

    return Object(preact_min["h"])(
      'div',
      { 'class': section_style_default.a.section },
      Object(preact_min["h"])(
        'div',
        { 'class': section_style_default.a.topContainer },
        Object(preact_min["h"])(
          'h1',
          { title: props.title, 'class': section_style_default.a.postTitle, ref: function ref(e) {
              return _this2.titleRef = e;
            } },
          props.title
        ),
        props.tag == "opslag" ? Object(preact_min["h"])(
          'div',
          { 'class': section_style_default.a.authorDate + ' ' + (state.doubleLined ? section_style_default.a.double : ''), ref: function ref(e) {
              return _this2.infoRef = e;
            } },
          Object(preact_min["h"])(
            match["Link"],
            { 'class': section_style_default.a.author, href: '/profile/' + props.author.id },
            props.author.name
          ),
          Object(preact_min["h"])(
            'span',
            { 'class': section_style_default.a.date },
            props.date
          )
        ) : ""
      ),
      Object(preact_min["h"])(
        'div',
        { 'class': section_style_default.a.divider, ref: function ref(e) {
            return _this2.dividerRef = e;
          } },
        Object(preact_min["h"])(
          'span',
          { 'class': section_style_default.a.dividerTag },
          props.tag
        ),
        Object(preact_min["h"])('div', { 'class': section_style_default.a.dividerLine })
      ),
      Object(preact_min["h"])(
        'div',
        { 'class': section_style_default.a.content },
        props.children
      )
    );
  };

  return Section;
}(preact_min["Component"]);

/* harmony default export */ var section = (section_Section);
// EXTERNAL MODULE: ./components/Side widgets/login.sass
var login = __webpack_require__("dS3x");
var login_default = /*#__PURE__*/__webpack_require__.n(login);

// EXTERNAL MODULE: ./components/checkbox/style.sass
var checkbox_style = __webpack_require__("2cT1");
var checkbox_style_default = /*#__PURE__*/__webpack_require__.n(checkbox_style);

// CONCATENATED MODULE: ./assets/icon pack/checkmark.svg




/* harmony default export */ var checkmark = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 16.8 12.6","style":"fill: none; stroke-width: 2px; stroke: black; stroke-linecap:round; stroke-linejoin:round;"}, rest), [Object(preact_min["h"])('polyline', {"class":[styles && styles["st0"] || "st0"].join(' '),"points":"1,7.3 5.3,11.6 15.8,1 "}, [])]);
});;

        
// CONCATENATED MODULE: ./components/checkbox/index.js


function checkbox__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function checkbox__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function checkbox__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var checkbox_Checkbox = function (_Component) {
  checkbox__inherits(Checkbox, _Component);

  function Checkbox(props) {
    checkbox__classCallCheck(this, Checkbox);

    var _this = checkbox__possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleChange = function (_ref) {
      var target = _ref.target;

      _this.setState({ checked: target.checked });
    };

    _this.state = { checked: props.checked };
    return _this;
  }

  Checkbox.prototype.render = function render(props, _ref2) {
    var checked = _ref2.checked;

    return Object(preact_min["h"])(
      'div',
      { 'class': checkbox_style_default.a.checkbox },
      Object(preact_min["h"])(
        'label',
        { 'for': props.name, 'class': checked ? checkbox_style_default.a.checked : '' },
        Object(preact_min["h"])(checkmark, { 'class': checkbox_style_default.a.checkmark })
      ),
      Object(preact_min["h"])('input', { type: 'checkbox', name: props.name, id: props.name, defaultChecked: props.checked, onClick: this.handleChange })
    );
  };

  return Checkbox;
}(preact_min["Component"]);

;

/* harmony default export */ var components_checkbox = (checkbox_Checkbox);
// CONCATENATED MODULE: ./components/Side widgets/login.js


function login__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function login__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function login__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var login__ref = Object(preact_min["h"])(
  'h2',
  null,
  'Log ind'
);

var login__ref2 = Object(preact_min["h"])('input', { placeholder: 'E-mail', type: 'email' });

var login__ref3 = Object(preact_min["h"])('input', { placeholder: 'Kodeord', type: 'password' });

var login__ref4 = Object(preact_min["h"])(components_checkbox, { name: 'remember', checked: true });

var login__ref5 = Object(preact_min["h"])(
  'button',
  { type: 'button' },
  'Log ind'
);

var login__ref6 = Object(preact_min["h"])(
  'a',
  { href: '#' },
  'Glemt kodeord?'
);

var login__ref7 = Object(preact_min["h"])(
  'a',
  { href: '#' },
  'Opret bruger'
);

var login_LoginWidget = function (_Component) {
  login__inherits(LoginWidget, _Component);

  function LoginWidget() {
    login__classCallCheck(this, LoginWidget);

    return login__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  LoginWidget.prototype.render = function render() {
    return Object(preact_min["h"])(
      'div',
      { 'class': login_default.a.login },
      login__ref,
      login__ref2,
      login__ref3,
      Object(preact_min["h"])(
        'div',
        { 'class': login_default.a.rememberPass },
        login__ref4,
        Object(preact_min["h"])(
          'label',
          { 'for': 'remember', 'class': login_default.a.label },
          'Husk kodeord?'
        )
      ),
      login__ref5,
      Object(preact_min["h"])(
        'div',
        { 'class': login_default.a.links },
        login__ref6,
        Object(preact_min["h"])('div', { 'class': login_default.a.line }),
        login__ref7
      )
    );
  };

  return LoginWidget;
}(preact_min["Component"]);

/* harmony default export */ var Side_widgets_login = (login_LoginWidget);
// CONCATENATED MODULE: ./routes/home/index.js


function home__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function home__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function home__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// Different widgets


var home__ref = Object(preact_min["h"])(
	'p',
	null,
	'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien. Lorem Ipsum har v\xE6ret standard fyldtekst siden 1500-tallet, hvor en ukendt trykker sammensatte en tilf\xE6ldig spalte for at trykke en bog til sammenligning af forskellige skrifttyper. Lorem Ipsum har ikke alene overlevet fem \xE5rhundreder, men har ogs\xE5 vundet indpas i elektronisk typografi uden v\xE6sentlige \xE6ndringer. S\xE6tningen blev gjordt kendt i 1960\'erne med lanceringen af Letraset-ark, som indeholdt afsnit med Lorem Ipsum, og senere med layoutprogrammer som Aldus PageMaker, som ogs\xE5 indeholdt en udgave af Lorem Ipsum.'
);

var home__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae nulla sem. Ut ac luctus lacus. Donec consectetur magna sit amet mollis aliquam. Praesent condimentum, ipsum quis bibendum bibendum, ante massa mollis odio, eget eleifend ex mauris vel nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam sit amet nisi eget elit auctor dictum. Morbi interdum odio eget leo venenatis, ut faucibus tellus suscipit. Mauris molestie est vel lectus pellentesque ultricies. Suspendisse ullamcorper leo in metus malesuada, nec porttitor lacus egestas. Praesent et convallis orci. Morbi ultricies imperdiet vehicula. Nullam sed fringilla leo, a vehicula lorem. Vestibulum commodo, turpis pellentesque ullamcorper convallis, erat nibh varius nisl, in imperdiet dui nisi sagittis urna. Donec ornare aliquam fermentum.'
);

var home__ref3 = Object(preact_min["h"])(Side_widgets_login, null);

var home_Home = function (_Component) {
	home__inherits(Home, _Component);

	function Home() {
		home__classCallCheck(this, Home);

		return home__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Home.prototype.render = function render(props, state) {
		return Object(preact_min["h"])(
			'div',
			{ 'class': home_style_default.a.home },
			Object(preact_min["h"])(
				'h1',
				{ 'class': home_style_default.a.pageTitle },
				'Forside'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': home_style_default.a.content },
				Object(preact_min["h"])(
					'main',
					{ 'class': home_style_default.a.main },
					Object(preact_min["h"])(
						section,
						{ title: 'Hvad er Lorem Ipsum?', tag: 'opslag', author: { id: "7819013694", name: "Sebastian Helt" }, date: '08/12 2018' },
						home__ref
					),
					Object(preact_min["h"])(
						section,
						{ title: 'Det her er Lorem Ipsum', tag: 'opslag', author: { id: "7819013694", name: "Sebastian Helt" }, date: '07/12 2018' },
						home__ref2
					)
				),
				Object(preact_min["h"])(
					'aside',
					{ 'class': home_style_default.a.sidebar },
					home__ref3
				)
			)
		);
	};

	return Home;
}(preact_min["Component"]);

/* harmony default export */ var home = (home_Home);
// EXTERNAL MODULE: ./routes/profile/style.sass
var profile_style = __webpack_require__("Ui6q");
var profile_style_default = /*#__PURE__*/__webpack_require__.n(profile_style);

// CONCATENATED MODULE: ./routes/profile/index.js


function profile__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function profile__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function profile__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var profile_Profile = function (_Component) {
	profile__inherits(Profile, _Component);

	function Profile() {
		var _temp, _this, _ret;

		profile__classCallCheck(this, Profile);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = profile__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			time: Date.now(),
			count: 10
		}, _this.updateTime = function () {
			_this.setState({ time: Date.now() });
		}, _this.increment = function () {
			_this.setState({ count: _this.state.count + 1 });
		}, _temp), profile__possibleConstructorReturn(_this, _ret);
	}

	// update the current time


	// gets called when this route is navigated to
	Profile.prototype.componentDidMount = function componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
	};

	// gets called just before navigating away from the route


	Profile.prototype.componentWillUnmount = function componentWillUnmount() {
		clearInterval(this.timer);
	};

	// Note: `user` comes from the URL, courtesy of our router


	Profile.prototype.render = function render(_ref, _ref2) {
		var user = _ref.user;
		var time = _ref2.time,
		    count = _ref2.count;

		return Object(preact_min["h"])(
			'div',
			{ 'class': profile_style_default.a.profile },
			Object(preact_min["h"])(
				'div',
				{ 'class': profile_style_default.a.content },
				Object(preact_min["h"])(
					'h1',
					null,
					'Profile: ',
					user
				),
				Object(preact_min["h"])(
					'p',
					null,
					'This is the user profile for a user named ',
					user,
					'.'
				),
				Object(preact_min["h"])(
					'div',
					null,
					'Current time: ',
					new Date(time).toLocaleString()
				),
				Object(preact_min["h"])(
					'p',
					null,
					Object(preact_min["h"])(
						'button',
						{ onClick: this.increment },
						'Click Me'
					),
					' ',
					'Clicked ',
					count,
					' times.'
				)
			)
		);
	};

	return Profile;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/om klubben/style.sass
var om_klubben_style = __webpack_require__("mZSN");
var om_klubben_style_default = /*#__PURE__*/__webpack_require__.n(om_klubben_style);

// EXTERNAL MODULE: ./routes/om klubben/sub routes/beliggenhed/style.sass
var beliggenhed_style = __webpack_require__("NdcQ");
var beliggenhed_style_default = /*#__PURE__*/__webpack_require__.n(beliggenhed_style);

// CONCATENATED MODULE: ./routes/om klubben/sub routes/beliggenhed/index.js


function beliggenhed__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function beliggenhed__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function beliggenhed__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var beliggenhed__ref = Object(preact_min["h"])(
  "p",
  null,
  Object(preact_min["h"])(
    "strong",
    null,
    "Tr\xE6ningsadresse:"
  ),
  Object(preact_min["h"])("br", null),
  "Tofteh\xF8jskolen, Frederiksborgvej 4 3650 \xD8lstykke"
);

var beliggenhed__ref2 = Object(preact_min["h"])(
  "p",
  null,
  Object(preact_min["h"])(
    "strong",
    null,
    "Post adresse:"
  ),
  Object(preact_min["h"])("br", null),
  "Co. J\xF8rgen Helt, Kirseb\xE6rv\xE6nget 8 3600 Frederikssund"
);

var beliggenhed_Beliggenhed = function (_Component) {
  beliggenhed__inherits(Beliggenhed, _Component);

  function Beliggenhed() {
    beliggenhed__classCallCheck(this, Beliggenhed);

    return beliggenhed__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Beliggenhed.prototype.render = function render() {
    return Object(preact_min["h"])(
      "div",
      null,
      beliggenhed__ref,
      beliggenhed__ref2,
      Object(preact_min["h"])(
        "div",
        { "class": beliggenhed_style_default.a.mapContainer },
        Object(preact_min["h"])("iframe", { "class": beliggenhed_style_default.a.map, src: "https://maps.google.com/maps?q=%C3%98lstykke%20karate%20academy&t=&z=13&ie=UTF8&iwloc=&output=embed", frameborder: "0", scrolling: "no", marginheight: "0", marginwidth: "0" })
      )
    );
  };

  return Beliggenhed;
}(preact_min["Component"]);

/* harmony default export */ var beliggenhed = (beliggenhed_Beliggenhed);
// CONCATENATED MODULE: ./routes/om klubben/sub routes/klubbens historie/index.js


function klubbens_historie__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function klubbens_historie__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function klubbens_historie__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var klubbens_historie__ref = Object(preact_min["h"])(
  "div",
  null,
  Object(preact_min["h"])(
    "p",
    null,
    "\xD8lstykke shotokan karate-do blev stiftet i Januar 1988 p\xE5 stiftende generalforsamling af ca 25 udbrydere fra Frederikssund Budo klub. Henrik Wagner Jensen 1 Dan var klubbens f\xF8rste Sensei. Via Irina Nemkowa Wulff der har kontakter i kommunen fik vi hurtigt lokaler p\xE5 J\xF8rlunde skole. Efter ca 2 \xE5r rykker vi ned p\xE5 Tofteh\xF8jskolen hvor der er mere plads. Klubbens formand det f\xF8rste \xE5r var Ole Pedersen, hvorefter Martin Frandsen overtog. Ambitionerne var fra starten store og ved klubbens 1 \xE5rs f\xF8dselsdag afholdes det f\xF8rste f\xF8dselsesdag-cup som var et holdst\xE6vne."
  ),
  Object(preact_min["h"])(
    "p",
    null,
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "1989:"
      ),
      " Jesper Wegeberg og Rasmus Borch gradueres 1 Dan, klubbens f\xF8rste sortb\xE6lter. Siden kom der flere til, s\xE5ledes er mere end 50 blevet gradueret 1 Dan siden klubbens start."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "1990:"
      ),
      " blev Michael Holm formand for klubben og med ham fik klubben stabilitet og fremgang de n\xE6ste 10 \xE5r. Samme \xE5r afholder vi S.K.I.F.-cup."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "1992:"
      ),
      " Afholder vi S.K.I.F.-cup igen, da S.K.I.F. mente at vi havde gjort det rigtigt f\xF8rste gang."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "1995:"
      ),
      " Sensei Henrik Wagner Jensen 3 dan tr\xE6der tilbage som chefinstrukt\xF8r for klubben, nye Chefinstrukt\xF8rer bliver Sensei Jesper Wegeberg og Sensei Rasmus Borch."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "1998:"
      ),
      " Klubben har 10 \xE5rs jubil\xE6um det bliver fejret med tr\xE6ning af Sensei Lone Hansen 6 dan og Sensei Kaj Lundager 6 dan med reception og fest bagefter."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2002:"
      ),
      " 6 Januar d\xF8r formand Michael Holm et stort chok for alle, Sensei Jesper Wegeberg overtager formandsposten , s\xE5 der kommer ro og styr p\xE5 tingende, efter et stort stykke arbejde af formanden f\xE5r vi endelig vores eget klublokale hvor vi kan have vores udstyr samt sidde og f\xE5 en t\xE5r at drikke efter tr\xE6ning."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2003:"
      ),
      " Sensei Rasmus Borch tr\xE6der tilbage som chefinstrukt\xF8r grundet familie for\xF8gelse samtidigt udn\xE6vnes han til \xE6resmedlem. Sensei Rasmus tr\xE6ner stadig i klubben. ",
      Object(preact_min["h"])("br", null),
      "Tonny N Jensen udn\xE6vnes til Sensei"
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2004:"
      ),
      " Efter 2 \xE5r p\xE5 formandsposten tr\xE6kker Sensei Jesper sig da han vil koncentrere sig om sit firma. ",
      Object(preact_min["h"])("br", null),
      "Kenneth Christiansen bliver valgt som ny formand."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2006:"
      ),
      " Kenneth Christiansen genv\xE6lges som formand. ",
      Object(preact_min["h"])("br", null),
      "Sensei Jesper Wegeberg tr\xE6der  tilbage som chefinstrukt\xF8r. ",
      Object(preact_min["h"])("br", null),
      "Ny chefinstrukt\xF8r bliver Sensei Tonny N Jensen. ",
      Object(preact_min["h"])("br", null),
      "Sensei Tonny N. Jensen udn\xE6vnes til \xE6resmedlem for sin store indsats i klubben."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2007:"
      ),
      " Sensei Jesper Wegeberg og Sempai Michael Holm (in absentia) udn\xE6vnes til \xE6resmedlemmer for deres store arbejde i klubben."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2008:"
      ),
      " Kenneth Christensen tr\xE6der tilbage som formand, Alfred Kj\xE6ldmand v\xE6lges som ny formand, John Jordan stopper i bestyrelsen efter 15 \xE5rs tro tjeneste. ",
      Object(preact_min["h"])("br", null),
      "Efter forslag fra Kenneth B. Christensen bliver en ny stilart Koryu Uchinadi en del af klubbens tilbud, vi  skifter derefter navn til \xD8lstykke Karate Academy. ",
      Object(preact_min["h"])("br", null),
      "4 Instrukt\xF8rer p\xE5begynder instrukt\xF8ruddannelse i Koryu Uchinadi under ledelse af Sensei Jim Sindt 5 Dan."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2009:"
      ),
      " Finn B Kristensen tr\xE6der tilbage som kasserer efter 18 \xE5rs tro tjeneste, som ny Kasserer v\xE6lges Lasse V. E. Rasmussen som dog efter kort tid m\xE5 tr\xE6kke sig p\xE5 grund af travlhed p\xE5 sit studie, Winnie S\xF8ndergaard overtager derefter posten, efter et \xE5r overtager Finn B. Kristensen igen posten som kasserer. ",
      Object(preact_min["h"])("br", null),
      "Michael Kappel tr\xE6kker sig sig fra bestyrelsen efter mere end 10 \xE5rs tro tjeneste. John Jordan, Finn B Kristensen og Michael Kappel udn\xE6vnes til \xE6resmedlemmer."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2010:"
      ),
      " Alfred Kj\xE6ldmand tr\xE6der tilbage som formand ved generalforsamlingen, Kenneth B. Christiansen v\xE6lges til ny Formand. ",
      Object(preact_min["h"])("br", null),
      "I Oktober p\xE5 Koryu Uchinadi gashuku modtager Sempai Martin V. Johansen, Sempai Lasse V. E. Rassmussen, Sensei Jens L\xF8we N\xF8rregreen og Sensei Tonny N. Jensen efter 2 \xE5rs tr\xE6ning instrukt\xF8rlicens og 1. Dan i Koryu Uchinadi."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2012:"
      ),
      " Generalforsamling, efter kampvalg v\xE6lges Peter W. Nisbeth som ny formand. ",
      Object(preact_min["h"])("br", null),
      "Finn B. Kristensen tr\xE6der tilbage fra kasserer posten efter mere end 20 \xE5rs tro tjeneste, posten varetages derefter af formanden  indtil der findes en l\xF8sning."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2013:"
      ),
      " Generalforsamling, Claus Andersen v\xE6lges til ny formand, Peter Nisbeth v\xE6lges til ny kasserer. \xD8KA fejrer 25 \xE5rs jubil\xE6um med fest og fine taler bla ved Jens J\xF8rgen Nyg\xE5rd, formand for Egedal kommunes kultur og fritidsudvalg, forhenv\xE6rende og nuv\xE6rende medlemmer deltager ved festen."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2014:"
      ),
      " Generalforsamling, Tonny N\xF8rgreen Jensen v\xE6lges til ny formand, J\xF8rgen F.  Helt v\xE6lges til ny kasserer."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2015:"
      ),
      " J\xF8rgen F Helt genv\xE6lges til kasserer med J\xF8rgen p\xE5 posten er der kommet styr p\xE5 \xF8konomien og budgettet."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2016:"
      ),
      " Tonny N\xF8rgreen Jensen genv\xE6lges til formandsposten, 65 er nu blevet gradueret 1. Dan siden klubbens begyndelse i 1988."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2017:"
      ),
      " 11 elever og instrukt\xF8rer rejser til Japan for at tr\xE6ne p\xE5 det \xE5rlige SKIF international seminar  som ligger i marts/april, Sensei Tonny gradueres til Rokudan (6.Dan) p\xE5 den sidste dag p\xE5 seminaret. J\xF8rgen genv\xE6lges til kassererposten p\xE5 generalforsamlingen."
    ),
    Object(preact_min["h"])(
      "p",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "2018:"
      ),
      " Tonny genv\xE6lges til formandsposten p\xE5 generalforsamlingen."
    )
  )
);

var KlubbensHistorie = function (_Component) {
  klubbens_historie__inherits(KlubbensHistorie, _Component);

  function KlubbensHistorie() {
    klubbens_historie__classCallCheck(this, KlubbensHistorie);

    return klubbens_historie__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  KlubbensHistorie.prototype.render = function render() {
    return klubbens_historie__ref;
  };

  return KlubbensHistorie;
}(preact_min["Component"]);

/* harmony default export */ var klubbens_historie = (KlubbensHistorie);
// CONCATENATED MODULE: ./routes/om klubben/index.js


function om_klubben__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function om_klubben__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function om_klubben__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// Different widgets




var om_klubben__ref = Object(preact_min["h"])(
	'h3',
	null,
	'Underkapitler'
);

var om_klubben__ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'Titel'
);

var om_klubben__ref4 = Object(preact_min["h"])(klubbens_historie, null);

var om_klubben__ref6 = Object(preact_min["h"])(klubbens_historie, null);

var om_klubben__ref8 = Object(preact_min["h"])(beliggenhed, null);

var om_klubben__ref9 = Object(preact_min["h"])(Side_widgets_login, null);

var om_klubben_OmKlubben = function (_Component) {
	om_klubben__inherits(OmKlubben, _Component);

	function OmKlubben() {
		var _temp, _this, _ret;

		om_klubben__classCallCheck(this, OmKlubben);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = om_klubben__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.pages = [{ url: 'klubbenshistorie', name: 'Klubbens historie' }, { url: 'beliggenhed', name: 'Beliggenhed' }, { url: 'bestyrelse', name: 'Bestyrelse' }, { url: 'klubbensvedtægter', name: 'Klubbens vedtægter' }, { url: 'dojo-kunordensregler', name: 'Dojo-Kun ordensregler' }, { url: 'tidligereinstruktører', name: 'Tidligere instruktører' }, { url: 'dan-gradergennemtiden', name: 'Dan-grader gennem tiden' }, { url: 'æresmedlemmer', name: 'Æresmedlemmer' }, { url: 'priserogtider', name: 'Priser og tider' }, { url: 'økasprivatlivspolitik', name: 'ØKAs privatlivspolitik' }], _temp), om_klubben__possibleConstructorReturn(_this, _ret);
	}

	OmKlubben.prototype.render = function render(props, state) {
		// if (this.page == null) {
		// 	return <div class={style.home}>
		// 		<h1 class={style.pageTitle}>404</h1>
		// 		<p>Oops, that page does not exist. Use the menu up top to get to another page.</p>
		// 	</div>
		// }

		return Object(preact_min["h"])(
			'div',
			{ 'class': om_klubben_style_default.a.home },
			Object(preact_min["h"])(
				'h1',
				{ 'class': om_klubben_style_default.a.pageTitle },
				'Om klubben'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': om_klubben_style_default.a.content },
				Object(preact_min["h"])(
					'nav',
					{ 'class': om_klubben_style_default.a.navigation },
					Object(preact_min["h"])(
						'div',
						null,
						om_klubben__ref,
						this.pages.map(function (page) {
							return Object(preact_min["h"])(
								preact_router_es["Link"],
								{ activeClassName: om_klubben_style_default.a.active, href: '/omklubben/' + page.url },
								page.name
							);
						})
					)
				),
				Object(preact_min["h"])(
					'main',
					{ 'class': om_klubben_style_default.a.main },
					om_klubben__ref2,
					Object(preact_min["h"])(
						match["Match"],
						{ path: '/omklubben/', exact: true },
						function (_ref3) {
							var matches = _ref3.matches;
							return matches && om_klubben__ref4;
						}
					),
					Object(preact_min["h"])(
						match["Match"],
						{ path: '/omklubben/klubbenshistorie' },
						function (_ref5) {
							var matches = _ref5.matches;
							return matches && om_klubben__ref6;
						}
					),
					Object(preact_min["h"])(
						match["Match"],
						{ path: '/omklubben/beliggenhed' },
						function (_ref7) {
							var matches = _ref7.matches;
							return matches && om_klubben__ref8;
						}
					),
					Object(preact_min["h"])(
						'p',
						null,
						'L\xE6s videre: ',
						Object(preact_min["h"])(
							preact_router_es["Link"],
							{ 'class': om_klubben_style_default.a.readMore, href: '/omklubben/' + this.pages[1].url },
							this.pages[1].name
						)
					)
				),
				Object(preact_min["h"])(
					'aside',
					{ 'class': om_klubben_style_default.a.sidebar },
					om_klubben__ref9
				)
			)
		);
	};

	return OmKlubben;
}(preact_min["Component"]);

/* harmony default export */ var om_klubben = (om_klubben_OmKlubben);
// EXTERNAL MODULE: ./routes/om karate/style.sass
var om_karate_style = __webpack_require__("ByAk");
var om_karate_style_default = /*#__PURE__*/__webpack_require__.n(om_karate_style);

// CONCATENATED MODULE: ./routes/om karate/index.js


function om_karate__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function om_karate__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function om_karate__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




// Different widgets


var om_karate__ref = Object(preact_min["h"])(
	'h2',
	null,
	'Karatens historie'
);

var om_karate__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'Inden for karate er der det samme problem som ogs\xE5 findes inden for alle andre former for kampkunst: Nemlig at der ikke findes noget nedskrevet om hvordan karate opstod og i en lang periode efter findes der kun begr\xE6nset skriftligt materiale om karatens udvikling.Derimod findes der masse skrfitligt materiale op gennem 1900 tallet om karatens historie, som er baseret p\xE5 fort\xE6llinger og meninger, hvilket naturligvis g\xF8r at karatens historie kan variere alt efter hvem der har skrevet den.'
);

var om_karate__ref3 = Object(preact_min["h"])(
	'p',
	null,
	'Derudover har mange omskrevet de fakta som rent faktisk har v\xE6ret tilstede for bevidst eller ubevidst at fremh\xE6ve sig selv. Derfor skal selv denne tekst l\xE6ses med kritiske \xF8jne selv om teksten i st\xF8rst mulig grad er baseret p\xE5 historiske fakta, forskning og konklusioner herfra.'
);

var om_karate__ref4 = Object(preact_min["h"])('hr', null);

var om_karate__ref5 = Object(preact_min["h"])(
	'h5',
	null,
	'Baggrund'
);

var om_karate__ref6 = Object(preact_min["h"])(
	'p',
	null,
	'Blandt dyr og mennesker har der altid fundet kampe sted, enten p\xE5 grund af behov for f\xF8de, territorium eller partner. N\xE5r det g\xE6lder mennesker er metoderne i kamp \xE6ndret i takt med at menneskets intelligens er stedet og herunder opn\xE5et st\xF8rre viden inden for taktik med og uden v\xE5ben.'
);

var om_karate__ref7 = Object(preact_min["h"])(
	'p',
	null,
	'Dette har afstedkommet en konstant udvikling inden for angreb og forsvar. Hvis man g\xE5r tilbage i tiden til civilisationens begyndelse og ser p\xE5 forskellige kulturer s\xE5 findes der ikke meget nedskrevet om civilt selvforsvar. Det har ofte v\xE6ret befolkningen der har f\xF8rt traditionerne videre s\xE5 behovet for at skrive tingene ned har ikke v\xE6ret til stede. Derfor er det meget vanskeligt at vide noget pr\xE6cist om selv forsvarssytemers udvikling, da der kun findes spredte nedskrivninger fra forskellige kilder.'
);

var om_karate__ref8 = Object(preact_min["h"])(
	'p',
	null,
	'Forskellige kulturer har gennem tiden udviklet forskellige m\xE5der at k\xE6mpe p\xE5 alt efter behovet deraf. Kampformerne er blevet spredt via rejsende s\xE5 her igennem har der fundet en udveksling/inspiration sted. Kampformerne har gennem tiden forandret sig og flere er i fredelige tider blevet til en kunstart meget langt fra dets oprindelige brutale form\xE5l.'
);

var om_karate__ref9 = Object(preact_min["h"])(
	'p',
	null,
	'Dog findes der en masse nedskrevet om krigsf\xF8relse gennem tiden, hvilket skyldes behovet for herskere, som skulle dokumentere krige, krigstaktikker og uddannelse af tropper.'
);

var om_karate__ref10 = Object(preact_min["h"])('hr', null);

var om_karate__ref11 = Object(preact_min["h"])(
	'h5',
	null,
	'Karatens historie'
);

var om_karate__ref12 = Object(preact_min["h"])(
	'p',
	null,
	'Den kampform vi i dag kalder karate er udviklet p\xE5 \xF8en Okinawa som ligger syd for Japan. Okinawa har gennem historien v\xE6ret okkuperet og v\xE6ret en provins tilh\xF8rende skiftevis Japan og Kina. Okinawa er den st\xF8rste \xF8 i en \xF8gruppe kaldet Ryukyu \xF8erne.'
);

var om_karate__ref13 = Object(preact_min["h"])(
	'p',
	null,
	'Karate har gennem tiden v\xE6ret under stor indflydelse af kampformer fra blandt andet Kina, Thailand, Japan og Okinawa. Inspirationen fra de forskellige kampformer er dog sket i forskellige tidsperioder og har i sidste ende formet det vi i dag kender som karate. En af de vigtigste inspirationskilder har v\xE6ret Okinawas egen kampform, Tegumi, som er en kampform baseret p\xE5 brydning, balancebrydning og kast. Denne kampform eksisterer dog i dag ikke i sin oprindelige form, mange mener dog at Okinawan Sumo som i s\xE6rdeleshed blev ud\xF8vet i 1800-1900 tallet havde sit udspring fra Tegumi.'
);

var om_karate__ref14 = Object(preact_min["h"])(
	'p',
	null,
	'Sumo brydning p\xE5 Okinawa er meget forskellig fra den sumo brydning vi ser i Japan i dag, faktisk er det kun navnet der er f\xE6lles. Den f\xF8rste indflydelse udefra Okinawa er fra Japan. Da Minamoto Tametomo blev forvist fra Japan med sine tropper, efter et nederlag mod Taira i 1156, til Oshima. Han erobrede efterh\xE5nden Oshima og Izu og fortsatte sydp\xE5 til han n\xE5ede Ryukyu \xF8erne, hvor han efter et stykke tid blev herre over Urazoe. Der fik han en s\xF8n, Shunten, som blev den f\xF8rste konge efter Tenson dynastiet.'
);

var _ref15 = Object(preact_min["h"])(
	'p',
	null,
	'I 1372 sendte den kinesiske kejser er repr\xE6sentant til Ryukyu \xF8erne for at opn\xE5 en alliance. Dette var starten gradueret p\xE5 de f\xF8rste kinesiske bos\xE6ttelser som fandt sted p\xE5 Okinawa i 1393. Det drejede sig om 36 familier. Disse familier bosatte sig i byen Kume, som er en del af byen Naha, og blev kaldt vinduet mod den kinesiske kultur. Mange anser Chuan-fa (ogs\xE5 kaldet gong-fu) at v\xE6re en del af de kundskaber de medbragte.'
);

var _ref16 = Object(preact_min["h"])(
	'p',
	null,
	'De f\xF8rste nedskrivninger om karate findes hos forfatteren og filosoffen Teijunsoku Uekta (1663-1734) som skrev \u201D Det spiller ingen rolle hvordan du behersker Te (karate) eller dine studier, der vigtigste er hvordan du opf\xF8rer dig og din medmenneskelighed i dagligdagen\u201D.'
);

var _ref17 = Object(preact_min["h"])(
	'p',
	null,
	'I 1762 bl\xE6ste et skib fra Okinawa til Satsuma ud af kurs og strandede p\xE5 Oshimas strand. Her blev Tobe Ryoen udset til at nedskrive vidnesberetninger fra bes\xE6tningen og passagerene. Under denne diskussion n\xE6vnte kaptajnen Shiohira Pechin, en kineser ved navn Kusankun. Shiohira beskrev hvordan Kusankun forsvarede sig imod st\xF8rre modstandere ved at anvende sig af kumiaijutsu og f\xE6lde modstanderen ved at sakse deres ben (hasami waza).'
);

var _ref18 = Object(preact_min["h"])(
	'p',
	null,
	'Man ved ikke om Kusankun var en persons navn eller om det var en titel som indehaves af et kinesisk sendebud. En mundtlig tradition p\xE5 Okinawa siger at Kusankun skulle v\xE6re l\xE6rer til blanvt andet Sakugawa Pechin, som anses for at have haft stor indflydelse p\xE5 karatens udvikling. Beretningen om det strandede skib er kendt som Oshima Hikki eller Oshima beretningen.'
);

var _ref19 = Object(preact_min["h"])(
	'p',
	null,
	'Sakugawa som blev f\xF8dt i slutningen af 1700 tallet var en af de f\xF8rste navngivne personer fra Okinawa som tr\xE6nede i Kina, men der er stor sandsynlighed for at han ikke var den f\xF8rste. Man ved at der efterf\xF8lgende er rejst et stort antal personer til Kina for at delvist eller helt at fordybe sig i Chuan-fa.'
);

var _ref20 = Object(preact_min["h"])(
	'p',
	null,
	'Alt som blev l\xE6rt i Kina blev blandet med de kampformer der i forvejen blev tr\xE6net p\xE5 Okinawa. Mange ud\xF8vere i dag siger, at deres stilartsmester var den kinesiske mesters bedste elev, som senere arvede den kinesiske mesters stilart. Dette kan dog ikke tages seri\xF8st af flere \xE5rsager. Racismen mod Okinawanerne var stor i Kina og de rejsende som kom fra Okinawa fik formentlig ikke l\xE6rt sig tilstr\xE6kkeligt, idet l\xE6rerene vidste at de efter kort tid skulle rejse tilbage til Okinawa. S\xE5 efter nogle \xE5r har de formentlig kun f\xE5et l\xE6rt grund\xF8velserne og m\xE5ttet n\xF8jes med dette. L\xE6rerne var mere interesseret i at l\xE6re en eller to personer op p\xE5 holdet for at f\xF8re traditionen videre, hvilket gik ud over de andre p\xE5 holdet.'
);

var _ref21 = Object(preact_min["h"])(
	'p',
	null,
	'Ingen som kom tilbage fra Kina forebeholdt sig retten til at kalde deres system f.eks White Crane, Tiger boxing eller lignende, hvilket ville have v\xE6ret naturligt hvis de havde f\xE5et den \xE6re at arve en stil. Dette tyder p\xE5, der ikke var tale om topud\xF8vere selv om de sikkert har v\xE6ret seri\xF8se.'
);

var _ref22 = Object(preact_min["h"])(
	'p',
	null,
	'Man har p\xE5 Okinawa heller ikke fundet nogen stil som helt ligner nogen kendt stil fra Kina, hvorfor de m\xE5 v\xE6re blandet sammen med Tegumi eller andre stilarter.'
);

var _ref23 = Object(preact_min["h"])(
	'p',
	null,
	'Frem til slutnigen af 1800-tallet blev karate tr\xE6net af et f\xE5tal af personer som ofte besad en h\xF8j position i samfundet. At karate skulle have v\xE6ret tr\xE6net af b\xF8nder er ikke sandt eller s\xE6rlig sandsynligt. Alle karate mestre man i dag kender til havde en h\xF8jtst\xE5ende position i samfundet. Ofte af Pechin klassen hvilket svarer til den Japanske Samurai.'
);

var _ref24 = Object(preact_min["h"])(
	'p',
	null,
	'I 1867 blev der afholdt en festival i Shuri\xB4s Ochayagoten for at fejre Zhao Xin, som var den sidste ambassad\xF8r der bes\xF8gte Okinawa imens det stadig tilh\xF8rte Kina. Under denne festival blev der for f\xF8rste gang lavet en officiel opvisning af karate p\xE5 Okinawa, sammen med opvisnigner af andre ubev\xE6bnede og stilarter med v\xE5ben.'
);

var _ref25 = Object(preact_min["h"])(
	'p',
	null,
	'Set ud fra et karate historisk perspektiv er en af de interessante dele demonstrationerne af kata. Blandt andet blev en kata ved navn Suparinpei vist ved denne lejlighed. Opvisningen fandt sted f\xF8r Higashionna Kanryo rejste til Kina og i f\xF8lge karatestilarten Goju-ryu\xB4s officielle historie introducerede han Suparinpei og andre kata til Okinawa.'
);

var _ref26 = Object(preact_min["h"])(
	'p',
	null,
	'I slutningen af 1899 tallet begyndte Itosu Ankoh og en gruppe mennesket en kampagne for at popularisere Okinawa hos Japanerne som p\xE5 det tidspunkt styrede Okinawa. Itosu Senseis v\xE6rkt\xF8j var en af de f\xE5 ting som var unikke for Okinawa: Karate.'
);

var _ref27 = Object(preact_min["h"])(
	'p',
	null,
	'Japan var i gang med at opruste til krig og Itosu s\xE5 en lejlighed til at lade Okinawa g\xF8re en indsats for at f\xE5 goodwill i Japanernes \xF8jne. Hvis Okinawa kunne stille med st\xE6rke, udholdende soldater til Japans arm\xE9, s\xE5 kunne Okinawas rygte blive forbedret. For at dette skulle kunne lykkedes skulle karate indf\xF8res i skolerne p\xE5 Okinawa. Itosu forandrede kata ved at tage alle de farlige teknikker ud af kataerne for at g\xF8re det mere t\xE5leligt for for\xE6ldre og skolerne. Det vigtigste var ikke at l\xE6re eleverne karate efter de gamle principper men i stedet anvende dele af karate som et middel for at tr\xE6ne eleverne i disciplin og fysisk aktivitet. Alt dette med henblik p\xE5 at kunne l\xE6gge fundamentet til en st\xE6rk h\xE6r og g\xF8re reklame for Okinawa.'
);

var _ref28 = Object(preact_min["h"])(
	'p',
	null,
	'Problemet var at strukturen i tr\xE6ningen ikke fulgte med og det kr\xE6vede lang tid at tr\xE6ne soldater op med de metoder og det Japanske krigsminesterium ville ikke acceptere karate som en tr\xE6ningsmetode for sine soldater. Nogle af studenterne p\xE5 Okinawa som havde l\xE6rt karate i skolen begyndte efter studierne at undervise i karate. Efterh\xE5nden blev det til mange og fordi de var flere end de oprindelige karatemestre, som kun havde l\xE6rt karate efter den gamle m\xE5de, blev gennemslagskraften for \u201Cden nye karate\u201D langt st\xF8rre end blandt de gamle mestres.'
);

var _ref29 = Object(preact_min["h"])(
	'p',
	null,
	'Denne karate blev spredt til JApan i 1917, hvor den for f\xF8rste gang blev officiclet demonstreret i Japan af Matayoshi Shinko og Funakoshi Gichin.'
);

var _ref30 = Object(preact_min["h"])(
	'p',
	null,
	'Nogen af de mest kendte ud\xF8vere som tog karate til Japan var Funakoshi Gichin, Mabuni Kenwa og Miyagi Chojun og deres elever er \xE5rsagen til de st\xF8rtste stilarter som tr\xE6nes i dag (Shotokan, Shito-ryu og Goju-ryu).'
);

var _ref31 = Object(preact_min["h"])(
	'p',
	null,
	'Et af knudepunkterne for at kunne udbrede karate i Japan var universiteterne, hvor instrukt\xF8rerne arbejdede h\xE5rdt for at f\xE5 karate godkendt som en fysisk aktivitet.'
);

var _ref32 = Object(preact_min["h"])(
	'p',
	null,
	'Mange andre Okinawanere udbredte ogs\xE5 karate i Japan men deres navn er ikke lige s\xE5 kendt, selvom de havde stor viden. Frem til 1936 var karate mest kendt under navnet Te, Di, Tuide eller lignende stavem\xE5der, undtagen var en tekst skrevet af Hanashiro Chomo i 1905 hvor for f\xF8rste gang anvender ideogrammtet der l\xE6ses som Karate.'
);

var _ref33 = Object(preact_min["h"])(
	'p',
	null,
	'I 1936 blev der afholdt et m\xF8de p\xE5 Okinawa med de mest kendte og indflydelsesrige mestrer i et fors\xF8g p\xE5 at strukturere karate s\xE5ledes at det kunne spredes rundt omkring i verden.'
);

var _ref34 = Object(preact_min["h"])(
	'p',
	null,
	'De tilstedev\xE6rende var Hanshiro Chomo, Kyan Chotoku, Motobu Choki, Chibana Chosin, Kiyoda Juhatsu, Miyagi Chojun, Gusukuma Shimpan samt Nahasone Genwa og et antal personer som repr\xE6senterede medier og regeringen p\xE5 Okinawa. En af de vigtigste beslutninger under m\xF8det var at kalde formen Karate-do. I Japan havde Nippon Butokukai allerede i 1933 sl\xE5et fast at formen skulle hedde Karate-do.'
);

var _ref35 = Object(preact_min["h"])(
	'p',
	null,
	'Den st\xF8rste \xE5rsag til sprednigen af karate rundt omkring i verden var de amerikanske baser som voksede op p\xE5 Okinawa efter 2. verdenskrig, hovr amerikanske soldater fik tr\xE6ning i blandt andet karate, ju-jutsu og judo som en del af deres uddannelse. En del soldater tr\xE6nede ogs\xE5 i deres fritid i de forskellige dojoer p\xE5 Okinawa.'
);

var _ref36 = Object(preact_min["h"])(
	'p',
	null,
	'Da de rejste hjem til USA forsatte en del med at tr\xE6ne og nogen begyndte at undervise. En af de tidligste pionerer var Robert Trias som gjorde et stort stykke arbejde for at popularisere karaten i USA. Karate spredtes senere til resten af verden og kan i dag findes i de fleste lande.'
);

var _ref37 = Object(preact_min["h"])(
	'p',
	null,
	'Ovenn\xE6vnte indblik i karatens historie er p\xE5 ingen m\xE5de fuldst\xE6ndig men giver et indblik i hvor kompliceret historien er.'
);

var _ref38 = Object(preact_min["h"])(Side_widgets_login, null);

var om_karate_OmKarate = function (_Component) {
	om_karate__inherits(OmKarate, _Component);

	function OmKarate() {
		om_karate__classCallCheck(this, OmKarate);

		return om_karate__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	OmKarate.prototype.render = function render(props, state) {
		return Object(preact_min["h"])(
			'div',
			{ 'class': om_karate_style_default.a.home },
			Object(preact_min["h"])(
				'h1',
				{ 'class': om_karate_style_default.a.pageTitle },
				'Om karate'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': om_karate_style_default.a.content },
				Object(preact_min["h"])(
					'main',
					{ 'class': om_karate_style_default.a.main },
					om_karate__ref,
					om_karate__ref2,
					om_karate__ref3,
					om_karate__ref4,
					om_karate__ref5,
					om_karate__ref6,
					om_karate__ref7,
					om_karate__ref8,
					om_karate__ref9,
					om_karate__ref10,
					om_karate__ref11,
					om_karate__ref12,
					om_karate__ref13,
					om_karate__ref14,
					_ref15,
					_ref16,
					_ref17,
					_ref18,
					_ref19,
					_ref20,
					_ref21,
					_ref22,
					_ref23,
					_ref24,
					_ref25,
					_ref26,
					_ref27,
					_ref28,
					_ref29,
					_ref30,
					_ref31,
					_ref32,
					_ref33,
					_ref34,
					_ref35,
					_ref36,
					_ref37
				),
				Object(preact_min["h"])(
					'aside',
					{ 'class': om_karate_style_default.a.sidebar },
					_ref38
				)
			)
		);
	};

	return OmKarate;
}(preact_min["Component"]);

/* harmony default export */ var om_karate = (om_karate_OmKarate);
// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







// Code-splitting is automated for routes






var app__ref2 = Object(preact_min["h"])(landing, { path: '/landing/' });

var app__ref3 = Object(preact_min["h"])(home, { path: '/' });

var app__ref4 = Object(preact_min["h"])(om_karate, { path: '/omkarate/' });

var app__ref5 = Object(preact_min["h"])(om_klubben, { path: '/omklubben/', page: 'klubbenshistorie' });

var app__ref6 = Object(preact_min["h"])(om_klubben, { path: '/omklubben/:page' });

var app__ref7 = Object(preact_min["h"])(profile_Profile, { path: '/profile/', user: 'me' });

var app__ref8 = Object(preact_min["h"])(profile_Profile, { path: '/profile/:user' });

var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App() {
		app__classCallCheck(this, App);

		var _this = app__possibleConstructorReturn(this, _Component.call(this));

		_this.handleRoute = function (e) {
			_this.setState({ currentUrl: e.url });
		};

		_this.state.currentUrl = "";
		return _this;
	}

	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render(props, _ref) {
		var currentUrl = _ref.currentUrl;

		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			Object(preact_min["h"])(Helmet_default.a, {
				htmlAttributes: { lang: "da", amp: undefined },
				title: '\xD8lstykke Karate Academy'
			}),
			Object(preact_min["h"])(header, { visible: !currentUrl.includes('/landing') }),
			Object(preact_min["h"])(
				preact_router_es["Router"],
				{ onChange: this.handleRoute },
				app__ref2,
				app__ref3,
				app__ref4,
				app__ref5,
				app__ref6,
				app__ref7,
				app__ref8
			),
			Object(preact_min["h"])(footer, { visible: !currentUrl.includes('/landing') })
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js




/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    null != e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "MnIS":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__2jCaU","pageTitle":"pageTitle__239dl","content":"content__iW-M1","main":"main__mu6mk","navigation":"navigation__2SnyR","active":"active__O9jYI","sidebar":"sidebar__3o25Q","readMore":"readMore__1D_io"};

/***/ }),

/***/ "NdcQ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"mapContainer":"mapContainer__1LPHv","map":"map__1eJ_F"};

/***/ }),

/***/ "OWwF":
/***/ (function(module, exports) {

var supportsArgumentsClass = function () {
  return Object.prototype.toString.call(arguments);
}() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object) {
  return object && typeof object == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
};

/***/ }),

/***/ "Qxat":
/***/ (function(module, exports) {

exports.__esModule = true;
var TAG_NAMES = exports.TAG_NAMES = {
    HTML: "htmlAttributes",
    TITLE: "title",
    BASE: "base",
    META: "meta",
    LINK: "link",
    SCRIPT: "script",
    NOSCRIPT: "noscript",
    STYLE: "style"
};

var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
    NAME: "name",
    CHARSET: "charset",
    HTTPEQUIV: "http-equiv",
    REL: "rel",
    HREF: "href",
    PROPERTY: "property",
    SRC: "src",
    INNER_HTML: "innerHTML",
    CSS_TEXT: "cssText",
    ITEM_PROP: "itemprop"
};

var PREACT_TAG_MAP = exports.PREACT_TAG_MAP = {
    "charset": "charSet",
    "http-equiv": "httpEquiv",
    "itemprop": "itemProp",
    "class": "className"
};

/***/ }),

/***/ "UOI8":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cacf1f3beb598e2e5fd2807e5c06458b.png";

/***/ }),

/***/ "Ui6q":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"profile":"profile__6_GoO","content":"content__u_KRz"};

/***/ }),

/***/ "XY+s":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Z5Am":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"redirect-page":"redirect-page__2J858","goto-website":"goto-website__238Bj","website-link":"website-link__2TAET","free-class":"free-class__blUdd","landing":"landing__3Zssh","branding":"branding__1GIik","name":"name__1aOcn","logo":"logo__aO2iM","slideshow":"slideshow__1yqci","red-part":"red-part__CFSQr","background-icons":"background-icons__2lw6U","arrow":"arrow__1scnR","details-page":"details-page__1E9Pq","left-part":"left-part__35p7v","details-paragraph":"details-paragraph__21Ley","right-part":"right-part__1c873","details-image":"details-image__3jE-q","image-container":"image-container__2vCCo","review-container":"review-container__3Vg4h","review":"review__2hxth","author":"author__3Lhzc","divider-dots":"divider-dots__3H1TD","arrowBop":"arrowBop__2Ewjl"};

/***/ }),

/***/ "bP4d":
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

!function (root, factory) {
     true ? module.exports = factory(__webpack_require__("eW0v")) : "function" == typeof define && define.amd ? define(["react"], factory) : "object" == typeof exports ? exports.MediaQuery = factory(require("react")) : root.MediaQuery = factory(root.react);
}("undefined" != typeof self ? self : this, function (__WEBPACK_EXTERNAL_MODULE_5__) {
    return function (modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function (exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.n = function (module) {
            var getter = module && module.__esModule ? function () {
                return module.default;
            } : function () {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 4);
    }([function (module, exports, __webpack_require__) {
        var REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
            isValidElement = function isValidElement(object) {
            return "object" == typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        };
        module.exports = __webpack_require__(6)(isValidElement, !0);
    }, function (module, exports, __webpack_require__) {
        "use strict";

        module.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function hyphenateStyleName(string) {
            return string in cache ? cache[string] : cache[string] = string.replace(uppercasePattern, "-$&").toLowerCase().replace(msPattern, "-ms-");
        }
        var uppercasePattern = /[A-Z]/g,
            msPattern = /^ms-/,
            cache = {};
        module.exports = hyphenateStyleName;
    }, function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        function _objectSpread(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = null != arguments[i] ? arguments[i] : {},
                    ownKeys = Object.keys(source);
                "function" == typeof Object.getOwnPropertySymbols && (ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }))), ownKeys.forEach(function (key) {
                    _defineProperty(target, key, source[key]);
                });
            }
            return target;
        }
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(0),
            __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__),
            stringOrNumber = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number]),
            matchers = {
            orientation: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOf(["portrait", "landscape"]),
            scan: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOf(["progressive", "interlace"]),
            aspectRatio: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
            deviceAspectRatio: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
            height: stringOrNumber,
            deviceHeight: stringOrNumber,
            width: stringOrNumber,
            deviceWidth: stringOrNumber,
            color: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            colorIndex: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            monochrome: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            resolution: stringOrNumber
        },
            features = _objectSpread({
            minAspectRatio: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
            maxAspectRatio: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
            minDeviceAspectRatio: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
            maxDeviceAspectRatio: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
            minHeight: stringOrNumber,
            maxHeight: stringOrNumber,
            minDeviceHeight: stringOrNumber,
            maxDeviceHeight: stringOrNumber,
            minWidth: stringOrNumber,
            maxWidth: stringOrNumber,
            minDeviceWidth: stringOrNumber,
            maxDeviceWidth: stringOrNumber,
            minColor: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
            maxColor: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
            minColorIndex: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
            maxColorIndex: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
            minMonochrome: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
            maxMonochrome: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
            minResolution: stringOrNumber,
            maxResolution: stringOrNumber
        }, matchers),
            types = {
            all: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            grid: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            aural: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            braille: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            handheld: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            print: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            projection: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            screen: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            tty: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            tv: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
            embossed: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool
        },
            all = _objectSpread({}, types, features);
        matchers.type = Object.keys(types), __webpack_exports__.a = {
            all: all,
            types: types,
            matchers: matchers,
            features: features
        };
    }, function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            })(obj);
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Constructor;
        }
        function _possibleConstructorReturn(self, call) {
            return !call || "object" !== _typeof(call) && "function" != typeof call ? _assertThisInitialized(self) : call;
        }
        function _getPrototypeOf(o) {
            return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) {
                return o.__proto__ || Object.getPrototypeOf(o);
            })(o);
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
            return (_setPrototypeOf = Object.setPrototypeOf || function (o, p) {
                return o.__proto__ = p, o;
            })(o, p);
        }
        function _assertThisInitialized(self) {
            if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return self;
        }
        function _objectSpread(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = null != arguments[i] ? arguments[i] : {},
                    ownKeys = Object.keys(source);
                "function" == typeof Object.getOwnPropertySymbols && (ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }))), ownKeys.forEach(function (key) {
                    _defineProperty(target, key, source[key]);
                });
            }
            return target;
        }
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        }), __webpack_require__.d(__webpack_exports__, "default", function () {
            return MediaQuery;
        });
        var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5),
            __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__),
            __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(0),
            __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__),
            __WEBPACK_IMPORTED_MODULE_2_matchmediaquery__ = __webpack_require__(9),
            __WEBPACK_IMPORTED_MODULE_2_matchmediaquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_matchmediaquery__),
            __WEBPACK_IMPORTED_MODULE_3_hyphenate_style_name__ = __webpack_require__(2),
            __WEBPACK_IMPORTED_MODULE_3_hyphenate_style_name___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_hyphenate_style_name__),
            __WEBPACK_IMPORTED_MODULE_4__mediaQuery__ = __webpack_require__(3),
            __WEBPACK_IMPORTED_MODULE_5__toQuery__ = __webpack_require__(11);
        __webpack_require__.d(__webpack_exports__, "toQuery", function () {
            return __WEBPACK_IMPORTED_MODULE_5__toQuery__.a;
        });
        var defaultTypes = {
            component: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
            query: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
            values: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape(__WEBPACK_IMPORTED_MODULE_4__mediaQuery__.a.matchers),
            children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func]),
            onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
        },
            excludedQueryKeys = Object.keys(defaultTypes),
            omit = function omit(object, keys) {
            var newObject = _objectSpread({}, object);
            return keys.forEach(function (key) {
                return delete newObject[key];
            }), newObject;
        },
            getValues = function getValues(_ref) {
            var _ref$values = _ref.values,
                values = void 0 === _ref$values ? {} : _ref$values;
            return Object.keys(values).reduce(function (result, key) {
                return result[__WEBPACK_IMPORTED_MODULE_3_hyphenate_style_name___default()(key)] = values[key], result;
            }, {});
        },
            getQuery = function getQuery(props) {
            return props.query || Object(__WEBPACK_IMPORTED_MODULE_5__toQuery__.a)(omit(props, excludedQueryKeys));
        },
            createMatchMedia = function createMatchMedia(props, query) {
            var values = getValues(props),
                forceStatic = 0 === values.length;
            return __WEBPACK_IMPORTED_MODULE_2_matchmediaquery___default()(query, values, forceStatic);
        },
            MediaQuery = function (_React$Component) {
            function MediaQuery() {
                var _getPrototypeOf2, _this;
                _classCallCheck(this, MediaQuery);
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }return _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MediaQuery)).call.apply(_getPrototypeOf2, [this].concat(args))), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
                    matches: !1,
                    mq: null,
                    query: ""
                }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cleanupMediaQuery", function (mq) {
                    mq && (mq.removeListener(_this.updateMatches), mq.dispose());
                }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateMatches", function () {
                    _this._unmounted || _this.state.mq.matches !== _this.state.matches && _this.setState({
                        matches: _this.state.mq.matches
                    });
                }), _this;
            }
            return _inherits(MediaQuery, _React$Component), _createClass(MediaQuery, [{
                key: "componentDidMount",
                value: function value() {
                    this.state.mq.addListener(this.updateMatches), this.updateMatches();
                }
            }, {
                key: "componentDidUpdate",
                value: function value(prevProps, prevState) {
                    this.state.mq !== prevState.mq && (this.cleanupMediaQuery(prevState.mq), this.state.mq.addListener(this.updateMatches)), this.props.onChange && prevState.matches !== this.state.matches && this.props.onChange(this.state.matches);
                }
            }, {
                key: "componentWillUnmount",
                value: function value() {
                    this._unmounted = !0, this.cleanupMediaQuery(this.state.mq);
                }
            }, {
                key: "render",
                value: function value() {
                    return "function" == typeof this.props.children ? this.props.children(this.state.matches) : this.state.matches ? this.props.children : null;
                }
            }], [{
                key: "getDerivedStateFromProps",
                value: function value(props, state) {
                    var query = getQuery(props);
                    if (!query) throw new Error("Invalid or missing MediaQuery!");
                    if (query === state.query) return null;
                    var mq = createMatchMedia(props, query);
                    return {
                        matches: mq.matches,
                        mq: mq,
                        query: query
                    };
                }
            }]), MediaQuery;
        }(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);
        _defineProperty(MediaQuery, "displayName", "MediaQuery"), _defineProperty(MediaQuery, "defaultProps", {
            values: {}
        });
    }, function (module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_5__;
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function emptyFunctionThatReturnsNull() {
            return null;
        }
        var assign = __webpack_require__(7),
            ReactPropTypesSecret = __webpack_require__(1),
            checkPropTypes = __webpack_require__(8),
            printWarning = function printWarning() {};
        printWarning = function printWarning(text) {
            var message = "Warning: " + text;
            "undefined" != typeof console && console.error(message);
            try {
                throw new Error(message);
            } catch (x) {}
        }, module.exports = function (isValidElement, throwOnDirectAccess) {
            function getIteratorFn(maybeIterable) {
                var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
                if ("function" == typeof iteratorFn) return iteratorFn;
            }
            function is(x, y) {
                return x === y ? 0 !== x || 1 / x == 1 / y : x !== x && y !== y;
            }
            function PropTypeError(message) {
                this.message = message, this.stack = "";
            }
            function createChainableTypeChecker(validate) {
                function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
                    if (componentName = componentName || ANONYMOUS, propFullName = propFullName || propName, secret !== ReactPropTypesSecret) {
                        if (throwOnDirectAccess) {
                            var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
                            throw err.name = "Invariant Violation", err;
                        }
                        if ("undefined" != typeof console) {
                            var cacheKey = componentName + ":" + propName;
                            !manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3 && (printWarning("You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."), manualPropTypeCallCache[cacheKey] = !0, manualPropTypeWarningCount++);
                        }
                    }
                    return null == props[propName] ? isRequired ? new PropTypeError(null === props[propName] ? "The " + location + " `" + propFullName + "` is marked as required in `" + componentName + "`, but its value is `null`." : "The " + location + " `" + propFullName + "` is marked as required in `" + componentName + "`, but its value is `undefined`.") : null : validate(props, propName, componentName, location, propFullName);
                }
                var manualPropTypeCallCache = {},
                    manualPropTypeWarningCount = 0,
                    chainedCheckType = checkType.bind(null, !1);
                return chainedCheckType.isRequired = checkType.bind(null, !0), chainedCheckType;
            }
            function createPrimitiveTypeChecker(expectedType) {
                function validate(props, propName, componentName, location, propFullName, secret) {
                    var propValue = props[propName];
                    if (getPropType(propValue) !== expectedType) return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + getPreciseType(propValue) + "` supplied to `" + componentName + "`, expected `" + expectedType + "`.");
                    return null;
                }
                return createChainableTypeChecker(validate);
            }
            function createArrayOfTypeChecker(typeChecker) {
                function validate(props, propName, componentName, location, propFullName) {
                    if ("function" != typeof typeChecker) return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
                    var propValue = props[propName];
                    if (!Array.isArray(propValue)) {
                        return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + getPropType(propValue) + "` supplied to `" + componentName + "`, expected an array.");
                    }
                    for (var i = 0; i < propValue.length; i++) {
                        var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
                        if (error instanceof Error) return error;
                    }
                    return null;
                }
                return createChainableTypeChecker(validate);
            }
            function createInstanceTypeChecker(expectedClass) {
                function validate(props, propName, componentName, location, propFullName) {
                    if (!(props[propName] instanceof expectedClass)) {
                        var expectedClassName = expectedClass.name || ANONYMOUS;
                        return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + getClassName(props[propName]) + "` supplied to `" + componentName + "`, expected instance of `" + expectedClassName + "`.");
                    }
                    return null;
                }
                return createChainableTypeChecker(validate);
            }
            function createEnumTypeChecker(expectedValues) {
                function validate(props, propName, componentName, location, propFullName) {
                    for (var propValue = props[propName], i = 0; i < expectedValues.length; i++) {
                        if (is(propValue, expectedValues[i])) return null;
                    }return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + propValue + "` supplied to `" + componentName + "`, expected one of " + JSON.stringify(expectedValues) + ".");
                }
                return Array.isArray(expectedValues) ? createChainableTypeChecker(validate) : (printWarning("Invalid argument supplied to oneOf, expected an instance of array."), emptyFunctionThatReturnsNull);
            }
            function createObjectOfTypeChecker(typeChecker) {
                function validate(props, propName, componentName, location, propFullName) {
                    if ("function" != typeof typeChecker) return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
                    var propValue = props[propName],
                        propType = getPropType(propValue);
                    if ("object" !== propType) return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` supplied to `" + componentName + "`, expected an object.");
                    for (var key in propValue) {
                        if (propValue.hasOwnProperty(key)) {
                            var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                            if (error instanceof Error) return error;
                        }
                    }return null;
                }
                return createChainableTypeChecker(validate);
            }
            function createUnionTypeChecker(arrayOfTypeCheckers) {
                function validate(props, propName, componentName, location, propFullName) {
                    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                        if (null == (0, arrayOfTypeCheckers[i])(props, propName, componentName, location, propFullName, ReactPropTypesSecret)) return null;
                    }
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to `" + componentName + "`.");
                }
                if (!Array.isArray(arrayOfTypeCheckers)) return printWarning("Invalid argument supplied to oneOfType, expected an instance of array."), emptyFunctionThatReturnsNull;
                for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                    var checker = arrayOfTypeCheckers[i];
                    if ("function" != typeof checker) return printWarning("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."), emptyFunctionThatReturnsNull;
                }
                return createChainableTypeChecker(validate);
            }
            function createShapeTypeChecker(shapeTypes) {
                function validate(props, propName, componentName, location, propFullName) {
                    var propValue = props[propName],
                        propType = getPropType(propValue);
                    if ("object" !== propType) return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` supplied to `" + componentName + "`, expected `object`.");
                    for (var key in shapeTypes) {
                        var checker = shapeTypes[key];
                        if (checker) {
                            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                            if (error) return error;
                        }
                    }
                    return null;
                }
                return createChainableTypeChecker(validate);
            }
            function createStrictShapeTypeChecker(shapeTypes) {
                function validate(props, propName, componentName, location, propFullName) {
                    var propValue = props[propName],
                        propType = getPropType(propValue);
                    if ("object" !== propType) return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` supplied to `" + componentName + "`, expected `object`.");
                    var allKeys = assign({}, props[propName], shapeTypes);
                    for (var key in allKeys) {
                        var checker = shapeTypes[key];
                        if (!checker) return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
                        var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                        if (error) return error;
                    }
                    return null;
                }
                return createChainableTypeChecker(validate);
            }
            function isNode(propValue) {
                switch (typeof propValue) {
                    case "number":
                    case "string":
                    case "undefined":
                        return !0;

                    case "boolean":
                        return !propValue;

                    case "object":
                        if (Array.isArray(propValue)) return propValue.every(isNode);
                        if (null === propValue || isValidElement(propValue)) return !0;
                        var iteratorFn = getIteratorFn(propValue);
                        if (!iteratorFn) return !1;
                        var step,
                            iterator = iteratorFn.call(propValue);
                        if (iteratorFn !== propValue.entries) {
                            for (; !(step = iterator.next()).done;) {
                                if (!isNode(step.value)) return !1;
                            }
                        } else for (; !(step = iterator.next()).done;) {
                            var entry = step.value;
                            if (entry && !isNode(entry[1])) return !1;
                        }
                        return !0;

                    default:
                        return !1;
                }
            }
            function isSymbol(propType, propValue) {
                return "symbol" === propType || "Symbol" === propValue["@@toStringTag"] || "function" == typeof Symbol && propValue instanceof Symbol;
            }
            function getPropType(propValue) {
                var propType = typeof propValue;
                return Array.isArray(propValue) ? "array" : propValue instanceof RegExp ? "object" : isSymbol(propType, propValue) ? "symbol" : propType;
            }
            function getPreciseType(propValue) {
                if (void 0 === propValue || null === propValue) return "" + propValue;
                var propType = getPropType(propValue);
                if ("object" === propType) {
                    if (propValue instanceof Date) return "date";
                    if (propValue instanceof RegExp) return "regexp";
                }
                return propType;
            }
            function getPostfixForTypeWarning(value) {
                var type = getPreciseType(value);
                switch (type) {
                    case "array":
                    case "object":
                        return "an " + type;

                    case "boolean":
                    case "date":
                    case "regexp":
                        return "a " + type;

                    default:
                        return type;
                }
            }
            function getClassName(propValue) {
                return propValue.constructor && propValue.constructor.name ? propValue.constructor.name : ANONYMOUS;
            }
            var ITERATOR_SYMBOL = "function" == typeof Symbol && Symbol.iterator,
                FAUX_ITERATOR_SYMBOL = "@@iterator",
                ANONYMOUS = "<<anonymous>>",
                ReactPropTypes = {
                array: createPrimitiveTypeChecker("array"),
                bool: createPrimitiveTypeChecker("boolean"),
                func: createPrimitiveTypeChecker("function"),
                number: createPrimitiveTypeChecker("number"),
                object: createPrimitiveTypeChecker("object"),
                string: createPrimitiveTypeChecker("string"),
                symbol: createPrimitiveTypeChecker("symbol"),
                any: function () {
                    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
                }(),
                arrayOf: createArrayOfTypeChecker,
                element: function () {
                    function validate(props, propName, componentName, location, propFullName) {
                        var propValue = props[propName];
                        if (!isValidElement(propValue)) {
                            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + getPropType(propValue) + "` supplied to `" + componentName + "`, expected a single ReactElement.");
                        }
                        return null;
                    }
                    return createChainableTypeChecker(validate);
                }(),
                instanceOf: createInstanceTypeChecker,
                node: function () {
                    function validate(props, propName, componentName, location, propFullName) {
                        return isNode(props[propName]) ? null : new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to `" + componentName + "`, expected a ReactNode.");
                    }
                    return createChainableTypeChecker(validate);
                }(),
                objectOf: createObjectOfTypeChecker,
                oneOf: createEnumTypeChecker,
                oneOfType: createUnionTypeChecker,
                shape: createShapeTypeChecker,
                exact: createStrictShapeTypeChecker
            };
            return PropTypeError.prototype = Error.prototype, ReactPropTypes.checkPropTypes = checkPropTypes, ReactPropTypes.PropTypes = ReactPropTypes, ReactPropTypes;
        };
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function toObject(val) {
            if (null === val || void 0 === val) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(val);
        }
        /*
        object-assign
        (c) Sindre Sorhus
        @license MIT
        */
        var getOwnPropertySymbols = Object.getOwnPropertySymbols,
            hasOwnProperty = Object.prototype.hasOwnProperty,
            propIsEnumerable = Object.prototype.propertyIsEnumerable;
        module.exports = function () {
            try {
                if (!Object.assign) return !1;
                var test1 = new String("abc");
                if (test1[5] = "de", "5" === Object.getOwnPropertyNames(test1)[0]) return !1;
                for (var test2 = {}, i = 0; i < 10; i++) {
                    test2["_" + String.fromCharCode(i)] = i;
                }if ("0123456789" !== Object.getOwnPropertyNames(test2).map(function (n) {
                    return test2[n];
                }).join("")) return !1;
                var test3 = {};
                return "abcdefghijklmnopqrst".split("").forEach(function (letter) {
                    test3[letter] = letter;
                }), "abcdefghijklmnopqrst" === Object.keys(_extends({}, test3)).join("");
            } catch (err) {
                return !1;
            }
        }() ? Object.assign : function (target, source) {
            for (var from, symbols, to = toObject(target), s = 1; s < arguments.length; s++) {
                from = Object(arguments[s]);
                for (var key in from) {
                    hasOwnProperty.call(from, key) && (to[key] = from[key]);
                }if (getOwnPropertySymbols) {
                    symbols = getOwnPropertySymbols(from);
                    for (var i = 0; i < symbols.length; i++) {
                        propIsEnumerable.call(from, symbols[i]) && (to[symbols[i]] = from[symbols[i]]);
                    }
                }
            }
            return to;
        };
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
            for (var typeSpecName in typeSpecs) {
                if (typeSpecs.hasOwnProperty(typeSpecName)) {
                    var error;
                    try {
                        if ("function" != typeof typeSpecs[typeSpecName]) {
                            var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.");
                            throw err.name = "Invariant Violation", err;
                        }
                        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
                    } catch (ex) {
                        error = ex;
                    }
                    if (!error || error instanceof Error || printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."), error instanceof Error && !(error.message in loggedTypeFailures)) {
                        loggedTypeFailures[error.message] = !0;
                        var stack = getStack ? getStack() : "";
                        printWarning("Failed " + location + " type: " + error.message + (null != stack ? stack : ""));
                    }
                }
            }
        }
        var printWarning = function printWarning() {},
            ReactPropTypesSecret = __webpack_require__(1),
            loggedTypeFailures = {};
        printWarning = function printWarning(text) {
            var message = "Warning: " + text;
            "undefined" != typeof console && console.error(message);
            try {
                throw new Error(message);
            } catch (x) {}
        }, module.exports = checkPropTypes;
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function Mql(query, values, forceStatic) {
            function addListener(listener) {
                mql && mql.addListener(listener);
            }
            function removeListener(listener) {
                mql && mql.removeListener(listener);
            }
            function update(evt) {
                self.matches = evt.matches, self.media = evt.media;
            }
            function dispose() {
                mql && mql.removeListener(update);
            }
            var self = this;
            if (dynamicMatch && !forceStatic) {
                var mql = dynamicMatch.call(window, query);
                this.matches = mql.matches, this.media = mql.media, mql.addListener(update);
            } else this.matches = staticMatch(query, values), this.media = query;
            this.addListener = addListener, this.removeListener = removeListener, this.dispose = dispose;
        }
        function matchMedia(query, values, forceStatic) {
            return new Mql(query, values, forceStatic);
        }
        var staticMatch = __webpack_require__(10).match,
            dynamicMatch = "undefined" != typeof window ? window.matchMedia : null;
        module.exports = matchMedia;
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function matchQuery(mediaQuery, values) {
            return parseQuery(mediaQuery).some(function (query) {
                var inverse = query.inverse,
                    typeMatch = "all" === query.type || values.type === query.type;
                if (typeMatch && inverse || !typeMatch && !inverse) return !1;
                var expressionsMatch = query.expressions.every(function (expression) {
                    var feature = expression.feature,
                        modifier = expression.modifier,
                        expValue = expression.value,
                        value = values[feature];
                    if (!value) return !1;
                    switch (feature) {
                        case "orientation":
                        case "scan":
                            return value.toLowerCase() === expValue.toLowerCase();

                        case "width":
                        case "height":
                        case "device-width":
                        case "device-height":
                            expValue = toPx(expValue), value = toPx(value);
                            break;

                        case "resolution":
                            expValue = toDpi(expValue), value = toDpi(value);
                            break;

                        case "aspect-ratio":
                        case "device-aspect-ratio":
                        case "device-pixel-ratio":
                            expValue = toDecimal(expValue), value = toDecimal(value);
                            break;

                        case "grid":
                        case "color":
                        case "color-index":
                        case "monochrome":
                            expValue = parseInt(expValue, 10) || 1, value = parseInt(value, 10) || 0;
                    }
                    switch (modifier) {
                        case "min":
                            return value >= expValue;

                        case "max":
                            return value <= expValue;

                        default:
                            return value === expValue;
                    }
                });
                return expressionsMatch && !inverse || !expressionsMatch && inverse;
            });
        }
        function parseQuery(mediaQuery) {
            return mediaQuery.split(",").map(function (query) {
                query = query.trim();
                var captures = query.match(RE_MEDIA_QUERY),
                    modifier = captures[1],
                    type = captures[2],
                    expressions = captures[3] || "",
                    parsed = {};
                return parsed.inverse = !!modifier && "not" === modifier.toLowerCase(), parsed.type = type ? type.toLowerCase() : "all", expressions = expressions.match(/\([^\)]+\)/g) || [], parsed.expressions = expressions.map(function (expression) {
                    var captures = expression.match(RE_MQ_EXPRESSION),
                        feature = captures[1].toLowerCase().match(RE_MQ_FEATURE);
                    return {
                        modifier: feature[1],
                        feature: feature[2],
                        value: captures[2]
                    };
                }), parsed;
            });
        }
        function toDecimal(ratio) {
            var numbers,
                decimal = Number(ratio);
            return decimal || (numbers = ratio.match(/^(\d+)\s*\/\s*(\d+)$/), decimal = numbers[1] / numbers[2]), decimal;
        }
        function toDpi(resolution) {
            var value = parseFloat(resolution);
            switch (String(resolution).match(RE_RESOLUTION_UNIT)[1]) {
                case "dpcm":
                    return value / 2.54;

                case "dppx":
                    return 96 * value;

                default:
                    return value;
            }
        }
        function toPx(length) {
            var value = parseFloat(length);
            switch (String(length).match(RE_LENGTH_UNIT)[1]) {
                case "em":
                case "rem":
                    return 16 * value;

                case "cm":
                    return 96 * value / 2.54;

                case "mm":
                    return 96 * value / 2.54 / 10;

                case "in":
                    return 96 * value;

                case "pt":
                    return 72 * value;

                case "pc":
                    return 72 * value / 12;

                default:
                    return value;
            }
        }
        exports.match = matchQuery, exports.parse = parseQuery;
        var RE_MEDIA_QUERY = /(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i,
            RE_MQ_EXPRESSION = /\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/,
            RE_MQ_FEATURE = /^(?:(min|max)-)?(.+)/,
            RE_LENGTH_UNIT = /(em|rem|px|cm|mm|in|pt|pc)?$/,
            RE_RESOLUTION_UNIT = /(dpi|dpcm|dppx)?$/;
    }, function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        function keyVal(k, v) {
            var realKey = __WEBPACK_IMPORTED_MODULE_0_hyphenate_style_name___default()(k);
            return "number" == typeof v && (v = "".concat(v, "px")), !0 === v ? k : !1 === v ? negate(k) : "(".concat(realKey, ": ").concat(v, ")");
        }
        function join(conds) {
            return conds.join(" and ");
        }
        var __WEBPACK_IMPORTED_MODULE_0_hyphenate_style_name__ = __webpack_require__(2),
            __WEBPACK_IMPORTED_MODULE_0_hyphenate_style_name___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hyphenate_style_name__),
            __WEBPACK_IMPORTED_MODULE_1__mediaQuery__ = __webpack_require__(3),
            negate = function negate(cond) {
            return "not ".concat(cond);
        };
        __webpack_exports__.a = function (obj) {
            var rules = [];
            return Object.keys(__WEBPACK_IMPORTED_MODULE_1__mediaQuery__.a.all).forEach(function (k) {
                var v = obj[k];
                null != v && rules.push(keyVal(k, v));
            }), join(rules);
        };
    }]);
});
//# sourceMappingURL=react-responsive.js.map

/***/ }),

/***/ "dS3x":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"login":"login__28es4","rememberPass":"rememberPass__2P1bw","label":"label__2erlu","links":"links__2qBlU","line":"line__1He0r"};

/***/ }),

/***/ "eW0v":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return DOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return Children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClass", function() { return createClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPortal", function() { return createPortal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return isValidElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return findDOMNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return unmountComponentAtNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return PureComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_renderSubtreeIntoContainer", function() { return renderSubtreeIntoContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_batchedUpdates", function() { return unstable_batchedUpdates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return extend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__("5D9O");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact__);




var version = '15.1.0'; // trick libraries to think we are react

var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

var REACT_ELEMENT_TYPE = typeof Symbol !== 'undefined' && Symbol.for && Symbol.for('react.element') || 0xeac7;

var COMPONENT_WRAPPER_KEY = typeof Symbol !== 'undefined' && Symbol.for ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
	constructor: 1,
	render: 1,
	shouldComponentUpdate: 1,
	componentWillReceiveProps: 1,
	componentWillUpdate: 1,
	componentDidUpdate: 1,
	componentWillMount: 1,
	componentDidMount: 1,
	componentWillUnmount: 1,
	componentDidUnmount: 1
};

var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/;

var BYPASS_HOOK = {};

/*global process*/
var DEV = false;
try {
	DEV = "production" !== 'production';
} catch (e) {}

// a component that renders nothing. Used to replace components for unmountComponentAtNode.
function EmptyComponent() {
	return null;
}

// make react think we're react.
var VNode = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])('a', null).constructor;
VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
VNode.prototype.preactCompatUpgraded = false;
VNode.prototype.preactCompatNormalized = false;

Object.defineProperty(VNode.prototype, 'type', {
	get: function get() {
		return this.nodeName;
	},
	set: function set(v) {
		this.nodeName = v;
	},
	configurable: true
});

Object.defineProperty(VNode.prototype, 'props', {
	get: function get() {
		return this.attributes;
	},
	set: function set(v) {
		this.attributes = v;
	},
	configurable: true
});

var oldEventHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].event;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].event = function (e) {
	if (oldEventHook) {
		e = oldEventHook(e);
	}
	e.persist = Object;
	e.nativeEvent = e;
	return e;
};

var oldVnodeHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode = function (vnode) {
	if (!vnode.preactCompatUpgraded) {
		vnode.preactCompatUpgraded = true;

		var tag = vnode.nodeName,
		    attrs = vnode.attributes = vnode.attributes == null ? {} : extend({}, vnode.attributes);

		if (typeof tag === 'function') {
			if (tag[COMPONENT_WRAPPER_KEY] === true || tag.prototype && 'isReactComponent' in tag.prototype) {
				if (vnode.children && String(vnode.children) === '') {
					vnode.children = undefined;
				}
				if (vnode.children) {
					attrs.children = vnode.children;
				}

				if (!vnode.preactCompatNormalized) {
					normalizeVNode(vnode);
				}
				handleComponentVNode(vnode);
			}
		} else {
			if (vnode.children && String(vnode.children) === '') {
				vnode.children = undefined;
			}
			if (vnode.children) {
				attrs.children = vnode.children;
			}

			if (attrs.defaultValue) {
				if (!attrs.value && attrs.value !== 0) {
					attrs.value = attrs.defaultValue;
				}
				delete attrs.defaultValue;
			}

			handleElementVNode(vnode, attrs);
		}
	}

	if (oldVnodeHook) {
		oldVnodeHook(vnode);
	}
};

function handleComponentVNode(vnode) {
	var tag = vnode.nodeName,
	    a = vnode.attributes;

	vnode.attributes = {};
	if (tag.defaultProps) {
		extend(vnode.attributes, tag.defaultProps);
	}
	if (a) {
		extend(vnode.attributes, a);
	}
}

function handleElementVNode(vnode, a) {
	var shouldSanitize, attrs, i;
	if (a) {
		for (i in a) {
			if (shouldSanitize = CAMEL_PROPS.test(i)) {
				break;
			}
		}
		if (shouldSanitize) {
			attrs = vnode.attributes = {};
			for (i in a) {
				if (a.hasOwnProperty(i)) {
					attrs[CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i] = a[i];
				}
			}
		}
	}
}

// proxy render() since React returns a Component reference.
function render$1(vnode, parent, callback) {
	var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

	// ignore impossible previous renders
	if (prev && prev.parentNode !== parent) {
		prev = null;
	}

	// default to first Element child
	if (!prev && parent) {
		prev = parent.firstElementChild;
	}

	// remove unaffected siblings
	for (var i = parent.childNodes.length; i--;) {
		if (parent.childNodes[i] !== prev) {
			parent.removeChild(parent.childNodes[i]);
		}
	}

	var out = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(vnode, parent, prev);
	if (parent) {
		parent._preactCompatRendered = out && (out._component || { base: out });
	}
	if (typeof callback === 'function') {
		callback();
	}
	return out && out._component || out;
}

var ContextProvider = function ContextProvider() {};

ContextProvider.prototype.getChildContext = function () {
	return this.props.context;
};
ContextProvider.prototype.render = function (props) {
	return props.children[0];
};

function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
	var wrap = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(ContextProvider, { context: parentComponent.context }, vnode);
	var renderContainer = render$1(wrap, container);
	var component = renderContainer._component || renderContainer.base;
	if (callback) {
		callback.call(component, renderContainer);
	}
	return component;
}

function Portal(props) {
	renderSubtreeIntoContainer(this, props.vnode, props.container);
}

function createPortal(vnode, container) {
	return Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(Portal, { vnode: vnode, container: container });
}

function unmountComponentAtNode(container) {
	var existing = container._preactCompatRendered && container._preactCompatRendered.base;
	if (existing && existing.parentNode === container) {
		Object(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(EmptyComponent), container, existing);
		return true;
	}
	return false;
}

var ARR = [];

// This API is completely unnecessary for Preact, so it's basically passthrough.
var Children = {
	map: function map(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		return children.map(fn);
	},
	forEach: function forEach(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		children.forEach(fn);
	},
	count: function count(children) {
		return children && children.length || 0;
	},
	only: function only(children) {
		children = Children.toArray(children);
		if (children.length !== 1) {
			throw new Error('Children.only() expects only one child.');
		}
		return children[0];
	},
	toArray: function toArray(children) {
		if (children == null) {
			return [];
		}
		return ARR.concat(children);
	}
};

/** Track current render() component for ref assignment */
var currentComponent;

function createFactory(type) {
	return createElement.bind(null, type);
}

var DOM = {};
for (var i = ELEMENTS.length; i--;) {
	DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
}

function upgradeToVNodes(arr, offset) {
	for (var i = offset || 0; i < arr.length; i++) {
		var obj = arr[i];
		if (Array.isArray(obj)) {
			upgradeToVNodes(obj);
		} else if (obj && typeof obj === 'object' && !isValidElement(obj) && (obj.props && obj.type || obj.attributes && obj.nodeName || obj.children)) {
			arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
		}
	}
}

function isStatelessComponent(c) {
	return typeof c === 'function' && !(c.prototype && c.prototype.render);
}

// wraps stateless functional components in a PropTypes validator
function wrapStatelessComponent(WrappedComponent) {
	return createClass({
		displayName: WrappedComponent.displayName || WrappedComponent.name,
		render: function render() {
			return WrappedComponent(this.props, this.context);
		}
	});
}

function statelessComponentHook(Ctor) {
	var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
	if (Wrapped) {
		return Wrapped === true ? Ctor : Wrapped;
	}

	Wrapped = wrapStatelessComponent(Ctor);

	Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable: true, value: true });
	Wrapped.displayName = Ctor.displayName;
	Wrapped.propTypes = Ctor.propTypes;
	Wrapped.defaultProps = Ctor.defaultProps;

	Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable: true, value: Wrapped });

	return Wrapped;
}

function createElement() {
	var args = [],
	    len = arguments.length;
	while (len--) {
		args[len] = arguments[len];
	}upgradeToVNodes(args, 2);
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["h"].apply(void 0, args));
}

function normalizeVNode(vnode) {
	vnode.preactCompatNormalized = true;

	applyClassName(vnode);

	if (isStatelessComponent(vnode.nodeName)) {
		vnode.nodeName = statelessComponentHook(vnode.nodeName);
	}

	var ref = vnode.attributes.ref,
	    type = ref && typeof ref;
	if (currentComponent && (type === 'string' || type === 'number')) {
		vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
	}

	applyEventNormalization(vnode);

	return vnode;
}

function cloneElement$1(element, props) {
	var children = [],
	    len = arguments.length - 2;
	while (len-- > 0) {
		children[len] = arguments[len + 2];
	}if (!isValidElement(element)) {
		return element;
	}
	var elementProps = element.attributes || element.props;
	var node = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(element.nodeName || element.type, extend({}, elementProps), element.children || elementProps && elementProps.children);
	// Only provide the 3rd argument if needed.
	// Arguments 3+ overwrite element.children in preactCloneElement
	var cloneArgs = [node, props];
	if (children && children.length) {
		cloneArgs.push(children);
	} else if (props && props.children) {
		cloneArgs.push(props.children);
	}
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["cloneElement"].apply(void 0, cloneArgs));
}

function isValidElement(element) {
	return element && (element instanceof VNode || element.$$typeof === REACT_ELEMENT_TYPE);
}

function createStringRefProxy(name, component) {
	return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
		if (component && component.refs) {
			component.refs[name] = resolved;
			if (resolved === null) {
				delete component._refProxies[name];
				component = null;
			}
		}
	});
}

function applyEventNormalization(ref) {
	var nodeName = ref.nodeName;
	var attributes = ref.attributes;

	if (!attributes || typeof nodeName !== 'string') {
		return;
	}
	var props = {};
	for (var i in attributes) {
		props[i.toLowerCase()] = i;
	}
	if (props.ondoubleclick) {
		attributes.ondblclick = attributes[props.ondoubleclick];
		delete attributes[props.ondoubleclick];
	}
	// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
	if (props.onchange && (nodeName === 'textarea' || nodeName.toLowerCase() === 'input' && !/^fil|che|rad/i.test(attributes.type))) {
		var normalized = props.oninput || 'oninput';
		if (!attributes[normalized]) {
			attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
			delete attributes[props.onchange];
		}
	}
}

function applyClassName(vnode) {
	var a = vnode.attributes || (vnode.attributes = {});
	classNameDescriptor.enumerable = 'className' in a;
	if (a.className) {
		a.class = a.className;
	}
	Object.defineProperty(a, 'className', classNameDescriptor);
}

var classNameDescriptor = {
	configurable: true,
	get: function get() {
		return this.class;
	},
	set: function set(v) {
		this.class = v;
	}
};

function extend(base, props) {
	var arguments$1 = arguments;

	for (var i = 1, obj = void 0; i < arguments.length; i++) {
		if (obj = arguments$1[i]) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					base[key] = obj[key];
				}
			}
		}
	}
	return base;
}

function shallowDiffers(a, b) {
	for (var i in a) {
		if (!(i in b)) {
			return true;
		}
	}
	for (var i$1 in b) {
		if (a[i$1] !== b[i$1]) {
			return true;
		}
	}
	return false;
}

function findDOMNode(component) {
	return component && (component.base || component.nodeType === 1 && component) || null;
}

function F() {}

function createClass(obj) {
	function cl(props, context) {
		bindAll(this);
		Component$1.call(this, props, context, BYPASS_HOOK);
		newComponentHook.call(this, props, context);
	}

	obj = extend({ constructor: cl }, obj);

	// We need to apply mixins here so that getDefaultProps is correctly mixed
	if (obj.mixins) {
		applyMixins(obj, collateMixins(obj.mixins));
	}
	if (obj.statics) {
		extend(cl, obj.statics);
	}
	if (obj.propTypes) {
		cl.propTypes = obj.propTypes;
	}
	if (obj.defaultProps) {
		cl.defaultProps = obj.defaultProps;
	}
	if (obj.getDefaultProps) {
		cl.defaultProps = obj.getDefaultProps.call(cl);
	}

	F.prototype = Component$1.prototype;
	cl.prototype = extend(new F(), obj);

	cl.displayName = obj.displayName || 'Component';

	return cl;
}

// Flatten an Array of mixins to a map of method name to mixin implementations
function collateMixins(mixins) {
	var keyed = {};
	for (var i = 0; i < mixins.length; i++) {
		var mixin = mixins[i];
		for (var key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
				(keyed[key] || (keyed[key] = [])).push(mixin[key]);
			}
		}
	}
	return keyed;
}

// apply a mapping of Arrays of mixin methods to a component prototype
function applyMixins(proto, mixins) {
	for (var key in mixins) {
		if (mixins.hasOwnProperty(key)) {
			proto[key] = multihook(mixins[key].concat(proto[key] || ARR), key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext');
		}
	}
}

function bindAll(ctx) {
	for (var i in ctx) {
		var v = ctx[i];
		if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
			(ctx[i] = v.bind(ctx)).__bound = true;
		}
	}
}

function callMethod(ctx, m, args) {
	if (typeof m === 'string') {
		m = ctx.constructor.prototype[m];
	}
	if (typeof m === 'function') {
		return m.apply(ctx, args);
	}
}

function multihook(hooks, skipDuplicates) {
	return function () {
		var arguments$1 = arguments;
		var this$1 = this;

		var ret;
		for (var i = 0; i < hooks.length; i++) {
			var r = callMethod(this$1, hooks[i], arguments$1);

			if (skipDuplicates && r != null) {
				if (!ret) {
					ret = {};
				}
				for (var key in r) {
					if (r.hasOwnProperty(key)) {
						ret[key] = r[key];
					}
				}
			} else if (typeof r !== 'undefined') {
				ret = r;
			}
		}
		return ret;
	};
}

function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
	this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
}

function propsHook(props, context) {
	if (!props) {
		return;
	}

	// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
	var c = props.children;
	if (c && Array.isArray(c) && c.length === 1 && (typeof c[0] === 'string' || typeof c[0] === 'function' || c[0] instanceof VNode)) {
		props.children = c[0];

		// but its totally still going to be an Array.
		if (props.children && typeof props.children === 'object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	// add proptype checking
	if (DEV) {
		var ctor = typeof this === 'function' ? this : this.constructor,
		    propTypes = this.propTypes || ctor.propTypes;
		var displayName = this.displayName || ctor.name;

		if (propTypes) {
			__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.checkPropTypes(propTypes, props, 'prop', displayName);
		}
	}
}

function beforeRender(props) {
	currentComponent = this;
}

function afterRender() {
	if (currentComponent === this) {
		currentComponent = null;
	}
}

function Component$1(props, context, opts) {
	__WEBPACK_IMPORTED_MODULE_1_preact__["Component"].call(this, props, context);
	this.state = this.getInitialState ? this.getInitialState() : {};
	this.refs = {};
	this._refProxies = {};
	if (opts !== BYPASS_HOOK) {
		newComponentHook.call(this, props, context);
	}
}
extend(Component$1.prototype = new __WEBPACK_IMPORTED_MODULE_1_preact__["Component"](), {
	constructor: Component$1,

	isReactComponent: {},

	replaceState: function replaceState(state, callback) {
		var this$1 = this;

		this.setState(state, callback);
		for (var i in this$1.state) {
			if (!(i in state)) {
				delete this$1.state[i];
			}
		}
	},

	getDOMNode: function getDOMNode() {
		return this.base;
	},

	isMounted: function isMounted() {
		return !!this.base;
	}
});

function PureComponent(props, context) {
	Component$1.call(this, props, context);
}
F.prototype = Component$1.prototype;
PureComponent.prototype = new F();
PureComponent.prototype.isPureReactComponent = true;
PureComponent.prototype.shouldComponentUpdate = function (props, state) {
	return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
};

function unstable_batchedUpdates(callback) {
	callback();
}

var index = {
	version: version,
	DOM: DOM,
	PropTypes: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a,
	Children: Children,
	render: render$1,
	createClass: createClass,
	createPortal: createPortal,
	createFactory: createFactory,
	createElement: createElement,
	cloneElement: cloneElement$1,
	isValidElement: isValidElement,
	findDOMNode: findDOMNode,
	unmountComponentAtNode: unmountComponentAtNode,
	Component: Component$1,
	PureComponent: PureComponent,
	unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer,
	unstable_batchedUpdates: unstable_batchedUpdates,
	__spread: extend
};

/* harmony default export */ __webpack_exports__["default"] = (index);

//# sourceMappingURL=preact-compat.es.js.map

/***/ }),

/***/ "kQP3":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "195325558c8e14f67eadf2f05128aa2f.png";

/***/ }),

/***/ "koiw":
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__("mbYX");
var isArguments = __webpack_require__("OWwF");

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

    // 7.3. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {
    //happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

/***/ }),

/***/ "mZSN":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__p80zn","pageTitle":"pageTitle__2TXJi","content":"content__13PNg","main":"main__3D9t4","navigation":"navigation__3Elh9","active":"active__5qleZ","sidebar":"sidebar__2hEW1","readMore":"readMore__3dUFa","box":"box__3D22T"};

/***/ }),

/***/ "mbYX":
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;

exports.shim = shim;
function shim(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
}

/***/ }),

/***/ "n8AM":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a1d86aa81dcb2181ee524f710d3bb9c4.png";

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "wVGV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__("Asjh");

function emptyFunction() {}

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),

/***/ "xToX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preact = __webpack_require__("KM04");

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /** @jsx h */

module.exports = function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }
  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }
  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state = void 0;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = function (_Component) {
      _inherits(SideEffect, _Component);

      function SideEffect() {
        _classCallCheck(this, SideEffect);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      // Expose canUseDOM so tests can monkeypatch it


      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        // preact-compat normally does this
        var children = nextProps.children,
            props = _objectWithoutProperties(nextProps, ['children']);

        if (children && children.length) props.children = children;
        return shallowDiffers(props, this.props);
      };

      SideEffect.prototype.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      SideEffect.prototype.render = function render() {
        return (0, _preact.h)(WrappedComponent, this.props);
      };

      return SideEffect;
    }(_preact.Component);

    SideEffect.displayName = 'SideEffect(' + getDisplayName(WrappedComponent) + ')';
    SideEffect.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

    return SideEffect;
  };

  // Pulled from react-compat
  function shallowDiffers(a, b) {
    for (var i in a) {
      if (!(i in b)) return true;
    }for (var _i in b) {
      if (a[_i] !== b[_i]) return true;
    }return false;
  }
};

/***/ }),

/***/ "yj+r":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__3n2Fn","hidden":"hidden__2dKVC","active":"active__ohVKn"};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map