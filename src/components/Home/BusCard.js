import { Card, CardActionArea, Typography, CardMedia, CardContent } from '@mui/material';

import React from 'react'

export default function BusCard(props) {
    let name = props.name;
    let image = props.image;
    if (!image) {
        image = "bus_images/default.jpg"
    }
    let route = props.route;
    let n = route.length;
    let start = route[0][0];
    let end = route[n - 1][1];
    let i = 1;
    if (!end) {
        while (!end) {
            end = route[n - i][1];
            i++;
        }
    }
    let fair = props.fair;
    let service = props.service;
    return (
        <div className='col-3' style={{ float: 'left', padding: '20px' }}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt={name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <span className='capitalize'>{name}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>Route: </b><span className='capitalize'>{start} - {end}</span>
                            <br /><b>Base Fair: </b>{fair} Taka,  ({service} Service)
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
