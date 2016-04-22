



// server code
if(Meteor.isServer) {

Meteor.startup(function () {
    // hmmm dit zorgt voor de internal server error bij reset password... 
   process.env.MAIL_URL="smtp://westbeachapp%40gmail.com:Strand123@smtp.gmail.com:465/";  

   // eerst 
});


Meteor.publish('publicLessen', function() {
  return Lessen.find();
});

Meteor.publish('publicAanmeldingen', function() {
  return Aanmeldingen.find();
});

 Meteor.publish('allUsers', function() {
   return Meteor.users.find({}, {fields:{username:1,emails:1}})
 });



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

  Meteor.methods({
  setRoleOnUser: function( options ) {
    check( options, {
      user: String,
      role: String
    });

    try {
      Roles.setUserRoles( options.user, [ options.role ] );
    } catch( exception ) {
      return exception;
    }
  }
});
  



