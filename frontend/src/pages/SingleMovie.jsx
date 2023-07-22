import { Box, Button, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SingleMovieAction } from '../redux/MovieReducer/action'
import { StarIcon } from "@chakra-ui/icons";
import { mainColor, navbar, orange } from '../constants/color'
function SingleMovie() {
    const { id } = useParams()
    const { singleMovie } = useSelector((store) => store.MovieReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(SingleMovieAction(id))
    }, [])

    const { movie_name, movie_desc, image_url, shows, length, language, reviews, movie_id } = singleMovie;
    console.log(movie_name)
    // const calculateAverageRating = () => {
    //     if (reviews.length === 0) return 0;
    //     const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    //     return totalRating / reviews.length;
    // };
    const convertToHoursAndMinutes = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };
    console.log(singleMovie)

    return (
        <Box >
            <Heading color={"white"} textAlign={"left"} mt={5} ml={"40px"} >Show Bookings</Heading>
            <Divider mt={5} borderColor={"red"} />

            <Flex mt={8} align={{ lg: "left", md: "left", sm: "center", base: "center" }} gap={20} color="white" mb={6} ml={8} flexDir={{ lg: "row", md: "row", sm: "column", base: "column" }}>
                <Box mr={6}>
                    <Image src={image_url} alt={movie_name} borderRadius="md" boxShadow="md" />
                </Box>
                <Box
                    // border={"1px solid white"} 
                    textAlign={"left"}>
                    <Heading color="white" mb={4}>
                        {movie_name}
                    </Heading>
                    <Flex align="center" mb={2} mt={8}>
                        <StarIcon color={mainColor} fontSize={"25px"} />
                        <Text ml={2} fontSize={"xl"} fontWeight="bold">
                            {/* {calculateAverageRating().toFixed(1)}/5 */}
                            4/5 Early Ratings
                        </Text>
                    </Flex>
                    <Flex mb={2} mt={8} >
                        {language?.map((el, i) => {
                            return (
                                <Box key={i + el} mr={2} border="1px solid white" px={3} backgroundColor={mainColor} borderRadius="md">
                                    <Text fontSize="sm" fontWeight="medium" color="gray.300" >
                                        {el}
                                    </Text>
                                </Box>
                            );
                        })}
                        <Text fontSize={"md"} fontWeight={"bold"}>Language</Text>
                    </Flex>

                    <Text
                        textAlign={"left"}
                        mb={2}
                        mt={8}
                        fontSize="lg"
                        fontWeight="medium"
                        color="white">
                        Duration: {convertToHoursAndMinutes(length)}
                    </Text>
                    <Button
                        mt={8}
                        rounded={'full'}
                        bgGradient={navbar}

                        _hover={{ bg: orange }}>
                        Shows
                    </Button>

                </Box>
            </Flex>
            <Box ml={8}
                align={"left"} width={{ lg: "70%", md: "70%", sm: "80%", base: "80%" }}
            // border={"1px solid white"}
            >
                <Heading color={mainColor} mt={8}>About the Movie</Heading>
                <Text mb={4} mt={3} fontSize="md" color="white" align={{ lg: "left", md: "left", sm: "center", base: "center" }}>
                    {movie_desc}
                </Text>
            </Box>

        </Box>
    );
}

export default SingleMovie