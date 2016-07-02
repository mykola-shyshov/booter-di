import ApplicationContext from './ApplicationContext';

export default function Inject(deps) {
  deps = deps || [];

  return function (clazz) {
    let constructor = function () {

      // inject beans from deps
      deps.forEach((d) => {
        let bean = ApplicationContext.getContext().getBean(d);
        Object.defineProperty(this, d, {value: bean});
      });

      // inject from mehod meta information
      Reflect.ownKeys(clazz.prototype).forEach((k) => {
        if(typeof clazz.prototype[k] == 'function') {
          let injectName = clazz.prototype[k].__injectName;

          if (injectName !== undefined) {
            let bean = ApplicationContext.getContext().getBean(injectName);
            clazz.prototype[k].apply(this, [bean]);
          }
        }
      });

      clazz.prototype.constructor.apply(this, arguments);
    }

    inherits(constructor, clazz);
    return constructor;
  };
}

function inherits(subClass, superClass) {
  subClass.prototype = Object.create(
    superClass && superClass.prototype,
    {
       constructor: {
         value: subClass,
         enumerable: false,
         writable: true,
         configurable: true
       }
    }
  );

  Object.setPrototypeOf(subClass, superClass);
}

