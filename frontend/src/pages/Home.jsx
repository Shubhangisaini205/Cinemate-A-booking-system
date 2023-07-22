import React from 'react';
import MoviesList from './MoviesList';
import Slider from 'react-slick';
import { Box, Heading, Text, IconButton, Flex, useMediaQuery } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { background, mainColor } from '../constants/color';
import HomeSlider from '../components/HomeSlider';
import SliderComp from '../components/SliderComp';
import HeroComp from '../components/HeroComp';
let moviesSliderData = [
  {
    image: "https://i.pinimg.com/236x/e0/24/2f/e0242f836d547d9c708aead0e79c9bae.jpg",

    name: "Titanic"
  },
  {
    image: "https://i.pinimg.com/236x/8b/2f/a6/8b2fa6fb94810cd0d335b479896f7fc8.jpg",

    name: "Avatar"
  },

  {
    image: "https://i.pinimg.com/236x/bb/0e/f9/bb0ef99b7d71bb27e22f57d2156b7b5d.jpg",

    name: "The Shawshank Redemption"
  },
  {
    image: "https://i.pinimg.com/236x/0b/34/ce/0b34ce2145b475247577a5d438a199b0.jpg",

    name: "Interstellar"
  },
  {
    image: "https://i.pinimg.com/236x/ea/a2/6e/eaa26e2c3bfa234c3cdd3c4d9fabad35.jpg",

    name: "The Dark Knight"
  },
  {
    image: "https://i.pinimg.com/236x/b3/69/e3/b369e396ff1520ef2cc3d7aea7146855.jpg",

    name: "Forrest Gump"
  },
  {
    image: "https://i.pinimg.com/236x/eb/71/fa/eb71fa4f5980f97ae56c705686db850e.jpg",


    name: "Jurassic Park"
  },
  {
    image: "https://i.pinimg.com/236x/b3/69/e3/b369e396ff1520ef2cc3d7aea7146855.jpg",

    name: "Pulp fiction"
  },
  {
    image: "https://i.pinimg.com/236x/80/ef/6b/80ef6bd60a8e75dcb3e7347ca50cfe5a.jpg",
    name: "Gladiator",
  }

]
function Home() {

  return (
    <Box border={"1px solid black"}>
      <Box mt={10}>
      <HomeSlider />
      </Box>
      
    
      <HeroComp />



      <Box
        width={{ base: "90%", sm: "90%", md: "90%", lg: "85%" }}
        margin="auto"
      >
        <Text
          width={{ base: "135px", sm: "220px", md: "220px", lg: "300px" }}
          fontSize={{ base: "100%", sm: "150%", md: "150%", lg: "200%" }}
          fontWeight={"semibold"}
          textAlign="left"
          borderBottom={"2px"}
          borderBottomWidth="5px"
          color={"white"}
          marginTop={{ base: 2, sm: 3, md: 7, lg: 10 }}
          borderBottomColor={mainColor}
        >
          BlockBuster Movies
        </Text>
        <SliderComp data={moviesSliderData} />
      </Box>
      <Box
        width={{ base: "90%", sm: "90%", md: "90%", lg: "85%" }}
        margin="auto"
      >
        <Text
          width={{ base: "135px", sm: "190px", md: "190px", lg: "240px" }}
          fontSize={{ base: "100%", sm: "150%", md: "150%", lg: "200%" }}
          fontWeight={"semibold"}
          textAlign="left"
          borderBottom={"2px"}
          borderBottomWidth="5px"
          color={"white"}
          marginTop={{ base: 2, sm: 3, md: 7, lg: 10 }}
          borderBottomColor={mainColor}
        >
          Popular Events
        </Text>
        <SliderComp data={moviesSliderData} />
      </Box>

    </Box>
  );
}

export default Home;
