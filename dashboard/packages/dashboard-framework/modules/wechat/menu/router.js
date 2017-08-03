var group_wxMenu = FlowRouter.group({ name: "wxMenu", prefix: "/wx/menu" });

group_wxMenu.route('/', { name: "wxMenu", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'wxMenu' }) 
} });
