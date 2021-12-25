import React from 'react';
import {  Container, Nav, Navbar } from 'react-bootstrap';

// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import logo from '../../../images/bag.svg'

import { Link } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';
import './nav.css'


const Navigation = () => {
    const { user, logOut,admin } = useAuth();
    console.log("admin aso ni",admin)
    
    return (
        <>
            <Navbar bg="primary" variant="dark" sticky="top" collapseOnSelect expand="lg" >
                <Container>
                    {/* <Link to="/" className="navbar-brand text-white"><img width="70px" src={logo} alt="" /></Link> */}
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link as={Link} to="/" className="color">Home</Nav.Link>
                        <Nav.Link as={Link} to="/bus" className="color">Buses</Nav.Link>

                        {/* <Nav.Link as={Link} to="/about" className="color">About</Nav.Link> */}

                        
        {admin?
<>
<Nav.Link as={Link} to="/admin/addBus" className="color">Add Bus</Nav.Link>
<Nav.Link as={Link} to="/makeAdmin" className="color">Add Admin</Nav.Link>

</>     
        :
        <></>
        }
                        
                      
                        {user?.email ?
                            <>
                          

                          <Nav.Link as={Link} to="/profile" className="color">Profile</Nav.Link>

                                {/* <div><Nav.Link as={Link} to="/dashboard" className="color">Dashboard</Nav.Link></div> */}
                                <div><Nav.Link onClick={logOut} variant="light" className="color">Logout</Nav.Link> </div>

                            </>
                            
                            :
                            
                            <Nav.Link as={Link} to="/login" className="color">Login</Nav.Link>}




                    {user.email?
                            <Navbar.Text>
                            Signed in as: {user.displayName}

                            </Navbar.Text>
                            
                            :
                            
                            <Navbar.Text>
                            Signed in as: NoUser

                            </Navbar.Text>}

                        

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );
};

export default Navigation;














// import React from 'react';
// import { Button, Container, Nav, Navbar } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import './Header.css'
// import logo from '../../../images/logo.png'
// import useAuth from '../../../hooks/useAuth';

// const Header = () => {

//     const { user, logOut } = useAuth();

//     return (
//         <div >
//             <Navbar collapseOnSelect expand="lg" id="navbar" style={{ textAlign: 'center' }}>
//                 <Container>
//                     <Link to="/" className="navbar-brand text-white"><img width="70px" src={logo} alt="" /></Link>

//                     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//                     <Navbar.Collapse id="responsive-navbar-nav">
//                         <Nav className="me-auto">



//                             <Link to="/home" className=" nav-link">Home</Link>
//                             <Link to="/ourWatches" className=" nav-link">All Watches</Link>
//                             <Link to="/about" className=" nav-link">About Us</Link>

//                             {/* <Link to="/packages" className=" nav-link">Packages</Link>
//                             <Link to="/manageOrders" className=" nav-link">Manage Orders</Link>
//                             <Link to="/addPackage" className=" nav-link">Add New Package</Link>
//                             <Link to="/about" className=" nav-link">About</Link> */}






//                         </Nav>



//                         <Nav>


//                             {/* 
//                             <DropdownButton className="mx-1 my-1" id="dropdown-basic-button" title="See More">

//                             </DropdownButton> */}

//                             {user?.email ?

//                                 <div className='d-flex align-items-center' >
//                                     <div className="me-3">   <h5 style={{ display: 'inline-block', color: 'white' }}>  {user.displayName}</h5>

//                                     </div>
//                                     <Link to='/dashboard'>   <Button className="btn btn-success text-white header-btn"> Dashboard </Button></Link>
//                                     <Button onClick={logOut} className="text-white logout-btn header-btn mt-1 ms-2 ">Logout <i className="fas fa-sign-in-alt"></i> </Button>
//                                 </div>

//                                 :
//                                 <Link to="/login" className="nav-link">
//                                     <Button className="text-white header-btn">Login <i className="fas fa-user-plus"></i> </Button>
//                                 </Link>}





//                         </Nav>


//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//         </div >
//     );
// };

// export default Header;