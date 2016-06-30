export default class Context {
  constructor() {
    this.beans = {};
  }

  setBeans(beans) {
    this.beans = beans;
  }

  getBean(name) {
    if (!this.beans[name]) {
      if (!this.beanCreators[name]) {
        throw new Error('bean is not provided, name: ' + name);
      }

      let bean = beansCreators[name].call(beanProvider);
      console.log('bean created: ' + name);

      this.beans[name] = bean;
    }
    return this.beans[name];
  }

  setBeanCreators(beanCreators) {
    this.beanCreators= beanCreators;
  }
}
