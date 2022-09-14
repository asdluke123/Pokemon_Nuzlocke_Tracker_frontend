const Run = ({run,deleteRun,index,toRunDetail,social,setComplete}) =>{
    return(
        <div className="run">
            <div className="runTitleArea">
                    {social ?<h2>{run.name}</h2> :<h2 onClick={()=>toRunDetail(run.id)} className='runName'>{run.name}</h2>}
            </div>
            <div className="knowledge">
            {social ? run.isComplete ? <h3>Complete</h3>:<h3>Not finished</h3>: (<div className="checkArea"><p>Complete:</p> <input type="checkbox" onChange= {(e) => setComplete(e,run.id,index)}></input> </div>)}
                <h4>Badges: {run.badges}</h4>
                <h4>Deaths: {run.deaths}</h4>
            </div>
            {social ? <div></div>:<button className ='deleteRun'onClick={() => deleteRun(run.id,index)}>Delete</button>}
        </div>
    )   
}
export default Run