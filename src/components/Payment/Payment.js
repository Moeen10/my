import React from 'react'
import { Button, TextField, Container, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useHistory, useParams } from 'react-router';

export default function Payment() {
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
    return (
        <div>
            <Container maxWidth="sm" style={{ background: '' }}>
                <h1>পেমেন্ট</h1>
                <form method='get'>
                    <TextField value={name} id="filled-basic" label="Bus Name" variant="filled" name='bus_name' size='medium' fullWidth inputProps={{ readOnly: true, style: { textTransform: "capitalize" }, }} required />
                    <br /><br />
                    <TextField value='anupam.akib@gmail.com' id="filled-basic" label="Passenger Email" variant="filled" name='bus_name' size='medium' fullWidth inputProps={{ readOnly: true, }} required />
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
                    <Button size='large' variant='contained' type='submit' fullWidth>ভাড়া পরিশোধ করুন ও স্লিপ ডাউনলোড করুন</Button>
                    <br /><br />
                </form>
            </Container>
        </div>
    )
}
