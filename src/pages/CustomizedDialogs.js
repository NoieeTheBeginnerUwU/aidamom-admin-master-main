import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { Box, Stack, Typography } from '@mui/material';  
import './patientTable.css'
// import PatientRegistrationForm from './PatientRegistrationForm';
import { Link } from 'react-router-dom';




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title='Add Patient' arrow>
      <Stack>
      
      <Button variant="contained" size='large' onClick={handleClickOpen}>
      <AddIcon size='large'/> Add Patient
      </Button>
      </Stack>
      </Tooltip>
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="patientReg"
        open={open}
      >
        
         <DialogTitle   sx={{ m: 0, p: 2 ,textAlign:'center'}} id="patientReg">
          Patient Registration
        </DialogTitle>
       

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers   sx={{ height:'90vh'}}>
          {/* <PersonalDetails/> */}
          {/* <PatientRegistrationForm/> */}
        
        
        </DialogContent>
        <DialogActions>
          <Button autoFocus  onClick={handleClose}>
            Next step
          </Button>
        </DialogActions>
      </BootstrapDialog>

      
    </React.Fragment>
  );
}