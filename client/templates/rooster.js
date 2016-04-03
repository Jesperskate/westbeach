Meteor.subscribe('publicLessen');

Template.rooster.events({
  'submit': function(event, template) {
    event.preventDefault();
    var sport = event.target.sport.value;
    var date = event.target.date.value;
    var starttime = event.target.time.value;
    var level = event.target.level.value;
    var capaciteit = event.target.capaciteit.value;


    console.log("Submitted values: "+sport, date);

    // // Insert a task into the collection
    // Meteor.call("addLes", sport);

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
      event.target.time.value = "";
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
    $('.datepicker').datetimepicker({useCurrent: true, allowInputToggle: true, format: 'DD/MM/YYYY '});
    $('.timepicker').datetimepicker({useCurrent: true, allowInputToggle: true, format: 'HH:mm'});

}

Meteor.methods({
addLes: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Lessen.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  }

});
