import os
from dotenv import load_dotenv
load_dotenv()  # Load the environment variables from the .env file
from pymongo import MongoClient

def get_mongo_client():
    mongo_uri = os.getenv("MONGO_URI")
    client = MongoClient(mongo_uri)
    return client

def get_users_collection():
    client = get_mongo_client()
    db = client["Cinemate"]
    users_collection = db["users"]
    return users_collection
