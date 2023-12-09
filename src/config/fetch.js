import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { authentication } from "./firebase";
import { getDocs, onSnapshot, collection, query, orderBy } from "firebase/firestore";


export const fetchClients = async () => {
    const [users, setUsers] = useState([]);
    const userData = [];
    const q = query(collection(database, "userData"))

    useEffect(()=>{

        onSnapshot(q, (docs) => {
            docs.forEach((doc)=>{
                userData.push({id:doc.id, fName:doc.data.userFname, mName:doc.data().userMname, lName:doc.data().userLname, lastPeriod:doc.data().lastPeriod,dob:doc.data().userBirthdate,number:doc.data().userNumber,email:doc.data().userEmail})
            })
            setUsers(userData);
        });

    },[])

    return users
}

export const fetchAppointments = async () => {
    const [appointments, setAppointments] = useState([]);
    const appointment = [];
    const q = query(collection(database, "appointments"))

    


    return appointments
}

export const fetchPersonalAppointments = (id) => {
    const [personalAppointments, setPersonalAppointments] = useState([]);


    return personalAppointments

}












