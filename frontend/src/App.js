import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar';
import AllRoutes from './routes/AllRoutes';
import CreditCard from './components/CreditCard';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <AllRoutes/>
      {/* <CreditCard/> */}
    </div>
  );
}

export default App;
