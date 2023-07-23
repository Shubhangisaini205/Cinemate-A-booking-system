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
    Select,
} from '@chakra-ui/react';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { SingleMovieAction, addMovieShowAction, getMoviesAction } from '../../redux/MovieReducer/action';

function AddMovieShowModal({ movie_id }) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const dispatch = useDispatch();
    const [movieShowData, setMovieShowData] = useState({
        "show_name": "",
        "date": "",
        "start_time": "",
        "total_seats": "",
        "price": "",
        "audi": ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieShowData((prevState) => ({ ...prevState, [name]: value }));
    };
    const audiOptions = [
        { value: "AUDI-1", label: "AUDI-1" },
        { value: "AUDI-2", label: "AUDI-2" },
        { value: "AUDI-3", label: "AUDI-3" },
    ];
    const showNameOptions = [
        { value: "Morning", label: "Morning" },
        { value: "Matinee", label: "Matinee" },
        { value: "Evening", label: "Evening" },

    ];
    const convertTo24HourFormat = (time) => {
        const [hours, minutes] = time.split(":");
        let formattedHours = hours;
        let period = "AM";
        if (parseInt(hours) === 12) {
            period = "PM";
        } else if (parseInt(hours) > 12) {
            formattedHours = (parseInt(hours) - 12).toString();
            period = "PM";
        }
        return `${formattedHours}:${minutes} ${period}`;
    };
    const handleSubmit = () => {
        // Perform the save logic here using the movieShowData state
        if (
            !movieShowData.show_name ||
            !movieShowData.date ||
            !movieShowData.start_time ||
            movieShowData.total_seats <= 0 ||
            movieShowData.price <= 0 ||
            !movieShowData.audi
        ) {
            // Show toast message for invalid input
            toast({
                title: "Error",
                description: "Please fill all the required fields and ensure seats and price are greater than 0.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return; // Stop execution if validation fails
        }

        let obj = {
            "show_name": movieShowData.show_name,
            "date": movieShowData.date,
            "start_time": convertTo24HourFormat(movieShowData.start_time),
            "total_seats": +movieShowData.total_seats,
            "price": +movieShowData.price,
            "audi": movieShowData.audi,
            "movie_id": movie_id // Replace this with the actual movie_id
        };
        console.log(obj)

        dispatch(addMovieShowAction(obj))
            .then(() => {
                dispatch(SingleMovieAction(movie_id));
                toast({
                    title: "Movie Show Added",
                    description: "The movie show has been successfully added.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onClose(); // Close the modal after saving
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: "An error occurred while adding the movie show.",
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
                <AddIcon mr={2} /> Add Movie Show
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
                    <ModalHeader>Add new Movie Show</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Show Name</FormLabel>
                            <Select
                                name="show_name"
                                value={movieShowData.show_name}
                                onChange={handleChange}
                                placeholder='Select Show name'
                            >
                                {showNameOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Date</FormLabel>
                            <Input
                                type="date"
                                name="date"
                                value={movieShowData.date}
                                onChange={handleChange}
                                placeholder='Date'
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Start Time</FormLabel>
                            <Input
                                type="time"
                                name="start_time"
                                value={movieShowData.start_time}
                                onChange={handleChange}
                                placeholder='Start Time'
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Total Seats</FormLabel>
                            <Input
                                type="number"
                                name="total_seats"
                                value={movieShowData.total_seats}
                                onChange={handleChange}
                                placeholder='Total Seats'
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Price</FormLabel>
                            <Input
                                type="number"
                                name="price"
                                value={movieShowData.price}
                                onChange={handleChange}
                                placeholder='Price'
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Audi</FormLabel>
                            <Select
                                name="audi"
                                value={movieShowData.audi}
                                onChange={handleChange}
                                placeholder='Select Audi'
                            >
                                {audiOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>

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

export default AddMovieShowModal;
