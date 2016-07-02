import ApplicationContext from './ApplicationContext';

export default function ApplicationBeanProvider(clazz) {
  let beanProvider = new clazz();
  let beanCreators = beanProvider.provide();

  ApplicationContext.getContext().setBeanCreators(beanCreators);

  console.log('Bean provider, provided: ', beanCreators);
  return function(clazz) {
    return clazz;
  };
}

