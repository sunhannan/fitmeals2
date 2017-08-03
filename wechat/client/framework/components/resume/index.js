Template.resume.onCreated(function() {
    this.subscribe("resume",this.data.userid);
});

Template.resume.helpers({
    resume: function() {
        return Resume.findOne({ userid:this.userid})
    },
    owner: function() {
        return Meteor.users.findOne(this.userid);
    },
    trans:function(str){
        return str? str.replaceAll("\n","<br/>") : "";
    },
    streams:function(){
        return Streams.find({userid:this.userid});
    },
    groups:function(){
        return Groups.find({users:{$in:[this.userid]}});
    },
    tags:function(){
        return UserTags.find({userid:this.userid});
    }
});

Template.resume.events({
   "click #close":function(){
        $(".resume-container").fadeOut(300);
   },
   "click .nickname":function(){
        popup.show(Template.smee,{userid:this.userid});
   }
});

Template.resume.onRendered(function() {
    $(".details").height($(window).height()-60);
    $(".details2").height($(window).height()-60);
});
