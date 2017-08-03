
var group_region = FlowRouter.group({ name: "region-group", prefix: "/region" });
//地区首页
group_region.route('/', {
    name: "region", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'region' 
        }) } 

});
group_region.route('/create', {
    name: "regionCreate", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'regionCreate' 
        }) } 

});
group_region.route('/edit', {
    name: "regionEdit", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'regionEdit' 
        }) } 

});
