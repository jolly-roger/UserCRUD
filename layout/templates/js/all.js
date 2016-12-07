{% include "js/user.js" %}
{% include "js/utils.js" %}
{% include "js/dialogs.js" %}

function addUserHtml(user){
    var userHtml = "<tr>" +
		"<td>" +
			user.firstName +
		"</td><td>" +
			user.lastName +
		"</td><td>" +
			user.email +
		"</td><td>" +
			"<div style=\"width: 200px;\">" +
				"<div>" +
					"<button id=\"delete_user_" + user.id + "\">Delete</button>" +
				"</div>" +
				"<div>" +
					"<button id=\"update_user_" + user.id + "\">Update</button>" +
				"</div>" +
			"</div>" +
		"</td></tr>";
    
    $("#users tbody").append(userHtml);
    $("#update_user_" + user.id).button().click(function(){
		var self = this;
		
		Dialogs.initUpdateUserDialog(user, function(user){
			var row = $(self).parent().parent().parent().parent();
			
			row.children().eq(0).html(user.firstName);
			row.children().eq(1).html(user.lastName);
			row.children().eq(2).html(user.email);
		});
	});
	$("#delete_user_" + user.id).button().click(function(){
		var self = this;
		
		user.delete(function(){
			$(self).parent().parent().parent().parent().remove();
		});
	});
};

$(function(){
	User.list(function(data){
		users = $.parseJSON(data);
		
		for(var i = 0; i < users.length; i ++){
			var user = new User();
			user.id = users[i].id;
			user.firstName = users[i].firstName;
			user.lastName = users[i].lastName;
			user.email = users[i].email;
			
			addUserHtml(user);
		}
	});
	
	$("#add-user").button().click(function() {
		Dialogs.initAddUserDialog(function(user){
			addUserHtml(user);
		});
	});
});