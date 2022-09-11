const Run = ({run,deleteRun,index,toRunDetail,social,setComplete}) =>{
    return(
        <div>
           {social ?<h2>{run.name}</h2> :<h2 onClick={()=>toRunDetail(run.id)}>{run.name}</h2>}
            <div>
                {social ? run.isComplete ? <h3>Complete</h3>:<h3>Not finished</h3>:<input type="checkbox"  onChange= {(e) => setComplete(e,run.id,index)}></input>}
                <h4>Badges: {run.badges}</h4>
                <h4>Deaths: {run.deaths}</h4>
            </div>
            {social ? <div></div>:<button onClick={() => deleteRun(run.id,index)}>Delete</button>}
        </div>
    )   
}
export default Run