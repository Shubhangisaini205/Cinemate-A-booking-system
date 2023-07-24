import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SingleMovieShowAction } from '../redux/MovieReducer/action';
import { mainColor, navbar, orange } from '../constants/color';
import BookingPayment from './BookingPayment';
import { Loader } from '../utils/Loader';

function Checkout() {
  const { showId } = useParams();
  const dispatch = useDispatch();
  const { singleMovie_show,isloading } = useSelector((store) => store.MovieReducer);
  const [seatCount, setSeatCount] = useState(1);
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    document.title = `Cinemate - Show booking `;
    // Clean up the title when the component unmounts
    return () => {
      document.title = 'Cinemate';
    };
  }, []);
  useEffect(() => {
    dispatch(SingleMovieShowAction(showId));
  }, []);

  // Function to increase the seat count
  const increaseSeatCount = () => {
    setSeatCount((prevCount) => prevCount + 1);
  };

  // Function to decrease the seat count
  const decreaseSeatCount = () => {
    setSeatCount((prevCount) => (prevCount - 1 >= 1 ? prevCount - 1 : 1));
  };


  const available_seats = singleMovie_show.total_seats - singleMovie_show.booked_seats
  // Calculate the total price based on the seat count and movie show price
  const totalPrice = singleMovie_show?.price * seatCount;

  // Calculate GST (18%) based on the total price
  const gst = totalPrice * 0.18;

  // Calculate the grand total (total price + GST)
  const grandTotal = totalPrice + gst;

  return (
    <Box color={'white'} mt={"55px"}>
      <Heading color={"white"} textAlign={"left"} mt={5} ml={"40px"}>Ticket Payment </Heading>
      <Divider mt={5} borderColor={"red"} mb={10} />

      {/* Add buttons to increase and decrease seat count */}
      {isloading ? <Loader /> :
      <Box
        border="1px solid #bab8b4"
        padding={'20px'}
        width={{ base: '80%', sm: '80%', md: '40%', lg: '40%' }}
        margin={'0 auto'}
      >
        <Flex justifyContent={"space-around"} flexDir={{ lg: "row", md: "row", sm: "column", base: "column" }}>
          <Box >
            <Heading color={mainColor}>{singleMovie_show.movie_name}</Heading>
            <Text fontSize="lg" fontWeight="bold">
              Selected Show: {singleMovie_show?.show_name}
            </Text>
            <Text fontSize="md" fontWeight={'bold'} color={'white'}>
              Show Time: {singleMovie_show?.start_time}
            </Text>
            <Text fontSize="md" fontWeight={'bold'} color={'white'}>
              Available Seats: {available_seats}
            </Text>
          </Box>
          <Box>

            <Button variant="outline" onClick={decreaseSeatCount} color={mainColor} mt={4}>
              -
            </Button>
            <Button variant="outline" color={mainColor} ml={2} mt={4}>
              {seatCount}
            </Button>
            <Button isDisabled={seatCount >= available_seats} variant="outline" color={mainColor} onClick={increaseSeatCount} mt={4} ml={2}>
              +
            </Button>
            <Text fontSize="lg" mt={4}>
              Number of Seats: {seatCount}
            </Text>
          </Box>
        </Flex>

        <Text textAlign={'center'} color={'black'} fontSize={'22px'} marginBottom="15px">
          Payable Amount
        </Text>
        <Box
          border="1px solid #bab8b4"
          width={{ base: '100%', sm: '100%', md: '100%', lg: '100%' }}
          margin={'0 auto'}
          height="150px"
        >
          <Flex justifyContent={'space-around'} marginBottom="20px" marginTop={'10px'}>
            <Text fontSize={{ base: '14px', sm: '17px', md: '16px', lg: '18px' }}>
              Total Payment
            </Text>
            <Text fontSize={{ base: '14px', sm: '17px', md: '16px', lg: '18px' }} fontWeight="bold">
              ₹{totalPrice}/-
            </Text>
          </Flex>

          <Flex justifyContent={'space-around'} marginBottom="20px">
            <Text fontSize={{ base: '14px', sm: '17px', md: '16px', lg: '18px' }}>GST (18%)</Text>
            <Text
              fontSize={{ base: '14px', sm: '17px', md: '16px', lg: '18px' }}
              fontWeight="bold"
              color={'green'}
            >
              ₹{gst.toFixed(2)}/-
            </Text>
          </Flex>
          <Box width="90%" margin="0 auto 10px auto">
            <Divider />
          </Box>

          <Flex justifyContent={'space-around'} marginBottom="20px">
            <Text fontSize={{ base: '14px', sm: '17px', md: '16px', lg: '18px' }} fontWeight="semibold">
              Grand Total
            </Text>
            <Text fontSize={{ base: '14px', sm: '17px', md: '16px', lg: '18px' }} fontWeight="bold">
              ₹{grandTotal.toFixed(2)}/-
            </Text>
          </Flex>
        </Box>


        <Button mt={8} rounded={"full"} bgGradient={navbar} _hover={{ bg: orange }} fontWeight={"bold"} fontSize={"xl"} onClick={() => setToggle(!toggle)}>
          {toggle ? "Cancel" : "Book"}
        </Button>
        {toggle ? <Box mt={6}>
          <BookingPayment total_price={grandTotal.toFixed(2)} booked_seats={seatCount} show_id={showId} />
        </Box> : ""}



      </Box>}
    </Box>
  );
}

export default Checkout;
