import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
//Import FontAwesomeIcon 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faDashboard,faClock, faCalendar,faUser,faHospital, faChild, faGears, faGear, faDoorOpen, faFileSignature, faList, faFileCsv, faFileAlt, faMessage, faSyringe, faChartArea, faChartBar, faTableList, faCog, faBaby, faEye, faExpand, faMinimize, faWindowMinimize, faWindowMaximize, faArrowLeft, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
//Import pages
import Appointments from './pages/Appointments';
import Dashboard from './pages/Dashboard';
import Immunization from './pages/Immunization';
import Overview from './pages/Overview';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Content from './pages/Content';
import Profile from './pages/Profile';
import Log from './pages/Log';
import Reports from './pages/Forms';
import Messages from './pages/Messages';
import Login from './pages/Login';
import Systemreport from './pages/Systemreport';
import Tables from './pages/Tables';
import Screening from './Screening';
//firebase
import { authentication } from './config/firebase';
import { database } from './config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//import loadng
import Loading from './animations/Loading';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { faUserCircle, faLock } from '@fortawesome/free-solid-svg-icons';

function App() {
  let pic = "../blue_abstract_lines_2.jpg"
  const [active, setActive] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false); 

  function refreshPage() {
    window.location.reload(false);
  }

  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    },1500)
  },[])

  useEffect(()=>{
    if(user===null){
      setIsSignedIn(false);
    }else{
      setIsSignedIn(true);
    }
  })

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
      });
  
      // Unsubscribe when component unmounts
      return () => unsubscribe();
    }, []);
  }catch(e){
    console.log(e);
  }
  // Initialize Firebase with your config
  const [user, setUser] = useState(null);
  const [document, setDocument] = useState([]);
  let id = "";

const logInWithEmailAndPassword = async (email, password) => {
  try {
    if(!email||!password||!email&&!password){
      if(!email){
          setMessage("Please enter a valid email")
      }
      if(!password){
          setMessage("Please enter a valid password")
      }
      if(!email&&!password){
          setMessage("Please enter valid inputs, thank you.")
      }
      else{
        await signInWithEmailAndPassword(authentication, email, password);
      }
  }
}catch (err) {
    console.error(err);
    alert(err.message);
  }
};


function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+)@([a-zA-Z0-9-]+.[a-zA-Z]{2,}))$/;
  return regex.test(email);
}    


const [activeIN, setActiveIN] = useState("");
const [disable, setDisable] = useState(true);
console.log("EMAIL: " + email + " " + "PASSWORD: " + password)

useEffect(()=>{
if(validateEmail(email)&&password!==null){
  setDisable(false);
}else{
  setDisable(true)
}
},[email,password])

const [submitting, setSubmitting] = useState(false);
const handleSubmit = async () => {
setSubmitting(true);
try {
  if(!email||!password||!email&&!password){
    if(!email||!password){
      setMessage("Please enter valid inputs, thank you.")
      setTimeout(()=>{
        setSubmitting(false)
      },3000)
  }
    if(!email&&!password){
        setMessage("Please enter valid inputs, thank you.")
        setTimeout(()=>{
          setSubmitting(false)
        },3000)
    }
  }
    else{
        if(validateEmail(email)){
          setSubmitting(false)
          await signInWithEmailAndPassword(authentication, email, password);
          refreshPage();
        }else{
          setMessage("Please enter a valid Email")
          setSubmitting(false)
        }
    }
  // Redirect the user to the next page.
} catch (error) {
  // Handle the error.
  alert("Failed to sign in, please try again.")
}
};

    console.log("Email: ", email, "Password: ", password, "Current User: ", user);

  function logout() {
    authentication
      .signOut()
      .then(function () {
        // Sign-out successful.
        alert("logging out");
        setIsSignedIn(false);
        setUser("");
      })
      .catch(function (error) {
        setTimeout(alert(error),3000)
      })
  }

  const [counter, setCounter] = useState(0)
  useEffect(() => {
    const messagesCollection = query(collection(database, "messages"),where("status","==","unread"));
    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
      let appointments = [];
      let count = 0;
      snapshot.forEach((doc)=>{
        count++;
        appointments.push({id:doc.id,name:doc.data().name, dateMade:doc.data().dateMade,uid:doc.data().uid})
      })
      setCounter(count);
    });
  }, []);

  const [signIN, setSignIn] = useState(true);
  const [red,setRed] = useState(false);
  const setChangePassword = async() =>{
    if(validateEmail(email)){
      try {
        await sendPasswordResetEmail(authentication,email).then(alert("Password reset has been sent to your entered email account."))
      } catch (error) {
        alert(error)
      }
    }else{
      setMessage("Please enter your work email address")
      alert("Please enter a valid password")
      setTimeout(()=>{
        setMessage("");
      },5000)
    }
  }

  useEffect(()=>{
    setEmail("");
    setPassword("");
  },[signIN])

  const [hide, setHide] = useState(false); 

  return (
    <div className="App">
     {
      loading===true?
      <Loading/>
      :
      <header>
      {
               isSignedIn===false?
               <div style={{width:'100%',height:'100vh',backgroundColor:'white',display:'flex',flexDirection:'row',fontFamily:'verdana'}}>
                {
                  signIN===true?
                  <>
                    <div style={{width:'60%',height:'100%',backgroundColor:"rgba(0,0,0,.5)"}}>
                    <div style={{}}>
        
                    </div>
                  </div>
                  <div style={{width:'40%',height:'100%',display:'flex',flexDirection:"column",alignItems:'center',justifyContent:'space-evenly'}}>
                    <h1 style={{fontSize:25}}>Login using your admin account</h1>
                    <div style={{width:'80%',height:'50%',border:'1px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}}>
                      {message}
                      <div onMouseOver={()=> setActiveIN("email")} style={{width:'100%',height:60,padding:'1%',marginTop:'5%',border:activeIN==="email"?'3px solid skyblue':'3px solid lightgrey',backgroundColor:'transparent',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
                        <FontAwesomeIcon icon={faUserCircle} size="2x" color='rgb(0,0,60)'/> 
                        <input required type='email' placeholder='email' onChange={(mail)=> setEmail(mail.target.value)}  style={{width:'90%',height:40,margin:'1%',border:'none',outline:'none'}}/>
                      </div>
                      <div onMouseOver={()=> setActiveIN("password")} style={{width:'100%',height:60,padding:'1%',marginTop:'5%',border:activeIN==="password"?'3px solid skyblue':'3px solid lightgrey',backgroundColor:'transparent',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
                        <FontAwesomeIcon icon={faLock} size="2x" color='rgb(0,0,60)'/> 
                        <input required type='password' placeholder='password' onChange={(pass)=> setPassword(pass.target.value)}  style={{width:'90%',height:40,margin:'1%',border:'none',outline:'none'}}/>
                      </div>
                      <input disabled={disable===true?true:false} onMouseOver={()=> setActiveIN("submit")} onClick={()=> handleSubmit()} onMouseLeave={()=> setActiveIN("")} type='submit' title='log in using your account with admin privilege.' value="send" style={{width:'100%',height:60,backgroundColor:activeIN==="submit"?'lightblue':'skyblue',color:'white',margin:'2%',border:'none',borderRadius:10,cursor:'pointer'}}/>
                    </div>
                    <div>
                      <p onClick={()=> setSignIn(false)} style={{cursor:'pointer',color:'skyblue',outlineWidth:10,outlineColor:'navy' }}>Forgot password?</p>
                    </div>
                  </div>
                  </>
                  :
                  <>
                    <div style={{width:'60%',height:'100%',backgroundColor:"rgba(0,0,0,.5)"}}>
                    <div style={{}}>
        
                    </div>
                  </div>
                  <div style={{width:'40%',height:'100%',display:'flex',flexDirection:"column",alignItems:'center',justifyContent:'space-evenly'}}>
                    <h1 style={{fontSize:25}}>Send a password reset email</h1>
                    <div style={{width:'80%',height:'50%',border:'1px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}}>
                      {message}
                      <div onMouseOver={()=> setActiveIN("email")} style={{width:'100%',height:60,padding:'1%',marginTop:'5%',border:activeIN==="email"?'3px solid skyblue':'3px solid lightgrey',backgroundColor:'transparent',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
                        <FontAwesomeIcon icon={faUserCircle} size="2x" color='rgb(0,0,60)'/> 
                        <input required type='email' placeholder='email' onChange={(mail)=> setEmail(mail.target.value)}  style={{height:40,margin:'1%',border:'none',outline:'none'}}/>
                      </div>
                      <input disabled={disable===true?true:false} onMouseOver={()=> setActiveIN("submit")} onClick={()=> setChangePassword()} onMouseLeave={()=> setActiveIN("")} type='submit' title='send a password change thru your email.' value="send password reset thru email" style={{width:'100%',height:60,backgroundColor:activeIN==="submit"?'lightblue':'skyblue',color:'white',margin:'2%',border:'none',borderRadius:10,cursor:'pointer'}}/>
                    </div>
                    <div>
                      <p onClick={()=> setSignIn(true)} style={{cursor:'pointer',color:'skyblue',outlineWidth:10,outlineColor:'navy' }}>Sign In?</p>
                    </div>
                  </div>
                  </>
                }
               </div>
        :
        <div className='main'>
        <div className='sideNav' style={{width:hide===true?"3%":"20%",transition:'ease-in-out',transitionDuration:'1s',backgroundColor:'white',overflow:'hidden',display:'flex',flexDirection:'column',textDecoration:'none',justifyContent:'start',alignItems:'center',backgroundColor:'white',color:'black',boxShadow:'1px 1px 7px 1px black',zIndex:10}}>
          {
            hide===false?
            <div style={{width:'100%',height:50,display:'flex',alignItems:'center',justifyContent:'end'}}>
              <div style={{width:50,height:50,display:'flex',alignItems:'center',justifyContent:'center',transition:'ease-in-out',transitionDuration:'.5s',zIndex:50,backgroundColor:'rgb(0,0,50)'}}>
                <FontAwesomeIcon onClick={()=> setHide(!hide)} icon={faAngleLeft} size={25} color='white' style={{display:'flex',alignSelf:'right'}}/>
              </div>
            </div>
            : 
            <div style={{width:'100%',height:50,display:'flex',alignItems:'center',justifyContent:'end'}}>
              <div style={{width:'100%',height:50,display:'flex',alignItems:'center',justifyContent:'center',transition:'ease-in-out',transitionDuration:'.5s',zIndex:50,backgroundColor:'rgb(0,0,50)'}}>
                <FontAwesomeIcon onClick={()=> setHide(!hide)} icon={faAngleRight} size={25} color='white' style={{display:'flex',alignSelf:'right'}}/>
              </div>            
            </div>
          }
          <div style={{display:hide===true?'hidden':'flex',opacity:hide===true&&0,flexDirection:'column',transition:"ease-in-out",transitionDuration:'.5s'}}>
            <div>
            <div className='profPic' style={{width:100,height:100,alignSelf:'center',marginTop:'18px',borderRadius:50}}></div>
            <div style={{width:'100%',height:'60px',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center',alignSelf:'center',}}>
              <h2 style={{color:'rgb(0,0,40)',fontSize:24}}>RHU III</h2>
              <p style={{color:'rgb(0,0,40)',fontSize:14,marginTop:'-10%'}}>ADMIN</p>
            </div>
          </div>
            </div>
            <div style={{width:'100%',height:400,backgroundColor:'transparent',marginBottom:10,alignSelf:'start',textDecoration:'none',alignItems:'center',justifyContent:'space-evenly',}}> 
                  <Link to="/" style={{textDecoration:'none'}}>
                    <div className='tabs' style={{width:'100%',height:40,marginLeft:'0%',borderBottom:'.5px solid lightgrey',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Overview"?"rgb(30,30,255)":"white"}} onClick={()=> setActive("Overview")} >
                      <FontAwesomeIcon icon={faClock} className='icons' style={{marginLeft:'10%',fontSize:20,color:active==="Overview"||""?"white":"rgb(0,0,40)"}}/>
                      <h3 className='in' style={{textDecoration:active==="Overview"|""?"none":"none",color:active==="Overview"?"white":"rgb(0,0,40)"}}>Dashboard</h3>
                    </div>
                  </Link>
              
              <Link to="Appointments"  style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:40,marginLeft:'0%',borderBottom:'.5px solid lightgrey',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Appointments"?"rgb(100,100,255)":"white"}} onClick={()=> setActive("Appointments")}>
                  <FontAwesomeIcon icon={faCalendar} className='icons' style={{marginLeft:'10%',fontSize:20,color:active==="Appointments"?"white":"rgb(0,0,40)"}}/>
                  <h3 className='in' style={{textDecoration:active==="Appointments"?"none":"none",color:active==="Appointments"?"white":"rgb(0,0,40)"}}>Patients</h3>
                </div>
              </Link>
              <Link to="Screening"  style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:40,marginLeft:'0%',borderBottom:'.5px solid lightgrey',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Screening"?"rgb(100,100,255)":"white"}} onClick={()=> setActive("Screening")}>
                  <FontAwesomeIcon icon={faBaby} className='icons' style={{marginLeft:'10%',fontSize:20,color:active==="Screening"?"white":"rgb(0,0,40)"}}/>
                  <h3 className='in' style={{textDecoration:active==="Screening"?"none":"none",color:active==="Screening"?"white":"rgb(0,0,40)"}}>New-born Screening</h3>
                </div>
              </Link>
              <Link to="Content" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:40,marginLeft:'0%',borderBottom:'.5px solid lightgrey',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Content"?"rgb(100,100,255)":"white"}} onClick={()=> setActive("Content")}>
                  <FontAwesomeIcon icon={faFileSignature} className='icons' style={{marginLeft:'10%',fontSize:20,color:active==="Content"?"white":"rgb(0,0,40)"}}/>
                  <h3 className='in' style={{textDecoration:active==="Content"?"none":"none",color:active==="Content"?"white":"rgb(0,0,40)"}}>Create Content</h3>
                </div>
              </Link>
              <Link to="Messages" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:40,marginLeft:'0%',borderBottom:'.5px solid lightgrey',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Messages"?"rgb(100,100,255)":"white"}} onClick={()=> setActive("Messages")}>
                  <FontAwesomeIcon icon={faMessage} className='icons' style={{marginLeft:'10%',fontSize:20,color:active==="Messages"?"white":"rgb(0,0,40)"}}/>
                  <h3 className='in' style={{textDecoration:active==="Messages"?"none":"none",color:active==="Messages"?"white":"rgb(0,0,40)"}}>Messages</h3>
                  <p style={{fontSize:12,color:active==="Messages"?"white":'grey',fontWeight:700}}>| {counter} <span style={{color:'white',fontSize:10}}>unread</span></p>
                </div>
              </Link>
              <Link to="Systemreport" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:40,marginLeft:'0%',borderBottom:'.5px solid lightgrey',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Systemreport"?"rgb(100,100,255)":"white"}} onClick={()=> setActive("Systemreport")}>
                  <FontAwesomeIcon icon={faChartBar} className='icons' style={{marginLeft:'10%',fontSize:20,color:active==="Systemreport"?"white":"rgb(0,0,40)"}}/>
                  <h3 className='in' style={{textDecoration:active==="Systemreport"?"none":"none",color:active==="Systemreport"?"white":"rgb(0,0,40)"}}>Reports</h3>
                </div>
              </Link>
              <Link to="Forms" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:40,marginLeft:'0%',borderBottom:'.5px solid lightgrey',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Forms"?"rgb(100,100,255)":"white"}} onClick={()=> setActive("Forms")}>
                  <FontAwesomeIcon icon={faFileAlt} className='icons' style={{marginLeft:'10%',fontSize:20,color:active==="Forms"?"white":"rgb(0,0,40)"}}/>
                  <h3 className='in' style={{textDecoration:active==="Forms"?"none":"none",color:active==="Forms"?"white":"rgb(0,0,40)"}}>Forms</h3>
                </div>
              </Link>
              <Link to="Log" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:40,marginLeft:'0%',borderBottom:'.5px solid lightgrey',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Log"?"rgb(100,100,255)":"white"}} onClick={()=> setActive("Log")}>
                  <FontAwesomeIcon icon={faList} className='icons' style={{marginLeft:'10%',fontSize:20,color:active==="Log"?"white":"rgb(0,0,40)"}}/>
                  <h3 className='in' style={{textDecoration:active==="Log"?"none":"none",color:active==="Log"?"white":"rgb(0,0,40)"}}>Activity Log</h3>
                </div>
              </Link>
              <Link to="settings" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:40,marginLeft:'0%',borderBottom:'.5px solid lightgrey',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="settings"?"rgb(100,100,255)":"white"}} onClick={()=> setActive("settings")}>
                  <FontAwesomeIcon icon={faCog} className='icons' style={{marginLeft:'10%',fontSize:20,color:active==="settings"?"white":"rgb(0,0,40)"}}/>
                  <h3 className='in' style={{textDecoration:active==="settings"?"none":"none",color:active==="settings"?"white":"rgb(0,0,40)"}}>Account Settings</h3>
                </div>
              </Link>
            </div>
        </div>
        <div style={{width:hide===true?'97%':'80%',height:'100vh',backgroundColor:'ghostwhite',overflow:'hidden',transition:'ease-in-out',transitionDuration:'1s'}}>
          <Routes>
              {
                user?
                <>
                  <Route path='/' element={<Dashboard counter={counter}/>}/>
                  <Route path='Dashboard' element={<Dashboard/>}/>
                  <Route path='Content' element={<Content/>}/>
                  <Route path='Appointments' element={<Appointments/>}/>
                  <Route path='Screening' element={<Screening/>}/>
                  <Route path='Immunization' element={<Immunization/>}/>
                  <Route path='Users' element={<Users/>}/>
                  <Route path='Messages' element={<Messages/>}/>
                  <Route path='Systemreport' element={<Systemreport/>}/>
                  <Route path='Forms' element={<Reports/>}/>
                  <Route path='Profile' element={<Profile/>}/>
                  <Route path='Log' element={<Log/>}/>
                  <Route path='Tables' element={<Tables/>}/>
                  <Route path='settings' element={<Settings/>}/>
                </>
                :
                null
              }
          </Routes>
        </div>
      </div>
      }
  </header>
     }
    </div>
  );
}

export default App;