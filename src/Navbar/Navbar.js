import React, { Component } from 'react';
import './Navbar.css'
import { NavLink } from 'react-router-dom';

class Navbar extends Component{
    qbNavbarClickFun=(event) =>{
        var qbNavbarLinks;
        if(event.target.nodeName==="I")
        {
            qbNavbarLinks=event.target.parentElement.parentElement.querySelector(".qb-navbar-links");
        }
        else if(event.target.nodeName==="DIV")
        {
            qbNavbarLinks=event.target.parentElement.querySelector(".qb-navbar-links");
        }

        if(qbNavbarLinks.classList.contains("qb-navbar-links-close"))
        {
            qbNavbarLinks.classList.remove("qb-navbar-links-close");
            qbNavbarLinks.classList.add("qb-navbar-links-open");
        }
        else if(qbNavbarLinks.classList.contains("qb-navbar-links-open"))
        {
            qbNavbarLinks.classList.remove("qb-navbar-links-open");
            qbNavbarLinks.classList.add("qb-navbar-links-close");
        }
    }
    render(){
        return(
            <div className="qb-navbar">
                <div className="qb-navbar-content qbCardShadow">
                    <div className="qb-navbar-logo">
                        Navbar
                    </div>
                    <div className="qb-navbar-button" onClick={ this.qbNavbarClickFun }>
                        <i className="fa fa-bars"></i>
                    </div>
                    <div className="qb-navbar-links qb-navbar-links-close">
                        <NavLink to="#" className="qb-navbar-nav">
                            Home
                        </NavLink>
                        <NavLink to="#" className="qb-navbar-nav">
                            Event Explorer
                        </NavLink>
                        <NavLink to="#" className="qb-navbar-nav">
                            Contact
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar ;