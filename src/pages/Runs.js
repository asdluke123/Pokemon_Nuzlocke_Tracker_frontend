import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Run from "../componenets/Run";
import { useParams } from "react-router-dom";
const Runs = ({user}) =>{
    const [runs,setRuns] = useState([])
    const [name,setName] = useState()
    const [curRun,setCurRun] = useState()
    const [deaths,setDeaths] = useState()
    const [badges,setBadges] = useState()
    const {gameId} = useParams()
    const navigate = useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL
    const getRuns = async () =>{
        try{
            const res = await axios.get(`${baseUrl}api/run/`)
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
    const updateRun = async (e) =>{
        e.preventDefault()
    try{
        if(curRun){
        const res =  await axios.put(`${baseUrl}api/run/${runs[curRun].id}`,{
        name : runs[curRun].name,
        badges: badges,
        deaths: deaths
       })
        let tempObj = runs[curRun]
        let  tempArr = [...runs]
        tempObj.deaths = deaths
        tempObj.badges = badges
        tempArr.splice(curRun,1,tempObj)
        setRuns(tempArr)
        setBadges()
        setDeaths()
    }
    }catch(e){
        console.error(e)
    }
    }
    useEffect(() =>{
        getRuns()
    },[user])
    
    return user ? (
    <div className="runPage">
        <h1 id="runTitle">Runs</h1>
        <div className="runContainer">
            <div className="runForm" >
                <div id='createForm'>
                    <h2>Create Run</h2>
                        <input id ='runInput' type='text' placeholder="Run Name" value={name} onChange = {(e)=> setName(e.target.value)}></input>
                        <button className = 'button'onClick={(e) => createRun(e)}>Create Run</button>
                </div>
                <form id="updateForm">
                    <h2>Update Form</h2>
                    <select id = 'updateSelect' onChange={(e) => setCurRun(e.target.value)} required> <option value = ''> Please Pick Run</option>{runs.map((run,index)=>(<option value={index}>{run.name}</option>))}</select>
                    <h4>Update Badges</h4>
                    <input className='numbers' value = {badges}type='number' min = '0' max = '8' onChange={(e)=>setBadges(e.target.value)}></input>
                    <h4>Update Deaths</h4>
                    <input className='numbers' value = {deaths} type='number' min = '0' onChange={(e)=>setDeaths(e.target.value)}></input>
                    <button type = 'submit' className="button" onClick={(e)=> updateRun(e)}>Save Updates</button>
                </form>
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
    ):<div></div>

}
export default Runs