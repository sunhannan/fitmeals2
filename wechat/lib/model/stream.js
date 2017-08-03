Streams = new Meteor.Collection("streams");
StreamMd = new Meteor.Collection("StreamMd");
StreamIPs = new Meteor.Collection("streamIPs");
StreamGifts= new Meteor.Collection("StreamGifts");
C4Tracker = new Meteor.Collection("C4Tracker");
wxMessages = new Meteor.Collection("wxmessages");
wxaccesstoken = new Meteor.Collection("wxaccesstoken");
wxticket = new Meteor.Collection("wxticket");

MissPays = new Meteor.Collection("MissPays");
Images = new Meteor.Collection("images");

//临时验证邮件码存放
MailVerified = new Meteor.Collection("mailVerified");
//用户渠道信息
Channels = new Meteor.Collection("channels");
Groups = new Meteor.Collection("Groups");
GroupUsers = new Meteor.Collection("GroupUsers");
GroupMd = new Meteor.Collection("GroupMd");
GroupApplys = new Meteor.Collection("GroupApplys");
PhoneVerified = new Meteor.Collection("PhoneVerified");

Todo = new Meteor.Collection("Todo");
Notice = new Meteor.Collection("Notice");

UserTags = new Meteor.Collection("UserTags");

Tags = new Meteor.Collection("Tags");

Category = new Meteor.Collection("category");

Smee = new Meteor.Collection("Smee");

Suggest = new Meteor.Collection("Suggest");

Lessons = new Meteor.Collection("Lessons");
LessonVideos = new Meteor.Collection("LessonVideos");
LessonKeys = new Meteor.Collection("LessonKeys");
TmpCode = new Meteor.Collection("TmpCode");

KeyFilter = new Meteor.Collection("KeyFilter");

//邀请记录
InvitedTracker = new Meteor.Collection("InvitedTracker");

//配置参数
Config = new Meteor.Collection("Config");
//评论
Comments = new Meteor.Collection("Comments");
//回复
Replys = new Meteor.Collection("Replys");
//购买
Orders = new Meteor.Collection("Orders");
//收藏
Fovars = new Meteor.Collection("Fovars");
//付款
Pays = new Meteor.Collection("Pays");
//字幕
Vtts = new Meteor.Collection("Vtts");
//私有视频订阅
PrvOrder = new Meteor.Collection("PrvOrder");

TodoVideo =  new Meteor.Collection("TodoVideo");
TodoStream =  new Meteor.Collection("TodoStream");
TodoMessages =  new Meteor.Collection("TodoMessages");