import React, { useState, useEffect } from 'react';
import { database, authentication } from '../config/firebase';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Divider, Box } from '@mui/material';
//moment
import moment from 'moment';
//firebase
import { onSnapshot, collection, query, where, getDoc, doc, orderBy, limit, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
//import fontawesomeicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import axios
import axios from 'axios';
import { faAngleLeft, faAngleRight, faBell, faBellConcierge, faCalendar, faCalendarAlt, faCalendarDays, faChild, faCircle, faDoorOpen, faExclamationCircle, faList, faList12, faMobile, faMobileAndroid, faPersonPregnant, faPhone, faSuitcase, faSyringe, faUserAlt } from '@fortawesome/free-solid-svg-icons';
//import moment js
import Calendar_ from './Calendar';
import TopNav from './messages/TopNav';
import NoData from '../animations/NoData';
import PatientRegistrationForm from './patientRegistration';



import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import {Button} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl } from '@mui/material';
import dayjs from 'dayjs';
import { faMinus, faAdd } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
  table: {
    minWidth: 200,
    border: '1px solid #ccc',
  },
  mainHeader: {
    backgroundColor: '#486DF1',
    color: '#fff',
    fontWeight: 'bold',
    border: '1px solid #ccc',
    borderBottom: '2px solid #ccc',
  },
  subHeader: {
    backgroundColor: '#e0e0e0',
    fontWeight: 600,
    border: '1px solid #ccc',
    borderBottom: '2px solid #ccc',
  },
  dataCell: {
    backgroundColor: '#ffffff',
    fontWeight: 400,
    border: '1px solid #ccc',
  },
  fullSizeBox: {
    width: '100%',
    height: '100%',
  },
  tableCell: {
   
  },
});


const data = [
  {
    NumberOfDeliveriesAttendedByHealthProfessionals: {
      Doctor: 361,
      Nurse: 936,
      Midwife: 390,
    },
    TypeOfDelivery: {
      Vaginal: 751,
      Ceasarian: 936,
    },
    DeliveryOutcome: {
      ALIVE: 361,
      Stillbirth: 936,
      Miscarriage: 390,
    },
  },
];

function createData(ageGroup, pregnantWomen) {
  return { ageGroup, pregnantWomen };
}

const rows = [
  createData('Age 10-14', 0),
  createData('Age 15-19', 0),
  createData('Age 20-29', 0),
];
// Calculate the total number of pregnant women
const totalPregnantWomen = rows.reduce((total, row) => total + row.pregnantWomen, 110);


// Calculate the total number of deliveries for each category
const totalDeliveriesByProfessionals = data.reduce((total, row) => total + row.NumberOfDeliveriesAttendedByHealthProfessionals.Doctor + row.NumberOfDeliveriesAttendedByHealthProfessionals.Nurse + row.NumberOfDeliveriesAttendedByHealthProfessionals.Midwife, 0);
const totalTypeOfDelivery = data.reduce((total, row) => total + row.TypeOfDelivery.Vaginal + row.TypeOfDelivery.Ceasarian, 0);
const totalDeliveryOutcome = data.reduce((total, row) => total + row.DeliveryOutcome.ALIVE + row.DeliveryOutcome.Stillbirth + row.DeliveryOutcome.Miscarriage, 0);



function createData1(name, count) {
  return { name, count };
}

const genderRows = [
  createData1('Male', 190),
  createData1('Female', 1300),
];

const weightRows = [
  createData1('Normal', 1338),
  createData1('Low', 332),
  createData1('Unknown', 0),
];

// Calculate the total number of live births for each category
const totalGender = genderRows.reduce((total, row) => total + row.count, 0);
const totalWeight = weightRows.reduce((total, row) => total + row.count, 0);



const Dashboard = ({ counter }) => {



  const [selectedDate, handleDateChange] = useState(new Date());

  const classes = useStyles();

  const [flipped, setFlipped] = useState(true);

  const handleFlip = () => {
    setFlipped(true);
  };


  const [flipped1, setFlipped1] = useState(false);

  const handleFlip1 = () => {
    setFlipped1(false);
  };


  const [flipped2, setFlipped2] = useState(false);

  const handleFlip2 = () => {
    setFlipped2(false);
  };


  // Check if the object is defined before accessing its properties

  const handleYearChange = (date) => {
    // Handle the change in the selected year and update the table data accordingly
    handleDateChange(date);
    // Add logic to update the table based on the selected year
    // You can fetch new data or update the existing data based on the selected year
  };


//start db

  const users = [];
  const [appUsers, setAppUsers] = useState(0);
  const [patients, setPatients] = useState(0);
  var currentDate = moment(new Date(), "YYYY/MM/DD");
  const [allUsers, setAllUsers] = useState([]);
  let [_appointments, _setAppointments] = useState("");

  const fetchUsers = async () => {
    let usersSnap = query(collection(database, "userData"));
    let user = [];
    let clients = 0;
    let newUsers = [];
    let i = 1;

    onSnapshot(doc(database,"dashboard","--appointments--"),(count)=>{
      _setAppointments(count.data().no)
    })

    onSnapshot(usersSnap, (snapshot) => {
      snapshot.forEach((doc) => {
        newUsers.push({ id: doc.id, count: i++, userFname: doc.data().userFname, userLname: doc.data().userLname, status: doc.data().status, userPic: doc.data().userPic, weeksPregnant: doc.data(), dateCreated: moment(doc.data().dateCreated).format("MMMM DD, YYYY"), birthday: moment(doc.data().userDob).format("MMMM DD, YYYY"), userPic: doc.data().userPic, lastPeriod: doc.data().lastPeriod, weeksPregnant: moment(currentDate, "YYYY/MM/DD").diff(doc.data().lastPeriod, "weeks"), });
        if (doc.data().status === "approved") {
          user.push({ id: doc.id })
        }
        users.push({ id: doc.id, userFname: doc.data().userFname, userLname: doc.data().userLname, status: doc.data().status, userPic: doc.data().userPic, weeksPregnant: doc.data(), dateCreated: moment(doc.data().dateCreated).format("MMMM DD, YYYY"), birthday: moment(doc.data().userDob).format("MMMM DD, YYYY"), userPic: doc.data().userPic, lastPeriod: doc.data().lastPeriod, weeksPregnant: moment(currentDate, "YYYY/MM/DD").diff(doc.data().lastPeriod, "weeks"), });
      })
      setPatients(users.length);
      setAppUsers(user.length);
      setAllUsers(newUsers)
    })
  }

  const [userData, setUserData] = useState(0);
  let [completed, setCompleted] = useState(0);
  let [pendings_, setPendings_] = useState(0);

 
 
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    fetchUsers();
  }, [])


  const [month, setMonth] = useState(moment(new Date()).format("MMMM"));
  useEffect(()=>{
    setMonth(moment(new Date()).format("MM"))
  },[])
  const [year_, setYear_] = useState(2023);
  const [summary, setSummary] = useState([]);
  let [todV, setTodV] = useState(0);
  let [todVM, setTodVM] = useState(0)
  let [todVN, setTodVN] = useState(0)
  let [todVD, setTodVD] = useState(0)
  let [todVag, setTodVag] = useState(0)
  let [todCae, setTodCae] = useState(0)
  let [todAlv, setTodAlv] = useState(0)
  let [todStl, setTodStl] = useState(0)
  let [todMis, setTodMis] = useState(0)
  let [todMal, setTodMal] = useState(0)
  let [todFal, setTodFal] = useState(0)
  let [todGen, setTodGen] = useState(0)
  let [childWeight, setChildWeight] = useState(0)
  let [childWeightL, setChildWeightL] = useState(0)
  let [childWeightN, setChildWeightN] = useState(0)
  let [childWeightO, setChildWeightO] = useState(0)
  let [mAgeU, setMAgeU] = useState(0)
  let [mAgeN, setMAgeN] = useState(0)
  let [mAgeO, setMAgeO] = useState(0)
  let [mAgeT, setMAgeT] = useState(0)


  const fetchdischarge = async(month, year) => {
    let tod = 0
    let tod_d = 0
    let tod_n = 0
    let tod_m = 0
    let tod_v = 0
    let tod_a = 0
    let tod_s = 0
    let tod_mc = 0
    let tod_vag = 0
    let tod_al = 0
    let tod_st = 0
    let tod_ms = 0
    let tod_ml = 0
    let tod_fl = 0
    let cw = 0;
    let cwL = 0;
    let cwN = 0;
    let cwO = 0;
    const querySummary = await getDocs(query(collection(database,"discharge_child"),where("month","==",month),where("year","==",year)));
    const querySummary2 = await getDocs(query(collection(database,"userData")));

    querySummary.forEach((doc)=>{
      if(doc.data().healthProfessionalAttended==="Midwife"){
        tod_m++
      }
      if(doc.data().healthProfessionalAttended==="Nurse"){
        tod_n++
      }
      if(doc.data().healthProfessionalAttended==="Doctor"){
        tod_d++
      }
      if(doc.data().deliveredVia==="Vaginal"){
        tod_vag++
      }
      if(doc.data().childGender==="male"){
        tod_ml++
      }
      if(doc.data().childGender==="female"){
        tod_fl++
      }
      if(doc.data().childWeightType==="low"){
        cwL++
      }
      if(doc.data().childWeightType==="normal"){
        cwL++
      }
      if(doc.data().childWeightType==="overweight"){
        cwL++
      }
    })
    setTodV(tod_m+tod_d+tod_n);
    setTodVD(tod_d)
    setTodVM(tod_m)
    setTodVN(tod_n)
    setTodVag(tod_vag);
    setTodMal(tod_ml)
    setTodFal(tod_fl)
    setTodGen(tod_fl+tod_ml)
    setChildWeightL(cwL)
    setChildWeightN(cwN)
    setChildWeightO(cwO)
    setChildWeight(cwL+cwN+cwO)


    let over = 0
    let normal = 0
    let under = 0
    let mothers = [];
    querySummary2.forEach((doc)=>{
  
      if(!doc.data().lastPeriod){

      }else{
        if(moment(new Date(),"YYYY/MM/DD").diff(doc.data().userDob,"years")<15&&doc.data().lastPeriod!==""){
          under++;
        }
        if(moment(new Date(),"YYYY/MM/DD").diff(doc.data().userDob,"years")>=15&&moment(new Date(),"YYYY/MM/DD").diff(doc.data().userDob,"years")<=20&&doc.data().lastPeriod!==""){
          under++;
        }
        if(moment(new Date(),"YYYY/MM/DD").diff(doc.data().userDob,"years">20&&doc.data().lastPeriod!=="")){
          over++;
        }
      }
    })
    setMAgeN(normal)
    setMAgeU(under)
    setMAgeO(over)
    setMAgeT(normal+under+over)
  }

  useEffect(()=>{
    if(month!==""&&year_!==""){
      fetchdischarge(month,year_.toString())
    }
  },[month,year_])

  
function createData(ageGroup, pregnantWomen) {
  return { ageGroup, pregnantWomen };
}

const rows = [
  createData('Age 10-14', 0),
  createData('Age 15-19', 0),
  createData('Age 20-29', 0),
];
// Calculate the total number of pregnant women
const totalPregnantWomen = rows.reduce((total, row) => total + row.pregnantWomen, 110);

const [activeDate, setActiveDate] = useState("");

// Calculate the total number of deliveries for each category
const totalDeliveriesByProfessionals = data.reduce((total, row) => total + row.NumberOfDeliveriesAttendedByHealthProfessionals.Doctor + row.NumberOfDeliveriesAttendedByHealthProfessionals.Nurse + row.NumberOfDeliveriesAttendedByHealthProfessionals.Midwife, 0);
const totalTypeOfDelivery = data.reduce((total, row) => total + row.TypeOfDelivery.Vaginal + row.TypeOfDelivery.Ceasarian, 0);
const totalDeliveryOutcome = data.reduce((total, row) => total + row.DeliveryOutcome.ALIVE + row.DeliveryOutcome.Stillbirth + row.DeliveryOutcome.Miscarriage, 0);



function createData1(name, count) {
  return { name, count };
}

const genderRows = [
  createData1('Male', 190),
  createData1('Female', 1300),
];

const weightRows = [
  createData1('Normal', 1338),
  createData1('Low', 332),
  createData1('Unknown', 0),
];

// Calculate the total number of live births for each category
const totalGender = genderRows.reduce((total, row) => total + row.count, 0);
const totalWeight = weightRows.reduce((total, row) => total + row.count, 0);



  return (
//     <div style={{ width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'start', overflow: 'hidden', justifyContent: 'start' }}>
//       <div style={{ width: '100%', height: '94vh', backgroundColor: 'white', overflowX: 'hidden', overflowY: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
//         <div style={{ width: '98%', height: '100%', display: 'flex', flexDirection: 'row' }}>
//           <div style={{ width: '75%', height: 600, borderTop: '2px solid lightgrey', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
//             <div style={{ width: '100%', height: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
//               <div style={{ width: '100%', height: '70%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', }}>
//                 <div style={{ width: '32%', height: '70%', backgroundColor: 'white', boxShadow: '1px .1px 2px 1px grey', borderRadius: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
//                   <div style={{ width: '25%', height: '80%', backgroundColor: 'blue', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//                     <FontAwesomeIcon icon={faCalendar} size='2x' color='white' />
//                   </div>
//                   <div style={{ width: '42%', height: '90%', backgroundColor: 'white', borderRight: '1px solid lightgrey', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                     <p style={{ fontSize: 15, color: 'black' }}>Appointments</p>
//                     <p style={{ color: 'black', fontSize: 30 }}>{completed}</p>
//                   </div>
//                   <div style={{ width: '30%', height: '90%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                     <p style={{ fontSize: 15, color: 'black' }}>Upcoming</p>
//                     <p style={{ color: 'black', fontSize: 30 }}>{pendings_}</p>
//                   </div>
//                 </div>
//                 <div style={{ width: '32%', height: '70%', backgroundColor: 'white', boxShadow: '1px .1px 2px 1px grey', borderRadius: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
//                   <div style={{ width: '25%', height: '80%', backgroundColor: 'rgb(80,205,80)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
//                     <FontAwesomeIcon icon={faPersonPregnant} size='2x' color='white' />
//                   </div>
//                   <div style={{ width: '45%', height: '90%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                     <p style={{ fontSize: 15, color: 'black' }}>Registered Patients</p>
//                     <p style={{ color: 'black', fontSize: 30 }}>{allUsers.length}</p>
//                   </div>
//                 </div>
//                 <div style={{ width: '32%', height: '70%', backgroundColor: 'white', boxShadow: '1px .1px 2px 1px grey', borderRadius: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
//                   <div style={{ width: '25%', height: '80%', backgroundColor: 'orange', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
//                     <FontAwesomeIcon icon={faMobileAndroid} size='2x' color='white' />
//                   </div>
//                   <div style={{ width: '45%', height: '90%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                     <p style={{ fontSize: 15, color: 'black' }}>Mcare App Users</p>
//                     <p style={{ color: 'black', fontSize: 30 }}>{appUsers}</p>
//                   </div>
//                 </div>
//               </div>
//               <div style={{ width: '100%', height: '20%', backgroundColor: 'skyblue', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>

//               </div>
//             </div>
// {/* -----------------------------------Start of Grid for Flipping Table     -----------------------------------   */}
// <Grid container padding={2} backgroundColor='red'>
//             <Grid xs={12} sx={{ minHeight: '25vh', minWidth: '8%', }} mb={3} component={Paper} margin={2}>

//               <Grid xs={12} sx={{ minHeight: flipped ? '25vh' : '20vh', minWidth: flipped ? '8%' : '8%', cursor: 'pointer' }} onClick={handleFlip}>
//                 {flipped ? (
//                   <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#486DF1'} color='white' padding={1} component={Paper}>
//                     NUMBER OF TOTAL DELIVERIES
//                   </Box>
//                 ) : (
//                   <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#486DF1'} color='white' padding={1} component={Paper}>
//                     NUMBER OF TOTAL DELIVERIES
//                   </Box>
//                 )}
//                 <Box component={Paper}>
//                   {flipped ? (
//                     /* Content for the flipped state */
//                     <Box sx={{ height: '100%', width: '100%' }}>
//                       {/* Your flipped content goes here */}


//                       <Grid container item xs={12} padding={2} sx={{ minHeight: '25vh', minWidth: '8%', }}>
//                         <Grid xs={3} justifyContent='center' justifyItems="center"><Box sx={{ fontSize: '5em', fontWeight: '750', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: "white", backgroundColor: '#486DF1' }}>1688</Box></Grid>
//                         <Divider orientation="vertical" flexItem />
//                         <Grid container padding={1} xs={2}>
//                           <Grid xs={12} mb={1} ml={1} > <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', alignItems: 'center' }}></Box> <Box > Type of Delivery</Box></Grid>
//                           <Grid xs={12}> <Box fontSize='1.5em' ml={1} fontWeight='750' color={'#00BA88'}>300</Box><Box ml={1}>Normal</Box></Grid>
//                           <Grid xs={12}> <Box fontSize='2em' ml={1} fontWeight='750' color={'#F4B740'}>300</Box><Box ml={1}>Ceasarian</Box></Grid>
//                         </Grid>
//                         <Divider orientation="vertical" flexItem />
//                         <Grid container xs={2.5} padding={1} >
//                           <Grid item xs={12} mb={1}> <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}></Box><Box >Delivery Outcome </Box> </Grid>
//                           <Grid item xs={6}> <Box fontSize='2em' ml={1} fontWeight='750' color={'#00BA88'} >143</Box><Box ml={1}>Alive</Box></Grid>
//                           <Grid item xs={6}> <Box fontSize='2em' ml={1} fontWeight='750' color={'#F4B740'}>300</Box><Box>Stillbirth</Box></Grid>
//                           <Grid item xs={12} mt={1}> <Box fontSize='2em' ml={1} fontWeight='700' color={'#D32F2F'}>300</Box><Box ml={1}>Miscarriage</Box></Grid>
//                         </Grid>
//                         <Divider orientation="vertical" flexItem />
//                         <Grid container xs={4.4} sx={{ flexDirection: 'row' }} padding={1}>
//                           <Grid item xs={12}> <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#F4B740'}></Box><Box >Number of Deliveries Attended by Health Professionals</Box></Grid>
//                           <Grid item xs={4}> <Box fontSize='2em' ml={1} fontWeight='750' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#00BA88'}>143</Box><Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} size='12px'>Doctor</Box></Grid>
//                           <Divider orientation="vertical" flexItem />
//                           <Grid item xs={4}> <Box fontSize='2em' ml={1} fontWeight='750' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#F4B740'}>300</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} fontSize='medium'>Nurse</Box></Grid>
//                           <Divider orientation="vertical" flexItem />
//                           <Grid item xs={3}> <Box fontSize='2em' ml={1} fontWeight='750' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#D32F2F'}>300</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} size='small'>Midwife</Box></Grid>
//                         </Grid>
//                       </Grid>
//                     </Box>
//                   ) : (
//                     /* Content for the normal state */
//                     <TableContainer component={Paper}>
//                       <Table className={classes.table} aria-label="simple table" size='small'>
//                         <TableHead>
//                           <TableRow>
//                             <TableCell colSpan={3} >Number of Deliveries Attended by Health Professionals</TableCell>
//                             <TableCell colSpan={2} >Type of Delivery</TableCell>
//                             <TableCell colSpan={3} >Delivery Outcome</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell className={classes.subHeader}>Doctor</TableCell>
//                             <TableCell className={classes.subHeader}>Nurse</TableCell>
//                             <TableCell className={classes.subHeader}>Midwife</TableCell>
//                             <TableCell className={classes.subHeader}>Vaginal</TableCell>
//                             <TableCell className={classes.subHeader}>Ceasarian</TableCell>
//                             <TableCell className={classes.subHeader}>ALIVE</TableCell>
//                             <TableCell className={classes.subHeader}>Stillbirth</TableCell>
//                             <TableCell className={classes.subHeader}>Miscarriage</TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {data.map((row) => (
//                             <TableRow key={row}>
//                               <TableCell className={classes.dataCell}>{row.NumberOfDeliveriesAttendedByHealthProfessionals.Doctor}</TableCell>
//                               <TableCell className={classes.dataCell}>{row.NumberOfDeliveriesAttendedByHealthProfessionals.Nurse}</TableCell>
//                               <TableCell className={classes.dataCell}>{row.NumberOfDeliveriesAttendedByHealthProfessionals.Midwife}</TableCell>
//                               <TableCell className={classes.dataCell}>{row.TypeOfDelivery.Vaginal}</TableCell>
//                               <TableCell className={classes.dataCell}>{row.TypeOfDelivery.Ceasarian}</TableCell>
//                               <TableCell className={classes.dataCell}>{row.DeliveryOutcome.ALIVE}</TableCell>
//                               <TableCell className={classes.dataCell}>{row.DeliveryOutcome.Stillbirth}</TableCell>
//                               <TableCell className={classes.dataCell}>{row.DeliveryOutcome.Miscarriage}</TableCell>
//                             </TableRow>
//                           ))}
//                           <TableRow>
//                             <TableCell colSpan={3} className={classes.dataCell}><strong>Total: {totalDeliveriesByProfessionals}</strong></TableCell>
//                             <TableCell colSpan={2} className={classes.dataCell}><strong>Total: {totalTypeOfDelivery}</strong></TableCell>
//                             <TableCell colSpan={3} className={classes.dataCell}><strong>Total: {totalDeliveryOutcome}</strong></TableCell>
//                           </TableRow>
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>


//     <Grid xs={6} sx={{ minHeight: '35vh', minWidth: '8%', }} padding={2} component={Paper}>



//               <Grid xs={12} sx={{ minHeight: flipped1 ? '25vh' : '25vh', minWidth: flipped1 ? '8%' : '8%', cursor: 'pointer' }} onClick={handleFlip1}>
//                 {flipped1 ? (
//                   <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#00BA88'} padding={1} color={'white'} component={Paper}>TOTAL PREGNANT WOMAN</Box>
//                 ) : (

//                   <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#00BA88'} padding={1} color={'white'} component={Paper}>TOTAL PREGNANT WOMAN</Box>
//                 )}
//                 <Box>
//                   {flipped1 ? (
//                     /* Content for the flipped state */
//                     <Box sx={{ height: '100%', width: '100%' }}>
//                       {/* Your flipped content goes here */}
//                       <Grid container component={Paper} item xs={12} padding={1} sx={{ minHeight: '25vh', minWidth: '8%', }}>
//                         <Grid xs={3.9} justifyContent='center' justifyItems="center"><Box sx={{ fontSize: '3.5em', fontWeight: '750', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: "white", backgroundColor: '#00BA88' }}>1670</Box></Grid>
//                         <Divider orientation="vertical" flexItem />

//                         <Divider orientation="vertical" flexItem />
//                         <Grid container xs={8} sx={{ flexDirection: 'row' }} padding={1}>
//                           <Grid item xs={12}> <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} ></Box> <Box >Age Group</Box></Grid>
//                           <Grid item xs={3.9}> <Box fontSize='2em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#F4B740'}>143</Box><Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }}>Age 10-14</Box></Grid>
//                           <Divider orientation="vertical" flexItem />
//                           <Grid item xs={4}> <Box fontSize='2em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#486DF1'}>300</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }}>Age 15-19 </Box></Grid>
//                           <Divider orientation="vertical" flexItem />
//                           <Grid item xs={4}> <Box fontSize='2em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#D32F2F'}>300</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }}>Age 20-29</Box></Grid>
//                         </Grid>
//                       </Grid>

//                     </Box>
//                   ) : (
//                     /* Content for the normal state */
//                     <TableContainer component={Paper}>
//                       <Table className={classes.table} aria-label="simple table" size='small'>
//                         <TableHead>
//                           <TableRow >
//                             <TableCell >Age Group</TableCell>
//                             <TableCell align="right" >Pregnant Women</TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {rows.map((row) => (
//                             <TableRow key={row.ageGroup}>
//                               <TableCell component="th" scope="row">
//                                 {row.ageGroup}
//                               </TableCell>
//                               <TableCell align="right">{row.pregnantWomen}</TableCell>
//                             </TableRow>
//                           ))}
//                           <TableRow>
//                             <TableCell component="th" scope="row">
//                               <strong>Total Pregnant Women</strong>
//                             </TableCell>
//                             <TableCell align="right"><strong>{totalPregnantWomen}</strong></TableCell>
//                           </TableRow>
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>

//              {/*-------------------------------NUMBER OF LIVE BIRTHS------------------------------ */}
//              <Grid xs={6} sx={{ minHeight: '15vh', minWidth: '8%', }} backgroundColor={'blue'} padding={2}>


// <Grid xs={12} sx={{ minHeight: flipped2 ? '15vh' : '15vh', minWidth: flipped2 ? '8%' : '8%', cursor: 'pointer' }} onClick={handleFlip2}>
//   {flipped2 ? (
//     <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#F4B740'} padding={1} color={'white'} component={Paper}>NUMBER OF LIVE BIRTHS</Box>
//   ) : (
//     <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#F4B740'} padding={1} color={'white'} component={Paper}>NUMBER OF LIVE BIRTHS</Box>
//   )}
//   <Box component={Paper}>
//     {flipped2 ? (
//       /* Content for the flipped state */
//       <Box sx={{ height: '100%', width: '100%' }}>
//         {/* Your flipped content goes here */}

//         <Grid container component={Paper} item xs={12} padding={1} sx={{ minHeight: '25vh', minWidth: '8%', }}>
//           <Grid containercomponent={Paper} padding={1} xs={6}>
//             <Grid xs={12} mb={1} ml={1} > <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', alignItems: 'center' }}></Box> <Box >Gender</Box></Grid>
//             <Grid xs={12}> <Box fontSize='2em' ml={1} fontWeight='700' color={'#4E4B66'}>300</Box> <Box >Male</Box></Grid>
//             <Grid xs={12}> <Box fontSize='2em' ml={1} fontWeight='700' color={'#4E4B66'}>300</Box> <Box>Female</Box></Grid>
//           </Grid>
//           <Divider orientation="vertical" flexItem />
//           <Grid xs={5} justifyContent='center' justifyItems="center"><Box sx={{ fontSize: '5em', fontWeight: '750', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: "white", backgroundColor: '#F4B740' }}>1688</Box></Grid>
//           <Divider orientation="vertical" flexItem />

//           <Grid container xs={12} sx={{ flexDirection: 'row' }} padding={1}>
//             <Grid item xs={12}> <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#F4B740'}></Box><Box >Weight at Birth</Box></Grid>
//             <Grid item xs={4}> <Box fontSize='2em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#00BA88'}>143</Box><Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }}>Normal</Box></Grid>
//             <Divider orientation="vertical" flexItem />
//             <Grid item xs={4}> <Box fontSize='2em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#486DF1'}>300</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }}>Low</Box></Grid>
//             <Divider orientation="vertical" flexItem />
//             <Grid item xs={3}> <Box fontSize='2em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#D32F2F'}>300</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }}>Unknown</Box></Grid>
//           </Grid>
//         </Grid>



//       </Box>
//     ) : (
//       /* Content for the normal state */

//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="simple table" size='small'>
//           <TableHead >
//             <TableRow sx={{ color: "white", backgroundColor: "#F4B740" }}>
//             </TableRow>
//             <TableRow>
//               <TableCell className={classes.subHeader}>Gender</TableCell>
//               <TableCell align="right" className={classes.subHeader}>Count</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {genderRows.map((row) => (
//               <TableRow key={row.name}>
//                 <TableCell component="th" scope="row">
//                   {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.count}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <strong>Total</strong>
//               </TableCell>
//               <TableCell align="right"><strong>{totalGender}</strong></TableCell>
//             </TableRow>
//           </TableBody>
//           <TableHead>
//             <TableRow>
//               <TableCell className={classes.subHeader}>Weight at Birth</TableCell>
//               <TableCell align="right" className={classes.subHeader}>Count</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {weightRows.map((row) => (
//               <TableRow key={row.name}>
//                 <TableCell component="th" scope="row">
//                   {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.count}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <strong>Total</strong>
//               </TableCell>
//               <TableCell align="right"><strong>{totalWeight}</strong></TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     )}
//   </Box>
// </Grid>

// </Grid>

// </Grid>






//           </div>
//           <div style={{ width: '25%', height: 600, backgroundColor: 'ghostwhite', borderTop: '2px solid lightgrey', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', width: '97%', margin: '1%', alignItems: 'center', justifyContent: 'space-evenly', height: '92%', color: 'black', backgroundColor: 'ghostwhite' }}>
//               <div className='calendar-container'>
//                 <Calendar onChange={setDate} value={date} />
//               </div>
//               <p style={{ fontSize: 16 }}>Your appointments for {date.toDateString()}</p>
//               <div style={{ width: '100%', height: '80%', backgroundColor: 'white', overflowY: 'scroll', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 {
//                   clickedDayApp.length < 1 ?
//                     <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                       <div style={{ width: '80%', height: '90%', marginTop: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                         <NoData />
//                       </div>
//                       <p style={{ color: 'black', fontSize: 20 }}>NO APPOINTMENTS ON THIS DATE</p>
//                     </div>
//                     :
//                     <>
//                       {
//                         clickedDayApp.map((doc) => (
//                           <div style={{ width: '98%', height: 40, marginTop: 10, backgroundColor: 'rgb(0,0,60)', display: 'flex', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
//                             <div style={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
//                               <p style={{ fontSize: 10, color: 'white', marginLeft: 20 }}>{doc.name}</p>
//                             </div>
//                             <div style={{ width: '20%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
//                               <p style={{ fontSize: 12, color: 'white', marginLeft: 20 }}>{doc.time}</p>
//                             </div>
//                             <div style={{ width: '30%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
//                               <p style={{ fontSize: 12, color: 'white', marginLeft: 20 }}>{doc.purpose}</p>
//                             </div>
//                           </div>
//                         ))
//                       }
//                     </>
//                 }
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
<Box container sx={{ height: '100%', width: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
<Divider sx={{ marginBottom: 2 }}></Divider>
<Grid container spacing={.5} >
  <Grid container ml={.5} xs={8.9} direction='row' columnGap={.5}>

    
    {/*------------------------------- Grid 1 Appoinment------------------------------- */}
    <Grid container item xs={4.5} ml={.5} mb={3} padding={2} sx={{ minHeight: '4vh', minWidth: '4%', }} component={Paper}>
      <Grid xs={3} justifyContent='center' justifyItems="center"><Box sx={{ fontSize: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: "white", backgroundColor: '#486DF1' }}><EventNoteIcon fontSize='72' color="white" /></Box></Grid>
      <Grid xs={4.5} >
        <Grid xs={12} > <Box fontSize={'medium'} ml={1}fontWeight='500'>Appointments</Box></Grid>
        <Grid xs={12}> <Box fontSize='2em' ml={1} fontWeight='700' color={'#4E4B66'}>{_appointments}</Box></Grid>
      </Grid>
     
      <Divider  orientation="vertical" flexItem  sx={{ mx: 1 }}/>
      
      <Grid xs={3} >
        <Grid xs={12}> <Box fontSize={'medium '} ml={1} fontWeight='600' color={'#F4B740'}>Upcoming</Box></Grid>
        <Grid xs={12}> <Box fontSize='2em' ml={1} fontWeight='800' color={'#486DF1'}>{pendings_}</Box></Grid>
      </Grid>



    </Grid>
    {/*------------------------------- Grid 2 Registered Patient------------------------------- */}
    <Grid container item xs={3.5} ml={.5} mb={3} padding={2} sx={{ minHeight: '4vh', minWidth: '4%', }} component={Paper}>
      <Grid xs={3} justifyContent='center' justifyItems="center"><Box sx={{ fontSize: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: "white", backgroundColor: '#00BA88' }}><PregnantWomanIcon fontSize='72' /></Box></Grid>
      <Grid xs={8} >
        <Grid xs={12}> <Box fontSize={'medium '} ml={1} fontWeight='500'>Registered Patients</Box></Grid>
        <Grid xs={12}> <Box fontSize='2em' ml={1} fontWeight='700' color={'#4E4B66'}>{allUsers.length}</Box></Grid>
      </Grid>



    </Grid>
    {/*------------------------------- Grid 3 App user------------------------------- */}
    <Grid container item xs={3.5} ml={.5} padding={2} mb={3} sx={{ minHeight: '4vh', minWidth: '4%', }} component={Paper}>
      <Grid xs={3} justifyContent='center' justifyItems="center"><Box sx={{ fontSize: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: "white", backgroundColor: '#F4B740' }}><PhoneIphoneIcon fontSize='72' color="white" /></Box></Grid>
      <Grid xs={9} >
        <Grid xs={12}> <Box fontSize={'medium '} ml={1} fontWeight='500'>MCare App User</Box></Grid>
        <Grid xs={12}> <Box fontSize='2em' ml={1} fontWeight='700' color={'#4E4B66'}>{appUsers}</Box></Grid>
      </Grid>



    </Grid>
    {/*------------------------------- Start of Table and Charts------------------------------ */}
<Grid container xs={12}>


</Grid>
    <Grid container xs={12} padding={2} m={.5} mr={2} spacing={2} >

      {/*-------------------------------NUMBER OF TOTAL DELIVERIES------------------------------ */}
      <Grid xs={12} sx={{ minHeight: '5vh', minWidth: '8%', }} mb={1} >
        <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'black'} color='white' padding={1.4} >
          filter data by month/year
          <select defaultValue={"12"} onChange={(text)=> [setMonth(text.target.value)]} style={{height:'100%',padding:10,marginLeft:40,textAlign:'center',width:200}}>
            <option value={"1"}>January</option>
            <option value={"2"}>February</option>
            <option value={"3"}>March</option>
            <option value={"4"}>April</option>
            <option value={"5"}>May</option>
            <option value={"6"}>June</option>
            <option value={"7"}>July</option>
            <option value={"8"}>August</option>
            <option value={"9"}>September</option>
            <option value={"10"}>October</option>
            <option value={"11"}>November</option>
            <option value={"12"}>December</option>
            </select> 
              <Button onClick={()=> setYear_(year_-1)} style={{fontSize:20}}>
                <FontAwesomeIcon icon={faMinus} size="1x" color='white'/>
              </Button>
              {year_}
              <Button onClick={()=> setYear_(year_+1)} style={{fontSize:20}}>
                <FontAwesomeIcon icon={faAdd} size="1x" color='white'/>
              </Button>
        </Box>
        <Grid xs={12} sx={{ minHeight: flipped ? '10vh' : '10vh', minWidth: flipped ? '8%' : '8%', cursor: 'pointer' }} onClick={handleFlip}>
          {flipped ? (
            <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#486DF1'} color='white' padding={1} >
              NUMBER OF TOTAL DELIVERIES FOR {month} {year_}
            </Box>
          ) : (
            <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#486DF1'} color='white' padding={1} >
              NUMBER OF TOTAL DELIVERIES FOR {month} {year_}
            </Box>
          )}
          <Box component={Paper}>
            {flipped===false ? (
              /* Content for the flipped state */
              <Box sx={{ height: '50%', width: '100%' }}>
                {/* Your flipped content goes here */}


                <Grid container item xs={12} padding={1} sx={{ minHeight: '10vh', minWidth: '8%', }}>
                  <Grid xs={3} justifyContent='center' justifyItems="center"><Box sx={{ fontSize: '3em', fontWeight: '750', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: "white", backgroundColor: '#486DF1' }}>0</Box></Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid container padding={1} xs={2}>
                    <Grid xs={12} mb={1} ml={1} > <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', alignItems: 'center' }}></Box> <Box fontSize={'14px'} fontWeight={600}> Type of Delivery</Box></Grid>
                    <Grid xs={12}> <Box fontSize='1.5em' ml={1} fontWeight='750' color={'#00BA88'}>300</Box><Box ml={1}fontSize={'12px'}>Normal</Box></Grid>
                    <Grid xs={12}> <Box fontSize='1.5em' ml={1} fontWeight='750' color={'#F4B740'}>300</Box><Box ml={1}fontSize={'12px'}>Ceasarian</Box></Grid>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid container xs={2.5} padding={1} >
                    <Grid item xs={12} mb={1}> <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}></Box><Box fontSize={'14px'} fontWeight={600}>Delivery Outcome </Box> </Grid>
                    <Grid item xs={6}> <Box fontSize='1.5em' ml={1} fontWeight='750' color={'#00BA88'} >143</Box><Box ml={1} fontSize={'12px'}>Alive</Box></Grid>
                    <Grid item xs={6}> <Box fontSize='1.5em' ml={1} fontWeight='750' color={'#F4B740'}>300</Box><Box fontSize={'12px'}>Stillbirth</Box></Grid>
                    <Grid item xs={12} mt={1}> <Box fontSize='1.5em' ml={1} fontWeight='700' color={'#D32F2F'}>300</Box><Box ml={1} fontSize={'12px'}>Miscarriage</Box></Grid>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid container xs={4.4} sx={{ flexDirection: 'row' }} padding={1}>
                    <Grid item xs={12}> <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#F4B740'}></Box><Box fontSize={'14px'} fontWeight={600}>Number of Deliveries Attended by Health Professionals</Box></Grid>
                    <Grid item xs={4}> <Box fontSize='1.5em' ml={1} fontWeight='750' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#00BA88'}>143</Box><Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} fontSize={'12px'}>Doctor</Box></Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={4}> <Box fontSize='1.5em' ml={1} fontWeight='750' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#F4B740'}>300</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} fontSize={'12px'}>Nurse</Box></Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={3}> <Box fontSize='1.5em' ml={1} fontWeight='750' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#D32F2F'}>300</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} fontSize={'12px'}>Midwife</Box></Grid>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              /* Content for the normal state */
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table" size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} >Number of Deliveries Attended by Health Professionals</TableCell>
                      <TableCell colSpan={2} >Type of Delivery</TableCell>
                      <TableCell colSpan={3} >Delivery Outcome</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.subHeader}>Doctor</TableCell>
                      <TableCell className={classes.subHeader}>Nurse</TableCell>
                      <TableCell className={classes.subHeader}>Midwife</TableCell>
                      <TableCell className={classes.subHeader}>Vaginal</TableCell>
                      <TableCell className={classes.subHeader}>Ceasarian</TableCell>
                      <TableCell className={classes.subHeader}>ALIVE</TableCell>
                      <TableCell className={classes.subHeader}>Stillbirth</TableCell>
                      <TableCell className={classes.subHeader}>Miscarriage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row}>
                        <TableCell className={classes.dataCell}>{todVD}</TableCell>
                        <TableCell className={classes.dataCell}>{todVN}</TableCell>
                        <TableCell className={classes.dataCell}>{todVM}</TableCell>
                        <TableCell className={classes.dataCell}>{todVag}</TableCell>
                        <TableCell className={classes.dataCell}>{0}</TableCell>
                        <TableCell className={classes.dataCell}>{todV}</TableCell>
                        <TableCell className={classes.dataCell}>{0}</TableCell>
                        <TableCell className={classes.dataCell}>{0}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className={classes.dataCell}><strong>Total: {todV}</strong></TableCell>
                      <TableCell colSpan={2} className={classes.dataCell}><strong>Total: {todVag}</strong></TableCell>
                      <TableCell colSpan={3} className={classes.dataCell}><strong>Total: {todV}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Grid>
      </Grid>

      {/*------------------------------- TOTAL PREGNANT WOMAN------------------------------ */}
      <Grid xs={6} sx={{ minHeight: '35vh', minWidth: '8%', }} padding={1} >



        <Grid xs={12} sx={{ minHeight: flipped1 ? '35vh' : '25vh', minWidth: flipped1 ? '8%' : '8%', cursor: 'pointer' }} onClick={handleFlip1}>
          {flipped1 ===false ? (
            <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#00BA88'} padding={1} color={'white'} component={Paper}>TOTAL PREGNANT WOMAN</Box>
          ) : (

            <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#00BA88'} padding={1} color={'white'} component={Paper}>TOTAL PREGNANT WOMAN</Box>
          )}
          <Box>
            {flipped1 ===false ? (
              /* Content for the flipped state */
              <Box sx={{ height: '100%', width: '100%' }}>
                {/* Your flipped content goes here */}
                <Grid container component={Paper} item xs={12} padding={1} sx={{ minHeight: '20vh', minWidth: '8%', }}>
                  <Grid xs={3.9} justifyContent='center' justifyItems="center"><Box sx={{ fontSize: '3em', fontWeight: '750', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: "white", backgroundColor: '#00BA88' }}>{mAgeT}</Box></Grid>
                  <Divider orientation="vertical" flexItem />

                  <Divider orientation="vertical" flexItem />
                  <Grid container xs={8} sx={{ flexDirection: 'row' }} padding={1}>
                    <Grid item xs={12}> <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} ></Box> <Box fontSize={'14px' } fontWeight={600}>Age Group</Box></Grid>
                    <Grid item xs={3.9}> <Box fontSize='1.5em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#F4B740'}>{mAgeU}</Box><Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} fontSize={'12px'}>Age 10-14</Box></Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={4}> <Box fontSize='1.5em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#486DF1'}>{mAgeN}</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} fontSize={'12px'}>Age 15-19 </Box></Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={4}> <Box fontSize='1.5em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#D32F2F'}>{mAgeO}</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} fontSize={'12px'}>Age 20-29</Box></Grid>
                  </Grid>
                </Grid>

              </Box>
            ) : (
              /* Content for the normal state */
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table" size='small'>
                  <TableHead>
                    <TableRow >
                      <TableCell >Age Group</TableCell>
                      <TableCell align="right" >Pregnant Women</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.ageGroup}>
                        <TableCell component="th" scope="row">
                          {row.ageGroup}
                        </TableCell>
                        <TableCell align="right">{row.pregnantWomen}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <strong>Total Pregnant Women</strong>
                      </TableCell>
                      <TableCell align="right"><strong>{totalPregnantWomen}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Grid>
      </Grid>
      {/*-------------------------------NUMBER OF LIVE BIRTHS------------------------------ */}
      <Grid xs={6} sx={{ minHeight: '15vh', minWidth: '8%', }}>


      <Grid xs={12} sx={{ minHeight: flipped2 ? '15vh' : '15vh', minWidth: flipped2 ? '8%' : '8%', cursor: 'pointer' }} onClick={handleFlip2}>
          {flipped ===true ? (
            <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#F4B740'} padding={1} color={'white'} component={Paper}>NUMBER OF LIVE BIRTHS</Box>
          ) : (
            <Box m={1} fontSize={'medium'} fontWeight={600} backgroundColor={'#F4B740'} padding={1} color={'white'} component={Paper}>NUMBER OF LIVE BIRTHS</Box>
          )}
          <Box component={Paper}>
            {flipped2 ===false ? (
              /* Content for the flipped state */
              <Box sx={{ height: '100%', width: '100%' }}>
                {/* Your flipped content goes here */}

                <Grid container component={Paper} item xs={12}  padding={1} sx={{ minHeight: '15vh', minWidth: '8%', }}>
                  <Grid containercomponent={Paper} xs={6}>
                    <Grid xs={12} ml={1} > <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', alignItems: 'center' }}></Box> <Box >Gender</Box></Grid>
                    <Grid xs={12}> <Box fontSize='1.5em' ml={1} fontWeight='700' color={'#4E4B66'}>{todMal}</Box> <Box >Male</Box></Grid>
                    <Grid xs={12}> <Box fontSize='1.5em' ml={1} fontWeight='700' color={'#4E4B66'}>{todFal}</Box> <Box>Female</Box></Grid>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid xs={5} justifyContent='center' justifyItems="center"><Box sx={{ fontSize: '3em', fontWeight: '750', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: "white", backgroundColor: '#F4B740' }}>{todGen}</Box></Grid>
                  <Divider orientation="vertical" flexItem />

                  <Grid container xs={12} sx={{ flexDirection: 'row' }} padding={1}>
                    <Grid item xs={12}> <Box fontSize={'medium'} ml={1} fontWeight='600' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#F4B740'}></Box><Box >Weight at Birth</Box></Grid>
                    <Grid item xs={4}> <Box fontSize='1.5em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#00BA88'}>{childWeightN}</Box><Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }}>Normal</Box></Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={4}> <Box fontSize='1.5em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#486DF1'}>{childWeightL}</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }}>Low</Box></Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={3}> <Box fontSize='1.5em' ml={1} fontWeight='700' sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }} color={'#D32F2F'}>{childWeightO}</Box> <Box sx={{ justifyContent: 'center', justifyItems: "center", textAlign: 'center' }}>Overweight</Box></Grid>
                  </Grid>
                </Grid>



              </Box>
            ) : (
              /* Content for the normal state */

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table" size='small'>
                  <TableHead >
                    <TableRow sx={{ color: "white", backgroundColor: "#F4B740" }}>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.subHeader}>Gender</TableCell>
                      <TableCell align="right" className={classes.subHeader}>Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {genderRows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.count}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <strong>Total</strong>
                      </TableCell>
                      <TableCell align="right"><strong>{totalGender}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.subHeader}>Weight at Birth</TableCell>
                      <TableCell align="right" className={classes.subHeader}>Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {weightRows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.count}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <strong>Total</strong>
                      </TableCell>
                      <TableCell align="right"><strong>{totalWeight}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              
            )}
          </Box>
        </Grid>



    </Grid>

    </Grid>
    {/*------------------------------- End Grid------------------------------ */}
  </Grid>
  <Grid item xs={3} sx={{ height:'140vh',alignSelf:'flex-end'}}>
    <Card elevation={4} sx={{ height: 100 + '%', justifyContent: 'center' }} m={1} padding={2}>
      <CardContent>
      </CardContent >
      
    </Card>
  </Grid>
                      






</Grid>
</Box>

  )
}

export default Dashboard