Template.dashboard.onCreated( () => {
  Template.instance().subscribe( 'dashboard' );
});

Meteor.subscribe('userList');

Template.dashboard.helpers({
  currentUser: function() {
    return Meteor.userId();
  }
});

Template.dashboard.helpers({
  users: function() {
    var users = Meteor.users.find();

    if ( users ) {
      return users;
    }
  },
});

// Template.dashboard( 'isCurrentUser', ( currentUser ) => {
//   return currentUser === Meteor.userId() ? true : false;
// });

// Template.dashboard( 'disableIfAdmin', ( userId ) => {
//   if ( Meteor.userId() === userId ) {
//     return Roles.userIsInRole( userId, 'admin' ) ? "disabled" : "";
//   }
// });

// Template.dashboard.helpers ( 'selected', ( v1, v2 ) => {
//   return v1 === v2 ? true : false;
// });

Template.dashboard.helpers({
	'selected' : function (v1, v2){
		return v1 === v2 ? true :false;
	}, 
	'isCurrentUser': function (currentUser){
		return currentUser === Meteor.userId() ? true : false;
	},
	'disableIfAdmin' : function ( userId) {
		if ( Meteor.userId() === userId){
			return Roles.userIsInRole (userId, 'admin') ? "disabled" : "";
		}
	}
});

