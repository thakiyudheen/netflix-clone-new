import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import netflixLogo from "../../Images/netflixLogo.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import LoadingPopup from '../Loading/LoadingPopup';


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) =>{
    e.preventDefault()

    setIsLoading(true)

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          navigate('/home')
        }, 2000);  
      })
      .catch((error) => {
        console.log("the error is.....",error);
      });
  }

  
    return (
      <div className="signIn">
        <Link to="/">
          <img className="logo" src={netflixLogo} alt="netflix logo" />
          <LoadingPopup isLoading={isLoading} />
        </Link>
        <div className="signin__container">
          <h1>Sign In</h1>
          <br />
          <form  onSubmit={handleSubmit} >
            <input
              value={email}
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              value={password}
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Sign In</button>
          </form>
          <h3>
            New to Netflix? <Link to="/signup">Sign up now.</Link>
          </h3>
          <p>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </p>
          {/*added just to indicate that sign in with google disable for the time being because of some issues.*/}
          {
            /*<p>   
             <span style={{color:"#e50914"}}>Note:</span> Sign in with google disabled for the time being to remove the deceptive site ahead warning from the website. Try signing up/signing in using email.
            </p>*/
          }
        </div>
      </div>
    );
  
}

export default SignIn;
