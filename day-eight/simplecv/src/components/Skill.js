import '../styles/style.css';
import '../styles/skills.css';
import React,{useState} from "react";

function Skill(props) {
  const[info,setInfo]=useState({name: props.name, percentage: props.percentage})
  
  return (
    <>
      <p>{info.name}</p>
      <div class="container">
        <div class={props.class}>{info.percentage}%</div>
      </div>
      <p style={{color: props.color}}>Our Color: {props.color}</p>
    </>
  );
}

export default Skill;
