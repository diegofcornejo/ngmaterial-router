var app = angular.module('app', ['ngMaterial','ui.router','720kb.tooltips'])
.config(function($stateProvider, $urlRouterProvider,
                    //AGREGADO
                    $controllerProvider,
                    $compileProvider,
                    $filterProvider,
                    $provide
                    //FA
                    ) {


//AGREGADO                  
app.register = {
  controller : $controllerProvider.register,
  directive  : $compileProvider.directive,
  filter     : $filterProvider.register,
  factory    : $provide.factory,
  service    : $provide.service
};
//FA    
$stateProvider
.state('main', {
  url: '/main',
  views: {
    'main': {
      templateUrl: 'modules/main/template.html',

      resolve:{
        // load: function($q){
          // var deferred = $q.defer();
          // require(["modules/main/mainController"], function(){
          //   deferred.resolve();
          // });
          // return deferred.promise;
        // }
      }
    }
 }
})
.state('main.customers', {
  url: '/customers',
  views: {
    'window': {
      templateUrl: 'modules/customers/template.html',

      resolve:{
        // load: function($q){
        //   var deferred = $q.defer();
        //   require(["modules/home/homeController"], function(){
        //     deferred.resolve();
        //   });
        //   return deferred.promise;
        // }
      }
    }
 }
})
.state('main.customer', {
  url: '/customer/:id',
  views: {
    'window': {
      templateUrl: 'modules/customer/template.html',

      resolve:{
        // load: function($q){
        //   var deferred = $q.defer();
        //   require(["modules/home/homeController"], function(){
        //     deferred.resolve();
        //   });
        //   return deferred.promise;
        // }
      }
    }
 }
})
.state('login', {
  url: '/login',
  views: {
    'main': {
      templateUrl: 'modules/login/template.html',

      resolve:{
        // load: function($q){
        //   var deferred = $q.defer();
        //   require(["modules/login/controllers/loginController"], function(){
        //     deferred.resolve();
        //   });
        //   return deferred.promise;
        // }
      }
    }
  }
});

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

  });