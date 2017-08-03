Template.login.events({
    "click #account-login": function() {
        var user = { email: $("#email").val(), password: $("#password").val() };
        if (!user.email) {
            $("#email").addClass("account-input-error");
            toastr.error("请输入邮箱地址");
            return false;
        }
        if (!user.password) {
            $("#password").addClass("account-input-error");
            toastr.error("请输入密码");
            return false;
        }

        if (!isEmail($("#email").val())) {
            $("#email").addClass("account-input-error");
            toastr.error("邮箱地址格式错误");
            return false;
        }

        $(".account-input input").removeClass("account-input-error");

        Meteor.call("checkTempUser", { email: user.email }, function(err, res) {
            if (res) {
                toastr.error("未注册邮件地址");
            }else{
               //登录完成
                Meteor.loginWithPassword(user.email, user.password, function(err) {

                    if (err && (err.error == 403)) {
                        if (err.reason.indexOf("User") > -1) {
                           toastr.error("未注册邮件地址");
                            $("#email").addClass("account-input-error");
                        } else if (err.reason.indexOf("password") > -1) {
                            toastr.error("密码错误");
                            $("#password").addClass("account-input-error");
                        }

                        return false;
                    }

                    //登录成功后将customid设置全局
                    Meteor.call("queryCustomid",function(err,res){
                        localStorage.setItem("customid",res);
                    });

                    xwu.account.login(user);
                })
            }

        });

    }
});
