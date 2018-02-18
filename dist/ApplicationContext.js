'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Context = require('./Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApplicationContext = function () {
  function ApplicationContext(options) {
    _classCallCheck(this, ApplicationContext);

    this.context = new _Context2.default(options);
  }

  _createClass(ApplicationContext, [{
    key: 'getContext',
    value: function getContext() {
      return this.context;
    }
  }], [{
    key: 'getContext',
    value: function getContext(options) {
      if (this.applicationContext == undefined) {
        this.applicationContext = new ApplicationContext(options);
      }
      return this.applicationContext.getContext();
    }
  }]);

  return ApplicationContext;
}();

exports.default = ApplicationContext;