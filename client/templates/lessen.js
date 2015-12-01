Template.kitesurfen.helpers({
	lessen: function(){
		return Lessen.find({sport:'kitesurfen'});
	}

});


  Template.les.events({
    "click .delete": function () {
	    var message = "Are you sure you want to delete?";
	      if ( confirm(message)){ 
	            Lessen.remove(this._id);
	        };
	      }
  });

//code for golfsurfen, werkt het?
Template.golfsurfen.helpers({
	lessen: function(){
		return Lessen.find({sport:'golfsurfen'});
	}

});


Meteor.methods({
  addTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked} });
  }
});