import '../styles/style.css';
import React,{useState} from "react";

function Box(props) {
  const[info,setInfo]=useState({title: props.title, content: props.content})
  
  return (
    <div>
      <h3 className='h2-section-title'>{info.title}</h3>
      <p style={{color: props.color}}>Our Content : {props.content}</p>
    </div>
  );
}

export default Box;
