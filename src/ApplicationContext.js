import Context from './Context';

export default class ApplicationContext {

  constructor() {
    this.context = new Context();
  }

  getContext() {
    return this.context;
  }

  static getContext() {
    if (this.applicationContext == undefined) {
      this.applicationContext = new ApplicationContext();
    }
    return this.applicationContext.getContext();
  }

}

