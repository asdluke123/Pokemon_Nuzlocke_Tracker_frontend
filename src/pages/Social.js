import { useState,useEffect } from "react";
import axios from "axios";
import Run from "../componenets/Run";
const Social = () =>{
    const [runs,setRuns] = useState([])
    const getRuns = async () =>{
        try{
            const res = await axios.get(`http://localhost:8000/api/run/`)
            setRuns(res.data)
        }catch(e){
            console.error(e)
        }
    }
    useEffect(()=>{
        getRuns()
    },[])
    return(
        <div>
            <h1>Social</h1>
            {
                runs.map((run)=>(
                    <Run run={run} social={true}/>
                ))
            }
        </div>
    )
}
export default Social