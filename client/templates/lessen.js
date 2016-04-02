if(Meteor.isClient){

	
Template.kitesurfen.helpers({
	lessen: function(){
		return Lessen.find({sport:'kitesurfen'});
	}

});


//code for golfsurfen
Template.golfsurfen.helpers({
	lessen: function(){
		return Lessen.find({sport:'golfsurfen'});
	}

});


	
	
	

Template.les.events({
    "click .delete": function () {
    	Lessen.remove(this._id);
    	// Meteor.call("deleteLesson", this._id);
	      },    

	"click #inschrijf-popup": function () {

			
			Session.set('idLesOpen', this._id);
			if(Session.get('idLesOpen')){
				console.log('session is set'+ Session.get('idLesOpen'));
			}


    		Meteor.popUp("inschrijfModal");
    

	      }


  });



Meteor.methods({


});
}

