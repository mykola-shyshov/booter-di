import Context from './Context';

let context;

export function ApplicationBeanProvider(clazz) {
  if (context !== undefined) {
    throw new Error('Application bean provider already initialized');
  }

  context = new Context();

  let beanProvider = new clazz();
  let beanCreators = beanProvider.provide();

  context.setBeanCreators(beanCreators);

  console.log('Bean provider, provided: ', beanCreators);
  return function(clazz) {
    return clazz;
  };
}

// export function provideBean(name, clazz) {
//   if (beansCreators[name] !== undefined) {
//     throw new Error('bean name conflict');
//   }
//   beansCreators[name] = clazz;
// }

export function Inject(deps) {
  deps = deps || [];

  return function (clazz) {
    let constructor = function () {

      // inject beans from deps
      deps.forEach((d) => {
        let bean = context.getBean(d);
        Object.defineProperty(this, d, {value: bean});
      });

      // inject from mehod meta information
      Reflect.ownKeys(clazz.prototype).forEach((k) => {
        if(typeof clazz.prototype[k] == 'function') {
          let injectName = clazz.prototype[k].__injectName;

          if (injectName !== undefined) {
            let bean = context.getBean(injectName);
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

export function InjectBean(name) {
  return function(target, prop, descriptor) {
    descriptor.value.__injectName = name;
  };
}

export function getBean(name) {
  return context.getBean(name);
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

