import React from 'react';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import rhupic from './rhupic.jpg'
import daetlogo from './daet logo.jpg'
import './dischargeSummary.css';


const theme = createTheme({
    typography: {
      fontSize: 10, // replace with your desired size
    },
    label:{
        fontSize: 12, 
    }
  });

  const PatientHistoryForm = ({ref}) => {

    const containerStyle = {
        fontSize: '12px',
        lineHeight: '1.5',
      };

  return (
    <ThemeProvider theme={theme}>
    <div className="container" ref={ref} style={containerStyle}>
      
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
            <div class="center-div" alignItems='center' textAlign='center' style={{width:'18%'}}>
            <h4 ><strong>PATIENT HISTORY</strong></h4>
            <br />
          <br />
          <br />
        </div>

        <div align="right">
        <label>DATE:</label>
        <input
          type="date"
          id="province"
          className="dual1"
          style={{ border: 'NONE', borderBottom: '1px solid black' }}
        />
      </div>
      <br />
      <br />
      <div>
        <label>HISTORY OF PRESENT CONDITION:</label>
        <input type="text" className="history" id="history" style={{ border: 'none', width:'70%' }} />
      </div>
      <br />
      <div>
        <label>PHYSICAL EXAMINATION (PERTINENT FINDINGS PER SYSTEM):</label>
        <input type="text" className="physical" id="physical" style={{ border: 'none', width:'45%'  }} />
      </div>
      <br />
      <div>
        <label>VITAL SIGNS:</label>
        <input type="text" className="vital" id="vital" style={{ border: 'none' }} />
      </div>
      <br />

      <div>
        <label>BP:</label> <input type="text" className="vitals" id="bp" style={{width:'11%'}}/>
        <label>WT:</label> <input type="text" className="vitals" id="wt" style={{width:'10%'}} />
        <label>RR:</label> <input type="text" className="vitals" id="rr" style={{width:'10%'}}/>
        <label>CR:</label> <input type="text" className="vitals" id="cr" style={{width:'10%'}}/>
        <label>TEMP:</label> <input type="text" className="vitals" id="temp" style={{width:'10%'}}/>
        <label>ABDOMEN:</label> <input type="text" className="vitals" id="abdomen" style={{width:'20%'}} />
        <br />
        <br />
        <label>HEENT:</label> <input type="text" className="longline" id="bp" style={{width:'14%'}}  />
        <label>SKIN EXTREMITIES:</label> <input type="text" className="shortline" id="wt" style={{width:'15%'}}  />
      
        <label>CHEST/LUNGS:</label> <input type="text" className="longline1" id="bp" style={{width:'14%'}} />
        <label>CVS:</label> <input type="text" className="shortline1" id="wt" style={{width:'15%'}} />
   
      </div>
<br/>
      <div>
        <label>OBSTERTRICAL RECORD :</label>
        <br/>
        <textarea
          style={{ border: 'none' }}
          cols="95"
          rows="2"
          id="obsterical"
        ></textarea>
        <br />
        <label>PRESENT PREGNANCY: </label>
        <label style={{ marginLeft: '7%' }}>G</label>
        <input style={{ width: '30px' }} className="preggy" id="g"></input>
        <label>P</label>
        <input style={{ width: '30px', marginRight: '1%'  }} className="preggy" id="p"></input>
        <label>(</label>
        <input className="preggy" id="pregnancy"  style={{ width: '7%',marginRight:'5px' }}></input>,
        <input className="preggy" id="pregnancy2" style={{ width: '7%',marginRight:'5px' }}></input>,
        <input className="preggy" id="pregnancy3" style={{ width: '7%',marginRight:'5px' }}></input> <label>)</label>
        <label style={{ marginLeft: '7%' }}>AOG</label>
        <input
          type="text"
          id="aog"
          style={{ border: 'none', borderBottom: '1px solid black' }}
        />
      </div>
<br/>
      <div>
        <label>LAST MENSTRUAL PERIOD (LMP):</label>
        <input type="text" className="longline" id="lmp" style={{ width: '30%' }}></input>
        <br/>
        <br/>
        <label>EXPECTED DATE OF CONFINEMENT (EDC):</label>
        <input type="text" className="longline" id="edc" style={{ width: '22%' }}></input>
        <br />
      </div>
      <br />
      <div>
        <label>FUNDIC HEIGHT :</label>
        <input type="text" className="dual" id="fundicheight"  style={{ width: '20%' }}></input>
        <label style={{ marginLeft: '2%' }}>FETAL HEART TONES:</label>
        <input type="text" className="dual" id="fetalheart"  style={{ width: '20%' }}></input>
        <br/>
        <br/>
        <label>PRESENTATION :</label>
        <input type="text" className="dual" id="presentation"  style={{ width: '20%' }}></input>
        <label style={{ marginLeft: '2%' }}>IE :</label>
        <input type="text" className="dual" id="ie"  style={{ width: '20%' }}></input>
        <br />
        <br />
        
        <label>EFFACEMENT :</label>
        <input type="text" className="dual" id="effacement"style={{ width: '20%' }}></input>
        <label style={{ marginLeft: '4%' }}>ENGAGEMENT :</label>
        <input type="text" className="dual" id="engagement"style={{ width: '20%' }}></input>
        <br />
        <br />
      </div>

      <div>
        <label>BOW:</label>
        <label>INTACT:</label>
        <input type="text" className="triple" id="intact" style={{ width: '20%' }} />
        <label>BOW:</label>
        <label>RUPTURED:</label>
        <input type="text" className="triple" id="ruptured" style={{ width: '20%' }} />
        <label>BOW:</label>
        <label>OTHERS:</label>
        <input type="text" className="triple" id="others"  style={{ width: '20%' }} />
        <br />
        <br />
        <br />
        

        <label>CLINICAL LABORATORY REPORT:</label>
        <textarea
          cols="95"
          rows="10"
          id="clinicalrep"
        
        ></textarea>


      </div>
    </div>
    </ThemeProvider>
  );
};  

export default PatientHistoryForm;





