import React, { Component } from "react";
import "./Event.css";
import axios from "axios";
import { Link } from "react-router-dom";

class Event extends Component{
    state={
        data:null,
        qbEventContent:null
    }

    qbEventContent;
    componentDidMount(){
        let dataId=this.props.match.params.post_id;
        axios.get('https://ecell.nitrr.ac.in/events/list/2019/?format=json').then( res =>{
            res.data.data.map( eventData =>{
                if(dataId==eventData.id)
                {
                    this.setState({
                        data:eventData
                    });

                    this.qbEventContent=(<div className="qb-event-wrap">
                        <div className="qb-event-title">{eventData.name}</div>
                        <div className="qb-event-card-wrap">
                            <div className="qb-event-card">
                                <img className="qb-event-card-pic" src={eventData.cover_pic} alt="" />
                                <div className="qb-event-card-details">
                                    <div className="qb-event-card-des">
                                        <span><i className="far fa-clock"></i>   Time: </span>{eventData.time} 
                                    </div>
                                    <div className="qb-event-card-des">
                                        <span><i className="far fa-calendar"></i>   Version: </span>{eventData.year}
                                    </div>
                                    <div className="qb-event-card-des">
                                        <span><i className="far fa-calendar-alt"></i>   Date: </span>{eventData.date}
                                    </div>
                                    <div className="qb-event-card-des">
                                        <span><i className="fas fa-map-marker-alt"></i>   Venue: </span>NIT Raipur
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="qb-event-details" >
                            <div className="qb-psuedo"></div>  
                            <div className="qb-psuedo-details-card">
                                <div className="qb-event-card-des">
                                    <span><i className="far fa-clock"></i>   Time: </span>{eventData.time} 
                                </div>
                                <div className="qb-event-card-des">
                                    <span><i className="far fa-calendar"></i>   Version: </span>{eventData.year}
                                </div>
                                <div className="qb-event-card-des">
                                    <span><i className="far fa-calendar-alt"></i>   Date: </span>{eventData.date}
                                </div>
                                <div className="qb-event-card-des">
                                    <span><i className="fas fa-map-marker-alt"></i>   Venue: </span>NIT Raipur
                                </div>
                            </div>     
                            {this.state.data.details}
                            <div className="qb-points">
                                <div className="qb-point">
                                    <span><i className="far fa-envelope"></i>   Email : </span>{eventData.email}
                                </div>
                                <div className="qb-point">
                                    <span><i className="fas fa-user-friends"></i>   Number of People Registered :  </span>{eventData.no_of_ppl_registered}
                                </div>
                                <div className="qb-point">
                                    <span><i className="far fa-paper-plane"></i>   URL : </span><a href={eventData.website_url} >{eventData.website_url}</a>
                                </div>
                            </div>
                        </div>  
                    </div>);

                    this.setState({
                        qbEventContent:this.qbEventContent
                    });
                }
            })
        });
    }
    render(){
        return(
            <div className="qb-event-container">
                <Link to="../" >
                    <div className="qb-back-btn qbCardShadow">
                        Back
                    </div>
                </Link>
                {this.state.qbEventContent}
            </div>
        );
    }
}

export default Event;