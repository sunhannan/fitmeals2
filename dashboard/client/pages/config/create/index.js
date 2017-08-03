Template.configCreate.onCreated(function() {

});


Template.configCreate.helpers({});

Template.configCreate.events({
    'click #save': function() {
 
        Meteor.call("addConfig", {
        	key:$("#key").val(),
        	value:$("#value").val(),
        }, function() {
            popup.hide();
            grid.flash("config");
        });

    },

});

Template.configCreate.onRendered(function() {

});
