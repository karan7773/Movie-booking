import { Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import {Toaster} from 'react-hot-toast'
import Booking from './components/Booking';

function App() {
  return (
    <>
      <Toaster position='top-right' toastOptions={{duration:2000}}/>
      <Routes>
        <Route path='/' index element={<Home/>} />
        <Route path='login' element={<Login/>} />
        <Route path='/booking' element={<Booking/>}/>
      </Routes>
    </>
  );
}

export default App;
