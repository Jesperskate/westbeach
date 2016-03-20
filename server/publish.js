

Meteor.publish('publicLessen', function() {
  return Lessen.find();
});


// server code
if (Meteor.isServer) {



}
