import { faFile, faFileCirclePlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import ReactDropdown from 'react-dropdown';
import { useReactToPrint } from 'react-to-print';
import { Box,Typography, Divider } from '@mui/material';
//firebase
import { database } from '../config/firebase';
import { authentication } from '../config/firebase';
import { addDoc, collection, } from 'firebase/firestore';
//moment js
import moment from 'moment';




import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DischargeSummary from './dischargeSummary';
import Button from '@material-ui/core/Button';
import Consent from './consent';
import PatientDataForm from './patientdata';
import PatientHistoryForm from './patientHistory';
import ClinicalCoverSheet from './clinicalCoverSheet';
import ReferralForm from './refferalForm';
import PrintIcon from '@mui/icons-material/Print';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  form: {
    margin: theme.spacing(1),
  },
}));


const Reports = () => {

  const [fillUp, setFillUp] = useState(false);
  const [chose, setChose] = useState("form1");
  const ref = useRef();

  const handlePrint = useReactToPrint({
    content: ()=> ref.current,
  }) 

  const classes = useStyles();
  const [form, setForm] = useState('PatientHistory');

  const handleChange = (event) => {
    setForm(event.target.value);
  };

    const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
    });
  

  return (

    <>

<div style={{width:'100%',height:'100%',backgroundColor:'ghostwhite',flexDirection:'row',display:'flex',alignItems:'start',justifyContent:'start',transition:"ease-in-out",animation:'ease-in-out',transitionDuration:'.7s',animationDelay:'1s',overflowY:'scroll'}}>  
      <Divider sx={{ marginBottom: 2 }}></Divider>
      <FormControl className={classes.formControl}>
        <InputLabel id="form-select-label">Select Form</InputLabel>
        <Select
          labelId="form-select-label"
          id="form-select"
          style={{width:'100%'}}
          value={form}
          onChange={handleChange}
        >
          <MenuItem value={'PatientHistory'}>Patient History</MenuItem>
          <MenuItem value={'PatientDataForm'}>Patient DataForm</MenuItem>
          <MenuItem value={'dischargesummary'}>Discharge Summary</MenuItem>
          <MenuItem value={'Consent'}>Consent Form</MenuItem>
          <MenuItem value={'ClinicalCoverSheet'}>Clinical Cover Sheet</MenuItem>
          <MenuItem value={'RefferalForm'}>Refferal Form</MenuItem>
        </Select>
        <Button onClick={()=> handlePrint()} style={{backgroundColor:'skyblue',color:'white',fontWeight:600,marginTop:20}}>
            <FontAwesomeIcon icon={faPrint} size='1x' color='white'/>
        </Button>
      </FormControl>
      {form === 'PatientHistory' && (
        <div>
         <PatientHistoryForm />
        </div>
      )}
       {form === 'ClinicalCoverSheet'  && (
        <div>
         <ClinicalCoverSheet/>
        </div>
      )}
      {form === 'PatientDataForm' && (
        <div>
          <PatientDataForm/>
        </div>
      )}
      {form === 'dischargesummary' && (
        <div>
      <DischargeSummary/>
        </div>
      )}
       {form === 'Consent' && (
        <div>
        < Consent/>
        
        </div>
      )}
       {form === 'RefferalForm' && (
        <div>
        < ReferralForm/>
        
        </div>
      )}
    </div>
    </>


  )
}

export default Reports