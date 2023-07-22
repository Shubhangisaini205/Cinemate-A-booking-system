import React, { useState } from "react";
import {
    Box,
    Text,
    Stack,
    Flex,
    Image,
    Button
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { mainColor, navbar, orange } from "../constants/color";

const MovieCard = ({ movie }) => {
    const { movie_name, movie_desc, image_url, shows, length, language, reviews,movie_id } = movie;

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
                   _hover={{bg:orange}}
                >
                    Book
                </Button>
            </Stack>
        </Box>
    );
};

export default MovieCard;
