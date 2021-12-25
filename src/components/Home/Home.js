import React from 'react';
import './Home.css';
import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import busdata from './bus_data.json'
import BusCard from './BusCard'
import MapDirection from '../MapDirection/MapDirection';

const Home = () => {
    let all_bus_info = [];
    for (let i = 0; i < busdata.length; i++) {
        all_bus_info.push(<BusCard name={busdata[i].name} image={busdata[i].url} route={busdata[i].route} service={busdata[i].service} fair={busdata[i].baseFair} />);
    }
    let all_location = ['mirpur', 'kallanpur', 'dhanmandi', 'college gate', 'motijhil']
    let all = []
    for (let i = 0; i < all_location.length; i++) {
        all.push(<option value={all_location[i]} />)
    }

    const [go_to, setGo_to] = useState('');
    const [go_from, setGo_from] = useState('');
    const [search_btn_flag, set_search_btn_flag] = useState(true)

    const to_handleChange = (e) => {
        setGo_to(e.target.value);
    }
    const from_handleChange = (e) => {
        setGo_from(e.target.value);
    }

    useEffect(() => {
        let found_to = false, found_from = false;
        for (let i = 0; i < all_location.length; i++) {
            if (all_location[i] === go_to) {
                found_to = true;
            }
        }
        for (let i = 0; i < all_location.length; i++) {
            if (all_location[i] === go_from) {
                found_from = true;
            }
        }
        if (found_from === found_to && found_to === true && go_to !== go_from) {
            set_search_btn_flag(false);
        }
        else {
            set_search_btn_flag(true);
        }
    }, [go_to, go_from])

    return (
        <>
            <div className='search_bus'>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px 0px 20px 0px' }}>
                    <div className='container col-4'>
                        <h1>Welcome to our app</h1>
                        <h3>Search your bus in a fastest & easiest way</h3>
                        <form method='GET'>
                            <div className='input_field'>
                                <TextField
                                    onChange={to_handleChange}
                                    list='route_data'
                                    style={{ background: 'white', opacity: '0.92' }}
                                    id="filled-basic"
                                    label="From"
                                    variant="filled"
                                    name='go_from'
                                    type='text'
                                    fullWidth required
                                    InputProps={{
                                        endAdornment: (
                                            <datalist id="route_data">
                                                {all}
                                            </datalist>

                                        ),
                                        inputProps: {
                                            list: "route_data"
                                        }
                                    }}

                                />

                            </div>
                           

                            <div className='input_field'>
                                <TextField
                                    onChange={from_handleChange}
                                    list='route_data'
                                    style={{ background: 'white', opacity: '0.92' }}
                                    id="filled-basic"
                                    label="To"
                                    variant="filled"
                                    name='go_to'
                                    type='text'
                                    fullWidth required
                                    InputProps={{
                                        endAdornment: (
                                            <datalist id="route_data">
                                                {all}
                                            </datalist>
                                        ),
                                        inputProps: {
                                            list: "route_data"
                                        }
                                    }}
                                />
                            </div>
                            
                            <div style={{ padding: '10px' }}>
                                <Button disabled={search_btn_flag} size='large' variant='contained' type='submit' fullWidth>Search bus for this route</Button>
                            </div>
                        </form>
                        <div >
                                    <MapDirection></MapDirection>
                </div>
                    </div>
                </div >
            </div>
            <br />
            
            <div>
            <h1>All Buses</h1><br />
            <div className='container'>
                {all_bus_info}

            </div>
            </div>

          
         
           
         
        </>
    );
};

export default Home;

