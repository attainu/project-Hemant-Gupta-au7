import React, { Component,useEffect,useState,useContext } from "react";
import {UserContext} from '../../App'
const Profile = () => {
  var [mypics,setPics]=useState([])
  var {state,dispatch}=useContext(UserContext)
  useEffect(()=>
  {
fetch('/mypost',{
  headers:{
    "Authorization":"Bearer "+localStorage.getItem("jwt")
  }
}).then((res)=>res.json())
.then((result)=>{console.log("PROFILE",result)
setPics(result.mypost)})
  },[])
  return (
    <div style={{maxWidth:"550px",margin:"0px auto"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state ? state.pic : "Loading..."}
          />
        </div>
        <div>
          <h4>{state?state.name:"loading"}</h4>
          <div
            style={{
              display: "flex",
              width: "108%",
              justifyContent: "space-between",
            }}
          >
            <h6>40 Posts</h6>
            <h6>40 Followers</h6>
            <h6>40 Following</h6>
          </div>
          
        </div>
        
      </div>
      <div className="gallery">
        {
          mypics.map((item)=>
          {
            return(
              <img className="item" src={item.photo} alt={item.title }/>
            )
          })
        }
        </div>
    </div>
  );
};

export default Profile;
