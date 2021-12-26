import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Single from './Single/Single';

const Record = () => {
    const {user}=useAuth()
    const {email}=user;
   const [userRecord,setUserRecord]= useState([])
    useEffect(()=>{
        fetch(`https://morning-chamber-73182.herokuapp.com/myRecord/${email}`)
        .then(res => res.json())
        .then(data => {
            setUserRecord(data)
            // console.log("asha amount", data)
        })

}, [email])
console.log("asha amount", userRecord)

    return (
        <div>
          <h1> <b>All Records</b> </h1>
            {
                userRecord.map((record)=>(
                
                <Single all={record}></Single>))
            }
        </div>
    );
};

export default Record;