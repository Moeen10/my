import React from 'react'
import { useState } from 'react'
import './addBus.css'
import { Button, TextField, Container, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PassAmount from './PassAmount'

export default function AddBus() {
    const [half_pass, setHalf_pass] = useState('')

    const half_pass_handleOnChange = (e) => {
        //console.log(e.target.value)
        let val = e.target.value;
        setHalf_pass(val);
    }

    return (
        <div>
            <Container maxWidth="sm" style={{ background: '' }}>
                <h1>Add a New Bus</h1><br />
                <center>
                    <form method='get'>
                        <TextField id="filled-basic" label="Bus Name" variant="filled" name='bus_name' size='medium' fullWidth required />
                        <br /><br />
                        <TextField id="filled-basic" label="Bus Base Fair" variant="filled" name='bus_base_fair' type='number' fullWidth required />
                        <br /><br />
                        <div className='col-6 inputCard'>
                            Select Bus Service<hr />
                            <RadioGroup
                                aria-label="bus_service"
                                defaultValue="Sitting"
                                name="bus_service"
                            >
                                <FormControlLabel value="Sitting" control={<Radio />} label="Sitting" />
                                <FormControlLabel value="Non Sitting" control={<Radio />} label="Non Sitting" />
                            </RadioGroup>
                        </div>

                        <div className='col-6 inputCard'>
                            Select Bus Type<hr />
                            <RadioGroup
                                aria-label="bus_type"
                                defaultValue="AC"
                                name="bus_type"
                            >
                                <FormControlLabel value="AC" control={<Radio />} label="AC" />
                                <FormControlLabel value="Non AC" control={<Radio />} label="Non AC" />
                            </RadioGroup>
                        </div>
                        <div className='col-6 inputCard'>
                            Half/Pass accepted<hr />
                            <RadioGroup
                                aria-label="half_pass"
                                defaultValue="Yes"
                                name="half_pass"
                                onChange={half_pass_handleOnChange}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                        </div>

                        <div className='col-6' style={{ float: 'left', padding: '10px' }}>
                            <PassAmount flag={half_pass} />
                        </div>

                        <div className='col-12 inputCard' style={{ float: 'left' }}>
                            Upload a bus picture<hr />
                            <input className="form-control" type="file" id="formFile" />
                        </div>

                        <div className='col-12' style={{ float: 'left' }}>
                            <br />
                            <Button startIcon={<AddBoxIcon />} size='large' variant='contained' type='submit' fullWidth>ADD BUS</Button>
                        </div>
                        
                    </form>
                </center>
            </Container>
        </div>
    )
}
