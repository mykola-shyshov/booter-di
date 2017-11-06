'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ApplicationBeanProvider;

var _ApplicationContext = require('./ApplicationContext');

var _ApplicationContext2 = _interopRequireDefault(_ApplicationContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ApplicationBeanProvider(clazz) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var beanProvider = new clazz();
  var beanCreators = beanProvider.provide();

  _ApplicationContext2.default.getContext(options).setBeanCreators(beanCreators);

  options.debug && console.log('Bean provider, provided: ', beanCreators);
  return function (clazz) {
    return clazz;
  };
}