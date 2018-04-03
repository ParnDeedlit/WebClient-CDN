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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = mapboxgl;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(){try{return mapv}catch(e){return {}}}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapvRenderer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mapv = __webpack_require__(1);

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseLayer = _mapv.baiduMapLayer ? _mapv.baiduMapLayer.__proto__ : Function;

/**
 * @private
 * @class MapvRenderer
 * @classdesc MapV图层渲染
 * @param map - {string} 地图
 * @param layer -{Object} 图层
 * @param dataSet -{Object} 数据集
 * @param options -{Object} 交互时所需可选参数。
 * @extends BaseLayer
 *
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
    _this.stopAniamation = false;
    _this.animation = options.animation;
    _this.clickEvent = _this.clickEvent.bind(_this);
    _this.mousemoveEvent = _this.mousemoveEvent.bind(_this);
    _this.map.on('resize', _this.resizeEvent.bind(_this));
    _this.map.on('zoomstart', _this.zoomStartEvent.bind(_this));
    _this.map.on('zoomend', _this.zoomEndEvent.bind(_this));
    _this.map.on('rotatestart', _this.rotateStartEvent.bind(_this));
    _this.map.on('rotate', _this.rotateEvent.bind(_this));
    _this.map.on('rotateend', _this.rotateEndEvent.bind(_this));
    _this.map.on('dragend', _this.dragEndEvent.bind(_this));
    _this.map.on('movestart', _this.moveStartEvent.bind(_this));
    _this.map.on('move', _this.moveEvent.bind(_this));
    _this.map.on('moveend', _this.moveEndEvent.bind(_this));
    _this.map.on('remove', _this.removeEvent.bind(_this));
    _this.bindEvent();
    return _this;
  }

  /**
   * @function MapvRenderer.prototype.clickEvent
   * @description  点击绑定事件
   * @param e - {Object} 事件
   */


  _createClass(MapvRenderer, [{
    key: 'clickEvent',
    value: function clickEvent(e) {
      var pixel = e.point;
      _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'clickEvent', this).call(this, pixel, e);
    }

    /**
     * @function MapvRenderer.prototype.mousemoveEvent
     * @description  鼠标移动事件
     * @param e - {Object} 事件
     */

  }, {
    key: 'mousemoveEvent',
    value: function mousemoveEvent(e) {
      var pixel = e.point;
      _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'mousemoveEvent', this).call(this, pixel, e);
    }

    /**
     * @function  MapvRenderer.prototype.bindEvent
     * @description 绑定事件
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
    }

    /**
     * @function MapvRenderer.prototype.unbindEvent
     * @description 解绑事件
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
    }

    /**
     * @function MapvRenderer.prototype.getContext
     * @description 获取信息
     */

  }, {
    key: 'getContext',
    value: function getContext() {
      return this.canvasLayer.canvas.getContext(this.context);
    }

    /**
     * @function MapvRenderer.prototype.addData
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
     * @function MapvRenderer.prototype.update
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
     * @function MapvRenderer.prototype.getData
     * @description 获取数据
     */

  }, {
    key: 'getData',
    value: function getData() {
      return this.dataSet;
    }

    /**
     * @function MapvRenderer.prototype.removeData
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
     * @function MapVRenderer.prototype.clearData
     * @description 清除数据
     */

  }, {
    key: 'clearData',
    value: function clearData() {
      this.dataSet && this.dataSet.clear();
      this.update({
        options: null
      });
    }

    /**
     * @function MapVRenderer.prototype.updateData
     * @param dataSet - {Object} 数据集
     * @param options - {Object} 数据项配置
     * @description  更新数据
     */

  }, {
    key: 'updateData',
    value: function updateData(dataSet, options) {
      if (dataSet && dataSet.get) {
        this.dataSet.set(dataSet.get());
      }
      this.update({
        options: options
      });
    }
  }, {
    key: '_canvasUpdate',
    value: function _canvasUpdate(time) {
      var map = this.map;
      if (!this.canvasLayer || this.stopAniamation) {
        return;
      }
      var self = this;

      var animationOptions = self.options.animation;

      var context = this.getContext();

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

      var dataGetOptions = {
        transferCoordinate: function transferCoordinate(coordinate) {
          var worldPoint = map.project(new _mapboxGl2.default.LngLat(coordinate[0], coordinate[1]));
          return [worldPoint.x, worldPoint.y];
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

      var worldPoint = map.project(new _mapboxGl2.default.LngLat(0, 0));
      this.drawContext(context, new _mapv.DataSet(data), self.options, worldPoint);

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

    /**
     * @function MapvRenderer.prototype.addAnimatorEvent
     * @description 添加动画事件
     */

  }, {
    key: 'addAnimatorEvent',
    value: function addAnimatorEvent() {}

    /**
     * @function MapvRenderer.prototype.removeEvent
     * @description 移除事件
     */

  }, {
    key: 'removeEvent',
    value: function removeEvent() {
      this.canvasLayer.mapContainer.removeChild(this.canvasLayer.canvas);
    }

    /**
     * @function MapvRenderer.prototype.resizeEvent
     * @description 调整事件
     */

  }, {
    key: 'resizeEvent',
    value: function resizeEvent() {
      this.canvasLayer.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
      var canvas = this.canvasLayer.canvas;
      canvas.style.position = 'absolute';
      canvas.style.top = 0 + "px";
      canvas.style.left = 0 + "px";
      canvas.width = parseInt(this.map.getCanvas().style.width);
      canvas.height = parseInt(this.map.getCanvas().style.height);
      canvas.style.width = this.map.getCanvas().style.width;
      canvas.style.height = this.map.getCanvas().style.height;
    }
  }, {
    key: 'moveEndEvent',
    value: function moveEndEvent() {
      this.stopAniamation = false;
      var canvas = this.getContext().canvas;
      canvas.style.transform = '';
      this._canvasUpdate();
      this._show();
    }
  }, {
    key: 'moveStartEvent',
    value: function moveStartEvent() {
      this.startPitch = this.map.getPitch();
      this.startBearing = this.map.getBearing();
      var startMovePoint = this.map.project(new _mapboxGl2.default.LngLat(0, 0));
      this.startMoveX = startMovePoint.x;
      this.startMoveY = startMovePoint.y;
      if (this.animation) {
        this.stopAniamation = true;
      }
    }
  }, {
    key: 'moveEvent',
    value: function moveEvent() {
      if (this.rotating || this.zooming) {
        return;
      }
      if (this.map.getPitch() !== 0) {
        this._hide();
      }
      this.canvasLayer.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
      var tPitch = this.map.getPitch() - this.startPitch;
      var tBearing = -this.map.getBearing() + this.startBearing;
      var endMovePoint = this.map.project(new _mapboxGl2.default.LngLat(0, 0));
      var tMoveX = endMovePoint.x - this.startMoveX;
      var tMoveY = endMovePoint.y - this.startMoveY;
      var canvas = this.getContext().canvas;
      canvas.style.transform = 'rotateX(' + tPitch + 'deg)' + ' rotateZ(' + tBearing + 'deg)' + ' translate3d(' + tMoveX + 'px, ' + tMoveY + 'px, 0px)';
    }
  }, {
    key: 'zoomStartEvent',
    value: function zoomStartEvent() {
      this.zooming = true;
      this._hide();
    }
  }, {
    key: 'zoomEndEvent',
    value: function zoomEndEvent() {
      this.zooming = false;
      this._show();
    }
  }, {
    key: 'rotateStartEvent',
    value: function rotateStartEvent() {
      this.rotating = true;
    }
  }, {
    key: 'rotateEvent',
    value: function rotateEvent() {
      if (this.map.getPitch() !== 0) {
        this._hide();
      }
      this.canvasLayer.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
      var tPitch = this.map.getPitch() - this.startPitch;
      var tBearing = -this.map.getBearing() + this.startBearing;
      var canvas = this.getContext().canvas;
      canvas.style.transform = 'rotateX(' + tPitch + 'deg)' + ' rotateZ(' + tBearing + 'deg)';
    }
  }, {
    key: 'rotateEndEvent',
    value: function rotateEndEvent() {
      this.rotating = false;
      this._show();
    }
  }, {
    key: 'dragEndEvent',
    value: function dragEndEvent() {
      this._hide();
    }

    /**
     * @function MapvRenderer.prototype.clear
     * @param context - {object} 当前环境
     * @description 清除环境
     */

  }, {
    key: 'clear',
    value: function clear(context) {
      context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    /**
     * @function MapvRenderer.prototype.draw
     * @description 渲染绘制
     */

  }, {
    key: 'draw',
    value: function draw() {
      this._canvasUpdate();
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
  }]);

  return MapvRenderer;
}(BaseLayer);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

__webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SuperMap mapboxgl基类
 * 定义命名空间
 */
_mapboxGl2.default.zondy = _mapboxGl2.default.zondy || {};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapExtend = undefined;

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function mapboxgl.zondy.MapExtend
 * @description 扩展了mapboxgl.Map对图层相关的操作
 * @private
 */
var MapExtend = exports.MapExtend = function () {

  _mapboxGl2.default.Map.prototype.overlayLayersManager = {};

  _mapboxGl2.default.Map.prototype.addLayer = function (layer, before) {
    if (layer.source) {
      this.style.addLayer(layer, before);
      this._update(true);
      return this;
    }
    if (this.overlayLayersManager[layer.id] || this.style._layers[layer.id]) {
      this.fire('error', {
        error: new Error('A layer with this id already exists.')
      });
      return;
    }
    addLayer(layer, this);
    this.overlayLayersManager[layer.id] = layer;
    return this;
  };
  _mapboxGl2.default.Map.prototype.getLayer = function (id) {
    if (this.overlayLayersManager[id]) {
      return this.overlayLayersManager[id];
    }
    return this.style.getLayer(id);
  };

  _mapboxGl2.default.Map.prototype.moveLayer = function (id, beforeId) {
    if (this.overlayLayersManager[id]) {
      moveLayer(id, beforeId);
      return this;
    }
    if (this.style._layers[id]) {
      this.style.moveLayer(id, beforeId);
      this._update(true);
      return this;
    }
  };

  _mapboxGl2.default.Map.prototype.removeLayer = function (id) {
    if (this.overlayLayersManager[id]) {
      removeLayer(this.overlayLayersManager[id]);
      delete this.overlayLayersManager[id];
      return this;
    }
    this.style.removeLayer(id);
    this._update(true);
    return this;
  };

  //目前扩展的overlayer，只支持 显示或隐藏图层操作
  _mapboxGl2.default.Map.prototype.setLayoutProperty = function (layerID, name, value) {
    if (this.overlayLayersManager[layerID]) {
      if (name === "visibility") {
        if (value === "block") {
          value = true;
        } else {
          value = false;
        }
        setVisibility(this.overlayLayersManager[layerID], value);
      }
      return this;
    }
    this.style.setLayoutProperty(layerID, name, value);
    this._update(true);
    return this;
  };

  function addLayer(layer, map) {
    layer.onAdd(map);
  }

  /**
   * @function mapboxgl.zondy.MapExtend.prototype.removeFromMap
   * @description 移除事件
   */
  function removeLayer(layer) {
    layer.removeFromMap();
  }

  /**
   * @function mapboxgl.zondy.MapExtend.prototype.setVisibility
   * @description 设置图层可见性，设置图层的隐藏，显示，重绘的相应的可见标记。
   * @param visibility - {string} 是否显示图层（当前地图的resolution在最大最小resolution之间）。
   */
  function setVisibility(layer, visibility) {
    layer.setVisibility(visibility);
  }

  /**
   * @function mapboxgl.zondy.MapExtend.prototype.moveTo
   * @description 将图层移动到某个图层之前。
   * @param layerID - {string} 待插入的图层ID。
   * @param beforeLayerID - {boolean} 是否将本图层插入到图层id为layerID的图层之前(默认为true，如果为false则将本图层插入到图层id为layerID的图层之后)。
   */
  function moveLayer(layerID, beforeLayerID) {
    var layer = document.getElementById(layerID);
    // var beforeLayer;
    if (beforeLayerID) {
      var beforeLayer = document.getElementById(beforeLayerID);
      if (!beforeLayer) {
        _mapboxGl2.default.Evented.prototype.fire("error", {
          error: new Error('Layer with id "' + beforeLayerID + '" does not exist on this document.')
        });
      }
    }
    if (layer && beforeLayer) {
      beforeLayer.parentNode.insertBefore(layer, beforeLayer);
    } else {
      //当没有传入beforeLayerID ，则默认将图层移动到最上面
      layer.parentNode.appendChild(layer);
    }
  }
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPaintProperty = exports.setBackground = exports.getDefaultVectorTileStyle = undefined;

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mapboxGl2.default.zondy = _mapboxGl2.default.zondy || {};
_mapboxGl2.default.zondy.map = _mapboxGl2.default.zondy.map || {};

/**
 * @class mapboxgl.zondy.map.getDefaultVectorTileStyle
 * @description 配置默认底图样式
 */
var getDefaultVectorTileStyle = exports.getDefaultVectorTileStyle = function getDefaultVectorTileStyle(urlTemplate, options) {
  options = options || {};
  var defaultOptions = {};
  defaultOptions.version = options.version || 8;
  defaultOptions.layers = options.layers || [];
  defaultOptions.light = options.light || {
    "anchor": "viewport",
    "color": "#fcf6ef",
    "intensity": 0.5,
    "position": [1.15, 201, 20]
  };

  var style = {
    "version": defaultOptions.version,
    "sources": {
      "vector-tiles": {
        "type": "vector",
        "tiles": [urlTemplate]
      }
    },
    "layers": defaultOptions.layers,
    "light": defaultOptions.light
  };
  if (options.sprite != null) {
    style.sprite = options.sprite;
  }
  if (options.glyphs != null) {
    style.glyphs = options.glyphs;
  }
  return style;
};

/**
 * @class mapboxgl.zondy.map.setBackground
 * @description 设置地图背景
 */
var setBackground = exports.setBackground = function setBackground(map, color) {
  if (color && map) {
    map.addLayer({
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": color
      }
    }, "background");
  }
};

/**
 * @class mapboxgl.zondy.map.setPaintProperty
 * @description  设置图层风格
 * @param map
 * @param layerIds
 * @param type
 * @param paint
 * @param source 非必填，默认vector-tiles
 * @param sourceLayers 非必填，默认与id对应
 */
var setPaintProperty = exports.setPaintProperty = function setPaintProperty(map, layerIds, type, paint, source, sourceLayers) {
  if (layerIds && map) {
    if (Object.prototype.toString.call(layerIds) !== '[object Array]') {
      layerIds = [layerIds];
    }
    for (var i = 0; i < layerIds.length; i++) {
      var sourceLayer = sourceLayers ? sourceLayers[i] : null;
      var layer = getLayer(layerIds[i], type, source, sourceLayer, paint);
      map.addLayer(layer, layerIds[i]);
      map.moveLayer(layerIds[i]);
    }
  }
};

function getLayer(id, type, source, sourceLayer, paint) {
  var sourceType = source || "vector-tiles";
  var sLayer = sourceLayer || id;
  var layer = {
    "id": id,
    "type": type,
    "source": sourceType,
    "source-layer": sLayer,
    "paint": paint
  };
  return layer;
}

_mapboxGl2.default.zondy.map.getDefaultVectorTileStyle = getDefaultVectorTileStyle;
_mapboxGl2.default.zondy.map.setBackground = setBackground;
_mapboxGl2.default.zondy.map.setPaintProperty = setPaintProperty;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapvDataSet = undefined;

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _mapv = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapvDataSet = exports.MapvDataSet = {

  /**
   * 返回mapv点数据集
   */
  getPoint: function getPoint(center) {
    if (center && center instanceof Array) {
      return new _mapv.DataSet([{
        geometry: {
          type: 'Point',
          coordinates: center
        }
      }]);
    }
  },

  /**
   * 返回mapv多点数据集
   */
  getPoints: function getPoints(points) {
    if (points && points instanceof Array) {
      var mPoints = [];
      points.map(function (data) {
        mPoints.push({
          geometry: {
            type: 'Point',
            coordinates: data.geometry.coordinates
          }
        });
        return data;
      });
      return new _mapv.DataSet(mPoints);
    }
  },

  /**
   * 返回mapv弧形线数据集
   */
  getCurveLines: function getCurveLines(startPoint, LinePoints) {
    if (startPoint && startPoint instanceof Array && LinePoints && LinePoints instanceof Array) {
      var lineData = [];
      LinePoints.map(function (data) {
        var coords = data.geometry && data.geometry.coordinates;
        var toCenter = {
          lng: coords[0],
          lat: coords[1]
        };
        var fromCenter = {
          lng: startPoint[0],
          lat: startPoint[1]
        };
        var cv = _mapv.utilCurve.getPoints([fromCenter, toCenter]);
        lineData.push({
          geometry: {
            type: 'LineString',
            coordinates: cv
          }
        });
        return data;
      });
      return new _mapv.DataSet(lineData);
    }
  },

  /**
   * 返回mapv弧形动态点数据集
   */
  getCurveDynamicPoints: function getCurveDynamicPoints(center, endPoints) {
    if (center && center instanceof Array && endPoints && endPoints instanceof Array) {
      var timeData = [];
      endPoints.map(function (data) {
        var coords = data.geometry && data.geometry.coordinates;
        var toCenter = {
          lng: coords[0],
          lat: coords[1]
        };
        var fromCenter = {
          lng: center[0],
          lat: center[1]
        };
        var cv = _mapv.utilCurve.getPoints([fromCenter, toCenter]);
        for (var j = 0; j < cv.length; j++) {
          timeData.push({
            geometry: {
              type: 'Point',
              coordinates: cv[j]
            },
            time: j
          });
        }
        return data;
      });
      return new _mapv.DataSet(timeData);
    }
  }
};

_mapboxGl2.default.zondy.MapvDataSet = MapvDataSet;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MapvDataSet = __webpack_require__(6);

Object.defineProperty(exports, 'MapvDataSet', {
  enumerable: true,
  get: function get() {
    return _MapvDataSet.MapvDataSet;
  }
});

var _MapvRenderer = __webpack_require__(2);

Object.defineProperty(exports, 'MapvRenderer', {
  enumerable: true,
  get: function get() {
    return _MapvRenderer.MapvRenderer;
  }
});

var _MapExtend = __webpack_require__(5);

Object.keys(_MapExtend).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MapExtend[key];
    }
  });
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapvLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

__webpack_require__(3);

var _MapvRenderer = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class mapboxgl.zondy.MapvLayer
 * @category  Visualization MapV
 * @classdesc Mapv图层
 * @param map - {Object} 地图
 * @param dataSet -{Object} 数据集
 * @param mapVOptions -{Object} Mapv参数。如：
 *        layerID - {string} 图层ID。<br>
 */
var MapvLayer = exports.MapvLayer = function () {
  function MapvLayer(map, dataSet, mapVOptions) {
    _classCallCheck(this, MapvLayer);

    this.map = map;
    this.layerID = mapVOptions.layerID;
    delete mapVOptions["layerID"];
    this.renderer = new _MapvRenderer.MapvRenderer(map, this, dataSet, mapVOptions);
    this.mapVOptions = mapVOptions;
    this.canvas = this._createCanvas();
    this.renderer._canvasUpdate();
    this.mapContainer = map.getCanvasContainer();
    this.mapContainer.appendChild(this.canvas);
    this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
  }

  /**
   * @function mapboxgl.zondy.MapvLayer.prototype.getTopLeft
   * @description 获取左上的距离
   */


  _createClass(MapvLayer, [{
    key: 'getTopLeft',
    value: function getTopLeft() {
      var map = this.map;
      var topLeft;
      if (map) {
        var bounds = map.getBounds();
        topLeft = bounds.getNorthWest();
      }
      return topLeft;
    }

    /**
     * @function mapboxgl.zondy.MapvLayer.prototype.addData
     * @description 追加数据
     * @param data - {Object} 要追加的数据
     * @param options -{Object} 要追加的值
     */

  }, {
    key: 'addData',
    value: function addData(data, options) {
      this.renderer.addData(data, options);
    }

    /**
     * @function mapboxgl.zondy.MapvLayer.prototype.update
     * @description 更新图层
     * @param opt - {Object} 待更新的数据<br>
     *        data -{Object} mapv数据集<br>
     *        options -{Object} mapv绘制参数<br>
     */

  }, {
    key: 'update',
    value: function update(opt) {
      this.renderer.update(opt);
    }

    /**
     * @function mapboxgl.zondy.MapvLayer.prototype.getData
     * @description 获取数据
     * @return {mapv.DataSet} mapv数据集
     */

  }, {
    key: 'getData',
    value: function getData() {
      if (this.renderer) {
        this.dataSet = this.renderer.getData();
      }
      return this.dataSet;
    }

    /**
     * @function mapboxgl.zondy.MapvLayer.prototype.removeData
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

  }, {
    key: 'removeData',
    value: function removeData(filter) {
      this.renderer && this.renderer.removeData(filter);
    }

    /**
     * @function mapboxgl.zondy.MapvLayer.prototype.clearData
     * @description 清除数据
     */

  }, {
    key: 'clearData',
    value: function clearData() {
      this.renderer.clearData();
    }
  }, {
    key: 'show',
    value: function show() {
      if (this.renderer) {
        this.renderer._show();
      }
      return this;
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (this.renderer) {
        this.renderer._hide();
      }
      return this;
    }
  }, {
    key: '_createCanvas',
    value: function _createCanvas() {
      var canvas = document.createElement('canvas');
      canvas.id = this.layerID;
      canvas.style.position = 'absolute';
      canvas.style.top = 0 + "px";
      canvas.style.left = 0 + "px";
      canvas.width = parseInt(this.map.getCanvas().style.width);
      canvas.height = parseInt(this.map.getCanvas().style.height);
      canvas.style.width = this.map.getCanvas().style.width;
      canvas.style.height = this.map.getCanvas().style.height;
      var global$2 = typeof window === 'undefined' ? {} : window;
      var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio;
      if (this.mapVOptions.context == '2d') {
        canvas.getContext(this.mapVOptions.context).scale(devicePixelRatio, devicePixelRatio);
      }
      return canvas;
    }

    /**
     * @function mapboxgl.zondy.MapvLayer.prototype.moveTo
     * @description 将图层移动到某个图层之前。
     * @param layerID - {string} 待插入的图层ID。
     * @param before - {boolean} 是否将本图层插入到图层id为layerID的图层之前(默认为true，如果为false则将本图层插入到图层id为layerID的图层之后)。
     */

  }, {
    key: 'moveTo',
    value: function moveTo(layerID, before) {
      var layer = document.getElementById(this.layerID);
      before = before !== undefined ? before : true;
      if (before) {
        var beforeLayer = document.getElementById(layerID);
        if (layer && beforeLayer) {
          beforeLayer.parentNode.insertBefore(layer, beforeLayer);
        }
        return;
      }
      var nextLayer = document.getElementById(layerID);
      if (layer) {
        if (nextLayer.nextSibling) {
          nextLayer.parentNode.insertBefore(layer, nextLayer.nextSibling);
          return;
        }
        nextLayer.parentNode.appendChild(layer);
      }
    }
  }]);

  return MapvLayer;
}();

_mapboxGl2.default.zondy.MapvLayer = MapvLayer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MapvLayer = __webpack_require__(8);

Object.defineProperty(exports, 'MapvLayer', {
  enumerable: true,
  get: function get() {
    return _MapvLayer.MapvLayer;
  }
});

var _mapv = __webpack_require__(7);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MapExtend = __webpack_require__(4);

Object.defineProperty(exports, 'MapExtend', {
  enumerable: true,
  get: function get() {
    return _MapExtend.MapExtend;
  }
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(10);

Object.keys(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _core[key];
    }
  });
});

var _overlay = __webpack_require__(9);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ })
/******/ ]);