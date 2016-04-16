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
    var info = event.target.info.value;
    var capaciteit = event.target.capaciteit.value;

 


    if (herhalen > 1 ){
      // Datum in date object
      var dated = new Date(date);


      for (var i = 1; i <= herhalen; i++) {
        // add week or more PUINHOOP
        var dagentoevoegen = i * 7;
        var nextweek = moment(dated).add(dagentoevoegen, 'days');
        console.log('Handig om te zien: '+nextweek);
        var d = new Date(nextweek);


          Lessen.insert({
            sport: sport,
            date: d,
            starttime:starttime,
            level:level,
            capaciteit:capaciteit,
            status: 'goed',
            info: info,
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
        info: info,
        status: 'goed',
        createdAt: new Date() // current time
      });


      event.target.sport.value = "";
      event.target.date.value = "";
      event.target.level.value = "";
      event.target.info.value = "";

      Router.go(sport);

  },

  // Teller functie veld
  'click .sub': function(){
      var o = $('#numberSpinner').val();
    if(o > 1){
      var o = o - 1;
        }

      $('#numberSpinner').val(o);
  },
    'click .add': function(){
      var o = $('#numberSpinner').val();
      var o = parseInt(o);
      if(o < 100){
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
