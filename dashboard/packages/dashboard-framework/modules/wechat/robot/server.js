Meteor.startup(function() {
    framework.wechat.on("text", function(openid, data) {

        var config = Config.findOne({ key: "wechat.robot" })

        if (config && config.value) {
            var result = _robot.ask(openid, data.Content);

            if (result) {
                return {
                    type: "text",
                    content: result
                }
            }
        } else {

            var result = _robot.knowleage(data.Content);

            if (result) {
                return {
                    type: "text",
                    content: result
                }
            }
        }

    }, "from wx robot moudle and result");

    framework.wechat.on("event:CLICK", function(openid, data) {

        var result = _robot.ask(openid, data.EventKey);

        if (result) {
            return {
                type: "text",
                content: result
            }
        }

    }, "from wx robot moudle and result")
});
