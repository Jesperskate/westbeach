

Meteor.publish('publicLessen', function() {
  return Lessen.find();
});

Meteor.publish('publicAanmeldingen', function() {
  return Aanmeldingen.find();
});

// Give authorized users access to sensitive data by group
Meteor.publish('secrets', function (group) {
  if (Roles.userIsInRole(this.userId, ['view-secrets','admin'], group)) {

    return Meteor.secrets.find({group: group});

  } else {

    // user not authorized. do not publish secrets
    this.stop();
    return;

  }
});



// server code
if (Meteor.isServer) {

    // Roles.addUsersToRoles( Meteor.userId(), [ 'westbeachbaas', 'trainer', 'lid' ] );
    // if(Roles.addUsersToRoles()){
    //   console.log('role is added');
    // }

}
