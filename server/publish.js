

Meteor.publish('publicLessen', function() {
  return Lessen.find();
});

Meteor.publish('publicAanmeldingen', function() {
  return Aanmeldingen.find();
});


// server code
if(Meteor.isServer) {
  Meteor.publish("userList", function() {
    return Meteor.users.find({}, {fields: {username: 1, profile: 1, roles: 1}});
  });
  Meteor.publish("allRoles", function(){
    return Roles.getAllRoles();
  });

  Meteor.publish( 'users', function() {
  var isAdmin = Roles.userIsInRole( Meteor.userId, 'admin' );

  if ( isAdmin ) {
    return [
      Meteor.users.find( {}, { fields: { "emails.address": 1, "roles": 1 } } ),
    ];
  } else {
    return null;
  }
});
}

	// In your server code: define a method that the client can call
	Meteor.methods({
	  sendEmail: function (to, from, subject, text) {
	    check([to, from, subject, text], [String]);

	    // Let other method calls from the same client start running,
	    // without waiting for the email sending to complete.
	    this.unblock();

	    Email.send({
	      to: to,
	      from: from,
	      subject: subject,
	      text: text
	    });
	  }
	});


  



