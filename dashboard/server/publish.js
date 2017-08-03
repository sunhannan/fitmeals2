Meteor.publishComposite('contactById', function(id) {
    var uid = this.userId;
    return {
        find: function() {
            return Contact.find({ _id: id }, {});
        }
    }
});
Meteor.publishComposite('videoVtt', function(id) {
    var uid = this.userId;

    return {
        find: function() {

            return Vtts.find({ video: id })
        }
    }
});
Meteor.publish('article', function(id) {
    var uid = this.userId;
    var video = LessonVideos.findOne({ _id: id });
    
    return [
        Article.find({ video: id }),
        Vtts.find({ video: id }),
        ArticleConfig.find({ video: id }),
        LessonVideos.find({ lesson: video.lesson,status:true }),
        Lessons.find({ _id: video.lesson }),
    ]
});