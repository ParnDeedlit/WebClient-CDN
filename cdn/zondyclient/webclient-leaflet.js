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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = L;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapvRenderer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mapv = __webpack_require__(3);

var _leaflet = __webpack_require__(0);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapvRenderer = undefined;

var _MapvRenderer = __webpack_require__(1);

exports.MapvRenderer = _MapvRenderer.MapvRenderer;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(){try{return mapv}catch(e){return {}}}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_leaflet2.default.zondy = _leaflet2.default.zondy || {}; /**
                                                          *MapGIS WebClient Leaflet基类
                                                          * 定义命名空间
                                                          * 提供公共模块
                                                          */

_leaflet2.default.zondy.control = _leaflet2.default.zondy.control || {}; //讲真，人家这样做从架构上其实还确实挺正确的

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapvLayer = exports.MapVLayer = undefined;

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

__webpack_require__(4);

var _MapvRenderer = __webpack_require__(1);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MapvLayer = __webpack_require__(5);

Object.defineProperty(exports, 'MapVLayer', {
  enumerable: true,
  get: function get() {
    return _MapvLayer.MapVLayer;
  }
});

var _mapv = __webpack_require__(2);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overlay = __webpack_require__(6);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ })
/******/ ]);