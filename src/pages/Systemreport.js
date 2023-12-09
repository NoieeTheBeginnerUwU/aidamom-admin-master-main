import React, { useState, useEffect, useRef } from 'react';
import { database } from '../config/firebase';
import { useReactToPrint } from 'react-to-print';
import { addDoc, collection, getDocs, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import moment from 'moment';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Systemreport = () => {

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: ()=> componentRef.current,
  }) 

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
    }
    try{
      fetchAppointments();
  
    }catch(e){
      console.log(e);
    }
  },[])


  useEffect(()=>{
    const dateNow = moment(today, "YYYY/MM/DD");
    async function fetchAppointments(){
       const querySnapshot = await getDocs(query(collection(database, 'immunization')));
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
    }
    try{
      fetchAppointments();
  
    }catch(e){
      console.log(e);
    }
  },[])


  const saveToLogs = () => {
    try{
        addDoc(collection(database,"adminLogs"),{
            day: moment(new Date()).format("DD"),
            month: moment(new Date()).format("MM"),
            year: moment(new Date()).format("YYYY"),
            activity: "Generated and printed system report",
            dateMade: moment(new Date()).format("YYYY/MM/DD"),
        })
    }catch(e){
        console.log(e);
        alert(e);
    }
  }

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




  return (
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
      <div style={{width:'100%',height:'10vh',backgroundColor:'white',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}> 
        <div style={{width:'20%',height:'100%',backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'end'}}>
            <h3 style={{color:'grey'}}>System Reports</h3>  
        </div>
        <div style={{width:'50%',height:'100%',backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        </div>
        <div style={{width:'30%',height:'100%',backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
          <div onClick={()=> [handlePrint(), saveToLogs()]} style={{width:120,height:35,borderRadius:5,backgroundColor:'navy',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <p style={{color:'white',fontSize:12}}>generate report</p>
          </div>
        </div>
      </div>
      <div   class="container1" style={{overflowY:'scroll',padding:10}}>
              <div ref={componentRef} className='container' style={{width:800,height:1000,color:'black',alignSelf:'center',padding:20, fontSize:14,marginTop:'1vh',borderRadius:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}}>
                  <div style={{width:'100%',height:200,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <div style={{marginBottom:60,fontSize:18,width:'100%',height:'20%',display:'flex',alignItems:'center',justifyContent:'center'}} class= "header " align=" center">
                      <div className='adminPic' style={{width:150,height:150,borderRadius:150,marginRight:10,padding:10, fontSize:14,marginTop:'6vh',}}/>
                    </div>
                    <div style={{marginBottom:60,fontSize:18,width:'100%',height:'20%'}} class= "header " align=" center"><h4>Republic of the Philippines</h4>
                        <h4>Province of Camarines Norte</h4>
                        <h4>Municipality of Daet</h4>
                        <h4>MUNICIPAL HEALTH OFFICE</h4>
                        <h4><strong>RHU 3 - BIRTHING CENTER</strong></h4>
                        <h4><strong>Monthly System Report</strong></h4>
                    </div>
                    <div style={{marginBottom:60,fontSize:18,width:'100%',height:'20%',display:'flex',alignItems:'center',justifyContent:'center'}} class= "header " align=" center">
                      <div className='wew3' style={{marginRight:10,padding:10, fontSize:14,marginTop:'6vh',}}/>
                    </div>
                  </div>
                  <div style={{width:'100%',height:'80%',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
                    <p style={{margin:40}}>Report Date: {moment(new Date()).format("YYYY/MM/DD hh:mm a")}</p>
                    <p style={{marginLeft:50,fontSize:20,fontWeight:700,marginBottom:20,color:"orange"}}>No of checkups this month: {oct}</p>
                    <p style={{marginLeft:50,fontSize:20,fontWeight:700,marginBottom:20,color:"green"}}>No of vaccinations this month: {oct2}</p>
                    <div style={{}}>
                      <LineChart width={700} height={300} data={dKey}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid stroke="lightgrey" strokeDasharray="4 4"/>
                        <Line type="monotone" dataKey="count" stroke="#8884d8" />
                        <Line type="monotone" dataKey="count2" stroke="#82ca9d" />
                      </LineChart>
                    </div>
                    <p style={{marginLeft:50,fontSize:20,fontWeight:700}}>Report Generation</p>
                    <p style={{margin:20,width:'96%',textAlign:'center'}}>The report was generated using our healthcare reporting application, which compiles and analyzes the data collected. The report is updated monthly and serves as a valuable tool for tracking and improving our healthcare operations.</p>
                  
                 </div>
                </div>
             </div>
      </div>
  )
}

export default Systemreport