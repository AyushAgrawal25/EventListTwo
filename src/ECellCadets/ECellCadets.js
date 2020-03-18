import React, { Component } from 'react';
import './ECellCadets.css';
import '../bulma.css';
import Axios from 'axios';

class ECellCadets extends Component{
    state={
        qbCadetList:null,
        qbEcellCadetDatas:null,
        qbEcellCadetInputData:{
            name:null,
            venue:null,
            date:null,
            time:null,
            details:null,
            details_html:null,
            email:null,
            flag:true,
            year:"2020",
            ecell_user:2
        }
    }

    constructor(){
        super();

        this.qbDataLoadFun();
    }


    qbSetInputNullFun=()=>{
        this.qbElementRef.current.querySelector("#name").value=null;
        this.qbElementRef.current.querySelector("#venue").value=null;
        this.qbElementRef.current.querySelector("#date").value=null;
        this.qbElementRef.current.querySelector("#details").value=null;
        this.qbElementRef.current.querySelector("#details_html").value=null;
        this.qbElementRef.current.querySelector("#time").value=null;
        this.qbElementRef.current.querySelector("#email").value=null;
    
        let qbEcellCadetInputData={
            name:null,
            venue:null,
            date:null,
            time:null,
            details:null,
            details_html:null,
            email:null,
            flag:true,
            year:"2020",
            ecell_user:2
        }

        this.setState({qbEcellCadetInputData:qbEcellCadetInputData});
    }

    qbDataLoadFun=()=>{
        this.setState({
            qbCadetList:null
        })
        let qbCadetList=[];
        this.qbElementRef=React.createRef();
        let qbEcellCadetDatas;

        Axios.get('https://ecell.nitrr.ac.in/events/cadets/').then( res =>{
            qbEcellCadetDatas=res.data;
            this.setState({
                qbCadetList:qbCadetList
            });
            this.setState({
                qbEcellCadetDatas:qbEcellCadetDatas
            });
        });
    }

    qbCadetUpdateId=null;
    qbCadetUpdateFun=(event)=>{
        this.qbCadetUpdateId=this.state.qbEcellCadetDatas[event.target.getAttribute("qb_key")].id;
        let qbEcellCadetInput={
            name:this.state.qbEcellCadetDatas[event.target.getAttribute("qb_key")].name,
            venue:this.state.qbEcellCadetDatas[event.target.getAttribute("qb_key")].venue,
            date:this.state.qbEcellCadetDatas[event.target.getAttribute("qb_key")].date,
            time:this.state.qbEcellCadetDatas[event.target.getAttribute("qb_key")].time,
            details:this.state.qbEcellCadetDatas[event.target.getAttribute("qb_key")].details,
            details_html:this.state.qbEcellCadetDatas[event.target.getAttribute("qb_key")].details_html,
            email:this.state.qbEcellCadetDatas[event.target.getAttribute("qb_key")].email,
            flag:true,
            year:"2020",
            ecell_user:2
        }

        this.setState({
            qbEcellCadetInputData:qbEcellCadetInput
        });

        this.qbElementRef.current.querySelector(".ecell-cadet-btn").click();
        
        //setting value to Inputs
        this.qbElementRef.current.querySelector("#name").value=qbEcellCadetInput.name;
        this.qbElementRef.current.querySelector("#venue").value=qbEcellCadetInput.venue;
        this.qbElementRef.current.querySelector("#date").value=qbEcellCadetInput.date;
        this.qbElementRef.current.querySelector("#details").value=qbEcellCadetInput.details;
        this.qbElementRef.current.querySelector("#details_html").value=qbEcellCadetInput.details_html;
        this.qbElementRef.current.querySelector("#time").value=qbEcellCadetInput.time;
        this.qbElementRef.current.querySelector("#email").value=qbEcellCadetInput.email;
        
    }

    qbCadetDeleteFun=(event)=>{
        let qbDeleteId=this.state.qbEcellCadetDatas[event.target.getAttribute("qb_key")].id;
        let qbDeleteURL="https://ecell.nitrr.ac.in/events/cadets/"+(qbDeleteId)+"/";
        Axios.delete(qbDeleteURL).then( (res) =>{
            this.qbDataLoadFun();
        }, (err) =>{
            console.log(err);
        }); 
    }

    qbCadetAddFun=(event)=>{
        let qbModalEle=this.qbElementRef.current.querySelector(".ecell-cadet-form-modal");
        qbModalEle.classList.add("qb-modal-open");
        qbModalEle.classList.remove("qb-modal-close");
    }
    qbModalCloseFun=()=>{
        this.qbCadetUpdateId=null;
        this.qbSetInputNullFun();
        
        let qbModalEle=this.qbElementRef.current.querySelector(".ecell-cadet-form-modal");
        qbModalEle.classList.remove("qb-modal-open");
        qbModalEle.classList.add("qb-modal-close")
    }
    qbSubmitFormFun=()=>{
        if(this.qbCadetUpdateId)
        {
            console.log("upating");
            //main code
            let qbPseudoData=this.state.qbEcellCadetInputData;
            let qbUpdateURL="https://ecell.nitrr.ac.in/events/cadets/"+this.qbCadetUpdateId+"/";

            Axios.put(qbUpdateURL,qbPseudoData).then( (res) =>{
                this.qbDataLoadFun()
            }, (err) =>{
                console.log(err);
            }); 
            this.qbElementRef.current.querySelector(".ecell-cadet-form-close-btn").click();
            this.qbCadetUpdateId=null;
        }
        else
        {
            console.log("posting");
            let qbPseudoData=this.state.qbEcellCadetInputData;
        
            Axios.post('https://ecell.nitrr.ac.in/events/cadets/' , qbPseudoData).then( res =>{
                this.qbDataLoadFun();
            });

            this.qbElementRef.current.querySelector(".ecell-cadet-form-close-btn").click();
        }
    }

    qbEcellCadetFromInputChangeFun=(event)=>{
        let qbPseudoInputData=this.state.qbEcellCadetInputData;
        qbPseudoInputData[event.target.id]=event.target.value;
        this.setState({
            qbEcellCadetInputData:qbPseudoInputData
        })
    }

    qbEcellCadetListHTML;
    render(){
        this.qbEcellCadetListHTML=[];
        let qbEcellCadetNum=0;
        if(this.state.qbEcellCadetDatas)
        {
            this.state.qbEcellCadetDatas.map(qbEcellCadetData =>{
                let qbCadetEle=(<div className="qbCardShadow qb-ecell-cadet-wrap" key={qbEcellCadetNum}>
                    <div className="qb-ecell-cadet-card-wrap">
                        <div className="qb-ecell-cadet-card">
                            <div className="qb-ecell-cadet-card-title">
                                {qbEcellCadetData.name}
                            </div>
                            <img className="qb-ecell-cadet-pic" src={qbEcellCadetData.cover_pic} alt="" />                     
                        </div>
                        <div className="qb-ecell-cadet-des">
                            <div className="qb-ecell-cadet-des-head">
                                <span >Email : </span> {qbEcellCadetData.email}
                            </div>
                            <div className="qb-ecell-cadet-des-head">
                                <span >Year : </span> {qbEcellCadetData.year}
                            </div>
                            <div className="qb-ecell-cadet-des-head">
                                <span >Venue : </span> {qbEcellCadetData.venue}
                            </div>
                        </div>
                    </div>
                    <div className="qb-ecell-cadet-optns">
                        <div className="qbCardShadow qb-ecell-cadet-btn qb-btn " qb_key={qbEcellCadetNum} onClick={this.qbCadetUpdateFun}>Update</div>
                        <div className="qbCardShadow qb-ecell-cadet-btn qb-btn " qb_key={qbEcellCadetNum} onClick={this.qbCadetDeleteFun}>Delete</div>
                    </div>
                </div>
                );
                
                qbEcellCadetNum++;
                this.qbEcellCadetListHTML.push(qbCadetEle);
            });
        }
        return(
            <div className="ecell-cadets-container" ref={this.qbElementRef}>
                <div className="ecell-cadet-form-modal qb-modal-close">
                    <div className="ecell-cadet-form-modal-content">
                        <div className="ecell-cadet-form-wrap">
                            <div className="ecell-cadet-form-close-btn-wrap" onClick={this.qbModalCloseFun}>
                                <div className="ecell-cadet-form-close-btn qb-btn">
                                    <i class="fas fa-times"></i>
                                </div>
                            </div>
                            <div className="ecell-cadet-form">
                                <div className="ecell-cadet-form-title">
                                    <span>Add A New Cadet</span>
                                </div>
                                <div className="ecell-cadet-form-content field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Name</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p className="control is-expanded has-icons-left">
                                                <input class="input" id="name" onChange={this.qbEcellCadetFromInputChangeFun} type="text" placeholder="Name" />
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="ecell-cadet-form-content field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Venue</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p className="control is-expanded has-icons-left">
                                                <input class="input" id="venue" onChange={this.qbEcellCadetFromInputChangeFun} type="text" placeholder="Venue" />
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-city"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="ecell-cadet-form-content field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Date</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p className="control is-expanded has-icons-left">
                                                <input class="input" id="date" onChange={this.qbEcellCadetFromInputChangeFun} type="date" placeholder="DD-MM-YYYY" />
                                                <span class="icon is-small is-left">
                                                    <i class="far fa-calendar-alt"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="ecell-cadet-form-content field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Time</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p className="control is-expanded has-icons-left">
                                                <input class="input" id="time" onChange={this.qbEcellCadetFromInputChangeFun} type="text" placeholder="HH:MM" />
                                                <span class="icon is-small is-left">
                                                <i class="far fa-clock"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="ecell-cadet-form-content field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Details</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p className="control is-expanded has-icons-left">
                                                <input class="input" id="details" onChange={this.qbEcellCadetFromInputChangeFun} type="text" placeholder="Hi I am Nobody" />
                                                <span class="icon is-small is-left">
                                                    <i class="far fa-address-card"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="ecell-cadet-form-content field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Details HTML</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p className="control is-expanded has-icons-left">
                                                <input class="input" id="details_html" onChange={this.qbEcellCadetFromInputChangeFun} type="text" placeholder="<div> Hi I am Nobody </div>" />
                                                <span class="icon is-small is-left">
                                                    <i class="far fa-file-code"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="ecell-cadet-form-content field is-horizontal" style={{textAlign:'left', display:'block'}}>
                                    <div class="field-label is-normal qb-label" >
                                        <label className="label label"> Cover Image </label>
                                    </div>
                                    <div class="file" style={{display:'inline-block'}}>
                                        <label class="file-label">
                                            <input class="file-input" id="cover_pic" type="file" accept="image/png, image/jpeg" />
                                            <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                            <span class="file-label">
                                                Choose a file…
                                            </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div className="ecell-cadet-form-content field is-horizontal" style={{textAlign:'left', display:'block'}}>
                                    <div class="field-label is-normal qb-label" >
                                        <label class="label" > Icon </label>
                                    </div>
                                    <div class="file" style={{display:'inline-block'}}>
                                        <label class="file-label">
                                            <input class="file-input" id="icon" type="file" name="resume" />
                                            <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                            <span class="file-label">
                                                Choose a file…
                                            </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div className="ecell-cadet-form-content field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Email</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p className="control is-expanded has-icons-left">
                                                <input class="input" id="email" onChange={this.qbEcellCadetFromInputChangeFun} type="text" placeholder="ayushagrawal@gmail.com" />
                                                <span class="icon is-small is-left">
                                                    <i class="far fa-envelope"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="ecell-cadet-form-submit-btn-wrap">
                                    <div className="ecell-cadet-form-submit-btn qb-btn" onClick={this.qbSubmitFormFun} >Submit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="ecell-cadets-wrap">
                    {this.qbEcellCadetListHTML}
                </div>
                <div className="ecell-cadet-btn qb-btn qbCardShadow" onClick={this.qbCadetAddFun}>
                    <i className="fas fa-user-plus"></i>
                </div>
            </div>
        );
    }
}

export default ECellCadets;