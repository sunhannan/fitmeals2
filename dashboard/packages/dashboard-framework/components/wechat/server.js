Meteor.startup(function() {
    
    if (wxaccesstoken.find().count() == 0) {
        wxaccesstoken.insert({});

    }
    if (wxticket.find().count() == 0) {
        wxticket.insert({});
    }

    if (framework) {

        framework.wechat.token = function() {

            var ack = wxaccesstoken.findOne({ expiresAt: { $gt: (Math.floor(Date.now() / 1000)) } });

            if (ack) {
                return ack.token;
            } else {
                var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + framework.wechat.appid + '&secret=' + framework.wechat.secret;
                // console.log(url);
                var response = Meteor.http.get(url);

                if (response.statusCode === 200) {
                    wxaccesstoken.update({}, {
                        token: response.data.access_token,
                        expiresAt: (Math.floor(Date.now() / 1000) + 7200)
                    });
                    return response.data.access_token;
                } else {
                    console.log("accesstoken error");
                    return false;
                }
            }
        }
    }
});