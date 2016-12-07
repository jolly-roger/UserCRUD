import cherrypy
import json

from dal import users as dalUsers
from dal.entities import user as dalUser

import customJsonEncoder

class user(object):
    exposed= True

    
    def GET(self, userID = None):
        u = None

        users = dalUsers.users()

        if userID is not None:
            u = users.get(userID)
        else:
            u = users.list()
        
        users.close()
        
        return json.dumps(u, cls=customJsonEncoder.customJsonEncoder)
    
    def PUT(self, firstName = None, lastName = None, email = None):
        if firstName is not None and lastName is not None and email is not None:
            users = dalUsers.users()
            id = users.add(dalUser.user([None, firstName, lastName, email]))
            users.close()
            
            return str(id)
        
        return str(0)
    
    def POST(self, id = None, firstName = None, lastName = None, email = None):
        if id is not None:
            users = dalUsers.users()
            users.update(dalUser.user([id, firstName, lastName, email]))
            users.close()
        
            return str(1)
        
        return str(0)
    
    def DELETE(self, id = None):
        if id is not None:
            users = dalUsers.users()
            users.delete(id)
            users.close()
        
            return str(1)
        
        return str(0)