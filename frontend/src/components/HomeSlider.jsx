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
                "https://lmsin.net/cdn-cgi/image/w=1232,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-Uber-HP-Desktop-HeroBanner5-20July2023.gif"
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
                "https://lmsin.net/cdn-cgi/image/w=1232,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-Uber-HP-Desktop-HeroBanner3-14July23.jpg"
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
                "https://lmsin.net/cdn-cgi/image/w=1232,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-Uber-HP-Desktop-HeroBanner2-14July23.jpg"
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
                "https://lmsin.net/cdn-cgi/image/w=1232,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-Uber-HP-Desktop-HeroBanner6-04JUNE23.jpg"
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
                "https://lmsin.net/cdn-cgi/image/w=1232,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-Uber-HP-Desktop-HeroBanner4-17July23.jpg"
              }
            />
          </Box>
        </Slider>
      </Box>
    );
  }
}
