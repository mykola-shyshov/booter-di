'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.context = undefined;
exports.ApplicationBeanProvider = ApplicationBeanProvider;
exports.Inject = Inject;
exports.InjectBean = InjectBean;
exports.getBean = getBean;

var _Context = require('./Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = new _Context2.default();

function ApplicationBeanProvider(clazz) {
  var beanProvider = new clazz();
  var beanCreators = beanProvider.provide();

  context.setBeanCreators(beanCreators);

  console.log('Bean provider, provided: ', beanCreators);
  return function (clazz) {
    return clazz;
  };
}

// export function provideBean(name, clazz) {
//   if (beansCreators[name] !== undefined) {
//     throw new Error('bean name conflict');
//   }
//   beansCreators[name] = clazz;
// }

function Inject(deps) {
  deps = deps || [];

  return function (clazz) {
    var constructor = function constructor() {
      var _this = this;

      // inject beans from deps
      deps.forEach(function (d) {
        var bean = context.getBean(d);
        Object.defineProperty(_this, d, { value: bean });
      });

      // inject from mehod meta information
      Reflect.ownKeys(clazz.prototype).forEach(function (k) {
        if (typeof clazz.prototype[k] == 'function') {
          var injectName = clazz.prototype[k].__injectName;

          if (injectName !== undefined) {
            var bean = context.getBean(injectName);
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

function InjectBean(name) {
  return function (target, prop, descriptor) {
    descriptor.value.__injectName = name;
  };
}

function getBean(name) {
  return context.getBean(name);
}

exports.context = context;


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