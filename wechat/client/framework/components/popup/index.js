popup = {
    el: false,
    callback:function(){},
    show: function(view, data, callback) {
        $(".popup ._content ._animate").css({
            "max-height":$(window).height(),
        })
        if(view.viewName == "Template.resume"){
            
            Blaze.renderWithData(view, data ? data : {}, $(".resume-container")[0]);
            $(".resume-container").fadeIn(300);
        }else if (popup.el) {
            window.setTimeout(function(){popup.show(view, data, callback)}, 400);
            popup.hide();
        } else {
            popup.el = Blaze.renderWithData(view, data ? data : {}, $(".popup ._content ._animate")[0]);
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
