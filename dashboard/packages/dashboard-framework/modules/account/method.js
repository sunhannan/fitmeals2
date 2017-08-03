Meteor.methods({
    checkTempUser: function(args) {
        var account = Accounts.findUserByEmail(args.email);
        if (!account) {
            return false;
        }
        var user = Meteor.users.findOne({ _id: account._id });

        return user.isTemp;
    },
    updateUserPwd: function(args) {
        Accounts.setPassword(this.userId, args.pwd, { logout: false });
    },
    registUser: function(user) {


        var account = Accounts.findUserByEmail(user.email);

        if (account) {

            var target = Meteor.users.findOne({ _id: account._id });

            if (target.isTemp) {

                var code = CryptoJS.MD5(account._id).toString().substr(0, 6).toUpperCase();
                //设置非临时用户
                Meteor.users.update({ _id: target._id }, { $set: { isTemp: false, code: code } });
                //重新设置密码
                Accounts.setPassword(target._id, user.password, { logout: false });
            } else {
                throw new Meteor.Error(403, "邮箱已存在请直接登录");
            }
        } else {
            Accounts.createUser(user);

            var account = Accounts.findUserByEmail(user.email)

            if (account) {

                Roles.addUsersToRoles(account._id, ["default"], "dashboard");

                var code = CryptoJS.MD5(account._id).toString().substr(0, 6).toUpperCase();
                //设置非临时用户
                Meteor.users.update({ _id: account._id }, { $set: { isTemp: false, code: code } });
            }

        }
    },

});
