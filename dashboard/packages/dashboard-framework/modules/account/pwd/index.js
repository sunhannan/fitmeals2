Template.pwd.events({
	"click #update":function(){
		if(!$("#pwd").val() || ($("#pwd").val() != $("#repeat").val())){
			toastr.error("密码输入不一致，请确认。");
            return false;
        }

        Meteor.call("updateUserPwd", {pwd:$("#pwd").val()}, function(err, res) {
           toastr.success("密码已更新");
           $("#pwd").val("");
           $("#repeat").val("");
        })
	}
});