import React ,{useEffect, useState}from 'react';
import useAuth from '../../hooks/useAuth';
import MapDirection from '../MapDirection/MapDirection';
import './Profile.css'
const Profile = () => {
    const {user}=useAuth();
    const [userInfo,setUserInfo] = useState([])
    console.log("ami user",user)
    const {email} =user;
   
    useEffect(() => {
        fetch(`https://morning-chamber-73182.herokuapp.com/userInfo/${email}`)
            .then(res => res.json())
            .then(data => {
                setUserInfo(data)
                console.log("asha amount", data)
            })

    }, [email])
    return (
        // <div>
        //     <h1>Name : </h1>
        //     <h4>Email : </h4>
        //     <h6>{user.metadata?.lastSignInTime}</h6>
        //     <h6>{userInfo?.amount}</h6>
        // </div>
 
<div className='div2'>
<aside class="profile-card">
  <header>
    <a target="_blank" href="#">
      <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png" class="hoverZoomLink"/>
    </a>

  
    <h1>
    {user.displayName}
          </h1>

    <h2>
   Email : {email}
          </h2>

  </header>
  <div class="profile-bio">
<h6>    Last Signin Time
</h6>
<p>
{user.metadata?.lastSignInTime}
</p>

<p>Balance : 
{userInfo?.amount}</p>

</div>
<ul class="profile-social-links">
    <li>
      <a target="_blank" href="https://www.facebook.com/creativedonut">
        <i class="fa fa-facebook"></i>
      </a>
    </li>
    <li>
      <a target="_blank" href="https://twitter.com/dropyourbass">
        <i class="fa fa-twitter"></i>
      </a>
    </li>
    <li>
      <a target="_blank" href="https://github.com/vipulsaxena">
        <i class="fa fa-github"></i>
      </a>
    </li>
    <li>
      <a target="_blank" href="https://www.behance.net/vipulsaxena">
       
        <i class="fa fa-behance"></i>
      </a>
    </li>
  </ul>
</aside>
</div>
    );
};

export default Profile;



 

  