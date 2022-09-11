import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Game from "../componenets/Game";
import Popup from "../componenets/Popup";
const Home = ({user}) =>{
    const [games,setGames] = useState([])
    const [isOpen, setIsOpen] = useState(false)
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
    const navigateRegister = () => {
        navigate('/register')
      }
    
      const navigateLogin = () => {
        navigate('/login')
      }
    
    const togglePopup = (e, value) => {
        if(!user){
          setIsOpen(!isOpen)
          if(value){
          const playlistBlur = e.nativeEvent.path[4]
          const titleBlur = e.nativeEvent.path[5].children.title
          if(playlistBlur.classList.contains('blurRemove') && titleBlur.classList.contains('blurRemove')){
            playlistBlur.classList.remove("blurRemove")
            titleBlur.classList.remove("blurRemove")
          }
          playlistBlur.classList.add("blur")
          titleBlur.classList.add("blur") 
        } else {
          const playlistBlur = e.nativeEvent.path[3].children.homePlaylistContainer
          const titleBlur = e.nativeEvent.path[3].children.title
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
        <div className="gameContainer">
           <h1>Games</h1>
           {isOpen ?(
        <Popup
          content={
              <div id="popup">
                <span className="close-icon" onClick={(e) => togglePopup(e, false)}>
                x
              </span>
                <div id="SignUp">
                  <h4>Join Starred to keep track of your favorite songs and playlists </h4>         
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
            <div className="gamesContainer">
                {games.map((game)=>(
                    <div>
                        <Game name={game.name} photo={game.photo} game={game} toRuns={toRuns} user={user} togglePopup={togglePopup}/>
                    </div>
                    ))}
            </div>

        </div>
    )

}
export default Home