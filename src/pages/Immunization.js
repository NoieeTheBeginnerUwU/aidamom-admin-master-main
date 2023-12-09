import React, { useEffect } from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faBaby, faBabyCarriage, faBell, faAdd,faRefresh,faCalendarAlt, faChildReaching, faCoffee, faListAlt, faMapLocation, faMapMarkedAlt, faPersonPregnant, faPlusCircle, faSearch, faSquare, faTableCells, faTransgenderAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import "../styles/Users.css";
//Import Firebase
import { authentication } from '../config/firebase';
import { database } from '../config/firebase';
import { getDocs, collection, setDoc, doc, updateDoc, addDoc } from 'firebase/firestore';
import { storage } from "../config/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
//Import moment
import moment from 'moment';
//Import loading animationn
import Loading from '../animations/Loading';

const Immunization = () => {

  const [documents, setDocuments] = useState([]);
  //const id = authentication.currentUser.uid;
  const [documentId, setDocumentId] = useState();
  const [active, setActive] = useState();
  const [register, setRegister] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [table,setTable] = useState(true);
  const [addImmunization, setAddImmunization] = useState(false);
  const [searching, setSearching] = useState(false)
  const [activeName, setActiveName] = useState("");
  const [forms, setForms] = useState({
    clinic: "",
    barangay: "",
    purok:"",
    childNo:"",
    familyNo:"",
    address:"",
    name:"",
    mother:"",
    mothersEducationalLevel:"",
    mothersOccupation:"",
    noOfPregnancies:"",
    father:"",
    fathersEducationalLevel:"",
    fathersOccupation:"",
    dob:"",
    gestationalAge:"",
    typeOfBirth:"",
    typeOfBirth: "",
    birthOrder:"",
    birthWeight:"",
    birthLength:"",
    placeOfDelivery:"",
    dateOfBirthRegistration:"",
    birthAttendant:""
  })
  //const uid = id.toString();

  async function fetchData(){
    const querySnapshot = await getDocs(collection(database, 'child'));
    const userData = [];
    let date = new Date();
    const dateNow = moment(date, "YYYY/MM/DD");
    try{
      let i = 1;
      const data = querySnapshot.forEach(doc=>{
        userData.push({count: i,id:doc.id, fname:doc.data().childFname, name:doc.data().name,dob:doc.data().dob,lname:doc.data().childLname,gender:doc.data().childGender,mother:doc.data().Mother, vaccinationStatus:doc.data().vaccinationStatus,childAge:moment(dateNow).diff(doc.data().childDob,"weeks"),childPic:doc.data().childPic,motherId:doc.data().Motheruid, dateRegistered:doc.data().dateRegistered,timeRegistered:doc.data().timeRegistered,childPlaceOfBirth:doc.data().childPlaceOfBirth,childAddress:doc.data().childAddress,childDob:doc.data().childDob,father:doc.data().father,height:doc.data().height,weight:doc.data().weight,clinic:doc.data().clinic,barangay:doc.data().barangay,purok:doc.data().purok,address:doc.data().address,mothersEducationalLevel:doc.data().mothersEducationalLevel,mothersOccupation:doc.data().mothersOccupation,fathersName:doc.data().fathersName,fathersEducationalLevel:doc.data().fathersEducationalLevel,fathersOccupation:doc.data().fathersOccupation,childNo:doc.data().childNo,familyNo:doc.data().familyNo,noOfPregnancies:doc.data().noOfPregnancies,gestationalAge:doc.data().gestationalAge,typeOfBirth:doc.data().typeOfBirth,placeOfDelivery:doc.data().placeOfDelivery,birthLength:doc.data().birthLength,dateOfBirthRegistration:doc.data().dateOfBirthRegistration,birthAttendant:doc.data().birthAttendant,newBornScreening1:doc.data().newBornScreening1,newBornScreening2:doc.data().newBornScreening2,bcg1:doc.data().bcg1,bcg2:doc.data().bcg2,bcg3:doc.data().bcg3,hepatitisB1:doc.data().hepatitisB1,hepatitisB2:doc.data().hepatitisB2,hepatitisB3:doc.data().hepatitisB3,pentavalentB1:doc.data().pentavalentB1,pentavalentB2:doc.data().pentavalentB2,pentavalentB3:doc.data().pentavalentB3,oralPolio1:doc.data().oralPolio1,oralPolio2:doc.data().oralPolio2,oralPolio3:doc.data().oralPolio3,inactivePolio1:doc.data().inactivePolio1,inactivePolio2:doc.data().inactivePolio2,inactivePolio3:doc.data().inactivePolio3,pneumococcal1:doc.data().pneumococcal1,pneumococcal2:doc.data().pneumococcal2,pneumococcal3:doc.data().pneumococcal3,measlesRubella1:doc.data().measlesRubella1,measlesRubella2:doc.data().measlesRubella2,measlesRubella3:doc.data().measlesRubella3,vitAcap1_1:doc.data().vitAcap1_1,vitAcap1_2:doc.data().vitAcap1_2,vitAcap2_1:doc.data().vitAcap2_1,vitAcap2_2:doc.data().vitAcap2_2,deworming1:doc.data().deworming1,deworming2:doc.data().deworming2,deworming3:doc.data().deworming3,deworming4:doc.data().deworming4,exclusiveBreast1:doc.data().exclusiveBreast1,exclusiveBreast2:doc.data().exclusiveBreast2,exclusiveBreast3:doc.data().exclusiveBreast3,exclusiveBreast4:doc.data().exclusiveBreast4,complementaryFeeding1:doc.data().complementaryFeeding1,complementaryFeeding2:doc.data().complementaryFeeding2,complementaryFeeding3:doc.data().complementaryFeeding3,complementaryFeeding4:doc.data().complementaryFeeding4,complementaryFeeding5:doc.data().complementaryFeeding5,oralHealth1:doc.data().oralHealth1,oralHealth2:doc.data().oralHealth2,oralHealth3:doc.data().oralHealth3,oralHealth4:doc.data().oralHealth4,oralHealth5:doc.data().oralHealth5,disabilityScreening1:doc.data().disabilityScreening1,disabilityScreening2:doc.data().disabilityScreening2,disabilityScreening3:doc.data().disabilityScreening3,disabilityScreening4:doc.data().disabilityScreening4,disabilityScreening5:doc.data().disabilityScreening5,growthMonitoring:doc.data().growthMonitoring,monthly:doc.data().monthly,twice:doc.data().twice});
        i++;
      })
      setDocuments(userData);
      console.log(documents)
    }catch(e){
      console.log(e);
    }
    //var i = 1;
    //alert("running "+i++ +" times")
  };

  useEffect(()=> {
    fetchData();
  },[]);

  useEffect(()=>{
    if(page<1){
      setPage(1);
    }
    if(page>4){
      setPage(4)
    }
  })

  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    },1500)
  },[])

  let home = false;
  let lyingin = false;
  let hospital = false;
  let others1 = false;
  let othersField1 = false;
  const setPod = async() => {
    if(home===true){
      lyingin = false;
      hospital = false;
      others1 = false;
      othersField1 = false;
    }
    if(lyingin === true){
      home = false;
      hospital = false;
      others1 = false;
      othersField1 = false;
    }
    if(hospital===true){
      home = false;
      lyingin = false;
      others1 = false;
      othersField1 = false;
    }
    if(others1 === true){
      home = false;
      lyingin = false;
      doctor = false;
      othersField1 = true;
    }

  }
  
  let doctor = false;
  let nurse = false;
  let midwife = false;
  let others2 = false;
  let othersField2 = false;
  const setBA = async() => {
    
  }


  async function search(){

  }

  async function registerChild(){
    try{
      if(forms.clinic!==""&&forms.barangay!==""&&forms.purok!==""&&forms.childNo!==""&&forms.familyNo!==""&&forms.address!==""&&forms.name!==""&&forms.mother!==""&&forms.mothersEducationalLevel!==""&&forms.mothersOccupation!==""&&forms.noOfPregnancies!==""&&forms.father!==""&&forms.fathersEducationalLevel!==""&&forms.fathersOccupation!==""&&forms.dob!==""&&forms.typeOfBirth!==""&&forms.birthAttendant!==""&&forms.birthLength!==""&&forms.birthWeight!==""&&forms.birthOrder!==""&&forms.placeOfDelivery!==""){
        addDoc(collection(database, "child"),{
          dateRegistered: moment(new Date()).format("YYYY/MM/DD"),
          day: moment(new Date()).format("DD"),
          month: moment(new Date()).format("MM"),
          Year: moment(new Date()).format("YYYY"),
          clinic: forms.clinic,
          barangay: forms.barangay,
          purok: forms.purok,
          childNo: forms.childNo,
          familyNo: forms.familyNo,
          address: forms.address,
          name: forms.name,
          mother: forms.mother,
          mothersEducationalLevel: forms.mothersEducationalLevel,
          mothersOccupation: forms.mothersOccupation,
          noOfPregnancies: forms.noOfPregnancies,
          father: forms.father,
          fathersEducationalLevel: forms.fathersEducationalLevel,
          fathersOccupation: forms.fathersOccupation,
          dob: forms.dob,
          typeOfBirth: forms.typeOfBirth,
          gestationalAge: forms.gestationalAge,
          typeOfBirth: forms.typeOfBirth,
          birthOrder: forms.birthOrder,
          birthWeight: forms.birthWeight,
          birthLength: forms.birthLength,
          placeOfDelivery: forms.placeOfDelivery,
          dateOfBirthRegistration: forms.dateOfBirthRegistration,
          birthAttendant: forms.birthAttendant
        }).then(alert("Registration successful."))
        addDoc(collection(database, "adminLogs"),{
          activity:"Registered a new child for Immunization.",
          day: moment(new Date()).format("DD"),
          month: moment(new Date()).format("MM"),
          year: moment(new Date()).format("YYYY"),
          timestamp: moment(new Date()).format("YYYY/MM/DD hh:mm a"),
        })
        setRegister(!register)
      }else{
        alert("please fill-up all necessary fields, thank you.")
      }
    }catch(e){
      console.log(e)
      alert("Registration failed, please try again.")
    }
  }

  console.log(forms)

  return (
    <>
      {
        loading?
        <Loading/>
        :
        <div style={{width:'100%',height:'100vh',background:'white',display:'flex',flexDirection:'column',color:'black',overflow:'hidden',}}>
          <div style={{width:'100%',height:'10vh',backgroundColor:'white',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}> 
            <h3 style={{color:'grey',}}>CHILD IMMUNIZATION</h3>
            {
              register===false?
              <div style={{width:'50%',height:'100%',backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                {
                  searching===true&&
                  <div style={{width:500,height:100,backgroundColor:'ghostwhite',zIndex:10,position:'fixed'}}>

                  </div>
                }
              </div>
              :
              <div style={{width:'50%',height:'100%',backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              </div>
            }
            <div style={{width:'30%',height:'100%',backgroundColor:'transparent',cursor:"pointer",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
              {
                register===false||addImmunization===false?
                <>
                    <div onClick={()=> [setRegister(!register),setActive("")]} style={{width:140,height:35,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'navy',borderRadius:5}}>
                      <p style={{fontSize:14,color:'white'}}>Register Child</p>
                    </div>
                </>
                :
                  active===""&&
                  <div onClick={()=> [setRegister(!register),setActive("")]} style={{width:140,height:35,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'navy',borderRadius:5}}>
                    <p style={{fontSize:14,color:'white'}}>go back</p>
                  </div>
              }
            </div>
          </div>
          
          {
            register===true?
            <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'rgb(0,0,60)',fontSize:14}}>
              <div style={{width:'98%',height:'98%',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',overflowY:"scroll"}}>
                <h2>The Early Childhood Care and Development (ECCD) Card</h2>
                <div style={{width:'100%',height:'12.5%',border:'1px solid black',display:'flex',flexDirection:'row'}}>
                  <div style={{width:'70%',height:'100%'}}>
                    <div style={{width:'100%',height:'33%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Clinic/Health Center</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,clinic:text.target.value}})}/> 
                    </div>
                    <div style={{width:'100%',height:'33%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Barangay</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,barangay:text.target.value}})}/> 
                    </div>
                    <div style={{width:'100%',height:'33%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Purok/Sitio</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,purok:text.target.value}})}/> 
                    </div>
                  </div>
                  <div style={{width:'30%',height:'100%'}}>
                    <div style={{width:'100%',height:'50%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Child's No.</p>
                      <input type="number" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,childNo:text.target.value}})}/> 
                    </div>
                    <div style={{width:'100%',height:'50%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Family No.</p>
                      <input type="number" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,familyNo:text.target.value}})}/> 
                    </div>
                  </div>
                </div>
                <div style={{width:'100%',height:'12.5%',border:'1px solid black',display:'flex',flexDirection:'column'}}>
                  <div style={{width:'100%',height:'100%'}}>
                    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
                      <p style={{fontSize:14}}>Complete Address of Family (House No., Street, City, Province )</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,address:text.target.value}})}/> 
                    </div>
                  </div>
                </div>
                <div style={{width:'100%',height:'12.5%',border:'1px solid black',display:'flex',flexDirection:'column'}}>
                  <div style={{width:'100%',height:'100%'}}>
                    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
                      <p style={{fontSize:14}}>Child's Name</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,name:text.target.value}})}/> 
                    </div>
                  </div>
                </div>
                <div style={{width:'100%',height:'12.5%',border:'1px solid black',display:'flex',flexDirection:'row'}}>
                  <div style={{width:'100%',height:'100%'}}>
                    <div style={{width:'100%',height:'33%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Mother's Name</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,mother:text.target.value}})}/> 
                    </div>
                    <div style={{width:'100%',height:'33%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Educational Level</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,mothersEducationalLevel:text.target.value}})}/> 
                    </div>
                    <div style={{width:'100%',height:'33%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Occupation</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,mothersOccupation:text.target.value}})}/> 
                    </div>
                  </div>
                    <div style={{width:'30%',height:'100%'}}>
                      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <p style={{fontSize:14}}>No of Pregnancies.</p>
                        <input type="number" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,noOfPregnancies:text.target.value}})}/> 
                      </div>

                    </div>
                </div>
                <div style={{width:'100%',height:'12.5%',border:'1px solid black',display:'flex',flexDirection:'row'}}>
                  <div style={{width:'100%',height:'100%'}}>
                    <div style={{width:'100%',height:'33%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Father's Name</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,father:text.target.value}})}/> 
                    </div>
                    <div style={{width:'100%',height:'33%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Educational Level</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,fathersEducationalLevel:text.target.value}})}/> 
                    </div>
                    <div style={{width:'100%',height:'33%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Occupation</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,fathersOccupation:text.target.value}})}/> 
                    </div>
                  </div>
                </div>
                <div style={{width:'100%',height:'12.5%',border:'1px solid black',display:'flex',flexDirection:'row'}}>
                  <div style={{width:'33%',height:'100%'}}>
                    <div style={{width:'100%',height:'50%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Birth Date</p>
                      <input type="date" placeholder={new Date()}  onChange={(text)=> setForms(prev => {return {...prev,dob:text.target.value}})}/> 
                    </div>
                    <div style={{width:'100%',height:'50%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Birth Order</p>
                      <input type="text" placeholder=''  onChange={(text)=> setForms(prev => {return {...prev,birthOrder:text.target.value}})}/> 
                    </div>
                  </div>
                  <div style={{width:'33%',height:'100%'}}>
                    <div style={{width:'100%',height:'50%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Gestational Age at Birth</p>
                      <input type="text" placeholder=''  onChange={(text)=> setForms(prev => {return {...prev,gestationalAge:text.target.value}})}/> 
                    </div>
                    <div style={{width:'100%',height:'50%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Birth Weight</p>
                      <input type="text" placeholder=''  onChange={(text)=> setForms(prev => {return {...prev,birthWeight:text.target.value}})}/> 
                    </div>
                  </div>
                  <div style={{width:'33%',height:'100%'}}>
                    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Birth Type</p>
                      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <input type="checkbox" placeholder='Normal' checked={forms.typeOfBirth!=="Normal"?false:true} value="Normal" onChange={(text)=> setForms(prev => {return {...prev,typeOfBirth:text.target.value}})} /> 
                        <p>Normal</p>
                        <input type="checkbox" placeholder='CS'  checked={forms.typeOfBirth!=="Cs"?false:true} value="Cs" onChange={(text)=> setForms(prev => {return {...prev,typeOfBirth:text.target.value}})} /> 
                        <p>CS</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{width:'100%',height:'12.5%',border:'1px solid black',display:'flex',flexDirection:'row'}}>
                  <div style={{width:'70%',height:'100%'}}>
                    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Place of Delivery</p>
                      <input type="checkbox" placeholder='' checked={forms.placeOfDelivery!=="Home"?false:true} value="Home" onChange={(text)=> setForms(prev => {return {...prev,placeOfDelivery:text.target.value}})}/> 
                      <p>Home</p>
                      <input type="checkbox" placeholder='' checked={forms.placeOfDelivery!=="Lying-in"?false:true}  value="Lying-in"   onChange={(text)=> setForms(prev => {return {...prev,placeOfDelivery:text.target.value}})}/> 
                      <p>Lying In</p>
                      <input type="checkbox" placeholder=''  checked={forms.placeOfDelivery!=="Hospital"?false:true}  value="Hospital"   onChange={(text)=> setForms(prev => {return {...prev,placeOfDelivery:text.target.value}})}/> 
                      <p>Hospital</p>
                      <p>Others</p>
                      <input type="text" placeholder='' onChange={(text)=> setForms(prev => {return {...prev,placeOfDelivery:text.target.value}})}/> 
                    </div>
                  </div>
                  <div style={{width:'30%',height:'100%',}}>
                    <div style={{width:'100%',height:'50%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p>Birth Length</p>
                      <input type="text" placeholder=''   onChange={(text)=> setForms(prev => {return {...prev,birthLength:text.target.value}})}/> 
                    </div>
                    <div style={{width:'100%',height:'50%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p>Date of Birth Registration</p>
                      <input type="date" placeholder=''   onChange={(text)=> setForms(prev => {return {...prev,dateOfBirthRegistration:text.target.value}})}/> 
                    </div>
                  </div>
                </div>
                <div style={{width:'100%',height:'12.5%',border:'1px solid black',display:'flex',flexDirection:'row'}}>
                  <div style={{width:'100%',height:'100%'}}>
                    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:14}}>Birth Attendant</p>
                      <input type="checkbox" placeholder='' value="Doctor" checked={forms.birthAttendant!=="Doctor"?false:true} onChange={(text)=> setForms(prev => {return {...prev, birthAttendant:text.target.value}})}/> 
                      <p>Doctor</p>
                      <input type="checkbox" placeholder='' value="Nurse" checked={forms.birthAttendant!=="Nurse"?false:true} onChange={(text)=> setForms(prev => {return {...prev, birthAttendant:text.target.value}})}/> 
                      <p>Nurse</p>
                      <input type="checkbox" placeholder='' value="Midwife" checked={forms.birthAttendant!=="Midwife"?false:true} onChange={(text)=> setForms(prev => {return {...prev, birthAttendant:text.target.value}})}/> 
                      <p>Midwife</p>
                      <p>Others</p>
                      <input type="text" placeholder=''  onChange={(text)=> setForms(prev => {return {...prev, birthAttendant:text.target.value}})}/> 
                    </div>
                  </div>
                </div>
                <div style={{width:'100%',height:70,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'end',border:'none'}}>
                  <button onClick={()=> setRegister(!register)} title='aaaaaa' aria-label='save' style={{width:120,height:40,backgroundColor:'grey',color:'white',marginRight:10,border:'none',cursor:'pointer'}}>cancel</button> 
                  <button onClick={()=> registerChild()} title='aaaaaa' aria-label='save' style={{width:120,height:40,backgroundColor:'navy',color:'white',border:'none',cursor:'pointer'}}>save</button> 
                </div>
              </div>
            </div>
            :
            <>
            {
              table===false?
              <>
              {
                documents.map((doc)=>(
                  <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{width:'60%',height:'84vh', borderRadius:15, display:'flex',flexDirection:'column',alignItems:'center',backgroundColor:'white',margin:'2%',boxShadow: "2px 4px 5px 2px rgb(190,190,255)",overflowY:'scroll'}}> 
                      <li onClick={()=> [setActive(doc.id),setOpen(!open)]} style={{width:'96%',height:100,backgroundColor:'navy',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',textDecoration:'none',listStyleType:'none ',marginTop:30,cursor:'pointer'}}>
                        <div style={{width:40,height:40,borderRadius:20,border:'3px solid white',borderColor:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <p style={{color:'white'}}>{doc.count}</p>
                        </div>
                        <div style={{width:100,height:100,borderRadius:50,border:'10px solid navy',backgroundColor:'white',backgroundImage:doc.userPic===""?"url(../../public/pic.png)":`url(${doc.childPic})`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}}/>
                        <div style={{width:'60%',height:'40%',backgroundColor:'transparent',display:'flex',flexDirection:'column',alignItems:'start'}}>
                          <p style={{color:"white",fontSize:16}}>NAME: {doc.fname} {doc.lname}</p>
                          <p style={{color:"white",fontSize:16}}>AGE: {doc.childAge} weeks old</p>
                          <p style={{color:"white",fontSize:16}}>VACCINATION STATUS: {doc.vaccinationStatus}</p>
                        </div>
                      </li>
                    </div>
                    <div style={{width:'40%',height:'84vh', borderRadius:15, display:'flex',overflow:'hidden',flexDirection:'column',alignItems:'center',backgroundColor:'white',margin:'2%',boxShadow: "2px 4px 5px 2px rgb(190,190,255)"}}> 
                      {
                        open===true && active===doc.id?
                        <div style={{width:'100%',height:'100%',backgroundColor:'ghostwhite',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'start'}}>
                          {
                            page===1&&
                            <>
                              <div style={{marginTop:20}}>
                                <h3>Child's Profile</h3>
                              </div>
                              <div style={{display:'flex',flexDirection:'column',width:'100%',backgroundColor:'transparent',alignItems:'center',justifyContent:'space-evenly',marginTop:20}}>
                                <div style={{width:140,height:140,borderRadius:40,backgroundColor:'white',backgroundImage:doc.userPic===""?"url(../../public/pic.png)":`url(${doc.childPic})`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}}/>
                                <div style={{width:'80%',height:'50%',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'space-around'}}>
                                  <div style={{display:'flex',flexDirection:'row',alignItems:"center",justifyContent:'center',marginTop:20}}>
                                    <FontAwesomeIcon icon={faBabyCarriage} size='1x' color='orange'/>
                                    <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                      Name:
                                    </p>
                                    <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                      {doc.fname}
                                    </p>
                                    <p style={{fontSize:18,fontWeight:500,marginRight:10}}>
                                      {doc.lname}
                                    </p>
                                  </div>
                                  <div style={{display:'flex',flexDirection:'row',alignItems:"center",justifyContent:'center',marginTop:7}}>
                                    <FontAwesomeIcon icon={faTransgenderAlt} size='1x' color='blue'/>
                                    <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                      gender:
                                    </p>
                                      <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                        {doc.gender}
                                      </p>
                                  </div>
                                  <div style={{display:'flex',flexDirection:'row',alignItems:"center",justifyContent:'center',marginTop:7}}>
                                    <FontAwesomeIcon icon={faCalendarAlt} size='1x' color='pink'/>
                                    <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                      date of birth: 
                                    </p>
                                      <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                        {doc.childDob}
                                      </p>
                                  </div>
                                  <div style={{display:'flex',flexDirection:'row',alignItems:"center",justifyContent:'center',marginTop:7}}>
                                    <FontAwesomeIcon icon={faUserCircle} size='1x' color='pink'/>
                                    <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                      Mother: 
                                    </p>
                                      <p style={{fontSize:'.9rem' ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                        {doc.mother}
                                      </p>
                                  </div>
                                  <div style={{display:'flex',flexDirection:'row',alignItems:"center",justifyContent:'center',marginTop:7}}>
                                    <FontAwesomeIcon icon={faUserCircle} size='1x' color='navy'/>
                                    <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                      father: 
                                    </p>
                                      <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                        {doc.father}
                                      </p>
                                  </div>
                                  <div style={{display:'flex',flexDirection:'row',alignItems:"center",justifyContent:'center',marginTop:7}}>
                                    <FontAwesomeIcon icon={faMapLocation} size='1x' color='green'/>
                                    <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                      place of birth: 
                                    </p>
                                      <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                        {doc.childPlaceOfBirth}
                                      </p>
                                  </div>
                                  <div style={{display:'flex',flexDirection:'row',alignItems:"center",justifyContent:'center',marginTop:7}}>
                                    <FontAwesomeIcon icon={faMapMarkedAlt} size='1x' color='darkred'/>
                                    <p style={{fontSize:14 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                      current address: 
                                    </p>
                                      <p style={{fontSize:18 ,fontWeight:500,marginRight:10, marginLeft:20}}>
                                        {doc.childAddress}
                                      </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          }
                          {
                            page===2&&
                            <div style={{width:'100%',height:'100%',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                              <p>Immunization History</p>
                              <div style={{width:'100%',height:'98%',display:'flex',alignItems:'center',justifyContent:'center'}}> 
                                <div style={{width:'98%',height:'90%',border:"6px solid pink",overflowY:'scroll'}}>
                                  <div style={{width:'100%',height:50,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                    <div style={{width:'64%',height:'100%',backgroundColor:'pink',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{fontSize:16}}>Immunization</p>
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'skyblue',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{fontSize:12}}>1st Dose</p>
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'skyblue',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{fontSize:12}}>2nd Dose</p>
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'skyblue',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{fontSize:12}}>3rd Dose</p>
                                    </div>
                                  </div>
                                  <div style={{width:'100%',height:50,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                    <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{fontSize:16}}>BCG</p>
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                  </div>
                                  <div style={{width:'100%',height:50,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                    <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{fontSize:16}}>hepatitis B Vaccine</p>
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                  </div>
                                  <div style={{width:'100%',height:50,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                    <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{fontSize:16}}>Pentavalent Vaccine</p>
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                  </div>
                                  <div style={{width:'100%',height:50,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                    <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{fontSize:16}}>Oral Polio Vaccine</p>
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                  </div>
                                  <div style={{width:'100%',height:50,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                    <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{fontSize:16}}>Inactive Polio Vaccine</p>
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                  </div>
                                  <div style={{width:'100%',height:50,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                    <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{fontSize:16}}>pneumococcal Vaccine</p>
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                  </div>
                                  <div style={{width:'100%',height:50,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                    <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      <p style={{fontSize:16}}>Measles-Rubella Vaccine</p>
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                    <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                          {
                            page===3&&
                            <div style={{width:'100%',height:'100%',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <p>Micronutrient Supplementation</p>
                            <div style={{width:'100%',height:'98%',display:'flex',alignItems:'center',justifyContent:'center'}}> 
                              <div style={{width:'98%',height:'90%',border:"6px solid pink",overflowY:'scroll'}}>
                                <div style={{width:'100%',height:50,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                  <div style={{width:'64%',height:'100%',backgroundColor:'pink',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:16}}>Supplementation</p>
                                  </div>
                                  <div style={{width:'12%',height:'100%',backgroundColor:'skyblue',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:12}}>1st Dose</p>
                                  </div>
                                  <div style={{width:'12%',height:'100%',backgroundColor:'skyblue',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:12}}>2nd Dose</p>
                                  </div>
                                  <div style={{width:'12%',height:'100%',backgroundColor:'skyblue',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:12}}>3rd Dose</p>
                                  </div>
                                </div>
                                <div style={{width:'100%',height:100,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                  <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:16}}>BCG</p>
                                  </div>
                                  <div style={{width:'18%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'18%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                </div>
                                <div style={{width:'100%',height:100,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                  <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:16}}>hepatitis B Vaccine</p>
                                  </div>
                                  <div style={{width:'18%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'18%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                </div>
                                <div style={{width:'100%',height:100,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                  <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:16}}>Pentavalent Vaccine</p>
                                  </div>
                                  <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'12%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          }
                          {
                            page===4 &&
                            <div style={{width:'100%',height:'100%',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <p>Counselling</p>
                            <div style={{width:'100%',height:'98%',display:'flex',alignItems:'center',justifyContent:'center'}}> 
                              <div style={{width:'98%',height:'90%',border:"6px solid pink",overflowY:'scroll'}}>
                                <div style={{width:'100%',height:50,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                  <div style={{width:'64%',height:'100%',backgroundColor:'pink',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:16}}>Immunization</p>
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'skyblue',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:12}}>1st Dose</p>
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'skyblue',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:12}}>2nd Dose</p>
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'skyblue',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:12}}>3rd Dose</p>
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'skyblue',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:12}}>3rd Dose</p>
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'skyblue',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:12}}>3rd Dose</p>
                                  </div>
                                </div>
                                <div style={{width:'100%',height:80,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                  <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:16}}>Exclusive Breast Feeding</p>
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                </div>
                                <div style={{width:'100%',height:80,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                  <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:16}}>Complementary Feeding</p>
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                  </div>
                                </div>
                                <div style={{width:'100%',height:80,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                  <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:16}}>Oral/Dental Health</p>
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                  </div>
                                </div>
                                <div style={{width:'100%',height:80,display:'flex',flexDirection:'row',backgroundColor:'white',border:'1px solid black'}}>
                                  <div style={{width:'64%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:16}}>Disabiility Screening</p>
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                    
                                  </div>
                                  <div style={{width:'10%',height:'100%',backgroundColor:'white',display:'flex',border:'.4px solid black',alignItems:'center',justifyContent:'center'}}>
                                      
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          }
                        </div>
                          :
                        <div style={{width:"100%",height:'100%',backgroundColor:'transparent',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                          <FontAwesomeIcon icon={faListAlt} size='6x' color='pink'/>
                          <p style={{fontWeight:500,marginTop:20}}>No child selected</p>
                        </div>
                      }
                      <div style={{width:200,height:40,backgroundColor:'transparent',marginBottom:20 ,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <FontAwesomeIcon icon={faAngleLeft} size='1x' color='grey' onClick={()=> setPage(page-1)} style={{cursor:'pointer'}}/>
                          <div style={{width:'80%'}}>
                            <p style={{color:'black',fontSize:20,fontWeight:500}}>page {page}</p>
                          </div>
                        <FontAwesomeIcon icon={faAngleRight} size='1x' color='grey' onClick={()=> setPage(page+1)} style={{cursor:'pointer'}}/>
                      </div>
                    </div>
                  </div>
                ))
              }
              </>
              :
              <>
                {
                  addImmunization===false?
                  <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <div style={{width:'90%',height:'90%',backgroundColor:'ghostwhite',boxShadow:'1px 2px 10px 1px grey',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                      <div style={{width:'100%',height:'10%',backgroundColor:'ghostwhite',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <>
                          <input type='text' style={{padding:'1.5%',margin:'1%',width:'70%',borderRadius:5,color:'skyblue',border:'1px solid grey'}} placeholder='search existing child' onChange={()=> alert()} />
                        </>
                        <div onClick={()=> search("")} style={{width:60,height:30,backgroundColor:'navy',margin:10,borderRadius:5,display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'center',cursor:'pointer'}}>
                          <FontAwesomeIcon icon={faRefresh} style={{fontSize:15,marginRight:5}} color='white'/>
                        </div>
                      </div>
                      <div style={{width:'98%',height:'90%',overflowY:'scroll'}}>
                        {
                          documents.map((doc)=>(
                            <div onClick={()=> [setActive(doc.id),setActiveName(doc.name)]} style={{width:'100%',height:60,backgroundColor:active===doc.id?'navy':'lightgrey',marginTop:10,color:'white',display:'flex',cursor:'pointer',flexDirection:'row',alignItems:'center',justifyContent:'start'}}>
                              <p style={{fontSize:14,marginLeft:20,color:active===doc.id?'white':'black'}}>{doc.name}</p>
                            </div>
                          ))
                        }
                      </div>
                      <div style={{width:'100%',height:'10%',backgroundColor:'ghostwhite',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'end'}}>
                        <div onClick={()=> setAddImmunization(!addImmunization)} style={{width:120,height:40,backgroundColor:'navy',margin:20,padding:10,borderRadius:5,display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'center',cursor:'pointer'}}>
                          <FontAwesomeIcon icon={faAdd} style={{fontSize:15,marginRight:5}} color='white'/>
                          <p style={{fontSize:12,fontWeight:600,color:'white'}}>add new immunization</p>
                        </div>
                      </div>
                    </div>
                  </div>
                :
                <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                  <div style={{width:'48%',height:'99%',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start',backgroundColor:'rgb(0,0,60)'}}>
                    <div style={{}}>
                    </div>  
                  </div>
                  <div style={{width:'48%',height:'99%',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start',backgroundColor:'ghostwhite',boxShadow:'1px 3px 10px 1px grey'}}>
                    
                    </div>
                </div>
                }
              </>
            }
          </>
          }
        </div>
      }
    </>
  )
}

export default Immunization