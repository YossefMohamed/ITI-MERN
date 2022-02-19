import React,{useState} from "react"

const Todo=()=> {
    const[input,setInput]=useState({})
    const[error,setError]=useState({title:""})
    const[users,setUsers]=useState(
        [
            {
                title:"Test Task 1"
            },
            {
                title:"Test Task 2"
            }
        ]
    )

    const add=()=> {
       setUsers((users)=>
           [...users,input])
    }

    const change=(event)=>
    {
        if(event.target.name==="task")
        {
            if(event.target.value.length===0)
            {
                setError({...error,title:"this is required"})
            }
            else if(event.target.value.length<3)
            {
                setError({...error,title:"min length is 3"})
            }
            else{
                setInput({...input,title:event.target.value})
            }
        }
    }
    
    return(
        <>
        {
            users.map((item,index)=>
            (
                <ul key={index}>
                    <li style={{color: '#2C3A47'}}>{index+1} : {item.title}</li>
                </ul>
            ))
        }

        <form>
            <label>Task Title : </label>
            <input type="text" name="task" onChange={change}/>
            <br/>
            <small style={{color:"#FC427B"}}>{error.email}</small>
            <br/>
        </form>
        <button onClick={add}>Add Task</button>
        </>
    )

}

export default Todo;