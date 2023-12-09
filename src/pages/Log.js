import React, { useEffect } from 'react'
import { Typography, Divider } from '@mui/material';
import { useState } from 'react';
import Activitylog from './activitylog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCheckCircle, faCoffee, faEyeSlash, faList, faSearch, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import "../styles/Users.css";
//Import Firebase
import { authentication } from '../config/firebase';
import { database } from '../config/firebase';
import { getDocs, collection, setDoc, doc, updateDoc, query, addDoc } from 'firebase/firestore';
import { orderBy, where } from 'firebase/firestore';
//Import Moment JS
import moment from 'moment/moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
//recharts
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Log = () => {

  const [documents, setDocuments] = useState([]);
  // const id = authentication.currentUser.uid;
  const [documentId, setDocumentId] = useState();
  const [active, setActive] = useState("");

  let date = new Date();
  const today1 = moment(date, "YYYY/MM/DD");

  useEffect(() => {
    if (active === "") {
      setActive("session")
    }
    fetchData();
  }, [])

  const [monthlyData, setMonthlyData] = useState({
    jan: "",
    feb: "",
    mar: "",
    apr: "",
    may: "",
    jun: "",
    jul: "",
    aug: "",
    sep: "",
    oct: "",
    nov: "",
    dec: "",
  })

  const data = [
    {
      name: 'Page A',
      uv: 590,
      pv: 800,
      amt: 1400,
    },
    {
      name: 'Page B',
      uv: 868,
      pv: 967,
      amt: 1506,
    },
    {
      name: 'Page C',
      uv: 1397,
      pv: 1098,
      amt: 989,
    },
    {
      name: 'Page D',
      uv: 1480,
      pv: 1200,
      amt: 1228,
    },
    {
      name: 'Page E',
      uv: 1520,
      pv: 1108,
      amt: 1100,
    },
    {
      name: 'Page F',
      uv: 1400,
      pv: 680,
      amt: 1700,
    },
  ];

  const [jan, setJan] = useState([])
  const [feb, setFeb] = useState([])
  const [mar, setMar] = useState([])
  const [apr, setApr] = useState([])
  const [may, setMay] = useState([])
  const [jun, setJun] = useState([])
  const [jul, setJul] = useState([])
  const [aug, setAug] = useState([])
  const [sep, setSep] = useState([])
  const [oct, setOct] = useState([])
  const [nov, setNov] = useState([])
  const [dec, setDec] = useState([])

  async function fetchData() {
    let yearNow = moment(new Date()).format("YYYY");
    const querySnapshot = await getDocs(query(collection(database, 'adminLogs'), orderBy("timestamp", "desc")));
    const userData = [];
    querySnapshot.forEach(doc => {
      userData.push({ id: doc.id, timestamp: doc.data().timestamp, activity: doc.data().activity });
      if (moment(doc.data().timestamp).format("MM") === 1 && moment(doc.data().timestamp).format("YYYY") === yearNow) {

      }
    })
    setDocuments(userData);
    //var i = 1;
    //alert("running "+i++ +" times")
  };
  const now = new Date();
  var time = moment().utcOffset('+08:00').format('hh:mm a');
  const dateNow = moment(now).format("YYYY/MM/DD");

  //alert(dateNow + " " + time);

  return (
    // <div style={{ width: '100%', height: '100vh', background: 'ghostwhite', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'black', overflow: 'hidden' }}>
    //   <div style={{ width: '100%', height: '8vh', backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start' }}>
       
    //     <div style={{ width: '30%', height: '100%', backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start' }}>
    //     <Typography variant='h2' fontWeight='600' fontSize={28} ml={2}mb={1}>
    //       ACTIVITY LOG
    //     </Typography>
    //     <Divider sx={{ marginBottom: 5 }}></Divider>
    //     </div>
    //   </div>
    //   <div style={{ width: '100%', height: '92vh', display: 'flex', flexDirection: 'row', backgroundColor: 'ghostwhite' }}>
    //     <div style={{ width: '100%', height: '98%', backgroundColor: 'transparent' }}>
    //       <div style={{ width: '100%', height: '10%', backgroundColor: 'rgb(0,0,60)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', fontSize: 18 }}>
    //         <p style={{ color: 'white', fontWeight: 500 }}>activity</p>
    //         <p style={{ color: 'white', fontWeight: 500 }}>datetime</p>
    //       </div>
    //       <div style={{ width: '100%', height: '90%', overflowY: 'scroll', overflowX: 'hidden' }}>
    //         {
    //           documents.map((doc) => (
    //             <div style={{ width: '100%', height: 50, margin: '1%', backgroundColor: 'lightgrey', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
    //               <p style={{ fontSize: 14, color: 'black' }}>{doc.activity}</p>
    //               <p style={{ fontSize: 14, color: 'black' }}>{doc.timestamp}</p>
    //             </div>
    //           ))
    //         }
    //       </div>
    //     </div>
    //   </div>




    // </div>
    <div>
    <Activitylog/>

    </div>




  )
}

export default Log