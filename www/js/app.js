// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.peta', {
      url: "/peta",
      views: {
        'menuContent' :{
          templateUrl: "templates/peta.html",
          controller: 'PetaCtrl'
        }
      }
    })
    
    .state('app.profil', {
      url: "/profil",
      views: {
        'menuContent' :{
          templateUrl: "templates/profil.html",
        }
      }
    })

    .state('app.lostnfound', {
      url: "/lostnfound",
      views: {
        'menuContent' :{
          templateUrl: "templates/lostnfound.html"
        }
      }
    })

    .state('app.chart', {
      url: "/chart",
      views: {
        'menuContent' :{
          templateUrl: "templates/chart.html"
        }
      }
    })

    .state('app.urgent', {
      url: "/urgent",
      views: {
        'menuContent' :{
          templateUrl: "templates/urgent.html",
          controller: 'UrgentCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/peta');
});
