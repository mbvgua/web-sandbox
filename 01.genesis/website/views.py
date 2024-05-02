from flask import Blueprint, render_template,send_from_directory
from flask_login import login_required,current_user


views = Blueprint('views', __name__)


@views.route('avatar/<path:filename>')
def display_profile(filename):
    """
    funtion allows for viewing profile pictures stored in avatar directory
    Choosen by user when signing up
    """
    profile_pic = send_from_directory('../avatar/',filename)
    return profile_pic


@views.route('/', methods=['GET','POST'])
@login_required
def index():

    return render_template('index.html',user=current_user)
