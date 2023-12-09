import '../App.css';
import { useState, useEffect } from "react";
//Import FontAwesomeIcon 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faDashboard,faClock, faCalendar,faUser,faHospital, faChild, faGears, faGear, faDoorOpen, faFileSignature, faList, faFileCsv, faFileAlt, faMessage } from '@fortawesome/free-solid-svg-icons'
//Import pages
//firebase
import { authentication } from '../config/firebase';
import { database } from '../config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import App from '../App';

function Login() {
  const [active, setActive] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [user, loading, error] = useAuthState(authentication);
  
  // Initialize Firebase with your config
  const [document, setDocument] = useState([]);
  let id = "";
  // Listen   for auth state changes
  try{
    useEffect(() => {
      const unsubscribe = authentication.onAuthStateChanged((authenticatedUser) => {
        if(!authenticatedUser){
          return
        }else{
          setUser(authenticatedUser);
          console.log(user);
        }
        let nav = useNavigate();
        if(user!==""){
          nav("/") 
        }
      });
  
      // Unsubscribe when component unmounts
      return () => unsubscribe();
    }, []);
  }catch(e){
    console.log(e);
  }



  return (
    <div className="App">
        <div className='wew-container'> 
          <div className='wew1'></div>
          <div className='wew2'>
            <p style={{fontSize:26,fontWeight:700,color:'white',marginLeft:90,marginTop:20,width:200}}>DAET RHU III</p>
            <p style={{fontSize:18,fontWeight:700,color:'white',marginLeft:90,marginTop:2,width:200}}>Birthing Center</p>
          </div>
        </div>
        <div className="container">
            <div className="screen">
              <div className="screen__content">
                <form className="login">
                  <div className="login__field">
                    <i className="login__icon fas fa-user"></i>
                    <input type="text" value={email} className="login__input" placeholder="User name / Email" onChange={text=> setEmail(text.target.value)}/>
                  </div>
                  <div className="login__field">
                    <i className="login__icon fas fa-lock"></i>
                    <input type="password" value={password} className="login__input" placeholder="Password" onChange={text=> setPassword(text.target.value)}/>
                  </div>
                  <button className="button login__submit" onClick={()=> login()}>
                    <span className="button__text">Log In Now</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                  </button>				
                  <p style={{color:'red',fontSize:20,fontWeight:500,marginTop:20,backgroundColor:'rgba(220,220,220,.2)'}}>{message}</p>
                </form>
              </div>
              <div className="screen__background">
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>		
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
              </div>		
            </div>
          </div>
        </div>
  );
}

export default Login;
