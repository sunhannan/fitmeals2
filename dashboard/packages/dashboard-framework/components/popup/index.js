popup = {
    el: false,
    callback:function(){},
    show: function(view, data, callback) {
        if (popup.el) {
            window.setTimeout(function(){popup.show(view, data, callback)}, 400);
            popup.hide();
        } else {
            popup.el = Blaze.renderWithData(view, data, $(".popup ._content ._animate")[0]);
            $(".popup ._content ._animate").removeClass("bounceInDown").removeClass("bounceOutDown").addClass("bounceInDown");
            $(".popup").fadeIn(300);
        }
    },
    hide: function(result) {
        $(".popup ._content ._animate").removeClass("bounceInDown").removeClass("bounceOutDown").addClass("bounceOutDown");
        $(".popup").fadeOut(300, function() {
            Blaze.remove(popup.el);
            popup.el = false;
            popup.callback(result);
            popup.callback = function(){};
        });
    }
}
