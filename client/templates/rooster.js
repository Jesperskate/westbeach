Template.rooster.events({
  'submit': function(event, template) {
    event.preventDefault();
    var sport = template.$('[name=sport]').val();
    var date = template.$('[name=date]').val();
    var starttime = template.$('[name=time]').val();
    var level = template.$('[name=level]').val();
    var capaciteit = template.$('[name=capaciteit]').val();




 

    console.log(sport+" en "+date);
    
         // Insert a task into the collection
      Lessen.insert({
        sport: sport,
        date: date,
        starttime:starttime,
        level:level,
        capaciteit:capaciteit,
        createdAt: new Date() // current time
      });
 


  }
});

Template.rooster.rendered = function() {
    $('.datepicker').datetimepicker({useCurrent: true, format: 'DD/MM/YYYY'});
    $('.timepicker').datetimepicker({useCurrent: true, format: 'LT'});


}