import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import './PersonaDetails.css'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import citiesData from './city.json'
import barangaysData from './barangay.json'
import provincesData from './province.json'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';




//code for asterisk to be red
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



export default function PersonalDetails() {





    

    const [error, setError] =useState({});



    //handle Changes-----


    const [checked, setChecked] =useState(false);
    const [patientFname, setPatientFname] =useState('');
    const [patientLname, setPatientLname] =useState('');
    const [patientMname, setPatientMname] =useState('');
    const [extension, setExtension] =useState('');
    const [gender, setGender] =useState('');
    const [province1, setProvince1] =useState('');
    const [province2, setProvince2] =useState('');
    const [city1, setCity1] =useState('');
    const [city2, setCity2] =useState('');
    const [barangay1, setBarangay1] =useState('');
    const [barangay2, setBarangay2] =useState('');
    const [civilstatus, setCivilStatus] =useState('');
    const [bloodtype, setBloodType] =useState('');
    const [nationality, setNationality] =useState('');
    const [religion, setReligion] =useState('');
    const [occupation, setOccupation] =useState('');
    const [cpnumber, setCpnumber] =useState('');
    const [fblink, setFblink] =useState('');

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const validateForm = () => {
        const errors = {};

        // Validate required fields
        const requiredFields = [
            'patientFname',
            'patientLname',
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


    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [barangay, setBarangay] = useState('');

    useEffect(() => {
        // Reset city and barangay when province changes
        setCity('');
        setBarangay('');
    }, [province]);

    useEffect(() => {
        // Reset barangay when city changes
        setBarangay('');
    }, [city]);


    //handle different autocomplete and set to clear

    const handleProvinceChange = (event, value) => {
        setProvince(value ? value : '');
    };

    const handleCityChange = (event, value) => {
        setCity(value ? value : '');
    };

    const handleBarangayChange = (event, value) => {
        setBarangay(value ? value : '');
    };

    //filter province to equal in barangays and cities
    const filteredCities = citiesData.filter((city) => city.province_code === province.province_code);
    const filteredBarangays = barangaysData.filter((barangay) => barangay.city_code === city.city_code);

    const [value, setValue] =useState(dayjs('2022-04-17'));



    //Calculate Age
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return '';

        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    return (
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
                        <TextField name="patientLname" 
                            fullWidth
                            label="Lastname (Apelyido)"
                            variant="outlined"
                            size='small'
                        
                            required
                            
                        />
                    </Grid>
                    <Grid item xs={3} mt={2}>
                        <TextField name="patientFname"
                            fullWidth
                            
                            label="Firstname (Pangalan)"
                            variant="outlined"
                            size='small'
                           
                            required
                            
                        />
                    </Grid>
                    <Grid item xs={3} mt={2}>

                        <TextField name="patientMname"
                            fullWidth
                         
                            label="Middlename (Gitnang Pangalan)"
                            variant="outlined"
                            size='small'
                            
                        />
                    </Grid>
                    <Grid item xs={1.5} mt={2} >

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
                            name="extension"
                            size='small'
                           
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
                            <Typography> <Box component="span" fontWeight='bold'>2. Address -</Box><Box component="span" fontWeight='light' fontStyle={'italic'}> Select province first, then city and finally your barangay.</Box></Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} mt={2} >
                        <Autocomplete
                            options={provincesData}
                            getOptionLabel={(option) => option.province_name}
                            name='province'
                            size='small'
                            style={{ width: '100%' }}
                            onChange={handleProvinceChange}
                            renderInput={(params) => <TextField {...params} label="Province" required variant="outlined"
                            />}
                        />
                    </Grid>
                    <Grid item xs={4} mt={2} >
                        <Autocomplete
                            options={filteredCities}
                            getOptionLabel={(option) => option.city_name}
                            name='city'
                            size='small'
                            style={{ width: '100%' }}
                            onChange={handleCityChange}
                            renderInput={(params) => <TextField {...params} label="City" required variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={4} mt={2}>

                        <Autocomplete
                            options={filteredBarangays}
                            name='barangay'
                            size='small'
                            getOptionLabel={(option) => option.brgy_name}
                            style={{ width: '100%' }}
                            onChange={handleBarangayChange}
                            renderInput={(params) => <TextField {...params} label="Barangay" required variant="outlined" />}
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
                                    label="Date of birth"
                                    name='dateofbrith'
                                    
                                    style={{ width: ' 100%' }}
                                   
                                    renderInput={(params) => <TextField {...params} size='small' required />}
                                    disableFuture
                                    minDate={dayjs().subtract(45, 'year')}
                                    maxDate={dayjs().subtract(10, 'year')}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} mt={2} direction="row" textAlign="left" justifyContent="center">
                        <Typography>
                            Your are{' '}
                            <Box component="span" fontSize="18px" fontWeight="bold" color={'primary.main'}>
                                <br />
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
                                value={gender}>
                                <FormControlLabel value="female" control={<Radio />} label="Female"  />
                                <FormControlLabel value="male" control={<Radio />} label="Male"  />
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
                                   
                                >
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
                                  
                                >
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
                                    
                                >
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
                                    labelId="nationality"
                                    name="nationality"
                                    size='small'
                                   
                                    label="8. Nationality"
                                  
                                >

                                </Select>
                            </FormControl>
                        </Box>

                    </Grid>
                    <Grid item xs={2.2} mt={2} direction='row' textAlign='left' justifyContent='center'>

                        <Box sx={{ minWidth: 120 }}>


                            <TextField name="occupation" label="9. Occupation" variant="outlined"
                                labelId="occupation"
                                size='small'
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
                               
                                required
                               
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} mt={2} direction='row' textAlign='left' justifyContent='center'>

                        <Box >


                            <TextField name="fblink" label="Facebook Messenger" variant="outlined"
                                labelId="fblink"
                                fullWidth
                                size='small'
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
                            name='province2'
                            size='small'
                            getOptionLabel={(option) => option.province_name}
                            style={{ width: '100%' }}
                            onChange={handleProvinceChange}
                            renderInput={(params) => <TextField {...params} label="Province" required variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={4} mt={2} >
                        <Autocomplete
                            options={filteredCities}
                            name='city2'
                            size='small'
                            getOptionLabel={(option) => option.city_name}
                            style={{ width: '100%' }}
                            onChange={handleCityChange}
                            renderInput={(params) => <TextField {...params} label="City" required variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={4} mt={2}>

                        <Autocomplete
                            options={filteredBarangays}
                            name='barangay2'
                            size='small'
                            getOptionLabel={(option) => option.brgy_name}
                            style={{ width: '100%' }}
                            onChange={handleBarangayChange}
                            renderInput={(params) => <TextField {...params} label="Barangay" required variant="outlined" />}
                        />
                    </Grid>

                    <Grid item xs={12} mt={2}>
                        <Button variant="contained" color="primary" >
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    )
}
