import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Link,
  useToast,
} from "@chakra-ui/react";
import { mainColor } from "../constants/color";
import { useDispatch } from "react-redux";
import { SignupAction } from "../redux/AuthReducer/action";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    document.title = `Cinemate - Signup `;
    // Clean up the title when the component unmounts
    return () => {
        document.title = 'Cinemate';
    };
}, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Front-end validation for required fields
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        position: "top",
        title: "Error",
        description: "Please fill all the required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Front-end validation for password and confirmPassword
    if (formData.password !== formData.confirmPassword) {
      toast({
        position: "top",
        title: "Error",
        description: "Passwords do not match!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    let obj = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: "regular",
      payment: 0,
    };
    // Dispatch SignupAction with form data
    dispatch(SignupAction(obj));

    // Show success toast when signup is successful
    toast({
      position: "top",
      title: "Signup Successful",
      description: "You have successfully signed up!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Flex align="center" justify="center" minH="0vh" mt={"100px"}>
      <Box p={10} borderRadius="md" bg="white" boxShadow="md">
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
              _focus={{ borderColor: mainColor }}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              borderColor={mainColor}
              _focus={{ borderColor: mainColor }}
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
              _focus={{ borderColor: mainColor }}
            />
          </FormControl>

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
