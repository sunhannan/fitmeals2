Meteor.startup(function() {
    process.env.MAIL_URL = "xxxxxx";
    process.env.MAIL_ACCOUNT = "xxxxxx";
});
mailTo = function(email, title, html) {
    if (Meteor.isProduction) {
        console.log("=========mailTo============");
        console.log(email);
        console.log(title);
        Email.send({
            to: email,
            from: process.env.MAIL_ACCOUNT,
            subject: title,
            html: html,
        });
    } else {
    	console.log("=========mailTo============");
    	console.log(email);
    	console.log(title);
    	console.log(html);
    }
}
