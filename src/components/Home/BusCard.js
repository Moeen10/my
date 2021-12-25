import { Card, CardActionArea, Typography, CardMedia, CardContent } from '@mui/material';

import React from 'react'

export default function BusCard(props) {
    let name = props.name;
    let image = props.image;
    let route = props.route;
    let fair = props.fair;
    let service = props.service;
    return (
        <div className='col-3' style={{ float: 'left', padding: '10px' }}>
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
                            <b>Route: </b><span className='capitalize'>{route}</span>
                            <br /><b>Base Fair: </b>{fair} Taka,  ({service} Service)
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
