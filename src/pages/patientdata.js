
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


    const PatientDataForm = () => {

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
            <div class="center-div" alignItems='center' textAlign='center' style={{width:'25%'}}>
            <h4 ><strong>PATIENT DATA FORM</strong></h4>
            <br />
            <br />
           

            </div>

        <div align="right">
            <label>DATE:</label>
            <input  type="date" id="province" className="dual1" />
            <br />
            <br />
        </div>

        <div >
            <label>Name: </label>
            <input type="text" id="lname" style={{width:'21%'}}/>
            <input type="text" id="fname" />
            <input type="text" id="mname" />
            <input type="text" id="suffix" />
        </div>
    <br/>
        <div >
        <label>Religion: </label>
            <input type="text" id="religion" className="religion" style={{width:'32%',marginRight:"15px"}}/>
            <label>Civil Status: </label>
            <input type="text" id="civilstatus" className="short" style={{width:'19%', marginRight:"15px"}}/>
            <label>Age: </label>
            <input type="number" id="age" className="short" style={{width:'10%'}}/>
            <label>Sex: </label>
            <input type="text" id="sex" className="short"style={{width:'10%'}} />
            
            
        </div>
        <br/>
        <div >
            <label>Address: </label>
            <input type="text" id="purok" className="threeLines" style={{width:'31%'}}/>
            <input type="text" id="town" className="threeLines" style={{width:'30.5%'}}/>
            <input type="text" id="province"  className="threeLines"style={{width:'31%'}} />
        </div>
        <br/>
        <div >
            <label>Place of birth: </label>
            <input type="text" id="placeofbirth" className="twoLines"style={{width:'54%'}} />
            <label>Date of Birth: </label>
            <input type="date" id="dateofbirth" className="twoLines"style={{width:'24%'}} />
        </div>
        <br/>
        <div >
            <label>Nationality: </label>
            <input type="text" id="nationality" className="twoLines"style={{width:'56%'}} />
            <label>Occupation: </label>
            <input type="text" id="occupation" className="twoLines" style={{width:'25%'}}/>
        </div>
        
        <br/>
        <div >
            <label>Husband's Full name: </label>
            <input type="text" id="husbandname" className="twoLines1"  style={{width:'48%'}}/>
            <label>Occupation: </label>
            <input type="text" id="occupation" className="twoLines1" style={{width:'25%'}} />
        </div>
        <br/>
        <div >
        <label>Place of Marriage: </label>
            <input type="text" id="placeofmarriage" className="dual1" style={{width:'51%'}}/>
            <label>Date of Marriage: </label>
            <input type="date" id="dateofmarriage" className="dual1" style={{width:'20%'}}/>
        
        </div>
        <br/>
        <div >
            <label>Complete Address: </label>
            <input type="text" id="completeaddress" className="long" style={{width:'50%'}} />
            <label>Salary: </label>
            <input type="number" id="salary" className="twoLines" style={{width:'29%'}} />
        </div>
        <br/>
        <div >
            <label>Father's Full name: </label>
            <input type="text" id="fathername" className="dual" style={{width:'32%'}} />
            <label>Mother's Full Maiden Name: </label>
            <input type="text" id="mothername" className="dual"  style={{width:'30.5%'}}/>
        </div>
        <br/>
        <div >
            <label>Employed by: </label>
            <input type="text" id="employedby" className="twoLines" style={{width:'36%'}} />
            <label>Address Employer: </label>
            <input type="text" id="addressEmployer" className="long" style={{width:'38%'}} />
        
        </div>
        <br/>
        
        <div >
            <label>Name of Barangay Captain: </label>
            <input type="text" id="brgyCaptaim" className="semilong" style={{width:'78%'}} />
        </div>
        <br/>
        <hr />
        <br/>
        <div>
            <label style={{marginRight:"25px"}}>Number of Pregnancy:  </label><label>G</label>
            <input type="number" id="numberofpregnancy" className="short1" style={{width:'7%',marginRight:"10px"}} />
            <label>P </label>
            <input type="text" id="P" className="short1" style={{width:'6%'}} />
            <label style={{marginLeft:"25px"}}>BOW : +</label>
            <input type="checkbox" id="BOW" className="pxmargin" />
            <label>-</label>
            <input type="checkbox" id="negative" className="pxmargin" />
        </div>
        <br/>
        <div >
            <label>Date and Time of Admission: </label>
            <input type="datetime-local" id="dateofmarriage" className="dual1" style={{width:'25%', marginLeft:'2px', marginRight:"25px"}} />
        
        </div>
        <br/>
    
        <div >
            <label>Date of Delivery: </label>
            <input type="datetime-local" id="dateofdelivery" className="dual1" style={{width:'34%', marginLeft:'2px', marginRight:"25px"}} />
        </div>
        <br/>
        <div >
            <label>Date of Discharge: </label>
            <input type="datetime-local" id="dateofdischarge" className="dual1" style={{width:'33%', marginLeft:'2px', marginRight:"25px"}} />
        </div>
        <br/>
        <div >
            <label>Companion on Admission: </label>
            <input type="text" id="companionadmission" className="semishort" style={{width:'38%'}} />
            <label>Relationship: </label>
            <input type="number" id="relationsip" className="semishort" style={{width:'30%'}}/>
        </div>
        <br/>
        <div >
            <label>Address: </label>
            <input type="text" id="purok"  className="threeLines" style={{width:'30%'}} />
            <input type="text" id="town"  className="threeLines"  style={{width:'30%'}}/>
            <input type="text" id="province" className="threeLines" style={{width:'32%'}} />
        </div>

        <br/>
        <br/>
        <br />
        <div align="right">
            <h4>DATA TAKEN BY:</h4>
           
            <br />
            <input type="text" id="province" className="dual1" />
            <br />
            <br />
            <h4>HEALTH PERSONNEL ON DUTY</h4>
        </div>
        </div>
        
        </div>
        </ThemeProvider>



        
    );
    };

    export default PatientDataForm;
