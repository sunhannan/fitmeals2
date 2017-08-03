//反转数组
Template.registerHelper("reverse", function(arr) {
    if (arr) {
        return arr.reverse();
    } else {
        return [];
    }

});


Template.registerHelper("checkInRoles", function(userId,roles) {
    return Roles.userIsInRole(userId,roles.split(","),"dashboard");
});
Template.registerHelper("framework", function(arr) {
    return framework;

});

Template.registerHelper("logo", function(arr) {
    return framework.logo.indexOf("http") > -1 ? ("<img src=' " +framework.logo.indexOf("http")+ " '/>") : framework.logo;

});
//用户昵称
Template.registerHelper("nick", function(user) {


    var nick = '';
    if (user && user.profile && user.profile.nickname) {
        nick = user.profile.nickname
    }

    if (!nick && user && user.emails && user.emails[0] && user.emails[0].address) {
        var address = user.emails[0].address;

        nick = address.substr(0, address.indexOf("@"));
    }

    
    return nick;

});
//用户头像
Template.registerHelper("avatarRole", function(user) {

    if (user && localStorage.getItem("project")) {
        if (Roles.userIsInRole(user._id, ["developer"], 'master')) {
            return "/developer.jpg";
        } else if (Roles.userIsInRole(user._id, ["auth-developer"], 'master')) {
            return "/developer.jpg";
        } else if (Roles.userIsInRole(user._id, ["manager"], 'master')) {
            return "/master.jpg";
        } else if (Roles.userIsInRole(user._id, ["admin"], 'master')) {
            return "/admin.png";
        }
    }
    return "/default.png";
});

//千分数字
Template.registerHelper("money", function(num) {

    var num = (parseInt(num) || 0).toString(),
        result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;

});

//随机颜色
Template.registerHelper("randomColor", function(s) {
    s = CryptoJS.MD5(s).toString();
    var str = "";
    for (var i = 0; i < s.length; i++) {
        str += s.charCodeAt(i).toString(16);
        if (str.length == 6) {
            return str;
        }
    }

});
//保留两位小数
Template.registerHelper("fix", function(num) {
    return num * 1 ? (num * 1).toFixed(2) : "0.00";

});
//比较是否相同
Template.registerHelper("compare", function(str1, str2) {
    // console.log(str1);
    // console.log(str2);
    return str1 == str2;
});
Template.registerHelper("checkSelect", function(str1, str2) {
    // console.log("=======checkSelect========")
    // console.log(str1);
    // console.log(str2);
     return str1 == str2 ? "selected" : "";
});

// ====================================================
//     格式化日期
// ====================================================
Template.registerHelper('dateformat', function(time) {
    if (!time) return "-/-/-";
    return new moment(time).format("YYYY/MM/DD");
});
// ====================================================
//     格式化时间
// ====================================================
Template.registerHelper('timeformat', function(time) {
    if (!time) return "-/-/- --:--";
    return new moment(time).format("YYYY/MM/DD HH:mm");
});
Template.registerHelper('friendformat', function(date) {
    if (!date) return "-/-/- --:--";

    var time = new Date().getTime();

    time = parseInt((time - date.getTime() * 1000) / 1000);

    //存储转换值 
    var s;
    if (time < 60 * 10) { //十分钟内
        return '刚刚';
    } else if ((time < 60 * 60) && (time >= 60 * 10)) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60);
        return s + "分钟前";
    } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
    } else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
        //超过1天少于3天内
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
    } else {
        //超过3天
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    }

    return new moment(date).format("YYYY/MM/DD HH:mm");
});

// ====================================================
//     获取url绝对路径
// ====================================================
Template.registerHelper('absoluteUrl', function(uri) {
    return Meteor.absoluteUrl(uri);
});
Template.registerHelper("format", function(str) {
    if (str) {
        var d = new Date(str);

        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    } else {
        return "-/-/-"
    }

});
// ====================================================
//     隐藏字符串内容，只保留第一个字符和最后一个
// ====================================================
Template.registerHelper('marker', function(str) {
    if (!str) return "***";
    return str.substring(0, 1) + '**' + str.substring(str.length - 1, str.length);
});
// ====================================================
//     显示图像图片，如果没有显示默认头像
// ====================================================
Template.registerHelper('avatar', function(image) {
    if (image) {
        if (image.length > 17) {
            if (image.indexOf('wx.qlogo.cn') > 0) {
                return image.substring(0, image.lastIndexOf('/')) + '/96';
            } else {
                return image;
            }
        } else {
            return '/cfs/files/avatar/' + image;
        }
    } else {
        return '/images/profile-default.jpg';
    }
});
// ====================================================
//     显示图片，如果没有显示默认图片
// ====================================================
Template.registerHelper('images', function(image) {
    if (image) {
        if (image.length > 17) {
            return image;
        } else {
            return '/cfs/files/images/' + image;
        }
    } else {
        return '/images/upload_file.svg';
    }
});
// ====================================================
//     获取 aliyun oss 的图片地址 
// ====================================================
Template.registerHelper('imageByOSS', function(id) {
    const ready = Meteor.subscribe('image', id).ready();
    if (ready) {
        const img = Images.findOne(id);
        if (img) {
            return img.OSSUrl();
        }
    }
    return '/images/profile-default.jpg';
});
// ====================================================
//     判断是否是手机
// ====================================================
Template.registerHelper('isMobile', function(str, n) {
    return isMobile();
});
// ====================================================
//     判断模板是否存在
// ====================================================
Template.registerHelper('isTemplate', function(name) {
    return !!Template[name];
});

Template.registerHelper('ternary', function(key, value1, value2) {
    return key ? value1 : value2;
});
// ====================================================
//     显示图片，如果没有显示默认图片
// ====================================================
Template.registerHelper('shareimage', function(image) {
    if (image) {
        if (image.length > 17) {
            return image;
        } else {
            if (Meteor.isDevelopment) {
                return '/cfs/files/images/' + image;
            } else {
                return '/cfs/files/images/' + image;
            }
        }
    } else {
        return '/images/upload_file.svg';
    }
});

// Template.registerHelper('tabulars', function(){
//     return tabulars;
// });


