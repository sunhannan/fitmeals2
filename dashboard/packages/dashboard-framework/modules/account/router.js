/*=============default router ==================*/



var group_account = FlowRouter.group({ name: "account", prefix: "/account" });

group_account.route('/login', { name: "login", action: function(params, queryParams){ BlazeLayout.render("account", { content: 'login' }) } });

group_account.route('/logout', { name: "logout", action: function(params, queryParams){ Meteor.logout(function() { FlowRouter.go("/") }) } });

group_account.route('/pwd', { name: "pwd", action: function(params, queryParams){ console.log(12312); BlazeLayout.render("dashboard", { content: 'pwd' }) } });


