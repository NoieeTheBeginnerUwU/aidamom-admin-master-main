import React, { PureComponent, useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { database } from '../config/firebase';
import { authentication } from '../config/firebase';
//import Firebase
import { getDocs, updateDoc, doc, collection, where, query, addDoc, onSnapshot, orderBy } from 'firebase/firestore';
//import fontawesomeicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import axios
import axios from 'axios';
import { faAngleLeft, faAngleRight, faBell, faBellConcierge, faCalendar, faChild, faCircle, faDoorOpen, faExclamationCircle, faList, faList12, faPersonPregnant, faSuitcase, faSyringe, faUserAlt } from '@fortawesome/free-solid-svg-icons';
//import moment js
import Calendar from 'react-calendar';
import moment from 'moment';
import NoData from '../animations/NoData';

const Calendar_ = ()=> {
  const [expanded, setExpanded] = useState(false);
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


    const [clickedDayApp, setClickedDayApp] = useState([]);

    async function handleFetchAppointmentsOnClick(date) {
      let appointments = [];
      let dateNow = moment(date).format("YYYY/MM/DD");
      const querySnapshot = await getDocs(query(collection(database, 'onlineAppointments'),where('status',"==","approved"),where("appointmentDate","==",date)));
      querySnapshot.forEach((doc)=>{
        appointments.push({id:doc.id, appointmentdate:doc.data().appointmentDate, purpose:doc.data().purpose, name:doc.data().name,time:doc.data().time})
      })
      setClickedDayApp(appointments);
    }

    const [activDate, setActiveDate] = useState(new Date())
    
    useEffect(()=>{
      handleFetchAppointmentsOnClick(moment(activDate).format("YYYY/MM/DD"))
    },[activDate])

    return (
     <div style={{display:'flex',flexDirection:'column',width:'100%',height:'100vh',backgroundColor:'white',overflow:'hidden'}}>
      {
        tabs===0&&
        <div style={{display:'flex',flexDirection:'row',width:'100%',flexWrap:'wrap',height:'100vh',backgroundColor:'white'}}>
        <div style={{display:'flex',flexDirection:'column',width:'100%',alignItems:'center',justifyContent:'space-evenly',height:'100vh',color:'black',backgroundColor:'ghostwhite'}}>
          <div className='calendar-container'>
            <Calendar onChange={setDate} onClickDay={(e)=> setActiveDate(e)} value={date} />
          </div>
          <p style={{fontSize:16}}>Your appointments for {date.toDateString()}</p>
          <div style={{width:'100%',height:'50%',backgroundColor:'white',overflowY:'scroll',display:'flex',flexDirection:'column',alignItems:'center'}}>
            {
              clickedDayApp.length<1?
              <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}}>
                <div>
                  <NoData/>
                </div>
                <p style={{color:'black',fontSize:20}}>NO APPOINTMENTS ON THIS DATE</p>
              </div>
              :
              <>
                {
                  clickedDayApp.map((doc)=>(
                    <div style={{width:'90%',height:40,marginTop:10,backgroundColor:'rgb(0,0,60)',display:'flex',alignSelf:'center',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                      <FontAwesomeIcon icon={faCalendar} size='1x' color='white' style={{marginLeft:10}}/>
                      <div style={{width:'50%',height:'100%',display:'flex',alignItems:'center',justifyContent:'start'}}>
                        <p style={{fontSize:12,color:'white',marginLeft:20}}>{doc.name}</p>
                      </div>
                      <div style={{width:'50%',height:'100%',display:'flex',alignItems:'center',justifyContent:'start'}}>
                        <p style={{fontSize:12,color:'white',marginLeft:20}}>{doc.purpose}</p>
                        <p style={{fontSize:12,color:'white',marginLeft:20}}>{doc.time}</p>
                      </div>
                    </div>
                  ))
                }
              </>
            }
          </div>
        </div>
      </div>
      }
     </div>
    );
  
}

export default Calendar_