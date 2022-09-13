import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Run from "../componenets/Run";
import { useParams } from "react-router-dom";
const Runs = ({user}) =>{
    const [runs,setRuns] = useState([])
    const [name,setName] = useState()
    const {gameId} = useParams()
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL
    const getRuns = async () =>{
        try{
            const res = await axios.get(`https://radiant-falls-59551.herokuapp.com/api/run/`)
            let temp = []
            res.data.forEach((data)=>{
                if(data.userId.id === parseInt(user.id)){
                    temp.push(data)    
                }
            })
            setRuns(temp)
        }catch(e){
            console.error(e)
        }
    }
    const deleteRun = (runId,index) =>{
        try{
            axios.delete(`${baseUrl}api/run/${runId}`)
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
                const res = await axios.post(`${baseUrl}api/createrun/`,{
                    name : name,
                    gameId : gameId,
                    userId : user.id
                })
                const newRuns = [...runs]
                newRuns.push(res.data)
                setRuns(newRuns)
            }
        }catch(e){
            console.error(e)
        }
    }
    const setComplete = async (e,runId,index) =>{
        await axios.put(`${baseUrl}api/run/${runId}`,{
            name:runs[index].name,
            isComplete: e.target.checked
        })
        let temp = [...runs]
        let tempObj = [temp[index]]
        tempObj.isComplete = e.target.checked
        setRuns(temp)
    }
    const toRunDetail = (runId) =>{
        navigate(`run/${runId}`)
    }
    useEffect(() =>{
        getRuns()
    },[])
    return(
    <div className="runPage">
        <h1 id="runTitle">Runs</h1>
        <div className="runContainer">
            <div className="createRunForm" >
                <h2>Create Run</h2>
                        <input id ='runInput' type='text' placeholder="Run Name" value={name} onChange = {(e)=> setName(e.target.value)}></input>
                        <button onClick={(e) => createRun(e)}>Create Run</button>
            </div>
            <div id ='runArea'>
            {
                runs.map((run,index)=>(
                    <Run run={run} deleteRun={deleteRun} index={index} toRunDetail = {toRunDetail} social={false} setComplete={setComplete}/>
                ))
            }
            </div>

        </div>
    </div>
    )

}
export default Runs