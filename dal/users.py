from dal import base
from dal.entities import user as dalUser

class users(base.base):
    def __init__(self):
        base.base.__init__(self)
    
    def list(self):
        self.cur.execute("select * from user")
        rawUsers = self.cur.fetchall()
        users = []
        
        for rawUser in rawUsers:
            u = dalUser.user(rawUser)
            users[len(users):] = [u]
            
        return users
    
    def get(self, userID):
        self.cur.execute("select * from user where id = ?", (userID, ))
        rawUser = self.cur.fetchone()
        
        user = dalUser.user(rawUser)
        
        return user
    
    def add(self, user):
        self.cur.execute("insert into user (first_name, last_name, email) values (?, ?, ?)",
            (user.firstName, user.lastName, user.email))
        self.conn.commit()
        
        self.cur.execute("select last_insert_rowid()")
        
        return self.cur.fetchone()
        
    def update(self, user):
        self.cur.execute("update user set first_name = ?, last_name = ?, email = ? where id = ?",
            (user.firstName, user.lastName, user.email, user.id))
        self.conn.commit()
        
    def delete(self, userID):
        self.cur.execute("delete from user where id = ?",
            (userID, ))
        self.conn.commit()