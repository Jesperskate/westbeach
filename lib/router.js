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
Router.route('afmelden');
Router.route('ForgotPassword');
Router.route('ResetPassword');




Router.route('kitesurfen');
Router.route('golfsurfen');
Router.route('bootcamp');
Router.route('yoga');



Router.route('/', {
  action: function() {
    Router.go('kitesurfen');
  }
});


  // // Open sessie by get var from url
  //   Router.route('/afmelden/:_id', function () {
  //     this.render('afmelden', {
  //     before: function () { 
     
       
  //   },
  //     data: function () {
  //        var currentCode = this.params._id;

  //        Session.set('currentGet', currentCode);

      

  //       //  console.log(Aanmeldingen.findOne(new Meteor.Collection.ObjectID(this.params._id._str)));
  //       // return Aanmeldingen.findOne(new Meteor.Collection.ObjectID(this.params._id._str));  

  //     }
  //   });
  // });