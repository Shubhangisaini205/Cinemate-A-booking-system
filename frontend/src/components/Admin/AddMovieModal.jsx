import { AddIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from '@chakra-ui/react';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addMovieAction, getMoviesAction } from '../../redux/MovieReducer/action';

function AddMovieModal() {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const dispatch = useDispatch()
    const [movieData, setMovieData] = useState({
        movie_name: "hgh",
        language: "jhjk",
        movie_desc: "hjhj",
        image_url: "jhj",
        length: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        // Perform the save logic here using the movieData state
        if (!movieData.movie_name || !movieData.language || !movieData.image_url || movieData.length <= 0) {
            // Show toast message for invalid input
            toast({
                title: "Error",
                description: "Please fill all the required fields and ensure the length is greater than 0.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return; // Stop execution if validation fails
        }
        
        let obj = {
            movie_name: movieData.movie_name,
            language: [movieData.language],
            image_url: movieData.image_url,
            movie_desc: movieData.movie_desc,
            length: +movieData.length,
            shows: [],
            reviews: []
        };

        dispatch(addMovieAction(obj))
            .then(() => {
                dispatch(getMoviesAction());
                toast({
                    title: "Movie Added",
                    description: "The movie has been successfully added.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onClose(); // Close the modal after saving
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: "An error occurred while adding the movie.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    return (
        <>
            <Button
                bg={"teal"}
                size="lg"
                position="fixed"
                right="2rem"
                bottom="6rem"
                zIndex="10"
                onClick={onOpen}
            >
                <AddIcon mr={2} /> Add Movie
            </Button>
            <Modal
                blockScrollOnMount={false}
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new Movie </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Movie name</FormLabel>
                            <Input
                                ref={initialRef}
                                name="movie_name"
                                value={movieData.movie_name}
                                onChange={handleChange}
                                placeholder='Movie name'
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Language</FormLabel>
                            <Input
                                name="language"
                                value={movieData.language}
                                onChange={handleChange}
                                placeholder='Language'
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input
                                name="movie_desc"
                                value={movieData.movie_desc}
                                onChange={handleChange}
                                placeholder='Description'
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Poster</FormLabel>
                            <Input
                                name="image_url"
                                value={movieData.image_url}
                                onChange={handleChange}
                                placeholder='poster Image'
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Length</FormLabel>
                            <Input
                                type='Number'
                                name="length"
                                value={movieData.length}
                                onChange={handleChange}
                                placeholder='length in minutes'
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddMovieModal;
