if(Meteor.isClient){

Meteor.subscribe('publicAanmeldingen');
Session.setDefault('geschiedenis', false);

Template.les.helpers({
	aangemeld: function(){
		// Om lessen op de juiste datum volgorde te zetten, moet eerst de input naar 'date' worden veranderd
				// van dd/mm/jjjj naar een js date()... want nu pakt het alleen de dag en niet de maand.
				
				var userEmail = Meteor.user().emails[0].address;
					
				return Aanmeldingen.find({email: userEmail, idLes: this._id});
			}
})


Template.kitesurfen.helpers({
	lessen: function(){
// Om lessen op de juiste datum volgorde te zetten, moet eerst de input naar 'date' worden veranderd
		// van dd/mm/jjjj naar een js date()... want nu pakt het alleen de dag en niet de maand.
		// currenttime 8 uur terug
		var d = new Date();
		var d2 = new Date();
		d2.setHours(d.getHours() - 8);
	
		
		return Lessen.find({sport:'kitesurfen', 'date' : { $gte : d2}}, { sort: { 'date' : 1 , 'createdAt': 1} });
	}

});

//code for golfsurfen
Template.golfsurfen.helpers({
	lessen: function(){
				// currenttime 8 uur terug
		var d = new Date();
		var d2 = new Date();
		d2.setHours(d.getHours() - 8);
		return Lessen.find({sport:'golfsurfen', 'date' : { $gte : d2}}, { sort: { 'date' : 1 , 'createdAt': 1} });
	}

});	
Template.home.helpers({
	lessen: function(){
				// currenttime 8 uur terug
		var d = new Date();
		var d2 = new Date();
		d2.setHours(d.getHours() - 8);
		return Lessen.find({ 'date' : { $gte : d2}},{ sort: { 'date' : 1 , 'createdAt': 1} });
	},	
	lessenAll: function(){
		return Lessen.find({},{ sort: { 'date' : 1 , 'createdAt': 1} });
	},
	geschiedenis: function(){
		return Session.get('geschiedenis');
	}

});	
Template.bootcamp.helpers({
	lessen: function(){
		// currenttime 8 uur terug
		var d = new Date();
		var d2 = new Date();
		d2.setHours(d.getHours() - 8);
		return Lessen.find({sport:'bootcamp', 'date' : { $gte : d2}},{ sort: { 'date' : 1 , 'createdAt': 1} });
	}

});


//code for golfsurfen
Template.yoga.helpers({
	lessen: function(){
		// currenttime 8 uur terug
		var d = new Date();
		var d2 = new Date();
		d2.setHours(d.getHours() - 8);
		return Lessen.find({sport:'yoga', 'date' : { $gte : d2 }}, { sort: { 'date' : 1 , 'createdAt': 1} });
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

		var month = String(datemongo).slice(4,7);

	    return month;
 	 },
 	 // allee capaciteit weergeven bij Kitesurfen
	 isKitesurfen: function(){
	 	var x = Router.current().route.path();

	 	if (x === '/kitesurfen') {
	 		return true;
	 	};
	    return false;
	  },
	 weergaveStatus: function(){
	 	if(this.status == 'goed'){
	 		return false;

	 	} 
	 	else return true;
	 }
})

Template.les.events({
	"click .delete": function () {
		if(confirm('Weet u zeker dat u deze les '+this.sport+' om'+this.starttime+' wilt verwijderen?')){
			Lessen.remove(this._id);
		}
		

	   },   
	"click .status": function () {
			console.log(this.status);
			console.log(this._id);
		if (this.status == undefined || this.status == 'goed'){
			Lessen.update({_id: this._id}, { $set: {status: 'afgelast' }});
		}
		else if (this.status == 'afgelast' ) {
			Lessen.update({_id: this._id}, { $set: {status: 'verplaatst' }});
		}
		else if (this.status == "verplaatst"){
			Lessen.update({_id: this._id}, { $set: {status: 'goed' }});
		}
		else{
			Lessen.update({_id: this._id}, { $set: {status: 'goed' }});
		}
	  },
	// Fundtie om een row extra zichtbaar et maken na een click op een aanmelding
	// "click .aanmelding-row": function(event) {
	// 	console.log($(event.target));
	//   	$(event.target).closest('aanmelding-row2').toggle();
	//   },  
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


      },
      "click .aanmelding-row": function(){
      	$('.telEnVraag').toggle();
      }


  });	

Template.aanmelding.events({
    "click .deleteAanmelding": function () {
    	if(confirm('Weet u zeker dat u deze aanmelding: '+this.naam+' - '+this.email+' wilt verwijderen?')){
	    	Aanmeldingen.remove(this._id);
    	}    
	 }   
  });

Template.home.events({

	// JV Bezig: hier een toggle maken om een andere data op te halen, een soort van filter...
    "click .geschiedenis": function () {
    	switch(Session.get('geschiedenis')){
    		case true:
    			Session.set('geschiedenis', false);
    		break;
    		case false:
    			Session.set('geschiedenis', true);
			break;

    	}

    	console.log(Session.get('geschiedenis'));
	 }   
  });



Meteor.methods({


});
}

