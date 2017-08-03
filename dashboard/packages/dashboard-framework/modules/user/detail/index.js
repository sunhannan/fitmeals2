Template.adminMemberDetail.onCreated(function() {
    this.subscribe("queryMemberDetail",FlowRouter.getQueryParam("id"));
});


Template.adminMemberDetail.helpers({
    member: function() {
        return Meteor.users.findOne({_id:FlowRouter.getQueryParam("id")});
    },
    checkbox:function(user,str){
        if(user){
           return Roles.userIsInRole(user._id, [str], 'master') ? "checked" : "";
        }
    }
});
Template.adminMemberDetail.events({
    'click #save': function() {
        
        Meteor.call("updateMemberInfo", {
            member: FlowRouter.getQueryParam("id"),
            nickname:$("#nickname").val(),
            tel:$("#tel").val(),
        }, function(err, res) {
            toastr.success("用户信息已更新");
            FlowRouter.go("/members");
        })
    },
 
});

Template.adminMemberDetail.onRendered(function() {

});
