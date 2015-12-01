Meteor.subscribe('publicLessen');

Template.rooster.events({
  'submit': function(event, template) {
    event.preventDefault();
    var sport = event.target.sport.value;
    var date = event.target.date.value;
    var starttime = event.target.time.value;
    var level = event.target.level.value;
    var capaciteit = event.target.capaciteit.value;


    console.log(sport);
    
         // Insert a task into the collection
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

 


  },
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
    $('.datepicker').datetimepicker({useCurrent: true, format: 'DD/MM/YYYY'});
    $('.timepicker').datetimepicker({useCurrent: true, format: 'LT'});


}