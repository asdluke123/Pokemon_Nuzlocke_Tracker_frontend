import { useState,useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import Pokemon from "../componenets/Pokemon";
const RunDetail = ({user}) =>{
    const [run,setRun] = useState()
    const [gotStuff,setGotStuff] = useState(true)
    const [areas,setAreas] = useState([])
    const [curRoute,setCurRoute] = useState(0)
    const [routes,setRoutes] = useState([])
    const [trainers,setTrainers]= useState([])
    const baseUrl = process.env.REACT_APP_BASE_URL
    const {runId} = useParams()
    const navigate = useNavigate()
    const getRun = async () =>{
        try{
            const res = await axios.get(`${baseUrl}api/run/${runId}`)
            setRun(res.data)
        }catch(e){
            console.error(e)
        }
    }
    const getRoutes = async () =>{
        try{
            const res = await axios.get(`${baseUrl}api/route/`) 
            setRoutes(res.data)
        }catch(e){
            console.error(e)
        }
    }
    const createCapture = async (pokemonId) =>{
        try{
            axios.post(`${baseUrl}api/createbox/`,{
                pokemonId: pokemonId,
                runId: run.id
            })
        }catch(e){
            console.error(e)
        }
    }
    const getPokemon = async () =>{
        const res = await axios.get(`${baseUrl}api/routepokemon/${curRoute}`)
        if(res.data.length != 0){
            const areas = res.data.sort((a,b) => a.id - b.id)
            const myAreas = []
            let encounterArea = areas[0].name
            let pokemon = []
            areas.forEach((area,index)=>{
                if(area.name !== encounterArea){
                    let thisArea = {
                        name : encounterArea,
                        pokemon : pokemon
                    }
                    myAreas.push(thisArea)
                    encounterArea = area.name
                    pokemon = []
                }
                pokemon.push(area.pokemonId)
            })
            let thisArea = {
                name : encounterArea,
                pokemon : pokemon
            }
            myAreas.push(thisArea)
            setAreas(myAreas)
        }
    }
    const getTrainers = async () =>{
        try{
            const res = await axios.get(`${baseUrl}api/trainerteam/${curRoute}`)
            if(res.data.length != 0){
                let sortTrainers = res.data
                sortTrainers = res.data.sort((a,b)=>{
                    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                  });
                let sortPokemon = []
                let thisTrainer = sortTrainers[0].name
                let tempArr = []
                  sortTrainers.forEach((trainer)=>{
                    if(trainer.name !== thisTrainer){
                        sortPokemon.push(tempArr)
                        tempArr = []
                        thisTrainer = trainer.name
                    }
                    tempArr.push(trainer)
                  })
                  sortPokemon.push(tempArr)
                sortPokemon.forEach((trainer)=>{
                    trainer.sort((a,b)=>{
                        const nameA = a.pokemonId.name.toUpperCase(); // ignore upper and lowercase
                        const nameB = b.pokemonId.name.toUpperCase(); // ignore upper and lowercase
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                      
                        // names must be equal
                        return 0;
                      });
                })
                let trainers = []
                sortPokemon.forEach((trainer)=>{
                    trainers.push(...trainer)
                })
                let trainerRoute = []
                let trainerTeam = []
                let pokemonName = trainers[0].pokemonId.name
                let pokSprite = trainers[0].pokemonId.sprite
                let pokLevel = trainers[0].level
                let pokMoves = []
                let trainerName = trainers[0].name
                trainers.forEach((trainer,index) =>{
                    if(trainer.pokemonId.name !== pokemonName){
                        let pokemon = {
                            name : pokemonName,
                            sprite : pokSprite,
                            level: pokLevel,
                            moves: pokMoves}
                        trainerTeam.push(pokemon)
                        pokemonName = trainer.pokemonId.name
                        pokSprite = trainer.pokemonId.sprite
                        pokLevel = trainer.level
                        pokMoves = []
                    }
                    pokMoves.push(trainer.moveId.name)
                    if(trainer.name !== trainerName){
                        let myTrainer = {name : trainerName,team : trainerTeam}
                        
                        trainerRoute.push(myTrainer)
                        trainerName = trainer.name
                        trainerTeam = []
                    }
                })
                let pokemon = {
                    name : pokemonName,
                    sprite : pokSprite,
                    level: pokLevel,
                    moves: pokMoves}
                trainerTeam.push(pokemon)
                let myTrainer = {name : trainerName,team : trainerTeam}
                trainerRoute.push(myTrainer)
                setTrainers(trainerRoute)
            }
        }catch(e){
            console.error(e)
        }
    }
    const toBox = () =>{
        navigate(`/box/${run.id}`)
    }

    useEffect(() =>{
        if(gotStuff){
            getRun()
            getRoutes()
            setGotStuff(false)
        }
        setTrainers([])
        setAreas([])
        getTrainers()
        getPokemon()
    },[curRoute])

    return run ?(
        <div id='runDetailPage'>
            <h1 id='runName'>{run.name}</h1>
            <h1   id='boxPokemonName' onClick = {() => toBox()}>Box Pokemon</h1>
            <select  onChange={(e) => setCurRoute(e.target.value)}>
                <option value = ''>Pick your route</option>
                {
                routes.map((route)=>(
                    <option value = {route.id}>{route.name}</option>
                ))
                }
            </select>
            {areas.length !== 0 ? <h2 className='subTitle'>ENCOUNTERS</h2>: <div></div>}
            <div className="encounterArea">
                {areas.map((area)=>(
                    <div className="encounter">
                        <h3 className="encounterName">{area.name}</h3>
                        <div className="pokemonsContainer">
                            {area.pokemon.map((pokemon) =>(
                                <div className="pokemonContainer">
                                    <Pokemon pokemon={pokemon} />
                                    <button className = 'button' onClick={() => createCapture(pokemon.id)}>Add to Box</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {trainers.length !== 0 ? <h2 className="subTitle">TRAINERS</h2>: <div></div>}
            <div className="trainerArea">
            {trainers.map((trainer)=>(
                    <div className="trainerContainer">
                        <h3 className="trainerName">{trainer.name}</h3>
                        <div className="trainerTeam">
                            {trainer.team.map((pokemon)=>(
                                <div className="trainerPokemon">
                                    <Pokemon pokemon={pokemon} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ):(
        <div></div>
    )
}
export default RunDetail
