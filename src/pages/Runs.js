import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Run from "../componenets/Run";
import { useParams } from "react-router-dom";
const Runs = () =>{
    const [runs,setRuns] = useState([])
    const [name,setName] = useState()
    const {gameId} = useParams()
    const navigate = useNavigate()
    const getRuns = async () =>{
        try{
            const res = await axios.get(`http://localhost:8000/api/run/`)
            setRuns(res.data)
        }catch(e){
            console.error(e)
        }
    }
    const deleteRun = (runId,index) =>{
        try{
            axios.delete(`http://localhost:8000/api/run/${runId}`)
            const oldArr = [...runs]
            oldArr.splice(index,1)
            setRuns(oldArr)
        }catch(e){
            console.log(e)
        }
    }
    const createRun = async (e) =>{
        e.preventDefault()
        try{
            if(name){
                const res = await axios.post('http://localhost:8000/api/createrun/',{
                    name : name,
                    gameId : gameId,
                    userId : 1
                })
                const newRuns = [...runs]
                newRuns.push(res.data)
                setRuns(newRuns)
            }
        }catch(e){
            console.error(e)
        }
    }
    const toRunDetail = (runId) =>{
        navigate(`run/${runId}`)
    }
    useEffect(() =>{
        getRuns()
    },[])
    return(
        <div className="runContainer">
           <h1>Runs</h1>
            <div className="createRunForm" >
                <form onSubmit={(e) => createRun(e)}>
                        <input type='text' placeholder="Run Name" value={name} onChange = {(e)=> setName(e.target.value)}></input>
                        <button type="submit">Create Run</button>
                </form>
            </div>
            {
                runs.map((run,index)=>(
                    <Run run={run} deleteRun={deleteRun} index={index} toRunDetail = {toRunDetail}/>
                ))
            }

        </div>
    )

}
export default Runs