from flask import Flask, Blueprint


def create_app():
    """ function for basic configration of entire web application """

    app = Flask(__name__)
    app.config['SECRET_KEY'] = '@TheNorthRemebers'

    # import all various blueprints
    from .views import views
    from .auth import auth

    # register all blueprints
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    return app
