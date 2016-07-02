'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Inject;

var _ApplicationContext = require('./ApplicationContext');

var _ApplicationContext2 = _interopRequireDefault(_ApplicationContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Inject(deps) {
  deps = deps || [];

  return function (clazz) {
    var constructor = function constructor() {
      var _this = this;

      // inject beans from deps
      deps.forEach(function (d) {
        var bean = _ApplicationContext2.default.getContext().getBean(d);
        Object.defineProperty(_this, d, { value: bean });
      });

      // inject from mehod meta information
      Reflect.ownKeys(clazz.prototype).forEach(function (k) {
        if (typeof clazz.prototype[k] == 'function') {
          var injectName = clazz.prototype[k].__injectName;

          if (injectName !== undefined) {
            var bean = _ApplicationContext2.default.getContext().getBean(injectName);
            clazz.prototype[k].apply(_this, [bean]);
          }
        }
      });

      clazz.prototype.constructor.apply(this, arguments);
    };

    inherits(constructor, clazz);
    return constructor;
  };
}

function inherits(subClass, superClass) {
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  Object.setPrototypeOf(subClass, superClass);
}