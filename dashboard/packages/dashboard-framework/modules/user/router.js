// /*=============routers for admin ==================*/
var group_members = FlowRouter.group({
    name: "members",
    prefix: "/members",
    triggersEnter: [function(context, redirect) {
        if (!Meteor.userId()) {
            FlowRouter.go("login");
            return false;
        }
    }]
});
group_members.route('/', {
    name: "adminMembers",
    action: function(params, queryParams) {
        BlazeLayout.render("dashboard", { content: 'adminMember' })
    }
});

group_members.route('/detail', {
    name: "adminMembersDetail",
    action: function(params, queryParams){
        BlazeLayout.render("dashboard", { content: 'adminMemberDetail' })
    }
});

group_members.route('/auth', {
    name: "adminMembersAuth",
    action: function(params, queryParams){
        BlazeLayout.render("dashboard", { content: 'adminMemberAuth' })
    }
});

group_members.route('/create', {
    name: "adminMembersCreate",
    action: function(params, queryParams){
        BlazeLayout.render("dashboard", { content: 'adminMembersCreate' })
    }
});

