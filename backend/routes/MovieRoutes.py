from flask import Blueprint, request, jsonify
from models.Movie_model import Movies,MovieReview
from models.Movie_show_model import  Movie_Show
from mongoengine.errors import DoesNotExist
movie_bp = Blueprint('movie_bp', __name__)

# Route to get all movies
@movie_bp.route("/", methods=["GET"])

    # try:
    #     # movies = Movies.objects().exclude("shows").to_json()  # Exclude the 'shows' field to avoid large response
    #     movies = Movies.objects().to_json()  

    #     return movies, 200
    # except Exception as e:
    #     return jsonify({"message": "Error fetching movies", "error": str(e)}), 500

def get_all_movies():
    try:
        # Retrieve all the movies from the database
        movies = Movies.objects()

        # Convert the movies to a list of dictionaries
        movie_data_list = []
        for movie in movies:
            shows_data = []

            # Fetch the detailed information of each show using the show_id
            for show in movie.shows:
                show_data = {
                    "show_id": str(show.id),
                    "show_name":show.show_name,
                    "date": show.date,
                    "start_times": show.start_time,
                    "end_times": show.end_time,
                    "total_seats": show.total_seats,
                    "price": show.price
                }
                shows_data.append(show_data)

            # Convert the reviews array to a list of dictionaries
            reviews_data = []
            for review in movie.reviews:
                review_data = {
                    "rating": review.rating,
                    "comment": review.comment
                }
                reviews_data.append(review_data)

            # Create the movie dictionary with all the data
            movie_data = {
                "movie_id": str(movie.id),  # Convert ObjectId to string
                "movie_name": movie.movie_name,
                "language": movie.language,
                "movie_desc": movie.movie_desc,
                "image_url": movie.image_url,
                "length": movie.length,
                "shows": shows_data,
                "reviews": reviews_data
            }
            movie_data_list.append(movie_data)

        return jsonify(movie_data_list), 200
    except Exception as e:
        return jsonify({"message": "Error fetching movies", "error": str(e)}), 500

#  get single movie
@movie_bp.route("/<ObjectId:_id>", methods=["GET"])
def get_Single_Movie(_id):
    try:
        # Retrieve the movie with the specified ObjectId
        movie = Movies.objects.with_id(_id)

        if movie:
            shows_data = []

            # Fetch the detailed information of each show using the show_id
            for show in movie.shows:
                show_data = {
                    "show_id": str(show.id),
                    "show_name": show.show_name,
                    "date": show.date,
                    "start_times": show.start_time,
                    "end_times": show.end_time,
                    "total_seats": show.total_seats,
                    "price": show.price
                }
                shows_data.append(show_data)

            # Convert the reviews array to a list of dictionaries
            reviews_data = []
            for review in movie.reviews:
                review_data = {
                    "rating": review.rating,
                    "comment": review.comment
                }
                reviews_data.append(review_data)

            # Create the movie dictionary with all the data
            movie_data = {
                "movie_id": str(movie.id),  # Convert ObjectId to string
                "movie_name": movie.movie_name,
                "language": movie.language,
                "movie_desc": movie.movie_desc,
                "image_url": movie.image_url,
                "length": movie.length,
                "shows": shows_data,
                "reviews": reviews_data
            }

            return jsonify(movie_data), 200
        else:
            return jsonify({"message": "Movie not found"}), 404

    except Exception as e:
        return jsonify({"message": "Error fetching movie", "error": str(e)}), 500


#  adding a movie
@movie_bp.route("/add", methods=["POST"])
def add_movie():
    data = request.get_json()
    movie_name = data.get("movie_name")
    language = data.get("language")
    movie_desc = data.get("movie_desc")
    image_url = data.get("image_url")
    length = data.get("length")
    show_ids = data.get("show_ids")  # Assuming show_ids is a list of IDs for movie shows
    reviews = data.get("reviews") # List of reviews as dictionaries

    # Basic input validation
    if not movie_name or not language or not movie_desc or not length:
        return jsonify({"message": "Missing required fields"}), 400

    # Create a new movie instance
    new_movie = Movies(
        movie_name=movie_name,
        language=language,
        movie_desc=movie_desc,
        image_url=image_url,
        length=length,
        reviews=reviews 
    )

    try:
        # If show_ids were provided, link the movie with the associated shows
        if reviews:
            new_movie.reviews = [MovieReview(**review_data) for review_data in reviews]
        if show_ids:
            for show_id in show_ids:
                show = Movie_Show.objects.get(id=show_id)
                new_movie.shows.append(show)

        new_movie.save()

        return jsonify({"message": "Movie added successfully", "movie_id": str(new_movie.id)}), 201
    except Exception as e:
        return jsonify({"message": "Error adding the movie", "error": str(e)}), 500


# Route to update a movie (PATCH request)
@movie_bp.route("/update/<movie_id>", methods=["PATCH"])
def update_movie(movie_id):
    data = request.get_json()
    try:
        movie = Movies.objects.get(id=movie_id)

        # Update movie fields based on the provided data
        if "movie_name" in data:
            movie.movie_name = data["movie_name"]
        if "language" in data:
            movie.language = data["language"]
        if "movie_desc" in data:
            movie.movie_desc = data["movie_desc"]
        if "image_url" in data:
            movie.image_url = data["image_url"]
        if "length" in data:
            movie.length = data["length"]

        movie.save()
        return jsonify({"message": "Movie updated successfully"}), 200
    except DoesNotExist:
        return jsonify({"message": "Movie not found"}), 404
    except Exception as e:
        return jsonify({"message": "Error updating the movie", "error": str(e)}), 500


# Route to delete a movie (DELETE request)
@movie_bp.route("/delete/<movie_id>", methods=["DELETE"])
def delete_movie(movie_id):
    try:
        movie = Movies.objects.get(id=movie_id)
        movie.delete()
        return jsonify({"message": "Movie deleted successfully"}), 200
    except DoesNotExist:
        return jsonify({"message": "Movie not found"}), 404
    except Exception as e:
        return jsonify({"message": "Error deleting the movie", "error": str(e)}), 500


#  adding review to movie
@movie_bp.route("/<movie_id>/add_review", methods=["POST"])
def add_movie_review(movie_id):
    data = request.get_json()
    rating = data.get("rating")
    comment = data.get("comment")

    # Basic input validation
    if not rating or not comment:
        return jsonify({"message": "Missing required fields"}), 400

    try:
        # Fetch the existing movie
        movie = Movies.objects.get(id=movie_id)

        # Create a new review instance
        new_review = MovieReview(rating=rating, comment=comment)

        # Append the new review to the movie's reviews list
        movie.reviews.append(new_review)

        # Save the movie with the new review
        movie.save()

        return jsonify({"message": "Review added successfully"}), 201
    except DoesNotExist:
        return jsonify({"message": "Movie not found"}), 404
    except Exception as e:
        return jsonify({"message": "Error adding the review", "error": str(e)}), 500

