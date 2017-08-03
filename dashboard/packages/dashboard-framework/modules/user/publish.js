Meteor.publishComposite('queryMemberDetail', function(uid) {
    var loggedInUser = this.userId;
    return {
        find: function() {

            return Meteor.users.find({_id:uid}, {});
        }
    }
});