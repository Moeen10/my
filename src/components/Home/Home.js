import React from 'react';
import './Home.css';
import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import Buses from '../Buses/Buses.js'
import BusCard from './BusCard'
import MapDirection from '../MapDirection/MapDirection';

const Home = () => {
    const [bus_data, set_bus_data] = useState([
        {
            "_id": "",
            "bus_name": "",
            "bus_base_fair": "",
            "bus_service": "",
            "bus_type": "",
            "half_pass": "",
            "half_pass_amount": "",
            "bus_image": "",
            "route": [[]]
        }
    ]);
    const [from_where, setfrom_where] = useState("");
    const [to_where, setto_where] = useState("");

    let all_location = new Set([]);
    let arr = [[]]


    useEffect(() => {
        fetch('https://akib-server.herokuapp.com/allBus', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                set_bus_data(data);
                //setLoading(false)
            })

    }, []);
    for (let i = 0; i < bus_data.length; i++) {
        arr = bus_data[i].route;
        for (let j = 0; j < arr.length; j++) {
            all_location.add(arr[j][0]);
            all_location.add(arr[j][1]);
        }
    }
    //console.log(all_location)
    all_location = Array.from(all_location)
    all_location.sort();


    //const [all, setAll] = useState([]);
    let all = [];
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


    const search_bus = (e) => {
        setfrom_where(go_from);
        setto_where(go_to);
        e.preventDefault();
    }

    return (
        <>
            <div className='search_bus'>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px 0px 20px 0px' }}>
                    <div className='container col-4'>
                        <h1>Welcome to our app</h1>
                        <h3>Search your bus in a fastest & easiest way</h3>
                        <form method='GET' onSubmit={search_bus}>
                            <div className='input_field'>
                                <TextField
                                    onChange={from_handleChange}
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
                                    onChange={to_handleChange}
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
                        <MapDirection></MapDirection>
                    </div>
                </div >
            </div>
            <br />
            <Buses from={from_where} to={to_where} />
        </>
    );
};

export default Home;