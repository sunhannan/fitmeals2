Meteor.startup(function() {

   

    framework.oss.accessid = 'xxxxx';
    framework.oss.accesskey = 'xxxxxx';
    framework.oss.dir = 'client';
    framework.oss.bucket = 'code4';
    framework.oss.region = 'oss-cn-beijing';
    framework.oss.cdn = 'https://xxx.xxx.xxx';


    framework.sms = {
        uid:"xxxxx",
        code:"xxxx",
        pwd:"xxxxx",
    }
    

    if (Meteor.isProduction) {
        framework.wechat.appid = 'xxxxxxxxxxxx';
        framework.wechat.secret = 'xxxxxxxxxxxx';
        framework.wechat.developer = 'xxxxxxxxxxxx';
        framework.wechat.EncodingAESKey = 'xxxxxxxxxxxx';
        framework.wechat.mchid = 'xxxxxxxxx';
        framework.wechat.partnerKey = 'xxxxxxxxxxxx';
    } else {
        framework.wechat.appid = 'xxxxxxxxxxxx';
        framework.wechat.secret = 'xxxxxxxxxxxx';
        framework.wechat.developer = 'xxxxxxxxxxxx';
        framework.wechat.mchid = 'xxxxxxxxx';
        framework.wechat.partnerKey = 'xxxxxxxxxxxx';
    }

    framework.robot.key = 'xxxxxxxxxxxx';

    framework.client.wechat = "http://fitmeals.fami2u.com";

     _to_oss.init();

    
});

