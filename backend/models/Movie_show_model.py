from mongoengine import (
    Document,
    StringField,
    IntField,
    ReferenceField,
    ListField,
   
)

from .Movie_model  import Movies

class Movie_Show(Document):
    show_name = StringField(required=True)
    date = StringField(required=True)
    start_time = ListField(required=True)
    end_time = ListField(required=True)
    movie_id = ReferenceField(Movies, required=True)  # Use the registered Movies model
    total_seats = IntField(required=True)
    booked_seats = IntField()
    price = IntField(required=True)