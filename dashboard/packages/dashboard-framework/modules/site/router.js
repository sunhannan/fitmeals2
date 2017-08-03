FlowRouter.route('/', {
    name: "site",
    action: function(params, queryParams) {
        if (Meteor.userId()) {
            BlazeLayout.render("dashboard", { content: framework.template.site });
        } else {
            FlowRouter.go("/account/login");
        }

    }
});