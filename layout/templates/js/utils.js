Utils = {};
Utils.updateTips = function(t){
	$(".validateTips").text(t).addClass("ui-state-error");
};

Utils.checkLength = function(o, n, min, max){
	if(o.val().length > max || o.val().length < min){
		o.addClass("ui-state-error");
		Utils.updateTips("Length of " + n + " must be between " +
			min + " and " + max + ".");
		return false;
	}else{
		return true;
	}
};

Utils.checkRegexp = function(o, regexp, n) {
	if (!(regexp.test(o.val()))){
		o.addClass("ui-state-error");
		Utils.updateTips(n);
		return false;
	}else{
		return true;
	}
};