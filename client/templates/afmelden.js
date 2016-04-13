

if(Meteor.isClient){

	Meteor.subscribe('publicAanmeldingen');
		Template.afmelden.helpers({
			aangemeld: function(){
		// Om lessen op de juiste datum volgorde te zetten, moet eerst de input naar 'date' worden veranderd
				// van dd/mm/jjjj naar een js date()... want nu pakt het alleen de dag en niet de maand.
				
				var userEmail = Meteor.user().emails[0].address;

				 console.log(userEmail);
				
				return Aanmeldingen.find({email: userEmail});
			}

		});


}
Template.afmelden.events({


  });