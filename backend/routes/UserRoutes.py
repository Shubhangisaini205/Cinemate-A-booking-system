from flask import Blueprint, request, jsonify
# from pymongo import MongoClient
from models.User_Model import User
import bcrypt
import jwt
import datetime
from config.app_config import get_users_collection


users_collection = get_users_collection()
users_bp = Blueprint("users", __name__)

# Create a new user
@users_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    role = "regular"
    payment = 0

    # Check if any fields are missing

    if username == "" or email=="" or password=="":
        return jsonify({"message": "Fill all the details"}), 400
    
    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    # Create a new User instance with the hashed password
    new_user = User(username, email, hashed_password, role, payment)
    # Insert the new user into the database
    result = users_collection.insert_one(new_user.__dict__)

    if result.inserted_id:
        return jsonify({"message": "User registered successfully!"}), 201
    else:
        return jsonify({"message": "Failed to register user."}), 500
    




# User login
@users_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Retrieve the user document from the database based on the email
    user_data = users_collection.find_one({"email": email})

    if user_data is None:
        return jsonify({"message": "Invalid email or password"}), 401

    # Retrieve the hashed password from the user document
    hashed_password = user_data["password"].encode("utf-8")

    # Verify the password using bcrypt
    if bcrypt.checkpw(password.encode("utf-8"), hashed_password):

        # Create a JWT token for authentication
        payload = {
            "user_id": str(user_data["_id"]),
            # Token expiration time (e.g., 1 day)
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }
        # Replace this with a strong secret key for production use
        secret_key = "your_secret_key"
        token = jwt.encode(payload, secret_key, algorithm="HS256")

        return jsonify({"message": "Login successful", "token": token, "username": user_data["username"]}), 200

    else:
        return jsonify({"message": "Invalid email or password"}), 401



@users_bp.route('/update', methods=["PATCH"])
def user_update():
    data = request.get_json()
    email = data.get("email")
    payment = data.get("payment")

    if payment is None:
        return jsonify({"message": "Payment value is missing"}), 400

    # Retrieve the user document from the database based on the email
    user_data = users_collection.find_one({"email": email})

    if user_data is None:
        return jsonify({"message": "User not found"}), 404

    # Calculate the user's role based on the payment value
    role = "regular"
    if payment == 1000:
        role = "VIP"
    elif payment == 500:
        role = "premium"

    # Update the user's payment and role in a single update operation
    users_collection.update_one(
        {"email": email},
        {"$set": {"payment": payment, "role": role}}
    )

    # Retrieve the updated user data
    updated_user_data = users_collection.find_one({"email": email})

    return jsonify({"message": "User payment and role updated successfully",
                    "payment": updated_user_data["payment"],
                    "role": updated_user_data["role"]}), 200



