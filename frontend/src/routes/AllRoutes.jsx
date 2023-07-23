import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Movies from '../pages/Movies'
import SingleMovie from '../pages/SingleMovie'
import UserBookings from '../pages/UserBookings'
import Checkout from '../pages/Checkout'

function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/movies/:id" element = {<SingleMovie/>}/>
        <Route path="/userBookings" element={<UserBookings/>}/>
        <Route path="/checkout/:showId" element={<Checkout/>}/>
    </Routes>
  )
}

export default AllRoutes