FlowRouter.triggers.enter([function(context, redirect) {

    if (Meteor.userId()) {
        //已登录－
        if (context.route.group && context.route.group.name == "account" && context.route.name != "logout" && context.route.name != "pwd") {
            //账户登录模块 并且不是登出 －去首页
            FlowRouter.go("site");
        }
    } else {
        //未登录
        // if (!(context.route.group && context.route.group.name == "account")) {
        //     //不是账户登录模块－去登录
        //     FlowRouter.go("login");
        // }
    }
}]);
