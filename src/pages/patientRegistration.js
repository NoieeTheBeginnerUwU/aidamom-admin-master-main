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
    userSex: "",
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
    userHusbandsName: "",
    userFathersSuffix: "",
    userMothersSuffix: "",
    userHusbandsOccuupation: "",
    userDateOfMarriage: "",
    userPlaceOfMarriage: "",
    userProvinceMarrigae: "",
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
    userChildDateOfDelivery1: "",
    userChildTypeOfDelivery1: "",
    userChildBirthOutcome1: "",
    userChildNumberOfChildDelivered1: "",
    userChildComplication1: "",
    //child2
    userChild2: "",
    userChildDateOfDelivery2: "",
    userChildTypeOfDelivery2: "",
    userChildBirthOutcome2: "",
    userChildNumberOfChildDelivered2: "",
    userChildComplication2: "",
    //child3
    userChild3: "",
    userChildDateOfDelivery3: "",
    userChildTypeOfDelivery3: "",
    userChildBirthOutcome3: "",
    userChildNumberOfChildDelivered3: "",
    userChildComplication3: "",
    //child3
    userChild3: "",
    userChildDateOfDelivery3: "",
    userChildTypeOfDelivery3: "",
    userChildBirthOutcome3: "",
    userChildNumberOfChildDelivered3: "",
    userChildComplication3: "",
    //child4
    userChild4: "",
    userChildDateOfDelivery4: "",
    userChildTypeOfDelivery4: "",
    userChildBirthOutcome4: "",
    userChildNumberOfChildDelivered4: "",
    userChildComplication4: "",
    //child5
    userChild5: "",
    userChildDateOfDelivery5: "",
    userChildTypeOfDelivery5: "",
    userChildBirthOutcome5: "",
    userChildNumberOfChildDelivered5: "",
    userChildComplication5: "",
    //child6
    userChild6: "",
    userChildDateOfDelivery6: "",
    userChildTypeOfDelivery6: "",
    userChildBirthOutcome6: "",
    userChildNumberOfChildDelivered6: "",
    userChildComplication6: "",
    //child7
    userChild7: "",
    userChildDateOfDelivery7: "",
    userChildTypeOfDelivery7: "",
    userChildBirthOutcome7: "",
    userChildNumberOfChildDelivered7: "",
    userChildComplication7: "",
    //child8
    userChild8: "",
    userChildDateOfDelivery8: "",
    userChildTypeOfDelivery8: "",
    userChildBirthOutcome8: "",
    userChildNumberOfChildDelivered8: "",
    userChildComplication8: "",
    //child9
    userChild9: "",
    userChildDateOfDelivery9: "",
    userChildTypeOfDelivery9: "",
    userChildBirthOutcome9: "",
    userChildNumberOfChildDelivered9: "",
    userChildComplication9: "",
    //child10
    userChild10: "",
    userChildDateOfDelivery10: "",
    userChildTypeOfDelivery10: "",
    userChildBirthOutcome10: "",
    userChildNumberOfChildDelivered10: "",
    userChildComplication10: "",

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
    userTBPersonal: false,
    userTBFamily: false,
    userHeartDiseasesPersonal: false,
    userHeartDiseasesFamily: false,
    userDiabetesPersonal: false,
    userDiabetesFamily: false,
    userHypertensionPersonal: false,
    userHypertensionFamily: false,
    userBronchialAsthmaPersonal: false,
    userBronchialAsthmaFamily: false,
    userUTIPersonal: false,
    userUTIFamily: false,
    userParasitismPersonal: false,
    userParasitismFamily: false,
    userGoiterPersonal: false,
    userGoiterFamily: false,
    userAnemiaPersonal: false,
    userAnemiaFamily: false,
    userGenitalTrackInfection: false,
    userOtherInfectiousDiseases: false,
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

  console.log("Registration form:", registrationForm);


  //-------------------------------------Adresss Ennnd--------------------------------------


  const handleDateChangeBirth= (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      userDob: formattedDate,
    }));
  };


  ///// ---------------- End user Date of Birth---------------------------------------------------------


  const [rows, setRows] = useState([]);

  const handleChange = (index, field) => (event) => {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [field]: event.target.value } : row))
    );
  };

  const handleDateChange = (index) => (date) => {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, dateOfDelivery: date } : row))
    );
  };

  const addRow = () => {
    setRows((prevRows) => [...prevRows, { pregnancyNumber: prevRows.length + 1 }]);
  };


  /////---------------------Diseases Table 4 Family and Personal--------------------
  const diseases = ['Tuberculosis', 'Heart Diseases', 'Hypertension', 'Bronchial Asthma', 'Urinary Tract Infection', 'Parasitism', 'Goiter', 'Anemia (pallor)'];


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

                </Grid>
                <Grid item xs={4} mt={2} >

                </Grid>
                <Grid item xs={4} mt={2}>


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
              <Grid item xs={12} mt={2}>
                <TextField name="spouseLname"
                  fullWidth
                  size='small'
                  label="Lastname (Apelyido)"
                  variant="outlined"
                  value={registrationForm.userHusbandsName}
                  onChange={(text) => setRegistrationForm(prev => { return { ...prev, userHusbandsName: text.target.value } })}


                  required

                />
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

              <Grid item xs={12} mt={2} direction='row'>
                <FormControl required>
                  <LocalizationProvider dateAdapter={AdapterDayjs} required>
                    <DatePicker
                      label="Date of Marriage"
                      name='dateofmarriage'
                      size='small'
                      value={registrationForm.userDateOfMarriage}
                      onChange={(text) => setRegistrationForm(prev => { return { ...prev, userDateOfMarriage: text.target.value } })}
                      style={{ width: ' 100%' }}
                      maxDate={dayjs()}

                      renderInput={(params) =>
                        <TextField  {...params} required fullWidth size='small'
                        />}
                    />
                  </LocalizationProvider>
                </FormControl>
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

                  onChange={handleChangeSetter(setCheckboxEnable)}
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
                          <TableCell>Name of Child Delivered</TableCell>
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
                                  <MenuItem value={'Normal'}>Normal</MenuItem>
                                  <MenuItem value={'Cesarean'}>Cesarean</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell>
                              <TextField
                                variant='standard'
                                value={row.birthOutcome}
                                onChange={handleChange(index, 'birthOutcome')}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                variant='standard'
                                value={row.nameOfChildDelivered}
                                onChange={handleChange(index, 'nameOfChildDelivered')}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                variant='standard'
                                value={row.pregnancyRelatedConditions}
                                onChange={handleChange(index, 'pregnancyRelatedConditions')}
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
                    <Table size="small" >
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
                            <TableCell><Checkbox /></TableCell>
                            <TableCell><Checkbox /></TableCell>
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
                {checked && <TextField label="Specify" variant='standard' />}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={checked1} onChange={handleTriggerOID} />}
                  label="Other Infectious Diseases :"
                />
                {checked1 && <TextField label="Specify" variant='standard' />}
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <Typography> <Box component="span" fontWeight='bold'>18. High risk behavior (mga gawing mapanganib) -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Please check the checkbox if applied.</Box></Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ border: '1px solid grey' }}>
                  <TableContainer>
                    <Table size='small'>
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
                            <TableCell><Checkbox /></TableCell>
                            <TableCell><Checkbox /></TableCell>
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
                    <Grid xs={3} flexDirection={'space-between'}>
                      <Button variant="contained" color="primary" onClick={() => handleCreateAccount()}>
                        Submit
                      </Button>
                    </Grid>
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
