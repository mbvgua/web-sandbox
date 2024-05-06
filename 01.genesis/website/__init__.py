from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView


db = SQLAlchemy()
db_name = 'db.sqlite3'
admin = Admin(name='Genesis Admin', template_mode='bootstrap4')

def create_app():
    """ function for basic configration of entire web application """

    app = Flask(__name__)
    app.config['SECRET_KEY'] = '@TheNorthRemebers'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_name}'
    # admin panel themes = ['cerulean', 'cosmo', 'cyborg', 'flatly', 'darkly']
    app.config['FLASK_ADMIN_SWATCH'] = 'cosmo'
    db.init_app(app)
    admin.init_app(app)

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

    # build the admin panel
    class UserModelView(ModelView):
        can_delete = True # disable model deletion
        can_create = True
        column_display_pk = True
        column_exclude_list = ('password')
        column_searchable_list = ('name', 'email')
        # column_filters = 'email'
        column_descriptions = dict(
            email='The users registered and validated email address',
            profile_pic='The users avatar',
            date_joined='Date when user first created an account'
        )
    class NoteModelView(ModelView):
        can_edit = False #disable model editing
        can_delete = False # disable model deletion
        column_list = (Note.id, Note.title,Note.content,Note.date_written)
        # column_sortable_list = ('date_written')
        column_descriptions = dict(
            date_written='When the note was last written/updated',
        )

    admin.add_view(UserModelView(User, db.session))
    admin.add_view(NoteModelView(Note, db.session))

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
