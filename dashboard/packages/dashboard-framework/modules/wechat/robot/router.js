var group_robot = FlowRouter.group({ name: "robot", prefix: "/robot" });

group_robot.route('/', { name: "robotKnowledge", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'robot' }) 
} });

group_robot.route('/create', { name: "robotKnowledgeCreate", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'robotKnowledgeCreate' }) 
} });
group_robot.route('/edit', { name: "robotKnowledgeEdit", action: function(params, queryParams){ 
    BlazeLayout.render("dashboard", { content: 'robotKnowledgeEdit' }) 
} });