Meteor.startup(function() {


    var adminMail = "admin@fami2u.com";

    var admin = Accounts.findUserByEmail(adminMail);

    if (!admin) {

        Accounts.createUser({ email: adminMail, password: "fami@2014" });

        var admin = Accounts.findUserByEmail(adminMail);

        Roles.addUsersToRoles(admin._id, ["admin"], Roles.GLOBAL_GROUP);

        console.log("admin.account is created");
    }
    framework.wechat.on("event:subscribe", function(openid, data) {

        //判断用户是否为关注用户
        var test = Meteor.users.findOne({ "profile.openid": openid });
        if (test) {
            Meteor.users.update({ _id: test._id }, {
                $set: {
                    "profile.focus": true,
                    tmp: false,
                }
            });
            console.log("老用户重新关注：" + openid);
        } else {

            var initInfo = {
                email: openid + "@wx.com",
                password: "123456"
            }

            Accounts.createUser({
                email: initInfo.email,
                password: initInfo.password,
            });

            var account = Accounts.findUserByEmail(initInfo.email);

            Meteor.users.update({ _id: account._id }, {
                $set: {
                    profile: {
                        openid: openid,
                        focus: true,
                    },
                    type: "wechat",
                    tmp: true,
                }
            });

            console.log("新用户关注：" + openid);
        }

        var config = Config.findOne({ key: "wechat.welcome" })

        if (config && config.value) {

            return {
                type: "text",
                content: config.value
            }
        }

    }, "from account moudle")

    framework.wechat.on("event:unsubscribe", function(openid, data) {

        //判断用户是否为关注用户
        var test = Meteor.users.findOne({ "profile.openid": openid });
        if (test) {
            Meteor.users.update({ _id: test._id }, {
                $set: {
                    "profile.focus": false
                }
            });
        }
        console.log("用户关注：" + openid);

    }, "from account moudle")

    framework.wechat.on("event:LOCATION", function(openid, data) {

        //判断用户是否为关注用户
        var test = Meteor.users.findOne({ "profile.openid": openid });
        if (test) {
            Meteor.users.update({ _id: test._id }, {
                $set: {
                    "profile.location": [data.Longitude, data.Latitude],
                }
            });
        }
        console.log("LOCATION:" + openid);

    }, "from account moudle")

});
