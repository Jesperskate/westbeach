if(Meteor.isClient){


	// Meteor.subscribe('publicAanmeldingen');




	// Open sessie by get var from url
	  Router.route('/afmelden/:_id', function () {
	    this.render('afmelden', {
	      data: function () {
	         var currentCode = this.params._id; 
	         console.log('Getwaarde: ' + currentCode); 
	         // console.log(Aanmeldingen.findOne({_id: currentCode}));
	         return Aanmeldingen.findOne({_id: currentCode});     
	      }
	    });
	  });



}