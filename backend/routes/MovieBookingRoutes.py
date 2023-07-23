from flask import Blueprint, request, jsonify
from models.Movie_bookings import MovieBooking
from models.Movie_show_model import Movie_Show
from models.User_Model import users
from mongoengine.errors import DoesNotExist

movieBooking_bp = Blueprint('movieBooking_bp', __name__)

# Route to create a new movie booking
@movieBooking_bp.route('/add', methods=['POST'])
def create_booking():
    data = request.json

    # Extract the necessary fields from the request data
    show_id = data.get('show_id')
    user_id = data.get('user_id')
    booked_seats = data.get('booked_seats')
    total_price = data.get('total_price')

    # Check if the show and user exist in the database
    # You should have proper error handling and validation here
    show = Movie_Show.objects(id=show_id).first()
    user = users.objects(id=user_id).first()
   
    if not show or not user:
        return jsonify({'message': 'Show or User not found'}), 404

    # Create a new movie booking instance
    booking = MovieBooking(
        show=show,
        user_id=user,
        booked_seats=booked_seats,
        total_price=total_price
    )
    print(booking)
    # Save the booking to the database
    booking.save()

    # Update the booked_seats of the corresponding show
    show.booked_seats = (show.booked_seats or 0) + booked_seats
    show.save()

    return jsonify({'message': 'Booking created successfully'}), 201


@movieBooking_bp.route('/user/<string:user_id>', methods=['GET'])
def get_bookings_by_user_id(user_id):
    try:
        # Find the user by its ID
        user = users.objects.get(id=user_id)

        # Find all movie bookings associated with the user and join the show and movie details
        bookings = MovieBooking.objects(user_id=user).select_related()

        # Prepare the response data with booking details and show/movie information
        booking_list = []
        for booking in bookings:
            booking_data = {
                'show_id': str(booking.show.id),
                'user_id': str(booking.user_id.id),
                'booked_seats': booking.booked_seats,
                'total_price': booking.total_price,
                'show_name': booking.show.show_name,
                'show_date': booking.show.date,
                'show_start_time': booking.show.start_time,
                'movie_name': booking.show.movie_id.movie_name,
            }
            booking_list.append(booking_data)

        return jsonify(booking_list), 200

    except DoesNotExist:
        return jsonify({'message': 'User not found'}), 404