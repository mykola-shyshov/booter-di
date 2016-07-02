<img src="https://raw.githubusercontent.com/okonkwo/booter-di/master/doc/hr.png" width="150" height="150" />

Booter DI (sub-project)
======

Main idea of `Booter` project. 

I khnow that for now we have a lot of "boot" react, redux, reflax projects.  
But I met problem with starting development new applicatin based on that projects. I really like `spring boot` (It's java:)) project. Out of the box you will get logging, running, testing, configuraion features.  
So aim of this project is to be as close as possible to `spring boot` mission. 

Modern applications need some common tools:
* Logging 
* Configurations
* Running & building tools
* App security solutions
* Test environment and runners
* so on

Booter dependency injection
------

Greate feature of `Spring` project is dependency injection & dependency resolving.  

For now I will describe universal applicatation.  
It's simple to understand, we really have 2 applications: Server and Client. And that applications have different entry poins(main functions or classes).

Also sometimes they depends on different libraries (evironment is different). And we have to resolve this issue. For me is ugly way to try solve this by next approache:
```
import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}
```

Take attention on line `if (__SERVER__) {`. Sometimes can be `if (__SERVER__ && __PRODUCTION__) {`.  

May we solve this problem in another way? And yes we can!  

For example `http` library can be configured for client and server application in different way, but have the same interface. So for client it will be `new Http()`, for server `new Http({origin: config.apiOrigin})`. That is! We have two beans(instances). And in client app we will use the first, in server the second.

## Documentation 

So, how it works.  
Termin bean means object instance.  

So our application will have one main class(entry point). Lets give name `Application`. And for this application will have set of beans. This beans must be provided in next way:

```
@ApplicationBeanProvider(BeanProvider)
class MyApp {
  run() {
  }
}
```

Where `BeanProvider` is class with method `provide`: 
```
class BeanProvider {
  provide() {
    return {
      'http': () => {
      }
    }
  }
}
```

Okey, now we have declared set of beans and Application class. We will use `MyApp` in next way:
```
let app = new MyApp()
app.run();
```

Yep, app instance is created. Let's inject some bean into class:

```
@Inject()
class SomeClass {
  @InjectBean('apiClient')
  setHttp(client) {
    this.apiClient = client;
  }
  
  doSomething() {
    this.apiClient.fetchUser();
  }
}
```
or just: 
```
@Inject([
  'apiClient'
])
class SomeClass {

  doSomething() {
    this.apiClient.fetchUser();
  }
}
```

And beans will be injected successfuly. 

## Reference. Top API.

#### `ApplicationBeanProvider`
Decorator for setting application bean provider.  

Usage:
```
@ApplicationBeanProvider(BeanProvider)
class MyClass {}
```
BeanProvider is a class with at least one method `provide`.  
Example 

#### `Inject`  

#### `InjectBean`  

## Build `booter-di`
```
npm install
npm build
```

#### Changelog:  

30.06.2016 - Init commit
