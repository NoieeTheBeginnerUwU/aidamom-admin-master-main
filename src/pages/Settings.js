import React, { useState, useEffect } from 'react'
import { Button, Typography, Divider, Paper, Box, Avatar, Grid, Snackbar, Autocomplete } from '@mui/material'
import rhupic from './rhupic.jpg'
import TextField from '@mui/material/TextField';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
//firebase
import { authentication, database } from '../config/firebase';
import { getDocs, query, collection, where, setDoc, doc, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import moment from 'moment';

import citiesData from './city.json'
import barangaysData from './barangay.json'
import provincesData from './province.json'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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






export default function Settings() {


  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogoutConfirmed = () => {
    logout(); // Call your logout function here
    handleLogoutDialogClose();
  };


  const options = ['RN', 'RM', 'M.D', 'Option4', 'Option5'];


  const [checked, setChecked] = useState(false);
  const uid = authentication.currentUser.uid;
  const email_ = authentication.currentUser.email;
  const [name1, setName] = useState('RHU III ADMIN');

  const [oldPassword, setOldPassword] = useState('');
  const [condfirmOldPass, setConfirmOldPass] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword1, setConfirmNewPassword1] = useState('');

  const [selectedOptions, setSelectedOptions] = useState([]);


  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [position, setPosition] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbar1, setOpenSnackbar1] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarMessage1, setSnackbarMessage1] = useState('');
  const [disableFields, setDisableFields] = useState(true);
  const [severity, setSeverity] = useState('success');
  const [severity1, setSeverity1] = useState('success');

  function logout() {
    authentication
      .signOut()
      .then(function () {
        // Sign-out successful.
        alert("logging out");
      })
      .catch(function (error) {
        setTimeout(alert(error), 3000)
      })
  }

  useEffect(() => {
    if (fname && lname && position && fname !== lname) {
      setDisableFields(false);
      setSnackbarMessage1('The Firstname and Lastname is the same')
    } else {
      setDisableFields(true);

    }
  }, [fname, lname, position]);

  const handleSaveClick1 = () => {
    if (!oldPassword || !condfirmOldPass || !confirmNewPassword1 || !newPassword) {
      setSeverity1('error');
      setSnackbarMessage1('All fill up all data necessary.');

    } else if (oldPassword !== condfirmOldPass || confirmNewPassword1 !== newPassword) {
      setSeverity1('error');
      setSnackbarMessage1('The password you enter does not match.');
    } else {
      // Here you can handle the save logic

      // Reset the TextField values

      setOldPassword('');
      setConfirmOldPass('');
      setNewPassword('');
      setConfirmNewPassword1('');
      setSnackbarMessage1('You have changed the password successfully');
      setSeverity1('success');

    }

    setOpenSnackbar1(true);
  };



  const handleSaveClick = () => {
    if (!email || !password || !confirmPassword) {
      setSnackbarMessage('Email, password, and confirm password fields cannot be empty.');
      setSeverity('error');
    } else if (!email.includes('@gmail.com') && !email.includes('@yahoo.com')) {
      setSnackbarMessage('Email must be a valid Gmail or Yahoo email address.');
      setSeverity('error');
    } else if (password !== confirmPassword) {
      setSnackbarMessage('Password and confirm password fields do not match.');
      setSeverity('error');
    } else if (password.length < 8 || !/[0-9]/.test(password) || !/[A-Z]/.test(password)) {
      setSnackbarMessage('Password must be at least 8 characters long and contain at least 2 numbers and 1 capital letter.');
      setSeverity('error');
    } else {
      // Here you can handle the save logic
      try {
        createUserWithEmailAndPassword(authentication, email, password)
      } catch (e) {
        alert(e)
      }
      // Reset the TextField values
      setFname('');
      setLname('');
      setMiddleInitial('');
      setPosition('');
      setPassword('');
      setConfirmPassword('');
      setSelectedOptions([]);
      setSnackbarMessage('Admin account created successfully');
      setSeverity('success');
    }

    setOpenSnackbar(true);
  };


  const handleLogout = () => {
    // Perform logout operation here
    // After logout, redirect to login page
    window.location.href = '/SignIn'; // replace '/login' with your login page route
  };



  function refreshPage() {
    window.location.reload(false);
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseSnackbar1 = () => {
    setOpenSnackbar1(false);
  };

  const [addMin, setAddMin] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    middleInitial: "",
    userLevel: "admin",
    dateCreated: moment(new Date()).format("YYYY/MM/DD hh:mm a")
  })

  const body = (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      minWidth: "60%",
      minHeight: "90%",
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4
    }}>
      <Box backgroundColor={'primary'}>
        <Typography variant="h6" component="h1" fontSize={'1.8em'} fontWeight={700}>
          Create Account
        </Typography>
      </Box>
      <ThemeProvider theme={theme}>
        <Typography variant="body1">
          <Divider sx={{ marginBottom: 3, marginTop: 2 }}></Divider>
          <Box marginLeft={5}>
            <Typography fontStyle={'italic'}>Instructions: Fill up the necessary information first before creating an account </Typography>
          </Box>
          <Grid container>
            <Grid xs={6} padding={5}>
              <Box marginBottom={1} fontWeight={600}>Personal Information</Box>
              <TextField label="First Name" value={fname} onChange={(e) => setFname(e.target.value)} required fullWidth />
              <Box margin={2}></Box>
              <TextField label="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} required fullWidth />
              <Box margin={2}></Box>
              <TextField id="MiddleInitial" value={middleInitial} onChange={(e) => setMiddleInitial(e.target.value)} label="Middle Initial" variant="outlined" fullWidth />
              <Box margin={2}></Box>
              <Box margin={2}></Box>
              <Box margin={2}></Box>
            </Grid>
            <Grid xs={6} padding={5}>
              <Box marginBottom={1} fontWeight={600}>Create Account</Box>
              <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
              <Box margin={2}></Box>
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
              <Box margin={2}></Box>
              <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth />
              <Box margin={2}> </Box>
              <Button onClick={handleSaveClick} variant='contained'>Save</Button>
            </Grid>


          </Grid>
          <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <MuiAlert elevation={6} variant="filled" severity={severity}>
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </Typography>

      </ThemeProvider>
    </Box>
  );


  const [avatar, setAvatar] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [acc, setAcc] = useState({
    email: "",
    pass: ""
  })

  const createAdmin = () => {

  }

  return (

    <Box textAlign={'left'} ml={4}>
      <Typography variant='h2' fontWeight='600' fontSize={28} mb={1}>
        ACCOUNT SETTINGS
      </Typography>
      <Divider sx={{ marginBottom: 5 }}></Divider>
      <Box>
        <Grid container textAlign={'left'} justifyItems={'center'}>
          <Grid xs={2} padding={1} justifyContent={'center'} justifyItems={'center'}>
            <Grid container xs={6} direction={'row'}>
              <div style={{ margin: 'auto' }}>
                <Avatar margin={'auto'} sx={{ width: 130, height: 130 }} alt="RHU III ADMIN" src={avatar} />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-button"
                  type="file"
                  onChange={handleUpload}
                />
                <label htmlFor="upload-button">
                  <Box margin={1}>
                    <Button variant="contained" color="primary" component="span">
                      <CameraAltIcon />
                      Upload Avatar
                    </Button>
                  </Box>
                </label>
              </div>
            </Grid>

          </Grid>
          <Grid xs={5}>
            <Box display="flex" flexDirection="row">
              <Box margin={3}>
                <Typography>
                  Username: <Box fontWeight={600}>{name1}</Box>
                </Typography>
              </Box>
              <Box margin={3}>
                <Typography>
                  Email: <Box fontWeight={600}>{email_}</Box>
                </Typography>
              </Box>
              <Box margin={3}>
                <Typography>
                  Contact number: <Box fontWeight={600}>092021222324</Box>
                </Typography>
              </Box>
            </Box>
          </Grid>

        </Grid>

        <Divider sx={{ marginBottom: 5 }}></Divider>

      </Box>
      <Box display="flex" flexDirection="row" alignItems="center" ml={2}>
        <Typography fontWeight={'600'}>
          Change Account name :
        </Typography>
        <Box ml={2}>
          <TextField label="Name" size='small' value={name1} onChange={(e) => setName(e.target.value)} />
        </Box>
      </Box>

      {/**
 * <Box mt={2} ml={2} textAlign={'left'}>
  <Typography fontWeight={'600'}>
    Change Password :
  </Typography>
  <Box mt={2} display="flex" flexDirection="row">
    <TextField
      label="email"
      type="email"
      value={acc.email}
      variant="filled"
      size="small"
      onChange={(text) => setAcc(prev => { return { ...prev, email: text.target.value } })}
      />
    <Box ml={2}>
      <TextField
        label="pass"
        type="password"
        value={acc.pass}
        variant="filled"
        size="small"
        onChange={(text) => setAcc(prev => { return { ...prev, pass: text.target.value } })}
        />
    </Box>
    <Button onClick={()=> createAdmin()}>
      create admin
    </Button>
  </Box>
  <Box mt={2} display="flex" flexDirection="row">
    <TextField
      label="New Password"
      type="password"
      value={newPassword}
      variant="filled"
      size="small"
      onChange={(e) => setNewPassword(e.target.value)}
    />
    <Box ml={2}>
      <TextField
        label="Confirm New Password"
        type="password"
        value={confirmNewPassword1}
        variant="filled"
        size="small"
        onChange={(e) => setConfirmNewPassword1(e.target.value)}
      />
    </Box>
  </Box>
  <Box mt={2}>
    <Button variant="contained" color="primary" onClick={handleSaveClick1}>
      Save
    </Button>
  </Box>
</Box>
 * 
 */}

      <Divider sx={{ marginBottom: 3 }}></Divider>


      <Button variant="contained" color="primary" onClick={handleOpen} >
        Create Account
      </Button> 
      
      <Button variant="contained" color="error" onClick={handleLogoutDialogOpen}>
        Logout
      </Button>


      <Dialog open={logoutDialogOpen} onClose={handleLogoutDialogClose} maxWidth="xs">
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirmed} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>



      <Box margin={2}></Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Create Account"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <Divider />

      <Snackbar open={openSnackbar1} autoHideDuration={3000} onClose={handleCloseSnackbar1} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <MuiAlert elevation={6} variant="filled" severity={severity1}>
          {snackbarMessage1}
        </MuiAlert>
      </Snackbar>



    </ Box>
  )
}
