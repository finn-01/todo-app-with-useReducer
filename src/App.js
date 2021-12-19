import "./styles.css";
import { useRef, useReducer} from 'react'

//Khoi tao gia tri ban dau
const initState = {
  job: "",
  jobs: []
}

//Action
const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'

//action dang function
const setJob = payload =>{
  return {
    type:SET_JOB,
    payload: payload  
  }
}

const addJob = payload =>{
  return{
    type: ADD_JOB,
    payload: payload
  }
}

const deleteJob = payload =>{
  return {
    type: DELETE_JOB,
    payload: payload
  }
}

//reducer
const reducer = (state, action) =>{

  let newState;

  switch(action.type){
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload
      }
      break
    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload]
      }
      break
    case DELETE_JOB:
      const newJobs = [...state.jobs]
      newJobs.splice(action.payload, 1)
      newState = {
        ...state,
        jobs: newJobs
      }
      break
    default:
      throw new Error("invalid")
  }

  return newState
}


export default function App() {
  const [state, dispatch] = useReducer(reducer, initState)

  const inputRef = useRef()

  const handleSubmit = ()=>{
    dispatch(addJob(job))
    dispatch(setJob(''))

    inputRef.current.focus()
  }

  const {job,jobs} = state;

  return (
    <div className="App">
      <h3>Todo</h3>
      <input placeholder='Input' 
      value={job} 
      ref={inputRef}
      onChange={e=>dispatch(setJob(e.target.value))}/>
      <button onClick={handleSubmit}>Add</button>
      <ul style={{listStyle:'none'}}>
        {jobs.map((job, index)=>(
          <li key={index}>{job} 
          <span style={{cursor:'pointer',marginLeft: 10}} onClick={()=>dispatch(deleteJob(index))}>&times;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
