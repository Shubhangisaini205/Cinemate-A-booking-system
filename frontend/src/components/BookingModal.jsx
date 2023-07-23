import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    Button,
    Text,
    useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from "react"
import { background, navbar } from '../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { SingleUserAction } from '../redux/AuthReducer/action';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import { SingleMovieAction, deleteMovieShowAction } from '../redux/MovieReducer/action';

function BookingModal({ time, showname, price, showId,movie_id,toggle,setToggle }) {
    const toast = useToast()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { singleUser } = useSelector((store) => store.AuthReducer);
    const loggeduser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        dispatch(SingleUserAction(loggeduser?.userId)); // Only fetch user details if the user is logged in
    }, []);
    



    // Get the role of the user from the singleUser state
    const userRole = singleUser?.role;

    // Calculate the discount based on the user's role
    let discountPercent = 0;
    if (userRole === "premium") {
        discountPercent = 10;
    } else if (userRole === "VIP") {
        discountPercent = 20;
    }

    // Calculate the discounted ticket price based on the discountPercent
    const discountedTicketPrice = price * (1 - discountPercent / 100);
    console.log(discountedTicketPrice)

    // Function to handle the booking process


    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)

    const handleDeleteMovieShow = () => {
        dispatch(deleteMovieShowAction(showId))
            .then(() => {
                dispatch(SingleMovieAction(movie_id))
                setToggle(!toggle)
                // window.location =`/movies/${movie_id}`
                onClose()
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
        <>
            <Box onClick={onOpen}>
                <Text fontSize="sm" fontWeight="bold" _hover={{ cursor: "pointer" }}>
                    {showname}
                </Text>
                <Text fontSize="sm" fontWeight="bold" _hover={{ cursor: "pointer" }}>
                    {time}
                </Text>

            </Box>

            <Modal blockScrollOnMount={false} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">
                <ModalOverlay />
                <ModalContent bgGradient={navbar} >
                    <ModalHeader fontWeight={"bold"}  >Book Tickets</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize="lg" fontWeight={"bold"} color="white" mb={2}>
                            {userRole === "premium" && "You are a Premium Member! You get 10% discount."}
                            {userRole === "VIP" && "You are a VIP Member! You get 20% discount."}
                            {!userRole && "Please log in to see your discount."}
                        </Text>
                        <Text fontSize="lg" fontWeight="bold">Selected Show: {showname}</Text>
                        <Text fontSize="md" fontWeight={"bold"} color={"white"}>Show Time: {time}</Text>

                        <Text mt={5} fontSize="md" fontWeight={"bold"}>Ticket Price: ₹{price}/-</Text>
                        {userRole && <Text fontSize="md" fontWeight={"bold"}>Discounted Price: ₹{discountedTicketPrice}/-</Text>}

                    </ModalBody>

                    <ModalFooter>
                        {userRole ?
                            <Button
                                bgColor={"black"}
                                color={"white"}
                                _hover={{ bg: "black" }}
                                mr={3}
                                onClick={() => navigate(`/checkout/${showId}`)} >
                                Proceed
                            </Button>
                            :
                            <Button
                                bgColor={"black"}
                                color={"white"}
                                _hover={{ bg: "black" }}
                                mr={3}
                                onClick={() => navigate(`/login`)}>

                                Login to Proceed
                            </Button>}
                        {loggeduser?.userId == "64bd4a12958b0473ab897e92" ?
                            <Button
                                leftIcon={<DeleteIcon />}
                            onClick={handleDeleteMovieShow}
                            ></Button> : ""}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default BookingModal;
