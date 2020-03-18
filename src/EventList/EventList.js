import React, { Component } from "react";
import './EventList.css'
import { Link } from "react-router-dom";
import Axios from "axios";

class EventList extends Component{
    state={
        qbEventDatas:null,
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
            this.setState({
                qbEventDatas:res.data.data
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
                    },
                    index:i,
                    id:qbEventTitleWrap.id
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


                let qbEventTitleOffset={
                    x:null,
                    y:null
                }

                

                let qbEventTitleNewOffset={
                    x:null,
                    y:null
                }

                let qbEventTitleIndex=0;
                qbEventTitle.addEventListener("mousedown", function(event){
                    isMouseDown=true;

                    qbEventTitleOffset.x=0-event.clientX;
                    qbEventTitleOffset.y=0-event.clientY;

                    qbEventTitle.style.zIndex=15;

                    for(let k=0; k<qbEventTitleWrapProps.length; k++)
                    {
                        if(qbEventTitleWrapProps[k].id==qbEventTitle.id)
                        {
                            qbEventTitleIndex=qbEventTitleWrapProps[k].index;
                        }
                    }

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
                                 
                                if(qbEventTitleIndex>j)
                                {
                                    if(j==0)
                                    {
                                        qbEventTitleWraps[0].parentElement.prepend(qbEventTitle.parentElement);
                                        
                                        qbEventTitleOffset.x=0-event.clientX;
                                        qbEventTitleOffset.y=0-event.clientY;
    
                                        qbEventTitle.style.top="0px";
                                    
                                        let qbEventTitleNewIndex;
                                        for(let k=0; k<qbEventTitleWrapProps.length; k++)
                                        {
                                            if(qbEventTitleWrapProps[k].id==qbEventTitleWraps[j].id)
                                            {
                                                qbEventTitleNewIndex=qbEventTitleWrapProps[k].index;
                                                qbEventTitleWrapProps[k].index=qbEventTitleIndex;
                                            }
                                        }
                                            
                                        for(let k=0; k<qbEventTitleWrapProps.length; k++)
                                        {
                                            if(qbEventTitleWrapProps[k].id==qbEventTitle.id)
                                            {
                                                qbEventTitleWrapProps[k].index=qbEventTitleNewIndex;
                                            }
                                        }
                                    }
                                    else
                                    {
                                        qbEventTitleWraps[0].parentElement.insertBefore(qbEventTitle.parentElement,qbEventTitleWraps[j]);          
                                        
                                        qbEventTitleOffset.x=0-event.clientX;
                                        qbEventTitleOffset.y=0-event.clientY;
    
                                        qbEventTitle.style.top="0px";
                                    
                                        let qbEventTitleNewIndex;
                                        for(let k=0; k<qbEventTitleWrapProps.length; k++)
                                        {
                                            if(qbEventTitleWrapProps[k].id==qbEventTitleWraps[j].id)
                                            {
                                                qbEventTitleNewIndex=qbEventTitleWrapProps[k].index;
                                                qbEventTitleWrapProps[k].index=qbEventTitleIndex;
                                            }
                                        }
                                            
                                        for(let k=0; k<qbEventTitleWrapProps.length; k++)
                                        {
                                            if(qbEventTitleWrapProps[k].id==qbEventTitle.id)
                                            {
                                                qbEventTitleWrapProps[k].index=qbEventTitleNewIndex;
                                            }
                                        }
                                    }
                                }
                                else if(qbEventTitleIndex<j)
                                {
                                    if(j==qbEventTitles.length)
                                    {
                                        qbEventTitleWraps[0].parentElement.append(qbEventTitle.parentElement);
                                    }
                                    else
                                    {
                                        qbEventTitleWraps[0].parentElement.insertBefore(qbEventTitle.parentElement,qbEventTitleWraps[j+1]);          
                                    }
                                    let qbEventTitleNewIndex;
                                    for(let k=0; k<qbEventTitleWrapProps.length; k++)
                                    {
                                        if(qbEventTitleWrapProps[k].id==qbEventTitleWraps[j].id)
                                        {
                                            qbEventTitleNewIndex=qbEventTitleWrapProps[k].index;
                                            qbEventTitleWrapProps[k].index=qbEventTitleIndex;
                                        }
                                    }
                                        
                                    for(let k=0; k<qbEventTitleWrapProps.length; k++)
                                    {
                                        if(qbEventTitleWrapProps[k].id==qbEventTitle.id)
                                        {
                                            qbEventTitleWrapProps[k].index=qbEventTitleNewIndex;
                                        }
                                    }
                                    
                                    
                                    qbEventTitleOffset.x=0-event.clientX;
                                    qbEventTitleOffset.y=0-event.clientY;
                                    qbEventTitle.style.top="0px";
                                
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
                        qbEventTitles[j].style.top="0px";
                        qbEventTitles[j].style.left="0px";
                    }

                    qbEventTitleOffset.x=0;
                    qbEventTitleOffset.y=0;
                });

            }

        });

    }

    qbEventTitlesHTML;
    render(){
        this.qbEventTitlesHTML=[];
        if(this.state.qbEventDatas)
        {
            this.state.qbEventDatas.map(qbEventData =>{
                let qbEventLink="./Event/"+qbEventData.id;
                let qbEventTitle=(
                    <div className="qb-event-title-wrap" id={qbEventData.id} key={qbEventData.id}>
                        <div className="qb-event-title qbCardShadow" id={qbEventData.id} key={qbEventData.id}>
                            <Link to={qbEventLink} className="qb-event-link" id={qbEventData.id} draggable="false" >
                                <div className="qb-event-title-text" id={qbEventData.id} >
                                    {qbEventData.name}
                                </div>
                            </Link>
                        </div>
                    </div>
                );
                this.qbEventTitlesHTML.push(qbEventTitle);
            });
        }

        return(
            <div className="qb-event-list-wrap" ref={this.myRef}  >
                <div className="qb-event-list">
                    <div className="qb-event-list-head">
                        List of All Events of E-Cell
                    </div>
                    <div className="qb-event-list-events">
                        {this.qbEventTitlesHTML}
                    </div>
                </div>
            </div>
        );
    }
};

export default EventList;