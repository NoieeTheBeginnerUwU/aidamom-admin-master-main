import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, TextField, Grid, Box, InputAdornment, Typography, Avatar, } from '@mui/material';
import { FormControl, InputLabel, Select } from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Table, TableBody, TableCell, TableRow, MenuItem, IconButton, Snackbar } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
//moment
import moment from 'moment';
//firebase
import { database } from '../config/firebase';
import { addDoc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
    textarea: {
        minWidth: '90%',
        minHeight: '10vh',
    },
}));
const pillTypes = ['Iron', 'Folic Acid', 'Calcium Carbonate'];
const dosages = ['1 per day', 'Twice per day', 'Thrice per day'];
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));






export default function AddVisits({ selectedPatient, handleCloseAddVisitModal }) {

    const [text, setText] = useState('');
    const [date, setDate] = useState(null);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleDateChange2 = (newDate) => {
        setDate(newDate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    const isTextAreaValid = text.split(' ').length >= 3;
    const isFormValid = isTextAreaValid && date;



    const classes = useStyles();
    const [presentation, setPresentation] = React.useState('');

    const handleChange1 = (event) => {
        setPresentation(event.target.value);
    };

    const [selectedDate, handleDateChange] = React.useState(null);
    const [height, setHeight] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [systolic, setSystolic] = React.useState('');
    const [diastolic, setDiastolic] = React.useState('');


    const bmi = (weight && height) ? (weight / ((height / 100) ** 2)).toFixed(2) : '';
    let bmiCategory = '';
    if (bmi) {
        if (bmi < 18.5) {
            bmiCategory = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            bmiCategory = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            bmiCategory = 'Overweight';
        } else {
            bmiCategory = 'Obese';
        }
    }

    let bpCategory = '';
    if (systolic && diastolic) {
        if (systolic < 90 || diastolic < 60) {
            bpCategory = 'Low blood pressure';
        } else if (systolic > 120 || diastolic > 80) {
            bpCategory = 'High blood pressure';
        } else {
            bpCategory = 'Normal blood pressure';
        }
    }


    const bloodPressure = `${systolic}/${diastolic}`;
    const initials = `${selectedPatient && selectedPatient.userLname ? selectedPatient.userLname[0] : ''}${selectedPatient && selectedPatient.userFname ? selectedPatient.userFname[0] : ''}`;


    const [checked, setChecked] = useState({
        urinalysis: false,
        cbcTest: false,
        hepatitisB: false,
        oralHealth: false,
    });

    const handleChange = (event) => {
        setChecked({ ...checked, [event.target.name]: event.target.checked });
    };



    const [rows, setRows] = useState([{ pill: '', amount: 0, dosage: '' }]);
    const [open, setOpen] = useState(false);

    const addRow = () => {
        const lastRow = rows[rows.length - 1];
        if (lastRow.pill && lastRow.amount > 0 && lastRow.dosage) {
            setRows([...rows, { pill: '', amount: 0, dosage: '' }]);
        } else {
            setOpen(true);
        }
    };

    const updateRow = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const submitVisit = async() =>{
        let arr = [];
        try{
            const fetchAppointmentsToday = await getDocs(query(collection(database, "onlineAppointments"),where("uid"),"==",selectedPatient.id),where("status","==","approved"))
            fetchAppointmentsToday.forEach((doc)=>{
                arr.push(doc.id)
            })
            if(arr.length>0){
                for(let i = 1; i < arr.length; i++){
                    updateDoc(doc(database,"onlineAppointments",arr[i]),{
                        status:"completed"
                    })
                }
            }
            alert(arr.length)
            console.log(arr);
        }catch(e){

        }
    }

    return (
        <div>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box mb={2}>

                        <Grid container spacing={2} margin={1}>
                             <Grid container   component={Paper} padding={2}>
                            
                            <Grid xs={1}>
                                <Avatar sx={{ width: 56, height: 56 }}>
                                    {initials}
                                </Avatar>

                            </Grid>

                            <Grid xs={4} >
                                <Box>
                                    <Typography fontSize={'medium'}>
                                        Name:
                                        <Box fontSize={'medium'} fontWeight={'650'} color={'black'}>
                                            {selectedPatient.userFname}, {selectedPatient.userLname} {selectedPatient.userMname}
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid xs={2} marginRight={3}>
                                <Box>
                                    <Typography fontSize={'medium'}>
                                        LMP
                                        <Box fontSize={'medium'} fontWeight={'650'} color={'black'}>
                                            {moment(selectedPatient.lastPeriod,"YYYY/MM/DD").format("MMMM DD, YYYY")}
                                        </Box>
                                    </Typography>
                                </Box>
                              
                            </Grid>
                          
                            <Grid xs={2} marginRight={3}>
                                <Box>
                                    <Typography fontSize={'medium'}>
                                        EDD
                                        <Box fontSize={'medium'} fontWeight={'650'} color={'black'}>
                                        {moment(selectedPatient.lastPeriod,"YYYY/MM/DD").format("MMMM DD, YYYY")}
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid xs={2} marginRight={3}>
                                <Box>
                                    <Typography fontSize={'medium'}>
                                        AOG
                                        <Box fontSize={'medium'} fontWeight={'650'} color={'black'}>
                                        {moment(new Date(),"YYYY/MM/DD").diff(selectedPatient.lastPeriod,"weeks")} months
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>


                            </Grid>
                        </Grid>
                        <Divider textAlign="left" sx={{ marginTop: '1%', marginBottom: '2%' }}>
                            <Chip label="Blood Pressure and BMI" color="primary"/>
                        </Divider>
<Paper>
                        <Grid container justifyContent="center" spacing={2} padding={4}>
                            <Grid item xs={12}>
                                <DatePicker
                                    label="Date of visit"
                                    size='small'
                                    value={selectedDate}
                                    onChange={(newValue) => {
                                        handleDateChange(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
                                    maxDate={dayjs()} // Restrict date selection to today and past dates
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Height"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    disabled={!selectedDate}
                                    fullWidth
                                    variant="standard"
                                    type="number"
                                    inputProps={{ min: 20, max: 183 }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    disabled={!selectedDate}
                                    fullWidth

                                    variant="standard"
                                    type="number"
                                    inputProps={{ min: 30, max: 200 }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid container xs={6} mt={2}>
                                <Grid xs={6} ml={2}>
                                    <TextField
                                        label="BMI"
                                        value={bmi}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid xs={5} margin={1}>
                                    <Box>
                                        {bmi && <Alert severity={bmiCategory === 'Normal weight' ? 'success' : 'error'}>{bmiCategory}</Alert>}
                                    </Box>

                                </Grid>


                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Systolic"
                                    value={systolic}
                                    onChange={(e) => setSystolic(e.target.value)}
                                    disabled={!selectedDate}
                                    fullWidth
                                    variant="standard"
                                    type="number"
                                    inputProps={{ min: 0, max: 200 }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Diastolic"
                                    value={diastolic}
                                    onChange={(e) => setDiastolic(e.target.value)}
                                    disabled={!selectedDate}
                                    inputProps={{ min: 0, max: 200 }}
                                    fullWidth
                                    variant="standard"
                                    type="number"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                                    }}
                                />

                            </Grid>
                            <Grid container xs={6} mt={2}>
                                <Grid xs={6} ml={2}>
                                    <TextField
                                        disabled
                                        value={bloodPressure}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid xs={5} margin={1}>
                                    {bpCategory && <Alert severity={bpCategory === 'Normal blood pressure' ? 'success' : 'error'}>{bpCategory}</Alert>}
                                </Grid>
                            </Grid>


                        </Grid>
                        </Paper>
                        <Divider textAlign="left" sx={{ marginTop: '1%', marginBottom: '2%' }}>
                            <Chip label="Laboratory Test,  Baby Information and Prescription" color="primary" />
                        </Divider>

                        <Grid container>

                            <Grid container xs={3} margin={2}>
                                <Paper>
                                <Box display="flex" justifyContent="center" padding={2} backgroundColor={'primary.main'} color={'white'} fontWeight={700}>
                                                Laboratory Test
                                             </Box>
                                    <Grid xs={12} padding={2} >
                                    
                                        <Grid xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox checked={checked.urinalysis} onChange={handleChange} name="urinalysis" />}
                                                label="Urinalysis"
                                            />
                                            {checked.urinalysis && <TextField label="Urinalysis Diagnosis" variant="standard" fullWidth />}
                                        </Grid>

                                        <Grid xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox checked={checked.cbcTest} onChange={handleChange} name="cbcTest" />}
                                                label="Complete Blood Count Test"
                                            />
                                            {checked.cbcTest && <TextField label="CBC Test Diagnosis" variant="standard" fullWidth />}

                                        </Grid><Grid xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox checked={checked.hepatitisB} onChange={handleChange} name="hepatitisB" />}
                                                label="Hepatitis B Testing"
                                            />
                                            {checked.hepatitisB && <TextField label="Hepatitis B Testing Diagnosis" variant="standard" fullWidth />}
                                        </Grid><Grid xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox checked={checked.oralHealth} onChange={handleChange} name="oralHealth" />}
                                                label="Oral Health Testing"
                                            />
                                            {checked.oralHealth && <TextField label="Oral Health Testing Diagnosis" variant="standard" fullWidth />}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>



                            <Grid container xs={2.5} margin={2}>


                                <Paper>
                                  
                                    <Box display="flex" justifyContent="center" padding={2} backgroundColor={'primary.main'} color={'white'} fontWeight={700}>
                                    Baby's Information
                                             </Box>

                                    <Grid container padding={3}>
                                        <Grid xs={12}>
                                            <TextField
                                                label="Dilates"
                                                type="number"
                                                inputProps={{ min: 0, max: 10 }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                                }} variant='standard' fullWidth
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <TextField
                                                label="Effaces"
                                                type="number"
                                                inputProps={{ min: 0, max: 100 }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                }}
                                                variant='standard' fullWidth
                                            />

                                        </Grid>
                                        <Grid xs={12}>
                                            <TextField
                                                label="Fundal height"
                                                type="number"
                                                inputProps={{ min: 0, max: 100 }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                                }} variant='standard' fullWidth
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <TextField
                                                label="Fetal movement"
                                                type="number"
                                                inputProps={{ min: 0, max: 10 }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">count</InputAdornment>,
                                                }} variant='standard' fullWidth
                                            />
                                        </Grid>
                                        <Grid xs={12} mt={2}>
                                            <FormControl fullWidth>

                                                <InputLabel id="presentation-label">Presentation</InputLabel>
                                                <Select
                                                    labelId="presentation-label"
                                                    id="presentation-select"
                                                    value={presentation}
                                                    label="Presentation"
                                                    onChange={handleChange1}
                                                    variant='standard'
                                                >
                                                    <MenuItem value={'Cephalic'}>Cephalic</MenuItem>
                                                    <MenuItem value={'Breech'}>Breech</MenuItem>
                                                    <MenuItem value={'Shoulder'}>Shoulder</MenuItem>
                                                    <MenuItem value={'Compound'}>Compound</MenuItem>
                                                    <MenuItem value={'Transverse Lie'}>Transverse Lie</MenuItem>
                                                    <MenuItem value={'Oblique Lie'}>Oblique Lie</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Paper>


                            </Grid>
                            <Grid container xs={5} margin={2}>
                                <Paper>
                                 
                                    <Box display="flex" justifyContent="center" padding={2} backgroundColor={'primary.main'} color={'white'} fontWeight={700}>
                                    Prescription
                                             </Box>

                                    <Box ml={2} mt={1}>
                                        <Button variant="contained" color="primary" onClick={addRow} size='small'>
                                            Add Prescription
                                        </Button>
                                        <Table size='small'>
                                            <TableBody>
                                                {rows.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <Select
                                                                value={row.pill}
                                                                variant="standard"
                                                                onChange={(event) => updateRow(index, 'pill', event.target.value)}
                                                            >
                                                                {pillTypes.map((pill) => (
                                                                    <MenuItem key={pill} value={pill}>
                                                                        {pill}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box display="flex" alignItems="center">
                                                                <IconButton onClick={() => updateRow(index, 'amount', Math.max(0, row.amount - 1))}>
                                                                    <Remove />
                                                                </IconButton>
                                                                <TextField
                                                                    type="number"
                                                                    variant="standard"
                                                                    value={row.amount}
                                                                    onChange={(event) => updateRow(index, 'amount', parseInt(event.target.value))}
                                                                />
                                                                <IconButton onClick={() => updateRow(index, 'amount', row.amount + 1)}>
                                                                    <Add />
                                                                </IconButton>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Select
                                                                value={row.dosage}
                                                                variant="standard"
                                                                onChange={(event) => updateRow(index, 'dosage', event.target.value)}
                                                            >
                                                                {dosages.map((dosage) => (
                                                                    <MenuItem key={dosage} value={dosage}>
                                                                        {dosage}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Paper>

                            </Grid>


                        </Grid>

                        <Divider textAlign="left" sx={{ marginTop: '1%', marginBottom: '2%' }}>
                            <Chip label="Remarks and Schedule" color="primary" />
                        </Divider>

                        <Paper>
                        <Grid container>
                            <Grid xs={8} padding={3}>
                                <Box>
                                    <TextField
                                        label="Remarks"
                                        multiline
                                        rows={4}
                                        value={text}
                                        onChange={handleTextChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                </Box>
                            </Grid>
                            <Grid xs={.2}></Grid>
                            <Grid xs={3} columnSpacing={2} margin={3}>
                                <DatePicker
                                    label="Date of next Visit"
                                    value={date}
                                    onChange={handleDateChange2}
                                    renderInput={(params) => <TextField {...params} />}
                                    disabled={!isTextAreaValid}
                                    minDate={AdapterDayjs}

                                />
                                <Box marginTop={2}>
                                <Button onClick={()=> submitVisit()} type="submit" variant="contained" color="primary" disabled={!isFormValid} >
                                    Submit
                                </Button>
                                </Box>
                            </Grid>

                        </Grid>
                        </Paper>

                    </Box>
                    {/* Add more sections (Labtest, Baby Information) here */}
                </LocalizationProvider>

            </form>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
                <Alert onClose={handleClose} severity="error">
                    Please fill all fields in the last row before adding a new prescription.
                </Alert>
            </Snackbar>

        </div>
    );
}
