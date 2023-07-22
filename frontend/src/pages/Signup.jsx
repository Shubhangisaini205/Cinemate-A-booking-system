import React, { useState } from "react";
import { Box, Flex, FormControl, FormLabel, Input, Button, Heading, Link } from "@chakra-ui/react";
import { mainColor} from "../constants/color";
import { useDispatch } from "react-redux";
import { SignupAction } from "../redux/AuthReducer/action";
const Signup = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Front-end validation for password and confirmPassword
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        let obj = {
            username:formData.username,
            email:formData.email,
            password:formData.password,
            role:"regular",
            payment:0
        }
        // Dispatch SignupAction with form data
        dispatch(SignupAction(obj));
    };

    return (
        <Flex align="center" justify="center" minH="0vh">
            <Box
                p={10}
                borderRadius="md"
                bg="white"
                boxShadow="md"
            >
                <Heading textAlign="center" color={mainColor} mb={6}>
                    Welcome to CineMate
                </Heading>
                <Heading textAlign="center" color={mainColor} mb={6}>
                    Create an Account
                </Heading>

                <form onSubmit={handleSubmit}>
                    <FormControl mb={4}>
                        <FormLabel color={mainColor} htmlFor="username">
                            Username
                        </FormLabel>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            borderColor={mainColor}
                            _focus={{ borderColor: mainColor}}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel color={mainColor} htmlFor="email">
                            Email address
                        </FormLabel>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            borderColor={mainColor}
                            _focus={{ borderColor: mainColor}}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel color={mainColor} htmlFor="password">
                            Password
                        </FormLabel>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            borderColor={mainColor}
                            _focus={{ borderColor: mainColor}}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel color={mainColor} htmlFor="confirmPassword">
                            Confirm Password
                        </FormLabel>
                        <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            borderColor={mainColor}
                            _focus={{ borderColor: mainColor}}
                        />
                    </FormControl>

                    {/* Add a Login link */}
                    <Link color={mainColor} textAlign="center" mb={4} href="/login">
                        Already have an account? Login here.
                    </Link>

                    <Button
                        type="submit"
                        bg={mainColor}
                        color="white"
                        fontWeight="bold"
                        w="100%"
                        _hover={{ bg: "#23875f" }}
                    >
                        Signup
                    </Button>
                </form>
            </Box>
        </Flex>
    );
};

export default Signup;
