import { Box, Divider, Heading, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieBookingsAction } from '../redux/MovieReducer/action';
import { background, mainColor } from '../constants/color';
import { Loader } from '../utils/Loader';

function UserBookings() {
    let loggeduser = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const { bookedMovies, isloading } = useSelector((store) => store.MovieReducer);
    useEffect(() => {
        dispatch(getMovieBookingsAction(loggeduser.userId));
    }, []);
    useEffect(() => {
        document.title = `Cinemate - Bookings Summary} `;
        // Clean up the title when the component unmounts
        return () => {
            document.title = 'Cinemate';
        };
    }, []);

    return (
        <Box minH="100vh" mt={"55px"}>
            <Heading color={'white'} textAlign={'left'} mt={5} ml={'40px'}>
                Your Bookings
            </Heading>
            <Divider mt={5} borderColor={'red'} />

            {isloading ? <Loader /> :
                bookedMovies.length === 0 ? (
                    <Box>
                        <Text color={mainColor} fontSize={'3xl'}>
                            Not booked yet !!!
                        </Text>
                        <Box mt={'20px'}>
                            <Image
                                borderRadius={'30px'}
                                margin={'auto'}
                                src="https://img.freepik.com/free-photo/cinema-still-life_23-2148017284.jpg?size=626&ext=jpg&ga=GA1.2.1425539495.1687153209&semt=ais"
                            />
                        </Box>
                    </Box>
                ) : (
                    <Box mt={5} ml={10}>
                        {bookedMovies.map((booking) => (
                            <Box key={booking.show_id} mt={5}>

                                <Heading fontSize="xl" color={mainColor} mt={2}>
                                    Movie: {booking.movie_name}
                                </Heading>
                                <Text fontSize="md" color={'white'}>
                                    Show Name: {booking.show_name}
                                </Text>
                                <Text fontSize="md" color={'white'}>
                                    Show Date: {booking.show_date}
                                </Text>
                                <Text fontSize="md" color={'white'}>
                                    Show Start Time: {booking.show_start_time}
                                </Text>
                                <Text fontSize="md" color={'white'}>
                                    Booked Seats: {booking.booked_seats}
                                </Text>
                                <Text fontSize="md" color={'white'}>
                                    Total Price: ₹{booking.total_price}/-
                                </Text>
                                <Divider mt={2} borderColor={'white'} />
                            </Box>
                        ))}
                    </Box>
                )
            }

        </Box>
    );
}

export default UserBookings;
