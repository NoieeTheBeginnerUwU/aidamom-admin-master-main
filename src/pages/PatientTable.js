import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Box, Typography, Paper, Stack, Card, Tooltip, Divider, Grid, styled, Tab, TextField, Checkbox, FormControlLabel, InputAdornment, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, FilledInput, FormHelperText, MenuItem, Select, Radio, RadioGroup, FormLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles, withStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ReportIcon from '@material-ui/icons/InsertChart';
import CreateIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Done';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import dayjs from 'dayjs';
import citiesData from './city.json'
import barangaysData from './barangay.json'
import provincesData from './province.json'
import moment from 'moment';
import './patientTable.css';
import './PersonaDetails.css'
import AddVisits from './AddVisits';
import Avatar from '@material-ui/core/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
//firebase
import { database, authentication } from '../config/firebase';
import TabPanel from '@mui/lab/TabPanel';
import PatientRegistrationForm from './patientRegistration';
import SearchIcon from '@mui/icons-material/Search';
//firebase
import { getDocs, query, collection, where, orderBy, doc, increment, updateDoc, addDoc } from 'firebase/firestore';
import Appoinment from './Approval';
import Approval from './Approval';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useReactToPrint } from 'react-to-print';
import ReferralForm from './refferalForm';

const useStyles = makeStyles({
  root: {
    '& > .MuiGrid-item': {
      paddingLeft: '0',
      marginTop: '0',
    },
  },
  table: {
    minWidth: 400,
  },
  container: {
    maxHeight: 440,
  },
});


const useStyles1 = makeStyles({
  tableHeader: {
    backgroundColor: 'skyblue', // change this to your preferred color
  },
  table: {
    minWidth: 1000,
  },
  container: {
    maxHeight: 600,
  },
});


const theme = createTheme({
  typography: {
    fontSize: 12,
  },
});


function  PatientTable({ handleSubmit, userData }) {


  const [finalDiagnosis, setFinalDiagnosis] = useState('');
  const [homeMedication, setHomeMedication] = useState('');

  const handleFinalDiagnosisChange = (event) => {
    setFinalDiagnosis(event.target.value);
  };

  const handleHomeMedicationChange = (event) => {
    setHomeMedication(event.target.value);
  };


  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: ()=> componentRef.current,
  }) 


  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [selectValue2, setSelectValue2] = useState('');
  const [selectValue3, setSelectValue3] = useState('');

  const handleRadioChange = (event) => {
    setValue2(event.target.value);
    setSelectValue2(''); // Reset the select value when the radio button changes
  };

  const handleSelectChange = (event) => {
    setSelectValue2(event.target.value);
  };

  const handleRadioChange3 = (event) => {
    setValue3(event.target.value);
    setSelectValue3(''); // Reset the select value when the radio button changes
  };

  const handleSelectChange3 = (event) => {
    setSelectValue3(event.target.value);
  };


  const [openChildRegModal, setChildRegModal] = useState(false);

  const handleOpenChildRegModal = () => {
    setChildRegModal(true);
  };

  const handleCloseChildRegModal = () => {
    setChildRegModal(false);
  };


  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal1() {
    setModalIsOpen(true);
  }

  function closeModal1() {
    setModalIsOpen(false);
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



  const [open, setOpen] = React.useState(false);


  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const URINEOUTPUT = (event) => {
    setChecked(event.target.checked);
  };
  const STOOL = (event) => {
    setChecked1(event.target.checked);
  };



  const [selectedDate, setSelectedDate] = useState(new Date());

  const BCG = (event) => {
    setChecked2(event.target.checked);
  };
  const HEPAB = (event) => {
    setChecked3(event.target.checked);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openModal, setOpenModal] = useState(false);
  const [openAddVisitModal, setOpenAddVisitModal] = useState(false);
  const [openPrenatalVisitReports, setOpenPrenatalVisitReports] = useState(false);
  const [openCreateRefferal, setOpenCreateRefferal] = useState(false);
  const [openCompletePregnancy, setOpenCompletePregnancy] = useState(false);

  const [selectedRow, setSelectedRow] = useState('');

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleOpenAddVisitModal = () => {
    setOpenAddVisitModal(true);
  };
  const handleCloseAddVisitModal = () => {
    setOpenAddVisitModal(false);
  };

  const handleOpenPrenatalVisitReports = () => {
    setOpenPrenatalVisitReports(true);
  };
  const handleClosePrenatalVisitReports = () => {
    setOpenPrenatalVisitReports(false);
  };


  const handleOpenCreateRefferal = () => {
    setOpenCreateRefferal(true);
  };
  const handleCloseCreateRefferal = () => {
    setOpenCreateRefferal(false);
  };


  const handleCloseCompletePregnancy = () => {
    setOpenCompletePregnancy(false);
  };


  const [registrationForm, setDischarge] = useState({
    //basic personal details
    userFname: "",
    userMname: "",
    userLname: "",
    userSuffix: "",
    userSex: "",
    userCivilStatus: "",
    userBloodType: "",
    userReligion: "",
    userNumber: "",
    userDob: "",
    userAge: "",
    userNationality: "",
    userOccupation: "",
    userPurok: "",
    userBarangay: "",
    userTown: "",
    userProvince: "",
    userPlaceOfBirth: "",
  })





  const columns = [
    { field: 'id', headerName: 'ID', width: 50, align: 'center', headerAlign: 'center' },
    { field: 'userFname', headerName: 'First name', flex: 1, sortable: false, align: 'center', headerAlign: 'center' },
    { field: 'userLname', headerName: 'Last name', flex: 1, sortable: false, align: 'center', headerAlign: 'center' },
    { field: 'lastPeriod', headerName: 'Last Menstrual Period', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'aog', headerName: 'Age of Gestation', type: 'number', width: 100, sortable: false, align: 'center', headerAlign: 'center' },
    { field: 'lastVisit', headerName: 'Date of Last Visit', type: 'number', flex: 1, sortable: false, align: 'center', headerAlign: 'center' },
    { field: 'userAddress', headerName: 'Address', flex: 2, sortable: false, align: 'center', headerAlign: 'center' },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => [handleViewDetails(params)]}>
          <Box fontSize={10}>View Details</Box>
        </Button>
      ),
    },
  ];

  ///Dummy data for Patient Table
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jeviiiee', birthdate: '12/22/1996', middleName: ' Benito', gestationalAge: '8 weeks', cpnumber: '09502930229', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB+', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '2' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', birthdate: '12/22/1997', middleName: ' Ochoa', gestationalAge: '20 weeks', cpnumber: '09329322029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB+', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '1' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', birthdate: '12/22/1998', middleName: ' Padilla', gestationalAge: '10 weeks', cpnumber: '0950293223', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'O', religion: 'Islam', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '5' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', birthdate: '12/22/1998', middleName: ' Ramos', gestationalAge: '4 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB-', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '2' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', birthdate: '12/22/1998', gestationalAge: '15 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB+', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '3' },
    { id: 6, lastName: 'Melisandre', firstName: 'Debie', birthdate: '12/22/1998', middleName: ' Perez', gestationalAge: ' 8 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'B+', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '4' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', birthdate: '12/22/2001', middleName: ' Padrigon', gestationalAge: '7 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'B-', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', birthdate: '12/22/1998', middleName: ' Rafer', gestationalAge: '12 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'A+', religion: 'Christianity', emailAddress: 'ewwww@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '12' },
    { id: 9, lastName: 'Roxie', firstName: 'Hailey', birthdate: '12/22/2002', middleName: ' Formento', gestationalAge: '24 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: ' Software Engineer', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB+', religion: 'Islam', emailAddress: 'ralls@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '3' },
    { id: 10, lastName: 'Roxie', firstName: 'Honey', birthdate: '12/22/1998', middleName: ' Mahusay', gestationalAge: '48 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB+', religion: 'Christianity', emailAddress: 'waeac@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24' },
    { id: 11, lastName: 'Snow', firstName: 'Jeviiiee', birthdate: '12/22/2000', middleName: ' Benito', gestationalAge: '8 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Economist', nationality: 'Filipino', civilstatus: 'single', bloodType: 'AB+', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '2' },
    { id: 12, lastName: 'Lannister', firstName: 'Cersei', birthdate: '12/22/2005', middleName: ' Ochoa', gestationalAge: '20 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'single', bloodType: 'AB+', religion: 'Eglesia ni Cristo', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24' },
    { id: 13, lastName: 'Lannister', firstName: 'Jaime', birthdate: '12/22/1998', middleName: ' Padilla', gestationalAge: '10 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB+', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '1' },
    { id: 14, lastName: 'Stark', firstName: 'Arya', birthdate: '12/22/1998', middleName: ' Ramos', gestationalAge: '4 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB+', religion: 'Christianity', emailAddress: 'alwacaeia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '2' },
    { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', birthdate: '12/22/1998', gestationalAge: '15 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB+', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte' },
    { id: 16, lastName: 'Melisandre', firstName: 'Debie', birthdate: '12/22/1998', middleName: ' Perez', gestationalAge: ' 8 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB+', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '3' },
    { id: 17, lastName: 'Clifford', firstName: 'Ferrara', birthdate: '12/22/1998', middleName: ' Padrigon', gestationalAge: '7 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Business Owner', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB+', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '2' },
    { id: 18, lastName: 'Frances', firstName: 'Rossini', birthdate: '12/22/2000', middleName: ' Rafer', gestationalAge: '12 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'O+', religion: 'Islam', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '2' },
    { id: 19, lastName: 'Roxie', firstName: 'Hailey', birthdate: '12/22/1998', middleName: ' Formento', gestationalAge: '24 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'widow', bloodType: 'O+', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '2' },
    { id: 20, lastName: 'Roxie', firstName: 'Honey', birthdate: '12/22/2002', middleName: ' Mahusay', gestationalAge: '42 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'B-', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '2' },
    { id: 20, lastName: 'Roxie', firstName: 'Honey', birthdate: '12/22/2003', middleName: ' Mahusay', gestationalAge: '42 weeks', cpnumber: '0950293029', address: 'Manguisoc, Mercedes, Camarines Norte', occupation: 'Housewife', nationality: 'Filipino', civilstatus: 'married', bloodType: 'AB+', religion: 'Christianity', emailAddress: 'alleia@gmail.com', birthplace: 'Tugos, Paracale, Camarines Norte', LMP: '11/22/23', EDD: '8/29/24', Pregnancynumber: '2' },

  ];

  //Dummy for Appointments table
  const rows1 = [
    createData('Nov 23, 2023 10:00 AM', 'Pre-natal', 'Scheduled'),
    createData('Nov 24, 2023 02:00 PM', 'Pre-natal', 'Completed'),
    createData('Nov 23, 2023 10:00 AM', 'Pre-natal', 'Scheduled'),
    createData('Nov 24, 2023 02:00 PM', 'Pre-natal', 'Completed'),
    createData('Nov 23, 2023 10:00 AM', 'Pre-natal', 'Scheduled'),
    createData('Nov 24, 2023 02:00 PM', 'Pre-natal', 'Completed'),
    createData('Nov 23, 2023 10:00 AM', 'Pre-natal', 'Scheduled'),
    // Add more rows as needed
  ];

  //Dummy for Prenatal visit table
  const rows2 = [
    { dateOfVisit: '2023-01-01', bloodPressure: '120/80', weight: '70kg', bmi: '25', cervixExamination: '2/60', fundalHeight: '20cm', fetalMovement: 'Active', presentation: 'Cephalic' },
    { dateOfVisit: '2023-02-23', bloodPressure: '110/70', weight: '71kg', bmi: '26', cervixExamination: '4/65', fundalHeight: '22cm', fetalMovement: 'Active', presentation: 'Cephalic' },
    { dateOfVisit: '2023-03-07', bloodPressure: '115/75', weight: '72kg', bmi: '27', cervixExamination: '6/80', fundalHeight: '24cm', fetalMovement: 'Active', presentation: 'Cephalic' },
    { dateOfVisit: '2023-01-01', bloodPressure: '120/80', weight: '70kg', bmi: '25', cervixExamination: '2/60', fundalHeight: '20cm', fetalMovement: 'Active', presentation: 'Cephalic' },
    { dateOfVisit: '2023-02-23', bloodPressure: '110/70', weight: '71kg', bmi: '26', cervixExamination: '4/65', fundalHeight: '22cm', fetalMovement: 'Active', presentation: 'Cephalic' },
    { dateOfVisit: '2023-03-07', bloodPressure: '115/75', weight: '72kg', bmi: '27', cervixExamination: '6/80', fundalHeight: '24cm', fetalMovement: 'Active', presentation: 'Cephalic' },
    { dateOfVisit: '2023-01-01', bloodPressure: '120/80', weight: '70kg', bmi: '25', cervixExamination: '2/60', fundalHeight: '20cm', fetalMovement: 'Active', presentation: 'Cephalic' },
    { dateOfVisit: '2023-02-23', bloodPressure: '110/70', weight: '71kg', bmi: '26', cervixExamination: '4/65', fundalHeight: '22cm', fetalMovement: 'Active', presentation: 'Cephalic' },
    { dateOfVisit: '2023-03-07', bloodPressure: '115/75', weight: '72kg', bmi: '27', cervixExamination: '6/80', fundalHeight: '24cm', fetalMovement: 'Active', presentation: 'Cephalic' },
    { dateOfVisit: '2023-01-01', bloodPressure: '120/80', weight: '70kg', bmi: '25', cervixExamination: '2/60', fundalHeight: '20cm', fetalMovement: 'Active', presentation: 'Cephalic' },
    { dateOfVisit: '2023-02-23', bloodPressure: '110/70', weight: '71kg', bmi: '26', cervixExamination: '4/65', fundalHeight: '22cm', fetalMovement: 'Active', presentation: 'Cephalic' },

  ];

  // Dummyfor pregnancy related history table
  const rows3 = [
    { number: 1, dateOfDelivery: '2023-01-01', typeOfDelivery: 'Normal', birthOutcome: 'Alive', numberOfChildDelivered: 1, complications: 'None' },
    { number: 2, dateOfDelivery: '2023-02-01', typeOfDelivery: 'Ceasarian', birthOutcome: 'Miscarriage', numberOfChildDelivered: 1, complications: 'None' },
    { number: 3, dateOfDelivery: '2023-03-01', typeOfDelivery: 'Normal', birthOutcome: 'Stillbirth', numberOfChildDelivered: 2, complications: 'None' },
  ];



  //Dummy for Other healthrelated complication


  const diseases = ['Tuberculosis', 'Heart Diseases', 'Diabetes', 'Hypertension', 'Bronchial Asthma', 'Urinary tract infection', 'Parasitism', 'Goiter', 'Anemia'];

  const rows4 = diseases.map((disease, index) => ({
    disease,
    personal: index % 2 === 0,
    family: index % 3 === 0,
  }));


  const handleChangeSetter = (setter) => (event) => {
    setter(event.target.checked);
  };
  const [checkboxEnable, setCheckboxEnable] = useState(false);


  const handleViewDetails = (params) => {
    if (params) {
      console.log(params.row); // Log the data of the row
      setSelectedRow(params.row);
      setOpenModal(true);
    } else {
      console.log('Data is not available');
    }
  };
  const handleOpenCompletePregnancy = () => {
    console.log(`${selectedRow && selectedRow.userLname ? selectedRow.userLname[0] : ''}${selectedRow && selectedRow.firstName ? selectedRow.firstName[0] : ''}`);
    console.log(selectedRow)
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  function createData(dateAndTime, purpose, status) {
    return { dateAndTime, purpose, status };
  }




  //For date and time in Addprenatalvisits
  const [value1, setValue1] = React.useState(new Date());

  // // Extract the first letter of the first name and last name
  const initials = `${selectedRow && selectedRow.userLname ? selectedRow.userLname[0] : ''}${selectedRow && selectedRow.userFname ? selectedRow.userFname[0] : ''}`;
  const classes = useStyles();
  const classes1 = useStyles1();

  //dummy for Other Diseases
  const genitalTractInfections = ['Disease 1', 'Disease 2',]; // Replace with actual diseases
  const otherInfectiousDiseases = ['Disease A', 'Disease B']; // Replace with actual diseases


  //Dummy for High-risk Behavor
  const behaviors = ['Smoking', 'Alcohol Intake', 'Use of Illegal Drugs', 'Domestic violence', 'Multiple Partners'];

  const rows5 = behaviors.map((behavior, index) => ({
    behavior,
    personal: index % 2 === 0,
    family: index % 3 === 0,
  }));


  const addVisitModalContent = (
    <AddVisits
      selectedPatient={selectedRow}
      handleCloseAddVisitModal={handleCloseAddVisitModal}
    />

  );


  const [openAddPatient, setOpenAddPatient] = React.useState(false);
  const handleClickAdd = () => {
    setOpenAddPatient(true);
  };

  const handleCloseMinus = () => {
    setOpenAddPatient(false);
  };

  const [users, setUsers] = useState([]);
  const [row, setRow] = useState([]);
  const [userSearch, setUserSearch] = useState([]);
  const [appointments, setAppoitments] =useState([]);
  async function fetchData() {
    const querySnapshot = await getDocs(query(collection(database, 'userData')),orderBy("dateCreated","asc"));
    const userData = [];
    const pending = [];
    let i = 1;
    let r = [];
    const data = querySnapshot.forEach(doc => {
      if (doc.data().fName !== "") {
        userData.push({
          id: i++,
          docid: doc.id,
          aog: moment(new Date(),"YYYY/MM/DD").diff(doc.data().lastPeriod,"weeks") + " weeks",
          lastVisit: !doc.data().lastVisit?"No Data": doc.data().lastVisit,
          lastPeriod: !doc.data().lastPeriod? "No data":doc.data().lastPeriod,
          userFname: doc.data().userFname,
          userMname: doc.data().userMname,
          userLname: doc.data().userLname,
          userSuffix: doc.data().userSuffix,
          userSex: doc.data().userSex,
          userCivilStatus: doc.data().userCivilStatus,
          userBloodType: doc.data().userBloodType,
          userReligion: doc.data().userReligion,
          userNumber: doc.data().userNumber,
          userDob: doc.data().userDob,
          userAge: doc.data().userAge,
          userAddress: doc.data().userBarangay + ", " + doc.data().userTown,
          userNationality: doc.data().userNationality,
          userOccupation: doc.data().userOccupation,
          userPurok: doc.data().userPurok,
          userBarangay: doc.data().userBarangay,
          userTown: doc.data().userTown,
          userProvince: doc.data().userProvince,
          userPlaceOfBirth: doc.data().userPlaceOfBirth,
          //family details
          userFathersName: doc.data().userFathersName,
          userMothersName: doc.data().userMothersName,
          userHusbandsName: doc.data().userHusbandsName,
          userHusbandsOccuupation: doc.data().userHusbandsOccuupation,
          userDateOfMarriage: doc.data().userDateOfMarriage,
          userPlaceOfMarriage: doc.data().userPlaceOfMarriage,
          userHusbandsNumber: doc.data().userHusbandsNumber,
          userCompleteAddress: doc.data().userCompleteAddress,
          userEmployedBy: doc.data().userEmployedBy,
          userSalary: doc.data().userSalary,
          userAddressOfEmployer: doc.data().userAddressOfEmployer,
          userNameOfBarangayCaptain: doc.data().userNameOfBarangayCaptain,
          userProvincebirth:doc.data().userProvincebirth,
          userTownbirth: doc.data().userTownbirth,
          userBarangaybirth:doc.data().userBarangaybirth,
          //user pregnancy history
          //child1
          userChild1: doc.data().userChild1,
          userChildDateOfDelivery1: doc.data().userChildDateOfDelivery1,
          userChildTypeOfDelivery1: doc.data().userChildTypeOfDelivery1,
          userChildBirthOutcome1: doc.data().userChildBirthOutcome1,
          userChildNumberOfChildDelivered1: doc.data().userChildNumberOfChildDelivered1,
          userChildComplication1: doc.data().userChildComplication1,
          //child2
          userChild2: doc.data().userChild2,
          userChildDateOfDelivery2: doc.data().userChildDateOfDelivery2,
          userChildTypeOfDelivery2: doc.data().userChildTypeOfDelivery2,
          userChildBirthOutcome2: doc.data().userChildBirthOutcome2,
          userChildNumberOfChildDelivered2: doc.data().userChildNumberOfChildDelivered2,
          userChildComplication2: doc.data().userChildComplication2,
          //child3
          userChild3: doc.data().userChild3,
          userChildDateOfDelivery3: doc.data().userChildDateOfDelivery3,
          userChildTypeOfDelivery3: doc.data().userChildTypeOfDelivery3,
          userChildBirthOutcome3: doc.data().userChildBirthOutcome3,
          userChildNumberOfChildDelivered3: doc.data().userChildDateOfDelivery3,
          userChildComplication3: doc.data().userChildComplication3,
          //child4
          userChild4: doc.data().userChild4,
          userChildDateOfDelivery4: doc.data().userChildDateOfDelivery4,
          userChildTypeOfDelivery4: doc.data().userChildTypeOfDelivery4,
          userChildBirthOutcome4: doc.data().userChildBirthOutcome4,
          userChildNumberOfChildDelivered4: doc.data().userChildNumberOfChildDelivered4,
          userChildComplication4: doc.data().userChildComplication4,
          //child5
          userChild5: doc.data().userChild5,
          userChildDateOfDelivery5: doc.data().userChildDateOfDelivery5,
          userChildTypeOfDelivery5: doc.data().userChildTypeOfDelivery5,
          userChildBirthOutcome5: doc.data().userChildBirthOutcome5,
          userChildNumberOfChildDelivered5: doc.data().userChildNumberOfChildDelivered5,
          userChildComplication5: doc.data().userChildComplication5,
          //child6
          userChild6: doc.data().userChild6,
          userChildDateOfDelivery6: doc.data().userChildDateOfDelivery6,
          userChildTypeOfDelivery6: doc.data().userChildTypeOfDelivery6,
          userChildBirthOutcome6: doc.data().userChildBirthOutcome6,
          userChildNumberOfChildDelivered6: doc.data().userChildNumberOfChildDelivered6,
          userChildComplication6: doc.data().userChildComplication6,
          //child7
          userChild7: doc.data().userChild7,
          userChildDateOfDelivery7: doc.data().userChildDateOfDelivery7,
          userChildTypeOfDelivery7: doc.data().userChildTypeOfDelivery7,
          userChildBirthOutcome7: doc.data().userChildBirthOutcome7,
          userChildNumberOfChildDelivered7: doc.data().userChildNumberOfChildDelivered7,
          userChildComplication7: doc.data().userChildComplication7,
          //child8
          userChild8: doc.data().userChild8,
          userChildDateOfDelivery8: doc.data().userChildDateOfDelivery8,
          userChildTypeOfDelivery8: doc.data().userChildTypeOfDelivery8,
          userChildBirthOutcome8: doc.data().userChildBirthOutcome8,
          userChildNumberOfChildDelivered8: doc.data().userChildNumberOfChildDelivered8,
          userChildComplication8: doc.data().userChildComplication8,
          //child9
          userChild9: doc.data().userChild9,
          userChildDateOfDelivery9: doc.data().userChildDateOfDelivery9,
          userChildTypeOfDelivery9: doc.data().userChildTypeOfDelivery9,
          userChildBirthOutcome9: doc.data().userChildBirthOutcome9,
          userChildNumberOfChildDelivered9: doc.data().userChildNumberOfChildDelivered9,
          userChildComplication9: doc.data().userChildComplication9,
          //child10
          userChild10: doc.data().userChild10,
          userChildDateOfDelivery10: doc.data().userChildDateOfDelivery10,
          userChildTypeOfDelivery10: doc.data().userChildTypeOfDelivery10,
          userChildBirthOutcome10: doc.data().userChildBirthOutcome10,
          userChildNumberOfChildDelivered10: doc.data().userChildNumberOfChildDelivered10,
          userChildComplication10: doc.data().userChildComplication10,
          //user other health conditions 
          userTBPersonal: doc.data().userTBPersonal,
          userTBFamily: doc.data().userTBFamily,
          userHeartDiseasesPersonal: doc.data().userHeartDiseasesPersonal,
          userHeartDiseasesFamily: doc.data().userHeartDiseasesFamily,
          userDiabetesPersonal: doc.data().userDiabetesPersonal,
          userDiabetesFamily: doc.data().userDiabetesFamily,
          userHypertensionPersonal: doc.data().userHypertensionPersonal,
          userHypertensionFamily: doc.data().userHypertensionFamily,
          userBronchialAsthmaPersonal: doc.data().userBronchialAsthmaPersonal,
          userBronchialAsthmaFamily: doc.data().userBronchialAsthmaFamily,
          userUTIPersonal: doc.data().userUTIPersonal,
          userUTIFamily: doc.data().userUTIFamily,
          userParasitismPersonal: doc.data().userParasitismPersonal,
          userParasitismFamily: doc.data().userParasitismFamily,
          userGoiterPersonal: doc.data().userGoiterPersonal,
          userGoiterFamily: doc.data().userGoiterFamily,
          userAnemiaPersonal: doc.data().userAnemiaPersonal,
          userAnemiaFamily: doc.data().userAnemiaFamily,
          userGenitalTrackInfection: doc.data().userGenitalTrackInfection,
          userOtherInfectiousDiseases: doc.data().userOtherInfectiousDiseases,
          userHighRiskBehavior: doc.data().userHighRiskBehavior,
          dateCreated: doc.data().dateCreated,
          status: doc.data().status,
          userLevel: doc.data().userLevel,
          userPic: doc.data().userPic
        });
      }
    })
    setUsers(userData);
    setUserSearch(userData);
   
    //var i = 1;
    //alert("running "+i++ +" times")
  };


  useEffect(() => {
    fetchData();
    console.log("DATA: " + users)
  }, [])

  const [nChild, setNChild] = useState([]);

/**
 *  let arrs = [];
    const queryAppointments = await getDocs(query(collection(database,"appointments"),where("uid","==",selectedRow.docid)));
    queryAppointments.forEach((doc)=>{
      arrs.push({id:doc.id,aog:doc.data().aog,appointmentDate:doc.data().appointmentDate,bmi:doc.data().bmi,bp:doc.data().bp,bpCategory:doc.data().bpCategory,diastolic:doc.data().diastolic,dilates:doc.data().dilates,efficases:doc.data().efficases,fetalMovement:doc.data().fetalMovement,fundalHeight:doc.data().fundalHeight,height:doc.data().height,lmp:doc.data().lmp,name:doc.data().name,presentation:doc.data().presentation,remarks:doc.data().remarks,systolic:doc.data().systolic,uid:doc.data().uid,weight:doc.data().weight})
    })
    setAppoitments(arrs)
 */

  const [onlineAppointments, setOnlineAppointments] = useState([])
  useEffect(()=>{
    let arrs = [];
    if(selectedRow.docid!==undefined){
      const fetchApps = async() => {
        const queryAppointments = await getDocs(query(collection(database,"appointments"),where("uid","==",selectedRow.docid)));
      queryAppointments.forEach((doc)=>{
        arrs.push({id:doc.id,aog:doc.data().aog,appointmentDate:doc.data().appointmentDate,bmi:doc.data().bmi,bp:doc.data().bp,bpCategory:doc.data().bpCategory,diastolic:doc.data().diastolic,dilates:doc.data().dilates,efficases:doc.data().efficases,fetalMovement:doc.data().fetalMovement,fundalHeight:doc.data().fundalHeight,height:doc.data().height,lmp:doc.data().lmp,name:doc.data().name,presentation:doc.data().presentation,remarks:doc.data().remarks,systolic:doc.data().systolic,uid:doc.data().uid,weight:doc.data().weight})
      })
      }
      const fetchOnlineApps = async () => {
        let a = [];
        const queryAppointments = await getDocs(query(collection(database,"onlineAppointments"),where("uid","==",selectedRow.docid)));
        queryAppointments.forEach((doc)=> {
          a.push({id:doc.id, appointmentDate:doc.data().appointmentDate, purpose:doc.data().purpose, status:doc.data().status, time:doc.data().time})
        })
        setOnlineAppointments(a)
      }
      fetchApps()
      fetchOnlineApps()
    }
    setAppoitments(arrs)
    console.log("ASS "+arrs)
  },[selectedRow.docid])



  const handleCreateAccount = async () => {
    if (registrationForm.userFname !== "" || registrationForm.userLname !== "" || registrationForm.userSex !== "" || registrationForm.userAge || registrationForm.userNumber !== "") {
      try {
        await addDoc(collection(database, "userData"), {
          userFname: registrationForm.userFname,
          userMname: registrationForm.userMname,
          userLname: registrationForm.userLname,
          userSuffix: registrationForm.userSuffix,
          userSex: registrationForm.userSex,
          userCivilStatus: registrationForm.userCivilStatus,
          userBloodType: registrationForm.userBloodType,
          userReligion: registrationForm.userReligion,
          userNumber: registrationForm.userNumber,
          userDob: registrationForm.userDob,
          userAge: registrationForm.userAge,
          userNationality: registrationForm.userNationality,
          userOccupation: registrationForm.userOccupation,
          userPurok: registrationForm.userPurok,
          userBarangay: registrationForm.userBarangay,
          userTown: registrationForm.userTown,
          userProvince: registrationForm.userProvince,
          userPlaceOfBirth: registrationForm.userPlaceOfBirth,
          //family details
          userFathersName: registrationForm.userFathersName,
          userMothersName: registrationForm.userMothersName,
          userHusbandsName: registrationForm.userHusbandsName,
          userHusbandsOccuupation: registrationForm.userHusbandsOccuupation,
          userDateOfMarriage: registrationForm.userDateOfMarriage,
          userPlaceOfMarriage: registrationForm.userPlaceOfMarriage,
          userHusbandsNumber: registrationForm.userHusbandsNumber,
          userCompleteAddress: registrationForm.userCompleteAddress,
          userEmployedBy: registrationForm.userEmployedBy,
          userSalary: registrationForm.userSalary,
          userAddressOfEmployer: registrationForm.userAddressOfEmployer,
          userNameOfBarangayCaptain: registrationForm.userNameOfBarangayCaptain,
          //user pregnancy history
          //child1
          userChild1: registrationForm.userChild1,
          userChildDateOfDelivery1: registrationForm.userChildDateOfDelivery1,
          userChildTypeOfDelivery1: registrationForm.userChildTypeOfDelivery1,
          userChildBirthOutcome1: registrationForm.userChildBirthOutcome1,
          userChildNumberOfChildDelivered1: registrationForm.userChildNumberOfChildDelivered1,
          userChildComplication1: registrationForm.userChildComplication1,
          //child2
          userChild2: registrationForm.userChild2,
          userChildDateOfDelivery2: registrationForm.userChildDateOfDelivery2,
          userChildTypeOfDelivery2: registrationForm.userChildTypeOfDelivery2,
          userChildBirthOutcome2: registrationForm.userChildBirthOutcome2,
          userChildNumberOfChildDelivered2: registrationForm.userChildNumberOfChildDelivered2,
          userChildComplication2: registrationForm.userChildComplication2,
          //child3
          userChild3: registrationForm.userChild3,
          userChildDateOfDelivery3: registrationForm.userChildDateOfDelivery3,
          userChildTypeOfDelivery3: registrationForm.userChildTypeOfDelivery3,
          userChildBirthOutcome3: registrationForm.userChildBirthOutcome3,
          userChildNumberOfChildDelivered3: registrationForm.userChildDateOfDelivery3,
          userChildComplication3: registrationForm.userChildComplication3,
          //child4
          userChild4: registrationForm.userChild4,
          userChildDateOfDelivery4: registrationForm.userChildDateOfDelivery4,
          userChildTypeOfDelivery4: registrationForm.userChildTypeOfDelivery4,
          userChildBirthOutcome4: registrationForm.userChildBirthOutcome4,
          userChildNumberOfChildDelivered4: registrationForm.userChildNumberOfChildDelivered4,
          userChildComplication4: registrationForm.userChildComplication4,
          //child5
          userChild5: registrationForm.userChild5,
          userChildDateOfDelivery5: registrationForm.userChildDateOfDelivery5,
          userChildTypeOfDelivery5: registrationForm.userChildTypeOfDelivery5,
          userChildBirthOutcome5: registrationForm.userChildBirthOutcome5,
          userChildNumberOfChildDelivered5: registrationForm.userChildNumberOfChildDelivered5,
          userChildComplication5: registrationForm.userChildComplication5,
          //child6
          userChild6: registrationForm.userChild6,
          userChildDateOfDelivery6: registrationForm.userChildDateOfDelivery6,
          userChildTypeOfDelivery6: registrationForm.userChildTypeOfDelivery6,
          userChildBirthOutcome6: registrationForm.userChildBirthOutcome6,
          userChildNumberOfChildDelivered6: registrationForm.userChildNumberOfChildDelivered6,
          userChildComplication6: registrationForm.userChildComplication6,
          //child7
          userChild7: registrationForm.userChild7,
          userChildDateOfDelivery7: registrationForm.userChildDateOfDelivery7,
          userChildTypeOfDelivery7: registrationForm.userChildTypeOfDelivery7,
          userChildBirthOutcome7: registrationForm.userChildBirthOutcome7,
          userChildNumberOfChildDelivered7: registrationForm.userChildNumberOfChildDelivered7,
          userChildComplication7: registrationForm.userChildComplication7,
          //child8
          userChild8: registrationForm.userChild8,
          userChildDateOfDelivery8: registrationForm.userChildDateOfDelivery8,
          userChildTypeOfDelivery8: registrationForm.userChildTypeOfDelivery8,
          userChildBirthOutcome8: registrationForm.userChildBirthOutcome8,
          userChildNumberOfChildDelivered8: registrationForm.userChildNumberOfChildDelivered8,
          userChildComplication8: registrationForm.userChildComplication8,
          //child9
          userChild9: registrationForm.userChild9,
          userChildDateOfDelivery9: registrationForm.userChildDateOfDelivery9,
          userChildTypeOfDelivery9: registrationForm.userChildTypeOfDelivery9,
          userChildBirthOutcome9: registrationForm.userChildBirthOutcome9,
          userChildNumberOfChildDelivered9: registrationForm.userChildNumberOfChildDelivered9,
          userChildComplication9: registrationForm.userChildComplication9,
          //child10
          userChild10: registrationForm.userChild10,
          userChildDateOfDelivery10: registrationForm.userChildDateOfDelivery10,
          userChildTypeOfDelivery10: registrationForm.userChildTypeOfDelivery10,
          userChildBirthOutcome10: registrationForm.userChildBirthOutcome10,
          userChildNumberOfChildDelivered10: registrationForm.userChildNumberOfChildDelivered10,
          userChildComplication10: registrationForm.userChildComplication10,
          //user other health conditions 
          userTBPersonal: registrationForm.userTBPersonal,
          userTBFamily: registrationForm.userTBFamily,
          userHeartDiseasesPersonal: registrationForm.userHeartDiseasesPersonal,
          userHeartDiseasesFamily: registrationForm.userHeartDiseasesFamily,
          userDiabetesPersonal: registrationForm.userDiabetesPersonal,
          userDiabetesFamily: registrationForm.userDiabetesFamily,
          userHypertensionPersonal: registrationForm.userHypertensionPersonal,
          userHypertensionFamily: registrationForm.userHypertensionFamily,
          userBronchialAsthmaPersonal: registrationForm.userBronchialAsthmaPersonal,
          userBronchialAsthmaFamily: registrationForm.userBronchialAsthmaFamily,
          userUTIPersonal: registrationForm.userUTIPersonal,
          userUTIFamily: registrationForm.userUTIFamily,
          userParasitismPersonal: registrationForm.userParasitismPersonal,
          userParasitismFamily: registrationForm.userParasitismFamily,
          userGoiterPersonal: registrationForm.userGoiterPersonal,
          userGoiterFamily: registrationForm.userGoiterFamily,
          userAnemiaPersonal: registrationForm.userAnemiaPersonal,
          userAnemiaFamily: registrationForm.userAnemiaFamily,
          userGenitalTrackInfection: registrationForm.userGenitalTrackInfection,
          userOtherInfectiousDiseases: registrationForm.userOtherInfectiousDiseases,
          userHighRiskBehavior: registrationForm.userHighRiskBehavior,
          dateCreated: moment(new Date()).format("YYYY/MM/DD hh:mm a"),
          status: "pending",
          userLevel: "standard user",
          userPic: "",
        }).then(alert("Account created successfully."))
      } catch (e) {
        alert(e);
      }
      addDoc(collection(database, "adminLogs"), {
        activity: "added a new user to the database.",
        category: "added",
        timestamp: moment(new Date()).format("YYYY/MM/DD hh:mm a"),
        day: moment(new Date()).format("DD"),
        month: moment(new Date()).format("MM"),
        Year: moment(new Date()).format("YYYY"),
      })
      setActive("newsession")
    } else {
      alert("Please fill all the necessary inputs to create an account.")
    }
  }

  useEffect(() => {
    const fetchAppointments = async () => {

    }

  }, [selectedRow.docid])


  const [openModalOnlineRequest, setOpenModalOnlineRequest] = useState(false);

  const handleOpenOnlineRequest = () => {
    setOpenModalOnlineRequest(true);
  };

  const handleCloseOnlineRequest = () => {
    setOpenModalOnlineRequest(false);
  };

  const [deliveryType, setDeliveryType] = useState('');


  const handleChange5 = (event) => {
    setDeliveryType(event.target.value);
  };


  const [professionalAttended, setProfessionalAttended] = useState('');

  const handleChange6 = (event) => {
    setProfessionalAttended(event.target.value);
  };

  const handleChildRegistration = () => {
    try {
      addDoc(collection(database,"dischargeSummary_child"),{
        data: "data"
      })
      addDoc(collection(database,"dischargeSummary_mother"),{
        data: "data"
      })
      updateDoc(doc(database,"userData",selectedRow.docid),{
        lastPeriod:"",
        dateOfDischarge: moment(new Date(),"YYYY/MM/DD").format("YYYY/MM/DD")
      })
    } catch (e) {
      alert(e)
    }
  }

  async function searchUsers(vals){
    let ins = [];
      let docs = users;
      try{
        let fun = docs.map((doc)=>{
          if(vals!==""){
           let val = vals.toLowerCase();
           if(doc.userFname.toLowerCase().includes(val)||doc.userMname.toLowerCase().includes(val)||doc.userLname.toLowerCase().includes(val)){
            ins.push({
              id: doc.id,
              docid: doc.docid,
              aog: doc.aog,
              userAddress:doc.userAddress,
              lastVisit: doc.lastVisit,
              lastPeriod: doc.lastPeriod,
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

  const [discharge, setDischarger] = useState({
    childFname:"",
    childLname:"",
    childMname:"",
    childSuffix:"",
    childDob:"",
    childWeight:"",
    childGender:"",
    typeOfDelivery:"",
    healthProfessionalAttended:"",
    urineOutputDiagnosis:"",
    stoolDiagnosis:"",
    bcgDate:"",
    hepaBDate:"",
    expandedNewBornScreeningResult:"",
    expandedNewBornScreeningRefusal:"",
    newbornHearingResult:"",
    newbornHearingRefusal:"",
    finalDiagnosis:"",
    homeMedication:"",
    dateOfDischarge:"",
    followUpCheckup:"",
    attendingPhysician:"",
    nurseOnDuty:"",
    deliveredBy:"",
    receivedBy:"",
    dateCreated: moment(new Date()).format("YYYY/MM/DD"),
    day:moment(new Date()).format("DD"),
    month:moment(new Date()).format("MM"),
    year:moment(new Date()).format("YYYY"),
  })
  
  const handleDischarge = async() => {
    try{
      updateDoc(doc(database,"userData",selectedRow.docid),{
        lastPeriod:""
      })
      addDoc(collection(database,"discharge_child"),{
        motherId:selectedRow.docid,
        motherName: selectedRow.userFname + " " + selectedRow.userLname,
        motherAge: moment(new Date(),"YYYY/MM/DD").diff(moment(selectedRow.userDob,"YYYY/MM/DD"),"years"),
        deliveredVia:"Vaginal",
        childFame:discharge.childFname,
        childLname:discharge.childLname,
        childMname:discharge.childMname,
        childSuffix:discharge.childSuffix,
        childDob:discharge.childDob,
        childWeight:discharge.childWeight,
        childWeightType: discharge.childWeight<2.5&&"low"||discharge.childWeight>2.5&&discharge.childWeight<3.6&&"normal"||discharge.childWeight>3.6&&"low",
        childGender:discharge.childGender,
        typeOfDelivery:discharge.typeOfDelivery,
        healthProfessionalAttended:discharge.healthProfessionalAttended,
        urineOutputDiagnosis:discharge.urineOutputDiagnosis,
        stoolDiagnosis:discharge.stoolDiagnosis,
        bcgDate:discharge.bcgDate,
        hepaBDate:discharge.hepaBDate,
        expandedNewBornScreeningResult:discharge.expandedNewBornScreeningResult,
        expandedNewBornScreeningRefusal:discharge.expandedNewBornScreeningRefusal,
        newbornHearingResult:discharge.newbornHearingResult,
        newbornHearingRefusal:discharge.newbornHearingRefusal,
        finalDiagnosis:discharge.finalDiagnosis,
        homeMedication:discharge.homeMedication,
        dateOfDischarge:discharge.dateOfDischarge,
        followUpCheckup:discharge.followUpCheckup,
        attendingPhysician:discharge.attendingPhysician,
        nurseOnDuty:discharge.nurseOnDuty,
        deliveredBy:discharge.deliveredBy,
        receivedBy:discharge.receivedBy,
        dateCreated: moment(new Date()).format("YYYY/MM/DD"),
        day:moment(new Date()).format("DD"),
        month:moment(new Date()).format("MM"),
        year:moment(new Date()).format("YYYY")
      })
    }catch(e){
      alert(e)
    }
  }
  console.log(discharge);

  let count = 0
  if(selectedRow.userChildDateOfDelivery1!==""){
    count=1
  }
  if(selectedRow.userChildDateOfDelivery1!==""&&selectedRow.userChildDateOfDelivery2!==""){
    count=2
  }
  if(selectedRow.userChildDateOfDelivery1!==""&&selectedRow.userChildDateOfDelivery2!==""&&selectedRow.userChildDateOfDelivery3!==""){
    count=3
  }

  return (

    <div style={{ marginTop: '2px', height: '550px', width: '95%', textAlign: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      <Box backgroundColor={'primary'} flexDirection={'row'} textAlign={'left'}>
        <Typography variant="h6" component="h1" fontSize={'1.8em'} fontWeight={600} m={1}>
          PATIENTS
        </Typography>


        {/*---------------------- Modal for Online Request Approval ----------------------*/}


        <Modal
          open={openModalOnlineRequest}
          onClose={handleCloseOnlineRequest}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', height: '95%',
            bgcolor: 'background.paper', boxShadow: 24, p: 4
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography id="modal-modal-title" variant="h6" component="h2" font>
                <Box fontWeight={'600'}>
                  Online Request
                </Box>
              </Typography>
              <IconButton onClick={handleCloseOnlineRequest}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Approval />
          </Box>
        </Modal>
      </Box>
      <Divider sx={{ marginBottom: 2 }}></Divider>
      <Box display="flex" justifyContent="center">
        <Box display="flex" alignItems="center" ml={'30%'} mb={3}>
          <Box display="flex" alignItems="center" width="100%" flex={1}>
            <TextField
              size='small'
              variant='outlined'
              placeholder="Search..."
              fullWidth
              onChange={(text)=> searchUsers(text.target.value)}
              InputProps={{ style: { width: 400 } }}
            />
            <SearchIcon size="large" />
          </Box>
        </Box>

        <Box ml={1} flex={.7} flexDirection='end '>
          <Button variant="contained" size='small' sx={{ backgroundColor: 'orange' }} onClick={handleClickAdd}>
            <AddIcon size='small' /> Register Patient
          </Button>
        </Box>
        <Box ml={1} flex={.7} flexDirection='end '>
          <Button variant="contained" color="primary" size='small' sx={{ backgroundColor: 'green' }} onClick={handleOpenOnlineRequest}>
            online requests
          </Button>

        </Box>
        <Box ml={1} flex={.7} flexDirection='end '>
          <Button variant="contained" color="primary" size='small' sx={{ backgroundColor: 'skyblue' }} onClick={()=> fetchData()}>
            <FontAwesomeIcon icon={faRefresh} color='white'/>
            refresh table
          </Button>
        </Box>
      </Box>


      <Dialog open={openAddPatient} onClose={handleClose}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box fontWeight={'600'} >Register Patient</Box>
            <IconButton onClick={handleCloseMinus}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>


        <DialogContent>
          {/*-------------------------------- Add Patient Forms -------------------------------- */}
          <PatientRegistrationForm />
          {/*-------------------------------- End Add Patient Forms -------------------------------- */}
        </DialogContent>
       
      </Dialog>



      <div style={{ height: '100%', width: '100%', marginTop: '5px' }}>
        <DataGrid
         headerHeight={20}
          rows={userSearch}
          columns={columns}
         
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableSelectionOnClick
          density='compact'
          
        />
      </div>
      {/* Modal for displaying details */}

      <Modal open={openModal} onClose={handleCloseModal} scroll='paper'>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%', // Set the desired width
          maxHeight: '95%', // Set the maximum height
          overflow: 'auto', // Make it scrollable
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 5,
        }}>

          <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={1} rowSpacing={1}  >


              {/* ------------------------------------------------Profile Picture------------------------------------------------ */}
              <Grid xs={2}>
                <Grid container justify="center" alignItems="center" mb={1}>
                  {/* Container Box for Picture */}
                  <Grid item xs={12}>
                    {
                      selectedRow.userPic !== "" ?
                        <div style={{ width: 130, height: 100, backgroundImage: `url(${selectedRow.userPic})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'white', marginLeft: 4 }} />
                        :
                        <Avatar variant='square'>{initials}</Avatar>
                    }
                  </Grid>
                  <Grid item xs={12} mt={2} >
                    <Typography mt={0} color={'GrayText'} fontSize={'medium'} fontWeight={'600'} textAlign={'left'}>
                      Name:
                      <Box fontSize={'large'} fontWeight={'750'} color={'black'}>
                        {`${selectedRow.userLname} ${selectedRow.userFname} , ${selectedRow.userMname}`}
                      </Box>
                      LMP: <Box display='inline' color={'black'}>{moment(selectedRow.lastPeriod, "YYYY/MM/DD").format("MMMM DD, YYYY")}</Box>
                      <Box></Box>
                      AOG: <Box display='inline' color={'black'}>{moment(new Date(), "YYYY/MM/DD").diff(moment(selectedRow.lastPeriod, "YYYY/MM/DD"), "weeks")} weeks</Box>
                      <Box></Box>
                      EDD: <Box display='inline' color={'black'}> {moment(selectedRow.lastPeriod).add(280, "days").format("MMMM DD, YYYY")}</Box>
                      <Box></Box>
                      TOTAL PREGNANCY: <Box display='inline' color={'black'}> {count}</Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* --------------------------------------Taaaaaaab ----------------------------------------------------------------------------------------------------------------- */}
              <Grid item xs={9}>

                <Box padding={.3} sx={{ width: '100%', height: '100%' }} marginTop={0} mb={0}>

                  <Grid container spacing={1} >
                    <Grid xs={12}>

                      <Paper>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                          <TabContext value={value} >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="General Information" value="1" />
                                <Tab label="Pregnancy History" value="2" />
                                <Tab label="Other Health Conditions" value="3" />
                              </TabList>
                            </Box>

                            {/* ---------------------------------1st tab ----------------------------------------------------------------------------------------------------------------- */}
                            <TabPanel value="1" sx={{ width: '100%', backgroundColor: '#F0F2F5' }}>

                              <ThemeProvider theme={theme}>
                                <Paper sx={{ width: '100%', padding: 2 }}>
                                  <Grid container spacing={.7} className="MuiGrid-item">

                                    <Grid item xs={2}>
                                      <Box height={4 + 'vw'}>

                                        <Typography mb={1} variant='body' fontSize={'small'} fontWeight={'medium'} color={'GrayText'}>Blood Type <Box fontWeight={750} fontSize={'medium'}>{selectedRow.userBloodType}</Box></Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <Box height={4 + 'vw'}>
                                        <Typography mb={1} variant='body' fontSize={'small'} fontWeight={'medium'} color={'GrayText'}>Date of birth <Box fontWeight={750} fontSize={'medium'}>{selectedRow.userDob}</Box></Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <Box height={4 + 'vw'}>
                                        <Typography mb={1} variant='body' fontSize={'small'} fontWeight={'medium'} color={'GrayText'}>Nationality<Box fontWeight={750} fontSize={'medium'}>{selectedRow.userNationality}</Box></Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <Box height={4 + 'vw'}>
                                        <Typography mb={1} variant='body' fontSize={'small'} fontWeight={'medium'} color={'GrayText'}>Civil Status <Box fontWeight={750} fontSize={'medium'}>{selectedRow.userCivilStatus}</Box></Typography>
                                      </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                      <Box height={4 + 'vw'}>
                                        <Typography mb={1} variant='body' fontSize={'small'} fontWeight={'medium'} color={'GrayText'}>Occupation <Box fontWeight={750} fontSize={'medium'}>{selectedRow.userOccupation}</Box></Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <Box height={4 + 'vw'}>
                                        <Typography mb={1} variant='body' fontSize={'small'} fontWeight={'medium'} color={'GrayText'}>Religion<Box fontWeight={750} fontSize={'medium'}>{selectedRow.userReligion}</Box></Typography>
                                      </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                      <Box height={4 + 'vw'}>
                                        <Typography mb={1} variant='body' fontSize={'small'} fontWeight={'medium'} color={'GrayText'}> Contact number<Box fontWeight={750} fontSize={'medium'}>{selectedRow.userNumber}</Box></Typography>
                                      </Box>
                                    </Grid>

                                    <Grid item xs={2}>
                                      <Box height={4 + 'vw'}>
                                        <Typography mb={1} variant='body' fontSize={'small'} fontWeight={'medium'} color={'GrayText'}> Email Address<Box fontWeight={750} fontSize={'medium'}>{selectedRow.emailAddress}N/A</Box></Typography>
                                      </Box>
                                    </Grid>

                                    <Grid item xs={4}>
                                      <Box height={4 + 'vw'}>
                                        <Typography mb={1} variant='body' fontSize={'small'} fontWeight={'medium'} color={'GrayText'}>Place of Birth<Box fontWeight={750} fontSize={'medium'}>{selectedRow.userPlaceOfBirth}</Box></Typography>
                                      </Box>
                                    </Grid>

                                    <Grid item xs={4}>
                                      <Box height={4 + 'vw'}>
                                        <Typography mb={1} variant='body' fontSize={'small'} fontWeight={'medium'} color={'GrayText'}> Current Address<Box fontWeight={750} fontSize={'medium'}>{selectedRow.userBarangay}, Daet, Camarines Norte</Box></Typography>
                                      </Box>
                                    </Grid>


                                    {/* Add more grid items as needed */}
                                  </Grid>
                                </Paper>
                              </ThemeProvider>

                            </TabPanel>
                            <Grid container >


                              {/* ---------------------------------------------------------2nd tab ---------------------------------------------------------------------------- */}
                              <TabPanel value="2" sx={{ width: '100%', backgroundColor: '#F0F2F5' }}>
                                <Grid xs={11} padding={1}>
                                  <Box component={Paper}>
                                    <TableContainer >
                                      <Table size='small'>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Pregnancy Number</TableCell>
                                            <TableCell>Date of Delivery</TableCell>
                                            <TableCell>Type of Delivery</TableCell>
                                            <TableCell>Birth Outcome</TableCell>
                                            <TableCell>Number of Child Delivered</TableCell>
                                            <TableCell>Pregnancy Related Complications/Condition</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {
                                            selectedRow.userChildDateOfDelivery1!==""&&
                                            <TableRow key={selectedRow.userChildDateOfDelivery1}>
                                            <TableCell>{selectedRow.userChildDateOfDelivery1!==""?1:""}</TableCell>
                                            <TableCell>{selectedRow.userChildDateOfDelivery1}</TableCell>
                                            <TableCell>{selectedRow.userChildTypeOfDelivery1}</TableCell>
                                            <TableCell>{selectedRow.userChildBirthOutcome1}</TableCell>
                                            <TableCell>{selectedRow.userChildNumberOfChildDelivered1}</TableCell>
                                            <TableCell>{selectedRow.userChildComplication1}</TableCell>
                                          </TableRow>
                                          }
                                          {
                                            selectedRow.userChildDateOfDelivery2!==""&&
                                            <TableRow key={selectedRow.userChildDateOfDelivery2}>
                                            <TableCell>{selectedRow.userChildDateOfDelivery2!==""?2:""}</TableCell>
                                            <TableCell>{selectedRow.userChildDateOfDelivery2}</TableCell>
                                            <TableCell>{selectedRow.userChildTypeOfDelivery2}</TableCell>
                                            <TableCell>{selectedRow.userChildBirthOutcome2}</TableCell>
                                            <TableCell>{selectedRow.userChildNumberOfChildDelivered2}</TableCell>
                                            <TableCell>{selectedRow.userChildComplication2}</TableCell>
                                          </TableRow>
                                          }
                                          {
                                            selectedRow.userChildDateOfDelivery3!==""&&
                                            <TableRow key={selectedRow.userChildDateOfDelivery3}>
                                            <TableCell>{selectedRow.userChildDateOfDelivery3!==""?3:""}</TableCell>
                                            <TableCell>{selectedRow.userChildDateOfDelivery3}</TableCell>
                                            <TableCell>{selectedRow.userChildTypeOfDelivery3}</TableCell>
                                            <TableCell>{selectedRow.userChildBirthOutcome3}</TableCell>
                                            <TableCell>{selectedRow.userChildNumberOfChildDelivered3}</TableCell>
                                            <TableCell>{selectedRow.userChildComplication3}</TableCell>
                                          </TableRow>
                                          }
                                          
                                          
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </Box>
                                </Grid>
                              </TabPanel>
                            </Grid>
                            {/* --------------------------------------------------------3rd tab ----------------------------------------------------------------------------------------------------------------- */}
                            <TabPanel value="3" sx={{ width: '100%', backgroundColor: '#F0F2F5' }}>
                              <Grid container >
                                <Grid xs={12}>
                                  <Paper>
                                    <Box padding={2} textAlign={'center'} sx={{ backgroundColor: 'primary.main', color: 'white' }}><Typography fontWeight='700' >HEALTH CONDITIONS AND COMPLICATIONS</Typography></Box>
                                    <TableContainer component={Paper}>
                                      <Table size='small'>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell style={{ backgroundColor: 'white', fontWeight: '550', color: 'GrayText' }}>Diseases</TableCell>
                                            <TableCell style={{ backgroundColor: 'white', fontWeight: '550', color: 'GrayText' }}>Personal</TableCell>
                                            <TableCell style={{ backgroundColor: 'white', fontWeight: '550', color: 'GrayText' }}>Family</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow key={row.disease}>
                                              <TableCell >Tubercolosis</TableCell>
                                              <TableCell style={{ backgroundColor: "white"}}>
                                                <TableCell>{selectedRow.userTBPersonal===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                              <TableCell style={{ backgroundColor:"white"}}>
                                                <TableCell>{selectedRow.userTBFamily===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                            </TableRow>
                                            <TableRow key={row.disease}>
                                              <TableCell >Heart Diseases</TableCell>
                                              <TableCell style={{ backgroundColor: "white"}}>
                                                <TableCell>{selectedRow.userHeartDiseasesPersonal===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                              <TableCell style={{ backgroundColor:"white"}}>
                                                <TableCell>{selectedRow.userHeartDiseasesFamily===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                            </TableRow>
                                            <TableRow key={row.disease}>
                                              <TableCell >Diabetes</TableCell>
                                              <TableCell style={{ backgroundColor: "white"}}>
                                                <TableCell>{selectedRow.userDiabetesPersonal===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                              <TableCell style={{ backgroundColor:"white"}}>
                                                <TableCell>{selectedRow.userDiabetesFamily===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                            </TableRow>
                                            <TableRow key={row.disease}>
                                              <TableCell >Hypertension</TableCell>
                                              <TableCell style={{ backgroundColor: "white"}}>
                                                <TableCell>{selectedRow.userHypertensionPersonal===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                              <TableCell style={{ backgroundColor:"white"}}>
                                                <TableCell>{selectedRow.userTBFamily===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                            </TableRow>
                                            <TableRow key={row.disease}>
                                              <TableCell >Bronchial Asthma</TableCell>
                                              <TableCell style={{ backgroundColor: "white"}}>
                                                <TableCell>{selectedRow.userBronchialAsthmaPersonal===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                              <TableCell style={{ backgroundColor:"white"}}>
                                                <TableCell>{selectedRow.userBronchialAsthmaPersonal===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                            </TableRow>
                                            <TableRow key={row.disease}>
                                              <TableCell >Urinary Tract Infection</TableCell>
                                              <TableCell style={{ backgroundColor: "white"}}>
                                                <TableCell>{selectedRow.userUTIPersonal===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                              <TableCell style={{ backgroundColor:"white"}}>
                                                <TableCell>{selectedRow.userUTIFamily===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                            </TableRow>
                                            <TableRow key={row.disease}>
                                              <TableCell >Parasitism</TableCell>
                                              <TableCell style={{ backgroundColor: "white"}}>
                                                <TableCell>{selectedRow.userParasitismPersonal===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                              <TableCell style={{ backgroundColor:"white"}}>
                                                <TableCell>{selectedRow.userParasitismFamily===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                            </TableRow>
                                            <TableRow key={row.disease}>
                                              <TableCell >Goiter</TableCell>
                                              <TableCell style={{ backgroundColor: "white"}}>
                                                <TableCell>{selectedRow.userGoiterPersonal===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                              <TableCell style={{ backgroundColor:"white"}}>
                                                <TableCell>{selectedRow.userGoiterFamily===false?"no":"yes"}</TableCell>
                                              </TableCell>
                                            </TableRow>
                                            <TableRow key={row.disease}>
                                              <TableCell >Anemia</TableCell>
                                              <TableCell style={{ backgroundColor: "white"}}>
                                                <TableCell>{selectedRow.userAnemiaPersonal}</TableCell>
                                              </TableCell>
                                              <TableCell style={{ backgroundColor:"white"}}>
                                                <TableCell>{selectedRow.userAnemiaFamily}</TableCell>
                                              </TableCell>
                                            </TableRow>
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </Paper>
                                </Grid>
            

                              </Grid>
                            </TabPanel>
                          </TabContext>
                        </Box>

                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* ---------------------------------End of Tab------------------------------------------------------------------------------------------------------------- */}



              <Divider variant='fullwidth' />

              <Grid container xs={12} >

                <Grid xs={3}>

                </Grid>
                <Grid xs={3}>

                </Grid>
                <Grid xs={3}>

                </Grid>


                {/* -------------------------------------------4buttons ---------------------------------------------------------------------------------------*/}
                <Grid container xs={3} mt={1}>

                  <Tooltip title="Add Pre Natal Visits">
                    <Button marginRight={1} startIcon={<AddIcon />} variant="contained" onClick={handleOpenAddVisitModal} onClose={handleCloseAddVisitModal}> </Button>
                  </Tooltip>


                  <Tooltip title="Pre Natal Reports">
                    <Button startIcon={<ReportIcon />} variant="contained" onClick={handleOpenPrenatalVisitReports} onClose={handleClosePrenatalVisitReports} color="warning"></Button>
                  </Tooltip>


                  <Tooltip title="Create Referral">
                    <Button startIcon={<CreateIcon />} variant="contained" onClick={handleOpenCreateRefferal} onClose={handleCloseCreateRefferal} color="success"></Button>
                  </Tooltip>


                  <Tooltip title="Complete Pregnancy">
                    <Button startIcon={<DoneIcon />} variant="contained" onClick={handleOpenChildRegModal} color="error"></Button>
                  </Tooltip>


                  {/* ---------------------Modal for Child Registration ---  Complete Pregnancy------------------------------------------------------------------------------------------ */}

                  <Modal
                    open={openChildRegModal}
                    onClose={handleCloseChildRegModal}
                    aria-labelledby="child-registration-title"
                    aria-describedby="child-registration-description"
                  >
                    <Box sx={{ width: '85%', height: '95%', overflowY: 'auto', padding: 4, bgcolor: 'background.paper', margin: 'auto', outline: 'none' }}>
                      <Box flexDirection={'row'} sx={{ position: 'sticky', top: 0 }}>
                        <Typography id="child-registration-title" variant="h6" component="h2">
                          <Box fontWeight={600} backgroundColor="primary.main" padding={2} color={'white'}>
                            Child Registration
                          </Box>
                        </Typography>

                      </Box>
                      <Typography id="child-registration-description" sx={{ mt: 2 }}>



                        <Grid item xs={12}>
                          <Box>
                            <Typography> <Box component="span" fontWeight='bold'>1. Name -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please enter your name correctly.</Box></Typography>
                          </Box>
                        </Grid>
                        <Grid container flexDirection={'row'} spacing={1}>
                          <Grid item xs={3} mt={2}>
                            <TextField name="ChildLname"
                              fullWidth
                              label="Lastname (Apelyido)"
                              variant="outlined"
                              size='small'
                              value={discharge.childLname}
                              onChange={(text) => setDischarger(prev => { return { ...prev, childLname: text.target.value } })}
                              required

                            />
                          </Grid>
                          <Grid item xs={3} mt={2}>
                            <TextField name="ChildFname"
                              fullWidth

                              label="Firstname (Pangalan)"
                              variant="outlined"
                              size='small'

                              value={discharge.childFname}
                              onChange={(text) => setDischarger(prev => { return { ...prev, childFname: text.target.value } })}
                              required

                            />
                          </Grid>
                          <Grid item xs={3} mt={2}>

                            <TextField name="userChildMname"
                              fullWidth

                              label="Middlename (Gitnang Pangalan)"
                              variant="outlined"
                              size='small'
                              value={discharge.childMname}
                              onChange={(text) => setDischarger(prev => { return { ...prev, childMname: text.target.value } })}

                            />
                          </Grid>
                          <Grid item xs={1.5} mt={2} >

                            <FormControlLabel
                              value="top"
                              control={<Checkbox />}
                              onChange={handleChangeSetter(setCheckboxEnable)}
                              checked={checkboxEnable}
                              label="I have Extension"
                              labelPlacement="end"
                              inputProps={{ "aria-label": "primary checkbox" }}

                            />
                          </Grid>
                          <Grid item xs={1.5} mt={2}>
                            <Select
                              fullWidth
                              labelId="userSuffix"
                              name="userSuffix"
                              size='small'
                              value={discharge.childSuffix}
                              onChange={(text) => setDischarger(prev => { return { ...prev, childSuffix: text.target.value } })}
                              disabled={!checkboxEnable}
                            >

                              <MenuItem value='JR'>JR</MenuItem>
                              <MenuItem value='SR'>SR</MenuItem>
                              <MenuItem value='I'>I</MenuItem>
                              <MenuItem value='II'>II</MenuItem>
                              <MenuItem value='III'>III</MenuItem>
                              <MenuItem value='IV'>IV</MenuItem>
                              <MenuItem value='V'>V</MenuItem>
                              <MenuItem value='VI'>VI</MenuItem>
                            </Select>
                          </Grid>
                          <Grid item xs={12}>
                            <Box marginBottom={5} marginTop={5}  backgroundColor="#F0F2F5" padding={1}>
                              <Typography> <Box component="span" fontWeight='bold'>2. Birth Details -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please indicate the details accurately.</Box></Typography>
                            </Box>
                          </Grid>
                          <Grid xs={2}>
                            <FormControl required>
                              <LocalizationProvider dateAdapter={AdapterDayjs} required>

                              <TextField variant='standard' fullWidth type='date' label="Date of birth"  value={discharge.childDob} onChange={(text) => setDischarger(prev => { return { ...prev, childDob: text.target.value } })}/>

                        
                              </LocalizationProvider>
                            </FormControl>

                          </Grid>
                          <Grid xs={2} ml={2}>

                            <TextField
                              label="Weight at Birth"
                              // onChange={(e) => setWeight(e.target.value)}
                              fullWidth
                              size='large'
                              variant="standard"
                              type="number"
                              value={discharge.childWeight}
                              onChange={(text) => setDischarger(prev => { return { ...prev, childWeight: text.target.value } })}
                              inputProps={{ min: 30, max: 200 }}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                              }}
                            />

                          </Grid>
                          <Grid xs={2} ml={8}>
                            <FormControl>
                              <FormLabel name="gender" sx={{ fontWeight: 'bold' }}>Gender</FormLabel>
                              <RadioGroup
                                row
                                aria-labelledby="gender"
                                defaultValue="female"
                                name="gender"
                                value={discharge.childGender}
                                

                              >
                                <FormControlLabel value="female" onChange={(text) => setDischarger(prev => { return { ...prev, childGender: text.target.value } })} control={<Radio />} label="Female" />
                                <FormControlLabel value="male" onChange={(text) => setDischarger(prev => { return { ...prev, childGender: text.target.value } })} control={<Radio />} label="Male" />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                          <Grid xs={2.3}>
                            <FormControl fullWidth>
                              <InputLabel id="delivery-type-label">Type of Delivery</InputLabel>
                              <Select
                                labelId="delivery-type-label"
                                id="delivery-type"
                                value={discharge.typeOfDelivery}
                                onChange={(text) => setDischarger(prev => { return { ...prev, typeOfDelivery: text.target.value } })}
                                label="Type of Delivery"
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Normal'}>Normal</MenuItem>
                                <MenuItem value={'Ceasarian'}>Ceasarian</MenuItem>
                              </Select>
                            </FormControl>

                          </Grid>
                          <Grid xs={2.5} ml={5}>
                            <FormControl fullWidth>
                              <InputLabel id="delivery-type-label">Health Professional Attended</InputLabel>
                              <Select
                                labelId="delivery-type-label"
                                id="delivery-type"
                                value={discharge.healthProfessionalAttended}
                                onChange={(text) => setDischarger(prev => { return { ...prev, healthProfessionalAttended: text.target.value } })}
                                label="Health Professional Attended"
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Doctor'}>Doctor</MenuItem>
                                <MenuItem value={'Nurse'}>Nurse</MenuItem>
                                <MenuItem value={'Midwife'}>Midwife</MenuItem>
                              </Select>
                            </FormControl>

                          </Grid>

                          <Grid item xs={12}>
                            <Box marginBottom={5} marginTop={5}  backgroundColor="#F0F2F5" padding={1}>
                              <Typography> <Box component="span" fontWeight='bold'>3. Vaccine and Test -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please indicate the Diagnosis and date accurately.</Box></Typography>
                            </Box>
                          </Grid>
                          <Grid container item xs={12} flexDirection={"row"}>
                            <Grid xs={3}>
                              <Box >
                                <FormControlLabel
                                  control={<Checkbox checked={checked} onChange={URINEOUTPUT} />}
                                  label="URINE OUTPUT :"
                                />
                                {checked && <TextField label="Diagnosis" value={discharge.urineOutputDiagnosis} variant='standard'onChange={(text) => setDischarger(prev => { return { ...prev, urineOutputDiagnosis: text.target.value } })} />}
                              </Box>
                            </Grid><Grid xs={3}>
                              <Box marginLeft={4} >

                                <FormControlLabel
                                  control={<Checkbox checked={checked1} onChange={STOOL} />}
                                  label="STOOL:"
                                />
                                {checked1 && <TextField label="Diagnosis" value={discharge.stoolDiagnosis} variant='standard' onChange={(text) => setDischarger(prev => { return { ...prev, stoolDiagnosis: text.target.value } })} />}
                              </Box>
                            </Grid><Grid xs={3}  container direction="column">
                              <Box display={'block'}>
                                <FormControlLabel
                                  control={<Checkbox checked={checked2} onChange={BCG}  fullWidth/>}
                                  label="BCG:"
                                />
                                {checked2 && <FormControl required>
                                  <LocalizationProvider dateAdapter={AdapterDayjs} required>
                                    <TextField variant='standard'  fullWidth type='date' value={discharge.bcgDate} onChange={(text) => setDischarger(prev => { return { ...prev, bcgDate: text.target.value } })}/>
                                  </LocalizationProvider>
                                </FormControl>}
                              </Box>
                            </Grid><Grid xs={3}>
                              <Box>
                                <FormControlLabel
                                  control={<Checkbox checked={checked3} onChange={HEPAB} />}
                                  label="HEPA-B:"
                                />
                                {checked3 && <FormControl required>
                                  <LocalizationProvider dateAdapter={AdapterDayjs} required>
                                    <TextField type='date' variant='standard'  fullWidth  value={discharge.hepaBDate} onChange={(text) => setDischarger(prev => { return { ...prev, hepaBDate: text.target.value } })}/>
                                  </LocalizationProvider>
                                </FormControl>}
                              </Box>
                            </Grid>

                            <Grid item xs={12}>
                              <Box marginBottom={5} marginTop={5}  backgroundColor="#F0F2F5" padding={1}>
                                <Typography> <Box component="span" fontWeight='bold' >4. InBorn Screening -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please enter the details accurately.</Box></Typography>
                              </Box>
                            </Grid>

                            <Grid xs={6}>

                              <FormControl component="fieldset">
                                <FormLabel component="legend"><Box fontWeight={600}>Choose an option : EXPANDED NEWBORN SCREENING</Box><Box fontStyle={'italic'} display={'inline'}>(choose Yes if you want to give the permission to undergo ENBS )</Box></FormLabel>
                                <RadioGroup name="choice" value={value2} onChange={handleRadioChange}>
                                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                  <FormControlLabel value="no" control={<Radio />} label="Refuse" />
                                </RadioGroup>
                                {value2 === 'yes' && (
                                  <FormControl fullWidth>
                                    <InputLabel id="Results">Results</InputLabel>
                                    <Select  value={discharge.expandedNewBornScreeningResult} onChange={(text) => setDischarger(prev => { return { ...prev, expandedNewBornScreeningResult: text.target.value } })} id='Results' label="Results">
                                      <MenuItem value={'Negative'}>Negative</MenuItem>
                                      <MenuItem value={'Trait'}>Trait</MenuItem>
                                      <MenuItem value={'Borderline'}>Borderline</MenuItem>
                                      <MenuItem value={'Positive'}>Positive</MenuItem>
                                    </Select>
                                  </FormControl>
                                )}
                                {value2 === 'no' && (

                                  <FormControl fullWidth>
                                    <InputLabel id="Reason for refusal">Reason for refusal</InputLabel>
                                    <Select value={discharge.expandedNewBornScreeningRefusal} onChange={(text) => setDischarger(prev => { return { ...prev, expandedNewBornScreeningRefusal: text.target.value } })} id='Reason for refusal' label="Reason for refusal">
                                      <MenuItem value={'Religious belief'}>Religious belief</MenuItem>
                                    </Select>
                                  </FormControl>
                                )}
                              </FormControl>

                            </Grid>

                            <Grid xs={6}>

                              <FormControl component="fieldset">
                                <FormLabel component="legend"><Box fontWeight={600}>Choose an option :  NEWBORN HEARING SCREENING</Box><Box fontStyle={'italic'} display={'inline'}>(choose Yes if you want to give the permission to undergo ENBS )</Box></FormLabel>
                                <RadioGroup name="choice" value={value3} onChange={handleRadioChange3}>
                                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                  <FormControlLabel value="no" control={<Radio />} label="Refuse" />
                                </RadioGroup>
                                {value3 === 'yes' && (
                                  <FormControl fullWidth>
                                    <InputLabel id="Results">Results</InputLabel>
                                    <Select value={discharge.newbornHearingResult} onChange={(text) => setDischarger(prev => { return { ...prev, newbornHearingResult: text.target.value } })} id='Results' label="Results">
                                      <MenuItem value={'Bilateral Pass'}>Bilateral Pass</MenuItem>
                                      <MenuItem value={'Unilateral Refer'}>Unilateral Refer</MenuItem>
                                      <MenuItem value={'Bilateral Refer'}>Bilateral Refer</MenuItem>

                                    </Select>
                                  </FormControl>
                                )}
                                {value3 === 'no' && (

                                  <FormControl fullWidth>
                                    <InputLabel id="Reason for refusal">Reason for refusal</InputLabel>
                                    <Select value={discharge.newbornHearingRefusal} onChange={(text) => setDischarger(prev => { return { ...prev, newbornHearingRefusal: text.target.value } })} id='Reason for refusal' label="Reason for refusal">
                                      <MenuItem value={'Financial Constraint'}>Financial Constraint</MenuItem>
                                    </Select>
                                  </FormControl>
                                )}
                              </FormControl>

                            </Grid>
                            <Grid item xs={12} >
                              <Box marginBottom={5} marginTop={5}  backgroundColor="#F0F2F5" padding={1}>
                                <Typography> <Box component="span" fontWeight='bold' >4. Remarks-</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please enter the details accurately.</Box></Typography>
                              </Box>
                            </Grid>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <TextField
                                  label="Final Diagnosis"
                                  multiline
                                  rows={4}
                                  value={discharge.finalDiagnosis}
                                  onChange={(text) => setDischarger(prev => { return { ...prev, finalDiagnosis: text.target.value } })}
                                  variant="outlined"
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  label="Home Medication"
                                  multiline
                                  rows={4}
                                  value={discharge.homeMedication}
                                  onChange={(text) => setDischarger(prev => { return { ...prev, homeMedication: text.target.value } })}
                                  variant="outlined"
                                  fullWidth
                                />
                              </Grid>
                            </Grid>
                            <Grid xs={3}>
                              <FormControl required>
                                <LocalizationProvider dateAdapter={AdapterDayjs} required>
                                  <TextField   type='date' helperText={'Date of Discharge'} fullWidth variant='outlined' value={discharge.dateOfDischarge} onChange={(text) => setDischarger(prev => { return { ...prev, dateOfDischarge: text.target.value } })}/>
                                </LocalizationProvider>
                              </FormControl>


                            </Grid>
                            <Grid xs={3}>

                              <FormControl required  width={'100%'} >
                                <LocalizationProvider dateAdapter={AdapterDayjs} required>
                                  <TextField type='date' helperText={'Follow-Up Check-up'}  fullWidth value={discharge.followUpCheckup}  onChange={(text) => setDischarger(prev => { return { ...prev, followUpCheckup: text.target.value } })}/>
                                </LocalizationProvider>
                              </FormControl>

                            </Grid>
                            <Grid xs={12} container>

                              <Grid xs={4} mr={5}>
                                <TextField
                                  label="ATTENDING PHYSISCIAN"
                                  fullWidth
                                  variant='standard'
                                  value={discharge.attendingPhysician}
                                  onChange={(text) => setDischarger(prev => { return { ...prev, attendingPhysician: text.target.value } })}
                                ></TextField>


                              </Grid>
                              <Grid xs={4}>
                                <TextField
                                  label="NURSE ON DUTY"
                                  fullWidth
                                  variant='standard'
                                  value={discharge.nurseOnDuty}
                                  onChange={(text) => setDischarger(prev => { return { ...prev, nurseOnDuty: text.target.value } })}
                                ></TextField>


                              </Grid>




                            </Grid>

                            <Grid xs={12} container>

                              <Grid xs={4} mr={5}>
                                <TextField
                                  label="DELIVERED BY"
                                  fullWidth
                                  variant='standard'
                                  value={discharge.deliveredBy}
                                  onChange={(text) => setDischarger(prev => { return { ...prev, deliveredBy: text.target.value } })}
                                ></TextField>


                              </Grid>
                              <Grid xs={4}>
                                <TextField
                                  label="RECEIVED BY"
                                  fullWidth
                                  variant='standard'
                                  value={discharge.receivedBy}
                                  onChange={(text) => setDischarger(prev => { return { ...prev, receivedBy: text.target.value } })}
                                ></TextField>


                              </Grid>
                              <Grid xs={1}>

                              </Grid>
                              <Grid xs={1}>
                              <Button onClick={()=> handleDischarge()} variant='contained' >
                                   Submit
                                  </Button>
                              </Grid>

                            </Grid>
                          
                        

                          </Grid>

                        </Grid>
                      </Typography>
                    </Box>
                  </Modal>





                  {/* --------------------- Dialog for Complete Pregnancy------------------------------------------------------------------------------------------ */}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    variant='standard'
                  >
                    <DialogTitle id="alert-dialog-title" style={{ color: 'red' }}>
                      {"Warning: Completing Pregnancy"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description" style={{ color: 'orange' }}>
                        Completing this action will reset your pregnancy progress and automatically generate a discharge summary. Please confirm your action.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleClose} color="secondary" autoFocus>
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>

                </Grid>
                {/* ---------------------------------------------------------- Table for Appoinment ---------------------------------------------------------- */}
                <Grid xs={4} padding={1}>
                  <Box margin={0}>
                    <Box padding={1} textAlign={'center'} sx={{ backgroundColor: 'skyblue', color: 'white' }}><Typography fontWeight='700' >APPOINTMENTS</Typography></Box>
                    <TableContainer component={Paper} sx={{ minHeight: '30vh', maxHeight: '50vh' }}>
                      <Table aria-label="simple table" size='small' sx={{ minWidth: '' }} stickyHeader>
                        <TableHead >
                          <TableRow>
                            <TableCell style={{ backgroundColor: '#F0F2F5', fontWeight: '550', color: 'GrayText' }}>Date and Time</TableCell>
                            <TableCell align="right" style={{ backgroundColor: '#F0F2F5', fontWeight: '550', color: 'GrayText' }}>Purpose</TableCell>
                            <TableCell align="right" style={{ backgroundColor: '#F0F2F5', fontWeight: '550', color: 'GrayText' }}>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {onlineAppointments.length > 0 ? (
                            onlineAppointments.map((row1) => (
                              <TableRow key={row1.appointmentDate}>
                                <TableCell component="th" scope="row">
                                  {row1.appointmentDate}
                                </TableCell>
                                <TableCell align="right">{row1.purpose}</TableCell>
                                <TableCell align="right">{row1.status}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={3} align="center">
                                No appointments found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Grid>
                {/* ----------------------------------------------------------------------Table for Prenatal Visits ----------------------------------------------------------------------*/}
                <Grid xs={8} justify="center" padding={1}>
                  <Box>
                    <Box padding={1} textAlign={'center'} sx={{ backgroundColor: 'skyblue', color: 'white' }}><Typography fontWeight='700' >PRE-NATAL VISITS</Typography></Box>
                    <TableContainer component={Paper} sx={{ minHeight: '30vh', maxHeight: '50vh' }} >
                      <Table size="small" aria-label="prenatalvistisTable" stickyHeader sx={{ minWidth: '' }}>
                        <TableHead style={{ backgroundColor: 'skyblue' }} >
                          <TableRow>
                            <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }} >Date of Visit</TableCell>
                            <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Blood Pressure</TableCell>
                            <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Weight</TableCell>
                            <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>BMI</TableCell>
                            <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Age of Gestation</TableCell>
                            <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Fundal Height</TableCell>
                            <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Fetal Movement</TableCell>
                            <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Presentation</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {appointments.length > 0 ? (
                            appointments.map((row2) => (
                              <TableRow key={row2.appointmentDate}>
                                <TableCell>{row2.appointmentDate}</TableCell>
                                <TableCell>{row2.diastolic}/{row2.systolic}</TableCell>
                                <TableCell>{row2.weight}</TableCell>
                                <TableCell>{row2.bmi}</TableCell>
                                <TableCell align='center'>{row2.aog}</TableCell>
                                <TableCell>{row2.fundalHeight}</TableCell>
                                <TableCell>{row2.fetalMovement}</TableCell>
                                <TableCell>{row2.presentation}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={9} align="center">
                                No Pre-natal visits found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>

                  </Box>
                </Grid>
              </Grid>
              {/* -------------------------------------------------------------------------------Add Visits----------------------------------------------------------------------------------- */}
              <Modal open={openAddVisitModal} onClose={handleCloseAddVisitModal} >

                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '85%', // Set the desired width
                  maxHeight: '95%', // Set the maximum height
                  overflow: 'auto', // Make it scrollable
                  bgcolor: '#F0F2F5',
                  boxShadow: 24,
                  p: 4,
                }}>
                  {/* Your content goes here */}

                  {addVisitModalContent}
                  {/* Add your form or other components here */}
                </Box>
              </Modal>
              {/*--------------------------------------------------------------------------------------------- Modal for Visits Reports ---------------------------------------------------------------------------------------------*/}
              <Modal open={openPrenatalVisitReports} onClose={handleClosePrenatalVisitReports}>

                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height:'90%', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                  {/* Your content goes here */}
                  <Typography variant="h6" component="div">
                    Pre natal visit report
                  </Typography>

                  <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',overflowY:'scroll'}}>
                            <div className='container' style={{marginTop:'60%'}}>
                                <div style={{width:'100%',height:200,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                  <div style={{marginBottom:60,fontSize:18,width:'100%',height:'20%',display:'flex',alignItems:'center',justifyContent:'center'}} class= "header " align=" center">
                                    <div className='adminPic' style={{width:120,height:120,borderRadius:150,marginRight:10,padding:10, fontSize:14,marginTop:'6vh',}}/>
                                  </div>
                                  <div style={{marginBottom:60,fontSize:20,width:'100%',height:'20%'}} class= "header " align=" center"><h4>Republic of the Philippines</h4>
                                      <h4>Province of Camarines Norte</h4>
                                      <h4>Municipality of Daet</h4>
                                      <h4>MUNICIPAL HEALTH OFFICE</h4>
                                      <h4><strong>RHU 3 - BIRTHING CENTER</strong></h4>
                                      <h4><strong>Prenatal Visit Report</strong></h4>
                                  </div>
                                  <div style={{marginBottom:60,fontSize:18,width:'100%',height:'20%',display:'flex',alignItems:'center',justifyContent:'center'}} class= "header " align=" center">
                                    <div className='wew3' style={{width:100,height:100,borderRadius:150,marginRight:10,padding:10, fontSize:14,marginTop:'6vh',}}/>
                                  </div>
                                </div>
                                <div style={{width:'100%',height:800,display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
                                  <div style={{}}>
                                  <Grid xs={11} justify="center" padding={0}>
                                    <Box>
                                      <Box padding={1} textAlign={'center'} sx={{ backgroundColor: 'skyblue', color: 'white' }}><Typography fontWeight='700' >PRE-NATAL VISITS</Typography></Box>
                                      <TableContainer component={Paper} sx={{ minHeight: '30vh', maxHeight: '70vh' }} >
                                        <Table size="small" aria-label="prenatalvistisTable" stickyHeader sx={{ minWidth: '' }}>
                                          <TableHead style={{ backgroundColor: 'skyblue' }} >
                                            <TableRow>
                                              <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }} >Date of Visit</TableCell>
                                              <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Blood Pressure</TableCell>
                                              <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Weight</TableCell>
                                              <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>BMI</TableCell>
                                              <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Age of Gestation</TableCell>
                                              <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Fundal Height</TableCell>
                                              <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Fetal Movement</TableCell>
                                              <TableCell sx={{ backgroundColor: '#F0F2F5', color: 'GrayText', fontWeight: '550' }}>Presentation</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {appointments.length > 0 ? (
                                              appointments.map((row2) => (
                                                <TableRow key={row2.appointmentDate}>
                                                  <TableCell>{row2.appointmentDate}</TableCell>
                                                  <TableCell>{row2.diastolic}/{row2.systolic}</TableCell>
                                                  <TableCell>{row2.weight}</TableCell>
                                                  <TableCell>{row2.bmi}</TableCell>
                                                  <TableCell align='center'>{row2.aog}</TableCell>
                                                  <TableCell>{row2.fundalHeight}</TableCell>
                                                  <TableCell>{row2.fetalMovement}</TableCell>
                                                  <TableCell>{row2.presentation}</TableCell>
                                                </TableRow>
                                              ))
                                            ) : (
                                              <TableRow>
                                                <TableCell colSpan={9} align="center">
                                                  No Pre-natal visits found
                                                </TableCell>
                                              </TableRow>
                                            )}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </Box>
                                  </Grid>
                                  </div>
                                </div>
                                <div style={{display:'flex',width:220,height:60,marginLeft:'40%',flexDirection:'column',alignItems:'center',justifyContent:'center',paddingBottom:'10%'}}>
                                      <input type='text'  style={{width:300,height:50,fontWeight:500,lineHeight:5,outline:'none',backgroundColor:'transparent',textAlign:'center'}}/>
                                      <p style={{textAlign:'center'}}>person in charge</p>
                                    </div>
                                </div>
                          </div>
                </Box>
              </Modal>
              {/* -----------------------------------------------------------------------------------------------------Modal for Refferal----------------------------------------------------------------------------------------------------- */}
              <Modal open={openCreateRefferal} onClose={handleCloseCreateRefferal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%',height:'100%',overflowY:'scroll', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                  {/* Your content goes here */}
                  <Typography variant="h6" component="div">
                    Create Refferal
                  </Typography>
                  {/* Add your form or other components here */}
                    <ReferralForm/>
                </Box>
              </Modal>
              {/*----------------------------------------------------------------------------------------------- Modal for Complete Pregnancy -----------------------------------------------------------------------------------------------*/}
              <Modal open={openCompletePregnancy} onClose={handleCloseCompletePregnancy}>

                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                  {/* Your content goes here */}
                  <Typography variant="h6" component="div">
                    Complete Pregnancy
                  </Typography>
                  {/* Add your form or other components here */}
                </Box>
              </Modal>
              {/*------------------------------------------------------------------------------------------------------ End of Modals------------------------------------------------------------------------------------------------------ */}
            </Grid>
          </Box>
        </Box>
      </Modal>

    </div>

  );
}
export default PatientTable;
