import React, { useEffect, useRef, useState } from 'react';
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
import { addDoc, updateDoc, query, collection, where, getDocs, doc } from 'firebase/firestore';
import { increment, decrement } from 'firebase/firestore';
import ReactToPrint from 'react-to-print';

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

    const [selectedDate, handleDateChange] = React.useState("");
    const [height, setHeight] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [systolic, setSystolic] = React.useState('');
    const [diastolic, setDiastolic] = React.useState('');
    const [dilates, setDilates] = React.useState('');
    const [efficases, setEfficaces] = React.useState('');
    const [fundalHeight, setFundalHeight] = React.useState('');
    const [fetalHeathTone, setFetalHearthTone] = React.useState('');
    const [urinalysis, setUrinalysis] = React.useState('');
    const [completeBloodCount, setCompleteBloodCount] = React.useState('');
    const [hepatitisB, setHepatitisB] = React.useState('');
    const [oralHealth, setOralHealth] = React.useState('');


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



    const [rows, setRows] = useState([{ pill: '', amount: 0, dosage: '', from:'', to:'' }]);
    const [open, setOpen] = useState(false);
    const [l, setL] = useState(0);

    const addRow = () => {
        const lastRow = rows[rows.length - 1];
        setL(rows.length+1)
        if(rows.length>2){
            alert("Cannot exceed three prescriptions at a time, thank you.")
        }else{
            if (lastRow.pill && lastRow.amount > 0 && lastRow.dosage && lastRow.from && lastRow.to) {
                    setRows([...rows, { pill: '', amount: 0, dosage: '', from:"", to:""}]);
            } else {
                alert("Please fill up all the needed inputs before adding another prescription, thank you.")
                setOpen(true);
            }
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

    const generateSummary = async () => {
        try{
            
        }catch(e){
            alert(e)
        }
    }

    const [lmp_, setLmp] = useState("");
    const submitVisit = async() =>{
        let arr = [];
        const querySnapshot = await getDocs(query(collection(database,"onlineAppointments"),where("appointmentDate","==",moment(new Date()).format("YYYY/MM/DD")),where("uid","==",selectedPatient.docid)))
        const app = doc(database, 'dashboard', '--appointments--');
        const vax = doc(database, 'dashboard', '--vaccinations--');
        try{
            addDoc(collection(database,"onlineAppointments"),{
                uid: selectedPatient.docid,
                appointmentDate: moment(new Date(),"YYYY/MM/DD").add(30,"days").format("YYYY/MM/DD"),
                purpose: "prenatal",
                status: "assigned by RHU",
            })
            await updateDoc(app, {
                no: increment(1),
            })
            updateDoc(doc(database,"userData",selectedPatient.docid),{
                lastVisit: moment(new Date(),"YYYY/MM/DD").format("MMMM DD, YYYY")
            })
            if(selectedPatient.lastPeriod===""||selectedPatient.lastPeriod==="No data"){
                updateDoc(doc(database,"userData",selectedPatient.docid),{
                    lastPeriod: lmp_
                })
            }
            addDoc(collection(database,"notifications"),{
                uid: selectedPatient.docid,
                body: "Your checkup today was saved successfully.",
                dateCreated:  moment(new Date(),"YYYY/MM/DD").format("MMMM DD, YYYY"),
                dateMade:  moment(new Date(),"YYYY/MM/DD").format("MMMM DD, YYYY")
            })
            if(l===1){
                addDoc(collection(database,"prescription"),{
                    uid:selectedPatient.docid,
                    name:selectedPatient.userFname+ " "+selectedPatient.userLname,
                    purpose: "supplements",
                    for:"mother",
                    vaccine:rows[0].pill,
                    from:rows[0].from,
                    to:rows[0].to,
                    amountAdministered:rows[0].amount,
                    note:rows[0].dosage,
                    day:moment(new Date()).format("DD"),
                    month:moment(new Date()).format("MM"),
                    year:moment(new Date()).format("YYYY")
                  })
            }
            if(l===2){
                addDoc(collection(database,"prescription"),{
                    uid:selectedPatient.docid,
                    name:selectedPatient.userFname+ " "+selectedPatient.userLname,
                    purpose: "supplements",
                    for:"mother",
                    vaccine:rows[0].pill,
                    from:rows[0].from,
                    to:rows[0].to,
                    amountAdministered:rows[0].amount,
                    note:rows[0].dosage,
                    day:moment(new Date()).format("DD"),
                    month:moment(new Date()).format("MM"),
                    year:moment(new Date()).format("YYYY")
                  })
                  addDoc(collection(database,"prescription"),{
                    uid:selectedPatient.docid,
                    name:selectedPatient.userFname+ " "+selectedPatient.userLname,
                    purpose: "supplements",
                    for:"mother",
                    vaccine:rows[1].pill,
                    from:rows[1].from,
                    to:rows[1].to,
                    amountAdministered:rows[1].amount,
                    note:rows[1].dosage,
                    day:moment(new Date()).format("DD"),
                    month:moment(new Date()).format("MM"),
                    year:moment(new Date()).format("YYYY")
                  })
            }
            if(l===3){
                addDoc(collection(database,"prescription"),{
                    uid:selectedPatient.docid,
                    name:selectedPatient.userFname+ " "+selectedPatient.userLname,
                    purpose: "supplements",
                    for:"mother",
                    vaccine:rows[0].pill,
                    from:rows[0].from,
                    to:rows[0].to,
                    amountAdministered:rows[0].amount,
                    note:rows[0].dosage,
                    day:moment(new Date()).format("DD"),
                    month:moment(new Date()).format("MM"),
                    year:moment(new Date()).format("YYYY")
                  })
                  addDoc(collection(database,"prescription"),{
                    uid:selectedPatient.docid,
                    name:selectedPatient.userFname+ " "+selectedPatient.userLname,
                    purpose: "supplements",
                    for:"mother",
                    vaccine:rows[1].pill,
                    from:rows[1].from,
                    to:rows[1].to,
                    amountAdministered:rows[1].amount,
                    note:rows[1].dosage,
                    day:moment(new Date()).format("DD"),
                    month:moment(new Date()).format("MM"),
                    year:moment(new Date()).format("YYYY")
                  })
                  addDoc(collection(database,"prescription"),{
                    uid:selectedPatient.docid,
                    name:selectedPatient.userFname+ " "+selectedPatient.userLname,
                    purpose: "supplements",
                    for:"mother",
                    vaccine:rows[2].pill,
                    from:rows[2].from,
                    to:rows[2].to,
                    amountAdministered:rows[2].amount,
                    note:rows[2].dosage,
                    day:moment(new Date()).format("DD"),
                    month:moment(new Date()).format("MM"),
                    year:moment(new Date()).format("YYYY")
                  })
            }
                addDoc(collection(database,"appointments"),{
                    name:selectedPatient.userFname + selectedPatient.userLname,
                    uid: selectedPatient.docid,
                    appointmentDate: moment(new Date()).format("YYYY/MM/DD"),
                    lmp: moment(selectedPatient.lastPeriod,"YYYY/MM/DD").format("MMMM DD, YYYY"),
                    aog: !selectedPatient.lastPeriod?"No data":moment(new Date()).diff(moment(selectedPatient.lastPeriod,"YYYY/MM/DD"),"weeks") + "weeks",
                    height: height,
                    weight: weight,
                    bmi: bmi,
                    systolic: systolic,
                    diastolic:diastolic,
                    bp: systolic+"/"+diastolic,
                    bpCategory:bpCategory,
                    dilates: dilates,
                    efficases: efficases,
                    fundalHeight: fundalHeight,
                    fetalHeathTone: fetalHeathTone,
                    presentation: presentation,
                    urinalysis: urinalysis,
                    completeBloodCount: completeBloodCount,
                    hepatitisB: hepatitisB,
                    oralHealth: oralHealth,
                    remarks: text
                }).then(alert("A"))
                    handleChange("")
                    setLmp("");
                    setHeight("");
                    setWeight("");
                    setSystolic("");
                    setDiastolic("");
                    setDilates(0);
                    setEfficaces(0);
                    setFetalHearthTone(0);
                    setL(0);
                    setFundalHeight(0);
                    setPresentation("");
                    setText("");
                    setUrinalysis("")
                    setCompleteBloodCount("")
                    setHepatitisB("")
                    setOralHealth("")
                    setRows([{ pill: '', amount: 0, dosage: '', from:'', to:'' }])
                    setChecked({
                        urinalysis: false,
                        cbcTest: false,
                        hepatitisB: false,
                        oralHealth: false,
                    })
        }catch(e){
          handleCloseAddVisitModal();
        }
    }
    const [lmp, setLMP] = useState("");
    const ref = useRef(null)

    useEffect(()=>{
        //console.log(selectedDate)
    },[selectedDate])


        try{
            if(rows[0].pill!==undefined){
                console.log("ROW 1: " + rows[0].pill)
    
            } if(rows[1].pill!==undefined){
                console.log("ROW 1: " + rows[0].pill)
                console.log("ROW 2: " + rows[1].pill)
            }
            if(rows[2].pill!==undefined){
                console.log("ROW 1: " + rows[0].pill)
                console.log("ROW 2: " + rows[1].pill)
                console.log("ROW 3: " + rows[2].pill)
            }
        }catch(e){
            console.log("ERROR BOI")
        }

    return (
        <div>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box mb={2}>

                        <Grid container spacing={2} margin={1} style={{backgroundColor:'navy',color:'white'}}>
                             <Grid container   component={Paper} padding={2}>
                            
                            <Grid xs={1}>
                                {
                                    !selectedPatient.userPic?
                                    <Avatar sx={{ width: 140, height: 140 }}>
                                        {initials}
                                    </Avatar>
                                    :
                                    <div style={{ width: 80, height: 80, backgroundImage: `url(${selectedPatient.userPic})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'white', marginLeft: 4 }} />
                                }

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
                                        LAST MENSTRUAL PERIOD
                                        <Box fontSize={'medium'} fontWeight={'650'} color={'black'}>
                                            {!selectedPatient.lastPeriod||selectedPatient.lastPeriod==="No data"?"No data":moment(selectedPatient.lastPeriod,"YYYY/MM/DD").format("MMMM DD, YYYY")}
                                        </Box>
                                    </Typography>
                                </Box>
                              
                            </Grid>
                          
                            <Grid xs={2} marginRight={3}>
                                <Box>
                                    <Typography fontSize={'medium'}>
                                        ESTIMATED DUE DATE
                                        <Box fontSize={'medium'} fontWeight={'650'} color={'black'}>
                                        {!selectedPatient.lastPeriod||selectedPatient.lastPeriod==="No data"?"No data":moment(selectedPatient.lastPeriod,"YYYY/MM/DD").add(280,"days").format("MMMM DD, YYYY")}
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid xs={2} marginRight={3}>
                                <Box>
                                    <Typography fontSize={'medium'}>
                                        AGE OF GESTATION
                                        <Box fontSize={'medium'} fontWeight={'650'} color={'black'}>
                                        {!selectedPatient.lastPeriod||selectedPatient.lastPeriod==="No data"?"No data":moment(new Date(),"YYYY/MM/DD").diff(selectedPatient.lastPeriod,"weeks")+ "weeks"} 
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
                            <Grid item xs={selectedPatient.lastPeriod===""||selectedPatient.lastPeriod==="No data"?6:12}>
                                <DatePicker
                                    type='date'
                                    label="Date of visit"
                                    fullWidth
                                    size='small'
                                    disablePast
                                    disableFuture
                                    value={selectedDate}
                                    onChange={(newValue) => {
                                        [handleDateChange(newValue)];
                                    }}
                                    renderInput={(params) => <TextField onChange={(text)=> alert(text.target.value)} {...params} variant="standard" fullWidth />}
                                 // Restrict date selection to today and past dates
                                />
                            </Grid>
                            
                            {
                                selectedPatient.lastPeriod===""||selectedPatient.lastPeriod==="No data"&&
                                <Grid item xs={selectedPatient.lastPeriod===""||selectedPatient.lastPeriod==="No data"?6:12}>
                                    <TextField  disableFuture  size='small' variant="standard"  label='LMP' type='date' onChange={(e)=> [setLmp(e.target.value),alert(e.target.value)]} style={{width:'50%',height:40}} />
                                </Grid>
                                
                            }
                            
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

                            <Grid container xs={5} margin={2}>
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
                                            {checked.urinalysis && <TextField onChange={(text)=> setUrinalysis(text.target.value)} label="Urinalysis Diagnosis" variant="standard" fullWidth />}
                                        </Grid>

                                        <Grid xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox checked={checked.cbcTest} onChange={handleChange} name="cbcTest" />}
                                                label="Complete Blood Count Test"
                                            />
                                            {checked.cbcTest && <TextField onChange={(text)=> setCompleteBloodCount(text.target.value)} label="CBC Test Diagnosis" variant="standard" fullWidth />}

                                        </Grid><Grid xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox checked={checked.hepatitisB} onChange={handleChange} name="hepatitisB" />}
                                                label="Hepatitis B Testing"
                                            />
                                            {checked.hepatitisB && <TextField onChange={(text)=> setHepatitisB(text.target.value)} label="Hepatitis B Testing Diagnosis" variant="standard" fullWidth />}
                                        </Grid><Grid xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox checked={checked.oralHealth} onChange={handleChange} name="oralHealth" />}
                                                label="Oral Health Testing"
                                            />
                                            {checked.oralHealth && <TextField onChange={(text)=> setOralHealth(text.target.value)} label="Oral Health Testing Diagnosis" variant="standard" fullWidth />}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>



                            <Grid container xs={5} margin={2}>


                                <Paper>
                                  
                                    <Box display="flex" justifyContent="center" padding={2} backgroundColor={'primary.main'} color={'white'} fontWeight={700}>
                                    Baby's Information
                                             </Box>

                                    <Grid container padding={3}>
                                        <Grid xs={12}>
                                            <TextField
                                                label="Dilates"
                                                type="number"
                                                value={dilates}
                                                onChange={(text)=> setDilates(text.target.value)}
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
                                                value={efficases}
                                                onChange={(text)=> setEfficaces(text.target.value)}
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
                                                value={fundalHeight}
                                                onChange={(text)=> setFundalHeight(text.target.value)}
                                                inputProps={{ min: 0, max: 100 }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                                }} variant='standard' fullWidth
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <TextField
                                                label="Fetal Hearth Tone"
                                                type="number"
                                                value={fetalHeathTone}
                                                onChange={(text)=> setFetalHearthTone(text.target.value)}
                                                inputProps={{ min: 0, max: 10 }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">per minute</InputAdornment>,
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
                            <Grid container xs={10} margin={2}>
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
                                                        <TableCell>
                                                            FROM
                                                            <input type='date' style={{width:120}} value={row.from}  onChange={(event) => updateRow(index, 'from', event.target.value)}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            TO
                                                            <input type='date' style={{width:120}} value={row.to} onChange={(event) => updateRow(index, 'to', event.target.value)}/>
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
                                    disablePast

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