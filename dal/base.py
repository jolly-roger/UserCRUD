import sqlite3


class base(object):
    def __init__(self):
        self.conn = sqlite3.connect("./db/user.db")
        self.cur = self.conn.cursor()
    
    def close(self):
        self.cur.close()
        self.conn.close()