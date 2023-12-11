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

import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Avatar,
  ThemeProvider,
  Badge,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon, Email as EmailIcon, Lock as LockIcon, MailOutlineSharp, DashboardCustomize, MedicalInformation, PregnantWoman, ArticleSharp, ArticleTwoTone, FileCopySharp, SettingsAccessibility, BookOnline } from '@mui/icons-material';


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
import { GraphicEqOutlined, PostAddOutlined, PregnantWomanRounded, Report, SettingsApplications } from '@material-ui/icons';
import { FormControl, List } from '@material-ui/core';

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

  const [counter, setCounter] = useState(0);
  const [messaged, setMessaged] = useState([]);
  useEffect(() => {
    const messagesCollection = query(collection(database, "messages"),where("status","==","unread"));
    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
      let appointments = [];
      let m = [];
      let count = 0;
      snapshot.forEach((doc)=>{
        count++;
        appointments.push({id:doc.id,name:doc.data().name, dateMade:doc.data().dateMade,uid:doc.data().uid})
        if(doc.data().status==="unnread"){
          m.push(doc.data().senderId)
        }
      })
      setCounter(count);
      setMessaged(m);
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

  useEffect(()=>{
    if(!active){
      setActive("Dashboard")
    }
  },[active])

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
               <div style={{width:'100%',height:'100vh',backgroundColor:'white',display:'flex',flexDirection:'row',fontFamily:'verdana',overflow:'hidden'}}>
                {
                  signIN===true?
                  <>
                    <Box sx={{ width: '60%', height: '100%', backgroundColor: 'white' }}>
        {/* Additional content for the left side */}
        <div style={{}}>{/* Add your content here */}</div>
      </Box>
      <Box component={Paper}
      elevation={6}
        sx={{
          width: '40%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
       
        <Box
          sx={{
            width: '80%',
            height: '50%',
            border: '1px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >   <Typography variant="h4">Login </Typography>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width:70, height:70 }}>
        <LockOutlinedIcon />
      </Avatar>
         
          {message}
          <TextField
            onMouseOver={() => setActiveIN('email')}
            label="Email"
            placeholder="Email"
            type="email"
            fullWidth
            required
            onChange={(mail) => setEmail(mail.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: '100%',
              height: 60,
              padding: '1%',
              marginTop: '1%',
              // border: activeIN === 'email' ? '3px solid skyblue' : '3px solid lightgrey',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          />
          <TextField
            onMouseOver={() => setActiveIN('password')}
            label="Password"
            placeholder="Password"
            type="password"
            fullWidth
            required
            onChange={(pass) => setPassword(pass.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: '100%',
              height: 60,
              padding: '1%',
              marginTop: '1%',
              // border: activeIN === 'password' ? '3px solid skyblue' : '3px solid lightgrey',
              backgroundColor: 'transparent',
             
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          />
          <Button
            disabled={disable === true ? true : false}
            onMouseOver={() => setActiveIN('submit')}
            onClick={handleSubmit}
            onMouseLeave={() => setActiveIN('')}
            variant="contained"
            fullWidth
            sx={{
              width: '100%',
              height: 60,
              backgroundColor: activeIN === 'submit' ? 'skyblue' : '#1976D2',
              color: 'white',
              margin: 'normal',
              cursor: 'pointer',
            }}
          >
            login
          </Button>
        </Box>
        <Typography
            onClick={() => setSignIn(false)}
            sx={{ cursor: 'pointer', color: 'skyblue', outlineWidth: 10, outlineColor: 'navy' }}
          >
            Forgot password?
          </Typography>
        <Box>
         
        </Box>
      </Box>
                  </>
                  :
                  <>
                   
      <Grid container component="main" sx={{ height: '100vh' }}>
       
        <Grid item xs={false} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' , width:70, height:70}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset your password
            </Typography>
            <Box
              sx={{
                width: '80%',
                height: '50%',
                border: '1px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              {message}
              <Box
                onMouseOver={() => setActiveIN('email')}
                sx={{
                  width: '100%',
                  height: 60,
                  padding: '1%',
                  marginTop: '5%',
                  // border: activeIN === 'email' ? '3px solid skyblue' : '3px solid lightgrey',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}
              >
            
                <TextField
                  required
                  fullWidth
                  type="email"
                  placeholder="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(mail) => setEmail(mail.target.value)}
                  sx={{ height: 40, margin: '1%', border: 'none', outline: 'none' }}
                />
              </Box>
              <Button
                disabled={disable === true ? true : false}
                onMouseOver={() => setActiveIN('submit')}
                onClick={setChangePassword}
                onMouseLeave={() => setActiveIN('')}
                type="submit"
                title="send a password change thru your email."
                sx={{
                  width: '100%',
                  height: 60,
                  backgroundColor: activeIN === 'submit' ? 'skyblue' : '#1976D2',
                  color: 'white',
                  margin: '2%',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Send the new password via email
              </Button>
            </Box>
            <Box>
              <Typography
                onClick={() => setSignIn(true)}
                sx={{ cursor: 'pointer', color: 'skyblue', outlineWidth: 10, outlineColor: 'navy' }}
              >
                Sign In?
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
   
                  </>
                }
               </div>
        :
        <div className='main'>
        <div className='sideNav' style={{width:hide===true?"3%":"20%",height:'100%',transition:'ease-in-out',transitionDuration:'1s',backgroundColor:'white',display:'flex',flexDirection:'column',textDecoration:'none',justifyContent:'start',alignItems:'center',backgroundColor:'white',color:'black',boxShadow:'1px 1px 4px 1px black',zIndex:10}}>
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
                <div className='tabs' style={{width:'100%',height:50,marginLeft:'0%',borderBottom:'.5px solid transparent',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Overview"?"rgb(0,0,50)":"white"}} onClick={()=> setActive("Overview")} >
                  <Badge style={{marginLeft:'10%',zIndex:120,fontSize:20,color:active==="Overview"?"white":"rgb(0,0,40)"}}  color="primary">
                    <DashboardCustomize fontSize="large" color="" />
                  </Badge>
                  <h3 className='in' style={{opacity:hide===true?'0%':'100%',textDecoration:active==="Overview"|""?"none":"none",color:active==="Overview"?"white":"rgb(0,0,40)"}}>Dashboard</h3>
                </div>
              </Link>
              <Link to="Appointments"  style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:50,marginLeft:'0%',borderBottom:'.5px solid transparent',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Appointments"?"rgb(0,0,50)":"white"}} onClick={()=> setActive("Appointments")}>
                  <Badge style={{marginLeft:'10%',zIndex:120,fontSize:20,color:active==="Appointments"?"white":"rgb(0,0,40)"}}  color="primary">
                    <PregnantWomanRounded fontSize="large" color="" />
                  </Badge>
                  <h3 className='in' style={{opacity:hide===true?'0%':'100%',textDecoration:active==="Appointments"?"none":"none",color:active==="Appointments"?"white":"rgb(0,0,40)"}}>Patients</h3>
                </div>
              </Link>
              <Link to="Content" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:50,marginLeft:'0%',borderBottom:'.5px solid transparent',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Content"?"rgb(0,0,50)":"white"}} onClick={()=> setActive("Content")}>
                  <Badge style={{marginLeft:'10%',zIndex:120,fontSize:20,color:active==="Content"?"white":"rgb(0,0,40)"}}  color="primary">
                    <PostAddOutlined fontSize="large" color="" />
                  </Badge>
                  <h3 className='in' style={{opacity:hide===true?'0%':'100%',textDecoration:active==="Content"?"none":"none",color:active==="Content"?"white":"rgb(0,0,40)"}}>Create Content</h3>
                </div>
              </Link>
              <Link to="Messages" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:50,marginLeft:'0%',borderBottom:'.5px solid transparent',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Messages"?"rgb(0,0,50)":"white"}} onClick={()=> setActive("Messages")}>
                  <Badge style={{marginLeft:'10%',zIndex:120,fontSize:20,color:active==="Messages"?"white":"rgb(0,0,40)"}} badgeContent={counter} color="primary">
                    <MailOutlineSharp fontSize="large" color="" />
                  </Badge>
                  <h3 className='in' style={{opacity:hide===true?'0%':'100%',textDecoration:active==="Messages"?"none":"none",color:active==="Messages"?"white":"rgb(0,0,40)"}}>Messages</h3>
                </div>
              </Link>
              <Link to="Systemreport" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:50,marginLeft:'0%',borderBottom:'.5px solid transparent',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Systemreport"?"rgb(0,0,50)":"white"}} onClick={()=> setActive("Systemreport")}>
                  <Badge style={{marginLeft:'10%',zIndex:120,fontSize:20,color:active==="Systemreport"?"white":"rgb(0,0,40)"}}  color="primary">
                    <GraphicEqOutlined fontSize="large" color="" />
                  </Badge>
                  <h3 className='in' style={{opacity:hide===true?'0%':'100%',textDecoration:active==="Systemreport"?"none":"none",color:active==="Systemreport"?"white":"rgb(0,0,40)"}}>Reports</h3>
                </div>
              </Link>
              <Link to="Forms" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:50,marginLeft:'0%',borderBottom:'.5px solid transparent',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Forms"?"rgb(0,0,50)":"white"}} onClick={()=> setActive("Forms")}>
                  <Badge style={{marginLeft:'10%',zIndex:120,fontSize:20,color:active==="Forms"?"white":"rgb(0,0,40)"}}  color="primary">
                    <FileCopySharp fontSize="large" color="" />
                  </Badge>
                  <h3 className='in' style={{opacity:hide===true?'0%':'100%',textDecoration:active==="Forms"?"none":"none",color:active==="Forms"?"white":"rgb(0,0,40)"}}>Forms</h3>
                </div>
              </Link>
              <Link to="Log" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:50,marginLeft:'0%',borderBottom:'.5px solid transparent',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="Log"?"rgb(0,0,50)":"white"}} onClick={()=> setActive("Log")}>
                  <Badge style={{marginLeft:'10%',zIndex:120,fontSize:20,color:active==="Log"?"white":"rgb(0,0,40)"}}  color="primary">
                    <BookOnline fontSize="large" color="" />
                  </Badge>
                  <h3 className='in' style={{opacity:hide===true?'0%':'100%',textDecoration:active==="Log"?"none":"none",color:active==="Log"?"white":"rgb(0,0,40)"}}>Activity Log</h3>
                </div>
              </Link>
              <Link to="settings" style={{textDecoration:'none'}}>
                <div className='tabs' style={{width:'100%',height:50,marginLeft:'0%',borderBottom:'.5px solid transparent',display:'flex',fontSize:14,flexDirection:'row',alignSelf:'center',justifyContent:'start',backgroundColor:active==="settings"?"rgb(0,0,50)":"white"}} onClick={()=> setActive("settings")}>
                  <Badge style={{marginLeft:'10%',zIndex:120,fontSize:20,color:active==="settings"?"white":"rgb(0,0,40)"}}  color="primary">
                    <SettingsApplications fontSize="large" color="" />
                  </Badge>
                  <h3 className='in' style={{opacity:hide===true?'0%':'100%',textDecoration:active==="settings"?"none":"none",color:active==="settings"?"white":"rgb(0,0,40)"}}>Account Settings</h3>
                </div>
              </Link>
            </div>
        </div>
        <div style={{width:hide===true?'97%':'80%',height:'100%',backgroundColor:'ghostwhite',transition:'ease-in-out',transitionDuration:'1s',overflow:'hidden'}}>
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
                  <Route path='Messages' element={<Messages messaged={messaged}/>}/>
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