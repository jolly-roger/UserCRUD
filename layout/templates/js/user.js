User = function(){
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    
    this.add = function(callback){
        if(this.id == null){
            var self = this;
            
            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/user",
                data: {firstName: self.firstName, lastName: self.lastName, email: self.email}
            }).done(function(id){
                this.id = id;
                
                callback && callback(self);
            });
        }
    };
    
    this.update = function(callback){
        if(this.id != null){
            var self = this;
            
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/user",
                data: {id: self.id, firstName: self.firstName, lastName: self.lastName, email: self.email}
            }).done(function(id){
                callback && callback(self);
            });
        }
    };
    
    this.delete = function(callback){
        if(this.id != null){
            var self = this;

            $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/user?id=" + self.id,
            }).done(function(data){
                callback && callback(self);
            });
        }
    };
};

User.list = function(callback){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/user"
    }).done(function(data){
          callback && callback(data);
    });
};