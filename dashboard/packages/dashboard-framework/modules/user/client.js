Meteor.startup(function() {
    if (!ClientRoles.findOne()) {
        ClientRoles.insert({
            name: "系统管理员",
            desc: "查看所有系统注册用户并分配权限",
            key: "admin"
        });
    }
});
