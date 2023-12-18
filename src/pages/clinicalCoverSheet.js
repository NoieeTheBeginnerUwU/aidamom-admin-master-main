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

  const ClinicalCoverSheet = () => {

    const containerStyle = {
        fontSize: '12px',
        lineHeight: '1',
        width:'100%',
        height:'100%'
      };

  return (
    <ThemeProvider theme={theme}>
    <div className="container" style={containerStyle}>
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
         <div class="center-div" alignItems='center' textAlign='center' style={{width:'25%'}}>
        <h4 ><strong>CLINICAL COVER SHEET</strong></h4>
        <br />
          <br />
          
        </div>
       <div>
          <label>MCHCC NO.:</label>
          <input type="text" id="province" className="dual1" style={{width:'30%', textAlign:"left"}}  />
          <br />
          <br />
          <br />
        </div>
        <form>
          <table style={{border:'1px solid black', borderCollapse:'collapse'}}>
            <tbody>
              <tr>
                <td colSpan="2" rowSpan="4">
                  <label>NAME:</label><br/>
                  <input type="text" id="fullname" className="name" style={{width:'100%'}}/>
                
                  <br />
                 <br/>
                  <label>ADDRESS:</label>
                  <input type="text" id="Purok" style={{width:'100%'}}/>
                  <input type="text" id="barangay" style={{width:'100%'}}/>
                  <input type="text" id="municipality"  style={{width:'100%'}} />
                  <br />
                  <br></br>
                 
                  <label>NEAREST RELATIVE/ ADDRESS:</label>
                  <br />
                  <input type="text" id="address" className="long" style={{width:'100%'}} />
                  
                </td>
                <td className="short">AGE: <input type="number" id="age" className="short"style={{width:'100%'}} /> </td>
                <td className="short">SEX: <input type="text" id="sex" className="short" style={{width:'100%'}}/> </td>
                <td className="noborder">CIVIL STATUS: <input type="text" id="civilstatus" className="short" style={{width:'100%'}} /> </td>
              </tr>
              <tr>
        <td colSpan="2">DATE OF BIRTH:  <input type="datetime-local" id="dateofbirth" style={{width:'100%'}}/> </td>
        <td className="noborder" colSpan="2">PREVIOUS ADMISSION: <input type="date" id="dateofbirth"style={{width:'100%'}} /> </td>
      </tr>

      <tr>
        <td colSpan="2">PLACE OF BIRTH:  <input type="text" id="placeofbirth"style={{width:'100%'}} /> </td>
        <td className="noborder" colSpan="2">CLASSIFICATION: <input type="text" id="classification" style={{width:'100%'}} /> </td>
      </tr>

      <tr>
        <td colSpan="2">OCCUPATION:  <input type="text" id="occupation"  style={{width:'100%'}}/></td>
        <td className="noborder" colSpan="2">NO. OF DAYS STAYED: <input type="number" id="numberofdays"  style={{width:'100%'}}/> </td>
      </tr>

      <tr>
        <td colSpan="1">DATE ADMITTED: <input type="datetime-local" id="dateadmitted" style={{width:'100%'}}/></td>
        <td className="noborder" colSpan="4">DATE OF DISCHARGE: <input type="datetime-local" id="datedischarge" style={{width:'100%'}}/> </td>
      </tr>

      <tr>
        <td className="noborder" colSpan="6">ADMITTING PERSONNEL: <input type="text" id="admittingpersonnel" style={{width:'100%'}} /> </td>
      </tr>

      <tr>
        <td className="noborder" colSpan="6">
          <label htmlFor="complaint">CHIEF COMPLAINT:<br /></label>
          <textarea rows="3" cols="90" id="complaint"></textarea><br />
          ADMITTING DIAGNOSIS:<br />
          <textarea rows="3" cols="90" id="admittingdiagnosis"></textarea><br />
          FINAL DIAGNOSIS: <br />
          <textarea rows="3" cols="90" id="finaldiagnosis"></textarea><br />
        </td>
      </tr>

      <tr>
        <td className="norightandbotborder" colSpan="6">REFERRED TO: <input type="text" id="referredto" style={{width:'80%'}} /></td>
      </tr>

            </tbody>
          </table>
        </form>
        <div align="left">
        <br />
          <br />
          <input type="text" id="province" className="medium"  style={{width:'40%'}}/>
          <h4>HEALTH PERSONNEL ON DUTY/DESIGNATION</h4>
        </div>
        <div className="right" align="right">
        <br />
          <h4>APPROVED:</h4>
          <input type="text" id="province" className="medium" style={{width:'30%'}} />
          
         
          <h4>RURAL HEALTH PHYSICIAN</h4>
        </div>
  
      </div>
    </div>
    </ThemeProvider>
  );
};  

export default ClinicalCoverSheet;





