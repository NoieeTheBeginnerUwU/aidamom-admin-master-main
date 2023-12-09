import React from 'react'

const SessionAadded = () => {
    let loading = "../../public/animation_lnbum9e8.json";

    return (  
      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <Lottie animationData={require("./animation_lnbum9e8.json")}/>
        <p style={{fontSize:50,color:'grey',fontWeight:700}}>Session Added Successfuly</p>
      </div>
    )
  }
export default SessionAadded