var group_wxOthers = FlowRouter.group({ name: "wxOthers", prefix: "/wx/others" });

group_wxOthers.route('/', { name: "wxOthers", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'wxOthers' }) 
} });
