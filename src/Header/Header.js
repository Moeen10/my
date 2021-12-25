

import React from 'react';
import {  Container, Nav, Navbar } from 'react-bootstrap';



import { Link } from 'react-router-dom';
// import './nav.css'
import { Button } from 'react-bootstrap';


const Header = () => {
    
    return (
        <>
            <Navbar bg="primary" variant="dark" sticky="top" collapseOnSelect expand="lg" >
                <Container>
                    <Link to="/" className="navbar-brand text-white"><img width="70px"  alt="" /></Link>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Link to="/home"><Button variant="primary">Home</Button>{' '}</Link>
               <Link to="/bus"><Button variant="primary">Buses</Button>{' '}</Link>
              <Link to="/profile"><Button variant="primary">Profile</Button>{' '}</Link>
              <Link to="/admin/addBus"><Button variant="primary">Add Bus</Button>{' '}</Link>
               <Link to="/login"><Button variant="primary">Login</Button>{' '}</Link>
    
                        



                        
                            <>
                                <div><Nav.Link as={Link} to="/dashboard" className="color">Dashboard</Nav.Link></div>
                                <div><Nav.Link variant="light" className="color">Logout</Nav.Link> </div>

                            </>
                            
                            :
                            
                            <Nav.Link as={Link} to="/login" className="color">Login</Nav.Link>




                
                            <Navbar.Text>
                      

                            </Navbar.Text>
                            
                            :
                            
                            <Navbar.Text>
                            Signed in as: NoUser

                            </Navbar.Text>

                        

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );
};

export default Header;
