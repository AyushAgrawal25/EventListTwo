import React, { Component } from 'react';
import './ECellCadets.css';
import Axios from 'axios';

class ECellCadets extends Component{
    constructor(){
        super();
        Axios.get('https://ecell.nitrr.ac.in/events/cadets/').then( res =>{
            console.log(res);
        })
    }
    render(){
        return(
            <div className="ecell-cadets-wrap">
                E-Cell Cadets Wrap Created.
            </div>
        );
    }
}

export default ECellCadets;