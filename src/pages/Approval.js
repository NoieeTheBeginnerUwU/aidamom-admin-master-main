
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Paper, Grid, Divider, Typography, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';


//firebase
import { database } from '../config/firebase';
import { updateDoc, doc, query, where, collection, getDocs, orderBy, increment } from 'firebase/firestore';
import moment from 'moment';




const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#fff', // White background
          fontWeight:'bolder',
          minWidth:'35vw',
          minHeight:'30vh',
          color: '#000', // Black text
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: '#2196f3', // Blue background for the title
          color: '#fff', // White text
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: '1px solid #1565c0', // Darker blue top border for actions
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#2196f3', // Blue button text
        },
      },
    },
  },
});

export default function Approval() {

  // Dummy data for Appoinment table
  const columns = [
    { field: 'appointmentDate', headerName: 'DATE', flex: .5},
    { field: 'time', headerName: 'TIME', flex: .5 },
    { field: 'name', headerName: 'PATIENT', flex: .5 },
    { field: 'purpose', headerName: 'PURPOSE', flex: .5 },
    {
      field: 'status',
      headerName: 'STATUS', flex: .5,
      renderCell: (params) => {
        if (params.value === 'pending') {
          return <div><PendingActionsIcon color="action" /> {params.value}</div>;
        } else if (params.value === 'denied') {
          return <div><CancelIcon color="error" /> {params.value}</div>;
        } else {
          return <div><CheckCircleIcon color="approved" /> {params.value}</div>;
        }
      },
    },
    {
      field: 'action',
      headerName: 'ACTION', flex: .7,
      renderCell: (params) => (
        params.row.status === 'pending' ? (
          <ThemeProvider theme={theme}>
          <div>
            <Button variant="contained"sx={{ padding:2 }}  onClick={handleClickOpenDialogMess} >Approve</Button>
            <Button variant="contained" color="error" backgroundColor = "#FF0000" onClick={handleClickDialogMessReject}>Reject</Button>

            <Dialog open={openDialogMessage} onClose={handleCloseDialogMess}  minWidth="xs">
              <DialogTitle >Confirmation</DialogTitle>
              <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
                <DialogContentText>
                  Are you sure you want to approve the appointment?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogMess} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleConfirmation(params.row.id)} color="primary">
                  Approve
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog open={openDialogMessageReject} onClose={handleCloseDialogMessReject}  maxWidth="sm">
              <DialogTitle style={{color:"error", backgroundColor:"#FF0000"}}>Confirmation</DialogTitle>
              <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
                <DialogContentText >
                  Are you sure you want to reject the appointment?
                </DialogContentText>
                <TextField
          label="Reason for Refusal"
          value={reasonForRefusal}
          onChange={(event) => setReasonForRefusal(event.target.value)}
        />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogMessReject} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleRejectAppointment(params.row.id) } color="primary" disabled={!isRejectDisabled}>
                  Reject
                </Button>
              </DialogActions>
            </Dialog>
            

          </div>
          </ThemeProvider>
        ) : null
      ),
    },
  ];

  const allRows = [
    { id: 1, date: '2023-11-26 15:55', patient: 'Doe, John', purpose: 'Prenatal Checkup', address: 'Barangay 1, Municipality 1, Province 1', status: 'Pending' },
    { id: 2, date: '2023-11-27 10:00', patient: 'Smith, Jane', purpose: 'Referral', address: 'Barangay 2, Municipality 2, Province 2', status: 'Scheduled' },
    { id: 3, date: '2023-11-28 14:30', patient: 'Brown, Bob', purpose: 'Checkup', address: 'Barangay 3, Municipality 3, Province 3', status: 'Pending' },
    { id: 4, date: '2023-11-26 15:55', patient: 'Doe, John', purpose: 'Prenatal Checkup', address: 'Barangay 1, Municipality 1, Province 1', status: 'Pending' },
    { id: 5, date: '2023-11-27 10:00', patient: 'Smith, Jane', purpose: 'Referral', address: 'Barangay 2, Municipality 2, Province 2', status: 'Scheduled' },
    { id: 6, date: '2023-11-28 14:30', patient: 'Brown, Bob', purpose: 'Checkup', address: 'Barangay 3, Municipality 3, Province 3', status: 'Denied' },


  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [showPending, setShowPending] = useState(true);
  const [showScheduled, setShowScheduled] = useState(true);
  const [showAll, setShowAll] = useState(true);
  const [rows, setRows] = useState(allRows);

  const filteredRows = rows.filter((row) => {
    return (
      (showAll) ||
      (showPending && row.status === 'Pending') ||
      (showScheduled && row.status === 'Scheduled')
    );
  }).filter((row) => {
    return Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  ///Messageee pop up
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleApprove = (id) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, status: 'Scheduled' } : row)));
    setSnackbarMessage('Appointment Approved');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleReject = (id) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, status: 'Denied' } : row)));
    setSnackbarMessage('Appointment Rejected');
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  };

  const [onlineAppointments, setOnlineAppointments] = useState([]);
  const fetchOnlineAppointments = async () => {
    let arr = [];
    let q = query(collection(database, "onlineAppointments"), where("status", "==", "pending"))
    const querySnapshot = await getDocs(q, orderBy("appointmentDate", "desc"))
    querySnapshot.forEach((doc) => {
      arr.push({ id: doc.id, uid: doc.data().uid, name: doc.data().name, purpose: doc.data().purpose, status: doc.data().status, appointmentDate: moment(doc.data().appointmentDate, "YYYY/MM/DD").format("MMMM DD, YYYY"), time: doc.data().time })
    })
    setOnlineAppointments(arr);
  }

  useEffect(() => {
    fetchOnlineAppointments()
    console.log(onlineAppointments)
  }, [])

  const handleApproveAppointment = async (id, name, purpose) => {
    try {
      updateDoc(doc(database, "onlineAppointments", id), {
        status: "approved"
      })
     
      setSnackbarMessage('Appointment Approved');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchOnlineAppointments()
    } catch (e) {
      alert(e)
    }
  }

  const handleRejectAppointment = async (id, name, purpose) => {
    try {
      updateDoc(doc(database, "onlineAppointments", id), {
        status: "denied"
      })
     
      setSnackbarMessage('Appointment Rejected');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      fetchOnlineAppointments()
    } catch (e) {
      alert(e)
    }
  }

  ////------------------for Confirmation messages--------------------------
 
  const handleConfirmation = (appointmentId) => {
    // API call to update appointment status to "approved"
    // Update local state or table data based on the response
    // ...
    const id = appointmentId;
    handleApproveAppointment(id);
    // Close the dialog after successful confirmation




    handleCloseDialogMess();
  };
  
  const handleClickOpenDialogMess = () => {
    // Open the confirmation dialog
    setOpenDialogMessage(true);
  };
  
  const handleCloseDialogMess = () => {
    // Close the confirmation dialog
    setOpenDialogMessage(false);
    // Reset confirmation flag
    setConfirmationFlag(false);
  };

  const handleClickDialogMessReject = () => {
    // Close the confirmation dialog
    setOpenDialogMessageReject(true);
 
  };

  const handleCloseDialogMessReject = () => {
    // Close the confirmation dialog
    setOpenDialogMessageReject(false);
    // Reset confirmation flag
    setConfirmationFlag(false);
  };
  const [reasonForRefusal, setReasonForRefusal] = useState('');
  const [appointmentId, setAppointmentId] = useState(null);
  
   const [openDialogMessageReject, setOpenDialogMessageReject] = useState(false);
  const [openDialogMessage, setOpenDialogMessage] = useState(false);
  const [confirmationFlag, setConfirmationFlag] = useState(false);

  const isRejectDisabled = () => {
    const words = reasonForRefusal.trim().split(/\s+/);
    return words.length < 3;
  };



  return (

    <ThemeProvider theme={theme}>
    <div style={{ width: '100%', height: '80%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start' }} marginTop={1}>


      <Box sx={{ alignItems: 'start', justifyContent: 'start', textAlign: 'left' }}>



        <Box style={{ maxHeight: '90%', maxWidth: '98%', padding: '1%' }} >
          <Grid container >
            <Grid xs={5} mb={1}>
              <TextField
                label="Search"
                variant="standard"
                value={searchTerm}
                fullWidth
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={5} marginTop={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPending}
                    onChange={(e) => setShowPending(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Pending"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showScheduled}
                    onChange={(e) => setShowScheduled(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Scheduled"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showAll}
                    onChange={(e) => setShowAll(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show All"
              />
            </Grid>
            <Grid xs={12}>
              {/* ----------------------------------------------------------------- Appointment Table ----------------------------------------------------------------- */}
              <Box sx={{ height: 500, width: '100%', position: 'relative'}}>
                <DataGrid 
                headerHeight={20} 
               
                   style={{
                    position: 'sticky',
                    marginTop:'10px',
                    backgroundColor: 'white', // adjust background color
                    display: 'flex',
                    justifyContent: 'center', // center the header
                  }}
                  rowsPerPageOptions={[]}
                  rows={onlineAppointments}
                  columns={columns}
                 
                  density="compact"

                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* ----------------------------------------------------------Messaggeeeeeeeee pop up---------------------------------------------------------- */}
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </div>
    </ThemeProvider>
  );
}
