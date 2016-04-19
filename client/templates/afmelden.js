

if(Meteor.isClient){

	Meteor.subscribe('publicAanmeldingen');
		Template.afmelden.helpers({
			aangemeld: function(){
		// Om lessen op de juiste datum volgorde te zetten, moet eerst de input naar 'date' worden veranderd
				// van dd/mm/jjjj naar een js date()... want nu pakt het alleen de dag en niet de maand.
				
				var userEmail = Meteor.user().emails[0].address;

				 console.log(userEmail);
				
				return Aanmeldingen.find({mail: userEmail});
			},
			Adminaangemeld: function(){
		// Om lessen op de juiste datum volgorde te zetten, moet eerst de input naar 'date' worden veranderd
				// van dd/mm/jjjj naar een js date()... want nu pakt het alleen de dag en niet de maand.
				
				var userEmail = Meteor.user().emails[0].address;

				 console.log(userEmail);
				
				return Aanmeldingen.find({});
			}

		});


}
Template.afmelden.events({
    "click .deleteAanmelding": function () {
    	if(confirm('Weet u zeker dat u zich wil afmelden voor: '+this.initDate+' ?')){
    		Aanmeldingen.remove(this._id);
    	}
    }

  });

Template.afmelden.helpers({

    noUser: function () {
        var user = Meteor.user();

        if (!user) {
            return true;
        };
    }
});


