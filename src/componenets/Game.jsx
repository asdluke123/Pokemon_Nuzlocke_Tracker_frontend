const Game = ({name,photo,game,toRuns,user,togglePopup}) =>{
    return(
    <div onClick={(e) => {if(user){toRuns(game.id)}else{togglePopup(e,true)}}} className="game">
        <img src = {photo} />
        <h3>{name}</h3>
    </div>  
    ) 
}
export default Game