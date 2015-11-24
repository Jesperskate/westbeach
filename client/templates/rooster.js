Template.rooster.events({
  'submit': function(event, template) {
    event.preventDefault();
    var sport = template.$('[name=sport]').val();
    var date = template.$('[name=datepicker]').val();
    var level = template.$('[name=level]').val();



 

    console.log(sport+" en "+date);
    

  }
});

Template.rooster.rendered = function() {
    $('.datepicker').datetimepicker({useCurrent: true, format: 'DD/MM/YYYY'});
    $('.timepicker').datetimepicker({useCurrent: true, format: 'LT'});


}