Template.regionEdit.onCreated(function() {
    this.subscribe("regionById", FlowRouter.getQueryParam("id"));
});


Template.regionEdit.helpers({
    parent: function() {
        return Region.findOne({ _id: FlowRouter.getQueryParam("id") });
    }
});
Template.regionEdit.events({
    'click #save': function() {

        var region = Region.findOne({ _id: FlowRouter.getQueryParam("id") })

        Region.update({_id:FlowRouter.getQueryParam("id")},{
            $set:{
                name: $("#name").val(),
            }
        });

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "region.update",
            link: FlowRouter.getQueryParam("id")
        });

        toastr.success("地区已更新");

        FlowRouter.go("/region?parent=" + region.parent);
    },

});

Template.regionEdit.onRendered(function() {

});
