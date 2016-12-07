class user(object):
    def __init__(self, rawUser):
        self.id = rawUser[0]
        self.firstName = rawUser[1]
        self.lastName = rawUser[2]
        self.email = rawUser[3]
        
    def tojson(self):
        return dict(id = self.id, firstName = self.firstName, lastName = self.lastName, email = self.email)