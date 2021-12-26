import { useState,useEffect } from 'react';

import { Button, TextField, Container, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useHistory, useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';

export default function Payment() {
    const { user } = useAuth()
    const {email} =user;
    const { id } = useParams();
    let name = localStorage.getItem(id + "name");
    let path = localStorage.getItem(id + "path");
    path = path.split(",");
    let km = localStorage.getItem(id + "km");
    console.log(id)
    let payment_amount = Math.ceil(km * 2.05);
    let payment_amount_str = "";
    if (payment_amount < 10) {
        payment_amount = 10;
        payment_amount_str += "(Min Fair)"
    }
const place =path[0] + " - " + path[path.length - 1]

    const [money, setMoney] = useState([]);
    // const [password, setPassword] = useState('');
    useEffect(() => {
        fetch(`http://localhost:5000/userInfo/${email}`)
            .then(res => res.json())
            .then(data => {
                setMoney(data)
                // console.log("asha amount", data)
            })

    }, [email])
   
    const handlePayment = (e) => {
        const paymentInfo = { email: user.email, amount: payment_amount,bus: name ,place: place}
        
        // const amount = {amount:500}
        fetch('http://localhost:5000/paymentRecord', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(paymentInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log("payment ear data",data);
            })

          
            const total= money.amount-payment_amount
         
                // console.log(total);

            const amount = { email: user.email, amount: total }


            fetch('http://localhost:5000/updateAmount', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(amount)
        })

alert("Add amount Successfully")
        e.preventDefault();
    }

    return (
        <div>
            <Container maxWidth="sm" style={{ background: '' }}>
                <h1>পেমেন্ট</h1>
                <form method='get' onSubmit={handlePayment}>
                    <TextField value={name} id="filled-basic" label="Bus Name" variant="filled" name='bus_name' size='medium' fullWidth inputProps={{ readOnly: true, style: { textTransform: "capitalize" }, }} required />
                    <br /><br />
                    <TextField value={user.email} id="filled-basic" label="Passenger Email" variant="filled" name='bus_name' size='medium' fullWidth inputProps={{ readOnly: true, }} required />
                    <br /><br />
                    <TextField id="filled-basic" label="Route (From - To)" value={path[0] + " - " + path[path.length - 1]} variant="filled" name='bus_base_fair' type='text' fullWidth inputProps={{ readOnly: true, }} />
                    <br /><br />
                    <TextField id="filled-basic" label="Distance" value={km + " Kilometers"} variant="filled" name='bus_base_fair' type='text' fullWidth inputProps={{ readOnly: true, }} />
                    <br /><br />
                    <div style={{ width: '100%', backgroundColor: 'whitesmoke', padding: '15px' }}>
                        Each Kilometer Fair: 2.05 Taka<br /><br />
                        <h3>Total Payable:</h3>
                        <font color='green' size='7'>৳ {payment_amount}</font> {payment_amount_str}
                    </div><br />
                    <Button size='large'  variant='contained' type='submit' fullWidth>ভাড়া পরিশোধ করুন ও স্লিপ ডাউনলোড করুন</Button>
                    <br /><br />
                </form>
            </Container>
        </div>
    )
}
