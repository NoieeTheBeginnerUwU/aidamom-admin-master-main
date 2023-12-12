import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faAngleLeft, faAngleRight, faArrowLeft, faArrowRotateBack, faBackward, faBackwardStep, faBell, faCalendarXmark, faCancel, faCheckCircle, faCheckSquare, faChevronLeft, faChevronRight, faClose, faCoffee, faEllipsis, faEllipsisVertical, faEyeSlash, faHouseMedicalCircleXmark, faList, faListAlt, faListDots, faListNumeric, faMinus, faNotesMedical, faPersonCirclePlus, faPlugCirclePlus, faPlus, faPrescription, faPrint, faRefresh, faRegistered, faSave, faSearch, faSlash, faSquare, faSyringe, faTableList, faUserPlus, faWarning, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import "../styles/Users.css";
import PatientTable from './PatientTable';
//Import Firebase
import { Firestore } from 'firebase/firestore';
import { authentication } from '../config/firebase';
import { database } from '../config/firebase';
import { getDocs, collection, setDoc, doc, updateDoc, query, addDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { orderBy, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
//Import Moment JS
import moment from 'moment/moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
//Loading animation
import Loading from '../animations/Loading';
import Draggable from 'react-draggable';
//date range picker
import { DateRangePicker } from 'react-date-range';
import format from 'date-fns/format';
import { addDays, setMonth } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
//printing
import { useReactToPrint } from 'react-to-print';
//Font
import "../animations/Bohemian-Typewriter.ttf"
import TopNav from './messages/TopNav';
import { ThemeProvider } from 'styled-components';

const Appointment = () => {

  const [documents, setDocument] = useState([]);
 // const id = authentication.currentUser.uid;
  const [documentId, setDocumentId] = useState();
  const [clicked, setClicked] = useState("");
  const [document, setDocuments] = useState([]);
  const [active, setActive] = useState("newsession"); 
  const [visitor, findVisitor] = useState("");
  const [searching, setSearching] = useState(false);
  const [hovered, setHovered] = useState("");
  const [addUser, setAddUser] = useState("false");
  //active/all
  const [activeSession, setActiveSession] = useState(false);
  const [allSession, setAllSession] = useState(true);
  const [startSession, setStartSession] = useState(false); 
  //card/list
  const [view, setView] = useState("list");
  //number to show in list
  const [viewN, setViewN] = useState(10);
  //sessions array
  const [sessions, setSessions] = useState([]);
  let counter = 0; 
  //show past appontments
  const [past, showPast] = useState(false);
  //toggle ellipsis
  const [toggleEllipsis, setToggleEllipsis] = useState(false);
  const [highlighted, setHighlighted] = useState("");
  const [sub, setSub] = useState("");
  const [step, setStep] = useState(1);
  //sort by
  const [order, setOrder] = useState("desc");
  //user
  const [users, setUsers] = useState([]);
  //add user
  const [sched, setSched] = useState(false);
  const [cancel, showCancel] = useState(false);
  const [fName, setFname] = useState("");
  const [mName, setMname] = useState("");
  const [lName, setLname] = useState("");
  const [number, setNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("YYYY/MM/DD");
  const [lastPeriod, setLastPeriod] = useState("YYYY/MM/DD");
  const [newForm, createNewForm] = useState(false)
  const [more, showMore] = useState(false);
  const today1 = moment(date, "YYYY/MM/DD");
  var date = new Date(); 
  var currentDate = moment(date, "YYYY/MM/DD");
  const [history, setHistory] = useState("appointment");
  const [registrationForm, setRegistrationForm] = useState({
    //basic personal details
    userFname:"",
    userMname:"",
    userLname:"",
    userSuffix:"",
    userSex:"",
    userCivilStatus:"",
    userBloodType:"",
    userReligion:"",
    userNumber:"",
    userDob:"",
    userAge:"",
    userNationality:"",
    userOccupation:"",
    userPurok:"",
    userBarangay:"",
    userTown:"",
    userProvince:"",
    userPlaceOfBirth:"",
    //family details
    userFathersName:"",
    userMothersName:"",
    userHusbandsName:"",
    userHusbandsOccuupation:"",
    userDateOfMarriage:"",
    userPlaceOfMarriage:"",
    userHusbandsNumber:"",
    userCompleteAddress:"",
    userEmployedBy:"",
    userSalary:"",
    userAddressOfEmployer:"",
    userNameOfBarangayCaptain:"",
    //user pregnancy history
      //child1
    userChild1:"",
    userChildDateOfDelivery1:"",
    userChildTypeOfDelivery1:"",
    userChildBirthOutcome1:"",
    userChildNumberOfChildDelivered1:"",
    userChildComplication1:"",
      //child2
    userChild2:"",
    userChildDateOfDelivery2:"",
    userChildTypeOfDelivery2:"",
    userChildBirthOutcome2:"",
    userChildNumberOfChildDelivered2:"",
    userChildComplication2:"",
    //child3
    userChild3:"",
    userChildDateOfDelivery3:"",
    userChildTypeOfDelivery3:"",
    userChildBirthOutcome3:"",
    userChildNumberOfChildDelivered3:"",
    userChildComplication3:"",
    //child3
    userChild3:"",
    userChildDateOfDelivery3:"",
    userChildTypeOfDelivery3:"",
    userChildBirthOutcome3:"",
    userChildNumberOfChildDelivered3:"",
    userChildComplication3:"",
    //child4
    userChild4:"",
    userChildDateOfDelivery4:"",
    userChildTypeOfDelivery4:"",
    userChildBirthOutcome4:"",
    userChildNumberOfChildDelivered4:"",
    userChildComplication4 :"",    
    //child5
    userChild5:"",
    userChildDateOfDelivery5:"",
    userChildTypeOfDelivery5:"",
    userChildBirthOutcome5:"",
    userChildNumberOfChildDelivered5:"",
    userChildComplication5:"",
    //child6
    userChild6:"",
    userChildDateOfDelivery6:"",
    userChildTypeOfDelivery6:"",
    userChildBirthOutcome6:"",
    userChildNumberOfChildDelivered6:"",
    userChildComplication6:"",
    //child7
    userChild7:"",
    userChildDateOfDelivery7:"",
    userChildTypeOfDelivery7:"",
    userChildBirthOutcome7:"",
    userChildNumberOfChildDelivered7:"",
    userChildComplication7:"",
    //child8
    userChild8:"",
    userChildDateOfDelivery8:"",
    userChildTypeOfDelivery8:"",
    userChildBirthOutcome8:"",
    userChildNumberOfChildDelivered8:"",
    userChildComplication8:"",
    //child9
    userChild9:"",
    userChildDateOfDelivery9:"",
    userChildTypeOfDelivery9:"",
    userChildBirthOutcome9:"",
    userChildNumberOfChildDelivered9:"",
    userChildComplication9:"",
    //child10
    userChild10:"",
    userChildDateOfDelivery10:"",
    userChildTypeOfDelivery10:"",
    userChildBirthOutcome10:"",
    userChildNumberOfChildDelivered10:"",
    userChildComplication10:"",
    //user other health conditions 
    userTBPersonal:"",
    userTBFamily:"",
    userHeartDiseasesPersonal:"",
    userHeartDiseasesFamily:"",
    userDiabetesPersonal:"",
    userDiabetesFamily:"",
    userHypertensionPersonal:"",
    userHypertensionFamily:"",
    userBronchialAsthmaPersonal:"",
    userBronchialAsthmaFamily:"",
    userUTIPersonal:"",
    userUTIFamily:"",
    userParasitismPersonal:"",
    userParasitismFamily:"",
    userGoiterPersonal:"",
    userGoiterFamily:"",
    userAnemiaPersonal:"",
    userAnemiaFamily:"",
    userGenitalTrackInfection:"",
    userOtherInfectiousDiseases:"",
    userHighRiskBehavior:"",
    dateCreated: moment(new Date()).format("YYYY/MM/DD hh:mm a"),
    status:"pending", 
    userPic: "",
  })

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

  async function fetchData(){
    const querySnapshot = await getDocs(query(collection(database, 'userData')));
    const userData = [];
    const pending = [];
    let i = 1;
    const data = querySnapshot.forEach(doc=>{
      if(doc.data().fName!==""){
        userData.push({
          id:doc.id,
          lastPeriod:doc.data().lastPeriod,
          userFname:doc.data().userFname,
          userMname:doc.data().userMname,
          userLname:doc.data().userLname,
          userSuffix:doc.data().userSuffix,
          userSex:doc.data().userSex,
          userCivilStatus:doc.data().userCivilStatus,
          userBloodType:doc.data().userBloodType,
          userReligion:doc.data().userReligion,
          userNumber:doc.data().userNumber,
          userDob:doc.data().userDob,
          userAge:doc.data().userAge,
          userNationality:doc.data().userNationality,
          userOccupation:doc.data().userOccupation,
          userPurok:doc.data().userPurok,
          userBarangay:doc.data().userBarangay,
          userTown:doc.data().userTown,
          userProvince:doc.data().userProvince,
          userPlaceOfBirth:doc.data().userPlaceOfBirth,
          //family details
          userFathersName:doc.data().userFathersName,
          userMothersName:doc.data().userMothersName,
          userHusbandsName:doc.data().userHusbandsName,
          userHusbandsOccuupation:doc.data().userHusbandsOccuupation,
          userDateOfMarriage:doc.data().userDateOfMarriage,
          userPlaceOfMarriage:doc.data().userPlaceOfMarriage,
          userHusbandsNumber:doc.data().userHusbandsNumber,
          userCompleteAddress:doc.data().userCompleteAddress,
          userEmployedBy:doc.data().userEmployedBy,
          userSalary:doc.data().userSalary,
          userAddressOfEmployer:doc.data().userAddressOfEmployer,
          userNameOfBarangayCaptain:doc.data().userNameOfBarangayCaptain,
          //user pregnancy history
            //child1
          userChild1:doc.data().userChild1,
          userChildDateOfDelivery1:doc.data().userChildDateOfDelivery1,
          userChildTypeOfDelivery1:doc.data().userChildTypeOfDelivery1,
          userChildBirthOutcome1:doc.data().userChildBirthOutcome1,
          userChildNumberOfChildDelivered1:doc.data().userChildNumberOfChildDelivered1,
          userChildComplication1:doc.data().userChildComplication1,
            //child2
          userChild2:doc.data().userChild2,
          userChildDateOfDelivery2:doc.data().userChildDateOfDelivery2,
          userChildTypeOfDelivery2:doc.data().userChildTypeOfDelivery2,
          userChildBirthOutcome2:doc.data().userChildBirthOutcome2,
          userChildNumberOfChildDelivered2:doc.data().userChildNumberOfChildDelivered2,
          userChildComplication2:doc.data().userChildComplication2,
          //child3
          userChild3:doc.data().userChild3,
          userChildDateOfDelivery3:doc.data().userChildDateOfDelivery3,
          userChildTypeOfDelivery3:doc.data().userChildTypeOfDelivery3,
          userChildBirthOutcome3:doc.data().userChildBirthOutcome3,
          userChildNumberOfChildDelivered3:doc.data().userChildDateOfDelivery3,
          userChildComplication3:doc.data().userChildComplication3,
          //child4
          userChild4:doc.data().userChild4,
          userChildDateOfDelivery4:doc.data().userChildDateOfDelivery4,
          userChildTypeOfDelivery4:doc.data().userChildTypeOfDelivery4,
          userChildBirthOutcome4:doc.data().userChildBirthOutcome4,
          userChildNumberOfChildDelivered4:doc.data().userChildNumberOfChildDelivered4,
          userChildComplication4 :doc.data().userChildComplication4,    
          //child5
          userChild5:doc.data().userChild5,
          userChildDateOfDelivery5:doc.data().userChildDateOfDelivery5,
          userChildTypeOfDelivery5:doc.data().userChildTypeOfDelivery5,
          userChildBirthOutcome5:doc.data().userChildBirthOutcome5,
          userChildNumberOfChildDelivered5:doc.data().userChildNumberOfChildDelivered5,
          userChildComplication5:doc.data().userChildComplication5,
          //child6
          userChild6:doc.data().userChild6,
          userChildDateOfDelivery6:doc.data().userChildDateOfDelivery6,
          userChildTypeOfDelivery6:doc.data().userChildTypeOfDelivery6,
          userChildBirthOutcome6:doc.data().userChildBirthOutcome6,
          userChildNumberOfChildDelivered6:doc.data().userChildNumberOfChildDelivered6,
          userChildComplication6:doc.data().userChildComplication6,
          //child7
          userChild7:doc.data().userChild7,
          userChildDateOfDelivery7:doc.data().userChildDateOfDelivery7,
          userChildTypeOfDelivery7:doc.data().userChildTypeOfDelivery7,
          userChildBirthOutcome7:doc.data().userChildBirthOutcome7,
          userChildNumberOfChildDelivered7:doc.data().userChildNumberOfChildDelivered7,
          userChildComplication7:doc.data().userChildComplication7,
          //child8
          userChild8:doc.data().userChild8,
          userChildDateOfDelivery8:doc.data().userChildDateOfDelivery8,
          userChildTypeOfDelivery8:doc.data().userChildTypeOfDelivery8,
          userChildBirthOutcome8:doc.data().userChildBirthOutcome8,
          userChildNumberOfChildDelivered8:doc.data().userChildNumberOfChildDelivered8,
          userChildComplication8:doc.data().userChildComplication8,
          //child9
          userChild9:doc.data().userChild9,
          userChildDateOfDelivery9:doc.data().userChildDateOfDelivery9,
          userChildTypeOfDelivery9:doc.data().userChildTypeOfDelivery9,
          userChildBirthOutcome9:doc.data().userChildBirthOutcome9,
          userChildNumberOfChildDelivered9:doc.data().userChildNumberOfChildDelivered9,
          userChildComplication9:doc.data().userChildComplication9,
          //child10
          userChild10:doc.data().userChild10,
          userChildDateOfDelivery10:doc.data().userChildDateOfDelivery10,
          userChildTypeOfDelivery10:doc.data().userChildTypeOfDelivery10,
          userChildBirthOutcome10:doc.data().userChildBirthOutcome10,
          userChildNumberOfChildDelivered10:doc.data().userChildNumberOfChildDelivered10,
          userChildComplication10:doc.data().userChildComplication10,
          //user other health conditions 
          userTBPersonal:doc.data().userTBPersonal,
          userTBFamily:doc.data().userTBFamily,
          userHeartDiseasesPersonal:doc.data().userHeartDiseasesPersonal,
          userHeartDiseasesFamily:doc.data().userHeartDiseasesFamily,
          userDiabetesPersonal:doc.data().userDiabetesPersonal,
          userDiabetesFamily:doc.data().userDiabetesFamily,
          userHypertensionPersonal:doc.data().userHypertensionPersonal,
          userHypertensionFamily:doc.data().userHypertensionFamily,
          userBronchialAsthmaPersonal:doc.data().userBronchialAsthmaPersonal,
          userBronchialAsthmaFamily:doc.data().userBronchialAsthmaFamily,
          userUTIPersonal:doc.data().userUTIPersonal,
          userUTIFamily:doc.data().userUTIFamily,
          userParasitismPersonal:doc.data().userParasitismPersonal,
          userParasitismFamily:doc.data().userParasitismFamily,
          userGoiterPersonal:doc.data().userGoiterPersonal,
          userGoiterFamily:doc.data().userGoiterFamily,
          userAnemiaPersonal:doc.data().userAnemiaPersonal,
          userAnemiaFamily:doc.data().userAnemiaFamily,
          userGenitalTrackInfection:doc.data().userGenitalTrackInfection,
          userOtherInfectiousDiseases:doc.data().userOtherInfectiousDiseases,
          userHighRiskBehavior:doc.data().userHighRiskBehavior,
          dateCreated: doc.data().dateCreated,
          status:doc.data().status,
          userLevel:doc.data().userLevel,
          userPic:doc.data().userPic
        });
      }
    })
    setUsers(userData);
    setUserSearch(userData);
    //var i = 1;
    //alert("running "+i++ +" times")
  };

  const handleCreateAccount = async() => {
     if(registrationForm.userFname!==""||registrationForm.userLname!==""||registrationForm.userSex!==""||registrationForm.userAge||registrationForm.userNumber!==""){
      try{
        await addDoc(collection(database, "userData"),{
          userFname:registrationForm.userFname,
          userMname:registrationForm.userMname,
          userLname:registrationForm.userLname,
          userSuffix:registrationForm.userSuffix,
          userSex:registrationForm.userSex,
          userCivilStatus:registrationForm.userCivilStatus,
          userBloodType:registrationForm.userBloodType,
          userReligion:registrationForm.userReligion,
          userNumber:registrationForm.userNumber,
          userDob:registrationForm.userDob,
          userAge:registrationForm.userAge,
          userNationality:registrationForm.userNationality,
          userOccupation:registrationForm.userOccupation,
          userPurok:registrationForm.userPurok,
          userBarangay:registrationForm.userBarangay,
          userTown:registrationForm.userTown,
          userProvince:registrationForm.userProvince,
          userPlaceOfBirth:registrationForm.userPlaceOfBirth,
          //family details
          userFathersName:registrationForm.userFathersName,
          userMothersName:registrationForm.userMothersName,
          userHusbandsName:registrationForm.userHusbandsName,
          userHusbandsOccuupation:registrationForm.userHusbandsOccuupation,
          userDateOfMarriage:registrationForm.userDateOfMarriage,
          userPlaceOfMarriage:registrationForm.userPlaceOfMarriage,
          userHusbandsNumber:registrationForm.userHusbandsNumber,
          userCompleteAddress:registrationForm.userCompleteAddress,
          userEmployedBy:registrationForm.userEmployedBy,
          userSalary:registrationForm.userSalary,
          userAddressOfEmployer:registrationForm.userAddressOfEmployer,
          userNameOfBarangayCaptain:registrationForm.userNameOfBarangayCaptain,
          //user pregnancy history
            //child1
          userChild1:registrationForm.userChild1,
          userChildDateOfDelivery1:registrationForm.userChildDateOfDelivery1,
          userChildTypeOfDelivery1:registrationForm.userChildTypeOfDelivery1,
          userChildBirthOutcome1:registrationForm.userChildBirthOutcome1,
          userChildNumberOfChildDelivered1:registrationForm.userChildNumberOfChildDelivered1,
          userChildComplication1:registrationForm.userChildComplication1,
            //child2
          userChild2:registrationForm.userChild2,
          userChildDateOfDelivery2:registrationForm.userChildDateOfDelivery2,
          userChildTypeOfDelivery2:registrationForm.userChildTypeOfDelivery2,
          userChildBirthOutcome2:registrationForm.userChildBirthOutcome2,
          userChildNumberOfChildDelivered2:registrationForm.userChildNumberOfChildDelivered2,
          userChildComplication2:registrationForm.userChildComplication2,
          //child3
          userChild3:registrationForm.userChild3,
          userChildDateOfDelivery3:registrationForm.userChildDateOfDelivery3,
          userChildTypeOfDelivery3:registrationForm.userChildTypeOfDelivery3,
          userChildBirthOutcome3:registrationForm.userChildBirthOutcome3,
          userChildNumberOfChildDelivered3:registrationForm.userChildDateOfDelivery3,
          userChildComplication3:registrationForm.userChildComplication3,
          //child4
          userChild4:registrationForm.userChild4,
          userChildDateOfDelivery4:registrationForm.userChildDateOfDelivery4,
          userChildTypeOfDelivery4:registrationForm.userChildTypeOfDelivery4,
          userChildBirthOutcome4:registrationForm.userChildBirthOutcome4,
          userChildNumberOfChildDelivered4:registrationForm.userChildNumberOfChildDelivered4,
          userChildComplication4 :registrationForm.userChildComplication4,    
          //child5
          userChild5:registrationForm.userChild5,
          userChildDateOfDelivery5:registrationForm.userChildDateOfDelivery5,
          userChildTypeOfDelivery5:registrationForm.userChildTypeOfDelivery5,
          userChildBirthOutcome5:registrationForm.userChildBirthOutcome5,
          userChildNumberOfChildDelivered5:registrationForm.userChildNumberOfChildDelivered5,
          userChildComplication5:registrationForm.userChildComplication5,
          //child6
          userChild6:registrationForm.userChild6,
          userChildDateOfDelivery6:registrationForm.userChildDateOfDelivery6,
          userChildTypeOfDelivery6:registrationForm.userChildTypeOfDelivery6,
          userChildBirthOutcome6:registrationForm.userChildBirthOutcome6,
          userChildNumberOfChildDelivered6:registrationForm.userChildNumberOfChildDelivered6,
          userChildComplication6:registrationForm.userChildComplication6,
          //child7
          userChild7:registrationForm.userChild7,
          userChildDateOfDelivery7:registrationForm.userChildDateOfDelivery7,
          userChildTypeOfDelivery7:registrationForm.userChildTypeOfDelivery7,
          userChildBirthOutcome7:registrationForm.userChildBirthOutcome7,
          userChildNumberOfChildDelivered7:registrationForm.userChildNumberOfChildDelivered7,
          userChildComplication7:registrationForm.userChildComplication7,
          //child8
          userChild8:registrationForm.userChild8,
          userChildDateOfDelivery8:registrationForm.userChildDateOfDelivery8,
          userChildTypeOfDelivery8:registrationForm.userChildTypeOfDelivery8,
          userChildBirthOutcome8:registrationForm.userChildBirthOutcome8,
          userChildNumberOfChildDelivered8:registrationForm.userChildNumberOfChildDelivered8,
          userChildComplication8:registrationForm.userChildComplication8,
          //child9
          userChild9:registrationForm.userChild9,
          userChildDateOfDelivery9:registrationForm.userChildDateOfDelivery9,
          userChildTypeOfDelivery9:registrationForm.userChildTypeOfDelivery9,
          userChildBirthOutcome9:registrationForm.userChildBirthOutcome9,
          userChildNumberOfChildDelivered9:registrationForm.userChildNumberOfChildDelivered9,
          userChildComplication9:registrationForm.userChildComplication9,
          //child10
          userChild10:registrationForm.userChild10,
          userChildDateOfDelivery10:registrationForm.userChildDateOfDelivery10,
          userChildTypeOfDelivery10:registrationForm.userChildTypeOfDelivery10,
          userChildBirthOutcome10:registrationForm.userChildBirthOutcome10,
          userChildNumberOfChildDelivered10:registrationForm.userChildNumberOfChildDelivered10,
          userChildComplication10:registrationForm.userChildComplication10,
          //user other health conditions 
          userTBPersonal:registrationForm.userTBPersonal,
          userTBFamily:registrationForm.userTBFamily,
          userHeartDiseasesPersonal:registrationForm.userHeartDiseasesPersonal,
          userHeartDiseasesFamily:registrationForm.userHeartDiseasesFamily,
          userDiabetesPersonal:registrationForm.userDiabetesPersonal,
          userDiabetesFamily:registrationForm.userDiabetesFamily,
          userHypertensionPersonal:registrationForm.userHypertensionPersonal,
          userHypertensionFamily:registrationForm.userHypertensionFamily,
          userBronchialAsthmaPersonal:registrationForm.userBronchialAsthmaPersonal,
          userBronchialAsthmaFamily:registrationForm.userBronchialAsthmaFamily,
          userUTIPersonal:registrationForm.userUTIPersonal,
          userUTIFamily:registrationForm.userUTIFamily,
          userParasitismPersonal:registrationForm.userParasitismPersonal,
          userParasitismFamily:registrationForm.userParasitismFamily,
          userGoiterPersonal:registrationForm.userGoiterPersonal,
          userGoiterFamily:registrationForm.userGoiterFamily,
          userAnemiaPersonal:registrationForm.userAnemiaPersonal,
          userAnemiaFamily:registrationForm.userAnemiaFamily,
          userGenitalTrackInfection:registrationForm.userGenitalTrackInfection,
          userOtherInfectiousDiseases:registrationForm.userOtherInfectiousDiseases,
          userHighRiskBehavior:registrationForm.userHighRiskBehavior,
          dateCreated: moment(new Date()).format("YYYY/MM/DD hh:mm a"),
          status:"pending",
          userLevel:"standard user",
          userPic:"",
        }).then(alert("Account created successfully."))
      }catch(e){
        alert(e); 
      }
      addDoc(collection(database, "adminLogs"),{
        activity:"added a new user to the database.",
        category:"added",
        timestamp: moment(new Date()).format("YYYY/MM/DD hh:mm a"),
        day:moment(new Date()).format("DD"),
        month:moment(new Date()).format("MM"),
        Year:moment(new Date()).format("YYYY"),
      })
      setActive("newsession")
     }else{
      alert("Please fill all the necessary inputs to create an account.")
     }
  }

  const handleEditSession = () => {

  }
  
  const handleDeleteSession = (id) => {
    const deleteSession = doc(database, "appointments", id);
    try{
      deleteDoc(deleteSession);
      addDoc(collection(database, "adminLogs"),{
        activity:"daleted an appointment from the database.",
        category:"deleted",
        timestamp: moment(new Date()).format("YYYY/MM/DD hh:mm a"),
        day:moment(new Date()).format("DD"),
        month:moment(new Date()).format("MM"),
        year:moment(new Date()).format("YYYY"),
      })
      alert(id + " has been deleted");
      fetchAppointments();
    }catch(e){
      alert(e)
    }
  }


  const [medicalHistory, setMedicalHistory] = useState([]);
  const [pregnancyHistory, setPregnancyHistory] = useState([]);

  useEffect(()=>{

  },[])

  useEffect(()=>{

    if(active===""){
      setActive("session")
    }
  },[])

    const now = new Date();
    var time = moment().utcOffset('+08:00').format('hh:mm a');
    const dateNow = moment(now).format("YYYY/MM/DD");

  //alert(dateNow + " " + time);

  const [onlineUID, setOnlineUID] = useState("")
   async function handleApprove(id,) {
      const querySnapshot = await updateDoc(doc(database,"onlineAppointments",id),{
        status: "approved"
      });
      alert(id + "has been approved");

      addDoc(collection(database,'notifications'),{
        uid: onlineUID,
        title: "Appointment",
        body: "your request for appointment has been approved",
        timeMade: time,
        dateMade: dateNow,
        status: "unread"
      })
      setActive("addSession")
  };


  async function handleReject(id,) {
    const querySnapshot = await updateDoc(doc(database,"onlineAppointments",id),{
      status: "denied"
    });
    alert(id + "has been denied");

    addDoc(collection(database,'notifications'),{
      uid: onlineUID,
      title: "Appointment",
      body: "your request for appointment has been denied",
      timeMade: time,
      dateMade: dateNow,
      status: "unread"
    })
    setActive("addSession")
};

const [togglePurpose, setTogglePurpose] = useState(true);
const [clickedId, setClickedId] = useState("");
const [isSearching, setIsSearching] = useState(false);
  const [user, searchUser] = useState([]);
  async function searchUsers(vals){
    if(vals===""){
      setIsSearching(false);
    }else{
      setIsSearching(true);
      if(clickedId!==""){
        setIsSearching(false)
      }
    }
    let ins = [];
    let docs = users;
    try{
      let fun = user.map((doc)=>{
        if(vals!==""){
         let val = vals.toLowerCase();
         if(doc.userFname.toLowerCase().includes(val)||doc.userLname.toLowerCase().includes(val)||doc.userMname.toLowerCase().includes(val)){
           ins.push({
            id:doc.id,
            userFname:doc.userFname,
            userMname:doc.userMname,
            userLname:doc.userLname,
            userSuffix:doc.userSuffix,
            userSex:doc.userSex,
            userCivilStatus:doc.userCivilStatus,
            userBloodType:doc.userBloodType,
            userReligion:doc.userReligion,
            userNumber:doc.userNumber,
            userDob:doc.userDob,
            userAge:doc.userAge,
            userNationality:doc.userNationality,
            userOccupation:doc.userOccupation,
            userPurok:doc.userPurok,
            userBarangay:doc.userBarangay,
            userTown:doc.userTown,
            userProvince:doc.userProvince,
            userPlaceOfBirth:doc.userPlaceOfBirth,
            //family details
            userFathersName:doc.userFathersName,
            userMothersName:doc.userMothersName,
            userHusbandsName:doc.userHusbandsName,
            userHusbandsOccuupation:doc.userHusbandsOccuupation,
            userDateOfMarriage:doc.userDateOfMarriage,
            userPlaceOfMarriage:doc.userPlaceOfMarriage,
            userHusbandsNumber:doc.userHusbandsNumber,
            userCompleteAddress:doc.userCompleteAddress,
            userEmployedBy:doc.userEmployedBy,
            userSalary:doc.userSalary,
            userAddressOfEmployer:doc.userAddressOfEmployer,
            userNameOfBarangayCaptain:doc.userNameOfBarangayCaptain,
            //user pregnancy history
              //child1
            userChild1:doc.userChild1,
            userChildDateOfDelivery1:doc.userChildDateOfDelivery1,
            userChildTypeOfDelivery1:doc.userChildTypeOfDelivery1,
            userChildBirthOutcome1:doc.userChildBirthOutcome1,
            userChildNumberOfChildDelivered1:doc.userChildNumberOfChildDelivered1,
            userChildComplication1:doc.userChildComplication1,
              //child2
            userChild2:doc.userChild2,
            userChildDateOfDelivery2:doc.userChildDateOfDelivery2,
            userChildTypeOfDelivery2:doc.userChildTypeOfDelivery2,
            userChildBirthOutcome2:doc.userChildBirthOutcome2,
            userChildNumberOfChildDelivered2:doc.userChildNumberOfChildDelivered2,
            userChildComplication2:doc.userChildComplication2,
            //child3
            userChild3:doc.userChild3,
            userChildDateOfDelivery3:doc.userChildDateOfDelivery3,
            userChildTypeOfDelivery3:doc.userChildTypeOfDelivery3,
            userChildBirthOutcome3:doc.userChildBirthOutcome3,
            userChildNumberOfChildDelivered3:doc.userChildDateOfDelivery3,
            userChildComplication3:doc.userChildComplication3,
            //child4
            userChild4:doc.userChild4,
            userChildDateOfDelivery4:doc.userChildDateOfDelivery4,
            userChildTypeOfDelivery4:doc.userChildTypeOfDelivery4,
            userChildBirthOutcome4:doc.userChildBirthOutcome4,
            userChildNumberOfChildDelivered4:doc.userChildNumberOfChildDelivered4,
            userChildComplication4 :doc.userChildComplication4,    
            //child5
            userChild5:doc.userChild5,
            userChildDateOfDelivery5:doc.userChildDateOfDelivery5,
            userChildTypeOfDelivery5:doc.userChildTypeOfDelivery5,
            userChildBirthOutcome5:doc.userChildBirthOutcome5,
            userChildNumberOfChildDelivered5:doc.userChildNumberOfChildDelivered5,
            userChildComplication5:doc.userChildComplication5,
            //child6
            userChild6:doc.userChild6,
            userChildDateOfDelivery6:doc.userChildDateOfDelivery6,
            userChildTypeOfDelivery6:doc.userChildTypeOfDelivery6,
            userChildBirthOutcome6:doc.userChildBirthOutcome6,
            userChildNumberOfChildDelivered6:doc.userChildNumberOfChildDelivered6,
            userChildComplication6:doc.userChildComplication6,
            //child7
            userChild7:doc.userChild7,
            userChildDateOfDelivery7:doc.userChildDateOfDelivery7,
            userChildTypeOfDelivery7:doc.userChildTypeOfDelivery7,
            userChildBirthOutcome7:doc.userChildBirthOutcome7,
            userChildNumberOfChildDelivered7:doc.userChildNumberOfChildDelivered7,
            userChildComplication7:doc.userChildComplication7,
            //child8
            userChild8:doc.userChild8,
            userChildDateOfDelivery8:doc.userChildDateOfDelivery8,
            userChildTypeOfDelivery8:doc.userChildTypeOfDelivery8,
            userChildBirthOutcome8:doc.userChildBirthOutcome8,
            userChildNumberOfChildDelivered8:doc.userChildNumberOfChildDelivered8,
            userChildComplication8:doc.userChildComplication8,
            //child9
            userChild9:doc.userChild9,
            userChildDateOfDelivery9:doc.userChildDateOfDelivery9,
            userChildTypeOfDelivery9:doc.userChildTypeOfDelivery9,
            userChildBirthOutcome9:doc.userChildBirthOutcome9,
            userChildNumberOfChildDelivered9:doc.userChildNumberOfChildDelivered9,
            userChildComplication9:doc.userChildComplication9,
            //child10
            userChild10:doc.userChild10,
            userChildDateOfDelivery10:doc.userChildDateOfDelivery10,
            userChildTypeOfDelivery10:doc.userChildTypeOfDelivery10,
            userChildBirthOutcome10:doc.userChildBirthOutcome10,
            userChildNumberOfChildDelivered10:doc.userChildNumberOfChildDelivered10,
            userChildComplication10:doc.userChildComplication10,
            //user other health conditions 
            userTBPersonal:doc.userTBPersonal,
            userTBFamily:doc.userTBFamily,
            userHeartDiseasesPersonal:doc.userHeartDiseasesPersonal,
            userHeartDiseasesFamily:doc.userHeartDiseasesFamily,
            userDiabetesPersonal:doc.userDiabetesPersonal,
            userDiabetesFamily:doc.userDiabetesFamily,
            userHypertensionPersonal:doc.userHypertensionPersonal,
            userHypertensionFamily:doc.userHypertensionFamily,
            userBronchialAsthmaPersonal:doc.userBronchialAsthmaPersonal,
            userBronchialAsthmaFamily:doc.userBronchialAsthmaFamily,
            userUTIPersonal:doc.userUTIPersonal,
            userUTIFamily:doc.userUTIFamily,
            userParasitismPersonal:doc.userParasitismPersonal,
            userParasitismFamily:doc.userParasitismFamily,
            userGoiterPersonal:doc.userGoiterPersonal,
            userGoiterFamily:doc.userGoiterFamily,
            userAnemiaPersonal:doc.userAnemiaPersonal,
            userAnemiaFamily:doc.userAnemiaFamily,
            userGenitalTrackInfection:doc.userGenitalTrackInfection,
            userOtherInfectiousDiseases:doc.userOtherInfectiousDiseases,
            userHighRiskBehavior:doc.userHighRiskBehavior,
            dateCreated: doc.dateCreated,
            status:doc.status,
            userLevel:doc.userLevel,
            userPic:doc.userPic
           })
         }
         if(vals===""){
         setUserSearch(docs)
         }
         else{
         setUserSearch(docs)
         }
        }else{
         setUserSearch(docs)
        }
       })
       setUserSearch(ins)
    }catch(e){
     setUserSearch(docs)
    }
    if(vals===""){
     setUserSearch(docs)
    }
    console.log(document)

  }
  const [userSearch, setUserSearch] = useState([]);
  console.log(isSearching)

  async function searchUsers(vals){

    if(vals===""){
      setIsSearching(false);
      console.log("vals" + vals)
      setClickedId("")
    }else{
      setIsSearching(true);
      console.log("vals" + vals)
      if(clickedId!==""){
        setIsSearching(false);
      }
    }
    let ins = [];
      let docs = users;
      try{
        let fun = docs.map((doc)=>{
          if(vals!==""){
           let val = vals.toLowerCase();
           if(doc.userFname.toLowerCase().includes(val)||doc.userMname.toLowerCase().includes(val)||doc.userLname.toLowerCase().includes(val)){
            ins.push({
              id:doc.id,
              userFname:doc.userFname,
              userMname:doc.userMname,
              userLname:doc.userLname,
              userSuffix:doc.userSuffix,
              userSex:doc.userSex,
              userCivilStatus:doc.userCivilStatus,
              userBloodType:doc.userBloodType,
              userReligion:doc.userReligion,
              userNumber:doc.userNumber,
              userDob:doc.userDob,
              userAge:doc.userAge,
              userNationality:doc.userNationality,
              userOccupation:doc.userOccupation,
              userPurok:doc.userPurok,
              userBarangay:doc.userBarangay,
              userTown:doc.userTown,
              userProvince:doc.userProvince,
              userPlaceOfBirth:doc.userPlaceOfBirth,
              //family details
              userFathersName:doc.userFathersName,
              userMothersName:doc.userMothersName,
              userHusbandsName:doc.userHusbandsName,
              userHusbandsOccuupation:doc.userHusbandsOccuupation,
              userDateOfMarriage:doc.userDateOfMarriage,
              userPlaceOfMarriage:doc.userPlaceOfMarriage,
              userHusbandsNumber:doc.userHusbandsNumber,
              userCompleteAddress:doc.userCompleteAddress,
              userEmployedBy:doc.userEmployedBy,
              userSalary:doc.userSalary,
              userAddressOfEmployer:doc.userAddressOfEmployer,
              userNameOfBarangayCaptain:doc.userNameOfBarangayCaptain,
              //user pregnancy history
                //child1
              userChild1:doc.userChild1,
              userChildDateOfDelivery1:doc.userChildDateOfDelivery1,
              userChildTypeOfDelivery1:doc.userChildTypeOfDelivery1,
              userChildBirthOutcome1:doc.userChildBirthOutcome1,
              userChildNumberOfChildDelivered1:doc.userChildNumberOfChildDelivered1,
              userChildComplication1:doc.userChildComplication1,
                //child2
              userChild2:doc.userChild2,
              userChildDateOfDelivery2:doc.userChildDateOfDelivery2,
              userChildTypeOfDelivery2:doc.userChildTypeOfDelivery2,
              userChildBirthOutcome2:doc.userChildBirthOutcome2,
              userChildNumberOfChildDelivered2:doc.userChildNumberOfChildDelivered2,
              userChildComplication2:doc.userChildComplication2,
              //child3
              userChild3:doc.userChild3,
              userChildDateOfDelivery3:doc.userChildDateOfDelivery3,
              userChildTypeOfDelivery3:doc.userChildTypeOfDelivery3,
              userChildBirthOutcome3:doc.userChildBirthOutcome3,
              userChildNumberOfChildDelivered3:doc.userChildDateOfDelivery3,
              userChildComplication3:doc.userChildComplication3,
              //child4
              userChild4:doc.userChild4,
              userChildDateOfDelivery4:doc.userChildDateOfDelivery4,
              userChildTypeOfDelivery4:doc.userChildTypeOfDelivery4,
              userChildBirthOutcome4:doc.userChildBirthOutcome4,
              userChildNumberOfChildDelivered4:doc.userChildNumberOfChildDelivered4,
              userChildComplication4 :doc.userChildComplication4,    
              //child5
              userChild5:doc.userChild5,
              userChildDateOfDelivery5:doc.userChildDateOfDelivery5,
              userChildTypeOfDelivery5:doc.userChildTypeOfDelivery5,
              userChildBirthOutcome5:doc.userChildBirthOutcome5,
              userChildNumberOfChildDelivered5:doc.userChildNumberOfChildDelivered5,
              userChildComplication5:doc.userChildComplication5,
              //child6
              userChild6:doc.userChild6,
              userChildDateOfDelivery6:doc.userChildDateOfDelivery6,
              userChildTypeOfDelivery6:doc.userChildTypeOfDelivery6,
              userChildBirthOutcome6:doc.userChildBirthOutcome6,
              userChildNumberOfChildDelivered6:doc.userChildNumberOfChildDelivered6,
              userChildComplication6:doc.userChildComplication6,
              //child7
              userChild7:doc.userChild7,
              userChildDateOfDelivery7:doc.userChildDateOfDelivery7,
              userChildTypeOfDelivery7:doc.userChildTypeOfDelivery7,
              userChildBirthOutcome7:doc.userChildBirthOutcome7,
              userChildNumberOfChildDelivered7:doc.userChildNumberOfChildDelivered7,
              userChildComplication7:doc.userChildComplication7,
              //child8
              userChild8:doc.userChild8,
              userChildDateOfDelivery8:doc.userChildDateOfDelivery8,
              userChildTypeOfDelivery8:doc.userChildTypeOfDelivery8,
              userChildBirthOutcome8:doc.userChildBirthOutcome8,
              userChildNumberOfChildDelivered8:doc.userChildNumberOfChildDelivered8,
              userChildComplication8:doc.userChildComplication8,
              //child9
              userChild9:doc.userChild9,
              userChildDateOfDelivery9:doc.userChildDateOfDelivery9,
              userChildTypeOfDelivery9:doc.userChildTypeOfDelivery9,
              userChildBirthOutcome9:doc.userChildBirthOutcome9,
              userChildNumberOfChildDelivered9:doc.userChildNumberOfChildDelivered9,
              userChildComplication9:doc.userChildComplication9,
              //child10
              userChild10:doc.userChild10,
              userChildDateOfDelivery10:doc.userChildDateOfDelivery10,
              userChildTypeOfDelivery10:doc.userChildTypeOfDelivery10,
              userChildBirthOutcome10:doc.userChildBirthOutcome10,
              userChildNumberOfChildDelivered10:doc.userChildNumberOfChildDelivered10,
              userChildComplication10:doc.userChildComplication10,
              //user other health conditions 
              userTBPersonal:doc.userTBPersonal,
              userTBFamily:doc.userTBFamily,
              userHeartDiseasesPersonal:doc.userHeartDiseasesPersonal,
              userHeartDiseasesFamily:doc.userHeartDiseasesFamily,
              userDiabetesPersonal:doc.userDiabetesPersonal,
              userDiabetesFamily:doc.userDiabetesFamily,
              userHypertensionPersonal:doc.userHypertensionPersonal,
              userHypertensionFamily:doc.userHypertensionFamily,
              userBronchialAsthmaPersonal:doc.userBronchialAsthmaPersonal,
              userBronchialAsthmaFamily:doc.userBronchialAsthmaFamily,
              userUTIPersonal:doc.userUTIPersonal,
              userUTIFamily:doc.userUTIFamily,
              userParasitismPersonal:doc.userParasitismPersonal,
              userParasitismFamily:doc.userParasitismFamily,
              userGoiterPersonal:doc.userGoiterPersonal,
              userGoiterFamily:doc.userGoiterFamily,
              userAnemiaPersonal:doc.userAnemiaPersonal,
              userAnemiaFamily:doc.userAnemiaFamily,
              userGenitalTrackInfection:doc.userGenitalTrackInfection,
              userOtherInfectiousDiseases:doc.userOtherInfectiousDiseases,
              userHighRiskBehavior:doc.userHighRiskBehavior,
              dateCreated: doc.dateCreated,
              status:doc.status,
              userLevel:doc.userLevel,
              userPic:doc.userPic
            })
           }
           if(vals===""){
            setUserSearch(docs)
           }
           else{
            setUserSearch(ins)
           }
          }else{
            setUserSearch(docs)
          }
         })
          setUserSearch(docs)
      }catch(e){
        setUserSearch(docs)
      }
      if(vals===""){
        setUserSearch(docs)
      }else{
        setUserSearch(ins)
      }
      console.log("USERS"+userSearch)
  }

  async function search(vals){

    if(active==="session"){
      let ins = [];
      let docs = sessions;
      try{
        let fun = sessions.map((doc)=>{
          if(vals!==""){
           let val = vals.toLowerCase();
           if(doc.name.toLowerCase().includes(val)){
             ins.push({id:doc.id, 
              uid:doc.uid,
              name:doc.name,
              appointmentDate:doc.appointmentDate,
            })
           }
           if(vals===""){
            setDocuments(docs)
           }
           else{
            setDocuments(ins)
           }
          }else{
            setDocuments(docs)
          }
         })
          setDocuments(docs)
      }catch(e){
        setDocuments(docs)
      }
      if(vals===""){
        setDocuments(docs)
      }else{
        setDocuments(ins)
      }
      counter=document.length
      console.log(sessions)
    }
    if(active==="addsession"){
      let ins = [];
      let docs = users;
      try{
        docs.map((doc)=>{
          if(vals!==""){
           let val = vals.toLowerCase();
           if(doc.userFname.toLowerCase().includes(val)||doc.userMname.toLowerCase().includes(val)||doc.userLname.toLowerCase().includes(val)){
              ins.push({
                id:doc.id,
                userFname:doc.userFname,
                userMname:doc.userMname,
                userLname:doc.userLname,
                userSuffix:doc.userSuffix,
                userSex:doc.userSex,
                userCivilStatus:doc.userCivilStatus,
                userBloodType:doc.userBloodType,
                userReligion:doc.userReligion,
                userNumber:doc.userNumber,
                userDob:doc.userDob,
                userAge:doc.userAge,
                userNationality:doc.userNationality,
                userOccupation:doc.userOccupation,
                userPurok:doc.userPurok,
                userBarangay:doc.userBarangay,
                userTown:doc.userTown,
                userProvince:doc.userProvince,
                userPlaceOfBirth:doc.userPlaceOfBirth,
                //family details
                userFathersName:doc.userFathersName,
                userMothersName:doc.userMothersName,
                userHusbandsName:doc.userHusbandsName,
                userHusbandsOccuupation:doc.userHusbandsOccuupation,
                userDateOfMarriage:doc.userDateOfMarriage,
                userPlaceOfMarriage:doc.userPlaceOfMarriage,
                userHusbandsNumber:doc.userHusbandsNumber,
                userCompleteAddress:doc.userCompleteAddress,
                userEmployedBy:doc.userEmployedBy,
                userSalary:doc.userSalary,
                userAddressOfEmployer:doc.userAddressOfEmployer,
                userNameOfBarangayCaptain:doc.userNameOfBarangayCaptain,
                //user pregnancy history
                  //child1
                userChild1:doc.userChild1,
                userChildDateOfDelivery1:doc.userChildDateOfDelivery1,
                userChildTypeOfDelivery1:doc.userChildTypeOfDelivery1,
                userChildBirthOutcome1:doc.userChildBirthOutcome1,
                userChildNumberOfChildDelivered1:doc.userChildNumberOfChildDelivered1,
                userChildComplication1:doc.userChildComplication1,
                  //child2
                userChild2:doc.userChild2,
                userChildDateOfDelivery2:doc.userChildDateOfDelivery2,
                userChildTypeOfDelivery2:doc.userChildTypeOfDelivery2,
                userChildBirthOutcome2:doc.userChildBirthOutcome2,
                userChildNumberOfChildDelivered2:doc.userChildNumberOfChildDelivered2,
                userChildComplication2:doc.userChildComplication2,
                //child3
                userChild3:doc.userChild3,
                userChildDateOfDelivery3:doc.userChildDateOfDelivery3,
                userChildTypeOfDelivery3:doc.userChildTypeOfDelivery3,
                userChildBirthOutcome3:doc.userChildBirthOutcome3,
                userChildNumberOfChildDelivered3:doc.userChildDateOfDelivery3,
                userChildComplication3:doc.userChildComplication3,
                //child4
                userChild4:doc.userChild4,
                userChildDateOfDelivery4:doc.userChildDateOfDelivery4,
                userChildTypeOfDelivery4:doc.userChildTypeOfDelivery4,
                userChildBirthOutcome4:doc.userChildBirthOutcome4,
                userChildNumberOfChildDelivered4:doc.userChildNumberOfChildDelivered4,
                userChildComplication4 :doc.userChildComplication4,    
                //child5
                userChild5:doc.userChild5,
                userChildDateOfDelivery5:doc.userChildDateOfDelivery5,
                userChildTypeOfDelivery5:doc.userChildTypeOfDelivery5,
                userChildBirthOutcome5:doc.userChildBirthOutcome5,
                userChildNumberOfChildDelivered5:doc.userChildNumberOfChildDelivered5,
                userChildComplication5:doc.userChildComplication5,
                //child6
                userChild6:doc.userChild6,
                userChildDateOfDelivery6:doc.userChildDateOfDelivery6,
                userChildTypeOfDelivery6:doc.userChildTypeOfDelivery6,
                userChildBirthOutcome6:doc.userChildBirthOutcome6,
                userChildNumberOfChildDelivered6:doc.userChildNumberOfChildDelivered6,
                userChildComplication6:doc.userChildComplication6,
                //child7
                userChild7:doc.userChild7,
                userChildDateOfDelivery7:doc.userChildDateOfDelivery7,
                userChildTypeOfDelivery7:doc.userChildTypeOfDelivery7,
                userChildBirthOutcome7:doc.userChildBirthOutcome7,
                userChildNumberOfChildDelivered7:doc.userChildNumberOfChildDelivered7,
                userChildComplication7:doc.userChildComplication7,
                //child8
                userChild8:doc.userChild8,
                userChildDateOfDelivery8:doc.userChildDateOfDelivery8,
                userChildTypeOfDelivery8:doc.userChildTypeOfDelivery8,
                userChildBirthOutcome8:doc.userChildBirthOutcome8,
                userChildNumberOfChildDelivered8:doc.userChildNumberOfChildDelivered8,
                userChildComplication8:doc.userChildComplication8,
                //child9
                userChild9:doc.userChild9,
                userChildDateOfDelivery9:doc.userChildDateOfDelivery9,
                userChildTypeOfDelivery9:doc.userChildTypeOfDelivery9,
                userChildBirthOutcome9:doc.userChildBirthOutcome9,
                userChildNumberOfChildDelivered9:doc.userChildNumberOfChildDelivered9,
                userChildComplication9:doc.userChildComplication9,
                //child10
                userChild10:doc.userChild10,
                userChildDateOfDelivery10:doc.userChildDateOfDelivery10,
                userChildTypeOfDelivery10:doc.userChildTypeOfDelivery10,
                userChildBirthOutcome10:doc.userChildBirthOutcome10,
                userChildNumberOfChildDelivered10:doc.userChildNumberOfChildDelivered10,
                userChildComplication10:doc.userChildComplication10,
                //user other health conditions 
                userTBPersonal:doc.userTBPersonal,
                userTBFamily:doc.userTBFamily,
                userHeartDiseasesPersonal:doc.userHeartDiseasesPersonal,
                userHeartDiseasesFamily:doc.userHeartDiseasesFamily,
                userDiabetesPersonal:doc.userDiabetesPersonal,
                userDiabetesFamily:doc.userDiabetesFamily,
                userHypertensionPersonal:doc.userHypertensionPersonal,
                userHypertensionFamily:doc.userHypertensionFamily,
                userBronchialAsthmaPersonal:doc.userBronchialAsthmaPersonal,
                userBronchialAsthmaFamily:doc.userBronchialAsthmaFamily,
                userUTIPersonal:doc.userUTIPersonal,
                userUTIFamily:doc.userUTIFamily,
                userParasitismPersonal:doc.userParasitismPersonal,
                userParasitismFamily:doc.userParasitismFamily,
                userGoiterPersonal:doc.userGoiterPersonal,
                userGoiterFamily:doc.userGoiterFamily,
                userAnemiaPersonal:doc.userAnemiaPersonal,
                userAnemiaFamily:doc.userAnemiaFamily,
                userGenitalTrackInfection:doc.userGenitalTrackInfection,
                userOtherInfectiousDiseases:doc.userOtherInfectiousDiseases,
                userHighRiskBehavior:doc.userHighRiskBehavior,
                dateCreated: doc.dateCreated,
                status:doc.status,
                userLevel:doc.userLevel,
                userPic:doc.userPic
            })
           }
           if(vals===""){
            setUserSearch(docs)
           }
           else{
            setUserSearch(ins)
           }
          }else{
            setUserSearch(docs)
          }
         })
          setUserSearch(docs)
      }catch(e){
        setUserSearch(docs)
      }
      if(vals===""){
        setUserSearch(docs)
      }else{
        setUserSearch(ins)
      }
      counter=document.length
      console.log(sessions)
    }
  }

  const [referralForm, setreferralForm]=useState(
    {
        to:"",
        dateandtime:"",
        A1:"",
        A2:"",
        B1:"",
        B2:"",
        C1:"",
        C2:"",
        Unclassified:"",
        facultyname:"",

//ReferringDetails
facultyEmail:"",
facultymess:"",
facultyAddress:"",
facultyNo:"",

//Patient Details
patientname:"",
patientAge:"",
patientsex:"",
civilstatus:"",
patientDOB:"",
patientadress:"",
Patientno:"",
contactperson:"",
bloodType:"",
G:"",
P:"",
blank:"",
lmp:"",
edd:"",
aog:"",
Yesprenatal:"",
Noprenatal:"",
whereClinicName : "",


//VitalSigns
bp:"",
hr:"",
rr:"",
temp:"",
weight:"",
fh:"",
fht:"",
ie:"",


//DangerSigns
Unconcious:"",
Convulsing:"",
Looksvery:"",
Others:"",
PreTermLabor:"",
SevereDifficultyBreathing:"",
Headache:"",
VaginalBleeding:"",
Fever:"",
SevereVisualdisturbance:"",
SevereAbdominalpain:"",
SevereVomiting:"",
Prom:"",
OthersDangersign:"",

//MedicalHistory
medhistory:"",
labresults:"",
Methergin:"",
methergindose:"",
methergindate:"",
MsS04:"",
mss04dose:"",
mss04date:"",
Oxytocin:"",
oxytocindose:"",
oxytocindate:"",
Hydralazine:"",
hydralazinedose:"",
hydralazinedate:"",
Dexamethasone:"",
dexamethasonedose:"",
dexamethasonedate:"",
OthersMedhistory:"",
othersdate:"",
medimpression:"",
Consultation:"",
TransferofService:"",
DiagnosticTest:"",
Othersreferral:"",
Yesreferral:"",
Noreferral:"",

//Methods
IUD:"",
PSI:"",
Pills:"",
Condom:"",
BTL:"",
Vasectomy:"",
Injectable:"",
SDM:"",
LAM:"",

//Counseled

Yescounseled:"",
Nocounseled:"",
consentNameandSign:"",

//NEWBORN REFERRAL
Yesnewborn:"",
Nonewborn:"",
nameofnewborn:"",
sexnewborn:"",
typeofdelivery:"",
accompanying:"",
dateandtimeofbirth:"",
typepresentation:"",
babyweight:"",
apgarscore:"",
babyclassification:"",

hc:"",
AC:"",
CC:"",
BL:"",

vitk:"",
bcg:"",
hepbVac:"",
erythromycin:"",
nbs:"",

//babyVitals
BP:"",
CR:"",
TEMP:"",
RR:"",
Sat:"",


//Condition at Birth

meconiumstained:"",
poorcry:"",
convulsion:"",
cbg:"",
poorsuck:"",
juandice:"",
cyanosis:"",
Congenitalanomalies:"",
respiratorydistress:"",
Bleeding:"",
cordcoil:"",
othersCondition:"",

newbornimpression:"",
babydiagnostic:"",
management:"",

//modeoftransportation
Ambulance:"",
Aircraft:"",
Privatecars:"",
Boat:"",
Otherstransport:"",

nameAccompanying:"",

Yesconfinement:"",
Noconfinement:"",
confinement:"",
prevdiagnosis:"",
NameandDesignation:"",


referringTelephoneCPNo:"",
referringNameandDesignation:"",
receivingTelephoneCPNo:"",
referringFacility:"",
addressreferringFacility:"",
dateandTimereceived:"",
cpno:"",

patientName:"",
patientAge:"",
patientSex:"",
Cs:"",
Admitted:"",
Observation:"",

ReferredtoAnotherFacility:"",
ReturnBacktoReferringFacility:"",
Managedanddischarged:"",
Othersdispo:"",

Printednameandsign:"",
CPnoreceiving:"",
referringFacility:"",

finalDiag:"",
dateadmission:"",
dischargeMedication:"",     
}

)

  return (    
    <ThemeProvider theme={theme}>
  <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'start',overflow:'hidden'}}>
    <PatientTable/>
  </div>
  </ThemeProvider>
  )
}

export default Appointment