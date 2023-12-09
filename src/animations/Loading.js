import React from 'react';
import Lottie from 'lottie-react';

const Loading = () => {

  let loading = "../../public/Animation - 1699000257149.json";

  return (  
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <Lottie animationData={require("./Animation - 1699000257149.json")}/>
      <p style={{fontSize:50,color:'grey',fontWeight:700}}>loading</p>
    </div>
  )
}

export default Loading