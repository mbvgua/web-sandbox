from wtforms import Form,StringField,EmailField,PasswordField,BooleanField,SubmitField,TextAreaField
from wtforms.validators import  InputRequired,Length,EqualTo,DataRequired
from flask_wtf.file import FileField,FileRequired



class MyForm(Form):
...     username = StringField('Username', validators=[Length(min=5,message=('not a valida name'))], default='test')

class SignUpForm(Form):
    email = EmailField('Enter Email Address', validators=[DataRequired(),Length(10,40)])
    username = StringField('Enter Username', validators=[DataRequired(),Length(3,15)])
    password = PasswordField('Enter Password', validators=[DataRequired(),Length(7,20)])
    confirm_password = PasswordField('Confirm Password',validators=[DataRequired(),EqualTo('password', message=('Oops! It looks like your passwords do not match. Try again?'))])
    remember_me = BooleanField('Remember Me?')
    signup = SubmitField('Submit')


class LoginForm(Form):
    email = EmailField('Enter Email Address', validators=[InputRequired(),Length(10,40)])
    password = PasswordField('Enter Password', validators=[InputRequired(),Length(7,20)])
    remember_me = BooleanField('Remember Me?')
    login =  SubmitField('Login')


# class SignUpForm(Form):
#     email = EmailField('Enter Email Address', validators=[
#         DataRequired(),Length(10,40)])
#     username = StringField('Enter Username', validators=[
#         DataRequired(message=('Oops! It looks like you did not enter a username. Try again?')),
#         Length(3,15,message=('Oops! It looks length of your username is incorrect. Try again?'))])
#     password = PasswordField('Enter Password', validators=[
#         DataRequired(message=('Oops! It looks like you did not enter a passoword. Try again?')),
#         Length(7,20)])
#     confirm_password = PasswordField('Confirm Password',validators=[
#         DataRequired(),
#         EqualTo('password', message=('Oops! It looks like your passwords do not match. Try again?'))])
#     remember_me = BooleanField('Remember Me?')
#     signup = SubmitField('Submit')
#
#
# class LoginForm(Form):
#     username = StringField('Enter Username', validators=[
#         DataRequired(message=('Oops! It looks like you did not enter a username. Try again?')),
#         Length(3,15,message=('Oops! It looks length of your username is incorrect. Try again?'))])
#     password = PasswordField('Enter Password', validators=[
#         DataRequired(message=('Oops! It looks like you did not enter a passoword. Try again?')),
#         Length(7,20)])
#     remember_me = BooleanField('Remember Me?')
#     login =  SubmitField('Login')
