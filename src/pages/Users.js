import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faBell, faBox, faCake, faCakeCandles, faCalendarAlt, faCalendarXmark, faCircleInfo, faCirclePlus, faClose, faCoffee, faDroplet, faEllipsisVertical, faExclamationCircle, faList, faListDots, faListSquares, faMailBulk, faMailForward, faMapMarked, faMobile, faMobilePhone, faP, faPhone, faPlayCircle, faPlus, faPlusCircle, faRectangleAd, faRectangleList, faRuler, faSearch, faSquare, faTicket, faUserCircle, faUserPlus, faUsersRectangle, faUsersViewfinder, faWeightScale } from '@fortawesome/free-solid-svg-icons'
import "../styles/Users.css";
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



const Users = () => {
  const [value, onChange] = useState(new Date());
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [pendings, setPending] = useState([]);
  const [reminder, setReminder] = useState(false);
  //const id = authentication.currentUser.uid;
  const [documentId, setDocumentId] = useState();
  const [active, setActive] = useState();
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
      fetchReminders(d);
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

  const [reminderDate, setReminderDate] = useState("");
  const [reminderTimes, setReminderTime] = useState("");
  const [timesIn, setTimesIn] = useState([]);
  const [reminderNote, setReminderNote] = useState(""); 
  let today1 = moment(date).format("YYYY/MM/DD hh:mm a")

  async function fetchReminders(id){
    let thisDay = moment(today1, "YYYY/MM/DD")
    const querySnapshot = await getDocs(query(collection(database, 'reminders'),where("user","==",id)));
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
      sorted.push({date:doc.data().dates,time:doc.data().times,note:doc.data().note})
    })
    setReminders(sorted);
    console.log("reminders",sorted);
  };


  useEffect(()=> {
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


  return (
    <div style={{width:'100%',height:'100vh',background:'transparent',display:'flex',flexDirection:'column',color:'black',}}>
      <div style={{width:'100%',height:'8vh',backgroundColor:'transparent', display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:'100%',height:'8vh',backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}> 
            <h3 style={{color:'grey'}}>Clients</h3>
        </div>
        <div style={{width:'100%',height:'8vh',backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}> 
          <div style={{width:'96%',height:'60%',display:showFull===true?"none":"flex",overflow:'hidden',borderRadius:10,border:'1.2px solid black',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <input className='inputs' onChange={(text)=> search(text.target.value)} type='text' placeholder='search user' style={{width:600,height:'100%',border:'none',textAlign:'center',fontSize:16,cursor:'vertical-text'}}/>
            <div style={{backgroundColor:'navy',width:'15%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
              <FontAwesomeIcon icon={faSearch} size='1x' color='white'/>
            </div>
          </div>
        </div>
        <div style={{width:'100%',height:'8vh',backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}> 
          <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            {
              active!==""&&
              <div  onClick={()=> [setShowFull(!showFull),]} style={{width:120,height:35,backgroundColor:'navy',borderRadius:8,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',cursor:"pointer"}}>
                  <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <p style={{margin:'4%',color:'white',fontSize:16}}>Go Back</p>
                  </div>
              </div>
            }
          </div> 
        </div>
      </div>
      <div style={{width:'100%',height:'90vh',backgroundColor:'ghostwhite',display:'flex',flexDirection:'row'}}>
      <div style={{width:'100%',height:'90vh',color:'navy',display:'flex',flexDirection:'column',backgroundColor:'rebeccapurple'}}>
        <div style={{width:'100%',height:active===""?50:0||showFull===true&&0,backgroundColor:'ghostwhite',display:active==="requests"?"none":'flex',alignItems:'center',justifyContent:'end'}}>
          {
            active===""&&
            <>
            <div onClick={()=> setView("list")} style={{width:100,height:'70%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',border:'1px solid lightgrey',marginRight:10,cursor:'pointer',backgroundColor:view==="list"?'lightgray':'white'}}>
              <FontAwesomeIcon icon={faList} size='1x' color='grey'/>
              <p style={{fontSize:12,color:'black',fontWeight:700}}>list view</p>
            </div>
            <div onClick={()=> setView("card")}  style={{width:100,height:'70%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',border:'1px solid lightgrey',marginRight:20,cursor:'pointer',backgroundColor:view==="card"?'lightgray':'white'}}>
              <FontAwesomeIcon icon={faSquare} size='1x' color='grey'/>
              <p style={{fontSize:12,color:'black',fontWeight:700}}>card view</p>
            </div>
            </>
          }
        </div>
          {
            view==="card"&&
                <div style={{background:'rgb(240,240,240)',color:'navy',width:'100%',height:'100vh',overflowY:'scroll',display:'flex', flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'start'}}>
                  {document.map((doc) => (
                    document.length>0?
                    <>
                     {
                      showFull===false&&
                      <>
                          <li  key={doc.id} onClick={()=> [setActive(doc.id), setShowFull(!showFull),fetchUser(doc.id)]} style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',marginLeft:'25px',backgroundColor:"white",alignItems:'center',justifyContent:'space-around',margin:15,width:220,height:280,borderRadius:20,boxShadow: "6px 6px 6px 3px #9E9E9E",overflow:'hidden',borderWidth:2,borderColor:'navy',marginBottom:20,cursor:'pointer'}}>
                            <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center'}}>
                              <div style={{display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center',width:'100%',height:'100%',}}>
                                <div stle={{width:'100%',height:100,borderRadius:50,backgroundColor:'navy',alignSelf:'center'}}></div>
                                <div className='profPic' style={{width:90,height:90,borderRadius:20,backgroundColor:'lightgray',alignSelf:'center',backgroundImage:doc.userPic===""?`url(${pic})`:`url(${doc.userPic})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}}>

                                </div>
                                <div style={{marginTop:30}}>
                                  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',}}>
                                    <p style={{color:'navy',fontSize:16,fontWeight:700}}>{doc.fName}</p>
                                    <p style={{color:'navy',fontSize:16,fontWeight:700}}>{doc.mName}</p>
                                    <p style={{color:'navy',fontSize:16,fontWeight:700}}>{doc.lName}</p>
                                  </div>
                                  <p style={{color:'skyblue',fontSize:16,fontWeight:600, margin:10 }}>{isNaN(doc.weeksPregnant)?0:doc.weeksPregnant} weeks pregnant</p>
                                  <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                    <FontAwesomeIcon icon={faMailBulk} size='2x' color='orange'/>
                                    <p style={{color:'navy',fontSize:12,fontWeight:400, }}>{doc.email}</p>
                                  </div>
                                  <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                    <FontAwesomeIcon icon={faMobilePhone} size='2x' color='blue'/>
                                    <p style={{color:'navy',fontSize:12,fontWeight:400, }}>{doc.number}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                      </>
                     }
                     {
                      active===doc.id&&showFull===true&&
                      <div style={{width:'100%',height:'90vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'start',backgroundColor:'white'}}>     
                          {
                            reminder===true&&
                            <div style={{width:'70%',height:'80%',boxShadow:'2px 5px 10px 2px navy',backgroundColor:'ghostwhite',zIndex:100,position:'fixed',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
                              <div style={{width:'100%',height:'8%',display:'flex',flexDirection:'row',alignItems:'start',justifyContent:'space-between'}}>
                              <div/>
                              <p style={{color:'grey'}}>Add a reminder</p>
                                <FontAwesomeIcon icon={faClose} size='1x' color='black' onClick={()=> setReminder(!reminder)} style={{margin:'1%',cursor:'pointer'}}/>
                              </div>
                              <div style={{width:'100%',height:'92%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <div style={{width:'40%',height:'100%',display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'column',alignSelf:'start',backgroundColor:'navy'}}>
                                      <div style={{width:'100%',height:'50%'}}>
                                      <select name="cars" id="cars" onChange={(d)=> setTimeRange(d.target.value)} style={{width:'100%',height:40,fontSize:17}}>
                                            <option value="12:00 am">12:00 am</option>
                                            <option value="1:00 am">1:00 am</option>
                                            <option value="2:00 am">2:00 am</option>
                                            <option value="3:00 am">3:00 am</option>
                                            <option value="4:00 am">4:00 am</option>
                                            <option value="5:00 am">5:00 am</option>
                                            <option value="6:00 am">6:00 am</option>
                                            <option value="7:00 am">7:00 am</option>
                                            <option value="8:00 am">8:00 am</option>
                                            <option value="9:00 am">9:00 am</option>
                                            <option value="10:00 am">10:00 am</option>
                                            <option value="11:00 am">11:00 am</option>
                                            <option value="2:00 pm">12:00 pm</option>
                                            <option value="1:00 pm">1:00 pm</option>
                                            <option value="2:00 pm">2:00 pm</option>
                                            <option value="3:00 pm">3:00 pm</option>
                                            <option value="4:00 pm">4:00 pm</option>
                                            <option value="15:00 pm">5:00 pm</option>
                                            <option value="6:00 pm</">6:00 pm</option>
                                            <option value="7:00 pm">7:00 pm</option>
                                            <option value="8:00 pm">8:00 pm</option>
                                            <option value="9:00 pm">9:00 pm</option>
                                            <option value="10:00 pm">10:00 pm</option>
                                            <option value="11:00 pm">11:00 pm</option>
                               
                                        </select>
                                      </div>
                                      <div style={{width:'100%',height:'50%'}}>
                                        <textarea cols={50} rows={5} style={{width:'96%',height:'90%',padding:10,outline:'none',textAlign:'left',fontSize:16, border:'none', margin:'2%', backgroundColor:'white',overflow:'scroll'}} onChange={(text)=> setNote(text.target.value)} placeholder='type your reminders here.' />
                                      </div>
                                    </div>
                                    <div style={{width:'60%',height:'98%',display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row',}}>
                                      <div className="calendarWrap">
                                          <div ref={refOne}>
                                            {open===true && 
                                              <DateRangePicker
                                                onChange={item => [setRange([item.selection])]}
                                                editableDateInputs={true}
                                                moveRangeOnFirstSelection={false}
                                                ranges={range}
                                                months={1}
                                                direction="horizontal"
                                                className="calendarElement"
                                              />
                                            }
                                          </div> 
                                      </div>
                                    </div>
                              </div>
                              <div style={{width:'100%',height:40,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <div style={{width:'100%',height:30,backgroundColor:'ghostwhite',borderRadius:8,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',cursor:"pointer"}}>
                                    <div onClick={()=> setReminder(!reminder)} style={{width:120,height:30,margin:'1%',display:'flex',backgroundColor:'grey',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{margin:'4%',color:'white',fontSize:16}}>cancel</p>
                                    </div>
                                    <div onClick={()=> saveReminder()} style={{width:120,height:30,margin:'1%',display:'flex',flexDirection:'row',backgroundColor:'rgb(0,0,60)',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{margin:'4%',color:'white',fontSize:16}}>submit</p>
                                    </div>
                                </div>
                              </div>
                            </div>
                          }                                                                                                                                                                                
                        <div style={{width:'100%',height:'60%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',backgroundColor:'transparent',backgroundColor:'ghostwhite'}}>
                          <div style={{width:700,height:'90%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',boxShadow:'4px 1px 6px 4px lightgrey'}}>
                            <div style={{width:'50%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                <p style={{color:'black'}}>{doc.fName} {doc.mName} {doc.lName}</p>
                                <p>{doc.userAddress}</p>
                                <p>{doc.userEmail}</p>
                                <p>{doc.umber}</p>
                            </div>
                            <div style={{width:'50%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <LineChart width={'100%'} height={180} data={dKey}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid stroke="lightgrey" strokeDasharray="4 4"/>
                                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                                  </LineChart>
                            </div>
                          </div>
                          <div style={{width:350,height:'92%',backgroundColor:'navy',borderRadius:0,border:'2px solid lightgrey',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <div style={{width:350,height:30,backgroundColor:'rgb(0,0,60)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                              <p style={{color:'white',fontWeight:600,fontSize:16}}>reminders</p>
                            </div>
                            <div style={{width:350,height:'90%',backgroundColor:'white',borderRadius:0,border:'1px solid lightgrey',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                              <div style={{width:'100%',height:'86%',overflowY:'scroll'}}>
                                {
                                  reminders.map((doc)=>(
                                    <div style={{width:'100%',height:50,backgroundColor:'rgb(0,0,60)',fontSize:10,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:20,color:'white',}}>
                                      <p style={{width:'40%'}}>{doc.date}</p>
                                      <p>{doc.time}</p>
                                      <p>{doc.note}</p>
                                    </div>
                                  ))
                                }
                              </div>
                              <div style={{width:'100%',height:'14%',display:'flex',alignItems:'center',justifyContent:'center',}}>
                                <div onClick={()=> [setReminder(!reminder)]} style={{cursor:'pointer',width:'100%',height:'100%',border:'2px dashed skyblue',borderRadius:5,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                 <FontAwesomeIcon icon={faPlus} color='skyblue' size='1x'/>
                                 <p style={{color:'skyblue',marginLeft:6,fontSize:18,fontWeight:700}}>Add reminder</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{width:'98%',height:'40%',border:'1px solid lightgrey',overflow:'hidden',backgroundColor:'white',display:"flex",flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
                          {
                            userData.map((doc)=> (
                              <div style={{width:'100%',height:50,backgroundColor:'rgb(0,0,60)',fontSize:10,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:20,color:'white',}}>
                                <p style={{width:'40%'}}>{doc.date}</p>
                                <p>{doc.time}</p>
                                <p>{doc.note}</p>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                     }
                    </>
                    :
                    <div style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',marginLeft:'25px',backgroundColor:"white",alignItems:'center',justifyContent:'space-around',margin:15,width:220,height:280,borderRadius:20,boxShadow: "6px 6px 6px 3px #9E9E9E",overflow:'hidden',borderWidth:2,borderColor:'navy',marginBottom:20,cursor:'pointer'}}>
                      <FontAwesomeIcon icon={faExclamationCircle} color='orange' size='4x'/>
                      <p style={{fontSize:40, color:'black'}}>No Data</p>
                    </div>
                    ))}
                    {
                      active==="requests"&&
                        <div style={{width:'100%',height:'90vh',backgroundColor:'red',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                          
                        </div>
                    }
              </div>
              
          }
          {
            view==="list"&&
                <div style={{background:'rgb(240,240,240)',color:'navy',width:'100%',height:'100vh',overflowY:'hidden',display:'flex', flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
                  {
                    showFull===false&&
                    <div style={{display:'flex',flexDirection:'row',width:'99%',fontSize:14,height:50,alignItems:'start',justifyContent:"start",backgroundColor:'rgb(0,0,60)'}}>
                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'5%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                              no. 
                            </li>
                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'35%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                              name
                            </li>
                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                              date of birth
                            </li>
                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                              weeks pregnant
                            </li>
                            <li style={{color:'white',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                              date registered
                            </li>
                    </div>
                  }
                  <div style={{width:'99%',height:'100%',overflow:active==="requests"?"hidden":'scroll',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
                    {document.map((doc) => (
                      document.length>0?
                      <>
                      {
                        showFull===false&&
                        <>
                          <div style={{width:'99%',height:50,marginTop:0,border:'1px solid black',fontSize:'1rem',color:'black',textDecoration:'none',listStyleType:'none',marginTop:0,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                            <ul style={{display:'flex',flexDirection:'row',width:'100%',height:50,alignItems:'start',justifyContent:"start"}}>
                              <li style={{color:'black',listStyleType:'none',width:'5%',height:'100%',backgroundColor:'transparent'}}>
                                {doc.count}
                              </li>
                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'35%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                                {doc.fName}  {doc.mName}  {doc.lName}
                              </li>
                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                                {!doc.birthday?"No data":moment(doc.birthday).format("YYYY/MM/DD")}
                              </li>
                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                                {isNaN(doc.weeksPregnant)?0:doc.weeksPregnant}
                              </li>
                              <li style={{color:'black',display:'flex',listStyleType:'none',width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                                {!doc.dateCreated?"No data":moment(doc.dateCreated).format("YYYY/MM/DD")}
                              </li>
                            </ul>
                            <FontAwesomeIcon icon={faEllipsisVertical} color='grey' size='1x' style={{marginRight:10,cursor:'pointer',}}/>
                          </div>
                        </>
                      }
                      {
                        active===showFull===false&&
                        <div>
                          
                        </div>
                      }
                      {
                        active===doc.id&&showFull===true&&
                        <div style={{width:'100%',height:'90vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'start',backgroundColor:'white'}}>
   
                        </div>
                      }
                      </>
                      :
                      <div style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',marginLeft:'25px',backgroundColor:"white",alignItems:'center',justifyContent:'space-around',margin:15,width:220,height:280,borderRadius:20,boxShadow: "6px 6px 6px 3px #9E9E9E",overflow:'hidden',borderWidth:2,borderColor:'navy',marginBottom:20,cursor:'pointer'}}>
                        <FontAwesomeIcon icon={faExclamationCircle} color='orange' size='4x'/>
                        <p style={{fontSize:40, color:'black'}}>No Data</p>
                      </div>
                      ))}
                    </div>
                </div>
                
            }
        </div>
      </div>
    </div>
  )
}

export default Users