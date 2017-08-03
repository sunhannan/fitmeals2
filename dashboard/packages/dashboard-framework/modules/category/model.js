
Category = new Meteor.Collection("category");

CategoryType  = Meteor.isClient ? new Meteor.Collection(null) : null;