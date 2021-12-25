import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
    const  linkStyle= {
        color:" white",
    padding: "10px 20px",
    background: "#6648F0",
    margin: "20px 0",
    display: "inline-block",
    textDecoration: "none",
    }

    return (
        <div >
         <section className="page_404">
	<div className="container">
		<div className="row">	
		<div className="col-sm-12 ">
		<div className="col-sm-10 col-sm-offset-1  text-center">
		<div className="four_zero_four_bg">
			<h1 className="text-center ">404</h1>
		
		
		</div>
		
		<div className="contant_box_404">
		<h3 className="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
		<Link to='/home' style={linkStyle}>
        Go to Home
        </Link>
		
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
        </div>
    );
};

export default NotFound;