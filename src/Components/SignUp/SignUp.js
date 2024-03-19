import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import netflixLogo from "../../Images/netflixLogo.png";
import {Formik, Form, Field, useFormik, ErrorMessage} from 'formik'
import { FirebaseContext } from "../../Store/FirebaseContext";
import {signUpValidationSchema} from '../../FormValidationSchema/signupValidation'
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import {  collection, addDoc, doc ,getFirestore } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';
import LoadingPopup from '../Loading/LoadingPopup';





function SignUp() {

  const {firestore} = useContext(FirebaseContext)
  const [isLoading, setIsLoading] = useState(false);


  const initialValues = {
    username : '',
    email : '',
    password : '',
    cpassword : ''
  }

  const navigate = useNavigate()

  const handleSubmit = (values) => {

    setIsLoading(true)

    const { username, email, password } = values;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName: username
        });
        await addDoc(collection(getFirestore(), 'users'), {
          userId: userCredential.user.uid,
          userName: username,
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate('/');
        }, 2000);        
      })
      .catch((error) => {
        console.error('Error creating user: ', error);
      });
  }



    return (
      <div className="signUp">
        <Link to="/">
          <img className="logo" src={netflixLogo} alt="netflix logo" />
        </Link>
        <LoadingPopup isLoading={isLoading} />
        <div className="signup__container">
          <h1>Sign Up</h1>
          <br />
          <Formik
            initialValues={initialValues}
            validationSchema={signUpValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form >
                <Field type='text' name='username' placeholder='Username' ></Field>
                <ErrorMessage name="username" component="small" style={{ color: 'red' }} />

                <Field type='text' name='email' placeholder='Email' ></Field>
                <ErrorMessage name="email" component="small" style={{ color: 'red' }} />

                <Field type='password' name='password' placeholder='Password' ></Field>
                <ErrorMessage name="password" component="small" style={{ color: 'red' }} />

                <Field type='password' name='cpassword' placeholder='Confirm Password' ></Field>
                <ErrorMessage name="cpassword" component="small" style={{ color: 'red' }} />

              <button type="submit">Sign Up</button>
            </Form>
          </Formik>
          <Link  to="/">
            
            &nbsp;Sign In
          </Link>
        </div>
      </div>
    );
  
}

export default SignUp;
