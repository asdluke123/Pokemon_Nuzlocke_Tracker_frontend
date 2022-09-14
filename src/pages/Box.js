import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Pokemon from "../componenets/Pokemon";
const Box = () =>{
    const [pokemons,setPokemons] = useState([])
    const {runId} = useParams() 
    const baseUrl = process.env.REACT_APP_BASE_URL
    const getBoxPokemon = async () =>{
        try{
            const res = await axios.get(`${baseUrl}api/boxpokemon/${runId}`)
            setPokemons(res.data)
            
        }catch(e){
            console.error(e)
        }
    }
    const deleteFromBox = async (pokemon,index) =>{
        try{
            await axios.delete(`${baseUrl}api/boxpokemon/delete/${pokemon.id}`)
            let tempArr = [...pokemons]
            tempArr.splice(index,1)
            setPokemons(tempArr)
        }catch(e){
            console.error(e)
        }
    }
    useEffect(()=>{
        getBoxPokemon()
    },[])
return(
    <div id = 'boxPage'>
        <h2>Your Box Pokemon</h2>
        <div className="boxPokemonArea">
            {pokemons.map((pokemon,index) =>(
            <div className = 'boxPokemon'>
                <Pokemon pokemon={pokemon.pokemonId} />
                <button className="deleteRun" onClick={() =>deleteFromBox(pokemon,index)}>Delete from Box</button>
            </div>
        ))}
        </div>
    </div>
)
}
export default Box