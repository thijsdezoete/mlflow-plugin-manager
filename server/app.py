from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_migrate import Migrate
import logging
import os
from logging.handlers import RotatingFileHandler
from prometheus_flask_exporter import PrometheusMetrics
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length, Email
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

APPROVED_PLUGINS = {
    "plugin_A": ["1.0.0", "1.0.1"],
    "plugin_B": ["2.0.0"],
}

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from werkzeug.security import check_password_hash
from sqlalchemy import UniqueConstraint, func

app = Flask(__name__)

# Database configuration and initialization
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///plugins.db'  # Example using SQLite
db = SQLAlchemy(app)
migrate = Migrate(app, db)


# JWT Configuration
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'  # Change this to a secure random value
jwt = JWTManager(app)
metrics = PrometheusMetrics(app)

login = LoginManager(app)
login.login_view = 'login'

app.config['SECRET_KEY'] = 'your-secret-key-here'

# To track request latencies
# metrics.register_endpoint('/metrics2')

if not app.debug:
    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/plugin_manager.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)

    app.logger.setLevel(logging.INFO)
    app.logger.info('Plugin Manager startup')

# Database Models (Using SQLite for demonstration)
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Plugin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    version = db.Column(db.String(20), nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    UniqueConstraint('name', 'version', name='uix_name_version')


class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired()])
    submit = SubmitField('Register')

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if not app.debug:
        return "Registration is only allowed in debug mode.", 403

    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

@app.route('/', methods=['GET'])
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('index.html', title='Register', form=LoginForm())
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.username)
        return jsonify(access_token=access_token), 200
    return jsonify(message="Invalid credentials"), 401


@app.route('/stats', methods=['GET'])
def stats():
    total_plugins = Plugin.query.count()
    total_users = User.query.count()

    # Assuming you want to show the 5 most recently added plugins
    recent_plugins = Plugin.query.order_by(Plugin.timestamp.desc()).limit(5).all()
    recent_plugins_list = [{"name": plugin.name, "version": plugin.version} for plugin in recent_plugins]

    # For most popular plugins, you'd need to add some tracking mechanism.
    # For demonstration, I'm just returning the plugins with the most versions.
    most_popular_plugins = sorted(APPROVED_PLUGINS.items(), key=lambda x: len(x[1]), reverse=True)[:5]

    return jsonify({
        "total_plugins": total_plugins,
        "total_users": total_users,
        "recent_plugins": recent_plugins_list,
        "most_popular_plugins": most_popular_plugins
    })

@app.route('/whitelist/add', methods=['POST'])
@jwt_required()
def add_to_whitelist():
    data = request.get_json()
    new_plugin = Plugin(name=data['name'], version=data['version'])
    db.session.add(new_plugin)
    db.session.commit()
    return jsonify(message="Plugin added to whitelist"), 200


@app.route('/whitelist/remove', methods=['POST'])
@jwt_required()
def remove_from_whitelist():
    data = request.get_json()
    plugin = Plugin.query.filter_by(name=data['name'], version=data['version']).first()
    if plugin:
        db.session.delete(plugin)
        db.session.commit()
        return jsonify(message="Plugin removed from whitelist"), 200
    return jsonify(message="Plugin not found"), 404


@app.route('/whitelist', methods=['GET'])
def list_whitelisted():
    plugins = Plugin.query.all()
    return jsonify([{"name": plugin.name, "version": plugin.version} for plugin in plugins])


@app.route('/is-approved', methods=['GET'])
def is_approved():
    plugin_name = request.args.get('name')
    version = request.args.get('version')

    approved_versions = APPROVED_PLUGINS.get(plugin_name)
    if not approved_versions:
        return jsonify({"approved": False})

    if version:
        return jsonify({"approved": version in approved_versions})
    return jsonify({"approved": True})

@app.route('/browse-plugins', methods=['GET'])
def browse_plugins():
    stmt = db.session.query(
        Plugin.name,
        func.max(func.cast(func.substr(Plugin.version, 1, func.instr(Plugin.version, ".") - 1), db.Integer)).label('max_major'),
        func.max(func.cast(func.substr(Plugin.version, func.instr(Plugin.version, ".") + 1, func.instr(func.substr(Plugin.version, func.instr(Plugin.version, ".") + 1), ".") - 1), db.Integer)).label('max_minor'),
        func.max(func.cast(func.substr(Plugin.version, func.instr(Plugin.version, ".") + func.instr(func.substr(Plugin.version, func.instr(Plugin.version, ".") + 1), ".") + 2), db.Integer)).label('max_patch')
    ).group_by(Plugin.name).subquery()

    plugins = db.session.query(
        stmt.c.name,
        (func.cast(stmt.c.max_major, db.String) + '.' + func.cast(stmt.c.max_minor, db.String) + '.' + func.cast(stmt.c.max_patch, db.String)).label('latest_version')
    ).all()

    # Convert the result into the desired format
    result = [{"name": p.name, "version": p.latest_version} for p in plugins]

    return jsonify(result)

if __name__=="__main__":
    # app.run(debug=True, ssl_context='adhoc', host="0.0.0.0", port=5001)
    app.run(debug=True, host="0.0.0.0", port=5001)


