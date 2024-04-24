import { useState } from "react"
import React from "react";
import { Link } from "react-router-dom";

const Cards = (props) => {
    const {category,setCategory} = props;

    return (
        <div className="card-container">
            {category.map((item) => (
                <div className="card" >
                    <Link to={`/${item}`}>{item}</Link>
                </div>
            ))}
        </div>
    
   
    )
  }
  
  export default Cards