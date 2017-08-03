
Accounts.registerLoginHandler('login', function(loginRequest) {

    //必须登录状态
    //第二步：通过code换取网页授权access_token

    var result_step2 = HTTP.get("https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + framework.wechat.appid + "&secret=" + framework.wechat.secret + "&code=" + loginRequest.code + "&grant_type=authorization_code");

    if (result_step2.statusCode == 200 && result_step2.content) {

        var json_step2 = JSON.parse(result_step2.content);

        //第四步：拉取用户信息(需scope为 snsapi_userinfo)

        var result_step4 = HTTP.get("https://api.weixin.qq.com/sns/userinfo?access_token=" + json_step2.access_token + "&openid=" + framework.wechat.appid + "&lang=zh_CN");

        if (result_step4.statusCode == 200 && result_step4.content) {

            var json_step4 = JSON.parse(result_step4.content);

            var user = Meteor.users.findOne({ "profile.openid": json_step2.openid });

            // console.log(json_step2.openid);

            if (user) {
                //如果存在则更新
                Meteor.users.update({ _id: loginRequest.userid }, {
                    $set: {
                        "profile.openid": json_step2.openid,
                        "profile.unionid": json_step2.unionid ? json_step2.unionid : false,
                        "profile.avatar": json_step4.headimgurl ? json_step4.headimgurl.replace("http://", "https://") : "",
                        "profile.nickname": json_step4.nickname,
                        "profile.sex": json_step4.sex,
                        "profile.language": json_step4.language,
                        "profile.province": json_step4.province,
                        "profile.city": json_step4.city,
                        "profile.country": json_step4.country,
                    }
                });
            } else {
                //不存在则插入
                Accounts.createUser({
                    email: json_step2.openid +  "@fami2u.com", //用户名
                    username: json_step2.openid, //用户名
                    password: json_step2.openid, //密码
                    profile: {
                        openid: json_step2.openid,
                        unionid: json_step2.unionid ? json_step2.unionid : false,
                        avatar: json_step4.headimgurl ? json_step4.headimgurl.replace("http://", "https://") : "",
                        nickname: json_step4.nickname,
                        sex: json_step4.sex,
                        language: json_step4.language,
                        province: json_step4.province,
                        city: json_step4.city,
                        country: json_step4.country,
                        balance: 0, //账户现金余额
                        channel: "", //渠道号
                    }
                });
                user = Accounts.findUserByEmail(json_step2.openid +  "@fami2u.com");
            }


            return { userId: user._id };
        }
    }

    throw new Meteor.Error(403, "登录错误");
    return {};
});