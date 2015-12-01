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

