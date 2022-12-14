import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'do-not-try-to-guess'
    MONGO_URI = "mongodb://localhost:27017/easyanno"
    
    LOGIN_DISABLED = False