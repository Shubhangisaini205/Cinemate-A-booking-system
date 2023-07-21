import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Popover,
  useToast
} from "@chakra-ui/react";
import { primaryColor, jewel, rose, secondaryColor } from "../constants/color";
import { Link, useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { BsPerson } from "react-icons/bs"
import RoleModal from "./RoleModal";


const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  const toast = useToast()
  let token = localStorage.getItem("token")
  let loggeduser = JSON.parse(localStorage.getItem("user"))
  return (
    <Box bg={primaryColor} px={4} py={4}>
      <Flex justifyContent="space-between" >
        <Flex alignItems="center">
          <Box as="span" color={jewel} fontWeight="bold">
            MyApp
          </Box>
          <Box border="1px solid black" ml={4} maxW="100px" maxH="60px">
            ❤️
          </Box>
        </Flex>

        {/* Hamburger Menu */}
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            icon={<TiThMenu fontSize={"25px"} />}
            onClick={onOpen}
            variant="ghost"
            size="md"
            aria-label="Open Navigation"
          />
        </Box>

        <Flex gap={3} display={{ base: "none", md: "flex" }}>
          <Link to="/">
            <Text color="white" fontWeight="bold">
              Home
            </Text>
          </Link>
          {token ?
            <Popover>
              <Menu>
                <MenuButton>
                  <BsPerson fontSize={"1.3rem"} />
                </MenuButton>

                <MenuList>
                  <MenuGroup title="Profile">
                    <MenuItem color="pink.400">
                      Hey,{token ? `${loggeduser.username}` : "User"}
                    </MenuItem>
                    <MenuItem><RoleModal id={loggeduser.userId}/></MenuItem>
                    <MenuItem>Order History</MenuItem>
                    <MenuItem>My Address</MenuItem>
                    <MenuItem>Reviews</MenuItem>
                    <MenuItem
                    // onClick={() => navigate("/adminLogin")}
                    >
                      Admin
                    </MenuItem>
                  </MenuGroup>
                  <MenuItem
                    _hover={{ bg: "#87234D" }}
                    backgroundColor={jewel}
                    color={"white"}
                    onClick={() => {
                      // dispatch(logout);
                      localStorage.clear()
                      toast({
                        title: "User Logout Successfully.",
                        description: "Come Back Again Soon",
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                        position: "top",
                      });
                      // navigate("/")
                      window.location = "/"    //not working properly with navigate local store is not getting empty  perfectly 
                    }}
                  >
                    Sign Out
                  </MenuItem>

                </MenuList>
              </Menu>
            </Popover>
            : ""}
          {token ? "" :
            <Link to="/login" onClick={onClose} >
              <Text fontWeight="bold" color={"white"}>Login</Text>
            </Link>
          }
        </Flex>

        {/* Drawer */}
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Flex direction="column" gap={3}>
                <Link to="/" onClick={onClose}>
                  <Text fontWeight="bold">Home</Text>
                </Link>
                {token ? "" :
                  <Link to="/login" onClick={onClose}>
                    <Text fontWeight="bold">Login</Text>
                  </Link>
                }
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default NavBar;
