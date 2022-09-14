import { useState,useEffect } from "react";
import axios from "axios";
import Run from "../componenets/Run";
const Social = () =>{
    const [runs,setRuns] = useState([])
    const baseUrl = process.env.REACT_APP_BASE_URL
    const getRuns = async () =>{
        try{
            const res = await axios.get(`${baseUrl}api/run/`)
            setRuns(res.data)
        }catch(e){
            console.error(e)
        }
    }
    useEffect(()=>{
        getRuns()
    },[])
    return(
        <div className="socailPage">
            <h1>Social</h1>
            <div className="socailArea">
            {
                    runs.map((run)=>(
                    <Run run={run} social={true}/>
                ))
            }
            </div>
        </div>
    )
}
export default Social