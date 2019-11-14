function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { swapArrayElements, isMouseBeyond } from './helpers.js';
export var VERTICAL = 'VERTICAL';
export var HORIZONTAL = 'HORIZONTAL';
/*** Higher-order component - this component works like a factory for draggable items */

var draggingIndex = null;
export function SortableComposition(Component) {
  var _class, _temp;

  var flowDirection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : VERTICAL;
  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Sortable, _React$Component);

    function Sortable() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Sortable);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Sortable)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "sortEnd", function (e) {
        e.preventDefault();
        draggingIndex = null;
      });

      _defineProperty(_assertThisInitialized(_this), "sortStart", function (e) {
        draggingIndex = e.currentTarget.dataset.id;
        var dt = e.dataTransfer;

        if (dt !== undefined) {
          dt.effectAllowed = 'move';
          e.dataTransfer.setData('text', e.target.innerHTML);

          if (dt.setDragImage && e.currentTarget.tagName.toLowerCase() === 'a') {
            dt.setDragImage(e.target, 0, 0);
          }
        }
      });

      _defineProperty(_assertThisInitialized(_this), "dragOver", function (e) {
        e.preventDefault();
        var _this$props = _this.props,
            moveInMiddle = _this$props.moveInMiddle,
            sortId = _this$props.sortId;
        var overEl = e.currentTarget; //underlying element

        var indexDragged = Number(overEl.dataset.id); //index of underlying element in the set DOM elements

        var indexFrom = Number(draggingIndex);
        var height = overEl.getBoundingClientRect().height;
        var width = overEl.getBoundingClientRect().width;
        var positionX = e.clientX;
        var positionY = e.clientY;
        var topOffset = overEl.getBoundingClientRect().top;
        var leftOffset = overEl.getBoundingClientRect().left;
        var mouseBeyond;
        var items = _this.props.items;

        if (flowDirection === VERTICAL) {
          mouseBeyond = isMouseBeyond(positionY, topOffset, height, moveInMiddle);
        }

        if (flowDirection === HORIZONTAL) {
          mouseBeyond = isMouseBeyond(positionX, leftOffset, width, moveInMiddle);
        }

        if (indexDragged !== indexFrom && mouseBeyond) {
          items = swapArrayElements(items, indexFrom, indexDragged);
          draggingIndex = indexDragged;

          _this.props.onSortItems(items);
        }
      });

      return _this;
    }

    _createClass(Sortable, [{
      key: "render",
      value: function render() {
        var newProps = Object.assign({}, this.props);
        delete newProps.onSortItems;

        var sortId = newProps.sortId,
            moveInMiddle = newProps.moveInMiddle,
            items = newProps.items,
            props = _objectWithoutProperties(newProps, ["sortId", "moveInMiddle", "items"]);

        return React.createElement(Component, _extends({
          draggable: true,
          onDragOver: this.dragOver,
          onDragStart: this.sortStart,
          onDragEnd: this.sortEnd,
          onTouchStart: this.sortStart,
          onTouchMove: this.dragOver,
          onTouchEnd: this.sortEnd,
          "data-id": sortId
        }, props));
      }
    }]);

    return Sortable;
  }(React.Component), _defineProperty(_class, "propTypes", {
    items: PropTypes.array.isRequired,
    onSortItems: PropTypes.func.isRequired,
    sortId: PropTypes.number,
    moveInMiddle: PropTypes.bool
  }), _defineProperty(_class, "defaultProps", {
    moveInMiddle: false
  }), _temp;
}