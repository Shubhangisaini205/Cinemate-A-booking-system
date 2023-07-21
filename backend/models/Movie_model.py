from mongoengine import (
    Document,
    StringField,
    IntField,
    ReferenceField,
    ListField,
    EmbeddedDocumentField,
    EmbeddedDocument
   
)

class MovieReview(EmbeddedDocument):
    rating = IntField(required=True)
    comment = StringField(required=True)

class Movies(Document):
    movie_name = StringField(required=True)
    language = ListField(required=True)
    movie_desc= StringField(required=True)
    image_url = StringField()
    shows = ListField(ReferenceField("Movie_Show"))
    length = IntField(required=True)
    reviews = ListField(EmbeddedDocumentField("MovieReview"))
    

# {
#   "movie_name": "The Avengers",
#   "language": ["English"],
#   "movie_desc": "Earth's mightiest heroes must come together to stop a powerful villain from destroying the world.",
#   "image_url": "https://example.com/avengers.jpg",
#   "length": 143,
#   "reviews": [
#     {
#       "rating": 4,
#       "comment": "Great movie! Highly recommended."
#     },
#     {
#       "rating": 5,
#       "comment": "Best superhero movie ever!"
#     }
#   ],
#   "shows": [
#     {
#       "date": "2023-07-30",
#       "start_time": ["15:00", "18:00"],
#       "end_time": ["17:30", "20:30"],
#       "total_seats": 100,
#       "price": 150
#     },
#     {
#       "date": "2023-07-31",
#       "start_time": ["14:30", "17:30"],
#       "end_time": ["17:00", "20:00"],
#       "total_seats": 120,
#       "price": 160
#     }
#   ]
# }
