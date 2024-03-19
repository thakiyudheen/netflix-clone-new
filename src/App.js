import './App.css';
// import { Banner } from './Components/Banner/Banner';
// import Footer from './Components/Footer/Footer';
// import { MovieRow } from './Components/MovieRow/MovieRow';
// import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import { useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from './Store/AuthContext';



function App() {

  const {user,setUser} = useContext(AuthContext)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (User) => {
      setUser(User)
    });
  }, [])
  

  return (
    <Router>
      <Routes>
        { user ? <Route path='/home' element={ <Home/> } /> : <Route path='/' element={ <SignInPage/> } /> }
        <Route path='/' element={ <SignInPage/> } />
        <Route path='/signup' element={ <SignUpPage/> } />
      </Routes>
    </Router>
  );
}

export default App;
