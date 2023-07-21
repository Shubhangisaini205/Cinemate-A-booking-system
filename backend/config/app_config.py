# import os
# from dotenv import load_dotenv
# load_dotenv()  # Load the environment variables from the .env file
# from pymongo import MongoClient

# def get_mongo_client():
#     mongo_uri = os.getenv("MONGO_URI")
#     client = MongoClient(mongo_uri)
#     return client

# def get_users_collection():
#     client = get_mongo_client()
#     db = client["Cinemate"]
#     users_collection = db["users"]
#     return users_collection

from flask_pymongo import PyMongo
from mongoengine import connect
from dotenv import load_dotenv
import os

def create_db_connection(app):
    load_dotenv()
    database_url = os.getenv('MONGO_URI')

    # Set the MONGO_URI configuration
    app.config["MONGO_URI"] = database_url

    # Initialize Flask-PyMongo
    mongo = PyMongo(app)
    db = mongo.db

    try:
        # Attempt to connect to the database
        connection = connect("all_data", host=database_url)
        print("Connected to the database", connection)
        return db
    except Exception as e:
        print("Error connecting to the database:", e)
        return None


