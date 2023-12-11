import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import PersonalDetails from './PersonalDetails';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import './PersonaDetails.css'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import citiesData from './city.json';
import barangaysData from './barangay.json';
import provincesData from './province.json';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import dayjs from 'dayjs';
import { addDays, differenceInDays } from 'dayjs';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FilledInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
//firebase
import { database } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { blue } from '@mui/material/colors';



const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#db3131',
        },
      },
    },
  },
});



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const newDate = dayjs();
export default function PatientRegistrationForm() {


  const [lmp, setLmp] = useState(null);
  const [edd, setEdd] = useState(null);
  const [aog, setAog] = useState(null);

  const handleDateChangePregnancyCal = (date) => {
    setLmp(date);
    const eddDate = dayjs(date).add(280, 'day');
    setEdd(eddDate.format('ddd MMM DD YYYY'));
    const aogDays = dayjs().diff(date, 'day');
    const aogWeeks = Math.floor(aogDays / 7);
    const aogMonths = Math.floor(aogDays / 30);
    setAog(`${aogMonths} months and ${aogWeeks % 4} weeks`);
  };



  const [registrationForm, setRegistrationForm] = useState({
    //basic personal details
    userEmail: "",
    userFname: "",
    userMname: "",
    userLname: "",
    userSuffix: "",
    userSex: "female",
    userCivilStatus: "",
    userBloodType: "",
    userReligion: "Roman Catholic",
    userNumber: "",
    userDob: dayjs().format("YYYY-MM-DD"),
    userAge: "",
    userNationality: "Filipino",
    userOccupation: "Housewife",
    userPurok: "null",
    userBarangay: " null",
    userTown: "null ",
    userProvince: " null",
    userPlaceOfBirth: "",
    userProvincebirth: "",
    userBarangaybirth: "",
    userTownbirth: "",
    userLMP: "",
    //family details
    userFathersFName: "",
    userFathersLName: "",
    userFathersMName: "",
    userMothersFName: "",
    userMothersLName: "",
    userMothersMName: "",
    userHusbandsLName: "",
    userHusbandSuffix: "",
    userHusbandsFName: "",
    userHusbandsMName: "",
    userFathersSuffix: "",
    userMothersSuffix: "",
    userHusbandsOccuupation: "",
    userDateOfMarriage: dayjs().format("YYYY-MM-DD"),
    userPlaceOfMarriage: "",
    userProvinceMarriage: "",
    userBarangayMarriage: "",
    userTownMarriage: "",
    userHusbandsNumber: "",
    userCompleteAddress: "",
    userEmployedBy: "",
    userSalary: "",
    userAddressOfEmployer: "",
    userNameOfBarangayCaptain: "",
    //user pregnancy history
    //child1
    userChild1: "",
    userChild1DateOfDelivery1: "",
    userChild1TypeOfDelivery1: "",
    userChild1BirthOutcome1: "",
    userChild1NumberOfChildDelivered1: "",
    userChild1Complication1: "",
    //child2
    userChild2: "",
    userChild1DateOfDelivery2: "",
    userChild1TypeOfDelivery2: "",
    userChild1BirthOutcome2: "",
    userChild1NumberOfChildDelivered2: "",
    userChild1Complication2: "",
    //child3
    userChild3: "",
    userChild1DateOfDelivery3: "",
    userChild1TypeOfDelivery3: "",
    userChild1BirthOutcome3: "",
    userChild1NumberOfChildDelivered3: "",
    userChild1Complication3: "",

    // high risk behavior
    userSmoking: false,
    userAlcoholIntake: false,
    userUsingofIllegalDrugs: false,
    userViolencefromPartner: false,
    userMultiplePartners: false,
    familySmoking: false,
    familyAlcoholIntake: false,
    familyUsingofIllegalDrugs: false,
    familyViolencefromPartner: false,
    familyMultiplePartners: false,
    //user other health conditions 
    userTuberculosisPersonal: false,
    userTuberculosisFamily: false,
    userHeartDiseasesPersonal: false,
    userHeartDiseasesFamily: false,
    userDiabetesPersonal: false,
    userDiabetesFamily: false,
    userHypertensionPersonal: false,
    userHypertensionFamily: false,
    userBronchialAsthmaPersonal: false,
    userBronchialAsthmaFamily: false,
    userUrinaryTractInfactionPersonal: false,
    userUrinaryTractInfactionFamily: false,
    userParasitismPersonal: false,
    userParasitismFamily: false,
    userGoiterPersonal: false,
    userGoiterFamily: false,
    userAnemiaPersonal: false,
    userAnemiaFamily: false,
  
    userHighRiskBehavior: false,
    dateCreated: moment(new Date()).format("YYYY/MM/DD hh:mm a"),
    status: "pending",
    userPic: "",
    pregnant: true,
  })


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
          userHusbandsLName: registrationForm.userHusbandsLName,
          userHusbandsFName: registrationForm.userHusbandsFName,
          userHusbandsMName: registrationForm.userHusbandsMName,
          userHusbandSuffix: registrationForm.userHusbandSuffix,
          userHusbandsOccuupation: registrationForm.userHusbandsOccuupation,
          userDateOfMarriage: registrationForm.userDateOfMarriage,
          userPlaceOfMarriage: registrationForm.userPlaceOfMarriage,
          userProvinceMarriage: registrationForm.userProvinceMarriage,
          userTownMarriage: registrationForm.userTownMarriage,
          userBarangayMarriage: registrationForm.userBarangayMarriage,
          userHusbandsNumber: registrationForm.userHusbandsNumber,
          userCompleteAddress: registrationForm.userCompleteAddress,
          userEmployedBy: registrationForm.userEmployedBy,
          userSalary: registrationForm.userSalary,
          userAddressOfEmployer: registrationForm.userAddressOfEmployer,
          userNameOfBarangayCaptain: registrationForm.userNameOfBarangayCaptain,
          //user pregnancy history
          //child1
          userChild1: registrationForm.userChild1,
          userChildDateOfDelivery1: registrationForm.userChild1DateOfDelivery1,
          userChildTypeOfDelivery1: registrationForm.userChild1TypeOfDelivery1,
          userChildBirthOutcome1: registrationForm.userChild1BirthOutcome1,
          userChildNumberOfChildDelivered1: registrationForm.userChild1NumberOfChildDelivered1,
          userChildComplication1: registrationForm.userChild1Complication1,
          //child2
          userChild2: registrationForm.userChild2,
          userChildDateOfDelivery2: registrationForm.userChild1DateOfDelivery2,
          userChildTypeOfDelivery2: registrationForm.userChild1TypeOfDelivery2,
          userChildBirthOutcome2: registrationForm.userChild1BirthOutcome2,
          userChildNumberOfChildDelivered2: registrationForm.userChild1NumberOfChildDelivered2,
          userChildComplication2: registrationForm.userChild1Complication2,
          //child3
          userChild3: registrationForm.userChild3,
          userChildDateOfDelivery3: registrationForm.userChild1DateOfDelivery3,
          userChildTypeOfDelivery3: registrationForm.userChild1TypeOfDelivery3,
          userChildBirthOutcome3: registrationForm.userChild1BirthOutcome3,
          userChildNumberOfChildDelivered3: registrationForm.userChild1DateOfDelivery3,
          userChildComplication3: registrationForm.userChild1Complication3,

          //user other health conditions 
          userTuberculosisPersonal: registrationForm.userTuberculosisPersonal,
          userTuberculosisFamily: registrationForm.userTuberculosisFamily,
          userHeartDiseasesPersonal: registrationForm.userHeartDiseasesPersonal,
          userHeartDiseasesFamily: registrationForm.userHeartDiseasesFamily,
          userDiabetesPersonal: registrationForm.userDiabetesPersonal,
          userDiabetesFamily: registrationForm.userDiabetesFamily,
          userHypertensionPersonal: registrationForm.userHypertensionPersonal,
          userHypertensionFamily: registrationForm.userHypertensionFamily,
          userBronchialAsthmaPersonal: registrationForm.userBronchialAsthmaPersonal,
          userBronchialAsthmaFamily: registrationForm.userBronchialAsthmaFamily,
          userUrinaryTractInfactionPersonal: registrationForm.userUrinaryTractInfactionPersonal,
          userUrinaryTractInfactionFamily: registrationForm.userUrinaryTractInfactionFamily,
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
          activePregnacy: true,
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
    } else {
      alert("Please fill all the necessary inputs to create an account.")
    }
  }



  console.log(registrationForm);

  const handleChangeSetter = (setter) => (event) => {
    setter(event.target.checked);
  };


  useEffect(() => {

  }, [])

  const validateForm = () => {
    const errors = {};

    // Validate required fields
    const requiredFields = [
      'userFname',
      'userLname',
      'dateofbrith',
      'cpnumber',
      'province',
      'city',
      'barangay',
      'civilstatus',
      'religion'
      // Add other required fields here
    ];

    requiredFields.forEach((field) => {
      if (!eval(field)) {
        errors[field] = 'This field is required';
      }
    });
    if (!civilstatus) {
      errors.civilstatus = 'This field is required';
    }
    // Validate first name
    if (patientFname.length < 2 || patientFname.length > 30) {
      errors.patientFname = 'First name should be at least 2 characters and not more than 30 characters';
    }

    // Validate last name
    if (patientLname.length < 2 || patientLname.length > 30) {
      errors.patientLname = 'Last name should be at least 2 characters and not more than 30 characters';
    }

    // Validate cellphone number
    const cpNumberRegex = /^\+63[0-9]{10}$/;
    if (!cpNumberRegex.test(cpnumber)) {
      errors.cpnumber = 'Invalid cellphone number. Should start with +63 and be 12 digits long.';
    }

    // Add other validations for different fields here

    setError(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleNext = (event) => {
    const isValid = validateForm();
    event.preventDefault();

    if (isValid) {
      // Proceed to the next step or submit the form
      // ...
    } else {
      // Validation failed
    }
  };

  const [checkboxEnable, setCheckboxEnable] = useState(false);
  const [checkboxEnable1, setCheckboxEnable1] = useState(false);
  const [checkboxEnable2, setCheckboxEnable2] = useState(false);


  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredBarangays, setFilteredBarangays] = useState([]);

  const handleProvinceChange = (event, newValue) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userProvince: newValue ? newValue.province_name : "", // Set province_name or an empty string if newValue is falsy
    }));

    if (newValue) {
      const filteredCities = citiesData.filter((city) => city.province_code === newValue.province_code);
      setFilteredCities(filteredCities);
      setRegistrationForm((prevForm) => ({
        ...prevForm,
        userTown: "",
        userBarangay: "",
      }));
      setFilteredBarangays([]);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCityChange = (event, newValue) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userTown: newValue ? newValue.city_name : "", // Set city_name or an empty string if newValue is falsy
    }));

    if (newValue) {
      const filteredBarangays = barangaysData.filter((barangay) => barangay.city_code === newValue.city_code);
      setFilteredBarangays(filteredBarangays);
      setRegistrationForm((prevForm) => ({
        ...prevForm,
        userBarangay: "",
      }));
    } else {
      setFilteredBarangays([]);
    }
  };

  const handleBarangayChange = (event, newValue) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userBarangay: newValue ? newValue.brgy_name : "", // Set brgy_name or an empty string if newValue is falsy
    }));
  };

  ////-----------------------Handle Place of Marriage------------------------------------

  const handleProvinceChangeMarriage = (event, newValue) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userProvinceMarriage: newValue ? newValue.province_name : "", // Set province_name or an empty string if newValue is falsy
    }));

    if (newValue) {
      const filteredCities = citiesData.filter((city) => city.province_code === newValue.province_code);
      setFilteredCities(filteredCities);
      setRegistrationForm((prevForm) => ({
        ...prevForm,
        userTownMarriage: "",
        userBarangayMarriage: "",
      }));
      setFilteredBarangays([]);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCityChangeMarriage = (event, newValue) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userTownMarriage: newValue ? newValue.city_name : "", // Set city_name or an empty string if newValue is falsy
    }));

    if (newValue) {
      const filteredBarangays = barangaysData.filter((barangay) => barangay.city_code === newValue.city_code);
      setFilteredBarangays(filteredBarangays);
      setRegistrationForm((prevForm) => ({
        ...prevForm,
        userBarangayMarriage: "",
      }));
    } else {
      setFilteredBarangays([]);
    }
  };

  const handleBarangayChangeMarriage = (event, newValue) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userBarangayMarriage: newValue ? newValue.brgy_name : "", // Set brgy_name or an empty string if newValue is falsy
    }));
  };




  console.log("Registration form:", registrationForm);


  ////-----------------------Handle Place of Birth----------------------------------------------

  const handleProvinceChangeBirth = (event, newValue) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userProvincebirth: newValue ? newValue.province_name : "", // Set province_name or an empty string if newValue is falsy
    }));

    if (newValue) {
      const filteredCities = citiesData.filter((city) => city.province_code === newValue.province_code);
      setFilteredCities(filteredCities);
      setRegistrationForm((prevForm) => ({
        ...prevForm,
        userTownbirth: "",
        userBarangaybirth: "",
      }));
      setFilteredBarangays([]);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCityChangeBirth = (event, newValue) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userTownbirth: newValue ? newValue.city_name : "", // Set city_name or an empty string if newValue is falsy
    }));

    if (newValue) {
      const filteredBarangays = barangaysData.filter((barangay) => barangay.city_code === newValue.city_code);
      setFilteredBarangays(filteredBarangays);
      setRegistrationForm((prevForm) => ({
        ...prevForm,
        userBarangaybirth: "",
      }));
    } else {
      setFilteredBarangays([]);
    }
  };

  const handleBarangayChangeBirth = (event, newValue) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userBarangaybirth: newValue ? newValue.brgy_name : "", // Set brgy_name or an empty string if newValue is falsy
    }));
  };




  console.log("Registration form:", registrationForm);












  //-------------------------------------Adresss Ennnd--------------------------------------


  const handleDateChangeBirth = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userDob: formattedDate,
    }));
  };

  const handleDateChangeMarriage = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userDateOfMarriage: formattedDate,
    }));
  };


  ///// ---------------- End of Handle Date Pickers---------------------------------------------------------


  const [rows, setRows] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (index, field) => (event) => {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [field]: event.target.value } : row))
    );

    setRegistrationForm((prevForm) => {
      const updatedForm = { ...prevForm };
      const childIndex = Math.floor(index / 6) + 1; // Each child has 6 fields in the table

      const fieldPrefix = `userChild${childIndex}`;

      switch (field) {
        case 'dateOfDelivery':
          updatedForm[`${fieldPrefix}DateOfDelivery${index % 6 + 1}`] = event.target.value;
          break;
        case 'typeOfDelivery':
          updatedForm[`${fieldPrefix}TypeOfDelivery${index % 6 + 1}`] = event.target.value;
          break;
        case 'birthOutcome':
          updatedForm[`${fieldPrefix}BirthOutcome${index % 6 + 1}`] = event.target.value;
          break;
        case 'numberOfChildDelivered':
          updatedForm[`${fieldPrefix}NumberOfChildDelivered${index % 6 + 1}`] = event.target.value;
          break;
        case 'pregnancyRelatedConditions':
          updatedForm[`${fieldPrefix}Complication${index % 6 + 1}`] = event.target.value;
          break;
        default:
          break;
      }

      return updatedForm;
    });
  };



  // const handleChange = (index, field) => (event) => {
  //   setRows((prevRows) =>
  //     prevRows.map((row, i) => (i === index ? { ...row, [field]: event.target.value } : row))
  //   );
  // };

  const handleDateChange = (index) => (date) => {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, dateOfDelivery: date } : row))
    );
  };

  const addRow = () => {
    if (rows.length < 3) {
      setRows((prevRows) => [...prevRows, { pregnancyNumber: prevRows.length + 1 }]);
    }
    else {
      // If trying to add more than 3 rows, show a Snackbar message
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  /////---------------------Diseases Table 4 Family and Personal--------------------
  const diseases = ['Tuberculosis', 'HeartDiseases', 'Hypertension', 'BronchialAsthma', 'UrinaryTractInfection', 'Parasitism', 'Goiter', 'Anemia', 'Diabetes'];


  const handleCheckboxChangeDiseases = (disease, category) => (event) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      [`user${disease}${category}`]: event.target.checked,
    }));
  };



  //---------Triggering Checkbox for Specified Diseases-----------
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);

  const handleTriggerGTI = (event) => {
    setChecked(event.target.checked);
  };
  const handleTriggerOID = (event) => {
    setChecked1(event.target.checked);
  };


  const behaviors = ['Smoking', 'Alcohol Intake', 'Using of Illegal Drugs', 'Violence from Partner or Spouse', 'Multiple Partners'];

  const handleCheckboxChangeBehaviors = (behavior, category) => (event) => {
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      [`${category.toLowerCase()}${behavior.replace(/\s+/g, '')}`]: event.target.checked,
    }));
  };






  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} textAlign={'left'}>
        <Grid item xs={12}>

          <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box padding={2} backgroundColor='primary.main'>
                    <Typography color='white'>
                      I. PERSONAL IDENTIFIERS
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography> <Box component="span" fontWeight='bold'>1. Name -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please enter your name correctly.</Box></Typography>
                  </Box>
                </Grid>
                <Grid item xs={3} mt={2}>
                  <TextField name="userLname"
                    fullWidth
                    label="Lastname (Apelyido)"
                    variant="outlined"
                    size='small'
                    value={registrationForm.userLname}
                    onChange={(text) => setRegistrationForm(prev => { return { ...prev, userLname: text.target.value } })}
                    required

                  />
                </Grid>
                <Grid item xs={3} mt={2}>
                  <TextField name="userFname"
                    fullWidth

                    label="Firstname (Pangalan)"
                    variant="outlined"
                    size='small'

                    value={registrationForm.userFname}
                    onChange={(text) => setRegistrationForm(prev => { return { ...prev, userFname: text.target.value } })}
                    required

                  />
                </Grid>
                <Grid item xs={3} mt={2}>

                  <TextField name="userMname"
                    fullWidth

                    label="Middlename (Gitnang Pangalan)"
                    variant="outlined"
                    size='small'
                    value={registrationForm.userMname}
                    onChange={(text) => setRegistrationForm(prev => { return { ...prev, userMname: text.target.value } })}

                  />
                </Grid>
                {/* <Grid item xs={1.5} mt={2} >

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
                    value={registrationForm.userSuffix}
                    onChange={(text) => setRegistrationForm(prev => { return { ...prev, userSuffix: text.target.value } })}
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
                </Grid> */}

                <Grid item xs={12} mt={2}>
                  <Box>
                    <Typography> <Box component="span" fontWeight='bold'>2. Address -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Select province first, then city and finally your barangay.</Box></Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} mt={2} >
                  <Autocomplete
                    options={provincesData}
                    getOptionLabel={(option) => option.province_name}
                    value={provincesData.find((province) => province.province_name === registrationForm.userProvince) || null}
                    onChange={handleProvinceChange}
                    renderInput={(params) => (
                      <TextField {...params} label="Province" required />
                    )}
                  />
                </Grid>
                <Grid item xs={4} mt={2} >
                  <Autocomplete
                    options={filteredCities}
                    getOptionLabel={(option) => option.city_name}
                    value={filteredCities.find((city) => city.city_name === registrationForm.userTown) || null}
                    onChange={handleCityChange}
                    renderInput={(params) => <TextField {...params} label="City" required />}
                  />
                </Grid>
                <Grid item xs={4} mt={2}>
                  <Autocomplete
                    options={filteredBarangays}
                    getOptionLabel={(option) => option.brgy_name}
                    value={filteredBarangays.find((barangay) => barangay.brgy_name === registrationForm.userBarangay) || null}
                    onChange={handleBarangayChange}
                    renderInput={(params) => <TextField {...params} label="Barangay" required />}
                  />
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Box>
                    <Typography> <Box component="span" fontWeight='bold'>3. Birth Date -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Indicate your birth date correctly</Box></Typography>
                  </Box>
                </Grid>



                {/*--------------------------- Commmmmmeeeentssssssssss--------------------------- */}
                <Grid item xs={3} mt={2} direction='row'>
                  <FormControl required>
                    <LocalizationProvider dateAdapter={AdapterDayjs} required>
                      <DatePicker
                      label="Date of Birth"
                      value={dayjs(registrationForm.userDob)} // Convert back to dayjs object for DatePicker
                      onChange={handleDateChangeBirth}
                      renderInput={(params) => <TextField {...params} />}
                      disableFuture
                      minDate={dayjs().subtract(39, 'year')}
                      maxDate={dayjs().subtract(18, 'year')}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={2} mt={2} direction="row" textAlign="left" justifyContent="center">
                  <Typography >
                    <Typography fontWeight={600} color={'blue'}>
                      {moment(new Date, "YYYY/MM/DD").diff(moment(registrationForm.userDob, "YYYY/MM/DD"), "years")}
                    </Typography>
                    <Box component="span" fontSize="18px" fontWeight="bold" color={'primary.main'}>
                    </Box>{' '}
                    years old
                  </Typography>
                </Grid>
                {/*--------------------------- Commmmmmeeeentssssssssss--------------------------- */}

                <Grid item xs={3} mt={2} direction='row' textAlign='left' justifyContent='center'>

                  <FormControl>
                    <FormLabel name="gender" sx={{ fontWeight: 'bold' }}>4.Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="gender"
                      defaultValue="female"
                      name="gender"
                      value={registrationForm.userSex}
                      onChange={(text) => setRegistrationForm(prev => { return { ...prev, userSex: text.target.value } })}

                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </FormControl>

                </Grid>
                <Grid item xs={4} mt={2} direction='row' textAlign='left' justifyContent='center'>

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth required>
                      <InputLabel name="civilstatus"> 5. Civil Status</InputLabel>
                      <Select
                        labelId="civilstatus"
                        name="civilstatus"
                        size='small'
                        label="5. Civil Status"
                        value={registrationForm.userCivilStatus}
                        onChange={(text) => setRegistrationForm(prev => { return { ...prev, userCivilStatus: text.target.value } })}


                      >
                        <MenuItem value="" disabled>
                          <em>select the value</em>
                        </MenuItem>
                        <MenuItem value='Single'>Single</MenuItem>
                        <MenuItem value='Married'>Married</MenuItem>
                        <MenuItem value='Widowed'>Widowed</MenuItem>
                        <MenuItem value='Legally Separated'>Legally Separated</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                </Grid>

                <Grid item xs={2.3} mt={2} direction='row' textAlign='left' justifyContent='center'>

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth required>
                      <InputLabel name="bloodtype">6. Blood Type</InputLabel>
                      <Select
                        labelId="bloodtype"
                        name="bloodtype"

                        size='small'
                        label="6. Blood Type"
                        value={registrationForm.userBloodType}
                        onChange={(text) => setRegistrationForm(prev => { return { ...prev, userBloodType: text.target.value } })}


                      >
                        <MenuItem value="" disabled>
                          <em>select the value</em>
                        </MenuItem>
                        <MenuItem value='A+'>A+</MenuItem>
                        <MenuItem value='A-'>A-</MenuItem>
                        <MenuItem value='B-'>B-</MenuItem>
                        <MenuItem value='AB+'>AB+</MenuItem>
                        <MenuItem value='AB-'>AB-</MenuItem>
                        <MenuItem value='O+'>O+</MenuItem>
                        <MenuItem value='O-'>O-</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                </Grid>
                <Grid item xs={5} mt={2} direction='row' textAlign='left' justifyContent='center'>

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth required>
                      <InputLabel name="religion">7. Religion</InputLabel>
                      <Select
                        labelId="religion"
                        size='small'
                        name="religion"

                        label="7. Religion"
                        value={registrationForm.userReligion}
                        onChange={(text) => setRegistrationForm(prev => { return { ...prev, userReligion: text.target.value } })}


                      >
                        <MenuItem value="" disabled>
                          <em>select the value</em>
                        </MenuItem>
                        <MenuItem value='Roman Catholic'>Roman Catholic</MenuItem>
                        <MenuItem value='Islam'>Islam</MenuItem>
                        <MenuItem value='Iglesia ni Cristo'>Iglesia ni Cristo</MenuItem>
                        <MenuItem value='Philippine Independent Church'>Philippine Independent Church</MenuItem>
                        <MenuItem value='Seventh-day Adventist-'>Seventh-day Adventist-</MenuItem>
                        <MenuItem value='Bible Baptist Church'>Bible Baptist Church</MenuItem>
                        <MenuItem value='United Church of Christ in the Philippines'>United Church of Christ in the Philippines</MenuItem>
                        <MenuItem value="Jehovah's Witnesses">Jehovah's Witnesses</MenuItem>
                        <MenuItem value='Church of Christ'>Church of Christ</MenuItem>
                        <MenuItem value='None'>None</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                </Grid>
                <Grid item xs={2.5} mt={2} direction='row' textAlign='left' justifyContent='center'>

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth required>
                      <InputLabel name="nationality">8. Nationality</InputLabel>
                      <Select
                        defaultValue="Filipino"
                        labelId="nationality"
                        name="nationality"
                        size='small'

                        label="8. Nationality"
                        value={registrationForm.userNationality}
                        onChange={(text) => setRegistrationForm(prev => { return { ...prev, userNationality: text.target.value } })}


                      >

                        <MenuItem value='Filipino'>Filipino</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                </Grid>
                <Grid item xs={2.2} mt={2} direction='row' textAlign='left' justifyContent='center'>

                  <Box sx={{ minWidth: 120 }}>
                    <TextField name="occupation" label="9. Occupation" variant="outlined"
                      labelId="occupation"
                      size='small'
                      value={registrationForm.userOccupation}
                      onChange={(text) => setRegistrationForm(prev => { return { ...prev, userOccupation: text.target.value } })}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Box>
                    <Typography> <Box component="span" fontWeight='bold'>10. Contact Information -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please provide your contact number accurately.</Box></Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} mt={2} direction='row' textAlign='left' justifyContent='center'>
                  <Box >
                    <TextField name="cpnumber" label="Cellphone number" variant="outlined"
                      labelId="cpnumber"
                      fullWidth
                      size='small'
                      type='number'
                      value={registrationForm.userNumber}
                      onChange={(text) => setRegistrationForm(prev => { return { ...prev, userNumber: text.target.value } })}
                      required
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} mt={2} direction='row' textAlign='left' justifyContent='center'>

                  <Box >
                    <TextField name="userEmail " label="Email" variant="outlined"
                      labelId="userEmail"
                      fullWidth
                      size='small'
                      value={registrationForm.userEmail}
                      onChange={(text) => setRegistrationForm(prev => { return { ...prev, userEmail: text.target.value } })}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <Box>
                    <Typography> <Box component="span" fontWeight='bold'>11. Birth Place -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please indicate your place of birth correclty.</Box></Typography>
                  </Box>
                </Grid>

                <Grid item xs={4} mt={2} >
                  <Autocomplete
                    options={provincesData}
                    getOptionLabel={(option) => option.province_name}
                    value={provincesData.find((province) => province.province_name === registrationForm.userProvincebirth) || null}
                    onChange={handleProvinceChangeBirth}
                    renderInput={(params) => (
                      <TextField {...params} label="Province" required />
                    )}
                  />
                </Grid>
                <Grid item xs={4} mt={2} >
                  <Autocomplete
                    options={filteredCities}
                    getOptionLabel={(option) => option.city_name}
                    value={filteredCities.find((city) => city.city_name === registrationForm.userTownbirth) || null}
                    onChange={handleCityChangeBirth}
                    renderInput={(params) => <TextField {...params} label="City" required />}
                  />
                </Grid>
                <Grid item xs={4} mt={2}>
                  <Autocomplete
                    options={filteredBarangays}
                    getOptionLabel={(option) => option.brgy_name}
                    value={filteredBarangays.find((barangay) => barangay.brgy_name === registrationForm.userBarangaybirth) || null}
                    onChange={handleBarangayChangeBirth}
                    renderInput={(params) => <TextField {...params} label="Barangay" required />}
                  />
                </Grid>

              </Grid>
            </Box>
          </ThemeProvider>


          {/* -------------------------------------FamilyDetails------------------------------------- */}
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box padding={2} backgroundColor='primary.main'>
                  <Typography color='white'>
                    II. FAMILY COMPONENTS
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} mt={2}>
                <Box>
                  <Typography> <Box component="span" fontWeight='bold'>12. Name of your spouse -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please indicate the name of your spouse correclty.</Box></Typography>
                </Box>
              </Grid>
              <Grid item xs={3} mt={2}>
                <TextField name="spouseLname"
                  fullWidth
                  size='small'
                  label="Lastname (Apelyido)"
                  variant="outlined"
                  value={registrationForm.userHusbandsLName}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userHusbandsLName: text.target.value } })}


                  required

                />
              </Grid>
              <Grid item xs={3} mt={2}>
                <TextField name="spouseFname"
                  fullWidth

                  label="Firstname (Pangalan)"
                  variant="outlined"
                  size='small'

                  value={registrationForm.userHusbandsFName}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userHusbandsFName: text.target.value } })}
                  required

                />
              </Grid>
              <Grid item xs={3} mt={2}>

                <TextField name="spouseMname"
                  fullWidth

                  label="Middlename (Gitnang Pangalan)"
                  variant="outlined"
                  size='small'
                  value={registrationForm.userHusbandsMName}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userHusbandsMName: text.target.value } })}

                />
              </Grid>
              <Grid item xs={1.5} mt={2} >

                <FormControlLabel
                  value="top"
                  control={<Checkbox />}
                  onChange={handleChangeSetter(setCheckboxEnable1)}
                  checked={checkboxEnable1}
                  label="I have Extension"
                  labelPlacement="end"
                  inputProps={{ "aria-label": "primary checkbox" }}

                />
              </Grid>
              <Grid item xs={1.5} mt={2}>
                <Select
                  fullWidth
                  labelId="husbandSuffix"
                  name="husbandSuffix"
                  size='small'
                  value={registrationForm.userHusbandSuffix}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userHusbandSuffix: text.target.value } })}
                  disabled={!checkboxEnable1}
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





              <Grid item xs={3} mt={2} direction='row' textAlign='left' justifyContent='center'>
                <Box >
                  <TextField name="spouseCpnumber" label="Cellphone number" variant="outlined"
                    labelId="cpnumber"
                    fullWidth
                    size='small'
                    type='number'
                    value={registrationForm.userHusbandsNumber}
                    onChange={(text) => setRegistrationForm(prev => { return { ...prev, userHusbandsNumber: text.target.value } })}

                    required
                  />
                </Box>
              </Grid>
              <Grid item xs={3} mt={2} direction='row' textAlign='left' justifyContent='center'>
                <Box sx={{ minWidth: 120 }}>
                  <TextField name="spouseOccupation" label="Occupation" variant="outlined"
                    fullWidth
                    size='small'
                    labelId="spouseOccupation"
                    value={registrationForm.userHusbandsOccuupation}
                    onChange={(text) => setRegistrationForm(prev => { return { ...prev, userHusbandsOccuupation: text.target.value } })}
                  />
                </Box>
              </Grid>

              <Grid item xs={3} mt={2} direction='row' textAlign='left' justifyContent='center'>
                <Box sx={{ minWidth: 120 }}>
                  <TextField name="spouseEmployedBy" label="Employed by:" variant="outlined"
                    fullWidth
                    size='small'
                    labelId="spouseEmployedBy"
                    value={registrationForm.userEmployedBy}
                    onChange={(text) => setRegistrationForm(prev => { return { ...prev, userEmployedBy: text.target.value } })}

                  />
                </Box>
              </Grid>


              <Grid item xs={3} mt={2} direction='row' textAlign='left' justifyContent='center'>
                <Box sx={{ minWidth: 120 }}>

                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <FilledInput
                      id="salary"
                      name="salary"
                      size='small'
                      endAdornment={<InputAdornment position="end">₱</InputAdornment>}
                      aria-describedby="salary"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      value={registrationForm.userSalary}
                      onChange={(text) => setRegistrationForm(prev => { return { ...prev, userSalary: text.target.value } })}
                    />
                    <FormHelperText id="salaryhelper">Salary</FormHelperText>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} mt={2}>
                <Box>
                  <Typography> <Box component="span" fontWeight='bold'>13. Marriage Details:</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Indicate the Marriage details correctly (select date of marriage, then Select the marriage address  ).</Box></Typography>
                </Box>
              </Grid>

              <Grid container item xs={12} mt={2} direction='row' spacing={1}>
                <Grid xs={12} marginLeft={2}>
                  <FormControl required>
                    <LocalizationProvider dateAdapter={AdapterDayjs} required>
                      <DatePicker
                        label="Date of Marriage"
                        value={dayjs(registrationForm.userDateOfMarriage)} // Convert back to dayjs object for DatePicker
                        onChange={handleDateChangeMarriage}
                        renderInput={(params) => <TextField {...params} />}
                        disableFuture

                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={4} mt={2} >
                  <Autocomplete
                    options={provincesData}
                    getOptionLabel={(option) => option.province_name}
                    value={provincesData.find((province) => province.province_name === registrationForm.userProvinceMarriage) || null}
                    onChange={handleProvinceChangeMarriage}
                    renderInput={(params) => (
                      <TextField {...params} label="Province" required />
                    )}
                  />
                </Grid>
                <Grid item xs={4} mt={2} >
                  <Autocomplete
                    options={filteredCities}
                    getOptionLabel={(option) => option.city_name}
                    value={filteredCities.find((city) => city.city_name === registrationForm.userTownMarriage) || null}
                    onChange={handleCityChangeMarriage}
                    renderInput={(params) => <TextField {...params} label="City" required />}
                  />
                </Grid>
                <Grid item xs={4} mt={2}>
                  <Autocomplete
                    options={filteredBarangays}
                    getOptionLabel={(option) => option.brgy_name}
                    value={filteredBarangays.find((barangay) => barangay.brgy_name === registrationForm.userBarangayMarriage) || null}
                    onChange={handleBarangayChangeMarriage}
                    renderInput={(params) => <TextField {...params} label="Barangay" required />}
                  />
                </Grid>
              </Grid>

              <Grid item xs={4} mt={2} >

              </Grid>
              <Grid item xs={4} mt={2} >

              </Grid>
              <Grid item xs={4} mt={2}>


              </Grid>





              <Grid item xs={12} mt={2}>
                <Box>
                  <Typography> <Box component="span" fontWeight='bold'>14. Name of your Father -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please indicate the name of your father correclty.</Box></Typography>
                </Box>
              </Grid>
              <Grid item xs={3} mt={2}>
                <TextField name="fatherLname"
                  fullWidth
                  label="Lastname (Apelyido)"
                  variant="outlined"
                  size='small'
                  value={registrationForm.userFathersLName}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userFathersLName: text.target.value } })}
                  required

                />
              </Grid>
              <Grid item xs={3} mt={2}>
                <TextField name="fatherFname"
                  fullWidth

                  label="Firstname (Pangalan)"
                  variant="outlined"
                  size='small'
                  value={registrationForm.userFathersFName}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userFathersFName: text.target.value } })}

                  required

                />
              </Grid>
              <Grid item xs={3} mt={2}>

                <TextField name="fatherMname"
                  fullWidth

                  label="Middlename (Gitnang Pangalan)"
                  variant="outlined"
                  size='small'
                  required
                  value={registrationForm.userFathersMName}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userFathersMName: text.target.value } })}
                />
              </Grid>
              <Grid item xs={1.5} mt={2} >

                <FormControlLabel
                  value="top"
                  control={<Checkbox />}
                  checked={checkboxEnable2}
                  onChange={handleChangeSetter(setCheckboxEnable2)}
                  size='small'
                  label="I have Extension"
                  labelPlacement="end"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={1.5} mt={2}>
                <Select
                  fullWidth
                  labelId="extension"
                  name="fatherextension"
                  size='small'
                  value={registrationForm.userFathersSuffix}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userFathersSuffix: text.target.value } })}
                  disabled={!checkboxEnable2}
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
              <Grid item xs={12} mt={2}>
                <Box>
                  <Typography> <Box component="span" fontWeight='bold'>15. Name of your Mother -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please indicate the name of your mother correclty.</Box></Typography>
                </Box>
              </Grid>
              <Grid item xs={3} mt={2}>
                <TextField name="motherLname"
                  fullWidth
                  label="Lastname (Apelyido)"
                  variant="outlined"
                  size='small'

                  required
                  value={registrationForm.userMothersLName}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userMothersLName: text.target.value } })}

                />
              </Grid>
              <Grid item xs={3} mt={2}>
                <TextField name="motherFname"
                  fullWidth

                  label="Firstname (Pangalan)"
                  variant="outlined"
                  size='small'
                  value={registrationForm.userMothersFName}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userMothersFName: text.target.value } })}

                  required

                />
              </Grid>
              <Grid item xs={3} mt={2}>

                <TextField name="motherMname"
                  fullWidth

                  label="Middlename (Gitnang Pangalan)"
                  variant="outlined"
                  size='small'
                  value={registrationForm.userMothersMName}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userMothersMName: text.target.value } })}

                  required
                />
              </Grid>
              {/* <Grid item xs={1.5} mt={2} >

                <FormControlLabel
                  value="top"
                  control={<Checkbox />}
                  label="I have Extension"
                  labelPlacement="end"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={1.5} mt={2}>
                <Select
                  fullWidth
                  labelId="extension"
                  name="motherextension"
                  size='small'
                  value={registrationForm.userMothersSuffix}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userMothersSuffix: text.target.value } })}
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
              </Grid> */}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ padding: 2, backgroundColor: 'primary.main' }}>
                  <Typography variant="h6" color="white">
                    III. PREGNANCY HISTORY
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} mt={2}>
                <Box>
                  <Typography>
                    <Box component="span" fontWeight="bold">
                      16. Pregnancy history-
                    </Box>
                    <Box component="span" fontWeight="light" fontStyle={'italic'}>
                      {' '}
                      Add row and then fill up the field.
                    </Box>
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>

                <Button variant="contained" color="primary" margin={5} onClick={addRow} >
                  Add Row
                </Button>
                <Box sx={{ border: '1px solid grey' }}>

                  <TableContainer>
                    <Table sx={{ border: '1px solid grey' }} size="small" >
                      <TableHead>
                        <TableRow>
                          <TableCell>Pregnancy Number</TableCell>
                          <TableCell>Date of Delivery</TableCell>
                          <TableCell>Type of Delivery</TableCell>
                          <TableCell>Birth Outcome</TableCell>
                          <TableCell>Number of Child Delivered</TableCell>
                          <TableCell>Pregnancy Related Conditions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.pregnancyNumber}</TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  disableToolbar
                                  disableFuture
                                  variant="standard"
                                  margin="normal"
                                  size="small"
                                  id={`dateofdelivery${index}`}
                                  label="Date of Delivery"
                                  value={row.dateOfDelivery}
                                  onChange={handleDateChange(index)}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>
                              <FormControl fullWidth>
                                <InputLabel id="typeofdelivery"></InputLabel>
                                <Select
                                  variant='standard'
                                  value={row.typeOfDelivery}
                                  onChange={handleChange(index, 'typeOfDelivery')}
                                  label=""
                                >
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'Normal'}>Normal</MenuItem>
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'Cesarean'}>Cesarean</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell>
                              <FormControl fullWidth>
                                <InputLabel id="birthoutcome"></InputLabel>
                                <Select
                                  variant='standard'
                                  value={row.birthOutcome}
                                  onChange={handleChange(index, 'birthOutcome')}
                                  label=""
                                >
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'Alive'}>Alive</MenuItem>
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'Stillbirth'}>Stillbirth</MenuItem>
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'Miscarriage'}>Miscarriage</MenuItem>
                                </Select>
                              </FormControl>

                            </TableCell>
                            <TableCell>

                              <FormControl fullWidth>
                                <InputLabel id="noofChildDelivered"></InputLabel>
                                <Select
                                  variant='standard'
                                  value={row.numberOfChildDelivered}
                                  onChange={handleChange(index, 'numberOfChildDelivered')}
                                  label=""
                                >
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'single'}>single</MenuItem>
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'Twins'}>Twins</MenuItem>
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'triplets'}>triplets</MenuItem>
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'quadruplets'}>quadruplets</MenuItem>
                                </Select>
                              </FormControl>

                            </TableCell>
                            <TableCell>

                              <FormControl fullWidth>
                                <InputLabel id="noofChildDelivered"></InputLabel>
                                <Select
                                  variant='standard'
                                  value={row.pregnancyRelatedConditions}
                                  onChange={handleChange(index, 'pregnancyRelatedConditions')}
                                  label=""
                                >
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'None'}>None</MenuItem>
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'Pregnancy Induced Hypertension'}>Pregnancy Induced Hypertension</MenuItem>
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'Preeclampsia/Eclampsia'}>Preeclampsia/Eclampsia</MenuItem>
                                  <MenuItem style={{ display: 'block', width: '100%', padding: '3px' }} value={'Bleeding during/after Delivery'}>Bleeding during/after Delivery</MenuItem>

                                </Select>
                              </FormControl>

                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000} // Adjust the duration as needed
                    onClose={handleCloseSnackbar}
                  >
                    <Alert onClose={handleCloseSnackbar} severity="error" color='error'>
                      You can only add a maximum of 3 pregnancy.
                    </Alert>
                  </Snackbar>
                </Box>

              </Grid>

            </Grid>
          </Box>

        </Grid>
        <Grid item xs={12}>


          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box padding={2} backgroundColor='primary.main'>
                  <Typography color='white'>
                    IV. OTHER HEALTH RELATED CONDITIONS
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Typography> <Box component="span" fontWeight='bold'>17. Other health conditions -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please check the checkbox if applied.</Box></Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ border: '1px solid grey' }}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead sx={{ '& .MuiTableCell-head': { color: 'white' }, backgroundColor: 'primary.main' }}>
                        <TableRow>
                          <TableCell>Diseases</TableCell>
                          <TableCell>Personal</TableCell>
                          <TableCell>Family</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {diseases.map((disease, index) => (
                          <TableRow key={index}>
                            <TableCell>{disease}</TableCell>
                            <TableCell>
                              <Checkbox
                                checked={registrationForm[`user${disease}Personal`]}
                                onChange={handleCheckboxChangeDiseases(disease, 'Personal')}
                              />
                            </TableCell>
                            <TableCell>
                              <Checkbox
                                checked={registrationForm[`user${disease}Family`]}
                                onChange={handleCheckboxChangeDiseases(disease, 'Family')}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={checked} onChange={handleTriggerGTI} />}
                  label="Genetical Track Infections :"
                />
                {checked && <TextField label="Specify" variant='standard' value={registrationForm.userGenitalTrackInfection}   onChange={(text) => setRegistrationForm(prev => { return { ...prev, userGenitalTrackInfection: text.target.value } })}/>}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={checked1} onChange={handleTriggerOID} />}
                  label="Other Infectious Diseases :"
                />
                {checked1 && <TextField label="Specify" variant='standard' value={registrationForm.userOtherInfectiousDiseases}   onChange={(text) => setRegistrationForm(prev => { return { ...prev, userOtherInfectiousDiseases: text.target.value } })}/>}
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <Typography> <Box component="span" fontWeight='bold'>18. High risk behavior (mga gawing mapanganib) -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please check the checkbox if applied.</Box></Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ border: '1px solid grey' }}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead sx={{ '& .MuiTableCell-head': { color: 'white' }, backgroundColor: 'primary.main' }}>
                        <TableRow>
                          <TableCell>High Risk Behavior</TableCell>
                          <TableCell>Personal</TableCell>
                          <TableCell>Family</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {behaviors.map((behavior, index) => (
                          <TableRow key={index}>
                            <TableCell>{behavior}</TableCell>
                            <TableCell>
                              <Checkbox
                                checked={registrationForm[`user${behavior.replace(/\s+/g, '')}`]}
                                onChange={handleCheckboxChangeBehaviors(behavior, 'user')}
                              />
                            </TableCell>
                            <TableCell>
                              <Checkbox
                                checked={registrationForm[`family${behavior.replace(/\s+/g, '')}`]}
                                onChange={handleCheckboxChangeBehaviors(behavior, 'family')}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>


            </Grid>
            <Grid item xs={12} mb={2}>
              <Box>
                <Typography> <Box component="span" fontWeight='bold'>18. LMP-</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please pick the correct date for LMP</Box></Typography>
              </Box>
            </Grid>

            <Grid container xs={12} direction="row">
              <FormControl required>
                <Grid container direction="row">
                  <LocalizationProvider dateAdapter={AdapterDayjs} required>
                    <Grid item xs={4}>
                      <DatePicker
                        size='small'
                        label="Last Menstrual Period"
                        name='LMP'
                        value={lmp}
                        style={{ width: ' 100%' }}
                        onChange={(date) => handleDateChangePregnancyCal(date)}
                        renderInput={(params) => <TextField {...params} />}
                        disableFuture
                        maxDate={dayjs().subtract(1, 'week')}
                      />
                    </Grid>
                    <Grid item xs={3.5}>
                      <TextField
                        label="Estimated Date of Delivery"
                        value={edd || ''}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={3.5}>
                      <TextField
                        label="Age of Gestation (days)"
                        value={aog || ''}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>


                  </LocalizationProvider>


                  <Grid xs={12}>
                    <Grid xs={6}> <Box></Box></Grid>
                   
                  </Grid>
                  <Grid xs={12} flexDirection={'space-between'}>
                      <Box>
                      <Button variant="contained" size="large" backgroundColor="primary.main" onClick={() => handleCreateAccount()} padding={4}>
                        Submit
                      </Button>
                      </Box>
                    </Grid>
                </Grid>
              </FormControl>
            </Grid>




          </Box>

        </Grid>




      </Grid>
    </Box>


  )
}
