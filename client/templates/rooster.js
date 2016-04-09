Meteor.subscribe('publicLessen');

Template.rooster.events({
  'submit': function(event, template) {
    event.preventDefault();
    var sport = event.target.sport.value;
    var date = new Date(event.target.date.value);

    var datestring = String(date);


    // Starttijd wordt uit date format gehaald, wel in US format!(AM/PM)
    var starttime = datestring.slice(15,21);
    var herhalen = event.target.herhalen.value;

    var level = event.target.level.value;
    var capaciteit = event.target.capaciteit.value;

    var steps = [];



    if (herhalen > 1 ){
      // Datum in date object
      var dated = new Date(date);
      console.log('hi were in if');

      for (var i = 1; i <= herhalen; i++) {
        // add week or more
        dated.setDate(dated.getDate() + (7* i));

          Lessen.insert({
            sport: sport,
            date: dated,
            starttime:starttime,
            level:level,
            capaciteit:capaciteit,
            createdAt: new Date() // current time
          });
        console.log(i + ' week toegevoegd ');
        
      };
  

    }


      Lessen.insert({
        sport: sport,
        date: date,
        starttime:starttime,
        level:level,
        capaciteit:capaciteit,
        createdAt: new Date() // current time
      });


      event.target.sport.value = "";
      event.target.date.value = "";
      event.target.level.value = "";

      Router.go(sport);

  },

  // Teller functie veld
  'click .sub': function(){
      var o = $('#numberSpinner').val();
    if(o > 4){
      var o = o - 1;
        }

      $('#numberSpinner').val(o);
  },
    'click .add': function(){
      var o = $('#numberSpinner').val();
      var o = parseInt(o);
      if(o < 10){
      var o = o+1;
    }
      $('#numberSpinner').val(o);
  }
});

Template.rooster.rendered = function() {
  // format dat heb ik verwijderd omdat het toeveoegn van 7 dagen bijv. makkelijker gaat met de default format
    $('.datepicker').datetimepicker({useCurrent: true, allowInputToggle: true});
    $('.timepicker').datetimepicker({useCurrent: true, allowInputToggle: true});

}

Meteor.methods({


});
