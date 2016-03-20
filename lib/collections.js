Lists = new Mongo.Collection('lists');

// Calculate a default name for a list in the form of 'List A'
Lists.defaultName = function() {
  var nextLetter = 'A', nextName = 'List ' + nextLetter;
  while (Lists.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'List ' + nextLetter;
  }

  return nextName;
};


// collections voor Westbeach
Lessen = new Mongo.Collection('lessen');

//Wat allemaar gedaan mage worden met de collectie Lessen
Lessen.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return true;
  },
  update: function (userId) {
    // can only change your own documents
    return true;
  },
  remove: function () {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }
    // can only remove if logged in
    return true;
  },
  fetch: ['owner']
});
