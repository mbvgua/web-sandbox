from flask import Blueprint,render_template,redirect, url_for,request,flash
from flask_login import login_user,logout_user,login_required,current_user
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
            message = 'Oops! Looks like the account already exists. Try logging in instead?'
            flash(message, category='warning')
        else:
            try:
                new_user = User(name=name, email=email,
                    password=generate_password_hash(password))
                db.session.add(new_user)
                db.session.commit()
                message = 'Congratulations! You have succesfully created an account.'
                flash(message, category='success')

                login_user(new_user, remember=remember_me)
                return redirect(url_for('views.index'))
            except Exception as e:
                print (e)
                message = 'Oops! Looks like an error occurred while registering your account.Try again?'
                flash(message, category='danger')

    return render_template('signup.html', form=form, user=current_user)


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
                message = 'Congratulations! You have been logged in successfully.'
                flash(message, category='success')
                login_user(user, remember=remember_me)
                return redirect(url_for('views.index'))
            else:
                message = 'Oops! Looks like an error occurred while logging you in. Try again?'
                flash(message, category="warning")
        else:
            message = 'Oops! Looks like you do not have an account... try creating one instead?'
            flash(message, category='warning')

    return render_template('login.html',form=form, user=current_user)


@auth.route('logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    message = 'Oops! You have been logged out.Try loggin back in again?'
    flash(message, category='danger')

    return redirect(url_for('auth.login'))
