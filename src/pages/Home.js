import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Game from "../componenets/Game";
import Popup from "../componenets/Popup";
const Home = ({user}) =>{
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [games,setGames] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const getRuns = async () =>{
        try{
            const res = await axios.get(`${baseUrl}api/game/`)
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
    const navigateRegister = () => {
        navigate('/signup')
      }
    
      const navigateLogin = () => {
        navigate('/login')
      }
    
    const togglePopup = (e, value) => {
        if(!user){
          setIsOpen(!isOpen)
          if(value){
          const playlistBlur = e.nativeEvent.path[6].children[0].children[0]
            const titleBlur = e.nativeEvent.path[3]
          if(playlistBlur.classList.contains('blurRemove') && titleBlur.classList.contains('blurRemove')){
            playlistBlur.classList.remove('blurRemove')
            titleBlur.classList.remove("blurRemove")
          }
          playlistBlur.classList.add("blur")
          titleBlur.classList.add("blur") 
        } else {
          const playlistBlur = e.nativeEvent.path[5].children[0].children[0]
          const titleBlur = e.nativeEvent.path[4].children[0].children[1]
          if(playlistBlur.classList.contains('blur') && titleBlur.classList.contains('blur')){
            playlistBlur.classList.remove("blur")
            titleBlur.classList.remove("blur")
          }
          playlistBlur.classList.add("blurRemove")
          titleBlur.classList.add("blurRemove") 
        }
        }
      }
    return(
    <div>
      {isOpen ?(
        <Popup
          content={
              <div id="popup">
                <span className="close-icon" onClick={(e) => togglePopup(e, false)}>
                x
              </span>
                <div id="SignUp">
                  <h4>Join PokiRun to keep track of your Pokemon runs</h4>         
                    <button onClick={navigateRegister} className="popUpButtons">Sign Up</button>
                </div>
                <div id="SignIn">
                  <h4>Already have an account?</h4>
                    <button onClick={navigateLogin} className="popUpButtons">Sign In</button>
                </div>
              </div>
          }
          handleClose={togglePopup}
        />
      ): <span></span>}
        <div className="gameContainer">
          <h1>PokiRun</h1>
           <h2>Games</h2>
            <div className="gamesContainer">
                {games.map((game)=>(
                        <Game name={game.name} photo={game.photo} game={game} toRuns={toRuns} user={user} togglePopup={togglePopup}/>
                    ))}
            </div>

        </div>
    </div>
    )

}
export default Home