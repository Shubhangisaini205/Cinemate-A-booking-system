import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar';
import AllRoutes from './routes/AllRoutes';
import CreditCard from './components/CreditCard';
import Footer from './components/Footer';
import { Box } from '@chakra-ui/react';
import { background } from './constants/color';

function App() {
  return (
    <Box className="App" display="flex" flexDirection="column" minHeight="100vh" bgColor={background}
    >
      <NavBar/>
      <AllRoutes/>
      {/* <CreditCard/> */}
      <Footer/>
    </Box>
  );
}

export default App;
