'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ApplicationBeanProvider;

var _ApplicationContext = require('./ApplicationContext');

var _ApplicationContext2 = _interopRequireDefault(_ApplicationContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ApplicationBeanProvider(clazz) {
  var beanProvider = new clazz();
  var beanCreators = beanProvider.provide();

  _ApplicationContext2.default.getContext().setBeanCreators(beanCreators);

  console.log('Bean provider, provided: ', beanCreators);
  return function (clazz) {
    return clazz;
  };
}