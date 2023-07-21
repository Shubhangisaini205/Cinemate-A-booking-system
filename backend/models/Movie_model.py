from mongoengine import (
    Document,
    StringField,
    IntField,
    ReferenceField,
    ListField,
   
)

class Movies(Document):
    movie_name = StringField(required=True)
    language = ListField(required=True)
    movie_desc= StringField(required=True)
    image_url = StringField()
    shows = ListField(ReferenceField("Movie_Show"))
    length = IntField(required=True)
    