if(Meteor.isClient){

	
Template.kitesurfen.helpers({
	lessen: function(){

		// Om lessen op de juiste datum volgorde te zetten, moet eerst de input naar 'date' worden veranderd
		// van dd/mm/jjjj naar een js date()... want nu pakt het alleen de dag en niet de maand.
		return Lessen.find({sport:'kitesurfen'}, { sort: { 'date' : 1 } });
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
	    var date = datemongo.slice(0,2);



	    return date ;
 	 },
 	 displaymonth: function (datemongo) {
	
	    var monthNames = [ "JAN", "FEB", "MRT", "APR", "MEI", "JUN",
"JUL", "AUG", "SEP", "OKT", "NOV", "DEC" ];

		var monthNr = datemongo.slice(4,5);

		var month = monthNames[monthNr-1];

	    return month;
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

