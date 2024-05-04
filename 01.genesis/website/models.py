from . import db
from flask_login import UserMixin
from datetime import datetime

class User(db.Model,UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    profile_pic = db.Column(db.String(1000), nullable=True)
    date_joined = db.Column(db.DateTime(), default=datetime.utcnow)

    # set up foreign key to notes table
    # note = db.relationship('Note', backref='user')
    note = db.relationship('Note')

class Note(db.Model):
    __tablename__ = 'notes'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text(100))
    content = db.Column(db.Text(10000))
    date_written = db.Column(db.DateTime(), default=datetime.utcnow)

    # user = db.relationship('User', backref='note')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
