FlowRouter.triggers.enter([function(context, redirect) {

    if (Meteor.userId()) {
        Meteor.call("signatureWechat", window.location.href, function(err, obj) {
            wx.config({
                debug: framework.wechat.debug,
                appId: obj.appId,
                timestamp: obj.timestamp,
                nonceStr: obj.noncestr,
                signature: obj.signature,
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareQZone",
                    "onMenuShareWeibo",
                    "chooseWXPay",
                    "openLocation",
                    "previewImage",
                    "getLocation",
                    "scanQRCode",
                    "addCard",
                    "chooseCard",
                    "openCard",
                ]
            });
            wx.ready(function() {
                wx.isReady = true;
                console.log("wx-ready");
            });
            wx.error(function() {
                wx.isReady = true;
                console.log("wx-error");
            });
        });
    } else {
        Meteor.call("wxLoginUrl", window.location.href, function(err, res) {
            window.setTimeout(function() {
                window.location.href = res;
            }, 500);

        });
    }
}], { except: ["wechatLogin"] });

FlowRouter.triggers.enter([function(context, redirect) {
    if (context.queryParams.c) {
        localStorage.setItem("c", context.queryParams.c);
    }
    //从所有倾情里取得邀请人CODE
    if (context.queryParams.u) {
        localStorage.setItem("u", context.queryParams.u);
    }
    Meteor.call("tongji")
}]);
