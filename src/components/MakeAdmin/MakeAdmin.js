import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const MakeAdmin = () => {
    const history = useHistory();


    const [email, setEmail] = useState('')


    const handleEmail = (e) => {
        setEmail(e.target.value);
    }


    const handleMakeAdmin = (e) => {

        const user = { email }
        console.log(user);
        fetch('http://localhost:5000/makeAdmin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })


        e.preventDefault();
        alert(`This ( ${email} ) is admin now`);

        history.push('/')

        
       
    }


    return (
        <div className="p-5">
            <h2>Make Admin</h2>


            <form onSubmit={handleMakeAdmin}>

                <input onBlur={handleEmail} className="p-3 border-3 mt-4 mb-3" type="email" placeholder="New Admin Email" />
                <br />

                <Button type="submit">Make Admin Now</Button>
            </form>

        </div>
    );
};

export default MakeAdmin;