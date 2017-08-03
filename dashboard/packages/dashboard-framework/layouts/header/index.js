Template.header.helpers({
    email: function() {
        var user = Meteor.user();
        return user ? user.emails[0].address.substr(0, user.emails[0].address.indexOf("@")) : "";
    }
});

Template.header.onRendered(function() {
	 $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            if ($(".top_header")[0]) {
                $(".top_header").removeClass("top_header").addClass("center_header");
            }
        } else {
            if ($(".center_header")[0]) {
                $(".center_header").removeClass("center_header").addClass("top_header");
            }
        }


    })
});
