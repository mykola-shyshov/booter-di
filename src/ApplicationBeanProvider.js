import ApplicationContext from './ApplicationContext';

export default function ApplicationBeanProvider(clazz, options = {}) {
  let beanProvider = new clazz();
  let beanCreators = beanProvider.provide();

  ApplicationContext.getContext(options).setBeanCreators(beanCreators);

  options.debug && console.log('Bean provider, provided: ', beanCreators);
  return function(clazz) {
    return clazz;
  };
}
