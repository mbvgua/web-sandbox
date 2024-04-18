from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
db_name = 'db.sqlite3'

def create_app():
    """ function for basic configration of entire web application """

    app = Flask(__name__)
    app.config['SECRET_KEY'] = '@TheNorthRemebers'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_name}'
    db.init_app(app)

    # import all various blueprints
    from .views import views
    from .auth import auth

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
