


var MENU_KEY = 'menuOpen';
Session.setDefault(MENU_KEY, false);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 5000;

Meteor.startup(function () {
  // set up a swipe left / right handler
  $(document.body).touchwipe({
    wipeLeft: function () {
      Session.set(MENU_KEY, false);
    },
    wipeRight: function () {
      Session.set(MENU_KEY, true);
    },
    preventDefaultEvents: false
  });

  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(function () {
    // Launch screen handle created in lib/router.js
    dataReadyHold.release();

    // Show the connection error box
    Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
  }, CONNECTION_ISSUE_TIMEOUT);
});

Template.appBody.onRendered(function() {
  this.find('#content-container')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn(function () {
         
         // waar dit voor is weet ik niet :JV
          
        });
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        $(this).remove();
      });
    }
  };
});

Template.appBody.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes. #each looks at the _id property of it's
  // items to know when to insert a new item and when to update an old one.
  thisArray: function() {
    return [this];
  },
  menuOpen: function() {
    return Session.get(MENU_KEY) && 'menu-open';
  },
  cordova: function() {
    return Meteor.isCordova && 'cordova';
  },
  emailLocalPart: function() {
    var email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  },
  userMenuOpen: function() {
    return Session.get(USER_MENU_KEY);
  },

  connected: function() {
    if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
      return Meteor.status().connected;
    } else {
      return true;
    }
  }
});

Template.appBody.events({
  'click .js-menu': function() {
    Session.set(MENU_KEY, ! Session.get(MENU_KEY));
  },

  'click .content-overlay': function(event) {
    Session.set(MENU_KEY, false);
    event.preventDefault();
  },

  'click .js-user-menu': function(event) {
    Session.set(USER_MENU_KEY, ! Session.get(USER_MENU_KEY));
    // stop the menu from closing
    event.stopImmediatePropagation();
  },

  'click #menu a': function() {
    Session.set(MENU_KEY, false);
  },

  'click .js-logout': function() {
    Meteor.logout();

    // if we are on a private list, we'll need to go to a public one
    var current = Router.current();
    if (current.route.name === 'listsShow' && current.data().userId) {
      Router.go('kitesurfen');
    }
  },


});

Meteor.subscribe('publicAanmeldingen');



Template.inschrijfModal.events({
  'submit': function(event, template) {
    event.preventDefault();
    var idLes = event.target.idLes.value;
    var email = event.target.email.value;
    var naam = event.target.naam.value;
    var telefoon = event.target.telefoon.value;
    var vraag = event.target.vraag.value;
    var leeftijdsgroep = event.target.leeftijdsgroep.value;
    var dateOfLes = event.target.sportdate.value;
    var timeOfLes = event.target.sportstarttime.value;

    if (idLes === undefined) { return false };
    if (!email || email == undefined){
      console.log('Email is vereist');
         $('#email').css('border', '1px solid red'); 
      return false;

    }
    if (!naam || naam === undefined) {
      console.log('Naam is vereist');
       $('#naam').css('border', '1px solid red'); 
      return false;
    }

      Aanmeldingen.insert({
        idLes: idLes,
        email: email,
        naam: naam,
        leeftijd: leeftijdsgroep,
        telefoon: telefoon,
        vraag: vraag,
        initDate: dateOfLes,
        initTime: timeOfLes,
        createdAt: new Date() // current time
      });

    // vind een aanmelding die hoort bij de les
    var huidigeAanmelding = Aanmeldingen.findOne({'idLes': idLes, 'email': email});

    console.log("Aanmelding aangemaakt "+ huidigeAanmelding._id+" en email "+huidigeAanmelding.email );

     var sportnaam = event.target.sportnaam.value;
     var sportdate = event.target.sportdate.value.slice(0, 16);
     var sportstarttime = event.target.sportstarttime.value;

      event.target.idLes.value = "";
      event.target.email.value = "";
      event.target.name.value = "";

      Meteor.call('sendEmail',
            email,
            'info@westbeach.nl',
            'Inschrijving gelukt',
            'Beste '+naam+', \r \r U bent nu ingeschreven voor: \r '+ sportnaam+ ' - '+sportdate+' - '+sportstarttime+'\r \r Uitschrijven kan via deze link: \r http://localhost:3000/afmelden \r\r Sportieve groeten, \r \r Westbeach');
      if(Meteor.call('sendEmail')){

      }

        Meteor.popDown('inschrijfModal');
         FlashMessages.sendSuccess("Inschrijven gelukt");

  }


});

Template.aanpassenStatus.events({
  'submit': function(event, template) {
    event.preventDefault();
    var idLes = event.target.idLes.value;
    var toelichting = event.target.toelichting.value;
    var nieuwedatum = event.target.newsportdate.value;

    if(nieuwedatum){
      var x = new Date(nieuwedatum);
      console.log('string x: '+x);
      var datestring = String(x);
      // Starttijd wordt uit date format gehaald, wel in US format!(AM/PM)
      var starttime = datestring.slice(16,21);


      Lessen.update({_id: Session.get('idLesOpen')}, { $set: {date: x, starttime: starttime }});
      

      }


    var found = Aanmeldingen.find({ idLes: Session.get('idLesOpen')}).fetch();
    // maak een array van alle aanmeldingen
    console.log(found);

    var l = Aanmeldingen.find({ idLes: Session.get('idLesOpen')}).count();

    var datumverandering = 'Nieuw lesmoment is: '+ datestring;

    for (var i = 0; i < l; i++) {
      console.log(found[i].email);
         Meteor.call('sendEmail',
            found[i].email,
            'info@westbeach.nl',
            'Aanpassing les',
            'Beste '+found[i].naam+', \r \r De les waarvoor je je hebt ingeschreven is aangepast. \r '+ datumverandering+' \r \r'+ toelichting+' \r\r Sportieve groeten, \r \r Westbeach'
            );
     FlashMessages.sendSuccess("Mail is verzonden");
    };
    

    Meteor.popDown('aanpassenStatus');


  }
});

Template.aanpassenStatus.rendered = function() {
  // format dat heb ik verwijderd omdat het toeveoegn van 7 dagen bijv. makkelijker gaat met de default format
    $('.datepicker').datetimepicker({
      useCurrent: true, 
      allowInputToggle: true
    });
  }


// hier moet wat mee gedaan worden misschien! Study helpers...
Template.inschrijfModal.helpers({
  data: function(){
    return Lessen.findOne( { _id: Session.get('idLesOpen')});
  },
  mooiedate: function(datestring){
    var d = String(datestring).slice(0,16); 
    return d;
  },
  Lessen: function(){
    return Lessen.findOne();
  },
  currentEmail: function(){
    return Meteor.user().emails[0].address;
  }

});




Template.aanpassenStatus.helpers({
  data: function(){
    return Lessen.findOne( { _id: Session.get('idLesOpen')});
  },
  deelnemers: function(){
    // aanmeldingen worden te laat geladen, pas na een actie ...
    return Aanmeldingen.find( { idLes: Session.get('idLesOpen')});
  },
  mooiedate: function(datestring){
    var d = String(datestring).slice(0,16); 
    return d;
  },
  Lessen: function(){
    return Lessen.findOne();
  }

});

 





