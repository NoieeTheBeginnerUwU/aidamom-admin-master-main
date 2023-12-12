
import React from 'react';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import rhupic from './rhupic.jpg'
import daetlogo from './daet logo.jpg'
import './dischargeSummary.css'; // Assuming you have a CSS file named dischargesummary.css


const theme = createTheme({
    typography: {
      fontSize: 10, // replace with your desired size
    },
    label:{
        fontSize: 12, 
    }
  });

const Consent = () => {

    const containerStyle = {
        fontSize: '12px',
        lineHeight: '1.5',
        width: '21cm',
        height: '29.7cm',
        margin: '1cm auto',
        padding: '1cm',
      };

  return (
    <ThemeProvider theme={theme}>
    <div  style={containerStyle}>
      <div className="container1">
      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
      <Box mr={6}><img src={daetlogo} alt="Daet Logo"  width='85px'/></Box>
      <Box className="header" textAlign="center">
        <h4><strong>Republic of the Philippines</strong></h4>
        <h4><strong>Province of Camarines Norte</strong></h4>
        <h4><strong>Municipality of Daet</strong></h4>
        <h4>MUNICIPAL HEALTH OFFICE</h4>
        <h4><strong>RHU 3 - BIRTHING CENTER</strong></h4>
      
        <br/>
      </Box>
      <Box display="flex"  ml={6}><img src={rhupic} alt="RHU logo" width='100px'/></Box>
    </Box>
    <br/>
         <div class="center-div" alignItems='center' textAlign='center' style={{width:'15%'}}>
          <br/>
        <h4 ><strong>CONSENT FORM</strong></h4>
        <br />
          <br />
          <br />
        </div>
        <div align="right">
          <label>DATE:</label>
          <input type="date" id="province" className="dual1"  class="centered-input" style={{width:'30%'}}/>
          <br />
          <br />
          <br />
        </div>
        <div>
          <p style={{ lineHeight: 2 }}>
            Ako si, <input type="text" id="name" style={{ width: '50%' }}  class="centered-input" />,{' '}
            <input type="number" id="age" style={{ width: '5%' }}  class="centered-input" /> taong
            gulang,<input type="text" id="civilstatus" style={{ width: '23%' }} class="centered-input"  />
            <br />
            <i style={{ margin: '20%' }}>(pangalan) </i>{' '}
            <i style={{ marginRight: '18%' }}>(edad)</i>{' '}
            <i>(civil status)</i>
            <br /> <br /> nakatira sa
            <input style={{ width: '55%' }} class="centered-input"  />, ay pinahihintulutan ang nurse,
            midwife o doctor ng Maternal and Child Care Clinic (MCHCC) na gawin
            ang anumang nararapat na paraan ng pagpapaanak sa akin para sa
            ikabubuti ko at ng aking ipapanganak na sanggol.
            <br />
            <br /> Nauunawaan ko na ang panganganak ay seryosong kondisyon at
            walang pananagutan ang Maternity Clinic na ito kung sakaling may
            hindi inaasahang mangyayari sa aking magiging anak.
            <br />
            <br />
            <br />
          </p>
          <p style={{ textAlign: 'center' }}>
            <i>* Ang lahat ng ina ay kinakailangang mag-breastfeeding pagkatapos
              magsilang.</i>
          </p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
          <input
            type="text"
            id="saksi"
            style={{ marginRight: '25%', width: '35%' }}
            class="centered-input" 
          />
          <input type="text" id="kliyente" style={{ width: '35%' }} class="centered-input"  />
          <p>
            <b style={{ margin: '10%', marginRight: '45%' }}>SAKSI</b>{' '}
            <b style={{marginLeft:'10%'}}>KLIYENTE</b>
          </p>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box ml={10}>
           (Pangalan atLagda) 
           </Box>
            <Box mr={11}>
            (Pangalan at Lagda)
            </Box>

          </Box>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};  

export default Consent;





