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
    useEffect(()=>{
        getBoxPokemon()
    },[])
return(
    <div>
        {pokemons.map((pokemon) =>(
            <div>
                <Pokemon pokemon={pokemon.pokemonId} />
            </div>
        ))}
    </div>
)
}
export default Box