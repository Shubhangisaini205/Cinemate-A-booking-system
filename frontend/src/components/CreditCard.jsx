import { Text, Input, Flex, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SingleUserAction, UpdateAction } from '../redux/AuthReducer/action';

const CreditCard = ({ price ,onClosePaymentModal,id}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
        otp: '', // New state to hold the user-entered OTP
    });
    const [otp, setotp] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

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
            expiry.length !== 4 ||
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
            dispatch(UpdateAction(id, price)).then(() => dispatch(SingleUserAction(id)));
            toast({
                title: 'Payment Successful',
                description: `₹ ${price} paid successfully!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setotp("")
            onClose()
            onClosePaymentModal();
            setTimeout(()=>{
              navigate("/")
            },3000)
        }

    };

    return (
        <div>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />
            <form>
                <Input
                    mt={2}
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
                <Button mt={4} colorScheme="blue" onClick={generateOTP} isDisabled={!isFormValid()}>
                    Pay ₹{price}
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
                            <Button colorScheme="blue" onClick={handlePay}>
                                Confirm Payment
                            </Button>
                            <Button ml={4} onClick={()=>{
                                 setotp("")
                                 onClose()
                            }}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form>
        </div>
    );
};

export default CreditCard;
