// Blog.config({
//     adminRole: 'admin',
//     authorRole: 'author',
//     blogIndexTemplate: 'blogList',
//     blogShowTemplate: 'blogView',
//     basePath: '/blog',
//     adminBasePath: '/secc/blog',
//     comments: {
//         useSideComments: true, 
//         allowAnonymous: true 
//     }
// });
Meteor.startup(function() {


    /**
     * @alias Startup.server
     * @summary 服务器端配置
     */
    if (Meteor.isServer) {}
    /**
     * @alias Startup.client
     * @summary 客户端配置
     */
    if (Meteor.isClient) {



        $('body').addClass('full-width');
        // ====================================================
        //     时间格式化的配置
        // ====================================================
        moment.defineLocale('zh', {
            relativeTime: {
                future: "%s之后",
                past: "%s",
                s: "刚刚",
                m: "一分钟前",
                mm: "%d分钟前",
                h: "一小时前",
                hh: "%d小时前",
                d: "昨天",
                dd: "%d天前",
                M: "一月前",
                MM: "%d月前",
                y: "一年前",
                yy: "%d年前"
            }
        });
        // ====================================================
        //     表单验证提示信息
        // ====================================================
        SimpleSchema.messages({
            passwordMismatch: "确认密码不一样",
            passwordIncorrect: "密码错误",
            usernameNotFound: "用户没有找到",
            usernameExists: "用户名已存在",
            pinMismatch: "验证码错误",
            notShare: "真懒啊！隐藏内容改一下会死啊！",
            required: "亲，你没填[label]！",
            greaterThan30: "[label]不能超过30天",
            before: "不能选择今天之前的时间！",
            endgtstart: "结束时间不能早于开始时间",
            notUnique: '[label]已经存在',
            minString: "[label]你真的[min]个字也不想填？",
            maxString: "[label]不能超过[max]字",
            minNumber: "[label]不能小于[min]",
            maxNumber: "[label]不能大于[max]",
            minDate: "[label]必须在[min]之后",
            maxDate: "[label]必须在[max]之前",
            badDate: "[label]不是日期格式",
            minCount: "You must specify at least [minCount] values",
            maxCount: "You cannot specify more than [maxCount] values",
            noDecimal: "[label]必须填写数字",
            notAllowed: "[label]不允许填写[value]",
            expectedString: "[label]必须填写文字",
            expectedNumber: "[label]必须填写数字",
            expectedBoolean: "[label]必须是选择",
            expectedArray: "[label]必须是数组",
            expectedObject: "[label]必须是对象",
            expectedConstructor: "[label]必须是一个[type]",
            regEx: [{
                msg: "[label]不符合要求，请完善"
            }, {
                exp: SimpleSchema.RegEx.Email,
                msg: "[label]需要填写邮件地址"
            }, {
                exp: SimpleSchema.RegEx.WeakEmail,
                msg: "[label]需要填写邮件地址"
            }, {
                exp: SimpleSchema.RegEx.Domain,
                msg: "[label]需要填写域名"
            }, {
                exp: SimpleSchema.RegEx.WeakDomain,
                msg: "[label]需要填写域名"
            }, {
                exp: SimpleSchema.RegEx.IP,
                msg: "[label]需要填写IP地址（IPv4或者IPv6）"
            }, {
                exp: SimpleSchema.RegEx.IPv4,
                msg: "[label]需要填写IPv4的IP地址"
            }, {
                exp: SimpleSchema.RegEx.IPv6,
                msg: "[label]需要填写IPv6的IP地址"
            }, {
                exp: SimpleSchema.RegEx.Url,
                msg: "[label]需要填写网址"
            }, {
                exp: SimpleSchema.RegEx.Id,
                msg: "[label]需要填写字符ID"
            }],
            keyNotInSchema: "[key]没找到有效的验证"
        });

        // ====================================================
        //     提示框配置信息
        // ====================================================
        toastr.options = {
            timeOut: 3000,
            debug: false,
            preventDuplicates: true,
            positionClass: 'toast-top-full-width',
        };
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
});
