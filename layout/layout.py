import cherrypy

from jinja2 import Environment, FileSystemLoader


env = None


def getenv():
    global env
    
    if env is None:
        env = Environment(loader = FileSystemLoader("./layout/templates"))
        
    return env

def getIndex():
    tmpl = getenv().get_template("pages/index.html")
    return tmpl.render()

def getJS():
    tmpl = getenv().get_template("js/all.js")
    return tmpl.render()