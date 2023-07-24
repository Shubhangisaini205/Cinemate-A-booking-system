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
  useToast,
  DrawerHeader
} from "@chakra-ui/react";
import { navbar, colorShade4 } from "../constants/color";
import { Link, useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { BsPerson } from "react-icons/bs"
import RoleModal from "./RoleModal";
import cinamateName from "../assests/cinemate-name.png"

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  const toast = useToast()
  let token = localStorage.getItem("token")
  let loggeduser = JSON.parse(localStorage.getItem("user"))
  return (
    <Box bgGradient={navbar} px={4} py={4} position="fixed" top={0} left={0} right={0} zIndex={10}>
      <Flex justifyContent="space-between" >
        <Flex alignItems="center">
          <Box as="span" color={colorShade4} fontWeight="bold">
            <Image src={cinamateName} width={"100px"} />
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
          <Link to="/movies">
            <Text color="white" fontWeight="bold">
              Movies
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
                    <MenuItem><RoleModal id={loggeduser.userId} /></MenuItem>
                    <MenuItem onClick={() => navigate("/userBookings")}>Your Bookings</MenuItem>
                    {/* <MenuItem>My Address</MenuItem> */}
                    <MenuItem>Reviews</MenuItem>
                    <MenuItem
                    // onClick={() => navigate("/adminLogin")}
                    >
                      Profile
                    </MenuItem>
                  </MenuGroup>
                  <MenuItem
                    _hover={{ bg: "#87234D" }}
                    bgGradient={navbar}
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
          <DrawerContent bgGradient={navbar}>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              <Image src={cinamateName} />
            </DrawerHeader>
            <DrawerBody bgGradient={navbar}>
              <Flex direction="column" gap={3}>
                <Link to="/" onClick={onClose}>
                  <Text fontWeight="bold">Home</Text>
                </Link>
                <Link to="/movies">
                  <Text fontWeight="bold">
                    Movies
                  </Text>
                </Link>
                {token ?
                  <Popover>
                    <Menu>
                      <MenuButton>
                        <BsPerson fontSize={"1.7rem"} />
                      </MenuButton>

                      <MenuList>
                        <MenuGroup title="Profile">
                          <MenuItem color="pink.400">
                            Hey,{token ? `${loggeduser.username}` : "User"}
                          </MenuItem>
                          <MenuItem><RoleModal id={loggeduser.userId} /></MenuItem>
                          <MenuItem onClick={() => navigate("/userBookings")}>Your Bookings</MenuItem>
                          {/* <MenuItem>My Address</MenuItem> */}
                          <MenuItem>Reviews</MenuItem>
                          <MenuItem
                          // onClick={() => navigate("/adminLogin")}
                          >
                            Profile
                          </MenuItem>
                        </MenuGroup>
                        <MenuItem
                          _hover={{ bg: "#87234D" }}
                          bgGradient={navbar}
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
