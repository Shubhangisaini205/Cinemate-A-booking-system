import { Bars } from "react-loading-icons";
import { Box } from "@chakra-ui/react";
import { mainColor } from "../constants/color";

export const Loader = () => {
  return (
    <Box w="100%" h="100%" position="relative" mt={"100px"}>
      
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          <Bars fill={mainColor} fontSize={"xl"} />
        </Box>
   
    </Box>
  );
};
