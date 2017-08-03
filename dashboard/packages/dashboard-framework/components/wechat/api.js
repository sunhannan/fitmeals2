Picker.route('/api/wechat', function(params, req, res, next) {

    var token = framework.wechat.token();



    if (params && params.query && params.query.echostr) {

        console.log("echostr:" + params.query.echostr);

        res.end(params.query.echostr);

    } else if (params && params.query) {


        var openid = params.query.openid;

        if (params.query.openid) {

            var body = "";

            req.on('data', Meteor.bindEnvironment(function(data) {

                body += data;

            }));

            req.on('end', Meteor.bindEnvironment(function() {

                var md5k = CryptoJS.MD5(body).toString();

                if (wxMessages.findOne({ key: md5k })) {
                    console.log("repeat");
                    res.end("success");
                    return true;
                }

                wxMessages.insert({
                    key: md5k,
                    createdAt: new Date(),
                });
                var parser = new xml2js.Parser({
                    trim: true,
                    explicitArray: false,
                    explicitRoot: false
                });
                parser.parseString(body, function(err, data) {


                    //处理个模块注册订阅事件
                    var result = framework.wechat.service(openid, data);

                    console.log("======result Of Wx Api ==== ");
                    console.log(result);

                    if (result && result.type && result.content) {

                        var baseInfo = (`<ToUserName><![CDATA[{{openid}}]]></ToUserName><FromUserName><![CDATA[{{developer}}]]></FromUserName><CreateTime>{{time}}</CreateTime>`)
                            .replace("{{openid}}", openid)
                            .replace("{{developer}}", framework.wechat.developer)
                            .replace("{{time}}", new Date().getTime());

                        var contentInfo = "";
                        if (result.type == "text") {
                            contentInfo = ("<MsgType><![CDATA[text]]></MsgType><Content><![CDATA[{{content}}]]></Content>").replace("{{content}}", result.content);

                        }
                        var xml = (`<xml>{{baseInfo}}{{contentInfo}}</xml>`)
                            .replace("{{baseInfo}}", baseInfo)
                            .replace("{{contentInfo}}", contentInfo);

                        console.log(xml);
                        res.end(xml);

                    } else {

                        res.end("success");
                    }


                });

                res.writeHead(200);

            }));

        } else {
            console.log("UNKNOW REQUEST2");
            console.log(params);
            res.end("UNKNOW REQUEST2");
        }




        // res.end();

    } else {
        console.log("UNKNOW REQUEST");
        res.end("UNKNOW REQUEST");
    }

});
