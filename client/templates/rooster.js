Template.rooster.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();


    var errors = {};

    if (! email) {
      errors.email = 'Email required';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    

  }
});

Template.rooster.rendered = function() {
    $('#my-datepicker').datepicker();
}