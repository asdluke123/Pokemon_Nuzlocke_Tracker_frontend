import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Game from "../componenets/Game";

const Games = () =>{
    const [games,setGames] = useState([])
    const navigate = useNavigate()
    const getRuns = async () =>{
        try{
            const res = await axios.get(`http://localhost:8000/api/game/`)
            setGames(res.data)
        }catch(e){
            console.error(e)
        }
    }
    useEffect(() =>{
        getRuns()
    },[])
    const toRuns = (gameId) =>{
        navigate(`/runs/${gameId}`)
    }
    return(
        <div className="gameContainer">
           <h1>Games</h1>
            <div className="gamesContainer">
                {games.map((game)=>(
                    <div>
                        <Game name={game.name} photo={game.photo} game={game} toRuns={toRuns} />
                    </div>
                    ))}
            </div>

        </div>
    )

}
export default Games