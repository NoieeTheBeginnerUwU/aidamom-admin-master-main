import React, { useState, useEffect, useRef } from 'react';
import { database } from '../config/firebase';
import { useReactToPrint } from 'react-to-print';
import { addDoc, collection, getDocs, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import moment from 'moment';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';



const Systemreport = () => {

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })




  function createData(name, alive, stillbirth, miscarriage, total) {
    return { name, alive, stillbirth, miscarriage, total };
  }

  function createData2(name, alive, stillbirth, miscarriage, total) {
    return { name, alive, stillbirth, miscarriage, total };
  }


  const [date_, setDate_] = useState("")
  const [month, setMonth] = useState(moment(new Date()).format("MMMM"));
  useEffect(() => {
    setMonth(moment(new Date()).format("MM"))
  }, [])
  const [year_, setYear_] = useState(2023);
  const [summary, setSummary] = useState([]);
  let [todV, setTodV] = useState(0);
  let [todVM, setTodVM] = useState(0)
  let [todVN, setTodVN] = useState(0)
  let [todVD, setTodVD] = useState(0)
  let [todVag, setTodVag] = useState(0)
  let [todCae, setTodCae] = useState(0)
  let [todAlv, setTodAlv] = useState(0)
  let [todStl, setTodStl] = useState(0)
  let [todMis, setTodMis] = useState(0)
  let [todMal, setTodMal] = useState(0)
  let [todFal, setTodFal] = useState(0)
  let [todGen, setTodGen] = useState(0)
  let [childWeight, setChildWeight] = useState(0)
  let [childWeightL, setChildWeightL] = useState(0)
  let [childWeightN, setChildWeightN] = useState(0)
  let [childWeightO, setChildWeightO] = useState(0)
  let [mAgeU, setMAgeU] = useState(0)
  let [mAgeN, setMAgeN] = useState(0)
  let [mAgeO, setMAgeO] = useState(0)
  let [mAgeT, setMAgeT] = useState(0)


  const fetchdischarge = async (month, year) => {
    let tod = 0
    let tod_d = 0
    let tod_n = 0
    let tod_m = 0
    let tod_v = 0
    let tod_a = 0
    let tod_s = 0
    let tod_mc = 0
    let tod_vag = 0
    let tod_al = 0
    let tod_st = 0
    let tod_ms = 0
    let tod_ml = 0
    let tod_fl = 0
    let cw = 0;
    let cwL = 0;
    let cwN = 0;
    let cwO = 0;
    const querySummary = await getDocs(query(collection(database, "discharge_child"), where("month", "==", month), where("year", "==", year)));
    const querySummary2 = await getDocs(query(collection(database, "userData")));

    querySummary.forEach((doc) => {
      if (doc.data().healthProfessionalAttended === "Midwife") {
        tod_m++
      }
      if (doc.data().healthProfessionalAttended === "Nurse") {
        tod_n++
      }
      if (doc.data().healthProfessionalAttended === "Doctor") {
        tod_d++
      }
      if (doc.data().deliveredVia === "Vaginal") {
        tod_vag++
      }
      if (doc.data().childGender === "male") {
        tod_ml++
      }
      if (doc.data().childGender === "female") {
        tod_fl++
      }
      if (doc.data().childWeightType === "low") {
        cwL++
      }
      if (doc.data().childWeightType === "normal") {
        cwL++
      }
      if (doc.data().childWeightType === "overweight") {
        cwL++
      }
    })
    setTodV(tod_m + tod_d + tod_n);
    setTodVD(tod_d)
    setTodVM(tod_m)
    setTodVN(tod_n)
    setTodVag(tod_vag);
    setTodMal(tod_ml)
    setTodFal(tod_fl)
    setTodGen(tod_fl + tod_ml)
    setChildWeightL(cwL)
    setChildWeightN(cwN)
    setChildWeightO(cwO)
    setChildWeight(cwL + cwN + cwO)


    let over = 0
    let normal = 0
    let under = 0
    let mothers = [];
    querySummary2.forEach((doc) => {

      if (!doc.data().lastPeriod) {

      } else {
        if (moment(new Date(), "YYYY/MM/DD").diff(doc.data().userDob, "years") < 15 && doc.data().lastPeriod !== "") {
          under++;
        }
        if (moment(new Date(), "YYYY/MM/DD").diff(doc.data().userDob, "years") >= 15 && moment(new Date(), "YYYY/MM/DD").diff(doc.data().userDob, "years") <= 20 && doc.data().lastPeriod !== "") {
          under++;
        }
        if (moment(new Date(), "YYYY/MM/DD").diff(doc.data().userDob, "years" > 20 && doc.data().lastPeriod !== "")) {
          over++;
        }
      }
    })
    setMAgeN(normal)
    setMAgeU(under)
    setMAgeO(over)
    setMAgeT(normal + under + over)
  }

  useEffect(() => {
    if (month !== "" && year_ !== "") {
      fetchdischarge(month, year_.toString())
    }
  }, [month, year_])

  const rows = [
    createData('Births', todGen, 0, 0, todGen),
  ];

  const rows2 = [
    createData2('Births', todGen, 0, 0, todGen),
  ];
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Use '#000000' instead of 'black'
      },
      tableHeaderBackground: '#E9E9E9',
    },
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: 'white',
    color: theme.palette.primary.main,
  }));

  const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.tableHeaderBackground,
    color: '#000000', // Use '#000000' instead of 'black'
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }));


  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '10vh', backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '20%', height: '100%', backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end' }}>
          <h3 style={{ color: 'grey' }}>System Reports</h3>
        </div>
        <div style={{ width: '50%', height: '100%', backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        </div>
        <div style={{ width: '30%', height: '100%', backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <div onClick={() => [handlePrint()]} style={{ width: 120, height: 35, borderRadius: 5, backgroundColor: 'navy', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'white', fontSize: 12 }}>generate report</p>
          </div>
        </div>
      </div>
      <div class="container1" style={{ overflowY: 'scroll', padding: 10 }}>
        <div ref={componentRef} className='container' style={{ width: 800, height: 1000, color: 'black', alignSelf: 'center', padding: 20, fontSize: 14, marginTop: '1vh', borderRadius: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <div style={{ width: '100%', height: 200, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginBottom: 60, fontSize: 18, width: '100%', height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} class="header " align=" center">
              <div className='adminPic' style={{ width: 120, height: 120, borderRadius: 150, marginRight: 10, padding: 10, fontSize: 14, marginTop: '6vh', }} />
            </div>
            <div style={{ marginBottom: 60, fontSize: 20, width: '100%', height: '20%' }} class="header " align=" center">
              <h4>Republic of the Philippines</h4>
              <h4>Province of Camarines Norte</h4>
              <h4>Municipality of Daet</h4>
              <h4>MUNICIPAL HEALTH OFFICE</h4><br></br>
              <h4><strong>RHU 3 - BIRTHING CENTER</strong></h4>
              <h4><strong>Monthly System Report</strong></h4>
            </div>
            <div style={{ marginBottom: 60, fontSize: 18, width: '100%', height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} class="header " align=" center">
              <div className='wew3' style={{ width: 100, height: 100, borderRadius: 150, marginRight: 10, padding: 10, fontSize: 14, marginTop: '6vh', }} />
            </div>
          </div>
          <div style={{ width: '100%', height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start' }}>
            <Box>
              <Typography fontSize={'14px'}>
                <Box component="span" fontWeight={600}>
                  Report Summary: </Box> RHU III Birthing Center - November 2023
              </Typography>
            </Box>
            <br></br>
            <ThemeProvider theme={theme}>

              <Table size="small" aria-label="single table">
                <TableHead>
                  <TableRow>
                    <StyledTableHeaderCell>Birth Outcomes</StyledTableHeaderCell>
                    <StyledTableHeaderCell align="left">Count</StyledTableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Alive
                    </StyledTableCell>
                    <StyledTableCell align="left">{rows[0].alive}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Stillbirth
                    </StyledTableCell>
                    <StyledTableCell align="left">{rows[0].stillbirth}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Miscarriage
                    </StyledTableCell>
                    <StyledTableCell align="left">{rows[0].miscarriage}</StyledTableCell>
                  </StyledTableRow>

                </TableBody>
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ backgroundColor: '#E9E9E9' }} >Birth at Weight</StyledTableCell>
                    <StyledTableCell align="left" style={{ backgroundColor: '#E9E9E9' }}>Count</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Normal
                    </StyledTableCell>
                    <StyledTableCell align="left">{rows[0].alive}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Underweight
                    </StyledTableCell>
                    <StyledTableCell align="left">{rows[0].stillbirth}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Overweight
                    </StyledTableCell>
                    <StyledTableCell align="left">{rows[0].miscarriage}</StyledTableCell>
                  </StyledTableRow>

                </TableBody>
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ backgroundColor: '#E9E9E9' }} >Gender</StyledTableCell>
                    <StyledTableCell align="left" style={{ backgroundColor: '#E9E9E9' }}>Count</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Male
                    </StyledTableCell>
                    <StyledTableCell align="left">{rows[0].alive}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Female
                    </StyledTableCell>
                    <StyledTableCell align="left">{rows[0].stillbirth}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ backgroundColor: '#E9E9E9' }} >Attended By Health Professionals</StyledTableCell>
                    <StyledTableCell align="left" style={{ backgroundColor: '#E9E9E9' }}>Count</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Doctor
                    </StyledTableCell>
                    <StyledTableCell align="left">{rows[0].alive}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Nurse
                    </StyledTableCell>
                    <StyledTableCell align="left">{rows[0].stillbirth}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Midwife
                    </StyledTableCell>
                    <StyledTableCell align="left">{rows[0].miscarriage}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row" style={{ fontWeight: 800, fontSize: '16px', }}>
                      Total Birth
                    </StyledTableCell>
                    <StyledTableCell style={{ fontWeight: 800, fontSize: '16px' }} align="left">{rows[0].total}</StyledTableCell>
                  </StyledTableRow>

                </TableBody>
              </Table>

            </ThemeProvider>

            <Box textAlign={'left'}>
              <Typography fontSize={'14px'}>
                <Box component="span" fontSize={16} fontWeight={600}>
                  Observations: </Box>
                <Box>
                  - <strong>(Number) </strong>recorded births were successfully delivered by Health Professionals.<br />
                  - <strong>(Number)</strong> stillbirths, <strong>(Number) </strong>miscarriages were reported, indicating positive outcomes for the month.<br />
                  - <strong>(Number)</strong> Normal weight, <strong>(number)</strong> Underweight,<strong> (Number)</strong> Overweight<br />
                  - The male-to-female ratio for the month was 2:0 <strong>(number) </strong>.
                </Box>
              </Typography>
            </Box>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'end' }}>
              <div>
                <input
                  type='text'
                  style={{
                    marginTop: 35,
                    width: 200,
                    height: 20,
                    fontWeight: 600,
                    outline: 'none',
                    backgroundColor: 'transparent',
                    textAlign: 'right'
                  }}
                />
                <p style={{ textAlign: 'right' }}>Officer In Charge</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Systemreport