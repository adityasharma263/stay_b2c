from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

# Initializes Flask
app = Flask(__name__,static_url_path='', static_folder='static/')

# initialize database
db = SQLAlchemy(app)


# cross origin
cors = CORS(app, resources={r"*": {"origins": "*"}})

# Intialize Marshmallow
ma = Marshmallow(app)

# Load config
app.config.from_pyfile('../config.cfg')
import b2c_app.view
