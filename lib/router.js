Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('publicLessen')
    
    ];
  }
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.route('join');
Router.route('signin');

Router.route('dashboard');
Router.route('rooster');
Router.route('home');
Router.route('contact');
Router.route('afmelden');

Router.route('kitesurfen');
Router.route('golfsurfen');
Router.route('bootcamp');
Router.route('yoga');



Router.route('/', {
  action: function() {
    Router.go('home');
  }
});

AccountsTemplates.configureRoute('resetPwd', {
    template: 'ResetPassword',
    name: 'resetPwd',
    path: '/ResetPassword',
    redirect: '/home',
});
AccountsTemplates.configureRoute('forgotPwd', {
    template: 'ForgotPassword',
    name: 'forgotPwd',
    path: '/ForgotPassword',
    redirect: '/home',
});
AccountsTemplates.configureRoute('signUp', {
    template: 'myLogin',
    layoutTemplate: 'appBody',
    path: 'signUp',
    redirect: '/home',
});
AccountsTemplates.configureRoute('signIn', {
    template: 'myLogin',
    layoutTemplate: 'appBody',
    path: 'signIn',
    redirect: '/home',
});
