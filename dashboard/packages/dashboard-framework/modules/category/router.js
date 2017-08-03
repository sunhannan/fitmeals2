
var group_category = FlowRouter.group({ name: "category-group", prefix: "/category" });
//地区首页
group_category.route('/', {
    name: "category", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'category' 
        }) } 

});
group_category.route('/create', {
    name: "categoryCreate", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'categoryCreate' 
        }) } 

});
group_category.route('/edit', {
    name: "categoryEdit", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'categoryEdit' 
        }) } 

});
