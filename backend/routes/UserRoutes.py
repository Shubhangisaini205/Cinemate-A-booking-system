from flask import Blueprint, request, jsonify
from models.User_Model import users
import bcrypt
import jwt
import datetime


user_bp = Blueprint("users", __name__)

# get all user
@user_bp.route("/", methods=["GET"])
def get_all_users():
    try:
        all_users = users.objects().to_json()
        print("Database connected", all_users)
        return all_users
    except Exception as e:
        print("Database not connected ",e)
        return "Error: Database connection failed"
    


# Get single user
@user_bp.route("/<ObjectId:_id>", methods=["GET"])
def get_Single_users(_id):
    try:
        user = users.objects.with_id(_id).to_json()
        return user
    except Exception as e:
        return "Error: Database connection failed"



# Create a new user
@user_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    

    # Check if any fields are missing
    print(data)
    if username == "" or email=="" or password=="":
        return jsonify({"message": "Fill all the details"}), 400
    
    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    # Create a new User instance with the hashed password
    new_user = users(
        username = username,
        email=email,
        password=hashed_password,
        role = "regular",
        payment = 0
    )

    new_user.save()

    return jsonify({"message": "User registered successfully!"}), 201
   
    




# User login
@user_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Retrieve the user document from the database based on the email
    user_data = users.objects(email = email).first()
    print(user_data)
    if user_data is None:
        return jsonify({"message": "Invalid email"}), 400

    # Retrieve the hashed password from the user document
    hashed_password = user_data["password"].encode("utf-8")
    
    # Verify the password using bcrypt
    if bcrypt.checkpw(password.encode("utf-8"), hashed_password):

        # Convert ObjectId to string for JSON serialization
        user_id_str = str(user_data["id"])

        # Create a JWT token for authentication
        payload = {
            "user_id": user_id_str,
            # Token expiration time (e.g., 1 day)
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }
        # Replace this with a strong secret key for production use
        secret_key = "your_secret_key"
        token = jwt.encode(payload, secret_key, algorithm="HS256")
        responseObj={
            "username": user_data["username"],
            "userId":user_id_str,
            "role":user_data["role"]
        }
        return jsonify({"message": "Login successful", "token": token,"user":responseObj }), 200

    else:
        return jsonify({"message": "Incorrect password"}), 400



# update plan subscription of user
@user_bp.route("/update/<ObjectId:_id>", methods=["PATCH"])
def update_Single_users(_id):
    data = request.get_json()
    payment = data.get("payment")
    try:
        user = users.objects.with_id(_id)
        if user is not None:
            user.payment = payment

            if int(payment) == 1000:
                user.role = "VIP"
            elif int(payment) == 500:
                user.role = "premium"
            else:
                user.role = "regular"
            
            user.save()
            
            updated_user_data = {
                "payment": user.payment,
                "role": user.role
            }
            
            return jsonify({
                "message": "User payment and role updated successfully",
                "payment": updated_user_data["payment"],
                "role": updated_user_data["role"]
            })
        
    except Exception as e:
        return "Error: Database connection failed"












