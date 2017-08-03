framework = {
    logo: " FAMI<b>2</b>U",
    title: "连接技术与商业，释放开发者生产力。",
    notFound: "http://image.fami2u.com/ghost/404.png",
    client:{
        www:"",
        wechat:"",
        dashboard:"",
    },
    template: {
        site: "dfSite",
        notFound: "dfNotFound"
    },
    oss: {
        accessid: '6MKOqxGiGU4AUk44',
        accesskey: 'ufu7nS8kS59awNihtjSonMETLI0KLy',
        dir: "fami2u",
        bucket:"fami2u",
        region: 'oss-cn-hangzhou',
        cdn: 'http://post-test.oss-cn-hangzhou.aliyuncs.com',
    },
    wechat: {
        appid: "",
        secret: "",
        mchid: "",
        developer:"",
        partnerKey: "",
        token: function() {},
        service:function(openid,data){
            console.log("=====wx-service");
            console.log(data);
            if(framework.wechat.events[data.MsgType + (data.Event ? (":" + data.Event) : "")]){
                var funs = framework.wechat.events[data.MsgType + (data.Event ? (":" + data.Event) : "")];
                var res = false;
                for(var i = 0 ; i < funs.length ; i++){
                    var tmp = funs[i](openid,data);
                    if(tmp){
                        res = tmp;
                    }
                }
                return res;
            }else{
                return false;
            }
        },
        events:{},
        eventsDesc:{},
        on:function(key,fun,desc){
            /*
                各事件KEY值
                event:subscribe //关注事件&扫描二维码关注事件
                event:unsubscribe //关注事件&扫描二维码关注事件
                event:SCAN //已关注扫描二维码事件
                event:LOCATION //上报地理位置事件每5s一次
                event:CLICK //点击菜单拉取消息时的事件
                event:VIEW //点击菜单跳转链接时的事件
                text //文本消息
                image //图片消息
                voice //语音消息
                video //视频消息
                shortvideo //小视频消息
                location //地理位置消息
                link //链接消息
            */
            if(framework.wechat.events[key]){
                framework.wechat.events[key].push(fun);
            }else{
                framework.wechat.events[key] = [fun];
            }

            if(desc){
                if(framework.wechat.eventsDesc[key]){
                    framework.wechat.eventsDesc[key].push(desc);
                }else{
                    framework.wechat.eventsDesc[key] = [desc];
                }
                console.log("wechat.regist.events:" + key + " -" + desc);
            }else{
                console.log("wechat.regist.events:" + key);
            }

            
        },
    },
    robot:{
        key:"",
    }
}
