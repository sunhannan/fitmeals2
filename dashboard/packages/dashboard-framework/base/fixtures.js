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
