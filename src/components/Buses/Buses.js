import React, { useEffect,useState} from 'react';

import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Container } from 'react-bootstrap';
import Bus from '../Bus/Bus';

const Buses = () => {
    const [service,setService] = useState([])
    useEffect(()=>{
fetch("https://akib-server.herokuapp.com/allBus")
.then(res => res.json())
.then(data => setService(data))
    },[])




    return (
        <div>
         
<Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography sx={{ fontWeight: 500, m: 2, color: 'success.main' }} variant="h6" component="div">
                    All SERVICES
                </Typography>
                <Typography sx={{ fontWeight: 600, m: 5 }} variant="h4" component="div">
                    All Bus Information
                </Typography>
                {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}> */}
              
{
    service.map(service => <Bus
        key={service.bus_name}
        service={service}
    ></Bus>)
} 

                    
                {/* </Grid> */}
                   


            </Container>
        </Box>

        </div>
    );
};

export default Buses;