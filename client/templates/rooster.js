Meteor.subscribe('publicLessen');

Template.rooster.events({
  'submit': function(event, template) {
    event.preventDefault();
    // var sport = event.target.sport.value;

    var sport = template.find('input:radio[name=sport]:checked').value;
    // Validatie inactief
    // if (sport == null){
    //   console.log('Sportkeuze is vereist');
    //     $('#Sportkeuze').css('border', '1px solid red'); 
    //     return false;
    // }
    var datestring = event.target.date.value;
      console.log('Date from value '+event.target.date.value);
    var YYYY = datestring.slice(6,10);
    var MM = datestring.slice(3,5);
    var dd = datestring.slice(0,2);
    var hh = datestring.slice(11,13);
    var mm = datestring.slice(14,16);
    // Maand nummer begint op 0 (0 = januari)
    var MMcorrect = MM - 1;
    var date = new Date(YYYY,MMcorrect,dd,hh,mm,00,00);
    console.log('Date in dateformat: '+date);

    var starttime = datestring.slice(11,16);
    console.log('Starttijd: '+starttime);
    var herhalen = event.target.herhalen.value;
    var level = event.target.level.value;
    var info = event.target.info.value;
    var capaciteit = event.target.capaciteit.value;

    if (herhalen > 0 ){
      // Datum in date object
      var dated = new Date(date);
      for (var i = 1; i <= herhalen ; i++) {
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
    $('.datepicker').datetimepicker({useCurrent: true, allowInputToggle: true, ignoreReadonly: true, format: 'DD-MM-YYYY HH:mm'});
    // $('.timepicker').datetimepicker({useCurrent: true, allowInputToggle: true, ignoreReadonly: true});

}

Meteor.methods({


});
