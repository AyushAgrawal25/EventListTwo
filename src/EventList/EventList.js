import React, { Component } from "react";
import './EventList.css'
import { Link } from "react-router-dom";
import Axios from "axios";
import ESummit from "../E-Summit.png";

class EventList extends Component{
    state={
        data:null,
        qbEventTitleList:null
    }
    constructor(){
        super();
        Axios.get('https://ecell.nitrr.ac.in/events/list/2019/?format=json').then( res =>{
            let qbEventTitleList=[];
            res.data.data.map( eventData =>{
                let qbEventLink="./Event/"+eventData.id;
                let qbEventTitle=(
                    <div className="qb-event-title-wrap qbCardShadow" key={eventData.id}>
                        <Link to={qbEventLink} className="qb-event-link">
                            <div className="qb-event-title">
                                {eventData.name}
                            </div>
                        </Link>
                    </div>
                );
                qbEventTitleList.push(qbEventTitle);
            });
            this.setState({
                qbEventTitleList:qbEventTitleList
            });
        });
    }
    render(){
        return(
            <div className="qb-event-list-wrap">
                <div className="qb-event-list">
                    <div className="qb-event-list-head">
                        List of All Events of E-Cell
                    </div>
                    <div className="qb-event-list-events">
                        {this.state.qbEventTitleList}
                    </div>
                </div>
            </div>
        );
    }
};

export default EventList;