Template.dashboard.onCreated( () => {
  Template.instance().subscribe( 'dashboard' );
});

Meteor.subscribe('userList');
Meteor.subscribe('allUsers');

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

Template.dashboard.events({
  'change [name="userRole"]': function( event, template ) {
    let role = $( event.target ).find( 'option:selected' ).val();

    Meteor.call( "setRoleOnUser", {
      user: this._id,
      role: role
    }, ( error, response ) => {
      if ( error ) {
        alert( error.reason, "warning" );
      }
    });
  },
});

