import React ,{useEffect, useState}from 'react';
import useAuth from '../../hooks/useAuth';
import MapDirection from '../MapDirection/MapDirection';

const Profile = () => {
    const {user}=useAuth();
    const [userInfo,setUserInfo] = useState([])
    console.log("ami user",user)
    const {email} =user;
   
    useEffect(() => {
        fetch(`http://localhost:5000/user/${email}`)
            .then(res => res.json())
            .then(data => {
                setUserInfo(data)
                console.log(data)
            })

    }, [])
    return (
        <div>
            <h1>Name : {user.displayName}</h1>
            <h4>Email : {email}</h4>
            <h6>{user.metadata?.lastSignInTime}</h6>
            <h6>{userInfo?.amount}</h6>
        </div>
    );
};

export default Profile;