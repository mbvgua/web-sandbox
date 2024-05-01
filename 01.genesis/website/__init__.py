from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager


db = SQLAlchemy()
db_name = 'db.sqlite3'

def create_app():
    """ function for basic configration of entire web application """

    app = Flask(__name__)
    app.config['SECRET_KEY'] = '@TheNorthRemebers'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_name}'
    db.init_app(app)

    # handle logging sessions
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login' #redirect here.if user isnt logged in
    login_manager.login_message = 'Oh no! You have to be logged in to acces this page' #message to flash
    login_manager.login_message_category = 'danger'
    @login_manager.user_loader
    def load_user(id):
        """
        callback function querys the database in search of the current users
        primary key id.
        """
        return User.query.get(int(id))

    # import all various blueprints
    from .views import views
    from .auth import auth
    from .models import User,Note

    # register all blueprints
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    # create the db
    with app.app_context():
        create_database(app)

    return app


def create_database(app):
    """ function to create the application database"""

    try:
        db.create_all()
        print('Database created successfully!')
    except Exception as e:
        print('An error occurred while creating the database')
