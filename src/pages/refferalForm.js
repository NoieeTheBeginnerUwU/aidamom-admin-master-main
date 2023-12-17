import React from 'react';
import { Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import rhupic from './rhupic.jpg'
import daetlogo from './daet logo.jpg'
import './referralForm.css'; 
import ssb from './ssb.jpg'
import { useState, useRef } from 'react';   
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

function ReferralForm({selectedRow}) {

    const ref = useRef();

    const handlePrint = useReactToPrint({
      content: ()=> ref.current,
     
    }) 
  
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
            dateandtimeReferred:moment(new Date()).format("DD/MM/YYYY hh:mm a"),
            facultyname:"",

//ReferringDetails
facultyEmail:"rhu3daet@gmail.com / lurenetejada@gmail.com",
facultymess:"",
facultyAddress:"4W9W+CFW, San Vicente Rd, Daet, Camarines Norte",
facultyNo:"09209083121",

//Patient Details
patientname: selectedRow.userFname +" " + selectedRow.userMname[0] + ", " + selectedRow.userLname,
patientAge: moment(new Date(),"YYYY/MM/DD").diff(moment(selectedRow.userDob,"YYYY/MM/DD"),"years"),
patientsex:selectedRow.userSex,
civilstatus:selectedRow.userCivilStatus,
patientDOB:selectedRow.userDob,
patientadress:selectedRow.userBarangay+", "+selectedRow.userTown+", "+selectedRow.userProvince,
Patientno:selectedRow.userNumber,
contactperson:selectedRow.userHusband,
bloodType:selectedRow.userBloodType,
G:"",
P:"",
blank:"",
lmp: moment(selectedRow.lastPeriod).format("MMMM DD, YYYY"),
edd: moment(selectedRow.lastPeriod).add(280, "days").format("YYYY/MM/DD"),
aog:moment(new Date(),"YYYY/MM/DD").diff(moment(selectedRow.lastPeriod),'weeks')+" weeks",
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
    
<>

<div className="container" onClick={()=> handlePrint()} ref={ref}>
<Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
      <Box className="header" textAlign="center">
        <h4><strong>Republic of the Philippines</strong></h4>
        <h4><strong>Province of Camarines Norte</strong></h4>
        <h4><strong>Municipality of Daet</strong></h4>
        <h4>MUNICIPAL HEALTH OFFICE</h4>
        <h4><strong>RHU 3 - BIRTHING CENTER</strong></h4>
      
            <br/>
        </Box>
        <Box mr={6}><img src={daetlogo} alt="Daet Logo"  style={{borderRadius:'50%'}} width='85px'/></Box>
        <Box mr={6}><img src={ssb} alt="SSB Logo"  style={{borderRadius:'50%'}} width='85px'/></Box>
        <Box mr={6}><img src={rhupic} alt="RHU Logo"  style={{borderRadius:'50%'}} width='95px'/></Box>
</Box>
<div >
    <label>To:
<input name="to" id= "to" type = "text" style={{width:"45%", border:"none", borderBottom:"1px solid black"}} onChange={(text)=> setreferralForm(prev => {return {...prev,to:text.target.value}})}/>
</label>
<label style={{marginLeft:"10px"}}>Date/Time reffered:</label>
<input name="dateandtime" id= "dateandtime" value={referralForm.dateandtimeReferred} type = "datetime-local"style={{width:"36%", border:"none", borderBottom:"1px solid black"}} onChange={(text)=> setreferralForm(prev => {return {...prev,dateandtime:text.target.value}})} />

<div>
<label>REFERRAL CATEGORY:</label>
<input name="A1" id="A1" class= "checkbox" type="checkbox" style={{marginLeft:"2%"}} onChange={(text)=> setreferralForm(prev => {return {...prev,A1:text.target.value}})}/> <label>A1</label>
<input name="A2" id="A2" class= "checkbox" type="checkbox" style={{marginLeft:"2%"}}onChange={(text)=> setreferralForm(prev => {return {...prev,A2:text.target.value}})}/> <label>A2</label>
<input name="B1" id="B1" class= "checkbox" type="checkbox" style={{marginLeft:"2%"}}onChange={(text)=> setreferralForm(prev => {return {...prev,B1:text.target.value}})}/> <label>B2</label>
<input name="B2" id="B2" class= "checkbox" type="checkbox" style={{marginLeft:"2%"}}onChange={(text)=> setreferralForm(prev => {return {...prev,B2:text.target.value}})}/> <label>B2</label>
<input name="C1" id="C1" class= "checkbox" type="checkbox" style={{marginLeft:"2%"}}onChange={(text)=> setreferralForm(prev => {return {...prev,C1:text.target.value}})}/> <label>C1</label>
<input name="C2" id="C2" class= "checkbox" type="checkbox" style={{marginLeft:"2%"}}onChange={(text)=> setreferralForm(prev => {return {...prev,C2:text.target.value}})}/> <label>C2</label>
<input name="Unclassified" id="Unclassified" class= "checkbox" type="checkbox" style={{marginLeft:"2%"}} onChange={(text)=> setreferralForm(prev => {return {...prev,Unclassified:text.target.value}})}/> <label>Unclassified</label>

</div>

</div>

<table class="table">

<tr>
    <td colspan="5">
       <label>Name of Reffering Faculty:</label><input  type="text" name="facultyname" value={"Daet RHU III - Birthing Center"} id="facultyname" style={{width:"50%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,facultyname:text.target.value}})}></input>
    </td>

    <td colspan="2">
        <label>Email Address : </label><input type="text" value={!referralForm.facultyEmail?"":referralForm.facultyEmail} name="facultyEmail" id="facultyEmail"  style={{width:"90%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,facultyEmail:text.target.value}})}></input>
        
    </td>
    <td colspan="3">
        <label>Messenger Account:</label><input type="text" value={referralForm.facultymess} name="facultymess" id="facultymess"style={{width:"92%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,facultymess:text.target.value}})}></input>
        
    </td>
  
</tr>
<tr>
    <td colspan="7">
        <label> Addres Refering Faculty:</label><input type="text" value={referralForm.facultyAddress} name="facultyAddress" id="facultyAddress"  style={{width:"70%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,facultyAddress:text.target.value}})}></input>
      
    </td>

    <td colspan="3">
        <label> CP No. :</label><input type="number" value={referralForm.facultyNo} id="facultyNo" name="facultyNo"  style={{width:"66%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,facultyNo:text.target.value}})}></input>
       
    </td>
    
</tr>
<tr>
    <td colspan="4">
        <label>  Patient's Name:</label><input type="text" value={referralForm.patientname}  name="patientname"  id="patientname"  style={{width:"75%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,patientname:text.target.value}})}></input>
       
    </td>

    <td colspan="1">
        <label>Age:</label><input type="number" name="patientAge" value={ moment(new Date(),"YYYY/MM/DD").diff(moment(selectedRow.userDob,"YYYY/MM/DD"),"years")} id="patientAge" style={{width:"50%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,patientAge:text.target.value}})} ></input>
      
    </td>
    <td colspan="1">
        <label> Sex:</label><input type="text" name="patientsex" value={referralForm.patientsex} id="patientsex" style={{width:"40%", border:"none" , borderBottom:"1px solid black"}} onChange={(text)=> setreferralForm(prev => {return {...prev,patientsex:text.target.value}})}></input>
       
    </td>
    <td colspan="2">
        <label> Civil Status: </label><input type="text" value={referralForm.civilstatus} name="civilstatus" id="civilstatus" style={{width:"40%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,civilstatus:text.target.value}})}></input>
        
    </td>
    <td colspan="1">
        <label> Date of Birth: </label><input type="date" value={referralForm.patientDOB} name="patientDOB" id="patientDOB" style={{width:"70%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,patientDOB:text.target.value}})}></input>
       
    </td>
    
</tr>
<tr>
    <td colspan="5">
        <label>  Address: </label><input type="text" value={referralForm.patientadress} name="patientadress" id="patientadress" style={{width:"80%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,patientadress:text.target.value}})}></input>
       
    </td>

    <td colspan="2">
        <label>  Tel/Cp No : </label><input type="number" value={referralForm.Patientno} name="Patientno" id="Patientno" style={{width:"60%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,Patientno:text.target.value}})}></input>
       
    </td>
    <td colspan="3">
        <label>  Contact Person:</label><input type="text" value={referralForm.userHusband} name="contactperson" id="contactperson" style={{width:"95%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,contactperson:text.target.value}})}></input>
       
    </td>
   
</tr>
<tr>
    <td colspan="2">
        <label>  Blood Type:</label><input type="text"  value={selectedRow.userBloodType} name="bloodType" id="bloodType" style={{width:"25%", border:"none", borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,bloodType:text.target.value}})}></input>
       
    </td>

    <td colspan="1">
        <label> OB score: </label><br></br>
        <label> G:</label><input type="text" name="G" id="G" class="bottom" style={{width:"25%", border:"none", borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,G:text.target.value}})}></input>
        <label> P:</label><input type="text"  name="P" id="P" class="bottom" style={{width:"25%", border:"none", borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,P:text.target.value}})}></input><br></br>
        <label> (</label><input type="text"  name="blank" id="blank" class="bottomlong" style={{width:"70%", border:"none", borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,blank:text.target.value}})}></input><label> )</label>
    </td>
    <td colspan="1">
        <label>  LMP:</label><input type="text"  value={moment(referralForm.lmp,"MMMM DD, YYYY").format("YYYY/MM/DD")} name="lmp" id="lmp" class="bottomlong" style={{width:"70%", border:"none", borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,lmp:text.target.value}})}></input><br></br>
        <label>  EDD:</label><input type="text" value={referralForm.edd}  name="edd" id="edd" class="bottomlong" style={{width:"70%", border:"none", borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,edd:text.target.value}})}></input><br></br>
        <label> AOG:</label><input type="text" value={referralForm.aog}  name="aog" id="aog" class="bottomlong" style={{width:"70%", border:"none", borderBottom:"1px solid black" }} onChange={(text)=> setreferralForm(prev => {return {...prev,aog:text.target.value}})}></input>
     
    </td>
    <td colspan="2">
       <label>With Pre-Natal:</label> <br></br>
        <input type="checkbox" name="Yesprenatal" id="Yesprenatal" style={{margin:"1%" }}onChange={(text)=> setreferralForm(prev => {return {...prev,Yesprenatal:text.target.value}})}></input>
        <label>Yes</label>
        <input type="checkbox"  name="Noprenatal" id="Noprenatal"onChange={(text)=> setreferralForm(prev => {return {...prev,Noprenatal:text.target.value}})}></input>
        <label>No</label><br></br>
        <label>No. of PNCU</label><input type="text"  name="noPNCU" id="noPNCU" style={{width:"50%", border:"none", borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,noPNCU:text.target.value}})} ></input>
    </td>
    <td colspan="4">
        <label> Where? (Clinic Name/ Address):</label><input type="text" name="whereClinicName" id="whereClinicName" style={{width:"98%", border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,whereClinicName:text.target.value}})}></input>
        
    </td>
</tr>
<tr>
    <td colspan="3">
        <label> Vital Signs:</label><br></br>
        <label> BP:</label><input type="text"   name="bp" id="bp" class="bottom" style={{width:"30%", border:"none" , borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,bp:text.target.value}})} ></input>
        <label> HR:</label><input type="text"  name="hr" id="hr" class="bottom" style={{width:"30%",border:"none" ,  borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,hr:text.target.value}})}></input><br></br>
        <label> RR:</label><input type="text" name="rr" id="rr" class="bottom" style={{width:"30%",border:"none" ,  borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,rr:text.target.value}})}></input>
        <label> Temp:</label><input type="text" name="temp" id="temp" class="bottom" style={{width:"30%",border:"none" ,  borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,temp:text.target.value}})}></input><br></br>
        <label> Weight:</label><input type="text" name="weight" id="weight" class="bottom" style={{width:"30%",border:"none" ,  borderBottom:"1px solid black" }}onChange={(text)=> setreferralForm(prev => {return {...prev,weight:text.target.value}})}></input>
       
      
    </td>

    <td colspan="1">
        <label>Fundic Height:</label>
        <br></br>
        <label> (FH):</label><input type="text" name="fh" id="fh" class="bottomlong" style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,fh:text.target.value}})}></input>
    </td>
    <td colspan="2">
        <label> Fetal Heart Tone:</label>
       <br></br>
        <label> (FHT):</label><input type="text"  name="fht" id="fht" class="bottomlong" style={{width:"60%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,fht:text.target.value}})}></input>
    </td>
    <td colspan="5">
      <label>Internal Examination:</label> <br></br>
       <label> (IE):</label><input type="text" name="ie" id="ie" class="bottomlong" style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,ie:text.target.value}})}></input>
    </td>
   
</tr>
<tr>
    <td colspan="9">
        <label> Danger Signs:</label>
       <br></br>

        <input type="checkbox"  name="Unconcious" id="Unconcious"onChange={(text)=> setreferralForm(prev => {return {...prev,Unconcious:text.target.value}})} />
        <label for="Unconcious"> Unconcious ( Does Not Answer)</label>
        <input type="checkbox"  name="Convulsing" id="Convulsing"onChange={(text)=> setreferralForm(prev => {return {...prev,Convulsing:text.target.value}})} />
        <label for="convulsing"> Convulsing</label>
        <input type="checkbox" name="Looksvery" id="Looksvery"onChange={(text)=> setreferralForm(prev => {return {...prev,Looksvery:text.target.value}})} />
        <label for="looksvery"> Looksvery</label>
        <input type="checkbox"  name="Others" id="Others"onChange={(text)=> setreferralForm(prev => {return {...prev,Others:text.target.value}})} />
        <label for="Others">Others</label>
        <input type="checkbox"  name="PreTermLabor" id="PreTermLabor"onChange={(text)=> setreferralForm(prev => {return {...prev,PreTermLabor:text.target.value}})} />
        <label for="PreTermLabor">Pre-Term Labor</label>
        <input type="checkbox"  name="SevereDifficultyBreathing" id="SevereDifficultyBreathing" onChange={(text)=> setreferralForm(prev => {return {...prev,SevereDifficultyBreathing:text.target.value}})}/>
        <label for="SevereDifficultyBreathing">Severe Difficulty breathing</label>
        <input type="checkbox"  name="Headache" id="Headache"onChange={(text)=> setreferralForm(prev => {return {...prev,Headache:text.target.value}})} />
        <label for="Headache">Headache</label>
        <input type="checkbox"  name="VaginalBleeding" id="VaginalBleeding"onChange={(text)=> setreferralForm(prev => {return {...prev,VaginalBleeding:text.target.value}})} />
        <label for="VaginalBleeding">Vaginal Bleeding</label>
        <input type="checkbox" name="Fever" id="Fever"onChange={(text)=> setreferralForm(prev => {return {...prev,Fever:text.target.value}})} />
        <label for="Fever">Fever</label>
        <input type="checkbox" name="SevereVisualdisturbance" id="SevereVisualdisturbance"onChange={(text)=> setreferralForm(prev => {return {...prev,SevereVisualdisturbance:text.target.value}})} />
        <label for="SevereVisualdisturbance">Severe Visual disturbance</label>
        <input type="checkbox"  name="SevereAbdominalpain" id="SevereAbdominalpain"onChange={(text)=> setreferralForm(prev => {return {...prev,SevereAbdominalpain:text.target.value}})} />
        <label for="SevereAbdominalpain">Severe Abdominal pain</label>
        <input type="checkbox"  name="SevereVomiting"  id="SevereVomiting"onChange={(text)=> setreferralForm(prev => {return {...prev,SevereVomiting:text.target.value}})} />
        <label for="SevereVomiting">Severe Vomiting</label>
        <input type="checkbox"  name="Prom"  id="Prom"onChange={(text)=> setreferralForm(prev => {return {...prev,Prom:text.target.value}})} />
        <label for="Prom">Prom</label>
        <input type="checkbox"  name="OthersDangersign"  id="OtherDangersign"onChange={(text)=> setreferralForm(prev => {return {...prev,OthersDangersign:text.target.value}})} />
        <label for="OthersDangersign">Others</label><input type="text" name="OthersDangersign" id="OthersDangersign" style={{width:"10%", border:"none", borderBottom:"1px solid black"}} onChange={(text)=> setreferralForm(prev => {return {...prev,OthersDangersign:text.target.value}})}></input>
       
        
    </td>

   
</tr>
<tr>
    <td colspan="9">
    <label for="medhistory">Medical History</label>
    <textarea  name="medhistory" id="medhistory" class="bottomlong" cols="95" rows="2" style={{border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,medhistory:text.target.value}})}></textarea>
    </td>
</tr>


<tr>
    <td colspan="9">
        
        <label for="labresults">Laboratory Work-Up and Results (attach the results if Available):</label>
    <textarea type="text"  name="labresults" id="labresults" class="bottomlong" cols="95" rows="2" style={{border:"none" , borderBottom:"1px solid black"}} onChange={(text)=> setreferralForm(prev => {return {...prev,labresults:text.target.value}})}></textarea>
    </td>
</tr>
<tr>
    <td colspan="2">
       <label>Medication:</label> 
    </td>

    <td colspan="1">
    <label>Dosage:</label> 
        
    </td>
    <td colspan="1">
       
        <label>Date/Time Given:</label> 
        
    </td>
    <td colspan="1">
    <label>Medication:</label> 
    </td>
    <td colspan="2">
    <label>Dosage:</label> 
    </td>
    <td colspan="2">
    <label>Date/Time Given:</label> 
    </td>
   
</tr>
<tr>
    <td colspan="1">
    <input type="checkbox" name="Methergin" id="Methergin"onChange={(text)=> setreferralForm(prev => {return {...prev,Methergin:text.target.value}})} />
        <label for="Methergin">Methergin</label>
        
    </td>

    <td colspan="2">
       <input type = "text" name ="methergindose" id ="methergindose" style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,methergindose:text.target.value}})}></input>
    </td>
    <td colspan="1">
       <input type="date"   name="methergindate"  id="methergindate"  style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,methergindate:text.target.value}})}></input>
    </td>
    <td colspan="1">
    <input type="checkbox" name="MsS04" id="MsS04"onChange={(text)=> setreferralForm(prev => {return {...prev,MsS04:text.target.value}})}/>
        <label for="MsS04">MsS04</label>
    </td>
    <td colspan="2">
    <input type = "text" name ="mss04dose" id ="mss04dose" style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,mss04dose:text.target.value}})}></input>
    </td>
    <td colspan="2">
    <input type="date" name="mss04date"  id="mss04date"  style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,mss04date:text.target.value}})}></input>
    </td>
   
</tr>
<tr>
    <td colspan="1">
    <input type="checkbox" name="Oxytocin" id="Oxytocin" onChange={(text)=> setreferralForm(prev => {return {...prev,Oxytocin:text.target.value}})}/>
        <label for="Oxytocin">Oxytocin</label>
    </td>

    <td colspan="2">
    <input type = "text"  name ="oxytocindose" id ="oxytocindose" style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,oxytocindose:text.target.value}})}></input>
    </td>
    <td colspan="1">
    <input type="date" name="oxytocindate" id="oxytocindate"  style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,oxytocindate:text.target.value}})}></input>
    </td>
    <td colspan="1">
    <input type="checkbox" name="Hydralazine" id="Hydralazine" onChange={(text)=> setreferralForm(prev => {return {...prev,Hydralazine:text.target.value}})} />
        <label for="Hydralazine">Hydralazine</label>
    </td>
    <td colspan="2">
    <input type = "text" name ="hydralazinedose" id ="hydralazinedose" style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,hydralazinedose:text.target.value}})}></input>
    </td>
    <td colspan="2">
    <input type="date" name="hydralazinedate"  id="hydralazinedate"  style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,hydralazinedate:text.target.value}})}></input>
    </td>
   
</tr>
<tr>
    <td colspan="1">
    <input type="checkbox" name="Dexamethasone" id="Dexamethasone"onChange={(text)=> setreferralForm(prev => {return {...prev,Dexamethasone:text.target.value}})} />
        <label for="Dexamethasone">Dexamethasone</label>
    </td>

    <td colspan="2">
    <input type = "text"  name ="dexamethasonedose" id ="dexamethasonedose" style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,dexamethasonedose:text.target.value}})}></input>
    </td>
    <td colspan="1">
    <input type="date"  name="dexamethasonedate"  id="dexamethasonedate"  style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,dexamethasonedate:text.target.value}})}></input>
    </td>
    <td colspan="1">
    <input type="checkbox"  name="OthersMedhistory" id="OthersMedhistory" onChange={(text)=> setreferralForm(prev => {return {...prev,OthersMedhistory:text.target.value}})}/>
        <label for="Others">Others</label>
    </td>
    <td colspan="2">
    <input type = "text"   name="OthersMedhistory" id ="OthersMedhistory"  style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,OthersMedhistory:text.target.value}})}></input>
    </td>
    <td colspan="2">
    <input type="date"  name="othersdate"  id="othersdate"  style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,othersdate:text.target.value}})}></input>
    </td>
   
</tr>

<tr>
    <td colspan="6">
       <label for id="impression">Impression:</label>
       <textarea cols="30" rows="3" name="medimpression" id="medimpression" style={{border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,medimpression:text.target.value}})}></textarea>
    </td>

    <td colspan="3">
      <label>REASON FOR REFERRAL:</label>  <br></br>
        <input type="checkbox" name="Consultation" id="Consultation"onChange={(text)=> setreferralForm(prev => {return {...prev,Consultation:text.target.value}})}/>
            <label for="Consultation">Consultation</label>  
        <input type="checkbox" name="TransferofService" id="TransferofService"onChange={(text)=> setreferralForm(prev => {return {...prev,TransferofService:text.target.value}})} />
            <label for="TransferofService">Transfer of Service</label>
        <input type="checkbox"  name="DiagnosticTest" id="DiagnosticTest"onChange={(text)=> setreferralForm(prev => {return {...prev,DiagnosticTest:text.target.value}})} />
             <label for="DiagnosticTest">Diagnostic Test</label>
        <input type="checkbox" name="Othersreferral" id="Othersreferral"onChange={(text)=> setreferralForm(prev => {return {...prev,Othersreferral:text.target.value}})} />
            <label for="Othersreferral">Others</label><input type="text" name="Othersreferral" id="Othersreferral" style={{width:"25%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,Othersreferral:text.target.value}})}></input>

    </td>
    
</tr>
<tr>
    <td colspan="3">
    <label>RPRH REFERRAL:</label>  
    <input type="checkbox" name="Yesreferral" id="Yesreferral" onChange={(text)=> setreferralForm(prev => {return {...prev,Yesreferral:text.target.value}})}/>
             <label for="Yesreferral">Yes</label>
    <input type="checkbox" name="Noreferral" id="Noreferral"onChange={(text)=> setreferralForm(prev => {return {...prev,Noreferral:text.target.value}})} />
            <label for="Noreferral">No</label>
        
    </td>

    <td colspan="3">
    <label>If Yes, Method of choice:</label>  <br></br>
        <input type="checkbox" name="IUD" id="IUD" onChange={(text)=> setreferralForm(prev => {return {...prev,IUD:text.target.value}})}/>
                <label for="IUD">IUD</label>
        <input type="checkbox"   name="PSI" id="PSI" onChange={(text)=> setreferralForm(prev => {return {...prev,PSI:text.target.value}})}/>
                <label for="PSI">PSI</label>
        <input type="checkbox" name="Pills" id="Pills" onChange={(text)=> setreferralForm(prev => {return {...prev,Pills:text.target.value}})}/>
                <label for="Pills">Pills</label>
        <input type="checkbox" name="Condom" id="Condom" onChange={(text)=> setreferralForm(prev => {return {...prev,Condom:text.target.value}})}/>
                <label for="Condom">Condom</label>
        <input type="checkbox" name="BTL" id="BTL"onChange={(text)=> setreferralForm(prev => {return {...prev,BTL:text.target.value}})} />
                <label for="BTL">BTL</label>
        <input type="checkbox"  name="Vasectomy" id="Vasectomy"onChange={(text)=> setreferralForm(prev => {return {...prev,Vasectomy:text.target.value}})} />
                <label for="Vasectomy">Vasectomy</label>
        <input type="checkbox" name="Injectable" id="Injectable"onChange={(text)=> setreferralForm(prev => {return {...prev,Injectable:text.target.value}})} />
                <label for="Injectable">Injectable</label>
        <input type="checkbox"  name="SDM" id="SDM" onChange={(text)=> setreferralForm(prev => {return {...prev,SDM:text.target.value}})}/>
                <label for="SDM">SDM</label>
        <input type="checkbox"  name="LAM" id="LAM"onChange={(text)=> setreferralForm(prev => {return {...prev,LAM:text.target.value}})} />
                <label for="LAM">LAM</label>
    </td>
    <td colspan="3">
       <label>Counseled:</label> <br></br>
       <input type="checkbox" name="Yescounseled" id="Yescounseled"onChange={(text)=> setreferralForm(prev => {return {...prev,Yescounseled:text.target.value}})} />
                <label for="Yescounseled">Yes</label>
        <input type="checkbox" name="Nocounseled" id="Nocounseled"onChange={(text)=> setreferralForm(prev => {return {...prev,Nocounseled:text.target.value}})} />
                <label for="Nocounseled">No</label><br></br>
        <label>Consent (Name and Signiture of the Client)</label>
        <input type="text" name ="consentNameandSign" id ="consentNameandSign" style={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,consentNameandSign:text.target.value}})}></input><br></br>
    </td>
  
</tr>
<tr>
    <td colspan="3">
       <label>NEWBORN REFERRAL:</label> 
        <input type="checkbox" name="Yesnewborn" id="Yesnewborn"onChange={(text)=> setreferralForm(prev => {return {...prev,Yesnewborn:text.target.value}})} />
                <label for="Yesnewborn">Yes</label>
        <input type="checkbox"  name="Nonewborn" id="Nonewborn"onChange={(text)=> setreferralForm(prev => {return {...prev,Nonewborn:text.target.value}})} />
                <label for="Nonewborn">No</label>
    </td>

    <td colspan="2">
        <label>NAME OF NEWBORN:</label>
        <input type="text" name="nameofnewborn" id="nameofnewborn" style={{width:"90%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,nameofnewborn:text.target.value}})}></input>
    </td>
    <td colspan="1">
        <label>SEX : </label>
        <select  name="sexnewborn" id="sexnewborn"onChange={(text)=> setreferralForm(prev => {return {...prev,sexnewborn:text.target.value}})}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        </select>
    </td>
    <td colspan="3">    
    <label>ACCOMPANYING RELATIVE:</label>
        <input type="text"  name="accompanying" id="accompanying" style={{width:"90%", border:"none", borderBottom:"1px solid black"}} onChange={(text)=> setreferralForm(prev => {return {...prev,accompanying:text.target.value}})}></input>
        
    </td>
   
</tr>
<tr>
    <td colspan="3">
       
       <label>Date and Time of Birth:</label>
        <input type="datetime-local" name="dateandtimeofbirth" id="dateandtimeofbirth" style={{width:"70%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,dateandtimeofbirth:text.target.value}})}></input>
    </td>

    <td colspan="3">
            <label for="typeofDelivery">Manner of Delivery:</label>

        <select id="typeofdelivery"onChange={(text)=> setreferralForm(prev => {return {...prev,typeofdelivery:text.target.value}})}>
        <option value="normal">Normal Delivery</option>
        <option value="assisted">Assisted vaginal delivery (vacuum or forceps)</option>
        <option value="cs">Caesarean Delivery (C/S)</option>
        </select>
       
    </td>
   
    <td colspan="3">
       <label>Presentation:</label> 
        
        <select name="typepresentation" id="typepresentation" style={{width:"60%", margin:"5px"}}onChange={(text)=> setreferralForm(prev => {return {...prev,typepresentation:text.target.value}})}>
        <option value="cephalic">Cephalic</option>
        <option value="breech">Breech</option>
        <option value="shoulder">Shoulder</option>
        <option value="compound">Compound</option>
        </select>
    </td>
   
</tr>
<tr>
    <td colspan="3">
    <label> Weight:</label> 
    <input type="number"  name="babyweight" id="babyweight" style={{width:"70%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,babyweight:text.target.value}})}></input>
    </td>

    <td colspan="3">
       
        <label> APGAR score:</label> 
    <input type="number"   name="apgarscore" id="apgarscore" style={{width:"70%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,apgarscore:text.target.value}})}></input>
    </td>
    <td colspan="3">
       
       <label>Classification:</label> 
        
        <select name="babyclassification" id="babyclassification" style={{width:"60%", margin:"5px"}}onChange={(text)=> setreferralForm(prev => {return {...prev,babyclassification:text.target.value}})}>
        <option value="preterm">Pre-Term</option>
        <option value="term">Term</option>
        <option value="postterm">Post-Term</option>
       
        </select>
    </td>
   
</tr>
<tr>
    <td colspan="3">
    <label>Anthropometric Measurement:</label> <br></br>
    <label for id="hc">HC</label><input type="number"  name="hc" id="hc" style={{width:"30%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,hc:text.target.value}})}></input><label style={{margin:"5px"}} >cms</label>
    <label for id="AC">AC</label><input type="number"   name="AC"id="AC" style={{width:"25%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,AC:text.target.value}})}></input><label>cms</label><br></br>
    <label for id="CC">CC</label><input type="number"   name="CC" id="CC"style={{width:"30%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,CC:text.target.value}})}></input><label style={{margin:"5px"}}>cms</label>
    <label for id="BL">BL</label><input type="number"   name="BL" id="BL"style={{width:"30%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,BL:text.target.value}})}></input><label>cms</label>
    </td>

    <td colspan="3">
        <label>Routine Newborn Care:</label><br></br>
        <input type="text" name="vitk" id="vitk" style={{width:"15%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,vitk:text.target.value}})}></input><label style={{marginRight:"25px"}}>Vit K</label>
        <input type="text" name="bcg" id="bcg" style={{width:"15%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,bcg:text.target.value}})}></input><label style={{marginRight:"25px"}}>BCG</label>
        <input type="text"  name="hepbVac" id="hepbVac" style={{width:"15%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,hepbVac:text.target.value}})}></input><label style={{marginRight:"10px"}}>HEP-B Vac</label><br></br>
        <input type="text" name="erythromycin" id="erythromycin" style={{width:"15%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,erythromycin:text.target.value}})}></input><label style={{marginRight:"25px"}}>ERYTHROMYCIN</label>
        <input type="text"  name="nbs" id="nbs" style={{width:"15%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,nbs:text.target.value}})}></input><label style={{marginRight:"25px"}}>NBS</label>
    </td>
    <td colspan="3">
    <label>Vital Signs:</label><br></br>

    <label for id="BP">BP</label><input type="text" name="BP"  id="BP"  style={{width:"15%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,BP:text.target.value}})}></input><label style={{marginRight:"10px"}}>mmHg</label><br></br>
    <label for id="CR">CR</label><input type="number"   name="CR" id="CR"  style={{width:"15%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,CR:text.target.value}})}></input><label style={{marginRight:"10px"}} >bpm</label>
    <label for id="TEMP">TEMP</label><input type="number"   name="TEMP"  id="TEMP"  style={{width:"15%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,TEMP:text.target.value}})}></input><label> °C</label><br></br>
    <label for id="RR">RR</label><input type="text"  name="RR"  id="RR"  style={{width:"15%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,RR:text.target.value}})}></input><label style={{marginRight:"10px"}}>bpm</label>
    <label for id="Sat">Sat</label><input type="text" name="Sat" id="Sat"  style={{width:"15%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,Sat:text.target.value}})}></input><label>%</label>
  
    </td>
    
</tr>
<tr>
    <td colspan="6">
        <label>Condition at Birth:</label><br></br>
        <input type="text" name="meconiumstained" id="meconiumstained"  style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,meconiumstained:text.target.value}})}></input><label style={{marginRight:"10px"}}>meconium stained</label>
        <input type="text"   name="poorcry"  id="poorcry"  style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,poorcry:text.target.value}})}></input><label style={{marginRight:"10px"}}>poor cry/ activity</label>
        <input type="text"  name="convulsion" id="convulsion"  style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,convulsion:text.target.value}})}></input><label style={{marginRight:"10px"}}>convulsion</label>
        <label>CBG</label><input type="text" name="cbg" id="cbg"  style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,cbg:text.target.value}})}></input><label>mg/dl</label>
        <input type="text"  name="poorsuck"  id="poorsuck"  style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,poorsuck:text.target.value}})}></input><label style={{marginRight:"10px"}}>poor suck</label>
        <input type="text"  name="juandice" id="juandice" style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,juandice:text.target.value}})}></input><label style={{marginRight:"10px"}}>juandice</label>
        <input type="text"  name="cyanosis" id="cyanosis"  style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,cyanosis:text.target.value}})}></input><label style={{marginRight:"10px"}}>cyanosis</label>
        <input type="text" name="Congenitalanomalies" id="Congenitalanomalies"  style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,Congenitalanomalies:text.target.value}})}></input><label style={{marginRight:"10px"}}> Congenital anomalies</label>
        <input type="text"  name="respiratorydistress" id="respiratorydistress"  style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,respiratorydistress:text.target.value}})}></input><label style={{marginRight:"10px"}}>respiratory distress (DOB)</label>
        <input type="text"  name="Bleeding" id="Bleeding"  style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,Bleeding:text.target.value}})}></input><label style={{marginRight:"10px"}}>Bleeding</label>
        <input type="text" name="cordcoil"  id="cordcoil"  style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,cordcoil:text.target.value}})}></input><label style={{marginRight:"10px"}}>cord coil</label>
        <input type="text" name="othersCondition" id="othersCondition"  style={{width:"10%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,othersCondition:text.target.value}})}></input><label>others</label>
    
        
    </td>

    <td colspan="3" rowspan = "2">
        <label>Impression</label>
        <textarea  name="newbornimpression" id="newbornimpression" cols="30" rows="8" style={{border:"none" , borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,newbornimpression:text.target.value}})}></textarea>
        
    </td>


</tr>
<tr>
    <td colspan="3">
        <label>Diagnostics:</label>
       
        <textarea  name="babydiagnostic" id="babydiagnostic" cols="20" rows="2" style={{border:"none" , borderBottom:"1px solid black"}} onChange={(text)=> setreferralForm(prev => {return {...prev,babydiagnostic:text.target.value}})}></textarea>
        
    </td>

    <td colspan="3">
        <label>Management: (to include IVF, 02 support, medication)</label>
        <textarea name="management" id="management" cols="38" rows="2" style={{border:"none" , borderBottom:"1px solid black"}} onChange={(text)=> setreferralForm(prev => {return {...prev,management:text.target.value}})}></textarea>
       
        
    </td>

</tr>
<tr>
    <td colspan="5">
       <label> Mode of Transportation:</label><br></br>
     
        <input type="checkbox" name="Ambulance" id="Ambulance"onChange={(text)=> setreferralForm(prev => {return {...prev,Ambulance:text.target.value}})} />
                <label for="Ambulance">Ambulance</label>
        <input type="checkbox"  name="Aircraft" id="Aircraft" onChange={(text)=> setreferralForm(prev => {return {...prev,Aircraft:text.target.value}})}/>
                <label for="Aircraft">Aircraft</label>
                
        <input type="checkbox" name="Privatecars" id="Privatecars"onChange={(text)=> setreferralForm(prev => {return {...prev,Privatecars:text.target.value}})}/>
                <label for="Privatecars">Private cars</label>
        <input type="checkbox" name="Boat" id="Boat" onChange={(text)=> setreferralForm(prev => {return {...prev,Boat:text.target.value}})}/>
                <label for="Boat">Boat</label>
     <input type="checkbox" name="Otherstransport" id="Otherstransport" onChange={(text)=> setreferralForm(prev => {return {...prev,Otherstransport:text.target.value}})}/>
                <label for="Otherstransport">Others</label><br></br><label style={{marginLeft:"10px"}}>please, specify:</label><input type="text" id="others" style={{width:"70%"}}onChange={(text)=> setreferralForm(prev => {return {...prev,Otherstransport:text.target.value}})}></input>
    </td>

    <td colspan="4">
        <label> Name and Designation of Accompanying Personnel:</label>
        <input type="text"  name = "nameAccompanying" id = "nameAccompanying" style={{width:"90%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,nameAccompanying:text.target.value}})}></input>
      
    </td>
   


</tr>
<tr>
    <td colspan="9">
    <label>History of Previous Confinement: </label>
    <input type="checkbox" name="Yesconfinement" id="Yesconfinement" onChange={(text)=> setreferralForm(prev => {return {...prev,Yesconfinement:text.target.value}})}/>
                <label for="Yesconfinement">Yes</label>
        <input type="checkbox" name="Noconfinement" id="Noconfinement"onChange={(text)=> setreferralForm(prev => {return {...prev,Noconfinement:text.target.value}})} />
                <label for="Noconfinement">No</label>
    <label  style={{marginLeft:"20px"}}>If yes, Diagnosis</label><input type="text"  name ="prevdiagnosis"  id ="prevdiagnosis"  style={{width:"50%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,prevdiagnosis:text.target.value}})}></input><br></br>
    <label>Month and Year of Confinement</label><input type="text"  name="confinement" id="confinement"  style={{width:"70%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,confinement:text.target.value}})}></input>
    
    </td>
</tr>
<tr>
    <td colspan="6">
        <label>Printed Name and Designation of REFERRING Personnel:</label><input type="text" name="NameandDesignation" id="NameandDesignation" style={{width:"45%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,NameandDesignation:text.target.value}})}></input>
       
    </td>
    <td colspan="3">
    <label>Telephone / CP No:</label><input type="number" name="referringTelephoneCPNo" id="referringTelephoneCPNo" style={{width:"50%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,referringTelephoneCPNo:text.target.value}})}></input>

    </td>
</tr>
    <tr>
    <td colspan="5">
        <label>Printed Name and Designation of RECEIVING facility Personnel who accepted the referral call:</label><input type="text"  name="referringNameandDesignation" id="referringNameandDesignation" style={{width:"90%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,referringNameandDesignation:text.target.value}})}></input>
    </td>
    <td colspan="3">
    <label>Telephone / CP No:</label><input type="number" name="receivingTelephoneCPNo" id="receivingTelephoneCPNo" style={{width:"90%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,receivingTelephoneCPNo:text.target.value}})}></input>

    </td>
    </tr>
</table>

<div>
    <h3 style={{textAlign:"center"}}>RETURN SLIP</h3>
</div><br/>
<div>
    <strong>Name of Referring Facility:</strong><input type="text" name="referringFacility" id="referringFacility" style={{margin:"5px",width :"60%", border:"none", borderBottom:"2px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,referringFacility:text.target.value}})}></input>
   <br/> <strong>Address of Referring Facility:</strong><input type="text" name="addressreferringFacility" id="addressreferringFacility" style={{margin:"5px",width :"58%", border:"none", borderBottom:"2px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,addressreferringFacility:text.target.value}})}></input>
</div>
<table>
    <tr>
        <td colspan="4">
            <label>Name of Referring Facility:</label><input type="text" id="referringFacility" style ={{width:"40%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,referringFacility:text.target.value}})}></input>
        </td>
        <td colspan="2">
            <label>Date and Time Received:</label><input type="text" name="dateandTimereceived"  id="dateandTimereceived" style ={{width:"52%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,dateandTimereceived:text.target.value}})}></input>
        </td>
        <td colspan="2">
            <label>TEl/CP no.:</label> <input type="text" name="cpno"  id="cpno" style ={{width:"70%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,cpno:text.target.value}})}></input>
        </td>
    </tr>
    <tr>
    <td colspan="4">
            <label>Patient's Name:</label><input type="text" name="patientName" id="patientName" style ={{width:"60%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,patientName:text.target.value}})}></input>
        </td>
        <td colspan="1">
            <label>Age:</label><input type="text"  name="patientAge" id="patientAge" style ={{width:"30%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,patientAge:text.target.value}})}></input>
        </td>
        <td colspan="1">
            <label>Sex:</label><input type="text" name="patientSex" id="patientSex" style ={{width:"50%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,patientSex:text.target.value}})}></input>
        </td>
        <td colspan="1">
            <label>C/S:</label> <input type="text" name="Cs" id="Cs" style ={{width:"70%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,Cs:text.target.value}})}></input>
        </td>
    </tr>
    <tr>
        <td colspan = "9">
            <label>
                PATIENT'S DISPOSITION:
            </label><br></br>

            
        <input type="checkbox"  name="Admitted" id="Admitted"onChange={(text)=> setreferralForm(prev => {return {...prev,Admitted:text.target.value}})} />
                <label for="Admitted">Admitted</label>
        <input type="checkbox"  name="Observation"  id="Observation"onChange={(text)=> setreferralForm(prev => {return {...prev,Observation:text.target.value}})} />
                <label for="Observation">Observation</label>
                
        <input type="checkbox" name="ReferredtoAnotherFacility" id="ReferredtoAnotherFacility"onChange={(text)=> setreferralForm(prev => {return {...prev,ReferredtoAnotherFacility:text.target.value}})} />
          <label for="ReferredtoAnotherFacility">Referred to Another Facility, Please Specify:</label>
                <input type="checkbox"  name="ReturnBacktoReferringFacility" id="ReturnBacktoReferringFacility" onChange={(text)=> setreferralForm(prev => {return {...prev,ReturnBacktoReferringFacility:text.target.value}})}/>
                <label for="ReturnBacktoReferringFacility">Return Back to Referring Facility:</label>
                <input type="checkbox"  name="Managedanddischarged" id="Managedanddischarged"onChange={(text)=> setreferralForm(prev => {return {...prev,Managedanddischarged:text.target.value}})} />
                <label for="Managedanddischarged">Managed and discharged:</label>
                <input type="checkbox" name="Othersdispo" id="Othersdispo" onChange={(text)=> setreferralForm(prev => {return {...prev,othersdispo:text.target.value}})}/>
                <label for="Othersdispo">Others:</label> <label>please, specify:</label><input type="text" name="othersdispo"  id="othersdispo" style={{width:"60%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,othersdispo:text.target.value}})}></input>
        

        </td>

    </tr>
    <tr>
        <td colspan="6">
            <label>Printed Name and Signiture of Receiving Attending Physician:</label><input type="text" name="Printednameandsign"  id="Printednameandsign" style={{width:"90%", border:"none", borderBottom:"2px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,Printednameandsign:text.target.value}})}></input>
        </td> 
        <td colspan="3">
            <label>Telephone/CP no.:</label><input type="text" name="CPnoreceiving" id="CPnoreceiving"    style={{width:"70%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,CPnoreceiving:text.target.value}})}></input>
        </td> 
    </tr>
    
</table>
<div>
<input type="text"  name="referringFacility" id="referringFacility" style={{width :"100%", border:"none", borderBottom:"2px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,referringFacility:text.target.value}})}></input>
</div>

<div style={{marginTop:'0'}}>
    <h3 style={{textAlign:"center"}}>BACK-REFERRAL FORM</h3>
</div>

<table>
    <tr>
        <td colspan="6">
            <label>Name:</label><input type="text"  name="patientname" id="patientname" style ={{width:"90%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,patientname:text.target.value}})}></input>
        </td>
        <td colspan="2">
            <label>Age:</label><input type="text" name="patientAge" id="patientAge" style ={{width:"52%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,patientAge:text.target.value}})}></input>
        </td>
        <td colspan="2">
            <label>Sex:</label> <input type="text"  name="patientsex" id="patientsex" style ={{width:"70%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,patientsex:text.target.value}})}></input>
        </td>
    </tr>
    <tr>
    <td colspan="6">
            <label>Name of NEWBORN:</label><input type="text" name="nameofnewborn" id="nameofnewborn" style ={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,nameofnewborn:text.target.value}})}></input>
        </td>
       
        <td colspan="3">
            <label>Date of Birth:</label><input type="text" name="dateandtimeofbirth" id="dateandtimeofbirth" style ={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,dateandtimeofbirth:text.target.value}})}></input>
        </td>
       
    </tr>
    <tr>
    <td colspan="6">
            <label>Address:</label><input type="text" name="patientadress" id="patientadress" style ={{width:"80%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,patientadress:text.target.value}})}></input>
        </td>
       
        <td colspan="3">
            <label>Contact Number:</label><input type="text" name ="Patientno" id="Patientno" style ={{width:"70%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,Patientno:text.target.value}})}></input>
        </td>

    </tr>
    <tr>
    <td colspan="9">
            <label>Final Diagnosis:</label><br></br><textarea type="text"  name="finalDiag" id="finalDiag"  rows= "2" cols="2000"style ={{width:"80%", border:"none",borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,finalDiag:text.target.value}})}></textarea>
        </td>
       
    </tr>
    <tr>
    <td colspan="6">
            <label>Date of Admission:</label><input type="text" name="dateadmission" id="dateadmission" style ={{width:"60%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,dateadmission:text.target.value}})}></input>
        </td>
       
        <td colspan="3">
            <label>Date of Discharge:</label><input type="text" name="datedischarge" id="datedischarge" style ={{width:"50%", border:"none", borderBottom:"1px solid black"}}onChange={(text)=> setreferralForm(prev => {return {...prev,datedischarge:text.target.value}})}></input>
        </td>
    </tr>
    <tr>
        <td colspan="9">
        <label> Discharge Medication And Home Instructions:</label><br></br>
        <textarea cols="95" rows="3" name="dischargeMedication" id="dischargeMedication"onChange={(text)=> setreferralForm(prev => {return {...prev,dischargeMedication:text.target.value}})}></textarea>
        </td>
    </tr>
    <tr>
        <td colspan = "5">
            <label> Follow-up Check-up on:</label>
        </td>
        <td colspan = "5">
        <label> Name of Facility:</label>

</td>
    </tr>
 
    
</table>
</div>
</>
  );
}

export default ReferralForm;
