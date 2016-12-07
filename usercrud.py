import cherrypy
import os.path
from cherrypy import _cperror

from layout import layout
from user import user


class usercrud(object):
    user = user()
    
    @cherrypy.expose
    def index(self):
        return layout.getIndex()
        
    @cherrypy.expose
    def js(self):
        cherrypy.response.headers['Content-Type'] = "text/javascript"
        
        return layout.getJS()


usercrudconf = os.path.join(os.path.dirname(__file__), "usercrud.conf")

cherrypy.quickstart(usercrud(), config=usercrudconf)