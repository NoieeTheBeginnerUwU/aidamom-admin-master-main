import React from 'react';
import Lottie from 'lottie-react';

const NoData = () => {
    let loading = "../../public/animation_lnbum9e8.json";

    return (  
      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <Lottie animationData={require("./Animation - 1701752776433.json")} autoplay={false}/>
      </div>
    )
  }

export default NoData