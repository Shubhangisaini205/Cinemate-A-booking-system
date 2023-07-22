import React, { useEffect } from 'react'
import { Box, Grid, Text } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { getMoviesAction } from '../redux/MovieReducer/action';
import MovieCard from "../components/MovieCard"
import { Loader } from '../utils/Loader';
function MoviesList() {
    const { movies, isloading } = useSelector((state) => state.MovieReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMoviesAction())
    }, [])

    return (
        <Box p={4} minH="100vh">
            <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                {
                    isloading ? <Loader/> : movies.map((movie) => (
                        <MovieCard key={movie.movie_id
                        } movie={movie} />
                    ))
                }

            </Grid>
        </Box>
    );
};

export default MoviesList