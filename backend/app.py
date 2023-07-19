from flask import Flask,request,jsonify
from flask_cors import CORS
from routes.UserRoutes import users_bp
import os
PORT = os.getenv("PORT")
app = Flask(__name__)
CORS(app, origins='*')

app.register_blueprint(users_bp, url_prefix="/users")

@app.route("/",methods=["GET"])
def Home():
    return jsonify(
        {
            "message": "Welcome to the Backend"
        }
    )


if __name__ == '__main__':
    app.run(debug=True,port=PORT)