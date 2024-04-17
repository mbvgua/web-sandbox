from flask import Blueprint,render_template,redirect, url_for,request
from .forms import SignUpForm, LoginForm


auth = Blueprint('auth', __name__)


@auth.route('signup', methods=['GET', 'POST'])
def signup():
    # instantiate the form
    form = SignUpForm()

    return render_template('signup.html', form=form)


@auth.route('login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    return render_template('login.html',form=form)


@auth.route('logout', methods=['GET', 'POST'])
def logout():

    return redirect(url_for('auth.login'))
