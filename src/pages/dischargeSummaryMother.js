
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

const DischargeSummaryMother = () => {

    const containerStyle = {
        fontSize: '12px',
        lineHeight: '1.5',
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
         <div class="center-div" alignItems='center' textAlign='center'>
        <h4 ><strong>DISCHARGE SUMMARY FOR MOTHERS</strong></h4>
        <br />
        </div>

        <table>
          <tr>
            <td colspan="2" className="normal">
              <div>
                <label> NAME : </label>
                <input type="text" id="name" className="long"  style={{ width: '45%', marginRight:'10px' }}  class="centered-input" />
                <label>AGE:</label>
                <input type="text" className="short" class="centered-input"  style={{ width: '10%' ,marginRight:'10px'}} />
                <label> STATUS : </label>
                <input type="text" id="status" className="medium" style={{ width: '22%' }} class="centered-input"  />
              </div>
              <div>
                <label> ADDRESS : </label>
                <input type="text" id="address" className="verylong" style={{ width: '89.5%' }} class="centered-input" />
              </div>
              <div>
                <label> DATE ADMITTED : </label>
                <input type="datetime-local" id="dateadmitted" className="medium"  style={{ width: '27%' }} class="centered-input"  />
                <label> G: </label>
                <input type="text" id="G" className="short"  style={{ width: '10%' }} class="centered-input" />
                <label>P : </label>
                <input type="text" id="p" className="short"  style={{ width: '10%' }} class="centered-input" />
                <label> BLOOD TYPE: </label>
                <input type="bloodtype" id="dateadmitted" className="medium"  style={{ width: '18.5%' }} class="centered-input"  />
              </div>
              <div>
                <label> DATE DELIVERED : </label>
                <input type="datetime-local" id="datedeliverd" class="centered-input" style={{width:'30%', marginRight:'20px'}} />
                <label> NSD: </label>
                <input type="text" id="nsd"class="centered-input" style={{width:'10%', marginRight:'20px'}} />
                <label>BREECH : </label>
                <input type="text" id="breech"  style={{ width: '17.5%' }}class="centered-input"   />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div  className="short">
                <label className="indented" id="indented">
                  {' '}
                  BOY :{' '}
                </label>
                <input type="text" id="boy" className="short"  class="centered-input" style={{ width: '10%' }} />
                <label className="indented" id="indented">
                  {' '}
                  GIRL:{' '}
                </label>
                <input type="text" id="girl" className="short" class="centered-input" style={{ width: '10%' }}/>
              </div>
              <div  className="short">
                <label className="indented" id="indented"  style={{ width: '10%' ,marginRight:'55px'}}>
                  RMLE :{' '}
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
                <label className="indented" id="indented"  style={{ width: '10%' ,marginRight:'10px'}}>
                  LACERATION :{' '}
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
            </td>
          </tr>
          <tr>
            <td style={{ width: '55%' }}>
              <div>
                <label>DATE DISCHARGE : </label>
                <input type="date" id="datedischarge" className="long"class="centered-input"  style={{ width: '30%' }}/>
                <br />
                <br />
                <label>FINAL DIAGNOSIS</label>
                <br />
                <textarea cols="55" rows="5"></textarea>
              </div>
            </td>
            <td>
              <div>
                <label>BP : </label>
                <input type="text" id="bp" style={{ width: '199px' }} class="centered-input" />
                <br />
                <label>TEMP :</label>
                <input type="text" id="temp" style={{ width: '184.5px' }} class="centered-input"  />
                <br />
                <label>URINE OUTPUT : </label>
                <input type="text" id="urineoutput" style={{ width: '123px' }} class="centered-input" />
                <br />
                <label>STOOL :</label>
                <input type="text" id="stool" style={{ width: '177.5px' }} class="centered-input" />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              HOME MEDICATIONS
              <br />
              <textarea id="homemedication" cols="90" rows="5" class="centered-input" ></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              REMARKS:
              <br />
              <textarea id="homemedication" cols="90" rows="3" class="centered-input" ></textarea>
              <br />
              <label>FOLLOW-UP CHECK-UP :</label>
              <input type="date"  id="followup" style={{ width: '20%' }} class="centered-input" />
               
              <br />
              <br />
              <label>ATTENDING PHYSICIAN :</label>
              <input type="text" id="attendingphysician" style={{ width: '290px' }} class="centered-input" />
              <label>DELIVERED BY :</label>
              <input type="text" id="deliveredby" style={{ width: '150px' }} class="centered-input"  />
              <br />
              <label>NURSE ON DUTY :</label>
              <input type="text" id="nurseonduty" style={{ width: '84%' }} class="centered-input" />
            </td>
          </tr>
        </table>
        <br />
        <br />
        <br />
        <div align="right">
          <h4 align="right">RECEIVED BY:</h4>
          <br />
          <input type="text" id="province" className="long" class="centered-input"  style={{ width: '30%' }}/>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default DischargeSummaryMother;
