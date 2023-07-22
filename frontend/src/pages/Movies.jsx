import React from 'react'
import MoviesList from './MoviesList'
import { Box, Divider, Heading } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Loader } from '../utils/Loader'

function Movies() {

  return (
    <Box>
        <Heading color={"white"} textAlign={"left"} mt={5} ml={"40px"} >Now Showing</Heading>
        <Divider mt={5} borderColor={"red"} />
    
        <MoviesList/>
    </Box>
  )
}

export default Movies