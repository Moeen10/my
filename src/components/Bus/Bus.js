import React,{useState} from 'react';
import { Card } from 'react-bootstrap';
import {  CardContent, CardMedia, Grid, Typography } from '@mui/material';
// import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom';

const Bus = (props) => {
    const [path,setPath] =useState([])
    const{bus_name,bus_base_fair,bus_service,bus_type,half_pass,half_pass_amount,bus_image} = props.service
// setPath(props.service.route)

    return (
        <div>


<Card>
    <Card.Img variant="top" src={bus_image} style=
    {{ width: "100%",
  height: "450px",
  objectFit: "cover"}}/>
    <Card.Body>
    <CardContent>
                <Typography variant="h5" component="div">
                   Name: <b>{bus_name}</b>
                </Typography>
                <br />
                <Typography variant="h6" component="div" style={{color : '#5c6bc0'}}>
                  Base Fair: {bus_base_fair}
                </Typography>
                <br />
                <Typography  variant="body2" color="text.secondary">
                    Bus Service : {bus_service} 
                </Typography>
                <br />
                <Typography  variant="body2" color="text.secondary">
                    Bus Type : {bus_type} 
                </Typography>
                <br />
                <Typography  variant="body2" color="text.secondary">
                    Half Pass : {half_pass} 
                </Typography>
                <br />
                <Typography  variant="body2" color="text.secondary">
                    Half Pass Amount : {half_pass_amount} 
                </Typography>
                <br />

            </CardContent>
    </Card.Body>
  </Card>
  <br />
  
            
            
        </div>
    );
};

export default Bus;