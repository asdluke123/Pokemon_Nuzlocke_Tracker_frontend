const Game = ({name,photo,game,toRuns}) =>{
    return(
    <div onClick={() => toRuns(game.id)} className="game">
        <img src = {photo} />
        <h3>{name}</h3>
    </div>  
    ) 
}
export default Game