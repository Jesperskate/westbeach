Meteor.subscribe('publicLessen');

Template.rooster.events({
  'submit': function(event, template) {
    event.preventDefault();
    var sport = event.target.sport.value;
    var date = event.target.date.value;



    var starttime = date.slice(10,19);
    var level = event.target.level.value;
    var capaciteit = event.target.capaciteit.value;

    console.log('Value: '+ date);

    var steps = [];

    var dated = new Date(date);
    console.log("New date resultaat: "+dated );

    // add week
    dated.setDate(dated.getDate() + 7);

    console.log('Week toegevoegd: '+ dated);

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
      // event.target.time.value = "";
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
// addLes: function (text) {
//     // Make sure the user is logged in before inserting a task
//     if (! Meteor.userId()) {
//       throw new Meteor.Error("not-authorized");
//     }
 
//     Lessen.insert({
//       text: text,
//       createdAt: new Date(),
//       owner: Meteor.userId(),
//       username: Meteor.user().username
//     });
//   }

});
