from flask import Blueprint, request, jsonify
from models.Movie_model import Movies
from models.Movie_show_model import  Movie_Show
from mongoengine.errors import DoesNotExist,MultipleObjectsReturned
movie_show_bp = Blueprint('movie_show_bp', __name__)

# Route to get all movie shows
@movie_show_bp.route("/", methods=["GET"])
def get_all_movie_shows():
    try:
        # Retrieve all the movie shows from the database
        movie_shows = Movie_Show.objects()

        # Convert the movie shows to a list of dictionaries
        show_data_list = []
        for movie_show in movie_shows:
            show_data = {
                "show_id": str(movie_show.id),
                "show_name": movie_show.show_name,
                "date": movie_show.date,
                "audi": movie_show.audi,
                "start_time": movie_show.start_time,  # Changed from "start_times" to "start_time"
                "movie_id": str(movie_show.movie_id.id),
                "total_seats": movie_show.total_seats,
                "booked_seats":movie_show.booked_seats,
                "price": movie_show.price
            }
            show_data_list.append(show_data)

        return jsonify(show_data_list), 200
    except Exception as e:
        return jsonify({"message": "Error fetching movie shows", "error": str(e)}), 500


# Route to get a single movie show
@movie_show_bp.route("/<show_id>", methods=["GET"])
def get_movie_show(show_id):
    try:
        # Find the movie show with the given show_id
        movie_show = Movie_Show.objects.get(id=show_id)
        
        # Get the movie details related to the movie show
        movie = Movies.objects.get(id=movie_show.movie_id.id)
        
        # Convert the movie show and movie objects to dictionary representations
        show_data = {
            "show_id": str(movie_show.id),
            "show_name": movie_show.show_name,
            "date": movie_show.date,
            "audi": movie_show.audi,
            "start_time": movie_show.start_time,
            "movie_id": str(movie.id),
            "movie_name": movie.movie_name,  # Add the movie name to the show data
            "total_seats": movie_show.total_seats,
            "booked_seats":movie_show.booked_seats,
            "price": movie_show.price
        }
        
        return jsonify(show_data), 200
    except DoesNotExist:
        return jsonify({"message": "Movie show not found"}), 404
    except Exception as e:
        return jsonify({"message": "Error fetching the movie show", "error": str(e)}), 500



# add  movie show
@movie_show_bp.route("/add", methods=["POST"])
def add_movie_show():
    data = request.get_json()
    show_name = data.get("show_name")
    date = data.get("date")
    start_time = data.get("start_time")  # Changed from "start_times" to "start_time"
    movie_id = data.get("movie_id")
    total_seats = data.get("total_seats")
    booked_seats = 0
    price = data.get("price")
    audi= data.get("audi")
    
    # Basic input validation
    if not show_name or not date or not start_time  or not movie_id or not total_seats or not price:
        return jsonify({"message": "Missing required fields"}), 400

    try:
        # Check if the movie exists
        movie = Movies.objects.get(id=movie_id)
    except DoesNotExist:
        return jsonify({"message": "Movie not found"}), 404
    except MultipleObjectsReturned:
        return jsonify({"message": "Multiple movies with the same ID found. Data integrity issue."}), 500

    # Create a new movie show instance
    new_show = Movie_Show(
        show_name=show_name,
        date=date,
        start_time=start_time,  # Changed from "start_times" to "start_time"
        movie_id=movie,
        total_seats=total_seats,
        booked_seats=booked_seats,
        price=price,
        audi=audi
    )

    try:
        new_show.save()
        # Add the new show's ID to the movie's list of shows
        movie.shows.append(new_show.id)
        movie.save()
        return jsonify({"message": "Movie show added successfully", "show_id": str(new_show.id)}), 201
    except Exception as e:
        return jsonify({"message": "Error adding the movie show", "error": str(e)}), 500




# PATCH route to update a movie show
@movie_show_bp.route("/update/<show_id>", methods=["PATCH"])
def update_movie_show(show_id):
    data = request.get_json()

    try:
        # Find the movie show with the given show_id
        movie_show = Movie_Show.objects.get(id=show_id)
    except DoesNotExist:
        return jsonify({"message": "Movie show not found"}), 404

    # Update the fields with the provided data
    if "show_name" in data:
        movie_show.show_name = data["show_name"]
    if "date" in data:
        movie_show.date = data["date"]
    if "start_time" in data:
        movie_show.start_time = data["start_time"]  # Changed from "start_times" to "start_time"
    if "total_seats" in data:
        movie_show.total_seats = data["total_seats"]
    if "price" in data:
        movie_show.price = data["price"]

    try:
        movie_show.save()
        return jsonify({"message": "Movie show updated successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Error updating the movie show", "error": str(e)}), 500


# DELETE route to remove a movie show
@movie_show_bp.route("/delete/<show_id>", methods=["DELETE"])
def delete_movie_show(show_id):
    try:
        # Find the movie show with the given show_id
        movie_show = Movie_Show.objects.get(id=show_id)
    except DoesNotExist:
        return jsonify({"message": "Movie show not found"}), 404

    try:
        # Find the movie associated with the movie show
        movie = Movies.objects.get(shows__contains=show_id)

        # Debug prints
        print("show_id:", show_id)
        print("movie.shows:", movie.shows)

        # Check if the show_id matches any of the movie shows' IDs in the list
        show_ids_in_movie = [str(show.id) for show in movie.shows]
        if show_id in show_ids_in_movie:
            # Remove the show_id from the movie's shows list
            movie.shows = [show for show in movie.shows if str(show.id) != show_id]
            movie.save()

            # Delete the movie show
            movie_show.delete()

            return jsonify({"message": "Movie show deleted successfully"}), 200
        else:
            return jsonify({"message": "Movie show is not associated with the movie"}), 400

    except Exception as e:
        return jsonify({"message": "Error deleting the movie show", "error": str(e)}), 500
