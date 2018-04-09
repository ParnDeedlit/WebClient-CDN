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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Zondy = exports.Zondy = window.Zondy = window.Zondy || {};

Zondy.Util = Zondy.Util || {};
Zondy.Network = Zondy.Network || {};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = L;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapvLayer = exports.MapVLayer = undefined;

var _leaflet = __webpack_require__(1);

var _leaflet2 = _interopRequireDefault(_leaflet);

__webpack_require__(3);

var _MapvRenderer = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class L.zondy.mapvLayer
 * @classdesc MapV图层
 * @category Visualization MapV
 * @extends L.Layer{@linkdoc-leaflet/#layer}
 * @param dataSet - {mapv.DataSet} MapV图层数据集
 * @param mapVOptions - {Object} MapV图层参数
 * @param options - {Object} 可选参数。如：<br>
 *        attributionPrefix - {string} 版权信息前缀。<br>
 *        attribution - {string} 版权信息。
 */
var MapVLayer = exports.MapVLayer = _leaflet2.default.Layer.extend({

    options: {
        attributionPrefix: null,
        attribution: " © 2017 百度 MapV with <span>© <a href='http://www.smaryun.com' target='_blank'>MapGIS WebClient</a></span>"
    },

    initialize: function initialize(map, dataSet, mapVOptions, options) {
        options = options || {};
        this.dataSet = dataSet || {};
        this.mapVOptions = mapVOptions || {};
        this.render = this.render.bind(this);
        _leaflet2.default.Util.setOptions(this, options);
        if (this.options.attributionPrefix) {
            this.options.attribution = this.options.attributionPrefix + this.options.attribution;
        }

        this.canvas = this._createCanvas();
        _leaflet2.default.stamp(this);
    },

    /**
     * @private
     * @function L.zondy.mapvLayer.prototype.onAdd
     * @description 添加地图图层
     * @param map - {L.map} 要添加的地图
     */
    onAdd: function onAdd(map) {
        this._map = map;
        var overlayPane = this.getPane();
        var container = this.container = _leaflet2.default.DomUtil.create("div", "leaflet-layer leaflet-zoom-animated", overlayPane);
        container.appendChild(this.canvas);
        var size = map.getSize();
        container.style.width = size.x + "px";
        container.style.height = size.y + "px";
        this.renderer = new _MapvRenderer.MapvRenderer(map, this, this.dataSet, this.mapVOptions);
        this.draw();
        this.fire("loaded");
    },

    // _hide: function () {
    //     this.canvas.style.display = 'none';
    // },

    // _show: function () {
    //     this.canvas.style.display = 'block';
    // },

    /**
     * @private
     * @function L.zondy.mapvLayer.prototype.onRemove
     * @description 删除地图图层
     */
    onRemove: function onRemove() {
        _leaflet2.default.DomUtil.remove(this.container);
        this.renderer.unbindEvent();
    },

    /**
     * @function L.zondy.mapvLayer.prototype.addData
     * @description 追加数据
     * @param data - {Object} 要追加的数据
     * @param options -{Object} 要追加的值
     */
    addData: function addData(data, options) {
        this.renderer.addData(data, options);
    },

    /**
     * @function L.zondy.mapvLayer.prototype.update
     * @description 更新图层
     * @param opt - {Object} 待更新的数据<br>
     *        data -{Object} mapv数据集<br>
     *        options -{Object} mapv绘制参数<br>
     */
    update: function update(opt) {
        this.renderer.update(opt);
    },

    /**
     * @function L.zondy.mapvLayer.prototype.getData
     * @description 获取数据
     * @return {mapv.DataSet} mapv数据集
     */
    getData: function getData() {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    },

    /**
     * @function L.zondy.mapvLayer.prototype.removeData
     * @description 删除符合过滤条件的数据
     * @param filter - {function} 过滤条件。条件参数为数据项，返回值为true,表示删除该元素；否则表示不删除
     * @example
     *  filter=function(data){
     *    if(data.id=="1"){
     *      return true
     *    }
     *    return false;
     *  }
     */
    removeData: function removeData(filter) {
        this.renderer && this.renderer.removeData(filter);
    },

    /**
     * @function L.zondy.mapvLayer.prototype.clearData
     * @description 清除数据
     */
    clearData: function clearData() {
        this.renderer.clearData();
    },

    /**
     * @function L.zondy.mapvLayer.prototype.draw
     * @description 绘制图层
     */
    draw: function draw() {
        return this._reset();
    },

    /**
     * @function L.zondy.mapvLayer.prototype.setZIndex
     * @description 设置canvas层级
     * @param zIndex - {number} canvas层级
     */
    setZIndex: function setZIndex(zIndex) {
        this.canvas.style.zIndex = zIndex;
    },

    /**
     * @function L.zondy.mapvLayer.prototype.render
     * @description 渲染
     */
    render: function render() {
        this.renderer._canvasUpdate();
    },

    /**
     * @function L.zondy.mapvLayer.prototype.getCanvas
     * @description 获取canvas
     * @return {HTMLElement} 返回mapV图层包含的canvas对象
     */
    getCanvas: function getCanvas() {
        return this.canvas;
    },

    /**
     * @function L.zondy.mapvLayer.prototype.getContainer
     * @description 获取容器
     * @return {HTMLElement} 返回包含mapV图层的dom对象
     */
    getContainer: function getContainer() {
        return this.container;
    },

    /**
     * @function L.zondy.mapvLayer.prototype.getTopLeft
     * @description 获取左上角坐标
     * @return {L.Bounds} 返回左上角坐标
     */
    getTopLeft: function getTopLeft() {
        var map = this._map;
        var topLeft;
        if (map) {
            var bounds = map.getBounds();
            topLeft = bounds.getNorthWest();
        }
        return topLeft;
    },

    _createCanvas: function _createCanvas() {
        var canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = 0 + "px";
        canvas.style.left = 0 + "px";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = this.options.zIndex || 600;
        var global$2 = typeof window === 'undefined' ? {} : window;
        var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio;
        if (this.mapVOptions.context == '2d') {
            canvas.getContext(this.mapVOptions.context).scale(devicePixelRatio, devicePixelRatio);
        }
        return canvas;
    },

    _resize: function _resize() {
        var canvas = this.canvas;
        if (!canvas) {
            return;
        }

        var map = this._map;
        var size = map.getSize();
        canvas.width = size.x;
        canvas.height = size.y;
        canvas.style.width = size.x + 'px';
        canvas.style.height = size.y + 'px';
        var bounds = map.getBounds();
        var topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
        _leaflet2.default.DomUtil.setPosition(canvas, topLeft);
    },

    _reset: function _reset() {
        this._resize();
        this._render();
    },
    redraw: function redraw() {
        this._resize();
        this._render();
    },
    _render: function _render() {
        this.render();
    }

});

var mapvLayer = exports.mapvLayer = function mapvLayer(dataSet, mapVOptions, options) {
    return new MapVLayer(dataSet, mapVOptions, options);
};

_leaflet2.default.Map.include({
    /*
     * 获取精确的像素坐标.
     * 当需要绘制比较平滑的曲线的时候可调用此方法代替latLngToContainerPoint
     * @param latlng
     */
    latLngToAccurateContainerPoint: function latLngToAccurateContainerPoint(latlng) {
        var projectedPoint = this.project(_leaflet2.default.latLng(latlng));
        var layerPoint = projectedPoint._subtract(this.getPixelOrigin());
        return _leaflet2.default.point(layerPoint).add(this._getMapPanePos());
    }
});

_leaflet2.default.zondy.MapvLayer = mapvLayer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _leaflet = __webpack_require__(1);

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_leaflet2.default.zondy = _leaflet2.default.zondy || {}; /**
                                                          *MapGIS WebClient Leaflet基类
                                                          * 定义命名空间
                                                          * 提供公共模块
                                                          */

_leaflet2.default.zondy.control = _leaflet2.default.zondy.control || {}; //讲真，人家这样做从架构上其实还确实挺正确的

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.urlAppend = exports.Util = undefined;

var _Base = __webpack_require__(0);

var Util = exports.Util = _Base.Zondy.Util = _Base.Zondy.Util || {};

/**
 * @description 复制源对象的所有属性到目标对象上，源对象上的没有定义的属性在目标对象上也不会被设置。
 * @example
 * 要复制Zondy.Size对象的所有属性到自定义对象上，使用方法如下:
 *     var size = new Zondy.Size(100, 100);
 *     var obj = {}；
 *     Zondy.Util.extend(obj, size);
 * @param destination - {Object} 目标对象。
 * @param source - {Object} 源对象，其属性将被设置到目标对象上。
 * @return {Object} 目标对象。
 */

_Base.Zondy.Util.extend = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }

        /**
         * IE doesn't include the toString property when iterating over an object's
         * properties with the for(property in object) syntax.  Explicitly check if
         * the source has its own toString property.
         */

        /*
         * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
         * prototype object" when calling hawOwnProperty if the source object
         * is an instance of window.Event.
         */

        var sourceIsEvt = typeof window.Event === "function" && source instanceof window.Event;

        if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};

/**
 * @description 给url追加参数。
 * @param url - {string} 待追加参数的url字符串。
 * @param paramStr - {string} 待追加的参数。
 * @return {string} The new url
 */
var urlAppend = function urlAppend(url, paramStr) {
    var newUrl = url;
    if (paramStr) {
        var parts = (url + " ").split(/[?&]/);
        newUrl += parts.pop() === " " ? //如果url是以?或者&结尾的直接追加参数
        paramStr : parts.length ? "&" + paramStr : "?" + paramStr;
        //如果url不是以?或者&结尾的则根据是否有参数进行符号补充
    }
    return newUrl;
};

exports.urlAppend = urlAppend;


_Base.Zondy.Util.urlAppend = urlAppend;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IServiceLoadData = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = __webpack_require__(0);

var _FetchRequest = __webpack_require__(22);

var _Json = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_Base.Zondy.ElasticSearch = _Base.Zondy.ElasticSearch || {};
/*
 * @author 潘卓然 ParnDeedlit
 */

var IServiceLoadData = exports.IServiceLoadData = function () {
  function IServiceLoadData(method, url, params, style, map, onSuccess, onFailure) {
    _classCallCheck(this, IServiceLoadData);

    this.method = method;
    this.url = url;
    this.params = params;
    this.fetchServiceData(map, style, onSuccess, onFailure);
  }

  _createClass(IServiceLoadData, [{
    key: 'fetchServiceData',
    value: function fetchServiceData(map, style, success, failure) {
      _FetchRequest.FetchRequest.commit(this.method, this.url, this.params, {
        // headers: options.headers,
        // withCredentials: options.withCredentials,
        // timeout: options.async ? 0 : null,
        // proxy: options.proxy
      }).then(function (response) {
        if (response.text) {
          return response.text();
        }
        return response.json();
      }).then(function (text) {
        var result = null;
        if (typeof text === "string" && (text.toLowerCase() == 'true' || text.toLowerCase() == 'false')) {
          result = {};
          if (text.toLowerCase() == 'true') {
            result.succeed = true;
          } else {
            result.error = true;
          }
        } else if (typeof text === "string") {
          result = new _Json.JSONFormat().read(text);
        }

        if (!result || result.error) {
          if (result && result.error) {
            result = {
              error: result.error
            };
          } else {
            result = {
              error: true
            };
          }
        }
        if (result.error) {
          failure(result);
        } else {
          if (!isNaN(result)) //为数字
            {
              result = {
                value: result
              };
            }
          if (typeof result === "string") {
            result = {
              value: result
            };
          }
          if (Object.prototype.toString.call(result) != '[object Array]') {
            result.succeed = result.succeed == undefined ? true : result.succeed;
          } else {
            result = {
              value: result,
              succeed: true
            };
          }
          success(result, map, style);
        }
      });
    }
  }]);

  return IServiceLoadData;
}();

;

_Base.Zondy.ElasticSearch.IServiceLoadData = IServiceLoadData;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapvRenderer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mapv = __webpack_require__(23);

var _leaflet = __webpack_require__(1);

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseLayer = _mapv.baiduMapLayer ? _mapv.baiduMapLayer.__proto__ : Function;

/**
 * @class L.zondy.MapvRenderer
 * @classdesc 地图渲染类
 * @category Visualization MapV
 * @private
 * @extends mapv.BaseLayer
 * @param map - {L.map} 待渲染的地图
 * @param layer - {L.Layer} 待渲染的图层
 * @param dataSet - {DataSet} 待渲染的数据集
 * @param options - {Object} 渲染的参数
 */

var MapvRenderer = exports.MapvRenderer = function (_BaseLayer) {
  _inherits(MapvRenderer, _BaseLayer);

  function MapvRenderer(map, layer, dataSet, options) {
    _classCallCheck(this, MapvRenderer);

    var _this = _possibleConstructorReturn(this, (MapvRenderer.__proto__ || Object.getPrototypeOf(MapvRenderer)).call(this, map, dataSet, options));

    if (!BaseLayer) {
      return _possibleConstructorReturn(_this);
    }

    _this.map = map;
    var self = _this;
    options = options || {};

    self.init(options);
    self.argCheck(options);
    _this.canvasLayer = layer;
    _this.clickEvent = _this.clickEvent.bind(_this);
    _this.mousemoveEvent = _this.mousemoveEvent.bind(_this);
    _this._moveStartEvent = _this.moveStartEvent.bind(_this);
    _this._moveEndEvent = _this.moveEndEvent.bind(_this);
    _this._zoomstart = _this.zoomStartEvent.bind(_this);
    _this.bindEvent();
    return _this;
  }

  /**
   * @function L.zondy.MapvRenderer.prototype.clickEvent
   * @description 点击事件
   * @param e - {Object} 触发对象
   */


  _createClass(MapvRenderer, [{
    key: 'clickEvent',
    value: function clickEvent(e) {
      var offset = this.map.containerPointToLayerPoint([0, 0]);
      var devicePixelRatio = this.devicePixelRatio = window.devicePixelRatio;
      var pixel = e.layerPoint;
      _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'clickEvent', this).call(this, _leaflet2.default.point((pixel.x - offset.x) / devicePixelRatio, (pixel.y - offset.y) / devicePixelRatio), e);
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.mousemoveEvent
     * @description 鼠标移动事件
     * @param  e - {Object} 触发对象
     */

  }, {
    key: 'mousemoveEvent',
    value: function mousemoveEvent(e) {
      var pixel = e.layerPoint;
      _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'mousemoveEvent', this).call(this, pixel, e);
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.bindEvent
     * @description 绑定鼠标移动和鼠标点击事件
     * @param e - {Object} 触发对象
     */

  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var map = this.map;

      if (this.options.methods) {
        if (this.options.methods.click) {
          map.on('click', this.clickEvent);
        }
        if (this.options.methods.mousemove) {
          map.on('mousemove', this.mousemoveEvent);
        }
      }
      this.map.on('movestart', this._moveStartEvent);
      this.map.on('moveend', this._moveEndEvent);
      this.map.on('zoomstart', this._zoomstart);
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.unbindEvent
     * @description 解绑鼠标移动和鼠标滑动触发的事件
     * @param e - {Object} 触发对象
     */

  }, {
    key: 'unbindEvent',
    value: function unbindEvent() {
      var map = this.map;

      if (this.options.methods) {
        if (this.options.methods.click) {
          map.off('click', this.clickEvent);
        }
        if (this.options.methods.mousemove) {
          map.off('mousemove', this.mousemoveEvent);
        }
      }
      this.map.off('movestart', this._moveStartEvent);
      this.map.off('moveend', this._moveEndEvent);
      this.map.off('zoomstart', this._zoomStartEvent);
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.getContext
     * @description 获取信息
     */

  }, {
    key: 'getContext',
    value: function getContext() {
      return this.canvasLayer.getCanvas().getContext(this.context);
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.addData
     * @description 添加数据
     * @param data - {oject} 待添加的数据
     * @param options - {oject} 待添加的数据信息
     */

  }, {
    key: 'addData',
    value: function addData(data, options) {
      var _data = data;
      if (data && data.get) {
        _data = data.get();
      }
      this.dataSet.add(_data);
      this.update({
        options: options
      });
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.update
     * @description 更新图层
     * @param opt - {Object} 待更新的数据<br>
     *        data -{Object} mapv数据集<br>
     *        options -{Object} mapv绘制参数<br>
     */

  }, {
    key: 'update',
    value: function update(opt) {
      var update = opt || {};
      var _data = update.data;
      if (_data && _data.get) {
        _data = _data.get();
      }
      if (_data != undefined) {
        this.dataSet.set(_data);
      }
      _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'update', this).call(this, {
        options: update.options
      });
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.getData
     * @description 获取数据
     */

  }, {
    key: 'getData',
    value: function getData() {
      return this.dataSet;
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.removeData
     * @description 删除符合过滤条件的数据
     * @param filter - {function} 过滤条件。条件参数为数据项，返回值为true,表示删除该元素；否则表示不删除
     */

  }, {
    key: 'removeData',
    value: function removeData(_filter) {
      if (!this.dataSet) {
        return;
      }
      var newData = this.dataSet.get({
        filter: function filter(data) {
          return _filter != null && typeof _filter === "function" ? !_filter(data) : true;
        }
      });
      this.dataSet.set(newData);
      this.update({
        options: null
      });
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.clearData
     * @description 清除数据
     */

  }, {
    key: 'clearData',
    value: function clearData() {
      this.dataSet && this.dataSet.clear();
      this.update({ options: null });
    }
  }, {
    key: '_canvasUpdate',
    value: function _canvasUpdate(time) {
      if (!this.canvasLayer) {
        return;
      }

      var self = this;

      var animationOptions = self.options.animation;

      var context = this.getContext();
      var map = this.map;
      if (self.isEnabledTime()) {
        if (time === undefined) {
          this.clear(context);
          return;
        }
        if (this.context === '2d') {
          context.save();
          context.globalCompositeOperation = 'destination-out';
          context.fillStyle = 'rgba(0, 0, 0, .1)';
          context.fillRect(0, 0, context.canvas.width, context.canvas.height);
          context.restore();
        }
      } else {
        this.clear(context);
      }

      if (this.context === '2d') {
        for (var key in self.options) {
          context[key] = self.options[key];
        }
      } else {
        context.clear(context.COLOR_BUFFER_BIT);
      }

      if (self.options.minZoom && map.getZoom() < self.options.minZoom || self.options.maxZoom && map.getZoom() > self.options.maxZoom) {
        return;
      }

      var offset = map.latLngToAccurateContainerPoint(this.canvasLayer.getTopLeft());
      var dataGetOptions = {
        transferCoordinate: function transferCoordinate(coordinate) {
          var worldPoint = map.latLngToAccurateContainerPoint(_leaflet2.default.latLng(coordinate[1], coordinate[0]));
          var pixel = {
            x: worldPoint.x - offset.x,
            y: worldPoint.y - offset.y
          };
          return [pixel.x, pixel.y];
        }
      };

      if (time !== undefined) {
        dataGetOptions.filter = function (item) {
          var trails = animationOptions.trails || 10;
          return time && item.time > time - trails && item.time < time;
        };
      }

      var data = self.dataSet.get(dataGetOptions);

      this.processData(data);

      self.options._size = self.options.size;

      var worldPoint = map.latLngToContainerPoint(_leaflet2.default.latLng(0, 0));
      var pixel = {
        x: worldPoint.x - offset.x,
        y: worldPoint.y - offset.y
      };
      this.drawContext(context, new _mapv.DataSet(data), self.options, pixel);

      self.options.updateCallback && self.options.updateCallback(time);
    }
  }, {
    key: 'init',
    value: function init(options) {

      var self = this;

      self.options = options;

      this.initDataRange(options);

      this.context = self.options.context || '2d';

      if (self.options.zIndex) {
        this.canvasLayer && this.canvasLayer.setZIndex(self.options.zIndex);
      }

      this.initAnimator();
    }
  }, {
    key: 'addAnimatorEvent',
    value: function addAnimatorEvent() {}

    /**
     * @function L.zondy.MapvRenderer.prototype.moveStartEvent
     * @description 开始移动事件
     */

  }, {
    key: 'moveStartEvent',
    value: function moveStartEvent() {
      var animationOptions = this.options.animation;
      if (this.isEnabledTime() && this.animator) {
        this.steps.step = animationOptions.stepsRange.start;
        this._hide();
      }
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.moveEndEvent
     * @description 结束移动事件
     */

  }, {
    key: 'moveEndEvent',
    value: function moveEndEvent() {
      this.canvasLayer.draw();
      this._show();
    }
    /**
     * @function L.zondy.MapvRenderer.prototype.zoomStartEvent
     * @description 隐藏渲染样式
     */

  }, {
    key: 'zoomStartEvent',
    value: function zoomStartEvent() {
      this._hide();
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.clear
     * @description 清除信息
     * @param context - {string} 指定要清除的信息
     */

  }, {
    key: 'clear',
    value: function clear(context) {
      context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }, {
    key: '_hide',
    value: function _hide() {
      this.canvasLayer.canvas.style.display = 'none';
    }
  }, {
    key: '_show',
    value: function _show() {
      this.canvasLayer.canvas.style.display = 'block';
    }

    /**
     * @function L.zondy.MapvRenderer.prototype.draw
     * @description 绘制渲染
     */

  }, {
    key: 'draw',
    value: function draw() {
      this.canvasLayer.draw();
    }
  }]);

  return MapvRenderer;
}(BaseLayer);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var URL_HTTP_PROFIX = exports.URL_HTTP_PROFIX = "http://";
var URL_DIVISION = exports.URL_DIVISION = "/";
var URL_SUB = exports.URL_SUB = ":";
var uriSocket = exports.uriSocket = "8020";
var uriBody_end = exports.uriBody_end = "?";
var uriParamLink = exports.uriParamLink = "&";

var elsName = exports.elsName = "es";
var elsQuery = exports.elsQuery = "generalQuery";
var elsIndex = exports.elsIndex = "indexName=";
var elsType = exports.elsType = "typeName=";
var elsSpatial = exports.elsSpatial = "spatialCondition=";
var elsTimeComdition = exports.elsTimeComdition = "timeCondition=";
var elsQueryField = exports.elsQueryField = "queryField=";

var PARAM_SUB = exports.PARAM_SUB = ":";
var PARAM_COMMA = exports.PARAM_COMMA = ",";
var PARAM_SPLIT = exports.PARAM_SPLIT = ";";

var aggGeoFormat = exports.aggGeoFormat = "0"; //0表示点  1表示区
var elsPercision = exports.elsPercision = "percision"; //geohash聚类的精度


var SPACE_ENUM_POINT = exports.SPACE_ENUM_POINT = "point";
var SPACE_ENUM_LINE = exports.SPACE_ENUM_LINE = "line";
var SPACE_ENUM_POLYGON = exports.SPACE_ENUM_POLYGON = "polygon";

var QUERY_GEOHASH = exports.QUERY_GEOHASH = "stGeoHashQueryByAgg";
var QUERY_GEOHASH_POINT = exports.QUERY_GEOHASH_POINT = "0";
var QUERY_GEOHASH_POLYGON = exports.QUERY_GEOHASH_POLYGON = "1";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoHashService = exports.GeoHashService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = __webpack_require__(1);

var _leaflet2 = _interopRequireDefault(_leaflet);

var _Base = __webpack_require__(8);

__webpack_require__(3);

var _MapvLayer = __webpack_require__(2);

var _IServiceLoadData = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_leaflet2.default.zondy.GeoHashLayer = undefined;

var GeoHashService = exports.GeoHashService = function () {
  function GeoHashService(ip, socket, map, queryOption, styleOption) {
    _classCallCheck(this, GeoHashService);

    this.layer = null;

    this.map = map;
    this.urlAddress = "";

    this.queryOption = {};
    this.styleOption = styleOption;

    this.prefixUrlPost(ip, socket, queryOption);
    new _IServiceLoadData.IServiceLoadData("GET", this.urlAddress, this.queryOption, this.styleOption, this.map, this.onSuccess, this.onFailure);
  }

  /*
  * 下面的逻辑是对应的DataStore的Post请求一一对应，这里只是一个封装，将用户的直观参数
  转换成DataStore要求的参数
  */


  _createClass(GeoHashService, [{
    key: 'prefixUrlPost',
    value: function prefixUrlPost(ip, socket, queryOption) {
      //处理url
      this.urlAddress = "" + _Base.URL_HTTP_PROFIX + ip + _Base.URL_SUB + socket + "/es/" + _Base.QUERY_GEOHASH;
      //处理elasticsearch的数据库库名,表名
      this.queryOption.indexName = queryOption.db;
      this.queryOption.typeName = queryOption.table;
      //处理空间属性参数
      this.queryOption.aggfield = queryOption.space.field; //空间字段
      this.queryOption.spatialCondition = _Base.SPACE_ENUM_POLYGON + _Base.PARAM_SUB + queryOption.space.north + _Base.PARAM_COMMA + queryOption.space.west + _Base.PARAM_SPLIT + queryOption.space.north + _Base.PARAM_COMMA + queryOption.space.east + _Base.PARAM_SPLIT + queryOption.space.south + _Base.PARAM_COMMA + queryOption.space.east + _Base.PARAM_SPLIT + queryOption.space.south + _Base.PARAM_COMMA + queryOption.space.west;
      this.queryOption.aggGeoFormat = _Base.QUERY_GEOHASH_POINT; //结果以点的形式返回
      this.queryOption.percision = queryOption.space.percision;
      //处理时间属性参数
      this.queryOption.timefield = queryOption.time.field; //时间字段
      this.queryOption.timeCondition = "" + queryOption.time.starttime + _Base.PARAM_COMMA + queryOption.time.endtime; //时间起始时间
    }
  }, {
    key: 'onSuccess',
    value: function onSuccess(result, map, style) {
      if (_leaflet2.default.zondy.GeoHashLayer != undefined) _leaflet2.default.zondy.GeoHashLayer.remove();
      var dataSet = [];
      var features = result.features;
      if (features == null || features == undefined) return;
      features.forEach(function (feature) {
        dataSet.push({
          geometry: {
            type: 'Point',
            coordinates: feature.geometry.coordinates
          },
          count: feature.properties.aggcount
        });
      });
      _leaflet2.default.zondy.GeoHashLayer = new _MapvLayer.MapVLayer(map, dataSet, style).addTo(map);
    }
  }, {
    key: 'onFailure',
    value: function onFailure() {}

    // convertData(response) {
    //   this.dataSet = [];
    //   response.features.forEach(function(feature) {
    //     this.dataSet.push({
    //       geometry: {
    //         type: 'Point',
    //         coordinates: feature.geometry.coordinates
    //       },
    //       count: feature.properties.aggcount
    //     });
    //   });
    // }
    //
    // updateLayer() {
    //   this.layer = new MapVLayer(this.map, this.dataSet, this.styleOption).addTo(this.map);
    // }
    //
    // removeLayer() {
    //   this.layer.remove(this.map);
    // }

  }]);

  return GeoHashService;
}();

;

var geoHashService = exports.geoHashService = function geoHashService(ip, socket, map, queryOption, styleOption) {
  return new GeoHashService(ip, socket, map, queryOption, styleOption);
};

_leaflet2.default.zondy.GeoHashService = geoHashService;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapvRenderer = undefined;

var _MapvRenderer = __webpack_require__(7);

exports.MapvRenderer = _MapvRenderer.MapvRenderer;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MapvLayer = __webpack_require__(2);

Object.defineProperty(exports, 'MapVLayer', {
  enumerable: true,
  get: function get() {
    return _MapvLayer.MapVLayer;
  }
});

var _mapv = __webpack_require__(10);

Object.keys(_mapv).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mapv[key];
    }
  });
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoPointService = exports.GeoPointService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = __webpack_require__(1);

var _leaflet2 = _interopRequireDefault(_leaflet);

var _Base = __webpack_require__(8);

__webpack_require__(3);

var _MapvLayer = __webpack_require__(2);

var _IServiceLoadData = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_leaflet2.default.zondy.GeoHashLayer = undefined;

var GeoPointService = exports.GeoPointService = function () {
  function GeoPointService(ip, socket, map, queryOption, styleOption) {
    _classCallCheck(this, GeoPointService);

    this.layer = null;

    this.map = map;
    this.urlAddress = "";

    this.queryOption = {};
    this.styleOption = styleOption;

    this.prefixUrlPost(ip, socket, queryOption);
    new _IServiceLoadData.IServiceLoadData("GET", this.urlAddress, this.queryOption, this.styleOption, this.map, this.onSuccess, this.onFailure);
  }

  /*
  * 下面的逻辑是对应的DataStore的Post请求一一对应，这里只是一个封装，将用户的直观参数
  转换成DataStore要求的参数
  */


  _createClass(GeoPointService, [{
    key: 'prefixUrlPost',
    value: function prefixUrlPost(ip, socket, queryOption) {
      //处理url
      this.urlAddress = "" + _Base.URL_HTTP_PROFIX + ip + _Base.URL_SUB + socket + "/es/" + _Base.QUERY_GEOHASH;
      //处理elasticsearch的数据库库名,表名
      this.queryOption.indexName = queryOption.db;
      this.queryOption.typeName = queryOption.table;
      //处理空间属性参数
      this.queryOption.aggfield = queryOption.space.field; //空间字段
      this.queryOption.spatialCondition = _Base.SPACE_ENUM_POLYGON + _Base.PARAM_SUB + queryOption.space.north + _Base.PARAM_COMMA + queryOption.space.west + _Base.PARAM_SPLIT + queryOption.space.north + _Base.PARAM_COMMA + queryOption.space.east + _Base.PARAM_SPLIT + queryOption.space.south + _Base.PARAM_COMMA + queryOption.space.east + _Base.PARAM_SPLIT + queryOption.space.south + _Base.PARAM_COMMA + queryOption.space.west;
      this.queryOption.aggGeoFormat = _Base.QUERY_GEOHASH_POINT; //结果以点的形式返回
      this.queryOption.percision = queryOption.space.percision;
      //处理时间属性参数
      this.queryOption.timefield = queryOption.time.field; //时间字段
      this.queryOption.timeCondition = "" + queryOption.time.starttime + _Base.PARAM_COMMA + queryOption.time.endtime; //时间起始时间
    }
  }, {
    key: 'onSuccess',
    value: function onSuccess(result, map, style) {
      if (_leaflet2.default.zondy.GeoHashLayer != undefined) _leaflet2.default.zondy.GeoHashLayer.remove();
      var dataSet = [];
      var features = result.features;
      if (features == null || features == undefined) return;
      features.forEach(function (feature) {
        dataSet.push({
          geometry: {
            type: 'Point',
            coordinates: feature.geometry.coordinates
          },
          count: feature.properties.aggcount
        });
      });
      _leaflet2.default.zondy.GeoHashLayer = new _MapvLayer.MapVLayer(map, dataSet, style).addTo(map);
    }
  }, {
    key: 'onFailure',
    value: function onFailure() {}

    // convertData(response) {
    //   this.dataSet = [];
    //   response.features.forEach(function(feature) {
    //     this.dataSet.push({
    //       geometry: {
    //         type: 'Point',
    //         coordinates: feature.geometry.coordinates
    //       },
    //       count: feature.properties.aggcount
    //     });
    //   });
    // }
    //
    // updateLayer() {
    //   this.layer = new MapVLayer(this.map, this.dataSet, this.styleOption).addTo(this.map);
    // }
    //
    // removeLayer() {
    //   this.layer.remove(this.map);
    // }

  }]);

  return GeoPointService;
}();

;

var geoPointService = exports.geoPointService = function geoPointService(ip, socket, map, queryOption, styleOption) {
  return new GeoPointService(ip, socket, map, queryOption, styleOption);
};

_leaflet2.default.zondy.GeoPointService = geoPointService;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Format = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = __webpack_require__(0);

var _Util = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Zondy.Format
 * @classdesc 读写各种格式的格式类基类。其子类应该包含并实现read和write方法。
 * @category BaseTypes Format
 * @param options - {Object} 可选参数。<br>
 *        keepData - {boolean} 如果设置为true， data属性会指向被解析的对象（例如json或xml数据对象）。
 */
var Format = exports.Format = function () {
  function Format(options) {
    _classCallCheck(this, Format);

    /**
     * @member Zondy.Format.prototype.data - {Object}
     * @description 当 <keepData> 属性设置为true，这是传递给<read>操作的要被解析的字符串。
     */
    this.data = null;

    /**
     * APIProperty: keepData
     * @member Zondy.Format.prototype.keepData - {Object}
     * @description 保持最近读到的数据的引用（通过 <data> 属性）。默认值是false。
     */
    this.keepData = false;

    _Util.Util.extend(this, options);
    /**
     * @member Zondy.Format.prototype.options - {Object}
     * @description 可选参数。
     */
    this.options = options;

    this.CLASS_NAME = "Zondy.Format";
  }

  /**
   * @function Zondy.Format.prototype.destroy
   * @description 销毁该格式类，释放相关资源。
   */


  _createClass(Format, [{
    key: 'destroy',
    value: function destroy() {}
    //用来销毁该格式类，释放相关资源


    /**
     * @function Zondy.Format.prototype.read
     * @description 来从字符串中读取数据。
     * @param data - {string} 读取的数据。
     */

  }, {
    key: 'read',
    value: function read(data) {} // eslint-disable-line no-unused-vars
    //用来从字符串中读取数据


    /**
     * @function Zondy.Format.prototype.write
     * @description 将对象写成字符串。
     * @param object - {Object} 可序列化的对象。
     * @return {string} 对象被写成字符串。
     */

  }, {
    key: 'write',
    value: function write(object) {// eslint-disable-line no-unused-vars
      //用来写字符串
    }
  }]);

  return Format;
}();

_Base.Zondy.Format = Format;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JSONFormat = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = __webpack_require__(0);

var _Format2 = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class Zondy.Format.JSON
 * @classdesc 安全的读写JSON的解析类。使用<Zondy.Format.JSON> 构造函数创建新实例。
 * @category BaseTypes Format
 * @extends Zondy.Format
 */
var JSONFormat = exports.JSONFormat = function (_Format) {
    _inherits(JSONFormat, _Format);

    function JSONFormat(options) {
        _classCallCheck(this, JSONFormat);

        /**
         * @member Zondy.Format.JSON.prototype.indent - {string}
         * @description 用于格式化输出，indent字符串会在每次缩进的时候使用一次。
         */
        var _this = _possibleConstructorReturn(this, (JSONFormat.__proto__ || Object.getPrototypeOf(JSONFormat)).call(this, options));

        _this.indent = "    ";

        /**
         * @member Zondy.Format.JSON.prototype.space -{string}
         * @description 用于格式化输出，space字符串会在名值对的":"后边添加。
         */
        _this.space = " ";

        /**
         * @member Zondy.Format.JSON.prototype.newline - {string}
         * @description 用于格式化输出, newline字符串会用在每一个名值对或数组项末尾。
         */
        _this.newline = "\n";

        /**
         * @member Zondy.Format.JSON.prototype.level - {integer}
         * @description 用于格式化输出, 表示的是缩进级别。
         */
        _this.level = 0;

        /**
         * @member Zondy.Format.JSON.prototype.pretty - {boolean}
         * @description 是否在序列化的时候使用额外的空格控制结构。在write方法中使用，默认值为false。
         */
        _this.pretty = false;

        /**
         * @member Zondy.Format.JSON.prototype.nativeJSON - {boolean}
         * @description 判断浏览器是否原生支持JSON格式数据。
         */
        _this.nativeJSON = function () {
            return !!(window.JSON && typeof JSON.parse === "function" && typeof JSON.stringify === "function");
        }();

        _this.CLASS_NAME = "Zondy.Format.JSON";
        /**
         * @member Zondy.Format.JSON.prototype.serialize
         * @description 提供一些类型对象转JSON字符串的方法。
         */
        _this.serialize = {
            /**
             * @function Zondy.Format.JSON.serialize.object
             * @description 把对象转换为JSON字符串。
             * @param object - {Object} 可序列化的对象。
             * @return {string} JSON字符串。
             */
            'object': function object(_object) {
                // three special objects that we want to treat differently
                if (_object == null) {
                    return "null";
                }
                if (_object.constructor === Date) {
                    return this.serialize.date.apply(this, [_object]);
                }
                if (_object.constructor === Array) {
                    return this.serialize.array.apply(this, [_object]);
                }
                var pieces = ['{'];
                this.level += 1;
                var key, keyJSON, valueJSON;

                var addComma = false;
                for (key in _object) {
                    if (_object.hasOwnProperty(key)) {
                        // recursive calls need to allow for sub-classing
                        keyJSON = this.write.apply(this, [key, this.pretty]);
                        valueJSON = this.write.apply(this, [_object[key], this.pretty]);
                        if (keyJSON != null && valueJSON != null) {
                            if (addComma) {
                                pieces.push(',');
                            }
                            pieces.push(this.writeNewline(), this.writeIndent(), keyJSON, ':', this.writeSpace(), valueJSON);
                            addComma = true;
                        }
                    }
                }

                this.level -= 1;
                pieces.push(this.writeNewline(), this.writeIndent(), '}');
                return pieces.join('');
            },

            /**
             * @function Zondy.Format.JSON.serialize.array
             * @description 把数组转换成JSON字符串。
             * @param array - {Array} 可序列化的数组。
             * @return {string} JSON字符串。
             */
            'array': function array(_array) {
                var json;
                var pieces = ['['];
                this.level += 1;

                for (var i = 0, len = _array.length; i < len; ++i) {
                    // recursive calls need to allow for sub-classing
                    json = this.write.apply(this, [_array[i], this.pretty]);
                    if (json != null) {
                        if (i > 0) {
                            pieces.push(',');
                        }
                        pieces.push(this.writeNewline(), this.writeIndent(), json);
                    }
                }

                this.level -= 1;
                pieces.push(this.writeNewline(), this.writeIndent(), ']');
                return pieces.join('');
            },

            /**
             * @function Zondy.Format.JSON.serialize.string
             * @description 把字符串转换成JSON字符串。
             * @param string - {string} 可序列化的字符串。
             * @return {string} JSON字符串。
             */
            'string': function string(_string) {
                // If the string contains no control characters, no quote characters, and no
                // backslash characters, then we can simply slap some quotes around it.
                // Otherwise we must also replace the offending characters with safe
                // sequences.
                var m = {
                    '\b': '\\b',
                    '\t': '\\t',
                    '\n': '\\n',
                    '\f': '\\f',
                    '\r': '\\r',
                    '"': '\\"',
                    '\\': '\\\\'
                };
                /*eslint-disable no-control-regex*/
                if (/["\\\x00-\x1f]/.test(_string)) {
                    return '"' + _string.replace(/([\x00-\x1f\\"])/g, function (a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                    }) + '"';
                }
                return '"' + _string + '"';
            },

            /**
             * @function Zondy.Format.JSON.serialize.number
             * @description 把数字转换成JSON字符串。
             * @param number - {number} 可序列化的数字。
             * @return {string} JSON字符串。
             */
            'number': function number(_number) {
                return isFinite(_number) ? String(_number) : "null";
            },

            /**
             * @function Zondy.Format.JSON.serialize.boolean
             * @description Transform a boolean into a JSON string.
             * @param bool - {boolean} The boolean to be serialized.
             * @return {string} A JSON string representing the boolean.
             */
            'boolean': function boolean(bool) {
                return String(bool);
            },

            /**
             * @function Zondy.Format.JSON.serialize.object
             * @description 将日期对象转换成JSON字符串。
             * @param date - {Date} 可序列化的日期对象。
             * @return {string} JSON字符串。
             */
            'date': function date(_date) {
                function format(number) {
                    // Format integers to have at least two digits.
                    return number < 10 ? '0' + number : number;
                }

                return '"' + _date.getFullYear() + '-' + format(_date.getMonth() + 1) + '-' + format(_date.getDate()) + 'T' + format(_date.getHours()) + ':' + format(_date.getMinutes()) + ':' + format(_date.getSeconds()) + '"';
            }
        };
        return _this;
    }

    /**
     * @function Zondy.Format.JSON.prototype.read
     * @description 将一个符合json结构的字符串进行解析。
     * @param json - {string} 符合json结构的字符串。
     * @param filter - {function} 过滤方法，最终结果的每一个键值对都会调用该过滤方法，并在对应的值的位置替换成该方法返回的值。
     * @return {Object} 对象，数组，字符串或数字。
     */


    _createClass(JSONFormat, [{
        key: 'read',
        value: function read(json, filter) {
            var object;
            if (this.nativeJSON) {
                try {
                    object = JSON.parse(json, filter);
                } catch (e) {
                    // Fall through if the regexp test fails.
                }
            }

            if (this.keepData) {
                this.data = object;
            }

            return object;
        }

        /**
         * @function Zondy.Format.JSON.prototype.write
         * @description 序列化一个对象到一个符合JSON格式的字符串。
         * @param value - {object}|{string}|<Array>|{number}|{boolean} 需要被序列化的对象，数组，字符串，数字，布尔值。
         * @param pretty - {boolean}
         * @return {string} 符合JSON格式的字符串。
         *
         */

    }, {
        key: 'write',
        value: function write(value, pretty) {
            this.pretty = !!pretty;
            var json = null;
            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
            if (this.serialize[type]) {
                try {
                    json = !this.pretty && this.nativeJSON ? JSON.stringify(value) : this.serialize[type].apply(this, [value]);
                } catch (err) {
                    //Zondy.Console.error("Trouble serializing: " + err);
                }
            }
            return json;
        }

        /**
         * @function Zondy.Format.JSON.prototype.writeIndent
         * @description 根据缩进级别输出一个缩进字符串。
         * @return {string} 一个适当的缩进字符串。
         */

    }, {
        key: 'writeIndent',
        value: function writeIndent() {
            var pieces = [];
            if (this.pretty) {
                for (var i = 0; i < this.level; ++i) {
                    pieces.push(this.indent);
                }
            }
            return pieces.join('');
        }

        /**
         * @function Zondy.Format.JSON.prototype.writeNewline
         * @description 在格式化输出模式情况下输出代表新一行的字符串。
         * @return {string} 代表新的一行的字符串。
         */

    }, {
        key: 'writeNewline',
        value: function writeNewline() {
            return this.pretty ? this.newline : '';
        }

        /**
         * @function Zondy.Format.JSON.prototype.writeSpace
         * @description 在格式化输出模式情况下输出一个代表空格的字符串。
         * @return {string} A space.
         */

    }, {
        key: 'writeSpace',
        value: function writeSpace() {
            return this.pretty ? this.space : '';
        }
    }]);

    return JSONFormat;
}(_Format2.Format);

_Base.Zondy.Format.JSON = JSONFormat;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (exports, module) {
  'use strict';

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  }

  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    var timeoutId = undefined;

    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        removeScript(scriptId);

        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      if (options.charset) {
        jsonpScript.setAttribute('charset', options.charset);
      }
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        window[callbackFunction] = function () {
          clearFunction(callbackFunction);
        };
      }, timeout);

      // Caught if got 404/500
      jsonpScript.onerror = function () {
        reject(new Error('JSONP request to ' + _url + ' failed'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  // if __disableNativeFetch is set to true, the it will always polyfill fetch
  // with Ajax.
  if (!self.__disableNativeFetch && self.fetch) {
    return
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob, options) {
    var reader = new FileReader()
    var contentType = options.headers.map['content-type'] ? options.headers.map['content-type'].toString() : ''
    var regex = /charset\=[0-9a-zA-Z\-\_]*;?/
    var _charset = blob.type.match(regex) || contentType.match(regex)
    var args = [blob]

    if(_charset) {
      args.push(_charset[0].replace(/^charset\=/, '').replace(/;$/, ''))
    }

    reader.readAsText.apply(reader, args)
    return fileReaderReady(reader)
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function Body() {
    this.bodyUsed = false


    this._initBody = function(body, options) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
        this._options = options
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob, this._options)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body, options)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this._initBody(bodyInit, options)
    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return;
      }

      var __onLoadHandled = false;

      function onload() {
        if (xhr.readyState !== 4) {
          return
        }
        var status = (xhr.status === 1223) ? 204 : xhr.status
        if (status < 100 || status > 599) {
          if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
          reject(new TypeError('Network request failed'))
          return
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText;

        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
        resolve(new Response(body, options))
      }
      xhr.onreadystatechange = onload;
      xhr.onload = onload;
      xhr.onerror = function() {
        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      // `withCredentials` should be setted after calling `.open` in IE10
      // http://stackoverflow.com/a/19667959/1219343
      try {
        if (request.credentials === 'include') {
          if ('withCredentials' in xhr) {
            xhr.withCredentials = true;
          } else {
            console && console.warn && console.warn('withCredentials is not supported, you can ignore this warning');
          }
        }
      } catch (e) {
        console && console.warn && console.warn('set withCredentials error:' + e);
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true

  // Support CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = self.fetch;
  }
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5), __webpack_require__(17)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(18);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19).setImmediate))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promisePolyfill = __webpack_require__(20);

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Promise = _promisePolyfill2.default;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FetchRequest = exports.RequestTimeout = exports.CORS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(21);

__webpack_require__(16);

var _fetchJsonp2 = __webpack_require__(15);

var _fetchJsonp3 = _interopRequireDefault(_fetchJsonp2);

var _Base = __webpack_require__(0);

var _Util = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetch = window.fetch;

/**
 * @member Zondy.CORS
 * @description 是否支持跨域
 * @type {boolean}
 */
var CORS = _Base.Zondy.CORS = _Base.Zondy.CORS || window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest();
/**
 * @member SuperMap.RequestTimeout
 * @description 请求超时时间，默认45s
 * @type {number}
 */
var RequestTimeout = _Base.Zondy.RequestTimeout = _Base.Zondy.RequestTimeout || 45000;
var FetchRequest = _Base.Zondy.FetchRequest = {
    commit: function commit(method, url, params, options) {
        method = method ? method.toUpperCase() : method;
        switch (method) {
            case 'GET':
                return this._get(url, params, options);
            case 'POST':
                return this._post(url, params, options);
            case 'PUT':
                return this._put(url, params, options);
            case 'DELETE':
                return this._delete(url, params, options);
            default:
                return this._get(url, params, options);
        }
    },

    _get: function _get(url, params, options) {
        options = options || {};
        var type = 'GET';
        url = this._processUrl(url, options);
        url = (0, _Util.urlAppend)(url, this._getParameterString(params || {}));
        if (!this.urlIsLong(url)) {
            return this._fetch(url, params, options, type);
            //            if (MapGis.Util.isInTheSameDomain(url) || CORS || options.proxy) {
            //                return this._fetch(url, params, options, type);
            //            }
            //            if (!MapGis.Util.isInTheSameDomain(url)) {
            //                url = url.replace('.json', '.jsonp');
            //                return this._fetchJsonp(url, options);
            //            }
        }
        return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    _delete: function _delete(url, params, options) {
        options = options || {};
        var type = 'DELETE';
        url = this._processUrl(url, options);
        url = (0, _Util.urlAppend)(url, this._getParameterString(params || {}));
        if (!this.urlIsLong(url) && CORS) {
            return this._fetch(url, params, options, type);
        }
        return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    _post: function _post(url, params, options) {
        options = options || {};
        return this._fetch(this._processUrl(url, options), params, options, 'POST');
    },

    _put: function _put(url, params, options) {
        options = options || {};
        return this._fetch(this._processUrl(url, options), params, options, 'PUT');
    },
    urlIsLong: function urlIsLong(url) {
        //当前url的字节长度。
        var totalLength = 0,
            charCode = null;
        for (var i = 0, len = url.length; i < len; i++) {
            //转化为Unicode编码
            charCode = url.charCodeAt(i);
            if (charCode < 0x007f) {
                totalLength++;
            } else if (0x0080 <= charCode && charCode <= 0x07ff) {
                totalLength += 2;
            } else if (0x0800 <= charCode && charCode <= 0xffff) {
                totalLength += 3;
            }
        }
        return totalLength < 2000 ? false : true;
    },
    _postSimulatie: function _postSimulatie(type, url, params, options) {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + '_method=' + type;
        if (typeof params !== 'string') {
            params = JSON.stringify(params);
        }
        return this._post(url, params, options);
    },

    _processUrl: function _processUrl(url, options) {
        if (this._isMVTRequest(url)) {
            return url;
        }

        //        if (url.indexOf('.json') === -1 && !options.withoutFormatSuffix) {
        //            if (url.indexOf("?") < 0) {
        //                url += '.json'
        //            } else {
        //                var urlArrays = url.split("?");
        //                if (urlArrays.length === 2) {
        //                    url = urlArrays[0] + ".json?" + urlArrays[1]
        //                }
        //            }
        //        }
        if (options && options.proxy) {
            if (typeof options.proxy === "function") {
                url = options.proxy(url);
            } else {
                url = decodeURIComponent(url);
                url = options.proxy + encodeURIComponent(url);
            }
        }
        return url;
    },

    _fetch: function _fetch(url, params, options, type) {
        options = options || {};
        options.headers = options.headers || {};
        if (!options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        //        options.headers['Access-Control-Allow-Origin'] = '*';
        //        options.headers['Access-Control-Allow-Headers'] = 'Origin,X-Requested-With,Content-Type,Accept';
        //        options.headers['Accept'] = 'application/json';
        // options.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE';
        if (options.timeout) {
            return this._timeout(options.timeout, fetch(url, {
                method: type,
                headers: options.headers,
                body: type === 'PUT' || type === 'POST' ? params : undefined,
                credentials: options.withCredentials ? 'include' : 'omit',
                mode: 'cors',
                timeout: RequestTimeout
            }).then(function (response) {
                return response;
            }));
        }
        return fetch(url, {
            method: type,
            body: type === 'PUT' || type === 'POST' ? params : undefined,
            headers: options.headers,
            credentials: options.withCredentials ? 'include' : 'omit',
            mode: 'cors',
            timeout: RequestTimeout
        }).then(function (response) {
            return response;
        });
    },

    _fetchJsonp: function _fetchJsonp(url, options) {
        options = options || {};
        return (0, _fetchJsonp3.default)(url, { method: 'GET', timeout: options.timeout }).then(function (response) {
            return response;
        });
    },

    _timeout: function _timeout(seconds, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"));
            }, seconds);
            promise.then(resolve, reject);
        });
    },

    _getParameterString: function _getParameterString(params) {
        var paramsArray = [];
        for (var key in params) {
            var value = params[key];
            if (value != null && typeof value !== 'function') {
                var encodedValue;
                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Array) {
                    var encodedItemArray = [];
                    var item;
                    for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                        item = value[itemIndex];
                        encodedItemArray.push(encodeURIComponent(item === null || item === undefined ? "" : item));
                    }
                    encodedValue = '[' + encodedItemArray.join(",") + ']';
                } else {
                    encodedValue = encodeURIComponent(value);
                }
                paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
            }
        }
        return paramsArray.join("&");
    },

    _isMVTRequest: function _isMVTRequest(url) {
        return url.indexOf('.mvt') > -1 || url.indexOf('.pbf') > -1;
    }
};
exports.CORS = CORS;
exports.RequestTimeout = RequestTimeout;
exports.FetchRequest = FetchRequest;

_Base.Zondy.Network.FetchRequest = FetchRequest;
_Base.Zondy.Network.CORS = CORS;
_Base.Zondy.Network.RequestTimeout = RequestTimeout;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function(){try{return mapv}catch(e){return {}}}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeoPointService = exports.GeoHashService = undefined;

var _GeoHashService = __webpack_require__(9);

var _GeoPointService = __webpack_require__(12);

exports.GeoHashService = _GeoHashService.GeoHashService;
exports.GeoPointService = _GeoPointService.GeoPointService;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeoHashService = undefined;

var _elasticsearch = __webpack_require__(24);

Object.keys(_elasticsearch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _elasticsearch[key];
    }
  });
});

var _GeoHashService = __webpack_require__(9);

exports.GeoHashService = _GeoHashService.GeoHashService;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = __webpack_require__(25);

Object.keys(_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _service[key];
    }
  });
});

var _overlay = __webpack_require__(11);

Object.keys(_overlay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _overlay[key];
    }
  });
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(26);


/***/ })
/******/ ]);