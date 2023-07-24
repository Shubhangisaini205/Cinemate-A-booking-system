import React, { Component } from "react";
import Slider from "react-slick";
import { Box, Image, IconButton, useColorModeValue } from "@chakra-ui/react";

export default class HomeSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Box
      border={"1px solid black"}
        width={{ base: "85%", sm: "90%", md: "90%", lg: "85%" }}
        margin="auto"
        marginTop={3}
        position="relative"
        
      >
        <Slider {...settings}>
          {/* Your slide content here */}
          {/* Slide 1 */}
          <Box borderRadius={"8px"}>
            <Image
              borderRadius={"8px"}
              margin={"auto"}
              width={"100%"}
              src={
                "https://originserver-static1-uat.pvrcinemas.com/pvrcms/banners/Gift_card-Life_Style_4852.jpg"
              }
            />
          </Box>
          {/* Slide 2 */}
          <Box borderRadius={"8px"}>
            <Image
              borderRadius={"8px"}
              margin={"auto"}
              width={"100%"}
              src={
                "https://originserver-static1-uat.pvrcinemas.com/pvrcms/banners/Yes_Bank_9403.jpg"
              }
            />
          </Box>
          {/* Slide 3 */}
          <Box borderRadius={"8px"}>
            <Image
              borderRadius={"8px"}
              margin={"auto"}
              width={"100%"}
              src={
                "https://originserver-static1-uat.pvrcinemas.com/pvrcms/banner/Kotak-Welcome_back__8959.jpg"
              }
            />
          </Box>
          {/* Slide 4 */}
          <Box borderRadius={"8px"}>
            <Image
              borderRadius={"8px"}
              margin={"auto"}
              width={"100%"}
              src={
                "https://originserver-static1-uat.pvrcinemas.com/pvrcms/banner/Filmy_Pass_3872.jpg"
              }
            />
          </Box>
          {/* Slide 5 */}
          <Box borderRadius={"8px"}>
            <Image
              borderRadius={"8px"}
              margin={"auto"}
              width={"100%"}
              src={
                "https://originserver-static1-uat.pvrcinemas.com/pvrcms/banners/Mall_Of_India_online_offer_9632.jpg"
              }
            />
          </Box>
        </Slider>
      </Box>
    );
  }
}
