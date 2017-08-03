qrcode = {
    show: function(url) {
        console.log(url);
        var qbg = $("<div class='qrcode_comp_bg'></div>").appendTo($(document.body));
        var tmpView = Blaze.renderWithData(Template.innerQrcode, { url: url }, qbg[0]);
        qbg.click(function() {
        	$(".qrcode_comp_bg").find(".innerQrcode div").removeClass("bounceInUp").addClass("bounceOutDown");
            $(".qrcode_comp_bg").fadeOut(500, function() {
                Blaze.remove(tmpView);
                $(".qrcode_comp_bg").remove();

            });
        });
        qbg.fadeIn(500);
    }
}
