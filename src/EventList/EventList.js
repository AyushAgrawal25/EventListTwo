import React, { Component } from "react";
import './EventList.css'
import { Link } from "react-router-dom";
import Axios from "axios";

class EventList extends Component{
    state={
        data:null,
        qbEventTitleList:null,
        qbEventTitleWraps:null,
        qbEventTitles:null,
        qbEventTitleWrapProps:null
    }
    constructor(){
        super();
        this.myRef=React.createRef();
        Axios.get('https://ecell.nitrr.ac.in/events/list/2019/?format=json').then( res =>{
            let qbEventTitleList=[];
            res.data.data.map( eventData =>{
                let qbEventLink="./Event/"+eventData.id;
                let qbEventTitle=(
                    <div className="qb-event-title-wrap" id={eventData.id} key={eventData.id}>
                        <div className="qb-event-title qbCardShadow" id={eventData.id} key={eventData.id}>
                            <Link to={qbEventLink} className="qb-event-link" id={eventData.id} draggable="false" >
                                <div className="qb-event-title-text" id={eventData.id} >
                                    {eventData.name}
                                </div>
                            </Link>
                        </div>
                    </div>
                );
                qbEventTitleList.push(qbEventTitle);
            });
            this.setState({
                qbEventTitleList:qbEventTitleList
            });
            this.setState({
                qbEventTitleWraps:this.myRef.current.children[0].querySelectorAll(".qb-event-title-wrap")
            });
            this.setState({
                qbEventTitles:this.myRef.current.children[0].querySelectorAll(".qb-event-title")
            });

            let qbEventTitleWrapProps=[];
            for(let i=0; i<this.state.qbEventTitleWraps.length; i++)
            {
                let qbEventTitleWrap=this.state.qbEventTitleWraps[i];
                let qbEventTitleWrapProp={
                    startPoint:{
                        x:qbEventTitleWrap.getBoundingClientRect().left,
                        y:qbEventTitleWrap.getBoundingClientRect().top
                    },
                    endPoint:{
                        x:qbEventTitleWrap.getBoundingClientRect().left+qbEventTitleWrap.getBoundingClientRect().width,
                        y:qbEventTitleWrap.getBoundingClientRect().top+qbEventTitleWrap.getBoundingClientRect().height,
                    }
                }

                qbEventTitleWrapProps.push(qbEventTitleWrapProp);
            }

            this.setState({
                qbEventTitleWrapProps:qbEventTitleWrapProps
            });

            let qbEventTitleWraps=this.state.qbEventTitleWraps;
            let qbEventTitles=this.state.qbEventTitles
            for (let i=0; i<this.state.qbEventTitles.length; i++)
            {
                let qbEventTitle= this.state.qbEventTitles[i];
                
                let isMouseDown=false;
                let qbEventTitleTargetId;

                let qbEventTitleWrapProps=this.state.qbEventTitleWrapProps;

                let qbEventTitleOffset={
                    x:null,
                    y:null
                }

                
                let qbEventTitleNewOffset={
                    x:null,
                    y:null
                }

                qbEventTitle.addEventListener("mousedown", function(event){
                    isMouseDown=true;
                    qbEventTitleTargetId=event.target.id;

                    qbEventTitleOffset.x=0-event.clientX;
                    qbEventTitleOffset.y=0-event.clientY;

                    qbEventTitle.style.zIndex=15;

                });
                
                qbEventTitle.addEventListener("mousemove", function(event){
                    if(isMouseDown)
                    {
                        qbEventTitleNewOffset.x=qbEventTitleOffset.x+event.clientX;
                        qbEventTitleNewOffset.y=qbEventTitleOffset.y+event.clientY;

                        qbEventTitle.style.left=qbEventTitleNewOffset.x+"px";
                        qbEventTitle.style.top=qbEventTitleNewOffset.y+"px";

                        for(let j=0; j<qbEventTitleWrapProps.length; j++)
                        {
                            let qbEventTitleProp={
                                startPoint:{
                                    x:qbEventTitle.getBoundingClientRect().x,
                                    y:qbEventTitle.getBoundingClientRect().y
                                },
                                endPoint:{
                                    x:qbEventTitle.getBoundingClientRect().x+qbEventTitle.getBoundingClientRect().width,
                                    y:qbEventTitle.getBoundingClientRect().y+qbEventTitle.getBoundingClientRect().height
                                }
                            }

                            if((qbEventTitleProp.startPoint.x>qbEventTitleWrapProps[j].startPoint.x)&&(qbEventTitleProp.startPoint.y>qbEventTitleWrapProps[j].startPoint.y)&&(qbEventTitleProp.endPoint.x<qbEventTitleWrapProps[j].endPoint.x)&&(qbEventTitleProp.endPoint.y<qbEventTitleWrapProps[j].endPoint.y))
                            {
                                if(i>j)
                                {
                                    console.log("Hellos");
                                }
                                else if(i<j)
                                {
                                    console.log(j);
                                    
                                    
                                    qbEventTitle.style.left="unset";
                                    qbEventTitle.style.top="unset";
                                    for(let k=i+1; k<=j; k++)
                                    {
                                        qbEventTitleWraps[k-1].append(qbEventTitles[k]);
                                    }
                                    qbEventTitleWraps[j].append(qbEventTitle);
                                    
                                    
                                }
                            }
                        }
                    }

                });
                
                qbEventTitle.addEventListener("mouseup", function(event){
                    //console.log(event);
                    isMouseDown=false;

                    qbEventTitle.style.zIndex="unset";

                    for(let j=0; j<qbEventTitleWrapProps.length; j++)
                    {
                        let qbEventTitleProp={
                            startPoint:{
                                x:qbEventTitle.getBoundingClientRect().x,
                                y:qbEventTitle.getBoundingClientRect().y
                            },
                            endPoint:{
                                x:qbEventTitle.getBoundingClientRect().x+qbEventTitle.getBoundingClientRect().width,
                                y:qbEventTitle.getBoundingClientRect().y+qbEventTitle.getBoundingClientRect().height
                            }
                        }

                        if((qbEventTitleProp.startPoint.x>qbEventTitleWrapProps[j].startPoint.x)&&(qbEventTitleProp.startPoint.y>qbEventTitleWrapProps[j].startPoint.y)&&(qbEventTitleProp.endPoint.x<qbEventTitleWrapProps[j].endPoint.x)&&(qbEventTitleProp.endPoint.y<qbEventTitleWrapProps[j].endPoint.y))
                        {
                            /*
                            if(i>j)
                            {
                                console.log("Hellos");
                                qbEventTitleWraps[j].append(qbEventTitle)
                                qbEventTitle.style.left="unset";
                                qbEventTitle.style.top="unset";
                            }
                            else if(i<j)
                            {
                                console.log("Hellos 1");
                                qbEventTitleWraps[j].append(qbEventTitle)
                                qbEventTitle.style.left="unset";
                                qbEventTitle.style.top="unset";
                            }
                             */
                        }
                    }

                    qbEventTitleOffset.x=0;
                    qbEventTitleOffset.y=0;
                });

            }

        });

    }
    render(){
        return(
            <div className="qb-event-list-wrap" ref={this.myRef}  >
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