import React from 'react'
import { useState } from 'react'
import './addBus.css'
import { Button, TextField, Container, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PassAmount from './PassAmount'


import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddBus() {
    const [half_pass, setHalf_pass] = useState('')
    const [route, setRoute] = useState([])
    const [msg, setMsg] = useState()
    const [msg_color, setMsg_color] = useState()
    const [open, setOpen] = React.useState(false);
    const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);
    const [btnMsg, setBtnMsg] = useState("বাসটি যুক্ত করুন");

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const half_pass_handleOnChange = (e) => {
        //console.log(e.target.value)
        let val = e.target.value;
        setHalf_pass(val);
    }

    const routeChange = (e) => {
        const route_data = [];
        var lines = e.target.value.split('\n');
        for (var i = 0; i < lines.length; i++) {
            route_data.push(lines[i].split('-'));
        }
        //console.log(route_data[0].length);
        for (let i = 0; i < route_data.length; i++) {
            for (let j = 0; j < route_data[i].length; j++) {
                route_data[i][j] = route_data[i][j].trim();
            }
        }
        setRoute(route_data)
    }
    const add_bus = (e) => {
        setIsSubmitBtnDisabled(true);
        setBtnMsg("অপেক্ষা করুন");
        //console.log("check\n");
        //console.log(e.target.bus_name.value)
        const bus_name = e.target.bus_name.value;
        const bus_base_fair = e.target.bus_base_fair.value;
        const bus_service = e.target.bus_service.value;
        const bus_type = e.target.bus_type.value;
        const half_pass = e.target.half_pass.value;
        let half_pass_amount = 0;
        if (half_pass == "Yes") {
            half_pass_amount = e.target.half_pass_amount.value;
        }
        const bus_image = e.target.bus_image.value;
        /*console.log(bus_name + "\n");
        console.log(bus_base_fair + "\n");
        console.log(bus_service + "\n");
        console.log(bus_type + "\n");
        console.log(half_pass + "\n");
        console.log(half_pass_amount + "\n");
        console.log(bus_image + "\n");
        console.log(route + "\n");*/

        fetch('https://akib-server.herokuapp.com/allBus', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let found = false;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].bus_name == bus_name) {
                        setMsg("এই বাস ইতিমধ্যে সংযুক্ত আছে");
                        setMsg_color("error");
                        handleClick()
                        setIsSubmitBtnDisabled(false);
                        setBtnMsg("বাসটি যুক্ত করুন");
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    const json_data = {
                        "bus_name": bus_name,
                        "bus_base_fair": bus_base_fair,
                        "bus_service": bus_service,
                        "bus_type": bus_type,
                        "half_pass": half_pass,
                        "half_pass_amount": half_pass_amount,
                        "bus_image": bus_image,
                        "route": route
                    }
                    //console.log(JSON.stringify(json_data))


                    fetch('https://akib-server.herokuapp.com/addBus', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(json_data)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            setMsg("বাস সংযুক্তি সম্পন্ন হয়েছে");
                            setMsg_color("success");
                            handleClick()
                            setIsSubmitBtnDisabled(false);
                            setBtnMsg("বাসটি যুক্ত করুন");
                        })
                }
            })

        e.preventDefault();
    }

    return (
        <div>
            <Container maxWidth="sm" style={{ background: '' }}>
                <h1>নতুন বাস যুক্ত করুন</h1><br />
                <center>
                    <form method='get' onSubmit={add_bus}>
                        <TextField id="filled-basic" label="বাসের নাম" variant="filled" name='bus_name' size='medium' fullWidth required />
                        <br /><br />
                        <TextField id="filled-basic" label="বাসের ভিত্তি ভাড়া" variant="filled" name='bus_base_fair' type='number' fullWidth required />
                        <br /><br />
                        <div className='col-6 inputCard'>
                            বাসের সার্ভিস নির্বাচন করুনঃ <hr />
                            <RadioGroup
                                aria-label="bus_service"
                                defaultValue="Sitting"
                                name="bus_service"
                            >
                                <FormControlLabel value="Sitting" control={<Radio />} label="সিটিং " />
                                <FormControlLabel value="Non Sitting" control={<Radio />} label="নন সিটিং " />
                            </RadioGroup>
                        </div>

                        <div className='col-6 inputCard'>
                            বাসের ধরণ নির্বাচন করুনঃ <hr />
                            <RadioGroup
                                aria-label="bus_type"
                                defaultValue="AC"
                                name="bus_type"
                            >
                                <FormControlLabel value="AC" control={<Radio />} label="এসি " />
                                <FormControlLabel value="Non AC" control={<Radio />} label="নন এসি " />
                            </RadioGroup>
                        </div>
                        <div className='col-6 inputCard'>
                            হাফ/পাশ গ্রহণ করা হয়?<hr />
                            <RadioGroup
                                aria-label="half_pass"
                                defaultValue="Yes"
                                name="half_pass"
                                onChange={half_pass_handleOnChange}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="হ্যাঁ" />
                                <FormControlLabel value="No" control={<Radio />} label="না" />
                            </RadioGroup>
                        </div>

                        <div className='col-6' style={{ float: 'left', padding: '10px' }}>
                            <PassAmount flag={half_pass} />
                        </div>


                        <div className='col-12 inputCard' style={{ float: 'left' }}>
                            বাসের রুট: (Use 'hiphen/Enter' to seperate all string and numbers)<br /><p align='left'>Sample: <br /><b>From - To - Distance(KM)<br />Shukrabad - Asad Gate - 1.5<br />Asad Gate - College Gate - 1.2</b></p><hr />
                            <textarea name="route" className="form-control" placeholder="Enter Bus Route" onChange={routeChange} required></textarea>
                        </div>


                        <div className='col-12 inputCard' style={{ float: 'left' }}>
                            বাসের ছবি যুক্ত করুন<hr />
                            <input name='bus_image' className="form-control" type="text" placeholder='http:// Enter Image URL' />
                        </div>

                        <div className='col-12' style={{ float: 'left' }}>
                            <br />
                            <Button startIcon={<AddBoxIcon />} size='large' variant='contained' type='submit' fullWidth disabled={isSubmitBtnDisabled}>{btnMsg}</Button>
                        </div>
                        <div className='col-12' style={{ float: 'left', padding: '20px' }}></div>
                    </form>
                </center>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={msg_color} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    )
}
