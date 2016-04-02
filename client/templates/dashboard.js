Template.dashboard.onCreated( () => {
  Template.instance().subscribe( 'dashboard' );
});

Meteor.subscribe('userList');

Template.dashboard.helpers({
  currentUser: function() {
    return Meteor.userId();
  }
})

Template.dashboard.helpers({
  users: function() {
    var users = Meteor.users.find();

    if ( users ) {
      return users;
    }
  },
});

