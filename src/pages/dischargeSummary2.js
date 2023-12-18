
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

const DischargeSummary = () => {

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
         <div class="center-div" alignItems='center' textAlign='center'>
        <h4 ><strong>DISCHARGE SUMMARY FOR MOTHERS</strong></h4>
        <br />
        </div>

        <table>
          <tr>
            <td colspan="3" className="normal">
              <div>
                <label> NAME : </label>
                <input type="text" id="name" className="long"  style={{ width: '46%' }}  class="centered-input" />
                <label>AGE:</label>
                <input type="number" className="short" class="centered-input"  style={{ width: '11%' }} />
                <label> STATUS : </label>
                <input type="text" id="status" className="medium" style={{ width: '24%' }} class="centered-input"  />
              </div>
              <div>
                <label> ADDRESS : </label>
                <input type="text" id="address" className="verylong" style={{ width: '90%' }} class="centered-input" />
              </div>
              <div>
                <label> DATE ADMITTED : </label>
                <input type="date" id="dateadmitted" className="medium"  style={{ width: '30%' }} class="centered-input"  />
                <label> G: </label>
                <input type="text" id="G" className="short"  style={{ width: '10%' }} class="centered-input" />
                <label>P : </label>
                <input type="text" id="p" className="short"  style={{ width: '10%' }} class="centered-input" />
                <label> BLOOD TYPE: </label>
                <input type="bloodtype" id="dateadmitted" className="medium"  style={{ width: '18%' }} class="centered-input"  />
              </div>
              <div>
                <label> DATE DELIVERED : </label>
                <input type="date" id="datedeliverd" class="centered-input" style={{width:"30%"}}/>
                <label> NSD: </label>
                <input type="text" id="nsd"class="centered-input" style={{ width: '23%' }} />
                <label>BREECH : </label>
                <input type="text" id="breech"  style={{ width: '18%' }}class="centered-input"   />
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
                <input type="text" id="boy" className="short"  class="centered-input" style={{ width: '25%' }} />
                <label className="indented" id="indented">
                  {' '}
                  GIRL:{' '}
                </label>
                <input type="text" id="girl" className="short" class="centered-input" style={{ width: '25%' }}/>
              </div>
              <div  className="short">
                <label className="indented" id="indented">
                  RMLE :{' '}
                </label>
                <input type="text" id="breech" className="short" class="centered-input" style={{ width: '15%' }}/>
                <label className="indented" id="indented">
                  YES :{' '}
                </label>
                <input type="text" id="breech" className="short" class="centered-input" style={{ width: '15%' }} />
                <label className="indented" id="indented">
                  NO :{' '}
                </label>
                <input type="text" id="breech" className="short" class="centered-input" style={{ width: '15%' }}/>
              </div>
              <div  className="short">
                <label className="indented" id="indented">
                  LACERATION :{' '}
                </label>
                <input type="text" id="breech" className="short" class="centered-input" style={{ width: '10%' }}/>
                <label className="indented" id="indented">
                  YES :{' '}
                </label>
                <input type="text" id="breech" className="short" class="centered-input" style={{ width: '14%' }}/>
                <label className="indented" id="indented">
                  NO :{' '}
                </label>
                <input type="text" id="breech" className="short" class="centered-input" style={{ width: '15%' }}/>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ width: '55%' }}>
              <div>
                <label>DATE DISCHARGE : </label>
                <input type="date" id="datedischarge" className="long"class="centered-input"  style={{ width: '40%' }}/>
                <br />
                <br />
                <label>FINAL DIAGNOSIS</label>
                <br />
                <textarea cols="55" rows="5" class='centered-input'></textarea>
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
          <input type="text" id="province" className="long" class="centered-input"  style={{width:'30%'}}/>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default DischargeSummary;
