import React,{useState,useEffect} from 'react';
import axios from "axios"
const api={
    key:'c959d70bbfac6423b02312f369d51f77',
    base:'https://api.openweathermap.org/data/2.5/'
}
// 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
const WeatherApi=()=> {


    const [description,setDescription]=useState({})
   

    axios.get(`${api.base}weather?q=soul&units=metric&APPID=${api.key}`)
    .then(res=>{
        console.log(res)
        // console.log(res.json())
        // setDescription(res.json().weather[0].description)
    })
 
    return (
        <div>
            <h1>{description.name} </h1>
        </div>
    )
}

export default WeatherApi;