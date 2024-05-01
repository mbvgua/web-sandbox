from flask import Blueprint,render_template,redirect, url_for,request,flash
from flask_login import login_user
from .forms import SignUpForm, LoginForm
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from . import db


auth = Blueprint('auth', __name__)


@auth.route('signup', methods=['GET', 'POST'])
def signup():
    # instantiate the form
    form = SignUpForm()

    if request.method == 'POST' and form.validate():
        email = form.email.data
        name = form.username.data
        password = form.password.data
        confirm_password = form.confirm_password.data
        remember_me = True if form.remember_me.data == True else False

        # check to see if the user already exists in the database
        user = User.query.filter_by(email=email).first()

        if user:
            message = 'no! account already exists'
            flash(message)
        else:
            try:
                new_user = User(name=name, email=email,
                    password=generate_password_hash(password))
                db.session.add(new_user)
                db.session.commit()
                flash('congrats youve created an acc')
                return redirect(url_for('views.index'))
            except Exception as e:
                print (e)
                message = 'an error occurred while loggin you in. try again?'
                flash(message)

    return render_template('signup.html', form=form)


@auth.route('login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if request.method == 'POST' and form.validate():
        email = form.email.data
        password = form.password.data
        remember_me = True if form.remember_me.data == True else False

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                print('being logged in')
                flash('youve been logged in')
                return redirect(url_for('views.index'))
            else:
                message = 'an error occurred while loggin you in. try again?'
                flash(message)
        else:
            message = 'Oops. You do not have an account'
            flash(message)

    return render_template('login.html',form=form)


@auth.route('logout', methods=['GET', 'POST'])
def logout():

    return redirect(url_for('auth.login'))
