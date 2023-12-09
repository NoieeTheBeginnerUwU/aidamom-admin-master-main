import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faBell, faBox, faCake, faCakeCandles, faCalendarAlt, faCalendarXmark, faCircleInfo, faCirclePlus, faClose, faCoffee, faDroplet, faEllipsisVertical, faExclamationCircle, faList, faListDots, faListSquares, faMailBulk, faMailForward, faMapMarked, faMobile, faMobilePhone, faP, faPhone, faPlayCircle, faPlus, faPlusCircle, faRectangleAd, faRectangleList, faRuler, faSearch, faSquare, faTicket, faUserCircle, faUserPlus, faUsersRectangle, faUsersViewfinder, faWeightScale } from '@fortawesome/free-solid-svg-icons'
import "../styles/Users.css";
import Appointment from './Appointment';
//Import Firebase
import { authentication } from '../config/firebase';
import { database } from '../config/firebase';
import { getDocs, collection, setDoc, doc, updateDoc, query, orderBy, where, addDoc } from 'firebase/firestore';
import moment from 'moment/moment';
import "../App.css"
//datetiime picker
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
//date range picker
import { DateRangePicker } from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from 'date-fns'

//recharts
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Tables = () => {
  const [value, onChange] = useState(new Date());
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [pendings, setPending] = useState([]);
  const [reminder, setReminder] = useState(false);
  //const id = authentication.currentUser.uid;
  const [documentId, setDocumentId] = useState();
  const [active, setActive] = useState("users");
  const [showFull, setShowFull] = useState(false);
  const [view, setView] = useState("list");
  let pic = "../../RHU.jpg"
  //other medical stuff
  const [bloodPressure, setBloodPressure] = useState();
  const [weight, setWeight] = useState(0);
  const [otherInfo, setOtherInfo] = useState(0);
  const [lastPeriod, setLastPeriod] = useState();
  const [page, setPage] = useState(1);
  //get the uid 
 // const uid = id.toString();
  var date = new Date(); 
  var currentDate = moment(date, "YYYY/MM/DD");
  async function fetchData(){
    const querySnapshot = await getDocs(query(collection(database, 'userData')));
    const userData = [];
    const pending = [];
    let i = 1;
    const data = querySnapshot.forEach(doc=>{
      if(doc.data().fName!==""){
        userData.push({count:i++,id:doc.id, fName:doc.data().userFname,
          mName:doc.data().userMname,
          lName:doc.data().userLname,
           number:doc.data().userNumber,
           birthday:doc.data().userBirthdate,
           userPic:doc.data().userPic,
           lastPeriod:doc.data().lastPeriod,
           weeksPregnant:moment(currentDate,"YYYY/MM/DD").diff(doc.data().lastPeriod,"weeks"),
           email:doc.data().userEmail,
           userAddress:doc.data().userAddress,
           question1:doc.data().question1,
           question2:doc.data().question2,
           question3:doc.data().question3,
           question4:doc.data().question4,
           question5:doc.data().question5,
           dateCreated:doc.data().dateCreated,
           bloodPressure:doc.data().bloodPressure,
           lastPeriod:doc.data().lastPeriod,
           otherInfo:doc.data().otherInfo,
           height:doc.data().height,
           weight:doc.data().weight,
           status:doc.data().status,
           dateUpdated:doc.data().dateUpdated,
           userLevel:doc.data().userLevel});
      }
      if(doc.data().status==="pending"){
        pending.push({id:doc.id, fName:doc.data().userFname,
          mName:doc.data().userMname,
          lName:doc.data().userLname,
           number:doc.data().userNumber,
           birthday:doc.data().userBirthdate,
           userPic:doc.data().userPic,
           lastPeriod:doc.data().lastPeriod,
           weeksPregnant:moment(currentDate,"YYYY/MM/DD").diff(doc.data().lastPeriod,"weeks"),
           email:doc.data().userEmail,
           userAddress:doc.data().userAddress,
           question1:doc.data().question1,
           question2:doc.data().question2,
           question3:doc.data().question3,
           question4:doc.data().question4,
           question5:doc.data().question5,
           dateCreated:doc.data().dateCreated,
           bloodPressure:doc.data().bloodPressure,
           lastPeriod:doc.data().lastPeriod,
           otherInfo:doc.data().otherInfo,
           height:doc.data().height,
           weight:doc.data().weight,
           status:doc.data().status,
           dateUpdated:doc.data().dateUpdated,
           userLevel:doc.data().userLevel
          });
      }
    })
    setDocuments(userData);
    setDocument(userData);
    setPending(pending);
    //var i = 1;
    //alert("running "+i++ +" times")
  };
  const [userData, setUserData] = useState([])

  async function fetchUser(d){
    let user = [];
    const querySnapshot = await getDocs(query(collection(database, 'appointments'),where("uid","==",d)),orderBy("dateMade","desc"));
    querySnapshot.forEach((doc)=>{
        user.push({id:doc.id,appointmentDate:doc.data().appointmentDate,dateMade:doc.data().dateMade,purpose:doc.data().purpose,status:doc.data().status,time:doc.data().time})
      })
      setUserData(user);

      console.log(userData);
  }
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  let today = new Date();
  const year = moment(today).format("YYYY");
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

  const [vax, setVax] = useState([]);
  useEffect(()=>{
    const fetchVac = async() => {
        let userData = [];
        const queryImmunization = await getDocs(query(collection(database,"child")));
        queryImmunization.forEach((doc)=>{
            userData.push({
              ...doc.id,  
            })
        })
        setVax(userData)
    }
    fetchVac();
  },[])
  


  useEffect(()=>{
    const dateNow = moment(today, "YYYY/MM/DD");
    async function fetchAppointments(){
       const querySnapshot = await getDocs(query(collection(database, 'appointments'),where("year","==",year)));
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
       let q = 1;
       const data = querySnapshot.forEach(doc=>{
          appointments.push({id:doc.id,  
            count:q++,
           name: doc.data().name,
           purpose: doc.data().purpose,
           time: doc.data().time,
           dateTime: doc.data().appointmentDate + " " + doc.data().time,
           remarks:doc.data().remarks,
           bmi:doc.data().bmi,
           bloodPressure:doc.data().larger+"/"+doc.data().lower,
           weight:doc.data().weight,
           height:doc.data().height
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

  const [reminderDate, setReminderDate] = useState("");
  const [reminderTimes, setReminderTime] = useState("");
  const [timesIn, setTimesIn] = useState([]);
  const [reminderNote, setReminderNote] = useState(""); 
  let today1 = moment(date).format("YYYY/MM/DD hh:mm a")

  async function fetchReminders(){
    let thisDay = moment(today1, "YYYY/MM/DD")
    const querySnapshot = await getDocs(query(collection(database, 'reminders')));
    const sorted = [];
    const userData = [];
    const times = [];
    const notes = [];
    let date_ = "";
    let time_ = "";
    let remind_ = "";
    let alarms = [];
    let i = 1;
    let reminders = querySnapshot;
    reminders.docs.map((doc)=>{
      sorted.push({count:i++,id:doc.id,dateMade:doc.data().dateMade,date:doc.data().dates,time:doc.data().times,note:doc.data().note,uid:doc.data().uid})
    })
    setReminders(sorted);
    console.log("reminders",sorted);
  };


  useEffect(()=> {
    fetchReminders();
    fetchData();
  },[]);

  async function handleChanges(){
    try {
      const querySnapshot = await updateDoc(doc(database,"userData",active),{
        bloodPressure: bloodPressure,
        lastPeriod: lastPeriod,
        weight: weight,
        height: otherInfo,
        dateUpdated: currentDate.toString()
      });
      alert("Changes saved in " + active);
      fetchData();
    } catch (error) {
      alert(error)
    }
  }

  useEffect(()=>{
    if(showFull===false){
      setActive("");
    }
    
  })

  const [time, setTime] = useState('12:00 AM');

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const [note, setNote] = useState("");
  const [timeRange, setTimeRange] = useState();
  const saveReminder = () => {
    try{
      if(range!==""&&note!==""&&timeRange!==""){
        addDoc(collection(database,"reminders"),{
          uid: active,
          dates: range,
          note: note,
          times: value,
          date: moment(new Date()).format("YYYY/MM/DD"),
          day: moment(new Date()).format("YYYY/MM/DD"),
          month: moment(new Date()).format("YYYY/MM/DD"),
          year: moment(new Date()).format("YYYY/MM/DD"),
        }).then(alert("Reminder added successfully."));
        setReminder(false)
      }else{
        alert("Please fill up all necessary inputs, thank you.") 
      }
    }catch(e){
      console.log(e);
      alert(e);
    }
  }

    async function search(vals){
      let ins = [];
      let docs = documents;
      try{
        let fun = documents.map((doc)=>{
          if(vals!==""){
          let val = vals.toLowerCase();
          if(doc.email.toLowerCase().includes(val)||doc.fName.toLowerCase().includes(val)||doc.lName.toLowerCase().includes(val)||doc.number.includes(val)||doc.mName.toLowerCase().includes(val)){
            ins.push({id:doc.id, fName:doc.fName,
              mName:doc.mName,
              lName:doc.lName,
                number:doc.number,
                birthday:doc.birthday,
                userPic:doc.userPic,
                lastPeriod:doc.lastPeriod,
                weeksPregnant:moment(currentDate,"YYYY/MM/DD").diff(doc.lastPeriod,"weeks"),
                email:doc.email,
                userAddress:doc.userAddress,
                question1:doc.question1,
                question2:doc.question2,
                question3:doc.question3,
                question4:doc.question4,
                question5:doc.question5,
                dateCreated:doc.dateCreated,
                bloodPressure:doc.bloodPressure,
                lastPeriod:doc.lastPeriod,
                otherInfo:doc.otherInfo,
                height:doc.height,
                weight:doc.weight,
                status:doc.status,
                dateUpdated:doc.dateUpdated,
                userLevel:doc.userLevel})
          }
          if(vals===""){
            setDocument(docs)
          }
          else{
            setDocument(docs)
          }
          }else{
            setDocument(docs)
          }
        })
          setDocument(ins)
      }catch(e){
        setDocument(docs)
      }
      if(vals===""){
        setDocument(docs)
      }
      console.log(document)
    }

      //date range picker
    // date state
    const [range, setRange] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ])
  
    // open close
    const [open, setOpen] = useState(true)
  
    // get the target element to toggle 
    const refOne = useRef(null)

    //end of daate range picker

    const dKey = [
      {
        name: 'January',
        count: jan
      },
      {
        name: 'February',
        count: feb
      },
      {
        name: 'March',
        count: mar
      },
      {
        name: 'April',
        count: apr
      },
      {
        name: 'May',
        count: may
      },
      {
        name: 'June',
        count: jun
      },
      {
        name: 'July',
        count: jul
      },
      {
        name: 'August',
        count: aug
      },
      {
        name: 'September',
        count: sep
      },
      {
        name: 'October',
        count: oct
      },
      {
        name: 'November',
        count: nov
      },
      {
        name: 'December',
        count: dec
      }
    ]

    const updatePeriod = async (id) => {
      try {
        updateDoc(doc(database,"onlineAppointments",id),{
          status:"approved"
        });
      } catch (error) {
        alert(error)
      }
    }

    const [activeTable, setActiveTable] = useState("users");

    const [cont, setCont] = useState([]);
    async function fetchContent(){
      let data = [];
      let i = 1;
      const queryData = await getDocs(collection(database, 'articles'))
      queryData.forEach((doc)=>{
        data.push({count:i++,id:doc.id, title:doc.data().title,author:doc.data().author, content:doc.data().content,topic:doc.data().topic,dateMade:doc.data().dateMade})
      })
      setCont(data);
    }

    useEffect(()=>{
      fetchContent();
    },[])

    const [vaxx, setVaxx] = useState([])
    useEffect(()=>{
      let userData = [];
      let i = 1;
      const fetchVaxx = async() => {
        const queryData = await getDocs(query(collection(database,"immunization")));
        queryData.forEach((doc)=>{
          userData.push({count:i++,id:doc.id, name:doc.data().name,appointmentDate:doc.data().appointmentDate,vaccine:doc.data().vaccine})
        })
        setVaxx(userData);
      }
      fetchVaxx()
    },[])


    const [supps, setSupps] = useState([]);
    useEffect(()=>{
      let userData = [];
      let i = 1;
      const fetchSupps = async() => {
        const queryData = await getDocs(query(collection(database,"perscriptions")));
        queryData.forEach((doc)=>{
          userData.push({count:i++,id:doc.id, name:doc.data().name,appointmentDate:doc.data().appointmentDate,supplement:doc.data().supplement,timesToTake:doc.data().timesToTake,from:doc.data().from,to:doc.data().to,amount:doc.data().amount})
        })
        setSupps(userData);
      }
      fetchSupps()
    },[])



  return (
    // <div style={{width:'100%',height:'100vh',background:'transparent',display:'flex',flexDirection:'column',color:'black',transition:"ease-in-out",animation:'ease-in-out',transitionDuration:'.7s',animationDelay:'1s',}}>
    //   <div style={{width:'100%',height:'8vh',backgroundColor:'transparent', display:'flex',alignItems:'center',justifyContent:'center'}}>
    //   <div style={{width:'100%',height:'8vh',backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}> 
    //         <h3 style={{color:'grey'}}>Tables</h3>
    //     </div>
    //     <div style={{width:'100%',height:'8vh',backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}> 
    //       <div style={{width:'70%',height:'70%',display:showFull===true?"none":"flex",overflow:'hidden',borderRadius:5,border:'1.2px solid black',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    //         <input className='inputs' onChange={(text)=> search(text.target.value)} type='text' placeholder='search patient' style={{width:600,height:'100%',border:'none',textAlign:'center',fontSize:16,cursor:'vertical-text'}}/>
    //         <div style={{backgroundColor:'navy',width:'15%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
    //           <FontAwesomeIcon icon={faSearch} size='1x' color='white'/>
    //         </div>
    //       </div>
    //     </div>
    //     <div style={{width:'100%',height:'8vh',backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}> 
    //     </div>
    //   </div>
    //   <div style={{width:'100%',height:'90vh',backgroundColor:'ghostwhite',display:'flex',flexDirection:'column'}}>
    //   <div style={{width:'100%',height:'5vh',color:'navy',display:'flex',flexDirection:'row',backgroundColor:'white',fontSize:12,alignItems:'center',justifyContent:'space-evenly'}}>
    //     <div style={{borderBottom:activeTable==="users"&&"2px solid rgb(0,0,70)"}}>
    //         <p onClick={()=> setActiveTable("users")} style={{color:activeTable==="users"?'rgb(0,0,40)':'black',fontWeight:activeTable==="users"?700:500,cursor:'pointer'}}>users table</p>
    //     </div>
    //     <div style={{borderBottom:activeTable==="appointments"&&"2px solid rgb(0,0,70)"}}>
    //         <p onClick={()=> setActiveTable("appointments")}  style={{color:activeTable==="appointments"?'rgb(0,0,40)':'black',fontWeight:activeTable==="appointments"?700:500,cursor:'pointer'}}>appointments table</p>
    //     </div>
    //     <div style={{borderBottom:activeTable==="vaccinations"&&"2px solid rgb(0,0,70)"}}>
    //         <p onClick={()=> setActiveTable("vaccinations")}  style={{color:activeTable==="vaccinations"?'rgb(0,0,40)':'black',fontWeight:activeTable==="vaccinations"?700:500,cursor:'pointer'}}>vaccinations table</p>
    //     </div>
    //     <div style={{borderBottom:activeTable==="supplements"&&"2px solid rgb(0,0,70)"}}>
    //         <p onClick={()=> setActiveTable("supplements")}  style={{color:activeTable==="supplements"?'rgb(0,0,40)':'black',fontWeight:activeTable==="supplements"?700:500,cursor:'pointer'}}>perscriptions</p>
    //     </div>
    //     <div style={{borderBottom:activeTable==="content"&&"2px solid rgb(0,0,70)"}}>
    //         <p onClick={()=> setActiveTable("content")}  style={{color:activeTable==="content"?'rgb(0,0,40)':'black',fontWeight:activeTable==="content"?700:500,cursor:'pointer'}}>content table</p>
    //     </div>
    //     <div style={{borderBottom:activeTable==="reminders"&&"2px solid rgb(0,0,70)"}}>
    //         <p onClick={()=> setActiveTable("reminders")}  style={{color:activeTable==="reminders"?'rgb(0,0,40)':'black',fontWeight:activeTable==="reminders"?700:500,cursor:'pointer'}}>reminders table</p>
    //     </div>
    //   </div>
    //   <div style={{width:'100%',height:'85vh',color:'navy',display:'flex',flexDirection:'column',}}>
    //     {
    //         activeTable==="users"&&
    //         <>
    //         {
    //            view==="list"&&
    //                <div style={{background:'rgb(240,240,240)',color:'navy',width:'100%',height:'100vh',overflowY:'hidden',display:'flex', flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
    //                  {
    //                    showFull===false&&
    //                    <div style={{display:'flex',flexDirection:'row',width:'99%',fontSize:14,height:50,alignItems:'start',justifyContent:"start",backgroundColor:'rgb(0,0,60)'}}>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'5%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              no. 
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'35%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              name
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              date of birth
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              weeks pregnant
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              date registered
    //                            </li>
    //                    </div>
    //                  }
    //                  <div style={{width:'99%',height:'100%',overflow:active==="requests"?"hidden":'scroll',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
    //                    {document.map((doc) => (
    //                      document.length>0?
    //                      <>
    //                      {
    //                        showFull===false&&
    //                        <>
    //                          <div style={{width:'99%',height:50,marginTop:0,fontSize:12,border:'1px solid black',fontSize:'1rem',color:'black',textDecoration:'none',listStyleType:'none',marginTop:0,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
    //                            <ul style={{display:'flex',flexDirection:'row',width:'100%',height:50,alignItems:'start',justifyContent:"start"}}>
    //                              <li style={{color:'black',listStyleType:'none',width:'5%',height:'100%',backgroundColor:'transparent'}}>
    //                                {doc.count}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'35%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.fName}  {doc.mName}  {doc.lName}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {!doc.birthday?"No data":moment(doc.birthday).format("YYYY/MM/DD")}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {isNaN(doc.weeksPregnant)?0:doc.weeksPregnant}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {!doc.dateCreated?"No data":moment(doc.dateCreated).format("YYYY/MM/DD")}
    //                              </li>
    //                            </ul>
    //                            <FontAwesomeIcon icon={faEllipsisVertical} color='grey' size='1x' style={{marginRight:10,cursor:'pointer',}}/>
    //                          </div>
    //                        </>
    //                      }
    //                      </>
    //                      :
    //                      <div style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',marginLeft:'25px',backgroundColor:"white",alignItems:'center',justifyContent:'space-around',margin:15,width:220,height:280,borderRadius:20,boxShadow: "6px 6px 6px 3px #9E9E9E",overflow:'hidden',borderWidth:2,borderColor:'navy',marginBottom:20,cursor:'pointer'}}>
    //                        <FontAwesomeIcon icon={faExclamationCircle} color='orange' size='4x'/>
    //                        <p style={{fontSize:40, color:'black'}}>No Data</p>
    //                      </div>
    //                      ))}
    //                    </div>
    //                </div>
                   
    //            }
    //         </>
    //     }
    //     {
    //         activeTable==="vaccinations"&&
    //         <>
    //         {
    //            view==="list"&&
    //                <div style={{background:'rgb(240,240,240)',color:'navy',width:'100%',height:'100vh',overflowY:'hidden',display:'flex', flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
    //                  {
    //                    showFull===false&&
    //                    <div style={{display:'flex',flexDirection:'row',width:'99%',fontSize:14,height:50,alignItems:'start',justifyContent:"start",backgroundColor:'rgb(0,0,60)'}}>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'5%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              no. 
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'30%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              name
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'25%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              date administered
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'30%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                             vaccine
    //                            </li>

    //                    </div>
    //                  }
    //                  <div style={{width:'99%',height:'100%',overflow:active==="requests"?"hidden":'scroll',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
    //                    {vaxx.map((doc) => (
    //                      vaxx.length>0?
    //                      <>
    //                      {
    //                        showFull===false&&
    //                        <>
    //                          <div style={{width:'99%',height:50,marginTop:0,fontSize:12,border:'1px solid black',fontSize:'1rem',color:'black',textDecoration:'none',listStyleType:'none',marginTop:0,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
    //                            <ul style={{display:'flex',flexDirection:'row',width:'100%',height:50,alignItems:'start',justifyContent:"start"}}>
    //                              <li style={{color:'black',listStyleType:'none',width:'5%',height:'100%',backgroundColor:'transparent',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.count}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'35%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.name}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.appointmentDate}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'40%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.vaccine}
    //                              </li>
    //                            </ul>
    //                            <FontAwesomeIcon icon={faEllipsisVertical} color='grey' size='1x' style={{marginRight:10,cursor:'pointer',}}/>
    //                          </div>
    //                        </>
    //                      }
    //                      </>
    //                      :
    //                      <div style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',marginLeft:'25px',backgroundColor:"white",alignItems:'center',justifyContent:'space-around',margin:15,width:220,height:280,borderRadius:20,boxShadow: "6px 6px 6px 3px #9E9E9E",overflow:'hidden',borderWidth:2,borderColor:'navy',marginBottom:20,cursor:'pointer'}}>
    //                        <FontAwesomeIcon icon={faExclamationCircle} color='orange' size='4x'/>
    //                        <p style={{fontSize:40, color:'black'}}>No Data</p>
    //                      </div>
    //                      ))}
    //                    </div>
    //                </div>
                   
    //            }
    //         </>
    //     }
    //      {
    //         activeTable==="supplements"&&
    //         <>
    //         {
    //            view==="list"&&
    //                <div style={{background:'rgb(240,240,240)',color:'navy',width:'100%',height:'100vh',overflowY:'hidden',display:'flex', flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
    //                  {
    //                    showFull===false&&
    //                    <div style={{display:'flex',flexDirection:'row',width:'99%',fontSize:14,height:50,alignItems:'start',justifyContent:"start",backgroundColor:'rgb(0,0,60)'}}>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'5%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              no. 
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'15%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              name
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'15%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              supplement
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'10%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                             date administered
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'15%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                             from
    //                            </li>
                               
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'15%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                             to
    //                            </li>
    //                             <li style={{color:'white',display:'flex',listStyleType:'none',width:'15%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                             amount
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'10%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                             intake
    //                            </li>
                               

    //                    </div>
    //                  }
    //                  <div style={{width:'99%',height:'100%',overflow:active==="requests"?"hidden":'scroll',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
    //                    {supps.map((doc) => (
    //                      supps.length>0?
    //                      <>
    //                      {
    //                        showFull===false&&
    //                        <>
    //                          <div style={{width:'99%',height:50,marginTop:0,fontSize:12,border:'1px solid black',fontSize:'1rem',color:'black',textDecoration:'none',listStyleType:'none',marginTop:0,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
    //                            <ul style={{display:'flex',flexDirection:'row',width:'100%',height:50,alignItems:'start',justifyContent:"start"}}>
    //                              <li style={{color:'black',listStyleType:'none',width:'5%',height:'100%',backgroundColor:'transparent',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.count}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'15%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.name}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'15%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.supplement}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'10%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.appointmentDate}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'15%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.from}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'15%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.to}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'15%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.amount} pcs
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'10%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.timesToTake}
    //                              </li>
    //                            </ul>
    //                            <FontAwesomeIcon icon={faEllipsisVertical} color='grey' size='1x' style={{marginRight:10,cursor:'pointer',}}/>
    //                          </div>
    //                        </>
    //                      }
    //                      </>
    //                      :
    //                      <div style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',marginLeft:'25px',backgroundColor:"white",alignItems:'center',justifyContent:'space-around',margin:15,width:220,height:280,borderRadius:20,boxShadow: "6px 6px 6px 3px #9E9E9E",overflow:'hidden',borderWidth:2,borderColor:'navy',marginBottom:20,cursor:'pointer'}}>
    //                        <FontAwesomeIcon icon={faExclamationCircle} color='orange' size='4x'/>
    //                        <p style={{fontSize:40, color:'black'}}>No Data</p>
    //                      </div>
    //                      ))}
    //                    </div>
    //                </div>
                   
    //            }
    //         </>
    //     }
    //             {
    //         activeTable==="appointments"&&
    //         <>
    //         {
    //            view==="list"&&
    //                <div style={{background:'rgb(240,240,240)',color:'navy',width:'100%',height:'100vh',overflowY:'hidden',display:'flex', flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
    //                  {
    //                    showFull===false&&
    //                    <div style={{display:'flex',flexDirection:'row',width:'99%',fontSize:14,height:50,alignItems:'start',justifyContent:"start",backgroundColor:'rgb(0,0,60)'}}>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'5%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              no. 
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'35%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              name
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              bmi
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              weeks pregnant
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              remarks
    //                            </li>
    //                    </div>
    //                  }
    //                  <div style={{width:'99%',height:'100%',overflow:active==="requests"?"hidden":'scroll',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
    //                    {appointmentsToday.map((doc) => (
    //                      appointmentsToday.length>0?
    //                      <>
    //                      {
    //                        showFull===false&&
    //                        <>
    //                          <div style={{width:'99%',height:50,marginTop:0,fontSize:12,border:'1px solid black',fontSize:'1rem',color:'black',textDecoration:'none',listStyleType:'none',marginTop:0,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
    //                            <ul style={{display:'flex',flexDirection:'row',width:'100%',height:50,alignItems:'start',justifyContent:"start"}}>
    //                              <li style={{color:'black',listStyleType:'none',width:'5%',height:'100%',backgroundColor:'transparent'}}>
    //                                {doc.count}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'35%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.name}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.bmi}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.purpose}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.remarks}
    //                              </li>
    //                            </ul>
    //                            <FontAwesomeIcon icon={faEllipsisVertical} color='grey' size='1x' style={{marginRight:10,cursor:'pointer',}}/>
    //                          </div>
    //                        </>
    //                      }
    //                      </>
    //                      :
    //                      <div style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',marginLeft:'25px',backgroundColor:"white",alignItems:'center',justifyContent:'space-around',margin:15,width:220,height:280,borderRadius:20,boxShadow: "6px 6px 6px 3px #9E9E9E",overflow:'hidden',borderWidth:2,borderColor:'navy',marginBottom:20,cursor:'pointer'}}>
    //                        <FontAwesomeIcon icon={faExclamationCircle} color='orange' size='4x'/>
    //                        <p style={{fontSize:40, color:'black'}}>No Data</p>
    //                      </div>
    //                      ))}
    //                    </div>
    //                </div>
                   
    //            }
    //         </>
    //     }
    //       {
    //         activeTable==="reminders"&&
    //         <>
    //         {
    //            view==="list"&&
    //                <div style={{background:'rgb(240,240,240)',color:'navy',width:'100%',height:'100vh',overflowY:'hidden',display:'flex', flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
    //                  {
    //                    showFull===false&&
    //                    <div style={{display:'flex',flexDirection:'row',width:'99%',fontSize:14,height:50,alignItems:'start',justifyContent:"start",backgroundColor:'rgb(0,0,60)'}}>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'5%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              no. 
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'35%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              uid
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              date
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              time
    //                            </li>
    //                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                              note
    //                            </li>
    //                    </div>
    //                  }
    //                  <div style={{width:'99%',height:'100%',overflow:active==="requests"?"hidden":'scroll',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
    //                    {reminders.map((doc) => (
    //                      reminders.length>0?
    //                      <>
    //                      {
    //                        showFull===false&&
    //                        <>
    //                          <div style={{width:'99%',height:50,marginTop:0,fontSize:12,border:'1px solid black',fontSize:'1rem',color:'black',textDecoration:'none',listStyleType:'none',marginTop:0,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
    //                            <ul style={{display:'flex',flexDirection:'row',width:'100%',height:50,alignItems:'start',justifyContent:"start"}}>
    //                              <li style={{color:'black',listStyleType:'none',width:'5%',height:'100%',backgroundColor:'transparent'}}>
    //                                {doc.count}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'35%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.uid}
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
         
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
      
    //                              </li>
    //                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                                {doc.note}
    //                              </li>
    //                            </ul>
    //                            <FontAwesomeIcon icon={faEllipsisVertical} color='grey' size='1x' style={{marginRight:10,cursor:'pointer',}}/>
    //                          </div>
    //                        </>
    //                      }
    //                      </>
    //                      :
    //                      <div style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',marginLeft:'25px',backgroundColor:"white",alignItems:'center',justifyContent:'space-around',margin:15,width:220,height:280,borderRadius:20,boxShadow: "6px 6px 6px 3px #9E9E9E",overflow:'hidden',borderWidth:2,borderColor:'navy',marginBottom:20,cursor:'pointer'}}>
    //                        <FontAwesomeIcon icon={faExclamationCircle} color='orange' size='4x'/>
    //                        <p style={{fontSize:40, color:'black'}}>No Data</p>
    //                      </div>
    //                      ))}
    //                    </div>
    //                </div>
                   
    //            }
              
    //         </>
    //     }
    //      {
    //             activeTable==="content"&&
    //             view==="list"&&
    //             <div style={{background:'rgb(240,240,240)',color:'navy',width:'100%',height:'100vh',overflowY:'hidden',display:'flex', flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
    //               {
    //                 showFull===false&&
    //                 <div style={{display:'flex',flexDirection:'row',width:'99%',fontSize:14,height:50,alignItems:'start',justifyContent:"start",backgroundColor:'rgb(0,0,60)'}}>
    //                         <li style={{color:'white',display:'flex',listStyleType:'none',width:'5%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                           no. 
    //                         </li>
    //                         <li style={{color:'white',display:'flex',listStyleType:'none',width:'35%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                           title
    //                         </li>
    //                         <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                           author
    //                         </li>
    //                         <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                           date
    //                         </li>
    //                         <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
    //                           content
    //                         </li>
    //                 </div>
    //               }
    //               <div style={{width:'99%',height:'100%',overflow:active==="requests"?"hidden":'scroll',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
    //                 {cont.map((doc) => (
    //                   cont.length>0?
    //                   <>
    //                   {
    //                     showFull===false&&
    //                     <>
    //                       <div style={{width:'99%',height:50,marginTop:0,fontSize:12,border:'1px solid black',fontSize:'1rem',color:'black',textDecoration:'none',listStyleType:'none',marginTop:0,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
    //                         <ul style={{display:'flex',flexDirection:'row',width:'100%',height:50,alignItems:'start',justifyContent:"start"}}>
    //                           <li style={{color:'black',listStyleType:'none',width:'5%',height:'100%',backgroundColor:'transparent'}}>
    //                             {doc.count}
    //                           </li>
    //                           <li style={{color:'black',display:'flex',listStyleType:'none',width:'35%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                             {doc.author}
    //                           </li>
    //                           <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                             {doc.title}
    //                           </li>
    //                           <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12}}>
    //                             {moment(doc.dateMade).format("YYYY/MM/DD")}
    //                           </li>
    //                           <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:12,overflow:"hidden",lineHeight:2}}>
    //                             {doc.content}
    //                           </li>
    //                         </ul>
    //                         <FontAwesomeIcon icon={faEllipsisVertical} color='grey' size='1x' style={{marginRight:10,cursor:'pointer',}}/>
    //                       </div>
    //                     </>
    //                   }
    //                   </>
    //                   :
    //                   <div style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',marginLeft:'25px',backgroundColor:"white",alignItems:'center',justifyContent:'space-around',margin:15,width:220,height:280,borderRadius:20,boxShadow: "6px 6px 6px 3px #9E9E9E",overflow:'hidden',borderWidth:2,borderColor:'navy',marginBottom:20,cursor:'pointer'}}>
    //                     <FontAwesomeIcon icon={faExclamationCircle} color='orange' size='4x'/>
    //                     <p style={{fontSize:40, color:'black'}}>No Data</p>
    //                   </div>
    //                   ))}
    //                 </div>
    //             </div>
    //            }
        
    //   </div>
    //   </div>
    // </div>
    <div>

      <Appointment/>
    </div>
  )
}

export default Tables