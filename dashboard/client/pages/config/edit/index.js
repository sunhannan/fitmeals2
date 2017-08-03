Template.configEdit.onCreated(function() {

});


Template.configEdit.helpers({});

Template.configEdit.events({
    'click #save': function() {
 		
        Meteor.call("editConfig", {
        	_id:this.cid,
        	value:$("#value").val(),
        }, function() {
            popup.hide();
            grid.flash("config");
        });

    },

});

Template.configEdit.onRendered(function() {

});
