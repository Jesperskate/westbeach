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
Template.bootcamp.helpers({
	lessen: function(){
		return Lessen.find({sport:'bootcamp'});
	}

});


//code for golfsurfen
Template.yoga.helpers({
	lessen: function(){
		return Lessen.find({sport:'yoga'});
	}

});

Template.les.helpers({
	aanmeldingen: function(){
		return Aanmeldingen.find({ idLes: this._id});
	},
	aantalDeelnemers: function(){
		return Aanmeldingen.find({ idLes: this._id}).count();

	},
	 displaydate: function (datemongo) {
	    var date = datemongo.slice(0,5);
	    var monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

		var monthNr = datemongo.slice(4,5);

		var month = monthNames[monthNr-1];

	    return date +month;
 	 }

})

	
	
	

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

Template.aanmelding.events({
    "click .deleteAanmelding": function () {
    	Aanmeldingen.remove(this._id);
    
	      }   


  });



Meteor.methods({


});
}

