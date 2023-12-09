import React, { useEffect, useState } from 'react';
import { database, authentication } from '../../config/firebase';
import { onSnapshot, query, collection, where, orderBy } from 'firebase/firestore';

const TopNav = () => {
    const [messages, setMessages] = useState([]);
    const [activeUser, setActiveUser] = useState("");
    const [activePic, setActivePic] = useState("");
    const [activeName, setActiveName] = useState("");

    const fetchUsers = async() => {
        
        try{
            const fetchUsers = query(collection(database,"userData"),orderBy("dateMade","desc"));
            onSnapshot(fetchUsers,(snapshot)=>{
                snapshot.forEach((doc)=>{
                    alert(doc.id)
                })
            })
        }catch(e){
            alert(e)
        }
    }

    useEffect(()=>{
        fetchUsers()
    },[])

  return (
    <div style={{width:'100%',height:'6vh',backgroundColor:'white',border:'2px solid lightgrey'}}>

    </div>
  )
}

export default TopNav