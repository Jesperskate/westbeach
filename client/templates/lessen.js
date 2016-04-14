if(Meteor.isClient){




Template.kitesurfen.helpers({
	lessen: function(){
// Om lessen op de juiste datum volgorde te zetten, moet eerst de input naar 'date' worden veranderd
		// van dd/mm/jjjj naar een js date()... want nu pakt het alleen de dag en niet de maand.
		
		return Lessen.find({sport:'kitesurfen', 'date' : { $gte : new Date()}}, { sort: { 'date' : 1 } });
	}

});


//code for golfsurfen
Template.golfsurfen.helpers({
	lessen: function(){
		return Lessen.find({sport:'golfsurfen', 'date' : { $gte : new Date()}}, { sort: { 'date' : 1 } });
	}

});	
Template.home.helpers({
	lessen: function(){
		return Lessen.find({ 'date' : { $gte : new Date()}},{ sort: { 'date' : 1 } });
	}

});	
Template.bootcamp.helpers({
	lessen: function(){
		return Lessen.find({sport:'bootcamp', 'date' : { $gte : new Date()}},{ sort: { 'date' : 1 } });
	}

});


//code for golfsurfen
Template.yoga.helpers({
	lessen: function(){
		return Lessen.find({sport:'yoga', 'date' : { $gte : new Date()}}, { sort: { 'date' : 1 } });
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
	    var date = String(datemongo).slice(8,10);



	    return date ;
 	 },
 	 displaymonth: function (datemongo) {
	
// 	    var monthNames = [ "JAN", "FEB", "MRT", "APR", "MEI", "JUN",
// "JUL", "AUG", "SEP", "OKT", "NOV", "DEC" ];

		var month = String(datemongo).slice(4,7);

		// var month = monthNames[monthNr-1];

	    return month;
 	 },
 	 // allee capaciteit weergeven bij Kitesurfen
	 isKitesurfen: function(){
	 	var x = Router.current().route.path();

	 	if (x === '/kitesurfen') {
	 		return true;
	 	};
	    return false;
	  }

})



	
	

Template.les.events({
    "click .delete": function () {
    	if(confirm('Weet u zeker dat u deze les '+this.sport+' om'+this.starttime+'wilt verwijderen?')){
    		Lessen.remove(this._id);
    	}
    	

	   },   
   	"click .status": function () {
		
	
	
	
		if (this.status == undefined || this.status == 'goed'){
			Lessen.update({_id: this._id}, { $set: {status: 'afgelast' }});
		}
		else{

		Lessen.update({_id: this._id}, { $set: {status: 'goed' }});

		}
      },    
   	"click .mail": function () {
		
		Session.set('idLesOpen', this._id);
		Meteor.popUp("aanpassenStatus");
		
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
    	if(confirm('Weet u zeker dat u deze aanmelding: '+this.naam+' - '+this.email+' wilt verwijderen?')){
	    	Aanmeldingen.remove(this._id);
    	}    
	 }   
  });



Meteor.methods({


});
}

