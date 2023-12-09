import React, { useState, useEffect, useRef } from 'react';
import { authentication } from '../config/firebase';
import { database } from '../config/firebase';
import moment from 'moment';

const Profile = () => {

  function logout() {
    authentication
      .signOut()
      .then(function () {
        // Sign-out successful.
        alert("logging out");
        setIsSignedIn(false);
        setUser("");
      })
      .catch(function (error) {
        setTimeout(alert(error),3000)
      })
  }


  return (
    <div style={{width:'100%',height:'100vh',display:'flex',flexDirection:'column',backgroundColor:'white',alignItems:'start',justifyContent:'start'}}>
      <div style={{width:'100%',height:'100%',backgroundColor:'navy',display:'flex',background: "linear-gradient(45deg, rgba(10,4,110,1) 0%, rgba(0,0,185,1) 35%, rgba(2,182,218,1) 100%)",flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div onClick={()=> logout()} style={{width:200,height:50,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',borderRadius:100,backgroundColor:'black',color:"white",fontSize:30}}>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default Profile