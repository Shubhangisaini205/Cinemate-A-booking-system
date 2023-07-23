import React, { useState } from "react";
import {
    Box,
    Text,
    Stack,
    Flex,
    Image,
    Button,
    HStack,
    useToast
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { mainColor, navbar, orange } from "../constants/color";
import { DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import AddMovieModal from "./Admin/AddMovieModal";
import { useDispatch } from "react-redux";
import { deleteMovieAction, getMoviesAction } from "../redux/MovieReducer/action";
const MovieCard = ({ movie }) => {
    let loggeduser = JSON.parse(localStorage.getItem("user"))
    const toast = useToast();
    const dispatch = useDispatch()
    const { movie_name, movie_desc, image_url, shows, length, language, reviews, movie_id } = movie;

    // Calculate average rating
    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRating / reviews.length;
    };

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const handleDeleteMovie = () => {
        dispatch(deleteMovieAction(movie_id))
            .then(() => {
                dispatch(getMoviesAction());
                toast({
                    title: "Movie Deleted",
                    description: "The movie has been successfully deleted.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: "An error occurred while deleting the movie.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box
            w={["95%", "100%", "100%", "100%"]}
            boxShadow={"2xl"}
            rounded={"md"}
            p={4}
            overflow={"hidden"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Box bg={"gray.100"} mb={6} pos={"relative"} borderRadius={20}>
                <Image
                    borderRadius={20}
                    src={image_url}
                    alt={movie_name}
                    style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
                {isHovered && (
                    <>
                        <Flex
                            position="absolute"
                            top={0}
                            right={0}
                            align="center"
                            justify="center"
                            bg="rgba(255, 255, 255, 0.8)"
                            borderRadius="full"
                            p={2}
                            zIndex={1}
                        >
                            <StarIcon color="orange" />
                            <Text ml={2} fontWeight="bold">
                                {calculateAverageRating().toFixed(1)}
                            </Text>
                        </Flex>
                        <Flex
                            position="absolute"
                            bottom={0}
                            left={0}
                            right={0}
                            bg="rgba(0, 0, 0, 0.6)"
                            p={2}
                            justifyContent="center"
                            alignItems="center"
                            zIndex={1}
                            flexDir={"column"}
                        >
                            <Text color="white" fontWeight="bold" fontSize="lg">
                                {movie_name}
                            </Text>
                            {/* <Text color={"white"}>"{movie_desc}"</Text> */}
                            <Text color="white" fontSize="lg">
                                Length: {length} mins
                            </Text>
                        </Flex>

                    </>
                )}
            </Box>
            <Stack>
                <Button
                    as={Link}
                    to={`/movies/${movie_id}`}
                    bottom={4}
                    bgGradient={navbar}
                    _hover={{ bg: orange }}
                >
                    Book
                </Button>
                <Flex>
                    {loggeduser?.userId=="64bd4a12958b0473ab897e92"?
                    <HStack spacing={2}>
                        <Button
                            colorScheme="red"
                            leftIcon={<DeleteIcon />}
                        onClick={handleDeleteMovie }
                        ></Button>
                    </HStack>:""}
                </Flex>
            </Stack>
            {loggeduser?.userId=="64bd4a12958b0473ab897e92"?
           <AddMovieModal/>:""}
        </Box>
    );
};

export default MovieCard;
