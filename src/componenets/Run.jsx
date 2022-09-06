const Run = ({run,deleteRun,index,toRunDetail}) =>{
    return(
        <div>
            <h2 onClick={()=>toRunDetail(run.id)}>{run.name}</h2>
            <div>
                <input type="checkbox" value={run.isComplete}></input>
                <h4>Badges: {run.badges}</h4>
                <h4>Deaths: {run.deaths}</h4>
            </div>
            <button onClick={() => deleteRun(run.id,index)}>Delete</button>
        </div>
    )
}
export default Run