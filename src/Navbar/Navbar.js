import React, { Component } from 'react';
import './Navbar.css'
import { NavLink } from 'react-router-dom';

class Navbar extends Component{
    constructor(){
        super();
        this.qbNavbarRef=React.createRef();
    }
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

    qbNavbarLinkClickFun=() =>{
        this.qbNavbarRef.current.querySelector(".qb-navbar-button").click();
    }
    render(){
        return(
            <div className="qb-navbar" ref={this.qbNavbarRef}>
                <div className="qb-navbar-content qbCardShadow">
                    <div className="qb-navbar-logo">
                        Navbar
                    </div>
                    <div className="qb-navbar-button" onClick={ this.qbNavbarClickFun }>
                        <i className="fa fa-bars"></i>
                    </div>
                    <div className="qb-navbar-links qb-navbar-links-close">
                        <NavLink to="#" className="qb-navbar-nav" onClick={this.qbNavbarLinkClickFun}>
                            Home
                        </NavLink>
                        <NavLink to="../" className="qb-navbar-nav" onClick={this.qbNavbarLinkClickFun}>
                            Event Explorer
                        </NavLink>
                        <NavLink to="../ECellCadets" className="qb-navbar-nav" onClick={this.qbNavbarLinkClickFun}>
                            E-Cell Cadets
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