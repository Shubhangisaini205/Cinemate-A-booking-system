from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.UserRoutes import user_bp
from config.app_config import create_db_connection



app = Flask(__name__)

CORS(app, origins='*')

db = create_db_connection(app)

app.register_blueprint(user_bp, url_prefix="/users")

@app.route("/", methods=["GET"])
def Home():
    return jsonify(
        {
            "message": "Welcome to the Backend"
        }
    )


if __name__ == '__main__':
    app.run(debug=True,port=8080)
