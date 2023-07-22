import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import Slider from "react-slick";
import { IoIosArrowForward } from "react-icons/io";

const SliderComp = ({ data }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box marginTop={{ base: 6, sm: 7, md: 10, lg: 10 }}>
      <Slider {...settings}>
        {data.map((item, i) => {
          return (
            <Box
              borderRadius={"20px"}
              key={i}
              position="relative"
              overflow="hidden"
              // boxShadow= "rgba(235, 222, 222, 0.24) 0px 3px 8px"
             
              _hover={{
                "& img": {
                  transform: "scale(1.2)",
                },
                "& .movie-name": {
                  opacity: 1,
                  transform: "scale(1.1)",
                },
              }}
            >
              <Image
                borderRadius={"20px"}
                width={"93%"}
                margin="auto"
                src={item.image}
                transition="transform 0.3s ease-in-out"
              />
              <Text
                fontWeight={"bold"}
                color={"white"}
                textAlign="center"
                position="absolute"
                bottom="20px"
                fontSize={"2xl"}
                left="0"
                right="0"
                opacity={0}
                transition="opacity 0.3s, transform 0.3s"
                className="movie-name"
              >
                {item.name}
              </Text>
              <Text fontWeight={"bold"} color={"white"} textAlign="center">
                {item.name}
              </Text>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default SliderComp;
