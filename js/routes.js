angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.chats', {
    url: '/page2',
    views: {
      'tab2': {
        templateUrl: 'templates/chats.html',
        controller: 'chatsCtrl'
      }
    }
  })

  .state('tabsController.contacts', {
    url: '/page3',
    views: {
      'tab3': {
        templateUrl: 'templates/contacts.html',
        controller: 'contactsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page6',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('tabsController.contactExpanded', {
    url: '/page9',
    views: {
      'tab3': {
        templateUrl: 'templates/contactExpanded.html',
        controller: 'contactExpandedCtrl'
      }
    }
  })

  .state('tabsController.chatExpanded', {
    url: '/page10',
    views: {
      'tab2': {
        templateUrl: 'templates/chatExpanded.html',
        controller: 'chatExpandedCtrl'
      }
    }
  })

  .state('verifyOTP', {
    url: '/page11',
    templateUrl: 'templates/verifyOTP.html',
    controller: 'verifyOTPCtrl'
  })

$urlRouterProvider.otherwise('/page5')

  

});