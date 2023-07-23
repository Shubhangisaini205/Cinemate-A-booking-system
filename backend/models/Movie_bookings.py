from mongoengine import (
    Document,
    StringField,
    IntField,
    ReferenceField,
    ListField,
    EmbeddedDocumentField,
    EmbeddedDocument
   
)

class MovieBooking(Document):
    show = ReferenceField("Movie_Show", required=True)
    user_id = ReferenceField("users",required=True)
    booked_seats = IntField(required=True)
    total_price = IntField(required=True)