Template.regionSelect.events({
    "focus ._region-select-input": function() {
        $("._region-select-cover").fadeIn(300).find("._region-select").slideDown(300);
        $("._region-select-input").blur();
        Meteor.call("regionByParent", "root", function(err, res) {

            Session.set("region_select", res);
            Session.set("region_select_level", 0);
            $("._region-1").html("").attr("data-for", "");
            $("._region-2").html("").attr("data-for", "");
            $("._region-0").html("").attr("data-for", "");

        })

    },
    "click ._region_close": function() {
        $("._region-select").slideUp(300, function() {
            $("._region-select-cover").fadeOut(300)
        });
    },
    "click ._region_select_item": function(event) {

        var target = $(event.currentTarget);

        $("._region-" + target.attr("data-level")).html(this.name).attr("data-for", this._id);

        if (Session.get("region_select_level") < 2) {

            Meteor.call("regionByParent", this._id, function(err, res) {

                Session.set("region_select", res);

                Session.set("region_select_level", Session.get("region_select_level") + 1);

            })
        } else {
            $("._region-select-input").val($("._region-0").html() + " " + $("._region-1").html() + " " + $("._region-2").html() );
             $("._region-select-input-id").val($("._region-0").attr("data-for") + "," + $("._region-1").attr("data-for") + "," + $("._region-2").attr("data-for"));
            $("._region-select").slideUp(300, function() {
                $("._region-select-cover").fadeOut(300)
            });
        }
    },
    "click ._region-all": function(event) {

        var target = $(event.currentTarget);

        $("._region-0").html("").attr("data-for", "");
        $("._region-1").html("").attr("data-for", "");
        $("._region-2").html("").attr("data-for", "");

        Meteor.call("regionByParent", "root", function(err, res) {
            Session.set("region_select", res);
            Session.set("region_select_level", 0);

        })
    },
    "click ._region-0": function(event) {

        var target = $(event.currentTarget);

        $("._region-1").html("").attr("data-for", "");
        $("._region-2").html("").attr("data-for", "");

        Meteor.call("regionByParent", target.attr("data-for"), function(err, res) {
            Session.set("region_select", res);
            Session.set("region_select_level", 1);

        })
    },
    "click ._region-1": function(event) {

        var target = $(event.currentTarget);

        $("._region-2").html("").attr("data-for", "");

        Meteor.call("regionByParent", target.attr("data-for"), function(err, res) {
            Session.set("region_select", res);
            Session.set("region_select_level", 2);

        })
    }
});
Template.regionSelect.helpers({
    regions: function() {
        return Session.get("region_select");
    },
    level: function() {
        return Session.get("region_select_level");
    },
    noCover: function() {
        if ($("._region-select-cover")[0]) {
            return false;
        } else {
            return true;
        }
    },
});
Template.regionSelect.onRendered(function(){
	if(this.data.value){
		var that = this;
		Meteor.call("regionByIds",this.data.value,function(err,res){
			that.$("._region-select-input").val(res);
			
		})
		this.$("._region-select-input-id").val(this.data.value.join(","));
	}
});
