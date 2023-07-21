from mongoengine import (
    Document,
    StringField,
    IntField,
    ReferenceField,
    ListField,
   
)

class Movie_Show(Document):
    date = StringField(required=True)
    start_time = ListField(required=True)
    end_time = ListField(required=True)
    movie_id= ReferenceField("Movie",required=True)
    total_seats = IntField(required=True)
    booked_seats = IntField()
    price = IntField(required=True)