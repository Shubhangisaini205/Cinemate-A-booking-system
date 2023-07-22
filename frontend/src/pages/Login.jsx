import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, FormControl, FormLabel, Input, Button, Heading, Link } from "@chakra-ui/react";
import { mainColor,  } from "../constants/color";
import { LoginAction } from "../redux/AuthReducer/action";
import {useNavigate} from "react-router-dom" 
const Login = () => {
    const dispatch = useDispatch();
    const { isLoading, isAuth, token, loggedUser, } = useSelector((state) => state.AuthReducer);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
        // Dispatch the login action with the user's email and password
        dispatch(LoginAction({ email, password }));
    };

    if (token) {
        localStorage.setItem("token", token); // Save token in local storage
        localStorage.setItem("user", JSON.stringify(loggedUser));
        ; // Redirect to the home page
        setTimeout(()=>{
            navigate("/")
        },1000)
       
    }

    return (
        <Flex align="center" justify="center" minH="80vh" >
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
                    Login
                </Heading>

                <form onSubmit={handleLogin}>
                    <FormControl mb={4}>
                        <FormLabel color={mainColor} htmlFor="email">
                            Email address
                        </FormLabel>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            borderColor={mainColor}
                            _focus={{ borderColor: mainColor }}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel color={mainColor} htmlFor="password">
                            Password
                        </FormLabel>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            borderColor={mainColor}
                            _focus={{ borderColor: mainColor }}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        bg={mainColor}
                        color="white"
                        fontWeight="bold"
                        w="100%"
                        _hover={{ bg: "#87234D" }}
                    >
                        Login
                    </Button>
                    <Link color={mainColor} textAlign="center" mb={4} href="/signup">
                        Don't have an account? Signup here.
                    </Link>
                </form>
            </Box>
        </Flex>
    );
};

export default Login;
