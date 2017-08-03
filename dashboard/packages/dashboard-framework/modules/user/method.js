Meteor.methods({
    queryAllMembers: function(sel, pro) {
        return {
            rows: Meteor.users.find(sel, pro).fetch(),
            total: Meteor.users.find(sel, pro).count()
        };
    },
    updateMemberInfo: function(args) {
        Meteor.users.update({ _id: args.member }, {
            $set: {
                "profile.nickname": args.nickname,
                "profile.tel": args.tel
            }
        })
    },
    addMemberAuth: function(args) {
        Roles.addUsersToRoles(args.member, [args.role], "dashboard");
    },
    removeMemberAuth: function(args) {

        var user = Meteor.users.findOne({ _id: args.member });

        var roles = user.roles["dashboard"];

        if (roles) {

            var nr = [];
            for (var i = 0; i < roles.length; i++) {
                var r = roles[i];
                if (r != args.role) {
                    nr.push(r);
                }
            }
            roles = nr;
        }
        var pro = {};
        pro["roles." + "dashboard"] = roles;
        Meteor.users.update({ _id: args.member }, { $set: pro });
    },
    insertMember: function(args) {

        Accounts.createUser({
            email: args.email,
            password: args.password,
        });

        var account = Accounts.findUserByEmail(args.email);

       
        console.log("设置用户基本信息：");

        var profile = {
            avatar: "http://image.fami2u.com/ghost/avatar.jpg",
            nickname: args.nickname,
            balance: 0,
            point: 0,
            chennel: this.userId,
            tel: args.tel,
        };

        console.log("默认名称：[profile.nickname]" + profile.nickname);
        console.log("默认头像：[profile.avatar]" + profile.avatar);
        console.log("账户余额：[profile.balance]" + profile.balance);
        console.log("账户积分：[profile.point]" + profile.point);
        console.log("渠道来源：[profile.channel]" + profile.chennel);
        console.log("联系方式：[profile.tel]" + profile.tel);

        Meteor.users.update({ _id: account._id }, {
            $set: {
                profile: {
                    avatar: profile.avatar,
                    balance: profile.balance,
                    point: profile.point,
                    channel: profile.channel,
                    nickname: profile.nickname,
                    tel: profile.tel,
                },
                type: "dashboard",
            }
        });
    }
})
