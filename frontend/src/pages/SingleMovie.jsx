import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Flex, Heading, Image, Text, Tooltip } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SingleMovieAction } from '../redux/MovieReducer/action';
import { DeleteIcon, StarIcon } from '@chakra-ui/icons';
import { mainColor, navbar, orange } from '../constants/color';
import BookingModal from '../components/BookingModal';
import AddMovieShowModal from '../components/Admin/AddMovieShowModal';
import { Loader } from '../utils/Loader';

function SingleMovie() {
    let loggeduser = JSON.parse(localStorage.getItem("user"))
    const { id } = useParams();
    const { singleMovie, isloading } = useSelector((store) => store.MovieReducer);
    const [hoveredShow, setHoveredShow] = useState(null);
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        dispatch(SingleMovieAction(id));
    }, [id]);
    
    const { movie_name, movie_desc, image_url, shows, length, language, reviews, movie_id } = singleMovie;

    useEffect(() => {
        document.title = `Cinemate - ${movie_name} `;
        // Clean up the title when the component unmounts
        return () => {
            document.title = 'Cinemate';
        };
    }, []);

    const convertToHoursAndMinutes = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };
    const calculateAverageRating = () => {
        if (reviews?.length === 0) return 0;
        let totalRating = 0;
        reviews?.forEach((review) => {
            totalRating += review.rating;
        });
        return totalRating / reviews?.length;
    };
    const firstWeekDates = [];
    const startDate = new Date('2023-08-01');
    for (let i = 0; i < 8; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        firstWeekDates.push(date);
    }

    // Set the initial selected date to 1st August
    const initialSelectedDate = firstWeekDates[0];
    const [selectedDate, setSelectedDate] = useState(initialSelectedDate);

    // Filter shows based on the initial selected date (1st August)
    const [filteredShows, setFilteredShows] = useState([]);
    useEffect(() => {
        if (shows?.length > 0) {
            handleDateSelect(selectedDate);
        }
    }, [shows, selectedDate]);

    // Handle date selection
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        // Filter shows based on the selected date and update filteredShows state
        const filteredShowsForDate = shows?.filter((show) => {
            const showDate = new Date(show.date);
            return showDate.toDateString() === date.toDateString();
        }) || [];
        setFilteredShows(filteredShowsForDate);
    };
    const showTimeLabels = {
        morning: "Morning Show",
        evening: "Evening Show",
        matinee: "Matinee Show",
    };

    const handleShowHover = (show) => {
        // Add your logic to display show details on hover
        setHoveredShow(show);
    };
    const handleBoxClick = () => {
        // Clear the hoveredShow state to hide the tooltip
        setHoveredShow(null);
    };





    return (
        <Box minH="100vh" mt={"55px"}>
            <Heading color={"white"} textAlign={"left"} mt={5} ml={"40px"}>
                Show Bookings
            </Heading>
            <Divider mt={5} borderColor={"red"} />
            {isloading ? <Loader /> :
                <Box>
                    <Flex
                        mt={8}
                        align={{ lg: "left", md: "left", sm: "center", base: "center" }}
                        gap={20}
                        color="white"
                        mb={6}
                        ml={8}
                        flexDir={{ lg: "row", md: "row", sm: "column", base: "column" }}
                    >
                        <Box mr={6}>
                            <Image src={image_url} alt={movie_name} borderRadius="md" boxShadow="md" />
                        </Box>
                        <Box textAlign={"left"}>
                            <Heading color="white" mb={4}>
                                {movie_name}
                            </Heading>
                            <Flex align="center" mb={2} mt={8}>
                                <StarIcon color={mainColor} fontSize={"25px"} />
                                <Text ml={2} fontSize={"xl"} fontWeight="bold">
                                    {calculateAverageRating().toFixed(1)}/5
                                </Text>
                            </Flex>
                            <Flex mb={2} mt={8}>
                                {language?.map((el, i) => {
                                    return (
                                        <Box
                                            key={i + el}
                                            mr={2}
                                            border="1px solid white"
                                            px={3}
                                            backgroundColor={mainColor}
                                            borderRadius="md"
                                        >
                                            <Text fontSize="sm" fontWeight="medium" color="gray.300">
                                                {el}
                                            </Text>
                                        </Box>
                                    );
                                })}
                                <Text fontSize={"md"} fontWeight={"bold"}>
                                    Language
                                </Text>
                            </Flex>

                            <Text textAlign={"left"} mb={2} mt={8} fontSize="lg" fontWeight="medium" color="white">
                                Duration: {convertToHoursAndMinutes(length)}
                            </Text>
                            <Button mt={8} rounded={"full"} bgGradient={navbar} _hover={{ bg: orange }}>
                                August Shows
                            </Button>
                        </Box>
                        {/* Display dates of the first week of August */}
                        <Box mt={-20}>
                            <Heading color={mainColor} ml={8}>
                                Shows for {selectedDate.toDateString()}
                            </Heading>
                            <Divider mt={2} mb={6} borderColor={mainColor} />
                            <Flex mt={4} ml={8}>
                                {firstWeekDates.map((date) => (
                                    <Button
                                        key={date.toISOString()}
                                        mr={2}
                                        variant={selectedDate.toDateString() === date.toDateString() ? "solid" : "outline"}
                                        colorScheme={selectedDate.toDateString() === date.toDateString() ? "red" : "gray"}
                                        onClick={() => handleDateSelect(date)}
                                    >
                                        {date.getDate()}
                                    </Button>
                                ))}
                            </Flex>

                            {/* Display filtered shows based on the selected date */}
                            <Box mt={8}>

                                <Flex flexWrap="wrap" ml={8}>
                                    {filteredShows.length === 0 ? (
                                        <Text fontSize="md" color="white" mt={4} ml={8}>
                                            No shows available for this date.
                                        </Text>
                                    ) : (
                                        filteredShows.map((show) => (
                                            <Box
                                                key={show.show_id}
                                                m={2}
                                                p={2}
                                                border="1px solid gray"
                                                borderRadius="md"
                                                onMouseEnter={() => handleShowHover(show)}
                                                onMouseLeave={() => setHoveredShow(null)}
                                            >
                                                <Tooltip
                                                    placement="bottom"
                                                    isOpen={hoveredShow === show}
                                                    hasArrow
                                                    label={
                                                        <Box p={2} bgGradient={navbar}> {/* Change the background color here */}
                                                            <Text fontSize="md" color="white"> {/* Change the font color here */}
                                                                {show.audi}
                                                            </Text>
                                                            <Text fontSize="xs" color="white"> {/* Change the font color here */}
                                                                Date: {show.date}
                                                            </Text>
                                                            <Text fontSize="xs" color="white"> {/* Change the font color here */}
                                                                Price: ₹{show.price}/-
                                                            </Text>
                                                            {show.booked_seats == undefined ?
                                                                <Text fontSize="xs" color="white"> {/* Change the font color here */}
                                                                    Available Seats: {show.total_seats}

                                                                </Text> : <Text fontSize="xs" color="white"> {/* Change the font color here */}
                                                                    Available Seats: {+show.total_seats - show.booked_seats}

                                                                </Text>
                                                            }


                                                        </Box>
                                                    }
                                                >
                                                    <Box>
                                                        <BookingModal
                                                            toggle={toggle}
                                                            setToggle={setToggle}
                                                            movie_id={id}
                                                            showId={show.show_id}
                                                            time={show.start_times}
                                                            showname={showTimeLabels[show.show_name.toLowerCase()]}
                                                            price={show.price}
                                                            available_seats={+show.total_seats - show.booked_seats}
                                                        />
                                                    </Box>
                                                </Tooltip>

                                            </Box>
                                        ))
                                    )}
                                </Flex>
                            </Box>
                        </Box>
                    </Flex>

                    <Box ml={8} align={"left"} width={{ lg: "70%", md: "70%", sm: "80%", base: "80%" }}>
                        <Heading color={mainColor} mt={8}>
                            About the Movie
                        </Heading>
                        <Text mb={4} mt={3} fontSize="md" color="white" align={{ lg: "left", md: "left", sm: "center", base: "center" }}>
                            {movie_desc}
                        </Text>
                    </Box>
                </Box>}
            {loggeduser?.userId == "64bd4a12958b0473ab897e92" ?
                <AddMovieShowModal movie_id={id} /> : ""}
        </Box>
    );
}

export default SingleMovie;
