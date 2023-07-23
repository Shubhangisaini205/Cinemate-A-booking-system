



from mongoengine import (
    Document,
    StringField,
    IntField,
    BooleanField,
    ReferenceField,
    ListField,
   
)

class users(Document):
    username = StringField(required=True)
    email = StringField(required=True)
    password = StringField(required=True)
    payment = IntField()
    role = StringField(required=True)
    booked_Movie_show = ListField(ReferenceField("Movie_Show"))
    booked_Event_show = ListField(ReferenceField("Event_Show"))

    
