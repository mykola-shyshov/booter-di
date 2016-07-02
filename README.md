[[https://github.com/okonkwo/booter-di/blob/master/doc/hr.png|alt=booter]]  

Booter DI (sub-project)
======

Main idea of `Booter` project. 

I khnow that for now we have a lot of 'boot' react, redux, reflax projects.  
But I met problem with starting development new applicatin based on that projects. I really like `spring boot` project. From box you will get logging, running, testing, configuraions features.  
So aim of this project is to be as close as possible to `spring boot` mission as we can. 

Modern applications need some common tools:
* Logging 
* Configurations
* Running & building tools
* App security solutions
* Test environment and runners

For now it will be specific for react/redux applictions. 

Booter dependency injection
------

Greate feature of Spring project is dependency injection & dependency resolving.  

For now I will describe universal applicatation.  
It's simple to understand, we really have 2 applications: Server and Client. And that applications have different enty poins(main functions).

Also sometimes they depends on different libraries (evironment is different). For me is ugly way to try solve this by next approache:
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
For example `http` library can be configured for client and server application in different way but have the same interface.  So for client it will be `new Http()`, for server `new Http({origin: config.apiOrigin})`. That is! We have two beans(instances). And in client app we will use the first, in server the second.

#### Using 

So, how it works.


#### build

#### build
```
npm install
npm build;
```

#### Changelog:  

30.06.2016 - Init commit
