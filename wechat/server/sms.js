/*
    通用服务抽象
*/
sms = {
    server: 'http://sms.10690221.com:9011/hy/?',
    send: function(tel, html) {
        console.log("SMS:【"+tel+"】"  + html);
        if (Meteor.isProduction) {
            HTTP.get(sms.server, {
                params: {
                    uid: framework.sms.uid,
                    auth: CryptoJS.MD5(framework.sms.code + framework.sms.pwd).toString().toLowerCase(),
                    mobile: tel,
                    msg: html,
                    expid: 0,
                    encode: "utf-8",
                }
            }, function(error, result) {
                if (!error) {
                    console.log("SMS-RES:" + result.content);
                } else {
                    console.log("SMS-ERR:" + error);
                }
            });
        }

    }
}
