Template.regionCreate.onCreated(function() {
    if (FlowRouter.getQueryParam("parent") != "root") {
        this.subscribe("regionById", FlowRouter.getQueryParam("parent"));
    }
});


Template.regionCreate.helpers({
    parent: function() {
        if (FlowRouter.getQueryParam("parent") != "root") {
            return Region.findOne({ _id: FlowRouter.getQueryParam("parent") });
        }
    }
});
Template.regionCreate.events({
    'click #save': function() {

        var regionId = Region.insert({
            parent: FlowRouter.getQueryParam("parent"),
            name: $("#name").val(),
        });

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "region.insert",
            link: regionId
        });

        toastr.success("地区已添加");

        FlowRouter.go("/region?parent=" + FlowRouter.getQueryParam("parent"));
    },

});

Template.regionCreate.onRendered(function() {

});
