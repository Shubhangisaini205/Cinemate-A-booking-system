import { Text, Input, Flex, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, useToast, Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SingleUserAction, UpdateAction } from '../redux/AuthReducer/action';
import { addMovieShowBooking } from '../redux/MovieReducer/action';
import { navbar } from '../constants/color';
 

const BookingPayment = ({ show_id, booked_seats, total_price }) => {
    let loggeduser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [state, setState] = useState({
        number: '2348797557896573',
        expiry: '12/27',
        cvc: '',
        name: loggeduser.username,
        focus: '',
        otp: '', // New state to hold the user-entered OTP
    });
    const [otp, setotp] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();


    const bookingObj = { show_id, "user_id": loggeduser.userId, booked_seats, total_price:Math.floor(+total_price) }
    console.log(bookingObj,"bookingObj")

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    };

    const isFormValid = () => {
        const { number, expiry, cvc, name } = state;

        // Check if all fields are filled and meet the required conditions
        if (
            number.length !== 16 ||
            isNaN(number) ||
            expiry.length !== 5 ||
            isNaN(cvc) ||
            cvc.length !== 3 ||
            isNaN(Number(cvc))
        ) {
            return false;
        }

        return true;
    };

    useEffect(() => {
        // Show OTP toast for 2 seconds and then hide it
        if (state.otp !== '') {
            toast({
                title: 'OTP',
                description: `Your OTP: ${state.otp}`,
                status: 'info',
                duration: 2000,
                isClosable: true,
            });
        }
    }, [state.otp, toast]);

    const generateOTP = () => {
        // Generate a random 4-digit OTP
        const randomOTP = Math.floor(1000 + Math.random() * 9000);
        setState((prev) => ({ ...prev, otp: randomOTP.toString() }));
        onOpen();
    };

    const handlePay = () => {
        if (!isFormValid()) {
            toast({
                title: 'Invalid Form',
                description: 'Please fill all fields correctly to proceed with the payment.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } else if (state.otp !== otp) {
            toast({
                title: 'Invalid OTP',
                description: 'Please enter the OTP to complete the payment.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } else {
            onClose();
            dispatch(addMovieShowBooking(bookingObj));
            toast({
                position: 'top',
                title: 'Booking  Successful',
                description: `₹ ${total_price} paid successfully!`,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setotp("")
            onClose()
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }

    };

    return (
        <Box>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />
            <form>
                <Input
                    mt={10}
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    mb={2}
                    size="lg"
                />
                <Flex justifyContent="space-between">
                    <Input
                        type="tel"
                        name="expiry"
                        placeholder="MM/YY Expiry"
                        value={state.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        mb={2}
                        size="lg"
                        flex="1"
                        mr={2}
                    />
                    <Input
                        type="tel"
                        name="cvc"
                        placeholder="CVC"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        mb={2}
                        size="lg"
                        flex="1"
                    />
                </Flex>
                <Input
                    type="text"
                    name="name"
                    placeholder="Cardholder Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    mb={2}
                    size="lg"
                />
                <Button mt={4} bgGradient={navbar} _hover={{bgGradient:navbar}} onClick={generateOTP}  isDisabled={!isFormValid()}>
                    Pay ₹{total_price}
                </Button>
                <AlertDialog isOpen={isOpen} onClose={onClose}>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader>Please enter the OTP sent to your device:</AlertDialogHeader>
                        <AlertDialogBody>
                            <Input
                                type="number"
                                placeholder="OTP"
                                value={otp}
                                onChange={(e) => setotp(e.target.value)}
                                autoFocus
                            />
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button bgGradient={navbar} 
                            _hover={{bgGradient:navbar}} onClick={handlePay}>
                                Confirm Payment
                            </Button>
                            <Button ml={4} onClick={() => {
                                setotp("")
                                onClose()
                            }}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form>
        </Box>
    );
};

export default BookingPayment;