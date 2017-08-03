Package.describe({
    name: 'fami:dashboard-framework',
    version: '0.2.0',
    summary: '后台原型用于快速搭建一个项目',
    git: 'https://github.com/code4cn/meteor-quickstart-dashboard',
    documentation: 'README.md'
});

var PackageManager = function() {
    var obj = new Object();
    obj.server = {
        list: [],
        merge: function(arr) {
            obj.server.list = obj.server.list.concat(arr);
        }
    }
    obj.client = {
        list: [],
        merge: function(arr) {
            obj.client.list = obj.client.list.concat(arr);
        }
    }
    obj.both = {
        list: [],
        merge: function(arr) {
            obj.both.list = obj.both.list.concat(arr);
        }
    }
    return obj;
}
Package.on_use(function(api) {
    //依赖的NPM包
    var npms = {
        list: {},
        merge: function(json) {
            for (var packageName in json) {
                npms.list[packageName] = json[packageName];
            }
        }
    };
    //依赖的METEOR包
    //引入的文件
    //输出的变量
    var meteor = new PackageManager();
    var file = new PackageManager();
    var vars = new PackageManager();

    /*公共部分*/
    meteor.both.merge([
        "ecmascript@0.6.1",
        "reywood:publish-composite@1.3.6",
        "templating@1.1.5",
        "mongo@1.1.14",
        "meteorhacks:picker@1.0.3",
        "kadira:flow-router@2.11.0",
        "kadira:blaze-layout@2.0.1",
        "momentjs:moment@2.16.0",
        "less@2.7.8",
    ]);

    npms.merge({
        "request": "2.81.0",
        "aliyun-oss": "1.2.0"
    });

    file.both.merge([
        "./config.js",
        "./base/init.js",
        "./base/until.js",
        "./base/base64.js",
        "./base/crypto.js",
        "./base/sha1.js",
        "./base/hmac.js",

    ]);

    file.client.merge([
        "./base/filter.js",
        "./base/fixtures.js",
        "./base/helpers.js",
        "./base/lrz.js",
    ]);

    vars.both.merge(["framework"]);

    /*布局部分*/
    file.client.merge([
        "./theme/reset.css",
        "./theme/styles.css",
        "./theme/ff-form.less",
        "./theme/button.less",

        "./layouts/header/model.js",
        "./layouts/header/head.html",
        "./layouts/header/index.html",
        "./layouts/header/index.css",
        "./layouts/header/index.js",
        "./layouts/header/client.js",

        "./layouts/account/index.html",
        "./layouts/account/index.css",

        "./layouts/dashboard/index.html",
        "./layouts/dashboard/index.css",
        "./layouts/dashboard/index.js",

        "./layouts/side/model.js",
        "./layouts/side/index.html",
        "./layouts/side/index.less",
        "./layouts/side/index.js",
    ]);
    vars.client.merge(['Menus']);

    /*组件部分*/
    /* grid */
    file.client.merge([
        "./components/grid/index.html",
        "./components/grid/index.css",
        "./components/grid/index.js",
    ]);
    file.server.merge([
        "./components/grid/method.js",
    ]);
    vars.client.merge(['grid']);

    /* upload */
    file.client.merge([
        "./components/upload/index.html",
        "./components/upload/index.css",
        "./components/upload/index.js",
    ]);
    file.server.merge([
        "./components/upload/method.js",
    ]);
    file.both.merge([
        "./components/upload/model.js",
    ]);
    vars.client.merge(['uploader']);
    vars.both.merge(['Images']);

    /* wechat */
    file.server.merge([
        "./components/wechat/model.js",
        "./components/wechat/method.js",
        "./components/wechat/api.js",
        "./components/wechat/server.js",

    ]);

    /* qrcode */
    file.client.merge([
        "./components/qrcode/index.less",
        "./components/qrcode/index.html",
        "./components/qrcode/index.js",
    ]);
    vars.client.merge(['qrcode']);

    /* region */
    file.client.merge([
        "./components/region/index.css",
        "./components/region/index.html",
        "./components/region/index.js",
    ]);
    file.server.merge([
        "./components/region/server.js",
        "./components/region/method.js",
    ]);
    vars.server.merge(['_region_server']);


    /* popup */
    file.client.merge([
        "./components/popup/index.less",
        "./components/popup/index.html",
        "./components/popup/index.js",
    ]);
    vars.client.merge(['popup']);


    /*模块部分*/
    /*CONFIG*/
    file.both.merge([
        "./modules/config/model.js",
    ]);
    file.server.merge([
        "./modules/config/publish.js",
    ]);
    vars.both.merge(['Config']);

    /*404*/
    file.client.merge([
        "./modules/404/index.html",
        "./modules/404/router.js",
    ]);

    /*account*/
    file.client.merge([
        "./modules/account/filters.js",
        "./modules/account/method.js",
        "./modules/account/router.js",
        "./modules/account/client.js",

        "./modules/account/login/index.html",
        "./modules/account/login/index.js",

        "./modules/account/regist/index.html",
        "./modules/account/regist/index.js",

        "./modules/account/pwd/index.html",
        "./modules/account/pwd/index.js",

    ]);
    file.server.merge([
        "./modules/account/method.js",
        "./modules/account/server.js",
    ]);

    /*site*/
    file.client.merge([
        "./modules/site/index.html",
        "./modules/site/router.js",
    ]);

    /*user*/
    file.client.merge([
        "./modules/user/model.js",
        "./modules/user/menu.js",
        "./modules/user/router.js",
        "./modules/user/client.js",

        "./modules/user/index.html",
        "./modules/user/index.js",

        "./modules/user/auth/index.html",
        "./modules/user/auth/index.js",

        "./modules/user/create/index.html",
        "./modules/user/create/index.js",

        "./modules/user/detail/index.html",
        "./modules/user/detail/index.js",
    ]);
    file.server.merge([
        "./modules/user/method.js",
        "./modules/user/publish.js",
    ]);
    vars.client.merge(['ClientRoles']);


    /*category*/
    file.client.merge([

        "./modules/category/menu.js",
        "./modules/category/router.js",

        "./modules/category/index.html",
        "./modules/category/index.js",

        "./modules/category/create/index.html",
        "./modules/category/create/index.js",

        "./modules/category/edit/index.html",
        "./modules/category/edit/index.js",

    ]);
    file.server.merge([
        "./modules/category/method.js",
        "./modules/category/publish.js",
        "./modules/category/server.js",
    ]);
    file.both.merge([
        "./modules/category/model.js",
    ]);
    vars.client.merge(['CategoryType', "_category"]);
    vars.server.merge(['_category_server']);
    vars.both.merge(['Category']);

    /*region*/
    file.client.merge([

        "./modules/region/menu.js",
        "./modules/region/router.js",

        "./modules/region/index.html",
        "./modules/region/index.js",

        // "./modules/region/create/index.html",
        // "./modules/region/create/index.js",

        // "./modules/region/edit/index.html",
        // "./modules/region/edit/index.js",

    ]);
    file.server.merge([
        "./modules/region/method.js",
        "./modules/region/publish.js",
        "./modules/region/data.js",
        "./modules/region/server.js",
    ]);
    file.both.merge([
        "./modules/region/model.js",
    ]);
    vars.client.merge(['_region']);
    vars.both.merge(['Region']);


    /*wechat*/
    file.server.merge([
        "./modules/wechat/model.js",
    ]);

    /*wechat.robot*/
    file.client.merge([

        "./modules/wechat/robot/menu.js",
        "./modules/wechat/robot/router.js",

        "./modules/wechat/robot/index.html",
        "./modules/wechat/robot/index.js",

        "./modules/wechat/robot/create/index.html",
        "./modules/wechat/robot/create/index.js",

        "./modules/wechat/robot/edit/index.html",
        "./modules/wechat/robot/edit/index.js",


    ]);
    file.server.merge([
        "./modules/wechat/robot/method.js",
        "./modules/wechat/robot/publish.js",
        "./modules/wechat/robot/service.js",
        "./modules/wechat/robot/server.js",
    ]);
    file.both.merge([
        "./modules/wechat/robot/model.js",
    ]);
    vars.client.merge(['_robot']);
    vars.both.merge(['Knowledge']);

    /*wechat.media*/
    file.client.merge([

        "./modules/wechat/media/menu.js",
        "./modules/wechat/media/router.js",
        "./modules/wechat/media/client.js",

        "./modules/wechat/media/index.html",
        "./modules/wechat/media/index.js",

        "./modules/wechat/media/edit/index.html",
        "./modules/wechat/media/edit/index.js",


    ]);
    file.server.merge([
        "./modules/wechat/media/method.js",
        "./modules/wechat/media/publish.js",
    ]);
    file.both.merge([
        "./modules/wechat/media/model.js",
    ]);


    vars.client.merge(['_wxMedia']);
    vars.both.merge(['WxMedia']);


    /*wechat.active*/
    file.client.merge([

        "./modules/wechat/active/menu.js",
        "./modules/wechat/active/router.js",
        "./modules/wechat/active/client.js",

        "./modules/wechat/active/index.html",
        "./modules/wechat/active/index.js",

        "./modules/wechat/active/create/index.html",
        "./modules/wechat/active/create/index.js",

        "./modules/wechat/active/edit/index.html",
        "./modules/wechat/active/edit/index.js",



        "./modules/wechat/active/picture/index.less",
        "./modules/wechat/active/picture/index.html",
        "./modules/wechat/active/picture/index.js",

        "./modules/wechat/active/member/index.html",
        "./modules/wechat/active/member/index.js",

    ]);
    file.server.merge([
        "./modules/wechat/active/method.js",
        "./modules/wechat/active/publish.js",
    ]);
    file.both.merge([
        "./modules/wechat/active/model.js",
    ]);
    vars.both.merge(['WxActive', "WxActivePictures", "WxActiveUsers"]);


    /*wechat.menu*/
    file.client.merge([

        "./modules/wechat/menu/menu.js",
        "./modules/wechat/menu/router.js",

        "./modules/wechat/menu/index.less",
        "./modules/wechat/menu/index.html",
        "./modules/wechat/menu/index.js",

    ]);
    file.server.merge([
        "./modules/wechat/menu/method.js",
        "./modules/wechat/menu/publish.js",
        "./modules/wechat/menu/server.js",
    ]);
    file.both.merge([
        "./modules/wechat/menu/model.js",
    ]);

    vars.client.merge(['_wxMenu']);
    vars.both.merge(['WxMenu']);

    /*wechat.others*/
    file.client.merge([
        "./modules/wechat/others/menu.js",
        "./modules/wechat/others/router.js",
        "./modules/wechat/others/index.less",
        "./modules/wechat/others/index.html",
        "./modules/wechat/others/index.js",
    ]);
    file.server.merge([
        "./modules/wechat/others/server.js",
    ]);


    /*admin.tracker*/
    file.both.merge([
        "./modules/tracker/model.js",
    ]);
    vars.both.merge(['AdminTrack']);
    // console.log("============");
    // console.log(meteor.both);
    // console.log("============");

    Npm.depends(npms.list);
    api.use(meteor.both.list, ['client', 'server']);
    api.use(meteor.client.list, ['client']);
    api.use(meteor.server.list, ['server']);
    api.addFiles(file.both.list, ['client', 'server']);
    api.addFiles(file.client.list, ['client']);
    api.addFiles(file.server.list, ['server']);
    api.export(vars.both.list, ['client', 'server']);
    api.export(vars.client.list, ['client']);
    api.export(vars.server.list, ['server']);

});
