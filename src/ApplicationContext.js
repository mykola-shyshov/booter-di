import Context from './Context';

export default class ApplicationContext {

  constructor(options) {
    this.context = new Context(options);
  }

  getContext() {
    return this.context;
  }

  static getContext(options) {
    if (this.applicationContext == undefined) {
      this.applicationContext = new ApplicationContext(options);
    }
    return this.applicationContext.getContext();
  }

}
