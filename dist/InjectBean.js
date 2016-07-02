"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InjectBean;
function InjectBean(name) {
  return function (target, prop, descriptor) {
    descriptor.value.__injectName = name;
  };
}