var group_wxMedia = FlowRouter.group({ name: "wxMediaGroup", prefix: "/wx/media" });

group_wxMedia.route('/', { name: "wxMedia", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'wxMedia' }) 
} });
group_wxMedia.route('/edit', { name: "wxMediaEdit", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'wxMediaEdit' }) 
} });
