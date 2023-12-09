import React, { useState, useEffect } from 'react';
import { database, authentication } from '../config/firebase';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Divider, Box} from '@mui/material';
//moment
import moment from 'moment';
//firebase
import { onSnapshot, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
//import fontawesomeicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import axios
import axios from 'axios';
import { faAngleLeft, faAngleRight, faBell, faBellConcierge, faCalendar, faCalendarAlt, faCalendarDays, faChild, faCircle, faDoorOpen, faExclamationCircle, faList, faList12, faMobile, faMobileAndroid, faPersonPregnant, faPhone, faSuitcase, faSyringe, faUserAlt } from '@fortawesome/free-solid-svg-icons';
//import moment js
import Calendar from 'react-calendar';
import TopNav from './messages/TopNav';
import NoData from '../animations/NoData';
import PatientRegistrationForm from './patientRegistration';

const Dashboard = ({counter}) => {
 const users = [];
 const [appUsers, setAppUsers] = useState(0);
 const [patients, setPatients] = useState(0);
 const [mother, setMother] = useState([]);
 const [child, setChild] = useState([]);
 const monthNow = moment(new Date()).format("MM");
 const yearNow = moment(new Date()).format("YYYY");
  var currentDate = moment(new Date(), "YYYY/MM/DD");
 const [allUsers, setAllUsers] = useState([]);

 const fetchUsers = async() => {
  let usersSnap = query(collection(database,"userData"));
  let user = [];
  let clients = 0;
  let newUsers = [];
  let i = 1;
  onSnapshot(usersSnap,(snapshot)=>{
    snapshot.forEach((doc)=>{
      newUsers.push({id:doc.id, count:i++,userFname:doc.data().userFname,userLname:doc.data().userLname,status:doc.data().status,userPic:doc.data().userPic,weeksPregnant:doc.data(),dateCreated:moment(doc.data().dateCreated).format("MMMM DD, YYYY"),birthday:moment(doc.data().userDob).format("MMMM DD, YYYY"),userPic:doc.data().userPic,lastPeriod:doc.data().lastPeriod,weeksPregnant:moment(currentDate,"YYYY/MM/DD").diff(doc.data().lastPeriod,"weeks"),});
      if(doc.data().status==="approved"){
        user.push({id:doc.id})
      }
      users.push({id:doc.id,userFname:doc.data().userFname,userLname:doc.data().userLname,status:doc.data().status,userPic:doc.data().userPic,weeksPregnant:doc.data(),dateCreated:moment(doc.data().dateCreated).format("MMMM DD, YYYY"),birthday:moment(doc.data().userDob).format("MMMM DD, YYYY"),userPic:doc.data().userPic,lastPeriod:doc.data().lastPeriod,weeksPregnant:moment(currentDate,"YYYY/MM/DD").diff(doc.data().lastPeriod,"weeks"),});
    })
    setPatients(users.length);
    setAppUsers(user.length);
    setAllUsers(newUsers)
  })
 }

 const [vax, setVax] = useState([]);
 useEffect(()=>{
  const vaccinations = [];
  const motherVax = [];
  const childrenVax = [];
   const fetchVac = async() => {
       let userData = [];
       const queryImmunization = await getDocs(query(collection(database,"vaccination")));
       queryImmunization.forEach((doc)=>{
           userData.push({
             ...doc.id,  
           })
           if(doc.data().for==="child"){
            motherVax.push(doc.id)
           }
           if(doc.data().for==="mother"){
            childrenVax.push(doc.id)
           }
       })
       setMother(motherVax.length);
       setChild(childrenVax.length)
       setVax(userData)
   }
   fetchVac();
 },[])
 
 const [userData, setUserData] = useState(0);
 let [completed, setCompleted] = useState(0);
 let [pendings_, setPendings_] = useState(0);

 async function fetchUser(){
   let user1 = [];
   let user2 = [];
   let thismonth1 = [];
   let thismonth2 = [];
   let pend = [];
   const querySnapshot1 = await getDocs(query(collection(database, 'appointments')));
   const querySnapshot2 = await getDocs(query(collection(database, 'onlineAppointments')));
   querySnapshot1.forEach((doc)=>{
       user1.push({id:doc.id,appointmentDate:doc.data().appointmentDate,dateMade:doc.data().dateMade,purpose:doc.data().purpose,status:doc.data().status,time:doc.data().time});
       if(doc.data().month===monthNow&&doc.data().year===yearNow){
        thismonth1.push({id:doc.id})
       }
     })
     querySnapshot2.forEach((doc)=>{
      user1.push({id:doc.id,appointmentDate:doc.data().appointmentDate,dateMade:doc.data().dateMade,purpose:doc.data().purpose,status:doc.data().status,time:doc.data().time});
      if(moment(doc.data().appointmentDate).format("MM")===monthNow&&moment(doc.data().appointmentDate).format("YYYY"===yearNow&&doc.data().status==="approved")){
        thismonth2.push({id:doc.id})
       }
       if(doc.data().status==="pending"){
        pend.push(doc.id)
       }
    })
    setCompleted(thismonth1.length+thismonth2.length);
     setUserData(user1.length+user2.length);
     setPendings_(pend.length)
 }

 useEffect(()=>{
  fetchUsers();
 },[])

 ///////////////////////////

  const [document, setDocuments] = useState([]);
  const [tabs, setTab] = useState(0);
  const [active, setActive] = useState('');
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [noOfUsers, setNoOfUsers] = useState(0);
  const [immunizations, setImmunization] = useState(0)
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [list, setList] = useState([]);
  const [clickedDate, setClickedDate] = useState("");
  const today = new Date();
  const appointmentdate = moment(today).format("YYYY/MM/DD");
  const year = moment(today).format("YYYY");
  const [date, setDate] = useState(new Date());
  const [jan, setJan] = useState(0);
  const [feb, setFeb] = useState(0);
  const [mar, setMar] = useState(0);
  const [apr, setApr] = useState(0);
  const [may, setMay] = useState(0);
  const [jun, setJun] = useState(0);
  const [jul, setJul] = useState(0);
  const [aug, setAug] = useState(0);
  const [sep, setSep] = useState(0);
  const [oct, setOct] = useState(0);
  const [nov, setNov] = useState(0);
  const [dec, setDec] = useState(0);
  const [jan2, setJan2] = useState(0);
  const [feb2, setFeb2] = useState(0);
  const [mar2, setMar2] = useState(0);
  const [apr2, setApr2] = useState(0);
  const [may2, setMay2] = useState(0);
  const [jun2, setJun2] = useState(0);
  const [jul2, setJul2] = useState(0);
  const [aug2, setAug2] = useState(0);
  const [sep2, setSep2] = useState(0);
  const [oct2, setOct2] = useState(0);
  const [nov2, setNov2] = useState(0);
  const [dec2, setDec2] = useState(0);
  const [notif, viewNotif] = useState(false);

  
  useEffect(()=> {
    async function fetchImmunization(){
      const querySnapshot = await getDocs(collection(database, 'vaccination'));
      const userData = [];
      let date = new Date();
      const dateNow = moment(date, "YYYY/MM/DD");
      try{
        let i = 1;
        const data = querySnapshot.forEach(doc=>{
          userData.push({count: i,id:doc.id,});
          i++;
        })
        setImmunization(userData.length);
      }catch(e){
        console.log(e);
      }
      //var i = 1;
      //alert("running "+i++ +" times")
    };

    async function fetchData(){
      const querySnapshot = await getDocs(query(collection(database, 'userData')));
      const querySnapshot2 = await getDocs(query(collection(database, 'child')));
      const userData = [];
      const data = querySnapshot.forEach(doc=>{
        if(doc.data().status==="pending"){
          userData.push({id:doc.id, 
            fName:doc.data().userFname,
            mName:doc.data().userMname,
            lName:doc.data().userLname,
            number:doc.data().userNumber,
            //birthday:doc.data().userBirthdate,
            email:doc.data().userEmail,
            //userPic:doc.data().userPic,
            status:doc.data().status,
            number:doc.data().number,
            uid:doc.data().uid,
            made:doc.data().dateMade
          });
        }
        })
        setNoOfUsers(document.length)
        setDocuments(userData);
      };
      try{
        fetchData();
        fetchImmunization();
      }catch(e){
        console.log(e);
      }
    },[]);

    async function manipulateDate(){
      let dateNow = new Date();
      let myList = [];
      let i = 1;
      let formattedDate = moment(dateNow, "YYYY/MM/DD");
      let formattedInput = "";
      appointmentsToday.forEach((doc)=>{
        if(moment(date).format("YYYY/MM/DD")===moment(doc.dateTime).format("YYYY/MM/DD")){
          console.log("HIT")
          i++;
          myList.push({id:doc.id,  
            name: doc.name,
            purpose: doc.purpose,
            time: doc.time,
            dateTime: doc.dateTime})
        }else{
          console.log("MISS")
        }
      })
      setList(myList);
      let now = moment(date).format("YYYY/MM/DD")
      console.log(now)
      console.log("Date manipulated: ",appointmentsToday); 
    }

    const [clickedDayApp, setClickedDayApp] = useState([]);

    useEffect(()=>{
      let appointments = [];
      let dateNow = moment(date).format("YYYY/MM/DD");
      const fetchIT = async() => {
        const querySnapshot = await getDocs(query(collection(database, 'appointments'),where("appointmentDate","==",dateNow)));
        querySnapshot.forEach((doc)=>{
          appointments.push({id:doc.id, appointmentdate:doc.data().appointmentDate, purpose:doc.data().purpose, name:doc.data().name, time:doc.data().time})
        })
      }
      fetchIT()
      setClickedDayApp(appointments);
    },[date])
    
    const [hasNotif, setHasNotif] = useState(false);
    const [pendings, setPendings] = useState([]);
    useEffect(()=>{

        let i = 0;
        let january = 0;
        let february = 0;
        let march = 0;
        let april = 0;
        let may_ = 0;
        let june = 0;
        let july = 0;
        let august = 0;
        let september = 0;
        let october = 0;
        let november = 0;
        let december = 0;
        
          onSnapshot(query(collection(database, "vaccination"),where("year","==",yearNow)), (doc) => {
            doc.docs.map((d)=>{
              if(moment(d.data().dateRegistered).format("MM")==="01"){
                january++;
              }
              if(moment(d.data().dateRegistered).format("MM")==="02"){
                february++;
              }
              if(moment(d.data().dateRegistered).format("MM")==="03"){
                march++;
              }
              if(moment(d.data().dateRegistered).format("MM")==="04"){
                april++;
              }
              if(moment(d.data().dateRegistered).format("MM")==="05"){
                may_++;
              }
              if(moment(d.data().dateRegistered).format("MM")==="06"){
                june++;
              }
              if(moment(d.data().dateRegistered).format("MM")==="07"){
                july++;
              }
              if(moment(d.data().dateRegistered).format("MM")==="08"){
                august++;
              }
              if(moment(d.data().dateRegistered).format("MM")==="09"){
                september++;
              }
              if(moment(d.data().dateRegistered).format("MM")==="10"){
                october++;
              }
              if(moment(d.data().dateRegistered).format("MM")==="11"){
                november++;
              }
              if(moment(d.data().dateRegistered).format("MM")==="12"){
                december++;
              }
              console.log(moment(d.data().appointmentDate).format("MM"))
            setJan2(january);
            setFeb2(february);
            setMar2(march); 
            setMay2(may_);
            setJun2(june);
            setJul2(july);
            setAug2(august);
            setSep2(september);
            setOct2(october);
            setNov2(november);
            setDec2(december);
            })
          setPendings(doc.docs);
          setHasNotif(true)
        });
    },[pendings])
//    alert(oct2)

    useEffect(()=>{
      const dateNow = moment(today, "YYYY/MM/DD");
      async function fetchAppointments(){
         const querySnapshot = await getDocs(query(collection(database, 'appointments'),where("year","==",yearNow)));
         const appointments = [];
         let i = 0;
         let january = 0;
         let february = 0;
         let march = 0;
         let april = 0;
         let may_ = 0;
         let june = 0;
         let july = 0;
         let august = 0;
         let september = 0;
         let october = 0;
         let november = 0;
         let december = 0;
         const data = querySnapshot.forEach(doc=>{
            appointments.push({id:doc.id,  
             name: doc.data().name,
             purpose: doc.data().purpose,
             time: doc.data().time,
             dateTime: doc.data().appointmentDate + " " + doc.data().time
            });
            if(moment(doc.data().appointmentDate).format("MM")==="01"){
              january++;
            }
            if(moment(doc.data().appointmentDate).format("MM")==="02"){
              february++;
            }
            if(moment(doc.data().appointmentDate).format("MM")==="03"){
              march++;
            }
            if(moment(doc.data().appointmentDate).format("MM")==="04"){
              april++;
            }
            if(moment(doc.data().appointmentDate).format("MM")==="05"){
              may_++;
            }
            if(moment(doc.data().appointmentDate).format("MM")==="06"){
              june++;
            }
            if(moment(doc.data().appointmentDate).format("MM")==="07"){
              july++;
            }
            if(moment(doc.data().appointmentDate).format("MM")==="08"){
              august++;
            }
            if(moment(doc.data().appointmentDate).format("MM")==="09"){
              september++;
            }
            if(moment(doc.data().appointmentDate).format("MM")==="10"){
              october++;
            }
            if(moment(doc.data().appointmentDate).format("MM")==="11"){
              november++;
            }
            if(moment(doc.data().appointmentDate).format("MM")==="12"){
              december++;
            }
            console.log(moment(doc.data().appointmentDate).format("MM"))
          })
          setJan(january);
          setFeb(february);
          setMar(march); 
          setMay(may_);
          setJun(june);
          setJul(july);
          setAug(august);
          setSep(september);
          setOct(october);
          setNov(november);
          setDec(december);
          setAppointmentsToday(appointments);
          setAppointmentsCount(appointments.length)
      }
      try{
        fetchAppointments();
        manipulateDate();
      }catch(e){
        console.log(e);
      }
    },[])

    const [userCount, setUserCount] = useState(0);
    useEffect(()=>{
      const dateNow = moment(today, "YYYY/MM/DD");
      let i = 0;
      async function fetchAppointments(){
         const querySnapshot = await getDocs(query(collection(database, 'userData')));
         const appointments = [];
         const data = querySnapshot.forEach(doc=>{
            i++;
          })
          setUserCount(i)
          console.log("No. of users: "+ userCount);
      }
      try{
        fetchAppointments();
        manipulateDate(date);
      }catch(e){
        console.log(e);
      }
    },[])

    const dKey = [
      {
        name: 'January',
        count: jan,
        count2: jan2
      },
      {
        name: 'February',
        count: feb,
        count2: feb2
      },
      {
        name: 'March',
        count: mar,
        count2: mar2
      },
      {
        name: 'April',
        count: apr,
        count2: apr2
      },
      {
        name: 'May',
        count: may,
        count2: may2
      },
      {
        name: 'June',
        count: jun,
        count2: jun2
      },
      {
        name: 'July',
        count: jul,
        count2: jul2
      },
      {
        name: 'August',
        count: aug,
        count2: aug2
      },
      {
        name: 'September',
        count: sep,
        count2: sep2
      },
      {
        name: 'October',
        count: oct,
        count2: oct2
      },
      {
        name: 'November',
        count: nov,
        count2: nov2
      },
      {
        name: 'December',
        count: dec,
        count2: dec2
      }
    ]

    function logout() {

        try{
          authentication.signOut()
            function refreshPage() {
              window.location.reload(false);
            }
            refreshPage()
        }catch(error) {
          alert(error)
        }
    }    
  function refreshPage() {
    window.location.reload(false);
  }

  const months = {
    jan: "January",
    feb: "February", 
    mar: "March",
    apr: "April",
    may: "May",
    jun: "June",
    jul: "July",
    aug: "August",
    sep: "September",
    oct: "October",
    nov: "November",
    dec: "December"
  }

  return (
    <div style={{width:'100%',height:'100%',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'start',overflow:'hidden',justifyContent:'start'}}>
      <div style={{width:'100%',height:'94vh',backgroundColor:'white',overflowX:'hidden',overflowY:'hidden',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'start'}}>
        <div style={{width:'98%',height:'100%',display:'flex',flexDirection:'row'}}>
        <div style={{width:'75%',height:600,borderTop:'2px solid lightgrey',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'start'}}>
            <div style={{width:'100%',height:'30%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}}>
              <div style={{width:'100%',height:'70%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',}}>
                <div style={{width:'32%',height:'70%',backgroundColor:'white',boxShadow:'1px .1px 2px 1px grey',borderRadius:3,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                  <div style={{width:'25%',height:'80%',backgroundColor:'blue',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <FontAwesomeIcon icon={faCalendar} size='2x' color='white'/>
                  </div>
                  <div style={{width:'42%',height:'90%',backgroundColor:'white',borderRight:'1px solid lightgrey',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <p style={{fontSize:15,color:'black'}}>Appointments</p>
                    <p style={{color:'black',fontSize:30}}>{completed}</p>
                  </div>
                  <div style={{width:'30%',height:'90%',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <p style={{fontSize:15,color:'black'}}>Upcoming</p>
                    <p style={{color:'black',fontSize:30}}>{pendings_}</p>
                  </div>
                </div>
                <div style={{width:'32%',height:'70%',backgroundColor:'white',boxShadow:'1px .1px 2px 1px grey',borderRadius:3,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                  <div style={{width:'25%',height:'80%',backgroundColor:'rgb(80,205,80)',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                    <FontAwesomeIcon icon={faPersonPregnant} size='2x' color='white'/>
                  </div>
                  <div style={{width:'45%',height:'90%',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <p style={{fontSize:15,color:'black'}}>Registered Patients</p>
                    <p style={{color:'black',fontSize:30}}>{allUsers.length}</p>
                  </div>
                </div>
                <div style={{width:'32%',height:'70%',backgroundColor:'white',boxShadow:'1px .1px 2px 1px grey',borderRadius:3,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                  <div style={{width:'25%',height:'80%',backgroundColor:'orange',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                    <FontAwesomeIcon icon={faMobileAndroid} size='2x' color='white'/>
                  </div>
                  <div style={{width:'45%',height:'90%',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <p style={{fontSize:15,color:'black'}}>Mcare App Users</p>
                    <p style={{color:'black',fontSize:30}}>{appUsers}</p>
                  </div>
                </div>
              </div>
              <div style={{width:'100%',height:'20%',backgroundColor:'skyblue',display:'flex',alignItems:'center',justifyContent:'start'}}>
                
              </div>
            </div>
            <div style={{width:'100%',height:'66%',display:'flex',overflowY:'hidden',backgroundColor:'white',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
              <div style={{width:'100%',height:150,display:'flex',flexDirection:'column',alignItems:'center',marginBottom:40}}>
                <div style={{width:'100%',height:50,border:'1px solid black',display:'flex',flexDirection:'row'}}>
                  <div style={{width:'50%',height:'100%',borderRight:'1px solid black',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <p>Number of Deliveries Attended by Health Professionals</p>
                  </div>
                  <div style={{width:'20%',height:'100%',borderRight:'1px solid black',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <p>Type of Delivery</p>
                  </div>
                  <div style={{width:'30%',height:'100%',borderRight:'1px solid black',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <p>Delivery Outcome</p>
                  </div>
                </div>
                <div style={{width:'100%',height:160,border:'1px solid black',display:'flex',flexDirection:'row'}}>
                  <div style={{width:'50%',height:'100%',borderRight:'1px solid black',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}}>
                    <div style={{width:'100%',height:'32%',borderBottom:'1px solid grey',display:'flex',flexDirection:'row'}}>
                      <div style={{width:'33%',height:"100%",borderRight:'1px solid grey',backgroundColor:'lightgrey',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>Doctor</p>
                      </div>
                      <div style={{width:'33%',height:"100%",borderRight:'1px solid grey',backgroundColor:'lightgrey',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>Nurse</p>
                      </div>
                      <div style={{width:'33%',height:"100%",display:'flex',alignItems:'center',backgroundColor:'lightgrey',justifyContent:'center'}}>
                        <p>Midwife</p>
                      </div>
                    </div>
                    <div style={{width:'100%',height:'32%',borderBottom:'1px solid grey',display:'flex',flexDirection:'row'}}>
                      <div style={{width:'33%',height:"100%",borderRight:'1px solid grey',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>0</p>
                      </div>
                      <div style={{width:'33%',height:"100%",borderRight:'1px solid grey',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>0</p>
                      </div>
                      <div style={{width:'33%',height:"100%",display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>0</p>
                      </div>
                    </div>
                    <div style={{width:'100%',height:'32%',display:'flex',flexDirection:'row'}}>
                      <div style={{width:'100%',height:"100%",display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>TOTAL: 0</p>
                      </div>
                    </div>
                  </div>
                  <div style={{width:'20%',height:'100%',borderRight:'1px solid black',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}}>
                    <div style={{width:'100%',height:'32%',borderBottom:'1px solid grey',display:'flex',flexDirection:'row'}}>
                      <div style={{width:'48%',height:"100%",borderRight:'1px solid grey',backgroundColor:'lightgrey',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>Vaginal</p>
                      </div>
                      <div style={{width:'48%',height:"100%",display:'flex',backgroundColor:'lightgrey',alignItems:'center',justifyContent:'center'}}>
                        <p>Caesarian</p>
                      </div>
                    </div>
                    <div style={{width:'100%',height:'32%',borderBottom:'1px solid grey',display:'flex',flexDirection:'row'}}>
                      <div style={{width:'48%',height:"100%",borderRight:'1px solid grey',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>0</p>
                      </div>
                      <div style={{width:'48%',height:"100%",display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>0</p>
                      </div>
                    </div>
                    <div style={{width:'100%',height:'32%',display:'flex',flexDirection:'row'}}>
                      <div style={{width:'100%',height:"100%",display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>TOTAL: 0</p>
                      </div>
                    </div>
                  </div>
                  <div style={{width:'30%',height:'100%',borderRight:'1px solid black',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}}>
                    <div style={{width:'100%',height:'32%',borderBottom:'1px solid grey',display:'flex',flexDirection:'row'}}>
                      <div style={{width:'33%',height:"100%",borderRight:'1px solid grey',backgroundColor:'lightgrey',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>Alive</p>
                      </div>
                      <div style={{width:'33%',height:"100%",borderRight:'1px solid grey',backgroundColor:'lightgrey',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>Stillbirth</p>
                      </div>
                      <div style={{width:'33%',height:"100%",display:'flex',backgroundColor:'lightgrey',alignItems:'center',justifyContent:'center'}}>
                        <p>Miscarriage</p>
                      </div>
                    </div>
                    <div style={{width:'100%',height:'32%',borderBottom:'1px solid grey',display:'flex',flexDirection:'row'}}>
                      <div style={{width:'33%',height:"100%",borderRight:'1px solid grey',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>0</p>
                      </div>
                      <div style={{width:'33%',height:"100%",borderRight:'1px solid grey',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>0</p>
                      </div>
                      <div style={{width:'33%',height:"100%",display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>0</p>
                      </div>
                    </div>
                    <div style={{width:'100%',height:'32%',display:'flex',flexDirection:'row'}}>
                      <div style={{width:'100%',height:"100%",display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <p>TOTAL: 0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{width:'25%',height:600,backgroundColor:'ghostwhite',borderTop:'2px solid lightgrey',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
            <div style={{display:'flex',flexDirection:'column',width:'97%',margin:'1%',alignItems:'center',justifyContent:'space-evenly',height:'92%',color:'black',backgroundColor:'ghostwhite'}}>
                  <div className='calendar-container'>
                    <Calendar onChange={setDate} value={date} />
                  </div>
                  <p style={{fontSize:16}}>Your appointments for {date.toDateString()}</p>
                  <div style={{width:'100%',height:'80%',backgroundColor:'white',overflowY:'scroll',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    {
                      clickedDayApp.length<1?
                      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                        <div style={{width:'80%',height:'90%',marginTop:'10%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <NoData/>
                        </div>
                        <p style={{color:'black',fontSize:20}}>NO APPOINTMENTS ON THIS DATE</p>
                      </div>
                      :
                      <>
                        {
                          clickedDayApp.map((doc)=>(
                            <div style={{width:'98%',height:40,marginTop:10,backgroundColor:'rgb(0,0,60)',display:'flex',alignSelf:'center',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                              <div style={{width:'50%',height:'100%',display:'flex',alignItems:'center',justifyContent:'start'}}>
                                <p style={{fontSize:10,color:'white',marginLeft:20}}>{doc.name}</p>
                              </div>
                              <div style={{width:'20%',height:'100%',display:'flex',alignItems:'center',justifyContent:'start'}}>
                                <p style={{fontSize:12,color:'white',marginLeft:20}}>{doc.time}</p>
                              </div>
                              <div style={{width:'30%',height:'100%',display:'flex',alignItems:'center',justifyContent:'start'}}>
                                <p style={{fontSize:12,color:'white',marginLeft:20}}>{doc.purpose}</p>
                              </div>
                            </div>
                          ))
                        }
                      </>
                    }
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    
  )
}

export default Dashboard