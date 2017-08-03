Meteor.startup(function() {

    framework.wechat.on("event:CLICK", function(openid, data) {

        var wm = WxMenu.findOne({link: data.EventKey });
        if (wm) {
            WxMenu.update({ _id: wm._id }, { $inc: { click: 1 } })
        }

    },"from wx menus moudle")

    framework.wechat.on("event:VIEW", function(openid, data) {

        var wm = WxMenu.findOne({link: data.EventKey });
        if (wm) {
            WxMenu.update({ _id: wm._id }, { $inc: { click: 1 } })
        }

    },"from wx menus moudle")

});
