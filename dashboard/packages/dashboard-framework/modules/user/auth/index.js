Template.adminMemberAuth.onCreated(function() {
    this.subscribe("queryMemberDetail",FlowRouter.getQueryParam("id"));
});


Template.adminMemberAuth.helpers({
    member: function() {
        return Meteor.users.findOne({_id:FlowRouter.getQueryParam("id")});
    },
    roles: function() {
        return ClientRoles.find();
    },
    userId:function(){
        return FlowRouter.getQueryParam("id");
    }
});
Template.adminMemberAuth.events({
    'click .authAdd': function() {
        var that = this;
        Meteor.call("addMemberAuth", {
            member: FlowRouter.getQueryParam("id"),
            role:that.key
        }, function(err, res) {
            toastr.success("用户权限已更新");
        })
    },
    'click .authRemove': function() {
        var that = this;
        Meteor.call("removeMemberAuth", {
            member: FlowRouter.getQueryParam("id"),
            role:that.key
        }, function(err, res) {
            toastr.success("用户权限已更新");
        })
    },
 
});

Template.adminMemberAuth.onRendered(function() {

});
