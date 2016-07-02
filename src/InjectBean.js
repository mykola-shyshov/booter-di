export default function InjectBean(name) {
  return function(target, prop, descriptor) {
    descriptor.value.__injectName = name;
  };
}
