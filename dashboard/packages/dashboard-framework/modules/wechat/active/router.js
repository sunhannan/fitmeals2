var group_wxActive = FlowRouter.group({ name: "wxActiveGroup", prefix: "/wx/active" });

group_wxActive.route('/', { name: "wxActive", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'wxActive' }) 
} });
group_wxActive.route('/create', { name: "wxActiveCreate", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'wxActiveCreate' }) 
} });
group_wxActive.route('/edit', { name: "wxActiveEdit", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'wxActiveEdit' }) 
} });
group_wxActive.route('/picture', { name: "wxAcitvePicture", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'wxAcitvePicture' }) 
} });
group_wxActive.route('/member', { name: "wxAcitveMember", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'wxAcitveMember' }) 
} });
