import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar';
import AllRoutes from './routes/AllRoutes';
import CreditCard from './components/CreditCard';
import Footer from './components/Footer';
import { Box } from '@chakra-ui/react';
import { background } from './constants/color';
import { CineBot } from './components/CineBot';

function App() {
  return (
    <Box className="App" display="flex" flexDirection="column" minHeight="100vh" bgColor={background}
    >
      <NavBar/>
      <AllRoutes/>
      {/* <CreditCard/> */}
      <Box
        position="fixed"
        left={0}
        bottom={0}
        // width="300px"
        backgroundColor="transparent"
        padding={4}
        boxShadow="lg"
      >
        <CineBot/>
      </Box>
      <Footer/>
    </Box>
  );
}

export default App;
