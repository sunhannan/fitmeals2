xwu = {
    account: {
        regist: function(user) {
            var funs = xwu.account._queue.regist;
            for (var i = 0; i < funs.length; i++) {funs[i](user)}
        },
        login: function(user) {
            var funs = xwu.account._queue.login;
            for (var i = 0; i < funs.length; i++) {funs[i](user)}
       },
        hook: {
            regist: function(fun) { xwu.account._queue.regist.splice(0, 0, fun) },
            login: function(fun) { xwu.account._queue.login.splice(0, 0, fun) }
        },
        default: {
            regist: function(fun) {
                xwu.account._queue.regist[xwu.account._queue.regist.length - 1] = fun;
            },
            login: function(fun) {
                xwu.account._queue.login[xwu.account._queue.login.length - 1] = fun;
            }
        },
        _queue: {
            regist: [function() {}],
            login: [function() {}]
        }
    },
};
