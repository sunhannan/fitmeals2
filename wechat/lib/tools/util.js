//获取昵称
getNick = function(user) {
    var nick = '';
    if (user && user.profile && user.profile.nickname) {
        nick = user.profile.nickname
    }

    if (!nick && user && user.emails && user.emails[0] && user.emails[0].address) {
        var address = user.emails[0].address;

        nick = address.substr(0, address.indexOf("@"));
    }

    if (!nick) {
        nick = "--"
    }


    return nick;
}
getNick = function(user) {
        var nick = '';
        if (user && user.profile && user.profile.nickname) {
            nick = user.profile.nickname
        }

        if (!nick && user && user.emails && user.emails[0] && user.emails[0].address) {
            var address = user.emails[0].address;

            nick = address.substr(0, address.indexOf("@"));
        }

        if (!nick) {
            nick = "--"
        }


        return nick;
    }
    // ====================================================
    //     生成一个随机数字
    // ====================================================
generateNumber = function(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var result = (Min + Math.round(Rand * Range));
        return result;
    }
    // ====================================================
    //     
    // ====================================================
generateNumbers = function(n) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 9);
            res += chars[id];
        }
        return res;
    }
    // ====================================================
    //     生成随机字符串
    // ====================================================
generateMixed = function(n) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}
isEmail = function(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}
isMobile = function() {
    return /(android|bb\d+|meego).+mobile|micromessenger|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4));
}


format = function(str) {
    if (str) {
        var d = new Date(str);

        return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 " + pad(d.getHours(), 2) + ":" + pad(d.getMinutes(), 2);
    } else {
        return "-/-/- --:--"
    }
}
format2 = function(str) {
    if (str) {
        var d = new Date(str);

        return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 ";
    } else {
        return "-/-/- --:--"
    }
}
pad = function(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

randomColor = function() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}
stringToHex = function(str) {　　　　
    var val = "";　　　　
    for (var i = 0; i < str.length; i++) {　　　　　　
        if (val == "")　　　　　　　　 val = str.charCodeAt(i).toString(16);　　　　　　
        else　　　　　　　　 val += "," + str.charCodeAt(i).toString(16);　　　　
    }　　　　
    return val;
}
toUnicode = function(s) {
    var str = "";
    for (var i = 0; i < s.length; i++) {
        str += "\\u" + s.charCodeAt(i).toString(16) + "\t";
    }
    return str;
}
toUnicodeColor = function(s) {
    var str = "";
    for (var i = 0; i < s.length; i++) {
        str += s.charCodeAt(i).toString(16);
        if (str.length == 6) {
            return str;
        }
    }
}
percentEncode = function(str) {
    res = encodeURIComponent(str);
    res = res.replace('/\+/', '%20');
    res = res.replace('/\*/', '%2A');
    res = res.replace('/%7E/', '~');
    return res;
}
randomUUID = function() {
    for (var a = [], b = "0123456789abcdef", c = 0; c < 36; c++) a[c] = b.substr(Math.floor(16 * Math.random()), 1);
    return a[14] = "4", a[19] = b.substr(3 & a[19] | 8, 1), a[8] = a[13] = a[18] = a[23] = "-", a.join("")
}
vodSign = function(json, accesskey) {
    var njson = {
        data: {},
        sign: {},
        str: "",
        query: "",

    };
    var karr = [];
    var qarr = [];
    for (var key in json) {
        karr.push(key);
    }
    karr.sort(function(a, b) {
        return a > b ? 1 : -1
    });
    for (var i = 0; i < karr.length; i++) {
        njson.data[karr[i]] = json[karr[i]];
    }


    for (var key in njson.data) {
        njson.sign[key] = percentEncode(njson.data[key]);
    }

    for (var key in njson.sign) {
        njson.str += ("&" + key + "=" + njson.sign[key]);

    }
    njson.str = "GET&%2F&" + percentEncode(njson.str.substr(1));

    njson.sign.Signature = percentEncode(CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(njson.str, accesskey + "&")));

    for (var key in njson.sign) {
        qarr.push(key + "=" + njson.sign[key])
    }
    njson.query = qarr.join("&");

    return njson;

}

in_array = function(stringToSearch, arrayToSearch) {
    for (s = 0; s < arrayToSearch.length; s++) {
        thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
}
priceStream = function(stream){
    //验证一下避免出错
    if(stream && stream.count){
        var order = stream.count.order ? stream.count.order : 0;
        var max = stream.max ? stream.max : 800;
        var user = Meteor.users.findOne(stream.userid);
        var level = (user && user.profile.level) ? user.profile.level : 1;
        var price = order <  20 ? 1 : (parseInt(order*(1.1 + (level/10))));
        return (price >=  max) ? max : price;
    }
}

priceLesson = function(lesson){

    //验证一下避免出错
    if(lesson && lesson.count){
        var order = lesson.count.order ? lesson.count.order : 0;
        var max = lesson.max ? lesson.max : 800;
        var user = Meteor.users.findOne(lesson.userid);
        var level = (user && user.profile.level) ? user.profile.level : 1;
        var price = order <  20 ? 1 : (parseInt(order*(1.1 + (level/10))));
        return (price >=  max) ? max : price;
    }
}
Array.prototype.unique = function() {
    this.sort();

    var re = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== re[re.length - 1]) {
            re.push(this[i]);
        }
    }
    return re;
}
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
Meteor.isActive = function(){
    var user = Meteor.user();
        //激活且在有效期内
    return user && (user.profile.active > new Date().getTime());
}
Meteor.isWx = function() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
Meteor.host = function() {
    var host = window.location.href;
    host = host.split("/");
    host = host[0] + "//" + host[2];
    return host;
}
Meteor.checkTel = function(str) {
    return str.match(/^0?1[3|4|5|6|7|8][0-9]\d{8}$/);;
}

String.prototype.pad = function(n) {
    var str = this.toString();
    var len = str.length;
    while (len < n) {
        str = "0" + str;
        len++;
    }
    return str;
}
