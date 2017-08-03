Template.adminMembersCreate.onCreated(function() {
});


Template.adminMembersCreate.helpers({
    
});
Template.adminMembersCreate.events({
    'click #save': function() {
        
        Meteor.call("insertMember", {
            nickname:$("#nickname").val(),
            tel:$("#tel").val(),
            email:$("#email").val(),
            password:$("#password").val(),
        }, function(err, res) {
            toastr.success("用户信息已添加，可在系统界面设置新用户权限");
            FlowRouter.go("/members");
        })
    },
 
});

Template.adminMembersCreate.onRendered(function() {

});
