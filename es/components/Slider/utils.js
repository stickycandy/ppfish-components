function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { findDOMNode } from 'react-dom';
import { KeyCode } from '../../utils';
export function isEventFromHandle(e, handles) {
  return Object.keys(handles).some(function (key) {
    return e.target === findDOMNode(handles[key]);
  });
}
export function isValueOutOfRange(value, _ref) {
  var min = _ref.min,
      max = _ref.max;
  return value < min || value > max;
}
export function isNotTouchEvent(e) {
  return e.touches.length > 1 || e.type.toLowerCase() === 'touchend' && e.touches.length > 0;
}
export function getClosestPoint(val, _ref2) {
  var marks = _ref2.marks,
      step = _ref2.step,
      min = _ref2.min;
  var points = Object.keys(marks).map(parseFloat);

  if (step !== null) {
    var closestStep = Math.round((val - min) / step) * step + min;
    points.push(closestStep);
  }

  var diffs = points.map(function (point) {
    return Math.abs(val - point);
  });
  return points[diffs.indexOf(Math.min.apply(Math, _toConsumableArray(diffs)))];
}
export function getPrecision(step) {
  var stepString = step.toString();
  var precision = 0;

  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1;
  }

  return precision;
}
export function getMousePosition(vertical, e) {
  return vertical ? e.clientY : e.pageX;
}
export function getTouchPosition(vertical, e) {
  return vertical ? e.touches[0].clientY : e.touches[0].pageX;
}
export function getHandleCenterPosition(vertical, handle) {
  var coords = handle.getBoundingClientRect();
  return vertical ? coords.top + coords.height * 0.5 : coords.left + coords.width * 0.5;
}
export function ensureValueInRange(val, _ref3) {
  var max = _ref3.max,
      min = _ref3.min;

  if (val <= min) {
    return min;
  }

  if (val >= max) {
    return max;
  }

  return val;
}
export function ensureValuePrecision(val, props) {
  var step = props.step;
  var closestPoint = getClosestPoint(val, props);
  return step === null ? closestPoint : parseFloat(closestPoint.toFixed(getPrecision(step)));
}
export function pauseEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}
export function getKeyboardValueMutator(e) {
  switch (e.keyCode) {
    case KeyCode.UP:
    case KeyCode.RIGHT:
      return function (value, props) {
        return value + props.step;
      };

    case KeyCode.DOWN:
    case KeyCode.LEFT:
      return function (value, props) {
        return value - props.step;
      };

    case KeyCode.END:
      return function (value, props) {
        return props.max;
      };

    case KeyCode.HOME:
      return function (value, props) {
        return props.min;
      };

    case KeyCode.PAGE_UP:
      return function (value, props) {
        return value + props.step * 2;
      };

    case KeyCode.PAGE_DOWN:
      return function (value, props) {
        return value - props.step * 2;
      };

    default:
      return undefined;
  }
}