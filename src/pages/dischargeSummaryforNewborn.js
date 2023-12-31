
import React from 'react';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import rhupic from './rhupic.jpg'
import daetlogo from './daet logo.jpg'
import {InputAdornment} from '@mui/material';
import './dischargeSummary.css'; // Assuming you have a CSS file named dischargesummary.css
import moment from 'moment';

const theme = createTheme({
    typography: {
      fontSize: 10, // replace with your desired size
    },
    label:{
        fontSize: 12, 
    }
  });

const DischargeSummaryNewborn = ({discharge, selectedRow}) => {

    const containerStyle = {
        fontSize: '12px',
        lineHeight: '1.5',
        width: '21cm',
        height: '29.7cm',
        margin: '1cm auto',
        padding: '1cm',
      
      };

  console.log(discharge)
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
         <div class="center-div" alignItems='center' textAlign='center'>
        <h4 ><strong>DISCHARGE SUMMARY FOR NEWBORN</strong></h4>
        <br />
        </div>

        <table>
          <tr>
            <td colspan="2" className="normal">
              <div>
                <label> NAME : </label>
                <input type="text" id="name" className="long" value={discharge.childFname+ " "+discharge.childMname[0]+", "+discharge.childLname}  style={{ width: '45%', marginRight:'10px'}}  class="centered-input" />
                <label>AGE:</label>
                <input type="text" className="short" value={moment(new Date()).diff(moment(discharge.childDob),"days")+ " day/s"} class="centered-input"  style={{ width: '10%', marginRight:'10px' }} endAdornment={<InputAdornment position="end">kg</InputAdornment>} />
                <label> WEIGHT : </label>
                <input type="text" id="status" value={discharge.childWeight+ " kg"} className="medium" style={{ width: '22%' }} class="centered-input"  />
              </div>
              <div>
                <label> ADDRESS : </label>
                <input type="text" id="address" value={selectedRow.userBarangay+", "+selectedRow.userTown+", "+selectedRow.userProvince} className="verylong" style={{ width: '89.5%' }} class="centered-input" />
              </div>
              <div>
                <label> DATE ADMITTED : </label>
                <input type="datetime-local" id="dateadmitted" value={discharge.dateAdmitted} className="medium"  style={{ width: '30%', marginRight:'10px' }} class="centered-input"  />
                <label> DATE DISCHARGE : </label>
                <input type="datetime-local" id="dateadmitted" value={discharge.dateOfDischarge} className="medium"  style={{ width: '30%', marginRight:'10px' }} class="centered-input"  />
              </div>
              <div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
            
              <div  className="short">
                <label className="indented" id="indented" style={{ width: '30%', marginRight:'10%' }}>
                  URINE OUTPUT :{' '}
                </label>
                <input type="checkbox" id="yes" className="short" class="centered-input"  />
                <label className="indented" id="indented">
                  YES :{' '}
                </label>
                
                <input type="checkbox" id="no" className="short" class="centered-input" />
                <label className="indented" id="indented">
                  NO :{' '}
                </label>
               
              </div>
              <div  className="short">
                <label className="indented" id="indented" style={{ width: '30%', marginRight:'120px' }}>
                  STOOL :{' '}
                </label>
                <input type="checkbox" id="yes" className="short" class="centered-input" />
                <label className="indented" id="indented">
                  YES :{' '}
                </label>
                <input type="checkbox" id="no" className="short" class="centered-input" />
                <label className="indented" id="indented">
                  NO :{' '}
                </label>
                
              
              </div>
              <div  className="short">
                <label className="indented" id="indented" style={{ width: '30%', marginRight:'135px' }}>
                  BCG :{' '}
                </label>
                <input type="checkbox" id="yes" className="short" class="centered-input" />
                <label className="indented" id="indented">
                  YES :{' '}
                </label>
                <input type="checkbox" id="no" className="short" class="centered-input" />
                <label className="indented" id="indented">
                  NO :{' '}
                </label>
                <input type="date" id="bcg" className="short" value={discharge.bcgDate} class="centered-input" style={{ width: '30%'}} />
              
              </div>
              <div  className="short">
                <label className="indented" id="indented" style={{ width: '30%', marginRight:'120px' }}>
                  HEPA B :{' '}
                </label>
                <input type="checkbox" id="yes" className="short" class="centered-input" />
                <label className="indented" id="indented">
                  YES :{' '}
                </label>
                <input type="checkbox" id="no" className="short" class="centered-input" />
                <label className="indented" id="indented">
                  NO :{' '}
                </label>
                <input type="date" id="hepaB" className="short" value={discharge.hepaBDate} class="centered-input" style={{ width: '30%'}} />
              
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ width: '55%' }}>
              <div>
                <label>DATE DISCHARGE : </label>
                <input type="date" id="datedischarge" value={discharge.dateOfDischarge} className="long"class="centered-input"  style={{ width: '30%' }}/>
                <br />
                <br />
                <label>FINAL DIAGNOSIS</label>
                <br />
                <textarea value={discharge.finalDiagnosis} cols="90" rows="5"></textarea>
              </div>
            </td>
       
          </tr>
          <tr>
            <td colspan="2">
              HOME MEDICATIONS
              <br />
              <textarea id="homemedication" value={discharge.homeMedication} cols="90" rows="5" class="centered-input" ></textarea>
            </td>
          </tr>
          <label style={{fontWeight:'600'}}>HEALTH TEACHINGS:</label><br/>
          <label style={{fontWeight:'600', marginLeft:'20px'}}>1. CONTINUE BREASTFEEDING</label><br/>
          <label style={{fontWeight:'600', marginLeft:'20px'}}>2. DAILY BATH WITH LUKEWARM WATER AND MILD BATH SOAP</label><br/>
          <label style={{fontWeight:'600', marginLeft:'20px'}}>3. DAILY SUNLIGHT BETWEEN 7-8 AM</label>
          <tr>
            <td colspan="2">
              REMARKS:
              <br />
              <textarea id="homemedication" cols="90" rows="3" class="centered-input" ></textarea>
              <br />
              <label>FOLLOW-UP CHECK-UP :</label>
              <input type="date"  id="followup" value={discharge.followUpCheckup} style={{ width: '20%' }} class="centered-input" />
               
              <br />
              <br />
              <label>ATTENDING PHYSICIAN :</label>
              <input type="text" id="attendingphysician" value={discharge.attendingPhysician} style={{ width: '290px' }} class="centered-input" />
              <label>DELIVERED BY :</label>
              <input type="text" id="deliveredby" value={discharge.deliveredBy} style={{ width: '150px' }} class="centered-input"  />
              <br />
              <label>NURSE ON DUTY :</label>
              <input type="text" id="nurseonduty" value={discharge.nurseOnDuty} style={{ width: '84%' }} class="centered-input" />
            </td>
          </tr>
        </table>
        <br />
       
        <div align="right">
          <h4 align="right">RECEIVED BY:</h4>
          <br />
          <input type="text" id="province" value={discharge.receivedBy} className="long" class="centered-input" style={{ width: '30%' }}/>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default DischargeSummaryNewborn;
