'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = function () {
  function Context(options) {
    _classCallCheck(this, Context);

    this.options = options;
    this.beans = {};
  }

  _createClass(Context, [{
    key: 'setBeans',
    value: function setBeans(beans) {
      this.beans = beans;
    }
  }, {
    key: 'getBean',
    value: function getBean(name) {
      if (!this.beans[name]) {
        if (!this.beanCreators[name]) {
          throw new Error('bean is not provided, name: ' + name);
        }

        var bean = this.beanCreators[name].call();
        this.options.debug && console.log('bean created: ' + name);

        this.beans[name] = bean;
      }
      return this.beans[name];
    }
  }, {
    key: 'provideBean',
    value: function provideBean(name, obj) {
      this.beans[name] = obj;
    }
  }, {
    key: 'setBeanCreators',
    value: function setBeanCreators(beanCreators) {
      this.beanCreators = beanCreators;
    }
  }]);

  return Context;
}();

exports.default = Context;