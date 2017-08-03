
Template.regist.events({
	"click #account-regist":function(){
		var user = {email:$("#email").val(),password:$("#password").val()};
		if(!user.email){
			$("#email").addClass("account-input-error");
			toastr.error("请输入邮箱地址");
			return false;
		}
		if(!user.password){
			$("#password").addClass("account-input-error");
			toastr.error("请输入密码");
			return false;
		}
		if(user.password != $("#repeat").val()){
			$("#repeat").addClass("account-input-error");
			toastr.error("密码输入不一致");
			return false;
		}

		if(!isEmail($("#email").val())){
			$("#email").addClass("account-input-error");
			toastr.error("邮箱格式错误");
			return false;
		}

		$(".account-input input").removeClass("account-input-error");

		Meteor.call("registUser",user,function(err,ress){
			if(err){
				toastr.error(err.reason,"登录信息错误");
				$("#email").addClass("account-input-error");
				return false;
			}
			xwu.account.regist(user);
		})
	}
});