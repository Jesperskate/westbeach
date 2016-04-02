

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