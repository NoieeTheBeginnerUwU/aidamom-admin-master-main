import React, { useEffect } from 'react'
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import CircleIcon from '@mui/icons-material/Circle';
import { forwardRef } from 'react';
//firebase
import { database } from '../config/firebase';
import { onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import moment from 'moment';
import NoData from '../animations/NoData';
import { Box, Button } from '@mui/material';

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysToHighlight = date;

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs(new Date());

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <CircleIcon color='error' fontSize='small'/> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}
  



export default function Calendar({onChange}) {
  const [date, setDate] = React.useState("");
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [oA, setOA] = React.useState([]);

  const fetchOnline = async (date) => {
    let arr = [];
    let p = [];
    let d = moment(date,"YYYY/MM/DD").format("YYYY/MM/DD")
    const querySnapshot = await getDocs(query(collection(database,"onlineAppointments"),where("status","==","approved"),where("appointmentDate","==",moment(new Date()).format("YYYY/MM/DD"))));
    querySnapshot.forEach((doc)=>{
      arr.push({id:doc.id, uid:doc.data().uid,name:doc.data().name, appointmentDate:doc.data().appointmentDate, time:doc.data().time, purpose:doc.data().purpose})
      p.push(doc.data().appointmentDate)
    })
    setOA(p);
    fetchHighlightedDays(p)
  }

  useEffect(()=>{
    fetchOnline(date)
  },[])

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(oA);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const [dateNow, setDateNow] = React.useState();


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box>
      <p>your appointments today</p>
    </Box>
    <div style={{width:'100%',height:'50%',backgroundColor:'white',}}>
      {
        oA.length>0?
          <Box>
            {
              oA.map((doc)=>{
                <div style={{width:'100%',height:50,border:'1px solid black',backgroundColor:'black'}}>
                  {doc.id}
                </div>
              })
            }
          </Box>
        :
        <Box>
          <NoData/>
          <p>NO APPOINTMENTS ON THIS DAY</p>
        </Box>
     
      }
    </div>
  </LocalizationProvider>
  )
}
