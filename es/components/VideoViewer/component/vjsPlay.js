function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import ReactDOM from 'react-dom';
import videojs from 'video.js';
import Play from './Play';
var vjsComponent = videojs.getComponent('Component');

var vjsPlay =
/*#__PURE__*/
function (_vjsComponent) {
  _inherits(vjsPlay, _vjsComponent);

  function vjsPlay(player, options) {
    var _this;

    _classCallCheck(this, vjsPlay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(vjsPlay).call(this, player, options));
    /* Bind the current class context to the mount method */

    _this.mount = _this.mount.bind(_assertThisInitialized(_this));
    /* When player is ready, call method to mount React component */

    player.ready(function () {
      _this.mount();
    });
    /* Remove React root when component is destroyed */

    _this.on("dispose", function () {
      ReactDOM.unmountComponentAtNode(_this.el());
    });

    return _this;
  }
  /**
   * We will render out the React EpisodeList component into the DOM element
   * generated automatically by the VideoJS createEl() method.
   *
   * We fetch that generated element using `this.el()`, a method provided by the
   * vjsComponent class that this class is extending.
   */


  _createClass(vjsPlay, [{
    key: "mount",
    value: function mount() {
      var el = this.el();
      el.className = "vjs-control vjs-button vjs-customer-button vjs-play";
      ReactDOM.render(React.createElement(Play, {
        vjsComponent: this
      }), el);
    }
  }]);

  return vjsPlay;
}(vjsComponent);
/**
 * Make sure to register the vjsComponent so Video JS knows it exists
 */


vjsComponent.registerComponent('vjsPlay', vjsPlay);
export default vjsPlay;