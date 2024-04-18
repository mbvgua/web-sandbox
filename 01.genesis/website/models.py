from . import db
from flask_login import UserMixin
from datetime import datetime

class User(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    profile_pic = db.Column(db.String(1000))
    date_joined = db.Column(db.DateTime(), default=datetime.utcnow)

    # set up foreign key to notes table
    notes = db.Relationship('Note', backref='users')

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    message = db.Column(db.Text(10000), nullable=False)
    date_written = db.Column(db.DateTime(), default=datetime.utcnow)

    user_link = db.Column(db.Integer, db.ForeignKey('users'))
