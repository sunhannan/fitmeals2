Template.thumbVideo.onCreated(function() {
    this.subscribe("videoByIdSimple",this.data._id);
});
Template.thumbVideo.helpers({
    video: function() {
        return LessonVideos.findOne(this._id);
    },
  
    arrb: function(arr) {
        var narr = [];
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    narr.push("<b>" + arr[i] + "</b>");
                }

            }
        }
        return narr.join(" ");
    }
});
Template.thumbVideo.events({
    
});
Template.thumbVideo.onRendered(function() {
   
});
