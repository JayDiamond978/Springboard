from flask import Flask

greet = Flask(__name__)

@greet.route("/welcome")
def welcome():
    return "welcome"

@greet.route("/welcome/home")
def welcome_home():
    return "welcome home"

@greet.route("/welcome/back")
def welcome_back():
    return "welcome back"
