from flask import Blueprint, render_template,send_from_directory,request,flash,redirect,url_for
from flask_login import login_required,current_user
from .forms import NoteForm,UpdateForm
from .models import Note
from . import db


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
    form = NoteForm()
    notes = Note.query.order_by(Note.date_written).all()
    if request.method =='POST' and form.validate():
        title = form.title.data
        content = form.content.data

        try:
            new_note = Note(title=title,content=content)
            db.session.add(new_note)
            db.session.commit()

            message = 'Your note has been added succesfully!'
            flash(message, category='success')
            return redirect(url_for('views.index'))
        except Exception as e:
            print(e)
            message = 'Oh no! Your note has not been added. Try again?'
            flash(message, category='danger')

    return render_template('index.html',form=form,user=current_user,notes=notes)

@views.route('/update/<int:id>',methods=['GET','POST'])
def update(id):
    note = Note.query.filter_by(id=id).first()
    form = UpdateForm()

    # using the wtforms keyword placeholder and value
    #set the already existing value to be displayed on the form
    form.new_title.render_kw = {'placeholder': note.title}
    form.new_content.render_kw = {'value': note.content}

    if request.method == 'POST' and form.validate():
        new_title = form.new_title.data
        new_content = form.new_content.data

        try:
            Note.query.filter_by(id=id).update(dict(title=new_title,
                                                    content=new_content))
            db.session.commit()
            message = 'Your note has been succesfully updated!'
            flash(message,category='success')
            return redirect(url_for('views.index'))
        except Exception as e:
            print(e)
            message = 'An error occurred while updating your note.Try again?'
            flash(message, category='danger')

    return render_template('update.html',user=current_user,note=note,form=form)

@views.route('/delete/<int:id>',methods=['GET','POST'])
def delete(id):
    note_to_delete = Note.query.filter_by(id=id).first()

    try:
        db.session.delete(note_to_delete)
        db.session.commit()
        message = 'Your note has been successfully deleted!'
        flash(message, category='success')
        return redirect(url_for('views.index'))
    except Exception as e:
        print(e)
        message = 'An error occured while deleting your note.Try again?'
        flash(message, category='danger')

    return redirect(url_for('views.index'))
