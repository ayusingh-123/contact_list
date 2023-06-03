import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Cruddata from "../contacts/cruddata";



export default class UserDetails extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      userData:"",
    };
  }
  

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");

        this.setState({ userData: data.data });

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }
  logout = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  }
  
  render(){
  const { userData } = this.state;
  const user = userData.fname;
  return(
    
    <div>
    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
      <h3 style={{marginLeft:"2rem", marginTop:"10px"}}>Welcome {user}</h3>
      <button className="btn btn-danger" style={{marginLeft:"72rem"}} onClick={this.logout}>Logout</button>
    </div>
    <hr/>
    <Cruddata />
    </div>
    
  );
}
}



      