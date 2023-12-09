import React from 'react';
import Lottie from 'lottie-react';

const Loggingout = () => {
    let loading = "../../public/animation_lnbum9e8.json";

    return (  
      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <Lottie animationData={require("./animation_lnbum9e8.json")}/>
        <p style={{fontSize:50,color:'grey',fontWeight:700}}>Logging out</p>
      </div>
    )
  }

export default Loggingout