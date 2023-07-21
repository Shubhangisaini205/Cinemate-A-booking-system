from mongoengine import (
    Document,
    StringField,
    IntField,
    ReferenceField,
    ListField,
   
)

class Theator(Document):
    name = StringField(required=True)
    location=StringField(required=True)
    start_time = ListField(required=True)
    total_seats = IntField(required=True)
    booked_seats = IntField()
    price = IntField(required=True)



    # // still in thinking process
    