if(Meteor.isClient){
	
Template.kitesurfen.helpers({
	lessen: function(){
		return Lessen.find({sport:'kitesurfen'});
	}

});


  Template.les.events({
    "click .delete": function () {
    	Meteor.call("sayhello", "yesss");
    	Meteor.call("deleteLesson", this._id);
	      }
  });

//code for golfsurfen, werkt het?
Template.golfsurfen.helpers({
	lessen: function(){
		return Lessen.find({sport:'golfsurfen'});
	}

});



Meteor.methods({
  deleteLesson: function (lessonId) {
  
	  var message = "Are you sure you want to delete?";
	  if ( confirm(message)){ 
	        Lessen.remove(lessonId);
	    };
  },
  sayhello: function(message){
  	alert(message);
  }

});
}

