Meteor.startup(function() {
    framework.wechat.on("event:subscribe", function(openid, data) {

        var welcome = Config.findOne({ key: "wechat.welcome" });

        var result = "";

        if (welcome) {
            result = welcome.value;
        }

        if (result) {
            return {
                type: "text",
                content: result
            }
        }

    }, "from wx others moudle and result");
});
