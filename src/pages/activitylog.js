
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { Box, Typography } from '@mui/material';
import {Divider} from '@mui/material';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(dateAndTime, user, description) {
  return { dateAndTime, user, description };
}

const initialRows = [
  createData('2023-11-29 02:35:33', 'Administrator', 'Created an appointment with Client A'),
  createData('2023-11-26 03:00:00', 'Administrator', 'Sent a message to Client B'),
  createData('2023-11-26 04:00:00', 'Administrator', 'Created an appointment with Client C'),
  createData('2023-11-23 05:00:00', 'Administrator', 'Sent a message to Client D'),
  createData('2023-11-29 06:00:00', 'Administrator', 'Created an appointment with Client E'),
  createData('2023-11-29 07:00:00', 'Administrator', 'Sent a message to Client F'),
  createData('2023-11-22 08:00:00', 'Administrator', 'Created an appointment with Client G'),
  createData('2023-11-29 09:00:00', 'Administrator', 'Sent a message to Client H'),
  createData('2023-11-25 10:00:00', 'Administrator', 'Created an appointment with Client I'),
  createData('2023-11-29 11:00:00', 'Administrator', 'Sent a message to Client J'),
  createData('2023-11-26 07:00:00', 'Administrator', 'Sent a message to Client F'),
  createData('2023-11-29 08:00:00', 'Administrator', 'Created an appointment with Client G'),
  createData('2023-11-23 09:00:00', 'Administrator', 'Sent a message to Client H'),
  createData('2023-11-29 10:00:00', 'Administrator', 'Created an appointment with Client I'),
  createData('2023-11-22 11:00:00', 'Administrator', 'Sent a message to Client J'),
  createData('2023-11-29 07:00:00', 'Administrator', 'Sent a message to Client F'),
  createData('2023-11-25 08:00:00', 'Administrator', 'Created an appointment with Client G'),
  createData('2023-11-29 09:00:00', 'Administrator', 'Sent a message to Client H'),
  createData('2023-11-29 10:00:00', 'Administrator', 'Created an appointment with Client I'),
  createData('2023-11-29 11:00:00', 'Administrator', 'Sent a message to Client J'),
];

export default function Activitylog() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, handleDateChange] = useState(dayjs());
  const [rows, setRows] = useState(initialRows);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const searchTermRegex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive search
  
    setRows(
      initialRows.filter((row) => searchTermRegex.test(row.description))
    );
  };

  const handleDateSearch = (date) => {
    handleDateChange(date);
    const selectedDateTimestamp = dayjs(date).startOf('day').unix();
  
    setRows(
      initialRows.filter((row) => {
        const rowDateTimestamp = dayjs(row.dateAndTime).startOf('day').unix();
        return rowDateTimestamp === selectedDateTimestamp;
      })
    );
  };

  const handleClear = () => {
    setSearchTerm('');
    handleDateChange(dayjs());
    setRows(initialRows);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box textAlign={'left'}>
      <Typography variant='h2' fontWeight='600' fontSize={28} mt={2}   ml={2} mb={1}>
       ACTIVITY LOG
      </Typography>
      <Divider sx={{marginBottom:5}}></Divider>
      </Box>
      <Grid container style={{ maxHeight: '80vh', overflowY: 'hidden' }}>
        <Grid xs={3} padding={5}>
          <TextField label="Search" variant="filled" value={searchTerm} onChange={handleSearch} fullWidth />
          <Box margin={2}></Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={selectedDate} onChange={handleDateSearch}
            />
          </LocalizationProvider>
          <Box margin={2}></Box>
          <Button variant="contained" color="primary" onClick={handleClear}>
            Clear
          </Button>
        </Grid>
        <Grid xs={9}>
          <TableContainer component={Paper} style={{ maxHeight: '60%', overflowY: 'auto' }}>
            <Table className={classes.table} aria-label="activity log table" stickyHeader sx={{minWidth:'100%', minHeight:'90%'}}>
              <TableHead>
                <TableRow>
                  <TableCell>Date and Time</TableCell>
                  <TableCell align="right">User</TableCell>
                  <TableCell align="right">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.dateAndTime}>
                    <TableCell component="th" scope="row">
                      {row.dateAndTime}
                    </TableCell>
                    <TableCell align="right">{row.user}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

