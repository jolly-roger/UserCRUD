Dialogs = {};
Dialogs.validateFields = function(){
    var allFields = $([]).add($("#first-name")).add($("#last-name")).add($("#email"));
    var bValid = true;
    
    allFields.removeClass( "ui-state-error" );
    
    bValid = bValid && Utils.checkLength($("#first-name"), "first name", 1, 50);
    bValid = bValid && Utils.checkLength($("#last-name"), "last name", 1, 50);
    bValid = bValid && Utils.checkRegexp($("#email"), /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Incorrect email");
    
    return bValid;
};

Dialogs.initAddUserDialog = function(addUserCallBack){
    $('{% include "dialogs/adduser.html"%}').dialog({
        autoOpen: false,
        height: 400,
        width: 450,
        modal: true,
        buttons: {
            "Add": function() {
                var u = new User();
                u.firstName = $("#first-name").val();
                u.lastName = $("#last-name").val();
                u.email = $("#email").val();
                
                if (Dialogs.validateFields()) {
                    u.add(addUserCallBack);
                    
                    $( this ).dialog( "close" );
                }
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    }).dialog("open");
};

Dialogs.initUpdateUserDialog = function(user, updateUserCallBack){
    $('{% include "dialogs/updateuser.html" %}').dialog({
        autoOpen: false,
        height: 400,
        width: 450,
        modal: true,
        open: function(event, ui){
            $(this).children().children().children("#first-name").val(user.firstName);
            $(this).children().children().children("#last-name").val(user.lastName);
            $(this).children().children().children("#email").val(user.email);
        },
        buttons: {
            "Update": function() {
                var u = new User();
                u.id = user.id;
                u.firstName = $(this).children().children().children("#first-name").val();
                u.lastName = $(this).children().children().children("#last-name").val();
                u.email = $(this).children().children().children("#email").val();
                
                if (Dialogs.validateFields()) {
                    u.update(updateUserCallBack);
                    
                    $( this ).dialog( "close" );
                }
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    }).dialog( "open" );
};