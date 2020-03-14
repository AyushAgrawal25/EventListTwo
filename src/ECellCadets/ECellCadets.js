import React, { Component } from 'react';
import './ECellCadets.css';
import Axios from 'axios';

class ECellCadets extends Component{
    constructor(){
        super();
        let qbCadetList=[];
        Axios.get('https://ecell.nitrr.ac.in/events/cadets/').then( res =>{
            res.data.map(cadetData => {
                let qbCadetEle=(<div className="qbCardShadow qb-ecell-cadet-wrap" key={cadetData.id}>
                    <div className="qb-ecell-cadet-card-wrap">
                        <div className="qb-ecell-cadet-card">
                            <div className="qb-ecell-cadet-card-title">
                                {cadetData.name}
                            </div>
                            <img className="qb-ecell-cadet-pic" src={cadetData.cover_pic} alt="" />                     
                        </div>
                        <div className="qb-ecell-cadet-des">
                            <div className="qb-ecell-cadet-des-head">
                                <span >Email : </span> {cadetData.email}
                            </div>
                            <div className="qb-ecell-cadet-des-head">
                                <span >Year : </span> {cadetData.year}
                            </div>
                            <div className="qb-ecell-cadet-des-head">
                                <span >Venue : </span> {cadetData.venue}
                            </div>
                        </div>
                    </div>
                    <div className="qb-ecell-cadet-optns">
                        <div className="qbCardShadow qb-ecell-cadet-btn " qb_key={cadetData.id} onClick={this.qbCadetUpdateFun}>Update</div>
                        <div className="qbCardShadow qb-ecell-cadet-btn " qb_key={cadetData.id} onClick={this.qbCadetDeleteFun}>Delete</div>
                    </div>
                </div>
                );

                qbCadetList.push(qbCadetEle);
            });
            this.setState({
                qbCadetList:qbCadetList
            });
        });
    }

    qbCadetUpdateFun=(event)=>{
        console.log(event.target.attributes.qb_key);
        let qbPseudoData={
            name:"Ayush",
            venue:"kjehf h",
            date:"2020-03-12",
            time:"ahfku sh",
            details:"sdhfjhsd fkh dshnukfh",
            details_html:"https://www.youtube.com",
            email:"egfuhui@gmail.com",
            flag:true,
            year:"2020",
            ecell_user:2
        }

        let qbPseudo={
            name:"Ayush",
            venue:"kjehf h",
            time:"9:35",
            email:"egfuhui@gmail.com",
            year:"2020",
        }

        let postData={
            title:'ayushah',
            content:"kdhgjshukgbs hkd jjg dhgks",
            author:"ayush"
        }

        Axios.post('https://ecell.nitrr.ac.in/events/cadets/' , qbPseudo).then( res =>{
            console.log(res)
        });

        Axios.get('https://ecell.nitrr.ac.in/events/cadets/').then( (res) =>{
            console.log(res);
        }, (err) =>{
            console.log(err);
        });
    }

    qbCadetDeleteFun=(event)=>{
        console.log("Delete")
    }
    
    state={
        qbCadetList:null,
    }
    /*    <img className="qb-ecell-cadet-pic" src="https://wallpaperplay.com/walls/full/1/b/1/289383.jpg" alt="" />
                         */
    render(){
        return(
            <div className="ecell-cadets-wrap">
                {this.state.qbCadetList}
            </div>
        );
    }
}

export default ECellCadets;