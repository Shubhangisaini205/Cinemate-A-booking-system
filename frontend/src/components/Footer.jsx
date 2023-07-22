import React from 'react';
import { Box, Flex, Text, Link, Divider, Image } from '@chakra-ui/react';
import cinamateName from "../assests/cinemate-name.png"
const Footer = () => {
    return (
        <Box  mt={10} py={4} bgGradient="linear(to-r, #d41a4a, #FF5733)" color="white">
            <Flex justifyContent={"space-around"} gap={5} alignItems={"center"} flexDir={{lg:"row",md:"row",sm:"column",base:"column"}}>
               <Box>
               <Image src={cinamateName} width={"100px"}  />
               </Box>

                <Flex direction="column" alignItems="center"  >
                    <Text fontSize="lg">Contact Us</Text>
                    <Text fontSize="sm">
                        Email: cinemate@gmail.com
                    </Text>
                   
                </Flex>
                
                <Box>
                    <Flex justifyContent="center" >
                        <Link href="#" color="white" mx={2}>
                            Home
                        </Link>
                        <Link href="#" color="white" mx={2}>
                            Movies
                        </Link>
                        <Link href="#" color="white" mx={2}>
                            About Us
                        </Link>
                        {/* Add more navigation links if needed */}
                    </Flex>
                    <Box textAlign="center" fontSize="sm">
                        &copy; {new Date().getFullYear()} Cinemate. All rights reserved.
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default Footer;
