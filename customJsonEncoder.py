import json


class customJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if getattr(obj, "tojson", False):
            return obj.tojson()
        return json.JSONEncoder.default(self, obj)
